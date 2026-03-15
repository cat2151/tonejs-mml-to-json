import { describe, it, expect } from 'vitest';
import { randomInstrumentMml, randomEffectMml, randomInstrumentAndEffectMml } from '../src/random-instrument';

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
    const allOscTypes = [
      'sine', 'square', 'sawtooth', 'triangle',
      'fatsine', 'fatsquare', 'fatsawtooth', 'fattriangle',
      'amsine', 'amsquare', 'amsawtooth', 'amtriangle',
      'fmsine', 'fmsquare', 'fmsawtooth', 'fmtriangle',
      'pwm'
    ];
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
      expect(allOscTypes).toContain(parsed.oscillator.type);
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

  it('should generate prefixed oscillator types (fat/am/fm/pwm) for oscillator-based synths', () => {
    const ALL_OSC_TYPES = [
      'sine', 'square', 'sawtooth', 'triangle',
      'fatsine', 'fatsquare', 'fatsawtooth', 'fattriangle',
      'amsine', 'amsquare', 'amsawtooth', 'amtriangle',
      'fmsine', 'fmsquare', 'fmsawtooth', 'fmtriangle',
      'pwm'
    ];
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            {
              path: 'oscillator.type',
              label: 'Oscillator Type',
              choices: ALL_OSC_TYPES,
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0
            },
            {
              path: 'oscillator.count',
              label: 'Fat Oscillator Count',
              min: 2, max: 8, sweetMin: 2, sweetMax: 6, defaultValue: 3, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            },
            {
              path: 'oscillator.spread',
              label: 'Fat Oscillator Spread',
              min: 0, max: 100, sweetMin: 10, sweetMax: 50, defaultValue: 30, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            }
          ]
        }
      ]
    };
    const seen = new Set();
    for (let i = 0; i < 200; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      seen.add(parsed.oscillator.type);
    }
    // Over 200 iterations all 5 prefix groups should appear at least once
    const hasFat = [...seen].some((t) => t.startsWith('fat'));
    const hasAm = [...seen].some((t) => t.startsWith('am'));
    const hasFm = [...seen].some((t) => t.startsWith('fm'));
    const hasPwm = [...seen].some((t) => t === 'pwm');
    const hasNone = [...seen].some((t) => ['sine', 'square', 'sawtooth', 'triangle'].includes(t));
    expect(hasFat).toBe(true);
    expect(hasAm).toBe(true);
    expect(hasFm).toBe(true);
    expect(hasPwm).toBe(true);
    expect(hasNone).toBe(true);
  });

  it('should include count and spread when fat oscillator type is chosen', () => {
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            {
              path: 'oscillator.type',
              label: 'Oscillator Type',
              choices: ['fatsawtooth'],
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0
            },
            {
              path: 'oscillator.count',
              label: 'Fat Oscillator Count',
              min: 2, max: 8, sweetMin: 2, sweetMax: 6, defaultValue: 3, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            },
            {
              path: 'oscillator.spread',
              label: 'Fat Oscillator Spread',
              min: 0, max: 100, sweetMin: 10, sweetMax: 50, defaultValue: 30, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.oscillator.type).toBe('fatsawtooth');
      expect(parsed.oscillator).toHaveProperty('count');
      expect(parsed.oscillator).toHaveProperty('spread');
      expect(typeof parsed.oscillator.count).toBe('number');
      expect(typeof parsed.oscillator.spread).toBe('number');
    }
  });

  it('should NOT include count and spread when non-fat oscillator type is chosen', () => {
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            {
              path: 'oscillator.type',
              label: 'Oscillator Type',
              choices: ['sawtooth'],
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0
            },
            {
              path: 'oscillator.count',
              label: 'Fat Oscillator Count',
              min: 2, max: 8, sweetMin: 2, sweetMax: 6, defaultValue: 3, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            },
            {
              path: 'oscillator.spread',
              label: 'Fat Oscillator Spread',
              min: 0, max: 100, sweetMin: 10, sweetMax: 50, defaultValue: 30, step: 1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['fat']
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.oscillator.type).toBe('sawtooth');
      expect(parsed.oscillator).not.toHaveProperty('count');
      expect(parsed.oscillator).not.toHaveProperty('spread');
    }
  });

  it('should include harmonicity and modulationType when am oscillator type is chosen', () => {
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            {
              path: 'oscillator.type',
              label: 'Oscillator Type',
              choices: ['amsawtooth'],
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0
            },
            {
              path: 'oscillator.harmonicity',
              label: 'Oscillator Harmonicity',
              min: 0, max: 16, sweetMin: 1, sweetMax: 8, defaultValue: 1, step: 0.1,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['am', 'fm']
            },
            {
              path: 'oscillator.modulationType',
              label: 'Oscillator Modulation Type',
              choices: ['sine', 'square', 'sawtooth', 'triangle'],
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['am', 'fm']
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.oscillator.type).toBe('amsawtooth');
      expect(parsed.oscillator).toHaveProperty('harmonicity');
      expect(parsed.oscillator).toHaveProperty('modulationType');
      expect(['sine', 'square', 'sawtooth', 'triangle']).toContain(parsed.oscillator.modulationType);
    }
  });

  it('should include modulationFrequency when pwm oscillator type is chosen', () => {
    const config = {
      instruments: [
        {
          id: 'Synth',
          name: 'Synth',
          parameters: [
            {
              path: 'oscillator.type',
              label: 'Oscillator Type',
              choices: ['pwm'],
              min: 0, max: 0, sweetMin: 0, sweetMax: 0, defaultValue: 0
            },
            {
              path: 'oscillator.modulationFrequency',
              label: 'PWM Modulation Frequency',
              min: 0.05, max: 20, sweetMin: 0.1, sweetMax: 5, defaultValue: 0.4, step: 0.05,
              conditionalOn: 'oscillator.type',
              conditionalPrefixes: ['pwm']
            }
          ]
        }
      ]
    };
    for (let i = 0; i < 10; i++) {
      const result = randomInstrumentMml(config);
      const jsonPart = result.replace(/^@Synth/, '');
      const parsed = JSON.parse(jsonPart);
      expect(parsed.oscillator.type).toBe('pwm');
      expect(parsed.oscillator).toHaveProperty('modulationFrequency');
      expect(typeof parsed.oscillator.modulationFrequency).toBe('number');
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

