// WASM verification test
// Since the TypeScript implementation now uses WASM internally (consolidation from issue #26),
// this test simply verifies that the WASM implementation works correctly for various MML inputs.

import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize WASM
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

// Test cases
const testCases = [
  { mml: 'c', desc: 'Single note' },
  { mml: 'c4', desc: 'Note with duration' },
  { mml: 'c+', desc: 'Sharp note' },
  { mml: 'c-', desc: 'Flat note' },
  { mml: 'c++', desc: 'Double sharp' },
  { mml: 'c+4', desc: 'Sharp with duration' },
  { mml: 'c4.', desc: 'Dotted note' },
  { mml: 'c4..', desc: 'Double dotted note' },
  { mml: 'r', desc: 'Rest' },
  { mml: 'r4', desc: 'Rest with duration' },
  { mml: 'r8.', desc: 'Dotted rest' },
  { mml: 'l8', desc: 'Length command' },
  { mml: 'l16', desc: 'Length 16' },
  { mml: 'o4', desc: 'Octave command' },
  { mml: 'o5', desc: 'Octave 5' },
  { mml: '<', desc: 'Octave up' },
  { mml: '>', desc: 'Octave down' },
  { mml: '@0', desc: 'Instrument 0' },
  { mml: '@1', desc: 'Instrument 1' },
  { mml: 'o4 c', desc: 'Octave and note' },
  { mml: 'o4 l16 e', desc: 'Octave, length, and note' },
  { mml: 'c d e', desc: 'Multiple notes' },
  { mml: 'c4 d8 e16', desc: 'Notes with different durations' },
  { mml: 'o4 c < d > e', desc: 'Octave changes' },
  { mml: 'l8 c d e r f g a', desc: 'Melody with rest' },
  { mml: 'o4 l16 efg+abag+f e8.<e8.>e8', desc: 'Complex melody' },
  { mml: '@0 c d @1 e f', desc: 'Instrument changes' }
];

console.log('Testing WASM implementation...\n');

let allPassed = true;

for (const { mml, desc } of testCases) {
  try {
    const resultWasm = mml_to_json_wasm(mml);
    const jsonWasm = JSON.parse(resultWasm);
    
    // Basic validation
    if (!Array.isArray(jsonWasm)) {
      throw new Error('Result is not an array');
    }
    if (jsonWasm.length < 2) {
      throw new Error('Missing setup commands');
    }
    if (jsonWasm[0].eventType !== 'createNode') {
      throw new Error('First command should be createNode');
    }
    
    console.log(`✓ ${desc}: ${mml}`);
  } catch (e) {
    console.error(`✗ ${desc}: ${mml} - Error: ${e.message}`);
    allPassed = false;
  }
}

console.log('');
if (allPassed) {
  console.log(`All ${testCases.length} tests passed! ✓`);
  process.exit(0);
} else {
  console.log('Some tests failed');
  process.exit(1);
}
