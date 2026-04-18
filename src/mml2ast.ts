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

export interface TempoToken {
  type: 'tempo';
  value: number | null;
  length: number;
}

export interface KeyTransposeToken {
  type: 'keyTranspose';
  value: number | null;
  length: number;
}

export interface ChordNote {
  note: string;
  accidental: string;
  octaveOffset?: number;
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
  | InstrumentToken
  | TempoToken
  | KeyTransposeToken;

let parser: TreeSitter.Parser | null = null;
let parserInitialized = false;

/**
 * Initialize the Tree-sitter parser
 * This must be called before using mml2ast
 * @param wasmPath - Optional custom path to the WASM file (for Node.js/testing)
 */
export async function initParser(wasmPath?: string): Promise<void> {
  if (parserInitialized) {
    return;
  }

  await TreeSitter.Parser.init();
  parser = new TreeSitter.Parser();
  
  // Load the MML language from the generated WASM file
  // Use custom path if provided (for Node.js/testing), otherwise use default path
  // For browser, construct path relative to this module's location to support subdirectory deployments
  let wasmFile = wasmPath;
  if (!wasmFile) {
    if (typeof window !== 'undefined' && import.meta?.url) {
      // Browser with ES modules: resolve relative to this module
      wasmFile = new URL('./tree-sitter-mml/tree-sitter-mml.wasm', import.meta.url).href;
    } else {
      // Node.js or fallback: use relative path
      wasmFile = 'tree-sitter-mml/tree-sitter-mml.wasm';
    }
  }
  const Lang = await TreeSitter.Language.load(wasmFile);
  parser.setLanguage(Lang);
  
  parserInitialized = true;
}

/**
 * Convert Tree-sitter node to CST JSON format.
 *
 * Note: The checked-in parser WASM may lag behind grammar.js. We normalize the
 * emitted CST so downstream Rust code consistently receives chord-local octave
 * changes as ordered chord children.
 */
function noteToChordNoteCSTJson(node: TreeSitter.Node): any {
  const chordNote = nodeToCSTJson(node);
  chordNote.type = 'chord_note';
  return chordNote;
}

function notePitchToNoteCSTJson(node: TreeSitter.Node): any {
  return {
    type: 'note',
    text: node.text,
    children: [],
    fields: {
      pitch: [nodeToCSTJson(node)]
    }
  };
}

function chordToCSTJson(node: TreeSitter.Node): any {
  const result: any = {
    type: 'chord',
    text: node.text,
    children: [],
    fields: {}
  };

  for (let i = 0; i < node.namedChildCount; i++) {
    const child = node.namedChild(i);
    if (!child) {
      continue;
    }

    const fieldName = node.fieldNameForNamedChild(i);

    if (fieldName === 'notes' || child.type === 'chord_note') {
      result.children.push(nodeToCSTJson(child));
      continue;
    }

    if (fieldName === 'dots' || child.type === 'dots') {
      if (!result.fields.dots) {
        result.fields.dots = [];
      }
      result.fields.dots.push(nodeToCSTJson(child));
      continue;
    }

    if (child.type === 'ERROR' && child.namedChildCount === 1) {
      const recoveredNode = child.namedChild(0);
      if (recoveredNode?.type === 'octave_up' || recoveredNode?.type === 'octave_down') {
        result.children.push(nodeToCSTJson(recoveredNode));
        continue;
      }
    }

    result.children.push(nodeToCSTJson(child));
  }

  return result;
}

function sourceFileToCSTJson(node: TreeSitter.Node): any {
  const result: any = {
    type: node.type,
    text: node.text,
    children: [],
    fields: {}
  };

  for (let i = 0; i < node.namedChildCount; i++) {
    const child = node.namedChild(i);
    if (!child) {
      continue;
    }

    const isOpeningQuoteError = child.type === 'ERROR' && child.text === "'";
    const isPartialChord = child.type === 'chord' && child.text.startsWith("'") && !child.text.endsWith("'");

    if (isOpeningQuoteError || isPartialChord) {
      const recoveredChords: any[] = [];
      let chordChildren: any[] = [];
      let chordText = child.text;

      const pushRecoveredChord = () => {
        if (chordChildren.length === 0) {
          return;
        }

        recoveredChords.push({
          type: 'chord',
          text: chordText,
          children: chordChildren,
          fields: {}
        });
      };

      if (isPartialChord) {
        const partialChord = chordToCSTJson(child);
        chordChildren.push(...partialChord.children);
        chordText = partialChord.text;
      }

      let closed = false;
      const trailingChildren: any[] = [];
      while (i + 1 < node.namedChildCount) {
        i += 1;
        const innerNode = node.namedChild(i);
        if (!innerNode) {
          continue;
        }

        if (innerNode.type === 'chord' && innerNode.text === "''") {
          chordText += "'";
          pushRecoveredChord();
          chordChildren = [];
          chordText = "'";
          continue;
        }

        if (innerNode.type === 'ERROR' && innerNode.text.startsWith("'")) {
          chordText += "'";
          for (let j = 0; j < innerNode.namedChildCount; j++) {
            const trailingNode = innerNode.namedChild(j);
            if (trailingNode) {
              if (trailingNode.type === 'note_pitch') {
                trailingChildren.push(notePitchToNoteCSTJson(trailingNode));
              } else {
                trailingChildren.push(nodeToCSTJson(trailingNode));
              }
            }
          }
          closed = true;
          break;
        }

        chordText += innerNode.text;

        if (innerNode.type === 'note') {
          chordChildren.push(noteToChordNoteCSTJson(innerNode));
          continue;
        }

        if (innerNode.type === 'octave_up' || innerNode.type === 'octave_down') {
          chordChildren.push(nodeToCSTJson(innerNode));
          continue;
        }

        if (innerNode.type === 'ERROR' && innerNode.namedChildCount === 1) {
          const recoveredNode = innerNode.namedChild(0);
          if (recoveredNode?.type === 'octave_up' || recoveredNode?.type === 'octave_down') {
            chordChildren.push(nodeToCSTJson(recoveredNode));
          }
        }
      }

      if (closed || isPartialChord) {
        pushRecoveredChord();
        result.children.push(...recoveredChords);
        result.children.push(...trailingChildren);
        continue;
      }
    }

    result.children.push(nodeToCSTJson(child));
  }

  return result;
}

function nodeToCSTJson(node: TreeSitter.Node): any {
  if (node.type === 'source_file') {
    return sourceFileToCSTJson(node);
  }

  if (node.type === 'chord') {
    return chordToCSTJson(node);
  }

  const result: any = {
    type: node.type,
    text: node.text,
    children: [],
    fields: {}
  };

  for (let i = 0; i < node.namedChildCount; i++) {
    const child = node.namedChild(i);
    if (child) {
      const fieldName = node.fieldNameForNamedChild(i);
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

