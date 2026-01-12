use wasm_bindgen::prelude::*;
use serde::Serialize;

pub mod ast;

// Conditional compilation for parser modules
#[cfg(feature = "tree-sitter")]
pub mod mml2ast;

#[cfg(not(feature = "tree-sitter"))]
pub mod mml2ast_manual;

#[cfg(not(feature = "tree-sitter"))]
pub mod mml2ast {
    pub use crate::mml2ast_manual::mml2ast;
}

pub mod ast2json;

pub use ast::{AstToken, NoteToken, RestToken, LengthToken, OctaveToken, InstrumentToken, TrackSeparatorToken};
pub use mml2ast::mml2ast;
pub use ast2json::ast2json;

/// Error response structure for WASM
#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

/// Convert MML string to JSON string (main API)
pub fn mml_to_json(mml: &str) -> Result<String, String> {
    let ast = mml2ast(mml)?;
    let json = ast2json(&ast)?;
    serde_json::to_string(&json).map_err(|e| format!("JSON serialization error: {}", e))
}

/// WASM binding for mml_to_json
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

/// WASM binding for mml2ast - converts MML string to AST JSON
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
    fn test_basic_mml_conversion() {
        let mml = "o4 l16 e";
        let result = mml_to_json(mml);
        assert!(result.is_ok());
        let json = result.unwrap();
        assert!(json.contains("triggerAttackRelease"));
        assert!(json.contains("e4"));
    }

    #[test]
    fn test_complex_mml() {
        let mml = "o4 l16 efg+abag+f e8.<e8.>e8";
        let result = mml_to_json(mml);
        assert!(result.is_ok());
    }
}
