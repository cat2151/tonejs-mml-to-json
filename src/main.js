var errorPoint, outputArea, textarea1, textarea2, nodes = [];

window.addEventListener("load", ()=>{
  outputArea = document.getElementById('output');
  textarea1 = document.querySelector('#textarea1');
  textarea1.addEventListener('input', play);
  textarea2 = document.querySelector('#textarea2');
  textarea2.addEventListener('input', play);

  const button = document.querySelector('button');
  button.onclick = async ()=>{
    await Tone.start();
    play();
  };

  // Wait for WASM to be ready before initial play
  window.addEventListener('wasmReady', ()=>{
    // playボタンを押さなくてもtextarea2にコンパイル結果を出力する用
    play();
  }, { once: true });

  // Handle WASM initialization errors
  window.addEventListener('wasmError', (e)=>{
    console.error('WASM initialization failed:', e.detail);
    textarea2.value = 'Error: Failed to initialize WASM module. Please refresh the page.';
  }, { once: true });
});
