export const sequenceDefinitions = [
    // === Effect Demos ===
    {
        name: "Reverb",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Reverb",
                "args": { "decay": 2 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+96i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+288i"]
            }
        ]
    },
    {
        name: "Freeverb",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Freeverb",
                "args": { "roomSize": 0.8, "dampening": 5000 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+96i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+288i"]
            }
        ]
    },
    {
        name: "JCReverb",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "JCReverb",
                "args": { "roomSize": 0.5 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+96i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+288i"]
            }
        ]
    },
    {
        name: "Chorus",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Chorus",
                "args": { "frequency": 4, "delayTime": 2.5, "depth": 0.5 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "2n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "2n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "2n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "1n", "+576i"]
            }
        ]
    },
    {
        name: "Phaser",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Phaser",
                "args": { "frequency": 0.5, "octaves": 3, "baseFrequency": 350 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "2n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "2n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "2n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "1n", "+576i"]
            }
        ]
    },
    {
        name: "Tremolo",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Tremolo",
                "args": { "frequency": 9, "depth": 0.75 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "1n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "1n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "1n", "+768i"]
            }
        ]
    },
    {
        name: "Vibrato",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Vibrato",
                "args": { "frequency": 5, "depth": 0.1 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "1n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "1n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "1n", "+768i"]
            }
        ]
    },
    {
        name: "AutoFilter",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "AutoFilter",
                "args": { "frequency": 4 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "1n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "1n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "1n", "+768i"]
            }
        ]
    },
    {
        name: "AutoPanner",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "AutoPanner",
                "args": { "frequency": 4 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "1n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "1n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "1n", "+768i"]
            }
        ]
    },
    {
        name: "AutoWah",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "AutoWah",
                "args": { "baseFrequency": 50, "octaves": 6, "sensitivity": -30 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+96i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+288i"]
            }
        ]
    },
    {
        name: "FeedbackDelay",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "FeedbackDelay",
                "args": { "delayTime": "8n", "feedback": 0.5 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+576i"]
            }
        ]
    },
    {
        name: "PingPongDelay",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "PingPongDelay",
                "args": { "delayTime": "8n", "feedback": 0.3 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+576i"]
            }
        ]
    },
    {
        name: "Distortion",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Distortion",
                "args": { "distortion": 0.8 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C3", "4n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E3", "4n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G3", "4n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "2n", "+576i"]
            }
        ]
    },
    {
        name: "BitCrusher",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "BitCrusher",
                "args": { "bits": 4 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "8n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "8n", "+96i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "8n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "4n", "+288i"]
            }
        ]
    },
    {
        name: "Chebyshev",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "Chebyshev",
                "args": { "order": 50 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "4n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "4n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "4n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "2n", "+576i"]
            }
        ]
    },
    {
        name: "PitchShift",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "PitchShift",
                "args": { "pitch": 4 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "4n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "4n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "4n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "2n", "+576i"]
            }
        ]
    },
    {
        name: "FrequencyShifter",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "FrequencyShifter",
                "args": { "frequency": 42 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "1n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "1n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "1n", "+768i"]
            }
        ]
    },
    {
        name: "StereoWidener",
        data: [
            {
                "eventType": "createNode",
                "nodeId": 0,
                "nodeType": "Synth"
            },
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "StereoWidener",
                "args": { "width": 0.5 }
            },
            {
                "eventType": "connect",
                "nodeId": 0,
                "connectTo": 1
            },
            {
                "eventType": "connect",
                "nodeId": 1,
                "connectTo": "toDestination"
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C4", "4n", "+0i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["E4", "4n", "+192i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["G4", "4n", "+384i"]
            },
            {
                "eventType": "triggerAttackRelease",
                "nodeId": 0,
                "args": ["C5", "2n", "+576i"]
            }
        ]
    },
];
