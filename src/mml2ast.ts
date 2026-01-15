/**
 * MML to AST converter using Tree-sitter
 * 
 * This module uses web-tree-sitter for parsing in the browser and Node.js.
 * It follows the Tree-sitter approach where grammar.js is the Single Source of Truth (SSOT).
 */

import * as TreeSitter from 'web-tree-sitter';
import { cst_to_ast_wasm } from '../pkg/tonejs_mml_to_json.js';

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
  value: string | null;
  args?: string;
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

let parser: TreeSitter.Parser | null = null;
let parserInitialized = false;

/**
 * Initialize the Tree-sitter parser
 * This must be called before using mml2ast
 */
export async function initParser(): Promise<void> {
  if (parserInitialized) {
    return;
  }

  await TreeSitter.Parser.init();
  parser = new TreeSitter.Parser();
  
  // Load the MML language from the generated WASM file
  // The path is relative to the dist directory
  const Lang = await TreeSitter.Language.load('tree-sitter-mml/tree-sitter-mml.wasm');
  parser.setLanguage(Lang);
  
  parserInitialized = true;
}

/**
 * Convert Tree-sitter node to CST JSON format
 */
function nodeToCSTJson(node: TreeSitter.Node): any {
  const result: any = {
    type: node.type,
    text: node.text,
    children: [],
    fields: {}
  };

  // Process named children
  for (let i = 0; i < node.namedChildCount; i++) {
    const child = node.namedChild(i);
    if (child) {
      const fieldName = node.fieldNameForChild(i);
      const childJson = nodeToCSTJson(child);
      
      if (fieldName) {
        if (!result.fields[fieldName]) {
          result.fields[fieldName] = [];
        }
        result.fields[fieldName].push(childJson);
      } else {
        result.children.push(childJson);
      }
    }
  }

  return result;
}

/**
 * Converts MML string into an Abstract Syntax Tree using Tree-sitter
 * 
 * Note: Parser must be initialized before calling this function via initParser()
 * 
 * @param mml - MML (Music Macro Language) string to parse
 * @returns Array of AST tokens
 */
export function mml2ast(mml: string): ASTToken[] {
  if (!parser || !parserInitialized) {
    throw new Error('Parser not initialized. Call initParser() first.');
  }

  const tree = parser.parse(mml);
  if (!tree) {
    throw new Error('Failed to parse MML');
  }
  
  const root = tree.rootNode;
  
  // Convert Tree-sitter CST to JSON format
  const cstJson = nodeToCSTJson(root);
  
  // Use Rust WASM function to convert CST to AST
  const astJson = cst_to_ast_wasm(JSON.stringify(cstJson));
  const result = JSON.parse(astJson);
  
  // Check for error response
  if (result.error) {
    throw new Error(`MML parsing error: ${result.error}`);
  }
  
  return result as ASTToken[];
}

