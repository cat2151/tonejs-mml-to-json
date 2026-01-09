import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast.js';
import { ast2json } from '../src/ast2json.js';

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
        args: ["c4", "86i", "+0i"]
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
        args: ["e4", "38i", "+0i"]
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
      expect(json[2].args).toEqual(["c4", "182i", "+0i"]);
      expect(json[3].args).toEqual(["d4", "86i", "+192i"]);
      expect(json[4].args).toEqual(["e4", "38i", "+288i"]);
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
      expect(json[2].args[1]).toBe("86i"); // All eighth notes
      expect(json[3].args[1]).toBe("86i");
      expect(json[4].args[1]).toBe("86i");
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
      expect(json[2].args[1]).toBe("278i"); // dotted quarter (192 * 1.5 - 10)
      expect(json[3].args[1]).toBe("134i"); // dotted eighth (96 * 1.5 - 10)
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
      
      // Verify all are eighth notes
      for (let i = 2; i < 10; i++) {
        expect(json[i].args[1]).toBe("86i");
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
          // args[1]: duration (e.g., "182i")
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
      const mml = 'o4 l8 @0';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      expect(json).toHaveLength(4); // setup + instrument change (createNode + connect)
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
          expectedDuration: '38i',
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
});
