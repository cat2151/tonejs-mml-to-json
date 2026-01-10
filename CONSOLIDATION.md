# TypeScript and Rust WASM Consolidation (Issue #26)

## Summary

This document explains the consolidation of duplicate functionality between TypeScript and Rust WASM implementations, as addressed in issue #26.

## Problem

The project had duplicate implementations of the same functionality:
- **TypeScript implementation**: `src/mml2ast.ts` and `src/ast2json.ts`
- **Rust WASM implementation**: `rust/src/mml2ast.rs` and `rust/src/ast2json.rs`

The TypeScript implementations were used in tests, while the Rust WASM implementation was used in production (browser). This duplication made maintenance more difficult and increased the risk of divergence between implementations.

## Solution

### 1. Exposed Separate WASM Functions

Updated `rust/src/lib.rs` to expose two additional WASM functions:
- `mml2ast_wasm(mml: &str) -> String` - Converts MML string to AST JSON
- `ast2json_wasm(ast_json: &str) -> String` - Converts AST JSON to Tone.js JSON

These functions work alongside the existing `mml_to_json_wasm` function.

### 2. Replaced TypeScript Implementations

The TypeScript files `src/mml2ast.ts` and `src/ast2json.ts` now contain thin wrappers that:
- Import the WASM functions
- Provide the same TypeScript API as before
- Delegate all logic to the Rust WASM implementation

The old TypeScript implementations have been completely removed to avoid confusion.
They can be found in git history (commit d5723ea and earlier) if needed for reference.

### 3. Updated Test Infrastructure

Created `test/setup.js` to initialize WASM before all tests run. This allows tests to use the WASM implementation synchronously without needing to be rewritten as async.

Updated `vitest.config.js` to use the setup file.

### 4. Updated WASM Tests

- **wasm-integration-test.mjs**: Changed from comparing TypeScript vs WASM to simply verifying WASM functionality
- **wasm-init-test.mjs**: Fixed to import from `dist/` instead of `src/`

## Benefits

1. **Single Source of Truth**: Only one implementation (Rust) for the core logic
2. **Consistency**: Tests and production now use the same code path
3. **Maintainability**: Changes only need to be made in one place
4. **Performance**: All code paths now benefit from Rust/WASM performance
5. **API Compatibility**: The TypeScript API remains unchanged for backward compatibility

## Testing

All tests pass:
- ✅ 74 unit tests (vitest)
- ✅ 27 WASM integration tests
- ✅ Demo tests
- ✅ WASM initialization tests

## Files Changed

### Added/Modified
- `rust/src/lib.rs` - Added `mml2ast_wasm` and `ast2json_wasm` functions
- `src/mml2ast.ts` - Now a WASM wrapper
- `src/ast2json.ts` - Now a WASM wrapper
- `test/setup.js` - New WASM initialization for tests
- `vitest.config.js` - Added setup file
- `test/wasm-integration-test.mjs` - Updated to test WASM only
- `test/wasm-init-test.mjs` - Fixed import path

### Removed
- `src/mml2ast-typescript-impl.ts` - Old TypeScript implementation (available in git history)
- `src/ast2json-typescript-impl.ts` - Old TypeScript implementation (available in git history)
- `src/mml2ast.ts.backup` - Duplicate backup file
- `src/ast2json.ts.backup` - Duplicate backup file

All removed TypeScript implementations can be found in git history (commit d5723ea and earlier).

## Future Work

- Update documentation to clarify that all implementations now use Rust WASM
- Consider deprecating direct usage of `mml2ast` and `ast2json` in favor of the full `mml2json` function

## Notes

- The WASM initialization uses the deprecated parameter format to maintain compatibility. This produces warnings but doesn't affect functionality.
- All TypeScript type definitions are preserved for TypeScript consumers of the library.
- The original TypeScript implementations have been completely removed to maintain a single source of truth in Rust.
- If you need to reference the old TypeScript implementations, they can be found in git history (commit d5723ea and earlier).
