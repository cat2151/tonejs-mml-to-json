#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 36
#define LARGE_STATE_COUNT 6
#define SYMBOL_COUNT 36
#define ALIAS_COUNT 0
#define TOKEN_COUNT 24
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 8
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 18

enum {
  sym_track_separator = 1,
  anon_sym_c = 2,
  anon_sym_d = 3,
  anon_sym_e = 4,
  anon_sym_f = 5,
  anon_sym_g = 6,
  anon_sym_a = 7,
  anon_sym_b = 8,
  anon_sym_PLUS = 9,
  anon_sym_DASH = 10,
  anon_sym_PLUS_PLUS = 11,
  anon_sym_DASH_DASH = 12,
  sym_duration = 13,
  sym_dots = 14,
  anon_sym_r = 15,
  anon_sym_l = 16,
  anon_sym_o = 17,
  sym_octave_up = 18,
  sym_octave_down = 19,
  anon_sym_AT = 20,
  sym_instrument_name = 21,
  sym_json_args = 22,
  anon_sym_SQUOTE = 23,
  sym_source_file = 24,
  sym_note = 25,
  sym_note_pitch = 26,
  sym_accidental = 27,
  sym_rest = 28,
  sym_length_command = 29,
  sym_octave_command = 30,
  sym_instrument_command = 31,
  sym_chord = 32,
  sym_chord_note = 33,
  aux_sym_source_file_repeat1 = 34,
  aux_sym_chord_repeat1 = 35,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_track_separator] = "track_separator",
  [anon_sym_c] = "c",
  [anon_sym_d] = "d",
  [anon_sym_e] = "e",
  [anon_sym_f] = "f",
  [anon_sym_g] = "g",
  [anon_sym_a] = "a",
  [anon_sym_b] = "b",
  [anon_sym_PLUS] = "+",
  [anon_sym_DASH] = "-",
  [anon_sym_PLUS_PLUS] = "++",
  [anon_sym_DASH_DASH] = "--",
  [sym_duration] = "duration",
  [sym_dots] = "dots",
  [anon_sym_r] = "r",
  [anon_sym_l] = "l",
  [anon_sym_o] = "o",
  [sym_octave_up] = "octave_up",
  [sym_octave_down] = "octave_down",
  [anon_sym_AT] = "@",
  [sym_instrument_name] = "instrument_name",
  [sym_json_args] = "json_args",
  [anon_sym_SQUOTE] = "'",
  [sym_source_file] = "source_file",
  [sym_note] = "note",
  [sym_note_pitch] = "note_pitch",
  [sym_accidental] = "accidental",
  [sym_rest] = "rest",
  [sym_length_command] = "length_command",
  [sym_octave_command] = "octave_command",
  [sym_instrument_command] = "instrument_command",
  [sym_chord] = "chord",
  [sym_chord_note] = "chord_note",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_chord_repeat1] = "chord_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_track_separator] = sym_track_separator,
  [anon_sym_c] = anon_sym_c,
  [anon_sym_d] = anon_sym_d,
  [anon_sym_e] = anon_sym_e,
  [anon_sym_f] = anon_sym_f,
  [anon_sym_g] = anon_sym_g,
  [anon_sym_a] = anon_sym_a,
  [anon_sym_b] = anon_sym_b,
  [anon_sym_PLUS] = anon_sym_PLUS,
  [anon_sym_DASH] = anon_sym_DASH,
  [anon_sym_PLUS_PLUS] = anon_sym_PLUS_PLUS,
  [anon_sym_DASH_DASH] = anon_sym_DASH_DASH,
  [sym_duration] = sym_duration,
  [sym_dots] = sym_dots,
  [anon_sym_r] = anon_sym_r,
  [anon_sym_l] = anon_sym_l,
  [anon_sym_o] = anon_sym_o,
  [sym_octave_up] = sym_octave_up,
  [sym_octave_down] = sym_octave_down,
  [anon_sym_AT] = anon_sym_AT,
  [sym_instrument_name] = sym_instrument_name,
  [sym_json_args] = sym_json_args,
  [anon_sym_SQUOTE] = anon_sym_SQUOTE,
  [sym_source_file] = sym_source_file,
  [sym_note] = sym_note,
  [sym_note_pitch] = sym_note_pitch,
  [sym_accidental] = sym_accidental,
  [sym_rest] = sym_rest,
  [sym_length_command] = sym_length_command,
  [sym_octave_command] = sym_octave_command,
  [sym_instrument_command] = sym_instrument_command,
  [sym_chord] = sym_chord,
  [sym_chord_note] = sym_chord_note,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_chord_repeat1] = aux_sym_chord_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_track_separator] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_c] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_d] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_e] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_f] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_g] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_a] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_b] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_PLUS] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DASH] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_PLUS_PLUS] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DASH_DASH] = {
    .visible = true,
    .named = false,
  },
  [sym_duration] = {
    .visible = true,
    .named = true,
  },
  [sym_dots] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_r] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_l] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_o] = {
    .visible = true,
    .named = false,
  },
  [sym_octave_up] = {
    .visible = true,
    .named = true,
  },
  [sym_octave_down] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_AT] = {
    .visible = true,
    .named = false,
  },
  [sym_instrument_name] = {
    .visible = true,
    .named = true,
  },
  [sym_json_args] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_SQUOTE] = {
    .visible = true,
    .named = false,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_note] = {
    .visible = true,
    .named = true,
  },
  [sym_note_pitch] = {
    .visible = true,
    .named = true,
  },
  [sym_accidental] = {
    .visible = true,
    .named = true,
  },
  [sym_rest] = {
    .visible = true,
    .named = true,
  },
  [sym_length_command] = {
    .visible = true,
    .named = true,
  },
  [sym_octave_command] = {
    .visible = true,
    .named = true,
  },
  [sym_instrument_command] = {
    .visible = true,
    .named = true,
  },
  [sym_chord] = {
    .visible = true,
    .named = true,
  },
  [sym_chord_note] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_chord_repeat1] = {
    .visible = false,
    .named = false,
  },
};

