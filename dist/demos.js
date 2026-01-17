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
        name: '@Synth (Default)',
        description: 'Basic subtractive synthesis - default sound',
        mml: '@Synth o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-fm',
        name: '@FMSynth',
        description: 'FM synthesis - electric piano, bell-like sounds',
        mml: '@FMSynth o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-am',
        name: '@AMSynth',
        description: 'AM synthesis - bells, metallic sounds, tremolo effects',
        mml: '@AMSynth o4 l8 cdefgab<c'
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
        mml: '@PluckSynth o4 l8 cdefgab<c'
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
        mml: '@DuoSynth o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-switch',
        name: 'Instrument Switching',
        description: 'Switch between different instruments in one track',
        mml: '@Synth o4 cde @FMSynth fga @AMSynth gab @MonoSynth agf'
    },
    {
        id: 'instrument-fmsynth-args',
        name: '@FMSynth with Args',
        description: 'FM synthesis with custom harmonicity and modulation - creates different timbres',
        mml: '@FMSynth{"harmonicity":3,"modulationIndex":10} o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-amsynth-args',
        name: '@AMSynth with Args',
        description: 'AM synthesis with custom harmonicity - adjusts the modulation ratio',
        mml: '@AMSynth{"harmonicity":2.5} o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-monosynth-args',
        name: '@MonoSynth with Args',
        description: 'MonoSynth with custom filter and envelope - creates a punchy bass sound',
        mml: '@MonoSynth{"filter":{"Q":2,"type":"lowpass","rolloff":-12},"envelope":{"attack":0.005}} o3 l8 c c c c d d d d'
    },
    {
        id: 'instrument-plucksynth-args',
        name: '@PluckSynth with Args',
        description: 'PluckSynth with custom parameters - adjusts the plucked string sound',
        mml: '@PluckSynth{"attackNoise":0.5,"dampening":4000,"resonance":0.95} o4 l8 cdefgab<c'
    },
    {
        id: 'instrument-synth-args',
        name: '@Synth with Args',
        description: 'Basic Synth with custom oscillator and envelope - creates a soft pad sound',
        mml: '@Synth{"oscillator":{"type":"triangle"},"envelope":{"attack":0.1,"decay":0.2,"sustain":0.5,"release":1}} o4 l4 c e g c'
    },
    {
        id: 'instrument-switch-args',
        name: 'Instrument Switching with Args',
        description: 'Switch between instruments with custom parameters',
        mml: '@FMSynth{"harmonicity":3} o4 cde @AMSynth{"harmonicity":2} fga'
    },
    {
        id: 'instrument-sampler',
        name: '@Sampler (Piano)',
        description: 'Sample-based synthesis using audio files - realistic piano, drums, or any recorded sound',
        mml: '@Sampler{"urls":{"C4":"https://tonejs.github.io/audio/salamander/C4.mp3","D#4":"https://tonejs.github.io/audio/salamander/Ds4.mp3","F#4":"https://tonejs.github.io/audio/salamander/Fs4.mp3","A4":"https://tonejs.github.io/audio/salamander/A4.mp3"},"release":1} o4 l8 cdefgab<c'
    },
    {
        id: 'chord-basic',
        name: 'Chords (Basic)',
        description: 'Basic chord demonstration - notes enclosed in single quotes play simultaneously',
        mml: 'o4 l4 \'ceg\' \'dfb\' \'ace\' \'gbdf\''
    },
    {
        id: 'chord-sampler',
        name: 'Chords with @Sampler',
        description: 'Chord demonstration with Sampler - rich piano chords',
        mml: '@Sampler{"urls":{"C4":"https://tonejs.github.io/audio/salamander/C4.mp3","D#4":"https://tonejs.github.io/audio/salamander/Ds4.mp3","F#4":"https://tonejs.github.io/audio/salamander/Fs4.mp3","A4":"https://tonejs.github.io/audio/salamander/A4.mp3"},"release":1} o4 l4 \'ceg\' \'dfb\' \'ace\' \'gbdf\''
    },
    {
        id: 'chord-accidentals',
        name: 'Chords with Accidentals',
        description: 'Chords with sharps and flats - demonstrating \'c+eg-\' notation',
        mml: 'o4 l4 \'c+eg\' \'df+a\' \'eg+b\' \'c-eg-\''
    },
    {
        id: 'chord-duration',
        name: 'Chords with Duration',
        description: 'Chords with different durations and dots - duration inside quotes, dots outside',
        mml: 'o4 \'c4eg\' \'d8fb\' \'e4ac\'. \'f8gbd\'..'
    },
    {
        id: 'chord-mixed',
        name: 'Mixed Single Notes and Chords',
        description: 'Combining single notes with chords in one melody',
        mml: 'o4 l8 c \'eg\' d \'fac\' e \'gb\' c4'
    },
    {
        id: 'effect-pingpongdelay',
        name: '@PingPongDelay (Single)',
        description: 'PingPongDelay effect - creates a bouncing echo between left and right channels',
        mml: '@PingPongDelay o4 l8 cdefgab<c'
    },
    {
        id: 'effect-pingpongdelay-args',
        name: '@PingPongDelay with Args',
        description: 'PingPongDelay with custom delay time - faster or slower echoes',
        mml: '@PingPongDelay{"delayTime":"8n"} o4 l8 cdefgab<c'
    },
    {
        id: 'effect-pingpongdelay-multiple',
        name: '@PingPongDelay (Multiple)',
        description: 'Multiple PingPongDelay effects in series - creates complex echo patterns',
        mml: '@PingPongDelay @PingPongDelay o4 l8 cdefgab<c'
    },
    {
        id: 'effect-pingpongdelay-instrument',
        name: '@PingPongDelay with Instrument',
        description: 'PingPongDelay with FMSynth - electric piano with ping-pong echo',
        mml: '@FMSynth @PingPongDelay o4 l8 cdefgab<c'
    },
    {
        id: 'accidentals',
        name: 'Accidentals (Sharps & Flats)',
        description: 'Chromatic scale using sharps (+) and flats (-) - can be repeated (++, --)',
        mml: 'o4 l16 c c+ d d+ e f f+ g g+ a a+ b <c'
    },
    {
        id: 'rest-rhythm',
        name: 'Rest and Rhythm',
        description: 'Using rests (r) to create rhythmic patterns',
        mml: 'o4 l8 c r e r g r e r c4 r4'
    },
    {
        id: 'dotted-notes',
        name: 'Dotted Notes',
        description: 'Dotted notes (.) increase duration by 1.5x, double dots (..) by 1.75x',
        mml: 'o4 c4. d8 e4. f8 g4.. a16 b4'
    },
    {
        id: 'octave-control',
        name: 'Octave Control (< and >)',
        description: 'Using < to raise octave and > to lower octave',
        mml: 'o4 l8 cdefgab < cdefgab < c > bagfedc > bagfedc'
    },
    {
        id: 'comprehensive',
        name: 'Comprehensive Demo',
        description: 'Combining multiple MML features: chords, accidentals, dots, octaves, multi-track',
        mml: '@FMSynth o4 l8 c4. \'eg\' d+ \'f+ac\'. e r < c; @MonoSynth o3 l4 c e g c'
    }
];
//# sourceMappingURL=demos.js.map