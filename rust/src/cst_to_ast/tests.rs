
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
