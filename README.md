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

# Overview in 3 Sentences
- Converts music written in MML (Music Macro Language) into a JSON format that can be played in a browser.
- You can create music with simple text and play it on your website.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent on the web.
  - **Programmer-Friendly**: Code-like notation, easy Git management and generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Adaptability to Dialects**: Easily supports MML dialects specific to various systems, as simple conversions can be readily created using PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - This is due to an emphasis on **development independence and speed**.
    - Allows focus on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## Input/Output Definitions
- *Illustrate with examples to visualize the concept.*
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Designed as a loosely coupled, thin layer to facilitate independent modifications.*
  - JSON (AST)
  - JSON (Pre-processed)
    - What is processing?
      - Node ID assignment, etc.
- Output Example
  - JSON (Post-processed)
    - Format recognized by `tonejs-json-sequencer`.
    - Details omitted for brevity; the TDD test cases serve as the definitive specification.
## TDD Approach
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to the TDD for `mml2abc` / `chord2mml`.

*Note: README.md is automatically generated from README.ja.md via GitHub Actions using Gemini's translation.*