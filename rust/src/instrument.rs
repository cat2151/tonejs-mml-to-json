/// Instrument handling module
/// 
/// This module is responsible for:
/// - Determining synth types based on instrument names and chord requirements

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
}
