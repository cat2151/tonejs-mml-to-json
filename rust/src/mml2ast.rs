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
        "octave_up" => Ok(Some(AstToken::OctaveUp(OctaveUpToken { length: 1 }))),
        "octave_down" => Ok(Some(AstToken::OctaveDown(OctaveDownToken { length: 1 }))),
        "instrument_command" => Ok(Some(AstToken::Instrument(parse_instrument(node, source)?))),
        "chord" => Ok(Some(AstToken::Chord(parse_chord(node, source)?))),
        "track_separator" => Ok(Some(AstToken::TrackSeparator(TrackSeparatorToken { length: 1 }))),
        _ => Ok(None), // Skip unknown nodes
    }
}

fn parse_note(node: &Node, source: &str) -> Result<NoteToken, String> {
    let mut note = NoteToken {
        pitch: String::new(),
        accidentals: 0,
        duration: None,
        dots: 0,
    };
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("pitch") => {
                    note.pitch = get_node_text(&child, source).to_string();
                }
                Some("accidentals") => {
                    let text = get_node_text(&child, source);
                    note.accidentals += if text == "+" { 1 } else { -1 };
                }
                Some("duration") => {
                    note.duration = Some(parse_duration(&child, source)?);
                }
                Some("dots") => {
                    note.dots += 1;
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Ok(note)
}

fn parse_rest(node: &Node, source: &str) -> Result<RestToken, String> {
    let mut rest = RestToken {
        duration: None,
        dots: 0,
    };
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("duration") => {
                    rest.duration = Some(parse_duration(&child, source)?);
                }
                Some("dots") => {
                    rest.dots += 1;
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Ok(rest)
}

fn parse_length(node: &Node, source: &str) -> Result<LengthToken, String> {
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            if cursor.field_name() == Some("value") {
                let duration = parse_duration(&child, source)?;
                return Ok(LengthToken { duration });
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
                return Ok(OctaveToken { octave: value });
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
                return Ok(InstrumentToken { name });
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
    let mut duration = None;
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
    
    Ok(ChordToken {
        notes,
        duration,
        dots,
    })
}

fn parse_chord_note(node: &Node, source: &str) -> Result<ChordNoteToken, String> {
    let mut note = ChordNoteToken {
        pitch: String::new(),
        accidentals: 0,
    };
    
    let mut cursor = node.walk();
    if cursor.goto_first_child() {
        loop {
            let child = cursor.node();
            let field_name = cursor.field_name();
            
            match field_name {
                Some("pitch") => {
                    note.pitch = get_node_text(&child, source).to_string();
                }
                Some("accidentals") => {
                    let text = get_node_text(&child, source);
                    note.accidentals += if text == "+" { 1 } else { -1 };
                }
                _ => {}
            }
            
            if !cursor.goto_next_sibling() {
                break;
            }
        }
    }
    
    Ok(note)
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
                assert_eq!(note.pitch, "c");
                assert_eq!(note.accidentals, 0);
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
                assert_eq!(note.pitch, "c");
                assert_eq!(note.accidentals, 1);
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
                assert_eq!(note.pitch, "c");
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
                assert_eq!(octave.octave, 4);
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
                assert_eq!(length.duration, 16);
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
                assert_eq!(chord.notes[0].pitch, "c");
                assert_eq!(chord.notes[1].pitch, "e");
                assert_eq!(chord.notes[2].pitch, "g");
            }
            _ => panic!("Expected Chord token"),
        }
    }
}
