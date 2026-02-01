import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('Multiple effect types support', () => {
  describe('Single effect types', () => {
    it('should create Reverb node', () => {
      const mml = '@Reverb c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Reverb');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(2);
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1);
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
    });

    it('should create Chorus node', () => {
      const mml = '@Chorus c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Chorus');
    });

    it('should create FeedbackDelay node', () => {
      const mml = '@FeedbackDelay c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('FeedbackDelay');
    });

    it('should create Phaser node', () => {
      const mml = '@Phaser c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Phaser');
    });

    it('should create Tremolo node', () => {
      const mml = '@Tremolo c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Tremolo');
    });

    it('should create Vibrato node', () => {
      const mml = '@Vibrato c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Vibrato');
    });

    it('should create Distortion node', () => {
      const mml = '@Distortion c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Distortion');
    });
  });

  describe('Effects with arguments', () => {
    it('should pass args to Reverb', () => {
      const mml = '@Reverb{"decay":2.5} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      const reverbNode = createNodes.find(n => n.nodeType === 'Reverb');
      expect(reverbNode).toBeDefined();
      expect(reverbNode.args).toBeDefined();
      expect(Array.isArray(reverbNode.args)).toBe(true);
      expect(reverbNode.args[0]).toBe(2.5);
    });

    it('should pass args to Chorus', () => {
      const mml = '@Chorus{"frequency":4,"delayTime":2.5,"depth":0.7} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      const chorusNode = createNodes.find(n => n.nodeType === 'Chorus');
      expect(chorusNode).toBeDefined();
      expect(chorusNode.args).toBeDefined();
      expect(Array.isArray(chorusNode.args)).toBe(true);
      expect(chorusNode.args[0]).toBe(4);
      expect(chorusNode.args[1]).toBe(2.5);
      expect(chorusNode.args[2]).toBe(0.7);
    });

    it('should pass args to FeedbackDelay', () => {
      const mml = '@FeedbackDelay{"delayTime":"8n","feedback":0.5} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      const delayNode = createNodes.find(n => n.nodeType === 'FeedbackDelay');
      expect(delayNode).toBeDefined();
      expect(delayNode.args).toBeDefined();
      expect(Array.isArray(delayNode.args)).toBe(true);
      expect(delayNode.args[0]).toBe('8n');
      expect(delayNode.args[1]).toBe(0.5);
    });
  });

  describe('Mixed effect types in series', () => {
    it('should chain PingPongDelay and Reverb', () => {
      const mml = '@PingPongDelay @Reverb c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: Synth -> PingPongDelay -> Reverb -> toDestination
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      expect(createNodes[2].nodeType).toBe('Reverb');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(3);
      // Synth -> PingPongDelay
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1);
      // PingPongDelay -> Reverb
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe(2);
      // Reverb -> toDestination
      expect(connects[2].nodeId).toBe(2);
      expect(connects[2].connectTo).toBe('toDestination');
    });

    it('should chain Chorus and Distortion', () => {
      const mml = '@Chorus @Distortion c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Chorus');
      expect(createNodes[2].nodeType).toBe('Distortion');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(3);
    });

    it('should chain three different effects', () => {
      const mml = '@Reverb @Chorus @PingPongDelay c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: Synth -> Reverb -> Chorus -> PingPongDelay -> toDestination
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(4);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('Reverb');
      expect(createNodes[2].nodeType).toBe('Chorus');
      expect(createNodes[3].nodeType).toBe('PingPongDelay');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(4);
      // Verify connection chain
      expect(connects[0].connectTo).toBe(1);
      expect(connects[1].connectTo).toBe(2);
      expect(connects[2].connectTo).toBe(3);
      expect(connects[3].connectTo).toBe('toDestination');
    });

    it('should chain effects with arguments', () => {
      const mml = '@Reverb{"decay":2} @Chorus{"frequency":4} @PingPongDelay{"delayTime":"8n"} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(4);
      
      const reverbNode = createNodes.find(n => n.nodeType === 'Reverb');
      const chorusNode = createNodes.find(n => n.nodeType === 'Chorus');
      const delayNode = createNodes.find(n => n.nodeType === 'PingPongDelay');
      
      expect(reverbNode.args[0]).toBe(2);
      expect(chorusNode.args[0]).toBe(4);
      expect(delayNode.args[0]).toBe('8n');
    });
  });

  describe('Effects with custom instrument', () => {
    it('should apply mixed effects to FMSynth', () => {
      const mml = '@FMSynth @Reverb @Chorus c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes[0].nodeType).toBe('FMSynth');
      expect(createNodes[1].nodeType).toBe('Reverb');
      expect(createNodes[2].nodeType).toBe('Chorus');
      
      const connects = json.filter(e => e.eventType === 'connect');
      // FMSynth -> Reverb -> Chorus -> toDestination
      expect(connects[0].connectTo).toBe(1);
      expect(connects[1].connectTo).toBe(2);
      expect(connects[2].connectTo).toBe('toDestination');
    });
  });
});
