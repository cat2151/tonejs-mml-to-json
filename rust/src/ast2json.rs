use crate::ast::*;
use serde::{Deserialize, Serialize};

// Duration multiplier constants
const SINGLE_DOT_MULTIPLIER: f64 = 1.5;
const DOUBLE_DOT_MULTIPLIER: f64 = 1.75;

// Event type constants for sorting and comparison
const EVENT_TYPE_CREATE_NODE: &str = "createNode";
const EVENT_TYPE_CONNECT: &str = "connect";

// DelayVibrato effect constants (hardcoded parameters)
const VIBRATO_DELAY_TICKS: u32 = 192;    // Delay before vibrato starts
const VIBRATO_RAMP_TICKS: u32 = 192;     // Ramp duration for vibrato increase
const VIBRATO_DEPTH: &str = "0.2";       // Target vibrato depth
const VIBRATO_END_RAMP_TICKS: u32 = 10;  // Ramp duration for vibrato decrease

// Constant array of known effect types
const KNOWN_EFFECTS: &[&str] = &[
    "PingPongDelay",
    "FeedbackDelay",
    "Reverb",
    "Chorus",
    "Phaser",
    "Tremolo",
    "Vibrato",
    "Distortion",
    "DelayVibrato",
];

/// Check if a name is an effect (not an instrument)
fn is_effect(name: &str) -> bool {
    KNOWN_EFFECTS.contains(&name)
}

/// Get the synth type to use, considering chords
/// Sampler and PolySynth are polyphonic instruments that can handle chords with array format
/// Other instruments are converted to PolySynth when chords are present
fn get_synth_type_for_track(instrument_name: &str, needs_polysynth: bool) -> &str {
    if needs_polysynth && instrument_name != "Sampler" && instrument_name != "PolySynth" {
        "PolySynth"
    } else {
        instrument_name
    }
}

/// JSON command types for Tone.js
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Command {
    pub event_type: String,
    pub node_id: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub node_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub connect_to: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub args: Option<serde_json::Value>,
}

