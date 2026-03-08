export type ParameterDefinition = {
    path: string;
    label: string;
    min: number;
    max: number;
    sweetMin: number;
    sweetMax: number;
    defaultValue: number;
    step?: number;
};
export type InstrumentDefinition = {
    id: string;
    name: string;
    parameters: ParameterDefinition[];
};
export type EffectDefinition = {
    id: string;
    name: string;
    parameters: ParameterDefinition[];
};
export type ToneEditConfig = {
    instruments: InstrumentDefinition[];
    effects: EffectDefinition[];
};
export type DemoState = {
    instrumentId: string;
    instrumentValues: Record<string, number>;
    effectId: string;
    effectValues: Record<string, number>;
    notePatternId: string;
};
export type NotePattern = {
    id: string;
    label: string;
    mml: string;
};
//# sourceMappingURL=tone-edit-types.d.ts.map