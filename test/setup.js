/**
 * Vitest setup file - initializes WASM and Tree-sitter parser before tests run
 */

import initWasm from '../pkg/tonejs_mml_to_json.js';
import { initParser } from '../src/mml2ast.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize WASM module before all tests
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wasmPath = join(__dirname, '../pkg/tonejs_mml_to_json_bg.wasm');
const wasmBuffer = readFileSync(wasmPath);

// Path to Tree-sitter MML grammar WASM
const treeSitterWasmPath = join(__dirname, '../tree-sitter-mml/tree-sitter-mml.wasm');

// Initialize both WASM and Tree-sitter parser
await Promise.all([
  initWasm(wasmBuffer),
  initParser(treeSitterWasmPath)
]);

console.log('✓ WASM and Tree-sitter parser initialized for tests');
