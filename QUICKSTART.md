# Quick Start Guide

## For Users (Browser Demo)

The demo at `src/index.html` now uses the Rust WASM implementation:

1. **Open the demo**:
   - Open `src/index.html` in a modern web browser
   - Or visit the hosted version (if deployed)

2. **Enter MML**:
   ```
   o4 l16 efg+abag+f e8.<e8.>e8
   ```

3. **Click "play"** to hear the music!

The WASM module automatically loads and converts MML to JSON for Tone.js.

## For Rust Developers

### Using as a Library

1. **Add to your `Cargo.toml`**:
   ```toml
   [dependencies]
   tonejs_mml_to_json = { path = "path/to/rust" }
   ```

2. **Use in your code**:
   ```rust
   use tonejs_mml_to_json::mml_to_json;

   fn main() {
       let mml = "o4 l16 e";
       match mml_to_json(mml) {
           Ok(json) => println!("{}", json),
           Err(e) => eprintln!("Error: {}", e),
       }
   }
   ```

3. **Build and run**:
   ```bash
   cargo build
   cargo run
   ```

### Running the Example

```bash
cd rust
cargo run --example basic_usage
```

## For Web Developers

### Building WASM

```bash
npm run build:wasm
```

This creates the `pkg/` directory with:
- `tonejs_mml_to_json_bg.wasm` (WASM binary)
- `tonejs_mml_to_json.js` (JS glue code)
- `tonejs_mml_to_json.d.ts` (TypeScript definitions)

### Using in Your Web App

```html
<script type="module">
  import init, { mml_to_json_wasm } from './pkg/tonejs_mml_to_json.js';
  
  // Initialize WASM
  await init();
  
  // Convert MML to JSON
  const mml = 'o4 l16 efg+abag+f';
  const jsonString = mml_to_json_wasm(mml);
  const commands = JSON.parse(jsonString);
  
  // Use with tonejs-json-sequencer
  console.log(commands);
</script>
```

## For Contributors

### Setup

```bash
# Install Node dependencies
npm install

# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install wasm-pack
cargo install wasm-pack
```

### Development Workflow

1. **Make changes** to Rust code in `rust/src/`

2. **Test Rust code**:
   ```bash
   cd rust
   cargo test
   ```

3. **Build WASM**:
   ```bash
   npm run build:wasm
   ```

4. **Test WASM**:
   ```bash
   npm run test:wasm
   ```

5. **Test JavaScript** (regression):
   ```bash
   npm test
   ```

### Running All Tests

```bash
# Quick validation
npm test && npm run test:wasm && (cd rust && cargo test)

# Individual test suites
npm test                    # JavaScript (74 tests)
npm run test:wasm           # WASM (33 tests)
cd rust && cargo test       # Rust (13 tests)
```

## MML Syntax Reference

### Basic Notes
- `c d e f g a b` - Note names
- `c+ d-` - Sharp (+) and flat (-)
- `c4 d8 e16` - Note durations (quarter, eighth, sixteenth)
- `c4.` - Dotted notes (1.5x duration)
- `c4..` - Double-dotted notes (1.75x duration)

### Commands
- `r` - Rest
- `r4` - Rest with duration
- `l8` - Set default note length to eighth note
- `o4` - Set octave to 4
- `<` - Increase octave by 1
- `>` - Decrease octave by 1
- `@0` - Change instrument/synth

### Examples
```
o4 c d e f g a b      # C major scale in octave 4
l16 c d e f           # Four sixteenth notes
c4. e8 g4             # Dotted quarter, eighth, quarter
c+ d e- f             # Sharp and flat notes
o4 c < c > c          # Octave changes
@0 c d @1 e f         # Instrument changes
```

## Troubleshooting

### WASM fails to load
- Ensure you're serving files over HTTP/HTTPS (not file://)
- Check browser console for errors
- Verify `pkg/` directory exists and contains WASM files

### Build fails
- Ensure Rust is installed: `rustc --version`
- Ensure wasm-pack is installed: `wasm-pack --version`
- Try: `cargo clean && npm run build:wasm`

### Tests fail
- Ensure all dependencies are installed: `npm install`
- Rebuild WASM: `npm run build:wasm`
- Check that you're in the project root directory

## Resources

- [Main README](README.md) - Project overview
- [Rust README](rust/README.md) - Rust library guide
- [Implementation Guide](rust/IMPLEMENTATION.md) - Technical details
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Complete summary
- [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) - Playback library

## Support

For issues or questions:
1. Check the documentation in this repository
2. Review the test files for examples
3. Open an issue on GitHub
