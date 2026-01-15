// Test for demo page functionality - verifies JSON output is displayed
import init from '../pkg/tonejs_mml_to_json.js';
import { initParser } from '../dist/mml2ast.js';
import { mml2json } from '../dist/index.js';
import { demos } from '../dist/demos.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing demo page JSON output display...\n');

// Initialize WASM for Node.js
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
const treeSitterWasmPath = join(__dirname, '../tree-sitter-mml/tree-sitter-mml.wasm');

// Initialize both WASM modules
await Promise.all([
  init(wasmBuffer),
  initParser(treeSitterWasmPath)
]);

// Manually set the initialization flag (since we initialized directly)
// This is needed for Node.js testing
const indexModule = await import('../dist/index.js');
// Access the internal state through a workaround for testing
await indexModule.initWasm();

// Test that the default demo MML produces valid JSON output
const defaultDemo = demos[0];
console.log('Default Demo MML:', defaultDemo.mml);
console.log('Demo Name:', defaultDemo.name);

try {
  // Simulate what the demo page does: convert MML to JSON
  const result = mml2json(defaultDemo.mml);
  
  console.log('\nResult:');
  console.log('- Number of commands:', result.length);
  console.log('- First command:', JSON.stringify(result[0]));
  console.log('- Last command:', JSON.stringify(result[result.length - 1]));
  
  // Verify the JSON can be stringified (for textarea2 display)
  const jsonString = JSON.stringify(result, null, 2);
  console.log('\nJSON output length:', jsonString.length, 'characters');
  console.log('JSON preview (first 100 chars):', jsonString.substring(0, 100) + '...');
  
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
  console.log('- JSON is valid and displayable:', jsonString.length > 0);
  
  if (hasCreateNode && hasConnect && hasTrigger && jsonString.length > 0) {
    console.log('\n✓ Demo JSON output display works correctly!');
    console.log('✓ Demo page will display converted JSON in textarea2');
    process.exit(0);
  } else {
    console.log('\n✗ Missing required validation');
    process.exit(1);
  }
} catch (e) {
  console.error('\n✗ Error:', e.message);
  console.error(e.stack);
  process.exit(1);
}
