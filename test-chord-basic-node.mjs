// Test script to verify chord basic demo works correctly
import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize WASM
const wasmPath = join(__dirname, './pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

console.log('Testing Chords (Basic) demo...\n');

// Test the "Chords (Basic)" demo MML
const mml = "o4 l4 'ceg' 'dfb' 'ace' 'gbdf'";
console.log('MML:', mml);

try {
  const result = mml_to_json_wasm(mml);
  const json = JSON.parse(result);
  
  console.log('\n✓ Success! Generated JSON:');
  console.log(JSON.stringify(json, null, 2));
  console.log('\nNumber of events:', json.length);
  
  // Check that it creates PolySynth for chords
  const createNode = json.find(e => e.eventType === 'createNode');
  console.log('\nInstrument node type:', createNode?.nodeType);
  
  // Check chord events
  const chordEvents = json.filter(e => e.eventType === 'triggerAttackRelease');
  console.log('Number of chord events:', chordEvents.length);
  
  if (chordEvents.length > 0) {
    console.log('\nFirst chord event:');
    console.log(JSON.stringify(chordEvents[0], null, 2));
  }
  
  process.exit(0);
} catch (e) {
  console.error('\n✗ Error occurred:');
  console.error(e.message);
  console.error(e.stack);
  process.exit(1);
}
