#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 42
#define LARGE_STATE_COUNT 10
#define SYMBOL_COUNT 46
#define ALIAS_COUNT 0
#define TOKEN_COUNT 31
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
  anon_sym_v = 22,
  anon_sym_V = 23,
  anon_sym_kt = 24,
  anon_sym_KT = 25,
  sym_signed_number = 26,
  anon_sym_AT = 27,
  sym_instrument_name = 28,
  sym_json_args = 29,
  anon_sym_SQUOTE = 30,
  sym_source_file = 31,
  sym_note = 32,
  sym_note_pitch = 33,
  sym_accidental = 34,
  sym_rest = 35,
  sym_length_command = 36,
  sym_octave_command = 37,
  sym_tempo_command = 38,
  sym_volume_command = 39,
  sym_key_transpose_command = 40,
  sym_instrument_command = 41,
  sym_chord = 42,
  sym_chord_note = 43,
  aux_sym_source_file_repeat1 = 44,
  aux_sym_chord_repeat1 = 45,
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
  [anon_sym_v] = "v",
  [anon_sym_V] = "V",
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
  [sym_volume_command] = "volume_command",
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
  [anon_sym_v] = anon_sym_v,
  [anon_sym_V] = anon_sym_V,
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
  [sym_volume_command] = sym_volume_command,
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
  [anon_sym_v] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_V] = {
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
  [sym_volume_command] = {
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
  [40] = 40,
  [41] = 41,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(56);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(51);
      if (lookahead == 'K') ADVANCE(52);
      if (lookahead == 'T') ADVANCE(41);
      if (lookahead == 'V') ADVANCE(45);
      if (lookahead == 'a') ADVANCE(21);
      if (lookahead == 'b') ADVANCE(23);
      if (lookahead == 'c') ADVANCE(11);
      if (lookahead == 'd') ADVANCE(13);
      if (lookahead == 'e') ADVANCE(15);
      if (lookahead == 'f') ADVANCE(17);
      if (lookahead == 'g') ADVANCE(19);
      if (lookahead == 'k') ADVANCE(53);
      if (lookahead == 'l') ADVANCE(33);
      if (lookahead == 'o') ADVANCE(35);
      if (lookahead == 'r') ADVANCE(31);
      if (lookahead == 't') ADVANCE(39);
      if (lookahead == 'v') ADVANCE(43);
      if (lookahead == '{') ADVANCE(3);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('h' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 1:
      if (lookahead == 'T') ADVANCE(48);
      END_STATE();
    case 2:
      if (lookahead == 't') ADVANCE(46);
      END_STATE();
    case 3:
      if (lookahead == '{') ADVANCE(4);
      if (lookahead == '}') ADVANCE(55);
      if (lookahead != 0) ADVANCE(3);
      END_STATE();
    case 4:
      if (lookahead == '}') ADVANCE(3);
      if (lookahead != 0) ADVANCE(4);
      END_STATE();
    case 5:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(50);
      END_STATE();
    case 6:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(56);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(51);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'T') ADVANCE(40);
      if (lookahead == 'V') ADVANCE(44);
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
      if (lookahead == 'v') ADVANCE(42);
      if (lookahead == '{') ADVANCE(3);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(6)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 7:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(56);
      if (lookahead == '-') ADVANCE(5);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(51);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'T') ADVANCE(40);
      if (lookahead == 'V') ADVANCE(44);
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
      if (lookahead == 'v') ADVANCE(42);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(7)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(50);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_d);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_d);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_e);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_e);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_f);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_f);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_g);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_g);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_a);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_a);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_b);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(anon_sym_l);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(anon_sym_l);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(anon_sym_o);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(anon_sym_o);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_T);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_T);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(anon_sym_v);
      END_STATE();
    case 43:
      ACCEPT_TOKEN(anon_sym_v);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 44:
      ACCEPT_TOKEN(anon_sym_V);
      END_STATE();
    case 45:
      ACCEPT_TOKEN(anon_sym_V);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 46:
      ACCEPT_TOKEN(anon_sym_kt);
      END_STATE();
    case 47:
      ACCEPT_TOKEN(anon_sym_kt);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 48:
      ACCEPT_TOKEN(anon_sym_KT);
      END_STATE();
    case 49:
      ACCEPT_TOKEN(anon_sym_KT);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 50:
      ACCEPT_TOKEN(sym_signed_number);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(50);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 52:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 'T') ADVANCE(49);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 53:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 't') ADVANCE(47);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 54:
      ACCEPT_TOKEN(sym_instrument_name);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(54);
      END_STATE();
    case 55:
      ACCEPT_TOKEN(sym_json_args);
      END_STATE();
    case 56:
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
  [6] = {.lex_state = 6},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 6},
  [9] = {.lex_state = 6},
  [10] = {.lex_state = 6},
  [11] = {.lex_state = 6},
  [12] = {.lex_state = 6},
  [13] = {.lex_state = 6},
  [14] = {.lex_state = 6},
  [15] = {.lex_state = 7},
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
  [39] = {.lex_state = 6},
  [40] = {.lex_state = 6},
  [41] = {.lex_state = 0},
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
    [anon_sym_v] = ACTIONS(1),
    [anon_sym_V] = ACTIONS(1),
    [anon_sym_kt] = ACTIONS(1),
    [anon_sym_KT] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [sym_instrument_name] = ACTIONS(1),
    [sym_json_args] = ACTIONS(1),
    [anon_sym_SQUOTE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(41),
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_tempo_command] = STATE(2),
    [sym_volume_command] = STATE(2),
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
    [anon_sym_v] = ACTIONS(17),
    [anon_sym_V] = ACTIONS(17),
    [anon_sym_kt] = ACTIONS(19),
    [anon_sym_KT] = ACTIONS(19),
    [anon_sym_AT] = ACTIONS(21),
    [anon_sym_SQUOTE] = ACTIONS(23),
  },
  [2] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_volume_command] = STATE(3),
    [sym_key_transpose_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(25),
    [sym_track_separator] = ACTIONS(27),
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
    [sym_octave_up] = ACTIONS(27),
    [sym_octave_down] = ACTIONS(27),
    [anon_sym_t] = ACTIONS(15),
    [anon_sym_T] = ACTIONS(15),
    [anon_sym_v] = ACTIONS(17),
    [anon_sym_V] = ACTIONS(17),
    [anon_sym_kt] = ACTIONS(19),
    [anon_sym_KT] = ACTIONS(19),
    [anon_sym_AT] = ACTIONS(21),
    [anon_sym_SQUOTE] = ACTIONS(23),
  },
  [3] = {
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_volume_command] = STATE(3),
    [sym_key_transpose_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(29),
    [sym_track_separator] = ACTIONS(31),
    [anon_sym_c] = ACTIONS(34),
    [anon_sym_d] = ACTIONS(34),
    [anon_sym_e] = ACTIONS(34),
    [anon_sym_f] = ACTIONS(34),
    [anon_sym_g] = ACTIONS(34),
    [anon_sym_a] = ACTIONS(34),
    [anon_sym_b] = ACTIONS(34),
    [anon_sym_r] = ACTIONS(37),
    [anon_sym_l] = ACTIONS(40),
    [anon_sym_o] = ACTIONS(43),
    [sym_octave_up] = ACTIONS(31),
    [sym_octave_down] = ACTIONS(31),
    [anon_sym_t] = ACTIONS(46),
    [anon_sym_T] = ACTIONS(46),
    [anon_sym_v] = ACTIONS(49),
    [anon_sym_V] = ACTIONS(49),
    [anon_sym_kt] = ACTIONS(52),
    [anon_sym_KT] = ACTIONS(52),
    [anon_sym_AT] = ACTIONS(55),
    [anon_sym_SQUOTE] = ACTIONS(58),
  },
  [4] = {
    [sym_accidental] = STATE(8),
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
    [anon_sym_PLUS_PLUS] = ACTIONS(65),
    [anon_sym_DASH_DASH] = ACTIONS(65),
    [sym_duration] = ACTIONS(67),
    [sym_dots] = ACTIONS(69),
    [anon_sym_r] = ACTIONS(61),
    [anon_sym_l] = ACTIONS(61),
    [anon_sym_o] = ACTIONS(61),
    [sym_octave_up] = ACTIONS(61),
    [sym_octave_down] = ACTIONS(61),
    [anon_sym_t] = ACTIONS(61),
    [anon_sym_T] = ACTIONS(61),
    [anon_sym_v] = ACTIONS(61),
    [anon_sym_V] = ACTIONS(61),
    [anon_sym_kt] = ACTIONS(61),
    [anon_sym_KT] = ACTIONS(61),
    [anon_sym_AT] = ACTIONS(61),
    [anon_sym_SQUOTE] = ACTIONS(61),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(71),
    [sym_track_separator] = ACTIONS(71),
    [anon_sym_c] = ACTIONS(71),
    [anon_sym_d] = ACTIONS(71),
    [anon_sym_e] = ACTIONS(71),
    [anon_sym_f] = ACTIONS(71),
    [anon_sym_g] = ACTIONS(71),
    [anon_sym_a] = ACTIONS(71),
    [anon_sym_b] = ACTIONS(71),
    [anon_sym_PLUS] = ACTIONS(73),
    [anon_sym_DASH] = ACTIONS(73),
    [anon_sym_PLUS_PLUS] = ACTIONS(71),
    [anon_sym_DASH_DASH] = ACTIONS(71),
    [sym_duration] = ACTIONS(71),
    [sym_dots] = ACTIONS(71),
    [anon_sym_r] = ACTIONS(71),
    [anon_sym_l] = ACTIONS(71),
    [anon_sym_o] = ACTIONS(71),
    [sym_octave_up] = ACTIONS(71),
    [sym_octave_down] = ACTIONS(71),
    [anon_sym_t] = ACTIONS(71),
    [anon_sym_T] = ACTIONS(71),
    [anon_sym_v] = ACTIONS(71),
    [anon_sym_V] = ACTIONS(71),
    [anon_sym_kt] = ACTIONS(71),
    [anon_sym_KT] = ACTIONS(71),
    [anon_sym_AT] = ACTIONS(71),
    [anon_sym_SQUOTE] = ACTIONS(71),
  },
  [6] = {
    [ts_builtin_sym_end] = ACTIONS(75),
    [sym_track_separator] = ACTIONS(75),
    [anon_sym_c] = ACTIONS(75),
    [anon_sym_d] = ACTIONS(75),
    [anon_sym_e] = ACTIONS(75),
    [anon_sym_f] = ACTIONS(75),
    [anon_sym_g] = ACTIONS(75),
    [anon_sym_a] = ACTIONS(75),
    [anon_sym_b] = ACTIONS(75),
    [sym_duration] = ACTIONS(77),
    [sym_dots] = ACTIONS(79),
    [anon_sym_r] = ACTIONS(75),
    [anon_sym_l] = ACTIONS(75),
    [anon_sym_o] = ACTIONS(75),
    [sym_octave_up] = ACTIONS(75),
    [sym_octave_down] = ACTIONS(75),
    [anon_sym_t] = ACTIONS(75),
    [anon_sym_T] = ACTIONS(75),
    [anon_sym_v] = ACTIONS(75),
    [anon_sym_V] = ACTIONS(75),
    [anon_sym_kt] = ACTIONS(75),
    [anon_sym_KT] = ACTIONS(75),
    [anon_sym_AT] = ACTIONS(75),
    [anon_sym_SQUOTE] = ACTIONS(75),
  },
  [7] = {
    [ts_builtin_sym_end] = ACTIONS(81),
    [sym_track_separator] = ACTIONS(81),
    [anon_sym_c] = ACTIONS(83),
    [anon_sym_d] = ACTIONS(83),
    [anon_sym_e] = ACTIONS(83),
    [anon_sym_f] = ACTIONS(83),
    [anon_sym_g] = ACTIONS(83),
    [anon_sym_a] = ACTIONS(83),
    [anon_sym_b] = ACTIONS(83),
    [anon_sym_r] = ACTIONS(83),
    [anon_sym_l] = ACTIONS(83),
    [anon_sym_o] = ACTIONS(83),
    [sym_octave_up] = ACTIONS(81),
    [sym_octave_down] = ACTIONS(81),
    [anon_sym_t] = ACTIONS(83),
    [anon_sym_T] = ACTIONS(83),
    [anon_sym_v] = ACTIONS(83),
    [anon_sym_V] = ACTIONS(83),
    [anon_sym_kt] = ACTIONS(83),
    [anon_sym_KT] = ACTIONS(83),
    [anon_sym_AT] = ACTIONS(81),
    [sym_instrument_name] = ACTIONS(85),
    [sym_json_args] = ACTIONS(87),
    [anon_sym_SQUOTE] = ACTIONS(81),
  },
  [8] = {
    [ts_builtin_sym_end] = ACTIONS(89),
    [sym_track_separator] = ACTIONS(89),
    [anon_sym_c] = ACTIONS(89),
    [anon_sym_d] = ACTIONS(89),
    [anon_sym_e] = ACTIONS(89),
    [anon_sym_f] = ACTIONS(89),
    [anon_sym_g] = ACTIONS(89),
    [anon_sym_a] = ACTIONS(89),
    [anon_sym_b] = ACTIONS(89),
    [sym_duration] = ACTIONS(91),
    [sym_dots] = ACTIONS(93),
    [anon_sym_r] = ACTIONS(89),
    [anon_sym_l] = ACTIONS(89),
    [anon_sym_o] = ACTIONS(89),
    [sym_octave_up] = ACTIONS(89),
    [sym_octave_down] = ACTIONS(89),
    [anon_sym_t] = ACTIONS(89),
    [anon_sym_T] = ACTIONS(89),
    [anon_sym_v] = ACTIONS(89),
    [anon_sym_V] = ACTIONS(89),
    [anon_sym_kt] = ACTIONS(89),
    [anon_sym_KT] = ACTIONS(89),
    [anon_sym_AT] = ACTIONS(89),
    [anon_sym_SQUOTE] = ACTIONS(89),
  },
  [9] = {
    [ts_builtin_sym_end] = ACTIONS(95),
    [sym_track_separator] = ACTIONS(95),
    [anon_sym_c] = ACTIONS(95),
    [anon_sym_d] = ACTIONS(95),
    [anon_sym_e] = ACTIONS(95),
    [anon_sym_f] = ACTIONS(95),
    [anon_sym_g] = ACTIONS(95),
    [anon_sym_a] = ACTIONS(95),
    [anon_sym_b] = ACTIONS(95),
    [sym_duration] = ACTIONS(95),
    [sym_dots] = ACTIONS(95),
    [anon_sym_r] = ACTIONS(95),
    [anon_sym_l] = ACTIONS(95),
    [anon_sym_o] = ACTIONS(95),
    [sym_octave_up] = ACTIONS(95),
    [sym_octave_down] = ACTIONS(95),
    [anon_sym_t] = ACTIONS(95),
    [anon_sym_T] = ACTIONS(95),
    [anon_sym_v] = ACTIONS(95),
    [anon_sym_V] = ACTIONS(95),
    [anon_sym_kt] = ACTIONS(95),
    [anon_sym_KT] = ACTIONS(95),
    [anon_sym_AT] = ACTIONS(95),
    [anon_sym_SQUOTE] = ACTIONS(95),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 2,
    ACTIONS(99), 1,
      sym_json_args,
    ACTIONS(97), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [28] = 2,
    ACTIONS(103), 1,
      sym_duration,
    ACTIONS(101), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [56] = 2,
    ACTIONS(107), 1,
      sym_duration,
    ACTIONS(105), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [84] = 2,
    ACTIONS(111), 1,
      sym_duration,
    ACTIONS(109), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [112] = 2,
    ACTIONS(115), 1,
      sym_duration,
    ACTIONS(113), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [140] = 2,
    ACTIONS(119), 1,
      sym_signed_number,
    ACTIONS(117), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [168] = 2,
    ACTIONS(123), 1,
      sym_dots,
    ACTIONS(121), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [196] = 2,
    ACTIONS(127), 1,
      sym_dots,
    ACTIONS(125), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [224] = 2,
    ACTIONS(131), 1,
      sym_dots,
    ACTIONS(129), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [252] = 2,
    ACTIONS(135), 1,
      sym_dots,
    ACTIONS(133), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [280] = 1,
    ACTIONS(137), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [305] = 1,
    ACTIONS(139), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [330] = 1,
    ACTIONS(141), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [355] = 1,
    ACTIONS(143), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [380] = 1,
    ACTIONS(145), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [405] = 1,
    ACTIONS(147), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [430] = 1,
    ACTIONS(149), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [455] = 1,
    ACTIONS(151), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [480] = 1,
    ACTIONS(153), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [505] = 1,
    ACTIONS(155), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [530] = 1,
    ACTIONS(157), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [555] = 1,
    ACTIONS(159), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [580] = 1,
    ACTIONS(161), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [605] = 1,
    ACTIONS(163), 22,
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
      anon_sym_v,
      anon_sym_V,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [630] = 5,
    ACTIONS(167), 1,
      sym_duration,
    STATE(38), 1,
      sym_accidental,
    ACTIONS(63), 2,
      anon_sym_PLUS,
      anon_sym_DASH,
    ACTIONS(65), 2,
      anon_sym_PLUS_PLUS,
      anon_sym_DASH_DASH,
    ACTIONS(165), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [655] = 4,
    ACTIONS(172), 1,
      anon_sym_SQUOTE,
    STATE(34), 1,
      sym_note_pitch,
    STATE(35), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(169), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [675] = 4,
    ACTIONS(174), 1,
      anon_sym_SQUOTE,
    STATE(34), 1,
      sym_note_pitch,
    STATE(35), 2,
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
  [695] = 3,
    STATE(34), 1,
      sym_note_pitch,
    STATE(36), 2,
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
  [712] = 2,
    ACTIONS(178), 1,
      sym_duration,
    ACTIONS(176), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [726] = 1,
    ACTIONS(180), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [737] = 1,
    ACTIONS(182), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [748] = 1,
    ACTIONS(184), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(10)] = 0,
  [SMALL_STATE(11)] = 28,
  [SMALL_STATE(12)] = 56,
  [SMALL_STATE(13)] = 84,
  [SMALL_STATE(14)] = 112,
  [SMALL_STATE(15)] = 140,
  [SMALL_STATE(16)] = 168,
  [SMALL_STATE(17)] = 196,
  [SMALL_STATE(18)] = 224,
  [SMALL_STATE(19)] = 252,
  [SMALL_STATE(20)] = 280,
  [SMALL_STATE(21)] = 305,
  [SMALL_STATE(22)] = 330,
  [SMALL_STATE(23)] = 355,
  [SMALL_STATE(24)] = 380,
  [SMALL_STATE(25)] = 405,
  [SMALL_STATE(26)] = 430,
  [SMALL_STATE(27)] = 455,
  [SMALL_STATE(28)] = 480,
  [SMALL_STATE(29)] = 505,
  [SMALL_STATE(30)] = 530,
  [SMALL_STATE(31)] = 555,
  [SMALL_STATE(32)] = 580,
  [SMALL_STATE(33)] = 605,
  [SMALL_STATE(34)] = 630,
  [SMALL_STATE(35)] = 655,
  [SMALL_STATE(36)] = 675,
  [SMALL_STATE(37)] = 695,
  [SMALL_STATE(38)] = 712,
  [SMALL_STATE(39)] = 726,
  [SMALL_STATE(40)] = 737,
  [SMALL_STATE(41)] = 748,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [25] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [31] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(3),
  [34] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [37] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(6),
  [40] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(11),
  [43] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(12),
  [46] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(13),
  [49] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(14),
  [52] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(15),
  [55] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [58] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(37),
  [61] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 1, .production_id = 1),
  [63] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [65] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [71] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note_pitch, 1),
  [73] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_note_pitch, 1),
  [75] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 1),
  [77] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [79] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 1),
  [83] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instrument_command, 1),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(10),
  [87] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [89] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 9),
  [91] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [95] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_accidental, 1),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 5),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [101] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 1),
  [103] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [105] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 1),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [109] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 1),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [113] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_volume_command, 1),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [117] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 1),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [121] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 14),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [125] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 3, .production_id = 12),
  [127] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [129] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 2),
  [131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [133] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 7),
  [135] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [137] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 3, .production_id = 10),
  [139] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 3, .production_id = 11),
  [141] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 6),
  [143] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 4, .production_id = 17),
  [145] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 4, .production_id = 16),
  [147] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 15),
  [149] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_volume_command, 2, .production_id = 4),
  [151] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 8),
  [153] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 2, .production_id = 4),
  [155] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 2, .production_id = 4),
  [157] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 2, .production_id = 4),
  [159] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 2, .production_id = 4),
  [161] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 13),
  [163] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 3),
  [165] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 1, .production_id = 1),
  [167] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [169] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2), SHIFT_REPEAT(5),
  [172] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2),
  [174] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [176] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 9),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [180] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 7),
  [182] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 3, .production_id = 14),
  [184] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
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
