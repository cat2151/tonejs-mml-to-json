# Using Tree-sitter with tonejs-mml-to-json

This document explains how to use the Tree-sitter integration in the tonejs-mml-to-json library.

## Overview

The library supports two parser implementations:
1. **Tree-sitter parser** - For native Rust applications (opt-in via feature flag)
2. **Manual parser** - For WASM/browser applications (default)

Both parsers produce identical AST structures and support the same MML syntax.

## Quick Start

### For WASM/Browser Use (Default)

No special configuration needed. Build as usual:

```bash
npm run build:wasm
```

The WASM build uses the proven manual parser and works in all browsers.

### For Native Rust with Tree-sitter

Add to your `Cargo.toml`:

```toml
[dependencies]
tonejs_mml_to_json = { version = "0.1", features = ["tree-sitter"] }
```

Or build locally with:

```bash
cd rust
cargo build --features tree-sitter
cargo test --features tree-sitter
```

## Grammar Development

The Tree-sitter grammar is defined in `tree-sitter-mml/grammar.js`.

### Modifying the Grammar

1. Edit `tree-sitter-mml/grammar.js`
2. Regenerate the parser:
   ```bash
   cd tree-sitter-mml
   npx tree-sitter generate
   ```
3. Test the grammar:
   ```bash
   npx tree-sitter parse <<< "your MML code"
   ```

### Grammar Structure

The grammar defines these main constructs:

```javascript
source_file        // Root node
├── note           // Musical notes (c, d, e, f, g, a, b)
├── rest           // Rests (r)
├── length_command // Default length (l)
├── octave_command // Octave setting (o)
├── octave_up      // Octave up (<)
├── octave_down    // Octave down (>)
├── instrument_command  // Instrument (@)
├── chord          // Chords ('ceg')
└── track_separator     // Track separator (;)
```

## Why Two Parsers?

### Technical Reason

Tree-sitter's C library requires standard C headers (stdio.h, stdlib.h, etc.) which are not available when compiling to `wasm32-unknown-unknown` target. This is a known limitation of WebAssembly compilation.

### Solution

We use conditional compilation:
- **Native builds**: Can optionally use Tree-sitter (faster, more maintainable grammar)
- **WASM builds**: Use the manual parser (proven, battle-tested)

## Benefits of Tree-sitter

When using the tree-sitter feature for native Rust:

1. **Grammar-Driven Development**: The grammar file (`grammar.js`) serves as executable documentation
2. **Error Recovery**: Tree-sitter can parse incomplete/invalid input and report errors
3. **Incremental Parsing**: Efficient re-parsing of modified input
4. **Tooling**: Use tree-sitter CLI for testing and debugging
5. **Industry Standard**: Tree-sitter is used by GitHub, Neovim, and many other tools

## Testing

### Test the Grammar

```bash
cd tree-sitter-mml

# Test specific MML
npx tree-sitter parse <<< "o4 l16 cdefgab"

# Test with file
echo "c d e 'ceg' r4" | npx tree-sitter parse
```

### Test Rust Parser

```bash
cd rust

# Test with manual parser (default)
cargo test

# Test with Tree-sitter parser
cargo test --features tree-sitter
```

## Examples

### Using in Rust (Native)

```rust
use tonejs_mml_to_json::mml_to_json;

fn main() {
    let mml = "o4 l16 cdefgab";
    match mml_to_json(mml) {
        Ok(json) => println!("{}", json),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

```toml
# Cargo.toml
[dependencies]
tonejs_mml_to_json = { path = "../rust", features = ["tree-sitter"] }
```

### Using in Browser (WASM)

```javascript
import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';

await init();
const json = mml_to_json_wasm('o4 l16 cdefgab');
console.log(json);
```

## Grammar Validation

The Tree-sitter grammar has been validated against:

✅ Basic notes: `cdefgab`  
✅ Accidentals: `c+ d- f++`  
✅ Durations: `c4 d8 e16`  
✅ Dotted notes: `c4. d8.. e16.`  
✅ Rests: `r r4 r8.`  
✅ Octaves: `o4 < > o5`  
✅ Length: `l8 l16 l4`  
✅ Instruments: `@0 @Synth @FMSynth`  
✅ Chords: `'ceg' 'c+eg-'4.`  
✅ Track separators: `cde;efg;abc`  
✅ Complex sequences: `o4 l16 efg+abag+f e8.<e8.>e8`

## Troubleshooting

### WASM Build Fails with Tree-sitter Errors

This is expected. Make sure you're building without the tree-sitter feature:

```bash
# Correct (default)
wasm-pack build --target web

# Wrong - will fail
wasm-pack build --target web --features tree-sitter
```

### Grammar Changes Not Reflected

After modifying `grammar.js`, regenerate the parser:

```bash
cd tree-sitter-mml
npx tree-sitter generate
```

Then rebuild the Rust project:

```bash
cd ../rust
cargo clean
cargo build --features tree-sitter
```

## Architecture

```
┌─────────────────────────────────────────┐
│         User Application                │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
    ┌───▼────┐      ┌──────▼─────┐
    │ Native │      │   WASM     │
    │  Rust  │      │  Browser   │
    └───┬────┘      └──────┬─────┘
        │                  │
┌───────▼────────┐  ┌──────▼──────────┐
│  Tree-sitter   │  │ Manual Parser   │
│    Parser      │  │                 │
│  (optional)    │  │   (default)     │
└───────┬────────┘  └──────┬──────────┘
        │                  │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │   Common AST     │
        │   (ast.rs)       │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │   ast2json       │
        │  (AST → JSON)    │
        └──────────────────┘
```

## Further Reading

- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [Tree-sitter Grammar Guide](https://tree-sitter.github.io/tree-sitter/creating-parsers)
- [TREE_SITTER_INVESTIGATION.md](TREE_SITTER_INVESTIGATION.md) - Technical research
- [TREE_SITTER_SUMMARY.md](TREE_SITTER_SUMMARY.md) - Implementation summary
