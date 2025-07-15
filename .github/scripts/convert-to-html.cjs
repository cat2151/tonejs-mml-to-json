#!/usr/bin/env node

//
// Call Graph HTML Generator
//
// 重要な設計方針:
// - フォールバック処理は実装しない
// - 期待されるファイルが存在しない場合は明確なエラーで終了する
// - 「空のグラフ」などの代替手段で問題を隠蔽しない
// - 依存関係やファイルパスの問題を早期に発見できるようにする
//
// この方針により:
// - 上流の処理（SARIF生成、CSV作成）の問題を確実に検出
// - デバッグ時間を短縮
// - 予期しない動作やサイレント失敗を防止
//

const fs = require('fs');
const path = require('path');

/**
 * CSVファイルを読み込んでCytoscape.js用のデータに変換
 */
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const nodes = new Set();
  const edges = [];

  // ヘッダー行をスキップ
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [caller, callee] = line.split(',').map(s => s.trim().replace(/"/g, ''));

    if (caller && callee) {
      nodes.add(caller);
      nodes.add(callee);
      edges.push({ source: caller, target: callee });
    }
  }

  return {
    nodes: Array.from(nodes).map(id => ({ id, label: id })),
    edges: edges.map((edge, index) => ({ id: `edge-${index}`, ...edge }))
  };
}

/**
 * Cytoscape.jsを使ったインタラクティブなHTMLを生成
 */
function generateHTML(graphData) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Function Call Graph</title>
    <script src="https://unpkg.com/cytoscape@3.29.2/dist/cytoscape.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .stats {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            gap: 30px;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
        }

        .stat-label {
            font-size: 14px;
            color: #666;
        }

        #cy {
            width: 100%;
            height: 600px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .controls {
            margin-top: 20px;
            text-align: center;
        }

        .control-button {
            background: #2196F3;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .control-button:hover {
            background: #1976D2;
        }

        .info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-top: 20px;
            font-size: 14px;
            color: #666;
            line-height: 1.6;
        }

        .generated-time {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Function Call Graph</h1>
        <p>JavaScript/TypeScript関数呼び出し関係の可視化</p>
    </div>

    <div class="stats">
        <div class="stat-item">
            <div class="stat-number" id="nodeCount">${graphData.nodes.length}</div>
            <div class="stat-label">Functions</div>
        </div>
        <div class="stat-item">
            <div class="stat-number" id="edgeCount">${graphData.edges.length}</div>
            <div class="stat-label">Call Relationships</div>
        </div>
    </div>

    <div id="cy"></div>

    <div class="controls">
        <button class="control-button" onclick="fitGraph()">🔍 Fit to Screen</button>
        <button class="control-button" onclick="resetLayout()">🔄 Reset Layout</button>
        <button class="control-button" onclick="toggleLabels()">🏷️ Toggle Labels</button>
    </div>

    <div class="info">
        <p><strong>使い方:</strong></p>
        <ul>
            <li>🖱️ ノード（関数）をドラッグして位置を調整できます</li>
            <li>🔍 マウスホイールでズームイン/アウトできます</li>
            <li>👆 ノードをクリックすると詳細情報が表示されます</li>
            <li>🎯 エッジ（矢印）は関数呼び出しの方向を示します</li>
        </ul>
    </div>

    <div class="generated-time">
        Generated on: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
    </div>

    <script>
        const graphData = ${JSON.stringify(graphData, null, 2)};

        let showLabels = true;

        // Cytoscapeインスタンスを初期化
        const cy = cytoscape({
            container: document.getElementById('cy'),

            elements: [
                // ノードを追加
                ...graphData.nodes.map(node => ({
                    data: { id: node.id, label: node.label }
                })),
                // エッジを追加
                ...graphData.edges.map(edge => ({
                    data: {
                        id: edge.id,
                        source: edge.source,
                        target: edge.target
                    }
                }))
            ],

            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#2196F3',
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '12px',
                        'font-weight': 'bold',
                        'text-wrap': 'wrap',
                        'text-max-width': '100px',
                        'width': '60px',
                        'height': '60px',
                        'border-width': '2px',
                        'border-color': '#1976D2',
                        'text-background-color': 'white',
                        'text-background-opacity': 0.8,
                        'text-background-padding': '3px'
                    }
                },
                {
                    selector: 'node:selected',
                    style: {
                        'background-color': '#FF5722',
                        'border-color': '#D84315'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#666',
                        'target-arrow-color': '#666',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'arrow-scale': 1.2
                    }
                },
                {
                    selector: 'edge:selected',
                    style: {
                        'line-color': '#FF5722',
                        'target-arrow-color': '#FF5722',
                        'width': 3
                    }
                }
            ],

            layout: {
                name: 'cose',
                nodeRepulsion: 8000,
                nodeOverlap: 20,
                idealEdgeLength: 100,
                animate: true,
                animationDuration: 1000,
                fit: true,
                padding: 30
            }
        });

        // ノードクリックイベント
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const nodeId = node.id();

            // 接続されているエッジとノードをハイライト
            const connectedEdges = node.connectedEdges();
            const connectedNodes = connectedEdges.connectedNodes();

            // すべての要素を薄くする
            cy.elements().style('opacity', 0.3);

            // 選択されたノードと接続要素をハイライト
            node.style('opacity', 1);
            connectedEdges.style('opacity', 1);
            connectedNodes.style('opacity', 1);

            // 3秒後に元に戻す
            setTimeout(() => {
                cy.elements().style('opacity', 1);
            }, 3000);

            console.log('Selected function:', nodeId);
        });

        // 背景クリックでハイライト解除
        cy.on('tap', function(evt) {
            if (evt.target === cy) {
                cy.elements().style('opacity', 1);
            }
        });

        // 制御関数
        function fitGraph() {
            cy.fit();
        }

        function resetLayout() {
            cy.layout({
                name: 'cose',
                nodeRepulsion: 8000,
                nodeOverlap: 20,
                idealEdgeLength: 100,
                animate: true,
                animationDuration: 1000,
                fit: true,
                padding: 30
            }).run();
        }

        function toggleLabels() {
            showLabels = !showLabels;
            if (showLabels) {
                cy.style().selector('node').style('label', 'data(label)').update();
            } else {
                cy.style().selector('node').style('label', '').update();
            }
        }

        // 初期化完了のログ
        console.log('Call graph loaded with', graphData.nodes.length, 'functions and', graphData.edges.length, 'call relationships');
    </script>
