// WASM-based mml2json implementation
import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';

let wasmInitialized = false;

// Initialize WASM module
async function initWasm(): Promise<void> {
  if (!wasmInitialized) {
    await init();
    wasmInitialized = true;
  }
}

// Wrapper function compatible with the old mml2json interface
declare global {
  interface Window {
    mml2json?: (mml: string) => any;
    wasmReadyPromise?: Promise<void>;
  }
}

if (window.mml2json) {
  console.warn('window.mml2json already exists and will be overwritten by WASM implementation');
}
window.mml2json = function(mml: string): any {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  const jsonStr = mml_to_json_wasm(mml);
  return JSON.parse(jsonStr);
};

// Initialize on load and dispatch event when ready
const wasmReadyPromise = initWasm().then(() => {
  console.log('WASM module initialized successfully');
  // Dispatch custom event to notify that WASM is ready
  window.dispatchEvent(new CustomEvent('wasmReady'));
}).catch(err => {
  console.error('Failed to initialize WASM module:', err);
  // Dispatch error event so UI can handle the failure
  window.dispatchEvent(new CustomEvent('wasmError', { detail: err }));
  throw err; // Re-throw to keep promise rejected
});

// Export to window for non-module scripts to access
window.wasmReadyPromise = wasmReadyPromise;

export { initWasm, wasmReadyPromise };
