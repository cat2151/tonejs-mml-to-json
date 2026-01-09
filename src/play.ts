// Declare Tone.js types
declare const Tone: any;

// Global state
interface ToneNode {
  dispose: () => void;
  toDestination: () => void;
  connect: (node: ToneNode) => void;
  triggerAttackRelease: (...args: any[]) => void;
  depth?: {
    rampTo: (...args: any[]) => void;
  };
}

let nodes: ToneNode[] = [];
let errorPoint: string;

interface ToneCommand {
  eventType: string;
  nodeId?: number;
  nodeType?: string;
  args?: any[];
  connectTo?: string | number;
}

export function play(): void {
  try {
    // Get textarea references
    const textarea1 = document.querySelector('#textarea1') as HTMLTextAreaElement;
    const textarea2 = document.querySelector('#textarea2') as HTMLTextAreaElement;
    
    if (!textarea1 || !textarea2) {
      console.error('Textareas not found');
      return;
    }

    // mml
    const mml = textarea1.value;
    errorPoint = "mml2json";
    
    // mml -> Tone.js playable JSON
    let json = (window as any).mml2json(mml);
    errorPoint = "after mml2json";
    textarea2.value = JSON.stringify(json, null, 2);
    
    // Tone.js playable JSON -> Tone.js
    const jsonStr = textarea2.value;
    errorPoint = "JSON.parse";
    const j = JSON.parse(jsonStr) as ToneCommand[];
    
    // dispose
    nodes.forEach(element => element.dispose());
    
    // play
    j.forEach(element => sub(element));
  } catch (error) {
    console.log(errorPoint + " error : [" + error + "]");
  }
}

function sub(element: ToneCommand): void {
  errorPoint = "sub";
  console.log(element);
  
  switch (element.eventType) {
    case "createNode":
      if (element.nodeId === undefined || element.nodeType === undefined) {
        console.error('Missing nodeId or nodeType for createNode');
        return;
      }
      
      switch (element.nodeType) {
        case "Synth":
          nodes[element.nodeId] = new Tone.Synth();
          break;
        case "FMSynth":
          nodes[element.nodeId] = new Tone.FMSynth(element.args);
          break;
        case "Vibrato":
          nodes[element.nodeId] = new Tone.Vibrato(...(element.args || []));
          break;
      }
      break;
      
    case "connect":
      if (element.nodeId === undefined || element.connectTo === undefined) {
        console.error('Missing nodeId or connectTo for connect');
        return;
      }
      
      if (element.connectTo == "toDestination") {
        nodes[element.nodeId].toDestination();
      } else {
        nodes[element.nodeId].connect(nodes[element.connectTo as number]);
      }
      break;
      
    case "triggerAttackRelease":
      if (element.nodeId === undefined || !element.args) {
        console.error('Missing nodeId or args for triggerAttackRelease');
        return;
      }
      
      errorPoint = "triggerAttackRelease";
      nodes[element.nodeId].triggerAttackRelease(...element.args);
      break;
      
    case "depth.rampTo":
      if (element.nodeId === undefined || !element.args) {
        console.error('Missing nodeId or args for depth.rampTo');
        return;
      }
      
      nodes[element.nodeId].depth?.rampTo(...element.args);
      break;
  }
}
