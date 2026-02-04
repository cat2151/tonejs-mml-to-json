/**
 * Tree-sitter Grammar for MML (Music Macro Language)
 * 
 * This grammar defines the parsing rules for the MML language used in tonejs-mml-to-json.
 * It is the Single Source of Truth (SSOT) for the MML syntax.
 * 
 * Supported MML Commands:
 * - Notes: c, d, e, f, g, a, b
 * - Accidentals: + (sharp), - (flat), can be repeated (++, --)
 * - Duration: numbers like 4, 8, 16, 32 (after notes or rests)
 * - Dots: . for dotted notes (can be repeated: ., ..)
 * - Rest: r
 * - Length: l (sets default note length)
 * - Octave: o (sets octave), < (octave up), > (octave down)
 * - Instrument: @ followed by instrument name (e.g., @Synth, @FMSynth)
 * - Tempo: t or T (sets BPM, e.g., t120, T140)
 * - Volume: v or V (sets volume 0-127, e.g., v100, V80)
 * - Gate Time: q or Q (gate time percentage, e.g., q60, Q80)
 * - Key Transpose: kt (transposes subsequent notes, e.g., kt2, kt-3)
 * - Track separator: ; (for multi-track)
 * - Chords: 'notes' (e.g., 'ceg', 'c+eg-')
 */

module.exports = grammar({
  name: 'mml',

  extras: $ => [
    /\s/,  // Whitespace
  ],

  rules: {
    // Entry point: source file contains a sequence of commands
    source_file: $ => repeat(
      choice(
        $.note,
        $.chord,
        $.rest,
        $.length_command,
        $.octave_command,
        $.octave_up,
        $.octave_down,
        $.instrument_command,
        $.tempo_command,
        $.volume_command,
        $.gate_time_command,
        $.key_transpose_command,
        $.track_separator,
      )
    ),

    // Track separator: semicolon
    track_separator: $ => ';',

    // Note: c, d, e, f, g, a, b with optional accidentals, duration, and dots
    note: $ => seq(
      field('pitch', $.note_pitch),
      field('accidental', optional($.accidental)),
      field('duration', optional($.duration)),
      field('dots', optional($.dots)),
    ),

    note_pitch: $ => choice('c', 'd', 'e', 'f', 'g', 'a', 'b'),

    accidental: $ => choice(
      '+',
      '-',
      '++',
      '--',
    ),

    // Duration: numbers like 4, 8, 16, 32
    duration: $ => /[0-9]+/,

    // Dots: one or more dots
    dots: $ => /\.+/,

    // Rest: r with optional duration and dots
    rest: $ => seq(
      'r',
      field('duration', optional($.duration)),
      field('dots', optional($.dots)),
    ),

    // Length command: l followed by optional number
    length_command: $ => seq(
      'l',
      field('value', optional($.duration)),
    ),

    // Octave command: o followed by number
    octave_command: $ => seq(
      'o',
      field('value', optional($.duration)),
    ),

    // Octave up: <
    octave_up: $ => '<',

    // Octave down: >
    octave_down: $ => '>',

    // Tempo command: t or T followed by number (BPM)
    tempo_command: $ => seq(
      choice('t', 'T'),
      field('value', optional($.duration)),
    ),

    // Volume command: v or V followed by number (0-127)
    volume_command: $ => seq(
      choice('v', 'V'),
      field('value', optional($.duration)),
    ),

    // Gate time command: q or Q followed by number (percentage)
    gate_time_command: $ => seq(
      choice('q', 'Q'),
      field('value', optional($.duration)),
    ),

    // Key transpose command: kt followed by optional signed number (semitones)
    key_transpose_command: $ => seq(
      choice('kt', 'KT'),
      field('value', optional($.signed_number)),
    ),

    // Signed number: optional minus sign followed by digits
    signed_number: $ => /-?[0-9]+/,

    // Instrument command: @ followed by instrument name and optional JSON args
    instrument_command: $ => seq(
      '@',
      field('name', optional($.instrument_name)),
      field('args', optional($.json_args)),
    ),

    instrument_name: $ => /[A-Za-z][A-Za-z0-9]*/,

    // JSON arguments for instrument (e.g., for Sampler)
    // This regex matches balanced braces to handle nested JSON objects
    json_args: $ => /\{(?:[^{}]|\{[^}]*\})*\}/,

    // Chord: 'notes' with optional duration inside quotes and dots outside
    // Example: 'ceg', 'c+eg-', 'c4eg', 'c4eg'.
    chord: $ => seq(
      "'",
      field('notes', repeat1($.chord_note)),
      "'",
      field('dots', optional($.dots)),
    ),

    // Chord note: note pitch with optional accidental and optional duration
    chord_note: $ => seq(
      field('pitch', $.note_pitch),
      field('accidental', optional($.accidental)),
      field('duration', optional($.duration)),
    ),
  }
});
