# Issue #128 Implementation Notes

## Problem
When using chord commands (single-quote syntax like `'ceg'`) with instruments like FMSynth, the system would convert them to PolySynth but lose the original instrument type and configuration. This caused the FMSynth part to be "forgotten" after the PolySynth conversion.

## Root Cause
The `ast2json.rs` module was converting monophonic instruments to PolySynth when chords were detected, but it was passing the instrument args directly to PolySynth without preserving the original instrument type in the `voice` parameter.

## Solution
Added logic to wrap instrument args in the correct format for PolySynth when converting from other instruments:

### New Function: `prepare_polysynth_args()`
Located in `rust/src/instrument.rs`, this function:
1. Takes the original instrument name and its args
2. If the instrument is Sampler or PolySynth, passes args through unchanged
3. Otherwise, wraps args in the format:
   ```json
   {
     "voice": "<OriginalInstrument>",
     "options": { /* original args */ }
   }
   ```

### Integration Points
The function is called in two places in `ast2json.rs`:
1. **Initial instrument setup** (lines ~113-120): When creating the first instrument node
2. **Mid-track instrument changes** (lines ~313-327): When switching instruments during playback

### Example Transformations

**Input MML:**
```
@FMSynth{"harmonicity":3,"modulationIndex":10} 'ceg'
```

**Output JSON (createNode event):**
```json
{
  "eventType": "createNode",
  "nodeId": 0,
  "nodeType": "PolySynth",
  "args": {
    "voice": "FMSynth",
    "options": {
      "harmonicity": 3,
      "modulationIndex": 10
    }
  }
}
```

This format correctly maps to Tone.js:
```javascript
new Tone.PolySynth(Tone.FMSynth, {
  harmonicity: 3,
  modulationIndex: 10
})
```

## Testing
- Added specific test case for issue #128 in `test/integration.test.js`
- Updated existing tests to verify new args structure
- All 488 tests passing
- Manual verification with various instrument/chord combinations

## Edge Cases Handled
1. **Sampler with chords**: Args passed through unchanged (Sampler is already polyphonic)
2. **PolySynth with chords**: Args passed through unchanged (already PolySynth)
3. **FMSynth without args**: Only `voice` is set, no `options` field
4. **FMSynth with args**: Both `voice` and `options` are set
5. **Mid-track instrument changes**: Same wrapping logic applies

## Notes
- The fix requires a **space** between the instrument command and the chord for proper parsing
  - ✅ Correct: `@FMSynth 'ceg'`
  - ❌ Incorrect: `@FMSynth{'ceg'}` (parser treats chord as JSON args)
- This is consistent with the MML grammar where whitespace separates tokens

## Security
- No security vulnerabilities detected by CodeQL
- No new dependencies added
- All changes are in safe Rust code with proper type checking
