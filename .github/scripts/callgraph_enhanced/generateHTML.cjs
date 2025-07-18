/**
 * HTMLテンプレートを生成
 */
function generateHTML(graphData, options = {}) {
  const {
    title = 'Function Call Graph with Source Links',
    repo = null,
    branch = 'main',
  } = options;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://unpkg.com/cytoscape@3.29.2/dist/cytoscape.min.js"></script>
    <link rel="stylesheet" href="style.css">
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
                <button class="control-button" onclick="switchLayout(this)">レイアウト切替</button>
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
    </script>
    <script src="callgraph.js"></script>
</body>
</html>`;
}

module.exports = generateHTML;
