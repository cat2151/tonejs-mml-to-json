import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('@DelayVibrato effect', () => {
  describe('Single effect', () => {
    it('should create Vibrato node with hardcoded initial depth 0', () => {
      const mml = '@DelayVibrato c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: createNode(Synth) + createNode(Vibrato) + 
      //              connect(Synth->Vibrato) + connect(Vibrato->toDestination) +
      //              triggerAttackRelease + 2x depth.rampTo
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Vibrato');
      
      // Check that Vibrato is created with frequency=7, depth=0
      expect(createNodes[1].args).toEqual([7, 0]);
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(2);
      // Synth connects to Vibrato
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1); // nodeId of Vibrato
      // Vibrato connects to destination
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      expect(notes[0].args[0]).toBe('c4');
      
      // Check depth.rampTo commands
      const rampCommands = json.filter(e => e.eventType === 'depth.rampTo');
      expect(rampCommands).toHaveLength(2);
      
      // First ramp: starts at +192i, ramps to 0.2 over 192i
      expect(rampCommands[0].nodeId).toBe(1); // Vibrato node
      expect(rampCommands[0].args[0]).toBe('0.2'); // target depth
      expect(rampCommands[0].args[1]).toBe('192i'); // ramp duration
      expect(rampCommands[0].args[2]).toBe('+192i'); // start time
      
      // Second ramp: when note ends, ramps to 0 over 10i
      expect(rampCommands[1].nodeId).toBe(1); // Vibrato node
      expect(rampCommands[1].args[0]).toBe('0'); // target depth
      expect(rampCommands[1].args[1]).toBe('10i'); // ramp duration
      // start time should be when note ends (192 ticks per quarter, default is 8th note = 96 ticks)
      expect(rampCommands[1].args[2]).toBe('+96i');
    });

    it('should generate depth.rampTo for multiple notes', () => {
      const mml = '@DelayVibrato c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(2);
      
      // Should have 2 depth.rampTo commands per note = 4 total
      const rampCommands = json.filter(e => e.eventType === 'depth.rampTo');
      expect(rampCommands).toHaveLength(4);
      
      // First note's ramps
      expect(rampCommands[0].args[2]).toBe('+192i'); // start after 192 ticks
      expect(rampCommands[1].args[2]).toBe('+96i'); // end when first note ends
      
      // Second note's ramps (note starts at +96i)
      expect(rampCommands[2].args[2]).toBe('+288i'); // start after 192 ticks from note start (96 + 192)
      expect(rampCommands[3].args[2]).toBe('+192i'); // end when second note ends (96 + 96)
    });
  });

  describe('DelayVibrato with custom instrument', () => {
    it('should apply DelayVibrato to custom instrument specified before first note', () => {
      const mml = '@FMSynth @DelayVibrato c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes[0].nodeType).toBe('FMSynth');
      expect(createNodes[1].nodeType).toBe('Vibrato');
      
      const connects = json.filter(e => e.eventType === 'connect');
      // FMSynth -> Vibrato -> toDestination
      expect(connects[0].connectTo).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
      
      // Should still have depth.rampTo commands
      const rampCommands = json.filter(e => e.eventType === 'depth.rampTo');
      expect(rampCommands).toHaveLength(2);
    });
  });

  describe('DelayVibrato with chords', () => {
    it('should generate depth.rampTo for chords', () => {
      const mml = '@DelayVibrato \'ceg\'';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      expect(notes[0].args[0]).toEqual(['c4', 'e4', 'g4']); // chord notes
      
      // Should have depth.rampTo commands for the chord
      const rampCommands = json.filter(e => e.eventType === 'depth.rampTo');
      expect(rampCommands).toHaveLength(2);
      expect(rampCommands[0].args[0]).toBe('0.2');
      expect(rampCommands[1].args[0]).toBe('0');
    });
  });

  describe('Command order', () => {
    it('should have correct command order for multi-track with DelayVibrato', () => {
      const mml = '@DelayVibrato c;d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // All setup commands should come before non-setup commands
      const firstSetupIndex = json.findIndex(e => 
        e.eventType === 'createNode' || e.eventType === 'connect'
      );
      const firstNonSetupIndex = json.findIndex(e => 
        e.eventType !== 'createNode' && e.eventType !== 'connect'
      );
      
      expect(firstSetupIndex).toBeLessThan(firstNonSetupIndex);
    });
  });
});
