#!/usr/bin/env node
/**
 * copy-commit-results.cjs
 *
 * 生成されたHTML等を generated-docs/ へコピーし、コミットする。
 *
 * Usage:
 *   node copy-commit-results.cjs
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const src = path.resolve('generated-docs/callgraph-enhanced.html');
const dest = path.resolve('generated-docs/callgraph-enhanced.html');

if (!fs.existsSync(src)) {
  console.error('生成HTMLが見つかりません:', src);
  process.exit(1);
}
// ここでは同じ場所なのでコピー省略
try {
  execSync('git add generated-docs/callgraph-enhanced.html');
  execSync('git commit -m "Update callgraph-enhanced.html [auto]"');
  execSync('git push');
  console.log('コミット・プッシュ完了');
} catch (e) {
  console.error('コミット・プッシュに失敗:', e.message);
  process.exit(1);
}
