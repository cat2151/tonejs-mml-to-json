# tonejs_mml_to_json

Rust library and WASM module for converting MML (Music Macro Language) to JSON format compatible with [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Features

- ✨ Pure Rust implementation
- 🎯 Direct parser (no TreeSitter dependency for portability)
- 🌐 WASM support for browser usage
- 📦 Can be used as a Rust library crate
- ✅ 100% compatible with original JavaScript implementation

## Usage as Rust Library

Add to your `Cargo.toml`:

```toml
[dependencies]
tonejs_mml_to_json = { path = "path/to/rust" }
```

Example:

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

## Usage as WASM in Browser

The WASM module is built using `wasm-pack`:

```bash
cd rust
wasm-pack build --target web --out-dir ../pkg
```

Use in HTML:

```html
<script type="module">
  import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
  
  await init();
  const json = mml_to_json_wasm('o4 l16 e');
  console.log(json);
</script>
```

## Architecture

The library is organized into three main modules:

1. **mml2ast** - Parser that converts MML string to AST (Abstract Syntax Tree)
2. **ast** - Data structures representing the AST
3. **ast2json** - Converter that transforms AST to Tone.js compatible JSON

## Running Tests

```bash
cargo test
```

All tests pass:
- 13 unit tests in Rust
- Integration tests comparing with JavaScript implementation

## MML Syntax Supported

- **Notes**: `c d e f g a b` with optional accidentals `+` (sharp) or `-` (flat)
- **Durations**: `4` (quarter), `8` (eighth), `16` (sixteenth), etc.
- **Dots**: `.` for dotted notes (`.` = 1.5x, `..` = 1.75x)
- **Rest**: `r` with optional duration
- **Length**: `l8` sets default note length
- **Octave**: `o4` sets octave, `<` increases, `>` decreases
- **Instrument**: `@0` changes instrument

## License

MIT
