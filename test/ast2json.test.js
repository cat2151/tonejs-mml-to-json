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
        args: ["c4", "86i", "+0i"]
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
      
      expect(result[2].args[1]).toBe("86i"); // 192*4/8 = 96, minus 10 = 86
    });

    it('should convert note with sixteenth note duration', () => {
      const ast = [
        { type: 'note', note: 'g', accidental: '', duration: 16, dots: 0, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("38i"); // 192*4/16 = 48, minus 10 = 38
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
      
      // Quarter note (192) * 1.5 = 288, minus 10 = 278
      expect(result[2].args[1]).toBe("278i");
    });

    it('should convert double dotted note (2 dots)', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 2, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Quarter note (192) * 1.75 = 336, minus 10 = 326
      expect(result[2].args[1]).toBe("326i");
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
      expect(result[2].args[1]).toBe("38i");
      expect(result[3].args[1]).toBe("38i");
    });

    it('should allow notes to override default length', () => {
      const ast = [
        { type: 'length', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("86i"); // c uses l8
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
      expect(result[2].args[1]).toBe("38i"); // 16th note
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
      expect(result[2].args[1]).toBe("278i"); // dotted quarter
      expect(result[2].args[2]).toBe("+0i");
      expect(result[3].args[0]).toBe("e5");
      expect(result[3].args[1]).toBe("86i"); // eighth note (l8)
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
      expect(notes[0].args[1]).toBe('86i');  // 96 - 10
      expect(notes[1].args[1]).toBe('38i');  // 48 - 10
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
      const chordNotes = JSON.parse(events[1].args[0]);
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
      
      // Duration with dot: 192 * 1.5 = 288, minus gate time 10 = 278
      expect(result[2].args[1]).toBe('278i');
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
});
