import { describe, it, expect } from 'vitest';
import { randomInstrumentMml, randomEffectMml, randomInstrumentAndEffectMml } from '../src/random-instrument';
import { applyPath } from '../src/tone-edit-helpers';

// All instrument IDs present in tone-edit-instruments.json
const ALL_INSTRUMENT_IDS = [
  'Synth', 'AMSynth', 'DuoSynth', 'FMSynth', 'MembraneSynth',
  'MetalSynth', 'MonoSynth', 'NoiseSynth', 'PluckSynth', 'PolySynth'
];

describe('randomInstrumentMml', () => {
  it('should return a non-empty string', () => {
    const result = randomInstrumentMml();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should start with @ followed by an instrument name', () => {
    const result = randomInstrumentMml();
    expect(result).toMatch(/^@[A-Za-z]+/);
  });

  it('should return one of the built-in instrument types', () => {
    for (let i = 0; i < 30; i++) {
      const result = randomInstrumentMml();
      const match = result.match(/^@([A-Za-z]+)/);
      expect(match).not.toBeNull();
      expect(ALL_INSTRUMENT_IDS).toContain(match[1]);
    }
  });

  it('should include a JSON args block', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml();
      const jsonPart = result.replace(/^@[A-Za-z]+/, '');
      const parsed = JSON.parse(jsonPart);
      expect(typeof parsed).toBe('object');
    }
  });

  it('should include oscillator type for oscillator-based synths', () => {
    const oscillatorSynths = new Set(['Synth', 'AMSynth', 'FMSynth', 'MonoSynth']);
    // Run many iterations; every oscillator-based synth result must contain oscillator.type
    for (let i = 0; i < 100; i++) {
      const result = randomInstrumentMml();
      const match = result.match(/^@([A-Za-z]+)/);
      if (!match) continue;
      const id = match[1];
      if (!oscillatorSynths.has(id)) continue;
      const jsonPart = result.replace(/^@[A-Za-z]+/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed).toHaveProperty('oscillator');
      expect(parsed.oscillator).toHaveProperty('type');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.oscillator.type);
    }
  });

  it('should include noise type for NoiseSynth', () => {
    const config = {
      instruments: [
        {
          id: 'NoiseSynth',
          name: 'NoiseSynth',
          parameters: [
            { path: 'noise.type', label: 'Noise Type', choices: ['white', 'pink', 'brown'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      expect(result).toMatch(/^@NoiseSynth/);
      const jsonPart = result.replace(/^@NoiseSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(['white', 'pink', 'brown']).toContain(parsed.noise.type);
    }
  });

  it('should accept a custom config and use only its instruments', () => {
    const customConfig = {
      instruments: [
        {
          id: 'TestSynth',
          name: 'Test Synth',
          parameters: [
            {
              path: 'envelope.attack',
              label: 'Attack',
              min: 0,
              max: 1,
              sweetMin: 0.1,
              sweetMax: 0.5,
              defaultValue: 0.2,
              step: 0.01
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(customConfig);
      expect(result).toMatch(/^@TestSynth/);
    }
  });

  it('should return empty string for empty instruments config', () => {
    const result = randomInstrumentMml({ instruments: [] });
    expect(result).toBe('');
  });

  it('should produce varied results across multiple calls', () => {
    const results = new Set(Array.from({ length: 30 }, () => randomInstrumentMml()));
    expect(results.size).toBeGreaterThan(1);
  });

  it('should keep numeric parameter values within sweet spot ranges', () => {
    const FLOAT_TOLERANCE = 0.001;
    const min = 0.1;
    const max = 0.5;
    const customConfig = {
      instruments: [
        {
          id: 'TestSynth',
          name: 'Test Synth',
          parameters: [
            {
              path: 'val',
              label: 'Val',
              min: 0,
              max: 1,
              sweetMin: min,
              sweetMax: max,
              defaultValue: 0.3,
              step: 0.01
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 30; i++) {
      const result = randomInstrumentMml(customConfig);
      const jsonPart = result.replace(/^@[A-Za-z]+/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.val).toBeGreaterThanOrEqual(min - FLOAT_TOLERANCE);
      expect(parsed.val).toBeLessThanOrEqual(max + FLOAT_TOLERANCE);
    }
  });
});

describe('randomEffectMml', () => {
  it('should return a non-empty string', () => {
    const result = randomEffectMml();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should start with @ followed by an effect name', () => {
    const result = randomEffectMml();
    expect(result).toMatch(/^@[A-Za-z]+/);
  });

  it('should never return the "none" effect', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomEffectMml();
      expect(result).not.toMatch(/^@none/i);
    }
  });

  it('should return empty string when all effects are "none"', () => {
    const result = randomEffectMml({
      effects: [{ id: 'none', name: 'No Effect', parameters: [] }]
    });
    expect(result).toBe('');
  });

  it('should include a JSON args block for effects with parameters', () => {
    const config = {
      effects: [
        {
          id: 'Reverb',
          name: 'Reverb',
          parameters: [
            { path: 'decay', label: 'Decay', min: 0.5, max: 12, sweetMin: 1, sweetMax: 6, defaultValue: 2.5, step: 0.1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomEffectMml(config);
      expect(result).toMatch(/^@Reverb/);
      const jsonPart = result.replace(/^@Reverb/, '');
      const parsed = JSON.parse(jsonPart);
      expect(typeof parsed).toBe('object');
      expect(typeof parsed.decay).toBe('number');
    }
  });

  it('should produce varied results across multiple calls', () => {
    const results = new Set(Array.from({ length: 30 }, () => randomEffectMml()));
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('randomInstrumentAndEffectMml', () => {
  it('should return an object with instrument and effect strings', () => {
    const result = randomInstrumentAndEffectMml();
    expect(typeof result).toBe('object');
    expect(typeof result.instrument).toBe('string');
    expect(typeof result.effect).toBe('string');
  });

  it('should return non-empty instrument and effect MML', () => {
    const result = randomInstrumentAndEffectMml();
    expect(result.instrument.length).toBeGreaterThan(0);
    expect(result.effect.length).toBeGreaterThan(0);
  });

  it('should return valid instrument and effect MML patterns', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentAndEffectMml();
      expect(result.instrument).toMatch(/^@[A-Za-z]+/);
      expect(result.effect).toMatch(/^@[A-Za-z]+/);
    }
  });

  it('should use custom config when provided', () => {
    const config = {
      instruments: [
        {
          id: 'TestSynth',
          name: 'Test Synth',
          parameters: [
            { path: 'envelope.attack', label: 'Attack', min: 0, max: 1, sweetMin: 0.1, sweetMax: 0.5, defaultValue: 0.2, step: 0.01 }
          ]
        }
      ],
      effects: [
        {
          id: 'TestReverb',
          name: 'Test Reverb',
          parameters: [
            { path: 'decay', label: 'Decay', min: 0.5, max: 12, sweetMin: 1, sweetMax: 6, defaultValue: 2.5, step: 0.1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentAndEffectMml(config);
      expect(result.instrument).toMatch(/^@TestSynth/);
      expect(result.effect).toMatch(/^@TestReverb/);
    }
  });

  it('should produce varied combined results across multiple calls', () => {
    const results = new Set(
      Array.from({ length: 30 }, () => {
        const r = randomInstrumentAndEffectMml();
        return `${r.instrument}|${r.effect}`;
      })
    );
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('applyPath (prototype pollution guard)', () => {
  it('should not pollute Object.prototype via __proto__', () => {
    const target = {};
    applyPath(target, '__proto__.polluted', 1);
    expect({}.polluted).toBeUndefined();
  });

  it('should not pollute via constructor path', () => {
    const target = {};
    applyPath(target, 'constructor.polluted', 1);
    expect({}.constructor.polluted).toBeUndefined();
  });

  it('should not write to prototype path segment', () => {
    const target = {};
    applyPath(target, 'prototype.polluted', 1);
    // The dangerous segment causes the write to be silently skipped
    expect(target.prototype).toBeUndefined();
    expect(Object.prototype.polluted).toBeUndefined();
  });

  it('should correctly write a safe numeric path', () => {
    const target = {};
    applyPath(target, 'envelope.attack', 0.5);
    expect(target.envelope.attack).toBe(0.5);
  });

  it('should correctly write a safe string path', () => {
    const target = {};
    applyPath(target, 'oscillator.type', 'square');
    expect(target.oscillator.type).toBe('square');
  });
});
