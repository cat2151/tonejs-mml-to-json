/**
 * MML processing function: random instrument MML generation.
 * Picks a random instrument type and randomizes its parameters within
 * "sweet spot" ranges to produce a valid MML instrument fragment.
 */
import type { InstrumentDefinition, ParameterDefinition, ToneEditConfig } from './tone-edit-types.js';
export type { InstrumentDefinition, ParameterDefinition, ToneEditConfig };
/**
 * Generate an MML fragment for a randomly chosen instrument with randomized
 * parameters within sweet-spot ranges.
 *
 * @param config - Optional instrument configuration. Defaults to the built-in
 *   set (Synth, FMSynth, MonoSynth). Pass a custom config to use different
 *   instrument types or parameter ranges.
 * @returns An MML instrument fragment such as `@FMSynth{ "harmonicity": 2.4, ... }`
 */
export declare function randomInstrumentMml(config?: Pick<ToneEditConfig, 'instruments'>): string;
//# sourceMappingURL=random-instrument.d.ts.map