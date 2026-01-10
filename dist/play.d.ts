interface ToneNode {
    dispose: () => void;
    toDestination: () => void;
    connect: (node: ToneNode) => void;
    triggerAttackRelease: (...args: any[]) => void;
    depth?: {
        rampTo: (...args: any[]) => void;
    };
}
export declare let nodes: ToneNode[];
export declare let errorPoint: string;
export declare function play(): void;
export {};
//# sourceMappingURL=play.d.ts.map