/// Convert AST to Tone.js JSON format
pub fn ast2json(ast: &[AstToken]) -> Result<Vec<Command>, String> {
    // Check if there are any track separators
    let has_track_separators = ast.iter().any(|token| matches!(token, AstToken::TrackSeparator(_)));
    
    if has_track_separators {
        // Multi-track processing
        let tracks = split_into_tracks(ast);
        let mut all_commands = Vec::new();
        
        // Use a base node_id offset for each track to prevent collisions with instrument changes
        // Allocate 100 node IDs per track (track 0: 0-99, track 1: 100-199, etc.)
        const NODE_ID_SPACING: u32 = 100;
        
        for (track_index, track_ast) in tracks.iter().enumerate() {
            let base_node_id = (track_index as u32) * NODE_ID_SPACING;
            let track_commands = process_single_track(track_ast, base_node_id)?;
            all_commands.extend(track_commands);
        }
        
        // Sort commands by start time using stable sort with key
        // This preserves insertion order for commands with the same key
        all_commands.sort_by_key(|cmd| {
            let is_setup = cmd.event_type == EVENT_TYPE_CREATE_NODE || cmd.event_type == EVENT_TYPE_CONNECT;
            let start_tick = if is_setup {
                // Setup commands conceptually occur at time 0 for sorting purposes
                0
            } else {
                get_start_tick(cmd)
            };
            // Key tuple:
            // - First: non-setup commands sort after setup (false < true)
            // - Second: start time for ordering events
            // - Third: node_id as a deterministic tie-breaker
            (!is_setup, start_tick, cmd.node_id)
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

/// Check if a track contains any chord tokens
fn has_chords(ast: &[AstToken]) -> bool {
    ast.iter().any(|token| matches!(token, AstToken::Chord(_)))
}

/// Generate DelayVibrato depth.rampTo commands for a note or chord
fn add_delay_vibrato_commands(
    commands: &mut Vec<Command>,
    vibrato_node_id: u32,
    start_tick: u32,
    ticks: u32,
) {
    // Start ramping up vibrato after delay
    let ramp_start_tick = start_tick + VIBRATO_DELAY_TICKS;
    commands.push(Command {
        event_type: "depth.rampTo".to_string(),
        node_id: vibrato_node_id,
        node_type: None,
        connect_to: None,
        args: Some(serde_json::json!([
            VIBRATO_DEPTH,
            format!("{}i", VIBRATO_RAMP_TICKS),
            format!("+{}i", ramp_start_tick)
        ])),
    });
    
    // Ramp down vibrato when note ends
    let ramp_end_tick = start_tick + ticks;
    commands.push(Command {
        event_type: "depth.rampTo".to_string(),
        node_id: vibrato_node_id,
        node_type: None,
        connect_to: None,
        args: Some(serde_json::json!([
            "0",
            format!("{}i", VIBRATO_END_RAMP_TICKS),
            format!("+{}i", ramp_end_tick)
        ])),
    });
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
    
    // Collect initial instrument and effects before any notes
    let mut first_instrument: Option<InstrumentToken> = None;
    let mut initial_effects: Vec<InstrumentToken> = Vec::new();
    let mut tokens_to_skip = 0;
    
    for token in ast.iter().take_while(|token| {
        // Stop when we encounter a note, chord, or rest
        !matches!(token, AstToken::Note(_) | AstToken::Chord(_) | AstToken::Rest(_))
    }) {
        if let AstToken::Instrument(instr) = token {
            let name = instr.value.as_deref().unwrap_or("");
            if is_effect(name) {
                initial_effects.push(instr.clone());
            } else if first_instrument.is_none() {
                first_instrument = Some(instr.clone());
            }
            tokens_to_skip += 1;
        }
    }
    
    let mut current_instrument = first_instrument.as_ref()
        .and_then(|t| t.value.as_deref())
        .unwrap_or("Synth");

    // Determine if this track needs PolySynth (has chords)
    let needs_polysynth = has_chords(ast);
    let synth_type = get_synth_type_for_track(current_instrument, needs_polysynth);

    // Parse args from the first instrument token if present
    let initial_args = first_instrument.as_ref()
        .and_then(|t| t.args.as_ref())
        .and_then(|json_str| {
            serde_json::from_str(json_str).ok()
        });

    // Create the instrument node
    let instrument_node_id = node_id;
    commands.push(Command {
        event_type: EVENT_TYPE_CREATE_NODE.to_string(),
        node_id: instrument_node_id,
        node_type: Some(synth_type.to_string()),
        connect_to: None,
        args: initial_args,
    });
    
    // Track DelayVibrato node_id if present
    let mut delay_vibrato_node_id: Option<u32> = None;
    
    // Create effect nodes and chain them
    let mut last_node_id = instrument_node_id;
    for effect in &initial_effects {
        node_id += 1;
        let effect_name = effect.value.as_deref().unwrap_or("");
        
        // Special handling for DelayVibrato
        let (actual_effect_name, actual_effect_args) = if effect_name == "DelayVibrato" {
            // DelayVibrato creates a Vibrato node with hardcoded parameters:
            // frequency=7, initial depth=0
            delay_vibrato_node_id = Some(node_id);
            ("Vibrato", Some(serde_json::json!([7, 0])))
        } else {
            let effect_args = effect.args.as_ref()
                .and_then(|json_str| serde_json::from_str(json_str).ok());
            (effect_name, effect_args)
        };
        
        // Create the effect node
        commands.push(Command {
            event_type: EVENT_TYPE_CREATE_NODE.to_string(),
            node_id,
            node_type: Some(actual_effect_name.to_string()),
            connect_to: None,
            args: actual_effect_args,
        });
        
        // Connect previous node to this effect
        commands.push(Command {
            event_type: EVENT_TYPE_CONNECT.to_string(),
            node_id: last_node_id,
            node_type: None,
            connect_to: Some(serde_json::json!(node_id)),
            args: None,
        });
        
        last_node_id = node_id;
    }
    
    // Connect the last node (instrument or last effect) to destination
    commands.push(Command {
        event_type: EVENT_TYPE_CONNECT.to_string(),
        node_id: last_node_id,
        node_type: None,
        connect_to: Some(serde_json::json!("toDestination")),
        args: None,
    });
    
    // Reset node_id for instrument playback
    node_id = instrument_node_id;

    // Process each AST token, skipping the initial instrument/effect tokens we already processed
    let mut skipped = 0;
    for token in ast {
        match token {
            AstToken::Note(note) => {
                let ticks = calc_ticks(note.duration, note.dots, default_length, meas_tick);
                
                // Convert accidental to sharp/flat notation
                let accidental = convert_accidental(&note.accidental);

                let note_name = format!("{}{}{}", note.note, accidental, octave);
                let duration = calc_duration(ticks);
                let start = calc_start_tick(start_tick);

                commands.push(Command {
                    event_type: "triggerAttackRelease".to_string(),
                    node_id,
                    node_type: None,
                    connect_to: None,
                    args: Some(serde_json::json!([note_name, duration, start])),
                });

                // Add DelayVibrato depth.rampTo commands if DelayVibrato effect is present
                if let Some(vibrato_node_id) = delay_vibrato_node_id {
                    add_delay_vibrato_commands(&mut commands, vibrato_node_id, start_tick, ticks);
                }

                start_tick += ticks;
            }

            AstToken::Chord(chord) => {
                let ticks = calc_ticks(chord.duration, chord.dots, default_length, meas_tick);
                
                // Build note names for all notes in the chord
                let mut note_names = Vec::new();
                for chord_note in &chord.notes {
                    // Convert accidental to sharp/flat notation
                    let accidental = convert_accidental(&chord_note.accidental);
                    
                    let note_name = format!("{}{}{}", chord_note.note, accidental, octave);
                    note_names.push(note_name);
                }
                
                let duration = calc_duration(ticks);
                let start = calc_start_tick(start_tick);

                // All polyphonic instruments (Sampler, PolySynth, etc.) use array format for chords
                commands.push(Command {
                    event_type: "triggerAttackRelease".to_string(),
                    node_id,
                    node_type: None,
                    connect_to: None,
                    args: Some(serde_json::json!([note_names, duration, start])),
                });

                // Add DelayVibrato depth.rampTo commands if DelayVibrato effect is present
                if let Some(vibrato_node_id) = delay_vibrato_node_id {
                    add_delay_vibrato_commands(&mut commands, vibrato_node_id, start_tick, ticks);
                }

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

            AstToken::Instrument(instr) => {
                let name = instr.value.as_deref().unwrap_or("");
                
                // Skip initial instruments and effects that were already processed
                if skipped < tokens_to_skip {
                    skipped += 1;
                    continue;
                }
                
                // Check if this is an effect or instrument
                if is_effect(name) {
                    // Mid-track effects are not yet supported.
                    // Current limitation: Effects must be specified before the first note.
                    // Future enhancement: Support adding effects mid-track by:
                    //   1. Disconnecting current instrument from destination
                    //   2. Inserting new effect in the chain
                    //   3. Reconnecting to destination through the new effect
                    // For now, ignore mid-track effect commands.
                    continue;
                } else {
                    // This is an instrument change
                    current_instrument = name;
                    
                    // Parse args if present
                    let instrument_args = instr.args.as_ref()
                        .and_then(|json_str| {
                            serde_json::from_str(json_str).ok()
                        });
                    
                    node_id += 1;
                    // Get the synth type based on the instrument name
                    let new_synth_type = get_synth_type_for_track(current_instrument, needs_polysynth);
                    commands.push(Command {
                        event_type: EVENT_TYPE_CREATE_NODE.to_string(),
                        node_id,
                        node_type: Some(new_synth_type.to_string()),
                        connect_to: None,
                        args: instrument_args,
                    });
                    commands.push(Command {
                        event_type: EVENT_TYPE_CONNECT.to_string(),
                        node_id,
                        node_type: None,
                        connect_to: Some(serde_json::json!("toDestination")),
                        args: None,
                    });
                }
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
        if let Some(arr) = args.as_array() {
            if arr.len() >= 3 {
                if let Some(start_str) = arr[2].as_str() {
                    // Parse "+123i" format
                    if start_str.len() > 2 && start_str.starts_with('+') && start_str.ends_with('i') {
                        if let Ok(tick) = start_str[1..start_str.len()-1].parse::<u32>() {
                            return tick;
                        }
                    }
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

/// Convert accidental notation from +/- to sharp/flat
fn convert_accidental(accidental: &str) -> String {
    if accidental.is_empty() {
        String::new()
    } else if accidental.starts_with('+') {
        "#".repeat(accidental.len())
    } else if accidental.starts_with('-') {
        "b".repeat(accidental.len())
    } else {
        String::new()
    }
}

#[cfg(test)]
#[cfg(feature = "tree-sitter")]
mod tests {
    use super::*;
    use crate::mml2ast::mml2ast;

    #[test]
    fn test_basic_conversion() {
        let ast = mml2ast("c").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result.len(), 3); // setup (2) + note (1)
        assert_eq!(result[2].event_type, "triggerAttackRelease");
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[0].as_str().unwrap(), "c4");
    }

    #[test]
    fn test_note_with_duration() {
        let ast = mml2ast("c4").unwrap();
        let result = ast2json(&ast).unwrap();
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[1].as_str().unwrap(), "182i"); // 192 - 10
    }

    #[test]
    fn test_note_with_accidental() {
        let ast = mml2ast("c+").unwrap();
        let result = ast2json(&ast).unwrap();
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[0].as_str().unwrap(), "c#4");
    }

    #[test]
    fn test_octave_command() {
        let ast = mml2ast("o5 c").unwrap();
        let result = ast2json(&ast).unwrap();
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[0].as_str().unwrap(), "c5");
    }

    #[test]
    fn test_length_command() {
        let ast = mml2ast("l16 e").unwrap();
        let result = ast2json(&ast).unwrap();
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[1].as_str().unwrap(), "38i"); // 48 - 10
    }

    #[test]
    fn test_complex_sequence() {
        let ast = mml2ast("o4 l16 e").unwrap();
        let result = ast2json(&ast).unwrap();
        assert_eq!(result.len(), 3); // setup + 1 note
        let args = result[2].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[0].as_str().unwrap(), "e4");
        assert_eq!(args[1].as_str().unwrap(), "38i");
        assert_eq!(args[2].as_str().unwrap(), "+0i");
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
        assert_eq!(create_nodes[1].node_id, 100); // Track 1 starts at 100
        
        // Check that we have notes from both tracks
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 2);
        let args0 = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let args1 = notes[1].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args0[0].as_str().unwrap(), "c4");
        assert_eq!(args1[0].as_str().unwrap(), "d4");
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
        let args0 = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let args1 = notes[1].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args0[0].as_str().unwrap(), "c4");
        assert_eq!(args1[0].as_str().unwrap(), "e5");
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
        let notes_at_zero: Vec<_> = notes.iter()
            .filter(|n| {
                if let Some(args) = &n.args {
                    if let Some(arr) = args.as_array() {
                        if arr.len() >= 3 {
                            return arr[2].as_str() == Some("+0i");
                        }
                    }
                }
                false
            })
            .collect();
        assert!(notes_at_zero.len() >= 2);
    }

    #[test]
    fn test_simple_chord_conversion() {
        let ast = mml2ast("'ceg'").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should have: 1 createNode (PolySynth) + 1 connect + 1 chord = 3 commands
        assert_eq!(result.len(), 3);
        
        // Check that we have a PolySynth node
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 1);
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");
        
        // Check the chord command
        let chords: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(chords.len(), 1);
        
        // First arg should be a JSON array of notes
        let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let notes: Vec<String> = notes_arr.iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(notes, vec!["c4", "e4", "g4"]);
    }

    #[test]
    fn test_chord_with_accidentals() {
        let ast = mml2ast("'c+eg-'").unwrap();
        let result = ast2json(&ast).unwrap();
        
        let chords: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(chords.len(), 1);
        
        let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let notes: Vec<String> = notes_arr.iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(notes, vec!["c#4", "e4", "gb4"]);
    }

    #[test]
    fn test_chord_with_duration() {
        // Duration inside quotes
        let ast = mml2ast("'c4eg'").unwrap();
        let result = ast2json(&ast).unwrap();
        
        let chords: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(chords.len(), 1);
        
        // Check duration is quarter note (192 ticks - 10 gate time = 182i)
        let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
        assert_eq!(args[1].as_str().unwrap(), "182i");
    }

    #[test]
    fn test_mixed_notes_and_chords() {
        let ast = mml2ast("c 'eg' d").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should use PolySynth because track has chords
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");
        
        // Should have 3 note events (2 single notes + 1 chord)
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 3);
    }

    #[test]
    fn test_track_without_chords_uses_synth() {
        let ast = mml2ast("c d e").unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should use regular Synth (no chords)
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "Synth");
    }

    #[test]
    fn test_sampler_with_json_args() {
        let ast = mml2ast(r#"@Sampler{"urls":{"C4":"test.mp3"},"release":1} c d"#).unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Check createNode has args
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 1);
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "Sampler");
        
        // Check that args were passed through
        assert!(create_nodes[0].args.is_some());
        let args = create_nodes[0].args.as_ref().unwrap();
        assert!(args.get("urls").is_some());
        assert!(args.get("release").is_some());
    }

    #[test]
    fn test_sampler_with_chord_uses_array_format() {
        let ast = mml2ast(r#"@Sampler{"release":1} 'ceg'"#).unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should create Sampler node, not PolySynth
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 1);
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "Sampler");
        
        // Should have 1 triggerAttackRelease with array of notes (like PolySynth)
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 1);
        
        // First argument should be an array of notes
        let args = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let note_strings: Vec<String> = notes_arr.iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(note_strings, vec!["c4", "e4", "g4"]);
    }

    #[test]
    fn test_non_sampler_with_chord_uses_polysynth() {
        let ast = mml2ast(r#"@FMSynth 'ce'"#).unwrap();
        let result = ast2json(&ast).unwrap();
        
        // Should convert FMSynth to PolySynth for chords
        let create_nodes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");
        
        // Should have 1 triggerAttackRelease with array of notes
        let notes: Vec<_> = result.iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 1);
        
        // First argument should be an array
        let args = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        assert_eq!(notes_arr.len(), 2);
    }
}
