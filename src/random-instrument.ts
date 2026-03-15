/**
 * MML processing function: random instrument and effect MML generation.
 * Picks a random instrument/effect type and randomizes its parameters within
 * "sweet spot" ranges to produce valid MML fragments.
 */

import type { InstrumentDefinition, EffectDefinition, ParameterDefinition, ToneEditConfig } from './tone-edit-types.js';
import { buildArgs, formatMml, randomValue } from './tone-edit-helpers.js';
import defaultInstruments from './tone-edit-instruments.json' with { type: 'json' };
import defaultEffects from './tone-edit-effects.json' with { type: 'json' };

export type { InstrumentDefinition, EffectDefinition, ParameterDefinition, ToneEditConfig };

/**
 * Result of randomInstrumentAndEffectMml: separate MML fragments for the
 * instrument and the effect so callers can place them independently.
 */
export type RandomMmlResult = {
  instrument: string;
  effect: string;
};

const DEFAULT_INSTRUMENTS: InstrumentDefinition[] = defaultInstruments as InstrumentDefinition[];
const DEFAULT_EFFECTS: EffectDefinition[] = defaultEffects as EffectDefinition[];

function randomizeParams(parameters: ParameterDefinition[]): Record<string, number | string> {
  const values: Record<string, number | string> = {};
  parameters.forEach((def) => {
    values[def.path] = randomValue(def);
  });
  return values;
}

/**
 * Generate an MML fragment for a randomly chosen instrument with randomized
 * parameters. String enum parameters (e.g. oscillator type) are also
 * randomized from their defined choices.
 *
 * @param config - Optional instrument configuration. Defaults to the full
 *   built-in instrument set. Pass a custom config to restrict the selection.
 * @returns An MML instrument fragment such as `@FMSynth{ "harmonicity": 2.4, ... }`
 */
export function randomInstrumentMml(config?: Pick<ToneEditConfig, 'instruments'>): string {
  const instruments: InstrumentDefinition[] = config?.instruments ?? DEFAULT_INSTRUMENTS;
  if (instruments.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * instruments.length);
  const instrumentDef = instruments[randomIndex];

  const values = randomizeParams(instrumentDef.parameters);
  const args = buildArgs(instrumentDef.parameters, values);
  return formatMml(instrumentDef.id, args);
}

/**
 * Generate an MML fragment for a randomly chosen effect with randomized
 * parameters. The "none" effect (no effect) is excluded from the selection.
 *
 * @param config - Optional effect configuration. Defaults to the full
 *   built-in effect set. Pass a custom config to restrict the selection.
 * @returns An MML effect fragment such as `@Reverb{ "decay": 2.5 }`, or an
 *   empty string when there are no non-none effects available.
 */
export function randomEffectMml(config?: Pick<ToneEditConfig, 'effects'>): string {
  const allEffects: EffectDefinition[] = config?.effects ?? DEFAULT_EFFECTS;
  const effects = allEffects.filter((d) => d.id !== 'none');
  if (effects.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * effects.length);
  const effectDef = effects[randomIndex];

  const values = randomizeParams(effectDef.parameters);
  const args = buildArgs(effectDef.parameters, values);
  return formatMml(effectDef.id, args);
}

/**
 * Generate MML fragments for a randomly chosen instrument AND a randomly
 * chosen effect, both with fully randomized parameters (including string
 * enum parameters such as oscillator type).
 *
 * @param config - Optional full configuration. Defaults to the full built-in
 *   instrument and effect sets.
 * @returns An object with `instrument` and `effect` MML strings. `instrument`
 *   is always non-empty when the instrument list is non-empty. `effect` may
 *   be an empty string if the config contains only the `none` effect or an
 *   empty effects list.
 */
export function randomInstrumentAndEffectMml(config?: ToneEditConfig): RandomMmlResult {
  return {
    instrument: randomInstrumentMml(config),
    effect: randomEffectMml(config),
  };
}

