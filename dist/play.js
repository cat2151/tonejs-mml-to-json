import { SequencerNodes, playSequence } from 'tonejs-json-sequencer';
// Global state - using SequencerNodes from tonejs-json-sequencer
export const nodes = new SequencerNodes();
export let errorPoint = "";
/**
 * Convert ToneCommand to SequenceEvent format
 * The main difference is connectTo which can be any string in ToneCommand
 * but must be number | 'toDestination' in SequenceEvent
 */
function toSequenceEvent(cmd) {
    if (cmd.eventType === 'connect') {
        return {
            ...cmd,
            connectTo: cmd.connectTo === 'toDestination' ? 'toDestination' : cmd.connectTo
        };
    }
    return cmd;
}
/**
 * Play the sequence from MML or JSON
 * @param regenerateJson - If true, regenerate JSON from MML in textarea1. If false, play directly from textarea2.
 */
export async function play(regenerateJson = true) {
    try {
        // Get textarea references
        const textarea1 = document.querySelector('#textarea1');
        const textarea2 = document.querySelector('#textarea2');
        if (!textarea1 || !textarea2) {
            console.error('Textareas not found');
            return;
        }
        // Only regenerate JSON from MML if requested
        if (regenerateJson) {
            // mml
            const mml = textarea1.value;
            errorPoint = "mml2json";
            // mml -> Tone.js playable JSON
            let json = window.mml2json(mml);
            errorPoint = "after mml2json";
            textarea2.value = JSON.stringify(json, null, 2);
        }
        // Tone.js playable JSON -> Tone.js
        const jsonStr = textarea2.value;
        errorPoint = "JSON.parse";
        const sequence = JSON.parse(jsonStr);
        // Convert to SequenceEvent format and use tonejs-json-sequencer to play
        errorPoint = "playSequence";
        await playSequence(Tone, nodes, sequence.map(toSequenceEvent));
    }
    catch (error) {
        console.log(errorPoint + " error : [" + error + "]");
    }
}
//# sourceMappingURL=play.js.map