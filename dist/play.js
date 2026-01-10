export let nodes = [];
export let errorPoint = "";
export function play() {
    try {
        // Get textarea references
        const textarea1 = document.querySelector('#textarea1');
        const textarea2 = document.querySelector('#textarea2');
        if (!textarea1 || !textarea2) {
            console.error('Textareas not found');
            return;
        }
        // mml
        const mml = textarea1.value;
        errorPoint = "mml2json";
        // mml -> Tone.js playable JSON
        let json = window.mml2json(mml);
        errorPoint = "after mml2json";
        textarea2.value = JSON.stringify(json, null, 2);
        // Tone.js playable JSON -> Tone.js
        const jsonStr = textarea2.value;
        errorPoint = "JSON.parse";
        const j = JSON.parse(jsonStr);
        // dispose
        nodes.forEach(element => element.dispose());
        // play
        j.forEach(element => sub(element));
    }
    catch (error) {
        console.log(errorPoint + " error : [" + error + "]");
    }
}
function sub(element) {
    errorPoint = "sub";
    console.log(element);
    switch (element.eventType) {
        case "createNode":
            if (element.nodeId === undefined || element.nodeType === undefined) {
                console.error('Missing nodeId or nodeType for createNode');
                return;
            }
            switch (element.nodeType) {
                case "Synth":
                    nodes[element.nodeId] = new Tone.Synth();
                    break;
                case "FMSynth":
                    nodes[element.nodeId] = new Tone.FMSynth(element.args);
                    break;
                case "Vibrato":
                    nodes[element.nodeId] = new Tone.Vibrato(...(element.args || []));
                    break;
            }
            break;
        case "connect":
            if (element.nodeId === undefined || element.connectTo === undefined) {
                console.error('Missing nodeId or connectTo for connect');
                return;
            }
            if (element.connectTo === "toDestination") {
                nodes[element.nodeId].toDestination();
            }
            else {
                nodes[element.nodeId].connect(nodes[element.connectTo]);
            }
            break;
        case "triggerAttackRelease":
            if (element.nodeId === undefined || !element.args) {
                console.error('Missing nodeId or args for triggerAttackRelease');
                return;
            }
            errorPoint = "triggerAttackRelease";
            nodes[element.nodeId].triggerAttackRelease(...element.args);
            break;
        case "depth.rampTo":
            if (element.nodeId === undefined || !element.args) {
                console.error('Missing nodeId or args for depth.rampTo');
                return;
            }
            nodes[element.nodeId].depth?.rampTo(...element.args);
            break;
    }
}
//# sourceMappingURL=play.js.map