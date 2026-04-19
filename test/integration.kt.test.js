import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('Integration: mml2ast + ast2json', () => {
  describe('Key transpose (kt) command', () => {
    it('should transpose notes up by 2 semitones with kt2', () => {
      const mml = 'kt2 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // c -> d, d -> e, e -> f#
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("f#4"); // e + 2 = f#
    });

    it('should transpose notes down by 3 semitones with kt-3', () => {
      const mml = 'kt-3 e f g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // e -> c#, f -> d, g -> e
      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c#4"); // e - 3 = c#
      expect(json[3].args[0]).toBe("d4");  // f - 3 = d
      expect(json[4].args[0]).toBe("e4");  // g - 3 = e
    });

    it('should transpose notes across octave boundary', () => {
      const mml = 'kt3 a b';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // a + 3 = c (next octave), b + 3 = d (next octave)
      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("c5");  // a4 + 3 = c5
      expect(json[3].args[0]).toBe("d5");  // b4 + 3 = d5
    });

    it('should transpose notes down across octave boundary', () => {
      const mml = 'kt-5 c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // c - 5 = g (previous octave), d - 5 = a (previous octave)
      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("g3");  // c4 - 5 = g3
      expect(json[3].args[0]).toBe("a3");  // d4 - 5 = a3
    });

    it('should apply kt0 as no transpose', () => {
      const mml = 'kt0 c d e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c4");
      expect(json[3].args[0]).toBe("d4");
      expect(json[4].args[0]).toBe("e4");
    });

    it('should transpose chords with kt command', () => {
      const mml = 'kt2 \'ceg\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // c -> d, e -> f#, g -> a
      expect(json).toHaveLength(4); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["d4", "f#4", "a4"]);
    });

    it('should allow changing kt mid-track', () => {
      const mml = 'c kt2 d kt-1 e';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      expect(json).toHaveLength(6); // setup + 3 notes + loopEnd
      expect(json[2].args[0]).toBe("c4");  // no transpose
      expect(json[3].args[0]).toBe("e4");  // d + 2 = e
      expect(json[4].args[0]).toBe("d#4"); // e - 1 = d#
    });

    it('should transpose notes with accidentals correctly', () => {
      const mml = 'kt2 b-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // b- (Bb = 10 semitones) + 2 = c5 (12 semitones = octave up)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("c5");
    });

    it('should transpose sharp notes down correctly', () => {
      const mml = 'kt-2 c+';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // c+ (C# = 1 semitone) - 2 = b3 (previous octave)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("b3");
    });

    it('should transpose flat notes to natural correctly', () => {
      const mml = 'kt1 d-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // d- (Db = 1 semitone) + 1 = d (natural)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("d4");
    });

    it('should transpose flat notes down correctly', () => {
      const mml = 'kt-3 e-';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // e- (Eb = 3 semitones) - 3 = c (natural)
      expect(json).toHaveLength(4); // setup + 1 note + loopEnd
      expect(json[2].args[0]).toBe("c4");
    });

    it('should transpose chords with accidentals correctly', () => {
      const mml = "kt2 'b-d+f'";
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      // Bb + 2 = c5, D# + 2 = f4, F + 2 = g4
      expect(json).toHaveLength(4); // setup + 1 chord
      const chord = json[2];
      expect(chord.eventType).toBe("triggerAttackRelease");
      expect(chord.args[0]).toEqual(["c5", "f4", "g4"]);
    });

    it('should handle bare kt to reset transpose', () => {
      const mml = 'kt2 c kt d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      expect(json).toHaveLength(5); // setup + 2 notes
      expect(json[2].args[0]).toBe("d4");  // c + 2 = d
      expect(json[3].args[0]).toBe("d4");  // kt resets, d stays d
    });
  });
});
