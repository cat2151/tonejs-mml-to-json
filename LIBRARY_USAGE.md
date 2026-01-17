# tonejs-mml-to-json - Library Usage Guide

This guide explains how to use tonejs-mml-to-json as a library in your project.

## Installation

### Using npm

```bash
npm install tonejs-mml-to-json
```

### Using from CDN

You can also use the library directly from a CDN:

```html
<!-- Import from GitHub Pages -->
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  // Initialize WASM module first
  await initWasm();
  
  // Convert MML to JSON
  const json = mml2json('o4 l16 e');
  console.log(json);
</script>
```

## API Reference

### `initWasm(): Promise<void>`

Initialize the WASM module. **This must be called before using any conversion functions.**

```javascript
import { initWasm } from 'tonejs-mml-to-json';

await initWasm();
```

### `mml2json(mml: string): ToneCommand[]`

Convert MML string directly to Tone.js JSON format. This is the main convenience function.

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

await initWasm();

const mml = 'o4 l16 e f g+ a b a g+ f e8. >e8. <e8';
const json = mml2json(mml);
// json is an array of Tone.js commands ready for tonejs-json-sequencer
```

### `mml2ast(mml: string): ASTToken[]`

Convert MML string to Abstract Syntax Tree (AST).

```javascript
import { initWasm, mml2ast } from 'tonejs-mml-to-json';

await initWasm();

const mml = 'o4 l16 e';
const ast = mml2ast(mml);
// ast is an array of AST tokens
```

### `ast2json(ast: ASTToken[]): ToneCommand[]`

Convert Abstract Syntax Tree (AST) to Tone.js JSON format.

```javascript
import { initWasm, mml2ast, ast2json } from 'tonejs-mml-to-json';

await initWasm();

const mml = 'o4 l16 e';
const ast = mml2ast(mml);
const json = ast2json(ast);
// json is an array of Tone.js commands
```

## Usage Examples

### Basic Usage

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// Initialize WASM (do this once at application startup)
await initWasm();

// Convert MML to JSON
const mml = 'o4 l16 e f g+ a b a g+ f';
const json = mml2json(mml);

console.log(JSON.stringify(json, null, 2));
```

### With tonejs-json-sequencer

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';
// Assuming you have tonejs-json-sequencer available
import { playSequence } from 'tonejs-json-sequencer';

await initWasm();

const mml = 'o4 l16 e f g+ a b a g+ f e8. >e8. <e8';
const json = mml2json(mml);

// Play the sequence
playSequence(json);
```

### Error Handling

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

await initWasm();

try {
  const json = mml2json('invalid mml syntax');
} catch (error) {
  console.error('MML conversion error:', error.message);
}
```

### Using in Browser (with bundler like Vite/Webpack)

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// In your app initialization
async function initApp() {
  await initWasm();
  console.log('MML converter ready!');
}

// Later in your code
function convertMML(mml) {
  try {
    return mml2json(mml);
  } catch (error) {
    console.error('Conversion failed:', error);
    return null;
  }
}
```

## TypeScript Support

The library includes TypeScript type definitions:

```typescript
import { initWasm, mml2json, type ToneCommand, type ASTToken } from 'tonejs-mml-to-json';

await initWasm();

const mml: string = 'o4 l16 e';
const json: ToneCommand[] = mml2json(mml);
```

## Notes

- **WASM Initialization**: Always call `initWasm()` before using any conversion functions
- **ES Module Only**: This library is published as an ES module
- **Browser Compatibility**: Requires WebAssembly support (all modern browsers)
- **CDN Usage**: The library files in `dist/` and `pkg/` are committed to the repository for CDN usage

## License

MIT
