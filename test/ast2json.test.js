import { describe, it, expect } from 'vitest';
import { ast2json } from '../src/ast2json.js';

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
    it('should create new node for instrument change', () => {
      const ast = [
        { type: 'instrument', value: 0, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4); // initial setup + instrument node + note
      expect(result[2]).toEqual({
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth"
      });
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
});
