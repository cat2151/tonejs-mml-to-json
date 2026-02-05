import { SequencerNodes } from 'tonejs-json-sequencer';
export declare const nodes: SequencerNodes;
export declare let errorPoint: string;
/**
 * Play the sequence from MML or JSON
 * @param regenerateJson - If true, regenerate JSON from MML in textarea1. If false, play directly from textarea2.
 */
export declare function play(regenerateJson?: boolean): Promise<void>;
//# sourceMappingURL=play.d.ts.map