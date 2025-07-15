#!/usr/bin/env node

//
// Enhanced Call Graph HTML Generator with Source Code Linking
//
// 改訂された設計方針:
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
const path = require('path');

/**
 * 有効なソースコードファイルかどうかを判定（ホワイトリスト方式）
 */
function isValidSourceFile(filePath) {
  // ファイルパスを正規化
  const normalizedPath = filePath.replace(/\\/g, '/');

  // 許可するファイルのホワイトリスト
  const allowedFiles = [
    'src/main.js',
    'src/mml2json.js',
    'src/play.js'
  ];

  // 完全一致または末尾一致をチェック
  for (const allowedFile of allowedFiles) {
    if (normalizedPath === allowedFile || normalizedPath.endsWith('/' + allowedFile)) {
      return true;
    }
  }

  console.log(`Rejecting file (not in whitelist): ${normalizedPath}`);
  return false;
}

/**
 * SARIFファイルから詳細な呼び出し情報を抽出
 */
function extractDetailedCallGraph(sarifFile) {
  try {
    console.log('=== SARIF File Analysis ===');

    const fileContent = fs.readFileSync(sarifFile, 'utf8');
    console.log(`SARIF file size: ${fileContent.length} bytes`);

    const sarif = JSON.parse(fileContent);
    console.log('SARIF file parsed successfully');

    // SARIFファイルの基本構造を詳細分析
    console.log('SARIF structure analysis:');
    console.log(`- Schema version: ${sarif.version || 'not specified'}`);
    console.log(`- Runs array exists: ${!!(sarif.runs)}`);
    console.log(`- Number of runs: ${sarif.runs ? sarif.runs.length : 0}`);

    if (!sarif.runs || sarif.runs.length === 0) {
      console.error('*** DETAILED ERROR: No runs found in SARIF file ***');
      console.error('SARIF file structure does not contain expected "runs" array');
      console.error('Expected structure: { "runs": [{ "results": [...] }] }');
      console.error('Actual top-level keys:', Object.keys(sarif));
      return [];
    }

    const results = [];
    let totalResults = 0;
    let totalMessages = 0;
    let matchedMessages = 0;
    const unmatchedMessages = [];

    sarif.runs.forEach((run, runIndex) => {
      console.log(`\nAnalyzing run ${runIndex + 1}:`);
      console.log(`- Tool name: ${run.tool?.driver?.name || 'unknown'}`);
      console.log(`- Results exist: ${!!(run.results)}`);
      console.log(`- Number of results: ${run.results ? run.results.length : 0}`);

      if (!run.results) {
        console.error(`*** Run ${runIndex + 1} has no results array ***`);
        return;
      }

      totalResults += run.results.length;

      run.results.forEach((result, resultIndex) => {
        if (result.message && result.message.text) {
          totalMessages++;
          const text = result.message.text;

          // メッセージが複数行の場合を考慮して各行を処理
          const lines = text.split('\n').filter(line => line.trim().length > 0);

          for (const line of lines) {
            // "caller -> callee (at file:line:col)" の形式を解析
            const match = line.match(/^(.+?)\s*->\s*(.+?)\s*\(at\s+(.+):(\d+)(?::(\d+))?\)$/);
            if (match) {
              const [, caller, callee, file, line, column] = match;
              const trimmedFile = file.trim();

              // JavaScriptソースファイルのみを対象とする
              if (isValidSourceFile(trimmedFile)) {
                matchedMessages++;
                results.push({
                  caller: caller.trim(),
                  callee: callee.trim(),
                  file: trimmedFile,
                  line: parseInt(line),
                  column: column ? parseInt(column) : 1,
                  fullLocation: `${trimmedFile}:${line}:${column || 1}`
                });
              } else {
                console.log(`Skipping non-source file: ${trimmedFile}`);
              }
            }
          }

          // どの行も期待される形式でない場合のみデバッグ情報を保存
          if (!lines.some(line => line.includes(' -> ') && line.includes('(at '))) {
            if (unmatchedMessages.length < 10) {
              unmatchedMessages.push({
                runIndex: runIndex + 1,
                resultIndex: resultIndex + 1,
                message: text.length > 200 ? text.substring(0, 200) + '...' : text,
                ruleId: result.ruleId || 'unknown'
              });
            }
          }
        } else {
          console.log(`Result ${resultIndex + 1} in run ${runIndex + 1}: no message text`);
        }
      });
    });

    console.log('\n=== SARIF Analysis Summary ===');
    console.log(`Total runs processed: ${sarif.runs.length}`);
    console.log(`Total results found: ${totalResults}`);
    console.log(`Total messages with text: ${totalMessages}`);
    console.log(`Messages matching expected pattern: ${matchedMessages}`);
    console.log(`Messages NOT matching pattern: ${totalMessages - matchedMessages}`);

    if (unmatchedMessages.length > 0) {
      console.log('\n=== Sample Unmatched Messages ===');
      unmatchedMessages.forEach((item, index) => {
        console.log(`${index + 1}. Run ${item.runIndex}, Result ${item.resultIndex} (Rule: ${item.ruleId}):`);
        console.log(`   Message: "${item.message}"`);
      });

      console.log('\n*** DETAILED ERROR: Expected message format not found ***');
      console.log('Expected format: "caller -> callee (at file:line:col)"');
      console.log('Example: "main -> processFile (at src/main.js:15:3)"');
      console.log('');
      console.log('Possible causes:');
      console.log('1. CodeQL callgraph query is generating different message format');
      console.log('2. Different CodeQL query was used than expected');
      console.log('3. CodeQL query found no function calls (empty codebase)');
      console.log('4. SARIF contains different type of results (not callgraph)');
    }

    if (results.length === 0 && totalMessages > 0) {
      console.error('\n*** DETAILED ERROR: Message format mismatch ***');
      console.error('SARIF file contains messages but none match the expected call graph format');
      console.error('This suggests the wrong CodeQL query was used or query output format changed');
    }

    return results;
  } catch (error) {
    console.error('\n*** DETAILED ERROR: SARIF file processing failed ***');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);

    if (error instanceof SyntaxError) {
      console.error('*** This appears to be a JSON parsing error ***');
      console.error('SARIF file may be corrupted, incomplete, or not valid JSON');
      console.error('Check if the file was generated completely');
    } else if (error.code === 'ENOENT') {
      console.error('*** File not found error ***');
      console.error('SARIF file does not exist at the specified path');
    } else {
      console.error('*** Unexpected error occurred ***');
      console.error('Full error details:', error);
    }

    return [];
  }
}

