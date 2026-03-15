// Tone.js is loaded globally via script tag in the HTML
declare const Tone: any;

import instruments from './tone-edit-instruments.json' with { type: 'json' };
import effects from './tone-edit-effects.json' with { type: 'json' };
import { initWasm, mml2json } from './index.js';
import { SequencerNodes, playSequence, type SequenceEvent } from 'tonejs-json-sequencer';
import type { ToneCommand } from './ast2json.js';
import type { ParameterDefinition, InstrumentDefinition, EffectDefinition, ToneEditConfig, DemoState, NotePattern } from './tone-edit-types.js';
import { clamp, buildArgs, formatMml, randomValue } from './tone-edit-helpers.js';

const toneConfig: ToneEditConfig = {
  instruments: instruments as InstrumentDefinition[],
  effects: effects as EffectDefinition[]
};
const nodes = new SequencerNodes();

const notePatterns: NotePattern[] = [
  { id: 'doremi', label: 'ドレミ', mml: 'cdefgab<c' },
  { id: 'chord', label: '和音', mml: "'ceg'" },
  { id: 'bass', label: 'Bass', mml: '>>l8crgr<crgr' },
  { id: 'arp', label: 'アルペジオ', mml: 'l16cegcgec' }
];

let wasmReady: Promise<void> | null = null;
let audioUnlocked = false;
let playGeneration = 0;

function ensureValues(defs: ParameterDefinition[], values: Record<string, number>): Record<string, number> {
  const next: Record<string, number> = {};
  defs.forEach((def) => {
    const current = values[def.path];
    next[def.path] = Number.isFinite(current) ? current : def.defaultValue;
  });
  return next;
}

function toSequenceEvent(cmd: ToneCommand): SequenceEvent {
  if (cmd.eventType === 'connect' && typeof cmd.connectTo === 'string' && cmd.connectTo !== 'toDestination') {
    return { ...cmd, connectTo: Number.parseInt(cmd.connectTo, 10) } as SequenceEvent;
  }
  return cmd as unknown as SequenceEvent;
}

function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element #${id} not found`);
  }
  return el as T;
}

function updateStatus(message: string, type: 'info' | 'error' | 'success' = 'info'): void {
  const status = document.getElementById('status');
  if (!status) return;
  status.textContent = message;
  status.dataset.state = type;
}

async function ensureWasmReady(): Promise<void> {
  if (!wasmReady) {
    wasmReady = initWasm();
  }
  try {
    await wasmReady;
  } catch (error) {
    wasmReady = null;
    throw error;
  }
}

async function playCurrent(options: { allowUnlock?: boolean } = {}): Promise<void> {
  const { allowUnlock = false } = options;
  const combinedMml = (getElement<HTMLTextAreaElement>('combinedMml').value || '').trim();
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

    if (generation !== playGeneration) return;

    let json: SequenceEvent[];
    try {
      json = mml2json(combinedMml).map(toSequenceEvent);
    } catch (parseError) {
      const message = parseError instanceof Error ? parseError.message : String(parseError);
      updateStatus(`MMLエラー: ${message}`, 'error');
      return;
    }

    if (generation !== playGeneration) return;

    const jsonPreview = document.getElementById('jsonPreview') as HTMLTextAreaElement | null;
    if (jsonPreview) {
      jsonPreview.value = JSON.stringify(json, null, 2);
    }

    await playSequence(Tone, nodes, json);
    if (generation !== playGeneration) return;
    updateStatus('再生中。パラメータを触って試してみてください。', 'success');
  } catch (error) {
    if (generation !== playGeneration) return;
    const message = error instanceof Error ? error.message : String(error);
    updateStatus(`エラー: ${message}`, 'error');
    console.error(error);
  }
}

async function playFromJson(): Promise<void> {
  if (!audioUnlocked) {
    return;
  }
  const jsonPreview = getElement<HTMLTextAreaElement>('jsonPreview');
  const text = jsonPreview.value.trim();
  if (!text) {
    return;
  }

  const generation = ++playGeneration;

  let json: SequenceEvent[];
  try {
    json = (JSON.parse(text) as ToneCommand[]).map(toSequenceEvent);
  } catch (parseError) {
    const message = parseError instanceof Error ? parseError.message : String(parseError);
    updateStatus(`JSONエラー: ${message}`, 'error');
    return;
  }

  if (generation !== playGeneration) return;

  try {
    await playSequence(Tone, nodes, json);
    if (generation !== playGeneration) return;
    updateStatus('再生中。', 'success');
  } catch (error) {
    if (generation !== playGeneration) return;
    const message = error instanceof Error ? error.message : String(error);
    updateStatus(`エラー: ${message}`, 'error');
    console.error(error);
  }
}

