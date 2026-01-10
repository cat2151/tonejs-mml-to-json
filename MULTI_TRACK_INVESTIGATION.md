# Multi-Track MML Implementation Investigation Report

**Issue**: #37 - 「;」コマンドによる複数track演奏を実装するにあたり、その準備に必要なものを可視化する

**Date**: 2026-01-10

## Executive Summary

This document investigates the feasibility of implementing multi-track MML playback using the semicolon (`;`) command, evaluating:
1. Parser capability for `;` track separation
2. JSON output format requirements
3. Integration with `tonejs-json-sequencer`
4. Required code changes

## 1. Current State Analysis

### 1.1 Current Architecture

**tonejs-mml-to-json** (this project):
```
MML String → mml2ast (Rust WASM) → AST → ast2json (Rust WASM) → Tone.js JSON
```

**Current single-track output format**:
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
    "args": ["c4", "182i", "+0i"]
  }
]
```

### 1.2 Target Multi-Track Format (from tonejs-json-sequencer)

The `tonejs-json-sequencer` demo shows multi-track support with this structure:

```json
[
  {
    "eventType": "createNode",
    "nodeId": 0,
    "nodeType": "FMSynth",
    "args": { /* config */ }
  },
  {
    "eventType": "createNode",
    "nodeId": 1,
    "nodeType": "PolySynth",
    "args": { /* config */ }
  },
  {
    "eventType": "connect",
    "nodeId": 0,
    "connectTo": "toDestination"
  },
  {
    "eventType": "connect",
    "nodeId": 1,
    "connectTo": "toDestination"
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C2", "4n", "+0i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 1,
    "args": ["E5", "4n", "+0i"]
  }
]
```

**Key characteristics**:
- Multiple instruments (different nodeIds)
- Each track has its own createNode and connect events
- Events from all tracks are merged in time order
- Timing is absolute ("+0i", "+192i", etc.)

## 2. MML Multi-Track Syntax

### 2.1 Standard MML Track Separator

The semicolon (`;`) is the standard MML track separator, widely used in:
- NASequencer (FlMML-based)
- SNES game music tools
- Various chiptune tools

**Example syntax**:
```
@0 cdef; @1 egab; @2 cccc
```

This means:
- Track 0: `@0 cdef` (instrument 0, notes C D E F)
- Track 1: `@1 egab` (instrument 1, notes E G A B)
- Track 2: `@2 cccc` (instrument 2, notes C C C C)

Each track starts at time 0 and runs independently.

### 2.2 Example Multi-Track MML

```mml
o4 l8 cdefgab; o5 l16 ccccddddeeee; o3 l4 c e g
```

Expected behavior:
- Track 1: Octave 4, eighth notes, melody C-D-E-F-G-A-B
- Track 2: Octave 5, sixteenth notes, C×4 D×4 E×4
- Track 3: Octave 3, quarter notes, C E G (bass line)

## 3. Parser Analysis

### 3.1 Current Parser (Rust WASM)

**Location**: `rust/src/mml2ast.rs`

**Current implementation**:
- Character-by-character parsing
- Handles: notes, rests, octaves, lengths, accidentals, instruments
- **Does NOT handle**: semicolon (`;`) as a special character

**Current behavior**: Semicolon is silently skipped (like other unknown characters)

```rust
// From mml2ast.rs line 77-78
// Unknown character, skip
index += 1;
```

### 3.2 Required Parser Changes

**Option A: Add semicolon token to AST**
```rust
// In ast.rs, add new token type
pub enum AstToken {
    Note(NoteToken),
    Rest(RestToken),
    // ... existing tokens ...
    TrackSeparator(TrackSeparatorToken),  // NEW
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct TrackSeparatorToken {
    pub length: usize,
}
```

**Parsing logic** (in mml2ast.rs):
```rust
// After line 75, add:
if ch == ';' {
    tokens.push(AstToken::TrackSeparator(TrackSeparatorToken { length: 1 }));
    index += 1;
    continue;
}
```

**Option B: Parse into track array structure**
- More complex AST restructuring
- Would require significant changes to AST → JSON conversion
- Less flexible for future extensions

**Recommendation**: Option A (add TrackSeparator token)
- Minimal parser changes
- Preserves AST simplicity
- Allows ast2json to handle track logic

## 4. AST to JSON Conversion Analysis

### 4.1 Current Conversion (Single Track)

**Location**: `rust/src/ast2json.rs`

**Current logic**:
1. Creates single node (nodeId=0) of type "Synth"
2. Connects to destination
3. Processes all AST tokens sequentially
4. Maintains state: octave, default_length, start_tick
5. Generates triggerAttackRelease events with timing

### 4.2 Required Changes for Multi-Track

**High-level approach**:

```rust
pub fn ast2json(ast: &[AstToken]) -> Result<Vec<Command>, String> {
    let mut commands = Vec::new();
    
    // Split AST by TrackSeparator tokens
    let tracks = split_into_tracks(ast);
    
    // Process each track independently
    for (track_index, track_ast) in tracks.iter().enumerate() {
        let track_commands = process_single_track(track_ast, track_index);
        commands.extend(track_commands);
    }
    
    // Sort all commands by start time
    commands.sort_by(|a, b| get_start_time(a).cmp(&get_start_time(b)));
    
    Ok(commands)
}
```

**Key implementation details**:

1. **Track splitting function**:
```rust
fn split_into_tracks(ast: &[AstToken]) -> Vec<Vec<AstToken>> {
    let mut tracks = vec![Vec::new()];
    let mut current_track = 0;
    
    for token in ast {
        match token {
            AstToken::TrackSeparator(_) => {
                current_track += 1;
                tracks.push(Vec::new());
            }
            _ => {
                tracks[current_track].push(token.clone());
            }
        }
    }
    
    tracks
}
```

2. **Per-track processing**:
```rust
fn process_single_track(
    ast: &[AstToken], 
    track_index: usize
) -> Vec<Command> {
    let mut commands = Vec::new();
    let node_id = track_index;  // Each track gets unique nodeId
    
    // Same logic as current ast2json, but with track_index as nodeId
    // Each track starts at start_tick = 0
    // Each track has independent octave, default_length state
    
    // ...existing processing logic...
    
    commands
}
```

3. **Command sorting**:
- Setup commands (createNode, connect) should come first
- Then sort by start time
- Maintains chronological order for playback

**Instrument assignment**:
- Default: Each track uses "Synth" with nodeId = track_index
- With `@N` command: Creates instrument node with appropriate type
  - Currently `@` just increments node_id
  - Need to map instrument numbers to Tone.js synth types

## 5. Integration with tonejs-json-sequencer

### 5.1 Library Compatibility

**tonejs-json-sequencer** demo shows:
- ✅ Already supports multiple instruments (different nodeIds)
- ✅ Handles events in time order
- ✅ Uses same JSON format we currently generate
- ✅ No special "multi-track" structure needed

**Conclusion**: **The generated JSON format is fully compatible**. We just need to:
1. Generate multiple createNode commands (one per track)
2. Use different nodeId for each track
3. Merge events in time order

### 5.2 Player Integration

**Current player**: `src/play.ts` and `src/main.ts`
- Currently uses simple inline playback
- Does NOT use `tonejs-json-sequencer` as a library

**Option 1: Continue with current player**
- ✅ No external dependency changes
- ✅ Player already handles JSON events
- ⚠️ Need to verify multi-instrument support
- Current player code needs review for multi-nodeId support

**Option 2: Integrate tonejs-json-sequencer**
- ✅ Proven multi-track support
- ✅ More features (effects, etc.)
- ⚠️ Adds dependency
- ⚠️ Would need to refactor existing player code

**Recommendation**: Option 1 (enhance current player)
- Aligns with project goal of separation between parser and player
- Less disruption to existing code
- tonejs-json-sequencer remains a compatible target, not a hard dependency

## 6. Implementation Roadmap

### Phase 1: Parser Enhancement (Rust)
1. ✅ Add `TrackSeparatorToken` to AST types in `rust/src/ast.rs`
2. ✅ Add semicolon parsing in `rust/src/mml2ast.rs`
3. ✅ Add tests for multi-track MML parsing
4. ✅ Rebuild WASM module

### Phase 2: Conversion Logic (Rust)
1. ✅ Implement `split_into_tracks()` function
2. ✅ Refactor `ast2json()` to process multiple tracks
3. ✅ Update `process_single_track()` with nodeId parameter
4. ✅ Implement command sorting by time
5. ✅ Add tests for multi-track JSON generation

### Phase 3: TypeScript Updates
1. ✅ Update type definitions in `src/mml2ast.ts`
2. ✅ Update type definitions in `src/ast2json.ts`
3. ✅ Add integration tests for multi-track

### Phase 4: Player Verification
1. ⚠️ Test existing player with multi-track JSON
2. ⚠️ Fix any issues with multiple instruments
3. ⚠️ Update demo page to show multi-track examples

### Phase 5: Documentation
1. ⚠️ Update README with multi-track examples
2. ⚠️ Add multi-track section to LIBRARY_USAGE.md
3. ⚠️ Document limitations and edge cases

## 7. Expected Behavior Examples

### Example 1: Two-Track Melody

**Input MML**:
```
o4 l8 cdef; o5 l8 egab
```

**Expected JSON** (simplified):
```json
[
  {"eventType": "createNode", "nodeId": 0, "nodeType": "Synth"},
  {"eventType": "connect", "nodeId": 0, "connectTo": "toDestination"},
  {"eventType": "createNode", "nodeId": 1, "nodeType": "Synth"},
  {"eventType": "connect", "nodeId": 1, "connectTo": "toDestination"},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["c4", "86i", "+0i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 1, "args": ["e5", "86i", "+0i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["d4", "86i", "+96i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 1, "args": ["g5", "86i", "+96i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["e4", "86i", "+192i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 1, "args": ["a5", "86i", "+192i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 0, "args": ["f4", "86i", "+288i"]},
  {"eventType": "triggerAttackRelease", "nodeId": 1, "args": ["b5", "86i", "+288i"]}
]
```

### Example 2: Different Lengths

**Input MML**:
```
l4 cde; l8 efgabc
```

**Expected result**:
- Track 0: Quarter notes (192 ticks each)
- Track 1: Eighth notes (96 ticks each)
- All events sorted by time
- Simultaneous notes at t=0, t=192, t=384

## 8. Potential Issues and Solutions

### Issue 1: Instrument Selection with `@` Command

**Problem**: Current `@N` command just increments node_id, doesn't specify synth type

**Solutions**:
- **Option A**: Map instrument numbers to synth types
  - @0 = Synth, @1 = FMSynth, @2 = PolySynth, etc.
  - Requires mapping table
- **Option B**: Extend syntax with named instruments
  - `@fm cdef` = use FMSynth
  - More user-friendly but non-standard
- **Option C**: All tracks use default Synth for now
  - Simplest, can enhance later

**Recommendation**: Option C for initial implementation

### Issue 2: Empty Tracks

**Problem**: What if a track is empty? `c;d;`

**Solution**: Skip empty tracks, don't create node

### Issue 3: Maximum Track Count

**Problem**: Practical limit on tracks?

**Solution**: No hard limit, but document performance considerations

### Issue 4: Track State Independence

**Problem**: Each track should have independent octave, length, etc.

**Solution**: ✅ Already planned - each track processes independently

## 9. Testing Strategy

### Unit Tests (Rust)
```rust
#[test]
fn test_parse_multi_track() {
    let result = mml2ast("c;d;e");
    // Should have: Note, TrackSeparator, Note, TrackSeparator, Note
}

#[test]
fn test_multi_track_json() {
    let ast = mml2ast("c;d").unwrap();
    let json = ast2json(&ast).unwrap();
    // Should have 2 createNode commands with nodeId 0 and 1
    // Should have events for both tracks
}
```

### Integration Tests (JavaScript)
```javascript
it('should convert multi-track MML', () => {
  const mml = 'o4 cde; o5 efg';
  const ast = mml2ast(mml);
  const json = ast2json(ast);
  
  // Verify 2 instruments created
  const createNodes = json.filter(e => e.eventType === 'createNode');
  expect(createNodes).toHaveLength(2);
  
  // Verify notes from both tracks
  const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
  expect(notes.some(n => n.nodeId === 0)).toBe(true);
  expect(notes.some(n => n.nodeId === 1)).toBe(true);
});
```

### Manual Testing
- Demo page with multi-track examples
- Verify playback in browser
- Test with tonejs-json-sequencer demo

## 10. Answers to Original Questions

### Q1: TreeSitterでの「;」のパースや、各種変換処理で、上記のJSONは生成できるようになるか？

**Answer**: **はい、可能です。**

- Current parser (Rust, not TreeSitter) can be easily extended to recognize `;`
- AST → JSON conversion can split tracks and generate multi-track JSON
- Output format is fully compatible with tonejs-json-sequencer's expected format

**Required changes**:
1. Add TrackSeparator token to AST
2. Parse `;` character
3. Modify ast2json to process multiple tracks
4. Merge events in time order

### Q2: 演奏についても、上記 tonejs-json-sequencer をライブラリとして利用できるか？

**Answer**: **利用可能ですが、必須ではありません。**

**Integration options**:
1. **Current approach**: Keep using internal player
   - Already compatible with the JSON format
   - Need to verify multi-instrument support
   - Maintains independence between projects
   
2. **Use as library**: Import tonejs-json-sequencer
   - Add npm dependency
   - Replace src/play.ts with library call
   - More features (effects, etc.)

**Recommendation**: Keep current architecture, ensure player handles multi-nodeId

### Q3: 既存のcodeの変更が必要か？

**Answer**: **最小限の変更が必要です。**

**Required changes**:
- ✅ **Rust parser**: Add semicolon handling (~20 lines)
- ✅ **Rust ast2json**: Add multi-track processing (~100 lines)
- ✅ **TypeScript types**: Add TrackSeparator type (~5 lines)
- ⚠️ **Player verification**: Ensure multi-instrument support works
- ✅ **Tests**: Add multi-track test cases

**No breaking changes expected**: Single-track MML will continue to work

## 11. Conclusion

**Summary**:
1. ✅ Multi-track MML with `;` separator is feasible
2. ✅ Parser can be easily extended to support it
3. ✅ JSON output format is compatible with tonejs-json-sequencer
4. ✅ Minimal code changes required
5. ✅ No need to integrate tonejs-json-sequencer as dependency (but can if desired)

**Estimated effort**:
- Parser changes: 2-3 hours
- Conversion logic: 4-6 hours
- Testing: 3-4 hours
- Documentation: 2-3 hours
- **Total**: ~12-16 hours

**Recommendation**: **Proceed with implementation using Option A approach**
- Add TrackSeparator token to AST
- Implement multi-track processing in ast2json
- Maintain current player architecture
- Consider tonejs-json-sequencer integration as future enhancement

## 12. References

- [tonejs-json-sequencer Demo](https://cat2151.github.io/tonejs-json-sequencer/src/index.html)
- [tonejs-json-sequencer GitHub](https://github.com/cat2151/tonejs-json-sequencer)
- [NASequencer MML Documentation](https://nasequencer.com/help/music-macro-language.html)
- [MML Wikipedia](https://en.wikipedia.org/wiki/Music_Macro_Language)
- Current project: rust/src/mml2ast.rs, rust/src/ast2json.rs
