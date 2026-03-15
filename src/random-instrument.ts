/**
 * MML processing function: random instrument MML generation.
 * Picks a random instrument type and randomizes its parameters within
 * "sweet spot" ranges to produce a valid MML instrument fragment.
 */

import type { InstrumentDefinition, ParameterDefinition, ToneEditConfig } from './tone-edit-types.js';
import { buildArgs, formatMml, randomValue } from './tone-edit-helpers.js';

export type { InstrumentDefinition, ParameterDefinition, ToneEditConfig };

const DEFAULT_INSTRUMENTS: InstrumentDefinition[] = [
  {
    id: 'Synth',
    name: 'Synth',
    parameters: [
      { path: 'envelope.attack',  label: 'Envelope Attack',  min: 0,   max: 1,   sweetMin: 0.03, sweetMax: 0.2,  defaultValue: 0.1, step: 0.01 },
      { path: 'envelope.decay',   label: 'Envelope Decay',   min: 0,   max: 1.5, sweetMin: 0.1,  sweetMax: 0.6,  defaultValue: 0.3, step: 0.01 },
      { path: 'envelope.sustain', label: 'Envelope Sustain', min: 0,   max: 1,   sweetMin: 0.35, sweetMax: 0.85, defaultValue: 0.6, step: 0.01 },
      { path: 'envelope.release', label: 'Envelope Release', min: 0,   max: 3,   sweetMin: 0.4,  sweetMax: 1.5,  defaultValue: 0.8, step: 0.05 }
    ]
  },
  {
    id: 'FMSynth',
    name: 'FMSynth',
    parameters: [
      { path: 'harmonicity',      label: 'Harmonicity',        min: 0.2, max: 8,  sweetMin: 1,    sweetMax: 4,   defaultValue: 2,   step: 0.1  },
      { path: 'modulationIndex',  label: 'Modulation Index',   min: 0,   max: 20, sweetMin: 2,    sweetMax: 12,  defaultValue: 8,   step: 0.1  },
      { path: 'envelope.attack',  label: 'Envelope Attack',    min: 0,   max: 1,  sweetMin: 0.02, sweetMax: 0.25, defaultValue: 0.05, step: 0.01 },
      { path: 'envelope.release', label: 'Envelope Release',   min: 0,   max: 3,  sweetMin: 0.3,  sweetMax: 1.2, defaultValue: 0.6, step: 0.05 }
    ]
  },
  {
    id: 'MonoSynth',
    name: 'MonoSynth',
    parameters: [
      { path: 'filter.Q',               label: 'Filter Q',          min: 0.1, max: 24, sweetMin: 2,     sweetMax: 12, defaultValue: 6,    step: 0.1   },
      { path: 'filterEnvelope.attack',  label: 'Filter Env Attack', min: 0,   max: 1,  sweetMin: 0.005, sweetMax: 0.2, defaultValue: 0.02, step: 0.005 },
      { path: 'filterEnvelope.release', label: 'Filter Env Release',min: 0,   max: 2,  sweetMin: 0.2,   sweetMax: 1,  defaultValue: 0.5,  step: 0.05  }
    ]
  }
];

/**
 * Generate an MML fragment for a randomly chosen instrument with randomized
 * parameters within sweet-spot ranges.
 *
 * @param config - Optional instrument configuration. Defaults to the built-in
 *   set (Synth, FMSynth, MonoSynth). Pass a custom config to use different
 *   instrument types or parameter ranges.
 * @returns An MML instrument fragment such as `@FMSynth{ "harmonicity": 2.4, ... }`
 */
export function randomInstrumentMml(config?: Pick<ToneEditConfig, 'instruments'>): string {
  const instruments: InstrumentDefinition[] = config?.instruments ?? DEFAULT_INSTRUMENTS;
  if (instruments.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * instruments.length);
  const instrumentDef = instruments[randomIndex];

  const values: Record<string, number> = {};
  instrumentDef.parameters.forEach((def) => {
    values[def.path] = randomValue(def);
  });

  const args = buildArgs(instrumentDef.parameters, values);
  return formatMml(instrumentDef.id, args);
}

