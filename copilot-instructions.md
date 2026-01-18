# Copilot Instructions for tonejs-mml-to-json

## Core Policy

**CRITICAL**: This project uses Tree-sitter for all parsing.

1. **grammar.js is the Single Source of Truth**
   - All MML syntax is defined in `tree-sitter-mml/grammar.js`
   - Changes to parsing logic MUST be made in grammar.js first
   - Generated parsers (C and WASM) are derived from grammar.js

2. **Never Create Manual Parsers**
   - Do NOT implement string parsing, regex parsers, or custom parsing logic
   - Only transform Tree-sitter's CST to AST

3. **Reference**: https://github.com/cat2151/tree-sitter-wasm-c-generate-example

## External Libraries

**Do NOT patch or modify external libraries** (especially tonejs-json-sequencer)
- Report bugs to the user instead of creating ad-hoc patches
- The proper fix should be made in the upstream library
