/**
 * MML to AST converter
 * Parses MML string into an Abstract Syntax Tree
 */

export function mml2ast(mml) {
  const tokens = [];
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
    if (char === '<') {
      tokens.push({ type: 'octaveUp', length: 1 });
      index++;
      continue;
    }

    // Octave down: >
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

function parseNote(mml, startIndex) {
  let index = startIndex + 1; // Skip the note character
  const note = mml[startIndex];
  let accidental = '';
  let duration = null;
  let dots = 0;

  // Parse accidentals (+ or -)
  while (index < mml.length && /[+-]/.test(mml[index])) {
    accidental += mml[index];
    index++;
  }

  // Parse duration (number)
  let durationStr = '';
  while (index < mml.length && /\d/.test(mml[index])) {
    durationStr += mml[index];
    index++;
  }
  if (durationStr) {
    duration = parseInt(durationStr, 10);
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

function parseRest(mml, startIndex) {
  let index = startIndex + 1; // Skip 'r'
  let duration = null;
  let dots = 0;

  // Parse duration (number)
  let durationStr = '';
  while (index < mml.length && /\d/.test(mml[index])) {
    durationStr += mml[index];
    index++;
  }
  if (durationStr) {
    duration = parseInt(durationStr, 10);
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

function parseLength(mml, startIndex) {
  let index = startIndex + 1; // Skip 'l'
  let durationStr = '';

  // Parse duration (number)
  while (index < mml.length && /\d/.test(mml[index])) {
    durationStr += mml[index];
    index++;
  }

  const value = durationStr ? parseInt(durationStr, 10) : null;

  return {
    type: 'length',
    value,
    length: index - startIndex
  };
}

function parseOctave(mml, startIndex) {
  let index = startIndex + 1; // Skip 'o'
  let octaveStr = '';

  // Parse octave number
  while (index < mml.length && /\d/.test(mml[index])) {
    octaveStr += mml[index];
    index++;
  }

  const value = octaveStr ? parseInt(octaveStr, 10) : null;

  return {
    type: 'octave',
    value,
    length: index - startIndex
  };
}

function parseInstrument(mml, startIndex) {
  let index = startIndex + 1; // Skip '@'
  let instrumentStr = '';

  // Parse instrument number
  while (index < mml.length && /\d/.test(mml[index])) {
    instrumentStr += mml[index];
    index++;
  }

  const value = instrumentStr ? parseInt(instrumentStr, 10) : null;

  return {
    type: 'instrument',
    value,
    length: index - startIndex
  };
}
