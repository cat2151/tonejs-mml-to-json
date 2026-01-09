use crate::ast::*;

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
            eprintln!("mml2ast: Invalid duration '{}' at position {}. Duration should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)", d, start_index);
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
            eprintln!("mml2ast: Invalid duration '{}' for rest at position {}. Duration should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)", d, start_index);
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
            eprintln!("mml2ast: Invalid length '{}' at position {}. Length should be a power of 2 (1, 2, 4, 8, 16, 32, etc.)", v, start_index);
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
            eprintln!("mml2ast: Invalid octave '{}' at position {}. Octave should be between 0 and 8.", v, start_index);
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

    // Parse instrument number
    let (value, digit_len) = parse_digits(chars, index);
    index += digit_len;

    // Validate instrument
    if let Some(v) = value {
        if !is_valid_instrument(v) {
            eprintln!("mml2ast: Invalid instrument '{}' at position {}. Instrument should be a non-negative number.", v, start_index);
        }
    }

    Ok((
        InstrumentToken {
            value,
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

fn is_valid_instrument(_instrument: u32) -> bool {
    // Instrument should be non-negative (always true for u32)
    true
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
}
