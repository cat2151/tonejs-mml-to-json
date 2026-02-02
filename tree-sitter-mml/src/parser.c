#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 38
#define LARGE_STATE_COUNT 10
#define SYMBOL_COUNT 39
#define ALIAS_COUNT 0
#define TOKEN_COUNT 26
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
  anon_sym_t = 20,
  anon_sym_T = 21,
  anon_sym_AT = 22,
  sym_instrument_name = 23,
  sym_json_args = 24,
  anon_sym_SQUOTE = 25,
  sym_source_file = 26,
  sym_note = 27,
  sym_note_pitch = 28,
  sym_accidental = 29,
  sym_rest = 30,
  sym_length_command = 31,
  sym_octave_command = 32,
  sym_tempo_command = 33,
  sym_instrument_command = 34,
  sym_chord = 35,
  sym_chord_note = 36,
  aux_sym_source_file_repeat1 = 37,
  aux_sym_chord_repeat1 = 38,
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
  [anon_sym_t] = "t",
  [anon_sym_T] = "T",
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
  [sym_tempo_command] = "tempo_command",
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
  [anon_sym_t] = anon_sym_t,
  [anon_sym_T] = anon_sym_T,
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
  [sym_tempo_command] = sym_tempo_command,
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
  [anon_sym_t] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_T] = {
    .visible = true,
    .named = false,
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
  [sym_tempo_command] = {
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
  [36] = 36,
  [37] = 37,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(4);
      if (lookahead == '\'') ADVANCE(41);
      if (lookahead == '+') ADVANCE(20);
      if (lookahead == '-') ADVANCE(21);
      if (lookahead == '.') ADVANCE(25);
      if (lookahead == ';') ADVANCE(5);
      if (lookahead == '<') ADVANCE(32);
      if (lookahead == '>') ADVANCE(33);
      if (lookahead == '@') ADVANCE(38);
      if (lookahead == 'T') ADVANCE(37);
      if (lookahead == 'a') ADVANCE(17);
      if (lookahead == 'b') ADVANCE(19);
      if (lookahead == 'c') ADVANCE(7);
      if (lookahead == 'd') ADVANCE(9);
      if (lookahead == 'e') ADVANCE(11);
      if (lookahead == 'f') ADVANCE(13);
      if (lookahead == 'g') ADVANCE(15);
      if (lookahead == 'l') ADVANCE(29);
      if (lookahead == 'o') ADVANCE(31);
      if (lookahead == 'r') ADVANCE(27);
      if (lookahead == 't') ADVANCE(35);
      if (lookahead == '{') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(24);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('h' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 1:
      if (lookahead == '{') ADVANCE(2);
      if (lookahead == '}') ADVANCE(40);
      if (lookahead != 0) ADVANCE(1);
      END_STATE();
    case 2:
      if (lookahead == '}') ADVANCE(1);
      if (lookahead != 0) ADVANCE(2);
      END_STATE();
    case 3:
      if (eof) ADVANCE(4);
      if (lookahead == '\'') ADVANCE(41);
      if (lookahead == '+') ADVANCE(20);
      if (lookahead == '-') ADVANCE(21);
      if (lookahead == '.') ADVANCE(25);
      if (lookahead == ';') ADVANCE(5);
      if (lookahead == '<') ADVANCE(32);
      if (lookahead == '>') ADVANCE(33);
      if (lookahead == '@') ADVANCE(38);
      if (lookahead == 'T') ADVANCE(36);
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
      if (lookahead == 't') ADVANCE(34);
      if (lookahead == '{') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(3)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(24);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(sym_track_separator);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_c);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(anon_sym_c);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(anon_sym_d);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_d);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(anon_sym_e);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(anon_sym_e);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_f);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_f);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_g);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_g);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_a);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_a);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_b);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_PLUS);
      if (lookahead == '+') ADVANCE(22);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_DASH);
      if (lookahead == '-') ADVANCE(23);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_PLUS_PLUS);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_DASH_DASH);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_duration);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(24);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(sym_dots);
      if (lookahead == '.') ADVANCE(25);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_r);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_r);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_l);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_l);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(anon_sym_o);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(anon_sym_o);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(sym_octave_up);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(sym_octave_down);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(anon_sym_t);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(anon_sym_t);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(anon_sym_T);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(anon_sym_T);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(sym_instrument_name);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(39);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(sym_json_args);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_SQUOTE);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 3},
  [2] = {.lex_state = 3},
  [3] = {.lex_state = 3},
  [4] = {.lex_state = 3},
  [5] = {.lex_state = 3},
  [6] = {.lex_state = 3},
  [7] = {.lex_state = 3},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 3},
  [10] = {.lex_state = 3},
  [11] = {.lex_state = 3},
  [12] = {.lex_state = 3},
  [13] = {.lex_state = 3},
  [14] = {.lex_state = 3},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 3},
  [17] = {.lex_state = 3},
  [18] = {.lex_state = 3},
  [19] = {.lex_state = 3},
  [20] = {.lex_state = 3},
  [21] = {.lex_state = 3},
  [22] = {.lex_state = 3},
  [23] = {.lex_state = 3},
  [24] = {.lex_state = 3},
  [25] = {.lex_state = 3},
  [26] = {.lex_state = 3},
  [27] = {.lex_state = 3},
  [28] = {.lex_state = 3},
  [29] = {.lex_state = 3},
  [30] = {.lex_state = 3},
  [31] = {.lex_state = 3},
  [32] = {.lex_state = 3},
  [33] = {.lex_state = 3},
  [34] = {.lex_state = 3},
  [35] = {.lex_state = 3},
  [36] = {.lex_state = 3},
  [37] = {.lex_state = 0},
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
    [anon_sym_t] = ACTIONS(1),
    [anon_sym_T] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [sym_instrument_name] = ACTIONS(1),
    [sym_json_args] = ACTIONS(1),
    [anon_sym_SQUOTE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(37),
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_tempo_command] = STATE(2),
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
    [anon_sym_t] = ACTIONS(15),
    [anon_sym_T] = ACTIONS(15),
    [anon_sym_AT] = ACTIONS(17),
    [anon_sym_SQUOTE] = ACTIONS(19),
  },
  [2] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(21),
    [sym_track_separator] = ACTIONS(23),
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
    [sym_octave_up] = ACTIONS(23),
    [sym_octave_down] = ACTIONS(23),
    [anon_sym_t] = ACTIONS(15),
    [anon_sym_T] = ACTIONS(15),
    [anon_sym_AT] = ACTIONS(17),
    [anon_sym_SQUOTE] = ACTIONS(19),
  },
  [3] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(25),
    [sym_track_separator] = ACTIONS(27),
    [anon_sym_c] = ACTIONS(30),
    [anon_sym_d] = ACTIONS(30),
    [anon_sym_e] = ACTIONS(30),
    [anon_sym_f] = ACTIONS(30),
    [anon_sym_g] = ACTIONS(30),
    [anon_sym_a] = ACTIONS(30),
    [anon_sym_b] = ACTIONS(30),
    [anon_sym_r] = ACTIONS(33),
    [anon_sym_l] = ACTIONS(36),
    [anon_sym_o] = ACTIONS(39),
    [sym_octave_up] = ACTIONS(27),
    [sym_octave_down] = ACTIONS(27),
    [anon_sym_t] = ACTIONS(42),
    [anon_sym_T] = ACTIONS(42),
    [anon_sym_AT] = ACTIONS(45),
    [anon_sym_SQUOTE] = ACTIONS(48),
  },
  [4] = {
    [sym_accidental] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(51),
    [sym_track_separator] = ACTIONS(51),
    [anon_sym_c] = ACTIONS(51),
    [anon_sym_d] = ACTIONS(51),
    [anon_sym_e] = ACTIONS(51),
    [anon_sym_f] = ACTIONS(51),
    [anon_sym_g] = ACTIONS(51),
    [anon_sym_a] = ACTIONS(51),
    [anon_sym_b] = ACTIONS(51),
    [anon_sym_PLUS] = ACTIONS(53),
    [anon_sym_DASH] = ACTIONS(53),
    [anon_sym_PLUS_PLUS] = ACTIONS(55),
    [anon_sym_DASH_DASH] = ACTIONS(55),
    [sym_duration] = ACTIONS(57),
    [sym_dots] = ACTIONS(59),
    [anon_sym_r] = ACTIONS(51),
    [anon_sym_l] = ACTIONS(51),
    [anon_sym_o] = ACTIONS(51),
    [sym_octave_up] = ACTIONS(51),
    [sym_octave_down] = ACTIONS(51),
    [anon_sym_t] = ACTIONS(51),
    [anon_sym_T] = ACTIONS(51),
    [anon_sym_AT] = ACTIONS(51),
    [anon_sym_SQUOTE] = ACTIONS(51),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(61),
    [sym_track_separator] = ACTIONS(61),
    [anon_sym_c] = ACTIONS(61),
    [anon_sym_d] = ACTIONS(61),
    [anon_sym_e] = ACTIONS(61),
    [anon_sym_f] = ACTIONS(61),
    [anon_sym_g] = ACTIONS(61),
    [anon_sym_a] = ACTIONS(61),
    [anon_sym_b] = ACTIONS(61),
    [anon_sym_PLUS] = ACTIONS(63),
    [anon_sym_DASH] = ACTIONS(63),
    [anon_sym_PLUS_PLUS] = ACTIONS(61),
    [anon_sym_DASH_DASH] = ACTIONS(61),
    [sym_duration] = ACTIONS(61),
    [sym_dots] = ACTIONS(61),
    [anon_sym_r] = ACTIONS(61),
    [anon_sym_l] = ACTIONS(61),
    [anon_sym_o] = ACTIONS(61),
    [sym_octave_up] = ACTIONS(61),
    [sym_octave_down] = ACTIONS(61),
    [anon_sym_t] = ACTIONS(61),
    [anon_sym_T] = ACTIONS(61),
    [anon_sym_AT] = ACTIONS(61),
    [anon_sym_SQUOTE] = ACTIONS(61),
  },
  [6] = {
    [ts_builtin_sym_end] = ACTIONS(65),
    [sym_track_separator] = ACTIONS(65),
    [anon_sym_c] = ACTIONS(65),
    [anon_sym_d] = ACTIONS(65),
    [anon_sym_e] = ACTIONS(65),
    [anon_sym_f] = ACTIONS(65),
    [anon_sym_g] = ACTIONS(65),
    [anon_sym_a] = ACTIONS(65),
    [anon_sym_b] = ACTIONS(65),
    [sym_duration] = ACTIONS(65),
    [sym_dots] = ACTIONS(65),
    [anon_sym_r] = ACTIONS(65),
    [anon_sym_l] = ACTIONS(65),
    [anon_sym_o] = ACTIONS(65),
    [sym_octave_up] = ACTIONS(65),
    [sym_octave_down] = ACTIONS(65),
    [anon_sym_t] = ACTIONS(65),
    [anon_sym_T] = ACTIONS(65),
    [anon_sym_AT] = ACTIONS(65),
    [anon_sym_SQUOTE] = ACTIONS(65),
  },
  [7] = {
    [ts_builtin_sym_end] = ACTIONS(67),
    [sym_track_separator] = ACTIONS(67),
    [anon_sym_c] = ACTIONS(67),
    [anon_sym_d] = ACTIONS(67),
    [anon_sym_e] = ACTIONS(67),
    [anon_sym_f] = ACTIONS(67),
    [anon_sym_g] = ACTIONS(67),
    [anon_sym_a] = ACTIONS(67),
    [anon_sym_b] = ACTIONS(67),
    [sym_duration] = ACTIONS(69),
    [sym_dots] = ACTIONS(71),
    [anon_sym_r] = ACTIONS(67),
    [anon_sym_l] = ACTIONS(67),
    [anon_sym_o] = ACTIONS(67),
    [sym_octave_up] = ACTIONS(67),
    [sym_octave_down] = ACTIONS(67),
    [anon_sym_t] = ACTIONS(67),
    [anon_sym_T] = ACTIONS(67),
    [anon_sym_AT] = ACTIONS(67),
    [anon_sym_SQUOTE] = ACTIONS(67),
  },
  [8] = {
    [ts_builtin_sym_end] = ACTIONS(73),
    [sym_track_separator] = ACTIONS(73),
    [anon_sym_c] = ACTIONS(75),
    [anon_sym_d] = ACTIONS(75),
    [anon_sym_e] = ACTIONS(75),
    [anon_sym_f] = ACTIONS(75),
    [anon_sym_g] = ACTIONS(75),
    [anon_sym_a] = ACTIONS(75),
    [anon_sym_b] = ACTIONS(75),
    [anon_sym_r] = ACTIONS(75),
    [anon_sym_l] = ACTIONS(75),
    [anon_sym_o] = ACTIONS(75),
    [sym_octave_up] = ACTIONS(73),
    [sym_octave_down] = ACTIONS(73),
    [anon_sym_t] = ACTIONS(75),
    [anon_sym_T] = ACTIONS(75),
    [anon_sym_AT] = ACTIONS(73),
    [sym_instrument_name] = ACTIONS(77),
    [sym_json_args] = ACTIONS(79),
    [anon_sym_SQUOTE] = ACTIONS(73),
  },
  [9] = {
    [ts_builtin_sym_end] = ACTIONS(81),
    [sym_track_separator] = ACTIONS(81),
    [anon_sym_c] = ACTIONS(81),
    [anon_sym_d] = ACTIONS(81),
    [anon_sym_e] = ACTIONS(81),
    [anon_sym_f] = ACTIONS(81),
    [anon_sym_g] = ACTIONS(81),
    [anon_sym_a] = ACTIONS(81),
    [anon_sym_b] = ACTIONS(81),
    [sym_duration] = ACTIONS(83),
    [sym_dots] = ACTIONS(85),
    [anon_sym_r] = ACTIONS(81),
    [anon_sym_l] = ACTIONS(81),
    [anon_sym_o] = ACTIONS(81),
    [sym_octave_up] = ACTIONS(81),
    [sym_octave_down] = ACTIONS(81),
    [anon_sym_t] = ACTIONS(81),
    [anon_sym_T] = ACTIONS(81),
    [anon_sym_AT] = ACTIONS(81),
    [anon_sym_SQUOTE] = ACTIONS(81),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 2,
    ACTIONS(89), 1,
      sym_duration,
    ACTIONS(87), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [24] = 2,
    ACTIONS(93), 1,
      sym_duration,
    ACTIONS(91), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [48] = 2,
    ACTIONS(97), 1,
      sym_duration,
    ACTIONS(95), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [72] = 2,
    ACTIONS(101), 1,
      sym_dots,
    ACTIONS(99), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [96] = 2,
    ACTIONS(105), 1,
      sym_dots,
    ACTIONS(103), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [120] = 2,
    ACTIONS(109), 1,
      sym_dots,
    ACTIONS(107), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [144] = 2,
    ACTIONS(113), 1,
      sym_dots,
    ACTIONS(111), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [168] = 2,
    ACTIONS(117), 1,
      sym_json_args,
    ACTIONS(115), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [192] = 1,
    ACTIONS(119), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [213] = 1,
    ACTIONS(121), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [234] = 1,
    ACTIONS(123), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [255] = 1,
    ACTIONS(125), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [276] = 1,
    ACTIONS(127), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [297] = 1,
    ACTIONS(129), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [318] = 1,
    ACTIONS(131), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [339] = 1,
    ACTIONS(133), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [360] = 1,
    ACTIONS(135), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [381] = 1,
    ACTIONS(137), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [402] = 1,
    ACTIONS(139), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [423] = 1,
    ACTIONS(141), 18,
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
      anon_sym_t,
      anon_sym_T,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [444] = 5,
    ACTIONS(145), 1,
      sym_duration,
    STATE(34), 1,
      sym_accidental,
    ACTIONS(53), 2,
      anon_sym_PLUS,
      anon_sym_DASH,
    ACTIONS(55), 2,
      anon_sym_PLUS_PLUS,
      anon_sym_DASH_DASH,
    ACTIONS(143), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [469] = 4,
    ACTIONS(147), 1,
      anon_sym_SQUOTE,
    STATE(30), 1,
      sym_note_pitch,
    STATE(32), 2,
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
  [489] = 4,
    ACTIONS(152), 1,
      anon_sym_SQUOTE,
    STATE(30), 1,
      sym_note_pitch,
    STATE(32), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(149), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [509] = 3,
    STATE(30), 1,
      sym_note_pitch,
    STATE(31), 2,
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
  [526] = 2,
    ACTIONS(156), 1,
      sym_duration,
    ACTIONS(154), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [540] = 1,
    ACTIONS(158), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [551] = 1,
    ACTIONS(160), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [562] = 1,
    ACTIONS(162), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(10)] = 0,
  [SMALL_STATE(11)] = 24,
  [SMALL_STATE(12)] = 48,
  [SMALL_STATE(13)] = 72,
  [SMALL_STATE(14)] = 96,
  [SMALL_STATE(15)] = 120,
  [SMALL_STATE(16)] = 144,
  [SMALL_STATE(17)] = 168,
  [SMALL_STATE(18)] = 192,
  [SMALL_STATE(19)] = 213,
  [SMALL_STATE(20)] = 234,
  [SMALL_STATE(21)] = 255,
  [SMALL_STATE(22)] = 276,
  [SMALL_STATE(23)] = 297,
  [SMALL_STATE(24)] = 318,
  [SMALL_STATE(25)] = 339,
  [SMALL_STATE(26)] = 360,
  [SMALL_STATE(27)] = 381,
  [SMALL_STATE(28)] = 402,
  [SMALL_STATE(29)] = 423,
  [SMALL_STATE(30)] = 444,
  [SMALL_STATE(31)] = 469,
  [SMALL_STATE(32)] = 489,
  [SMALL_STATE(33)] = 509,
  [SMALL_STATE(34)] = 526,
  [SMALL_STATE(35)] = 540,
  [SMALL_STATE(36)] = 551,
  [SMALL_STATE(37)] = 562,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [21] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [25] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [27] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(3),
  [30] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [33] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [36] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(10),
  [39] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(11),
  [42] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(12),
  [45] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(8),
  [48] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(33),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 1, .production_id = 1),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(6),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [57] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [59] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [61] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note_pitch, 1),
  [63] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_note_pitch, 1),
  [65] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_accidental, 1),
  [67] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 1),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [71] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [73] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 1),
  [75] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instrument_command, 1),
  [77] = {.entry = {.count = 1, .reusable = false}}, SHIFT(17),
  [79] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 9),
  [83] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [85] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [87] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 1),
  [89] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [91] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 1),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [95] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 1),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [99] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 14),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [103] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 3, .production_id = 12),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [107] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 2),
  [109] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [111] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 7),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [115] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 5),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [119] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 3, .production_id = 11),
  [121] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 6),
  [123] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 8),
  [125] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 2, .production_id = 4),
  [127] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 2, .production_id = 4),
  [129] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 3, .production_id = 10),
  [131] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 2, .production_id = 4),
  [133] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 3),
  [135] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 13),
  [137] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 15),
  [139] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 4, .production_id = 16),
  [141] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 4, .production_id = 17),
  [143] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 1, .production_id = 1),
  [145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [147] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [149] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2), SHIFT_REPEAT(5),
  [152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2),
  [154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 9),
  [156] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [158] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 7),
  [160] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 3, .production_id = 14),
  [162] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
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
