// Integration test comparing WASM and JavaScript implementations
import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mml2ast } from '../src/mml2ast.js';
import { ast2json } from '../src/ast2json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize WASM
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

// Test cases
const testCases = [
  'c',
  'c4',
  'c+',
  'c-',
  'c++',
  'c+4',
  'c4.',
  'c4..',
  'r',
  'r4',
  'r8.',
  'l8',
  'l16',
  'o4',
  'o5',
  '<',
  '>',
  '@0',
  '@1',
  'o4 c',
  'o4 l16 e',
  'c d e',
  'c4 d8 e16',
  'o4 c < d > e',
  'l8 c d e r f g a',
  'o4 l16 efg+abag+f e8.<e8.>e8',
  '@0 c d @1 e f'
];

console.log('Comparing WASM and JavaScript implementations...\n');

let allPassed = true;
let differences = 0;

for (const mml of testCases) {
  let jsonJs;
  let jsonWasm;
  let jsOk = true;
  let wasmOk = true;
  let hadError = false;

  // JavaScript implementation
  try {
    const astJs = mml2ast(mml);
    jsonJs = ast2json(astJs);
  } catch (e) {
    console.error(`✗ ${mml} - JavaScript implementation error: ${e.message}`);
    allPassed = false;
    if (!hadError) {
      differences++;
      hadError = true;
    }
    jsOk = false;
  }

  // WASM implementation
  try {
    const resultWasm = mml_to_json_wasm(mml);
    jsonWasm = JSON.parse(resultWasm);
  } catch (e) {
    console.error(`✗ ${mml} - WASM implementation error: ${e.message}`);
    allPassed = false;
    if (!hadError) {
      differences++;
      hadError = true;
    }
    wasmOk = false;
  }

  // Only compare if both implementations succeeded
  if (!jsOk || !wasmOk) {
    continue;
  }

  // Compare
  const jsStr = JSON.stringify(jsonJs);
  const wasmStr = JSON.stringify(jsonWasm);
  
  if (jsStr === wasmStr) {
    console.log(`✓ ${mml}`);
  } else {
    console.log(`✗ ${mml}`);
    console.log(`  JS length: ${jsonJs.length}, WASM length: ${jsonWasm.length}`);
    
    // Find first difference
    for (let i = 0; i < Math.max(jsonJs.length, jsonWasm.length); i++) {
      const jsCmd = jsonJs[i] ? JSON.stringify(jsonJs[i]) : 'undefined';
      const wasmCmd = jsonWasm[i] ? JSON.stringify(jsonWasm[i]) : 'undefined';
      if (jsCmd !== wasmCmd) {
        console.log(`  First difference at index ${i}:`);
        console.log(`    JS:   ${jsCmd}`);
        console.log(`    WASM: ${wasmCmd}`);
        break;
      }
    }
    
    allPassed = false;
    differences++;
  }
}

console.log('');
if (allPassed) {
  console.log(`All ${testCases.length} tests passed! ✓`);
  process.exit(0);
} else {
  console.log(`${testCases.length - differences} passed, ${differences} failed`);
  process.exit(1);
}
