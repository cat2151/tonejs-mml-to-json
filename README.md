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
- Create music with simple text and play it on a website.
- Available as an npm package and via CDN, making integration into projects easy.
- This tool specializes in the music conversion part, with actual playback handled by a separate project (`tonejs-json-sequencer`).

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
|---------|-------------|---------|
| `c d e f g a b` | Notes (C, D, E, F, G, A, B) | `cdefgab` |
| `+` `-` | Accidentals (Sharp/Flat)<br>※Placed immediately after the note (cannot be placed before the note) | `c+` `e-` `c++` `e--` |
| `Number` | Note duration (4=quarter note, 8=eighth note, 16=sixteenth note)<br>Placed immediately after a note or rest | `c4` `e8` `c16` |
| `.` | Dot (multiplies note duration by 1.5)<br>Can be specified consecutively (`..`=1.75x) | `c4.` `e8..` |
| `r` | Rest<br>Duration and dots can be specified similar to notes | `r` `r4` `r8.` |

### Octave Control
| Command | Description | Example |
|---------|-------------|---------|
| `oNumber` | Specify octave (default: `o4`) | `o4` `o5` `o3` |
| `<` | Raise octave by one | `<` |
| `>` | Lower octave by one | `>` |

### Default Settings
| Command | Description | Example |
|---------|-------------|---------|
| `lNumber` | Set default note duration<br>(Applied to subsequent notes without explicit duration) | `l8` `l16` `l4` |

### Timbre Control
| Command | Description | Example |
|---------|-------------|---------|
| `@Number` | Change timbre (synthesizer)<br>Currently creates a new Synth node<br>(See "About Timbre Specification" below for details) | `@0` `@1` `@2` |

### Multitrack
| Command | Description | Example |
|---------|-------------|---------|
| `;` | Track separator<br>Plays multiple parts simultaneously | `cde;efg;abc` |

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

// Multitrack (chords)
o4 l8 ceg;dfb;ace

// Timbre change
@0 cde @1 efg @2 abc
```

## Unimplemented Commands (Planned for Future Implementation)

The following commands are commonly used in standard MML but are not yet implemented in this library. They may be implemented in future versions.

| Command | Description | Standard Example |
|---------|-------------|------------------|
| `t` `T` | Tempo setting (BPM) | `t120` `T140` |
| `v` `V` | Volume setting (0-127) | `v100` `V80` |
| `&` `^` | Tie (connects notes of the same pitch) | `c4&c4` `c4^c4` |
| `q` `Q` | Gate time (note duration ratio, staccato control) | `q60` `Q80` |
| `p` `P` | Pan (spatial position) setting | `p64` `P0` |
| `u` `U` | Velocity (attack strength) | `u120` |
| `[` `]` | Loop (repeat) | `[cde]4` |

**⚠️ Important Note**: 
- The implementation timeline and specifications for these commands are undecided.
- Specifications may change if they are implemented.
- Breaking changes may occur frequently during the prototyping phase.

## About Timbre Specification (`@` Command)

The current `@` command implements basic timbre switching, but it is planned to support a variety of Tone.js synthesizer types in the future.

### Candidate Tone.js Synthesizer Types

Below are potential Tone.js synthesizer types that could be specified with the `@` command in the future:

| Type | Characteristics | Suitable Timbres |
|--------|-----------------------------|---------------------------|
| `Synth` | Basic subtractive synthesis<br>Single oscillator + envelope | Leads, pads, basic sounds |
| `AMSynth` | Amplitude modulation synthesis<br>Modulates amplitude with two oscillators | Bells, metallic sounds, tremolo effects |
| `FMSynth` | Frequency modulation synthesis<br>Modulates frequency with two oscillators | Electric pianos, bells, metallic sounds |
| `MonoSynth` | Monophonic subtractive synthesis<br>With filter envelope | Basses, mono leads, analog synth-like |
| `DuoSynth` | Dual-voice polyphonic<br>Combines two MonoSynths | Rich textures, chorus effects, complex timbres |
| `PluckSynth` | Karplus-Strong algorithm<br>Plucked string instrument simulation | Guitars, harps, kotos, plucked instruments |
| `MembraneSynth` | Membrane vibration simulation | Drums, percussion |
| `MetalSynth` | Metallic sound simulation | Cymbals, metallic percussion |

### Current Implementation Status

- **Currently**: The `@` command creates a new `Synth` node.
- **Future**: Considering mappings like `@0`=Synth, `@1`=AMSynth, `@2`=FMSynth.

### Regarding Potential Specification Changes

⚠️ **Important**: The timbre specification feature is currently in the prototyping phase.

- This is a provisional specification for validating Tone.js's default timbre representations.
- It is implemented to allow easy verification of each variation.
- Specifications are subject to frequent breaking changes.
- If used in a production environment, it is recommended to pin the version.
- If you have any feedback or requests, please share them via GitHub Issues.

# notes
- What are the advantages of writing music with MML (Music Macro Language)?
  - **Conciseness and Portability**: Text-based and lightweight, platform-independent for the web.
  - **Programmer-Friendliness**: Code-like notation, easy Git management, easy generation.
  - **Web Development Affinity**: Direct playback in browsers, real-time editing, lightweight distribution.
  - **Low Learning Curve**: Simple grammar, enables gradual learning.
  - **Modular Design**: Conversion and playback are separated, allowing independent evolution of each.
  - **Fosters an Ecosystem**: High reusability, easy to share and accumulate knowledge.
  - **Adaptability to Dialects**: It is assumed that system-specific MML dialects can also be easily handled by creating simple converters with PEG.

- Why are `tonejs-json-sequencer` and `tonejs-mml-to-json` separate projects?
  - **Because we prioritize development independence and speed.**
    - Allows focused development on the MML parser.
    - Enables rapid evolution without being constrained by dependencies between parser and playback features.
  - For more details, please also refer to [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer).

# Notes Under Consideration
## About Rust Implementation
- **Added Rust + WASM implementation.**
  - Available as a Rust library crate.
  - Works in browsers via WASM compilation.
  - 100% compatible with JavaScript implementation.
  - See [rust/README.md](rust/README.md) for details.

## Architecture
- **mml2ast**: Parser to convert MML string to AST.
- **ast**: AST (Abstract Syntax Tree) data structure.
- **ast2json**: Converts AST to Tone.js compatible JSON.

## Input/Output Definition
- ※ Visualize the image with examples.
- Input example
  - `o4 l16 e`
- Example of intermediate format
  - ※ Design as loosely coupled, thin layers to facilitate changes to each.
  - json (AST)
  - json (pre-processing)
    - What is "processing"?
      - Node ID assignment, etc.
- Output example
  - json (post-processing)
    - Format recognized by tonejs-json-sequencer.
    - Details omitted; TDD test cases will serve as the detailed specification.
## TDD Approach
- Test targets are mml2ast, ast2ast, and ast2json, respectively.
  - Refer to TDD for mml2abc / chord2mml.
- I recall using Vitest for TDD in this project.
  - I plan to organize the testing procedure later.

※ This `README.md` is automatically generated from `README.ja.md` via Gemini translation using GitHub Actions.