/**
 * Shared helpers for MML parameter processing and formatting.
 * Used by both the library (random-instrument.ts) and the demo (tone-edit-demo.ts).
 */
import type { ParameterDefinition } from './tone-edit-types.js';
export declare function clamp(value: number, min: number, max: number): number;
export declare function roundToStep(value: number, step: number): number;
export declare function applyPath(target: Record<string, unknown>, path: string, value: number): void;
export declare function buildArgs(defs: ParameterDefinition[], values: Record<string, number>): Record<string, unknown>;
export declare function formatMml(tag: string, args: Record<string, unknown>): string;
export declare function randomValue(def: ParameterDefinition): number;
//# sourceMappingURL=tone-edit-helpers.d.ts.map