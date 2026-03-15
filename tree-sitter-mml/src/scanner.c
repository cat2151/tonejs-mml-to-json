/**
 * External scanner for tree-sitter-mml.
 *
 * Handles JSON_ARGS: a JSON object (starting with '{') where the end is
 * determined by counting brace depth rather than a fixed-depth regex.
 * This correctly handles arbitrary nesting depth and also handles
 * '{' / '}' inside JSON string values (which the regex approach cannot).
 */

#include "tree_sitter/parser.h"

enum TokenType {
  JSON_ARGS,
};

void *tree_sitter_mml_external_scanner_create(void) { return NULL; }
void tree_sitter_mml_external_scanner_destroy(void *payload) {}
void tree_sitter_mml_external_scanner_reset(void *payload) {}
unsigned tree_sitter_mml_external_scanner_serialize(void *payload, char *buffer) { return 0; }
void tree_sitter_mml_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {}

bool tree_sitter_mml_external_scanner_scan(void *payload, TSLexer *lexer,
                                            const bool *valid_symbols) {
  if (!valid_symbols[JSON_ARGS]) return false;

  /* JSON objects must start with '{'. */
  if (lexer->lookahead != '{') return false;

  int depth = 0;
  bool in_string = false;
  bool escaped = false;

  while (lexer->lookahead != 0) {
    int32_t c = lexer->lookahead;

    if (escaped) {
      escaped = false;
      lexer->advance(lexer, false);
      continue;
    }

    if (c == '\\' && in_string) {
      escaped = true;
      lexer->advance(lexer, false);
      continue;
    }

    if (c == '"') {
      in_string = !in_string;
    } else if (!in_string) {
      if (c == '{') {
        depth++;
      } else if (c == '}') {
        depth--;
        if (depth == 0) {
          /* Consume the closing '}' and mark the end of the token. */
          lexer->advance(lexer, false);
          lexer->mark_end(lexer);
          lexer->result_symbol = JSON_ARGS;
          return true;
        }
      }
    }

    lexer->advance(lexer, false);
  }

  /* Reached EOF without closing all braces: not a valid JSON object. */
  return false;
}
