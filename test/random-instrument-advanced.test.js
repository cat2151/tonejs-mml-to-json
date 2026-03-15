import { describe, it, expect } from 'vitest';
import { randomInstrumentMml } from '../src/random-instrument';
import { applyPath } from '../src/tone-edit-helpers';

describe('randomInstrumentMml advanced', () => {
  it('FMSynth harmonicity should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'FMSynth',
          name: 'FMSynth',
          parameters: [
            { path: 'harmonicity', label: 'Harmonicity', min: 1, max: 8, sweetMin: 1, sweetMax: 4, defaultValue: 2, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@FMSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.harmonicity)).toBe(true);
    }
  });

  it('AMSynth harmonicity should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'AMSynth',
          name: 'AMSynth',
          parameters: [
            { path: 'harmonicity', label: 'Harmonicity', min: 1, max: 8, sweetMin: 1, sweetMax: 4, defaultValue: 3, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@AMSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.harmonicity)).toBe(true);
    }
  });

  it('DuoSynth harmonicity should always be one of the allowed discrete values', () => {
    const config = {
      instruments: [
        {
          id: 'DuoSynth',
          name: 'DuoSynth',
          parameters: [
            { path: 'harmonicity', label: 'Harmonicity', numericChoices: [1.5, 2, 3, 4, 5], min: 1, max: 5, sweetMin: 1, sweetMax: 3, defaultValue: 1.5 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@DuoSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect([1.5, 2, 3, 4, 5]).toContain(parsed.harmonicity);
    }
  });

  it('FMSynth oscillator.partialCount should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'FMSynth',
          name: 'FMSynth',
          parameters: [
            { path: 'oscillator.partialCount', label: 'Oscillator Partial Count', min: 0, max: 8, sweetMin: 0, sweetMax: 4, defaultValue: 0, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@FMSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.oscillator.partialCount)).toBe(true);
    }
  });

  it('FMSynth modulation.partialCount should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'FMSynth',
          name: 'FMSynth',
          parameters: [
            { path: 'modulation.partialCount', label: 'Modulation Partial Count', min: 0, max: 8, sweetMin: 0, sweetMax: 4, defaultValue: 0, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@FMSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.modulation.partialCount)).toBe(true);
    }
  });

  it('MonoSynth oscillator.partialCount should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'MonoSynth',
          name: 'MonoSynth',
          parameters: [
            { path: 'oscillator.partialCount', label: 'Oscillator Partial Count', min: 0, max: 8, sweetMin: 0, sweetMax: 4, defaultValue: 0, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@MonoSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.oscillator.partialCount)).toBe(true);
    }
  });

  it('Synth oscillator.partialCount should always be an integer', () => {
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            { path: 'oscillator.partialCount', label: 'Oscillator Partial Count', min: 0, max: 8, sweetMin: 0, sweetMax: 4, defaultValue: 0, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(Number.isInteger(parsed.oscillator.partialCount)).toBe(true);
    }
  });

  it('MonoSynth filter.rolloff should always be one of [-12, -24, -48, -96]', () => {
    const config = {
      instruments: [
        {
          id: 'MonoSynth',
          name: 'MonoSynth',
          parameters: [
            { path: 'filter.rolloff', label: 'Filter Rolloff', numericChoices: [-12, -24, -48, -96], min: -96, max: -12, sweetMin: -96, sweetMax: -12, defaultValue: -12 }
          ]
        }
      ]
    };
    const validRolloffs = new Set([-12, -24, -48, -96]);
    for (let i = 0; i < 50; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@MonoSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(validRolloffs.has(parsed.filter.rolloff)).toBe(true);
    }
  });

  it('PolySynth should always include a voice property', () => {
    const config = {
      instruments: [
        {
          id: 'PolySynth',
          name: 'PolySynth (FMSynth)',
          parameters: [
            { path: 'voice', label: 'Voice Type', choices: ['FMSynth'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'options.harmonicity', label: 'Harmonicity', min: 1, max: 4, sweetMin: 1, sweetMax: 4, defaultValue: 2, step: 1 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      expect(result).toMatch(/^@PolySynth/);
      const jsonPart = result.replace(/^@PolySynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.voice).toBe('FMSynth');
      expect(parsed).toHaveProperty('options');
      expect(typeof parsed.options.harmonicity).toBe('number');
    }
  });

  it('PolySynth from default config should include a voice property from the allowed set', () => {
    const allowedVoices = new Set(['Synth', 'FMSynth', 'AMSynth', 'MonoSynth']);
    const polySynthConfig = {
      instruments: [
        {
          id: 'PolySynth',
          name: 'PolySynth',
          parameters: [
            { path: 'voice', label: 'Voice Type', choices: ['Synth', 'FMSynth', 'AMSynth', 'MonoSynth'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'options.envelope.attack', label: 'Envelope Attack', min: 0, max: 1, sweetMin: 0.02, sweetMax: 0.25, defaultValue: 0.1, step: 0.01 }
          ]
        }
      ]
    };
    for (let i = 0; i < 20; i++) {
      const result = randomInstrumentMml(polySynthConfig);
      expect(result).toMatch(/^@PolySynth/);
      const jsonPart = result.replace(/^@PolySynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed).toHaveProperty('voice');
      expect(allowedVoices.has(parsed.voice)).toBe(true);
      expect(parsed).toHaveProperty('options');
    }
  });

  it('PolySynth with FMSynth voice should include oscillator and modulation types', () => {
    const config = {
      instruments: [
        {
          id: 'PolySynth',
          name: 'PolySynth (FMSynth)',
          parameters: [
            { path: 'voice', label: 'Voice Type', choices: ['FMSynth'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'options.oscillator.type', label: 'Oscillator Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'options.modulation.type', label: 'Modulation Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@PolySynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.voice).toBe('FMSynth');
      expect(parsed.options).toHaveProperty('oscillator');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.options.oscillator.type);
      expect(parsed.options).toHaveProperty('modulation');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.options.modulation.type);
    }
  });

  it('DuoSynth should include voice0 and voice1 oscillator types', () => {
    const config = {
      instruments: [
        {
          id: 'DuoSynth',
          name: 'DuoSynth',
          parameters: [
            { path: 'voice0.oscillator.type', label: 'Voice 0 Oscillator Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'voice1.oscillator.type', label: 'Voice 1 Oscillator Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      expect(result).toMatch(/^@DuoSynth/);
      const jsonPart = result.replace(/^@DuoSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed).toHaveProperty('voice0');
      expect(parsed.voice0).toHaveProperty('oscillator');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.voice0.oscillator.type);
      expect(parsed).toHaveProperty('voice1');
      expect(parsed.voice1).toHaveProperty('oscillator');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.voice1.oscillator.type);
    }
  });

  it('DuoSynth from default config should include voice0 and voice1 oscillator types', () => {
    const duoSynthConfig = {
      instruments: [
        {
          id: 'DuoSynth',
          name: 'DuoSynth',
          parameters: [
            { path: 'voice0.oscillator.type', label: 'Voice 0 Oscillator Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'voice1.oscillator.type', label: 'Voice 1 Oscillator Type', choices: ['sine', 'square', 'sawtooth', 'triangle'], min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0 },
            { path: 'harmonicity', label: 'Harmonicity', numericChoices: [1.5, 2, 3, 4, 5], min: 1, max: 5, sweetMin: 1, sweetMax: 3, defaultValue: 1.5 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(duoSynthConfig);
      expect(result).toMatch(/^@DuoSynth/);
      const jsonPart = result.replace(/^@DuoSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed).toHaveProperty('voice0');
      expect(parsed.voice0).toHaveProperty('oscillator');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.voice0.oscillator.type);
      expect(parsed).toHaveProperty('voice1');
      expect(parsed.voice1).toHaveProperty('oscillator');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.voice1.oscillator.type);
    }
  });

  it('AMSynth should include modulationEnvelope parameters', () => {
    const amSynthConfig = {
      instruments: [
        {
          id: 'AMSynth',
          name: 'AMSynth',
          parameters: [
            { path: 'harmonicity', label: 'Harmonicity', min: 1, max: 8, sweetMin: 1, sweetMax: 4, defaultValue: 3, step: 1 },
            { path: 'modulationEnvelope.attack', label: 'Mod Envelope Attack', min: 0, max: 1, sweetMin: 0.05, sweetMax: 0.8, defaultValue: 0.5, step: 0.01 },
            { path: 'modulationEnvelope.decay', label: 'Mod Envelope Decay', min: 0, max: 1, sweetMin: 0, sweetMax: 0.5, defaultValue: 0.01, step: 0.01 },
            { path: 'modulationEnvelope.sustain', label: 'Mod Envelope Sustain', min: 0, max: 1, sweetMin: 0.3, sweetMax: 1, defaultValue: 1, step: 0.01 },
            { path: 'modulationEnvelope.release', label: 'Mod Envelope Release', min: 0, max: 3, sweetMin: 0.2, sweetMax: 1.5, defaultValue: 0.5, step: 0.05 }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(amSynthConfig);
      expect(result).toMatch(/^@AMSynth/);
      const jsonPart = result.replace(/^@AMSynth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed).toHaveProperty('modulationEnvelope');
      expect(typeof parsed.modulationEnvelope.attack).toBe('number');
      expect(typeof parsed.modulationEnvelope.decay).toBe('number');
      expect(typeof parsed.modulationEnvelope.sustain).toBe('number');
      expect(typeof parsed.modulationEnvelope.release).toBe('number');
    }
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
