#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * シンプルな静的解析による関数呼び出しグラフの生成
 * CodeQLがうまく動作しない場合のフォールバック
 */

function analyzeJavaScriptFiles(directory) {
  const results = [];
  const files = findJavaScriptFiles(directory);

  console.log(`Found ${files.length} JavaScript files to analyze`);

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const fileResults = extractCallRelationships(content, file);
      results.push(...fileResults);
    } catch (error) {
      console.error(`Error analyzing file ${file}:`, error.message);
    }
  }

  return results;
}

function findJavaScriptFiles(directory) {
  const files = [];

  function traverse(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // node_modules, .git などを除外
        if (!item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        }
      } else if (item.endsWith('.js') && !item.endsWith('.min.js')) {
        files.push(fullPath);
      }
    }
  }

  traverse(directory);
  return files;
}

function extractCallRelationships(content, filename) {
  const results = [];
  const lines = content.split('\n');

  // 関数定義を検索
  const functionDefs = [];
  const functionDefRegex = /function\s+(\w+)\s*\(/g;
  const arrowFuncRegex = /(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)\s*)?=>/g;
  const methodDefRegex = /(\w+)\s*:\s*function\s*\(/g;

  let match;
  while ((match = functionDefRegex.exec(content)) !== null) {
    functionDefs.push(match[1]);
  }

  while ((match = arrowFuncRegex.exec(content)) !== null) {
    functionDefs.push(match[1]);
  }

  while ((match = methodDefRegex.exec(content)) !== null) {
    functionDefs.push(match[1]);
  }

  console.log(`Found functions in ${path.basename(filename)}:`, functionDefs);

  // 各関数内での関数呼び出しを検索
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 現在の関数コンテキストを判定
    let currentFunction = 'global';

    // 関数定義行を検索
    const funcMatch = line.match(/function\s+(\w+)|(\w+)\s*=\s*(?:\([^)]*\)\s*)?=>|(\w+)\s*:\s*function/);
    if (funcMatch) {
      currentFunction = funcMatch[1] || funcMatch[2] || funcMatch[3];
    }

    // 関数呼び出しを検索
    const callRegex = /(\w+)\s*\(/g;
    let callMatch;

    while ((callMatch = callRegex.exec(line)) !== null) {
      const calledFunction = callMatch[1];

      // JavaScript組み込み関数やよくある関数を除外
      if (!['if', 'for', 'while', 'switch', 'catch', 'return', 'typeof', 'instanceof'].includes(calledFunction) &&
          !calledFunction.startsWith('console') &&
          calledFunction !== 'require' &&
          calledFunction !== 'module' &&
          calledFunction !== 'exports') {

        results.push({
          caller: currentFunction,
          callee: calledFunction,
          file: path.basename(filename),
          line: i + 1
        });
      }
    }
  }

  return results;
}

function generateCSV(results) {
  let csv = 'caller,callee\n';

  // 重複を除去
  const unique = new Set();

  for (const result of results) {
    const key = `${result.caller} -> ${result.callee}`;
    if (!unique.has(key)) {
      unique.add(key);
      csv += `${result.caller},${result.callee}\n`;
    }
  }

  return csv;
}

// メイン処理
if (require.main === module) {
  const projectRoot = process.cwd();
  console.log(`Analyzing JavaScript files in: ${projectRoot}`);

  const results = analyzeJavaScriptFiles(projectRoot);
  console.log(`Found ${results.length} call relationships`);

  if (results.length > 0) {
    console.log('Sample results:');
    results.slice(0, 5).forEach(r => {
      console.log(`  ${r.caller} -> ${r.callee} (${r.file}:${r.line})`);
    });
  }

  const csv = generateCSV(results);
  fs.writeFileSync('callgraph-simple.csv', csv);
  console.log(`Generated callgraph-simple.csv with ${results.length} relationships`);
}

module.exports = { analyzeJavaScriptFiles, generateCSV };
