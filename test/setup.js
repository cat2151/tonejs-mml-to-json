/**
 * Vitest setup file - initializes WASM before tests run
 */

import initWasm from '../pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize WASM module before all tests
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);
await initWasm(wasmBuffer);

console.log('✓ WASM initialized for tests');
