import { describe, it, expect } from 'vitest';
import { ast2json } from '../src/ast2json';

describe('ast2json', () => {
  describe('Non-Sampler instruments with args', () => {
    it('should pass args to FMSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":3,"modulationIndex":10}',
          length: 47
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Check createNode has args
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("FMSynth");
      
      // Check that args were passed through
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(3);
      expect(createNodes[0].args.modulationIndex).toBe(10);
    });

    it('should pass args to AMSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "AMSynth", 
          args: '{"harmonicity":2.5}',
          length: 28
        },
        { type: 'note', note: 'e', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("AMSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(2.5);
    });

    it('should pass args to MonoSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "MonoSynth", 
          args: '{"filter":{"Q":2,"type":"lowpass","rolloff":-12},"envelope":{"attack":0.005}}',
          length: 90
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("MonoSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.filter).toBeDefined();
      expect(createNodes[0].args.filter.Q).toBe(2);
      expect(createNodes[0].args.envelope).toBeDefined();
      expect(createNodes[0].args.envelope.attack).toBe(0.005);
    });

    it('should pass args to PluckSynth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "PluckSynth", 
          args: '{"attackNoise":0.5,"dampening":4000,"resonance":0.95}',
          length: 65
        },
        { type: 'note', note: 'a', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("PluckSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.attackNoise).toBe(0.5);
      expect(createNodes[0].args.dampening).toBe(4000);
      expect(createNodes[0].args.resonance).toBe(0.95);
    });

    it('should pass args to Synth when provided', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "Synth", 
          args: '{"oscillator":{"type":"triangle"},"envelope":{"attack":0.01}}',
          length: 70
        },
        { type: 'note', note: 'g', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("Synth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.oscillator).toBeDefined();
      expect(createNodes[0].args.oscillator.type).toBe("triangle");
      expect(createNodes[0].args.envelope).toBeDefined();
      expect(createNodes[0].args.envelope.attack).toBe(0.01);
    });

    it('should handle instrument switching with args', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":3}',
          length: 27
        },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { 
          type: 'instrument', 
          value: "AMSynth", 
          args: '{"harmonicity":2}',
          length: 27
        },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(2);
      
      // First instrument: FMSynth with args
      expect(createNodes[0].nodeType).toBe("FMSynth");
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.harmonicity).toBe(3);
      
      // Second instrument: AMSynth with args
      expect(createNodes[1].nodeType).toBe("AMSynth");
      expect(createNodes[1].args).toBeDefined();
      expect(createNodes[1].args.harmonicity).toBe(2);
    });

    it('should pass args to PolySynth when chords are used with non-Sampler instrument', () => {
      const ast = [
        { 
          type: 'instrument', 
          value: "FMSynth", 
          args: '{"harmonicity":5}',
          length: 27
        },
        { 
          type: 'chord', 
          notes: [
            { note: 'c', accidental: '' },
            { note: 'e', accidental: '' },
            { note: 'g', accidental: '' }
          ],
          duration: null, 
          dots: 0, 
          length: 5 
        }
      ];
      const result = ast2json(ast);
      
      // Should create PolySynth (not FMSynth) because track has chords
      const createNodes = result.filter(c => c.eventType === "createNode");
      expect(createNodes).toHaveLength(1);
      expect(createNodes[0].nodeType).toBe("PolySynth");
      
      // Args should be wrapped with voice and options
      expect(createNodes[0].args).toBeDefined();
      expect(createNodes[0].args.voice).toBe("FMSynth");
      expect(createNodes[0].args.options).toBeDefined();
      expect(createNodes[0].args.options.harmonicity).toBe(5);
    });
  });

  describe('Tempo command', () => {
    it('should convert tempo AST to JSON command', () => {
      const ast = [
        { type: 'tempo', value: 120, length: 4 }
      ];
      const result = ast2json(ast);
      
      // Should have setup commands + tempo command
      expect(result).toHaveLength(4);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [120]
      });
    });

    it('should convert tempo with notes', () => {
      const ast = [
        { type: 'tempo', value: 140, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(5); // setup + tempo + note
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [140]
      });
      expect(result[3].eventType).toBe("triggerAttackRelease");
      expect(result[3].args[0]).toBe("c4");
    });

    it('should handle multiple tempo changes', () => {
      const ast = [
        { type: 'tempo', value: 120, length: 4 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'tempo', value: 140, length: 4 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(7); // setup + tempo + note + tempo + note
      
      // First tempo
      expect(result[2]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [120]
      });
      
      // Second tempo
      expect(result[4]).toEqual({
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [140]
      });
    });

    it('should ignore tempo without value', () => {
      const ast = [
        { type: 'tempo', value: null, length: 1 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should have setup + note, but no tempo command
      expect(result).toHaveLength(4);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("triggerAttackRelease");
    });
  });

  describe('Volume command', () => {
    it('should convert volume AST to JSON command', () => {
      const ast = [
        { type: 'volume', value: 8, length: 2 }
      ];
      const result = ast2json(ast);
      
      // Should have setup commands + volume command
      expect(result).toHaveLength(4);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 8 (mmlabc dialect) should map to -6dB
      expect(result[2].args[0]).toBeCloseTo(-6, 2);
    });

    it('should convert maximum volume correctly', () => {
      const ast = [
        { type: 'volume', value: 15, length: 3 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 15 should map to 0dB
      expect(result[2].args[0]).toBe(0);
    });

    it('should convert minimum volume correctly', () => {
      const ast = [
        { type: 'volume', value: 0, length: 2 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 0 should map to -100dB (silence)
      expect(result[2].args[0]).toBe(-100);
    });

    it('should convert volume with notes', () => {
      const ast = [
        { type: 'volume', value: 10, length: 3 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(5); // setup + volume + note
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      expect(result[3].eventType).toBe("triggerAttackRelease");
      expect(result[3].args[0]).toBe("c4");
    });

    it('should handle multiple volume changes', () => {
      const ast = [
        { type: 'volume', value: 8, length: 2 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 },
        { type: 'volume', value: 5, length: 2 },
        { type: 'note', note: 'd', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(7); // setup + volume + note + volume + note
      
      // First volume (v8 = -6dB)
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      expect(result[2].args[0]).toBeCloseTo(-6, 2);
      
      // Second volume (v5: (5-15)*(6/7) ≈ -8.57dB)
      expect(result[4].eventType).toBe("set");
      expect(result[4].nodeType).toBe("volume.value");
      expect(result[4].args[0]).toBeCloseTo(-8.57, 2);
    });

    it('should ignore volume without value', () => {
      const ast = [
        { type: 'volume', value: null, length: 1 },
        { type: 'note', note: 'c', accidental: '', duration: null, dots: 0, length: 1 }
      ];
      const result = ast2json(ast);
      
      // Should have setup + note, but no volume command
      expect(result).toHaveLength(4);
      expect(result[0].eventType).toBe("createNode");
      expect(result[1].eventType).toBe("connect");
      expect(result[2].eventType).toBe("triggerAttackRelease");
    });

    it('should clamp volume values above 15 to maximum', () => {
      const ast = [
        { type: 'volume', value: 255, length: 4 }
      ];
      const result = ast2json(ast);
      
      expect(result).toHaveLength(4);
      expect(result[2].eventType).toBe("set");
      expect(result[2].nodeType).toBe("volume.value");
      // Volume 255 should be clamped to 15, which maps to 0dB
      expect(result[2].args[0]).toBe(0);
    });

    it('should clamp various volume values above 15', () => {
      // Test multiple values above 15 to ensure consistent clamping
      const testCases = [
        { value: 16 },  // Just above max
        { value: 50 },  // Moderately above
        { value: 100 }, // Well above max
        { value: 255 }, // Far above max
      ];

      testCases.forEach(({ value }) => {
        const ast = [{ type: 'volume', value, length: 4 }];
        const result = ast2json(ast);
        
        expect(result).toHaveLength(4);
        expect(result[2].eventType).toBe("set");
        expect(result[2].nodeType).toBe("volume.value");
        // All values above 15 should be clamped to 15, which maps to 0dB
        expect(result[2].args[0]).toBe(0);
      });
    });
  });
});
