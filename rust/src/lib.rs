use wasm_bindgen::prelude::*;

pub mod ast;
pub mod mml2ast;
pub mod ast2json;

pub use ast::{AstToken, NoteToken, RestToken, LengthToken, OctaveToken, InstrumentToken};
pub use mml2ast::mml2ast;
pub use ast2json::ast2json;

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
        Err(e) => format!(r#"{{"error":"{}"}}"#, e.replace('"', "\\\"")),
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
