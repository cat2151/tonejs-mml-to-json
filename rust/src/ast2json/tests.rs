
use super::*;
use crate::mml2ast::mml2ast;

#[test]
fn test_basic_conversion() {
    let ast = mml2ast("c").unwrap();
    let result = ast2json(&ast).unwrap();
    assert_eq!(result.len(), 4); // createNode + connect + triggerAttackRelease + loopEnd
    assert_eq!(result[2].event_type, "triggerAttackRelease");
    let args = result[2].args.as_ref().unwrap().as_array().unwrap();
    assert_eq!(args[0].as_str().unwrap(), "c4");
}

#[test]
fn test_note_with_duration() {
    let ast = mml2ast("c4").unwrap();
    let result = ast2json(&ast).unwrap();
    let args = result[2].args.as_ref().unwrap().as_array().unwrap();
    assert_eq!(args[1].as_str().unwrap(), "192i"); // 192 * 1.0 = 192 (default gate time 100%)
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
    assert_eq!(args[1].as_str().unwrap(), "48i"); // 48 ticks with 100% gate time (default)
}

#[test]
fn test_complex_sequence() {
    let ast = mml2ast("o4 l16 e").unwrap();
    let result = ast2json(&ast).unwrap();
    assert_eq!(result.len(), 4); // createNode + connect + 1 note + loopEnd
    let args = result[2].args.as_ref().unwrap().as_array().unwrap();
    assert_eq!(args[0].as_str().unwrap(), "e4");
    assert_eq!(args[1].as_str().unwrap(), "48i"); // 48 ticks with 100% gate time (default)
    assert_eq!(args[2].as_str().unwrap(), "+0i");
}

#[test]
fn test_multi_track_with_semicolon() {
    let ast = mml2ast("c;d").unwrap();
    let result = ast2json(&ast).unwrap();

    // Should have 2 tracks plus a global loopEnd:
    // 2 * (createNode + connect + note) + 1 loopEnd = 7 commands
    assert_eq!(result.len(), 7);

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

    // Should have: 1 createNode (PolySynth) + 1 connect + 1 chord + 1 loopEnd = 4 commands
    assert_eq!(result.len(), 4);

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

    // Check duration - uses default length (l8 = 96 ticks with 100% gate time)
    let args = chords[0].args.as_ref().unwrap().as_array().unwrap();
    assert_eq!(args[1].as_str().unwrap(), "96i");
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
