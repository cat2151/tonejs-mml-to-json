/// Instrument handling module
///
/// This module is responsible for:
/// - Determining synth types based on instrument names and chord requirements

/// Prepare args for PolySynth when converting from another instrument
///
/// When an instrument like FMSynth needs to be converted to PolySynth for chords,
/// the args should be wrapped in a format that specifies the voice and options:
/// `{"voice": "FMSynth", "options": {...original args...}}`
///
/// # Arguments
/// * `instrument_name` - Name of the original instrument
/// * `original_args` - Optional original args for the instrument
///
/// # Returns
/// Args object for PolySynth with voice and options, or None if no wrapping needed
pub fn prepare_polysynth_args(
    instrument_name: &str,
    original_args: Option<serde_json::Value>,
) -> Option<serde_json::Value> {
    // Only wrap args if converting to PolySynth (not Sampler or already PolySynth)
    if instrument_name == "Sampler" || instrument_name == "PolySynth" {
        return original_args;
    }

    // Build PolySynth args with voice and options
    let mut polysynth_args = serde_json::json!({
        "voice": instrument_name
    });

    // Add options if original args exist
    if let Some(args) = original_args {
        polysynth_args["options"] = args;
    }

    Some(polysynth_args)
}

/// Get the synth type to use, considering chords
///
/// Sampler and PolySynth are polyphonic instruments that can handle chords with array format.
/// Other instruments are converted to PolySynth when chords are present.
///
/// # Arguments
/// * `instrument_name` - Name of the instrument
/// * `needs_polysynth` - Whether the track needs polyphonic capabilities (has chords)
///
/// # Returns
/// The synth type to use (may be "PolySynth" if chords are present)
pub fn get_synth_type_for_track(instrument_name: &str, needs_polysynth: bool) -> &str {
    if needs_polysynth && instrument_name != "Sampler" && instrument_name != "PolySynth" {
        "PolySynth"
    } else {
        instrument_name
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_synth_type_no_chords() {
        assert_eq!(get_synth_type_for_track("Synth", false), "Synth");
        assert_eq!(get_synth_type_for_track("FMSynth", false), "FMSynth");
        assert_eq!(get_synth_type_for_track("Sampler", false), "Sampler");
    }

    #[test]
    fn test_get_synth_type_with_chords() {
        assert_eq!(get_synth_type_for_track("Synth", true), "PolySynth");
        assert_eq!(get_synth_type_for_track("FMSynth", true), "PolySynth");
        // Sampler and PolySynth stay as-is even with chords
        assert_eq!(get_synth_type_for_track("Sampler", true), "Sampler");
        assert_eq!(get_synth_type_for_track("PolySynth", true), "PolySynth");
    }

    #[test]
    fn test_prepare_polysynth_args_for_fmsynth() {
        let original_args = serde_json::json!({"harmonicity": 3, "modulationIndex": 10});
        let result = prepare_polysynth_args("FMSynth", Some(original_args.clone()));

        assert!(result.is_some());
        let args = result.unwrap();
        assert_eq!(args["voice"], "FMSynth");
        assert_eq!(args["options"]["harmonicity"], 3);
        assert_eq!(args["options"]["modulationIndex"], 10);
    }

    #[test]
    fn test_prepare_polysynth_args_for_fmsynth_no_args() {
        let result = prepare_polysynth_args("FMSynth", None);

        assert!(result.is_some());
        let args = result.unwrap();
        assert_eq!(args["voice"], "FMSynth");
        assert!(args.get("options").is_none());
    }

    #[test]
    fn test_prepare_polysynth_args_for_sampler() {
        let original_args = serde_json::json!({"release": 1});
        let result = prepare_polysynth_args("Sampler", Some(original_args.clone()));

        // Sampler args should pass through unchanged
        assert!(result.is_some());
        assert_eq!(result.unwrap(), original_args);
    }

    #[test]
    fn test_prepare_polysynth_args_for_polysynth() {
        let original_args = serde_json::json!({"voice": "Synth"});
        let result = prepare_polysynth_args("PolySynth", Some(original_args.clone()));

        // PolySynth args should pass through unchanged
        assert!(result.is_some());
        assert_eq!(result.unwrap(), original_args);
    }
}
