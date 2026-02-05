/// AST to JSON converter (refactored)
///
/// This module orchestrates the conversion of AST to Tone.js JSON format.
/// Individual responsibilities are delegated to specialized modules:
/// - command: Command struct and helper functions
/// - timing: Timing calculations (ticks, duration, start time)
/// - effects: Effect handling and DelayVibrato commands
/// - instrument: Instrument type determination
/// - track: Track splitting and chord detection
use crate::ast::*;
use crate::command::{get_start_tick, Command, EVENT_TYPE_CONNECT, EVENT_TYPE_CREATE_NODE};
use crate::effects::{add_delay_vibrato_commands, convert_effect_args_to_array, is_effect};
use crate::instrument::{get_synth_type_for_track, prepare_polysynth_args};
use crate::timing::{
    apply_transpose, calc_duration, calc_start_tick, calc_ticks, convert_accidental,
};
use crate::track::{has_chords, split_into_tracks};

// Re-export Command for backward compatibility
pub use crate::command::Command as ToneCommand;

/// Convert AST to Tone.js JSON format
pub fn ast2json(ast: &[AstToken]) -> Result<Vec<Command>, String> {
    // Check if there are any track separators
    let has_track_separators = ast
        .iter()
        .any(|token| matches!(token, AstToken::TrackSeparator(_)));

    if has_track_separators {
        // Multi-track processing
        let tracks = split_into_tracks(ast);
        let mut all_commands = Vec::new();
        let mut max_end_tick = 0u32;

        // Use a base node_id offset for each track to prevent collisions with instrument changes
        // Allocate 100 node IDs per track (track 0: 0-99, track 1: 100-199, etc.)
        const NODE_ID_SPACING: u32 = 100;

        for (track_index, track_ast) in tracks.iter().enumerate() {
            let base_node_id = (track_index as u32) * NODE_ID_SPACING;
            let track_commands = process_single_track(track_ast, base_node_id)?;
            
            // Find the maximum end time across all tracks
            // Look for the loopEnd event and extract its tick value
            if let Some(loop_end_cmd) = track_commands.iter().find(|c| c.event_type == "loopEnd") {
                if let Some(args) = &loop_end_cmd.args {
                    if let Some(arr) = args.as_array() {
                        if let Some(tick_str) = arr.get(0).and_then(|v| v.as_str()) {
                            if tick_str.ends_with('i') {
                                if let Ok(tick) = tick_str[..tick_str.len() - 1].parse::<u32>() {
                                    max_end_tick = max_end_tick.max(tick);
                                }
                            }
                        }
                    }
                }
            }
            
            // Remove the loopEnd event from individual tracks (we'll add one global loopEnd)
            let track_commands_without_loop_end: Vec<_> = track_commands
                .into_iter()
                .filter(|c| c.event_type != "loopEnd")
                .collect();
            
            all_commands.extend(track_commands_without_loop_end);
        }

        // Sort commands by start time using stable sort with key
        // This preserves insertion order for commands with the same key
        all_commands.sort_by_key(|cmd| {
            let is_setup =
                cmd.event_type == EVENT_TYPE_CREATE_NODE || cmd.event_type == EVENT_TYPE_CONNECT;
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

        // Add a single loopEnd event for the entire multi-track sequence
        // Use the maximum end tick across all tracks
        all_commands.push(Command {
            event_type: "loopEnd".to_string(),
            node_id: 0,
            node_type: None,
            connect_to: None,
            args: Some(serde_json::json!([format!("{}i", max_end_tick)])),
        });

        Ok(all_commands)
    } else {
        // Single track processing (original logic)
        process_single_track(ast, 0)
    }
}

/// Process a single track and generate commands with the specified node_id
fn process_single_track(ast: &[AstToken], track_node_id: u32) -> Result<Vec<Command>, String> {
    let mut commands = Vec::new();
    // Ticks per measure: 192 ticks per quarter note * 4 quarter notes = 768 ticks per 4/4 measure
    let meas_tick = 192 * 4;
    let mut start_tick = 0;
    let mut default_length = 8; // default note length (eighth note)
    let mut octave = 4; // default octave 4
    let mut gate_time = 100; // default gate time (100%, q8 in mmlabc dialect)
    let mut node_id = track_node_id; // Start with track's base node_id

    // Collect initial instrument and effects before any notes
    let mut first_instrument: Option<InstrumentToken> = None;
    let mut initial_effects: Vec<InstrumentToken> = Vec::new();
    let mut tokens_to_skip = 0;

    for token in ast.iter().take_while(|token| {
        // Stop when we encounter a note, chord, or rest
        !matches!(
            token,
            AstToken::Note(_) | AstToken::Chord(_) | AstToken::Rest(_)
        )
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

    let mut current_instrument = first_instrument
        .as_ref()
        .and_then(|t| t.value.as_deref())
        .unwrap_or("Synth");

    // Determine if this track needs PolySynth (has chords)
    let needs_polysynth = has_chords(ast);
    let synth_type = get_synth_type_for_track(current_instrument, needs_polysynth);

    // Parse args from the first instrument token if present
    let initial_args = first_instrument
        .as_ref()
        .and_then(|t| t.args.as_ref())
        .and_then(|json_str| serde_json::from_str(json_str).ok());

    // Prepare args for PolySynth if converting from another instrument
    let instrument_args = if needs_polysynth {
        prepare_polysynth_args(current_instrument, initial_args)
    } else {
        initial_args
    };

    // Create the instrument node
    let instrument_node_id = node_id;
    commands.push(Command {
        event_type: EVENT_TYPE_CREATE_NODE.to_string(),
        node_id: instrument_node_id,
        node_type: Some(synth_type.to_string()),
        connect_to: None,
        args: instrument_args,
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
            // Parse args from JSON string
            let effect_args = effect
                .args
                .as_ref()
                .and_then(|json_str| serde_json::from_str::<serde_json::Value>(json_str).ok())
                .and_then(|parsed_args| convert_effect_args_to_array(effect_name, &parsed_args));
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

    // Track key transpose value (in semitones)
    let mut key_transpose: i32 = 0;

    // Process each AST token, skipping the initial instrument/effect tokens we already processed
    let mut skipped = 0;
    for token in ast {
        match token {
            AstToken::Note(note) => {
                let ticks = calc_ticks(note.duration, note.dots, default_length, meas_tick);

                // Apply key transpose with original accidental
                let (final_note, final_accidental, final_octave) = if key_transpose != 0 {
                    apply_transpose(note.note, &note.accidental, octave, key_transpose)
                } else {
                    // No transpose: just convert accidental to sharp/flat notation
                    let accidental = convert_accidental(&note.accidental);
                    (note.note, accidental, octave)
                };

                let note_name = format!("{}{}{}", final_note, final_accidental, final_octave);
                let duration = calc_duration(ticks, gate_time);
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
                    // Apply key transpose with original accidental
                    let (final_note, final_accidental, final_octave) = if key_transpose != 0 {
                        apply_transpose(
                            chord_note.note,
                            &chord_note.accidental,
                            octave,
                            key_transpose,
                        )
                    } else {
                        // No transpose: just convert accidental to sharp/flat notation
                        let accidental = convert_accidental(&chord_note.accidental);
                        (chord_note.note, accidental, octave)
                    };

                    let note_name = format!("{}{}{}", final_note, final_accidental, final_octave);
                    note_names.push(note_name);
                }

                let duration = calc_duration(ticks, gate_time);
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
                    let parsed_args = instr
                        .args
                        .as_ref()
                        .and_then(|json_str| serde_json::from_str(json_str).ok());

                    // Prepare args for PolySynth if converting from another instrument
                    let instrument_args = if needs_polysynth {
                        prepare_polysynth_args(current_instrument, parsed_args)
                    } else {
                        parsed_args
                    };

                    node_id += 1;
                    // Get the synth type based on the instrument name
                    let new_synth_type =
                        get_synth_type_for_track(current_instrument, needs_polysynth);
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

            AstToken::Tempo(tempo) => {
                // Set the tempo (BPM) for the Transport
                // Transport settings are global and don't use a node in the audio graph
                if let Some(bpm) = tempo.value {
                    commands.push(Command {
                        event_type: "set".to_string(),
                        node_id: 0,
                        node_type: Some("Transport.bpm.value".to_string()),
                        connect_to: None,
                        args: Some(serde_json::json!([bpm])),
                    });
                }
            }

            AstToken::Volume(volume) => {
                // Set the volume for the current instrument node
                // mmlabc dialect: v0-15 scale
                // - v0: -100dB (silence)
                // - v8: -6dB
                // - v15: 0dB (initial/default/max)
                if let Some(vol) = volume.value {
                    // Clamp volume to valid range (0-15)
                    let clamped_vol = vol.min(15);
                    let db = if clamped_vol == 0 {
                        -100.0 // Silence
                    } else {
                        // Convert v0-15 to dB scale where:
                        // v8 = -6dB, v15 = 0dB
                        // Using linear interpolation in dB space:
                        // For v1-15 (v0 is special-cased above): db = (v - 15) * (6.0 / 7.0)
                        // This gives: v8 → (8-15)*(6/7) = -7*(6/7) = -6dB, v15 → 0dB
                        (clamped_vol as f64 - 15.0) * (6.0 / 7.0)
                    };
                    commands.push(Command {
                        event_type: "set".to_string(),
                        node_id,
                        node_type: Some("volume.value".to_string()),
                        connect_to: None,
                        args: Some(serde_json::json!([db])),
                    });
                }
            }

            AstToken::GateTime(gt) => {
                // mmlabc dialect: q0-8 scale
                // - q4: 50% duration
                // - q8: 100% duration (initial/default/max)
                // Convert q value (0-8) to percentage (0-100)
                if let Some(q_val) = gt.value {
                    // Clamp to valid range (0-8)
                    let clamped_q = q_val.min(8);
                    // Convert to percentage: (q / 8) * 100
                    gate_time = (clamped_q * 100) / 8;
                } else {
                    // If no value is provided (bare `q`), reset to default q8 (100%)
                    gate_time = 100;
                }
            }

            AstToken::KeyTranspose(kt) => {
                // Set the key transpose value (in semitones)
                // If no value is provided (bare `kt`), reset transpose to 0
                key_transpose = kt.value.unwrap_or(0);
            }

            AstToken::TrackSeparator(_) => {
                // Track separators should not appear in single track processing
                // They are filtered out during track splitting
            }
        }
    }

    // Add loopEnd event to mark the end of the sequence for streaming loop
    // This helps tonejs-json-sequencer know where the loop should end
    // especially when gate time (q command) affects note durations
    commands.push(Command {
        event_type: "loopEnd".to_string(),
        node_id: 0,
        node_type: None,
        connect_to: None,
        args: Some(serde_json::json!([format!("{}i", start_tick)])),
    });

    Ok(commands)
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
        assert_eq!(args[1].as_str().unwrap(), "182i"); // 192 * 0.95 = 182
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
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 2);
        assert_eq!(create_nodes[0].node_id, 0);
        assert_eq!(create_nodes[1].node_id, 100); // Track 1 starts at 100

        // Check that we have notes from both tracks
        let notes: Vec<_> = result
            .iter()
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
        let notes: Vec<_> = result
            .iter()
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
        let notes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 4);

        // Notes should be sorted by start time
        // Track 0: c8 at +0i, d8 at +96i
        // Track 1: e8 at +0i, f8 at +96i
        // After sorting: c8(+0i), e8(+0i), d8(+96i), f8(+96i)

        // Check that both tracks have notes at +0i
        let notes_at_zero: Vec<_> = notes
            .iter()
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
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 1);
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");

        // Check the chord command
        let chords: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(chords.len(), 1);

        // First arg should be a JSON array of notes
        let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let notes: Vec<String> = notes_arr
            .iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(notes, vec!["c4", "e4", "g4"]);
    }

    #[test]
    fn test_chord_with_accidentals() {
        let ast = mml2ast("'c+eg-'").unwrap();
        let result = ast2json(&ast).unwrap();

        let chords: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(chords.len(), 1);

        let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let notes: Vec<String> = notes_arr
            .iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(notes, vec!["c#4", "e4", "gb4"]);
    }

    #[test]
    fn test_chord_with_duration() {
        // Duration inside quotes
        let ast = mml2ast("'c4eg'").unwrap();
        let result = ast2json(&ast).unwrap();

        let chords: Vec<_> = result
            .iter()
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
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");

        // Should have 3 note events (2 single notes + 1 chord)
        let notes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 3);
    }

    #[test]
    fn test_track_without_chords_uses_synth() {
        let ast = mml2ast("c d e").unwrap();
        let result = ast2json(&ast).unwrap();

        // Should use regular Synth (no chords)
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "Synth");
    }

    #[test]
    fn test_sampler_with_json_args() {
        let ast = mml2ast(r#"@Sampler{"urls":{"C4":"test.mp3"},"release":1} c d"#).unwrap();
        let result = ast2json(&ast).unwrap();

        // Check createNode has args
        let create_nodes: Vec<_> = result
            .iter()
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
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes.len(), 1);
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "Sampler");

        // Should have 1 triggerAttackRelease with array of notes (like PolySynth)
        let notes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 1);

        // First argument should be an array of notes
        let args = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        let note_strings: Vec<String> = notes_arr
            .iter()
            .map(|v| v.as_str().unwrap().to_string())
            .collect();
        assert_eq!(note_strings, vec!["c4", "e4", "g4"]);
    }

    #[test]
    fn test_non_sampler_with_chord_uses_polysynth() {
        let ast = mml2ast(r#"@FMSynth 'ce'"#).unwrap();
        let result = ast2json(&ast).unwrap();

        // Should convert FMSynth to PolySynth for chords
        let create_nodes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "createNode")
            .collect();
        assert_eq!(create_nodes[0].node_type.as_ref().unwrap(), "PolySynth");

        // Should have 1 triggerAttackRelease with array of notes
        let notes: Vec<_> = result
            .iter()
            .filter(|c| c.event_type == "triggerAttackRelease")
            .collect();
        assert_eq!(notes.len(), 1);

        // First argument should be an array
        let args = notes[0].args.as_ref().unwrap().as_array().unwrap();
        let notes_arr = args[0].as_array().unwrap();
        assert_eq!(notes_arr.len(), 2);
    }
}