function updateCombinedMml(): void {
  const instrumentMml = getElement<HTMLTextAreaElement>('instrumentMml').value.trim();
  const effectMml = getElement<HTMLTextAreaElement>('effectMml').value.trim();
  const noteMml = getElement<HTMLTextAreaElement>('noteMml').value.trim();

  const parts = [instrumentMml, effectMml, noteMml].filter((part) => part.length > 0);
  getElement<HTMLTextAreaElement>('combinedMml').value = parts.join(' ');
}

function regenerateMml(
  state: DemoState,
  instrumentDefs: InstrumentDefinition[],
  effectDefs: EffectDefinition[]
): void {
  const instrumentDef = instrumentDefs.find((d) => d.id === state.instrumentId) ?? instrumentDefs[0];
  const effectDef = effectDefs.find((d) => d.id === state.effectId) ?? effectDefs[0];

  const instrumentArgs = buildArgs(instrumentDef.parameters, state.instrumentValues);
  const effectArgs = buildArgs(effectDef.parameters, state.effectValues);

  const instrumentArea = getElement<HTMLTextAreaElement>('instrumentMml');
  instrumentArea.value = formatMml(instrumentDef.id, instrumentArgs);

  const effectArea = getElement<HTMLTextAreaElement>('effectMml');
  effectArea.value = effectDef.id === 'none' ? '' : formatMml(effectDef.id, effectArgs);

  updateCombinedMml();
}

function renderParameters(
  containerId: string,
  defs: ParameterDefinition[],
  values: Record<string, number>,
  onChange: (path: string, value: number) => void
): void {
  const container = getElement<HTMLDivElement>(containerId);
  container.innerHTML = '';

  defs.forEach((def) => {
    const row = document.createElement('label');
    row.className = 'param-row';
    row.title = `sweet: ${def.sweetMin} - ${def.sweetMax}`;

    const span = document.createElement('span');
    span.textContent = def.label;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = String(def.min);
    input.max = String(def.max);
    input.step = def.step ? String(def.step) : '0.01';
    input.value = (values[def.path] ?? def.defaultValue).toString();

    input.addEventListener('input', () => {
      const parsed = Number.parseFloat(input.value);
      if (!Number.isFinite(parsed)) {
        return;
      }
      const clamped = clamp(parsed, def.min, def.max);
      values[def.path] = clamped;
      input.value = clamped.toString();
      onChange(def.path, clamped);
    });

    row.append(span, input);
    container.appendChild(row);
  });
}

function randomizeValues(defs: ParameterDefinition[]): Record<string, number> {
  const values: Record<string, number> = {};
  defs.forEach((def) => {
    values[def.path] = randomValue(def);
  });
  return values;
}

function setupSelectOptions(selectId: string, items: { id: string; name: string }[], currentId: string): void {
  const select = getElement<HTMLSelectElement>(selectId);
  select.innerHTML = '';
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    option.selected = item.id === currentId;
    select.appendChild(option);
  });
}

function setupNoteOptions(currentId: string): void {
  const select = getElement<HTMLSelectElement>('notePattern');
  select.innerHTML = '';
  notePatterns.forEach((pattern) => {
    const option = document.createElement('option');
    option.value = pattern.id;
    option.textContent = pattern.label;
    option.selected = pattern.id === currentId;
    select.appendChild(option);
  });
}

function attachMmlAreaListeners(): void {
  ['instrumentMml', 'effectMml', 'noteMml'].forEach((id) => {
    const area = getElement<HTMLTextAreaElement>(id);
    area.addEventListener('input', () => {
      updateCombinedMml();
      void playCurrent();
    });
  });
  getElement<HTMLTextAreaElement>('combinedMml').addEventListener('input', () => {
    void playCurrent();
  });
  getElement<HTMLTextAreaElement>('jsonPreview').addEventListener('input', () => {
    void playFromJson();
  });
}

function exportState(state: DemoState): void {
  const payload = {
    instrumentId: state.instrumentId,
    instrumentValues: state.instrumentValues,
    effectId: state.effectId,
    effectValues: state.effectValues,
    notePatternId: state.notePatternId,
    noteMml: getElement<HTMLTextAreaElement>('noteMml').value
  };
  getElement<HTMLTextAreaElement>('stateJson').value = JSON.stringify(payload, null, 2);
  updateStatus('現在の設定をエクスポートしました。', 'success');
}

