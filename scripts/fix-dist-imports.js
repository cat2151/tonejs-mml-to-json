#!/usr/bin/env node
/**
 * Post-build fixup: Replace bare module specifiers in dist/ with relative paths.
 *
 * TypeScript compiles 'web-tree-sitter' as a bare specifier, which requires
 * node_modules or an import map to resolve. For CDN loading (e.g. jsDelivr),
 * the dist files must use relative paths instead.
 *
 * This script runs after `build:ts` to make the dist files CDN-compatible
 * as modern ES modules (MJS).
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const filePath = join(projectRoot, 'dist', 'mml2ast.js');
let content = readFileSync(filePath, 'utf8');

const before = `from 'web-tree-sitter'`;
const after = `from './web-tree-sitter.js'`;

if (!content.includes(before)) {
  console.log('⚠ No bare web-tree-sitter import found in dist/mml2ast.js (already fixed or changed)');
  process.exit(0);
}

content = content.replace(before, after);
writeFileSync(filePath, content);

console.log('✓ Fixed bare import in dist/mml2ast.js for CDN compatibility');
console.log(`  Changed: ${before}`);
console.log(`  To:      ${after}`);
