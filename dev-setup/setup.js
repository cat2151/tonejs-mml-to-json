#!/usr/bin/env node

/**
 * TDD環境構築スクリプト
 * pnpm + Peggyjs + Vitest の環境を自動構築します
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');

console.log('🚀 TDD環境構築を開始します...');

// package.jsonが存在しない場合は作成
const packageJsonPath = path.join(projectRoot, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log('📦 package.jsonを作成中...');
  const packageJson = {
    "name": "tonejs-mml-to-json",
    "version": "1.0.0",
    "description": "MML to JSON converter using Tone.js",
    "main": "src/main.js",
    "type": "module",
    "scripts": {
      "test": "vitest",
      "test:watch": "vitest --watch",
      "build:parser": "peggy --format es src/grammar.pegjs",
      "dev": "pnpm run build:parser && pnpm run test:watch"
    },
    "keywords": ["mml", "tonejs", "music", "parser"],
    "author": "",
    "license": "MIT"
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.jsonを作成しました');
}

// 依存関係をインストール
console.log('📥 依存関係をインストール中...');
try {
  execSync('pnpm add -D peggy vitest', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✅ 依存関係のインストールが完了しました');
} catch (error) {
  console.error('❌ 依存関係のインストールに失敗しました:', error.message);
  process.exit(1);
}

// PEG文法ファイルを作成
const grammarPath = path.join(projectRoot, 'src', 'grammar.pegjs');
if (!fs.existsSync(grammarPath)) {
  console.log('📝 PEG文法ファイルを作成中...');
  const grammarContent = `// Simple MML Grammar for testing
// Input: "c" -> Output: "c"
start
  = note

note
  = "c" { return "c"; }
`;

  fs.writeFileSync(grammarPath, grammarContent);
  console.log('✅ PEG文法ファイルを作成しました');
}

// パーサーを生成
console.log('🔧 パーサーを生成中...');
try {
  execSync('pnpm run build:parser', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✅ パーサーの生成が完了しました');
} catch (error) {
  console.error('❌ パーサーの生成に失敗しました:', error.message);
  process.exit(1);
}

// テストファイルを作成
const testDir = path.join(projectRoot, 'test');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const testPath = path.join(testDir, 'parser.test.js');
if (!fs.existsSync(testPath)) {
  console.log('🧪 テストファイルを作成中...');
  const testContent = `import { describe, it, expect } from 'vitest';
import parser from '../src/grammar.js';

describe('MML Parser', () => {
  it('should parse "c" and return "c"', () => {
    const result = parser.parse('c');
    expect(result).toBeDefined();
    expect(result).toBe('c');
  });
});
`;

  fs.writeFileSync(testPath, testContent);
  console.log('✅ テストファイルを作成しました');
}

// Vitestの設定ファイルを作成
const vitestConfigPath = path.join(projectRoot, 'vitest.config.js');
if (!fs.existsSync(vitestConfigPath)) {
  console.log('⚙️ Vitest設定ファイルを作成中...');
  const vitestConfig = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true
  }
});
`;

  fs.writeFileSync(vitestConfigPath, vitestConfig);
  console.log('✅ Vitest設定ファイルを作成しました');
}

// テストを実行
console.log('🧪 テストを実行中...');
try {
  execSync('pnpm test --run', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✅ すべてのテストが成功しました！');
} catch (error) {
  console.error('❌ テストに失敗しました:', error.message);
  process.exit(1);
}

console.log('\n🎉 TDD環境の構築が完了しました！');
console.log('\n📚 使用方法:');
console.log('  pnpm run dev     - 開発モード（パーサー生成 + テスト監視）');
console.log('  pnpm test        - テスト実行');
console.log('  pnpm test:watch  - テスト監視モード');
console.log('  pnpm run build:parser - パーサー再生成');
