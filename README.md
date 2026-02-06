# tonejs-mml-to-json

**\`MML\` to \`Tone.js JSON Sequencer Format\` Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/demo-library/"><img src="https://img.shields.io/badge/📚-demo--library-orange.svg" alt="demo-library"></a>
</p>

## Status
- This document contains placeholder AI-generated text and may be difficult to read. We plan to revise it for readability by a human in the future.

## Demo
- [Live Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html) - Try MML directly in your browser and play music.
- [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) - See examples of library usage.

## Implementation Approach
This project uses **Tree-sitter** to parse MML.
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source of Truth (SSOT).
- For more details, refer to [copilot-instructions.md](copilot-instructions.md).

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation for generating a C-language parser and a WASM parser from Tree-sitter's grammar.js.
  - Design pattern that treats grammar.js as SSOT.
  - Method to support both C and WASM generation.
  - Forms the foundation of this project's Tree-sitter implementation.

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 Library Usage Demo | [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Implementation Summary | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| 🦀 Rust Implementation Details | [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format that can be played in a browser.
- Create music with simple text and play it on your website.
- Available as an npm package and via CDN for easy integration into your projects.
- A tool specialized in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

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

## API Reference

### `initWasm(): Promise<void>`
Initializes the WASM module. **Must be called before using any conversion functions.**
- **Error**: An exception is thrown if initialization fails.

### `mml2json(mml: string): ToneCommand[]`
Directly converts an MML string to Tone.js JSON format. This is the main conversion function.
- **Returns**: An array of Tone.js sequencer commands.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed, or if invalid MML syntax / a WASM-side conversion error occurs.

### `mml2ast(mml: string): ASTToken[]`
Converts an MML string into an Abstract Syntax Tree (AST).
- **Returns**: An array of AST tokens.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed, or if an error occurs during parsing.

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Converts an Abstract Syntax Tree (AST) to Tone.js JSON format.
- **Returns**: An array of Tone.js sequencer commands.

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|-------------|---------|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after a note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dots can be specified like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `oNumber` | Specifies the octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raises the octave by one | `<` |
| `>` | Lowers the octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Sets the default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |
| `tNumber` | Sets the tempo (BPM - Beats Per Minute) | `t120` `t140` `t90` |
| `vNumber` | Sets the volume (0-127)<br>MIDI volume format | `v100` `v80` `v127` |
| `qNumber` | Gate time (percentage of note length, 0-100)<br>Staccato control<br>100=legato (full length), 95=default (slight gap), 80=staccato (short note) | `q100` `q80` `q60` |

### Timbre Control
| Command | Description | Example |
|---------|-------------|---------|
| `@InstrumentName` | Changes the timbre (synthesizer)<br>Uses Tone.js synthesizer class names<br>(See "About Timbre Specifications" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|-------------|---------|
| `@PingPongDelay` | Ping Pong Delay effect<br>Creates echoes bouncing between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback Delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds spatial room ambiance and echo<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates a rich, shimmering tone through replication and pitch variation<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping or swirling sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume variations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Gradually applies vibrato after a note starts<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`).
- **Different types of effects can be combined in any order.**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects are applied only to the initial instrument of that track. If the instrument changes midway through playback, the new instrument will not have the effects connected. For example: in `@PingPongDelay c @FMSynth d`, the note `c` will have ping pong delay, but the note `d` from `@FMSynth` will not.

### Multi-track
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|-------------|---------|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length is after the first note (inside quotes), dot is outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Tempo setting
t120 o4 l8 cdefgab  // Play at 120 BPM

// Tempo change during playback
t120 o4 c d e f t90 g a b <c  // Slow down from "g"

// Volume setting
v100 o4 l8 cdefgab  // Play at volume 100 (0-127)

// Volume change during playback
v127 o4 c d e f v60 g a b <c  // Lower volume from "g"

// Combination of tempo and volume
t120 v100 o4 l8 cdefgab  // Set both tempo and volume

