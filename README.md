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
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source Of Truth (SSOT).
- See [copilot-instructions.md](copilot-instructions.md) for details.

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation for generating C language and WASM parsers from Tree-sitter's grammar.js.
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
- Available as an npm package and via CDN for easy integration into your projects.
- A specialized tool for music conversion, with actual playback handled by a separate project (`tonejs-json-sequencer`).

# Usage

## As an npm package

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
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after a note or rest | `c4` `e8` `c16` |
| `.` | Dot (multiplies note length by 1.5)<br>Can be specified multiple times (`..`=1.75 times) | `c4.` `e8..` |
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

### Effects
| Command | Description | Example |
|---------|------|-----|
| `@PingPongDelay` | Ping Pong Delay effect<br>Connected between instrument and output<br>Multiple specifications connect in series<br>Parameters can be specified as arguments | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n"}` |
| `@DelayVibrato` | Delayed Vibrato effect<br>Vibrato that gradually increases after note starts<br>Currently uses hardcoded parameters (frequency=7, depth ramps from 0 to 0.2) | `@DelayVibrato` |

**Note:** Effects must be specified before the first note in a track and apply only to the initial instrument of that track. If the instrument changes midway through playback, the effect will not be connected to the new instrument. For example, in `@PingPongDelay c @FMSynth d`, the note `c` will have ping-pong delay, but the `@FMSynth` note `d` will not.

### Multitrack
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length is after the first note (within quotes), dot is outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### Usage Examples
```mml
// Basic Scale
o4 l16 cdefgab

// Scale with Accidentals
o4 l16 c c+ d d+ e f f+ g g+ a a+ b

// Dotted Notes and Rhythm
o4 l8 c4. d e8. f16 g4

// Octave Change
o4 c d e < f g a > b < c

// Multitrack (separate parts)
o4 l8 ceg;dfb;ace

// Chord (notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mix of single notes and chords
o4 c 'eg' d 'fac' e

// Chord including accidentals and length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Instrument Change (Timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab<c  // FMSynth - electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - guitar sound

// Instrument switching within a single track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effect (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping Pong Delay effect

// Passing parameters to an effect
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time

// Connecting multiple effects in series
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Stack two delays

// Combination of instrument and effect
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay

// Effect (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delayed Vibrato effect - vibrato gradually increases after note starts
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delayed Vibrato
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (ratio of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repeat) | `[cde]4` |

**⚠️ Important Note**: 
- The implementation timeline and specifications for these commands are undecided.
- If implemented, specifications may change.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside).
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Compatibility with multitrack: Possible to use chords in some tracks and not others.
- **Difference from Multitrack**:
  - Multitrack (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at the exact same timing.

### Comparison Example

```mml
// Multitrack: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support a wider variety of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types for Future Use

Below are Tone.js synthesizer types that may be specifiable with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked strings |
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
  - `@DuoSynth` = Dual-voice synthesis (rich sound)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Usage Example

```mml
// FMSynth for electric piano sound
@FMSynth o4 l8 cdefgab<c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// MonoSynth for bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Potential for Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre expressions.
- It's implemented to allow simple verification of each variation.
- Specifications are subject to frequent breaking changes.
- If using in a production environment, it is recommended to fix the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

The goal is to enable the expression of musical elements possible with `tonejs-json-sequencer` also in this library's MML. This will allow for the conversion of MML into a complete musical expression.

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
| **NoiseSynth** | ✅ Supported | ⏳ Not yet | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not yet | Sample-based sound source |

### Effects - Compatibility Status

#### Spatial

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ Supported | ⏳ Not yet | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not yet | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not yet | JCReverb algorithm |

#### Modulation

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ Supported | ⏳ Not yet | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not yet | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not yet | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not yet | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not yet | Auto Filter |
| **AutoPanner** | ✅ Supported | ⏳ Not yet | Auto Panner |
| **AutoWah** | ✅ Supported | ⏳ Not yet | Auto Wah |

#### Delay

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not yet | Feedback delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping Pong Delay |

#### Distortion

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not yet | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not yet | Bit Crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not yet | Chebyshev distortion (harmonic generation) |

#### Pitch

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not yet | Pitch Shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not yet | Frequency Shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not yet | Stereo Widener |

### Performance and Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delay Vibrato** | ✅ Supported | ⏳ Not yet | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not yet | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not yet | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not yet | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not yet | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not yet | Portamento effect |

### Sound Source Types (Future Support)

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not yet | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not yet | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter (Future Support)

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not yet | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not yet | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Early Implementation Planned)

1.  **Instrument Extension**
    - Currently implemented: Direct specification of Tone.js class names with `@` command (`@Synth`, `@FMSynth`, `@AMSynth`, etc.)
    - Future extension proposal: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2.  **Basic Effects**
    - Basic effects like Reverb, Chorus, Delay
    - MML command ideas: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume (Volume/Expression): `v` command
    - Pan (Panpot): `p` command
    - Filter control: New command under consideration

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions like vibrato, delayed vibrato

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter

### Low Priority (Under Consideration)

1.  **Advanced Sound Sources**
    - Special sound sources like FatOscillator, PulseOscillator
    - Sample-based sound sources using Sampler

2.  **Dynamics Processing**
    - Mastering effects like Compressor, EQ

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (rampTo)
    - Envelope control

## Implementation Approach

### Basic Policy

1.  **Maintain compatibility with existing MML syntax**
    - Do not break existing implementations
    - Gradual feature additions

2.  **Emphasize simplicity**
    - Do not compromise MML's conciseness
    - Minimize learning curve

3.  **Maximize utilization of Tone.js features**
    - Leverage features already implemented in tonejs-json-sequencer
    - Adapt through extension of the JSON output format

### Implementation Approach

1.  **Phased Implementation**
    - Implement high-priority features sequentially
    - Create prototypes for each feature to gather feedback

2.  **Test-Driven Development (TDD)**
    - Create test cases for each feature
    - Perform regression tests for existing features

3.  **Documentation Updates**
    - Update README and sample code upon completion of implementation
    - Enrich usage examples

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First draft of tonejs-json-sequencer investigation results created.

# Notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git-manageable, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: Highly reusable, fosters sharing and accumulation of knowledge.
  - **Adaptability to Dialects**: Easy to create PEG parsers for system-specific MML dialects for simple conversion.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize independent development and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes under consideration
## About Rust Implementation
- **Added Rust + WASM implementation**
  - Available as a Rust library crate
  - Works in browsers via WASM compilation
  - 100% compatible with JavaScript implementation
  - See [rust/README.md](rust/README.md) for details

## Architecture
- **mml2ast**: Parser that converts MML strings to AST
- **ast**: AST (Abstract Syntax Tree) data structure
- **ast2json**: Converts AST to Tone.js compatible JSON

## Input/Output Definition
- ※Example to visualize the image
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※Loosely coupled layers to facilitate individual changes
  - json (AST)
  - json (pre-processing)
    - What is processing?
      - Node ID assignment, etc.
- Output example
  - json (post-processing)
    - Format recognized by tonejs-json-sequencer
    - Details are omitted and defined by TDD test cases

## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project used TDD with vitest.
  - I plan to organize the testing procedures later.

※ `README.md` is automatically generated via GitHub Actions using Gemini's translation based on `README.ja.md`.