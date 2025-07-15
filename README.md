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
| 📊 Development Status | [generated-docs/development-status.md](generated-docs/development-status.md) |

# Overview in 3 Lines
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music using simple text and play it on a website.
- This tool specializes in music conversion, with actual playback handled by a separate project (`tonejs-json-sequencer`).

# Notes
- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize development independence and speed:**
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## Input/Output Definition
- *Example to visualize the concept
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Loose coupling with thin layers, making each easily modifiable
  - JSON (AST)
  - JSON (Pre-processing)
    - What is "Pre-processing"?
      - Node ID assignment, etc.
- Output Example
  - JSON (Post-processing)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; specific test cases in TDD will serve as the detailed specification.
## TDD Approach
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to the TDD for `mml2abc` / `chord2mml`.

*README.md is automatically generated from README.ja.md via Gemini translation using GitHub Actions.