/**
 * MML to AST converter
 * Parses MML string into an Abstract Syntax Tree
 */

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

export type ASTToken = 
  | NoteToken 
  | RestToken 
  | LengthToken 
  | OctaveToken 
  | OctaveUpToken 
  | OctaveDownToken 
  | InstrumentToken;

interface ParseDigitsResult {
  value: number | null;
  length: number;
}

/**
 * Helper function to parse consecutive digits from a string
 */
function parseDigits(mml: string, startIndex: number): ParseDigitsResult {
  let index = startIndex;
  let digitStr = '';
  
  while (index < mml.length && /\d/.test(mml[index])) {
    digitStr += mml[index];
    index++;
  }
  
  return {
    value: digitStr ? parseInt(digitStr, 10) : null,
    length: index - startIndex
  };
}

/**
 * Validates that a duration value is a valid musical duration
 */
function isValidDuration(duration: number | null): boolean {
  if (duration === null) return true;
  // Valid durations are powers of 2: 1, 2, 4, 8, 16, 32, 64, etc.
  return duration > 0 && (duration & (duration - 1)) === 0;
}

/**
 * Validates that an octave value is in a reasonable range
 */
function isValidOctave(octave: number | null): boolean {
  if (octave === null) return true;
  // Typical MIDI range is 0-10, but we'll allow 0-8 as reasonable
  return octave >= 0 && octave <= 8;
}

/**
 * Validates that an instrument value is non-negative
 */
function isValidInstrument(instrument: number | null): boolean {
  if (instrument === null) return true;
  return instrument >= 0;
}

export function mml2ast(mml: string): ASTToken[] {
  const tokens: ASTToken[] = [];
  let index = 0;

  // Parse MML string character by character
  while (index < mml.length) {
    const char = mml[index];

    // Skip whitespace
    if (/\s/.test(char)) {
      index++;
      continue;
    }

    // Note commands: c, d, e, f, g, a, b
    if (/[cdefgab]/.test(char)) {
      const token = parseNote(mml, index);
      tokens.push(token);
      index += token.length;
      continue;
    }

    // Rest command: r
    if (char === 'r') {
      const token = parseRest(mml, index);
      tokens.push(token);
      index += token.length;
      continue;
    }

    // Length command: l
    if (char === 'l') {
      const token = parseLength(mml, index);
      tokens.push(token);
      index += token.length;
      continue;
    }

    // Octave command: o
    if (char === 'o') {
      const token = parseOctave(mml, index);
      tokens.push(token);
      index += token.length;
      continue;
    }

    // Octave up: <
    // Note: This project uses non-standard MML convention where < increases octave
    // This follows the existing mml2json.js implementation in this codebase
    if (char === '<') {
      tokens.push({ type: 'octaveUp', length: 1 });
      index++;
      continue;
    }

    // Octave down: >
    // Note: This project uses non-standard MML convention where > decreases octave
    // This follows the existing mml2json.js implementation in this codebase
    if (char === '>') {
      tokens.push({ type: 'octaveDown', length: 1 });
      index++;
      continue;
    }

    // Instrument command: @
    if (char === '@') {
      const token = parseInstrument(mml, index);
      tokens.push(token);
      index += token.length;
      continue;
    }

    // Unknown character, skip
    index++;
  }

  return tokens;
}

function parseNote(mml: string, startIndex: number): NoteToken {
  let index = startIndex + 1; // Skip the note character
  const note = mml[startIndex];
  let accidental = '';
  let duration: number | null = null;
  let dots = 0;

  // Parse accidentals (+ or -)
  while (index < mml.length && /[+-]/.test(mml[index])) {
    accidental += mml[index];
    index++;
  }

  // Parse duration (number)
  const digitResult = parseDigits(mml, index);
  duration = digitResult.value;
  index += digitResult.length;
  
  // Validate duration
  if (!isValidDuration(duration)) {
    console.warn(`mml2ast: Invalid duration '${duration}' at position ${startIndex}. Duration should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)`);
  }

  // Parse dots
  while (index < mml.length && mml[index] === '.') {
    dots++;
    index++;
  }

  return {
    type: 'note',
    note,
    accidental,
    duration,
    dots,
    length: index - startIndex
  };
}

function parseRest(mml: string, startIndex: number): RestToken {
  let index = startIndex + 1; // Skip 'r'
  let duration: number | null = null;
  let dots = 0;

  // Parse duration (number)
  const digitResult = parseDigits(mml, index);
  duration = digitResult.value;
  index += digitResult.length;
  
  // Validate duration
  if (!isValidDuration(duration)) {
    console.warn(`mml2ast: Invalid duration '${duration}' for rest at position ${startIndex}. Duration should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)`);
  }

  // Parse dots
  while (index < mml.length && mml[index] === '.') {
    dots++;
    index++;
  }

  return {
    type: 'rest',
    duration,
    dots,
    length: index - startIndex
  };
}

function parseLength(mml: string, startIndex: number): LengthToken {
  let index = startIndex + 1; // Skip 'l'

  // Parse duration (number)
  const digitResult = parseDigits(mml, index);
  const value = digitResult.value;
  index += digitResult.length;
  
  // Validate duration
  if (!isValidDuration(value)) {
    console.warn(`mml2ast: Invalid length '${value}' at position ${startIndex}. Length should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)`);
  }

  return {
    type: 'length',
    value,
    length: index - startIndex
  };
}

function parseOctave(mml: string, startIndex: number): OctaveToken {
  let index = startIndex + 1; // Skip 'o'

  // Parse octave number
  const digitResult = parseDigits(mml, index);
  const value = digitResult.value;
  index += digitResult.length;
  
  // Validate octave
  if (!isValidOctave(value)) {
    console.warn(`mml2ast: Invalid octave '${value}' at position ${startIndex}. Octave should be between 0 and 8.`);
  }

  return {
    type: 'octave',
    value,
    length: index - startIndex
  };
}

function parseInstrument(mml: string, startIndex: number): InstrumentToken {
  let index = startIndex + 1; // Skip '@'

  // Parse instrument number
  const digitResult = parseDigits(mml, index);
  const value = digitResult.value;
  index += digitResult.length;
  
  // Validate instrument
  if (!isValidInstrument(value)) {
    console.warn(`mml2ast: Invalid instrument '${value}' at position ${startIndex}. Instrument should be a non-negative number.`);
  }

  return {
    type: 'instrument',
    value,
    length: index - startIndex
  };
}
