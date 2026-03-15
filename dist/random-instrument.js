/**
 * MML processing function: random instrument MML generation.
 * Picks a random instrument type and randomizes its parameters within
 * "sweet spot" ranges to produce a valid MML instrument fragment.
 */
import defaultConfig from './tone-edit-config.json' with { type: 'json' };
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function roundToStep(value, step) {
    if (step <= 0)
        return value;
    const scaled = Math.round(value / step) * step;
    return Number(scaled.toFixed(6));
}
function randomValue(def) {
    const min = def.sweetMin ?? def.min;
    const max = def.sweetMax ?? def.max;
    const raw = min + Math.random() * (max - min);
    const stepped = roundToStep(raw, def.step ?? 0.01);
    return clamp(stepped, def.min, def.max);
}
function applyPath(target, path, value) {
    const segments = path.split('.');
    let node = target;
    segments.forEach((segment, index) => {
        if (index === segments.length - 1) {
            node[segment] = value;
            return;
        }
        if (!node[segment] || typeof node[segment] !== 'object') {
            node[segment] = {};
        }
        node = node[segment];
    });
}
function buildArgs(defs, values) {
    const result = {};
    defs.forEach((def) => {
        const fromValues = values[def.path];
        const fromDefault = Number.isFinite(def.defaultValue) ? def.defaultValue : 0;
        const value = Number.isFinite(fromValues) ? fromValues : fromDefault;
        applyPath(result, def.path, value);
    });
    return result;
}
function formatMml(tag, args) {
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
export function randomInstrumentMml(config) {
    const instruments = config?.instruments ?? defaultConfig.instruments;
    if (instruments.length === 0)
        return '';
    const randomIndex = Math.floor(Math.random() * instruments.length);
    const instrumentDef = instruments[randomIndex];
    const values = {};
    instrumentDef.parameters.forEach((def) => {
        values[def.path] = randomValue(def);
    });
    const args = buildArgs(instrumentDef.parameters, values);
    return formatMml(instrumentDef.id, args);
}
//# sourceMappingURL=random-instrument.js.map