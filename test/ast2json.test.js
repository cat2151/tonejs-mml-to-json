import { describe, it, expect } from 'vitest';
import { ast2json } from '../src/ast2json';

describe('ast2json', () => {
  describe('Initialization', () => {
    it('should create initial setup commands for empty AST', () => {
      const ast = [];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth"
      });
      expect(result[1]).toEqual({
        eventType: "connect",
        nodeId: 0,
        connectTo: "toDestination"
      });
    });
  });

  describe('Basic notes', () => {
    it('should convert a single note AST to JSON', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3); // setup + note
      expect(result[2]).toEqual({
        eventType: "triggerAttackRelease",
        nodeId: 0,
        args: ["c4", "91i", "+0i"] // 96 * 0.95 = 91 (default eighth note with 95% gate time)
      });
    });

    it('should convert multiple notes to JSON', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(5); // setup + 3 notes
      expect(result[2].args[0]).toBe("c4");
      expect(result[3].args[0]).toBe("d4");
      expect(result[4].args[0]).toBe("e4");
    });
  });

  describe('Notes with duration', () => {
    it('should convert note with quarter note duration', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("182i"); // 192*4/4 = 192, minus 10 = 182
    });

    it('should convert note with eighth note duration', () => {
      const ast = [
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("91i"); // 192*4/8 = 96, * 0.95 = 91
    });

    it('should convert note with sixteenth note duration', () => {
      const ast = [
        { type: 'note', note: 'g', accidental: '', duration: 16, dots: 0, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("45i"); // 192*4/16 = 48, * 0.95 = 45
    });
  });

  describe('Notes with accidentals', () => {
    it('should convert note with sharp', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '+', duration: null, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c#4");
    });

    it('should convert note with flat', () => {
      const ast = [
        { type: 'note', note: 'e', accidental: '-', duration: null, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("eb4");
    });

    it('should convert note with double sharp', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '++', duration: null, dots: 0, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c##4");
    });
  });

  describe('Notes with dots', () => {
    it('should convert dotted note (1 dot)', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 1, length: 3 }
      ];
      const result = ast2json(ast);
      
      // Quarter note (192) * 1.5 = 288, * 0.95 = 273
      expect(result[2].args[1]).toBe("273i");
    });

    it('should convert double dotted note (2 dots)', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 2, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Quarter note (192) * 1.75 = 336, minus 10 = 326
      expect(result[2].args[1]).toBe("319i"); // 336 * 0.95 = 319
    });
  });

  describe('Rest command', () => {
    it('should handle rest by advancing time', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'rest', duration: 4, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + 2 notes (rest doesn't create command)
      expect(result[2].args[2]).toBe("+0i"); // First note starts at 0
      expect(result[3].args[2]).toBe("+384i"); // Second note starts after c4 + r4 (192+192)
    });

    it('should handle rest with default length', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'rest', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Default length is 8, so 96 ticks each
      expect(result[3].args[2]).toBe("+192i"); // After c8 + r8
    });
  });

  describe('Length command', () => {
    it('should set default length for subsequent notes', () => {
      const ast = [
        { type: 'length', value: 16, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + 2 notes
      // Both notes should be 16th notes (48 ticks, 38 duration)
      expect(result[2].args[1]).toBe("45i"); // 48 * 0.95 = 45
      expect(result[3].args[1]).toBe("45i"); // 48 * 0.95 = 45
    });

    it('should allow notes to override default length', () => {
      const ast = [
        { type: 'length', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("91i"); // c uses l8, 96 * 0.95 = 91
      expect(result[3].args[1]).toBe("182i"); // d4 overrides to quarter note
    });
  });

  describe('Octave commands', () => {
    it('should set octave for subsequent notes', () => {
      const ast = [
        { type: 'octave', value: 5, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c5");
    });

    it('should handle octave up command', () => {
      const ast = [
        { type: 'octave', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'octaveUp', length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c4");
      expect(result[3].args[0]).toBe("d5");
    });

    it('should handle octave down command', () => {
      const ast = [
        { type: 'octave', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'octaveDown', length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c4");
      expect(result[3].args[0]).toBe("d3");
    });

    it('should handle multiple octave changes', () => {
      const ast = [
        { type: 'octave', value: 4, length: 2 },
        { type: 'octaveUp', length: 1 },
        { type: 'octaveUp', length: 1 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[0]).toBe("c6");
    });
  });

  describe('Instrument command', () => {
    it('should use first instrument for initial setup without creating duplicate', () => {
      const ast = [
        { type: 'instrument', value: "Synth", length: 6 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should only have initial setup (createNode + connect) + note, no duplicate instrument node
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth"
      });
      expect(result[1]).toEqual({
        eventType: "connect",
        nodeId: 0,
        connectTo: "toDestination"
      });
      expect(result[2].eventType).toBe("triggerAttackRelease");
    });

    it('should create FMSynth for @FMSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "FMSynth", length: 8 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should use FMSynth for initial setup, no duplicate
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "FMSynth"
      });
    });

    it('should create AMSynth for @AMSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "AMSynth", length: 8 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("AMSynth");
    });

    it('should create MonoSynth for @MonoSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "MonoSynth", length: 10 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("MonoSynth");
    });

    it('should create PluckSynth for @PluckSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "PluckSynth", length: 11 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("PluckSynth");
    });

    it('should create MembraneSynth for @MembraneSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "MembraneSynth", length: 14 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("MembraneSynth");
    });

    it('should create MetalSynth for @MetalSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "MetalSynth", length: 11 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("MetalSynth");
    });

    it('should create DuoSynth for @DuoSynth at start', () => {
      const ast = [
        { type: 'instrument', value: "DuoSynth", length: 9 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result[0].nodeType).toBe("DuoSynth");
    });

    it('should create new node when switching instruments mid-track', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'instrument', value: "FMSynth", length: 8 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Initial Synth setup + note + new FMSynth node + connect + note
      expect(result).toHaveLength(6);
      expect(result[0].nodeType).toBe("Synth"); // initial
      expect(result[2].eventType).toBe("triggerAttackRelease"); // first note
      expect(result[2].nodeId).toBe(0); // on Synth
      expect(result[3].eventType).toBe("createNode"); // switched instrument
      expect(result[3].nodeType).toBe("FMSynth");
      expect(result[3].nodeId).toBe(1);
      expect(result[5].nodeId).toBe(1); // second note on FMSynth
    });

    it('should use PolySynth for tracks with chords regardless of instrument name', () => {
      const ast = [
        { type: 'instrument', value: "FMSynth", length: 8 }, // FMSynth request
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        },
        { type: 'instrument', value: "MonoSynth", length: 10 }, // MonoSynth request
        { 
          type: 'chord', 
          notes: [
            { note: 'd', accidental: '' },
            { note: 'f', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      // Initial node should be PolySynth (not FMSynth) because track has chords
      expect(result[0]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "PolySynth"
      });
      
      // Second instrument change should also create PolySynth (not MonoSynth)
      // Result structure: [0]=createNode(PolySynth), [1]=connect, [2]=chord, [3]=createNode(@MonoSynth->PolySynth), [4]=connect, [5]=chord
      expect(result[3].eventType).toBe("createNode");
      expect(result[3].nodeType).toBe("PolySynth");
    });
  });

  describe('Complex sequences', () => {
    it('should convert "o4 l16 e" correctly', () => {
      const ast = [
        { type: 'octave', value: 4, length: 2 },
        { type: 'length', value: 16, length: 3 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3); // setup + 1 note
      expect(result[2].args[0]).toBe("e4");
      expect(result[2].args[1]).toBe("45i"); // 16th note, 48 * 0.95 = 45
      expect(result[2].args[2]).toBe("+0i");
    });

    it('should handle sequence with timing', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: 16, dots: 0, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[2]).toBe("+0i");   // c4 at tick 0
      expect(result[3].args[2]).toBe("+192i"); // d8 at tick 192
      expect(result[4].args[2]).toBe("+288i"); // e16 at tick 288 (192 + 96)
    });

    it('should handle notes with all features combined', () => {
      const ast = [
        { type: 'octave', value: 5, length: 2 },
        { type: 'length', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '+', duration: 4, dots: 1, length: 4 },
        { type: 'rest', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + 2 notes
      expect(result[2].args[0]).toBe("c#5");
      expect(result[2].args[1]).toBe("273i"); // dotted quarter, 288 * 0.95 = 273
      expect(result[2].args[2]).toBe("+0i");
      expect(result[3].args[0]).toBe("e5");
      expect(result[3].args[1]).toBe("91i"); // eighth note (l8), 96 * 0.95 = 91
      expect(result[3].args[2]).toBe("+384i"); // after dotted quarter (288) + eighth rest (96)
    });
  });

  describe('Start tick progression', () => {
    it('should correctly progress start tick through sequence', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'f', accidental: '', duration: 8, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[2]).toBe("+0i");
      expect(result[3].args[2]).toBe("+96i");
      expect(result[4].args[2]).toBe("+192i");
      expect(result[5].args[2]).toBe("+288i");
    });
  });

  describe('Multi-track support', () => {
    it('should create separate nodes for each track', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should have 2 createNode commands
      const createNodes = result.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeId).toBe(0);
      expect(createNodes[1].nodeId).toBe(100); // Track 1 starts at 100
      
      // Should have 2 connect commands
      const connects = result.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(2);
      
      // Should have 2 notes
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(2);
    });

    it('should handle tracks with different octaves', () => {
      const ast = [
        { type: 'octave', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { type: 'octave', value: 5, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes[0].args[0]).toBe('c4');
      expect(notes[1].args[0]).toBe('e5');
    });

    it('should handle tracks with different lengths', () => {
      const ast = [
        { type: 'length', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { type: 'length', value: 16, length: 3 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes[0].args[1]).toBe('91i');  // 96 * 0.95 = 91
      expect(notes[1].args[1]).toBe('45i');  // 48 * 0.95 = 45
    });

    it('should start all tracks at time +0i', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'trackSeparator', length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'f', accidental: '', duration: 8, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      // First note of each track should start at +0i
      const firstNotes = notes.filter(n => n.args[2] === '+0i');
      expect(firstNotes.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle three tracks', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeId).toBe(0);
      expect(createNodes[1].nodeId).toBe(100); // Track 1 starts at 100
      expect(createNodes[2].nodeId).toBe(200); // Track 2 starts at 200
    });
  });

  describe('Chord commands', () => {
    it('should convert simple chord to JSON', () => {
      const ast = [
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3); // setup + chord
      
      // Should create PolySynth
      expect(result[0].nodeType).toBe('PolySynth');
      
      // Chord command
      expect(result[2].eventType).toBe('triggerAttackRelease');
      const notes = result[2].args[0]; // Now directly an array, not a JSON string
      expect(Array.isArray(notes)).toBe(true);
      expect(notes).toEqual(['c4', 'e4', 'g4']);
    });

    it('should convert chord with accidentals', () => {
      const ast = [
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '+' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '-' }
          ],
          duration: null, 
          dots: 0, 
          length: 7 
        }
      ];
      const result = ast2json(ast);
      
      const notes = result[2].args[0]; // Now directly an array, not a JSON string
      expect(Array.isArray(notes)).toBe(true);
      expect(notes).toEqual(['c#4', 'e4', 'gb4']);
    });

    it('should convert chord with duration', () => {
      const ast = [
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: 4, 
          dots: 0, 
          length: 6 
        }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe('182i'); // 192 - 10
    });

    it('should convert mixed notes and chords', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { 
          type: 'chord', 
          notes: [
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 4 
        },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should use PolySynth for track with chords
      expect(result[0].nodeType).toBe('PolySynth');
      
      const events = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(events).toHaveLength(3);
      
      // First and last are single notes
      expect(events[0].args[0]).toBe('c4');
      expect(events[2].args[0]).toBe('d4');
      
      // Middle is chord
      const chordNotes = events[1].args[0]; // Now directly an array
      expect(Array.isArray(chordNotes)).toBe(true);
      expect(chordNotes).toEqual(['e4', 'g4']);
    });

    it('should use Synth for tracks without chords', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should use regular Synth (no chords)
      expect(result[0].nodeType).toBe('Synth');
    });

    it('should handle chord with dots', () => {
      const ast = [
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: 4, 
          dots: 1, 
          length: 7 
        }
      ];
      const result = ast2json(ast);
      
      // Duration with dot: 192 * 1.5 = 288, * 0.95 = 273
      expect(result[2].args[1]).toBe('273i');
    });

    it('should handle multi-track with chords in one track', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'trackSeparator', length: 1 },
        { 
          type: 'chord', 
          notes: [
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 4 
        }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      
      // First track without chords uses Synth
      expect(createNodes[0].nodeType).toBe('Synth');
      // Second track with chords uses PolySynth
      expect(createNodes[1].nodeType).toBe('PolySynth');
    });
  });

  describe('Sampler with chords', () => {
    it('should create Sampler node (not PolySynth) when using @Sampler with chords', () => {
      const ast = [
        { type: 'instrument', value: "Sampler", args: '{"release":1,"urls":{"C4":"https://tonejs.github.io/audio/salamander/C4.mp3","D#4":"https://tonejs.github.io/audio/salamander/Ds4.mp3","F#4":"https://tonejs.github.io/audio/salamander/Fs4.mp3","A4":"https://tonejs.github.io/audio/salamander/A4.mp3"}}', length: 258 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      // Should create Sampler node, not PolySynth
      expect(result[0]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Sampler",
        args: {
          release: 1,
          urls: {
            "C4": "https://tonejs.github.io/audio/salamander/C4.mp3",
            "D#4": "https://tonejs.github.io/audio/salamander/Ds4.mp3",
            "F#4": "https://tonejs.github.io/audio/salamander/Fs4.mp3",
            "A4": "https://tonejs.github.io/audio/salamander/A4.mp3"
          }
        }
      });
    });

    it('should use array format for Sampler chord (same as PolySynth)', () => {
      const ast = [
        { type: 'instrument', value: "Sampler", args: '{"release":1,"urls":{"C4":"https://tonejs.github.io/audio/salamander/C4.mp3","D#4":"https://tonejs.github.io/audio/salamander/Ds4.mp3","F#4":"https://tonejs.github.io/audio/salamander/Fs4.mp3","A4":"https://tonejs.github.io/audio/salamander/A4.mp3"}}', length: 258 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      // Should have setup (2) + 1 chord event
      expect(result).toHaveLength(3);
      
      // Check the chord uses array format
      expect(result[2].eventType).toBe('triggerAttackRelease');
      const notes = result[2].args[0];
      expect(Array.isArray(notes)).toBe(true);
      expect(notes).toEqual(['c4', 'e4', 'g4']);
    });

    it('should use same nodeId for Sampler chord (no new createNode)', () => {
      const ast = [
        { type: 'instrument', value: "Sampler", args: '{"release":1}', length: 20 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 4 
        }
      ];
      const result = ast2json(ast);
      
      // Should have exactly 1 createNode command
      const createNodes = result.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(1);
      
      // Should have 1 triggerAttackRelease with the same nodeId
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      expect(notes[0].nodeId).toBe(0);
    });

    it('should handle Sampler chord with accidentals', () => {
      const ast = [
        { type: 'instrument', value: "Sampler", args: '{"release":1}', length: 20 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '+' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '-' }
          ],
          duration: null, 
          dots: 0, 
          length: 7 
        }
      ];
      const result = ast2json(ast);
      
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      const noteArray = notes[0].args[0];
      expect(Array.isArray(noteArray)).toBe(true);
      expect(noteArray).toEqual(["c#4", "e4", "gb4"]);
    });

    it('should handle Sampler chord with duration', () => {
      const ast = [
        { type: 'instrument', value: "Sampler", args: '{"release":1}', length: 20 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' }
          ],
          duration: 4, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      // Chord should have quarter note duration (192 - 10 = 182)
      expect(notes[0].args[1]).toBe("182i");
    });

    it('should use PolySynth with array format for non-Sampler instruments with chords', () => {
      const ast = [
        { type: 'instrument', value: "FMSynth", length: 8 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 4 
        }
      ];
      const result = ast2json(ast);
      
      // Should use PolySynth for FMSynth with chords
      expect(result[0].nodeType).toBe('PolySynth');
      
      // Should have 1 triggerAttackRelease with array of notes
      const notes = result.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      expect(Array.isArray(notes[0].args[0])).toBe(true);
      expect(notes[0].args[0]).toEqual(['c4', 'e4']);
    });
  });

  describe('Non-Sampler instruments with args', () => {
    it('should pass args to FMSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":3,"modulationIndex":10}',
          length: 47
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Check createNode has args
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("FMSynth");
      
      // Check that args were passed through
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(3);
      expect(createNodes[0].args.modulationIndex).toBe(10);
    });

    it('should pass args to AMSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "AMSynth", 
          args: '{"harmonicity":2.5}',
          length: 28
        },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("AMSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(2.5);
    });

    it('should pass args to MonoSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "MonoSynth", 
          args: '{"filter":{"Q":2,"type":"lowpass","rolloff":-12},"envelope":{"attack":0.005}}',
          length: 90
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("MonoSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.filter).toBeDefined();
      expect(createNodes[0].args.filter.Q).toBe(2);
      expect(createNodes[0].args.envelope).toBeDefined();
      expect(createNodes[0].args.envelope.attack).toBe(0.005);
    });

    it('should pass args to PluckSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "PluckSynth", 
          args: '{"attackNoise":0.5,"dampening":4000,"resonance":0.95}',
          length: 65
        },
        { type: 'note', note: 'a', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("PluckSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.attackNoise).toBe(0.5);
      expect(createNodes[0].args.dampening).toBe(4000);
      expect(createNodes[0].args.resonance).toBe(0.95);
    });

    it('should pass args to Synth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "Synth", 
          args: '{"oscillator":{"type":"triangle"},"envelope":{"attack":0.01}}',
          length: 70
        },
        { type: 'note', note: 'g', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("Synth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.oscillator).toBeDefined();
      expect(createNodes[0].args.oscillator.type).toBe("triangle");
      expect(createNodes[0].args.envelope).toBeDefined();
      expect(createNodes[0].args.envelope.attack).toBe(0.01);
    });

    it('should handle instrument switching with args', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":3}',
          length: 27
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { 
          type: 'instrument', 
          value: "AMSynth", 
          args: '{"harmonicity":2}',
          length: 27
        },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(2);
      
      // First instrument: FMSynth with args
      expect(createNodes[0].nodeType).toBe("FMSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(3);
      
      // Second instrument: AMSynth with args
      expect(createNodes[1].nodeType).toBe("AMSynth");
      expect(createNodes[1].args).toBeDefined();
      expect(createNodes[1].args.harmonicity).toBe(2);
    });

    it('should pass args to PolySynth when chords are used with non-Sampler instrument', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":5}',
          length: 27
        },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      // Should create PolySynth (not FMSynth) because track has chords
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("PolySynth");
      
      // Args should still be passed through to PolySynth
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(5);
    });
  });

  describe('Tempo command', () => {
    it('should convert tempo AST to JSON command', () => {
      const ast = [
        { type: 'tempo', value: 120, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Should have setup commands + tempo command
      expect(result).toHaveLength(3);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [120]
      });
    });

    it('should convert tempo with notes', () => {
      const ast = [
        { type: 'tempo', value: 140, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + tempo + note
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [140]
      });
      expect(result[3].eventType).toBe("triggerAttackRelease");
      expect(result[3].args[0]).toBe("c4");
    });

    it('should handle multiple tempo changes', () => {
      const ast = [
        { type: 'tempo', value: 120, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'tempo', value: 140, length: 4 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(6); // setup + tempo + note + tempo + note
      
      // First tempo
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [120]
      });
      
      // Second tempo
      expect(result[4]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [140]
      });
    });

    it('should ignore tempo without value', () => {
      const ast = [
        { type: 'tempo', value: null, length: 1 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should have setup + note, but no tempo command
      expect(result).toHaveLength(3);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("triggerAttackRelease");
    });
  });

  describe('Volume command', () => {
    it('should convert volume AST to JSON command', () => {
      const ast = [
        { type: 'volume', value: 100, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Should have setup commands + volume command
      expect(result).toHaveLength(3);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 100 (out of 127) should map to approximately -6.38dB
      // Formula: (100/127 * 30) - 30 ≈ -6.38
      expect(result[2].args[0]).toBeCloseTo(-6.38, 2);
    });

    it('should convert maximum volume correctly', () => {
      const ast = [
        { type: 'volume', value: 127, length: 4 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 127 should map to 0dB
      expect(result[2].args[0]).toBe(0);
    });

    it('should convert minimum volume correctly', () => {
      const ast = [
        { type: 'volume', value: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 0 should map to -100dB (silence)
      expect(result[2].args[0]).toBe(-100);
    });

    it('should convert volume with notes', () => {
      const ast = [
        { type: 'volume', value: 80, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + volume + note
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      expect(result[3].eventType).toBe("triggerAttackRelease");
      expect(result[3].args[0]).toBe("c4");
    });

    it('should handle multiple volume changes', () => {
      const ast = [
        { type: 'volume', value: 100, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'volume', value: 60, length: 3 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(6); // setup + volume + note + volume + note
      
      // First volume
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      expect(result[2].args[0]).toBeCloseTo(-6.38, 2);
      
      // Second volume
      expect(result[4].eventType).toBe("set");
      expect(result[4].nodeType).toBe("volume.value");
      expect(result[4].args[0]).toBeCloseTo(-15.83, 2);
    });

    it('should ignore volume without value', () => {
      const ast = [
        { type: 'volume', value: null, length: 1 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should have setup + note, but no volume command
      expect(result).toHaveLength(3);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("triggerAttackRelease");
    });

    it('should clamp volume values above 127 to MIDI maximum', () => {
      const ast = [
        { type: 'volume', value: 255, length: 4 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 255 should be clamped to 127, which maps to 0dB
      expect(result[2].args[0]).toBe(0);
    });

    it('should clamp various volume values above 127', () => {
      // Test multiple values above 127 to ensure consistent clamping
      const testCases = [
        { value: 128 },  // Just above max
        { value: 200 },  // Moderately above
        { value: 300 },  // Well above max
        { value: 1000 }, // Far above max
      ];

      testCases.forEach(({ value }) => {
        const ast = [{ type: 'volume', value, length: 4 }];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(3);
        expect(result[2].eventType).toBe("set");
        expect(result[2].nodeType).toBe("volume.value");
        // All values above 127 should be clamped to 127, which maps to 0dB
        expect(result[2].args[0]).toBe(0);
      });
    });
  });

  describe('Gate time command', () => {
    it('should apply gate time 80% to note duration', () => {
      const ast = [
        { type: 'gateTime', value: 80, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 0.8 = 153.6 -> 153 ticks
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "153i", "+0i"]);
    });

    it('should apply gate time 100% (full duration)', () => {
      const ast = [
        { type: 'gateTime', value: 100, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 1.0 = 192 ticks (no reduction)
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "192i", "+0i"]);
    });

    it('should apply gate time 50% (very short)', () => {
      const ast = [
        { type: 'gateTime', value: 50, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 0.5 = 96 ticks
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "96i", "+0i"]);
    });

    it('should reset gate time to default 95% when no value provided', () => {
      const ast = [
        { type: 'gateTime', value: 50, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'gateTime', value: null, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4);
      expect(result[2].args).toEqual(["c4", "96i", "+0i"]); // 50%
      expect(result[3].args).toEqual(["d4", "182i", "+192i"]); // 95% (default)
    });

    it('should apply gate time to multiple notes', () => {
      const ast = [
        { type: 'gateTime', value: 80, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(5);
      expect(result[2].args).toEqual(["c4", "153i", "+0i"]); // 192 * 0.8 = 153
      expect(result[3].args).toEqual(["d4", "76i", "+192i"]); // 96 * 0.8 = 76
      expect(result[4].args).toEqual(["e4", "153i", "+288i"]); // 192 * 0.8 = 153
    });

    it('should handle gate time 0% edge case (minimum 1 tick)', () => {
      const ast = [
        { type: 'gateTime', value: 0, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Gate time 0% results in 0 ticks, but is clamped to minimum 1 tick
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "1i", "+0i"]);
    });

    it('should handle gate time > 100% (no reduction)', () => {
      const ast = [
        { type: 'gateTime', value: 120, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Gate time >= 100% produces full duration with no reduction
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "192i", "+0i"]);
    });

    it('should apply gate time to chords', () => {
      const ast = [
        { type: 'gateTime', value: 80, length: 3 },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: 4, 
          dots: 0, 
          length: 7 
        }
      ];
      const result = ast2json(ast);
      
      // Chord with gate time 80%: 192 ticks * 0.8 = 153 ticks
      expect(result).toHaveLength(3);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args[0]).toEqual(['c4', 'e4', 'g4']); // chord notes
      expect(result[2].args[1]).toBe('153i'); // duration with 80% gate time
      expect(result[2].args[2]).toBe('+0i'); // start time
    });
  });
});
