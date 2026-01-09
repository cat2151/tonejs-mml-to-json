// Simulated browser test for WASM module
import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing WASM module as it would be used in the demo...\n');

// Initialize WASM
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await init(wasmBuffer);

// Simulate the mml2json function used in the demo
function mml2json(mml) {
  const jsonStr = mml_to_json_wasm(mml);
  return JSON.parse(jsonStr);
}

// Test with the demo's default MML
const demoMml = 'o4 l16 efg+abag+f e8.<e8.>e8';
console.log('Demo MML:', demoMml);

try {
  const result = mml2json(demoMml);
  console.log('\nResult:');
  console.log('- Number of commands:', result.length);
  console.log('- First command:', JSON.stringify(result[0]));
  console.log('- Last command:', JSON.stringify(result[result.length - 1]));
  
  // Verify structure
  let hasCreateNode = false;
  let hasConnect = false;
  let hasTrigger = false;
  
  for (const cmd of result) {
    if (cmd.eventType === 'createNode') hasCreateNode = true;
    if (cmd.eventType === 'connect') hasConnect = true;
    if (cmd.eventType === 'triggerAttackRelease') hasTrigger = true;
  }
  
  console.log('\nValidation:');
  console.log('- Has createNode:', hasCreateNode);
  console.log('- Has connect:', hasConnect);
  console.log('- Has triggerAttackRelease:', hasTrigger);
  
  if (hasCreateNode && hasConnect && hasTrigger) {
    console.log('\n✓ Demo WASM module works correctly!');
    process.exit(0);
  } else {
    console.log('\n✗ Missing required command types');
    process.exit(1);
  }
} catch (e) {
  console.error('\n✗ Error:', e.message);
  console.error(e.stack);
  process.exit(1);
}
