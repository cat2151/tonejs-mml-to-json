/**
 * AST to JSON converter
 * Converts AST to Tone.js compatible JSON format
 */

export function ast2json(ast) {
  const commands = [];
  // Ticks per measure: 192 ticks per quarter note * 4 quarter notes = 768 ticks per 4/4 measure
  const measTick = 192 * 4;
  let startTick = 0;
  let defaultLength = 8; // default note length (eighth note)
  let octave = 4; // default octave 4
  let nodeId = 0;

  // Add initial setup commands
  commands.push({
    eventType: "createNode",
    nodeId: getNodeId(),
    nodeType: "Synth"
  });
  commands.push({
    eventType: "connect",
    nodeId: getNodeId(),
    connectTo: "toDestination"
  });

  // Process each AST token
  for (const token of ast) {
    switch (token.type) {
      case 'note':
        const noteCommand = processNote(token);
        if (noteCommand) {
          commands.push(noteCommand);
        }
        break;

      case 'rest':
        processRest(token);
        break;

      case 'length':
        if (token.value !== null) {
          defaultLength = token.value;
        }
        break;

      case 'octave':
        if (token.value !== null) {
          octave = token.value;
        }
        break;

      case 'octaveUp':
        octave++;
        break;

      case 'octaveDown':
        octave--;
        break;

      case 'instrument':
        nodeId++; // Increment to allocate a new node ID
        // Both createNode and connect use the same nodeId (the new one)
        commands.push({
          eventType: "createNode",
          nodeId: getNodeId(),
          nodeType: "Synth"
        });
        commands.push({
          eventType: "connect",
          nodeId: getNodeId(),
          connectTo: "toDestination"
        });
        break;

      default:
        // Log warning for unknown token types to catch potential bugs
        console.warn('ast2json: Unknown token type encountered:', token.type, token);
        break;
    }
  }

  return commands;

  function processNote(token) {
    const ticks = calcTicks(token.duration, token.dots);
    
    // Convert accidental to sharp/flat notation
    let accidental = '';
    if (token.accidental) {
      if (token.accidental[0] === '+') {
        accidental = '#'.repeat(token.accidental.length);
      } else if (token.accidental[0] === '-') {
        accidental = 'b'.repeat(token.accidental.length);
      }
    }

    const command = {
      eventType: "triggerAttackRelease",
      nodeId: getNodeId(),
      args: [token.note + accidental + octave, calcDuration(ticks), calcStartTick()]
    };

    increaseStartTick(ticks);
    return command;
  }

  function processRest(token) {
    const ticks = calcTicks(token.duration, token.dots);
    increaseStartTick(ticks);
  }

  function calcTicks(duration, dots) {
    let result;
    if (duration) {
      result = measTick / duration;
    } else {
      result = measTick / defaultLength;
    }

    // Apply dots
    if (dots > 0) {
      switch (dots) {
        case 1: result *= 1.5; break;
        case 2: result *= 1.75; break;
        default:
          // For more dots, calculate appropriately
          let multiplier = 1;
          let dotValue = 0.5;
          for (let i = 0; i < dots; i++) {
            multiplier += dotValue;
            dotValue /= 2;
          }
          result *= multiplier;
          break;
      }
    }

    return result;
  }

  function calcDuration(ticks) {
    let duration = ticks;
    // Apply gate time adjustment: subtract 10 ticks from durations >= 20 
    // to create a slight gap between notes (equivalent to 'q' quantize command).
    // This prevents notes from bleeding together and makes the music sound more natural.
    if (duration >= 20) duration -= 10;
    return duration + "i";
  }

  function calcStartTick() {
    return "+" + startTick + "i";
  }

  function increaseStartTick(ticks) {
    startTick += ticks;
  }

  function getNodeId() {
    return nodeId;
  }
}
