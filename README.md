# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Implementation Strategy
This project parses MML using **Tree-sitter**.
- The parser implementation treats `grammar.js` as the Single Source of Truth (SSOT).
- For details, refer to [copilot-instructions.md](copilot-instructions.md).

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Reference Implementations
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An implementation example for generating C language and WASM parsers from Tree-sitter's grammar.js.
  - A design pattern treating grammar.js as the SSOT.
  - How to support both C and WASM generation.
  - This forms the foundation of the Tree-sitter implementation in this project.

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
- Converts music written in MML (Music Macro Language) into a browser-playable JSON format.
- Create music with simple text and play it on your website.
- Available as an npm package and via CDN, making integration into projects easy.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Usage

## Using as an npm package

```bash
npm install tonejs-mml-to-json
```

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// Initialize WASM module
await initWasm();

// Convert MML to JSON
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## Using via CDN

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
| `+` `-` | Accidentals (Sharp/Flat)<br>*Place immediately after the note (cannot be placed before the note)* | `c+` `e-` `c++` `e--` |
| `Number` | Note duration (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Place immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note duration by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Duration and dots can be specified similar to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specify octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Increase octave by 1 | `<` |
| `>` | Decrease octave by 1 | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Set default note duration<br>(Applies to subsequent notes if no duration is specified) | `l8` `l16` `l4` |

### Instrument Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Change instrument (synthesizer)<br>Uses Tone.js synth class names<br>(See "About Instrument Specifications" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Multi-track
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, duration, and dots can be specified<br>*Duration after the first note (inside quotes), dot outside quotes* | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### Examples
```mml
// Basic scale
o4 l16 cdefgab

// Scale with accidentals
o4 l16 c c+ d d+ e f f+ g g+ a a+ b

// Dotted notes and rhythm
o4 l8 c4. d e8. f16 g4

// Octave changes
o4 c d e < f g a > b < c

// Multi-track (separate parts)
o4 l8 ceg;dfb;ace

// Chords (notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mixed single notes and chords
o4 c 'eg' d 'fac' e

// Chords including accidentals and duration
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Instrument change (timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab>c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// Instrument switching within one track
@Synth o4 cde @FMSynth fga @AMSynth b>c
```

## Unimplemented Commands (Planned for Future)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (note duration ratio, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repeat) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timing and specifications for these commands are TBD.
- Specifications may change if implemented.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for duration and dots: `'c4eg'.` = Dotted quarter note C-E-G chord (duration inside quotes, dot outside quotes)
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Multi-track compatibility: Chords can be used in some tracks and not others.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at the exact same time.

### Comparison Example

```mml
// Multi-track: C, E, and G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, and G are played together as a single chord
'ceg'
```

## About Instrument Specifications (`@` Command)

The current `@` command implements basic instrument switching, but is planned to support a wider range of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are Tone.js synthesizer types that may be specifiable with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic sounds |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex sounds |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked string types |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command directly uses Tone.js class names:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, leads)
  - `@PluckSynth` = Plucked string instruments (guitar, harp)
  - `@MembraneSynth` = Drums, percussion
  - `@MetalSynth` = Cymbals, metallic percussion
  - `@DuoSynth` = Dual-voice synthesis (rich timbre)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Examples

```mml
// Electric piano sound with FMSynth
@FMSynth o4 l8 cdefgab>c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b>c

// Bassline with MonoSynth
@MonoSynth o3 l8 c c c c d d d d
```

### Potential for Specification Changes

⚠️ **Important**: The instrument specification feature is currently in the prototyping phase.

- This is a provisional specification for verifying Tone.js's default timbre expression.
- It is implemented to allow easy checking of each variation.
- Specifications may be subject to frequent breaking changes.
- If using in a production environment, it is recommended to pin the version.
- If you have any feedback or requests, please share them via a GitHub Issue.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

The aim is to enable the expression of musical elements possible with tonejs-json-sequencer within this library's MML. This will allow for the conversion from MML to complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked string instruments) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported Yet | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not Supported Yet | Sample-based instrument |

### Effects - Compatibility Status

#### Spatial Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ Supported | ⏳ Not Supported Yet | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not Supported Yet | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not Supported Yet | JCReverb algorithm |

#### Modulation Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ Supported | ⏳ Not Supported Yet | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not Supported Yet | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not Supported Yet | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not Supported Yet | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not Supported Yet | Auto Filter |
| **AutoPanner** | ✅ Supported | ⏳ Not Supported Yet | Auto Panner |
| **AutoWah** | ✅ Supported | ⏳ Not Supported Yet | Auto Wah |

