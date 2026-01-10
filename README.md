# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 Library Usage Guide | [LIBRARY_USAGE.md](LIBRARY_USAGE.md) |
| 📖 Project Overview | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Development Status | [generated-docs/development-status.md](generated-docs/development-status.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Enables you to create music with simple text and play it on a website.
- Available as an npm package and via CDN, making integration into your projects easy.
- A specialized tool focused on music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Usage

## As an npm package

```bash
npm install tonejs-mml-to-json
```

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// Initialize the WASM module
await initWasm();

// Convert MML to JSON
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## Via CDN

```html
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  await initWasm();
  const json = mml2json('o4 l16 e f g+ a');
  console.log(json);
</script>
```

For detailed usage instructions, please refer to [LIBRARY_USAGE.md](LIBRARY_USAGE.md).

# Notes
- What are the advantages of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Developer Friendliness**: Code-like notation, easy Git management, and generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, supports gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Fosters an Ecosystem**: High reusability, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Easily adaptable to system-specific MML dialects, with PEG making simple converters easy to create.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize development independence and speed.**
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback features.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Memos (Under Consideration)
## Regarding Rust Implementation
- **Rust + WASM implementation has been added.**
  - Available as a Rust library crate.
  - Operates in browsers via WASM compilation.
  - 100% compatible with the JavaScript implementation.
  - See [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: A parser that converts MML strings into an AST.
- **ast**: Data structure for AST (Abstract Syntax Tree).
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- *To visualize the concept with examples.*
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Loose coupling with thin layers, making each easily modifiable.*
  - JSON (AST)
  - JSON (pre-processed)
    - What is "processing"?
      - Node ID assignment, etc.
- Output Example
  - JSON (post-processed)
    - Format recognized by tonejs-json-sequencer.
    - Details omitted; test cases in TDD will serve as specifics.

## TDD Policy
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to the TDD for `mml2abc` / `chord2mml`.
- I recall this project using Vitest for TDD.
  - I intend to organize the test procedures later.

*Note: README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.*