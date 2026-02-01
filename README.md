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
  - Design pattern for treating grammar.js as SSOT.
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
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music with simple text and perform it on your website.
- Available as an npm package and via CDN, making integration into projects easy.
- A specialized tool focusing on music conversion, with actual playback handled by a separate project (`tonejs-json-sequencer`).

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

## API Reference

### `initWasm(): Promise<void>`
Initialize the WASM module. **This must be called before using any conversion functions.**

### `mml2json(mml: string): ToneCommand[]`
Convert MML string directly to Tone.js JSON format. This is the main convenience function.
- **Returns**: Array of Tone.js sequencer commands
- **Errors**: Parser outputs warnings for invalid MML syntax but continues conversion where possible

### `mml2ast(mml: string): ASTToken[]`
Convert MML string to Abstract Syntax Tree (AST).
- **Returns**: Array of AST tokens
- **Errors**: Invalid syntax outputs warnings but parsing continues

### `ast2json(ast: ASTToken[]): ToneCommand[]`
Convert Abstract Syntax Tree (AST) to Tone.js JSON format.
- **Returns**: Array of Tone.js sequencer commands

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|-------------|---------|
| `c d e f g a b` | Notes (C D E F G A B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (`..`=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified similarly to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `o<number>` | Specifies octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Increases octave by 1 | `<` |
| `>` | Decreases octave by 1 | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `l<number>` | Sets default note length<br>(applies to subsequent notes without explicit length) | `l8` `l16` `l4` |

### Timbre Control
| Command | Description | Example |
|---------|-------------|---------|
| `@<InstrumentName>` | Changes timbre (synthesizer)<br>Uses Tone.js synth class names<br>(See "About Timbre Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Effects
| Command | Description | Example |
|---------|-------------|---------|
| `@PingPongDelay` | Ping Pong Delay effect<br>Creates echoes bouncing between left and right channels<br>Parameters: delayTime, feedback | `@PingPongDelay` `@PingPongDelay{"delayTime":"8n","feedback":0.5}` |
| `@FeedbackDelay` | Feedback Delay effect<br>Creates repeating echoes with adjustable feedback<br>Parameters: delayTime, feedback | `@FeedbackDelay` `@FeedbackDelay{"delayTime":"8n","feedback":0.6}` |
| `@Reverb` | Reverb effect<br>Adds a spacious room ambiance and echoes<br>Parameters: decay | `@Reverb` `@Reverb{"decay":2.5}` |
| `@Chorus` | Chorus effect<br>Creates a rich, shimmering tone through duplication and pitch variation<br>Parameters: frequency, delayTime, depth | `@Chorus` `@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7}` |
| `@Phaser` | Phaser effect<br>Creates sweeping or swirling sounds through phase shifting<br>Parameters: frequency, octaves, baseFrequency | `@Phaser` `@Phaser{"frequency":0.5,"octaves":3,"baseFrequency":350}` |
| `@Tremolo` | Tremolo effect<br>Creates rhythmic volume changes<br>Parameters: frequency, depth | `@Tremolo` `@Tremolo{"frequency":10,"depth":0.5}` |
| `@Vibrato` | Vibrato effect<br>Creates pitch variations for expressive tones<br>Parameters: frequency, depth | `@Vibrato` `@Vibrato{"frequency":5,"depth":0.1}` |
| `@Distortion` | Distortion effect<br>Adds grit and overdrive to the sound<br>Parameters: distortion | `@Distortion` `@Distortion{"distortion":0.8}` |
| `@DelayVibrato` | Delay Vibrato effect<br>Gradual vibrato applied after note onset<br>Currently uses hardcoded parameters (frequency=7, depth increases from 0 to 0.2) | `@DelayVibrato` |

**Effect Features:**
- All effects are connected between the instrument and the output.
- **Multiple effects can be chained in series** (e.g., `@Reverb @Chorus @PingPongDelay`).
- **Different types of effects can be combined in any order.**
- Parameters can be specified as JSON arguments.
- Effects must be specified before the first note in a track.

**Note:** Effects are only applied to the initial instrument of that track. If the instrument changes midway through playback, the new instrument will not have the effects connected. For example: in `@PingPongDelay c @FMSynth d`, the note `c` will have ping-pong delay, but the note `d` from `@FMSynth` will not.

### Multitrack
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|-------------|---------|
| `'notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified<br>※Length after the first note (within quotes), dot outside quotes | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

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
@FMSynth o4 l8 cdefgab<c  // FMSynth - electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - guitar sound

// Instrument switching within one track
@Synth o4 cde @FMSynth fga @AMSynth b<c

// Effect (PingPongDelay)
@PingPongDelay o4 l8 cdefgab<c  // Ping pong delay effect

// Effect (Reverb)
@Reverb o4 l8 cdefgab<c  // Reverb effect - adds a spacious room ambiance

// Effect (Chorus)
@Chorus o4 l8 cdefgab<c  // Chorus effect - rich, shimmering tone

// Passing parameters to effects
@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c  // 8th note delay time
@Reverb{"decay":2.5} o4 l8 cdefgab<c  // Longer decay time

// Chaining multiple effects of the same type
@PingPongDelay @PingPongDelay o4 l8 cdefgab<c  // Two layers of delay

// Chaining different types of effects
@Reverb @Chorus @PingPongDelay o4 l8 cdefgab<c  // Multiple effect chain

// Instrument and effect combination
@FMSynth @PingPongDelay o4 l8 cdefgab<c  // FM Synth + Ping Pong Delay
@FMSynth @Reverb @Chorus o4 l8 cdefgab<c  // FM Synth + Reverb + Chorus

// Effect (DelayVibrato)
@DelayVibrato o4 l8 cdefgab<c  // Delay vibrato effect - vibrato gradually applied after note onset
@FMSynth @DelayVibrato o4 l8 cdefgab<c  // FM Synth + Delay Vibrato
```

## Unimplemented Commands (Planned for Future)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (percentage of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repeat) | `[cde]4` |

**⚠️ Important Notes**: 
- The timing and specifications for these commands are currently undecided.
- Specifications may change if implemented.
- Destructive changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of a regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dot: `'c4eg'.` = Dotted quarter note C-E-G chord (length within quotes, dot outside quotes)
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Compatibility with multitrack: Possible to use chords in some tracks and not others.
- **Difference from Multitrack**:
  - Multitrack (`;`) : Separate tracks playing different melodies/parts simultaneously.
  - Chords (`'...'`) : Multiple notes played together at the exact same time.

### Comparison Examples

```mml
// Multitrack: C, E, G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support a wider variety of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are Tone.js synthesizer types that may be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic sounds |
| `AMSynth` | Amplitude modulation synthesis<br>2 oscillators modulating amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>2 oscillators modulating frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex sounds |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked strings |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command directly uses Tone.js class names:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, leads)
  - `@PluckSynth` = Plucked instruments (guitar, harp)
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

### Potential for Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a temporary specification for verifying default Tone.js timbre expressions.
- It is implemented to allow easy checking of various variations.
- The specification may undergo frequent breaking changes.
- If using in a production environment, it is recommended to fix the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Feature Compatibility with tonejs-json-sequencer

This section describes the features supported by [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) and their compatibility with this library (tonejs-mml-to-json).

## Purpose of this Survey

The goal is to enable the expression of musical elements available in `tonejs-json-sequencer` through this library's MML. This will allow for the conversion of MML into complete musical expressions.

## Components Supported by tonejs-json-sequencer

### Instruments - Compatibility Status

| Tone.js Class | tonejs-json-sequencer | This Library (MML) | Remarks |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ Supported | ✅ Supported | Implemented with `@Synth` (default) |
| **MonoSynth** | ✅ Supported | ✅ Supported | Implemented with `@MonoSynth` (bass timbre) |
| **FMSynth** | ✅ Supported | ✅ Supported | Implemented with `@FMSynth` (electric piano, bells) |
| **AMSynth** | ✅ Supported | ✅ Supported | Implemented with `@AMSynth` (bells, metallic sounds) |
| **DuoSynth** | ✅ Supported | ✅ Supported | Implemented with `@DuoSynth` (dual-voice) |
| **PluckSynth** | ✅ Supported | ✅ Supported | Implemented with `@PluckSynth` (plucked strings) |
| **MembraneSynth** | ✅ Supported | ✅ Supported | Implemented with `@MembraneSynth` (drums) |
| **MetalSynth** | ✅ Supported | ✅ Supported | Implemented with `@MetalSynth` (cymbals) |
| **NoiseSynth** | ✅ Supported | ⏳ Not Supported | Noise-based timbre |
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
| **FeedbackDelay** | ✅ Supported | ✅ Supported | Feedback delay |
| **PingPongDelay** | ✅ Supported | ✅ Supported | Ping pong delay |

#### Distortion Effects

| Effect | tonejs-json-sequencer | This Library (MML) | Purpose |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ Supported | ✅ Supported | Distortion |
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
| **Delay Vibrato** | ✅ Supported | ✅ Supported | Delayed vibrato effect |
| **depth.rampTo** | ✅ Supported | ⏳ Not Supported | Gradual parameter change |
| **Panpot change** | 🚧 Planned | ⏳ Not Supported | Real-time pan (position) change |
| **Expression change** | 🚧 Planned | ⏳ Not Supported | Real-time volume change |
| **LPF change** | 🚧 Planned | ⏳ Not Supported | Real-time low-pass filter change |
| **Portamento** | 🚧 Planned | ⏳ Not Supported | Portamento effect |

### Instrument Types (Future Support)

| Instrument | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 Planned | ⏳ Not Supported | SuperSaw timbre, thick pads |
| **PulseOscillator** | 🚧 Planned | ⏳ Not Supported | Pulse wave (e.g., 12.5% duty pulse) |

### Dynamics/Filter (Future Support)

| Feature | tonejs-json-sequencer | This Library (MML) | Purpose |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 Planned | ⏳ Not Supported | Compressor |
| **EQ3** | 🚧 Planned | ⏳ Not Supported | 3-band equalizer |

## Implementation Priority and Plan

### High Priority (Planned for Early Implementation)

1.  **Instrument Extension**
    - Currently implemented: `@` command directly specifies Tone.js class names (e.g., `@Synth`, `@FMSynth`, `@AMSynth`).
    - Future extension proposal: Support for abbreviations or aliases (e.g., `@fm` → `@FMSynth`).

2.  **Basic Effects**
    - Basic effects such as reverb, chorus, delay.
    - MML command proposals: `R` (Reverb), `C` (Chorus), `D` (Delay), etc.

3.  **Parameter Control**
    - Volume/Expression: `v` command
    - Panpot: `p` command
    - Filter control: New command under consideration.

### Medium Priority

1.  **Advanced Effects**
    - Phaser, Tremolo, AutoFilter, AutoWah, etc.
    - Performance expressions such as vibrato, delay vibrato.

2.  **Distortion Effects**
    - Distortion, BitCrusher, Chebyshev.

3.  **Pitch Effects**
    - PitchShift, FrequencyShifter.

### Low Priority (Under Consideration)

1.  **Advanced Instruments**
    - Special instruments like FatOscillator, PulseOscillator.
    - Sampler for sample-based instruments.

2.  **Dynamics Processing**
    - Compressor, EQ for mastering.

3.  **Real-time Parameter Changes**
    - Gradual parameter changes (rampTo).
    - Envelope control.

## Implementation Approach

### Basic Policy

1.  **Maintain Compatibility with Existing MML Syntax**
    - Do not break existing implementations.
    - Gradual feature additions.

2.  **Emphasize Simplicity**
    - Do not compromise MML's conciseness.
    - Minimize learning curve.

3.  **Maximize Tone.js Feature Utilization**
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

## Reference Materials

- [tonejs-json-sequencer Repository](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js Components JSON Compatibility Roadmap](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js Official Documentation](https://tonejs.github.io/)

## Update History

- 2026-01-12: First draft of tonejs-json-sequencer survey results created.

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent on the web.
  - **Programmer-Friendly**: Code-like notation, Git management, easy generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple grammar, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Foundation for an Ecosystem**: Highly reusable, fosters sharing and accumulation of knowledge.
  - **Adaptability to Dialects**: Easily adaptable to system-specific MML dialects, with easy conversion for PEG users.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **To prioritize development independence and speed**
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by the dependency between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## About Rust Implementation
- **Rust + WASM implementation has been added**
  - Available as a Rust library crate.
  - Works in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - See [rust/IMPLEMENTATION.md](rust/IMPLEMENTATION.md) for details.

## Architecture
- **mml2ast**: Parser that converts MML string to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- ※Illustrate with examples to visualize the concept.
- Input example
  - `o4 l16 e`
- Intermediate format example
  - ※Loose coupling of thin layers, making each easily modifiable.
  - json (AST)
  - json (pre-processed)
    - What is "processing"?
      - Node ID assignment, etc.
- Output example
  - json (post-processed)
    - Format recognized by tonejs-json-sequencer
    - Details omitted; detailed by TDD test cases.

## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to mml2abc / chord2mml TDD.
- I believe this project used TDD with vitest.
  - I plan to organize the test procedure later.

※README.md is automatically generated from README.ja.md using Gemini's translation via GitHub Actions.