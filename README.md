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

# Summary in 3 Lines
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music using simple text and play it on a website.
- This tool specializes in the music conversion part, with actual playback handled by a separate project (`tonejs-json-sequencer`).

# Notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based, lightweight, and platform-independent for the web.
  - **Programmer-Friendliness**: Code-like notation, easy Git management and generation.
  - **Web Development Compatibility**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple syntax, allowing for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing each to evolve independently.
  - **Adaptability to Dialects**: Easily adaptable to system-specific MML dialects, with the assumption that simple converters can be readily created using PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Because we prioritize development independence and speed.**
    - Allows focus on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## Input/Output Definition
- *Example to visualize the concept*
- Input Example
  ```
  o4 l16 e
  ```
- Intermediate Format Example
  - *As a loosely coupled, thin layer to facilitate independent changes.*
  - JSON (AST)
  - JSON (Pre-processing)
    - What is "processing"?
      - Node ID assignment, etc.
- Output Example
  - JSON (Post-processing)
    - Format recognized by tonejs-json-sequencer
    - Details omitted for brevity; refer to TDD test cases for specifics.
## TDD Approach
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, individually.
- Refer to the TDD of `mml2abc` / `chord2mml`.

*`README.md` is automatically generated from `README.ja.md` using Gemini's translation via GitHub Actions.*