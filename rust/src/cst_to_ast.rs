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
    
    // Fixed: field is "accidental" not "accidentals"
    let accidental = node.fields.get("accidental")
        .and_then(|v| v.first())
        .and_then(|n| n.text.clone())
        .unwrap_or_default();
    
    let duration = node.fields.get("duration")
        .and_then(|v| v.first())
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    // Count dots by checking for dots field
    let dots = node.fields.get("dots")
        .and_then(|v| v.first())
        .and_then(|n| n.text.as_ref())
        .map(|t| t.len() as u32)
        .unwrap_or(0);
    
    // Calculate length from node text if available
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    
    Ok(NoteToken {
        note,
        accidental,
        duration,
        dots,
        length,
    })
}

fn parse_rest(node: &CSTNode) -> Result<RestToken, String> {
    // Duration is in children array, not fields
    let duration = node.children.iter()
        .find(|n| n.node_type == "duration")
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    // WORKAROUND: Tree-sitter puts dots in fields.duration (should be fields.dots)
    // Check both locations to be safe
    let dots = node.fields.get("dots")
        .or_else(|| node.fields.get("duration"))
        .and_then(|v| v.iter().find(|n| n.node_type == "dots"))
        .and_then(|n| n.text.as_ref())
        .map(|t| t.len() as u32)
        .unwrap_or(0);
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(1);
    
    Ok(RestToken {
        duration,
        dots,
        length,
    })
}

fn parse_length(node: &CSTNode) -> Result<LengthToken, String> {
    // Value is in children array, not fields
    let value = node.children.iter()
        .find(|n| n.node_type == "duration")
        .and_then(|n| n.text.as_ref())
        .and_then(|t| t.parse::<u32>().ok());
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(LengthToken {
        value,
        length,
    })
}

fn parse_octave(node: &CSTNode) -> Result<OctaveToken, String> {
    // Value is in children array, not fields
    let value = node.children.iter()
        .find(|n| n.node_type == "duration")
        .and_then(|n| n.text.as_ref())
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
    // Instrument name is in children array
    let value = node.children.iter()
        .find(|n| n.node_type == "instrument_name")
        .and_then(|n| n.text.clone());
    
    // JSON args are in fields.name (weird, but that's what tree-sitter gives us)
    let args = node.fields.get("name")
        .and_then(|v| v.first())
        .and_then(|n| n.text.clone());
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(InstrumentToken {
        value,
        args,
        length,
    })
}

fn parse_chord(node: &CSTNode) -> Result<ChordToken, String> {
    let mut notes = Vec::new();
    let mut duration = None;
    let mut dots_count = 0;
    
    // First note is in children[0]
    if let Some(first_note) = node.children.first() {
        if first_note.node_type == "chord_note" {
            // Extract duration from first note if present
            if duration.is_none() {
                duration = first_note.fields.get("duration")
                    .and_then(|v| v.first())
                    .and_then(|n| n.text.as_ref())
                    .and_then(|t| t.parse::<u32>().ok());
            }
            notes.push(parse_chord_note(first_note)?);
        } else if first_note.node_type == "dots" {
            // Dots might be in children
            if let Some(text) = &first_note.text {
                dots_count = text.len() as u32;
            }
        }
    }
    
    // Process remaining children for dots
    for child in &node.children[1..] {
        if child.node_type == "dots" {
            if let Some(text) = &child.text {
                dots_count = text.len() as u32;
            }
        }
    }
    
    // Rest of notes are in fields.notes - but also may include dots nodes
    if let Some(note_nodes) = node.fields.get("notes") {
        for note_node in note_nodes {
            if note_node.node_type == "chord_note" {
                notes.push(parse_chord_note(note_node)?);
            } else if note_node.node_type == "dots" {
                // WORKAROUND: Tree-sitter puts dots in fields.notes array
                if let Some(text) = &note_node.text {
                    dots_count = text.len() as u32;
                }
            }
        }
    }
    
    // Also check fields.dots for dots (correct location)
    if dots_count == 0 {
        dots_count = node.fields.get("dots")
            .and_then(|v| v.first())
            .and_then(|n| n.text.as_ref())
            .map(|t| t.len() as u32)
            .unwrap_or(0);
    }
    
    if notes.is_empty() {
        return Err("Chord missing notes field".to_string());
    }
    
    let length = node.text.as_ref().map(|t| t.len()).unwrap_or(2);
    
    Ok(ChordToken {
        notes,
        duration,
        dots: dots_count,
        length,
    })
}

fn parse_chord_note(node: &CSTNode) -> Result<ChordNote, String> {
    let pitch_node = node.fields.get("pitch")
        .and_then(|v| v.first())
        .ok_or_else(|| "Chord note missing pitch field".to_string())?;
    
    let pitch_text = pitch_node.text.as_ref()
        .ok_or_else(|| "Pitch node missing text".to_string())?;
    
    // Check for empty pitch text (empty chord case)
    if pitch_text.is_empty() {
        return Err("Empty chord - must contain at least one note".to_string());
    }
    
    let note = pitch_text.chars().next()
        .ok_or_else(|| "Pitch text is empty".to_string())?;
    
    // Fixed: field is "accidental" not "accidentals"
    let accidental = node.fields.get("accidental")
        .and_then(|v| v.first())
        .and_then(|n| n.text.clone())
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
