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
      expect(pingPongNode.args).toEqual({ delayTime: '8n' });
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
      expect(pingPongNodes[0].args).toEqual({ delayTime: '8n' });
      expect(pingPongNodes[1].args).toEqual({ delayTime: '16n' });
      expect(pingPongNodes[2].args).toBeUndefined();
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(4);
    });
  });

  describe('Effects with custom instrument', () => {
    it('should apply effects to custom instrument specified before first note', () => {
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

  describe('Multi-track with effect on one track', () => {
    it('should place all createNode events before all connect events when track1 has PingPongDelay and track2 has no effect', () => {
      // Reproduction case from issue #172:
      // @PingPongDelay o4 l8 c ; g
      // Previously, connect(Synth→PingPongDelay) was emitted before createNode(PingPongDelay)
      // causing track1 to be silent because the connection target didn't exist yet.
      const mml = '@PingPongDelay o4 l8 c ; g';
      const ast = mml2ast(mml);
      const json = ast2json(ast);

      const createNodes = json.filter(e => e.eventType === 'createNode');
      const connects = json.filter(e => e.eventType === 'connect');

      // Track 1: Synth(0) + PingPongDelay(1); Track 2: Synth(100)
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[0].nodeId).toBe(0);
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      expect(createNodes[1].nodeId).toBe(1);
      expect(createNodes[2].nodeType).toBe('Synth');
      expect(createNodes[2].nodeId).toBe(100);

      // All createNode events must appear before any connect event in the output
      const lastCreateNodeIndex = json.map(e => e.eventType).lastIndexOf('createNode');
      const firstConnectIndex = json.map(e => e.eventType).indexOf('connect');
      expect(lastCreateNodeIndex).toBeLessThan(firstConnectIndex);

      // Connections: Synth(0)→PingPongDelay(1), PingPongDelay(1)→dest, Synth(100)→dest
      expect(connects).toHaveLength(3);
      const connSynthToPPD = connects.find(c => c.nodeId === 0 && c.connectTo === 1);
      expect(connSynthToPPD).toBeDefined();
      const connPPDToDest = connects.find(c => c.nodeId === 1 && c.connectTo === 'toDestination');
      expect(connPPDToDest).toBeDefined();
      const connTrack2ToDest = connects.find(c => c.nodeId === 100 && c.connectTo === 'toDestination');
      expect(connTrack2ToDest).toBeDefined();

      // Both tracks produce notes
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(2);
      expect(notes.some(n => n.args[0] === 'c4')).toBe(true);
      expect(notes.some(n => n.args[0] === 'g4')).toBe(true);
    });
  });

  describe('Mid-track instrument switching behavior', () => {
    it('should bypass effects when instrument changes after notes have been played', () => {
      const mml = '@PingPongDelay c @FMSynth d';
      const ast = mml2ast(mml);
      const json = ast2json(ast);
      
      // Should have: Synth (nodeId 0), PingPongDelay (nodeId 1), FMSynth (nodeId 1)
      // Note: FMSynth reuses nodeId 1 because node_id is reset to instrument_node_id (0)
      // after initial setup, then incremented to 1 when @FMSynth is processed
      const createNodes = json.filter(e => e.eventType === 'createNode');
      expect(createNodes).toHaveLength(3);
      expect(createNodes[0].nodeType).toBe('Synth');
      expect(createNodes[0].nodeId).toBe(0);
      expect(createNodes[1].nodeType).toBe('PingPongDelay');
      expect(createNodes[1].nodeId).toBe(1);
      expect(createNodes[2].nodeType).toBe('FMSynth');
      expect(createNodes[2].nodeId).toBe(1); // Same as PingPongDelay due to node_id reset
      
      const connects = json.filter(e => e.eventType === 'connect');
      expect(connects).toHaveLength(3);
      // Synth -> PingPongDelay
      expect(connects[0].nodeId).toBe(0);
      expect(connects[0].connectTo).toBe(1);
      // PingPongDelay -> toDestination
      expect(connects[1].nodeId).toBe(1);
      expect(connects[1].connectTo).toBe('toDestination');
      // FMSynth -> toDestination (bypasses effects, same nodeId as effect but different node)
      expect(connects[2].nodeId).toBe(1);
      expect(connects[2].connectTo).toBe('toDestination');
      
      const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
      expect(notes).toHaveLength(2);
      // First note uses initial Synth (nodeId 0) with effect
      expect(notes[0].nodeId).toBe(0);
      expect(notes[0].args[0]).toBe('c4');
      // Second note uses FMSynth (nodeId 1) without effect
      expect(notes[1].nodeId).toBe(1);
      expect(notes[1].args[0]).toBe('d4');
    });
  });
});
