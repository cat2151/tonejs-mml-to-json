# Copilot Instructions for tonejs-mml-to-json

## Core Development Policy

### Tree-sitter is MANDATORY

**CRITICAL**: This project MUST use Tree-sitter for all parsing functionality.

1. **Always use Tree-sitter**
   - Tree-sitter is the ONLY acceptable parser implementation
   - Never implement manual parsers
   - Never bypass Tree-sitter with custom parsing logic

2. **grammar.js is the Single Source of Truth (SSOT)**
   - All parsing rules MUST be defined in `grammar.js`
   - The grammar.js file is the authoritative source for MML syntax
   - Any changes to parsing logic MUST be made in grammar.js first
   - Generated parsers (C and WASM) are derived from grammar.js

3. **Manual Parser Implementation is FORBIDDEN**
   - Do NOT create manual parsers in TypeScript, Rust, or any other language
   - Do NOT implement string parsing logic directly
   - Do NOT create regex-based parsers
   - If you find yourself writing manual parsing code, STOP immediately

## Implementation Requirements

### Required Components

1. **grammar.js** (in tree-sitter-mml directory)
   - Defines the complete MML grammar using Tree-sitter DSL
   - Must be maintained and updated for any syntax changes

2. **Generated C Parser** (from grammar.js)
   - Generated using Tree-sitter CLI
   - Used by Rust/native builds
   - Located in tree-sitter-mml/src/

3. **Generated WASM Parser** (from grammar.js)
   - Generated using Tree-sitter CLI for web-tree-sitter
   - Used by browser builds
   - Located in dist/ or appropriate output directory

4. **CST to AST Converter**
   - Converts Tree-sitter's Concrete Syntax Tree to internal AST
   - This is the ONLY acceptable transformation layer
   - Does NOT implement parsing logic, only tree transformation

## Build Process

### C Parser Generation
```bash
cd tree-sitter-mml
tree-sitter generate
```

### WASM Parser Generation
```bash
cd tree-sitter-mml
tree-sitter build-wasm
```

### Integration
- Native builds: Use C parser compiled with cc crate
- WASM builds: Use web-tree-sitter with generated WASM parser

## Reference Projects

This project follows the patterns established in:

1. **tree-sitter-wasm-c-generate-example**
   - Repository: https://github.com/cat2151/tree-sitter-wasm-c-generate-example
   - Demonstrates Tree-sitter grammar.js usage
   - Shows C and WASM generation from grammar.js
   - Provides minimal working example of Tree-sitter integration

## Failure Conditions

**STOP and REPORT FAILURE if:**

1. You create a solution that doesn't use Tree-sitter
2. You implement manual parsing logic
3. You bypass grammar.js as the source of truth
4. You create regex-based or string-manipulation-based parsers

When encountering these conditions:
- Immediately stop code generation
- Report the failure to the user
- Explain that the solution violates the Tree-sitter requirement
- Do not proceed with the implementation

## Success Criteria

A successful implementation:
- Uses grammar.js to define all parsing rules
- Generates C parser from grammar.js for native builds
- Generates WASM parser from grammar.js for browser builds
- Contains NO manual parsing logic
- Treats grammar.js as the authoritative source
- Follows patterns from reference repositories

## Migration Notes

If manual parsers exist in the codebase:
- They MUST be removed
- Replace with Tree-sitter-based implementation
- Update build scripts to generate parsers from grammar.js
- Ensure all tests pass with Tree-sitter implementation

## Investigation Requirements for Bug Fixes

When fixing bugs, especially those related to browser/demo functionality:

1. **Investigate Before Fixing**
   - Use headless browser testing to verify the actual error in the demo
   - Do NOT rely solely on desk analysis of source code (avoid hallucination risk)
   - Confirm the root cause before implementing a fix

2. **Check Test Status First**
   - Run tests before making changes to identify pre-existing issues
   - If tests fail or parsing is broken, report to user before proceeding
   - Do not fix unrelated test failures unless explicitly asked

3. **Verify Tree-sitter Architecture**
   - Ensure any fix maintains Tree-sitter as the parsing mechanism
   - If a solution bypasses Tree-sitter, STOP and report failure
   - All parsing must go through grammar.js → Tree-sitter → CST → AST

## External Library Dependencies

### tonejs-json-sequencer

This project depends on `tonejs-json-sequencer`, which is maintained by the same owner (cat2151).

**IMPORTANT: Do NOT patch or modify external libraries**

1. **Report Bugs to Library Owner**
   - If you discover a bug in tonejs-json-sequencer, report it to the user (repository owner)
   - Do NOT create ad-hoc patches in build scripts or copy scripts
   - Do NOT modify the library files in dist/libs/
   - The proper fix should be made in the tonejs-json-sequencer repository itself

2. **Why Ad-hoc Patching is an Anti-pattern**
   - Makes maintenance difficult
   - Hides issues that should be fixed at the source
   - Creates divergence between the library and the patched version
   - Makes upgrades problematic

3. **Correct Process for Library Bugs**
   - Identify and document the bug
   - Report to the user with clear description and reproduction steps
   - Wait for the fix to be made in the upstream library
   - Update the dependency version after the fix is released

## Questions?

When in doubt:
1. Check the grammar.js file
2. Review the reference repository: tree-sitter-wasm-c-generate-example
3. Ask the user for clarification
4. Do NOT implement manual parsing as a workaround
