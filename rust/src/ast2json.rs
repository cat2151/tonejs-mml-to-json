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
use crate::effects::{add_delay_vibrato_commands, is_effect, normalize_effect_args};
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
            let (track_commands, end_tick) = process_single_track(track_ast, base_node_id)?;
            
            // Track the maximum end time across all tracks
            max_end_tick = max_end_tick.max(end_tick);
            
            // Remove the loopEnd event from individual tracks (we'll add one global loopEnd)
            let track_commands_without_loop_end: Vec<_> = track_commands
                .into_iter()
                .filter(|c| c.event_type != "loopEnd")
                .collect();
            
            all_commands.extend(track_commands_without_loop_end);
        }

        // Merge multi-track commands:
        //
        // Setup commands (createNode, connect) are kept in creation order — no sort needed.
        // Within each track, process_single_track already emits them in dependency order:
        //   createNode(instrument) → createNode(effect) → connect(instrument→effect) → connect(effect→dest)
        // So simply preserving insertion order satisfies all node-creation-before-connect
        // requirements across all tracks.
        //
        // Playback commands (notes, set, etc.) are sorted by start tick so that events
        // from different tracks are interleaved correctly in time.
        // For equal ticks, creation_index (lower = earlier track, i.e. track 0 < track 1)
        // is used as the tie-breaker so that events from earlier tracks appear first.
        let mut setup: Vec<Command> = Vec::new();
        let mut playback: Vec<(usize, Command)> = Vec::new();

        for (creation_index, cmd) in all_commands.into_iter().enumerate() {
            if cmd.event_type == EVENT_TYPE_CREATE_NODE || cmd.event_type == EVENT_TYPE_CONNECT {
                setup.push(cmd);
            } else {
                playback.push((creation_index, cmd));
            }
        }

        // Sort playback events by tick; use creation_index as a stable tie-breaker
        // so that events from track 0 (lower index) precede events from track 1, etc.
        playback.sort_by_key(|(creation_index, cmd)| (get_start_tick(cmd), *creation_index));

        all_commands = setup;
        all_commands.extend(playback.into_iter().map(|(_, cmd)| cmd));

        // Add a single loopEnd event for the entire multi-track sequence
        // Use the maximum end tick across all tracks
        all_commands.push(Command {
            event_type: "loopEnd".to_string(),
            node_id: 0,
            node_type: None,
            connect_to: None,
            args: Some(serde_json::json!([calc_start_tick(max_end_tick)])),
        });

        Ok(all_commands)
    } else {
        // Single track processing (original logic)
        let (commands, _end_tick) = process_single_track(ast, 0)?;
        Ok(commands)
    }
}

/// Process a single track and generate commands with the specified node_id
/// Returns a tuple of (commands, end_tick) where end_tick is the total duration in ticks
fn process_single_track(ast: &[AstToken], track_node_id: u32) -> Result<(Vec<Command>, u32), String> {
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
                .map(|parsed_args| normalize_effect_args(&parsed_args));
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
                    let chord_octave = (octave as i32 + chord_note.octave_offset).clamp(0, 10) as u32;

                    // Apply key transpose with original accidental
                    let (final_note, final_accidental, final_octave) = if key_transpose != 0 {
                        apply_transpose(
                            chord_note.note,
                            &chord_note.accidental,
                            chord_octave,
                            key_transpose,
                        )
                    } else {
                        // No transpose: just convert accidental to sharp/flat notation
                        let accidental = convert_accidental(&chord_note.accidental);
                        (chord_note.note, accidental, chord_octave)
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
        args: Some(serde_json::json!([calc_start_tick(start_tick)])),
    });

    Ok((commands, start_tick))
}

#[cfg(test)]
#[cfg(feature = "tree-sitter")]
mod tests;
