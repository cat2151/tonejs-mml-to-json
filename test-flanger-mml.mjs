import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { demos } from './dist/demos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize WASM
const wasmPath = join(__dirname, './pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

// Get Flanger demo
const flangerDemo = demos.find(d => d.id === 'effect-flanger');
if (!flangerDemo) {
  console.error('Flanger demo not found!');
  process.exit(1);
}

console.log('Testing Flanger demo MML parsing...\n');
console.log('MML:', flangerDemo.mml);

try {
  const jsonStr = mml_to_json_wasm(flangerDemo.mml);
  const result = JSON.parse(jsonStr);
  
  console.log('\nParsing successful!');
  console.log('Number of commands:', result.length);
  
  // Check for expected command types
  const commandTypes = new Set(result.map(cmd => cmd.eventType));
  console.log('Command types:', Array.from(commandTypes).join(', '));
  
  // Check for Synth and Chorus nodes
  const nodes = result.filter(cmd => cmd.eventType === 'createNode');
  const synthNode = nodes.find(n => n.nodeName === 'Synth');
  const chorusNode = nodes.find(n => n.nodeName === 'Chorus');
  
  console.log('\nSynth node found:', !!synthNode);
  if (synthNode) {
    console.log('  - Args:', JSON.stringify(synthNode.args));
  }
  
  console.log('Chorus node found:', !!chorusNode);
  if (chorusNode) {
    console.log('  - Args:', JSON.stringify(chorusNode.args));
  }
  
  // Check for chord notes
  const noteEvents = result.filter(cmd => cmd.eventType === 'triggerAttackRelease');
  console.log('\nNote events:', noteEvents.length);
  if (noteEvents.length > 0) {
    console.log('First note:', JSON.stringify(noteEvents[0]));
  }
  
  console.log('\n✓ Flanger demo MML is valid and parses correctly!');
  process.exit(0);
} catch (e) {
  console.error('\n✗ Error parsing Flanger demo MML:', e.message);
  console.error(e.stack);
  process.exit(1);
}
