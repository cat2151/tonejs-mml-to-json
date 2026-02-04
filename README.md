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
- For details, please refer to [copilot-instructions.md](copilot-instructions.md).

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An implementation example for generating C language and WASM parsers from Tree-sitter's grammar.js.
  - Design pattern that treats grammar.js as SSOT.
  - Method to support both C and WASM generation.
  - Forms the foundation of this project's Tree-sitter implementation.

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📖 Call Graph | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 Implementation Summary | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| 🦀 Rust Implementation Details | [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in browsers.
- Create music with simple text and perform it on your website.
- Available as an npm package and via CDN, making it easy to integrate into projects.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

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
- **Error**: Throws an exception if initialization fails.

### `mml2json(mml: string): ToneCommand[]`
Directly converts an MML string to Tone.js JSON format. This is the main conversion function.
- **Return Value**: An array of Tone.js sequencer commands.
- **Error**: Throws an `Error` exception if `initWasm()` has not been executed, or if invalid MML syntax / a conversion error occurs on the WASM side.

### `mml2ast(mml: string): ASTToken[]`
Converts an MML string to an Abstract Syntax Tree (AST).
- **Return Value**: An array of AST tokens.
- **Error**: Throws an `Error` exception if `initWasm()` has not been executed, or if a parsing error occurs.

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Converts an Abstract Syntax Tree (AST) to Tone.js JSON format.
- **Return Value**: An array of Tone.js sequencer commands.

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|-------------|---------|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>_Place immediately after the note (not before)_ | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>_Place immediately after the note or rest_ | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>_Can be specified consecutively (`..`=1.75 times)_ | `c4.` `e8..` |
| `r` | Rest<br>_Length and dot can be specified like notes_ | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `oNumber` | Specify octave (Default: `o4`) | `o4` `o5` `o3` |
| `<` | Increase octave by one | `<` |
| `>` | Decrease octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Set default note length<br>_(Applied if length is not specified for subsequent notes)_ | `l8` `l16` `l4` |
| `tNumber` `TNumber` | Set tempo (BPM - Beats Per Minute)<br>_Both lowercase `t` and uppercase `T` are supported_ | `t120` `T140` `t90` |
| `vNumber` `VNumber` | Set volume (0-127)<br>_MIDI volume format, both lowercase `v` and uppercase `V` are supported_ | `v100` `V80` `v127` |
| `qNumber` `QNumber` | Gate time (percentage of note length, 0-100)<br>_Controls staccato, both lowercase `q` and uppercase `Q` are supported<br>100=legato (full duration), 95=default (slight gap), 80=staccato (short)_ | `q100` `Q80` `q60` |

### Instrument Control
| Command | Description | Example |
|---------|-------------|---------|
| `@InstrumentName` | Change instrument (synthesizer)<br>_Uses Tone.js synth class names (see "About Instrument Specifications" below for details)_ | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|-------------|---------|
| `@PingPongDelay` | Ping Pong Delay effect<br>Creates echoes that bounce between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback Delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds spatial room ambiance and echo<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates rich, shimmering tones through duplication and pitch variation<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping or swirling sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume variations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Gradually applies vibrato after the start of a note<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`).
- **Different types of effects can be combined in any order.**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects are only applied to the initial instrument of that track. If the instrument changes mid-performance, the new instrument will not have the effects connected. Example: In `@PingPongDelay c @FMSynth d`, the note `c` will have ping-pong delay, but the `d` note from `@FMSynth` will not.

### Multitrack
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|-------------|---------|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>_Length after the first note (within quotes), dot outside quotes_ | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Multitrack (Separate Parts)
o4 l8 ceg;dfb;ace

// Chords (Notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mix of Single Notes and Chords
o4 c 'eg' d 'fac' e

// Chords with Accidentals and Length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Tempo Setting
t120 o4 l8 cdefgab  // Play at 120 BPM
T140 o4 l8 cdefgab  // Play at 140 BPM (uppercase T also works)

// Changing Tempo Mid-Performance
t120 o4 c d e f t90 g a b <c  // Slow down at "g"

// Volume Setting
v100 o4 l8 cdefgab  // Play at volume 100 (out of 127)
V80 o4 l8 cdefgab   // Play at volume 80 (uppercase V also works)

// Changing Volume Mid-Performance
v127 o4 c d e f v60 g a b <c  // Quieter at "g"

// Combining Tempo and Volume
t120 v100 o4 l8 cdefgab  // Set both tempo and volume

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

// Different Instrument Types
@FMSynth o4 l8 cdefgab<c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// Switching instruments within a single track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effect (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping Pong Delay effect

// Effect (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - Adds spatial room ambiance

// Effect (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - Rich, shimmering tone

// Passing parameters to effects
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Chaining multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two delays stacked

// Chaining different types of effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multiple effect chain

// Combining instruments and effects
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effect (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay Vibrato effect - Vibrato gradually applied after note start
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `&` `^` | Tie (combines notes of the same pitch) | `c4&c4` `c4^c4` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack intensity) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timing and specifications for these commands are undecided.
- Specifications may change if implemented.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as a chord.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = C-E-G chord as a dotted quarter note (length inside quotes, dot outside).
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Compatibility with multitracks: Possible to use chords in some tracks and not in others.
- **Difference from Multitrack**:
  - Multitrack (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at exactly the same time.

### Comparison Example

```mml
// Multitrack: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Instrument Specification (`@` Command)

The current `@` command implements basic instrument switching, but it is planned to support the diverse synthesizer types in Tone.js in the future.

### Candidate Tone.js Synthesizer Types Available

Below are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Features | Suitable Sound |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic tones |
| `AMSynth` | Amplitude Modulation synthesis<br>Two oscillators modulating amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency Modulation synthesis<br>Two oscillators modulating frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth style |
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

### Potential Specification Changes

⚠️ **Important**: The instrument specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre expressions.
- It's implemented to allow easy confirmation of each variation.
- Specifications may frequently undergo breaking changes.
- If used in a production environment, it is recommended to fix the version.
- Please share feedback and requests via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility with this library (tonejs-mml-to-json).

## Purpose of Investigation

The goal is to enable the expression of music elements that can be represented by `tonejs-json-sequencer` using this library's MML. This will allow for the conversion from MML to a complete musical expression.

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
| **Sampler** | ✅ Supported | ⏳ Not yet | Sample-based instrument |

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
| **AutoFilter** | ✅ Supported | ⏳ Not yet | Auto filter |
| **AutoPanner** | ✅ Supported | ⏳ Not yet | Auto panner |
| **AutoWah** | ✅ Supported | ⏳ Not yet | Auto wah |

#### Delay

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ Supported | ⏳ Not yet | Feedback delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping Pong delay |

#### Distortion

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ⏳ Not yet | Distortion |
| **BitCrusher** | ✅ Supported | ⏳ Not yet | Bit crusher |
| **Chebyshev** | ✅ Supported | ⏳ Not yet | Chebyshev distortion (harmonic generation) |

#### Pitch

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ Supported | ⏳ Not yet | Pitch shift |
| **FrequencyShifter** | ✅ Supported | ⏳ Not yet | Frequency shifter |

#### Stereo Processing

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ Supported | ⏳ Not yet | Stereo widener |

### Performance and Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delay Vibrato** | ✅ Supported | ⏳ Not yet | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not yet | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not yet | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not yet | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not yet | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not yet | Portamento effect |

### Source Types - Future Support Planned

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not yet | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not yet | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Support Planned

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not yet | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not yet | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: Directly specify Tone.js class names with the `@` command (`@Synth`, `@FMSynth`, `@AMSynth`, etc.)
    - Future extension idea: Support abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2.  **Basic Effects**
    - Basic effects like reverb, chorus, delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume (Volume/Expression): `v` command.
    - Pan (Panpot): `p` command.
    - Filter control: New command under consideration.

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions like vibrato, delay vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Sound Sources**
    - Special sound sources like FatOscillator, PulseOscillator.
    - Sample-based instruments using Sampler.

2.  **Dynamics Processing**
    - Mastering effects like Compressor, EQ.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (rampTo).
    - Envelope control.

## Implementation Approach

### Basic Policy

1.  **Maintain Compatibility with Existing MML Syntax**
    - Do not break existing implementations.
    - Incremental feature additions.

2.  **Emphasis on Simplicity**
    - Do not compromise MML's conciseness.
    - Minimize learning curve.

3.  **Maximize Tone.js Capabilities**
    - Leverage features already implemented in `tonejs-json-sequencer`.
    - Support through extension of JSON output format.

### Implementation Method

1.  **Phased Implementation**
    - Implement high-priority features sequentially.
    - Create prototypes for each feature and gather feedback.

2.  **Test-Driven Development (TDD)**
    - Create test cases for each feature.
    - Conduct regression testing for existing features.

3.  **Documentation Updates**
    - Update README and sample code upon completion of implementation.
    - Enhance usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Components JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: Initial creation of `tonejs-json-sequencer` investigation results.

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git manageable, easy to generate.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, progressive learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Easily adaptable to system-specific MML dialects, with easy conversion via PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Emphasis on Independent Development and Speed**
    - Allows focus on MML parser development.
    - Enables rapid evolution without being constrained by the dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Under Consideration Notes
## About Rust Implementation
- **Added Rust + WASM implementation**
  - Available as a Rust library crate.
  - Works in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - Detailed Tree-sitter-based implementation in [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md).

## Architecture
- **mml2ast**: Parser that converts MML strings to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json**: Converts AST to Tone.js-compatible JSON.

## Input/Output Definition
- *Example visualization for better understanding*
- Input example
  - `o4 l16 e`
- Intermediate format example
  - *Keep layers loosely coupled for easy modification*
  - json (AST)
  - json (pre-processing)
    - What is processing?
      - Node ID numbering, etc.
- Output example
  - json (post-processing)
    - Format recognized by tonejs-json-sequencer.
    - Details omitted, details to be defined by TDD test cases.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project used Vitest for TDD.
  - I plan to organize the test procedures later.

*README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.*