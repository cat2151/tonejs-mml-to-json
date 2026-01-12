//! MML parser module - Tree-sitter implementation
//! 
//! This module provides Tree-sitter-based MML parsing functionality.
//! This is the default parser used for native builds.

use crate::ast::*;
use tree_sitter::{Parser, Node};

mod tree_sitter_bindings {
    use tree_sitter::Language;

    extern "C" {
        fn tree_sitter_mml() -> Language;
    }

    /// Get the tree-sitter Language for MML.
    pub fn language() -> Language {
        unsafe { tree_sitter_mml() }
    }
}

/// Parse MML string into AST tokens using Tree-sitter
pub fn mml2ast(mml: &str) -> Result<Vec<AstToken>, String> {
    let mut parser = Parser::new();
    let language = tree_sitter_bindings::language();
    
    parser.set_language(language)
        .map_err(|e| format!("Failed to set language: {}", e))?;
    
    let tree = parser.parse(mml, None)
        .ok_or_else(|| "Failed to parse MML".to_string())?;
    
    let root = tree.root_node();
    let mut tokens = Vec::new();
    
    let mut cursor = root.walk();
    
    // Iterate through children of source_file
    if cursor.goto_first_child() {
        loop {
            let node = cursor.node();
            
            if let Some(token) = parse_node(&node, mml)? {
                tokens.push(token);
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Ok(tokens)
}

fn parse_node(node: &Node, source: &str) -> Result<Option<AstToken>, String> {
    match node.kind() {
        "note" => Ok(Some(AstToken::Note(parse_note(node, source)?))),
        "rest" => Ok(Some(AstToken::Rest(parse_rest(node, source)?))),
        "length_command" => Ok(Some(AstToken::Length(parse_length(node, source)?))),
        "octave_command" => Ok(Some(AstToken::Octave(parse_octave(node, source)?))),
        "octave_up" => {
            let length = node.end_byte() - node.start_byte();
            Ok(Some(AstToken::OctaveUp(OctaveUpToken { length })))
        }
        "octave_down" => {
            let length = node.end_byte() - node.start_byte();
            Ok(Some(AstToken::OctaveDown(OctaveDownToken { length })))
        }
        "instrument_command" => Ok(Some(AstToken::Instrument(parse_instrument(node, source)?))),
        "chord" => Ok(Some(AstToken::Chord(parse_chord(node, source)?))),
        "track_separator" => {
            let length = node.end_byte() - node.start_byte();
            Ok(Some(AstToken::TrackSeparator(TrackSeparatorToken { length })))
        }
        _ => Ok(None), // Skip unknown nodes
    }
}

fn parse_note(node: &Node, source: &str) -> Result<NoteToken, String> {
    let mut note: Option<char> = None;
    let mut accidental = String::new();
    let mut duration: Option<u32> = None;
    let mut dots = 0;
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("pitch") => {
                    let text = get_node_text(&child, source);
                    note = text.chars().next();
                }
                Some("accidentals") => {
                    let text = get_node_text(&child, source);
                    accidental.push_str(text);
                }
                Some("duration") => {
                    duration = Some(parse_duration(&child, source)?);
                }
                Some("dots") => {
                    dots += 1;
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    let note = note.ok_or_else(|| "Note missing pitch".to_string())?;
    let start = node.start_byte();
    let end = node.end_byte();
    
    Ok(NoteToken {
        note,
        accidental,
        duration,
        dots,
        length: end - start,
    })
}

fn parse_rest(node: &Node, source: &str) -> Result<RestToken, String> {
    let mut duration: Option<u32> = None;
    let mut dots = 0;
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("duration") => {
                    duration = Some(parse_duration(&child, source)?);
                }
                Some("dots") => {
                    dots += 1;
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    let start = node.start_byte();
    let end = node.end_byte();
    
    Ok(RestToken {
        duration,
        dots,
        length: end - start,
    })
}

fn parse_length(node: &Node, source: &str) -> Result<LengthToken, String> {
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            if cursor.field_name() == Some("value") {
                let duration = parse_duration(&child, source)?;
                let start = node.start_byte();
                let end = node.end_byte();
                return Ok(LengthToken { 
                    value: Some(duration),
                    length: end - start,
                });
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Err("Length command missing value".to_string())
}

fn parse_octave(node: &Node, source: &str) -> Result<OctaveToken, String> {
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            if cursor.field_name() == Some("value") {
                let value = parse_duration(&child, source)?;
                let start = node.start_byte();
                let end = node.end_byte();
                return Ok(OctaveToken { 
                    value: Some(value),
                    length: end - start,
                });
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Err("Octave command missing value".to_string())
}

fn parse_instrument(node: &Node, source: &str) -> Result<InstrumentToken, String> {
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            if cursor.field_name() == Some("name") {
                let name = get_node_text(&child, source).to_string();
                let start = node.start_byte();
                let end = node.end_byte();
                return Ok(InstrumentToken { 
                    value: Some(name),
                    length: end - start,
                });
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Err("Instrument command missing name".to_string())
}

fn parse_chord(node: &Node, source: &str) -> Result<ChordToken, String> {
    let mut notes = Vec::new();
    let mut duration: Option<u32> = None;
    let mut dots = 0;
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("notes") => {
                    notes.push(parse_chord_note(&child, source)?);
                }
                Some("duration") => {
                    duration = Some(parse_duration(&child, source)?);
                }
                Some("dots") => {
                    dots += 1;
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    let start = node.start_byte();
    let end = node.end_byte();
    
    Ok(ChordToken {
        notes,
        duration,
        dots,
        length: end - start,
    })
}

fn parse_chord_note(node: &Node, source: &str) -> Result<ChordNote, String> {
    let mut note: Option<char> = None;
    let mut accidental = String::new();
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("pitch") => {
                    let text = get_node_text(&child, source);
                    note = text.chars().next();
                }
                Some("accidentals") => {
                    let text = get_node_text(&child, source);
                    accidental.push_str(text);
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    let note = note.ok_or_else(|| "Chord note missing pitch".to_string())?;
    
    Ok(ChordNote {
        note,
        accidental,
    })
}

fn parse_duration(node: &Node, source: &str) -> Result<u32, String> {
    let text = get_node_text(node, source);
    text.parse::<u32>()
        .map_err(|e| format!("Failed to parse duration '{}': {}", text, e))
}

fn get_node_text<'a>(node: &Node, source: &'a str) -> &'a str {
    &source[node.start_byte()..node.end_byte()]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_single_note() {
        let result = mml2ast("c");
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
        let result = mml2ast("c+");
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
    fn test_parse_note_with_duration() {
        let result = mml2ast("c4");
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        match &tokens[0] {
            AstToken::Note(note) => {
                assert_eq!(note.note, 'c');
                assert_eq!(note.duration, Some(4));
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_octave_command() {
        let result = mml2ast("o4");
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        match &tokens[0] {
            AstToken::Octave(octave) => {
                assert_eq!(octave.value, Some(4));
            }
            _ => panic!("Expected Octave token"),
        }
    }

    #[test]
    fn test_parse_length_command() {
        let result = mml2ast("l16");
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        match &tokens[0] {
            AstToken::Length(length) => {
                assert_eq!(length.value, Some(16));
            }
            _ => panic!("Expected Length token"),
        }
    }

    #[test]
    fn test_parse_complex_mml() {
        let result = mml2ast("o4 l16 cdefgab");
        assert!(result.is_ok());
        let tokens = result.unwrap();
        
        // Should have 1 octave + 1 length + 7 notes = 9 tokens
        assert_eq!(tokens.len(), 9);
    }

    #[test]
    fn test_parse_chord() {
        let result = mml2ast("'ceg'");
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
