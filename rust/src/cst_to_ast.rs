//! CST to AST converter for web-tree-sitter integration
//!
//! This module converts a serialized CST (Concrete Syntax Tree) from web-tree-sitter
//! into our internal AST representation. This allows WASM builds to use Tree-sitter
//! via the JavaScript web-tree-sitter library, avoiding C library linking issues.

use crate::ast::*;
use serde::{Deserialize, Serialize};

/// Represents a node in the Tree-sitter CST
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CSTNode {
    #[serde(rename = "type")]
    pub node_type: String,
    #[serde(default)]
    pub text: Option<String>,
    #[serde(default)]
    pub children: Vec<CSTNode>,
    #[serde(default)]
    pub fields: std::collections::HashMap<String, Vec<CSTNode>>,
}

/// Convert CST JSON to AST
pub fn cst_to_ast(cst_json: &str) -> Result<Vec<AstToken>, String> {
    let root: CSTNode = serde_json::from_str(cst_json)
        .map_err(|e| format!("Failed to parse CST JSON: {}", e))?;
    
    if root.node_type != "source_file" {
        return Err(format!("Expected source_file root node, got {}", root.node_type));
    }
    
    let mut tokens = Vec::new();
    
    for child in &root.children {
        if let Some(token) = parse_cst_node(child)? {
            tokens.push(token);
        }
    }
    
    Ok(tokens)
}

fn parse_cst_node(node: &CSTNode) -> Result<Option<AstToken>, String> {
    match node.node_type.as_str() {
        "note" => Ok(Some(AstToken::Note(parse_note(node)?))),
        "rest" => Ok(Some(AstToken::Rest(parse_rest(node)?))),
        "length_command" => Ok(Some(AstToken::Length(parse_length(node)?))),
        "octave_command" => Ok(Some(AstToken::Octave(parse_octave(node)?))),
        "octave_up" => Ok(Some(AstToken::OctaveUp(parse_octave_up(node)?))),
        "octave_down" => Ok(Some(AstToken::OctaveDown(parse_octave_down(node)?))),
        "instrument_command" => Ok(Some(AstToken::Instrument(parse_instrument(node)?))),
        "chord" => Ok(Some(AstToken::Chord(parse_chord(node)?))),
        "track_separator" => Ok(Some(AstToken::TrackSeparator(parse_track_separator(node)?))),
        _ => Ok(None), // Skip unknown nodes
    }
}

fn parse_note(node: &CSTNode) -> Result<NoteToken, String> {
    let pitch_node = node.fields.get("pitch")
        .and_then(|v| v.first())
        .ok_or_else(|| "Note missing pitch field".to_string())?;
    
    let pitch_text = pitch_node.text.as_ref()
        .ok_or_else(|| "Pitch node missing text".to_string())?;
    
    let note = pitch_text.chars().next()
        .ok_or_else(|| "Pitch text is empty".to_string())?;
    
    let accidentals = node.fields.get("accidentals")
        .map(|acc_nodes| {
            acc_nodes.iter()
                .filter_map(|n| n.text.as_ref().map(|s| s.as_str()))
                .collect::<String>()
        })
        .unwrap_or_default();
    
    let duration = node.fields.get("duration")
        .and_then(|v| v.first())
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    let dots = node.fields.get("dots")
        .map(|v| v.len() as u32)
        .unwrap_or(0);
    
    // Calculate length from node text if available
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    
    Ok(NoteToken {
        note,
        accidental: accidentals,
        duration,
        dots,
        length,
    })
}

fn parse_rest(node: &CSTNode) -> Result<RestToken, String> {
    let duration = node.fields.get("duration")
        .and_then(|v| v.first())
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    let dots = node.fields.get("dots")
        .map(|v| v.len() as u32)
        .unwrap_or(0);
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    
    Ok(RestToken {
        duration,
        dots,
        length,
    })
}

fn parse_length(node: &CSTNode) -> Result<LengthToken, String> {
    let value_node = node.fields.get("value")
        .and_then(|v| v.first())
        .ok_or_else(|| "Length command missing value field".to_string())?;
    
    let value = value_node.text.as_ref()
        .and_then(|t| t.parse::<u32>().ok());
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(LengthToken {
        value,
        length,
    })
}

fn parse_octave(node: &CSTNode) -> Result<OctaveToken, String> {
    let value_node = node.fields.get("value")
        .and_then(|v| v.first())
        .ok_or_else(|| "Octave command missing value field".to_string())?;
    
    let value = value_node.text.as_ref()
        .and_then(|t| t.parse::<u32>().ok());
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(OctaveToken {
        value,
        length,
    })
}

