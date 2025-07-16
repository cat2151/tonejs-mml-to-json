#!/usr/bin/env node

//
// Enhanced Call Graph HTML Generator with Source Code Linking
//
// - すべての関数呼び出し関係を表示（孤立ノードを防ぐ）
// - ソースコード位置情報がある場合はGitHubリンクを提供
// - 位置情報がない場合でも関数呼び出し関係は保持
// - SARIFファイルが存在しない場合は明確なエラーで終了
//
// 機能:
// - ソースコードの位置情報を保持（可能な場合）
// - ノードクリックでソースコードの場所を表示（位置情報がある場合）
// - GitHubリンク生成（可能な場合）
// - 詳細な呼び出し情報の表示
// - 匿名関数や動的関数も含めた完全な呼び出しグラフ
//

const fs = require('fs');
const {
  extractCallerinfo,
  convertDetailedData,
} = require('./callgraph-utils.cjs');
const generateHTML = require('./callgraph_enhanced/generateHTML.cjs');

/**
 * メイン処理
 */
function main() {
  console.log('Enhanced Call Graph HTML Generator starting...');
  console.log(getStyle());

  const options = {
    repo: process.env.GITHUB_REPOSITORY || null,
    branch: 'main',
    style: getStyle()
  };

  // SARIFファイルが必須
  const sarifFile = process.env.SARIF_FILE;
  if (!sarifFile || !fs.existsSync(sarifFile)) {
    console.error('*** FATAL ERROR: SARIF file not found ***');
    console.error('SARIF file path:', sarifFile || 'not specified');
    console.error('This enhanced converter requires SARIF file with source location information');
    console.error('Cannot proceed without detailed call graph data');
    process.exit(1);
  }

  console.log('Using detailed SARIF data from:', sarifFile);
  const detailedData = extractCallerinfo(sarifFile);
  const calleeInfo = extractCalleeinfo(sarifFile);

  // デバッグ用: sourceLine付きの詳細データをJSONで出力
  try {
    const { writeDebugCallerSourceLines } = require('./callgraph-utils.cjs');
    writeDebugCallerSourceLines(sarifFile, 'generated-docs/callerSourceLines.json');
    console.log('✓ callerSourceLines.json (with sourceLine) generated');
  } catch (e) {
    console.warn('Failed to write callerSourceLines.json:', e);
  }

  if (detailedData.length === 0) {
    console.error('FATAL: No call graph data found in SARIF file.');
    process.exit(1);
  }

  const graphData = convertDetailedData(detailedData, calleeInfo);
  console.log(`Processed ${detailedData.length} detailed call relationships`);

  if (graphData.nodes.length === 0) {
    console.error('*** FATAL ERROR: No graph nodes generated ***');
    console.error('This indicates a problem in data conversion logic');
    process.exit(1);
  }

  // HTMLを生成
  const html = generateHTML(graphData, options);
  fs.writeFileSync('callgraph-enhanced.html', html);

  console.log(`✓ Enhanced call graph HTML generated with ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);
  console.log(`✓ ${graphData.nodes.filter(n => n.hasLocationInfo).length} nodes have caller location information`);
  console.log(`✓ ${graphData.nodes.filter(n => n.hasCalleeLocationInfo).length} nodes have callee location information`);
  console.log(`✓ ${graphData.edges.filter(e => e.hasLocationInfo).length} edges have call location information`);
  console.log(`✓ ${graphData.edges.filter(e => e.hasCalleeLocationInfo).length} edges point to functions with location info`);
  console.log('✓ Source code linking enabled for nodes/edges with location info');
  console.log('✓ Callee location filter available for better analysis');
}

if (require.main === module) {
  main();
}

const { writeDebugCallerSourceLines } = require('./callgraph-utils.cjs');
module.exports = {
  extractCallerinfo,
  convertDetailedData,
  generateHTML,
  writeDebugCallerSourceLines
};
