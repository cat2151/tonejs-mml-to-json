# Implementation Notes: loopEnd Format Unification (Issue #152)

## Overview
This implementation changes the `loopEnd` event timing format from `"NNNi"` to `"+NNNi"` to be consistent with other timing events like `triggerAttackRelease`.

## Problem
The `loopEnd` event was using a different timing format compared to other timing-related events:
- `triggerAttackRelease` used `"+192i"` format for start times
- `loopEnd` used `"192i"` format (without the `+` prefix)

This inconsistency made the JSON output harder to parse and understand.

## Solution
The `loopEnd` event now uses the same `calc_start_tick()` helper function that other timing events use, ensuring consistent `"+NNNi"` formatting.

## Breaking Change ⚠️

**This is a breaking change** for external consumers that parse `loopEnd.args[0]`.

### Before (v0.1.0 and earlier):
```json
{
  "eventType": "loopEnd",
  "nodeId": 0,
  "args": ["288i"]
}
```

### After (v0.2.0 and later):
```json
{
  "eventType": "loopEnd",
  "nodeId": 0,
  "args": ["+288i"]
}
```

### Migration Guide
If you have code that parses the loopEnd timing value, update it to handle the `+` prefix:

**JavaScript example:**
```javascript
// Old code (breaks with new format)
const ticks = parseInt(loopEnd.args[0].replace('i', ''));

// New code (works with both formats)
const ticks = parseInt(loopEnd.args[0].replace(/^[+]?/, '').replace('i', ''));
```

**Rust example:**
```rust
// Old code (breaks with new format)
let ticks = tick_str.trim_end_matches('i').parse::<u32>()?;

// New code (works with both formats)
let ticks = tick_str
    .trim_start_matches('+')
    .trim_end_matches('i')
    .parse::<u32>()?;
```

## Implementation Details

### Code Changes
1. **rust/src/ast2json.rs**:
   - Line 80: Multi-track loopEnd now uses `calc_start_tick(max_end_tick)`
   - Line 463: Single-track loopEnd now uses `calc_start_tick(start_tick)`
   - Lines 41-44: Refactored multi-track processing to use numeric end_tick directly

2. **Process improvements**:
   - `process_single_track` now returns `(Vec<Command>, u32)` tuple
   - End tick is tracked numerically and formatted only at output time
   - Eliminates fragile string parsing in multi-track processing

### Benefits
1. **Consistency**: All timing values now use the same `"+NNNi"` format
2. **Clarity**: Immediately clear that loopEnd represents a timing position
3. **Maintainability**: Uses shared `calc_start_tick()` utility instead of duplicate logic
4. **Performance**: Avoids unnecessary string parsing in multi-track sequences

## Testing
- All 514 existing tests updated and passing
- Special focus on `test/loopEnd.test.js` (13 tests covering various scenarios)
- Tests verify both single-track and multi-track scenarios

## Example

### Input MML:
```
c4.
```

### Complete JSON Output:
```json
[
  {
    "eventType": "createNode",
    "nodeId": 0,
    "nodeType": "Synth"
  },
  {
    "eventType": "connect",
    "nodeId": 0,
    "connectTo": "toDestination"
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["c4", "288i", "+0i"]
  },
  {
    "eventType": "loopEnd",
    "nodeId": 0,
    "args": ["+288i"]
  }
]
```

Note how both the `triggerAttackRelease` start time (`"+0i"`) and the `loopEnd` time (`"+288i"`) now use the same format with the `+` prefix.

## Version Impact
- **Recommended version bump**: Minor version (0.1.0 → 0.2.0)
- **Reason**: Breaking change to public JSON output contract
- **Semver classification**: MINOR (not MAJOR) because the library is still pre-1.0

## Related Issues
- Issue #135: Original loopEnd event implementation
- PR #152: This implementation (format unification)
