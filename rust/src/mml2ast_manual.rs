use crate::ast::*;

// Error message constants
const INVALID_DURATION_MSG: &str = "Duration should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)";
const INVALID_OCTAVE_MSG: &str = "Octave should be between 0 and 8.";

/// Parse MML string into AST tokens
pub fn mml2ast(mml: &str) -> Result<Vec<AstToken>, String> {
    let mut tokens = Vec::new();
    let mut index = 0;
    let chars: Vec<char> = mml.chars().collect();

    while index < chars.len() {
        let ch = chars[index];

        // Skip whitespace
        if ch.is_whitespace() {
            index += 1;
            continue;
        }

        // Chord command: 'ceg' (single-quoted notes)
        if ch == '\'' {
            let (token, consumed) = parse_chord(&chars, index)?;
            tokens.push(AstToken::Chord(token));
            index += consumed;
            continue;
        }

        // Note commands: c, d, e, f, g, a, b
        if matches!(ch, 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b') {
            let (token, consumed) = parse_note(&chars, index)?;
            tokens.push(AstToken::Note(token));
            index += consumed;
            continue;
        }

        // Rest command: r
        if ch == 'r' {
            let (token, consumed) = parse_rest(&chars, index)?;
            tokens.push(AstToken::Rest(token));
            index += consumed;
            continue;
        }

        // Length command: l
        if ch == 'l' {
            let (token, consumed) = parse_length(&chars, index)?;
            tokens.push(AstToken::Length(token));
            index += consumed;
            continue;
        }

        // Octave command: o
        if ch == 'o' {
            let (token, consumed) = parse_octave(&chars, index)?;
            tokens.push(AstToken::Octave(token));
            index += consumed;
            continue;
        }

        // Octave up: <
        if ch == '<' {
            tokens.push(AstToken::OctaveUp(OctaveUpToken { length: 1 }));
            index += 1;
            continue;
        }

        // Octave down: >
        if ch == '>' {
            tokens.push(AstToken::OctaveDown(OctaveDownToken { length: 1 }));
            index += 1;
            continue;
        }

        // Instrument command: @
        if ch == '@' {
            let (token, consumed) = parse_instrument(&chars, index)?;
            tokens.push(AstToken::Instrument(token));
            index += consumed;
            continue;
        }

        // Track separator: ;
        if ch == ';' {
            tokens.push(AstToken::TrackSeparator(TrackSeparatorToken { length: 1 }));
            index += 1;
            continue;
        }

        // Unknown character, skip
        index += 1;
    }

    Ok(tokens)
}

fn parse_digits(chars: &[char], start_index: usize) -> (Option<u32>, usize) {
    let mut index = start_index;
    let mut digit_str = String::new();

    while index < chars.len() && chars[index].is_ascii_digit() {
        digit_str.push(chars[index]);
        index += 1;
    }

    let value = if digit_str.is_empty() {
        None
    } else {
        digit_str.parse::<u32>().ok()
    };

    (value, index - start_index)
}

