use crate::ast::*;
use serde::{Deserialize, Serialize};

// Duration multiplier constants
const SINGLE_DOT_MULTIPLIER: f64 = 1.5;
const DOUBLE_DOT_MULTIPLIER: f64 = 1.75;

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
    let mut commands = Vec::new();
    // Ticks per measure: 192 ticks per quarter note * 4 quarter notes = 768 ticks per 4/4 measure
    let meas_tick = 192 * 4;
    let mut start_tick = 0;
    let mut default_length = 8; // default note length (eighth note)
    let mut octave = 4; // default octave 4
    let mut node_id = 0;

    // Add initial setup commands
    commands.push(Command {
        event_type: "createNode".to_string(),
        node_id,
        node_type: Some("Synth".to_string()),
        connect_to: None,
        args: None,
    });
    commands.push(Command {
        event_type: "connect".to_string(),
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
                    event_type: "createNode".to_string(),
                    node_id,
                    node_type: Some("Synth".to_string()),
                    connect_to: None,
                    args: None,
                });
                commands.push(Command {
                    event_type: "connect".to_string(),
                    node_id,
                    node_type: None,
                    connect_to: Some("toDestination".to_string()),
                    args: None,
                });
            }
        }
    }

    Ok(commands)
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
}