</body>
</html>`;
}

/**
 * メイン処理
 */
function main() {
  try {
    // CSVファイルが存在するかチェック
    const csvPath = 'callgraph.csv';
    if (!fs.existsSync(csvPath)) {
      console.error('*** ERROR: CSV file not found ***');
      console.error('Expected file:', csvPath);
      console.error('This indicates that the SARIF processing step failed');
      console.error('Check the CodeQL analysis and SARIF-to-CSV conversion steps');
      process.exit(1);
    }

    // CSVファイルを読み込み
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    console.log('CSV content loaded');

    // グラフデータに変換
    const graphData = parseCSV(csvContent);
    console.log(`Parsed ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);

    // 空のグラフの場合もエラーとして扱う
    if (graphData.nodes.length === 0 || graphData.edges.length === 0) {
      console.error('*** ERROR: No graph data found ***');
      console.error('Nodes:', graphData.nodes.length);
      console.error('Edges:', graphData.edges.length);
      console.error('This indicates that:');
      console.error('1. The CodeQL callgraph query found no results');
      console.error('2. The SARIF-to-CSV conversion failed');
      console.error('3. The CSV format is incorrect');
      console.error('Raw CSV content:');
      console.error(csvContent);
      process.exit(1);
    }

    // HTMLを生成
    const html = generateHTML(graphData);

    // HTMLファイルをカレントディレクトリに保存
    const outputPath = 'callgraph.html';
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`Call graph HTML generated: ${outputPath}`);
    console.log(`Graph contains ${graphData.nodes.length} functions and ${graphData.edges.length} call relationships`);

  } catch (error) {
    console.error('*** FATAL ERROR: Failed to generate call graph HTML ***');
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateHTML };
