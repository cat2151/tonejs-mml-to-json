import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('loopEnd event', () => {
  describe('Single track', () => {
    it('should add loopEnd event at the end of empty sequence', () => {
      const ast = [];
      const result = ast2json(ast);
      
      // Last command should be loopEnd
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+0i']); // Empty sequence ends at 0
    });

    it('should add loopEnd event after single note', () => {
      const mml = 'c';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Last command should be loopEnd
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+96i']); // One eighth note (default) = 96 ticks
    });

    it('should add loopEnd event with correct timing after multiple notes', () => {
      const mml = 'c4 d8 e16';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Calculate expected end time: 192 (c4) + 96 (d8) + 48 (e16) = 336 ticks
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+336i']);
    });

    it('should add loopEnd event considering rests', () => {
      const mml = 'c4 r4 d4';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Calculate expected end time: 192 (c4) + 192 (r4) + 192 (d4) = 576 ticks
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+576i']);
    });

    it('should add loopEnd event with dotted notes', () => {
      const mml = 'c4.';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Dotted quarter note: 192 * 1.5 = 288 ticks
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+288i']);
    });

    it('should add loopEnd event with gate time q command', () => {
      const mml = 'q4 c4';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // q4 is 50% gate time, but it doesn't affect the TIMING, only the duration
      // The note still takes 192 ticks of time, even if it's only played for half of it
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+192i']);
    });

    it('should track total time correctly with chords', () => {
      const mml = "'c4eg' 'd8fa'";
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Quarter note chord + eighth note chord: 192 + 96 = 288 ticks
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+288i']);
    });
  });

  describe('Multi-track', () => {
    it('should add loopEnd event with timing from longest track', () => {
      const mml = 'c4;d8';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Track 0: c4 = 192 ticks
      // Track 1: d8 = 96 ticks
      // loopEnd should be at 192 ticks (longest track)
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+192i']);
    });

    it('should add loopEnd event with equal length tracks', () => {
      const mml = 'c4;d4;e4';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // All tracks: 192 ticks
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+192i']);
    });

    it('should add loopEnd event when second track is longer', () => {
      const mml = 'c8;d4';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Track 0: c8 = 96 ticks
      // Track 1: d4 = 192 ticks
      // loopEnd should be at 192 ticks (longest track)
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+192i']);
    });

    it('should add loopEnd event with multiple notes in each track', () => {
      const mml = 'c8 d8;e4 f8';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Track 0: c8 + d8 = 96 + 96 = 192 ticks
      // Track 1: e4 + f8 = 192 + 96 = 288 ticks
      // loopEnd should be at 288 ticks (longest track)
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      expect(lastCmd.args).toEqual(['+288i']);
    });

    it('should add only one loopEnd event for multi-track sequences', () => {
      const mml = 'c;d;e';
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // Count loopEnd events - should be exactly 1
      const loopEndEvents = result.filter(cmd => cmd.eventType === 'loopEnd');
      expect(loopEndEvents.length).toBe(1);
    });
  });

  describe('Purpose and Usage', () => {
    it('should help streaming sequencer know where the loop ends', () => {
      const mml = 'q4 c4 d8';  // Use q4 (50% gate time) to show impact
      const ast = mml2ast(mml);
      const result = ast2json(ast);
      
      // The loopEnd event tells tonejs-json-sequencer where to restart the loop
      const lastCmd = result[result.length - 1];
      expect(lastCmd.eventType).toBe('loopEnd');
      
      // It should have the total duration of the sequence
      // q4 means 50% gate time, but notes still take full duration in time:
      // c4 (192 ticks) + d8 (96 ticks) = 288 ticks total
      expect(lastCmd.args).toEqual(['+288i']);
      
      // This is especially important when q (gate time) command affects note durations
      // The streaming player needs to know the actual loop point regardless of gate time
      
      // Verify that the NOTE durations are affected by q4 (50% gate time)
      const notes = result.filter(cmd => cmd.eventType === 'triggerAttackRelease');
      expect(notes[0].args[1]).toBe('96i');  // c4: 192 * 0.5 = 96 ticks duration
      expect(notes[1].args[1]).toBe('48i');  // d8: 96 * 0.5 = 48 ticks duration
      
      // But the loopEnd is still at the full time (288), not affected by gate time
      // This ensures the loop restarts at the right time
    });
  });
});
