#!/usr/bin/env node
import { mkdirSync, copyFileSync, existsSync } from 'fs';
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

const sourceTypes = join(projectRoot, 'node_modules', 'tonejs-json-sequencer', 'dist', 'index.d.ts');
const destTypes = join(libsDir, 'tonejs-json-sequencer.d.ts');
if (existsSync(sourceTypes)) {
  copyFileSync(sourceTypes, destTypes);
  console.log('✓ Copied tonejs-json-sequencer (.mjs and .d.ts) to dist/libs');
} else {
  console.log('✓ Copied tonejs-json-sequencer (.mjs) to dist/libs');
  console.log('⚠ TypeScript definitions (.d.ts) not found, skipping');
}

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


