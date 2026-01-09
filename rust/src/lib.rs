use wasm_bindgen::prelude::*;
use serde::Serialize;

pub mod ast;
pub mod mml2ast;
pub mod ast2json;

pub use ast::{AstToken, NoteToken, RestToken, LengthToken, OctaveToken, InstrumentToken};
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
