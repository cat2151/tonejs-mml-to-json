#!/usr/bin/env node
/**
 * check-commits.cjs
 *
 * 過去24時間以内にユーザーコミットがあるかを判定し、
 * 手動実行時は常にtrueを返す。
 *
 * Usage:
 *   node check-commits.cjs [--manual]
 *
 * 出力: should-run=true/false を stdout に出力
 */
const { execSync } = require('child_process');

function isManual() {
  return process.argv.includes('--manual');
}

function main() {
  if (isManual()) {
    console.log('should-run=true');
    console.log('Manual execution, proceeding with analysis');
    process.exit(0);
  }
  try {
    // 過去24時間のコミットを取得
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log(`Checking commits since: ${since}`);
    // github-actions[bot] 以外のコミット数をカウント
    const log = execSync(`git log --since="${since}" --pretty=format:"%an"`, { encoding: 'utf-8' });
    const userCommits = log.split('\n').filter(name => name && name !== 'github-actions[bot]').length;
    console.log(`User commits in last 24 hours: ${userCommits}`);
    if (userCommits > 0) {
      console.log('Found user commits, proceeding with analysis');
      if (process.env.GITHUB_OUTPUT) {
        require('fs').appendFileSync(process.env.GITHUB_OUTPUT, 'should-run=true\n');
      }
    } else {
      console.log('No user commits found, skipping analysis');
      if (process.env.GITHUB_OUTPUT) {
        require('fs').appendFileSync(process.env.GITHUB_OUTPUT, 'should-run=false\n');
      }
    }
  } catch (e) {
    console.error('Error checking commits:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
