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
    mml: 'o4 l16 efg+abag+f e8.<e8.>e8'
  },
  {
    id: 'multitrack',
    name: 'Multi-track Demo',
    description: 'Multiple tracks using semicolon separator',
    mml: 'o4 l8 cdefgab; o5 l16 ccccddddeeee; o3 l4 c e g'
  },
  {
    id: 'instrument-synth',
    name: '@Synth (Default)',
    description: 'Basic subtractive synthesis - default sound',
    mml: '@Synth o4 l8 cdefgab>c'
  },
  {
    id: 'instrument-fm',
    name: '@FMSynth',
    description: 'FM synthesis - electric piano, bell-like sounds',
    mml: '@FMSynth o4 l8 cdefgab>c'
  },
  {
    id: 'instrument-am',
    name: '@AMSynth',
    description: 'AM synthesis - bells, metallic sounds, tremolo effects',
    mml: '@AMSynth o4 l8 cdefgab>c'
  },
  {
    id: 'instrument-mono',
    name: '@MonoSynth',
    description: 'Monophonic synthesis - bass, leads, analog synth style',
    mml: '@MonoSynth o3 l8 c c c c d d d d e e e e'
  },
  {
    id: 'instrument-pluck',
    name: '@PluckSynth',
    description: 'Plucked string simulation - guitar, harp, koto',
    mml: '@PluckSynth o4 l8 cdefgab>c'
  },
  {
    id: 'instrument-membrane',
    name: '@MembraneSynth',
    description: 'Membrane vibration - drums, percussion',
    mml: '@MembraneSynth o3 l8 c c c c e e e e g g g g'
  },
  {
    id: 'instrument-metal',
    name: '@MetalSynth',
    description: 'Metallic sounds - cymbals, metallic percussion',
    mml: '@MetalSynth o4 l8 c c c c e e e e g g g g'
  },
  {
    id: 'instrument-duo',
    name: '@DuoSynth',
    description: 'Dual-voice synthesis - rich textures, chorus effects',
    mml: '@DuoSynth o4 l8 cdefgab>c'
  },
  {
    id: 'instrument-switch',
    name: 'Instrument Switching',
    description: 'Switch between different instruments in one track',
    mml: '@Synth o4 cde @FMSynth fga @AMSynth gab @MonoSynth agf'
  }
];
