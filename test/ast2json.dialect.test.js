import { describe, it, expect } from 'vitest';
import { ast2json } from '../src/ast2json';

describe('ast2json', () => {
  describe('Gate time command', () => {
    it('should apply gate time 50% (q4) to note duration', () => {
      const ast = [
        { type: 'gateTime', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 0.5 = 96 ticks (q4 = 50%)
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "96i", "+0i"]);
    });

    it('should apply gate time 100% (full duration, q8)', () => {
      const ast = [
        { type: 'gateTime', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 1.0 = 192 ticks (no reduction, q8 = 100%)
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "192i", "+0i"]);
    });

    it('should apply gate time 0% (q0)', () => {
      const ast = [
        { type: 'gateTime', value: 0, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Note: 192 ticks * 0 = 0 ticks, but clamped to minimum 1 tick
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "1i", "+0i"]);
    });

    it('should reset gate time to default 100% (q8) when no value provided', () => {
      const ast = [
        { type: 'gateTime', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'gateTime', value: null, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(5);
      expect(result[2].args).toEqual(["c4", "96i", "+0i"]); // 50% (q4)
      expect(result[3].args).toEqual(["d4", "192i", "+192i"]); // 100% (q8 default)
    });

    it('should apply gate time to multiple notes', () => {
      const ast = [
        { type: 'gateTime', value: 6, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(6);
      // q6 = 75% (6/8 * 100)
      expect(result[2].args).toEqual(["c4", "144i", "+0i"]); // 192 * 0.75 = 144
      expect(result[3].args).toEqual(["d4", "72i", "+192i"]); // 96 * 0.75 = 72
      expect(result[4].args).toEqual(["e4", "144i", "+288i"]); // 192 * 0.75 = 144
    });

    it('should handle gate time > 8 (clamped to max)', () => {
      const ast = [
        { type: 'gateTime', value: 120, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Gate time > 8 is clamped to 8 (100%), so produces full duration with no reduction
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args).toEqual(["c4", "192i", "+0i"]);
    });

    it('should apply gate time to chords', () => {
      const ast = [
        { type: 'gateTime', value: 6, length: 2 },
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
      
      // Chord with gate time q6 (75%): 192 ticks * 0.75 = 144 ticks
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("triggerAttackRelease");
      expect(result[2].args[0]).toEqual(['c4', 'e4', 'g4']); // chord notes
      expect(result[2].args[1]).toBe('144i'); // duration with 75% gate time
      expect(result[2].args[2]).toBe('+0i'); // start time
    });
  });

  describe('mmlabc dialect specifications', () => {
    describe('q (gate time) mmlabc dialect', () => {
      it('should have q4 at 50% duration', () => {
        const ast = [
          { type: 'gateTime', value: 4, length: 2 },
          { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
        ];
        const result = ast2json(ast);
        
        // q4 = 50% → 192 ticks * 0.5 = 96 ticks
        expect(result).toHaveLength(4);
        expect(result[2].args[1]).toBe('96i');
      });

      it('should have q8 at 100% duration (max)', () => {
        const ast = [
          { type: 'gateTime', value: 8, length: 2 },
          { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
        ];
        const result = ast2json(ast);
        
        // q8 = 100% → 192 ticks * 1.0 = 192 ticks (full duration)
        expect(result).toHaveLength(4);
        expect(result[2].args[1]).toBe('192i');
      });

      it('should use q8 (100%) as default when no q command is specified', () => {
        const ast = [
          { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
        ];
        const result = ast2json(ast);
        
        // Default should be q8 = 100% → 192 ticks
        expect(result).toHaveLength(4);
        expect(result[2].args[1]).toBe('192i');
      });

      it('should reset to q8 (100%) when bare q is specified', () => {
        const ast = [
          { type: 'gateTime', value: 4, length: 2 },
          { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
          { type: 'gateTime', value: null, length: 1 },
          { type: 'note', note: 'd', accidental: '', duration: 4, dots: 0, length: 2 }
        ];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(5);
        expect(result[2].args[1]).toBe('96i'); // q4 = 50%
        expect(result[3].args[1]).toBe('192i'); // bare q resets to q8 = 100%
      });
    });

    describe('v (volume) mmlabc dialect', () => {
      it('should have v0 at -100dB (silence)', () => {
        const ast = [
          { type: 'volume', value: 0, length: 2 }
        ];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(4);
        expect(result[2].eventType).toBe("set");
        expect(result[2].nodeType).toBe("volume.value");
        expect(result[2].args[0]).toBe(-100);
      });

      it('should have v8 at -6dB', () => {
        const ast = [
          { type: 'volume', value: 8, length: 2 }
        ];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(4);
        expect(result[2].eventType).toBe("set");
        expect(result[2].nodeType).toBe("volume.value");
        expect(result[2].args[0]).toBeCloseTo(-6, 2);
      });

      it('should have v15 at 0dB (max)', () => {
        const ast = [
          { type: 'volume', value: 15, length: 3 }
        ];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(4);
        expect(result[2].eventType).toBe("set");
        expect(result[2].nodeType).toBe("volume.value");
        expect(result[2].args[0]).toBe(0);
      });

      it('should scale v values between 1-15 linearly in dB space', () => {
        // Test some intermediate values to verify the formula
        const testCases = [
          { v: 1, expectedDb: -12 },  // (1-15)*(6/7) = -12
          { v: 5, expectedDb: -8.57 },  // (5-15)*(6/7) ≈ -8.57
          { v: 12, expectedDb: -2.57 }, // (12-15)*(6/7) ≈ -2.57
        ];

        testCases.forEach(({ v, expectedDb }) => {
          const ast = [{ type: 'volume', value: v, length: 2 }];
          const result = ast2json(ast);
          
          expect(result).toHaveLength(4);
          expect(result[2].args[0]).toBeCloseTo(expectedDb, 2);
        });
      });
    });
  });
});
