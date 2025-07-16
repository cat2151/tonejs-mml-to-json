#!/usr/bin/env node
/**
 * analyze-codeql.cjs
 *
 * 用途
 *  SARIFファイルを生成するための、CodeQL解析を行う。
 */

const { execSync } = require('child_process');
const path = require('path');

const dbPath = path.resolve('codeql-db');
const queriesPath = path.resolve('.github/codeql-queries');

// コマンドライン引数取得
const args = process.argv.slice(2);
const hasOverwrite = args.includes('--overwrite');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  if (args[0] === 'verify-config') {
    // DB作成のみ
    let createCmd = `codeql database create ${dbPath} --language=javascript --source-root=src`;
    if (hasOverwrite) createCmd += ' --overwrite';
    run(createCmd);
    console.log('CodeQL DB verified.');
  } else if (args[0] === 'analyze') {
    // DB作成+解析
    let createCmd = `codeql database create ${dbPath} --language=javascript --source-root=src`;
    if (hasOverwrite) createCmd += ' --overwrite';
    run(createCmd);
    run(`codeql database analyze ${dbPath} ${queriesPath} --format=sarifv2.1.0 --output=codeql-results.sarif`);
    console.log('CodeQL analysis completed.');
  } else if (args[0] === 'check-results') {
    // 結果ファイルの存在確認
    const fs = require('fs');
    if (fs.existsSync('codeql-results.sarif')) {
      console.log('CodeQL results found.');
    } else {
      throw new Error('codeql-results.sarif not found.');
    }
  } else if (args[0] === 'debug') {
    // デバッグ用: DBディレクトリの中身を表示
    const fs = require('fs');
    if (fs.existsSync(dbPath)) {
      console.log('DB contents:', fs.readdirSync(dbPath));
    } else {
      console.log('DB directory not found.');
    }
  } else {
    // デフォルト: analyze相当
    let createCmd = `codeql database create ${dbPath} --language=javascript --source-root=src`;
    if (hasOverwrite) createCmd += ' --overwrite';
    run(createCmd);
    run(`codeql database analyze ${dbPath} ${queriesPath} --format=sarifv2.1.0 --output=codeql-results.sarif`);
    console.log('CodeQL analysis completed.');
  }
} catch (e) {
  console.error('CodeQL解析に失敗:', e.message);
  process.exit(1);
}