#### Delay Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not Supported Yet | Feedback Delay |
| **PingPongDelay** | ✅ Supported | ⏳ Not Supported Yet | Ping Pong Delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not Supported Yet | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not Supported Yet | Bit Crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not Supported Yet | Chebyshev Distortion (harmonic generation) |

#### Pitch Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not Supported Yet | Pitch Shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not Supported Yet | Frequency Shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not Supported Yet | Stereo Widener |

### Performance Techniques & Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delayed Vibrato** | ✅ Supported | ⏳ Not Supported Yet | Delayed Vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not Supported Yet | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not Supported Yet | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not Supported Yet | Real-time volume (expression) change |
| **LPF Change** | 🚧 Planned | ⏳ Not Supported Yet | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Supported Yet | Portamento effect |

### Instrument Types (Source) - Planned for Future Support

| Instrument | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported Yet | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported Yet | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics & Filters - Planned for Future Support

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported Yet | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported Yet | 3-band equalizer |

## Implementation Priorities and Plan

### High Priority (Planned for Early Implementation)

1. **Instrument Expansion**
   - Currently implemented: Direct specification of Tone.js class names with the `@` command (e.g., `@Synth`, `@FMSynth`, `@AMSynth`).
   - Future expansion idea: Support for abbreviations and aliases (e.g., `@fm` → `@FMSynth`).

2. **Basic Effects**
   - Basic effects such as reverb, chorus, and delay.
   - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3. **Parameter Control**
   - Volume/Expression: `v` command.
   - Pan (Panpot): `p` command.
   - Filter control: New command under consideration.

### Medium Priority

1. **Advanced Effects**
   - Phaser, Tremolo, AutoFilter, AutoWah, etc.
   - Performance expressions like vibrato, delayed vibrato.

2. **Distortion Effects**
   - Distortion, BitCrusher, Chebyshev

3. **Pitch Effects**
   - PitchShift, FrequencyShifter

### Low Priority (Under Consideration)

1. **Advanced Instruments**
   - Special instruments like FatOscillator, PulseOscillator.
   - Sample-based instruments using Sampler.

2. **Dynamics Processing**
   - Mastering effects like Compressor, EQ.

3. **Real-time Parameter Changes**
   - Gradual parameter changes (rampTo).
   - Envelope control.

## Implementation Approach

### Basic Policy

1. **Maintain compatibility with existing MML syntax**
   - Do not break existing implementations.
   - Gradual feature additions.

2. **Emphasize simplicity**
   - Do not compromise MML's conciseness.
   - Minimize learning curve.

3. **Maximize utilization of Tone.js features**
   - Utilize features already implemented in tonejs-json-sequencer.
   - Support through extension of the JSON output format.

### Implementation Strategy

1. **Phased Implementation**
   - Implement high-priority features sequentially.
   - Create prototypes for each feature to gather feedback.

2. **Test-Driven Development**
   - Create test cases for each feature.
   - Conduct regression testing for existing features.

3. **Documentation Updates**
   - Update README and sample code upon implementation completion.
   - Enhance usage examples.

## References

- [tonejs-json-sequencer repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Changelog

- 2026-01-12: Initial draft of tonejs-json-sequencer investigation results created.

# Notes
- What are the benefits of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendliness**: Code-like notation, Git management, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple grammar, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Fosters an Ecosystem**: High reusability, easy to share and accumulate know-how.
  - **Adaptability to Dialects**: Assumed to be easy to adapt to system-specific MML dialects, with individuals able to create simple converters using PEG.

- Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
  - **To prioritize development independence and speed**.
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by the dependencies between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Memo for Consideration
## About Rust Implementation
- **Rust + WASM implementation added**
  - Available as a Rust library crate.
  - Runs in browsers via WASM compilation.
  - 100% compatible with the JavaScript implementation.
  - For details, refer to [rust/README.md](rust/README.md).

## Architecture
- **mml2ast**: A parser that converts MML strings into an AST.
- **ast**: Data structure for AST (Abstract Syntax Tree).
- **ast2json**: Converts AST to Tone.js-compatible JSON.

## Input/Output Definition
- *Example to visualize the concept*
- Input example
  - `o4 l16 e`
- Intermediate format example
  - *Designed as loosely coupled, thin layers for easy modification of each.*
  - json (AST)
  - json (Pre-processed)
    - What is processing?
      - Node ID assignment, etc.
- Output example
  - json (Post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; TDD test cases serve as the definitive specification.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project used Vitest for TDD.
  - I intend to organize the testing procedures later.

*README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.*