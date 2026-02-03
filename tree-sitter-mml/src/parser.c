#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 40
#define LARGE_STATE_COUNT 10
#define SYMBOL_COUNT 43
#define ALIAS_COUNT 0
#define TOKEN_COUNT 29
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
  anon_sym_kt = 22,
  anon_sym_KT = 23,
  sym_signed_number = 24,
  anon_sym_AT = 25,
  sym_instrument_name = 26,
  sym_json_args = 27,
  anon_sym_SQUOTE = 28,
  sym_source_file = 29,
  sym_note = 30,
  sym_note_pitch = 31,
  sym_accidental = 32,
  sym_rest = 33,
  sym_length_command = 34,
  sym_octave_command = 35,
  sym_tempo_command = 36,
  sym_key_transpose_command = 37,
  sym_instrument_command = 38,
  sym_chord = 39,
  sym_chord_note = 40,
  aux_sym_source_file_repeat1 = 41,
  aux_sym_chord_repeat1 = 42,
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
  [anon_sym_kt] = "kt",
  [anon_sym_KT] = "KT",
  [sym_signed_number] = "signed_number",
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
  [sym_key_transpose_command] = "key_transpose_command",
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
  [anon_sym_kt] = anon_sym_kt,
  [anon_sym_KT] = anon_sym_KT,
  [sym_signed_number] = sym_signed_number,
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
  [sym_key_transpose_command] = sym_key_transpose_command,
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
  [anon_sym_kt] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_KT] = {
    .visible = true,
    .named = false,
  },
  [sym_signed_number] = {
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
  [sym_tempo_command] = {
    .visible = true,
    .named = true,
  },
  [sym_key_transpose_command] = {
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
  [38] = 38,
  [39] = 39,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(52);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(47);
      if (lookahead == 'K') ADVANCE(48);
      if (lookahead == 'T') ADVANCE(41);
      if (lookahead == 'a') ADVANCE(21);
      if (lookahead == 'b') ADVANCE(23);
      if (lookahead == 'c') ADVANCE(11);
      if (lookahead == 'd') ADVANCE(13);
      if (lookahead == 'e') ADVANCE(15);
      if (lookahead == 'f') ADVANCE(17);
      if (lookahead == 'g') ADVANCE(19);
      if (lookahead == 'k') ADVANCE(49);
      if (lookahead == 'l') ADVANCE(33);
      if (lookahead == 'o') ADVANCE(35);
      if (lookahead == 'r') ADVANCE(31);
      if (lookahead == 't') ADVANCE(39);
      if (lookahead == '{') ADVANCE(3);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('h' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 1:
      if (lookahead == 'T') ADVANCE(44);
      END_STATE();
    case 2:
      if (lookahead == 't') ADVANCE(42);
      END_STATE();
    case 3:
      if (lookahead == '{') ADVANCE(4);
      if (lookahead == '}') ADVANCE(51);
      if (lookahead != 0) ADVANCE(3);
      END_STATE();
    case 4:
      if (lookahead == '}') ADVANCE(3);
      if (lookahead != 0) ADVANCE(4);
      END_STATE();
    case 5:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(46);
      END_STATE();
    case 6:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(52);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(47);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'T') ADVANCE(40);
      if (lookahead == 'a') ADVANCE(20);
      if (lookahead == 'b') ADVANCE(22);
      if (lookahead == 'c') ADVANCE(10);
      if (lookahead == 'd') ADVANCE(12);
      if (lookahead == 'e') ADVANCE(14);
      if (lookahead == 'f') ADVANCE(16);
      if (lookahead == 'g') ADVANCE(18);
      if (lookahead == 'k') ADVANCE(2);
      if (lookahead == 'l') ADVANCE(32);
      if (lookahead == 'o') ADVANCE(34);
      if (lookahead == 'r') ADVANCE(30);
      if (lookahead == 't') ADVANCE(38);
      if (lookahead == '{') ADVANCE(3);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(6)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 7:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(52);
      if (lookahead == '-') ADVANCE(5);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(47);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'T') ADVANCE(40);
      if (lookahead == 'a') ADVANCE(20);
      if (lookahead == 'b') ADVANCE(22);
      if (lookahead == 'c') ADVANCE(10);
      if (lookahead == 'd') ADVANCE(12);
      if (lookahead == 'e') ADVANCE(14);
      if (lookahead == 'f') ADVANCE(16);
      if (lookahead == 'g') ADVANCE(18);
      if (lookahead == 'k') ADVANCE(2);
      if (lookahead == 'l') ADVANCE(32);
      if (lookahead == 'o') ADVANCE(34);
      if (lookahead == 'r') ADVANCE(30);
      if (lookahead == 't') ADVANCE(38);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(7)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(46);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(sym_track_separator);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(anon_sym_c);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(anon_sym_c);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_d);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_d);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_e);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_e);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_f);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_f);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_g);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_g);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_a);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_a);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_b);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_PLUS);
      if (lookahead == '+') ADVANCE(26);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_DASH);
      if (lookahead == '-') ADVANCE(27);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_PLUS_PLUS);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_DASH_DASH);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(sym_duration);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(sym_dots);
      if (lookahead == '.') ADVANCE(29);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(anon_sym_r);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(anon_sym_r);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(anon_sym_l);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(anon_sym_l);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(anon_sym_o);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(anon_sym_o);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(sym_octave_up);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(sym_octave_down);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(anon_sym_t);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(anon_sym_t);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_T);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_T);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(anon_sym_kt);
      END_STATE();
    case 43:
      ACCEPT_TOKEN(anon_sym_kt);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 44:
      ACCEPT_TOKEN(anon_sym_KT);
      END_STATE();
    case 45:
      ACCEPT_TOKEN(anon_sym_KT);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 46:
      ACCEPT_TOKEN(sym_signed_number);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(46);
      END_STATE();
    case 47:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 48:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 'T') ADVANCE(45);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 49:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 't') ADVANCE(43);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 50:
      ACCEPT_TOKEN(sym_instrument_name);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(sym_json_args);
      END_STATE();
    case 52:
      ACCEPT_TOKEN(anon_sym_SQUOTE);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 6},
  [2] = {.lex_state = 6},
  [3] = {.lex_state = 6},
  [4] = {.lex_state = 6},
  [5] = {.lex_state = 6},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 6},
  [8] = {.lex_state = 6},
  [9] = {.lex_state = 6},
  [10] = {.lex_state = 6},
  [11] = {.lex_state = 6},
  [12] = {.lex_state = 6},
  [13] = {.lex_state = 7},
  [14] = {.lex_state = 6},
  [15] = {.lex_state = 6},
  [16] = {.lex_state = 6},
  [17] = {.lex_state = 6},
  [18] = {.lex_state = 6},
  [19] = {.lex_state = 6},
  [20] = {.lex_state = 6},
  [21] = {.lex_state = 6},
  [22] = {.lex_state = 6},
  [23] = {.lex_state = 6},
  [24] = {.lex_state = 6},
  [25] = {.lex_state = 6},
  [26] = {.lex_state = 6},
  [27] = {.lex_state = 6},
  [28] = {.lex_state = 6},
  [29] = {.lex_state = 6},
  [30] = {.lex_state = 6},
  [31] = {.lex_state = 6},
  [32] = {.lex_state = 6},
  [33] = {.lex_state = 6},
  [34] = {.lex_state = 6},
  [35] = {.lex_state = 6},
  [36] = {.lex_state = 6},
  [37] = {.lex_state = 6},
  [38] = {.lex_state = 6},
  [39] = {.lex_state = 0},
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
    [anon_sym_kt] = ACTIONS(1),
    [anon_sym_KT] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [sym_instrument_name] = ACTIONS(1),
    [sym_json_args] = ACTIONS(1),
    [anon_sym_SQUOTE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(39),
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_tempo_command] = STATE(2),
    [sym_key_transpose_command] = STATE(2),
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
    [anon_sym_kt] = ACTIONS(17),
    [anon_sym_KT] = ACTIONS(17),
    [anon_sym_AT] = ACTIONS(19),
    [anon_sym_SQUOTE] = ACTIONS(21),
  },
  [2] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_key_transpose_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(23),
    [sym_track_separator] = ACTIONS(25),
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
    [sym_octave_up] = ACTIONS(25),
    [sym_octave_down] = ACTIONS(25),
    [anon_sym_t] = ACTIONS(15),
    [anon_sym_T] = ACTIONS(15),
    [anon_sym_kt] = ACTIONS(17),
    [anon_sym_KT] = ACTIONS(17),
    [anon_sym_AT] = ACTIONS(19),
    [anon_sym_SQUOTE] = ACTIONS(21),
  },
  [3] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_key_transpose_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(27),
    [sym_track_separator] = ACTIONS(29),
    [anon_sym_c] = ACTIONS(32),
    [anon_sym_d] = ACTIONS(32),
    [anon_sym_e] = ACTIONS(32),
    [anon_sym_f] = ACTIONS(32),
    [anon_sym_g] = ACTIONS(32),
    [anon_sym_a] = ACTIONS(32),
    [anon_sym_b] = ACTIONS(32),
    [anon_sym_r] = ACTIONS(35),
    [anon_sym_l] = ACTIONS(38),
    [anon_sym_o] = ACTIONS(41),
    [sym_octave_up] = ACTIONS(29),
    [sym_octave_down] = ACTIONS(29),
    [anon_sym_t] = ACTIONS(44),
    [anon_sym_T] = ACTIONS(44),
    [anon_sym_kt] = ACTIONS(47),
    [anon_sym_KT] = ACTIONS(47),
    [anon_sym_AT] = ACTIONS(50),
    [anon_sym_SQUOTE] = ACTIONS(53),
  },
  [4] = {
    [sym_accidental] = STATE(8),
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
    [anon_sym_PLUS_PLUS] = ACTIONS(60),
    [anon_sym_DASH_DASH] = ACTIONS(60),
    [sym_duration] = ACTIONS(62),
    [sym_dots] = ACTIONS(64),
    [anon_sym_r] = ACTIONS(56),
    [anon_sym_l] = ACTIONS(56),
    [anon_sym_o] = ACTIONS(56),
    [sym_octave_up] = ACTIONS(56),
    [sym_octave_down] = ACTIONS(56),
    [anon_sym_t] = ACTIONS(56),
    [anon_sym_T] = ACTIONS(56),
    [anon_sym_kt] = ACTIONS(56),
    [anon_sym_KT] = ACTIONS(56),
    [anon_sym_AT] = ACTIONS(56),
    [anon_sym_SQUOTE] = ACTIONS(56),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(66),
    [sym_track_separator] = ACTIONS(66),
    [anon_sym_c] = ACTIONS(66),
    [anon_sym_d] = ACTIONS(66),
    [anon_sym_e] = ACTIONS(66),
    [anon_sym_f] = ACTIONS(66),
    [anon_sym_g] = ACTIONS(66),
    [anon_sym_a] = ACTIONS(66),
    [anon_sym_b] = ACTIONS(66),
    [anon_sym_PLUS] = ACTIONS(68),
    [anon_sym_DASH] = ACTIONS(68),
    [anon_sym_PLUS_PLUS] = ACTIONS(66),
    [anon_sym_DASH_DASH] = ACTIONS(66),
    [sym_duration] = ACTIONS(66),
    [sym_dots] = ACTIONS(66),
    [anon_sym_r] = ACTIONS(66),
    [anon_sym_l] = ACTIONS(66),
    [anon_sym_o] = ACTIONS(66),
    [sym_octave_up] = ACTIONS(66),
    [sym_octave_down] = ACTIONS(66),
    [anon_sym_t] = ACTIONS(66),
    [anon_sym_T] = ACTIONS(66),
    [anon_sym_kt] = ACTIONS(66),
    [anon_sym_KT] = ACTIONS(66),
    [anon_sym_AT] = ACTIONS(66),
    [anon_sym_SQUOTE] = ACTIONS(66),
  },
  [6] = {
    [ts_builtin_sym_end] = ACTIONS(70),
    [sym_track_separator] = ACTIONS(70),
    [anon_sym_c] = ACTIONS(72),
    [anon_sym_d] = ACTIONS(72),
    [anon_sym_e] = ACTIONS(72),
    [anon_sym_f] = ACTIONS(72),
    [anon_sym_g] = ACTIONS(72),
    [anon_sym_a] = ACTIONS(72),
    [anon_sym_b] = ACTIONS(72),
    [anon_sym_r] = ACTIONS(72),
    [anon_sym_l] = ACTIONS(72),
    [anon_sym_o] = ACTIONS(72),
    [sym_octave_up] = ACTIONS(70),
    [sym_octave_down] = ACTIONS(70),
    [anon_sym_t] = ACTIONS(72),
    [anon_sym_T] = ACTIONS(72),
    [anon_sym_kt] = ACTIONS(72),
    [anon_sym_KT] = ACTIONS(72),
    [anon_sym_AT] = ACTIONS(70),
    [sym_instrument_name] = ACTIONS(74),
    [sym_json_args] = ACTIONS(76),
    [anon_sym_SQUOTE] = ACTIONS(70),
  },
  [7] = {
    [ts_builtin_sym_end] = ACTIONS(78),
    [sym_track_separator] = ACTIONS(78),
    [anon_sym_c] = ACTIONS(78),
    [anon_sym_d] = ACTIONS(78),
    [anon_sym_e] = ACTIONS(78),
    [anon_sym_f] = ACTIONS(78),
    [anon_sym_g] = ACTIONS(78),
    [anon_sym_a] = ACTIONS(78),
    [anon_sym_b] = ACTIONS(78),
    [sym_duration] = ACTIONS(80),
    [sym_dots] = ACTIONS(82),
    [anon_sym_r] = ACTIONS(78),
    [anon_sym_l] = ACTIONS(78),
    [anon_sym_o] = ACTIONS(78),
    [sym_octave_up] = ACTIONS(78),
    [sym_octave_down] = ACTIONS(78),
    [anon_sym_t] = ACTIONS(78),
    [anon_sym_T] = ACTIONS(78),
    [anon_sym_kt] = ACTIONS(78),
    [anon_sym_KT] = ACTIONS(78),
    [anon_sym_AT] = ACTIONS(78),
    [anon_sym_SQUOTE] = ACTIONS(78),
  },
  [8] = {
    [ts_builtin_sym_end] = ACTIONS(84),
    [sym_track_separator] = ACTIONS(84),
    [anon_sym_c] = ACTIONS(84),
    [anon_sym_d] = ACTIONS(84),
    [anon_sym_e] = ACTIONS(84),
    [anon_sym_f] = ACTIONS(84),
    [anon_sym_g] = ACTIONS(84),
    [anon_sym_a] = ACTIONS(84),
    [anon_sym_b] = ACTIONS(84),
    [sym_duration] = ACTIONS(86),
    [sym_dots] = ACTIONS(88),
    [anon_sym_r] = ACTIONS(84),
    [anon_sym_l] = ACTIONS(84),
    [anon_sym_o] = ACTIONS(84),
    [sym_octave_up] = ACTIONS(84),
    [sym_octave_down] = ACTIONS(84),
    [anon_sym_t] = ACTIONS(84),
    [anon_sym_T] = ACTIONS(84),
    [anon_sym_kt] = ACTIONS(84),
    [anon_sym_KT] = ACTIONS(84),
    [anon_sym_AT] = ACTIONS(84),
    [anon_sym_SQUOTE] = ACTIONS(84),
  },
  [9] = {
    [ts_builtin_sym_end] = ACTIONS(90),
    [sym_track_separator] = ACTIONS(90),
    [anon_sym_c] = ACTIONS(90),
    [anon_sym_d] = ACTIONS(90),
    [anon_sym_e] = ACTIONS(90),
    [anon_sym_f] = ACTIONS(90),
    [anon_sym_g] = ACTIONS(90),
    [anon_sym_a] = ACTIONS(90),
    [anon_sym_b] = ACTIONS(90),
    [sym_duration] = ACTIONS(90),
    [sym_dots] = ACTIONS(90),
    [anon_sym_r] = ACTIONS(90),
    [anon_sym_l] = ACTIONS(90),
    [anon_sym_o] = ACTIONS(90),
    [sym_octave_up] = ACTIONS(90),
    [sym_octave_down] = ACTIONS(90),
    [anon_sym_t] = ACTIONS(90),
    [anon_sym_T] = ACTIONS(90),
    [anon_sym_kt] = ACTIONS(90),
    [anon_sym_KT] = ACTIONS(90),
    [anon_sym_AT] = ACTIONS(90),
    [anon_sym_SQUOTE] = ACTIONS(90),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 2,
    ACTIONS(94), 1,
      sym_duration,
    ACTIONS(92), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [26] = 2,
    ACTIONS(98), 1,
      sym_duration,
    ACTIONS(96), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [52] = 2,
    ACTIONS(102), 1,
      sym_duration,
    ACTIONS(100), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [78] = 2,
    ACTIONS(106), 1,
      sym_signed_number,
    ACTIONS(104), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [104] = 2,
    ACTIONS(110), 1,
      sym_json_args,
    ACTIONS(108), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [130] = 2,
    ACTIONS(114), 1,
      sym_dots,
    ACTIONS(112), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [156] = 2,
    ACTIONS(118), 1,
      sym_dots,
    ACTIONS(116), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [182] = 2,
    ACTIONS(122), 1,
      sym_dots,
    ACTIONS(120), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [208] = 2,
    ACTIONS(126), 1,
      sym_dots,
    ACTIONS(124), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [234] = 1,
    ACTIONS(128), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [257] = 1,
    ACTIONS(130), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [280] = 1,
    ACTIONS(132), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [303] = 1,
    ACTIONS(134), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [326] = 1,
    ACTIONS(136), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [349] = 1,
    ACTIONS(138), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [372] = 1,
    ACTIONS(140), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [395] = 1,
    ACTIONS(142), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [418] = 1,
    ACTIONS(144), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [441] = 1,
    ACTIONS(146), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [464] = 1,
    ACTIONS(148), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [487] = 1,
    ACTIONS(150), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [510] = 1,
    ACTIONS(152), 20,
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
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [533] = 5,
    ACTIONS(156), 1,
      sym_duration,
    STATE(36), 1,
      sym_accidental,
    ACTIONS(58), 2,
      anon_sym_PLUS,
      anon_sym_DASH,
    ACTIONS(60), 2,
      anon_sym_PLUS_PLUS,
      anon_sym_DASH_DASH,
    ACTIONS(154), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [558] = 4,
    ACTIONS(158), 1,
      anon_sym_SQUOTE,
    STATE(32), 1,
      sym_note_pitch,
    STATE(34), 2,
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
  [578] = 4,
    ACTIONS(163), 1,
      anon_sym_SQUOTE,
    STATE(32), 1,
      sym_note_pitch,
    STATE(34), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(160), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [598] = 3,
    STATE(32), 1,
      sym_note_pitch,
    STATE(33), 2,
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
  [615] = 2,
    ACTIONS(167), 1,
      sym_duration,
    ACTIONS(165), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [629] = 1,
    ACTIONS(169), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [640] = 1,
    ACTIONS(171), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [651] = 1,
    ACTIONS(173), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(10)] = 0,
  [SMALL_STATE(11)] = 26,
  [SMALL_STATE(12)] = 52,
  [SMALL_STATE(13)] = 78,
  [SMALL_STATE(14)] = 104,
  [SMALL_STATE(15)] = 130,
  [SMALL_STATE(16)] = 156,
  [SMALL_STATE(17)] = 182,
  [SMALL_STATE(18)] = 208,
  [SMALL_STATE(19)] = 234,
  [SMALL_STATE(20)] = 257,
  [SMALL_STATE(21)] = 280,
  [SMALL_STATE(22)] = 303,
  [SMALL_STATE(23)] = 326,
  [SMALL_STATE(24)] = 349,
  [SMALL_STATE(25)] = 372,
  [SMALL_STATE(26)] = 395,
  [SMALL_STATE(27)] = 418,
  [SMALL_STATE(28)] = 441,
  [SMALL_STATE(29)] = 464,
  [SMALL_STATE(30)] = 487,
  [SMALL_STATE(31)] = 510,
  [SMALL_STATE(32)] = 533,
  [SMALL_STATE(33)] = 558,
  [SMALL_STATE(34)] = 578,
  [SMALL_STATE(35)] = 598,
  [SMALL_STATE(36)] = 615,
  [SMALL_STATE(37)] = 629,
  [SMALL_STATE(38)] = 640,
  [SMALL_STATE(39)] = 651,
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
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [23] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [29] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(3),
  [32] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [35] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [38] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(10),
  [41] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(11),
  [44] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(12),
  [47] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(13),
  [50] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(6),
  [53] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(35),
  [56] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 1, .production_id = 1),
  [58] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [60] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [62] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [64] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note_pitch, 1),
  [68] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_note_pitch, 1),
  [70] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 1),
  [72] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instrument_command, 1),
  [74] = {.entry = {.count = 1, .reusable = false}}, SHIFT(14),
  [76] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [78] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 1),
  [80] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [82] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [84] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 9),
  [86] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [88] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [90] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_accidental, 1),
  [92] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 1),
  [94] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [96] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 1),
  [98] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [100] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 1),
  [102] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 1),
  [106] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 5),
  [110] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 14),
  [114] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 3, .production_id = 12),
  [118] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [120] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 2),
  [122] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [124] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 7),
  [126] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [128] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 2, .production_id = 4),
  [130] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 6),
  [132] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 2, .production_id = 4),
  [134] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 8),
  [136] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 4, .production_id = 16),
  [138] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 2, .production_id = 4),
  [140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 3, .production_id = 10),
  [142] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 3, .production_id = 11),
  [144] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 2, .production_id = 4),
  [146] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 3),
  [148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 13),
  [150] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 4, .production_id = 17),
  [152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 15),
  [154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 1, .production_id = 1),
  [156] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [158] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [160] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2), SHIFT_REPEAT(5),
  [163] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2),
  [165] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 9),
  [167] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [169] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 7),
  [171] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 3, .production_id = 14),
  [173] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
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
