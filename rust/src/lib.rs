use wasm_bindgen::prelude::*;
use serde::Serialize;

pub mod ast;

// Tree-sitter parser for native builds
#[cfg(feature = "tree-sitter")]
pub mod mml2ast;

// Manual parser kept for testing purposes only
#[cfg(test)]
pub mod mml2ast_manual;

// CST to AST converter for WASM builds (using web-tree-sitter)
pub mod cst_to_ast;

pub mod ast2json;

pub use ast::{AstToken, NoteToken, RestToken, LengthToken, OctaveToken, InstrumentToken, TrackSeparatorToken};
#[cfg(feature = "tree-sitter")]
pub use mml2ast::mml2ast;
pub use ast2json::ast2json;

/// Error response structure for WASM
#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

/// Convert MML string to JSON string (main API for native builds with tree-sitter)
#[cfg(feature = "tree-sitter")]
pub fn mml_to_json(mml: &str) -> Result<String, String> {
    let ast = mml2ast(mml)?;
    let json = ast2json(&ast)?;
    serde_json::to_string(&json).map_err(|e| format!("JSON serialization error: {}", e))
}

/// Convert CST JSON to Tone.js JSON (for WASM builds using web-tree-sitter)
pub fn cst_to_json(cst_json: &str) -> Result<String, String> {
    let ast = cst_to_ast::cst_to_ast(cst_json)?;
    let json = ast2json(&ast)?;
    serde_json::to_string(&json).map_err(|e| format!("JSON serialization error: {}", e))
}

/// WASM binding for mml_to_json (native tree-sitter parser)
#[cfg(feature = "tree-sitter")]
#[wasm_bindgen]
pub fn mml_to_json_wasm(mml: &str) -> String {
    match mml_to_json(mml) {
        Ok(json) => json,
        Err(e) => {
            // Use serde_json to properly serialize the error object
            let error_response = ErrorResponse { error: e };
            serde_json::to_string(&error_response)
                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
        }
    }
}

/// WASM binding for CST-based parsing (web-tree-sitter integration)
/// This is the primary WASM entry point when tree-sitter feature is not enabled.
/// Accepts a JSON-serialized CST from web-tree-sitter and converts it to Tone.js JSON.
#[wasm_bindgen]
pub fn cst_to_json_wasm(cst_json: &str) -> String {
    match cst_to_json(cst_json) {
        Ok(json) => json,
        Err(e) => {
            let error_response = ErrorResponse { error: e };
            serde_json::to_string(&error_response)
                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
        }
    }
}

/// WASM binding for mml2ast - converts MML string to AST JSON (native tree-sitter)
#[cfg(feature = "tree-sitter")]
#[wasm_bindgen]
pub fn mml2ast_wasm(mml: &str) -> String {
    match mml2ast(mml) {
        Ok(ast) => {
            serde_json::to_string(&ast)
                .unwrap_or_else(|e| {
                    let error_response = ErrorResponse { error: format!("JSON serialization error: {}", e) };
                    serde_json::to_string(&error_response)
                        .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
                })
        }
        Err(e) => {
            let error_response = ErrorResponse { error: e };
            serde_json::to_string(&error_response)
                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
        }
    }
}

/// WASM binding for cst_to_ast - converts CST JSON to AST JSON
/// This allows web-tree-sitter CST to be converted to our internal AST format.
#[wasm_bindgen]
pub fn cst_to_ast_wasm(cst_json: &str) -> String {
    match cst_to_ast::cst_to_ast(cst_json) {
        Ok(ast) => {
            serde_json::to_string(&ast)
                .unwrap_or_else(|e| {
                    let error_response = ErrorResponse { error: format!("JSON serialization error: {}", e) };
                    serde_json::to_string(&error_response)
                        .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
                })
        }
        Err(e) => {
            let error_response = ErrorResponse { error: e };
            serde_json::to_string(&error_response)
                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
        }
    }
}

/// WASM binding for ast2json - converts AST JSON to Tone.js JSON
#[wasm_bindgen]
pub fn ast2json_wasm(ast_json: &str) -> String {
    match serde_json::from_str::<Vec<AstToken>>(ast_json) {
        Ok(ast) => {
            match ast2json(&ast) {
                Ok(json) => {
                    serde_json::to_string(&json)
                        .unwrap_or_else(|e| {
                            let error_response = ErrorResponse { error: format!("JSON serialization error: {}", e) };
                            serde_json::to_string(&error_response)
                                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
                        })
                }
                Err(e) => {
                    let error_response = ErrorResponse { error: e };
                    serde_json::to_string(&error_response)
                        .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
                }
            }
        }
        Err(e) => {
            let error_response = ErrorResponse { error: format!("Failed to parse AST JSON: {}", e) };
            serde_json::to_string(&error_response)
                .unwrap_or_else(|_| r#"{"error":"Failed to serialize error"}"#.to_string())
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[cfg(feature = "tree-sitter")]
    fn test_basic_mml_conversion() {
        let mml = "o4 l16 e";
        let result = mml_to_json(mml);
        assert!(result.is_ok());
        let json = result.unwrap();
        assert!(json.contains("triggerAttackRelease"));
        assert!(json.contains("e4"));
    }

    #[test]
    #[cfg(feature = "tree-sitter")]
    fn test_complex_mml() {
        let mml = "o4 l16 efg+abag+f e8.<e8.>e8";
        let result = mml_to_json(mml);
        assert!(result.is_ok());
    }

    #[test]
    fn test_cst_to_json_conversion() {
        let cst_json = r#"{
            "type": "source_file",
            "children": [
                {
                    "type": "note",
                    "text": "c",
                    "fields": {
                        "pitch": [{"type": "note_pitch", "text": "c"}]
                    },
                    "children": []
                }
            ],
            "fields": {}
        }"#;
        
        let result = cst_to_json(cst_json);
        assert!(result.is_ok());
    }
}
