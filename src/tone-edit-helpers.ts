/**
 * Shared helpers for MML parameter processing and formatting.
 * Used by both the library (random-instrument.ts) and the demo (tone-edit-demo.ts).
 */

import type { ParameterDefinition } from './tone-edit-types.js';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToStep(value: number, step: number): number {
  if (step <= 0) return value;
  const scaled = Math.round(value / step) * step;
  return Number(scaled.toFixed(6));
}

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function applyPath(target: Record<string, unknown>, path: string, value: number | string): void {
  const segments = path.split('.');
  if (segments.some((s) => DANGEROUS_KEYS.has(s))) {
    return;
  }
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

export function buildArgs(defs: ParameterDefinition[], values: Record<string, number | string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  defs.forEach((def) => {
    // Skip parameters whose condition is not met.
    // If conditionalOn is set but conditionalPrefixes is missing or empty, the
    // condition can never be satisfied, so always skip the parameter.
    if (def.conditionalOn) {
      if (!def.conditionalPrefixes || def.conditionalPrefixes.length === 0) return;
      const controllingValue = values[def.conditionalOn];
      if (typeof controllingValue !== 'string') return;
      const matches = def.conditionalPrefixes.some((prefix) => controllingValue.startsWith(prefix));
      if (!matches) return;
    }
    if (def.choices && def.choices.length > 0) {
      // Enum parameter: use stored string value or fall back to first choice
      const fromValues = values[def.path];
      const value = (typeof fromValues === 'string' && def.choices.includes(fromValues))
        ? fromValues
        : def.choices[0];
      applyPath(result, def.path, value);
    } else if (def.numericChoices && def.numericChoices.length > 0) {
      // Discrete numeric parameter: use stored numeric value or fall back to first choice
      const fromValues = values[def.path];
      const value = (typeof fromValues === 'number' && def.numericChoices.includes(fromValues))
        ? fromValues
        : def.numericChoices[0];
      applyPath(result, def.path, value);
    } else {
      // Numeric parameter
      const fromValues = values[def.path];
      const fromNumeric = typeof fromValues === 'number' ? fromValues : undefined;
      // Guard against non-finite defaults (e.g. NaN, Infinity) – fall back to 0 as a safe sentinel
      const fromDefault = Number.isFinite(def.defaultValue) ? def.defaultValue : 0;
      const value = (fromNumeric !== undefined && Number.isFinite(fromNumeric)) ? fromNumeric : fromDefault;
      applyPath(result, def.path, value);
    }
  });
  return result;
}

export function formatMml(tag: string, args: Record<string, unknown>): string {
  const hasArgs = Object.keys(args).length > 0;
  if (!hasArgs) {
    return `@${tag}`;
  }
  return `@${tag}${JSON.stringify(args, null, 2)}`;
}

export function randomValue(def: ParameterDefinition): number | string {
  if (def.choices && def.choices.length > 0) {
    return def.choices[Math.floor(Math.random() * def.choices.length)];
  }
  if (def.numericChoices && def.numericChoices.length > 0) {
    return def.numericChoices[Math.floor(Math.random() * def.numericChoices.length)];
  }
  const min = def.sweetMin ?? def.min;
  const max = def.sweetMax ?? def.max;
  const raw = min + Math.random() * (max - min);
  const stepped = roundToStep(raw, def.step ?? 0.01);
  return clamp(stepped, def.min, def.max);
}
