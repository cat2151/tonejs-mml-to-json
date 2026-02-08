// Tone.js is loaded globally via script tag in the HTML
declare const Tone: any;

import config from './tone-edit-config.json';
import { initWasm, mml2json } from './index.js';
import { SequencerNodes, playSequence, type SequenceEvent } from 'tonejs-json-sequencer';
import type { ToneCommand } from './ast2json.js';

type ParameterDefinition = {
  path: string;
  label: string;
  min: number;
  max: number;
  sweetMin: number;
  sweetMax: number;
  defaultValue: number;
  step?: number;
};

type InstrumentDefinition = {
  id: string;
  name: string;
  parameters: ParameterDefinition[];
};

type EffectDefinition = {
  id: string;
  name: string;
  parameters: ParameterDefinition[];
};

type ToneEditConfig = {
  instruments: InstrumentDefinition[];
  effects: EffectDefinition[];
};

type DemoState = {
  instrumentId: string;
  instrumentValues: Record<string, number>;
  effectId: string;
  effectValues: Record<string, number>;
  notePatternId: string;
};

type NotePattern = {
  id: string;
  label: string;
  mml: string;
};

const AUTO_PLAY_DELAY = 800;
const toneConfig = config as ToneEditConfig;
const nodes = new SequencerNodes();

const notePatterns: NotePattern[] = [
  { id: 'doremi', label: 'ドレミ', mml: 'o4 l8 c d e f g a b > c' },
  { id: 'chord', label: '和音', mml: "o4 l4 'ceg' 'dfa' 'egb' 'f+ac'" },
  { id: 'bass', label: 'Bass', mml: 'o2 l8 c r g r < c r g r' },
  { id: 'arp', label: 'アルペジオ', mml: 'o4 l16 c e g c g e c' }
];

let wasmReady: Promise<void> | null = null;
let autoPlayTimer: number | null = null;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value: number, step: number): number {
  if (step <= 0) return value;
  const scaled = Math.round(value / step) * step;
  return Number(scaled.toFixed(6));
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
    const value = Number.isFinite(values[def.path]) ? values[def.path] : def.defaultValue;
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

function randomValue(def: ParameterDefinition): number {
  const min = def.sweetMin ?? def.min;
  const max = def.sweetMax ?? def.max;
  const raw = min + Math.random() * (max - min);
  const stepped = roundToStep(raw, def.step ?? 0.01);
  return clamp(stepped, def.min, def.max);
}

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

function scheduleAutoPlay(): void {
  if (autoPlayTimer !== null) {
    window.clearTimeout(autoPlayTimer);
  }
  autoPlayTimer = window.setTimeout(() => {
    void playCurrent();
  }, AUTO_PLAY_DELAY);
}

async function playCurrent(): Promise<void> {
  const combinedMml = (getElement<HTMLTextAreaElement>('combinedMml').value || '').trim();
  if (!combinedMml) {
    updateStatus('MMLが空です。', 'error');
    return;
  }

  try {
    updateStatus('演奏準備中...', 'info');
    if (!wasmReady) {
      wasmReady = initWasm();
    }
    await wasmReady;
    await Tone.start();

    const json = mml2json(combinedMml).map(toSequenceEvent);
    const jsonOutput = document.getElementById('jsonPreview');
    if (jsonOutput) {
      jsonOutput.textContent = JSON.stringify(json, null, 2);
    }

    await playSequence(Tone, nodes, json);
    updateStatus('再生中。パラメータを触って試してみてください。', 'success');
  } catch (error) {
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

function randomize(
  defs: ParameterDefinition[],
  values: Record<string, number>,
  containerId: string,
  onChange: (path: string, value: number) => void
): void {
  defs.forEach((def) => {
    values[def.path] = randomValue(def);
  });
  renderParameters(containerId, defs, values, onChange);
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
      scheduleAutoPlay();
    });
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
    if (parsed.notePatternId) {
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
      scheduleAutoPlay();
    });
    renderParameters('effectParams', effectDef.parameters, state.effectValues, () => {
      regenerateMml(state, toneConfig.instruments, toneConfig.effects);
      scheduleAutoPlay();
    });

    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    updateCombinedMml();
    scheduleAutoPlay();
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
    scheduleAutoPlay();
  });

  const selected = notePatterns.find((p) => p.id === state.notePatternId) ?? notePatterns[0];
  getElement<HTMLTextAreaElement>('noteMml').value = selected.mml;
}

function setupParameters(state: DemoState): void {
  const instrumentDef = toneConfig.instruments.find((d) => d.id === state.instrumentId) ?? toneConfig.instruments[0];
  const effectDef = toneConfig.effects.find((d) => d.id === state.effectId) ?? toneConfig.effects[0];

  state.instrumentId = instrumentDef.id;
  state.effectId = effectDef.id;
  state.instrumentValues = ensureValues(instrumentDef.parameters, state.instrumentValues);
  state.effectValues = ensureValues(effectDef.parameters, state.effectValues);

  setupSelectOptions('instrumentSelect', toneConfig.instruments, state.instrumentId);
  setupSelectOptions('effectSelect', toneConfig.effects, state.effectId);

  const onInstrumentParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    scheduleAutoPlay();
  };
  const onEffectParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    scheduleAutoPlay();
  };

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

  setupParameters(state);
  setupNoteArea(state);
  attachMmlAreaListeners();
  regenerateMml(state, toneConfig.instruments, toneConfig.effects);
  updateCombinedMml();

  getElement<HTMLButtonElement>('playNow').addEventListener('click', () => {
    void playCurrent();
  });

  getElement<HTMLButtonElement>('exportState').addEventListener('click', () => exportState(state));
  getElement<HTMLButtonElement>('importState').addEventListener('click', () => importState(state));

  const onInstrumentParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    scheduleAutoPlay();
  };
  const onEffectParamChange = (): void => {
    regenerateMml(state, toneConfig.instruments, toneConfig.effects);
    scheduleAutoPlay();
  };

  getElement<HTMLButtonElement>('randomInstrument').addEventListener('click', () => {
    const instrumentDef = toneConfig.instruments.find((d) => d.id === state.instrumentId) ?? toneConfig.instruments[0];
    randomize(instrumentDef.parameters, state.instrumentValues, 'instrumentParams', onInstrumentParamChange);
    onInstrumentParamChange();
  });

  getElement<HTMLButtonElement>('randomEffect').addEventListener('click', () => {
    const effectDef = toneConfig.effects.find((d) => d.id === state.effectId) ?? toneConfig.effects[0];
    if (effectDef.parameters.length === 0) {
      updateStatus('エフェクトが「なし」の場合はパラメータがありません。', 'info');
      return;
    }
    randomize(effectDef.parameters, state.effectValues, 'effectParams', onEffectParamChange);
    onEffectParamChange();
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
    scheduleAutoPlay();
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
    scheduleAutoPlay();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupControls();
  updateStatus('パラメータを編集すると自動でMMLが再生成されます。', 'info');
  scheduleAutoPlay();
});
