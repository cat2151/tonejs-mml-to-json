#!/usr/bin/env node
import { mkdirSync, copyFileSync } from 'fs';
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

console.log('✓ Copied tonejs-json-sequencer to dist/libs');
