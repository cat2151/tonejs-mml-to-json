declare function initWasm(): Promise<void>;
declare global {
    interface Window {
        mml2json?: (mml: string) => any;
        wasmReadyPromise?: Promise<void>;
    }
}
declare const wasmReadyPromise: Promise<void>;
export { initWasm, wasmReadyPromise };
//# sourceMappingURL=mml2json-wasm.d.ts.map