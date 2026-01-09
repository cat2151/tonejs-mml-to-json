// WASM-based mml2json implementation
import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';

let wasmInitialized = false;

// Initialize WASM module
async function initWasm() {
  if (!wasmInitialized) {
    await init();
    wasmInitialized = true;
  }
}

// Wrapper function compatible with the old mml2json interface
window.mml2json = function(mml) {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  const jsonStr = mml_to_json_wasm(mml);
  return JSON.parse(jsonStr);
};

// Initialize on load
initWasm().then(() => {
  console.log('WASM module initialized successfully');
  // Trigger initial play if the demo is already loaded
  if (typeof play === 'function') {
    play();
  }
}).catch(err => {
  console.error('Failed to initialize WASM module:', err);
});

export { initWasm };
