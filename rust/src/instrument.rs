/// Instrument handling module
///
/// This module is responsible for:
/// - Determining synth types based on instrument names and chord requirements

/// Prepare args for PolySynth when converting from another instrument
///
/// tonejs-json-sequencer passes args directly to `new Tone.PolySynth(args)`.
/// Tone.js PolySynth defaults to using Tone.Synth as the voice if no args are provided.
/// For basic chords with default Synth (no custom args), we pass None to use the default.
/// For other instruments, we would need tonejs-json-sequencer to support voice specification,
/// but currently it doesn't, so we also pass through the original args or None.
///
/// # Arguments
/// * `instrument_name` - Name of the original instrument
/// * `original_args` - Optional original args for the instrument
///
/// # Returns
/// Args object for PolySynth, or None to use defaults
pub fn prepare_polysynth_args(
    instrument_name: &str,
    original_args: Option<serde_json::Value>,
) -> Option<serde_json::Value> {
    // Sampler and PolySynth args pass through unchanged
    if instrument_name == "Sampler" || instrument_name == "PolySynth" {
        return original_args;
    }

    // For basic Synth with no args, use default PolySynth (which defaults to Synth voice)
    if instrument_name == "Synth" && original_args.is_none() {
        return None;
    }

    // For Synth with args, pass the args as PolySynth options
    if instrument_name == "Synth" {
        return original_args;
    }

    // For other instruments (FMSynth, AMSynth, etc.), we cannot properly convert
    // them to PolySynth with tonejs-json-sequencer's current implementation,
    // as it doesn't support specifying the voice class.
    // Return the original args unchanged (or None if no args), which will be used
    // for a default PolySynth with Synth voice.
    original_args
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
    fn test_prepare_polysynth_args_for_synth_no_args() {
        // Basic Synth with no args should return None to use PolySynth default
        let result = prepare_polysynth_args("Synth", None);
        assert!(result.is_none());
    }

    #[test]
    fn test_prepare_polysynth_args_for_synth_with_args() {
        // Synth with args should pass through the args
        let original_args = serde_json::json!({"oscillator": {"type": "triangle"}});
        let result = prepare_polysynth_args("Synth", Some(original_args.clone()));

        assert!(result.is_some());
        assert_eq!(result.unwrap(), original_args);
    }

    #[test]
    fn test_prepare_polysynth_args_for_fmsynth() {
        // FMSynth cannot be properly converted to PolySynth voice with current
        // tonejs-json-sequencer implementation, so args pass through or None
        let original_args = serde_json::json!({"harmonicity": 3, "modulationIndex": 10});
        let result = prepare_polysynth_args("FMSynth", Some(original_args.clone()));

        assert!(result.is_some());
        assert_eq!(result.unwrap(), original_args);
    }

    #[test]
    fn test_prepare_polysynth_args_for_fmsynth_no_args() {
        // FMSynth with no args returns None (will use default PolySynth)
        let result = prepare_polysynth_args("FMSynth", None);
        assert!(result.is_none());
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