fn parse_note(chars: &[char], start_index: usize) -> Result<(NoteToken, usize), String> {
    let mut index = start_index + 1; // Skip note character
    let note = chars[start_index];
    let mut accidental = String::new();
    let mut dots = 0;

    // Parse accidentals (+ or -)
    while index < chars.len() && matches!(chars[index], '+' | '-') {
        accidental.push(chars[index]);
        index += 1;
    }

    // Parse duration (number)
    let (duration, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate duration
    if let Some(d) = duration {
        if !is_valid_duration(d) {
            eprintln!("mml2ast: Invalid duration '{}' at position {}. {}", d, start_index, INVALID_DURATION_MSG);
        }
    }

    // Parse dots
    while index < chars.len() && chars[index] == '.' {
        dots += 1;
        index += 1;
    }

    Ok((
        NoteToken {
            note,
            accidental,
            duration,
            dots,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn parse_rest(chars: &[char], start_index: usize) -> Result<(RestToken, usize), String> {
    let mut index = start_index + 1; // Skip 'r'
    let mut dots = 0;

    // Parse duration (number)
    let (duration, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate duration
    if let Some(d) = duration {
        if !is_valid_duration(d) {
            eprintln!("mml2ast: Invalid duration '{}' for rest at position {}. {}", d, start_index, INVALID_DURATION_MSG);
        }
    }

    // Parse dots
    while index < chars.len() && chars[index] == '.' {
        dots += 1;
        index += 1;
    }

    Ok((
        RestToken {
            duration,
            dots,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn parse_length(chars: &[char], start_index: usize) -> Result<(LengthToken, usize), String> {
    let mut index = start_index + 1; // Skip 'l'

    // Parse duration (number)
    let (value, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate duration
    if let Some(v) = value {
        if !is_valid_duration(v) {
            eprintln!("mml2ast: Invalid length '{}' at position {}. {}", v, start_index, INVALID_DURATION_MSG);
        }
    }

    Ok((
        LengthToken {
            value,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn parse_octave(chars: &[char], start_index: usize) -> Result<(OctaveToken, usize), String> {
    let mut index = start_index + 1; // Skip 'o'

    // Parse octave number
    let (value, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate octave
    if let Some(v) = value {
        if !is_valid_octave(v) {
            eprintln!("mml2ast: Invalid octave '{}' at position {}. {}", v, start_index, INVALID_OCTAVE_MSG);
        }
    }

    Ok((
        OctaveToken {
            value,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn parse_instrument(chars: &[char], start_index: usize) -> Result<(InstrumentToken, usize), String> {
    let mut index = start_index + 1; // Skip '@'

    // Parse instrument name (alphanumeric characters)
    let mut instrument_name = String::new();
    while index < chars.len() && (chars[index].is_alphanumeric() || chars[index] == '_') {
        instrument_name.push(chars[index]);
        index += 1;
    }

    // Validate instrument name
    let value = if instrument_name.is_empty() {
        None
    } else {
        if !is_valid_instrument(&instrument_name) {
            eprintln!("mml2ast: Invalid instrument '{}' at position {}. Valid instruments: Synth, FMSynth, AMSynth, MonoSynth, DuoSynth, PluckSynth, MembraneSynth, MetalSynth, PolySynth, NoiseSynth, Sampler", 
                instrument_name, start_index);
        }
        Some(instrument_name)
    };

    // Check for JSON args in curly braces
    let mut args: Option<String> = None;
    if index < chars.len() && chars[index] == '{' {
        let json_start = index;
        let mut brace_count = 1;
        let mut json_content = String::new();
        json_content.push('{'); // Include the opening brace
        index += 1; // Skip opening brace
        
        // Find matching closing brace
        while index < chars.len() && brace_count > 0 {
            let ch = chars[index];
            if ch == '{' {
                brace_count += 1;
                json_content.push(ch);
            } else if ch == '}' {
                brace_count -= 1;
                json_content.push(ch); // Always include the closing brace
                if brace_count == 0 {
                    index += 1; // Skip closing brace
                    break;
                }
            } else {
                json_content.push(ch);
            }
            index += 1;
        }
        
        if brace_count != 0 {
            return Err(format!("Unclosed brace in instrument args at position {}", json_start));
        }
        
        // Validate JSON by attempting to parse it
        match serde_json::from_str::<serde_json::Value>(&json_content) {
            Ok(_) => args = Some(json_content),
            Err(e) => {
                eprintln!("mml2ast: Invalid JSON in instrument args at position {}: {}", json_start, e);
                // Still store the invalid JSON, let the consumer handle it
                args = Some(json_content);
            }
        }
    }

    Ok((
        InstrumentToken {
            value,
            args,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn parse_chord(chars: &[char], start_index: usize) -> Result<(ChordToken, usize), String> {
    let mut index = start_index + 1; // Skip opening single quote
    let mut notes = Vec::new();
    let mut duration: Option<u32> = None;
    let mut found_first_duration = false;

    // Find the closing single quote
    while index < chars.len() && chars[index] != '\'' {
        let ch = chars[index];
        
        // Parse note within the chord
        if matches!(ch, 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b') {
            let note = ch;
            index += 1;
            
            // Parse accidental for this note
            let mut accidental = String::new();
            while index < chars.len() && chars[index] != '\'' && matches!(chars[index], '+' | '-') {
                accidental.push(chars[index]);
                index += 1;
            }
            
            notes.push(ChordNote { note, accidental });
        } else if ch.is_ascii_digit() {
            // Parse numeric representation within the chord
            // First number becomes the duration, subsequent numbers are ignored
            if !found_first_duration {
                let (parsed_duration, digit_len) = parse_digits(chars, index);
                if let Some(d) = parsed_duration {
                    duration = Some(d);
                    found_first_duration = true;
                }
                index += digit_len;
            } else {
                // Ignore subsequent numbers - just skip digits
                let (_, digit_len) = parse_digits(chars, index);
                index += digit_len;
            }
        } else {
            // Skip non-note characters within the chord, but warn on unexpected ones
            if !ch.is_whitespace() {
                eprintln!(
                    "mml2ast: Unexpected character '{}' in chord at position {}. This character will be ignored.",
                    ch,
                    index
                );
            }
            index += 1;
        }
    }

    // Check if we found a closing quote
    if index >= chars.len() || chars[index] != '\'' {
        return Err(format!("Unclosed chord at position {}: missing closing single quote", start_index));
    }
    
    // Validate that the chord is not empty
    if notes.is_empty() {
        return Err(format!("Empty chord at position {}: chord must contain at least one note", start_index));
    }
    
    index += 1; // Skip closing single quote

    // Skip any numbers immediately after the closing quote (following mml2abc format)
    // Numbers after the closing quote are ignored, only numbers inside the quotes count
    let (_, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate duration if one was found inside the chord
    if let Some(d) = duration {
        if !is_valid_duration(d) {
            eprintln!("mml2ast: Invalid duration '{}' for chord at position {}. {}", d, start_index, INVALID_DURATION_MSG);
        }
    }

    // Parse dots
    let mut dots = 0;
    while index < chars.len() && chars[index] == '.' {
        dots += 1;
        index += 1;
    }

    Ok((
        ChordToken {
            notes,
            duration,
            dots,
            length: index - start_index,
        },
        index - start_index,
    ))
}

fn is_valid_duration(duration: u32) -> bool {
    // Valid durations are powers of 2: 1, 2, 4, 8, 16, 32, 64, etc.
    duration > 0 && (duration & (duration - 1)) == 0
}

fn is_valid_octave(octave: u32) -> bool {
    // Typical MIDI range is 0-10, but we'll allow 0-8 as reasonable
    octave <= 8
}

fn is_valid_instrument(instrument: &str) -> bool {
    // Valid Tone.js synth types
    matches!(
        instrument,
        "Synth" | "FMSynth" | "AMSynth" | "MonoSynth" | "DuoSynth" |
        "PluckSynth" | "MembraneSynth" | "MetalSynth" | "PolySynth" |
        "NoiseSynth" | "Sampler"
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_single_note() {
        let result = mml2ast("c").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Note(n) => {
                assert_eq!(n.note, 'c');
                assert_eq!(n.accidental, "");
                assert_eq!(n.duration, None);
                assert_eq!(n.dots, 0);
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_note_with_duration() {
        let result = mml2ast("c4").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Note(n) => {
                assert_eq!(n.note, 'c');
                assert_eq!(n.duration, Some(4));
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_note_with_accidental() {
        let result = mml2ast("c+").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Note(n) => {
                assert_eq!(n.note, 'c');
                assert_eq!(n.accidental, "+");
            }
            _ => panic!("Expected Note token"),
        }
    }

    #[test]
    fn test_parse_complex_mml() {
        let result = mml2ast("o4 l16 e").unwrap();
        assert_eq!(result.len(), 3);
        assert!(matches!(result[0], AstToken::Octave(_)));
        assert!(matches!(result[1], AstToken::Length(_)));
        assert!(matches!(result[2], AstToken::Note(_)));
    }

    #[test]
    fn test_parse_octave_changes() {
        let result = mml2ast("< >").unwrap();
        assert_eq!(result.len(), 2);
        assert!(matches!(result[0], AstToken::OctaveUp(_)));
        assert!(matches!(result[1], AstToken::OctaveDown(_)));
    }

    #[test]
    fn test_parse_track_separator() {
        let result = mml2ast("c;d").unwrap();
        assert_eq!(result.len(), 3);
        assert!(matches!(result[0], AstToken::Note(_)));
        assert!(matches!(result[1], AstToken::TrackSeparator(_)));
        assert!(matches!(result[2], AstToken::Note(_)));
    }

    #[test]
    fn test_parse_multiple_tracks() {
        let result = mml2ast("o4 l8 cde; o5 l16 efg").unwrap();
        // Count the track separator
        let separator_count = result.iter().filter(|t| matches!(t, AstToken::TrackSeparator(_))).count();
        assert_eq!(separator_count, 1);
        assert!(result.len() > 5); // Should have multiple tokens
    }

    #[test]
    fn test_parse_simple_chord() {
        let result = mml2ast("'ceg'").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 3);
                assert_eq!(c.notes[0].note, 'c');
                assert_eq!(c.notes[0].accidental, "");
                assert_eq!(c.notes[1].note, 'e');
                assert_eq!(c.notes[1].accidental, "");
                assert_eq!(c.notes[2].note, 'g');
                assert_eq!(c.notes[2].accidental, "");
                assert_eq!(c.duration, None);
                assert_eq!(c.dots, 0);
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_chord_with_duration() {
        let result = mml2ast("'ceg'4").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 3);
                assert_eq!(c.duration, Some(4));
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_chord_with_accidentals() {
        let result = mml2ast("'c+eg-'").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 3);
                assert_eq!(c.notes[0].note, 'c');
                assert_eq!(c.notes[0].accidental, "+");
                assert_eq!(c.notes[1].note, 'e');
                assert_eq!(c.notes[1].accidental, "");
                assert_eq!(c.notes[2].note, 'g');
                assert_eq!(c.notes[2].accidental, "-");
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_chord_with_dots() {
        let result = mml2ast("'ceg'4..").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.duration, Some(4));
                assert_eq!(c.dots, 2);
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_single_note_chord() {
        let result = mml2ast("'c'").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 1);
                assert_eq!(c.notes[0].note, 'c');
                assert_eq!(c.notes[0].accidental, "");
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_chord_with_whitespace() {
        let result = mml2ast("'c e g'").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 3);
                assert_eq!(c.notes[0].note, 'c');
                assert_eq!(c.notes[1].note, 'e');
                assert_eq!(c.notes[2].note, 'g');
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_empty_chord_returns_error() {
        let result = mml2ast("''");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Empty chord"));
    }

    #[test]
    fn test_parse_chord_with_invalid_characters() {
        // Invalid characters should be ignored (with warnings)
        let result = mml2ast("'c1e2g'").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Chord(c) => {
                assert_eq!(c.notes.len(), 3);
                assert_eq!(c.notes[0].note, 'c');
                assert_eq!(c.notes[1].note, 'e');
                assert_eq!(c.notes[2].note, 'g');
            }
            _ => panic!("Expected Chord token"),
        }
    }

    #[test]
    fn test_parse_mixed_notes_and_chords() {
        let result = mml2ast("c 'eg' d").unwrap();
        assert_eq!(result.len(), 3);
        assert!(matches!(result[0], AstToken::Note(_)));
        assert!(matches!(result[1], AstToken::Chord(_)));
        assert!(matches!(result[2], AstToken::Note(_)));
    }

    #[test]
    fn test_parse_instrument_with_json_args() {
        let result = mml2ast(r#"@Sampler{"urls":{"C4":"test.mp3"},"release":1}"#).unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Instrument(instr) => {
                assert_eq!(instr.value.as_deref(), Some("Sampler"));
                assert!(instr.args.is_some());
                let args = instr.args.as_ref().unwrap();
                assert!(args.contains("urls"));
                assert!(args.contains("C4"));
                assert!(args.contains("test.mp3"));
            }
            _ => panic!("Expected Instrument token"),
        }
    }

    #[test]
    fn test_parse_instrument_with_nested_json() {
        let result = mml2ast(r#"@Sampler{"urls":{"C4":"a.mp3","D4":"b.mp3"}}"#).unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Instrument(instr) => {
                assert_eq!(instr.value.as_deref(), Some("Sampler"));
                assert!(instr.args.is_some());
            }
            _ => panic!("Expected Instrument token"),
        }
    }

    #[test]
    fn test_parse_instrument_without_args() {
        let result = mml2ast("@Synth").unwrap();
        assert_eq!(result.len(), 1);
        match &result[0] {
            AstToken::Instrument(instr) => {
                assert_eq!(instr.value.as_deref(), Some("Synth"));
                assert!(instr.args.is_none());
            }
            _ => panic!("Expected Instrument token"),
        }
    }

    #[test]
    fn test_parse_instrument_with_args_followed_by_notes() {
        let result = mml2ast(r#"@Sampler{"release":1} c d e"#).unwrap();
        assert_eq!(result.len(), 4);
        assert!(matches!(result[0], AstToken::Instrument(_)));
        assert!(matches!(result[1], AstToken::Note(_)));
        assert!(matches!(result[2], AstToken::Note(_)));
        assert!(matches!(result[3], AstToken::Note(_)));
    }
}
