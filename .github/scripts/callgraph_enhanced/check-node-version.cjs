#!/usr/bin/env node
/**
 * check-node-version.cjs
 *
 * Node.jsのバージョンをチェックする。
 */
const requiredVersion = 20;

// WSL or Act環境ではcheckをスキップ
const fs = require('fs');
const isWSL = fs.existsSync('/proc/version') && fs.readFileSync('/proc/version', 'utf8').includes('Microsoft');
const isAct = process.env.GITHUB_ACTOR === 'nektos/act';
if (isWSL || isAct) {
  console.log('テスト環境なのでcheckはスキップします');
  process.exit(0);
}

const current = process.versions.node.split('.')[0];
if (parseInt(current, 10) < requiredVersion) {
  console.error(`Node.js v${requiredVersion} 以上が必要です (現在: v${process.versions.node})`);
  process.exit(1);
} else {
  console.log(`Node.js version OK: v${process.versions.node}`);
}
