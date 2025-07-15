#!/usr/bin/env node

//
// Enhanced Call Graph HTML Generator with Source Code Linking
//
// 重要な設計方針:
// - フォールバック処理は実装しない
// - SARIFファイルが存在しない場合は明確なエラーで終了する
// - ソースコード位置情報が必須
// - 「なんとなく動く」状態を作らず、根本原因の究明を促す
//
// 機能:
// - ソースコードの位置情報を保持
// - ノードクリックでソースコードの場所を表示
// - GitHubリンク生成（可能な場合）
// - 詳細な呼び出し情報の表示
//

const fs = require('fs');
const path = require('path');

/**
 * SARIFファイルから詳細な呼び出し情報を抽出
 */
function extractDetailedCallGraph(sarifFile) {
  try {
    const sarif = JSON.parse(fs.readFileSync(sarifFile, 'utf8'));
    const results = [];

    if (sarif.runs && sarif.runs.length > 0) {
      sarif.runs.forEach(run => {
        if (run.results) {
          run.results.forEach(result => {
            if (result.message && result.message.text) {
              const text = result.message.text;

              // "caller -> callee (at file:line:col)" の形式を解析
              const match = text.match(/^(.+?)\s*->\s*(.+?)\s*\(at\s+(.+):(\d+):(\d+)\)$/);
              if (match) {
                const [, caller, callee, file, line, column] = match;
                results.push({
                  caller: caller.trim(),
                  callee: callee.trim(),
                  file: file.trim(),
                  line: parseInt(line),
                  column: parseInt(column),
                  fullLocation: `${file}:${line}:${column}`
                });
              }
            }
          });
        }
      });
    }

    return results;
  } catch (error) {
    console.error('Error processing SARIF file:', error);
    return [];
  }
}

// CSVフォールバック機能は削除 - SARIFファイルが必須

/**
 * 詳細データからCytoscape.js用のデータに変換
 */
function convertDetailedData(detailedData) {
  const nodes = new Map();
  const edges = [];

  detailedData.forEach((item, index) => {
    // ノードに位置情報を追加
    if (!nodes.has(item.caller)) {
      nodes.set(item.caller, {
        id: item.caller,
        label: item.caller,
        locations: []
      });
    }
    if (!nodes.has(item.callee)) {
      nodes.set(item.callee, {
        id: item.callee,
        label: item.callee,
        locations: []
      });
    }

    // 呼び出し元の位置情報を追加
    const callerNode = nodes.get(item.caller);
    if (!callerNode.locations.some(loc => loc.file === item.file && loc.line === item.line)) {
      callerNode.locations.push({
        file: item.file,
        line: item.line,
        column: item.column,
        type: 'caller'
      });
    }

    // エッジに詳細情報を追加
    edges.push({
      id: `edge-${index}`,
      source: item.caller,
      target: item.callee,
      file: item.file,
      line: item.line,
      column: item.column,
      location: item.fullLocation
    });
  });

  return {
    nodes: Array.from(nodes.values()),
    edges: edges
  };
}

/**
 * GitHubリポジトリのURLを生成
 */
function generateGitHubURL(file, line, repo = null, branch = 'main') {
  if (!repo) return null;

  // ファイルパスを正規化
  const normalizedFile = file.replace(/\\/g, '/').replace(/^.*\/src\//, 'src/');
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
        }

        .graph-container {
            flex: 1;
            display: flex;
            flex-direction: column;
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
            width: 300px;
            max-height: 100%;
            overflow-y: auto;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            flex-shrink: 0;
        }

        .info-panel.hidden {
            display: none;
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
        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
                height: auto;
                min-height: 400px;
            }

            .info-panel {
                width: 100%;
                max-height: 300px;
                order: 2;
            }

            .graph-container {
                order: 1;
                min-height: 400px;
            }

            .header {
                flex-direction: column;
                text-align: center;
            }

            .stats-container {
                justify-content: center;
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
        </div>
    </div>

    <div class="main-container">
        <div class="graph-container">
            <div id="cy"></div>
            <div class="controls">
                <button class="control-button" onclick="resetLayout()">Reset Layout</button>
                <button class="control-button" onclick="fitToContent()">Fit to Content</button>
                <button class="control-button" onclick="toggleNodeLabels()">Toggle Labels</button>
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
                        locations: node.locations || []
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
                        location: edge.location || ''
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
                    selector: 'node[locations.length > 0]',
                    style: {
                        'border-width': '3px',
                        'border-color': currentColors.nodeWithLocation
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
                    selector: 'edge[location]',
                    style: {
                        'line-color': currentColors.edgeWithLocation,
                        'target-arrow-color': currentColors.edgeWithLocation
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

            if (data.locations && data.locations.length > 0) {
                html += '<h4>Locations:</h4>';
                data.locations.forEach(loc => {
                    const githubURL = generateGitHubURL(loc.file, loc.line);
                    html += '<div class="location-item">';
                    html += '<div class="location-file">' + loc.file + ':' + loc.line + ':' + loc.column + '</div>';
                    if (githubURL) {
                        html += '<div><a href="' + githubURL + '" target="_blank" class="location-link">View on GitHub</a></div>';
                    }
                    html += '</div>';
                });
            } else {
                html += '<p>ソースコード位置情報がありません</p>';
            }

            content.innerHTML = html;
            showInfoPanel();
        }

        function showEdgeInfo(data) {
            const panel = document.getElementById('info-panel');
            const content = document.getElementById('info-content');

            let html = '<div class="info-title">Call: ' + data.source + ' → ' + data.target + '</div>';

            if (data.location) {
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
            panel.classList.toggle('hidden');
        }

        function generateGitHubURL(file, line) {
            if (!repo || !file) return null;
            const normalizedFile = file.replace(/\\\\/g, '/').replace(/^.*\\/src\\//, 'src/');
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
        function toggleNodeLabels() {
            labelsVisible = !labelsVisible;
            cy.style()
                .selector('node')
                .style('label', labelsVisible ? 'data(label)' : '')
                .update();
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
    console.error('*** FATAL ERROR: No call graph data found in SARIF file ***');
    console.error('This indicates one of the following issues:');
    console.error('1. CodeQL callgraph query was not executed properly');
    console.error('2. CodeQL callgraph query found no results');
    console.error('3. SARIF file format is unexpected');
    console.error('4. Message format in SARIF does not match expected pattern');
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
  fs.writeFileSync('callgraph.html', html);

  console.log(`✓ Enhanced call graph HTML generated with ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);
  console.log('✓ Source code linking enabled');
}

if (require.main === module) {
  main();
}

module.exports = {
  extractDetailedCallGraph,
  convertDetailedData,
  generateHTML
};
