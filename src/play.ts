// Declare Tone.js types
declare const Tone: any;

import type { ToneCommand } from './ast2json';
import { SequencerNodes, playSequence } from 'tonejs-json-sequencer';

// Global state - using SequencerNodes from tonejs-json-sequencer
export const nodes = new SequencerNodes();
export let errorPoint: string = "";

export async function play(): Promise<void> {
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
    const sequence = JSON.parse(jsonStr) as ToneCommand[];
    
    // Use tonejs-json-sequencer to play the sequence
    errorPoint = "playSequence";
    await playSequence(Tone, nodes, sequence as any);
  } catch (error) {
    console.log(errorPoint + " error : [" + error + "]");
  }
}
