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
- Converts music written in MML (Music Macro Language) into a JSON format playable in a browser.
- Allows you to create music with simple text and play it on a website.
- Available via npm package and CDN for easy integration into your projects.
- A specialized tool for music conversion; actual playback is handled by a separate project (`tonejs-json-sequencer`).

# Status
- This document still includes AI-generated content, so it might contain inaccuracies regarding future implementation plans.
- Will be revised in the future.

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
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (sharp/flat)<br>※Must be placed immediately after the note (cannot precede the note) | `c+` `e-` `c++` `e--` |
| `数字` | Note length (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Must be placed immediately after the note or rest | `c4` `e8` `c16` |
| `.` | Dot (increases note length by 1.5 times)<br>Can be specified consecutively (``..``=1.75 times) | `c4.` `e8..` |
| `r` | Rest<br>Can specify length and dot like notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|------|-----|
| `o数字` | Specifies octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raises octave by one | `<` |
| `>` | Lowers octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|------|-----|
| `l数字` | Sets default note length<br>(Applies to subsequent notes if no length is specified) | `l8` `l16` `l4` |

### Timbre Control
| Command | Description | Example |
|---------|------|-----|
| `@数字` | Changes timbre (synthesizer)<br>Currently creates a new Synth node<br>(See "About Timbre Specification" below for details) | `@0` `@1` `@2` |

### Multitrack
| Command | Description | Example |
|---------|------|-----|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

### Chords
| Command | Description | Example |
|---------|------|-----|
| `'notes'` | Chord (notes enclosed in single quotes play simultaneously)<br>Can include accidentals, duration, and dots | `'ceg'` `'c+eg-'4` `'dfac'8.` |

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

// Chords (notes played together)
o4 l4 'ceg' 'dfb' 'ace'

// Mixed single notes and chords
o4 c 'eg' d 'fac' e

// Chord with accidentals and duration
o4 'c+eg-'4 'd+f+a'8 'eg+b'4.

// Timbre change
@0 cde @1 efg @2 abc
```

## Unimplemented Commands (Planned for Future)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|------|-----------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (ratio of note length, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (stereo position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack intensity) | `u120` |
| `[` `]` | Loop (repetition) | `[cde]4` |

**⚠️ Important Notes**: 
- The implementation timing and specifications of these commands are undecided.
- If implemented, specifications may change.
- Breaking changes may occur frequently during the prototyping phase.

## About Chord Implementation

Chords are implemented using Tone.js's `PolySynth`, which manages multiple synth voices to play notes simultaneously.

### Technical Details

- **Syntax**: Notes enclosed in single quotes (e.g., `'ceg'`) are treated as chords
- **PolySynth**: Tracks containing chords automatically use `PolySynth` instead of regular `Synth`
- **Features**:
  - Supports accidentals within chords: `'c+eg-'` = C# E Gb
  - Supports duration and dots: `'ceg'4.` = C-E-G chord as dotted quarter note
  - Works with octave commands: `o5 'ceg'` = C5-E5-G5 chord
  - Compatible with multi-track: one track can have chords while others don't
- **Difference from Multi-track**:
  - Multi-track (`;`): Separate tracks that can play different melodies/parts simultaneously
  - Chord (`'...'`): Multiple notes played together at the exact same time

### Example Comparison

```mml
// Multi-track: C, E, G play as separate parts (melody lines)
c;e;g

// Chord: C, E, G play together as a single chord
'ceg'
```

## About Timbre Specification (``@`` Command)

The current `@` command implements basic timbre switching, but it is planned to support various Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are potential Tone.js synthesizer types that could be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbre |
|--------|------|-----------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Lead, pad, basic timbres |
| `AMSynth` | Amplitude modulation synthesis<br>2 oscillators modulate amplitude | Bell, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>2 oscillators modulate frequency | Electric piano, bell, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Bass, mono lead, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitar, harp, koto, plucked strings |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command creates a new `Synth` node.
- **Future**: Considering support like `@0`=Synth, `@1`=AMSynth, `@2`=FMSynth.

### About Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a temporary specification for validating Tone.js's default timbre representation.
- Implemented to allow easy verification of various variations.
- Specifications are subject to frequent breaking changes.
- If using in a production environment, it is recommended to pin the version.
- If you have feedback or requests, please share them via GitHub Issues.

# Notes
- What are the benefits of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Developer-Friendly**: Code-like notation, easy Git management and generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight delivery.
  - **Low Learning Curve**: Simple grammar, gradual learning possible.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution.
  - **Fosters an Ecosystem**: High reusability, easy sharing and accumulation of knowledge.
  - **Adaptability to Dialects**: Assumed to easily support system-specific MML dialects by enabling straightforward PEG-based conversion by individual developers.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Due to an emphasis on independent development and speed:**
    - Can focus on MML parser development.
    - Can evolve quickly without being constrained by the dependencies between parser and playback functionalities.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes on Consideration
## About Rust Implementation
- **Added Rust + WASM implementation**
  - Available as a Rust library crate.
  - Operates in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - See [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: A parser that converts MML strings into an AST.
- **ast**: Data structure for AST (Abstract Syntax Tree).
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- *Illustrative examples to visualize the concept.
- Input example
  - `o4 l16 e`
- Intermediate format example
  - *As a loosely coupled thin layer, allowing easy modification of each part.
  - JSON (AST)
  - JSON (pre-processing)
    - What is "processing"?
      - Node ID assignment, etc.
- Output example
  - JSON (post-processing)
    - Format recognized by tonejs-json-sequencer
    - Details omitted, with TDD test cases serving as the detailed specification.
## TDD Policy
- The test targets are mml2ast, ast2ast, and ast2json, individually.
  - Refer to the TDD for mml2abc / chord2mml.
- I recall doing TDD with vitest in this project.
- I plan to organize the test procedures later.

※README.md is automatically generated from README.ja.md using Gemini translation via GitHub Actions.