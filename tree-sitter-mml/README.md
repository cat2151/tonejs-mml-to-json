# tree-sitter-mml

Tree-sitter grammar for MML (Music Macro Language).

This grammar is the Single Source of Truth (SSOT) for the MML syntax used in [tonejs-mml-to-json](https://github.com/cat2151/tonejs-mml-to-json).

## Building

### Generate Parser

```bash
cd tree-sitter-mml
npx tree-sitter generate
```

This generates:
- `src/parser.c` - C implementation of the parser
- `src/tree_sitter/parser.h` - Header file

### Generate WASM

```bash
cd tree-sitter-mml
npx tree-sitter build-wasm
```

This generates:
- `tree-sitter-mml.wasm` - WebAssembly parser

### Test Parser

```bash
cd tree-sitter-mml
npx tree-sitter test
```

## MML Syntax

This grammar supports the following MML commands:

- **Notes**: `c`, `d`, `e`, `f`, `g`, `a`, `b`
- **Accidentals**: `+` (sharp), `-` (flat), can be repeated (`++`, `--`)
- **Duration**: numbers like `4`, `8`, `16`, `32` (after notes or rests)
- **Dots**: `.` for dotted notes (can be repeated: `.`, `..`)
- **Rest**: `r`
- **Length**: `l` (sets default note length)
- **Octave**: `o` (sets octave), `<` (octave up), `>` (octave down)
- **Tempo**: `t` or `T` (sets BPM, e.g., `t120`, `T140`)
- **Volume**: `v` or `V` (sets volume 0-127, e.g., `v100`, `V80`)
- **Instrument**: `@` followed by instrument name (e.g., `@Synth`, `@FMSynth`)
- **Track separator**: `;` (for multi-track)
- **Chords**: `'notes'` (e.g., `'ceg'`, `'c+eg-'`)

## Example MML

```mml
o4 l16 e f g+ a b a g+ f e8. <e8. >e8
```

## Integration

This grammar is used by:
- Native Rust builds (via C parser compiled with cc crate)
- WASM builds (via web-tree-sitter)

See [tonejs-mml-to-json](https://github.com/cat2151/tonejs-mml-to-json) for integration details.

## Reference

This implementation follows the pattern established in:
- [tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)
