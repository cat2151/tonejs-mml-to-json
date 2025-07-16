#!/usr/bin/env node
/**
 * generate-html-graph.cjs
 *
 * SARIFファイルからコールグラフHTMLを生成する。
 *
 * Usage:
 *   node generate-html-graph.cjs
 */
const path = require('path');
const fs = require('fs');
const { extractCallerinfo, extractCalleeinfo, convertDetailedData, writeDebugCallerSourceLines, writeDebugCalleeSourceLines } = require('../callgraph-utils.cjs');
const generateHTML = require('./generateHTML.cjs');

const sarifPath = path.resolve('codeql-results.sarif');
const outputPath = path.resolve('generated-docs/callgraph-enhanced.html');

if (!fs.existsSync(sarifPath)) {
  console.error('SARIFファイルが見つかりません:', sarifPath);
  process.exit(1);
}

const callerInfo = extractCallerinfo(sarifPath);
const calleeInfo = extractCalleeinfo(sarifPath);
const graphData = convertDetailedData(callerInfo, calleeInfo);
const html = generateHTML(graphData, { repo: process.env.GITHUB_REPOSITORY || '', branch: process.env.GITHUB_REF_NAME || 'main' });

fs.writeFileSync(outputPath, html);
console.log('コールグラフHTMLを生成しました:', outputPath);

// デバッグ用: Caller sourceLine 付きの詳細データをJSONで出力
try {
  writeDebugCallerSourceLines(sarifPath, path.resolve('generated-docs/callerSourceLines.json'));
  console.log('✓ callerSourceLines.json (with sourceLine) generated');
} catch (e) {
  console.warn('Failed to write callerSourceLines.json:', e);
}


// デバッグ用: Callee sourceLine 付きの詳細データをJSONで出力
try {
  writeDebugCalleeSourceLines(sarifPath, path.resolve('generated-docs/calleeSourceLines.json'));
  console.log('✓ calleeSourceLines.json (with callee sourceLine) generated');
} catch (e) {
  console.warn('Failed to write calleeSourceLines.json:', e);
}
