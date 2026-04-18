import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('Integration: mml2ast + ast2json', () => {
  describe('Chord integration', () => {
    it('should convert simple chord through full pipeline', () => {
      const mml = "'ceg'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(4); // setup + 1 chord
      
      // Should create PolySynth
      expect(json[0].nodeType).toBe('PolySynth');
      
      // Chord event
      const chordEvent = json[2];
      expect(chordEvent.eventType).toBe('triggerAttackRelease');
      const notes = chordEvent.args[0];
      expect(notes).toEqual(['c4', 'e4', 'g4']);
    });

    it('should treat octave changes inside a chord as applying to subsequent chord notes', () => {
      const mml = "o4'c<g'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const chordEvent = json.find(e => e.eventType === 'triggerAttackRelease');
      expect(chordEvent.args[0]).toEqual(['c4', 'g5']);
    });

    it('should keep the outer track octave unchanged after chord-local octave changes', () => {
      const mml = "o4'c<g' a";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);
      expect(events[0].args[0]).toEqual(['c4', 'g5']);
      expect(events[1].args[0]).toBe('a4');
    });

    it('should handle multiple chord-local octave increases', () => {
      const mml = "o4'c<g<a' a";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);
      expect(events[0].args[0]).toEqual(['c4', 'g5', 'a6']);
      expect(events[1].args[0]).toBe('a4');
    });

    it('should handle chord-local octave changes before the first note and between notes', () => {
      const mml = "o4'>c<ga' a";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);
      expect(events[0].args[0]).toEqual(['c3', 'g4', 'a4']);
      expect(events[1].args[0]).toBe('a4');
    });

    it('should handle chord-local octave changes before the first note only', () => {
      const mml = "o4'>cga' a";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);
      expect(events[0].args[0]).toEqual(['c3', 'g3', 'a3']);
      expect(events[1].args[0]).toBe('a4');
    });

    it('should sequence adjacent single-note chords with chord-local octave changes', () => {
      const mml = "'<c1''<c'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);

      expect(events[0].args).toEqual([['c5'], '768i', '+0i']);
      expect(events[1].args).toEqual([['c5'], '96i', '+768i']);
    });

    it('should convert chord with duration and dots', () => {
      // Duration inside quotes, dots after closing quote (mml2abc format)
      const mml = "'c4eg'.";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const chordEvent = json[2];
      expect(chordEvent.args[1]).toBe('288i'); // 192 * 1.5 * 1.0 (q8) = 288
    });

    it('should convert mixed notes and chords', () => {
      const mml = "c 'eg' d 'fac' e";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should use PolySynth
      expect(json[0].nodeType).toBe('PolySynth');
      
      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(5);
      
      // Single notes
      expect(events[0].args[0]).toBe('c4');
      expect(events[2].args[0]).toBe('d4');
      expect(events[4].args[0]).toBe('e4');
      
      // Chords
      let notes = events[1].args[0];
      expect(notes).toEqual(['e4', 'g4']);
      notes = events[3].args[0];
      expect(notes).toEqual(['f4', 'a4', 'c4']);
    });

    it('should handle chord with octave changes', () => {
      const mml = "o4 'ceg' < 'ceg'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(2);
      
      // First chord in octave 4
      let notes = events[0].args[0];
      expect(notes).toEqual(['c4', 'e4', 'g4']);
      
      // Second chord in octave 5
      notes = events[1].args[0];
      expect(notes).toEqual(['c5', 'e5', 'g5']);
    });

    it('should handle multi-track with chords', () => {
      const mml = "c d e; 'ceg' 'dfb'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      
      // First track without chords uses Synth
      expect(createNodes[0].nodeType).toBe('Synth');
      // Second track with chords uses PolySynth
      expect(createNodes[1].nodeType).toBe('PolySynth');
      
      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(5); // 3 single notes + 2 chords
    });

    it('should handle complex chord example', () => {
      // mml2abc format: duration inside quotes, numbers after closing quote ignored
      const mml = "o4 l4 'c+8eg-' 'd+f+a' r4 'eg+b'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json[0].nodeType).toBe('PolySynth');
      
      const events = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(3);
      
      // First chord: C# E Gb, eighth note (8 inside quotes)
      let notes = events[0].args[0];
      expect(notes).toEqual(['c#4', 'e4', 'gb4']);
      expect(events[0].args[1]).toBe('96i'); // 96 * 1.0 = 96 (q8)
      
      // Second chord: D# F# A, quarter note (from default l4)
      notes = events[1].args[0];
      expect(notes).toEqual(['d#4', 'f#4', 'a4']);
      expect(events[1].args[1]).toBe('192i'); // 192 * 1.0 = 192 (q8)
      
      // Third chord: E G# B, quarter note
      notes = events[2].args[0];
      expect(notes).toEqual(['e4', 'g#4', 'b4']);
    });
  });

  describe('Instruments with args', () => {
    it('should convert @FMSynth with args through full pipeline', () => {
      const mml = '@FMSynth{"harmonicity":3,"modulationIndex":10} c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Check createNode has FMSynth with args
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('FMSynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(3);
      expect(createNodes[0].args.modulationIndex).toBe(10);
      
      // Check notes are played
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(3);
      expect(notes[0].args[0]).toBe('c4');
      expect(notes[1].args[0]).toBe('d4');
      expect(notes[2].args[0]).toBe('e4');
    });

    it('should convert @AMSynth with args through full pipeline', () => {
      const mml = '@AMSynth{"harmonicity":2.5} o5 a b c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('AMSynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(2.5);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes[0].args[0]).toBe('a5');
      expect(notes[1].args[0]).toBe('b5');
      expect(notes[2].args[0]).toBe('c5');
    });

    it('should convert @MonoSynth with nested args through full pipeline', () => {
      const mml = '@MonoSynth{"filter":{"Q":2,"type":"lowpass"},"envelope":{"attack":0.005}} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('MonoSynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.filter).toBeDefined();
      expect(createNodes[0].args.filter.Q).toBe(2);
      expect(createNodes[0].args.filter.type).toBe('lowpass');
      expect(createNodes[0].args.envelope).toBeDefined();
      expect(createNodes[0].args.envelope.attack).toBe(0.005);
    });

    it('should convert @PluckSynth with args through full pipeline', () => {
      const mml = '@PluckSynth{"attackNoise":0.5,"dampening":4000} o4 e f g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('PluckSynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.attackNoise).toBe(0.5);
      expect(createNodes[0].args.dampening).toBe(4000);
    });

    it('should handle instrument switching with args through full pipeline', () => {
      const mml = '@FMSynth{"harmonicity":3} c d @AMSynth{"harmonicity":2} e f';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      
      // First instrument
      expect(createNodes[0].nodeType).toBe('FMSynth');
      expect(createNodes[0].args.harmonicity).toBe(3);
      
      // Second instrument
      expect(createNodes[1].nodeType).toBe('AMSynth');
      expect(createNodes[1].args.harmonicity).toBe(2);
      
      // Check notes are assigned to correct instruments
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(4);
      expect(notes[0].nodeId).toBe(0); // c on FMSynth
      expect(notes[1].nodeId).toBe(0); // d on FMSynth
      expect(notes[2].nodeId).toBe(1); // e on AMSynth
      expect(notes[3].nodeId).toBe(1); // f on AMSynth
    });

    it('should convert chord with non-Sampler instrument args through full pipeline', () => {
      const mml = '@FMSynth{"harmonicity":5} \'ceg\' \'dfb\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should create PolySynth (not FMSynth) because of chords
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('PolySynth');
      
      // Args should be wrapped with voice and options
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.voice).toBe('FMSynth');
      expect(createNodes[0].args.options).toBeDefined();
      expect(createNodes[0].args.options.harmonicity).toBe(5);
      
      // Check chords are arrays
      const chords = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(chords).toHaveLength(2);
      expect(Array.isArray(chords[0].args[0])).toBe(true);
      expect(chords[0].args[0]).toEqual(['c4', 'e4', 'g4']);
      expect(chords[1].args[0]).toEqual(['d4', 'f4', 'b4']);
    });

    it('should preserve Sampler args when using chords', () => {
      const mml = '@Sampler{"urls":{"C4":"test.mp3"},"release":1} \'ce\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should keep Sampler (not convert to PolySynth)
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('Sampler');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.urls).toBeDefined();
      expect(createNodes[0].args.release).toBe(1);
    });

    it('should wrap FMSynth in PolySynth with voice when using chords (issue #128)', () => {
      // Issue #128: When using chord command with FMSynth, it should become PolySynth
      // with voice="FMSynth" so the FMSynth part is not forgotten
      const mml = '@FMSynth \'ceg\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should create PolySynth with voice="FMSynth"
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('PolySynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.voice).toBe('FMSynth');
      
      // Check chord is played correctly
      const chords = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(chords).toHaveLength(1);
      expect(Array.isArray(chords[0].args[0])).toBe(true);
      expect(chords[0].args[0]).toEqual(['c4', 'e4', 'g4']);
    });

    it('should parse and preserve voice and options args for @PolySynth with 3-level nested JSON', () => {
      // Regression test: @PolySynth with voice and nested options (3 levels deep) must pass
      // args through correctly. Previously the json_args grammar regex only handled 2 levels.
      const mml = '@PolySynth{"voice":"FMSynth","options":{"oscillator":{"type":"sine"}}} c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('PolySynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.voice).toBe('FMSynth');
      expect(createNodes[0].args.options).toBeDefined();
      expect(createNodes[0].args.options.oscillator.type).toBe('sine');
    });

    it('should parse and preserve voice0 and voice1 args for @DuoSynth with 3-level nested JSON', () => {
      // Regression test: @DuoSynth with voice0/voice1 nested objects (3 levels deep) must
      // pass args through correctly. Previously the json_args grammar regex only handled 2 levels.
      const mml = '@DuoSynth{"harmonicity":2,"voice0":{"oscillator":{"type":"sine"}},"voice1":{"oscillator":{"type":"square"}}} c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe('DuoSynth');
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(2);
      expect(createNodes[0].args.voice0).toBeDefined();
      expect(createNodes[0].args.voice0.oscillator.type).toBe('sine');
      expect(createNodes[0].args.voice1).toBeDefined();
      expect(createNodes[0].args.voice1.oscillator.type).toBe('square');
    });
  });

  describe('Key transpose (kt) command', () => {
    it('should transpose notes up by 2 semitones with kt2', () => {
      const mml = 'kt2 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c -> d, d -> e, e -> f#
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("f#4"); // e + 2 = f#
    });

    it('should transpose notes down by 3 semitones with kt-3', () => {
      const mml = 'kt-3 e f g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // e -> c#, f -> d, g -> e
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c#4"); // e - 3 = c#
      expect(json[3].args[0]).toBe("d4");  // f - 3 = d
      expect(json[4].args[0]).toBe("e4");  // g - 3 = e
    });

    it('should transpose notes across octave boundary', () => {
      const mml = 'kt3 a b';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // a + 3 = c (next octave), b + 3 = d (next octave)
      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("c5");  // a4 + 3 = c5
      expect(json[3].args[0]).toBe("d5");  // b4 + 3 = d5
    });

    it('should transpose notes down across octave boundary', () => {
      const mml = 'kt-5 c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c - 5 = g (previous octave), d - 5 = a (previous octave)
      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("g3");  // c4 - 5 = g3
      expect(json[3].args[0]).toBe("a3");  // d4 - 5 = a3
    });

    it('should apply kt0 as no transpose', () => {
      const mml = 'kt0 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("e4");
    });

    it('should transpose chords with kt command', () => {
      const mml = 'kt2 \'ceg\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c -> d, e -> f#, g -> a
      expect(json).toHaveLength(4); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["d4", "f#4", "a4"]);
    });

    it('should allow changing kt mid-track', () => {
      const mml = 'c kt2 d kt-1 e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c4");  // no transpose
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("d#4"); // e - 1 = d#
    });

    it('should transpose notes with accidentals correctly', () => {
      const mml = 'kt2 b-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // b- (Bb = 10 semitones) + 2 = c5 (12 semitones = octave up)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("c5");
    });

    it('should transpose sharp notes down correctly', () => {
      const mml = 'kt-2 c+';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c+ (C# = 1 semitone) - 2 = b3 (previous octave)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("b3");
    });

    it('should transpose flat notes to natural correctly', () => {
      const mml = 'kt1 d-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // d- (Db = 1 semitone) + 1 = d (natural)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("d4");
    });

    it('should transpose double flat notes correctly', () => {
      const mml = 'kt-3 e-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // e- (Eb = 3 semitones) - 3 = c (natural)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("c4");
    });

    it('should transpose chords with accidentals correctly', () => {
      const mml = "kt2 'b-d+f'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Bb + 2 = c5, D# + 2 = f4, F + 2 = g4
      expect(json).toHaveLength(4); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["c5", "f4", "g4"]);
    });

    it('should handle bare kt to reset transpose', () => {
      const mml = 'kt2 c kt d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("d4");  // kt resets, d stays d
    });
  });
});
