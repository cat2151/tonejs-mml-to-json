// Test script to verify WASM module works correctly
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
console.log('Testing WASM module...\n');

const testCases = [
  { mml: 'c', desc: 'Single note' },
  { mml: 'c4', desc: 'Note with duration' },
  { mml: 'c+', desc: 'Note with sharp' },
  { mml: 'o4 l16 e', desc: 'Complex MML' },
  { mml: 'o4 l16 efg+abag+f e8.<e8.>e8', desc: 'Demo MML' }
];

// Expected number of setup commands (createNode and connect)
const EXPECTED_SETUP_COMMANDS = 2;

let allPassed = true;

for (const testCase of testCases) {
  try {
    const result = mml_to_json_wasm(testCase.mml);
    const json = JSON.parse(result);
    
    console.log(`✓ ${testCase.desc}`);
    console.log(`  Input: ${testCase.mml}`);
    console.log(`  Output: ${json.length} commands`);
    
    // Basic validation
    if (!Array.isArray(json)) {
      throw new Error('Result is not an array');
    }
    if (json.length < EXPECTED_SETUP_COMMANDS) {
      throw new Error('Missing setup commands');
    }
    if (json[0].eventType !== 'createNode') {
      throw new Error('First command should be createNode');
    }
  } catch (e) {
    console.error(`✗ ${testCase.desc}`);
    console.error(`  Error: ${e.message}`);
    allPassed = false;
  }
  console.log('');
}

if (allPassed) {
  console.log('All tests passed! ✓');
  process.exit(0);
} else {
  console.log('Some tests failed! ✗');
  process.exit(1);
}
