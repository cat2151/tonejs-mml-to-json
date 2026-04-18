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
- This document contains temporary AI-generated text and may be difficult to read. We plan to revise it for better readability by human review in the future.

## Demo
- [Live Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html) - Try MML directly in your browser and play music.
- [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) - See examples of library usage.

## Implementation Policy
This project uses **Tree-sitter** to parse MML.
- The parser implementation treats [`grammar.js`](tree-sitter-mml/grammar.js) as the Single Source of Truth (SSOT).
- For details, please refer to [copilot-instructions.md](copilot-instructions.md).

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An implementation example for generating C language and WASM parsers from Tree-sitter's `grammar.js`.
  - A design pattern that treats `grammar.js` as SSOT.
  - How to support both C generation and WASM generation.
  - This forms the basis of this project's Tree-sitter implementation.

## Quick Links
| Item | Link |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 Library Usage Demo | [demo-library](https://cat2151.github.io/tonejs-mml-to-json/demo-library/) |
| 🦀 Rust Implementation Details | [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) |

# Overview
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Create music with simple text and perform it on your website.
- Available as an npm package and via CDN, making it easy to integrate into your projects.
- This tool specializes in music conversion; the actual playback is handled by a separate project (`tonejs-json-sequencer`).

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

## API Reference

### `initWasm(): Promise<void>`
Initializes the WASM module. **Must be called before using any conversion functions.**
- **Note**: This initialization not only loads the Rust/WASM conversion module but also initializes the `web-tree-sitter` parser for the browser/Node.js environment.
- **Error**: An exception is thrown if initialization fails.

### `mml2json(mml: string): ToneCommand[]`
Directly converts an MML string to Tone.js JSON format. This is the main conversion function.
- **Internal Process**: `web-tree-sitter` parses MML into a CST (Concrete Syntax Tree), then Rust/WASM handles the `CST -> AST -> Tone.js JSON` conversion.
- **Return Value**: An array of Tone.js sequencer commands.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed, or if invalid MML syntax or a WASM-side conversion error occurs.

### `mml2ast(mml: string): ASTToken[]`
Converts an MML string to an Abstract Syntax Tree (AST).
- **Internal Process**: MML syntax parsing is performed by `web-tree-sitter`, and Rust/WASM handles the `CST -> AST` conversion.
- **Return Value**: An array of AST tokens.
- **Error**: An `Error` exception is thrown if `initWasm()` has not been executed or if an error occurs during parsing.

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Converts an Abstract Syntax Tree (AST) to Tone.js JSON format.
- **Internal Process**: Rust/WASM handles the `AST -> Tone.js JSON` conversion.
- **Return Value**: An array of Tone.js sequencer commands.

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|-------------|---------|
| `c d e f g a b` | Notes (C D E F G A B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified similar to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `oNumber` | Specifies the octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Increases octave by 1 | `<` |
| `>` | Decreases octave by 1 | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Sets default note length<br>(applies to subsequent notes without length specification) | `l8` `l16` `l4` |
| `tNumber` | Sets tempo (BPM - Beats Per Minute) | `t120` `t140` `t90` |
| `vNumber` | Sets volume (0-127)<br>MIDI volume format | `v100` `v80` `v127` |
| `qNumber` | Gate time (percentage of note length, 0-100)<br>Staccato control<br>100=legato (full length), 95=default (slight gap), 80=staccato (short note) | `q100` `q80` `q60` |

### Instrument Control
| Command | Description | Example |
|---------|-------------|---------|
| `@InstrumentName` | Changes instrument (synthesizer)<br>Uses Tone.js synthesizer class names<br>(See "About Instrument Specifications" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|-------------|---------|
| `@PingPongDelay` | Ping Pong Delay effect<br>Creates an echo bouncing between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback Delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds spatial room ambiance and echo<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates rich, shimmering tones through duplication and pitch variation<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping or swirling sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume fluctuations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Gradual vibrato applied after the start of a note<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`).
- **Different types of effects can be combined in any order.**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects are only applied to the initial instrument of that track. If the instrument is changed during playback, the new instrument will not have the effects connected. For example: in `@PingPongDelay c @FMSynth d`, note `c` will have ping pong delay, but the `@FMSynth` note `d` will not.

### Multi-track
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|-------------|---------|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (inside quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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

// Multi-track (Separate Parts)
o4 l8 ceg;dfb;ace

// Chords (Notes played simultaneously)
o4 l4 'ceg' 'dfb' 'ace'

// Mix of Single Notes and Chords
o4 c 'eg' d 'fac' e

// Chords including Accidentals and Length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Tempo Setting
t120 o4 l8 cdefgab  // Play at 120 BPM

// Tempo Change During Playback
t120 o4 c d e f t90 g a b <c  // Slow down from "g"

// Volume Setting
v100 o4 l8 cdefgab  // Play at volume 100 (0-127)

// Volume Change During Playback
v127 o4 c d e f v60 g a b <c  // Decrease volume from "g"

// Combination of Tempo and Volume
t120 v100 o4 l8 cdefgab  // Set both tempo and volume

// Gate Time Setting (Staccato Control)
q100 o4 l8 cdefgab  // 100% gate time - legato (full note length)
q95 o4 l8 cdefgab   // 95% gate time - default (slight gap between notes)
q80 o4 l8 cdefgab   // 80% gate time - staccato (short notes)
q50 o4 l8 cdefgab   // 50% gate time - very short staccato

// Gate Time Change During Playback
q100 o4 c d e f q80 g a b <c  // From smooth notes to staccato at "g"

// Combination of Tempo, Volume, and Gate Time
t120 v100 q95 o4 l8 cdefgab  // Set tempo, volume, and gate time

// Instrument Change (Timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different Instrument Types
@FMSynth o4 l8 cdefgab<c  // FMSynth - Electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - Bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - Guitar sound

// Instrument Switching within One Track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effects (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping Pong Delay effect

// Effects (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds spatial room ambiance

// Effects (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering tone

// Passing Parameters to Effects
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // Eighth note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Chaining Multiple Effects of the Same Type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two delays layered

// Chaining Different Types of Effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multiple effect chain

// Combination of Instrument and Effects
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effects (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay Vibrato effect - vibrato gradually applies after note start
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
  - Support for length and dots: `'c4eg'.` = Dotted quarter note C-E-G chord (length inside quotes, dot outside)
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Compatibility with multi-track: It's possible to use chords in some tracks and not others.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at the exact same time.

### Comparison Example

```mml
// Multi-track: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Instrument Specifications (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support a wider variety of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types Available

The following are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic sounds |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric pianos, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked strings |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic acoustic simulation | Cymbals, metallic percussion |

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
// FM Synth for electric piano sound
@FMSynth o4 l8 cdefgab<c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Mono Synth for bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Potential Specification Changes

⚠️ **Important**: The instrument specification feature is currently in the prototyping phase.

- This is a provisional specification to verify Tone.js's default timbre representation.
- It is implemented to allow easy checking of each variation.
- Specifications may frequently undergo breaking changes.
- If using in a production environment, it is recommended to fix the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their corresponding status in this library (tonejs-mml-to-json).

## Purpose of this Investigation

The goal is to enable the expression of musical elements available in `tonejs-json-sequencer` using this library's MML. This will allow for the conversion of MML into a complete musical expression.

## Components Supported by tonejs-json-sequencer

### Instrument - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Remarks |
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
| **FeedbackDelay** | ✅ Supported | ✅ Supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping Pong delay |

#### Distortion

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ✅ Supported | Distortion |
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

### Performance/Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delay Vibrato** | ✅ Supported | ✅ Supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not yet | Gradual parameter change |
| **Panpot Change** | 🚧 Planned | ⏳ Not yet | Real-time pan (position) change |
| **Expression Change** | 🚧 Planned | ⏳ Not yet | Real-time volume change |
| **LPF Change** | 🚧 Planned | ⏳ Not yet | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not yet | Portamento effect |

### Source Types - Future Support

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not yet | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not yet | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter - Future Support

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not yet | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not yet | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: `@` command directly specifies Tone.js class names (`@Synth`, `@FMSynth`, `@AMSynth`, etc.)
    - Future extension proposal: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`)

2.  **Basic Effects**
    - Basic effects like reverb, chorus, delay.
    - Proposed MML commands: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume (Volume/Expression): `v` command
    - Pan (Panpot): `p` command
    - Filter control: New command under consideration

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions like vibrato, delay vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    - Special sound sources like FatOscillator, PulseOscillator.
    - Sampler for sample-based sound sources.

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

2.  **Emphasize Simplicity**
    - Do not compromise MML's conciseness.
    - Minimize learning curve.

3.  **Maximize Use of Tone.js Features**
    - Leverage features already implemented in `tonejs-json-sequencer`.
    - Support through extension of the JSON output format.

### Implementation Strategy

1.  **Phased Implementation**
    - Implement high-priority features sequentially.
    - Create prototypes for each feature to gather feedback.

2.  **Test-Driven Development**
    - Create test cases for each feature.
    - Conduct regression tests for existing features.

3.  **Document Updates**
    - Update README and sample code upon completion of implementation.
    - Enrich usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Component JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First draft of `tonejs-json-sequencer` survey results created.

# notes
- What are the advantages of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendly**: Code-like notation, Git manageability, easy generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, enables incremental learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: High reusability, easy to share and accumulate know-how.
  - **Adaptability to Dialects**: Easily accommodates system-specific MML dialects, with each able to create simple converters using PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Emphasis on independent development and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

## Pending Notes
## About Rust Implementation
- **Rust + WASM implementation added.**
  - Available as a Rust library crate.
  - Works in browsers when compiled to WASM.
  - 100% compatible with JavaScript implementation.
  - In browsers, Rust does not handle all parsing; `web-tree-sitter` generates CST, and Rust/WASM converts it to AST / Tone.js JSON.
  - For Tree-sitter-based implementation details, see [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md).

## Architecture
- **Browser/Node.js Parsing Layer**: `web-tree-sitter` converts MML to CST based on `grammar.js`.
- **cst_to_ast (Rust/WASM)**: Converts Tree-sitter's CST to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json (Rust/WASM)**: Converts AST to Tone.js compatible JSON.
- **Native Rust**: When the feature is enabled, Tree-sitter C bindings are used to perform `MML -> AST -> JSON` on the Rust side.

## Input/Output Definition
- ※Example to visualize the image
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - ※Designed with loosely coupled, thin layers to make each easy to change.
  - json (AST)
  - json (pre-processed)
    - What is processing?
      - Node ID numbering, etc.
- Output Example
  - json (post-processed)
    - Format recognized by `tonejs-json-sequencer`.
    - Details omitted, details determined by TDD test cases.
## TDD Policy
- The test targets are `mml2ast`, `ast2ast`, and `ast2json`, respectively.
  - Refer to `mml2abc` / `chord2mml` TDD.
- I recall using Vitest for TDD in this project.
  - I plan to organize the test procedure later.

※README.md is automatically generated from README.ja.md via Gemini translation in GitHub Actions.