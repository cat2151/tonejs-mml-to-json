```markdown
# tonejs-mml-to-json

[Japanese README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html)

# Why

- Please refer to tonejs-json-sequencer.

# Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?

- To facilitate smoother MML development.
  - To avoid development roadblocks caused by tight coupling.
- Please also refer to tonejs-json-sequencer.

# Notes under Consideration

## Input/Output Definition

- *Visualize with examples.*
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Loose coupling with thin layers, making each easily modifiable.*
  - JSON (AST)
  - JSON (pre-processing)
    - What is "processing"?
      - Node ID numbering, etc.
- Output Example
  - JSON (post-processing)
    - Format recognized by tonejs-json-sequencer
    - Details omitted for brevity; TDD test cases serve as the definitive specification.

## TDD Approach

- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to the TDD for mml2abc / chord2mml.

*Note: This README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.*
```