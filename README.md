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
- Converts music written in MML (Music Macro Language) into a JSON format playable in browsers.
- You can create music using simple text and play it on your website.
- This tool specializes in music conversion, while actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based, lightweight, platform-independent for the web.
  - **Programmer Friendliness**: Code-like notation, easy Git management and generation.
  - **Web Development Compatibility**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple syntax, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Adaptability to Dialects**: Easily supports system-specific MML dialects, with the assumption that simple converters can be readily built by users using PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Emphasis on development independence and speed:**
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## Input/Output Definitions
- *Illustrative examples to visualize the concept.*
- Input Example:
  - `o4 l16 e`
- Intermediate Format Example:
  - *Loose coupling with thin layers, making each easily modifiable.*
  - JSON (AST)
  - JSON (pre-processed)
    - What is "processing"?
      - Node ID numbering, etc.
- Output Example:
  - JSON (post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; specific test cases in TDD will serve as detailed specifications.
## TDD Approach
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to the TDD for `mml2abc` / `chord2mml`.

*README.md is automatically generated from README.ja.md using Gemini translation via GitHub Actions.*