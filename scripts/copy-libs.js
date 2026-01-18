#!/usr/bin/env node
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Create dist/libs directory
const libsDir = join(projectRoot, 'dist', 'libs');
mkdirSync(libsDir, { recursive: true });

// Copy tonejs-json-sequencer
const source = join(projectRoot, 'node_modules', 'tonejs-json-sequencer', 'dist', 'index.mjs');
const dest = join(libsDir, 'tonejs-json-sequencer.mjs');
copyFileSync(source, dest);

// Patch tonejs-json-sequencer to fix effect constructor args handling
// Issue: Effects use spread operator on args which fails for objects
// Fix: Pass args directly as first parameter, like instruments do
let content = readFileSync(dest, 'utf8');

// List of effects that need patching - these should accept an options object
const effectsToFix = [
    'AutoFilter', 'AutoPanner', 'AutoWah', 'BitCrusher', 'Chebyshev',
    'Chorus', 'Distortion', 'FeedbackDelay', 'Freeverb', 'FrequencyShifter',
    'JCReverb', 'Phaser', 'PingPongDelay', 'PitchShift', 'Reverb',
    'StereoWidener', 'Tremolo', 'Vibrato'
];

effectsToFix.forEach(effectName => {
    // Replace: new Tone.EffectName(...(element.args || []))
    // With:    new Tone.EffectName(element.args)
    // This fixes the issue where spreading an object doesn't work as function arguments
    
    const oldCode = `new Tone.${effectName}(...(element.args || []))`;
    const newCode = `new Tone.${effectName}(element.args)`;
    
    content = content.replace(oldCode, newCode);
});

writeFileSync(dest, content, 'utf8');

console.log('✓ Copied and patched tonejs-json-sequencer to dist/libs');

// Create dist/tree-sitter-mml directory
const treeSitterDir = join(projectRoot, 'dist', 'tree-sitter-mml');
mkdirSync(treeSitterDir, { recursive: true });

// Copy tree-sitter-mml WASM
const treeSitterSource = join(projectRoot, 'tree-sitter-mml', 'tree-sitter-mml.wasm');
const treeSitterDest = join(treeSitterDir, 'tree-sitter-mml.wasm');
copyFileSync(treeSitterSource, treeSitterDest);

console.log('✓ Copied tree-sitter-mml.wasm to dist/tree-sitter-mml');

// Copy web-tree-sitter WASM
const webTreeSitterSource = join(projectRoot, 'node_modules', 'web-tree-sitter', 'web-tree-sitter.wasm');
const webTreeSitterDest = join(projectRoot, 'dist', 'web-tree-sitter.wasm');
copyFileSync(webTreeSitterSource, webTreeSitterDest);

console.log('✓ Copied web-tree-sitter.wasm to dist');

// Copy web-tree-sitter JS
const webTreeSitterJsSource = join(projectRoot, 'node_modules', 'web-tree-sitter', 'web-tree-sitter.js');
const webTreeSitterJsDest = join(projectRoot, 'dist', 'web-tree-sitter.js');
copyFileSync(webTreeSitterJsSource, webTreeSitterJsDest);

console.log('✓ Copied web-tree-sitter.js to dist');


