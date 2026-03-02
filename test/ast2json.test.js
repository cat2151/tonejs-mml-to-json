import { describe, it, expect } from 'vitest';
import { ast2json } from '../src/ast2json';

describe('ast2json', () => {
  describe('Initialization', () => {
    it('should create initial setup commands for empty AST', () => {
      const ast = [];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(3); // setup (2) + loopEnd (1)
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
      // Last event should be loopEnd
      expect(result[2].eventType).toBe("loopEnd");
    });
  });

  describe('Basic notes', () => {
    it('should convert a single note AST to JSON', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // setup + note + loopEnd
      expect(result[2]).toEqual({
        eventType: "triggerAttackRelease",
        nodeId: 0,
        args: ["c4", "96i", "+0i"] // 96 * 1.0 = 96 (default eighth note with 100% gate time, q8)
      });
    });

    it('should convert multiple notes to JSON', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(6); // setup + 3 notes + loopEnd
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
      
      expect(result[2].args[1]).toBe("192i"); // 192*4/4 = 192, with 100% gate time (q8)
    });

    it('should convert note with eighth note duration', () => {
      const ast = [
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("96i"); // 192*4/8 = 96, with 100% gate time (q8)
    });

    it('should convert note with sixteenth note duration', () => {
      const ast = [
        { type: 'note', note: 'g', accidental: '', duration: 16, dots: 0, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("48i"); // 192*4/16 = 48 with 100% gate time (q8)
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
      expect(result[2].args[1]).toBe("288i");
    });

    it('should convert double dotted note (2 dots)', () => {
      const ast = [
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 2, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Quarter note (192) * 1.75 = 336 with 100% gate time (q8)
      expect(result[2].args[1]).toBe("336i");
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
      
      expect(result).toHaveLength(5); // setup + 2 notes (rest doesn't create command)
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
      
      expect(result).toHaveLength(5); // setup + 2 notes + loopEnd
      // Both notes should be 16th notes (48 ticks) with 100% gate time (q8)
      expect(result[2].args[1]).toBe("48i");
      expect(result[3].args[1]).toBe("48i");
    });

    it('should allow notes to override default length', () => {
      const ast = [
        { type: 'length', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result[2].args[1]).toBe("96i"); // c uses l8, 96 * 1.0 = 96 (q8)
      expect(result[3].args[1]).toBe("192i"); // d4 overrides to quarter note, 192 * 1.0 = 192 (q8)
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
      expect(result).toHaveLength(4);
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
      expect(result).toHaveLength(4);
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
      expect(result).toHaveLength(7);
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
      // with voice set to FMSynth
      expect(result[0].eventType).toBe("createNode");
      expect(result[0].nodeId).toBe(0);
      expect(result[0].nodeType).toBe("PolySynth");
      expect(result[0].args).toBeDefined();
      expect(result[0].args.voice).toBe("FMSynth");
      
      // Second instrument change should also create PolySynth (not MonoSynth)
      // Result structure: [0]=createNode(PolySynth), [1]=connect, [2]=chord, [3]=createNode(@MonoSynth->PolySynth), [4]=connect, [5]=chord
      expect(result[3].eventType).toBe("createNode");
      expect(result[3].nodeType).toBe("PolySynth");
    });
  });
});
