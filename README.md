# tonejs-mml-to-json

**`MML` to `Tone.js JSON Sequencer Format` Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/demo-library/"><img src="https://img.shields.io/badge/📚-demo--library-orange.svg" alt="demo-library"></a>
</p>

## Status
- This document contains temporary AI-generated text and may be difficult to read. We plan to revise it for better readability by human hands in the future.

## Demo
- [Live Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html) - Try MML directly in your browser and play music.
- [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) - See examples of library usage.

## Implementation Policy
This project uses **Tree-sitter** to parse MML.
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source of Truth (SSOT).
- Refer to [copilot-instructions.md](copilot-instructions.md) for more details.

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation for generating C language and WASM parsers from Tree-sitter's grammar.js.
  - A design pattern that treats grammar.js as the SSOT.
  - How to support both C generation and WASM generation.
  - Serves as the foundation for this project's Tree-sitter implementation.

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 Library Usage Demo | [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) |
| 🦀 Rust Implementation Details | [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in browsers.
- Create music with simple text and perform it on websites.
- Available as an npm package and via CDN for easy integration into projects.
- A tool specialized in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Usage

## Using as an npm package

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

## Using via CDN

```html
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  await initWasm();
  const json = mml2json('o4 l16 e f g+ a');
  console.log(json);
</script>
```

## API Reference

### `initWasm(): Promise<void>`
Initializes the WASM module. **Must be called before using any conversion functions.**
- **Error**: An exception is thrown if initialization fails.

### `mml2json(mml: string): ToneCommand[]`
Directly converts an MML string to Tone.js JSON format. This is the main conversion function.
- **Return Value**: An array of Tone.js sequencer commands.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed, or if invalid MML syntax / WASM-side conversion errors occur.

### `mml2ast(mml: string): ASTToken[]`
Converts an MML string to an Abstract Syntax Tree (AST).
- **Return Value**: An array of AST tokens.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed, or if a parsing error occurs.

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Converts an Abstract Syntax Tree (AST) to Tone.js JSON format.
- **Return Value**: An array of Tone.js sequencer commands.

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|-------------|---------|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after a note or rest | `c4` `e8` `c16` |
| `.` | Dotted note (multiplies note length by 1.5)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Can specify length and dots like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `oNumber` | Specifies the octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raises the octave by one | `<` |
| `>` | Lowers the octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Sets default note length<br>(Applies to subsequent notes without explicit length) | `l8` `l16` `l4` |
| `tNumber` | Sets tempo (BPM - Beats Per Minute) | `t120` `t140` `t90` |
| `vNumber` | Sets volume (0-127)<br>MIDI volume format | `v100` `v80` `v127` |
| `qNumber` | Gate time (percentage of note length, 0-100)<br>Staccato control<br>100=legato (full length), 95=default (slight gap), 80=staccato (short note) | `q100` `q80` `q60` |

### Timbre Control
| Command | Description | Example |
|---------|-------------|---------|
| `@InstrumentName` | Changes timbre (synthesizer)<br>Uses Tone.js synthesizer class names<br>(See "About Timbre Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|-------------|---------|
| `@PingPongDelay` | Ping Pong Delay effect<br>Creates an echo bouncing between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback Delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds a spacious room ambiance and echo<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates a rich, shimmering tone by duplicating and detuning<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping or swirling sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume fluctuations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds crunch and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Gradually applies vibrato after the note starts<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be connected in series** (e.g., `@Reverb @Chorus @PingPongDelay`).
- **Different types of effects can be combined in any order.**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects apply only to the initial instrument of that track. If the instrument is changed mid-performance, the new instrument will not have the effects connected. Example: In `@PingPongDelay c @FMSynth d`, the note `c` will have ping-pong delay, but the `@FMSynth` note `d` will not.

### Multi-track
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|-------------|---------|
| `'Notes'` | Chord (notes enclosed in single quotes played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (inside quotes), dots outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Chords with accidentals and length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Tempo setting
t120 o4 l8 cdefgab  // Play at 120 BPM

// Tempo change during playback
t120 o4 c d e f t90 g a b <c  // Slow down from "g"

// Volume setting
v100 o4 l8 cdefgab  // Play at volume 100 (0-127)

// Volume change during playback
v127 o4 c d e f v60 g a b <c  // Get softer from "g"

// Combination of tempo and volume
t120 v100 o4 l8 cdefgab  // Set both tempo and volume

// Gate time setting (staccato control)
q100 o4 l8 cdefgab  // 100% gate time - legato (full note length)
q95 o4 l8 cdefgab   // 95% gate time - default (slight gap between notes)
q80 o4 l8 cdefgab   // 80% gate time - staccato (short notes)
q50 o4 l8 cdefgab   // 50% gate time - very short staccato

// Gate time change during playback
q100 o4 c d e f q80 g a b <c  // From smooth notes to staccato at "g"

// Combination of tempo, volume, and gate time
t120 v100 q95 o4 l8 cdefgab  // Set tempo, volume, and gate time

// Instrument change (timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab<c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// Instrument switching within a single track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effects (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping Pong Delay effect

// Effects (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds a spacious room ambiance

// Effects (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering tone

// Passing parameters to effects
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Connecting multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two delays stacked

// Connecting different types of effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multiple effect chain

// Combination of instruments and effects
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effects (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay Vibrato effect - vibrato gradually applies after note starts
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `p` | Pan (position) setting | `p64` `p0` |
| `u` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**:
- The implementation timing and specifications for these commands are currently undecided.
- Specifications may change if they are implemented.
- Breaking changes may occur frequently during the prototyping stage.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside).
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Compatibility with multi-tracks: Some tracks can use chords while others do not.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at exactly the same time as a single chord.

### Comparison Example

```mml
// Multi-track: C, E, and G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, and G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support the diverse synthesizer types of Tone.js in the future.

### Candidate Tone.js Synthesizer Types Available for Future `@` Command

Below are potential Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|----------------------|------------------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic tones |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex tones |
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
  - `@DuoSynth` = Dual-voice synthesis (rich tones)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use `PolySynth` regardless of the specified instrument.

### Usage Examples

```mml
// FM Synth for electric piano sound
@FMSynth o4 l8 cdefgab<c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// MonoSynth for a bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping stage.

- This is a temporary specification to verify Tone.js's default timbre representation.
- It is implemented to allow easy confirmation of each variation.
- Specifications are subject to frequent breaking changes.
- If used in a production environment, it is recommended to fix the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

We aim to enable expression of musical elements available in `tonejs-json-sequencer` through this library's MML. This will allow for the conversion of MML into complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments (Sound Sources) - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|--------------------|-------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bell) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bell, metallic sound) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual-voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not Supported | Sample-based instrument |

### Effects - Compatibility Status

#### Spatial

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Reverb** | ✅ Supported | ⏳ Not Supported | Reverb effect |
| **Freeverb** | ✅ Supported | ⏳ Not Supported | Freeverb algorithm |
| **JCReverb** | ✅ Supported | ⏳ Not Supported | JCReverb algorithm |

#### Modulation

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Chorus** | ✅ Supported | ⏳ Not Supported | Chorus effect |
| **Phaser** | ✅ Supported | ⏳ Not Supported | Phaser effect |
| **Tremolo** | ✅ Supported | ⏳ Not Supported | Tremolo effect |
| **Vibrato** | ✅ Supported | ⏳ Not Supported | Vibrato effect |
| **AutoFilter** | ✅ Supported | ⏳ Not Supported | Auto filter |
| **AutoPanner** | ✅ Supported | ⏳ Not Supported | Auto panner |
| **AutoWah** | ✅ Supported | ⏳ Not Supported | Auto wah |

#### Delay

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **FeedbackDelay** | ✅ Supported | ✅ Supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping pong delay |

#### Distortion

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Distortion** | ✅ Supported | ✅ Supported | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not Supported | Bit crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not Supported | Chebyshev distortion (harmonic generation) |

#### Pitch

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **PitchShift** | ✅ Supported | ⏳ Not Supported | Pitch shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not Supported | Frequency shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **StereoWidener** | ✅ Supported | ⏳ Not Supported | Stereo widener |

### Performance Techniques / Parameter Control - Compatibility Status

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|---------|----------------------|--------------------|---------|
| **Delay Vibrato** | ✅ Supported | ✅ Supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not Supported | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not Supported | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not Supported | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not Supported | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Supported | Portamento effect |

### Source Types - Future Support Plan

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|--------------------|---------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics / Filter - Future Support Plan

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|--------------------|---------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: `@` command directly specifies Tone.js class names (`@Synth`, `@FMSynth`, `@AMSynth`, etc.).
    - Future extension idea: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`).

2.  **Basic Effects**
    - Basic effects like reverb, chorus, delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume/Expression: `v` command
    - Panpot: `p` command
    - Filter control: New commands under consideration.

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions like vibrato, delay vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    - Special instruments like FatOscillator, PulseOscillator.
    - Sample-based instruments using Sampler.

2.  **Dynamics Processing**
    - Mastering effects like Compressor, EQ.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (`rampTo`).
    - Envelope control.

## Implementation Approach

### Basic Policy

1.  **Maintain Compatibility with Existing MML Syntax**
    - Do not break existing implementations.
    - Gradual feature additions.

2.  **Emphasize Simplicity**
    - Do not compromise MML's conciseness.
    - Minimize learning curve.

3.  **Maximize Use of Tone.js Features**
    - Utilize features already implemented in `tonejs-json-sequencer`.
    - Adapt by extending the JSON output format.

### Implementation Approach

1.  **Phased Implementation**
    - Implement high-priority features sequentially.
    - Create prototypes for each feature to gather feedback.

2.  **Test-Driven Development (TDD)**
    - Create test cases for each feature.
    - Conduct regression testing for existing features.

3.  **Documentation Update**
    - Update README and sample code upon completion of implementation.
    - Enhance usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Components JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First edition of tonejs-json-sequencer investigation results created.

# notes
- What are the advantages of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Developer-Friendly**: Code-like notation, Git-manageable, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple grammar, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: Highly reusable, fosters sharing and accumulation of knowledge.
  - **Adaptability to Dialects**: Easily accommodates system-specific MML dialects, with individuals able to create and adapt using PEG for simple conversions.

- Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
  - **To prioritize development independence and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functions.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Memo Under Consideration
## About Rust Implementation
- **Rust + WASM implementation added**
  - Available as a Rust library crate.
  - Works in browsers when compiled to WASM.
  - 100% compatible with JavaScript implementation.
  - For Tree-sitter-based implementation details, see [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md).

## Architecture
- **mml2ast**: Parser that converts MML strings to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json**: Converts AST to Tone.js-compatible JSON.

## Input/Output Definition
- ※Illustrative examples to visualize the concept.
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※Designed as thinly coupled layers to facilitate individual changes.
  - JSON (AST)
  - JSON (pre-processed)
    - What is processing?
      - Node ID assignment, etc.
- Output example
  - JSON (post-processed)
    - Format recognized by `tonejs-json-sequencer`.
    - Details omitted; specific test cases in TDD serve as the definition.
## TDD Policy
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to TDD for `mml2abc` / `chord2mml`.
- I recall using Vitest for TDD in this project.
  - I plan to organize the test procedures later.

※README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.