// CSVフォールバック機能は削除 - SARIFファイルが必須

/**
 * 詳細データからCytoscape.js用のデータに変換
 * すべての関数呼び出し関係を保持し、位置情報は可能な限り追加
 */
function convertDetailedData(detailedData) {
  const nodes = new Map();
  const edges = [];

  // calleeの位置情報を検索するためのマップ
  const calleeLocationMap = new Map();

  // 最初にすべてのcalleeの位置情報を収集
  detailedData.forEach((item) => {
    if (item.callee && item.file && item.line && item.line > 0 && isValidSourceFile(item.file)) {
      if (!calleeLocationMap.has(item.callee)) {
        calleeLocationMap.set(item.callee, []);
      }
      const existingLocations = calleeLocationMap.get(item.callee);
      if (!existingLocations.some(loc => loc.file === item.file && loc.line === item.line)) {
        existingLocations.push({
          file: item.file,
          line: item.line,
          column: item.column || 1,
          type: 'definition'
        });
      }
    }
  });

  detailedData.forEach((item, index) => {
    // 基本的な関数名の情報は必須（位置情報がなくても処理を継続）
    if (!item.caller || !item.callee) {
      console.warn(`Skipping call relationship due to missing function names: ${item.caller} -> ${item.callee}`);
      return;
    }

    // ノードを作成（位置情報は任意）
    if (!nodes.has(item.caller)) {
      nodes.set(item.caller, {
        id: item.caller,
        label: item.caller,
        locations: [],
        hasLocationInfo: false,
        hasCalleeLocationInfo: false
      });
    }
    if (!nodes.has(item.callee)) {
      const calleeLocations = calleeLocationMap.get(item.callee) || [];
      nodes.set(item.callee, {
        id: item.callee,
        label: item.callee,
        locations: [...calleeLocations],
        hasLocationInfo: calleeLocations.length > 0,
        hasCalleeLocationInfo: calleeLocations.length > 0
      });
    }

    // 位置情報がある場合のみ追加（caller用）
    if (item.file && item.line && item.line > 0 && isValidSourceFile(item.file)) {
      const callerNode = nodes.get(item.caller);
      if (!callerNode.locations.some(loc => loc.file === item.file && loc.line === item.line)) {
        callerNode.locations.push({
          file: item.file,
          line: item.line,
          column: item.column || 1,
          type: 'caller'
        });
        callerNode.hasLocationInfo = true;
      }
    }

    // calleeの位置情報も更新
    const calleeNode = nodes.get(item.callee);
    if (calleeLocationMap.has(item.callee)) {
      calleeNode.hasCalleeLocationInfo = true;
    }

    // エッジは常に追加（位置情報は可能な場合のみ）
    const edgeData = {
      id: `edge-${index}`,
      source: item.caller,
      target: item.callee,
      hasCalleeLocationInfo: calleeLocationMap.has(item.callee)
    };

    // 位置情報があれば追加
    if (item.file && item.line && item.line > 0 && isValidSourceFile(item.file)) {
      edgeData.file = item.file;
      edgeData.line = item.line;
      edgeData.column = item.column || 1;
      edgeData.location = item.fullLocation || `${item.file}:${item.line}:${item.column || 1}`;
      edgeData.hasLocationInfo = true;
    } else {
      edgeData.hasLocationInfo = false;
    }

    edges.push(edgeData);
  });

  // すべてのノードを保持（位置情報の有無に関係なく）
  const allNodes = Array.from(nodes.values());

  // すべてのエッジを保持
  const allEdges = edges;

  console.log(`Conversion results: ${allNodes.length} nodes, ${allEdges.length} edges`);

  // 位置情報の統計を表示
  const nodesWithLocation = allNodes.filter(node => node.hasLocationInfo).length;
  const nodesWithCalleeLocation = allNodes.filter(node => node.hasCalleeLocationInfo).length;
  const edgesWithLocation = allEdges.filter(edge => edge.hasLocationInfo).length;
  const edgesWithCalleeLocation = allEdges.filter(edge => edge.hasCalleeLocationInfo).length;

  console.log(`Location info available: ${nodesWithLocation}/${allNodes.length} nodes (caller info), ${nodesWithCalleeLocation}/${allNodes.length} nodes (callee info)`);
  console.log(`Edge location info: ${edgesWithLocation}/${allEdges.length} edges (call location), ${edgesWithCalleeLocation}/${allEdges.length} edges (callee has location)`);
  console.log(`Whitelist filtering applied: only src/main.js, src/mml2json.js, src/play.js processed`);

  return {
    nodes: allNodes,
    edges: allEdges
  };
}

