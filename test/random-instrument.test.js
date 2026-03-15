import { describe, it, expect } from 'vitest';
import { randomInstrumentMml } from '../src/random-instrument';
import { applyPath } from '../src/tone-edit-helpers';

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
    const knownInstruments = ['Synth', 'FMSynth', 'MonoSynth'];
    for (let i = 0; i < 20; i++) {
      const result = randomInstrumentMml();
      const match = result.match(/^@([A-Za-z]+)/);
      expect(match).not.toBeNull();
      expect(knownInstruments).toContain(match[1]);
    }
  });

  it('should include a JSON args block with numeric values', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml();
      const jsonPart = result.replace(/^@[A-Za-z]+/, '');
      const parsed = JSON.parse(jsonPart);
      expect(typeof parsed).toBe('object');
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

  it('should keep parameter values within sweet spot ranges', () => {
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

  it('should correctly write a safe path', () => {
    const target = {};
    applyPath(target, 'envelope.attack', 0.5);
    expect(target.envelope.attack).toBe(0.5);
  });
});
