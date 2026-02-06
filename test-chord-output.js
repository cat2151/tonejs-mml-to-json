import { mml2json } from './test/setup.js';

// Test the "Chords (Basic)" demo MML
const mml = "o4 l4 'ceg' 'dfb' 'ace' 'gbdf'";
console.log('Testing Chords (Basic) MML:', mml);
console.log('');

const json = mml2json(mml);
console.log('Generated JSON:');
console.log(JSON.stringify(json, null, 2));