/**
 * GitHubリポジトリのURLを生成
 */
function generateGitHubURL(file, line, repo = null, branch = 'main') {
  if (!repo) return null;

  // ファイルパスを正規化（srcディレクトリを保持）
  let normalizedFile = file.replace(/\\/g, '/');

  // プロジェクトルートからの相対パスに変換
  if (normalizedFile.includes('/src/')) {
    // 最後のsrcディレクトリ以降を取得
    const srcIndex = normalizedFile.lastIndexOf('/src/');
    normalizedFile = normalizedFile.substring(srcIndex + 1); // '/src/' -> 'src/'
  } else if (normalizedFile.startsWith('src/')) {
    // 既にsrcから始まっている場合はそのまま
    normalizedFile = normalizedFile;
  } else {
    // srcディレクトリがない場合はファイル名のみ
    const lastSlash = normalizedFile.lastIndexOf('/');
    if (lastSlash !== -1) {
      normalizedFile = normalizedFile.substring(lastSlash + 1);
    }
  }

  return `https://github.com/${repo}/blob/${branch}/${normalizedFile}#L${line}`;
}

/**
 * HTMLテンプレートを生成
 */
function generateHTML(graphData, options = {}) {
  const {
    title = 'Function Call Graph with Source Links',
    repo = null,
    branch = 'main'
  } = options;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://unpkg.com/cytoscape@3.29.2/dist/cytoscape.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .header h1 {
            color: #333;
            margin: 0;
            font-size: 24px;
            transition: color 0.3s ease;
        }

        .stats-container {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }

        .stats {
            background: white;
            padding: 10px 15px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            min-width: 80px;
        }

        .stat-value {
            font-size: 20px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 2px;
        }

        .stat-label {
            font-size: 12px;
            color: #666;
            transition: color 0.3s ease;
        }

        .main-container {
            display: flex;
            gap: 15px;
            height: calc(100vh - 120px);
            min-height: 500px;
            position: relative;
        }

        .graph-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0; /* flexアイテムのはみ出しを防ぐ */
        }

        #cy {
            width: 100%;
            flex: 1;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .controls {
            margin-top: 10px;
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .control-button {
            background: #2196F3;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            transition: background-color 0.3s ease;
        }

        .control-button:hover {
            background: #1976D2;
        }

        .info-panel {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            width: 320px;
            max-width: 100vw;
            max-height: 100%;
            overflow-y: auto;
            transition: all 0.3s ease;
            flex-shrink: 0;
            box-sizing: border-box;
        }

        .info-panel.hidden {
            width: 0;
            padding: 0;
            overflow: hidden;
            min-width: 0;
        }

        .info-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            transition: color 0.3s ease;
        }

        .location-item {
            background: #f8f9fa;
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 4px;
            border-left: 4px solid #2196F3;
            transition: background-color 0.3s ease;
        }

        .location-file {
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
            color: #666;
            transition: color 0.3s ease;
        }

        .location-link {
            color: #2196F3;
            text-decoration: none;
            font-weight: bold;
        }

        .location-link:hover {
            text-decoration: underline;
        }

        .edge-info {
            background: #e3f2fd;
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 4px;
            border-left: 4px solid #1976D2;
            transition: background-color 0.3s ease;
        }

        .generated-time {
            text-align: center;
            color: #999;
            font-size: 11px;
            margin-top: 10px;
            transition: color 0.3s ease;
        }

        /* レスポンシブデザイン */
        @media (max-width: 1024px) {
            .main-container {
                flex-direction: column;
                height: auto;
                min-height: 400px;
            }

            .info-panel {
                width: 100% !important;
                max-height: 300px;
                order: 2;
            }

            .info-panel.hidden {
                height: 0;
                padding: 0;
                min-height: 0;
            }

            .graph-container {
                order: 1;
                min-height: 400px;
            }
        }

        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                text-align: center;
            }

            .stats-container {
                justify-content: center;
            }

            .controls {
                justify-content: center;
            }

            .control-button {
                padding: 6px 12px;
                font-size: 12px;
            }
        }

        /* ダークモード対応 */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #e0e0e0;
            }

            .header h1 {
                color: #ffffff;
            }

            .stats {
                background: #1e1e1e;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            .stat-label {
                color: #b0b0b0;
            }

            #cy {
                background-color: #1e1e1e;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }

            .control-button {
                background: #2196F3;
            }

            .control-button:hover {
                background: #1976D2;
            }

            .info-panel {
                background: #1e1e1e;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            .info-title {
                color: #ffffff;
            }

            .location-item {
                background: #2a2a2a;
            }

            .location-file {
                color: #b0b0b0;
            }

            .edge-info {
                background: #1a2d3a;
            }

            .generated-time {
                color: #888;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
        <div class="stats-container">
            <div class="stats">
                <div class="stat-value">${graphData.nodes.length}</div>
                <div class="stat-label">Functions</div>
            </div>
            <div class="stats">
                <div class="stat-value">${graphData.edges.length}</div>
                <div class="stat-label">Call Relationships</div>
            </div>
            <div class="stats">
                <div class="stat-value">${graphData.nodes.filter(n => n.hasCalleeLocationInfo).length}</div>
                <div class="stat-label">With Callee Location</div>
            </div>
        </div>
    </div>

    <div class="main-container">
        <div class="graph-container">
            <div id="cy"></div>
            <div class="controls">
                <button class="control-button" onclick="resetLayout()">Reset Layout</button>
                <button class="control-button" onclick="fitToContent()">Fit to Content</button>
                <button class="control-button" onclick="toggleNodeLabels()">Toggle Labels</button>
                <button class="control-button" onclick="toggleCalleeLocationFilter()">Hide No-Callee-Location</button>
                <button class="control-button" onclick="toggleInfoPanel()">Toggle Info Panel</button>
            </div>
        </div>

        <div id="info-panel" class="info-panel hidden">
            <div class="info-title">選択した要素の詳細</div>
            <div id="info-content"></div>
        </div>
    </div>

    <div class="generated-time">
        Generated: ${new Date().toLocaleString('ja-JP')}
    </div>

    <script>
        const graphData = ${JSON.stringify(graphData, null, 2)};
        const repo = ${JSON.stringify(repo)};
        const branch = ${JSON.stringify(branch)};

        // ダークモード検出
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // ダークモード用のカラーパレット
        const colors = {
            light: {
                node: '#2196F3',
                nodeBorder: '#1976D2',
                nodeSelected: '#FF5722',
                nodeSelectedBorder: '#D84315',
                nodeWithLocation: '#4CAF50',
                edge: '#666',
                edgeSelected: '#FF5722',
                edgeWithLocation: '#4CAF50',
                textBackground: 'white'
            },
            dark: {
                node: '#64B5F6',
                nodeBorder: '#42A5F5',
                nodeSelected: '#FF7043',
                nodeSelectedBorder: '#FF5722',
                nodeWithLocation: '#66BB6A',
                edge: '#999',
                edgeSelected: '#FF7043',
                edgeWithLocation: '#66BB6A',
                textBackground: '#1e1e1e'
            }
        };

        const currentColors = isDarkMode ? colors.dark : colors.light;

        const cy = cytoscape({
            container: document.getElementById('cy'),

            elements: [
                // ノードを追加
                ...graphData.nodes.map(node => ({
                    data: {
                        id: node.id,
                        label: node.label,
                        locations: node.locations || [],
                        hasLocationInfo: node.hasLocationInfo || false,
                        hasCalleeLocationInfo: node.hasCalleeLocationInfo || false
                    }
                })),
                // エッジを追加
                ...graphData.edges.map(edge => ({
                    data: {
                        id: edge.id,
                        source: edge.source,
                        target: edge.target,
                        file: edge.file || '',
                        line: edge.line || 0,
                        column: edge.column || 0,
                        location: edge.location || '',
                        hasLocationInfo: edge.hasLocationInfo || false,
                        hasCalleeLocationInfo: edge.hasCalleeLocationInfo || false
                    }
                }))
            ],

            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': currentColors.node,
                        'label': 'data(label)',
                        'color': isDarkMode ? '#ffffff' : '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '12px',
                        'font-weight': 'bold',
                        'text-wrap': 'wrap',
                        'text-max-width': '100px',
                        'width': '70px',
                        'height': '70px',
                        'border-width': '2px',
                        'border-color': currentColors.nodeBorder,
                        'text-background-color': currentColors.textBackground,
                        'text-background-opacity': 0.8,
                        'text-background-padding': '3px'
                    }
                },
                {
                    selector: 'node:selected',
                    style: {
                        'background-color': currentColors.nodeSelected,
                        'border-color': currentColors.nodeSelectedBorder
                    }
                },
                {
                    selector: 'node[hasLocationInfo = true]',
                    style: {
                        'border-width': '3px',
                        'border-color': currentColors.nodeWithLocation
                    }
                },
                {
                    selector: 'node[hasCalleeLocationInfo = true]',
                    style: {
                        'border-width': '4px',
                        'border-color': '#FF9800'  // オレンジ色でcallee位置情報ありを示す
                    }
                },
                {
                    selector: 'node[hasCalleeLocationInfo = false]',
                    style: {
                        'border-style': 'dotted',
                        'border-width': '2px',
                        'opacity': 0.6
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': currentColors.edge,
                        'target-arrow-color': currentColors.edge,
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'arrow-scale': 1.2
                    }
                },
                {
                    selector: 'edge:selected',
                    style: {
                        'line-color': currentColors.edgeSelected,
                        'target-arrow-color': currentColors.edgeSelected,
                        'width': 3
                    }
                },
                {
                    selector: 'edge[hasLocationInfo = true]',
                    style: {
                        'line-color': currentColors.edgeWithLocation,
                        'target-arrow-color': currentColors.edgeWithLocation
                    }
                },
                {
                    selector: 'node[hasLocationInfo = false]',
                    style: {
                        'border-style': 'dashed',
                        'border-width': '2px',
                        'opacity': 0.8
                    }
                },
                {
                    selector: 'edge[hasCalleeLocationInfo = true]',
                    style: {
                        'line-color': '#FF9800',
                        'target-arrow-color': '#FF9800',
                        'width': 3
                    }
                },
                {
                    selector: 'edge[hasLocationInfo = false]',
                    style: {
                        'line-style': 'dashed',
                        'opacity': 0.7
                    }
                }
            ],

            layout: {
                name: 'circle',
                fit: true,
                padding: 30,
                avoidOverlap: true,
                radius: 200
            }
        });

        // ノード選択時の処理
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const data = node.data();
            showNodeInfo(data);
        });

        // エッジ選択時の処理
        cy.on('tap', 'edge', function(evt) {
            const edge = evt.target;
            const data = edge.data();
            showEdgeInfo(data);
        });

        // 背景クリック時の処理
        cy.on('tap', function(evt) {
            if (evt.target === cy) {
                hideInfoPanel();
            }
        });

        function showNodeInfo(data) {
            const panel = document.getElementById('info-panel');
            const content = document.getElementById('info-content');

            let html = '<div class="info-title">Function: ' + data.label + '</div>';

            // Callee位置情報の表示
            if (data.hasCalleeLocationInfo) {
                html += '<p><strong>✓ This function has source location info</strong></p>';
            } else {
                html += '<p><strong>⚠ This function has NO source location info</strong></p>';
                html += '<p><small>匿名関数、動的関数、または外部ライブラリの関数である可能性があります。</small></p>';
            }

            if (data.hasLocationInfo && data.locations && data.locations.length > 0) {
                html += '<h4>Locations:</h4>';
                data.locations.forEach(loc => {
                    const githubURL = generateGitHubURL(loc.file, loc.line);
                    html += '<div class="location-item">';
                    html += '<div class="location-file">' + loc.file + ':' + loc.line + ':' + loc.column + '</div>';
                    html += '<div><small>Type: ' + loc.type + '</small></div>';
                    if (githubURL) {
                        html += '<div><a href="' + githubURL + '" target="_blank" class="location-link">View on GitHub</a></div>';
                    }
                    html += '</div>';
                });
            } else {
                html += '<p>呼び出し位置情報がありません</p>';
            }

            content.innerHTML = html;
            showInfoPanel();
        }

        function showEdgeInfo(data) {
            const panel = document.getElementById('info-panel');
            const content = document.getElementById('info-content');

            let html = '<div class="info-title">Call: ' + data.source + ' → ' + data.target + '</div>';

            // Callee位置情報の表示
            if (data.hasCalleeLocationInfo) {
                html += '<p><strong>✓ Target function (' + data.target + ') has source location</strong></p>';
            } else {
                html += '<p><strong>⚠ Target function (' + data.target + ') has NO source location</strong></p>';
                html += '<p><small>呼び出し先が匿名関数や外部ライブラリ関数の可能性があります。</small></p>';
            }

            if (data.hasLocationInfo && data.location) {
                html += '<h4>Call Location:</h4>';
                html += '<div class="edge-info">';
                html += '<div class="location-file">' + data.location + '</div>';
                const githubURL = generateGitHubURL(data.file, data.line);
                if (githubURL) {
                    html += '<div><a href="' + githubURL + '" target="_blank" class="location-link">View on GitHub</a></div>';
                }
                html += '</div>';
            } else {
                html += '<p>呼び出し位置情報がありません</p>';
                html += '<p><small>この呼び出しは動的に発生するか、CodeQLで検出できない方法で行われている可能性があります。</small></p>';
            }

            content.innerHTML = html;
            showInfoPanel();
        }

        function hideInfoPanel() {
            const panel = document.getElementById('info-panel');
            panel.classList.add('hidden');
        }

        function showInfoPanel() {
            const panel = document.getElementById('info-panel');
            panel.classList.remove('hidden');
        }

        function toggleInfoPanel() {
            const panel = document.getElementById('info-panel');
            const isHidden = panel.classList.contains('hidden');

            if (isHidden) {
                panel.classList.remove('hidden');
                // パネルが表示されたことを視覚的に示すため、少し強調
                panel.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    panel.style.transform = 'scale(1)';
                }, 200);
            } else {
                panel.classList.add('hidden');
            }
        }

        function generateGitHubURL(file, line) {
            if (!repo || !file) return null;

            // ファイルパスを正規化（srcディレクトリを保持）
            let normalizedFile = file.replace(/\\\\/g, '/');

            // プロジェクトルートからの相対パスに変換
            if (normalizedFile.includes('/src/')) {
                // 最後のsrcディレクトリ以降を取得
                const srcIndex = normalizedFile.lastIndexOf('/src/');
                normalizedFile = normalizedFile.substring(srcIndex + 1); // '/src/' -> 'src/'
            } else if (normalizedFile.startsWith('src/')) {
                // 既にsrcから始まっている場合はそのまま
                normalizedFile = normalizedFile;
            } else {
                // srcディレクトリがない場合はファイル名のみ
                const lastSlash = normalizedFile.lastIndexOf('/');
                if (lastSlash !== -1) {
                    normalizedFile = normalizedFile.substring(lastSlash + 1);
                }
            }

            return 'https://github.com/' + repo + '/blob/' + branch + '/' + normalizedFile + '#L' + line;
        }

        function resetLayout() {
            cy.layout({
                name: 'circle',
                fit: true,
                padding: 30,
                avoidOverlap: true,
                radius: 200
            }).run();
        }

        function fitToContent() {
            cy.fit();
        }

        let labelsVisible = true;
        let calleeLocationFilterEnabled = false;

        function toggleNodeLabels() {
            labelsVisible = !labelsVisible;
            cy.style()
                .selector('node')
                .style('label', labelsVisible ? 'data(label)' : '')
                .update();
        }

        function toggleCalleeLocationFilter() {
            calleeLocationFilterEnabled = !calleeLocationFilterEnabled;

            const button = event.target;

            if (calleeLocationFilterEnabled) {
                // calleeの位置情報がないノードとエッジを非表示
                cy.nodes('[hasCalleeLocationInfo = false]').style('display', 'none');
                cy.edges('[hasCalleeLocationInfo = false]').style('display', 'none');
                button.textContent = 'Show No-Callee-Location';
                button.style.backgroundColor = '#FF5722';
            } else {
                // すべてのノードとエッジを表示
                cy.nodes().style('display', 'element');
                cy.edges().style('display', 'element');
                button.textContent = 'Hide No-Callee-Location';
                button.style.backgroundColor = '#2196F3';
            }
        }

        // 初期レイアウト
        cy.ready(function() {
            resetLayout();
        });

        // ダークモード切り替えの監視
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener(function(e) {
                // ダークモードが切り替わった時にページをリロード
                // （Cytoscape.jsのスタイルを動的に更新するのは複雑なため）
                window.location.reload();
            });
        }
    </script>
