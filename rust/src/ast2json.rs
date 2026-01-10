use crate::ast::*;
use serde::{Deserialize, Serialize};

// Duration multiplier constants
const SINGLE_DOT_MULTIPLIER: f64 = 1.5;
const DOUBLE_DOT_MULTIPLIER: f64 = 1.75;

// Event type constants for sorting and comparison
const EVENT_TYPE_CREATE_NODE: &str = "createNode";
const EVENT_TYPE_CONNECT: &str = "connect";

/// JSON command types for Tone.js
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Command {
    pub event_type: String,
    pub node_id: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub node_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub connect_to: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub args: Option<Vec<String>>,
}

/// Convert AST to Tone.js JSON format
pub fn ast2json(ast: &[AstToken]) -> Result<Vec<Command>, String> {
    // Check if there are any track separators
    let has_track_separators = ast.iter().any(|token| matches!(token, AstToken::TrackSeparator(_)));
    
    if has_track_separators {
        // Multi-track processing
        let tracks = split_into_tracks(ast);
        let mut all_commands = Vec::new();
        
        for (track_index, track_ast) in tracks.iter().enumerate() {
            let track_commands = process_single_track(track_ast, track_index as u32)?;
            all_commands.extend(track_commands);
        }
        
        // Sort commands by start time (keeping setup commands at the beginning)
        all_commands.sort_by(|a, b| {
            // createNode and connect commands stay at the beginning
            let a_is_setup = a.event_type == EVENT_TYPE_CREATE_NODE || a.event_type == EVENT_TYPE_CONNECT;
            let b_is_setup = b.event_type == EVENT_TYPE_CREATE_NODE || b.event_type == EVENT_TYPE_CONNECT;
            
            if a_is_setup && b_is_setup {
                return std::cmp::Ordering::Equal;
            }
            if a_is_setup {
                return std::cmp::Ordering::Less;
            }
            if b_is_setup {
                return std::cmp::Ordering::Greater;
            }
            
            // Sort other events by start time
            let a_start = get_start_tick(a);
            let b_start = get_start_tick(b);
            a_start.cmp(&b_start)
        });
        
        Ok(all_commands)
    } else {
        // Single track processing (original logic)
        process_single_track(ast, 0)
    }
}