// Gate time setting (staccato control)
q100 o4 l8 cdefgab  // 100% gate time - legato (full note length)
q95 o4 l8 cdefgab   // 95% gate time - default (slight gap between notes)
q80 o4 l8 cdefgab   // 80% gate time - staccato (short notes)
q50 o4 l8 cdefgab   // 50% gate time - very short staccato

// Gate time change during playback
q100 o4 c d e f q80 g a b <c  // Smooth notes, then staccato from "g"

// Combination of tempo, volume, and gate time
t120 v100 q95 o4 l8 cdefgab  // Set tempo, volume, and gate time

// Instrument change (timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab<c  // FMSynth - electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - guitar sound

// Instrument switching within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effects (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping pong delay effect

// Effects (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds spatial room ambiance

// Effects (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering tone

// Passing parameters to effects
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Chaining multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two delays stacked

// Chaining different types of effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multi-type effect chain

// Combining instruments and effects
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effects (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay vibrato effect - vibrato gradually applies after note starts
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `p` | Pan (position) setting | `p64` `p0` |
| `u` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timing and specifications of these commands are undecided.
- If implemented, specifications may change.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = Dotted quarter note C-E-G chord (length inside quotes, dot outside)
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Multi-track compatibility: Chords can be used in some tracks and not others.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks that play different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes that are played together at the exact same time as a single chord.

### Comparison Example

```mml
// Multi-track: C, E, and G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, and G are played together as a single chord
'ceg'
```

## About Timbre Specifications (`@` command)

The current `@` command implements basic timbre switching, but it is planned to support the diverse synthesizer types of Tone.js in the future.

### Candidate Tone.js Synthesizer Types Available

The following are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Features | Suitable Timbre |
|--------|----------|-----------------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic tones |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric pianos, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex tones |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitars, harps, kotos, plucked sounds |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command directly uses Tone.js class names:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, leads)
  - `@PluckSynth` = Plucked instruments (guitars, harps)
  - `@MembraneSynth` = Drums, percussion
  - `@MetalSynth` = Cymbals, metallic percussion
  - `@DuoSynth` = Dual-voice synthesis (rich tones)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Usage Examples

```mml
// FMSynth for electric piano sound
@FMSynth o4 l8 cdefgab<c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// MonoSynth for a bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Regarding Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre representation.
- It is implemented to allow easy checking of each variation.
- Specifications may change frequently and in a breaking manner.
- If using in a production environment, it is recommended to pin the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

We aim to enable expression of musical elements available in `tonejs-json-sequencer` within this library's MML. This will allow for the conversion from MML to complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|--------------------|-------|
| **Synth** | ✅ Implemented | ✅ Implemented | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@DuoSynth` (dual-voice) |
| **PluckSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@PluckSynth` (plucked instruments) |
| **MembraneSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Implemented | ✅ Implemented | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Implemented | ⏳ Not Implemented | Noise-based timbre |
| **PolySynth** | ✅ Implemented | ✅ Implemented | Automatically used for chord functionality |
| **Sampler** | ✅ Implemented | ⏳ Not Implemented | Sample-based instrument |

### Effects - Compatibility Status

#### Spatial Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Reverb** | ✅ Implemented | ⏳ Not Implemented | Reverb effect |
| **Freeverb** | ✅ Implemented | ⏳ Not Implemented | Freeverb algorithm |
| **JCReverb** | ✅ Implemented | ⏳ Not Implemented | JCReverb algorithm |

#### Modulation Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Chorus** | ✅ Implemented | ⏳ Not Implemented | Chorus effect |
| **Phaser** | ✅ Implemented | ⏳ Not Implemented | Phaser effect |
| **Tremolo** | ✅ Implemented | ⏳ Not Implemented | Tremolo effect |
| **Vibrato** | ✅ Implemented | ⏳ Not Implemented | Vibrato effect |
| **AutoFilter** | ✅ Implemented | ⏳ Not Implemented | Auto filter |
| **AutoPanner** | ✅ Implemented | ⏳ Not Implemented | Auto panner |
| **AutoWah** | ✅ Implemented | ⏳ Not Implemented | Auto wah |

#### Delay Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **FeedbackDelay** | ✅ Implemented | ⏳ Not Implemented | Feedback delay |
| **PingPongDelay** | ✅ Implemented | ✅ Implemented | Ping pong delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **Distortion** | ✅ Implemented | ⏳ Not Implemented | Distortion |
| **BitCrusher** | ✅ Implemented | ⏳ Not Implemented | Bit crusher |
| **Chebyshev** | ✅ Implemented | ⏳ Not Implemented | Chebyshev distortion (harmonic generation) |

#### Pitch Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **PitchShift** | ✅ Implemented | ⏳ Not Implemented | Pitch shift |
| **FrequencyShifter** | ✅ Implemented | ⏳ Not Implemented | Frequency shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|--------------------|---------|
| **StereoWidener** | ✅ Implemented | ⏳ Not Implemented | Stereo widener |

### Performance and Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|---------|----------------------|--------------------|---------|
| **Delay Vibrato** | ✅ Implemented | ⏳ Not Implemented | Delayed vibrato effect |
| **depth.rampTo** | ✅ Implemented | ⏳ Not Implemented | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not Implemented | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not Implemented | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not Implemented | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Implemented | Portamento effect |

### Source Types - Future Plans

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|--------------------|---------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Implemented | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Implemented | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Plans

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|--------------------|---------|
| **Compressor** | 🚧 Planned | ⏳ Not Implemented | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Implemented | 3-band equalizer |

## Implementation Priorities and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: `@` command directly specifies Tone.js class names (e.g., `@Synth`, `@FMSynth`, `@AMSynth`).
    - Future extension idea: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`).

