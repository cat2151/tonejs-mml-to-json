/**
 * Demo MML examples for the demo page
 * This file contains all demo MML strings for easy maintenance
 */

export interface Demo {
  id: string;
  name: string;
  description: string;
  mml: string;
}

/**
 * Available demo examples
 */
export const demos: Demo[] = [
  {
    id: 'traditional',
    name: 'Traditional Demo',
    description: 'Single track MML demo',
    mml: 'cdefgab'
  },
  {
    id: 'multitrack',
    name: 'Multi-track Demo',
    description: 'Multiple tracks using semicolon separator',
    mml: 'cdefgab; ccddee; ceg'
  },
  {
    id: 'instrument-synth',
    name: '@Synth (Default)',
    description: 'Basic subtractive synthesis - default sound',
    mml: 'cdefgab'
  },
  {
    id: 'instrument-fm',
    name: '@FMSynth',
    description: 'FM synthesis - electric piano, bell-like sounds',
    mml: 'cdefgab'
  },
  {
    id: 'instrument-am',
    name: '@AMSynth',
    description: 'AM synthesis - bells, metallic sounds, tremolo effects',
    mml: 'cdefgab'
  },
  {
    id: 'instrument-mono',
    name: '@MonoSynth',
    description: 'Monophonic synthesis - bass, leads, analog synth style',
    mml: 'ccccddddeeee'
  },
  {
    id: 'instrument-pluck',
    name: '@PluckSynth',
    description: 'Plucked string simulation - guitar, harp, koto',
    mml: 'cdefgab'
  },
  {
    id: 'instrument-membrane',
    name: '@MembraneSynth',
    description: 'Membrane vibration - drums, percussion',
    mml: 'cccceeeegggg'
  },
  {
    id: 'instrument-metal',
    name: '@MetalSynth',
    description: 'Metallic sounds - cymbals, metallic percussion',
    mml: 'cccceeeegggg'
  },
  {
    id: 'instrument-duo',
    name: '@DuoSynth',
    description: 'Dual-voice synthesis - rich textures, chorus effects',
    mml: 'cdefgab'
  },
  {
    id: 'instrument-switch',
    name: 'Instrument Switching',
    description: 'Switch between different instruments in one track',
    mml: 'cde fga gab agf'
  },
  {
    id: 'instrument-sampler',
    name: '@Sampler (Piano)',
    description: 'Sample-based synthesis using audio files - realistic piano, drums, or any recorded sound',
    mml: '@Sampler{"urls":{"C4":"https://tonejs.github.io/audio/salamander/C4.mp3","D#4":"https://tonejs.github.io/audio/salamander/Ds4.mp3","F#4":"https://tonejs.github.io/audio/salamander/Fs4.mp3","A4":"https://tonejs.github.io/audio/salamander/A4.mp3"},"release":1} o4 l8 cdefgab>c'
  }
];
