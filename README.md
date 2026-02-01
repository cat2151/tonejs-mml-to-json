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
- For more details, refer to [copilot-instructions.md](copilot-instructions.md).

## Reference Repositories
This project references the following Tree-sitter implementation repositories:

### Tree-sitter Success Stories
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - An example implementation for generating C and WASM parsers from Tree-sitter's grammar.js.
  - A design pattern that treats grammar.js as the SSOT.
  - Shows how to support both C and WASM generation.
  - Forms the foundation for this project's Tree-sitter implementation.

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
- Converts music written in MML (Music Macro Language) into a JSON format playable in browsers.
- Create music with simple text and play it on your website.
- Available as an npm package and via CDN, making integration into your project easy.
- A specialized tool for music conversion, with actual playback handled by a separate project (`tonejs-json-sequencer`).

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
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified similar to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specify octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raise octave by one | `<` |
| `>` | Lower octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Set default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |

### Tone Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Change tone (synthesizer)<br>Uses Tone.js synthesizer class names<br>(See "About Tone Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|------|-----|
| `@PingPongDelay` | Ping-pong delay effect<br>Creates bouncing echo between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds spacious room ambience and echo<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates rich, shimmering sound by duplicating and detuning<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping, whooshing sound by phase-shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume variations<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive sound<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay vibrato effect<br>Vibrato gradually applies after the note starts<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`)
- **Different effect types can be mixed** in any order
- Parameters can be specified as JSON arguments
- Effects must be specified before the first note in a track

**Note:** Effects are only applied to the initial instrument of that track. If the instrument changes midway through playback, the new instrument will not have the effect connected. Example: In `@PingPongDelay c @FMSynth d`, note `c` will have a ping-pong delay, but the `@FMSynth` note `d` will not.

### Multitrack
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (inside quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### Examples
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

// Chords including accidentals and length
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// Instrument change (tone)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab<c  // FMSynth - electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - guitar sound

// Instrument switching within one track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effect (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping-pong delay effect

// Effect (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds spacious room ambience

// Effect (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering sound

// Passing parameters to an effect
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Chaining multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two delays stacked

// Chaining different effect types
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Mixed effects chain

// Combination of instrument and effects
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping-pong delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effect (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay vibrato effect - vibrato gradually applies after note starts
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (combines notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (ratio of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timeline and specifications for these commands are TBD.
- Specifications may change if implemented.
- Destructive changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'c4eg'.` = Dotted quarter note C-E-G chord (length inside quotes, dot outside quotes).
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord.
  - Multitrack compatibility: It is possible to use chords in some tracks and not in others.
- **Difference from Multitrack**:
  - Multitrack (`;`): Separate tracks playing different melodies/parts simultaneously.
  - Chords (`'...'`): Multiple notes played together at the exact same timing.

### Comparison Example

```mml
// Multitrack: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Tone Specification (`@` command)

The current `@` command implements basic tone switching, but it is planned to support various Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types Available

The following are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Features | Suitable Tones |
|--------|------|-----------|
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
- **Note**: Tracks containing chords automatically use PolySynth regardless of the specified instrument.

### Examples

```mml
// FMSynth for electric piano sound
@FMSynth o4 l8 cdefgab<c

