#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 44
#define LARGE_STATE_COUNT 21
#define SYMBOL_COUNT 49
#define ALIAS_COUNT 0
#define TOKEN_COUNT 33
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
  anon_sym_q = 24,
  anon_sym_Q = 25,
  anon_sym_kt = 26,
  anon_sym_KT = 27,
  sym_signed_number = 28,
  anon_sym_AT = 29,
  sym_instrument_name = 30,
  sym_json_args = 31,
  anon_sym_SQUOTE = 32,
  sym_source_file = 33,
  sym_note = 34,
  sym_note_pitch = 35,
  sym_accidental = 36,
  sym_rest = 37,
  sym_length_command = 38,
  sym_octave_command = 39,
  sym_tempo_command = 40,
  sym_volume_command = 41,
  sym_gate_time_command = 42,
  sym_key_transpose_command = 43,
  sym_instrument_command = 44,
  sym_chord = 45,
  sym_chord_note = 46,
  aux_sym_source_file_repeat1 = 47,
  aux_sym_chord_repeat1 = 48,
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
  [anon_sym_q] = "q",
  [anon_sym_Q] = "Q",
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
  [sym_gate_time_command] = "gate_time_command",
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
  [anon_sym_q] = anon_sym_q,
  [anon_sym_Q] = anon_sym_Q,
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
  [sym_gate_time_command] = sym_gate_time_command,
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
  [anon_sym_q] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_Q] = {
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
  [sym_gate_time_command] = {
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
  [42] = 42,
  [43] = 43,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(60);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(55);
      if (lookahead == 'K') ADVANCE(56);
      if (lookahead == 'Q') ADVANCE(49);
      if (lookahead == 'T') ADVANCE(41);
      if (lookahead == 'V') ADVANCE(45);
      if (lookahead == 'a') ADVANCE(21);
      if (lookahead == 'b') ADVANCE(23);
      if (lookahead == 'c') ADVANCE(11);
      if (lookahead == 'd') ADVANCE(13);
      if (lookahead == 'e') ADVANCE(15);
      if (lookahead == 'f') ADVANCE(17);
      if (lookahead == 'g') ADVANCE(19);
      if (lookahead == 'k') ADVANCE(57);
      if (lookahead == 'l') ADVANCE(33);
      if (lookahead == 'o') ADVANCE(35);
      if (lookahead == 'q') ADVANCE(47);
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
          ('h' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 1:
      if (lookahead == 'T') ADVANCE(52);
      END_STATE();
    case 2:
      if (lookahead == 't') ADVANCE(50);
      END_STATE();
    case 3:
      if (lookahead == '{') ADVANCE(4);
      if (lookahead == '}') ADVANCE(59);
      if (lookahead != 0) ADVANCE(3);
      END_STATE();
    case 4:
      if (lookahead == '}') ADVANCE(3);
      if (lookahead != 0) ADVANCE(4);
      END_STATE();
    case 5:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(54);
      END_STATE();
    case 6:
      if (eof) ADVANCE(8);
      if (lookahead == '\'') ADVANCE(60);
      if (lookahead == '+') ADVANCE(24);
      if (lookahead == '-') ADVANCE(25);
      if (lookahead == '.') ADVANCE(29);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(55);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'Q') ADVANCE(48);
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
      if (lookahead == 'q') ADVANCE(46);
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
      if (lookahead == '\'') ADVANCE(60);
      if (lookahead == '-') ADVANCE(5);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '<') ADVANCE(36);
      if (lookahead == '>') ADVANCE(37);
      if (lookahead == '@') ADVANCE(55);
      if (lookahead == 'K') ADVANCE(1);
      if (lookahead == 'Q') ADVANCE(48);
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
      if (lookahead == 'q') ADVANCE(46);
      if (lookahead == 'r') ADVANCE(30);
      if (lookahead == 't') ADVANCE(38);
      if (lookahead == 'v') ADVANCE(42);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(7)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(54);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_d);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_d);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_e);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_e);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_f);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_f);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_g);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_g);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_a);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_a);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_b);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(anon_sym_l);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(anon_sym_l);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(anon_sym_o);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(anon_sym_o);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
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
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_T);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_T);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(anon_sym_v);
      END_STATE();
    case 43:
      ACCEPT_TOKEN(anon_sym_v);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 44:
      ACCEPT_TOKEN(anon_sym_V);
      END_STATE();
    case 45:
      ACCEPT_TOKEN(anon_sym_V);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 46:
      ACCEPT_TOKEN(anon_sym_q);
      END_STATE();
    case 47:
      ACCEPT_TOKEN(anon_sym_q);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 48:
      ACCEPT_TOKEN(anon_sym_Q);
      END_STATE();
    case 49:
      ACCEPT_TOKEN(anon_sym_Q);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 50:
      ACCEPT_TOKEN(anon_sym_kt);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(anon_sym_kt);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 52:
      ACCEPT_TOKEN(anon_sym_KT);
      END_STATE();
    case 53:
      ACCEPT_TOKEN(anon_sym_KT);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 54:
      ACCEPT_TOKEN(sym_signed_number);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(54);
      END_STATE();
    case 55:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 56:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 'T') ADVANCE(53);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 57:
      ACCEPT_TOKEN(sym_instrument_name);
      if (lookahead == 't') ADVANCE(51);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 58:
      ACCEPT_TOKEN(sym_instrument_name);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(58);
      END_STATE();
    case 59:
      ACCEPT_TOKEN(sym_json_args);
      END_STATE();
    case 60:
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
  [13] = {.lex_state = 6},
  [14] = {.lex_state = 7},
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
  [39] = {.lex_state = 6},
  [40] = {.lex_state = 6},
  [41] = {.lex_state = 6},
  [42] = {.lex_state = 6},
  [43] = {.lex_state = 0},
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
    [anon_sym_q] = ACTIONS(1),
    [anon_sym_Q] = ACTIONS(1),
    [anon_sym_kt] = ACTIONS(1),
    [anon_sym_KT] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [sym_instrument_name] = ACTIONS(1),
    [sym_json_args] = ACTIONS(1),
    [anon_sym_SQUOTE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(43),
    [sym_note] = STATE(3),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(3),
    [sym_length_command] = STATE(3),
    [sym_octave_command] = STATE(3),
    [sym_tempo_command] = STATE(3),
    [sym_volume_command] = STATE(3),
    [sym_gate_time_command] = STATE(3),
    [sym_key_transpose_command] = STATE(3),
    [sym_instrument_command] = STATE(3),
    [sym_chord] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
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
    [anon_sym_q] = ACTIONS(19),
    [anon_sym_Q] = ACTIONS(19),
    [anon_sym_kt] = ACTIONS(21),
    [anon_sym_KT] = ACTIONS(21),
    [anon_sym_AT] = ACTIONS(23),
    [anon_sym_SQUOTE] = ACTIONS(25),
  },
  [2] = {
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_tempo_command] = STATE(2),
    [sym_volume_command] = STATE(2),
    [sym_gate_time_command] = STATE(2),
    [sym_key_transpose_command] = STATE(2),
    [sym_instrument_command] = STATE(2),
    [sym_chord] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
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
    [anon_sym_v] = ACTIONS(47),
    [anon_sym_V] = ACTIONS(47),
    [anon_sym_q] = ACTIONS(50),
    [anon_sym_Q] = ACTIONS(50),
    [anon_sym_kt] = ACTIONS(53),
    [anon_sym_KT] = ACTIONS(53),
    [anon_sym_AT] = ACTIONS(56),
    [anon_sym_SQUOTE] = ACTIONS(59),
  },
  [3] = {
    [sym_note] = STATE(2),
    [sym_note_pitch] = STATE(4),
    [sym_rest] = STATE(2),
    [sym_length_command] = STATE(2),
    [sym_octave_command] = STATE(2),
    [sym_tempo_command] = STATE(2),
    [sym_volume_command] = STATE(2),
    [sym_gate_time_command] = STATE(2),
    [sym_key_transpose_command] = STATE(2),
    [sym_instrument_command] = STATE(2),
    [sym_chord] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(62),
    [sym_track_separator] = ACTIONS(64),
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
    [sym_octave_up] = ACTIONS(64),
    [sym_octave_down] = ACTIONS(64),
    [anon_sym_t] = ACTIONS(15),
    [anon_sym_T] = ACTIONS(15),
    [anon_sym_v] = ACTIONS(17),
    [anon_sym_V] = ACTIONS(17),
    [anon_sym_q] = ACTIONS(19),
    [anon_sym_Q] = ACTIONS(19),
    [anon_sym_kt] = ACTIONS(21),
    [anon_sym_KT] = ACTIONS(21),
    [anon_sym_AT] = ACTIONS(23),
    [anon_sym_SQUOTE] = ACTIONS(25),
  },
  [4] = {
    [sym_accidental] = STATE(9),
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
    [anon_sym_PLUS_PLUS] = ACTIONS(70),
    [anon_sym_DASH_DASH] = ACTIONS(70),
    [sym_duration] = ACTIONS(72),
    [sym_dots] = ACTIONS(74),
    [anon_sym_r] = ACTIONS(66),
    [anon_sym_l] = ACTIONS(66),
    [anon_sym_o] = ACTIONS(66),
    [sym_octave_up] = ACTIONS(66),
    [sym_octave_down] = ACTIONS(66),
    [anon_sym_t] = ACTIONS(66),
    [anon_sym_T] = ACTIONS(66),
    [anon_sym_v] = ACTIONS(66),
    [anon_sym_V] = ACTIONS(66),
    [anon_sym_q] = ACTIONS(66),
    [anon_sym_Q] = ACTIONS(66),
    [anon_sym_kt] = ACTIONS(66),
    [anon_sym_KT] = ACTIONS(66),
    [anon_sym_AT] = ACTIONS(66),
    [anon_sym_SQUOTE] = ACTIONS(66),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(76),
    [sym_track_separator] = ACTIONS(76),
    [anon_sym_c] = ACTIONS(76),
    [anon_sym_d] = ACTIONS(76),
    [anon_sym_e] = ACTIONS(76),
    [anon_sym_f] = ACTIONS(76),
    [anon_sym_g] = ACTIONS(76),
    [anon_sym_a] = ACTIONS(76),
    [anon_sym_b] = ACTIONS(76),
    [anon_sym_PLUS] = ACTIONS(78),
    [anon_sym_DASH] = ACTIONS(78),
    [anon_sym_PLUS_PLUS] = ACTIONS(76),
    [anon_sym_DASH_DASH] = ACTIONS(76),
    [sym_duration] = ACTIONS(76),
    [sym_dots] = ACTIONS(76),
    [anon_sym_r] = ACTIONS(76),
    [anon_sym_l] = ACTIONS(76),
    [anon_sym_o] = ACTIONS(76),
    [sym_octave_up] = ACTIONS(76),
    [sym_octave_down] = ACTIONS(76),
    [anon_sym_t] = ACTIONS(76),
    [anon_sym_T] = ACTIONS(76),
    [anon_sym_v] = ACTIONS(76),
    [anon_sym_V] = ACTIONS(76),
    [anon_sym_q] = ACTIONS(76),
    [anon_sym_Q] = ACTIONS(76),
    [anon_sym_kt] = ACTIONS(76),
    [anon_sym_KT] = ACTIONS(76),
    [anon_sym_AT] = ACTIONS(76),
    [anon_sym_SQUOTE] = ACTIONS(76),
  },
  [6] = {
    [ts_builtin_sym_end] = ACTIONS(80),
    [sym_track_separator] = ACTIONS(80),
    [anon_sym_c] = ACTIONS(82),
    [anon_sym_d] = ACTIONS(82),
    [anon_sym_e] = ACTIONS(82),
    [anon_sym_f] = ACTIONS(82),
    [anon_sym_g] = ACTIONS(82),
    [anon_sym_a] = ACTIONS(82),
    [anon_sym_b] = ACTIONS(82),
    [anon_sym_r] = ACTIONS(82),
    [anon_sym_l] = ACTIONS(82),
    [anon_sym_o] = ACTIONS(82),
    [sym_octave_up] = ACTIONS(80),
    [sym_octave_down] = ACTIONS(80),
    [anon_sym_t] = ACTIONS(82),
    [anon_sym_T] = ACTIONS(82),
    [anon_sym_v] = ACTIONS(82),
    [anon_sym_V] = ACTIONS(82),
    [anon_sym_q] = ACTIONS(82),
    [anon_sym_Q] = ACTIONS(82),
    [anon_sym_kt] = ACTIONS(82),
    [anon_sym_KT] = ACTIONS(82),
    [anon_sym_AT] = ACTIONS(80),
    [sym_instrument_name] = ACTIONS(84),
    [sym_json_args] = ACTIONS(86),
    [anon_sym_SQUOTE] = ACTIONS(80),
  },
  [7] = {
    [ts_builtin_sym_end] = ACTIONS(88),
    [sym_track_separator] = ACTIONS(88),
    [anon_sym_c] = ACTIONS(88),
    [anon_sym_d] = ACTIONS(88),
    [anon_sym_e] = ACTIONS(88),
    [anon_sym_f] = ACTIONS(88),
    [anon_sym_g] = ACTIONS(88),
    [anon_sym_a] = ACTIONS(88),
    [anon_sym_b] = ACTIONS(88),
    [sym_duration] = ACTIONS(90),
    [sym_dots] = ACTIONS(92),
    [anon_sym_r] = ACTIONS(88),
    [anon_sym_l] = ACTIONS(88),
    [anon_sym_o] = ACTIONS(88),
    [sym_octave_up] = ACTIONS(88),
    [sym_octave_down] = ACTIONS(88),
    [anon_sym_t] = ACTIONS(88),
    [anon_sym_T] = ACTIONS(88),
    [anon_sym_v] = ACTIONS(88),
    [anon_sym_V] = ACTIONS(88),
    [anon_sym_q] = ACTIONS(88),
    [anon_sym_Q] = ACTIONS(88),
    [anon_sym_kt] = ACTIONS(88),
    [anon_sym_KT] = ACTIONS(88),
    [anon_sym_AT] = ACTIONS(88),
    [anon_sym_SQUOTE] = ACTIONS(88),
  },
  [8] = {
    [ts_builtin_sym_end] = ACTIONS(94),
    [sym_track_separator] = ACTIONS(94),
    [anon_sym_c] = ACTIONS(94),
    [anon_sym_d] = ACTIONS(94),
    [anon_sym_e] = ACTIONS(94),
    [anon_sym_f] = ACTIONS(94),
    [anon_sym_g] = ACTIONS(94),
    [anon_sym_a] = ACTIONS(94),
    [anon_sym_b] = ACTIONS(94),
    [sym_duration] = ACTIONS(94),
    [sym_dots] = ACTIONS(94),
    [anon_sym_r] = ACTIONS(94),
    [anon_sym_l] = ACTIONS(94),
    [anon_sym_o] = ACTIONS(94),
    [sym_octave_up] = ACTIONS(94),
    [sym_octave_down] = ACTIONS(94),
    [anon_sym_t] = ACTIONS(94),
    [anon_sym_T] = ACTIONS(94),
    [anon_sym_v] = ACTIONS(94),
    [anon_sym_V] = ACTIONS(94),
    [anon_sym_q] = ACTIONS(94),
    [anon_sym_Q] = ACTIONS(94),
    [anon_sym_kt] = ACTIONS(94),
    [anon_sym_KT] = ACTIONS(94),
    [anon_sym_AT] = ACTIONS(94),
    [anon_sym_SQUOTE] = ACTIONS(94),
  },
  [9] = {
    [ts_builtin_sym_end] = ACTIONS(96),
    [sym_track_separator] = ACTIONS(96),
    [anon_sym_c] = ACTIONS(96),
    [anon_sym_d] = ACTIONS(96),
    [anon_sym_e] = ACTIONS(96),
    [anon_sym_f] = ACTIONS(96),
    [anon_sym_g] = ACTIONS(96),
    [anon_sym_a] = ACTIONS(96),
    [anon_sym_b] = ACTIONS(96),
    [sym_duration] = ACTIONS(98),
    [sym_dots] = ACTIONS(100),
    [anon_sym_r] = ACTIONS(96),
    [anon_sym_l] = ACTIONS(96),
    [anon_sym_o] = ACTIONS(96),
    [sym_octave_up] = ACTIONS(96),
    [sym_octave_down] = ACTIONS(96),
    [anon_sym_t] = ACTIONS(96),
    [anon_sym_T] = ACTIONS(96),
    [anon_sym_v] = ACTIONS(96),
    [anon_sym_V] = ACTIONS(96),
    [anon_sym_q] = ACTIONS(96),
    [anon_sym_Q] = ACTIONS(96),
    [anon_sym_kt] = ACTIONS(96),
    [anon_sym_KT] = ACTIONS(96),
    [anon_sym_AT] = ACTIONS(96),
    [anon_sym_SQUOTE] = ACTIONS(96),
  },
  [10] = {
    [ts_builtin_sym_end] = ACTIONS(102),
    [sym_track_separator] = ACTIONS(102),
    [anon_sym_c] = ACTIONS(102),
    [anon_sym_d] = ACTIONS(102),
    [anon_sym_e] = ACTIONS(102),
    [anon_sym_f] = ACTIONS(102),
    [anon_sym_g] = ACTIONS(102),
    [anon_sym_a] = ACTIONS(102),
    [anon_sym_b] = ACTIONS(102),
    [sym_duration] = ACTIONS(104),
    [anon_sym_r] = ACTIONS(102),
    [anon_sym_l] = ACTIONS(102),
    [anon_sym_o] = ACTIONS(102),
    [sym_octave_up] = ACTIONS(102),
    [sym_octave_down] = ACTIONS(102),
    [anon_sym_t] = ACTIONS(102),
    [anon_sym_T] = ACTIONS(102),
    [anon_sym_v] = ACTIONS(102),
    [anon_sym_V] = ACTIONS(102),
    [anon_sym_q] = ACTIONS(102),
    [anon_sym_Q] = ACTIONS(102),
    [anon_sym_kt] = ACTIONS(102),
    [anon_sym_KT] = ACTIONS(102),
    [anon_sym_AT] = ACTIONS(102),
    [anon_sym_SQUOTE] = ACTIONS(102),
  },
  [11] = {
    [ts_builtin_sym_end] = ACTIONS(106),
    [sym_track_separator] = ACTIONS(106),
    [anon_sym_c] = ACTIONS(106),
    [anon_sym_d] = ACTIONS(106),
    [anon_sym_e] = ACTIONS(106),
    [anon_sym_f] = ACTIONS(106),
    [anon_sym_g] = ACTIONS(106),
    [anon_sym_a] = ACTIONS(106),
    [anon_sym_b] = ACTIONS(106),
    [sym_dots] = ACTIONS(108),
    [anon_sym_r] = ACTIONS(106),
    [anon_sym_l] = ACTIONS(106),
    [anon_sym_o] = ACTIONS(106),
    [sym_octave_up] = ACTIONS(106),
    [sym_octave_down] = ACTIONS(106),
    [anon_sym_t] = ACTIONS(106),
    [anon_sym_T] = ACTIONS(106),
    [anon_sym_v] = ACTIONS(106),
    [anon_sym_V] = ACTIONS(106),
    [anon_sym_q] = ACTIONS(106),
    [anon_sym_Q] = ACTIONS(106),
    [anon_sym_kt] = ACTIONS(106),
    [anon_sym_KT] = ACTIONS(106),
    [anon_sym_AT] = ACTIONS(106),
    [anon_sym_SQUOTE] = ACTIONS(106),
  },
  [12] = {
    [ts_builtin_sym_end] = ACTIONS(110),
    [sym_track_separator] = ACTIONS(110),
    [anon_sym_c] = ACTIONS(110),
    [anon_sym_d] = ACTIONS(110),
    [anon_sym_e] = ACTIONS(110),
    [anon_sym_f] = ACTIONS(110),
    [anon_sym_g] = ACTIONS(110),
    [anon_sym_a] = ACTIONS(110),
    [anon_sym_b] = ACTIONS(110),
    [sym_dots] = ACTIONS(112),
    [anon_sym_r] = ACTIONS(110),
    [anon_sym_l] = ACTIONS(110),
    [anon_sym_o] = ACTIONS(110),
    [sym_octave_up] = ACTIONS(110),
    [sym_octave_down] = ACTIONS(110),
    [anon_sym_t] = ACTIONS(110),
    [anon_sym_T] = ACTIONS(110),
    [anon_sym_v] = ACTIONS(110),
    [anon_sym_V] = ACTIONS(110),
    [anon_sym_q] = ACTIONS(110),
    [anon_sym_Q] = ACTIONS(110),
    [anon_sym_kt] = ACTIONS(110),
    [anon_sym_KT] = ACTIONS(110),
    [anon_sym_AT] = ACTIONS(110),
    [anon_sym_SQUOTE] = ACTIONS(110),
  },
  [13] = {
    [ts_builtin_sym_end] = ACTIONS(114),
    [sym_track_separator] = ACTIONS(114),
    [anon_sym_c] = ACTIONS(114),
    [anon_sym_d] = ACTIONS(114),
    [anon_sym_e] = ACTIONS(114),
    [anon_sym_f] = ACTIONS(114),
    [anon_sym_g] = ACTIONS(114),
    [anon_sym_a] = ACTIONS(114),
    [anon_sym_b] = ACTIONS(114),
    [sym_duration] = ACTIONS(116),
    [anon_sym_r] = ACTIONS(114),
    [anon_sym_l] = ACTIONS(114),
    [anon_sym_o] = ACTIONS(114),
    [sym_octave_up] = ACTIONS(114),
    [sym_octave_down] = ACTIONS(114),
    [anon_sym_t] = ACTIONS(114),
    [anon_sym_T] = ACTIONS(114),
    [anon_sym_v] = ACTIONS(114),
    [anon_sym_V] = ACTIONS(114),
    [anon_sym_q] = ACTIONS(114),
    [anon_sym_Q] = ACTIONS(114),
    [anon_sym_kt] = ACTIONS(114),
    [anon_sym_KT] = ACTIONS(114),
    [anon_sym_AT] = ACTIONS(114),
    [anon_sym_SQUOTE] = ACTIONS(114),
  },
  [14] = {
    [ts_builtin_sym_end] = ACTIONS(118),
    [sym_track_separator] = ACTIONS(118),
    [anon_sym_c] = ACTIONS(118),
    [anon_sym_d] = ACTIONS(118),
    [anon_sym_e] = ACTIONS(118),
    [anon_sym_f] = ACTIONS(118),
    [anon_sym_g] = ACTIONS(118),
    [anon_sym_a] = ACTIONS(118),
    [anon_sym_b] = ACTIONS(118),
    [anon_sym_r] = ACTIONS(118),
    [anon_sym_l] = ACTIONS(118),
    [anon_sym_o] = ACTIONS(118),
    [sym_octave_up] = ACTIONS(118),
    [sym_octave_down] = ACTIONS(118),
    [anon_sym_t] = ACTIONS(118),
    [anon_sym_T] = ACTIONS(118),
    [anon_sym_v] = ACTIONS(118),
    [anon_sym_V] = ACTIONS(118),
    [anon_sym_q] = ACTIONS(118),
    [anon_sym_Q] = ACTIONS(118),
    [anon_sym_kt] = ACTIONS(118),
    [anon_sym_KT] = ACTIONS(118),
    [sym_signed_number] = ACTIONS(120),
    [anon_sym_AT] = ACTIONS(118),
    [anon_sym_SQUOTE] = ACTIONS(118),
  },
  [15] = {
    [ts_builtin_sym_end] = ACTIONS(122),
    [sym_track_separator] = ACTIONS(122),
    [anon_sym_c] = ACTIONS(122),
    [anon_sym_d] = ACTIONS(122),
    [anon_sym_e] = ACTIONS(122),
    [anon_sym_f] = ACTIONS(122),
    [anon_sym_g] = ACTIONS(122),
    [anon_sym_a] = ACTIONS(122),
    [anon_sym_b] = ACTIONS(122),
    [sym_dots] = ACTIONS(124),
    [anon_sym_r] = ACTIONS(122),
    [anon_sym_l] = ACTIONS(122),
    [anon_sym_o] = ACTIONS(122),
    [sym_octave_up] = ACTIONS(122),
    [sym_octave_down] = ACTIONS(122),
    [anon_sym_t] = ACTIONS(122),
    [anon_sym_T] = ACTIONS(122),
    [anon_sym_v] = ACTIONS(122),
    [anon_sym_V] = ACTIONS(122),
    [anon_sym_q] = ACTIONS(122),
    [anon_sym_Q] = ACTIONS(122),
    [anon_sym_kt] = ACTIONS(122),
    [anon_sym_KT] = ACTIONS(122),
    [anon_sym_AT] = ACTIONS(122),
    [anon_sym_SQUOTE] = ACTIONS(122),
  },
  [16] = {
    [ts_builtin_sym_end] = ACTIONS(126),
    [sym_track_separator] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
    [anon_sym_d] = ACTIONS(126),
    [anon_sym_e] = ACTIONS(126),
    [anon_sym_f] = ACTIONS(126),
    [anon_sym_g] = ACTIONS(126),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [sym_duration] = ACTIONS(128),
    [anon_sym_r] = ACTIONS(126),
    [anon_sym_l] = ACTIONS(126),
    [anon_sym_o] = ACTIONS(126),
    [sym_octave_up] = ACTIONS(126),
    [sym_octave_down] = ACTIONS(126),
    [anon_sym_t] = ACTIONS(126),
    [anon_sym_T] = ACTIONS(126),
    [anon_sym_v] = ACTIONS(126),
    [anon_sym_V] = ACTIONS(126),
    [anon_sym_q] = ACTIONS(126),
    [anon_sym_Q] = ACTIONS(126),
    [anon_sym_kt] = ACTIONS(126),
    [anon_sym_KT] = ACTIONS(126),
    [anon_sym_AT] = ACTIONS(126),
    [anon_sym_SQUOTE] = ACTIONS(126),
  },
  [17] = {
    [ts_builtin_sym_end] = ACTIONS(130),
    [sym_track_separator] = ACTIONS(130),
    [anon_sym_c] = ACTIONS(130),
    [anon_sym_d] = ACTIONS(130),
    [anon_sym_e] = ACTIONS(130),
    [anon_sym_f] = ACTIONS(130),
    [anon_sym_g] = ACTIONS(130),
    [anon_sym_a] = ACTIONS(130),
    [anon_sym_b] = ACTIONS(130),
    [sym_duration] = ACTIONS(132),
    [anon_sym_r] = ACTIONS(130),
    [anon_sym_l] = ACTIONS(130),
    [anon_sym_o] = ACTIONS(130),
    [sym_octave_up] = ACTIONS(130),
    [sym_octave_down] = ACTIONS(130),
    [anon_sym_t] = ACTIONS(130),
    [anon_sym_T] = ACTIONS(130),
    [anon_sym_v] = ACTIONS(130),
    [anon_sym_V] = ACTIONS(130),
    [anon_sym_q] = ACTIONS(130),
    [anon_sym_Q] = ACTIONS(130),
    [anon_sym_kt] = ACTIONS(130),
    [anon_sym_KT] = ACTIONS(130),
    [anon_sym_AT] = ACTIONS(130),
    [anon_sym_SQUOTE] = ACTIONS(130),
  },
  [18] = {
    [ts_builtin_sym_end] = ACTIONS(134),
    [sym_track_separator] = ACTIONS(134),
    [anon_sym_c] = ACTIONS(134),
    [anon_sym_d] = ACTIONS(134),
    [anon_sym_e] = ACTIONS(134),
    [anon_sym_f] = ACTIONS(134),
    [anon_sym_g] = ACTIONS(134),
    [anon_sym_a] = ACTIONS(134),
    [anon_sym_b] = ACTIONS(134),
    [sym_duration] = ACTIONS(136),
    [anon_sym_r] = ACTIONS(134),
    [anon_sym_l] = ACTIONS(134),
    [anon_sym_o] = ACTIONS(134),
    [sym_octave_up] = ACTIONS(134),
    [sym_octave_down] = ACTIONS(134),
    [anon_sym_t] = ACTIONS(134),
    [anon_sym_T] = ACTIONS(134),
    [anon_sym_v] = ACTIONS(134),
    [anon_sym_V] = ACTIONS(134),
    [anon_sym_q] = ACTIONS(134),
    [anon_sym_Q] = ACTIONS(134),
    [anon_sym_kt] = ACTIONS(134),
    [anon_sym_KT] = ACTIONS(134),
    [anon_sym_AT] = ACTIONS(134),
    [anon_sym_SQUOTE] = ACTIONS(134),
  },
  [19] = {
    [ts_builtin_sym_end] = ACTIONS(138),
    [sym_track_separator] = ACTIONS(138),
    [anon_sym_c] = ACTIONS(138),
    [anon_sym_d] = ACTIONS(138),
    [anon_sym_e] = ACTIONS(138),
    [anon_sym_f] = ACTIONS(138),
    [anon_sym_g] = ACTIONS(138),
    [anon_sym_a] = ACTIONS(138),
    [anon_sym_b] = ACTIONS(138),
    [sym_dots] = ACTIONS(140),
    [anon_sym_r] = ACTIONS(138),
    [anon_sym_l] = ACTIONS(138),
    [anon_sym_o] = ACTIONS(138),
    [sym_octave_up] = ACTIONS(138),
    [sym_octave_down] = ACTIONS(138),
    [anon_sym_t] = ACTIONS(138),
    [anon_sym_T] = ACTIONS(138),
    [anon_sym_v] = ACTIONS(138),
    [anon_sym_V] = ACTIONS(138),
    [anon_sym_q] = ACTIONS(138),
    [anon_sym_Q] = ACTIONS(138),
    [anon_sym_kt] = ACTIONS(138),
    [anon_sym_KT] = ACTIONS(138),
    [anon_sym_AT] = ACTIONS(138),
    [anon_sym_SQUOTE] = ACTIONS(138),
  },
  [20] = {
    [ts_builtin_sym_end] = ACTIONS(142),
    [sym_track_separator] = ACTIONS(142),
    [anon_sym_c] = ACTIONS(142),
    [anon_sym_d] = ACTIONS(142),
    [anon_sym_e] = ACTIONS(142),
    [anon_sym_f] = ACTIONS(142),
    [anon_sym_g] = ACTIONS(142),
    [anon_sym_a] = ACTIONS(142),
    [anon_sym_b] = ACTIONS(142),
    [anon_sym_r] = ACTIONS(142),
    [anon_sym_l] = ACTIONS(142),
    [anon_sym_o] = ACTIONS(142),
    [sym_octave_up] = ACTIONS(142),
    [sym_octave_down] = ACTIONS(142),
    [anon_sym_t] = ACTIONS(142),
    [anon_sym_T] = ACTIONS(142),
    [anon_sym_v] = ACTIONS(142),
    [anon_sym_V] = ACTIONS(142),
    [anon_sym_q] = ACTIONS(142),
    [anon_sym_Q] = ACTIONS(142),
    [anon_sym_kt] = ACTIONS(142),
    [anon_sym_KT] = ACTIONS(142),
    [anon_sym_AT] = ACTIONS(142),
    [sym_json_args] = ACTIONS(144),
    [anon_sym_SQUOTE] = ACTIONS(142),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 1,
    ACTIONS(146), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [27] = 1,
    ACTIONS(148), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [54] = 1,
    ACTIONS(150), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [81] = 1,
    ACTIONS(152), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [108] = 1,
    ACTIONS(154), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [135] = 1,
    ACTIONS(156), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [162] = 1,
    ACTIONS(158), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [189] = 1,
    ACTIONS(160), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [216] = 1,
    ACTIONS(162), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [243] = 1,
    ACTIONS(164), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [270] = 1,
    ACTIONS(166), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [297] = 1,
    ACTIONS(168), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [324] = 1,
    ACTIONS(170), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [351] = 1,
    ACTIONS(172), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [378] = 1,
    ACTIONS(174), 24,
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
      anon_sym_q,
      anon_sym_Q,
      anon_sym_kt,
      anon_sym_KT,
      anon_sym_AT,
      anon_sym_SQUOTE,
  [405] = 5,
    ACTIONS(178), 1,
      sym_duration,
    STATE(40), 1,
      sym_accidental,
    ACTIONS(68), 2,
      anon_sym_PLUS,
      anon_sym_DASH,
    ACTIONS(70), 2,
      anon_sym_PLUS_PLUS,
      anon_sym_DASH_DASH,
    ACTIONS(176), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [430] = 4,
    ACTIONS(183), 1,
      anon_sym_SQUOTE,
    STATE(36), 1,
      sym_note_pitch,
    STATE(37), 2,
      sym_chord_note,
      aux_sym_chord_repeat1,
    ACTIONS(180), 7,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
  [450] = 4,
    ACTIONS(185), 1,
      anon_sym_SQUOTE,
    STATE(36), 1,
      sym_note_pitch,
    STATE(37), 2,
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
  [470] = 3,
    STATE(36), 1,
      sym_note_pitch,
    STATE(38), 2,
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
  [487] = 2,
    ACTIONS(189), 1,
      sym_duration,
    ACTIONS(187), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [501] = 1,
    ACTIONS(191), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [512] = 1,
    ACTIONS(193), 8,
      anon_sym_c,
      anon_sym_d,
      anon_sym_e,
      anon_sym_f,
      anon_sym_g,
      anon_sym_a,
      anon_sym_b,
      anon_sym_SQUOTE,
  [523] = 1,
    ACTIONS(195), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(21)] = 0,
  [SMALL_STATE(22)] = 27,
  [SMALL_STATE(23)] = 54,
  [SMALL_STATE(24)] = 81,
  [SMALL_STATE(25)] = 108,
  [SMALL_STATE(26)] = 135,
  [SMALL_STATE(27)] = 162,
  [SMALL_STATE(28)] = 189,
  [SMALL_STATE(29)] = 216,
  [SMALL_STATE(30)] = 243,
  [SMALL_STATE(31)] = 270,
  [SMALL_STATE(32)] = 297,
  [SMALL_STATE(33)] = 324,
  [SMALL_STATE(34)] = 351,
  [SMALL_STATE(35)] = 378,
  [SMALL_STATE(36)] = 405,
  [SMALL_STATE(37)] = 430,
  [SMALL_STATE(38)] = 450,
  [SMALL_STATE(39)] = 470,
  [SMALL_STATE(40)] = 487,
  [SMALL_STATE(41)] = 501,
  [SMALL_STATE(42)] = 512,
  [SMALL_STATE(43)] = 523,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [29] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(2),
  [32] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [35] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [38] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(13),
  [41] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(10),
  [44] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(18),
  [47] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(17),
  [50] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(16),
  [53] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(14),
  [56] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(6),
  [59] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(39),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [64] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 1, .production_id = 1),
  [68] = {.entry = {.count = 1, .reusable = false}}, SHIFT(8),
  [70] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [72] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [74] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [76] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note_pitch, 1),
  [78] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_note_pitch, 1),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 1),
  [82] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instrument_command, 1),
  [84] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [86] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [88] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 1),
  [90] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [92] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [94] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_accidental, 1),
  [96] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 9),
  [98] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [100] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [102] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 1),
  [104] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [106] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 14),
  [108] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 3, .production_id = 12),
  [112] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [114] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 1),
  [116] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 1),
  [120] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [122] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 2),
  [124] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [126] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_gate_time_command, 1),
  [128] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [130] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_volume_command, 1),
  [132] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [134] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 1),
  [136] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [138] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 7),
  [140] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [142] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 5),
  [144] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [146] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 3, .production_id = 11),
  [148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 13),
  [150] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_key_transpose_command, 2, .production_id = 4),
  [152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instrument_command, 2, .production_id = 6),
  [154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 4, .production_id = 17),
  [156] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord, 4, .production_id = 16),
  [158] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_volume_command, 2, .production_id = 4),
  [160] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 2, .production_id = 8),
  [162] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tempo_command, 2, .production_id = 4),
  [164] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_octave_command, 2, .production_id = 4),
  [166] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 3, .production_id = 10),
  [168] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_length_command, 2, .production_id = 4),
  [170] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_note, 3, .production_id = 15),
  [172] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_rest, 2, .production_id = 3),
  [174] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_gate_time_command, 2, .production_id = 4),
  [176] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 1, .production_id = 1),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [180] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2), SHIFT_REPEAT(5),
  [183] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_chord_repeat1, 2),
  [185] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [187] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 9),
  [189] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [191] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 3, .production_id = 14),
  [193] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_chord_note, 2, .production_id = 7),
  [195] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
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
