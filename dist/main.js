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
            // Note: Programmatic value changes don't trigger 'input' event, so we must call play() explicitly
            play(true);
        }
    });
}
window.addEventListener("load", () => {
    textarea1 = document.querySelector('#textarea1');
    textarea2 = document.querySelector('#textarea2');
    // Initialize textarea1 with the first demo's MML
    if (textarea1 && demos.length > 0) {
        textarea1.value = demos[0].mml;
    }
    if (textarea1) {
        // When MML changes, regenerate JSON and play
        textarea1.addEventListener('input', () => play(true));
    }
    if (textarea2) {
        // When JSON is edited, play directly without regenerating from MML
        textarea2.addEventListener('input', () => play(false));
    }
    // Initialize demo dropdown after textareas are assigned
    initializeDemoDropdown();
    const button = document.querySelector('button');
    if (button) {
        button.onclick = async () => {
            await Tone.start();
            play(true);
        };
    }
    // Wait for WASM to be ready before initial play
    // Use promise-based API to avoid race condition with event listeners
    if (window.wasmReadyPromise && typeof window.wasmReadyPromise.then === 'function') {
        window.wasmReadyPromise.then(() => {
            // playボタンを押さなくてもtextarea2にコンパイル結果を出力する用
            play(true);
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
            play(true);
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