// Switch instruments within a track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// MonoSynth for a bassline
@MonoSynth o3 l8 c c c c d d d d
```

### Potential for Specification Changes

⚠️ **Important**: The tone specification feature is currently in the prototyping phase.

- This is a provisional specification to test Tone.js's default tone representation.
- It is implemented to allow easy verification of each variation.
- The specification may undergo frequent destructive changes.
- If using in a production environment, it is recommended to pin the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their corresponding status in this library (tonejs-mml-to-json).

## Purpose of Investigation

The goal is to enable the expression of musical elements possible with `tonejs-json-sequencer` in MML using this library. This will allow for the conversion from MML to complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Remarks |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass tone) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sound) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported | Noise-based tone |
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
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping-pong delay |

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

### Performance and Parameter Control

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Delay Vibrato** | ✅ Supported | ⏳ Not Supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not Supported | Gradual parameter change |
| **Panpot change** | 🚧 Planned | ⏳ Not Supported | Real-time pan (position) change |
| **Expression change** | 🚧 Planned | ⏳ Not Supported | Real-time volume change |
| **LPF change** | 🚧 Planned | ⏳ Not Supported | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Supported | Portamento effect |

### Source Types (Planned for Future Support)

| Source | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported | SuperSaw sound, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics and Filters (Planned for Future Support)

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Early Implementation Planned)

1.  **Instrument Extension**
    -   Currently implemented: `@` command directly specifies Tone.js class names (`@Synth`, `@FMSynth`, `@AMSynth`, etc.).
    -   Future extension idea: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`).

2.  **Basic Effects**
    -   Basic effects such as reverb, chorus, and delay.
    -   MML command proposals: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    -   Volume/Expression: `v` command.
    -   Panpot: `p` command.
    -   Filter control: New commands under consideration.

### Medium Priority

1.  **Advanced Effects**
    -   Phaser, Tremolo, AutoFilter, AutoWah, etc.
    -   Performance expressions like vibrato, delay vibrato.

2.  **Distortion Effects**
    -   Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    -   PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    -   Special instruments like FatOscillator, PulseOscillator.
    -   Sample-based instruments using Sampler.

2.  **Dynamics Processing**
    -   Mastering effects like Compressor, EQ.

3.  **Real-time Parameter Changes**
    -   Gradual parameter changes (`rampTo`).
    -   Envelope control.

## Implementation Approach

### Basic Policy

1.  **Maintain Compatibility with Existing MML Syntax**
    -   Do not break existing implementations.
    -   Gradual addition of features.

2.  **Emphasize Simplicity**
    -   Do not compromise the brevity of MML.
    -   Minimize learning curve.

3.  **Maximize Use of Tone.js Features**
    -   Leverage features already implemented in `tonejs-json-sequencer`.
    -   Support through expansion of the JSON output format.

### Implementation Strategy

1.  **Phased Implementation**
    -   Implement high-priority features sequentially.
    -   Create prototypes for each feature and gather feedback.

2.  **Test-Driven Development (TDD)**
    -   Create test cases for each feature.
    -   Conduct regression tests for existing features.

3.  **Documentation Updates**
    -   Update README and sample code upon completion of implementation.
    -   Enrich usage examples.

## References

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Components JSON Support Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First draft of tonejs-json-sequencer investigation results created.

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-friendliness**: Code-like notation, Git management, easy generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Fostering an Ecosystem**: High reusability, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Assumed that individual developers can easily create PEG parsers for specific MML dialects.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Prioritizes independent development and speed.**
    - Allows focusing solely on MML parser development.
    - Enables rapid evolution without being constrained by dependencies between parser and playback functionalities.
  - For more details, please refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Under Consideration Memo
## About Rust Implementation
- **Rust + WASM implementation added.**
  - Available as a Rust library crate.
  - Works in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - Refer to [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: Parser that converts MML strings into an AST.
- **ast**: Data structure for the AST (Abstract Syntax Tree).
- **ast2json**: Converts the AST into Tone.js-compatible JSON.

## Input/Output Definition
- ※ Example to visualize the concept
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - ※ Loose coupling with thin layers to facilitate changes.
  - json (AST)
  - json (pre-processing)
    - What is "processing"?
      - Node ID assignment, etc.
- Output Example
  - json (post-processing)
    - Format recognized by tonejs-json-sequencer.
    - Details are omitted; test cases in TDD serve as the detailed specification.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I believe this project used Vitest for TDD.
  - I plan to organize the test procedures later.

※ README.md is automatically generated by GitHub Actions using Gemini's translation of README.ja.md.