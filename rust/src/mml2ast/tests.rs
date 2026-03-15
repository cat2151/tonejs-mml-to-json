
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
