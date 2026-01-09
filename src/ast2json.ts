/**
 * AST to JSON converter using Rust WASM
 * 
 * This module uses the Rust WASM implementation, consolidating the duplicate
 * TypeScript implementation (issue #26).
 * 
 * The previous pure TypeScript implementation has been moved to ast2json-typescript-impl.ts
 * for reference, but is no longer used.
 */

import { ast2json_wasm } from '../pkg/tonejs_mml_to_json.js';
import type { ASTToken } from './mml2ast';

// Type definitions for Tone.js command objects
export interface CreateNodeCommand {
  eventType: 'createNode';
  nodeId: number;
  nodeType: string;
  args?: any[];
}

export interface ConnectCommand {
  eventType: 'connect';
  nodeId: number;
  connectTo: string | number;
}

export interface TriggerAttackReleaseCommand {
  eventType: 'triggerAttackRelease';
  nodeId: number;
  args: [string, string, string];
}

export interface DepthRampToCommand {
  eventType: 'depth.rampTo';
  nodeId: number;
  args: any[];
}

export type ToneCommand = CreateNodeCommand | ConnectCommand | TriggerAttackReleaseCommand | DepthRampToCommand;

/**
 * Converts AST to Tone.js compatible JSON format using Rust WASM
 * 
 * Note: WASM must be initialized before calling this function.
 * In tests, this is handled by test/setup.js
 * In browser, WASM initialization should be done before calling this function
 * (e.g., by importing and awaiting the init function from pkg/tonejs_mml_to_json.js)
 * 
 * @param ast - Array of AST tokens to convert
 * @returns Array of Tone.js commands
 */
export function ast2json(ast: ASTToken[]): ToneCommand[] {
  const astJson = JSON.stringify(ast);
  const resultJson = ast2json_wasm(astJson);
  const result = JSON.parse(resultJson);
  
  // Check for error response
  if (result.error) {
    throw new Error(`AST to JSON conversion error: ${result.error}`);
  }
  
  return result as ToneCommand[];
}
