import { describe, it, expect } from 'vitest';
import { mml2ast } from '../src/mml2ast';
import { ast2json } from '../src/ast2json';

describe('@PingPongDelay effect', () => {
  describe('Single effect', () => {
    it('should create PingPongDelay node and connect it between instrument and destination', () => {
      const mml = '@PingPongDelay c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: createNode(Synth) + connect(Synth->PingPongDelay) + 
      //              createNode(PingPongDelay) + connect(PingPongDelay->toDestination) +
      //              triggerAttackRelease
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(2);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(2);
      // Synth connects to PingPongDelay
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1); // nodeId of PingPongDelay
      // PingPongDelay connects to destination
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(1);
      expect(notes[0].args[0]).toBe('c4');
    });

    it('should pass args to PingPongDelay', () => {
      const mml = '@PingPongDelay{"delayTime":"8n"} c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      const pingPongNode = createNodes.find(n => n.nodeType === 'PingPongDelay');
      expect(pingPongNode).toBeDefined();
      expect(pingPongNode.args).toBeDefined();
      expect(pingPongNode.args.delayTime).toBe('8n');
    });
  });

  describe('Multiple effects in series', () => {
    it('should chain two PingPongDelay effects in series', () => {
      const mml = '@PingPongDelay @PingPongDelay c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: Synth -> PingPongDelay1 -> PingPongDelay2 -> toDestination
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      expect(createNodes[2].nodeType).toBe('PingPongDelay');
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(3);
      // Synth -> PingPongDelay1
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1);
      // PingPongDelay1 -> PingPongDelay2
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe(2);
      // PingPongDelay2 -> toDestination
      expect(connects[2].nodeId).toBe(2);
      expect(connects[2].connectTo).toBe('toDestination');
    });

    it('should chain three PingPongDelay effects with args', () => {
      const mml = '@PingPongDelay{"delayTime":"8n"} @PingPongDelay{"delayTime":"16n"} @PingPongDelay c';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: Synth -> Effect1 -> Effect2 -> Effect3 -> toDestination
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(4);
      
      const pingPongNodes = createNodes.filter(n => n.nodeType === 'PingPongDelay');
      expect(pingPongNodes).toHaveLength(3);
      expect(pingPongNodes[0].args.delayTime).toBe('8n');
      expect(pingPongNodes[1].args.delayTime).toBe('16n');
      expect(pingPongNodes[2].args).toBeUndefined();
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(4);
    });
  });

  describe('Effects with instrument switching', () => {
    it('should apply effects after instrument change', () => {
      const mml = '@FMSynth @PingPongDelay c d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes[0].nodeType).toBe('FMSynth');
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      
      const connects = json.filter(e => e.eventType === 'connect');
      // FMSynth -> PingPongDelay -> toDestination
      expect(connects[0].connectTo).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
    });
  });
});
