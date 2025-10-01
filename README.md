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
| 📖 Project Overview | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Development Status | [generated-docs/development-status.md](generated-docs/development-status.md) |

# Explanation in 3 Lines
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music using simple text and play it on a website.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based, lightweight, and platform-independent for the web.
  - **Developer-Friendly**: Code-like notation, easy Git management and generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Foundation for an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Even system-specific MML dialects can be easily supported by creating individual PEG parsers for simple conversions.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize development independence and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## Input/Output Definition
- *Visualize with examples to clarify the concept.*
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Aim for loosely coupled, thin layers to facilitate changes to each.*
  - json (AST)
  - json (pre-processed)
    - What is processing?
      - nodeId numbering, etc.
- Output Example
  - json (post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted for brevity; the TDD test cases serve as the detailed specification.
## TDD Approach
- The test targets are mml2ast, ast2ast, and ast2json, individually.
  - Refer to the TDD of mml2abc / chord2mml.
- I believe this project used Vitest for TDD.
  - I plan to organize the testing procedures later.

*Note: README.md is automatically generated from README.ja.md using Gemini translation via GitHub Actions.*