</body>
</html>`;
}

/**
 * メイン処理
 */
function main() {
  console.log('Enhanced Call Graph HTML Generator starting...');

  const options = {
    repo: process.env.GITHUB_REPOSITORY || null,
    branch: 'main'
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
  const detailedData = extractDetailedCallGraph(sarifFile);

  if (detailedData.length === 0) {
    console.error('\n*** FATAL ERROR: No call graph data found in SARIF file ***');
    console.error('');
    console.error('=== DIAGNOSTIC INFORMATION ===');
    console.error('This indicates one of the following root causes:');
    console.error('');
    console.error('1. SARIF FILE STRUCTURE ISSUE:');
    console.error('   - SARIF file exists but has no "runs" array');
    console.error('   - SARIF file has runs but no "results" in any run');
    console.error('   - File was truncated or corrupted during generation');
    console.error('');
    console.error('2. MESSAGE FORMAT MISMATCH:');
    console.error('   - CodeQL query generated different message format than expected');
    console.error('   - Expected: "caller -> callee (at file:line:col)"');
    console.error('   - Actual messages may use different pattern or language');
    console.error('');
    console.error('3. CODEQL QUERY EXECUTION ISSUE:');
    console.error('   - Wrong CodeQL query was executed (not callgraph query)');
    console.error('   - CodeQL query found no function calls in the codebase');
    console.error('   - Query execution failed but produced empty SARIF file');
    console.error('');
    console.error('4. CODEBASE ANALYSIS ISSUE:');
    console.error('   - Target codebase has no detectable function calls');
    console.error('   - CodeQL language detection failed');
    console.error('   - Source files are not in expected format/language');
    console.error('');
    console.error('=== NEXT STEPS FOR DEBUGGING ===');
    console.error('1. Check the actual SARIF file content manually');
    console.error('2. Verify the CodeQL query that was used');
    console.error('3. Confirm the target codebase has JavaScript/TypeScript files');
    console.error('4. Check CodeQL execution logs for any warnings/errors');
    console.error('');
    console.error('Cannot generate enhanced call graph without source location data');
    process.exit(1);
  }

  const graphData = convertDetailedData(detailedData);
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

module.exports = {
  extractDetailedCallGraph,
  convertDetailedData,
  generateHTML
};
