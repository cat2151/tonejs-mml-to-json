/// Track processing module
/// 
/// This module is responsible for:
/// - Splitting AST into separate tracks
/// - Detecting chord usage in tracks

use crate::ast::AstToken;

/// Split AST into separate tracks based on TrackSeparator tokens
/// 
/// # Arguments
/// * `ast` - Full AST containing multiple tracks
/// 
/// # Returns
/// Vector of track ASTs
pub fn split_into_tracks(ast: &[AstToken]) -> Vec<Vec<AstToken>> {
    let mut tracks = vec![Vec::new()];
    
    for token in ast {
        match token {
            AstToken::TrackSeparator(_) => {
                // Start a new track
                tracks.push(Vec::new());
            }
            _ => {
                // Add token to current track
                if let Some(current_track) = tracks.last_mut() {
                    current_track.push(token.clone());
                }
            }
        }
    }
    
    tracks
}

/// Check if a track contains any chord tokens
/// 
/// # Arguments
/// * `ast` - Track AST to check
/// 
/// # Returns
/// true if the track contains at least one chord
pub fn has_chords(ast: &[AstToken]) -> bool {
    ast.iter().any(|token| matches!(token, AstToken::Chord(_)))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ast::{NoteToken, RestToken, TrackSeparatorToken};

    #[test]
    fn test_split_into_tracks_single() {
        let ast = vec![
            AstToken::Note(NoteToken {
                note: 'c',
                accidental: "".to_string(),
                duration: None,
                dots: 0,
                length: 1,
            }),
        ];
        
        let tracks = split_into_tracks(&ast);
        assert_eq!(tracks.len(), 1);
        assert_eq!(tracks[0].len(), 1);
    }

    #[test]
    fn test_split_into_tracks_multiple() {
        let ast = vec![
            AstToken::Note(NoteToken {
                note: 'c',
                accidental: "".to_string(),
                duration: None,
                dots: 0,
                length: 1,
            }),
            AstToken::TrackSeparator(TrackSeparatorToken { length: 1 }),
            AstToken::Note(NoteToken {
                note: 'e',
                accidental: "".to_string(),
                duration: None,
                dots: 0,
                length: 1,
            }),
        ];
        
        let tracks = split_into_tracks(&ast);
        assert_eq!(tracks.len(), 2);
        assert_eq!(tracks[0].len(), 1);
        assert_eq!(tracks[1].len(), 1);
    }

    #[test]
    fn test_has_chords_false() {
        let ast = vec![
            AstToken::Note(NoteToken {
                note: 'c',
                accidental: "".to_string(),
                duration: None,
                dots: 0,
                length: 1,
            }),
            AstToken::Rest(RestToken {
                duration: None,
                dots: 0,
                length: 1,
            }),
        ];
        
        assert!(!has_chords(&ast));
    }
}
