/// Command generation module
///
/// This module defines the Command struct and helper functions for working with commands
use serde::{Deserialize, Serialize};

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

// Event type constants for sorting and comparison
pub const EVENT_TYPE_CREATE_NODE: &str = "createNode";
pub const EVENT_TYPE_CONNECT: &str = "connect";

/// Extract start tick from a command's args
///
/// # Arguments
/// * `command` - Command to extract start tick from
///
/// # Returns
/// Start tick value (0 if not found or invalid format)
pub fn get_start_tick(command: &Command) -> u32 {
    if let Some(args) = &command.args {
        if let Some(arr) = args.as_array() {
            if arr.len() >= 3 {
                if let Some(start_str) = arr[2].as_str() {
                    // Parse "+123i" format
                    if start_str.len() > 2 && start_str.starts_with('+') && start_str.ends_with('i')
                    {
                        if let Ok(tick) = start_str[1..start_str.len() - 1].parse::<u32>() {
                            return tick;
                        }
                    }
                }
            }
        }
    }
    0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_start_tick() {
        let cmd = Command {
            event_type: "triggerAttackRelease".to_string(),
            node_id: 1,
            node_type: None,
            connect_to: None,
            args: Some(serde_json::json!(["c4", "192i", "+384i"])),
        };
        assert_eq!(get_start_tick(&cmd), 384);
    }

    #[test]
    fn test_get_start_tick_zero() {
        let cmd = Command {
            event_type: "triggerAttackRelease".to_string(),
            node_id: 1,
            node_type: None,
            connect_to: None,
            args: Some(serde_json::json!(["c4", "192i", "+0i"])),
        };
        assert_eq!(get_start_tick(&cmd), 0);
    }

    #[test]
    fn test_get_start_tick_no_args() {
        let cmd = Command {
            event_type: "createNode".to_string(),
            node_id: 1,
            node_type: Some("Synth".to_string()),
            connect_to: None,
            args: None,
        };
        assert_eq!(get_start_tick(&cmd), 0);
    }
}
