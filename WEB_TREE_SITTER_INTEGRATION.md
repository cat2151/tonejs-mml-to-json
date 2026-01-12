# Web-Tree-Sitter Integration Architecture

## Overview

This document describes the new architecture for using Tree-sitter with WASM builds, solving the C library dependency issues.

## Architecture

### Phase 1: Parsing (JavaScript/TypeScript Side)

Use `web-tree-sitter` to parse MML text into a Concrete Syntax Tree (CST):

```typescript
import Parser from 'web-tree-sitter';
import init, { cst_to_json_wasm } from './pkg/tonejs_mml_to_json.js';

// Initialize
await Parser.init();
await init();

const parser = new Parser();
const MML = await Parser.Language.load('tree-sitter-mml.wasm');
parser.setLanguage(MML);

// Parse MML to CST
const sourceCode = "o4 l16 cdefgab";
const tree = parser.parse(sourceCode);

// Convert to JSON format expected by Rust
const cst = treeToJSON(tree.rootNode);
const cstJSON = JSON.stringify(cst);

// Pass to Rust WASM
const toneJSON = cst_to_json_wasm(cstJSON);
```

### Phase 2: CST to AST Conversion (Rust WASM Side)

Rust receives the serialized CST and converts it to the internal AST format:

```rust
// In Rust WASM (rust/src/cst_to_ast.rs)
pub fn cst_to_ast(cst_json: &str) -> Result<Vec<AstToken>, String> {
    let root: CSTNode = serde_json::from_str(cst_json)?;
    // Convert CST nodes to AST tokens
    // ...
}
```

### Phase 3: AST Processing (Rust WASM Side)

The Rust code processes the AST and generates Tone.js JSON as before:

```rust
// Existing functionality
pub fn ast2json(ast: &[AstToken]) -> Result<Vec<ToneEvent>, String>
```

## CST JSON Format

The CST must be serialized in the following JSON structure:

```json
{
  "type": "source_file",
  "children": [
    {
      "type": "note",
      "text": "c4",
      "fields": {
        "pitch": [{"type": "note_pitch", "text": "c"}],
        "duration": [{"type": "duration", "text": "4"}]
      },
      "children": []
    }
  ],
  "fields": {}
}
```

### Helper Function for Tree-to-JSON Conversion

```typescript
function treeToJSON(node: Parser.SyntaxNode): any {
  const result: any = {
    type: node.type,
    text: node.text,
    children: [],
    fields: {}
  };
  
  // Process children
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child) {
      result.children.push(treeToJSON(child));
    }
  }
  
  // Process named fields
  for (const [fieldName, fieldNodes] of Object.entries(node.namedChildren)) {
    result.fields[fieldName] = fieldNodes.map(treeToJSON);
  }
  
  return result;
}
```

## WASM API Functions

### `cst_to_json_wasm(cst_json: string): string`

Primary entry point for WASM. Converts CST JSON directly to Tone.js JSON.

**Input:** Serialized CST from web-tree-sitter  
**Output:** Tone.js JSON string

### `cst_to_ast_wasm(cst_json: string): string`

Converts CST JSON to AST JSON (intermediate step if needed).

**Input:** Serialized CST  
**Output:** AST JSON string

### `ast2json_wasm(ast_json: string): string`

Converts AST JSON to Tone.js JSON.

**Input:** AST JSON string  
**Output:** Tone.js JSON string

## Benefits

1. **No C Library Dependencies in WASM:** Avoids `stdio.h` and other C header issues
2. **Uses Tree-sitter:** Satisfies the requirement to use Tree-sitter parser
3. **Clean Separation:** JavaScript handles parsing, Rust handles AST processing
4. **Maintains Existing Logic:** All AST-to-JSON conversion stays in Rust

## Native Builds

For native Rust builds, the original Tree-sitter integration is still available via the `tree-sitter` feature flag:

```bash
cargo build --features tree-sitter
cargo test --features tree-sitter
```

Native builds can parse MML strings directly without needing JavaScript:

```rust
use tonejs_mml_to_json::mml_to_json;

let json = mml_to_json("o4 l16 cdefgab")?;
```

## Files

- `rust/src/cst_to_ast.rs` - CST to AST converter
- `rust/src/mml2ast.rs` - Tree-sitter parser (native only)
- `rust/src/mml2ast_manual.rs` - Manual parser (tests only)
- `tree-sitter-mml/grammar.js` - Grammar definition
- `tree-sitter-mml/src/parser.c` - Generated parser

## Building

### WASM Build (No Tree-sitter Feature)
```bash
cd rust
wasm-pack build --target web --out-dir ../pkg
```

### Native Build (With Tree-sitter)
```bash
cd rust
cargo build --features tree-sitter
```

## Testing

```bash
# Test without tree-sitter (CST-based)
cargo test --lib

# Test with tree-sitter (native parsing)
cargo test --lib --features tree-sitter
```
