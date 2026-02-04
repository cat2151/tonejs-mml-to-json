import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('Integration: mml2ast + ast2json', () => {
  describe('Complete pipeline', () => {
    it('should convert simple MML "c" through full pipeline', () => {
      const mml = 'c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2]).toEqual({
        eventType: "triggerAttackRelease",
        nodeId: 0,
        args: ["c4", "96i", "+0i"] // 96 * 1.0 = 96 (q8)
      });
    });

    it('should convert "o4 l16 e" through full pipeline', () => {
      const mml = 'o4 l16 e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2]).toEqual({
        eventType: "triggerAttackRelease",
        nodeId: 0,
        args: ["e4", "48i", "+0i"] // 48 * 1.0 = 48 (q8)
      });
    });

    it('should convert melody "cdefgab" through full pipeline', () => {
      const mml = 'cdefgab';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(9); // setup + 7 notes
      expect(json[2].args[0]).toBe("c4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("e4");
      expect(json[5].args[0]).toBe("f4");
      expect(json[6].args[0]).toBe("g4");
      expect(json[7].args[0]).toBe("a4");
      expect(json[8].args[0]).toBe("b4");
    });

    it('should convert MML with durations "c4 d8 e16" through full pipeline', () => {
      const mml = 'c4 d8 e16';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args).toEqual(["c4", "192i", "+0i"]); // 192 * 1.0 = 192 (q8)
      expect(json[3].args).toEqual(["d4", "96i", "+192i"]); // 96 * 1.0 = 96 (q8)
      expect(json[4].args).toEqual(["e4", "48i", "+288i"]); // 48 * 1.0 = 48 (q8)
    });

    it('should convert MML with accidentals "c+ d e-" through full pipeline', () => {
      const mml = 'c+ d e-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("c#4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("eb4");
    });

    it('should convert MML with rests "c r d" through full pipeline', () => {
      const mml = 'c r d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(4); // setup + 2 notes (rest doesn't create event)
      expect(json[2].args[2]).toBe("+0i");
      expect(json[3].args[2]).toBe("+192i"); // After c8 + r8
    });

    it('should convert MML with length setting "l8 c d e" through full pipeline', () => {
      const mml = 'l8 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[1]).toBe("96i"); // All eighth notes, 96 * 1.0 = 96 (q8)
      expect(json[3].args[1]).toBe("96i");
      expect(json[4].args[1]).toBe("96i");
    });

    it('should convert MML with octave changes "o5 c < d > e" through full pipeline', () => {
      // Note: This project uses non-standard MML convention where < increases octave and > decreases octave
      // This follows the existing mml2json.js implementation in this codebase
      const mml = 'o5 c < d > e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("c5");
      expect(json[3].args[0]).toBe("d6"); // < increases octave (project convention)
      expect(json[4].args[0]).toBe("e5"); // > decreases octave (project convention)
    });

    it('should convert dotted notes "c4. d8." through full pipeline', () => {
      const mml = 'c4. d8.';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(4); // setup + 2 notes
      expect(json[2].args[1]).toBe("288i"); // dotted quarter (192 * 1.5 * 1.0 (q8))
      expect(json[3].args[1]).toBe("144i"); // dotted eighth (96 * 1.5 * 1.0 (q8) = 144)
    });

    it('should convert complex MML sequence', () => {
      // Note: This project uses non-standard MML convention where > decreases octave
      const mml = 'o4 l8 c d e r f g a b > c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(10); // setup + 8 notes (rest doesn't create event)
      
      // Verify octaves
      expect(json[2].args[0]).toBe("c4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("e4");
      expect(json[5].args[0]).toBe("f4");
      expect(json[6].args[0]).toBe("g4");
      expect(json[7].args[0]).toBe("a4");
      expect(json[8].args[0]).toBe("b4");
      expect(json[9].args[0]).toBe("c3"); // > decreases octave (project convention)
      
      // Verify all are eighth notes, 96 * 1.0 = 96 (q8)
      for (let i = 2; i < 10; i++) {
        expect(json[i].args[1]).toBe("96i");
      }
      
      // Verify timing progression (96 ticks per eighth note)
      expect(json[2].args[2]).toBe("+0i");
      expect(json[3].args[2]).toBe("+96i");
      expect(json[4].args[2]).toBe("+192i");
      expect(json[5].args[2]).toBe("+384i"); // After c, d, e, r (rest also takes time)
      expect(json[6].args[2]).toBe("+480i");
      expect(json[7].args[2]).toBe("+576i");
      expect(json[8].args[2]).toBe("+672i");
      expect(json[9].args[2]).toBe("+768i");
    });
  });

  describe('Comparison with expected formats', () => {
    it('should produce Tone.js compatible JSON format', () => {
      const mml = 'c4 d4 e4';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Check structure matches Tone.js requirements
      json.forEach(event => {
        expect(event).toHaveProperty('eventType');
        
        if (event.eventType === 'createNode') {
          expect(event).toHaveProperty('nodeId');
          expect(event).toHaveProperty('nodeType');
        }
        
        if (event.eventType === 'connect') {
          expect(event).toHaveProperty('nodeId');
          expect(event).toHaveProperty('connectTo');
        }
        
        if (event.eventType === 'triggerAttackRelease') {
          expect(event).toHaveProperty('nodeId');
          expect(event).toHaveProperty('args');
          expect(event.args).toHaveLength(3);
          // args[0]: note (e.g., "c4")
          // args[1]: duration (e.g., "192i")
          // args[2]: start time (e.g., "+0i")
          expect(typeof event.args[0]).toBe('string');
          expect(typeof event.args[1]).toBe('string');
          expect(typeof event.args[2]).toBe('string');
          expect(event.args[1]).toMatch(/^\d+i$/);
          expect(event.args[2]).toMatch(/^\+\d+i$/);
        }
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty MML string', () => {
      const mml = '';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(2); // Just setup commands
    });

    it('should handle MML with only whitespace', () => {
      const mml = '   \n  \t  ';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(2); // Just setup commands
    });

    it('should handle MML with only commands, no notes', () => {
      const mml = 'o4 l8 @Synth';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should only have setup (createNode + connect), no duplicate for @Synth since it's first
      expect(json).toHaveLength(2);
    });
  });

  describe('Round-trip validation', () => {
    it('should maintain musical semantics through conversion', () => {
      // This test validates that the conversion preserves the musical intent
      const testCases = [
        {
          mml: 'c d e',
          expectedNotes: ['c4', 'd4', 'e4'],
          description: 'simple melody'
        },
        {
          mml: 'o5 c+ d- e',
          expectedNotes: ['c#5', 'db5', 'e5'],
          description: 'with accidentals and octave'
        },
        {
          mml: 'l16 c d e',
          expectedDuration: '48i', // 48 * 1.0 = 48 (q8)
          description: 'with default length'
        }
      ];

      testCases.forEach(({ mml, expectedNotes, expectedDuration, description }) => {
        const ast = mml2ast(mml);
        const json = ast2json(ast);
        
        const noteEvents = json.filter(e => e.eventType === 'triggerAttackRelease');
        
        if (expectedNotes) {
          expect(noteEvents.map(e => e.args[0])).toEqual(expectedNotes);
        }
        
        if (expectedDuration) {
          noteEvents.forEach(e => {
            expect(e.args[1]).toBe(expectedDuration);
          });
        }
      });
    });
  });

  describe('Multi-track integration', () => {
    it('should convert simple two-track MML', () => {
      const mml = 'c;d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have 2 nodes
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      
      // Should have 2 notes
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(2);
      expect(notes.map(n => n.args[0])).toEqual(['c4', 'd4']);
    });

    it('should convert multi-track MML with different octaves', () => {
      const mml = 'o4 cde; o5 efg';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(6);
      
      // Check octaves - Track 1 has nodeId 100
      const track1Notes = notes.filter(n => n.nodeId === 0).map(n => n.args[0]);
      const track2Notes = notes.filter(n => n.nodeId === 100).map(n => n.args[0]);
      
      expect(track1Notes).toEqual(['c4', 'd4', 'e4']);
      expect(track2Notes).toEqual(['e5', 'f5', 'g5']);
    });

    it('should convert multi-track MML with different lengths', () => {
      const mml = 'l8 cd; l16 ef';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(4);
      
      // Track 1 notes should have eighth note duration
      const track1Notes = notes.filter(n => n.nodeId === 0);
      track1Notes.forEach(n => expect(n.args[1]).toBe('96i')); // 96 * 1.0 = 96 (q8)
      
      // Track 2 notes should have sixteenth note duration
      const track2Notes = notes.filter(n => n.nodeId === 100);
      track2Notes.forEach(n => expect(n.args[1]).toBe('48i')); // 48 * 1.0 = 48 (q8)
    });

    it('should handle three tracks', () => {
      const mml = 'o3 c; o4 e; o5 g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(3);
      expect(notes.map(n => n.args[0])).toEqual(['c3', 'e4', 'g5']);
    });

    it('should properly time multi-track sequences', () => {
      const mml = 'c8 d8 e8; f8 g8 a8';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(6);
      
      // Both tracks should start at +0i
      const firstNotes = notes.filter(n => n.args[2] === '+0i');
      expect(firstNotes).toHaveLength(2);
    });

    it('should handle complex multi-track example', () => {
      const mml = 'o4 l8 cdef; o5 l8 egab';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(8);
      
      // Verify octaves are maintained
      const track1Notes = notes.filter(n => n.nodeId === 0).map(n => n.args[0]);
      const track2Notes = notes.filter(n => n.nodeId === 100).map(n => n.args[0]);
      
      track1Notes.forEach(note => expect(note).toMatch(/4$/));
      track2Notes.forEach(note => expect(note).toMatch(/5$/));
    });
  });

  describe('Chord integration', () => {
    it('should convert simple chord through full pipeline', () => {
      const mml = "'ceg'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(3); // setup + 1 chord
      
      // Should create PolySynth
      expect(json[0].nodeType).toBe('PolySynth');
      
      // Chord event
      const chordEvent = json[2];
      expect(chordEvent.eventType).toBe('triggerAttackRelease');
      const notes = chordEvent.args[0];
      expect(notes).toEqual(['c4', 'e4', 'g4']);
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
      
      // Args should still be passed through
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(5);
      
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
  });

  describe('Key transpose (kt) command', () => {
    it('should transpose notes up by 2 semitones with kt2', () => {
      const mml = 'kt2 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c -> d, d -> e, e -> f#
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("f#4"); // e + 2 = f#
    });

    it('should transpose notes down by 3 semitones with kt-3', () => {
      const mml = 'kt-3 e f g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // e -> c#, f -> d, g -> e
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("c#4"); // e - 3 = c#
      expect(json[3].args[0]).toBe("d4");  // f - 3 = d
      expect(json[4].args[0]).toBe("e4");  // g - 3 = e
    });

    it('should transpose notes across octave boundary', () => {
      const mml = 'kt3 a b';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // a + 3 = c (next octave), b + 3 = d (next octave)
      expect(json).toHaveLength(4); // setup + 2 notes
      expect(json[2].args[0]).toBe("c5");  // a4 + 3 = c5
      expect(json[3].args[0]).toBe("d5");  // b4 + 3 = d5
    });

    it('should transpose notes down across octave boundary', () => {
      const mml = 'kt-5 c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c - 5 = g (previous octave), d - 5 = a (previous octave)
      expect(json).toHaveLength(4); // setup + 2 notes
      expect(json[2].args[0]).toBe("g3");  // c4 - 5 = g3
      expect(json[3].args[0]).toBe("a3");  // d4 - 5 = a3
    });

    it('should apply kt0 as no transpose', () => {
      const mml = 'kt0 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("c4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("e4");
    });

    it('should transpose chords with kt command', () => {
      const mml = 'kt2 \'ceg\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c -> d, e -> f#, g -> a
      expect(json).toHaveLength(3); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["d4", "f#4", "a4"]);
    });

    it('should allow changing kt mid-track', () => {
      const mml = 'c kt2 d kt-1 e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(5); // setup + 3 notes
      expect(json[2].args[0]).toBe("c4");  // no transpose
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("d#4"); // e - 1 = d#
    });

    it('should transpose notes with accidentals correctly', () => {
      const mml = 'kt2 b-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // b- (Bb = 10 semitones) + 2 = c5 (12 semitones = octave up)
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2].args[0]).toBe("c5");
    });

    it('should transpose sharp notes down correctly', () => {
      const mml = 'kt-2 c+';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // c+ (C# = 1 semitone) - 2 = b3 (previous octave)
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2].args[0]).toBe("b3");
    });

    it('should transpose flat notes to natural correctly', () => {
      const mml = 'kt1 d-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // d- (Db = 1 semitone) + 1 = d (natural)
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2].args[0]).toBe("d4");
    });

    it('should transpose double flat notes correctly', () => {
      const mml = 'kt-3 e-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // e- (Eb = 3 semitones) - 3 = c (natural)
      expect(json).toHaveLength(3); // setup + 1 note
      expect(json[2].args[0]).toBe("c4");
    });

    it('should transpose chords with accidentals correctly', () => {
      const mml = "kt2 'b-d+f'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Bb + 2 = c5, D# + 2 = f4, F + 2 = g4
      expect(json).toHaveLength(3); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["c5", "f4", "g4"]);
    });

    it('should handle bare kt to reset transpose', () => {
      const mml = 'kt2 c kt d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(4); // setup + 2 notes
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("d4");  // kt resets, d stays d
    });
  });
});
