/// Timing calculation module
/// 
/// This module is responsible for all timing-related calculations:
/// - Converting note durations to ticks
/// - Applying dots to note durations
/// - Converting ticks to duration strings
/// - Formatting start tick strings
/// - Converting accidental notation

// Duration multiplier constants
const SINGLE_DOT_MULTIPLIER: f64 = 1.5;
const DOUBLE_DOT_MULTIPLIER: f64 = 1.75;

// Gate time constants
const GATE_TIME_REDUCTION: u32 = 10;
const MIN_DURATION_FOR_GATE: u32 = 20;

/// Calculate ticks for a note based on duration and dots
/// 
/// # Arguments
/// * `duration` - Optional duration value (e.g., 4 for quarter note, 8 for eighth note)
/// * `dots` - Number of dots applied to the note
/// * `default_length` - Default note length to use if duration is None
/// * `meas_tick` - Number of ticks per measure (typically 768 for 4/4 time)
/// 
/// # Returns
/// Number of ticks for the note
pub fn calc_ticks(duration: Option<u32>, dots: u32, default_length: u32, meas_tick: u32) -> u32 {
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

/// Calculate duration string from ticks, applying gate time reduction
/// 
/// Gate time adjustment: subtract 10 ticks from durations >= 20 
/// to create a slight gap between notes (equivalent to 'q' quantize command).
/// This prevents notes from bleeding together and makes the music sound more natural.
/// 
/// # Arguments
/// * `ticks` - Number of ticks for the note
/// 
/// # Returns
/// Duration string in the format "NNNi" (e.g., "192i")
pub fn calc_duration(ticks: u32) -> String {
    let mut duration = ticks;
    if duration >= MIN_DURATION_FOR_GATE {
        duration -= GATE_TIME_REDUCTION;
    }
    format!("{}i", duration)
}

/// Calculate start tick string
/// 
/// # Arguments
/// * `start_tick` - Start tick value
/// 
/// # Returns
/// Start tick string in the format "+NNNi" (e.g., "+0i", "+192i")
pub fn calc_start_tick(start_tick: u32) -> String {
    format!("+{}i", start_tick)
}

/// Convert accidental notation from +/- to sharp/flat
/// 
/// # Arguments
/// * `accidental` - Accidental string (e.g., "+", "++", "-", "--")
/// 
/// # Returns
/// Sharp/flat notation (e.g., "#", "##", "b", "bb")
pub fn convert_accidental(accidental: &str) -> String {
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

/// Apply key transpose to a note
/// 
/// # Arguments
/// * `note` - Base note character (c, d, e, f, g, a, b)
/// * `octave` - Current octave
/// * `transpose` - Number of semitones to transpose (can be negative)
/// 
/// # Returns
/// Tuple of (new_note, new_accidental, new_octave)
pub fn apply_transpose(note: char, octave: u32, transpose: i32) -> (char, String, u32) {
    // Convert note to semitone value (c=0, d=2, e=4, f=5, g=7, a=9, b=11)
    let note_to_semitone = |n: char| -> i32 {
        match n {
            'c' => 0,
            'd' => 2,
            'e' => 4,
            'f' => 5,
            'g' => 7,
            'a' => 9,
            'b' => 11,
            _ => 0,
        }
    };
    
    let semitone_to_note = |s: i32| -> (char, String) {
        match s {
            0 => ('c', String::new()),
            1 => ('c', "#".to_string()),
            2 => ('d', String::new()),
            3 => ('d', "#".to_string()),
            4 => ('e', String::new()),
            5 => ('f', String::new()),
            6 => ('f', "#".to_string()),
            7 => ('g', String::new()),
            8 => ('g', "#".to_string()),
            9 => ('a', String::new()),
            10 => ('a', "#".to_string()),
            11 => ('b', String::new()),
            _ => ('c', String::new()),
        }
    };
    
    // Calculate the new semitone value
    let base_semitone = note_to_semitone(note);
    let mut new_semitone = base_semitone + transpose;
    
    // Calculate octave changes
    let mut new_octave = octave as i32;
    while new_semitone < 0 {
        new_semitone += 12;
        new_octave -= 1;
    }
    while new_semitone >= 12 {
        new_semitone -= 12;
        new_octave += 1;
    }
    
    // Clamp octave to reasonable range (0-10)
    new_octave = new_octave.max(0).min(10);
    
    let (new_note, new_accidental) = semitone_to_note(new_semitone);
    (new_note, new_accidental, new_octave as u32)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calc_ticks_basic() {
        let meas_tick = 768; // 4/4 time signature
        assert_eq!(calc_ticks(Some(4), 0, 8, meas_tick), 192); // Quarter note
        assert_eq!(calc_ticks(Some(8), 0, 8, meas_tick), 96);  // Eighth note
        assert_eq!(calc_ticks(Some(16), 0, 8, meas_tick), 48); // 16th note
    }

    #[test]
    fn test_calc_ticks_with_dots() {
        let meas_tick = 768;
        assert_eq!(calc_ticks(Some(4), 1, 8, meas_tick), 288); // Dotted quarter note (192 * 1.5)
        assert_eq!(calc_ticks(Some(8), 1, 8, meas_tick), 144); // Dotted eighth note (96 * 1.5)
    }

    #[test]
    fn test_calc_ticks_default_length() {
        let meas_tick = 768;
        assert_eq!(calc_ticks(None, 0, 8, meas_tick), 96); // Default eighth note
        assert_eq!(calc_ticks(None, 0, 4, meas_tick), 192); // Default quarter note
    }

    #[test]
    fn test_calc_duration() {
        assert_eq!(calc_duration(192), "182i"); // 192 - 10 = 182
        assert_eq!(calc_duration(96), "86i");   // 96 - 10 = 86
        assert_eq!(calc_duration(10), "10i");   // No reduction for < 20
    }

    #[test]
    fn test_calc_start_tick() {
        assert_eq!(calc_start_tick(0), "+0i");
        assert_eq!(calc_start_tick(192), "+192i");
        assert_eq!(calc_start_tick(384), "+384i");
    }

    #[test]
    fn test_convert_accidental() {
        assert_eq!(convert_accidental(""), "");
        assert_eq!(convert_accidental("+"), "#");
        assert_eq!(convert_accidental("++"), "##");
        assert_eq!(convert_accidental("-"), "b");
        assert_eq!(convert_accidental("--"), "bb");
    }

    #[test]
    fn test_apply_transpose_basic() {
        // No transpose
        assert_eq!(apply_transpose('c', 4, 0), ('c', "".to_string(), 4));
        
        // Transpose up by 2 semitones (c -> d)
        assert_eq!(apply_transpose('c', 4, 2), ('d', "".to_string(), 4));
        
        // Transpose up by 1 semitone (c -> c#)
        assert_eq!(apply_transpose('c', 4, 1), ('c', "#".to_string(), 4));
        
        // Transpose down by 1 semitone (c -> b in previous octave)
        assert_eq!(apply_transpose('c', 4, -1), ('b', "".to_string(), 3));
        
        // Transpose up by 12 semitones (c4 -> c5)
        assert_eq!(apply_transpose('c', 4, 12), ('c', "".to_string(), 5));
    }

    #[test]
    fn test_apply_transpose_complex() {
        // e + 3 semitones = g
        assert_eq!(apply_transpose('e', 4, 3), ('g', "".to_string(), 4));
        
        // a + 5 semitones = d in next octave
        assert_eq!(apply_transpose('a', 4, 5), ('d', "".to_string(), 5));
        
        // d - 2 semitones = c
        assert_eq!(apply_transpose('d', 4, -2), ('c', "".to_string(), 4));
        
        // b + 1 semitone = c in next octave
        assert_eq!(apply_transpose('b', 4, 1), ('c', "".to_string(), 5));
    }
}
