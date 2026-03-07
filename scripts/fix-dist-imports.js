#!/usr/bin/env node
/**
 * Post-build fixup: Replace the bare 'web-tree-sitter' module specifier in
 * dist/mml2ast.js with a relative path.
 *
 * TypeScript compiles 'web-tree-sitter' as a bare specifier, which requires
 * node_modules or an import map to resolve. For CDN loading (e.g. jsDelivr),
 * the generated dist file must use a relative path instead.
 *
 * This script runs after `build:ts` to make dist/mml2ast.js CDN-compatible
 * as a modern ES module (MJS).
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const filePath = join(projectRoot, 'dist', 'mml2ast.js');
let content = readFileSync(filePath, 'utf8');

const importPattern = /from\s+(['"])web-tree-sitter\1/g;
const replacement = `from './web-tree-sitter.js'`;

const matches = content.match(importPattern) || [];

if (matches.length === 0) {
  // No exact match for the import pattern; check if a bare specifier still exists.
  const stillHasBareSpecifier = /from\s+(['"])web-tree-sitter\1/.test(content);
  if (stillHasBareSpecifier) {
    console.error('✗ Bare web-tree-sitter import detected in dist/mml2ast.js but did not match expected pattern for rewrite.');
    process.exit(1);
  }

  console.log('⚠ No bare web-tree-sitter import found in dist/mml2ast.js (already fixed or not emitted)');
  process.exit(0);
}

content = content.replace(importPattern, replacement);

// Ensure no bare specifier remains after the rewrite.
if (/from\s+(['"])web-tree-sitter\1/.test(content)) {
  console.error('✗ Bare web-tree-sitter import still present in dist/mml2ast.js after rewrite.');
  process.exit(1);
}

writeFileSync(filePath, content);

console.log('✓ Fixed bare import in dist/mml2ast.js for CDN compatibility');
console.log(`  Replaced ${matches.length} occurrence(s) of bare web-tree-sitter import`);
console.log(`  With:     ${replacement}`);
