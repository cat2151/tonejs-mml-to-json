/**
 * Demo MML examples for the demo page
 * This file contains all demo MML strings for easy maintenance
 */
/**
 * Available demo examples
 */
export const demos = [
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
        name: '@0 Synth (Default)',
        description: 'Basic subtractive synthesis - default sound',
        mml: '@0 o4 l8 cdefgab>c'
    },
    {
        id: 'instrument-fm',
        name: '@1 FMSynth',
        description: 'FM synthesis - electric piano, bell-like sounds',
        mml: '@1 o4 l8 cdefgab>c'
    },
    {
        id: 'instrument-am',
        name: '@2 AMSynth',
        description: 'AM synthesis - bells, metallic sounds, tremolo effects',
        mml: '@2 o4 l8 cdefgab>c'
    },
    {
        id: 'instrument-mono',
        name: '@3 MonoSynth',
        description: 'Monophonic synthesis - bass, leads, analog synth style',
        mml: '@3 o3 l8 c c c c d d d d e e e e'
    },
    {
        id: 'instrument-pluck',
        name: '@4 PluckSynth',
        description: 'Plucked string simulation - guitar, harp, koto',
        mml: '@4 o4 l8 cdefgab>c'
    },
    {
        id: 'instrument-membrane',
        name: '@5 MembraneSynth',
        description: 'Membrane vibration - drums, percussion',
        mml: '@5 o3 l8 c c c c e e e e g g g g'
    },
    {
        id: 'instrument-metal',
        name: '@6 MetalSynth',
        description: 'Metallic sounds - cymbals, metallic percussion',
        mml: '@6 o4 l8 c c c c e e e e g g g g'
    },
    {
        id: 'instrument-duo',
        name: '@7 DuoSynth',
        description: 'Dual-voice synthesis - rich textures, chorus effects',
        mml: '@7 o4 l8 cdefgab>c'
    },
    {
        id: 'instrument-switch',
        name: 'Instrument Switching',
        description: 'Switch between different instruments in one track',
        mml: '@0 o4 cde @1 fga @2 gab @3 agf'
    }
];
//# sourceMappingURL=demos.js.map