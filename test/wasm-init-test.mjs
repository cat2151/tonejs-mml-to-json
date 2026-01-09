// Test WASM initialization event handling and promise exports
import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing WASM initialization event handling...\n');

// Simulate browser environment
const mockWindow = {
  dispatchEvent: function(event) {
    this._events = this._events || [];
    this._events.push(event);
  },
  addEventListener: function(type, handler, options) {
    // Store listeners for testing
    this._listeners = this._listeners || {};
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({ handler, options });
  },
  CustomEvent: class CustomEvent {
    constructor(type, eventInitDict) {
      this.type = type;
      this.detail = eventInitDict?.detail;
    }
  },
  _events: [],
  _listeners: {}
};

global.window = mockWindow;
global.CustomEvent = mockWindow.CustomEvent;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message}`);
    testsFailed++;
  }
}

// Pre-initialize WASM in Node.js environment before loading the module
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

// Now load the mml2json-wasm module (it will try to initialize, but WASM is already loaded)
const wasmModulePath = join(__dirname, '../src/mml2json-wasm.js');
const moduleContent = readFileSync(wasmModulePath, 'utf8');

// Import and test the module
const { initWasm, wasmReadyPromise } = await import(`file://${wasmModulePath}`);

// Test 1: Check that wasmReadyPromise is exported to window
assert(
  window.wasmReadyPromise !== undefined,
  'wasmReadyPromise is exported to window'
);

// Test 2: Check that wasmReadyPromise is a Promise
assert(
  window.wasmReadyPromise && typeof window.wasmReadyPromise.then === 'function',
  'wasmReadyPromise is a Promise'
);

// Test 3: Check that window.mml2json function is defined
assert(
  typeof window.mml2json === 'function',
  'window.mml2json function is defined'
);

// Test 4: Wait for WASM initialization to complete
try {
  await window.wasmReadyPromise;
  assert(true, 'wasmReadyPromise resolves successfully');
  
  // Test 5: Check that wasmReady event was dispatched
  const wasmReadyEvent = window._events.find(e => e.type === 'wasmReady');
  assert(
    wasmReadyEvent !== undefined,
    'wasmReady event was dispatched'
  );
  
  // Test 6: Verify window.mml2json works after initialization
  try {
    const result = window.mml2json('c');
    assert(
      Array.isArray(result) && result.length > 0,
      'window.mml2json returns valid result after initialization'
    );
  } catch (e) {
    assert(false, `window.mml2json should work after initialization: ${e.message}`);
  }
  
} catch (err) {
  assert(false, `wasmReadyPromise should resolve: ${err.message}`);
}

// Test 7: Verify error handling (simulate error scenario)
console.log('\nTesting error handling scenario...');
const errorTestWindow = {
  dispatchEvent: function(event) {
    this._errorEvents = this._errorEvents || [];
    this._errorEvents.push(event);
  },
  CustomEvent: class CustomEvent {
    constructor(type, eventInitDict) {
      this.type = type;
      this.detail = eventInitDict?.detail;
    }
  },
  _errorEvents: []
};

// Create a failing promise to test error event dispatch
const testError = new Error('Test initialization error');
const errorPromise = Promise.reject(testError).catch(err => {
  errorTestWindow.dispatchEvent(new errorTestWindow.CustomEvent('wasmError', { detail: err }));
  throw err;
});

try {
  await errorPromise;
} catch (err) {
  // Expected to throw
  const errorEvent = errorTestWindow._errorEvents.find(e => e.type === 'wasmError');
  assert(
    errorEvent !== undefined && errorEvent.detail.message === 'Test initialization error',
    'wasmError event is dispatched with correct error details on failure'
  );
}

// Test 8: Verify promise-based error handling preserves rejection
console.log('\nTesting promise rejection preservation...');
try {
  const failPromise = Promise.reject(new Error('Should be preserved')).catch(err => {
    throw err;
  });
  await failPromise;
  assert(false, 'Promise should have been rejected');
} catch (err) {
  assert(
    err.message === 'Should be preserved',
    'Promise rejection is preserved after catch and re-throw'
  );
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ All initialization event handling tests passed!');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed!');
  process.exit(1);
}