function importState(state: DemoState): void {
  try {
    const text = getElement<HTMLTextAreaElement>('stateJson').value;
    const parsed = JSON.parse(text) as Partial<DemoState> & { noteMml?: string };

    if (parsed.instrumentId && toneConfig.instruments.some((d) => d.id === parsed.instrumentId)) {
      state.instrumentId = parsed.instrumentId;
    }
    if (parsed.effectId && toneConfig.effects.some((d) => d.id === parsed.effectId)) {
      state.effectId = parsed.effectId;
    }
    if (parsed.instrumentValues) {
      state.instrumentValues = parsed.instrumentValues as Record<string, number>;
    }
    if (parsed.effectValues) {
      state.effectValues = parsed.effectValues as Record<string, number>;
    }
    if (parsed.notePatternId && notePatterns.some((p) => p.id === parsed.notePatternId)) {
      state.notePatternId = parsed.notePatternId;
    }
    if (parsed.noteMml) {
      getElement<HTMLTextAreaElement>('noteMml').value = parsed.noteMml;
    }

    const instrumentDef = toneConfig.instruments.find((d) => d.id === state.instrumentId) ?? toneConfig.instruments[0];
    const effectDef = toneConfig.effects.find((d) => d.id === state.effectId) ?? toneConfig.effects[0];
    state.instrumentValues = ensureValues(instrumentDef.parameters, state.instrumentValues);
    state.effectValues = ensureValues(effectDef.parameters, state.effectValues);

    setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
    setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);
    const noteSelect = getElement<HTMLSelectElement>('notePattern');
    Array.from(noteSelect.options).forEach((option) => {
      option.selected = option.value === state.notePatternId;
    });
    if (!parsed.noteMml) {
      const pattern = notePatterns.find((p) => p.id === state.notePatternId);
      if (pattern) {
        getElement<HTMLTextAreaElement>('noteMml').value = pattern.mml;
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    updateStatus(`JSONの読み込みに失敗しました: ${message}`, 'error');
  }
}

function setupNoteArea(state: DemoState): void {
  setupNoteOptions(state.notePatternId);
  const select = getElement<HTMLSelectElement>('notePattern');
  select.addEventListener('change', () => {
    const selected = notePatterns.find((p) => p.id === select.value);
    if (!selected) return;
    state.notePatternId = selected.id;
    getElement<HTMLTextAreaElement>('noteMml').value = selected.mml;
    updateCombinedMml();
    void playCurrent();
  });

  const selected = notePatterns.find((p) => p.id === state.notePatternId) ?? notePatterns[0];
  getElement<HTMLTextAreaElement>('noteMml').value = selected.mml;
}

function setupParameters(
  state: DemoState,
  onInstrumentParamChange: () => void,
  onEffectParamChange: () => void
): void {
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

function setupControls(): void {
  const state: DemoState = {
    instrumentId: toneConfig.instruments[0]?.id ?? 'Synth',
    instrumentValues: {},
    effectId: toneConfig.effects[0]?.id ?? 'none',
    effectValues: {},
    notePatternId: notePatterns[0]?.id ?? 'doremi'
  };

  const onInstrumentParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    void playCurrent();
  };
  const onEffectParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    void playCurrent();
  };

  setupParameters(state, onInstrumentParamChange, onEffectParamChange);
  setupNoteArea(state);
  attachMmlAreaListeners();
  regenerateMml(state, toneConfig.instruments, toneConfig.effects);
  updateCombinedMml();

  getElement<HTMLButtonElement>('playNow').addEventListener('click', () => {
    void playCurrent({ allowUnlock: true });
  });

  getElement<HTMLButtonElement>('exportState').addEventListener('click', () => exportState(state));
  getElement<HTMLButtonElement>('importState').addEventListener('click', () => importState(state));

  getElement<HTMLButtonElement>('randomInstrument').addEventListener('click', () => {
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

  getElement<HTMLButtonElement>('randomEffect').addEventListener('click', () => {
    const nonNoneEffects = toneConfig.effects.filter((d) => d.id !== 'none');
    if (nonNoneEffects.length === 0) return;
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

  getElement<HTMLSelectElement>('instrumentSelect').addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const nextDef = toneConfig.instruments.find((d) => d.id === target.value);
    if (!nextDef) return;
    state.instrumentId = nextDef.id;
    state.instrumentValues = ensureValues(nextDef.parameters, state.instrumentValues);
    renderParameters('instrumentParams', nextDef.parameters, state.instrumentValues, onInstrumentParamChange);
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    updateCombinedMml();
    void playCurrent();
  });

  getElement<HTMLSelectElement>('effectSelect').addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const nextDef = toneConfig.effects.find((d) => d.id === target.value);
    if (!nextDef) return;
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
  }).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    updateStatus(`エラー: ${message}`, 'error');
    console.error('WASM initialization failed:', error);
  });
});
