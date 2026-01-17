import { initParser, mml2ast } from './dist/mml2ast.js';
import { ast2json } from './dist/ast2json.js';
import init from './pkg/tonejs_mml_to_json.js';

await init();
await initParser();

const mml = '@PingPongDelay c @FMSynth d';
const ast = mml2ast(mml);
const json = ast2json(ast);

console.log('JSON output:');
console.log(JSON.stringify(json, null, 2));

const createNodes = json.filter(e => e.eventType === 'createNode');
console.log('\nCreate nodes:', createNodes.length);
createNodes.forEach((n, i) => console.log(`  ${i}: nodeId=${n.nodeId}, nodeType=${n.nodeType}`));

const connects = json.filter(e => e.eventType === 'connect');
console.log('\nConnect commands:', connects.length);
connects.forEach((c, i) => console.log(`  ${i}: nodeId=${c.nodeId}, connectTo=${JSON.stringify(c.connectTo)}`));

const notes = json.filter(e => e.eventType === 'triggerAttackRelease');
console.log('\nNotes:', notes.length);
notes.forEach((n, i) => console.log(`  ${i}: nodeId=${n.nodeId}, note=${n.args[0]}`));
