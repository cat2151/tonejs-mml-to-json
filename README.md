# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 Library Usage Guide | [LIBRARY_USAGE.md](LIBRARY_USAGE.md) |
| 📖 Project Overview | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Development Status | [generated-docs/development-status.md](generated-docs/development-status.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music with simple text and play it on your website.
- Available as an npm package and via CDN, making integration into projects easy.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Usage

## Usage as npm package

```bash
npm install tonejs-mml-to-json
```

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// Initialize the WASM module
await initWasm();

// Convert MML to JSON
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## Usage via CDN

```html
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  await initWasm();
  const json = mml2json('o4 l16 e f g+ a');
  console.log(json);
</script>
```

For detailed usage, please refer to [LIBRARY_USAGE.md](LIBRARY_USAGE.md).

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|------|-----|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (multiplies note length by 1.5)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified just like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specifies octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Increases octave by one | `<` |
| `>` | Decreases octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Sets default note length<br>(applies to subsequent notes without explicit length) | `l8` `l16` `l4` |

### Instrument Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Changes the instrument (synthesizer)<br>Uses Tone.js synthesizer class names<br>(See "About Instrument Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Multi-track
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dot can be specified<br>※Length after the first note (within quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### Usage Examples
```mml
// Basic scale
o4 l16 cdefgab

// Scale with accidentals
o4 l16 c c+ d d+ e f f+ g g+ a a+ b

// Dotted notes and rhythm
o4 l8 c4. d e8. f16 g4

// Octave change
o4 c d e < f g a > b < c

// Multi-track (separate parts)
o4 l8 ceg;dfb;ace

// Chords (notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mix of single notes and chords
o4 c 'eg' d 'fac' e

// Chords including accidentals and length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Instrument change (timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab>c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// In-track instrument switching
@Synth o4 cde @FMSynth fga @AMSynth b>c
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (percentage of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repeat) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timeline and specifications for these commands are TBD.
- Specifications may change if they are implemented.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

-   **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
-   **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
-   **Features**:
    -   Support for accidentals within chords: `'c+eg-'` = C# E Gb
    -   Support for length and dot: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside).
    -   Interaction with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
    -   Compatibility with multi-track: Some tracks can use chords while others do not.
-   **Difference from Multi-track**:
    -   Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
    -   Chords (`'...'`): Multiple notes played together at the exact same time.

### Comparative Example

```mml
// Multi-track: C, E, G are played as separate parts (melodic lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Instrument Specification (`@` Command)

The current `@` command implements basic instrument switching but is planned to support the diverse synthesizer types of Tone.js in the future.

### Candidate Tone.js Synthesizer Types Available for Future Use

The following are Tone.js synthesizer types that may be specifiable with the `@` command in the future:

| Type | Features | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Lead, pad, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>Modulates amplitude with two oscillators | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Modulates frequency with two oscillators | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono lead, analog synth style |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked strings |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

-   **Currently**: The `@` command directly uses Tone.js class names:
    -   `@Synth` = Basic subtractive synthesis (default)
    -   `@FMSynth` = FM synthesis (electric piano, bells)
    -   `@AMSynth` = AM synthesis (bells, metallic sounds)
    -   `@MonoSynth` = Monophonic synthesis (bass, lead)
    -   `@PluckSynth` = Plucked strings (guitar, harp)
    -   `@MembraneSynth` = Drums, percussion
    -   `@MetalSynth` = Cymbals, metallic percussion
    -   `@DuoSynth` = Dual-voice synthesis (rich timbres)
    -   `@PolySynth` = Polyphonic synthesis
-   **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Usage Examples

```mml
// FMSynth for electric piano sound
@FMSynth o4 l8 cdefgab>c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b>c

// MonoSynth for bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Potential for Specification Changes

⚠️ **Important**: The instrument specification feature is currently in the prototyping phase.

-   This is a temporary specification for verifying Tone.js's default sound representation.
-   It's implemented to allow simple testing of various variations.
-   The specification may frequently undergo breaking changes.
-   If used in a production environment, it is recommended to pin the version.
-   If you have any feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (`tonejs-mml-to-json`).

## Purpose of this survey

The goal is to enable the MML of this library (`tonejs-mml-to-json`) to express musical elements that are representable by `tonejs-json-sequencer`. This will allow for the conversion of MML into a complete musical expression.

## Components supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (e-piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not Supported | Sample-based instrument |

### Effects - Compatibility Status

#### Spatial Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ Supported | ⏳ Not Supported | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not Supported | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not Supported | JCReverb algorithm |

#### Modulation Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ Supported | ⏳ Not Supported | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not Supported | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not Supported | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not Supported | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not Supported | Auto filter |
| **AutoPanner** | ✅ Supported | ⏳ Not Supported | Auto panner |
| **AutoWah** | ✅ Supported | ⏳ Not Supported | Auto wah |

#### Delay Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not Supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ⏳ Not Supported | Ping-pong delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not Supported | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not Supported | Bit crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not Supported | Chebyshev distortion (harmonic generation) |

#### Pitch Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not Supported | Pitch shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not Supported | Frequency shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not Supported | Stereo widener |

### Performance & Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delay Vibrato** | ✅ Supported | ⏳ Not Supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not Supported | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not Supported | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not Supported | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not Supported | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Supported | Portamento effect |

### Source Types - Planned for Future Support

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics & Filters - Planned for Future Support

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    -   Currently implemented: `@` command directly specifies Tone.js class names (`@Synth`, `@FMSynth`, `@AMSynth`, etc.)
    -   Future extension plan: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2.  **Basic Effects**
    -   Basic effects like reverb, chorus, delay.
    -   MML command proposals: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    -   Volume/Expression: `v` command
    -   Panpot: `p` command
    -   Filter control: New command under consideration

### Medium Priority

1.  **Advanced Effects**
    -   Phaser, Tremolo, AutoFilter, AutoWah, etc.
    -   Performance expressions like vibrato, delayed vibrato.

2.  **Distortion Effects**
    -   Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    -   PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    -   Specialized instruments like FatOscillator, PulseOscillator.
    -   Sampler for sample-based instruments.

2.  **Dynamics Processing**
    -   Mastering effects like Compressor, EQ.

3.  **Real-time Parameter Changes**
    -   Gradual parameter changes (`rampTo`).
    -   Envelope control.

## Implementation Policy

### Basic Policy

1.  **Maintain compatibility with existing MML syntax**
    -   Do not break existing implementations.
    -   Add features incrementally.

2.  **Emphasize simplicity**
    -   Do not compromise the conciseness of MML.
    -   Minimize learning curve.

3.  **Maximize utilization of Tone.js features**
    -   Leverage features already implemented in `tonejs-json-sequencer`.
    -   Extend JSON output format for compatibility.

### Implementation Approach

1.  **Incremental Implementation**
    -   Implement high-priority features first.
    -   Create prototypes for each feature to gather feedback.

2.  **Test-Driven Development (TDD)**
    -   Create test cases for each feature.
    -   Conduct regression tests for existing features.

3.  **Documentation Updates**
    -   Update README and sample code upon completion of implementation.
    -   Enhance usage examples.

## References

-   [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
-   [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
-   [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
-   [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

-   2026-01-12: First draft of tonejs-json-sequencer survey results created.

# Notes
-   What are the advantages of writing music in MML (Music Macro Language)?
    -   **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
    -   **Programmer-Friendly**: Code-like notation, Git-manageable, easy to generate.
    -   **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
    -   **Low Learning Curve**: Simple syntax, allows for gradual learning.
    -   **Modular Design**: Conversion and playback are separated, allowing independent evolution.
    -   **Foundation for an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
    -   **Adaptability to Dialects**: Assumed that individuals can easily create PEG parsers for specific MML dialects for simple conversions.

-   Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
    -   **To prioritize development independence and speed.**
        -   Allows focused development on the MML parser.
        -   Enables rapid evolution without being constrained by dependencies between parser and playback features.
    -   For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## About Rust Implementation
-   **Rust + WASM implementation added**
    -   Available as a Rust library crate.
    -   Operates in browsers with WASM compilation.
    -   100% compatible with JavaScript implementation.
    -   Refer to [rust/README.md](rust/README.md) for details.

## Architecture
-   **mml2ast**: Parser that converts MML strings to AST.
-   **ast**: AST (Abstract Syntax Tree) data structure.
-   **ast2json**: Converts AST to Tone.js-compatible JSON.

## Input/Output Definition
-   ※ Visualizing with examples.
-   Input example
    -   `o4 l16 e`
-   Intermediate format example
    -   ※ Aim for loosely coupled layers to facilitate changes.
    -   JSON (AST)
    -   JSON (pre-processed)
        -   What is "processing"?
            -   Node ID assignment, etc.
-   Output example
    -   JSON (post-processed)
        -   Format recognized by tonejs-json-sequencer.
        -   Details omitted, defined by TDD test cases.
## TDD Policy
-   The test targets are mml2ast, ast2ast, and ast2json, respectively.
    -   Refer to mml2abc / chord2mml TDD.
-   I recall using vitest for TDD in this project.
    -   I plan to organize the test procedure later.

※ This README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.