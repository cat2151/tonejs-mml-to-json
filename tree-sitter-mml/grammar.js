/**
 * Tree-sitter grammar for MML (Music Macro Language)
 * 
 * This grammar defines the syntax for parsing MML strings.
 * MML is a text-based music notation language used for defining melodies.
 * 
 * Syntax elements:
 * - Notes: c, d, e, f, g, a, b
 * - Accidentals: + (sharp), - (flat)
 * - Durations: numbers like 4, 8, 16
 * - Dots: . for dotted notes
 * - Rests: r
 * - Octave: o followed by number, < (octave up), > (octave down)
 * - Length: l followed by number (default note length)
 * - Instrument: @ followed by name or number
 * - Chords: notes enclosed in single quotes 'ceg'
 * - Track separator: ;
 */

module.exports = grammar({
  name: 'mml',

  extras: $ => [
    /\s/, // whitespace
  ],

  rules: {
    source_file: $ => repeat($._token),

    _token: $ => choice(
      $.note,
      $.rest,
      $.length_command,
      $.octave_command,
      $.octave_up,
      $.octave_down,
      $.instrument_command,
      $.chord,
      $.track_separator,
    ),

    // Note: c, d, e, f, g, a, b with optional accidentals, duration, and dots
    note: $ => seq(
      field('pitch', $.note_pitch),
      field('accidentals', repeat($.accidental)),
      optional(field('duration', $.duration)),
      field('dots', repeat($.dot)),
    ),

    note_pitch: $ => choice('c', 'd', 'e', 'f', 'g', 'a', 'b'),

    accidental: $ => choice('+', '-'),

    dot: $ => '.',

    duration: $ => /\d+/,

    // Rest: r with optional duration and dots
    rest: $ => seq(
      'r',
      optional(field('duration', $.duration)),
      field('dots', repeat($.dot)),
    ),

    // Length command: l followed by a number
    length_command: $ => seq(
      'l',
      field('value', $.duration),
    ),

    // Octave command: o followed by a number
    octave_command: $ => seq(
      'o',
      field('value', $.duration),
    ),

    // Octave up: <
    octave_up: $ => '<',

    // Octave down: >
    octave_down: $ => '>',

    // Instrument command: @ followed by name or number
    instrument_command: $ => seq(
      '@',
      field('name', $.instrument_name),
    ),

    instrument_name: $ => choice(
      /\d+/,
      /[A-Za-z][A-Za-z0-9]*/,
    ),

    // Chord: notes enclosed in single quotes 'ceg'
    chord: $ => seq(
      "'",
      field('notes', repeat1($.chord_note)),
      "'",
      optional(field('duration', $.duration)),
      field('dots', repeat($.dot)),
    ),

    chord_note: $ => seq(
      field('pitch', $.note_pitch),
      field('accidentals', repeat($.accidental)),
    ),

    // Track separator: ;
    track_separator: $ => ';',
  },
});
