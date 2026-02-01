import { initWasm, mml2json } from './dist/index.js';

await initWasm();

// Test different effects
console.log('=== Testing Reverb ===');
try {
  const reverbJson = mml2json('@Reverb c');
  console.log('Reverb works!');
  const nodes = reverbJson.filter(e => e.eventType === 'createNode');
  console.log('Nodes:', nodes.map(n => n.nodeType).join(', '));
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== Testing Chorus ===');
try {
  const chorusJson = mml2json('@Chorus c');
  console.log('Chorus works!');
  const nodes = chorusJson.filter(e => e.eventType === 'createNode');
  console.log('Nodes:', nodes.map(n => n.nodeType).join(', '));
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== Testing FeedbackDelay ===');
try {
  const fbDelayJson = mml2json('@FeedbackDelay c');
  console.log('FeedbackDelay works!');
  const nodes = fbDelayJson.filter(e => e.eventType === 'createNode');
  console.log('Nodes:', nodes.map(n => n.nodeType).join(', '));
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== Testing mixed effects (PingPongDelay + Reverb) ===');
try {
  const mixedJson = mml2json('@PingPongDelay @Reverb c');
  console.log('Mixed effects work!');
  const nodes = mixedJson.filter(e => e.eventType === 'createNode');
  console.log('Nodes:', nodes.map(n => n.nodeType).join(', '));
  const connects = mixedJson.filter(e => e.eventType === 'connect');
  console.log('Connections:', connects.map(c => `${c.nodeId}->${c.connectTo}`).join(', '));
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== Testing mixed effects (Reverb + Chorus + PingPongDelay) ===');
try {
  const mixed3Json = mml2json('@Reverb @Chorus @PingPongDelay c');
  console.log('3 mixed effects work!');
  const nodes = mixed3Json.filter(e => e.eventType === 'createNode');
  console.log('Nodes:', nodes.map(n => n.nodeType).join(', '));
  const connects = mixed3Json.filter(e => e.eventType === 'connect');
  console.log('Connections:', connects.map(c => `${c.nodeId}->${c.connectTo}`).join(', '));
} catch (e) {
  console.log('Error:', e.message);
}
