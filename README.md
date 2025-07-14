# tonejs-mml-to-json

[日本語 README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html)

# why
See tonejs-json-sequencer.

# Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
- This allows for smoother MML development.
  - To avoid constraints that could impede development.
- See also tonejs-json-sequencer.

# Notes on Current Considerations
## Input/Output Definitions
- ※ Illustrative examples are provided to visualize the concept.
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - ※ Designed as loosely coupled, thin layers to facilitate independent modification.
  - JSON (AST)
  - JSON (Before Processing)
    - What 'processing' entails:
      - Node ID assignment, etc.
- Output Example
  - JSON (After Processing)
    - Format recognized by tonejs-json-sequencer
    - Details are omitted; TDD test cases serve as the definitive specification.
## TDD Approach
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to the TDD for mml2abc / chord2mml.

※ README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.