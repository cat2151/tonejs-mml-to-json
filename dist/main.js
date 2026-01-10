let textarea1;
let textarea2;
// Import play function and demos
import { play } from './play.js';
import { demos } from './demos.js';
/**
 * Initialize the demo dropdown menu
 */
function initializeDemoDropdown() {
    const demoSelect = document.querySelector('#demoSelect');
    if (!demoSelect) {
        console.error('Demo select element not found');
        return;
    }
    // Populate dropdown with demo options
    demos.forEach((demo, index) => {
        const option = document.createElement('option');
        option.value = demo.id;
        option.textContent = demo.name;
        option.title = demo.description;
        if (index === 0) {
            option.selected = true;
        }
        demoSelect.appendChild(option);
    });
    // Handle demo selection change
    demoSelect.addEventListener('change', () => {
        const selectedDemo = demos.find(d => d.id === demoSelect.value);
        if (selectedDemo && textarea1) {
            textarea1.value = selectedDemo.mml;
            // Trigger play to update the output
            play();
        }
    });
}
window.addEventListener("load", () => {
    textarea1 = document.querySelector('#textarea1');
    textarea2 = document.querySelector('#textarea2');
    // Initialize demo dropdown
    initializeDemoDropdown();
    if (textarea1) {
        textarea1.addEventListener('input', play);
    }
    if (textarea2) {
        textarea2.addEventListener('input', play);
    }
    const button = document.querySelector('button');
    if (button) {
        button.onclick = async () => {
            await Tone.start();
            play();
        };
    }
    // Wait for WASM to be ready before initial play
    // Use promise-based API to avoid race condition with event listeners
    if (window.wasmReadyPromise && typeof window.wasmReadyPromise.then === 'function') {
        window.wasmReadyPromise.then(() => {
            // playボタンを押さなくてもtextarea2にコンパイル結果を出力する用
            play();
        }).catch((e) => {
            console.error('WASM initialization failed:', e);
            if (textarea2) {
                textarea2.value = 'Error: Failed to initialize WASM module. Please refresh the page.';
            }
        });
    }
    else {
        // Fallback: if promise not available, use event listener
        window.addEventListener('wasmReady', () => {
            play();
        }, { once: true });
        window.addEventListener('wasmError', (e) => {
            const customEvent = e;
            console.error('WASM initialization failed:', customEvent.detail);
            if (textarea2) {
                textarea2.value = 'Error: Failed to initialize WASM module. Please refresh the page.';
            }
        }, { once: true });
    }
});
//# sourceMappingURL=main.js.map