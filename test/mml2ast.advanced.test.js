import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';

describe('mml2ast', () => {
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

    it('should parse MML with instrument change "@Synth c d @FMSynth e f"', () => {
      const result = mml2ast('@Synth c d @FMSynth e f');
      expect(result).toHaveLength(6);
      expect(result[0]).toEqual({ type: 'instrument', value: "Synth", length: 6 });
      expect(result[3]).toEqual({ type: 'instrument', value: "FMSynth", length: 8 });
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

  describe('Track separator', () => {
    it('should parse semicolon as track separator', () => {
      const result = mml2ast('c;d');
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('note');
      expect(result[1].type).toBe('trackSeparator');
      expect(result[2].type).toBe('note');
    });

    it('should parse multiple tracks', () => {
      const result = mml2ast('cde;efg;abc');
      const separators = result.filter(t => t.type === 'trackSeparator');
      expect(separators).toHaveLength(2);
    });

    it('should parse tracks with different commands', () => {
      const result = mml2ast('o4 l8 cde; o5 l16 efg');
      const separators = result.filter(t => t.type === 'trackSeparator');
      expect(separators).toHaveLength(1);
      expect(result.length).toBeGreaterThan(5);
    });

    it('should handle empty track before separator', () => {
      const result = mml2ast(';c');
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('trackSeparator');
      expect(result[1].type).toBe('note');
    });

    it('should handle empty track after separator', () => {
      const result = mml2ast('c;');
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('note');
      expect(result[1].type).toBe('trackSeparator');
    });
  });

  describe('Chord commands', () => {
    it('should parse simple chord', () => {
      const result = mml2ast("'ceg'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes).toHaveLength(3);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '' });
      expect(result[0].notes[2]).toEqual({ note: 'g', accidental: '' });
      expect(result[0].duration).toBeNull();
      expect(result[0].dots).toBe(0);
    });

    it('should parse chord with duration inside quotes', () => {
      // Duration should be inside quotes in mml2abc format
      const result = mml2ast("'c4eg'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].duration).toBe(4);
    });

    it('should parse chord with accidentals', () => {
      const result = mml2ast("'c+eg-'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '+' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '' });
      expect(result[0].notes[2]).toEqual({ note: 'g', accidental: '-' });
    });

    it('should parse chord with dots (duration inside quotes)', () => {
      // Duration should be inside quotes, dots after closing quote
      const result = mml2ast("'c4eg'..");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].duration).toBe(4);
      expect(result[0].dots).toBe(2);
    });

    it('should parse mixed notes and chords', () => {
      const result = mml2ast("c 'eg' d");
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('note');
      expect(result[1].type).toBe('chord');
      expect(result[2].type).toBe('note');
    });

    it('should parse chord with double accidentals', () => {
      const result = mml2ast("'c++e--'");
      expect(result).toHaveLength(1);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '++' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '--' });
    });

    it('should handle single-note chord', () => {
      const result = mml2ast("'c'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes).toHaveLength(1);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '' });
    });

    it('should handle chord with whitespace', () => {
      const result = mml2ast("'c e g'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes).toHaveLength(3);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '' });
      expect(result[0].notes[2]).toEqual({ note: 'g', accidental: '' });
    });

    it('should reject empty chord', () => {
      expect(() => mml2ast("''")).toThrow(/Empty chord.*must contain at least one note/);
    });

    it('should use first number inside chord as duration and ignore subsequent numbers', () => {
      // Following mml2abc format: first number becomes duration, others ignored
      const result = mml2ast("'c4e8g'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes).toHaveLength(3);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '' });
      expect(result[0].notes[2]).toEqual({ note: 'g', accidental: '' });
      expect(result[0].duration).toBe(4); // First number (4) is used as duration
    });

    it('should ignore numbers after closing single quote', () => {
      // Following mml2abc format: numbers after closing quote are ignored
      const result = mml2ast("'ceg'8");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].duration).toBeNull(); // No duration inside quotes, so null
    });

    it('should use first number inside chord and ignore number after closing quote', () => {
      // First number inside is duration, number after closing quote is ignored
      const result = mml2ast("'c4eg'16");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].duration).toBe(4); // First number (4) inside quotes is used
    });

    it('should handle complex chord with multiple numbers', () => {
      // Multiple numbers inside: first is duration, rest ignored
      const result = mml2ast("'c+4e8g-16'");
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('chord');
      expect(result[0].notes).toHaveLength(3);
      expect(result[0].notes[0]).toEqual({ note: 'c', accidental: '+' });
      expect(result[0].notes[1]).toEqual({ note: 'e', accidental: '' });
      expect(result[0].notes[2]).toEqual({ note: 'g', accidental: '-' });
      expect(result[0].duration).toBe(4); // First number (4)
    });

    it('should parse chord-local octave changes without affecting the outer track octave', () => {
      const result = mml2ast("o4'c<g' a");
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ type: 'octave', value: 4, length: 2 });
      expect(result[1].type).toBe('chord');
      expect(result[1].notes).toEqual([
        { note: 'c', accidental: '' },
        { note: 'g', accidental: '', octaveOffset: 1 }
      ]);
      expect(result[2].type).toBe('note');
      expect(result[2].note).toBe('a');
    });

    it('should parse multiple chord-local octave increases', () => {
      const result = mml2ast("o4'c<g<a'");
      expect(result[1].notes).toEqual([
        { note: 'c', accidental: '' },
        { note: 'g', accidental: '', octaveOffset: 1 },
        { note: 'a', accidental: '', octaveOffset: 2 }
      ]);
    });

    it('should parse chord-local octave changes before the first note and between notes', () => {
      const result = mml2ast("o4'>c<ga'");
      expect(result[1].notes).toEqual([
        { note: 'c', accidental: '', octaveOffset: -1 },
        { note: 'g', accidental: '' },
        { note: 'a', accidental: '' }
      ]);
    });

    it('should parse chord-local octave changes before the first note only', () => {
      const result = mml2ast("o4'>cga'");
      expect(result[1].notes).toEqual([
        { note: 'c', accidental: '', octaveOffset: -1 },
        { note: 'g', accidental: '', octaveOffset: -1 },
        { note: 'a', accidental: '', octaveOffset: -1 }
      ]);
    });

    it('should keep adjacent single-note chords separate when they use chord-local octave changes', () => {
      const result = mml2ast("'<c1''<c'");
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        type: 'chord',
        notes: [
          { note: 'c', accidental: '', octaveOffset: 1 }
        ],
        duration: 1,
        dots: 0,
        length: 5
      });
      expect(result[1]).toEqual({
        type: 'chord',
        notes: [
          { note: 'c', accidental: '', octaveOffset: 1 }
        ],
        duration: null,
        dots: 0,
        length: 4
      });
    });
  });

  describe('Tempo command', () => {
    it('should parse tempo command "t120"', () => {
      const result = mml2ast('t120');
      expect(result).toEqual([
        { type: 'tempo', value: 120, length: 4 }
      ]);
    });



    it('should parse tempo command without value "t"', () => {
      const result = mml2ast('t');
      expect(result).toEqual([
        { type: 'tempo', value: null, length: 1 }
      ]);
    });

    it('should parse tempo with notes "t120 o4 c"', () => {
      const result = mml2ast('t120 o4 c');
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('tempo');
      expect(result[0].value).toBe(120);
      expect(result[1].type).toBe('octave');
      expect(result[1].value).toBe(4);
      expect(result[2].type).toBe('note');
      expect(result[2].note).toBe('c');
    });

    it('should parse multiple tempo changes', () => {
      const result = mml2ast('t120 c t140 d');
      expect(result).toHaveLength(4);
      expect(result[0].type).toBe('tempo');
      expect(result[0].value).toBe(120);
      expect(result[1].type).toBe('note');
      expect(result[2].type).toBe('tempo');
      expect(result[2].value).toBe(140);
      expect(result[3].type).toBe('note');
    });

    it('should NOT parse uppercase tempo command "T120"', () => {
      // Uppercase T should not be recognized as a tempo command
      const result = mml2ast('T120');
      // It should either be empty or parse differently, but not as a tempo
      expect(result.length).toBe(0); // No valid tokens parsed
    });

    it('should NOT parse uppercase volume command "V100"', () => {
      // Uppercase V should not be recognized as a volume command
      const result = mml2ast('V100');
      expect(result.length).toBe(0); // No valid tokens parsed
    });

    it('should NOT parse uppercase gate time command "Q80"', () => {
      // Uppercase Q should not be recognized as a gate time command
      const result = mml2ast('Q80');
      expect(result.length).toBe(0); // No valid tokens parsed
    });
  });
});
