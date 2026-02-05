# Implementation Notes: loopEnd Event (Issue #135)

## Overview
This implementation adds a `loopEnd` event to the JSON output to help `tonejs-json-sequencer` properly handle streaming loops, especially when the `q` (gate time) command affects note durations.

## Problem
The `q` command controls gate time (the percentage of a note's duration that it actually plays). For example:
- `q8` (100% gate time) - notes play for their full duration
- `q4` (50% gate time) - notes play for half their duration, with silence for the other half

However, when streaming loops, the sequencer needs to know the *total time* of the sequence to properly restart the loop, not just the duration of the notes being played.

## Solution
A `loopEnd` event is now automatically added to the end of every JSON sequence:

```json
{
  "eventType": "loopEnd",
  "nodeId": 0,
  "args": ["<total_ticks>i"]
}
```

Where `<total_ticks>` is the total duration of the sequence in ticks.

## Example

### MML Input:
```
q4 c4 d8
```

### JSON Output (simplified):
```json
[
  {"eventType": "createNode", "nodeId": 0, "nodeType": "Synth"},
  {"eventType": "connect", "nodeId": 0, "connectTo": "toDestination"},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["c4", "96i", "+0i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["d4", "48i", "+192i"]},
  {"eventType": "loopEnd", "nodeId": 0, "args": ["288i"]}
]
```

### Explanation:
- `q4` means 50% gate time
- `c4` takes 192 ticks of *time*, but plays for only 96 ticks (50%)
- `d8` takes 96 ticks of *time*, but plays for only 48 ticks (50%)
- The `loopEnd` event correctly shows `288i` (192 + 96), which is the actual loop point
- Without this event, a streaming player might incorrectly calculate the loop point based on note durations

## Implementation Details

### Single Track
For single-track sequences, the `loopEnd` event uses the final `start_tick` value after processing all notes and rests.

### Multi-Track
For multi-track sequences:
1. Each track is processed independently
2. The maximum end tick across all tracks is found
3. A single `loopEnd` event is added with this maximum value
4. Individual track `loopEnd` events are filtered out to avoid duplicates

### Code Location
The implementation is in `rust/src/ast2json.rs`:
- Line ~430: Single track implementation
- Lines ~29-92: Multi-track implementation

## Testing
- 13 new tests in `test/loopEnd.test.js` covering:
  - Empty sequences
  - Single notes
  - Multiple notes with various durations
  - Rests
  - Dotted notes
  - Gate time effects
  - Chords
  - Multi-track sequences
- All 514 existing tests updated and passing

## Compatibility
- **Non-breaking change**: The `loopEnd` event is additional information
- Players that don't support it will simply ignore it
- Players that support it can use it for accurate loop timing
