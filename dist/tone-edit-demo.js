import instruments from './tone-edit-instruments.json' with { type: 'json' };
import effects from './tone-edit-effects.json' with { type: 'json' };
import { initWasm, mml2json } from './index.js';
import { SequencerNodes, playSequence } from 'tonejs-json-sequencer';
import { buildArgs, formatMml, randomValue } from './tone-edit-helpers.js';
import { renderParameters } from './tone-edit-render.js';
const toneConfig = {
    instruments: instruments,
    effects: effects
};
const nodes = new SequencerNodes();
const notePatterns = [
    { id: 'doremi', label: 'ドレミ', mml: 'cdefgab<c' },
    { id: 'chord', label: '和音', mml: "'ceg'" },
    { id: 'bass', label: 'Bass', mml: '>>l8crgr<crgr' },
    { id: 'arp', label: 'アルペジオ', mml: 'l16cegcgec' }
];
let wasmReady = null;
let audioUnlocked = false;
let playGeneration = 0;
function ensureValues(defs, values) {
    const next = {};
    defs.forEach((def) => {
        const current = values[def.path];
        if (def.choices && def.choices.length > 0) {
            // Enum parameter: ensure we have a valid string choice
            next[def.path] = (typeof current === 'string' && def.choices.includes(current))
                ? current
                : def.choices[0];
        }
        else if (def.numericChoices && def.numericChoices.length > 0) {
            // Discrete numeric parameter: ensure we have a valid numeric choice
            next[def.path] = (typeof current === 'number' && def.numericChoices.includes(current))
                ? current
                : def.numericChoices[0];
        }
        else {
            // Numeric parameter
            const numCurrent = typeof current === 'number' ? current : undefined;
            next[def.path] = (numCurrent !== undefined && Number.isFinite(numCurrent)) ? numCurrent : def.defaultValue;
        }
    });
    return next;
}
function toSequenceEvent(cmd) {
    if (cmd.eventType === 'connect' && typeof cmd.connectTo === 'string' && cmd.connectTo !== 'toDestination') {
        return { ...cmd, connectTo: Number.parseInt(cmd.connectTo, 10) };
    }
    return cmd;
}
function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element #${id} not found`);
    }
    return el;
}
function updateStatus(message, type = 'info') {
    const status = document.getElementById('status');
    if (!status)
        return;
    status.textContent = message;
    status.dataset.state = type;
}
async function ensureWasmReady() {
    if (!wasmReady) {
        wasmReady = initWasm();
    }
    try {
        await wasmReady;
    }
    catch (error) {
        wasmReady = null;
        throw error;
    }
}
async function playCurrent(options = {}) {
    const { allowUnlock = false } = options;
    const combinedMml = (getElement('combinedMml').value || '').trim();
    if (!combinedMml) {
        updateStatus('MMLが空です。', 'error');
        return;
    }
    const generation = ++playGeneration;
    try {
        updateStatus('演奏準備中...', 'info');
        if (!audioUnlocked) {
            if (!allowUnlock) {
                updateStatus('再生するには「再生」ボタンを押してください。', 'info');
                return;
            }
            await Tone.start();
            audioUnlocked = true;
        }
        await ensureWasmReady();
        if (generation !== playGeneration)
            return;
        let json;
        try {
            json = mml2json(combinedMml).map(toSequenceEvent);
        }
        catch (parseError) {
            const message = parseError instanceof Error ? parseError.message : String(parseError);
            updateStatus(`MMLエラー: ${message}`, 'error');
            return;
        }
        if (generation !== playGeneration)
            return;
        const jsonPreview = document.getElementById('jsonPreview');
        if (jsonPreview) {
            jsonPreview.value = JSON.stringify(json, null, 2);
        }
        await playSequence(Tone, nodes, json);
        if (generation !== playGeneration)
            return;
        updateStatus('再生中。パラメータを触って試してみてください。', 'success');
    }
    catch (error) {
        if (generation !== playGeneration)
            return;
        const message = error instanceof Error ? error.message : String(error);
        updateStatus(`エラー: ${message}`, 'error');
        console.error(error);
    }
}
async function playFromJson() {
    if (!audioUnlocked) {
        return;
    }
    const jsonPreview = getElement('jsonPreview');
    const text = jsonPreview.value.trim();
    if (!text) {
        return;
    }
    const generation = ++playGeneration;
    let json;
    try {
        json = JSON.parse(text).map(toSequenceEvent);
    }
    catch (parseError) {
        const message = parseError instanceof Error ? parseError.message : String(parseError);
        updateStatus(`JSONエラー: ${message}`, 'error');
        return;
    }
    if (generation !== playGeneration)
        return;
    try {
        await playSequence(Tone, nodes, json);
        if (generation !== playGeneration)
            return;
        updateStatus('再生中。', 'success');
    }
    catch (error) {
        if (generation !== playGeneration)
            return;
        const message = error instanceof Error ? error.message : String(error);
        updateStatus(`エラー: ${message}`, 'error');
        console.error(error);
    }
}
function updateCombinedMml() {
    const instrumentMml = getElement('instrumentMml').value.trim();
    const effectMml = getElement('effectMml').value.trim();
    const noteMml = getElement('noteMml').value.trim();
    const parts = [instrumentMml, effectMml, noteMml].filter((part) => part.length > 0);
    getElement('combinedMml').value = parts.join(' ');
}
function regenerateMml(state, instrumentDefs, effectDefs) {
    const instrumentDef = instrumentDefs.find((d) => d.id === state.instrumentId) ?? instrumentDefs[0];
    const effectDef = effectDefs.find((d) => d.id === state.effectId) ?? effectDefs[0];
    const instrumentArgs = buildArgs(instrumentDef.parameters, state.instrumentValues);
    const effectArgs = buildArgs(effectDef.parameters, state.effectValues);
    const instrumentArea = getElement('instrumentMml');
    instrumentArea.value = formatMml(instrumentDef.id, instrumentArgs);
    const effectArea = getElement('effectMml');
    effectArea.value = effectDef.id === 'none' ? '' : formatMml(effectDef.id, effectArgs);
    updateCombinedMml();
}
function randomizeValues(defs) {
    const values = {};
    defs.forEach((def) => {
        values[def.path] = randomValue(def);
    });
    return values;
}
function setupSelectOptions(selectId, items, currentId) {
    const select = getElement(selectId);
    select.innerHTML = '';
    items.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        option.selected = item.id === currentId;
        select.appendChild(option);
    });
}
function setupNoteOptions(currentId) {
    const select = getElement('notePattern');
    select.innerHTML = '';
    notePatterns.forEach((pattern) => {
        const option = document.createElement('option');
        option.value = pattern.id;
        option.textContent = pattern.label;
        option.selected = pattern.id === currentId;
        select.appendChild(option);
    });
}
function attachMmlAreaListeners() {
    ['instrumentMml', 'effectMml', 'noteMml'].forEach((id) => {
        const area = getElement(id);
        area.addEventListener('input', () => {
            updateCombinedMml();
            void playCurrent();
        });
    });
    getElement('combinedMml').addEventListener('input', () => {
        void playCurrent();
    });
    getElement('jsonPreview').addEventListener('input', () => {
        void playFromJson();
    });
}
function exportState(state) {
    const payload = {
        instrumentId: state.instrumentId,
        instrumentValues: state.instrumentValues,
        effectId: state.effectId,
        effectValues: state.effectValues,
        notePatternId: state.notePatternId,
        noteMml: getElement('noteMml').value
    };
    getElement('stateJson').value = JSON.stringify(payload, null, 2);
    updateStatus('現在の設定をエクスポートしました。', 'success');
}
function importState(state) {
    try {
        const text = getElement('stateJson').value;
        const parsed = JSON.parse(text);
        if (parsed.instrumentId && toneConfig.instruments.some((d) => d.id === parsed.instrumentId)) {
            state.instrumentId = parsed.instrumentId;
        }
        if (parsed.effectId && toneConfig.effects.some((d) => d.id === parsed.effectId)) {
            state.effectId = parsed.effectId;
        }
        if (parsed.instrumentValues) {
            state.instrumentValues = parsed.instrumentValues;
        }
        if (parsed.effectValues) {
            state.effectValues = parsed.effectValues;
        }
        if (parsed.notePatternId && notePatterns.some((p) => p.id === parsed.notePatternId)) {
            state.notePatternId = parsed.notePatternId;
        }
        if (parsed.noteMml) {
            getElement('noteMml').value = parsed.noteMml;
        }
        const instrumentDef = toneConfig.instruments.find((d) => d.id === state.instrumentId) ?? toneConfig.instruments[0];
        const effectDef = toneConfig.effects.find((d) => d.id === state.effectId) ?? toneConfig.effects[0];
        state.instrumentValues = ensureValues(instrumentDef.parameters, state.instrumentValues);
        state.effectValues = ensureValues(effectDef.parameters, state.effectValues);
        setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
        setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);
        const noteSelect = getElement('notePattern');
        Array.from(noteSelect.options).forEach((option) => {
            option.selected = option.value === state.notePatternId;
        });
        if (!parsed.noteMml) {
            const pattern = notePatterns.find((p) => p.id === state.notePatternId);
            if (pattern) {
                getElement('noteMml').value = pattern.mml;
            }
        }
        renderParameters('instrumentParams', instrumentDef.parameters, state.instrumentValues, () => {
            regenerateMml(state, toneConfig.instruments, toneConfig.effects);
            void playCurrent();
        });
        renderParameters('effectParams', effectDef.parameters, state.effectValues, () => {
            regenerateMml(state, toneConfig.instruments, toneConfig.effects);
            void playCurrent();
        });
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent();
        updateStatus('JSONをインポートしました。', 'success');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        updateStatus(`JSONの読み込みに失敗しました: ${message}`, 'error');
    }
}
function setupNoteArea(state) {
    setupNoteOptions(state.notePatternId);
    const select = getElement('notePattern');
    select.addEventListener('change', () => {
        const selected = notePatterns.find((p) => p.id === select.value);
        if (!selected)
            return;
        state.notePatternId = selected.id;
        getElement('noteMml').value = selected.mml;
        updateCombinedMml();
        void playCurrent();
    });
    const selected = notePatterns.find((p) => p.id === state.notePatternId) ?? notePatterns[0];
    getElement('noteMml').value = selected.mml;
}
function setupParameters(state, onInstrumentParamChange, onEffectParamChange) {
    const instrumentDef = toneConfig.instruments.find((d) => d.id === state.instrumentId) ?? toneConfig.instruments[0];
    const effectDef = toneConfig.effects.find((d) => d.id === state.effectId) ?? toneConfig.effects[0];
    state.instrumentId = instrumentDef.id;
    state.effectId = effectDef.id;
    state.instrumentValues = ensureValues(instrumentDef.parameters, state.instrumentValues);
    state.effectValues = ensureValues(effectDef.parameters, state.effectValues);
    setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
    setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);
    renderParameters('instrumentParams', instrumentDef.parameters, state.instrumentValues, onInstrumentParamChange);
    renderParameters('effectParams', effectDef.parameters, state.effectValues, onEffectParamChange);
}
function setupControls() {
    const state = {
        instrumentId: toneConfig.instruments[0]?.id ?? 'Synth',
        instrumentValues: {},
        effectId: toneConfig.effects[0]?.id ?? 'none',
        effectValues: {},
        notePatternId: notePatterns[0]?.id ?? 'doremi'
    };
    const onInstrumentParamChange = () => {
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        void playCurrent();
    };
    const onEffectParamChange = () => {
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        void playCurrent();
    };
    setupParameters(state, onInstrumentParamChange, onEffectParamChange);
    setupNoteArea(state);
    attachMmlAreaListeners();
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    updateCombinedMml();
    getElement('playNow').addEventListener('click', () => {
        void playCurrent({ allowUnlock: true });
    });
    getElement('exportState').addEventListener('click', () => exportState(state));
    getElement('importState').addEventListener('click', () => importState(state));
    getElement('randomInstrument').addEventListener('click', () => {
        const instruments = toneConfig.instruments;
        const randomIndex = Math.floor(Math.random() * instruments.length);
        const nextDef = instruments[randomIndex];
        state.instrumentId = nextDef.id;
        state.instrumentValues = randomizeValues(nextDef.parameters);
        setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
        renderParameters('instrumentParams', nextDef.parameters, state.instrumentValues, onInstrumentParamChange);
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent({ allowUnlock: true });
    });
    getElement('randomEffect').addEventListener('click', () => {
        const nonNoneEffects = toneConfig.effects.filter((d) => d.id !== 'none');
        if (nonNoneEffects.length === 0)
            return;
        const randomIndex = Math.floor(Math.random() * nonNoneEffects.length);
        const nextDef = nonNoneEffects[randomIndex];
        state.effectId = nextDef.id;
        state.effectValues = randomizeValues(nextDef.parameters);
        setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);
        renderParameters('effectParams', nextDef.parameters, state.effectValues, onEffectParamChange);
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent({ allowUnlock: true });
    });
    getElement('randomInstrumentAndEffect').addEventListener('click', () => {
        const instruments = toneConfig.instruments;
        const nonNoneEffects = toneConfig.effects.filter((d) => d.id !== 'none');
        const instIndex = Math.floor(Math.random() * instruments.length);
        const nextInstDef = instruments[instIndex];
        state.instrumentId = nextInstDef.id;
        state.instrumentValues = randomizeValues(nextInstDef.parameters);
        setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
        renderParameters('instrumentParams', nextInstDef.parameters, state.instrumentValues, onInstrumentParamChange);
        if (nonNoneEffects.length > 0) {
            const effIndex = Math.floor(Math.random() * nonNoneEffects.length);
            const nextEffDef = nonNoneEffects[effIndex];
            state.effectId = nextEffDef.id;
            state.effectValues = randomizeValues(nextEffDef.parameters);
            setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);
            renderParameters('effectParams', nextEffDef.parameters, state.effectValues, onEffectParamChange);
        }
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent({ allowUnlock: true });
    });
    getElement('instrumentSelect').addEventListener('change', (event) => {
        const target = event.target;
        const nextDef = toneConfig.instruments.find((d) => d.id === target.value);
        if (!nextDef)
            return;
        state.instrumentId = nextDef.id;
        state.instrumentValues = ensureValues(nextDef.parameters, state.instrumentValues);
        renderParameters('instrumentParams', nextDef.parameters, state.instrumentValues, onInstrumentParamChange);
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent();
    });
    getElement('effectSelect').addEventListener('change', (event) => {
        const target = event.target;
        const nextDef = toneConfig.effects.find((d) => d.id === target.value);
        if (!nextDef)
            return;
        state.effectId = nextDef.id;
        state.effectValues = ensureValues(nextDef.parameters, state.effectValues);
        renderParameters('effectParams', nextDef.parameters, state.effectValues, onEffectParamChange);
        regenerateMml(state, toneConfig.instruments, toneConfig.effects);
        updateCombinedMml();
        void playCurrent();
    });
}
window.addEventListener('DOMContentLoaded', () => {
    setupControls();
    updateStatus('初期化中...', 'info');
    initWasm().then(() => {
        // 初期化完了時点でまだ「初期化中...」のままの場合のみステータスを更新する
        const statusEl = document.getElementById('status');
        if (statusEl && statusEl.textContent === '初期化中...') {
            updateStatus('パラメータを編集すると自動でMMLが再生成されます。', 'info');
        }
    }).catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        updateStatus(`エラー: ${message}`, 'error');
        console.error('WASM initialization failed:', error);
    });
});
//# sourceMappingURL=tone-edit-demo.js.map