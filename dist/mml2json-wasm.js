// WASM-based mml2json implementation using Tree-sitter
import init from '../pkg/tonejs_mml_to_json.js';
import { initParser, mml2ast } from './mml2ast.js';
import { ast2json } from './ast2json.js';
let wasmInitialized = false;
// Initialize WASM module and Tree-sitter parser
async function initWasm() {
    if (!wasmInitialized) {
        await Promise.all([
            init(),
            initParser()
        ]);
        wasmInitialized = true;
    }
}
if (window.mml2json) {
    console.warn('window.mml2json already exists and will be overwritten by WASM implementation');
}
window.mml2json = function (mml) {
    if (!wasmInitialized) {
        throw new Error('WASM module not initialized. Call initWasm() first.');
    }
    // Use Tree-sitter parser to convert MML to AST, then AST to JSON
    const ast = mml2ast(mml);
    return ast2json(ast);
};
// Initialize on load and dispatch event when ready
const wasmReadyPromise = initWasm().then(() => {
    console.log('WASM module and Tree-sitter parser initialized successfully');
    // Dispatch custom event to notify that WASM is ready
    window.dispatchEvent(new CustomEvent('wasmReady'));
}).catch(err => {
    console.error('Failed to initialize WASM module or Tree-sitter parser:', err);
    // Dispatch error event so UI can handle the failure
    window.dispatchEvent(new CustomEvent('wasmError', { detail: err }));
    throw err; // Re-throw to keep promise rejected
});
// Export to window for non-module scripts to access
window.wasmReadyPromise = wasmReadyPromise;
export { initWasm, wasmReadyPromise };
//# sourceMappingURL=mml2json-wasm.js.map