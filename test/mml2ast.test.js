import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast.js';

describe('mml2ast', () => {
  describe('Basic notes', () => {
    it('should parse a single note "c"', () => {
      const result = mml2ast('c');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ]);
    });

    it('should parse multiple notes "cde"', () => {
      const result = mml2ast('cde');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ]);
    });

    it('should parse all note names "cdefgab"', () => {
      const result = mml2ast('cdefgab');
      expect(result).toHaveLength(7);
      expect(result[0].note).toBe('c');
      expect(result[1].note).toBe('d');
      expect(result[2].note).toBe('e');
      expect(result[3].note).toBe('f');
      expect(result[4].note).toBe('g');
      expect(result[5].note).toBe('a');
      expect(result[6].note).toBe('b');
    });
  });

  describe('Notes with duration', () => {
    it('should parse note with duration "c4"', () => {
      const result = mml2ast('c4');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 }
      ]);
    });

    it('should parse note with duration "e8"', () => {
      const result = mml2ast('e8');
      expect(result).toEqual([
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 0, length: 2 }
      ]);
    });

    it('should parse note with multi-digit duration "c16"', () => {
      const result = mml2ast('c16');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: 16, dots: 0, length: 3 }
      ]);
    });
  });

  describe('Notes with accidentals', () => {
    it('should parse note with sharp "c+"', () => {
      const result = mml2ast('c+');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '+', duration: null, dots: 0, length: 2 }
      ]);
    });

    it('should parse note with flat "e-"', () => {
      const result = mml2ast('e-');
      expect(result).toEqual([
        { type: 'note', note: 'e', accidental: '-', duration: null, dots: 0, length: 2 }
      ]);
    });

    it('should parse note with double sharp "c++"', () => {
      const result = mml2ast('c++');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '++', duration: null, dots: 0, length: 3 }
      ]);
    });

    it('should parse note with accidental and duration "c+4"', () => {
      const result = mml2ast('c+4');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '+', duration: 4, dots: 0, length: 3 }
      ]);
    });
  });

  describe('Notes with dots', () => {
    it('should parse note with one dot "c4."', () => {
      const result = mml2ast('c4.');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 1, length: 3 }
      ]);
    });

    it('should parse note with two dots "e8.."', () => {
      const result = mml2ast('e8..');
      expect(result).toEqual([
        { type: 'note', note: 'e', accidental: '', duration: 8, dots: 2, length: 4 }
      ]);
    });

    it('should parse note with accidental and dot "c+4."', () => {
      const result = mml2ast('c+4.');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '+', duration: 4, dots: 1, length: 4 }
      ]);
    });
  });

  describe('Rest command', () => {
    it('should parse rest "r"', () => {
      const result = mml2ast('r');
      expect(result).toEqual([
        { type: 'rest', duration: null, dots: 0, length: 1 }
      ]);
    });

    it('should parse rest with duration "r4"', () => {
      const result = mml2ast('r4');
      expect(result).toEqual([
        { type: 'rest', duration: 4, dots: 0, length: 2 }
      ]);
    });

    it('should parse rest with dot "r8."', () => {
      const result = mml2ast('r8.');
      expect(result).toEqual([
        { type: 'rest', duration: 8, dots: 1, length: 3 }
      ]);
    });
  });

  describe('Length command', () => {
    it('should parse length command "l8"', () => {
      const result = mml2ast('l8');
      expect(result).toEqual([
        { type: 'length', value: 8, length: 2 }
      ]);
    });

    it('should parse length command "l16"', () => {
      const result = mml2ast('l16');
      expect(result).toEqual([
        { type: 'length', value: 16, length: 3 }
      ]);
    });

    it('should parse length command without value "l"', () => {
      const result = mml2ast('l');
      expect(result).toEqual([
        { type: 'length', value: null, length: 1 }
      ]);
    });
  });

  describe('Octave commands', () => {
    it('should parse octave command "o4"', () => {
      const result = mml2ast('o4');
      expect(result).toEqual([
        { type: 'octave', value: 4, length: 2 }
      ]);
    });

    it('should parse octave up "<"', () => {
      const result = mml2ast('<');
      expect(result).toEqual([
        { type: 'octaveUp', length: 1 }
      ]);
    });

    it('should parse octave down ">"', () => {
      const result = mml2ast('>');
      expect(result).toEqual([
        { type: 'octaveDown', length: 1 }
      ]);
    });

    it('should parse multiple octave changes "<<"', () => {
      const result = mml2ast('<<');
      expect(result).toEqual([
        { type: 'octaveUp', length: 1 },
        { type: 'octaveUp', length: 1 }
      ]);
    });
  });

  describe('Instrument command', () => {
    it('should parse instrument command "@0"', () => {
      const result = mml2ast('@0');
      expect(result).toEqual([
        { type: 'instrument', value: 0, length: 2 }
      ]);
    });

    it('should parse instrument command "@1"', () => {
      const result = mml2ast('@1');
      expect(result).toEqual([
        { type: 'instrument', value: 1, length: 2 }
      ]);
    });

    it('should parse instrument command without value "@"', () => {
      const result = mml2ast('@');
      expect(result).toEqual([
        { type: 'instrument', value: null, length: 1 }
      ]);
    });
  });

  describe('Complex MML sequences', () => {
    it('should parse "o4 l16 e"', () => {
      const result = mml2ast('o4 l16 e');
      expect(result).toEqual([
        { type: 'octave', value: 4, length: 2 },
        { type: 'length', value: 16, length: 3 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ]);
    });

    it('should parse "c4d8e16"', () => {
      const result = mml2ast('c4d8e16');
      expect(result).toEqual([
        { type: 'note', note: 'c', accidental: '', duration: 4, dots: 0, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: 8, dots: 0, length: 2 },
        { type: 'note', note: 'e', accidental: '', duration: 16, dots: 0, length: 3 }
      ]);
    });

    it('should parse "l8 c d e r f g a"', () => {
      const result = mml2ast('l8 c d e r f g a');
      expect(result).toHaveLength(8);
      expect(result[0].type).toBe('length');
      expect(result[1].type).toBe('note');
      expect(result[4].type).toBe('rest');
    });

    it('should parse notes with octave changes "o4 c < d > e"', () => {
      const result = mml2ast('o4 c < d > e');
      expect(result).toEqual([
        { type: 'octave', value: 4, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'octaveUp', length: 1 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'octaveDown', length: 1 },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ]);
    });

    it('should parse MML with instrument change "@0 c d @1 e f"', () => {
      const result = mml2ast('@0 c d @1 e f');
      expect(result).toHaveLength(6);
      expect(result[0]).toEqual({ type: 'instrument', value: 0, length: 2 });
      expect(result[3]).toEqual({ type: 'instrument', value: 1, length: 2 });
    });
  });

  describe('Whitespace handling', () => {
    it('should ignore whitespace between commands', () => {
      const result = mml2ast('c  d  e');
      expect(result).toHaveLength(3);
      expect(result[0].note).toBe('c');
      expect(result[1].note).toBe('d');
      expect(result[2].note).toBe('e');
    });

    it('should handle newlines', () => {
      const result = mml2ast('c\nd\ne');
      expect(result).toHaveLength(3);
    });

    it('should handle tabs', () => {
      const result = mml2ast('c\td\te');
      expect(result).toHaveLength(3);
    });
  });
});