2.  **Basic Effects**
    - Basic effects like Reverb, Chorus, Delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume/Expression: `v` command.
    - Pan: `p` command.
    - Filter control: New commands under consideration.

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions like Vibrato, Delay Vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    - Special instruments like FatOscillator, PulseOscillator.
    - Sample-based instruments using Sampler.

2.  **Dynamics Processing**
    - Mastering-related effects like Compressor, EQ.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (`rampTo`).
    - Envelope control.

## Implementation Approach

### Basic Policy

1.  **Maintain compatibility with existing MML syntax.**
    - Do not break existing implementations.
    - Gradual feature additions.

2.  **Emphasize simplicity.**
    - Do not compromise the conciseness of MML.
    - Minimize learning curve.

3.  **Maximize utilization of Tone.js features.**
    - Leverage features already implemented in `tonejs-json-sequencer`.
    - Adapt through extensions to the JSON output format.

### Implementation Strategy

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
- [Tone.js Components JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Change Log

- 2026-01-12: First draft of tonejs-json-sequencer investigation results created.

# notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer Friendliness**: Code-like notation, Git-manageable, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: Highly reusable, facilitates sharing and accumulation of knowledge.
  - **Adaptability to Dialects**: Easily supports system-specific MML dialects, with easy conversion for each using PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize independent development and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by the dependency relationship between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Notes Under Consideration
## About Rust Implementation
- **Rust + WASM implementation added.**
  - Available as a Rust library crate.
  - Operates in browsers via WASM compilation.
  - 100% compatible with the JavaScript implementation.
  - Detailed Tree-sitter-based implementation information can be found in [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md).

## Architecture
- **mml2ast**: Parser that converts an MML string to an AST.
- **ast**: Data structure for the Abstract Syntax Tree (AST).
- **ast2json**: Converts an AST to Tone.js compatible JSON.

## Input/Output Definition
- ※Illustrative examples for visualization
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※Using loosely coupled layers for easy modification
  - JSON (AST)
  - JSON (pre-processed)
    - What is processing?
      - NodeId numbering and other tasks
- Output example
  - JSON (post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; test cases in TDD serve as the detailed specification.
## TDD Approach
- The test targets are `mml2ast`, `ast2ast`, and `ast2json` respectively.
  - Refer to TDD for `mml2abc` / `chord2mml`.
- I recall using vitest for TDD in this project.
  - I plan to organize the test procedures later.

※README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.