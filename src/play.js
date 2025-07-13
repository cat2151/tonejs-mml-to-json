function play() {
  try {
    // mml
    const mml  = textarea1.value;
    errorPoint = "mml2json";
    // mml -> Tone.js playable JSON
    let json = mml2json(mml);
    errorPoint = "after mml2json";
    textarea2.value = JSON.stringify(json, null, 2);
    // Tone.js playable JSON -> Tone.js
    json = textarea2.value;
    errorPoint = "JSON.parse";
    const j = JSON.parse(json);
    // dispose
    nodes.forEach (element => element.dispose());
    // play
    j.forEach (element => sub(element));
  } catch (error) {
    console.log(errorPoint + " error : [" + error + "]");
  }
}

function sub(element) {
  errorPoint = "sub";
  console.log(element);
  switch (element.eventType) {
  case "createNode":
    switch (element.nodeType) {
    case "Synth":
      nodes[element.nodeId] = new Tone.Synth();
      break;
    case "FMSynth":
      nodes[element.nodeId] = new Tone.FMSynth(element.args);
      break;
    case "Vibrato":
      nodes[element.nodeId] = new Tone.Vibrato(...element.args);
      break;
    }
    break;
  case "connect":
    if (element.connectTo == "toDestination") {
      nodes[element.nodeId].toDestination();
    } else {
      nodes[element.nodeId].connect(nodes[element.connectTo]);
    }
    break;
  case "triggerAttackRelease":
    errorPoint = "triggerAttackRelease";
    nodes[element.nodeId].triggerAttackRelease(...element.args);
    break;
  case "depth.rampTo":
    nodes[element.nodeId].depth.rampTo(...element.args);
    break;
  }
}
