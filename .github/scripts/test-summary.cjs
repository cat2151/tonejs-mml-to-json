#!/usr/bin/env node

/**
 * 手動テスト用スクリプト
 * ローカル環境でプロジェクト要約生成をテストする
 */

const path = require('path');
require('dotenv').config(); // .env ファイルがある場合

// 環境変数の設定（テスト用）
process.env.GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'cat2151/tonejs-mml-to-json';

console.log('🧪 Manual test for project summary generation');
console.log('Environment check:');
console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}`);
console.log(`- GITHUB_TOKEN: ${process.env.GITHUB_TOKEN ? '✅ Set' : '⚠️ Not set (Issues will be skipped)'}`);
console.log(`- GITHUB_REPOSITORY: ${process.env.GITHUB_REPOSITORY}`);
console.log('');

// メインスクリプトを実行
require('./generate-project-summary.cjs');
