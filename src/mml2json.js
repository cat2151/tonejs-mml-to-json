function mml2json(mml) {
  const measTick = 192 * 4;
  let startTick = 0;
  let lCommand = 8; // default l8
  let octave = 4;
/*TODO
implement:
  o : note number?
  FMSynth (toneParams are ひとまず default)
*/
  let commands = compileMmlToCommands(mml);
  return commands;

  function compileMmlToCommands(mml) {
    let commands = [];
    commands.push({
      "eventType": "createNode",
      "nodeId": getNodeId(),
      "nodeType": "Synth"
      });
    commands.push({
      "eventType": "connect",
      "nodeId": getNodeId(),
      "connectTo": "toDestination"
      });
    for (let i = 0, imax = getMmlCommands().length; i < imax; i++) {
      let m, checked = {}, def = getMmlCommands()[i];
      while ((m = def.re.exec(mml)) !== null) {
        if (!checked[m.index]) {
          checked[m.index] = true;
          {
            let cmd = def.func(m);
            cmd.index = m.index;  // for sort
            cmd.origin = m[0];    // for debug
            commands.push(cmd);
            // console.log(startTick + " " + JSON.stringify(cmd, null, 2));
          }
          {
            let mask = repeat(m[0].length, " ");
            mml = mml.substr(0, m.index) + mask + mml.substr(m.index + mask.length);
          }
        }
      }
    }
    commands.sort(function(a, b) {
      return a.index - b.index;
    });
    return commands;
  };
  function getMmlCommands() {
    return [
      {
          re: /@(\d*)/g,
          func: function(m) {
              return {
                "eventType": "createNode",
                "nodeId": getNodeId(),
                "nodeType": "Synth"
                // TODO toneParams etc.
                };
          }
/*
問題
@で2つのobjectは作れない:
  createNode
  connectTo
案
  ほかの実装をもっと進めてノウハウ得てからにする
  effect実装してからにする(Vibrato)
  postProcessにて、connectToをcreateNode直後にinsertする
*/
      },
      {
        re: /([cdefgabrlo\<\>])([-+]*)(\d*)(\.*)/g,
        func: function(m) {
          const ticks = calcAttackToReleaseTicks(m[3], m[4]);
          if (m[1] == "r") {  // rを含めたのは応急。rだけ個別にするとr群だけ先に時間計算がされるので。今後もう少しほかの実装もしてpostProcess等のノウハウが蓄積したら再度検討する。
            result = {};
            increaseStartTick(ticks);
          } else if (m[1] == "l") { // lのコメントと同様
            result = {};
            lCommand = toInt(m[3]);
          } else if (m[1] == "o") { // lのコメントと同様
            result = {};
            octave = toInt(m[3]);
          } else if (m[1] == "<") { // lのコメントと同様
            result = {};
            octave++;
          } else if (m[1] == ">") { // lのコメントと同様
            result = {};
            octave--;
          } else {
            let pm = "";
            if (m[2][0] == "+") {
              pm = repeat(m[2].length, "#");  // TODO ## -> note number +2 (Tone.js ## 非対応)
            } else if (m[2][0] == "-") {
              pm = repeat(m[2].length, "b");
            }
            result = {
              "eventType": "triggerAttackRelease",
              "nodeId": getNodeId(),
              "args": [m[1] + pm + octave, calcDuration(ticks), calcStartTick()]
              };
            increaseStartTick(ticks);
          }
          return result;
        }
      }
    ];
  }
  function calcAttackToReleaseTicks(divide, points) {
    let result;
    if (divide) {
      result = measTick / divide;
    } else {
      result = calcLtick();
    }
    if (points) {
      switch (points.length) {
      case 1: result *= 1.5;  break;
      case 2: result *= 1.75; break;
      default: // TODO calc なお rare
        break;
      }
    }
    console.log(divide + points);
    return result;
  }
  function repeat(n, ch) {
      var str = "";
      for (var i = 0; i < n; i++) {
          str += ch;
      }
      return str;
  }
  function toInt(x) {
      return x | 0;
  }
  function calcDuration(ticks) {
    const t = ticks;
    if (ticks >= 20) ticks -= 10; // TODO q
    return ticks + "i";
  }
  function calcStartTick() {
    return "+" + startTick + "i";
  }
  function increaseStartTick(ticks) {
    startTick += ticks;
  }
  function calcLtick() {
    return measTick / lCommand;
  }
  function getNodeId() {
     return 0;  // TODO effect実装してから
  }
}
