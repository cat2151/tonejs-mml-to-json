# tonejs-mml-to-json

**`MML` to `Tone.js JSON Sequencer Format` Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Status
- This document contains hastily AI-generated text and may be difficult to read. We plan to revise it for better readability by human hands in the future.

## Implementation Approach
This project uses **Tree-sitter** to parse MML.
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source of Truth (SSOT)
- See [copilot-instructions.md](copilot-instructions.md) for details

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation for generating C language and WASM parsers from Tree-sitter's grammar.js
  - Design pattern that treats grammar.js as SSOT
  - How to support both C generation and WASM generation
  - This forms the basis of this project's Tree-sitter implementation

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Implementation Summary | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| 🦀 Rust Implementation Details | [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music with simple text and perform it on a website.
- Available as an npm package and via CDN, making integration into your project easy.
- A specialized tool for music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

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
- **Errors**: Throws an exception if initialization fails.

### `mml2json(mml: string): ToneCommand[]`
Directly converts an MML string to Tone.js JSON format. This is the main conversion function.
- **Returns**: An array of Tone.js sequencer commands.
- **Errors**: Throws an `Error` exception if `initWasm()` has not been called, or if invalid MML syntax or a WASM-side conversion error occurs.

### `mml2ast(mml: string): ASTToken[]`
Converts an MML string into an Abstract Syntax Tree (AST).
- **Returns**: An array of AST tokens.
- **Errors**: Throws an `Error` exception if `initWasm()` has not been called, or if an error occurs during parsing.

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Converts an Abstract Syntax Tree (AST) into Tone.js JSON format.
- **Returns**: An array of Tone.js sequencer commands.

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|------|-----|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dotted note (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dots can be specified like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specifies the octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raises the octave by one | `<` |
| `>` | Lowers the octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Set default note length<br>_(Applied if length is not specified for subsequent notes)_ | `l8` `l16` `l4` |
| `tNumber` | Set tempo (BPM - Beats Per Minute) | `t120` `t140` `t90` |
| `vNumber` | Set volume (0-127)<br>_MIDI volume format_ | `v100` `v80` `v127` |
| `qNumber` | Gate time (percentage of note length, 0-100)<br>_Controls staccato<br>100=legato (full duration), 95=default (slight gap), 80=staccato (short)_ | `q100` `q80` `q60` |
|---------|------|-----|
| `lNumber` | Sets the default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |
| `tNumber` | Sets the tempo (BPM - Beats Per Minute) | `t120` `t140` `t90` |
| `vNumber` | Sets the volume (0-127)<br>MIDI volume format | `v100` `v80` `v127` |

### Timbre Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Changes the timbre (synthesizer)<br>Uses Tone.js synth class names<br>(See "Timbre Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|------|-----|
| `@PingPongDelay` | Ping-pong delay effect<br>Creates echoes bouncing between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds spatial room ambiance and echoes<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates rich, shimmering tones through duplication and pitch variation<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping and undulating sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume fluctuations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Vibrato gradually applies after a note starts<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`)
- **Different types of effects can be combined in any order**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects are only applied to the initial instrument of that track. If the instrument changes mid-playback, effects will not be connected to the new instrument. For example: in `@PingPongDelay c @FMSynth d`, note `c` will have a ping-pong delay, but note `d` played by `@FMSynth` will not.

### Multi-track
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length is after the first note (inside quotes), dots are outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### Usage Examples
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

// Mix of single notes and chords
o4 c 'eg' d 'fac' e

// Chords with accidentals and length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Tempo setting
t120 o4 l8 cdefgab  // Play at 120 BPM

// Tempo change during playback
t120 o4 c d e f t90 g a b <c  // Slows down from "g"

// Volume setting
v100 o4 l8 cdefgab  // Play at volume 100 (0-127)

// Volume change during playback
v127 o4 c d e f v60 g a b <c  // Quieter from "g"

// Combination of tempo and volume
t120 v100 o4 l8 cdefgab  // Sets both tempo and volume

// Gate Time Setting (Staccato Control)
q100 o4 l8 cdefgab  // 100% gate time - legato (full duration)
q95 o4 l8 cdefgab   // 95% gate time - default (slight gap between notes)
q80 o4 l8 cdefgab   // 80% gate time - staccato (shorter notes)
q50 o4 l8 cdefgab   // 50% gate time - very short staccato

// Changing Gate Time Mid-Performance
q100 o4 c d e f q80 g a b <c  // Smooth notes, then staccato at "g"

// Combining Tempo, Volume, and Gate Time
t120 v100 q95 o4 l8 cdefgab  // Set tempo, volume, and gate time

// Instrument Change (Timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab<c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// Instrument switching within a single track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effect (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping-pong delay effect

// Effect (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds spatial room ambiance

// Effect (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering tones

// Passing parameters to an effect
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // Eighth note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Connecting multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Stacking two delays

// Connecting different types of effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multiple effect chain

// Instrument and effect combination
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping-pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effect (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay Vibrato effect - vibrato gradually applies after note starts
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `&` `^` | Tie (combines notes of the same pitch) | `c4&c4` `c4^c4` |
| `p` | Pan (position) setting | `p64` `p0` |
| `u` | Velocity (attack strength) | `u120` |
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
  - Support for length and dots: `'c4eg'.` = Dotted quarter note C-E-G chord (length inside quotes, dot outside quotes)
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Compatibility with multi-track: Possible to use chords in some tracks and not in others.
- **Difference from multi-track**:
  - Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at the exact same time.

### Comparison Example

```mml
// Multi-track: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support a wider variety of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are potential Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic timbres |
| `AMSynth` | Amplitude Modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency Modulation synthesis<br>Two oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like sounds |
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
  - `@DuoSynth` = Dual-voice synthesis (rich timbres)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Usage Example

```mml
// Electric piano sound with FMSynth
@FMSynth o4 l8 cdefgab<c

// Switching instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Bassline with MonoSynth
@MonoSynth o3 l8 c c c c d d d d
```

### Regarding Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a temporary specification for validating Tone.js's default timbre expressions.
- It is implemented to allow easy checking of each variation.
- Specifications may frequently undergo breaking changes.
- If used in a production environment, it is recommended to pin the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility status with this library (tonejs-mml-to-json).

## Purpose of Investigation

Our goal is to enable the expression of musical elements available in tonejs-json-sequencer within this library's MML. This will allow for the conversion of MML into complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Notes |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual-voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not yet supported | Noise-based timbre |
| **PolySynth** | ✅ Supported | ✅ Supported | Automatically used for chord functionality |
| **Sampler** | ✅ Supported | ⏳ Not yet supported | Sample-based instrument |

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
| **AutoFilter** | ✅ Supported | ⏳ Not yet supported | Auto Filter |
| **AutoPanner** | ✅ Supported | ⏳ Not yet supported | Auto Panner |
| **AutoWah** | ✅ Supported | ⏳ Not yet supported | Auto Wah |

#### Delay Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not yet supported | Feedback Delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping-Pong Delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not yet supported | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not yet supported | Bit Crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not yet supported | Chebyshev Distortion (harmonic generation) |

#### Pitch Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not yet supported | Pitch Shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not yet supported | Frequency Shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not yet supported | Stereo Widener |

### Performance & Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delayed Vibrato** | ✅ Supported | ⏳ Not yet supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not yet supported | Gradual parameter changes |
| **Panpot change** | 🚧 Planned | ⏳ Not yet supported | Real-time pan (position) changes |
| **Expression change** | 🚧 Planned | ⏳ Not yet supported | Real-time volume (expression) changes |
| **LPF change** | 🚧 Planned | ⏳ Not yet supported | Real-time low-pass filter (LPF) changes |
| **Portamento** | 🚧 Planned | ⏳ Not yet supported | Portamento effect |

### Source Types - Future Support Planned

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not yet supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not yet supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Support Planned

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not yet supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not yet supported | 3-band Equalizer |

## Implementation Priorities and Plan

### High Priority (Planned for Early Implementation)

1. **Instrument Expansion**
   - Currently implemented: `@` command directly specifies Tone.js class names (e.g., `@Synth`, `@FMSynth`, `@AMSynth`)
   - Future expansion idea: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2. **Basic Effects**
   - Basic effects like Reverb, Chorus, Delay
   - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3. **Parameter Control**
   - Volume/Expression: `v` command
   - Panpot: `p` command
   - Filter control: New command under consideration

### Medium Priority

1. **Advanced Effects**
   - Phaser, Tremolo, AutoFilter, AutoWah, etc.
   - Performance expressions like Vibrato, Delay Vibrato

2. **Distortion Effects**
   - Distortion, BitCrusher, Chebyshev

3. **Pitch Effects**
   - PitchShift, FrequencyShifter

### Low Priority (Under Consideration)

1. **Advanced Instruments**
   - Specialized instruments like FatOscillator, PulseOscillator
   - Sample-based instruments using Sampler

2. **Dynamics Processing**
   - Mastering-style effects like Compressor, EQ

3. **Real-time Parameter Changes**
   - Gradual parameter changes (rampTo)
   - Envelope control

## Implementation Approach

### Basic Policy

1. **Maintain compatibility with existing MML syntax**
   - Avoid breaking existing implementations
   - Phased feature addition

2. **Emphasis on Simplicity**
   - Preserve MML's conciseness
   - Minimize learning curve

3. **Maximize Tone.js functionality**
   - Leverage features already implemented in tonejs-json-sequencer
   - Support through expansion of JSON output format

### Implementation Approach

1. **Phased Implementation**
   - Implement high-priority features first
   - Create prototypes for each feature to gather feedback

2. **Test-Driven Development**
   - Create test cases for each feature
   - Also conduct regression tests for existing features

3. **Documentation Updates**
   - Update README and sample code upon implementation completion
   - Enrich usage examples

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: Initial creation of tonejs-json-sequencer investigation results

# Notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git management, easy generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, allows for incremental learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Foundation for an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Easily adaptable to system-specific MML dialects with simple conversion, making it easy for individuals to create with PEG.

- Why are tonejs-json-sequencer and tonejs-mml-to-json separate projects?
  - **To prioritize development independence and speed.**
    - Allows focus on MML parser development.
    - Enables rapid evolution without being constrained by the dependency between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Notes under consideration
## About Rust Implementation
- **Rust + WASM implementation added**
  - Available as a Rust library crate
  - Works in browsers via WASM compilation
  - 100% compatible with JavaScript implementation
  - See [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) for Tree-sitter-based implementation details

## Architecture
- **mml2ast**: Parser that converts an MML string to an AST
- **ast**: AST (Abstract Syntax Tree) data structure
- **ast2json**: Converts AST to Tone.js-compatible JSON

## Input/Output Definitions
- ※ Visualize the image by providing examples
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※ Use loosely coupled, thin layers to facilitate changes to each.
  - JSON (AST)
  - JSON (pre-processed)
    - What is "processing"?
      - Node ID assignment, etc.
- Output example
  - JSON (post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; TDD test cases will serve as the detailed specification.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project used Vitest for TDD.
  - I plan to organize the test procedures later.

※ README.md is automatically generated from README.ja.md via Gemini translation in GitHub Actions.