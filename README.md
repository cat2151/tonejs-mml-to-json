# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

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
- Converts music written in MML (Music Macro Language) into a JSON format that can be played in a browser.
- Allows you to create music with simple text and play it on a website.
- Available as an npm package and via CDN for easy integration into your projects.
- This tool specializes in music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Status
- This document still includes AI-generated content, so it may contain inaccuracies regarding future implementation plans.
- It will be revised in the future.

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

For detailed usage, refer to [LIBRARY_USAGE.md](LIBRARY_USAGE.md).

# MML Command Reference

## Implemented Commands

### Notes and Rests
| Command | Description | Example |
|---------|------|-----|
| `c d e f g a b` | Notes (C D E F G A B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dotted note (multiplies note length by 1.5)<br>Can be specified consecutively (e.g., `..` = 1.75x) | `c4.` `e8..` |
| `r` | Rest<br>Length and dot can be specified just like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `oNumber` | Specifies the octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raises the octave by one | `<` |
| `>` | Lowers the octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `lNumber` | Sets the default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |

### Timbre Control
| Command | Description | Example |
|---------|------|-----|
| `@InstrumentName` | Changes the timbre (synthesizer)<br>Use Tone.js synth class names<br>(See "Timbre Specification" below for details) | `@Synth` `@FMSynth` `@AMSynth` |

### Multi-track
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'Notes'` | Chord (notes enclosed in single quotes are played simultaneously)<br>Accidentals, length, and dots can be specified | `'ceg'` `'c+eg-'4` `'dfac'8.` |

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
o4 'c+eg-'4 'd+f+a'8 'eg+b'4.

// Instrument change (timbre)
@Synth cde @FMSynth efg @AMSynth abc

// Different instrument types
@FMSynth o4 l8 cdefgab>c  // FMSynth - electric piano sound
@MonoSynth o3 l8 ccccdddd    // MonoSynth - bass sound
@PluckSynth o4 l8 cdefgab     // PluckSynth - guitar sound

// Instrument switching in one track
@Synth o4 cde @FMSynth fga @AMSynth b>c
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (proportion of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack intensity) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Note**: 
- The implementation timeline and specifications for these commands are TBD.
- If implemented, specifications may change.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, managing multiple synthesizer voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords.
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of the regular `Synth`.
- **Features**:
  - Support for accidentals within chords: `'c+eg-'` = C# E Gb
  - Support for length and dots: `'ceg'4.` = Dotted quarter note C-E-G chord
  - Integration with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Multi-track compatibility: Chords can be used in some tracks while not in others.
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks that play different melodies/parts simultaneously.
  - Chord (`'...'`): Multiple notes played together at exactly the same time.

### Comparison Example

```mml
// Multi-track: C, E, and G are played as separate parts (melody lines)
c;e;g

// Chord: C, E, and G are played together as a single chord
'ceg'
```

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support various Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are Tone.js synthesizer types that may be specifiable with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>Two oscillators modulate amplitude | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Two oscillators modulate frequency | Electric piano, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono leads, analog synth style |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked string instruments |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Current**: The `@` command uses Tone.js class names directly:
  - `@Synth` = Basic subtractive synthesis (default)
  - `@FMSynth` = FM synthesis (electric piano, bells)
  - `@AMSynth` = AM synthesis (bells, metallic sounds)
  - `@MonoSynth` = Monophonic synthesis (bass, leads)
  - `@PluckSynth` = Plucked strings (guitar, harp)
  - `@MembraneSynth` = Drums and percussion
  - `@MetalSynth` = Cymbals and metallic percussion
  - `@DuoSynth` = Dual-voice synthesis (rich textures)
  - `@PolySynth` = Polyphonic synthesis
- **Note**: Tracks with chords automatically use PolySynth regardless of instrument specified.

### Usage Examples

```mml
// Use FM synthesis for electric piano sound
@FMSynth o4 l8 cdefgab>c

// Switch instruments mid-track
@Synth o4 cde @FMSynth fga @AMSynth b>c

// Bass line with MonoSynth
@MonoSynth o3 l8 c c c c d d d d
```

### Potential for Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a provisional specification to validate Tone.js's default timbre representation.
- It is implemented to allow easy confirmation of each variation.
- Specifications may undergo frequent breaking changes.
- If using in a production environment, it is recommended to pin the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Notes
- What are the benefits of writing music in MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based, lightweight, and platform-independent for the web.
  - **Programmer Friendliness**: Code-like notation, easy Git management and generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple syntax, allows for gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Fosters an Ecosystem**: Highly reusable, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: Assumes that specific MML dialects for various systems can be easily created and supported by individuals using PEG for simple conversions.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Prioritizing development independence and speed**.
    - Allows focusing on MML parser development.
    - Enables rapid evolution without being constrained by the dependencies between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes on Consideration
## About Rust Implementation
- **Added Rust + WASM implementation**.
  - Available as a Rust library crate.
  - Works in browsers with WASM compilation.
  - 100% compatible with JavaScript implementation.
  - See [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: Parser that converts MML strings to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- *Illustrative examples to visualize the concept.
- Input Example
  - `o4 l16 e`
- Intermediate Format Example
  - *Designed with loosely coupled, thin layers for easy modification.
  - json (AST)
  - json (pre-processed)
    - What is "processing"?
      - Node ID assignment, etc.
- Output Example
  - json (post-processed)
    - Format recognized by `tonejs-json-sequencer`.
    - Details omitted; test cases in TDD serve as the detailed specification.
## TDD Policy
- The test targets are `mml2ast`, `ast2ast`, and `ast2json` respectively.
  - Refer to the TDD for `mml2abc / chord2mml`.
- I believe this project was using Vitest for TDD.
  - I plan to organize the test procedures later.

*README.md is automatically generated by GitHub Actions based on README.ja.md translated by Gemini.