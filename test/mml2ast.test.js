import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';

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
    it('should parse instrument command "@Synth"', () => {
      const result = mml2ast('@Synth');
      expect(result).toEqual([
        { type: 'instrument', value: "Synth", length: 6 }
      ]);
    });

    it('should parse instrument command "@FMSynth"', () => {
      const result = mml2ast('@FMSynth');
      expect(result).toEqual([
        { type: 'instrument', value: "FMSynth", length: 8 }
      ]);
    });

    it('should parse instrument command without value "@"', () => {
      const result = mml2ast('@');
      expect(result).toEqual([
        { type: 'instrument', value: null, length: 1 }
      ]);
    });

    it('should parse @Sampler with JSON args', () => {
      const result = mml2ast('@Sampler{"urls":{"C4":"test.mp3"},"release":1}');
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('instrument');
      expect(result[0].value).toBe('Sampler');
      expect(result[0].args).toBeDefined();
      
      // Validate that args contains valid JSON
      const parsedArgs = JSON.parse(result[0].args);
      expect(parsedArgs).toHaveProperty('urls');
      expect(parsedArgs.urls).toHaveProperty('C4', 'test.mp3');
      expect(parsedArgs).toHaveProperty('release', 1);
    });

    it('should parse @Sampler with nested JSON', () => {
      const result = mml2ast('@Sampler{"urls":{"C4":"a.mp3","D4":"b.mp3"}}');
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('instrument');
      expect(result[0].value).toBe('Sampler');
      expect(result[0].args).toBeDefined();
    });

    it('should parse regular @Synth without args', () => {
      const result = mml2ast('@Synth');
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('instrument');
      expect(result[0].value).toBe('Synth');
      expect(result[0].args).toBeUndefined();
    });

    it('should parse @FMSynth with multiline JSON args', () => {
      const mml = `@FMSynth{
  "harmonicity": 3,
  "modulationIndex": 10
} o4 c`;
      const result = mml2ast(mml);
      expect(result).toHaveLength(3); // instrument, octave, note
      expect(result[0].type).toBe('instrument');
      expect(result[0].value).toBe('FMSynth');
      expect(result[0].args).toBeDefined();
      
      // Validate that multiline JSON is correctly parsed
      const parsedArgs = JSON.parse(result[0].args);
      expect(parsedArgs).toHaveProperty('harmonicity', 3);
      expect(parsedArgs).toHaveProperty('modulationIndex', 10);
      
      // Check the octave and note are also parsed
      expect(result[1].type).toBe('octave');
      expect(result[1].value).toBe(4);
      expect(result[2].type).toBe('note');
      expect(result[2].note).toBe('c');
    });

    it('should parse @MonoSynth with nested multiline JSON args', () => {
      const mml = `@MonoSynth{
  "filter": {
    "Q": 2,
    "type": "lowpass"
  },
  "envelope": {
    "attack": 0.005
  }
} o3 c`;
      const result = mml2ast(mml);
      expect(result).toHaveLength(3); // instrument, octave, note
      expect(result[0].type).toBe('instrument');
      expect(result[0].value).toBe('MonoSynth');
      expect(result[0].args).toBeDefined();
      
      // Validate that nested multiline JSON is correctly parsed
      const parsedArgs = JSON.parse(result[0].args);
      expect(parsedArgs).toHaveProperty('filter');
      expect(parsedArgs.filter).toHaveProperty('Q', 2);
      expect(parsedArgs.filter).toHaveProperty('type', 'lowpass');
      expect(parsedArgs).toHaveProperty('envelope');
      expect(parsedArgs.envelope).toHaveProperty('attack', 0.005);
    });
  });

  describe('Tempo command', () => {
    it('should parse tempo command "t120"', () => {
      const result = mml2ast('t120');
      expect(result).toEqual([
        { type: 'tempo', value: 120, length: 4 }
      ]);
    });

    it('should parse tempo command "T140"', () => {
      const result = mml2ast('T140');
      expect(result).toEqual([
        { type: 'tempo', value: 140, length: 4 }
      ]);
    });

    it('should parse tempo command without value "t"', () => {
      const result = mml2ast('t');
      expect(result).toEqual([
        { type: 'tempo', value: null, length: 1 }
      ]);
    });
  });

  describe('Volume command', () => {
    it('should parse volume command "v100"', () => {
      const result = mml2ast('v100');
      expect(result).toEqual([
        { type: 'volume', value: 100, length: 4 }
      ]);
    });

    it('should parse volume command "V80"', () => {
      const result = mml2ast('V80');
      expect(result).toEqual([
        { type: 'volume', value: 80, length: 3 }
      ]);
    });

    it('should parse volume command without value "v"', () => {
      const result = mml2ast('v');
      expect(result).toEqual([
        { type: 'volume', value: null, length: 1 }
      ]);
    });
    
    it('should parse volume command with minimum value "v0"', () => {
      const result = mml2ast('v0');
      expect(result).toEqual([
        { type: 'volume', value: 0, length: 2 }
      ]);
    });
    
    it('should parse volume command with maximum value "v127"', () => {
      const result = mml2ast('v127');
      expect(result).toEqual([
        { type: 'volume', value: 127, length: 4 }
      ]);
    });
  });

  describe('Gate time command', () => {
    it('should parse gate time command "q60"', () => {
      const result = mml2ast('q60');
      expect(result).toEqual([
        { type: 'gateTime', value: 60, length: 3 }
      ]);
    });

    it('should parse gate time command "Q80"', () => {
      const result = mml2ast('Q80');
      expect(result).toEqual([
        { type: 'gateTime', value: 80, length: 3 }
      ]);
    });

    it('should parse gate time command without value "q"', () => {
      const result = mml2ast('q');
      expect(result).toEqual([
        { type: 'gateTime', value: null, length: 1 }
      ]);
    });

    it('should parse gate time with various values', () => {
      expect(mml2ast('q0')).toEqual([{ type: 'gateTime', value: 0, length: 2 }]);
      expect(mml2ast('q50')).toEqual([{ type: 'gateTime', value: 50, length: 3 }]);
      expect(mml2ast('q100')).toEqual([{ type: 'gateTime', value: 100, length: 4 }]);
    });
  });

  describe('Key transpose command', () => {
    it('should parse key transpose command "kt2"', () => {
      const result = mml2ast('kt2');
      expect(result).toEqual([
        { type: 'keyTranspose', value: 2, length: 3 }
      ]);
    });

    it('should parse key transpose command with negative value "kt-3"', () => {
      const result = mml2ast('kt-3');
      expect(result).toEqual([
        { type: 'keyTranspose', value: -3, length: 4 }
      ]);
    });

    it('should parse uppercase key transpose command "KT5"', () => {
      const result = mml2ast('KT5');
      expect(result).toEqual([
        { type: 'keyTranspose', value: 5, length: 3 }
      ]);
    });

    it('should parse key transpose command without value "kt"', () => {
      const result = mml2ast('kt');
      expect(result).toEqual([
        { type: 'keyTranspose', value: null, length: 2 }
      ]);
    });

    it('should parse key transpose with zero "kt0"', () => {
      const result = mml2ast('kt0');
      expect(result).toEqual([
        { type: 'keyTranspose', value: 0, length: 3 }
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
  });

  describe('Tempo command', () => {
    it('should parse tempo command "t120"', () => {
      const result = mml2ast('t120');
      expect(result).toEqual([
        { type: 'tempo', value: 120, length: 4 }
      ]);
    });

    it('should parse tempo command with uppercase "T140"', () => {
      const result = mml2ast('T140');
      expect(result).toEqual([
        { type: 'tempo', value: 140, length: 4 }
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
  });
});
