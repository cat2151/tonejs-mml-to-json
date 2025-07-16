#!/usr/bin/env node
// ローカル用
//  callgraph_enhanced.yml の流れをNode.jsスクリプトで再現する
//  各ステップのcjsを順に呼び出す

const { spawnSync } = require('child_process');
const path = require('path');

function runStep(label, script, args = []) {
  console.log(`\n=== [${label}] ===`);
  const result = spawnSync('node', [script, ...args], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`\n[${label}] failed (exit code ${result.status})`);
    process.exit(result.status);
  }
}

// 1. Check for user commits in last 24 hours
// ローカル実行では不要なためスキップします（参考用にコメントアウト）
// runStep('Check for user commits', path.join(__dirname, 'check-commits.cjs'));

// 2. Check CodeQL exists
runStep('Check CodeQL exists', path.join(__dirname, 'check-codeql-exists.cjs'));

// 3. Verify CodeQL Configuration
runStep('Verify CodeQL Configuration', path.join(__dirname, 'analyze-codeql.cjs'), ['verify-config', '--overwrite']);

// 4. Perform CodeQL Analysis
runStep('Perform CodeQL Analysis', path.join(__dirname, 'analyze-codeql.cjs'), ['analyze', '--overwrite']);

// 5. Check CodeQL Analysis Results
runStep('Check CodeQL Analysis Results', path.join(__dirname, 'analyze-codeql.cjs'), ['check-results']);

// 6. Debug CodeQL execution
runStep('Debug CodeQL execution', path.join(__dirname, 'analyze-codeql.cjs'), ['debug']);

// 7. Wait for CodeQL results (10秒)
console.log('\n=== [Wait for CodeQL results] ===');
setTimeout(() => {
  // 8. Find and process CodeQL results
  runStep('Find and process CodeQL results', path.join(__dirname, 'find-process-results.cjs'));

  // 9. Generate HTML graph
  runStep('Generate HTML graph', path.join(__dirname, 'generate-html-graph.cjs'));

  // 10. Copy files to generated-docs and commit results
  // ローカル実行では不要なためスキップします（参考用にコメントアウト）
  // runStep('Copy files to generated-docs and commit results', path.join(__dirname, 'copy-commit-results.cjs'));

  console.log('\n=== [All steps completed successfully] ===');
}, 10000);
