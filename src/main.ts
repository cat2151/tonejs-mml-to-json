// Declare Tone.js types
declare const Tone: any;

let errorPoint: string;
let outputArea: HTMLElement | null;
let textarea1: HTMLTextAreaElement | null;
let textarea2: HTMLTextAreaElement | null;

interface ToneNode {
  dispose: () => void;
}

let nodes: ToneNode[] = [];

// Import play function
import { play } from './play.js';

window.addEventListener("load", () => {
  outputArea = document.getElementById('output');
  textarea1 = document.querySelector('#textarea1');
  textarea2 = document.querySelector('#textarea2');
  
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
  if ((window as any).wasmReadyPromise && typeof (window as any).wasmReadyPromise.then === 'function') {
    (window as any).wasmReadyPromise.then(() => {
      // playボタンを押さなくてもtextarea2にコンパイル結果を出力する用
      play();
    }).catch((e: Error) => {
      console.error('WASM initialization failed:', e);
      if (textarea2) {
        textarea2.value = 'Error: Failed to initialize WASM module. Please refresh the page.';
      }
    });
  } else {
    // Fallback: if promise not available, use event listener
    window.addEventListener('wasmReady', () => {
      play();
    }, { once: true });
    
    window.addEventListener('wasmError', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.error('WASM initialization failed:', customEvent.detail);
      if (textarea2) {
        textarea2.value = 'Error: Failed to initialize WASM module. Please refresh the page.';
      }
    }, { once: true });
  }
});
