# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Implementation Policy
This project uses **Tree-sitter** to parse MML.
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source of Truth (SSOT).
- Refer to [copilot-instructions.md](copilot-instructions.md) for details.

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation of generating a C language parser and a WASM parser from Tree-sitter's grammar.js.
  - A design pattern that treats grammar.js as the SSOT.
  - How to support both C and WASM generation.
  - This forms the foundation of this project's Tree-sitter implementation.

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
- Create music with simple text and play it on your website.
- Available as an npm package and via CDN, making integration into projects easy.
- A tool specialized in music conversion, with actual playback handled by a separate project (`tonejs-json-sequencer`).

# Usage

## As an npm package

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

## Via CDN

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
| `c d e f g a b` | Notes (C D E F G A B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified similarly to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specify octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raise octave by 1 | `<` |
| `>` | Lower octave by 1 | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Set default note length<br>(applies to subsequent notes without explicit length) | `l8` `l16` `l4` |

### Timbre Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Change timbre (synthesizer)<br>Uses Tone.js synth class names<br>(See "About Timbre Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Multi-track
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (inside quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Instrument switching within a single track
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
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Note**: 
- The implementation timeline and specifications for these commands are TBD.
- If implemented, specifications may change.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as a chord.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of the regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside quotes).
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Multi-track compatibility: Chords can be used in some tracks while others do not.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at exactly the same time.

### Comparison Examples

```mml
// Multi-track: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support the diverse synthesizer types of Tone.js in the future.

### Candidate Tone.js Synthesizer Types Available

The following are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Features | Suitable Timbres |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>2 oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>2 oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked string-like |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command directly uses Tone.js class names:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, lead)
  - `@PluckSynth` = Plucked instruments (guitar, harp)
  - `@MembraneSynth` = Drums, percussion
  - `@MetalSynth` = Cymbals, metallic percussion
  - `@DuoSynth` = Dual-voice synthesis (rich timbres)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Usage Examples

```mml
// Electric piano sound with FMSynth
@FMSynth o4 l8 cdefgab>c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b>c

// Bassline with MonoSynth
@MonoSynth o3 l8 c c c c d d d d
```

### Regarding Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre representation.
- It is implemented to allow easy checking of each variation.
- Specifications may undergo frequent breaking changes.
- If used in a production environment, it is recommended to pin the version.
- Please share any feedback or requests via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of this Investigation

The goal is to enable the expression of musical elements available in tonejs-json-sequencer within this library's MML. This will allow for the conversion of MML into a complete musical expression.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Remarks |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bell) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bell, metallic sound) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual-voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked string instrument) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drum) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbal) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not Supported | Sample-based instrument |

### Effects - Compatibility Status

#### Spatial

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ Supported | ⏳ Not Supported | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not Supported | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not Supported | JCReverb algorithm |

#### Modulation

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ Supported | ⏳ Not Supported | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not Supported | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not Supported | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not Supported | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not Supported | Auto filter |
| **AutoPanner** | ✅ Supported | ⏳ Not Supported | Auto panner |
| **AutoWah** | ✅ Supported | ⏳ Not Supported | Auto wah |

#### Delay

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not Supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ⏳ Not Supported | Ping pong delay |

#### Distortion

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not Supported | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not Supported | Bit crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not Supported | Chebyshev distortion (harmonic generation) |

#### Pitch

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

### Source Types - Future Support Planned

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Support Planned

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: `@` command directly specifies Tone.js class names (`@Synth`, `@FMSynth`, `@AMSynth`, etc.)
    - Future extension proposal: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2.  **Basic Effects**
    - Basic effects such as reverb, chorus, delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume (Volume/Expression): `v` command
    - Pan (Panpot): `p` command
    - Filter control: New command under consideration

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions such as vibrato, delay vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    - Special instruments like FatOscillator, PulseOscillator.
    - Sampler for sample-based instruments.

2.  **Dynamics Processing**
    - Mastering effects such as Compressor, EQ.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (rampTo).
    - Envelope control.

## Implementation Policy

### Basic Policy

1.  **Maintain Compatibility with Existing MML Syntax**
    - Do not break existing implementations.
    - Gradual addition of features.

2.  **Emphasize Simplicity**
    - Do not compromise the conciseness of MML.
    - Minimize learning curve.

3.  **Maximize Use of Tone.js Features**
    - Leverage features already implemented in tonejs-json-sequencer.
    - Extend JSON output format to accommodate new features.

### Implementation Approach

1.  **Phased Implementation**
    - Implement high-priority features sequentially.
    - Create prototypes for each feature to gather feedback.

2.  **Test-Driven Development (TDD)**
    - Create test cases for each feature.
    - Conduct regression tests for existing features.

3.  **Documentation Updates**
    - Update README and sample code upon completion of implementation.
    - Enrich usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First draft of tonejs-json-sequencer investigation results created.

# notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git-manageable, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Forms a Foundation for an Ecosystem**: High reusability, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Easily supports system-specific MML dialects with simple PEG conversion.

- Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
  - **To prioritize independent development and speed.**
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functions.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes under Consideration
## About Rust Implementation
- **Rust + WASM implementation added.**
  - Available as a Rust library crate.
  - Works in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - Refer to [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: Parser that converts MML string to AST.
- **ast**: Data structure for AST (Abstract Syntax Tree).
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- ※Example to visualize the image.
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※Keep layers loosely coupled for easy modification.
  - json (AST)
  - json (pre-processing)
    - What is processing?
      - Node ID numbering, etc.
- Output example
  - json (post-processing)
    - Format recognized by tonejs-json-sequencer.
    - Details omitted, TDD test cases will serve as detailed specifications.

## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project was using vitest for TDD.
  - I plan to organize the test procedures later.

※README.md is automatically generated from README.ja.md via Gemini translation on GitHub Actions.