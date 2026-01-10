/**
 * tonejs-mml-to-json - MML to Tone.js JSON Sequencer Format Converter
 * 
 * This is the main entry point for the library.
 * It exports the core functionality for converting MML to JSON format
 * compatible with tonejs-json-sequencer.
 */

import init, { mml_to_json_wasm } from '../pkg/tonejs_mml_to_json.js';

// Import types for internal use
import type { ASTToken } from './mml2ast.js';
import type { ToneCommand } from './ast2json.js';

// Re-export types
export type {
  ASTToken,
  NoteToken,
  RestToken,
  LengthToken,
  OctaveToken,
  OctaveUpToken,
  OctaveDownToken,
  InstrumentToken
} from './mml2ast.js';

export type {
  ToneCommand,
  CreateNodeCommand,
  ConnectCommand,
  TriggerAttackReleaseCommand,
  DepthRampToCommand
} from './ast2json.js';

// Import individual conversion functions
import { mml2ast as mml2astImpl } from './mml2ast.js';
import { ast2json as ast2jsonImpl } from './ast2json.js';

let wasmInitialized = false;
let wasmInitPromise: Promise<void> | null = null;

/**
 * Initialize the WASM module.
 * This must be called before using any conversion functions.
 * 
 * @returns Promise that resolves when WASM is initialized
 */
export async function initWasm(): Promise<void> {
  if (wasmInitialized) {
    return;
  }
  
  if (wasmInitPromise) {
    return wasmInitPromise;
  }
  
  wasmInitPromise = init().then(() => {
    wasmInitialized = true;
  });
  
  return wasmInitPromise;
}

/**
 * Convert MML string directly to Tone.js JSON format.
 * This is the main convenience function that combines mml2ast and ast2json.
 * 
 * @param mml - MML (Music Macro Language) string to convert
 * @returns Tone.js compatible JSON commands
 * @throws Error if WASM is not initialized or if conversion fails
 */
export function mml2json(mml: string): ToneCommand[] {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  
  const jsonStr = mml_to_json_wasm(mml);
  const result = JSON.parse(jsonStr);
  
  if (result.error) {
    throw new Error(`MML conversion error: ${result.error}`);
  }
  
  return result;
}

/**
 * Convert MML string to Abstract Syntax Tree (AST).
 * 
 * @param mml - MML (Music Macro Language) string to parse
 * @returns Array of AST tokens
 * @throws Error if WASM is not initialized or if parsing fails
 */
export function mml2ast(mml: string): ASTToken[] {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  
  return mml2astImpl(mml);
}

/**
 * Convert Abstract Syntax Tree (AST) to Tone.js JSON format.
 * 
 * @param ast - Array of AST tokens
 * @returns Tone.js compatible JSON commands
 * @throws Error if WASM is not initialized or if conversion fails
 */
export function ast2json(ast: ASTToken[]): ToneCommand[] {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  
  return ast2jsonImpl(ast);
}

// Default export for convenience
export default {
  initWasm,
  mml2json,
  mml2ast,
  ast2json
};
