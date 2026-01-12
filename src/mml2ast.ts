/**
 * MML to AST converter using Rust WASM
 * 
 * This module uses the Rust WASM implementation, consolidating the duplicate
 * TypeScript implementation (issue #26).
 * 
 * The previous pure TypeScript implementation has been removed as part of the
 * consolidation. It can be found in git history (commit d5723ea and earlier).
 */

import { mml2ast_wasm } from '../pkg/tonejs_mml_to_json.js';

// Type definitions for AST tokens
export interface NoteToken {
  type: 'note';
  note: string;
  accidental: string;
  duration: number | null;
  dots: number;
  length: number;
}

export interface RestToken {
  type: 'rest';
  duration: number | null;
  dots: number;
  length: number;
}

export interface LengthToken {
  type: 'length';
  value: number | null;
  length: number;
}

export interface OctaveToken {
  type: 'octave';
  value: number | null;
  length: number;
}

export interface OctaveUpToken {
  type: 'octaveUp';
  length: number;
}

export interface OctaveDownToken {
  type: 'octaveDown';
  length: number;
}

export interface InstrumentToken {
  type: 'instrument';
  value: number | null;
  length: number;
}

export interface ChordNote {
  note: string;
  accidental: string;
}

export interface ChordToken {
  type: 'chord';
  notes: ChordNote[];
  duration: number | null;
  dots: number;
  length: number;
}

export type ASTToken = 
  | NoteToken 
  | ChordToken
  | RestToken 
  | LengthToken 
  | OctaveToken 
  | OctaveUpToken 
  | OctaveDownToken 
  | InstrumentToken;

/**
 * Converts MML string into an Abstract Syntax Tree using Rust WASM
 * 
 * Note: WASM must be initialized before calling this function.
 * In tests, this is handled by test/setup.js
 * In browser, WASM initialization should be done before calling this function
 * (e.g., by importing and awaiting the init function from pkg/tonejs_mml_to_json.js)
 * 
 * @param mml - MML (Music Macro Language) string to parse
 * @returns Array of AST tokens
 */
export function mml2ast(mml: string): ASTToken[] {
  const resultJson = mml2ast_wasm(mml);
  const result = JSON.parse(resultJson);
  
  // Check for error response
  if (result.error) {
    throw new Error(`MML parsing error: ${result.error}`);
  }
  
  return result as ASTToken[];
}
