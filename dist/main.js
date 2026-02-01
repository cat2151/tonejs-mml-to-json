let textarea1;
let textarea2;
let debounceTimer = null;
let currentAbortController = null;
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
            play(true);
        }
    });
}
/**
 * Get the currently selected JSON edit mode
 */
function getSelectedMode() {
    const checkedRadio = document.querySelector('input[name="jsonEditMode"]:checked');
    if (checkedRadio) {
        return checkedRadio.value;
    }
    // Default mode when no radio button is selected
    return 'manual';
}
/**
 * Handle debounced input for textarea2
 */
function handleDebouncedInput() {
    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        play(false);
    }, 1000);
}
/**
 * Handle manual input for textarea2 (keyboard shortcuts)
 */
function handleManualInput(event) {
    // Check for Ctrl/Cmd+S or Shift+Enter (case-insensitive for 's')
    if (((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') || (event.shiftKey && event.key === 'Enter')) {
        event.preventDefault(); // Prevent browser's save dialog for Ctrl/Cmd+S
        play(false);
    }
}
/**
 * Setup event listeners for textarea2 based on the selected mode
 */
function setupTextarea2Listeners() {
    if (!textarea2)
        return;
    // Clear any pending debounce timer when switching modes
    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
    // Abort previous event listeners
    if (currentAbortController) {
        currentAbortController.abort();
    }
    currentAbortController = new AbortController();
    const selectedMode = getSelectedMode();
    // Add appropriate listeners based on mode
    if (selectedMode === 'debounce') {
        textarea2.addEventListener('input', handleDebouncedInput, { signal: currentAbortController.signal });
    }
    else {
        // Manual mode: only on keyboard shortcuts
        textarea2.addEventListener('keydown', handleManualInput, { signal: currentAbortController.signal });
    }
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
    // Setup textarea2 listeners based on initial mode
    setupTextarea2Listeners();
    // Add change listener to radio buttons to update textarea2 behavior
    const radioButtons = document.querySelectorAll('input[name="jsonEditMode"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', setupTextarea2Listeners);
    });
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
// Cleanup on window unload
window.addEventListener('beforeunload', () => {
    if (currentAbortController) {
        currentAbortController.abort();
        currentAbortController = null;
    }
    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
});
//# sourceMappingURL=main.js.map