#!/usr/bin/env node
/**
 * find-process-results.cjs
 *
 * CodeQLのSARIF結果ファイルを探し、なければエラー。
 *
 * Usage:
 *   node find-process-results.cjs
 */
const fs = require('fs');
const path = require('path');

const sarifPath = path.resolve('codeql-results.sarif');
if (!fs.existsSync(sarifPath)) {
  console.error('SARIFファイルが見つかりません: codeql-results.sarif');
  process.exit(1);
}
console.log('SARIFファイルが見つかりました:', sarifPath);
