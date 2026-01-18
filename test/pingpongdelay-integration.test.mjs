/**
 * Integration test for PingPongDelay with args
 * Tests that the patched tonejs-json-sequencer correctly handles effect args
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Read the patched library
const libPath = join(projectRoot, 'dist', 'libs', 'tonejs-json-sequencer.mjs');
const libContent = readFileSync(libPath, 'utf8');

console.log('Testing patched tonejs-json-sequencer...\n');

// Test 1: Verify PingPongDelay is patched correctly
const pingPongPattern = /case 'PingPongDelay':\s*nodes\.set\(element\.nodeId, new Tone\.PingPongDelay\(element\.args\)\);/;
if (pingPongPattern.test(libContent)) {
    console.log('✓ PingPongDelay correctly patched to accept args object');
} else {
    console.error('✗ PingPongDelay patch failed!');
    const oldPattern = /case 'PingPongDelay':\s*nodes\.set\(element\.nodeId, new Tone\.PingPongDelay\(\.\.\./;
    if (oldPattern.test(libContent)) {
        console.error('  Found old spread syntax - patch was not applied');
    }
    process.exit(1);
}

// Test 2: Verify other effects are patched
const effectsToCheck = ['Chorus', 'Reverb', 'Vibrato', 'Tremolo', 'Phaser'];
let allEffectsPatched = true;

effectsToCheck.forEach(effect => {
    const pattern = new RegExp(`case '${effect}':\\s*nodes\\.set\\(element\\.nodeId, new Tone\\.${effect}\\(element\\.args\\)\\);`);
    if (pattern.test(libContent)) {
        console.log(`✓ ${effect} correctly patched`);
    } else {
        console.error(`✗ ${effect} patch failed`);
        allEffectsPatched = false;
    }
});

// Test 3: Verify instruments still use direct args (not changed)
const instrumentPattern = /case 'Synth':\s*nodes\.set\(element\.nodeId, new Tone\.Synth\(element\.args\)\);/;
if (instrumentPattern.test(libContent)) {
    console.log('✓ Synth (instrument) still correctly uses direct args');
} else {
    console.error('✗ Synth instrument format was incorrectly changed');
    allEffectsPatched = false;
}

if (allEffectsPatched) {
    console.log('\n✓ All patches verified successfully!');
} else {
    console.error('\n✗ Some patches failed verification');
    process.exit(1);
}
