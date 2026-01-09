# Rust Implementation Guide

This document describes the Rust + WASM implementation of tonejs-mml-to-json.

## Overview

The project now includes a Rust implementation that can be used in two ways:
1. As a Rust library crate for native applications
2. As a WASM module for browser usage (used by the demo)

## Architecture

### Three-Phase Processing Pipeline

```
MML String → [mml2ast] → AST → [ast2json] → JSON Commands
```

1. **mml2ast** (rust/src/mml2ast.rs)
   - Parses MML string into Abstract Syntax Tree (AST)
   - Uses direct parser implementation (no external parser generator)
   - Validates syntax and reports warnings

2. **ast** (rust/src/ast.rs)
   - Defines AST data structures
   - Token types: Note, Rest, Length, Octave, OctaveUp, OctaveDown, Instrument
   - Serializable to/from JSON using serde

3. **ast2json** (rust/src/ast2json.rs)
   - Converts AST to Tone.js compatible JSON format
   - Handles timing calculations, note duration, dots
   - Manages node IDs and creates Tone.js commands

## Building

### Build Rust Library

```bash
cd rust
cargo build
cargo test
```

### Build WASM Module

```bash
cd rust
wasm-pack build --target web --out-dir ../pkg
```

Or use npm scripts:

```bash
npm run build:wasm
```

## Testing

### Rust Tests

```bash
cd rust
cargo test
```

13 unit tests covering:
- Parser functionality
- AST to JSON conversion
- Edge cases

### WASM Tests

```bash
npm run test:wasm
```

Includes:
- Basic WASM functionality tests (5 test cases)
- Integration tests comparing WASM vs JavaScript (27 test cases)
- Demo functionality test

### JavaScript Tests

```bash
npm test
```

74 tests for JavaScript implementation (unchanged).

## Usage Examples

### As Rust Library

```rust
use tonejs_mml_to_json::mml_to_json;

fn main() {
    let mml = "o4 l16 efg+abag+f e8.<e8.>e8";
    match mml_to_json(mml) {
        Ok(json) => println!("{}", json),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

### As WASM in Browser

```html
<script type="module">
  import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
  
  await init();
  const json = mml_to_json_wasm('o4 l16 e');
  console.log(JSON.parse(json));
</script>
```

### In Node.js (for testing)

```javascript
import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
import { readFileSync } from 'fs';

const wasmBuffer = readFileSync('./pkg/tonejs_mml_to_json_bg.wasm');
await init(wasmBuffer);

const json = mml_to_json_wasm('o4 l16 e');
console.log(JSON.parse(json));
```

## Compatibility

The Rust/WASM implementation is **100% compatible** with the JavaScript implementation:
- All 27 integration test cases produce identical output
- Same AST structure
- Same JSON output format
- Same timing calculations

## Design Decisions

### Direct Parser vs TreeSitter

Initially planned to use TreeSitter, but opted for a direct parser implementation because:
- **Simplicity**: Easier to maintain and understand
- **Portability**: No external dependencies
- **WASM Size**: Smaller binary size
- **Flexibility**: Easier to extend and modify

The parser is still modular and can be replaced with TreeSitter in the future if needed.

### Module Organization

```
rust/
├── src/
│   ├── lib.rs       # Public API and WASM bindings
│   ├── ast.rs       # AST data structures
│   ├── mml2ast.rs   # Parser implementation
│   └── ast2json.rs  # JSON converter
├── examples/
│   └── basic_usage.rs
├── Cargo.toml
└── README.md
```

### Error Handling

- Parser warnings are printed to stderr but don't stop execution
- Invalid syntax is skipped (same behavior as JavaScript)
- WASM errors are returned as JSON error objects

## Performance

The Rust implementation is expected to be significantly faster than JavaScript for:
- Large MML files
- Batch processing
- Server-side conversion

Benchmarks to be added in future updates.

## Future Enhancements

Potential improvements:
- [ ] Add TreeSitter grammar as an option
- [ ] Performance benchmarks
- [ ] More comprehensive error messages
- [ ] Support for additional MML commands
- [ ] Optimization for WASM binary size

## Contributing

When making changes:
1. Update Rust implementation
2. Run `cargo test` to verify Rust tests pass
3. Build WASM with `npm run build:wasm`
4. Run `npm run test:wasm` to verify compatibility
5. Run `npm test` to verify JavaScript tests still pass