/// Split AST into separate tracks based on TrackSeparator tokens
fn split_into_tracks(ast: &[AstToken]) -> Vec<Vec<AstToken>> {
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

/// Process a single track and generate commands with the specified node_id
fn process_single_track(ast: &[AstToken], track_node_id: u32) -> Result<Vec<Command>, String> {
    let mut commands = Vec::new();
    // Ticks per measure: 192 ticks per quarter note * 4 quarter notes = 768 ticks per 4/4 measure
    let meas_tick = 192 * 4;
    let mut start_tick = 0;
    let mut default_length = 8; // default note length (eighth note)
    let mut octave = 4; // default octave 4
    let mut node_id = track_node_id; // Start with track's base node_id

    // Add initial setup commands
    commands.push(Command {
        event_type: EVENT_TYPE_CREATE_NODE.to_string(),
        node_id,
        node_type: Some("Synth".to_string()),
        connect_to: None,
        args: None,
    });
    commands.push(Command {
        event_type: EVENT_TYPE_CONNECT.to_string(),
        node_id,
        node_type: None,
        connect_to: Some("toDestination".to_string()),
        args: None,
    });

    // Process each AST token
    for token in ast {
        match token {
            AstToken::Note(note) => {
                let ticks = calc_ticks(note.duration, note.dots, default_length, meas_tick);
                
                // Convert accidental to sharp/flat notation
                let accidental = if !note.accidental.is_empty() {
                    if note.accidental.starts_with('+') {
                        "#".repeat(note.accidental.len())
                    } else if note.accidental.starts_with('-') {
                        "b".repeat(note.accidental.len())
                    } else {
                        String::new()
                    }
                } else {
                    String::new()
                };

                let note_name = format!("{}{}{}", note.note, accidental, octave);
                let duration = calc_duration(ticks);
                let start = calc_start_tick(start_tick);

                commands.push(Command {
                    event_type: "triggerAttackRelease".to_string(),
                    node_id,
                    node_type: None,
                    connect_to: None,
                    args: Some(vec![note_name, duration, start]),
                });

                start_tick += ticks;
            }

            AstToken::Rest(rest) => {
                let ticks = calc_ticks(rest.duration, rest.dots, default_length, meas_tick);
                start_tick += ticks;
            }

            AstToken::Length(length) => {
                if let Some(value) = length.value {
                    default_length = value;
                }
            }

            AstToken::Octave(oct) => {
                if let Some(value) = oct.value {
                    octave = value;
                }
            }

            AstToken::OctaveUp(_) => {
                octave += 1;
            }

            AstToken::OctaveDown(_) => {
                if octave > 0 {
                    octave -= 1;
                }
            }

            AstToken::Instrument(_) => {
                node_id += 1;
                // Both createNode and connect use the same nodeId (the new one)
                commands.push(Command {
                    event_type: EVENT_TYPE_CREATE_NODE.to_string(),
                    node_id,
                    node_type: Some("Synth".to_string()),
                    connect_to: None,
                    args: None,
                });
                commands.push(Command {
                    event_type: EVENT_TYPE_CONNECT.to_string(),
                    node_id,
                    node_type: None,
                    connect_to: Some("toDestination".to_string()),
                    args: None,
                });
            }

            AstToken::TrackSeparator(_) => {
                // Track separators should not appear in single track processing
                // They are filtered out during track splitting
            }
        }
    }

    Ok(commands)
}

/// Helper function to extract start tick from a command
fn get_start_tick(command: &Command) -> u32 {
    if let Some(args) = &command.args {
        if args.len() >= 3 {
            // Parse "+123i" format
            let start_str = &args[2];
            if start_str.len() > 2 && start_str.starts_with('+') && start_str.ends_with('i') {
                if let Ok(tick) = start_str[1..start_str.len()-1].parse::<u32>() {
                    return tick;
                }
            }
        }
    }
    0
}

fn calc_ticks(duration: Option<u32>, dots: u32, default_length: u32, meas_tick: u32) -> u32 {
    let mut result = if let Some(dur) = duration {
        meas_tick / dur
    } else {
        meas_tick / default_length
    };

    // Apply dots
    if dots > 0 {
        match dots {
            1 => result = (result as f64 * SINGLE_DOT_MULTIPLIER) as u32,
            2 => result = (result as f64 * DOUBLE_DOT_MULTIPLIER) as u32,
            _ => {
                // For more dots, calculate appropriately
                let mut multiplier = 1.0;
                let mut dot_value = 0.5;
                for _ in 0..dots {
                    multiplier += dot_value;
                    dot_value /= 2.0;
                }
                result = (result as f64 * multiplier) as u32;
            }
        }
    }

    result
}

const GATE_TIME_REDUCTION: u32 = 10;
const MIN_DURATION_FOR_GATE: u32 = 20;

fn calc_duration(ticks: u32) -> String {
    let mut duration = ticks;
    // Apply gate time adjustment: subtract 10 ticks from durations >= 20 
    // to create a slight gap between notes (equivalent to 'q' quantize command).
    // This prevents notes from bleeding together and makes the music sound more natural.
    if duration >= MIN_DURATION_FOR_GATE {
        duration -= GATE_TIME_REDUCTION;
    }
    format!("{}i", duration)
}

fn calc_start_tick(start_tick: u32) -> String {
    format!("+{}i", start_tick)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::mml2ast::mml2ast;

    #[test]
    fn test_basic_conversion() {
        let ast = mml2ast("c").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result.len(), 3); // setup (2) + note (1)
        assert_eq!(result[2].event_type, "triggerAttackRelease");
        assert_eq!(result[2].args.as_ref().unwrap()[0], "c4");
    }

    #[test]
    fn test_note_with_duration() {
        let ast = mml2ast("c4").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result[2].args.as_ref().unwrap()[1], "182i"); // 192 - 10
    }

    #[test]
    fn test_note_with_accidental() {
        let ast = mml2ast("c+").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result[2].args.as_ref().unwrap()[0], "c#4");
    }

    #[test]
    fn test_octave_command() {
        let ast = mml2ast("o5 c").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result[2].args.as_ref().unwrap()[0], "c5");
    }

    #[test]
    fn test_length_command() {
        let ast = mml2ast("l16 e").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result[2].args.as_ref().unwrap()[1], "38i"); // 48 - 10
    }

    #[test]
    fn test_complex_sequence() {
        let ast = mml2ast("o4 l16 e").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result.len(), 3); // setup + 1 note
        assert_eq!(result[2].args.as_ref().unwrap()[0], "e4");
        assert_eq!(result[2].args.as_ref().unwrap()[1], "38i");
        assert_eq!(result[2].args.as_ref().unwrap()[2], "+0i");
    }

    #[test]
    fn test_multi_track_with_semicolon() {
        let ast = mml2ast("c;d").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should have 2 tracks (2 createNode + 2 connect + 2 notes = 6 commands)
        assert_eq!(result.len(), 6);
        
        // Check that we have 2 createNode commands
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 2);
        assert_eq!(create_nodes[0].node_id, 0);
        assert_eq!(create_nodes[1].node_id, 1);
        
        // Check that we have notes from both tracks
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 2);
        assert_eq!(notes[0].args.as_ref().unwrap()[0], "c4");
        assert_eq!(notes[1].args.as_ref().unwrap()[0], "d4");
    }

    #[test]
    fn test_multi_track_with_different_octaves() {
        let ast = mml2ast("o4 c; o5 e").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Find the notes
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 2);
        assert_eq!(notes[0].args.as_ref().unwrap()[0], "c4");
        assert_eq!(notes[1].args.as_ref().unwrap()[0], "e5");
    }

    #[test]
    fn test_multi_track_timing() {
        let ast = mml2ast("c8 d8; e8 f8").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Check that we have notes from both tracks
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 4);
        
        // Notes should be sorted by start time
        // Track 0: c8 at +0i, d8 at +96i
        // Track 1: e8 at +0i, f8 at +96i
        // After sorting: c8(+0i), e8(+0i), d8(+96i), f8(+96i)
        
        // Check that both tracks have notes at +0i
        assert!(notes.iter().filter(|n| n.args.as_ref().unwrap()[2] == "+0i").count() >= 2);
    }
}
