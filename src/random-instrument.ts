/**
 * MML processing function: random instrument MML generation.
 * Picks a random instrument type and randomizes its parameters within
 * "sweet spot" ranges to produce a valid MML instrument fragment.
 */

import type { InstrumentDefinition, ParameterDefinition, ToneEditConfig } from './tone-edit-types.js';
import defaultConfig from './tone-edit-config.json' with { type: 'json' };

export type { InstrumentDefinition, ParameterDefinition, ToneEditConfig };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value: number, step: number): number {
  if (step <= 0) return value;
  const scaled = Math.round(value / step) * step;
  return Number(scaled.toFixed(6));
}

function randomValue(def: ParameterDefinition): number {
  const min = def.sweetMin ?? def.min;
  const max = def.sweetMax ?? def.max;
  const raw = min + Math.random() * (max - min);
  const stepped = roundToStep(raw, def.step ?? 0.01);
  return clamp(stepped, def.min, def.max);
}

function applyPath(target: Record<string, unknown>, path: string, value: number): void {
  const segments = path.split('.');
  let node: Record<string, unknown> = target;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      node[segment] = value;
      return;
    }
    if (!node[segment] || typeof node[segment] !== 'object') {
      node[segment] = {};
    }
    node = node[segment] as Record<string, unknown>;
  });
}

function buildArgs(defs: ParameterDefinition[], values: Record<string, number>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  defs.forEach((def) => {
    const fromValues = values[def.path];
    const fromDefault = Number.isFinite(def.defaultValue) ? def.defaultValue : 0;
    const value = Number.isFinite(fromValues) ? fromValues : fromDefault;
    applyPath(result, def.path, value);
  });
  return result;
}

function formatMml(tag: string, args: Record<string, unknown>): string {
  const hasArgs = Object.keys(args).length > 0;
  if (!hasArgs) {
    return `@${tag}`;
  }
  return `@${tag}${JSON.stringify(args, null, 2)}`;
}

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
  const instruments: InstrumentDefinition[] = config?.instruments ?? (defaultConfig as ToneEditConfig).instruments;
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
