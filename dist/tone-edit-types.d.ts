export type ParameterDefinition = {
    path: string;
    label: string;
    /**
     * If present, this parameter is a string enum. One of these choices will
     * be selected at random. The numeric fields (min/max/sweetMin/sweetMax/
     * defaultValue/step) are ignored when choices is non-empty.
     */
    choices?: string[];
    /**
     * If present, this parameter picks one of these discrete numeric values at
     * random. The range fields (min/max/sweetMin/sweetMax/step) are ignored
     * when numericChoices is non-empty.
     */
    numericChoices?: number[];
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
    instrumentValues: Record<string, number | string>;
    effectId: string;
    effectValues: Record<string, number | string>;
    notePatternId: string;
};
export type NotePattern = {
    id: string;
    label: string;
    mml: string;
};
//# sourceMappingURL=tone-edit-types.d.ts.map