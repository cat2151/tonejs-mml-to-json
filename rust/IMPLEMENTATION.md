# Rust Implementation Guide

This document describes the Rust + WASM implementation of tonejs-mml-to-json.

## Overview

The project includes a Rust implementation that can be used in two ways:
1. As a Rust library crate for native applications
2. As a WASM module for browser usage (used by the demo)

## Architecture

This implementation follows the **Tree-sitter SSOT (Single Source of Truth)** approach as defined in the project's copilot-instructions.md.

### Three-Phase Processing Pipeline

```
MML String → [Tree-sitter Parser] → CST → [cst_to_ast] → AST → [ast2json] → JSON Commands
```

1. **Tree-sitter Parser** (grammar.js + tree-sitter-mml/)
   - `tree-sitter-mml/grammar.js` is the **Single Source of Truth** for MML syntax
   - Generates both C and WASM parsers from the same grammar
   - Produces a Concrete Syntax Tree (CST)

2. **cst_to_ast** (rust/src/cst_to_ast.rs)
   - Converts Tree-sitter CST to Abstract Syntax Tree (AST)
   - Validates syntax and extracts relevant information
   - Rust implementation for both native and WASM builds

3. **ast** (rust/src/ast.rs)
   - Defines AST data structures
   - Token types: Note, Rest, Length, Octave, OctaveUp, OctaveDown, Instrument, Chord
   - Serializable to/from JSON using serde

4. **ast2json** (rust/src/ast2json.rs)
   - Converts AST to Tone.js compatible JSON format
   - Handles timing calculations, note duration, dots
   - Manages node IDs and creates Tone.js commands

## Building

### Prerequisites

- Rust toolchain (1.70+)
- Node.js and npm
- Tree-sitter CLI (for regenerating parser)

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

### Regenerate Tree-sitter Parser

If you modify `tree-sitter-mml/grammar.js`:

```bash
cd tree-sitter-mml
tree-sitter generate
tree-sitter build-wasm
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

### Browser Usage (via JavaScript/TypeScript)

The recommended way to use this library in browsers:

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

await initWasm();  // Initializes both WASM modules (parser + converter)
const json = mml2json('o4 l16 e f g+ a');
```

### Rust Native Usage

For native Rust applications (uses Tree-sitter C bindings):

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

Note: Native Rust usage requires the `tree-sitter` feature flag (enabled by default).

## Compatibility

The Rust/WASM implementation is **100% compatible** with the JavaScript implementation:
- All integration test cases produce identical output
- Same AST structure
- Same JSON output format
- Same timing calculations

## Design Decisions

### Tree-sitter as SSOT

This project uses **Tree-sitter with grammar.js as the Single Source of Truth**:
- **Consistency**: The MML grammar is defined once in `grammar.js`
- **Dual Targets**: Generates both C parser (for native Rust) and WASM parser (for browser/Node.js)
- **Maintainability**: Grammar changes automatically propagate to all parsers
- **Industry Standard**: Tree-sitter is widely used for parsing and provides robust error recovery

See [tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example) for the reference implementation pattern.

### Module Organization

```
rust/
├── src/
│   ├── lib.rs        # Public API and WASM bindings
│   ├── ast.rs        # AST data structures
│   ├── mml2ast.rs    # Tree-sitter parser integration (native C bindings)
│   ├── cst_to_ast.rs # CST to AST conversion logic
│   └── ast2json.rs   # JSON converter
├── examples/
│   └── basic_usage.rs
├── build.rs          # Builds and links tree-sitter-mml parser
└── Cargo.toml

tree-sitter-mml/
├── grammar.js        # **SINGLE SOURCE OF TRUTH** for MML syntax
├── src/
│   ├── parser.c      # Generated C parser (for native Rust)
│   └── ...
└── tree-sitter-mml.wasm  # Generated WASM parser (for browser/Node.js)
```

### Error Handling

- Tree-sitter provides error recovery - invalid syntax produces error nodes in the CST
- The `cst_to_ast` converter detects error nodes and returns error information
- Errors are surfaced as thrown exceptions in the JavaScript/TypeScript API
- WASM functions return `{ error: "..." }` JSON objects on failure

## Usage Examples

### Browser Usage (via JavaScript/TypeScript)

The recommended way to use this library in browsers:

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

await initWasm();  // Initializes both WASM modules (parser + converter)
const json = mml2json('o4 l16 e f g+ a');
```

### Rust Native Usage

For native Rust applications (uses Tree-sitter C bindings):

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

Note: Native Rust usage requires the `tree-sitter` feature flag (enabled by default).

## Performance

The Tree-sitter-based Rust implementation provides:
- Fast parsing with good error recovery
- Efficient CST to AST conversion
- Suitable for both browser and server-side use

Benchmarks to be added in future updates.

## Future Enhancements

Potential improvements:
- [ ] Performance benchmarks comparing native vs WASM
- [ ] More comprehensive error messages with source locations
- [ ] Support for additional MML commands (via grammar.js updates)
- [ ] Optimization for WASM binary size

## Adding New MML Commands

To add a new MML command:

1. **Update grammar.js** (SSOT):
   - Add the new syntax rule to `tree-sitter-mml/grammar.js`
   - Example: Add a new command pattern

2. **Regenerate parsers**:
   ```bash
   cd tree-sitter-mml
   tree-sitter generate      # Regenerate C parser
   tree-sitter build-wasm    # Regenerate WASM parser
   ```

3. **Update CST to AST converter** (`rust/src/cst_to_ast.rs`):
   - Add handling for the new CST node type
   - Convert it to the appropriate AST token

4. **Update AST types** (`rust/src/ast.rs`) if needed:
   - Add new token variant if required

5. **Update JSON converter** (`rust/src/ast2json.rs`):
   - Add logic to convert the new AST token to Tone.js JSON

6. **Add tests** and rebuild:
   ```bash
   cargo test
   npm run build:wasm
   npm test
   ```

## Contributing

When making changes:
1. **Update grammar.js** first if changing MML syntax (SSOT principle)
2. Regenerate Tree-sitter parsers if grammar changed
3. Update Rust implementation (`cst_to_ast`, `ast2json`, etc.)
4. Run `cargo test` to verify Rust tests pass
5. Build WASM with `npm run build:wasm`
6. Run `npm run test:wasm` to verify compatibility
7. Run `npm test` to verify JavaScript tests still pass

## References

- **Tree-sitter SSOT Pattern**: [tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)
- **Project Architecture**: See `copilot-instructions.md` in the repository root
- **MML Grammar Definition**: `tree-sitter-mml/grammar.js` (SSOT)
