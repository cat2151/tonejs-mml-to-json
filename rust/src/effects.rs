/// Effects handling module
///
/// This module is responsible for:
/// - Identifying effect types
/// - Passing through effect arguments for Tone.js constructors
/// - Generating DelayVibrato commands
use crate::command::Command;

// DelayVibrato effect constants (hardcoded parameters)
const VIBRATO_DELAY_TICKS: u32 = 192; // Delay before vibrato starts
const VIBRATO_RAMP_TICKS: u32 = 192; // Ramp duration for vibrato increase
const VIBRATO_DEPTH: &str = "0.2"; // Target vibrato depth
const VIBRATO_END_RAMP_TICKS: u32 = 10; // Ramp duration for vibrato decrease

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
///
/// # Arguments
/// * `name` - Name to check
///
/// # Returns
/// true if the name is a known effect type
pub fn is_effect(name: &str) -> bool {
    KNOWN_EFFECTS.contains(&name)
}

/// Convert effect args from user-friendly MML into Tone.js constructor args
///
/// Newer tonejs-json-sequencer versions accept options objects directly.
/// Keep objects intact so all parameters remain accessible, while still
/// passing through arrays for backward compatibility.
///
/// # Arguments
/// * `effect_name` - Name of the effect
/// * `args_obj` - Arguments in object format
///
/// # Returns
/// Arguments passed through (object or array), or None if conversion fails
pub fn convert_effect_args_to_array(
    _effect_name: &str,
    args_obj: &serde_json::Value,
) -> Option<serde_json::Value> {
    Some(args_obj.clone())
}

/// Generate DelayVibrato depth.rampTo commands for a note or chord
///
/// # Arguments
/// * `commands` - Command vector to append to
/// * `vibrato_node_id` - Node ID of the vibrato effect
/// * `start_tick` - Start tick of the note
/// * `ticks` - Duration of the note in ticks
pub fn add_delay_vibrato_commands(
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_effect() {
        assert!(is_effect("PingPongDelay"));
        assert!(is_effect("DelayVibrato"));
        assert!(is_effect("Reverb"));
        assert!(!is_effect("Synth"));
        assert!(!is_effect("FMSynth"));
    }

    #[test]
    fn test_convert_effect_args_pingpong() {
        let args = serde_json::json!({"delayTime": "8n", "feedback": 0.5});
        let result = convert_effect_args_to_array("PingPongDelay", &args);
        assert!(result.is_some());
        let cloned = result.unwrap();
        assert!(cloned.is_object());
        assert_eq!(cloned["delayTime"], "8n");
        assert_eq!(cloned["feedback"], 0.5);
    }

    #[test]
    fn test_convert_effect_args_already_array() {
        let args = serde_json::json!(["8n", 0.5]);
        let result = convert_effect_args_to_array("PingPongDelay", &args);
        assert!(result.is_some());
        assert_eq!(result.unwrap(), args);
    }

    #[test]
    fn test_add_delay_vibrato_commands() {
        let mut commands = Vec::new();
        add_delay_vibrato_commands(&mut commands, 10, 0, 384);

        assert_eq!(commands.len(), 2);
        assert_eq!(commands[0].event_type, "depth.rampTo");
        assert_eq!(commands[0].node_id, 10);
        assert_eq!(commands[1].event_type, "depth.rampTo");
        assert_eq!(commands[1].node_id, 10);
    }
}
