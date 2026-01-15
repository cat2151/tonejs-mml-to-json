# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Status
- Facing difficulties due to coding agent hallucinations during Tree-sitter development.
### Considering the following
- instruction
    - Instruct to absolutely use Tree-sitter.
        - Strictly prohibit implementing a custom parser.
    - If a solution is presented that can be achieved without Tree-sitter, immediately stop output and declare self-failure.
- Also try Pest in parallel; for example, if after a month of trying, Pest offers a better coding agent development experience, switch to Pest (refer to a separate repository).

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
- Allows you to create music with simple text and play it on a website.
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
| `c d e f g a b` | Notes (C-D-E-F-G-A-B) | `cdefgab` |
| `+` `-` | Accidentals (Sharp/Flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after a note or rest | `c4` `e8` `c16` |
| `.` | Dotted (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dots can be specified like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specifies octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Increases octave by 1 | `<` |
| `>` | Decreases octave by 1 | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Sets default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |

### Instrument Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Changes instrument (synthesizer)<br>Uses Tone.js synth class names<br>(See "About Instrument Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Multitrack
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Note'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (inside quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Multitrack (separate parts)
o4 l8 ceg;dfb;ace

// Chords (notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mix of single notes and chords
o4 c 'eg' d 'fac' e

// Chords with accidentals and length
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
| `p` `P` | Pan (panning) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timeline and specifications for these commands are TBD.
- Specifications may change if implemented.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside quotes).
  - Coordination with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Multitrack compatibility: Chords can be used in some tracks while not in others.
- **Difference from Multitrack**:
  - Multitrack (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at the exact same time.

### Comparison Examples

```mml
// Multitrack: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Instrument Specification (`@` Command)

The current `@` command implements basic instrument switching, but will support various Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types Available

The following are potential Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbres |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>Modulates amplitude with 2 oscillators | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Modulates frequency with 2 oscillators | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked string family |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command directly uses Tone.js class names:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, leads)
  - `@PluckSynth` = Plucked strings (guitar, harp)
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

⚠️ **Important**: The instrument specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre representation.
- It is implemented to allow easy confirmation of each variation.
- Specifications may undergo frequent breaking changes.
- If used in a production environment, it is recommended to pin the version.
- If you have any feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

The goal is to enable the expression of musical elements possible with tonejs-json-sequencer using MML in this library. This will allow for the conversion from MML to complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not yet supported | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not yet supported | Sample-based sound source |

### Effects - Compatibility Status

#### Spatial Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ Supported | ⏳ Not yet supported | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not yet supported | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not yet supported | JCReverb algorithm |

#### Modulation Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ Supported | ⏳ Not yet supported | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not yet supported | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not yet supported | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not yet supported | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not yet supported | Auto-filter |
| **AutoPanner** | ✅ Supported | ⏳ Not yet supported | Auto-panner |
| **AutoWah** | ✅ Supported | ⏳ Not yet supported | Auto-wah |

#### Delay Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not yet supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ⏳ Not yet supported | Ping-pong delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not yet supported | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not yet supported | Bit crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not yet supported | Chebyshev distortion (harmonic generation) |

#### Pitch Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not yet supported | Pitch shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not yet supported | Frequency shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not yet supported | Stereo widener |

### Performance and Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delayed Vibrato** | ✅ Supported | ⏳ Not yet supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not yet supported | Gradual parameter changes |
| **Panpot change** | 🚧 Planned | ⏳ Not yet supported | Real-time pan (panning) change |
| **Expression change** | 🚧 Planned | ⏳ Not yet supported | Real-time volume change |
| **LPF change** | 🚧 Planned | ⏳ Not yet supported | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not yet supported | Portamento effect |

### Sound Source Types - Future Support Planned

| Sound Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not yet supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not yet supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Support Planned

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not yet supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not yet supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Expansion**
    - Currently implemented: Direct specification of Tone.js class names with `@` command (e.g., `@Synth`, `@FMSynth`, `@AMSynth`).
    - Future expansion idea: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`).

2.  **Basic Effects**
    - Basic effects such as reverb, chorus, delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume/Expression: `v` command.
    - Panpot: `p` command.
    - Filter control: New command under consideration.

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions such as vibrato, delayed vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Sound Sources**
    - Special sound sources such as FatOscillator, PulseOscillator.
    - Sample-based sound sources using Sampler.

2.  **Dynamics Processing**
    - Mastering-related effects such as Compressor, EQ.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (rampTo).
    - Envelope control.

## Implementation Policy

### Basic Policy

1.  **Maintain compatibility with existing MML syntax**
    - Avoid breaking existing implementations.
    - Gradual feature additions.

2.  **Emphasis on Simplicity**
    - Preserve MML's conciseness.
    - Minimize learning curve.

3.  **Maximize utilization of Tone.js features**
    - Leverage features already implemented in tonejs-json-sequencer.
    - Handle by extending the JSON output format.

### Implementation Approach

1.  **Phased Implementation**
    - Implement high-priority features sequentially.
    - Create prototypes for each feature and gather feedback.

2.  **Test-Driven Development**
    - Create test cases for each feature.
    - Conduct regression testing for existing features.

3.  **Documentation Update**
    - Update README and sample code upon completion of implementation.
    - Enrich usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: Initial creation of tonejs-json-sequencer investigation results.

# Notes
- What are the benefits of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git management, easy generation.
  - **Affinity with Web Development**: Direct playback in browser, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple syntax, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Foundation for an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Even MML dialects specific to each system are expected to be easily supported, with individuals creating simple converters using PEG.

- Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
  - **To prioritize development independence and speed**
    - Can focus on MML parser development.
    - Can evolve quickly without being constrained by the dependencies between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes on Consideration
## About Rust Implementation
- **Added Rust + WASM implementation**
  - Available as a Rust library crate.
  - Works in browsers with WASM compilation.
  - 100% compatible with JavaScript implementation.
  - For details, refer to [rust/README.md](rust/README.md).

## Architecture
- `mml2ast`: Parser that converts MML strings to AST.
- `ast`: AST (Abstract Syntax Tree) data structure.
- `ast2json`: Converts AST to Tone.js-compatible JSON.

## Input/Output Definition
- ※Visualize the image with examples.
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - ※Use loosely coupled, thin layers to facilitate changes.
  - json (AST)
  - json (pre-processed)
    - What is processing?
      - Node ID numbering and others.
- Output Example
  - json (post-processed)
    - Format recognized by tonejs-json-sequencer.
    - Details omitted, test cases from TDD serve as specifications.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to the TDD of mml2abc / chord2mml.
- I recall TDD was done using Vitest in this project.
  - I plan to organize the test procedures later.

※README.md is automatically generated from README.ja.md via Gemini translation using GitHub Actions.