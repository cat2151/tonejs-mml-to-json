#!/usr/bin/env node
/**
 * check-node-version.cjs
 *
 * Node.jsのバージョンをチェックする。
 */
const requiredVersion = 20;
const current = process.versions.node.split('.')[0];
if (parseInt(current, 10) < requiredVersion) {
  console.error(`Node.js v${requiredVersion} 以上が必要です (現在: v${process.versions.node})`);
  process.exit(1);
} else {
  console.log(`Node.js version OK: v${process.versions.node}`);
}
