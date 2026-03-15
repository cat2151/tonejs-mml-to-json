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

export function applyPath(target: Record<string, unknown>, path: string, value: number): void {
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

export function buildArgs(defs: ParameterDefinition[], values: Record<string, number>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  defs.forEach((def) => {
    const fromValues = values[def.path];
    // Guard against non-finite defaults (e.g. NaN, Infinity) – fall back to 0 as a safe sentinel
    const fromDefault = Number.isFinite(def.defaultValue) ? def.defaultValue : 0;
    const value = Number.isFinite(fromValues) ? fromValues : fromDefault;
    applyPath(result, def.path, value);
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

export function randomValue(def: ParameterDefinition): number {
  const min = def.sweetMin ?? def.min;
  const max = def.sweetMax ?? def.max;
  const raw = min + Math.random() * (max - min);
  const stepped = roundToStep(raw, def.step ?? 0.01);
  return clamp(stepped, def.min, def.max);
}