fn parse_octave_up(node: &CSTNode) -> Result<OctaveUpToken, String> {
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    Ok(OctaveUpToken { length })
}

fn parse_octave_down(node: &CSTNode) -> Result<OctaveDownToken, String> {
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    Ok(OctaveDownToken { length })
}

fn parse_instrument(node: &CSTNode) -> Result<InstrumentToken, String> {
    let name_node = node.fields.get("name")
        .and_then(|v| v.first())
        .ok_or_else(|| "Instrument command missing name field".to_string())?;
    
    let value = name_node.text.clone();
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(InstrumentToken {
        value,
        length,
    })
}

fn parse_chord(node: &CSTNode) -> Result<ChordToken, String> {
    let note_nodes = node.fields.get("notes")
        .ok_or_else(|| "Chord missing notes field".to_string())?;
    
    let mut notes = Vec::new();
    for note_node in note_nodes {
        notes.push(parse_chord_note(note_node)?);
    }
    
    let duration = node.fields.get("duration")
        .and_then(|v| v.first())
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    let dots = node.fields.get("dots")
        .map(|v| v.len() as u32)
        .unwrap_or(0);
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(ChordToken {
        notes,
        duration,
        dots,
        length,
    })
}

fn parse_chord_note(node: &CSTNode) -> Result<ChordNote, String> {
    let pitch_node = node.fields.get("pitch")
        .and_then(|v| v.first())
        .ok_or_else(|| "Chord note missing pitch field".to_string())?;
    
    let pitch_text = pitch_node.text.as_ref()
        .ok_or_else(|| "Pitch node missing text".to_string())?;
    
    let note = pitch_text.chars().next()
        .ok_or_else(|| "Pitch text is empty".to_string())?;
    
    let accidental = node.fields.get("accidentals")
        .map(|acc_nodes| {
            acc_nodes.iter()
                .filter_map(|n| n.text.as_ref().map(|s| s.as_str()))
                .collect::<String>()
        })
        .unwrap_or_default();
    
    Ok(ChordNote {
        note,
        accidental,
    })
}

fn parse_track_separator(node: &CSTNode) -> Result<TrackSeparatorToken, String> {
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    Ok(TrackSeparatorToken { length })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_simple_note() {
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
        
        let result = cst_to_ast(cst_json);
        assert!(result.is_ok());
        let tokens = result.unwrap();
        assert_eq!(tokens.len(), 1);
        
        match &tokens[0] {
            AstToken::Note(note) => {
                assert_eq!(note.note, 'c');
                assert_eq!(note.accidental, "");
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_note_with_accidental() {
        let cst_json = r#"{
            "type": "source_file",
            "children": [
                {
                    "type": "note",
                    "text": "c+",
                    "fields": {
                        "pitch": [{"type": "note_pitch", "text": "c"}],
                        "accidentals": [{"type": "accidental", "text": "+"}]
                    },
                    "children": []
                }
            ],
            "fields": {}
        }"#;
        
        let result = cst_to_ast(cst_json);
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        match &tokens[0] {
            AstToken::Note(note) => {
                assert_eq!(note.note, 'c');
                assert_eq!(note.accidental, "+");
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_chord() {
        let cst_json = r#"{
            "type": "source_file",
            "children": [
                {
                    "type": "chord",
                    "text": "'ceg'",
                    "fields": {
                        "notes": [
                            {
                                "type": "chord_note",
                                "fields": {
                                    "pitch": [{"type": "note_pitch", "text": "c"}]
                                }
                            },
                            {
                                "type": "chord_note",
                                "fields": {
                                    "pitch": [{"type": "note_pitch", "text": "e"}]
                                }
                            },
                            {
                                "type": "chord_note",
                                "fields": {
                                    "pitch": [{"type": "note_pitch", "text": "g"}]
                                }
                            }
                        ]
                    },
                    "children": []
                }
            ],
            "fields": {}
        }"#;
        
        let result = cst_to_ast(cst_json);
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        match &tokens[0] {
            AstToken::Chord(chord) => {
                assert_eq!(chord.notes.len(), 3);
                assert_eq!(chord.notes[0].note, 'c');
                assert_eq!(chord.notes[1].note, 'e');
                assert_eq!(chord.notes[2].note, 'g');
            }
            _ => panic!("Expected Chord token"),
        }
    }
}
