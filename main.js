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

  // playボタンを押さなくてもtextarea2にコンパイル結果を出力する用
  play();
});