enum {
  field_accidental = 1,
  field_args = 2,
  field_dots = 3,
  field_duration = 4,
  field_name = 5,
  field_notes = 6,
  field_pitch = 7,
  field_value = 8,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_accidental] = "accidental",
  [field_args] = "args",
  [field_dots] = "dots",
  [field_duration] = "duration",
  [field_name] = "name",
  [field_notes] = "notes",
  [field_pitch] = "pitch",
  [field_value] = "value",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 1},
  [4] = {.index = 3, .length = 1},
  [5] = {.index = 4, .length = 1},
  [6] = {.index = 5, .length = 1},
  [7] = {.index = 6, .length = 2},
  [8] = {.index = 8, .length = 2},
  [9] = {.index = 10, .length = 2},
  [10] = {.index = 12, .length = 2},
  [11] = {.index = 14, .length = 2},
  [12] = {.index = 16, .length = 1},
  [13] = {.index = 17, .length = 3},
  [14] = {.index = 20, .length = 3},
  [15] = {.index = 23, .length = 3},
  [16] = {.index = 26, .length = 2},
  [17] = {.index = 28, .length = 4},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_pitch, 0},
  [1] =
    {field_duration, 1},
  [2] =
    {field_dots, 1},
  [3] =
    {field_value, 1},
  [4] =
    {field_name, 1},
  [5] =
    {field_args, 1},
  [6] =
    {field_duration, 1},
    {field_pitch, 0},
  [8] =
    {field_dots, 1},
    {field_pitch, 0},
  [10] =
    {field_accidental, 1},
    {field_pitch, 0},
  [12] =
    {field_dots, 2},
    {field_duration, 1},
  [14] =
    {field_args, 2},
    {field_name, 1},
  [16] =
    {field_notes, 1},
  [17] =
    {field_dots, 2},
    {field_duration, 1},
    {field_pitch, 0},
  [20] =
    {field_accidental, 1},
    {field_duration, 2},
    {field_pitch, 0},
  [23] =
    {field_accidental, 1},
    {field_dots, 2},
    {field_pitch, 0},
  [26] =
    {field_dots, 3},
    {field_notes, 1},
  [28] =
    {field_accidental, 1},
    {field_dots, 3},
    {field_duration, 2},
    {field_pitch, 0},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
  [27] = 27,
  [28] = 28,
  [29] = 29,
  [30] = 30,
  [31] = 31,
  [32] = 32,
  [33] = 33,
  [34] = 34,
  [35] = 35,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(3);
      if (lookahead == '\'') ADVANCE(36);
      if (lookahead == '+') ADVANCE(19);
      if (lookahead == '-') ADVANCE(20);
      if (lookahead == '.') ADVANCE(24);
      if (lookahead == ';') ADVANCE(4);
      if (lookahead == '<') ADVANCE(31);
      if (lookahead == '>') ADVANCE(32);
      if (lookahead == '@') ADVANCE(33);
      if (lookahead == 'a') ADVANCE(16);
      if (lookahead == 'b') ADVANCE(18);
      if (lookahead == 'c') ADVANCE(6);
      if (lookahead == 'd') ADVANCE(8);
      if (lookahead == 'e') ADVANCE(10);
      if (lookahead == 'f') ADVANCE(12);
      if (lookahead == 'g') ADVANCE(14);
      if (lookahead == 'l') ADVANCE(28);
      if (lookahead == 'o') ADVANCE(30);
      if (lookahead == 'r') ADVANCE(26);
      if (lookahead == '{') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(23);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('h' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 1:
      if (lookahead == '}') ADVANCE(35);
      if (lookahead != 0) ADVANCE(1);
      END_STATE();
    case 2:
      if (eof) ADVANCE(3);
      if (lookahead == '\'') ADVANCE(36);
      if (lookahead == '+') ADVANCE(19);
      if (lookahead == '-') ADVANCE(20);
      if (lookahead == '.') ADVANCE(24);
      if (lookahead == ';') ADVANCE(4);
      if (lookahead == '<') ADVANCE(31);
      if (lookahead == '>') ADVANCE(32);
      if (lookahead == '@') ADVANCE(33);
      if (lookahead == 'a') ADVANCE(15);
      if (lookahead == 'b') ADVANCE(17);
      if (lookahead == 'c') ADVANCE(5);
      if (lookahead == 'd') ADVANCE(7);
      if (lookahead == 'e') ADVANCE(9);
      if (lookahead == 'f') ADVANCE(11);
      if (lookahead == 'g') ADVANCE(13);
      if (lookahead == 'l') ADVANCE(27);
      if (lookahead == 'o') ADVANCE(29);
      if (lookahead == 'r') ADVANCE(25);
      if (lookahead == '{') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(2)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(23);
      END_STATE();
    case 3:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(sym_track_separator);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(anon_sym_c);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_c);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(anon_sym_d);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(anon_sym_d);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_e);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(anon_sym_e);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(anon_sym_f);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_f);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_g);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_g);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_a);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_a);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_b);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_PLUS);
      if (lookahead == '+') ADVANCE(21);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_DASH);
      if (lookahead == '-') ADVANCE(22);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_PLUS_PLUS);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_DASH_DASH);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym_duration);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(23);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_dots);
      if (lookahead == '.') ADVANCE(24);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_r);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_r);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_l);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_l);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_o);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(anon_sym_o);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(sym_octave_up);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(sym_octave_down);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(sym_instrument_name);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(34);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(sym_json_args);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(anon_sym_SQUOTE);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 2},
  [2] = {.lex_state = 2},
  [3] = {.lex_state = 2},
  [4] = {.lex_state = 2},
  [5] = {.lex_state = 2},
  [6] = {.lex_state = 2},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 2},
  [9] = {.lex_state = 2},
  [10] = {.lex_state = 2},
  [11] = {.lex_state = 2},
  [12] = {.lex_state = 2},
  [13] = {.lex_state = 2},
  [14] = {.lex_state = 2},
  [15] = {.lex_state = 2},
  [16] = {.lex_state = 2},
  [17] = {.lex_state = 2},
  [18] = {.lex_state = 2},
  [19] = {.lex_state = 2},
  [20] = {.lex_state = 2},
  [21] = {.lex_state = 2},
  [22] = {.lex_state = 2},
  [23] = {.lex_state = 2},
  [24] = {.lex_state = 2},
  [25] = {.lex_state = 2},
  [26] = {.lex_state = 2},
  [27] = {.lex_state = 2},
  [28] = {.lex_state = 2},
  [29] = {.lex_state = 2},
  [30] = {.lex_state = 2},
  [31] = {.lex_state = 2},
  [32] = {.lex_state = 2},
  [33] = {.lex_state = 2},
  [34] = {.lex_state = 2},
  [35] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_track_separator] = ACTIONS(1),
    [anon_sym_c] = ACTIONS(1),
    [anon_sym_d] = ACTIONS(1),
    [anon_sym_e] = ACTIONS(1),
    [anon_sym_f] = ACTIONS(1),
    [anon_sym_g] = ACTIONS(1),
    [anon_sym_a] = ACTIONS(1),
    [anon_sym_b] = ACTIONS(1),
    [anon_sym_PLUS] = ACTIONS(1),
    [anon_sym_DASH] = ACTIONS(1),
    [anon_sym_PLUS_PLUS] = ACTIONS(1),
    [anon_sym_DASH_DASH] = ACTIONS(1),
    [sym_duration] = ACTIONS(1),
    [sym_dots] = ACTIONS(1),
    [anon_sym_r] = ACTIONS(1),
    [anon_sym_l] = ACTIONS(1),
    [anon_sym_o] = ACTIONS(1),
    [sym_octave_up] = ACTIONS(1),
    [sym_octave_down] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [sym_instrument_name] = ACTIONS(1),
    [sym_json_args] = ACTIONS(1),
    [anon_sym_SQUOTE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(35),
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_instrument_command] = STATE(2),
    [sym_chord] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(3),
    [sym_track_separator] = ACTIONS(5),
    [anon_sym_c] = ACTIONS(7),
    [anon_sym_d] = ACTIONS(7),
    [anon_sym_e] = ACTIONS(7),
    [anon_sym_f] = ACTIONS(7),
    [anon_sym_g] = ACTIONS(7),
    [anon_sym_a] = ACTIONS(7),
    [anon_sym_b] = ACTIONS(7),
    [anon_sym_r] = ACTIONS(9),
    [anon_sym_l] = ACTIONS(11),
    [anon_sym_o] = ACTIONS(13),
    [sym_octave_up] = ACTIONS(5),
    [sym_octave_down] = ACTIONS(5),
    [anon_sym_AT] = ACTIONS(15),
    [anon_sym_SQUOTE] = ACTIONS(17),
  },
  [2] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(19),
    [sym_track_separator] = ACTIONS(21),
    [anon_sym_c] = ACTIONS(7),
    [anon_sym_d] = ACTIONS(7),
    [anon_sym_e] = ACTIONS(7),
    [anon_sym_f] = ACTIONS(7),
    [anon_sym_g] = ACTIONS(7),
    [anon_sym_a] = ACTIONS(7),
    [anon_sym_b] = ACTIONS(7),
    [anon_sym_r] = ACTIONS(9),
    [anon_sym_l] = ACTIONS(11),
    [anon_sym_o] = ACTIONS(13),
    [sym_octave_up] = ACTIONS(21),
    [sym_octave_down] = ACTIONS(21),
    [anon_sym_AT] = ACTIONS(15),
    [anon_sym_SQUOTE] = ACTIONS(17),
  },
  [3] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(23),
    [sym_track_separator] = ACTIONS(25),
    [anon_sym_c] = ACTIONS(28),
    [anon_sym_d] = ACTIONS(28),
    [anon_sym_e] = ACTIONS(28),
    [anon_sym_f] = ACTIONS(28),
    [anon_sym_g] = ACTIONS(28),
    [anon_sym_a] = ACTIONS(28),
    [anon_sym_b] = ACTIONS(28),
    [anon_sym_r] = ACTIONS(31),
    [anon_sym_l] = ACTIONS(34),
    [anon_sym_o] = ACTIONS(37),
    [sym_octave_up] = ACTIONS(25),
    [sym_octave_down] = ACTIONS(25),
    [anon_sym_AT] = ACTIONS(40),
    [anon_sym_SQUOTE] = ACTIONS(43),
  },
  [4] = {
    [sym_accidental] = STATE(8),
    [ts_builtin_sym_end] = ACTIONS(46),
    [sym_track_separator] = ACTIONS(46),
    [anon_sym_c] = ACTIONS(46),
    [anon_sym_d] = ACTIONS(46),
    [anon_sym_e] = ACTIONS(46),
    [anon_sym_f] = ACTIONS(46),
    [anon_sym_g] = ACTIONS(46),
    [anon_sym_a] = ACTIONS(46),
    [anon_sym_b] = ACTIONS(46),
    [anon_sym_PLUS] = ACTIONS(48),
    [anon_sym_DASH] = ACTIONS(48),
    [anon_sym_PLUS_PLUS] = ACTIONS(50),
    [anon_sym_DASH_DASH] = ACTIONS(50),
    [sym_duration] = ACTIONS(52),
    [sym_dots] = ACTIONS(54),
    [anon_sym_r] = ACTIONS(46),
    [anon_sym_l] = ACTIONS(46),
    [anon_sym_o] = ACTIONS(46),
    [sym_octave_up] = ACTIONS(46),
    [sym_octave_down] = ACTIONS(46),
    [anon_sym_AT] = ACTIONS(46),
    [anon_sym_SQUOTE] = ACTIONS(46),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(56),
    [sym_track_separator] = ACTIONS(56),
    [anon_sym_c] = ACTIONS(56),
    [anon_sym_d] = ACTIONS(56),
    [anon_sym_e] = ACTIONS(56),
    [anon_sym_f] = ACTIONS(56),
    [anon_sym_g] = ACTIONS(56),
    [anon_sym_a] = ACTIONS(56),
    [anon_sym_b] = ACTIONS(56),
    [anon_sym_PLUS] = ACTIONS(58),
    [anon_sym_DASH] = ACTIONS(58),
    [anon_sym_PLUS_PLUS] = ACTIONS(56),
    [anon_sym_DASH_DASH] = ACTIONS(56),
    [sym_duration] = ACTIONS(56),
    [sym_dots] = ACTIONS(56),
    [anon_sym_r] = ACTIONS(56),
    [anon_sym_l] = ACTIONS(56),
    [anon_sym_o] = ACTIONS(56),
    [sym_octave_up] = ACTIONS(56),
    [sym_octave_down] = ACTIONS(56),
    [anon_sym_AT] = ACTIONS(56),
    [anon_sym_SQUOTE] = ACTIONS(56),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 3,
    ACTIONS(62), 1,
      sym_duration,
    ACTIONS(64), 1,
      sym_dots,
    ACTIONS(60), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [25] = 4,
    ACTIONS(70), 1,
      sym_instrument_name,
    ACTIONS(72), 1,
      sym_json_args,
    ACTIONS(66), 6,
      ts_builtin_sym_end,
      sym_track_separator,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
    ACTIONS(68), 10,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
  [52] = 3,
    ACTIONS(76), 1,
      sym_duration,
    ACTIONS(78), 1,
      sym_dots,
    ACTIONS(74), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [77] = 1,
    ACTIONS(80), 18,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      sym_duration,
      sym_dots,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [98] = 2,
    ACTIONS(84), 1,
      sym_duration,
    ACTIONS(82), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [120] = 2,
    ACTIONS(88), 1,
      sym_duration,
    ACTIONS(86), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [142] = 2,
    ACTIONS(92), 1,
      sym_dots,
    ACTIONS(90), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [164] = 2,
    ACTIONS(96), 1,
      sym_dots,
    ACTIONS(94), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [186] = 2,
    ACTIONS(100), 1,
      sym_dots,
    ACTIONS(98), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [208] = 2,
    ACTIONS(104), 1,
      sym_dots,
    ACTIONS(102), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [230] = 2,
    ACTIONS(108), 1,
      sym_json_args,
    ACTIONS(106), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [252] = 1,
    ACTIONS(110), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [271] = 1,
    ACTIONS(112), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [290] = 1,
    ACTIONS(114), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [309] = 1,
    ACTIONS(116), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [328] = 1,
    ACTIONS(118), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [347] = 1,
    ACTIONS(120), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [366] = 1,
    ACTIONS(122), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [385] = 1,
    ACTIONS(124), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [404] = 1,
    ACTIONS(126), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [423] = 1,
    ACTIONS(128), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [442] = 1,
    ACTIONS(130), 16,
      ts_builtin_sym_end,
      sym_track_separator,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_r,
      anon_sym_l,
      anon_sym_o,
      sym_octave_up,
      sym_octave_down,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [461] = 5,
    ACTIONS(134), 1,
      sym_duration,
    STATE(32), 1,
      sym_accidental,
    ACTIONS(48), 2,
      anon_sym_PLUS,
      anon_sym_DASH,
    ACTIONS(50), 2,
      anon_sym_PLUS_PLUS,
      anon_sym_DASH_DASH,
    ACTIONS(132), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [486] = 4,
    ACTIONS(136), 1,
      anon_sym_SQUOTE,
    STATE(28), 1,
      sym_note_pitch,
    STATE(30), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(7), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [506] = 4,
    ACTIONS(141), 1,
      anon_sym_SQUOTE,
    STATE(28), 1,
      sym_note_pitch,
    STATE(30), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(138), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [526] = 3,
    STATE(28), 1,
      sym_note_pitch,
    STATE(29), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(7), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [543] = 2,
    ACTIONS(145), 1,
      sym_duration,
    ACTIONS(143), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [557] = 1,
    ACTIONS(147), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [568] = 1,
    ACTIONS(149), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [579] = 1,
    ACTIONS(151), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(6)] = 0,
  [SMALL_STATE(7)] = 25,
  [SMALL_STATE(8)] = 52,
  [SMALL_STATE(9)] = 77,
  [SMALL_STATE(10)] = 98,
  [SMALL_STATE(11)] = 120,
  [SMALL_STATE(12)] = 142,
  [SMALL_STATE(13)] = 164,
  [SMALL_STATE(14)] = 186,
  [SMALL_STATE(15)] = 208,
  [SMALL_STATE(16)] = 230,
  [SMALL_STATE(17)] = 252,
  [SMALL_STATE(18)] = 271,
  [SMALL_STATE(19)] = 290,
  [SMALL_STATE(20)] = 309,
  [SMALL_STATE(21)] = 328,
  [SMALL_STATE(22)] = 347,
  [SMALL_STATE(23)] = 366,
  [SMALL_STATE(24)] = 385,
  [SMALL_STATE(25)] = 404,
  [SMALL_STATE(26)] = 423,
  [SMALL_STATE(27)] = 442,
  [SMALL_STATE(28)] = 461,
  [SMALL_STATE(29)] = 486,
  [SMALL_STATE(30)] = 506,
  [SMALL_STATE(31)] = 526,
  [SMALL_STATE(32)] = 543,
  [SMALL_STATE(33)] = 557,
  [SMALL_STATE(34)] = 568,
  [SMALL_STATE(35)] = 579,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [19] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [23] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [25] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(3),
  [28] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [31] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(6),
  [34] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(10),
  [37] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(11),
  [40] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [43] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(31),
  [46] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 1, .production_id = 1),
  [48] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [50] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [52] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [54] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [56] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note_pitch, 1),
  [58] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_note_pitch, 1),
  [60] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 1),
  [62] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [64] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 1),
  [68] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instrument_command, 1),
  [70] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [72] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [74] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 9),
  [76] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [78] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_accidental, 1),
  [82] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 1),
  [84] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [86] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 1),
  [88] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [90] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 14),
  [92] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [94] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 3, .production_id = 12),
  [96] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [98] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 2),
  [100] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [102] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 7),
  [104] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [106] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 5),
  [108] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 2, .production_id = 4),
  [112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 4, .production_id = 17),
  [114] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 6),
  [116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 8),
  [118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 15),
  [120] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 2, .production_id = 4),
  [122] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 3, .production_id = 10),
  [124] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 3, .production_id = 11),
  [126] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 3),
  [128] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 13),
  [130] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 4, .production_id = 16),
  [132] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 1, .production_id = 1),
  [134] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [136] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [138] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2), SHIFT_REPEAT(5),
  [141] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2),
  [143] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 9),
  [145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [147] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 7),
  [149] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 3, .production_id = 14),
  [151] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_mml(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
