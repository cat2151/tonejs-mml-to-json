// callgraph.js
// このファイルは generateHTML.cjs から分離したCytoscape.jsの描画・操作ロジックです。
// 依存: graphData, repo, branch（グローバル変数としてHTML側で宣言されていること）

// HTMLエスケープ関数（グローバルで利用可能に）
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
    });
}

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

// レイアウト候補
const layoutNames = ['cose', 'breadthfirst', 'concentric', 'circle'];
let currentLayoutIndex = 0;

const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
        ...graphData.nodes.map(node => ({
            data: {
                id: node.id,
                label: node.label,
                locations: node.locations || [],
                hasLocationInfo: node.hasLocationInfo || false,
                hasCalleeLocationInfo: node.hasCalleeLocationInfo || false,
                calleeFncDef: node.calleeFncDef || false,
            }
        })),
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
        { selector: 'node', style: {
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
        }},
        { selector: 'node:selected', style: {
            'background-color': currentColors.nodeSelected,
            'border-color': currentColors.nodeSelectedBorder
        }},
        { selector: 'node[hasLocationInfo = true]', style: {
            'border-width': '3px',
            'border-color': currentColors.nodeWithLocation
        }},
        { selector: 'node[hasCalleeLocationInfo = true]', style: {
            'border-width': '4px',
            'border-color': '#FF9800'
        }},
        { selector: 'node[hasCalleeLocationInfo = false]', style: {
            'border-style': 'dotted',
            'border-width': '2px',
            'opacity': 0.6
        }},
        { selector: 'edge', style: {
            'width': 2,
            'line-color': currentColors.edge,
            'target-arrow-color': currentColors.edge,
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.2
        }},
        { selector: 'edge:selected', style: {
            'line-color': currentColors.edgeSelected,
            'target-arrow-color': currentColors.edgeSelected,
            'width': 3
        }},
        { selector: 'edge[hasLocationInfo = true]', style: {
            'line-color': currentColors.edgeWithLocation,
            'target-arrow-color': currentColors.edgeWithLocation
        }},
        { selector: 'node[hasLocationInfo = false]', style: {
            'border-style': 'dashed',
            'border-width': '2px',
            'opacity': 0.8
        }},
        { selector: 'edge[hasCalleeLocationInfo = true]', style: {
            'line-color': '#FF9800',
            'target-arrow-color': '#FF9800',
            'width': 3
        }},
        { selector: 'edge[hasLocationInfo = false]', style: {
            'line-style': 'dashed',
            'opacity': 0.7
        }}
    ],
    layout: getLayoutConfig('cose')
});

function getLayoutConfig(name) {
    switch (name) {
        case 'cose':
            return {
                name: 'cose', fit: true, padding: 30, animate: true,
                nodeRepulsion: 8000, idealEdgeLength: 120, edgeElasticity: 0.2, gravity: 0.25, numIter: 1000
            };
        case 'breadthfirst':
            return {
                name: 'breadthfirst', fit: true, padding: 30, directed: true, animate: true, spacingFactor: 1.2
            };
        case 'concentric':
            return {
                name: 'concentric', fit: true, padding: 30, animate: true,
                concentric: function(node) { return node.degree(); },
                levelWidth: function(nodes) { return 2; }
            };
        case 'circle':
        default:
            return {
                name: 'circle', fit: true, padding: 30, animate: true, radius: 200
            };
    }
}

cy.on('tap', 'node', function(evt) {
    const node = evt.target;
    const data = node.data();
    showNodeInfo(data);
});

cy.on('tap', 'edge', function(evt) {
    const edge = evt.target;
    const data = edge.data();
    showEdgeInfo(data);
});

cy.on('tap', function(evt) {
    if (evt.target === cy) {
        hideInfoPanel();
    }
});

function showNodeInfo(data) {
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    let html = '<div class="info-title">Function: ' + data.label + '</div>';
    if (data.hasCalleeLocationInfo && data.calleeFncDef) {
        // calleeの関数定義のソースコードを1行表示
        // html += '<p><strong>✓ This function has source location info</strong></p>'; // コメントアウト理由 : かわりに calleeFncDef を表示しているので
        // html += '<div style="margin-bottom:6px;font-size:13px;color:#888">'; // 備忘、888だと暗い
        html += '<div style="margin-bottom:6px;font-size:13px;color:#EEE">'; // 備忘、EEEだとダークモードならOK、今後はライトモードとダークモードの切り替えに対応予定
        html += '<div class="location-item"><div><small>';
        html += '<pre class="source-line">' + escapeHtml(data.calleeFncDef) + '</pre>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      } else {
        html += '<p><strong>⚠ This function has NO source location info</strong></p>';
        html += '<p><small>匿名関数、動的関数、または外部ライブラリの関数である可能性があります。</small></p>';
    }
    if (data.hasLocationInfo && data.locations && data.locations.length > 0) {
        html += '<h4>Callers:</h4>';
        data.locations.forEach(loc => {
            const githubURL = generateGitHubURL(loc.file, loc.line);
            html += '<div class="location-item">';
            html += '<div class="location-file">' + loc.file + ':' + loc.line + ':' + loc.column + '</div>';
            html += '<div><small>Type: ' + loc.type + '</small></div>';
            if (loc.sourceLine) {
                html += '<pre class="source-line">' + escapeHtml(loc.sourceLine) + '</pre>';
            }
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
    html += '<div style="margin-bottom:6px;font-size:13px;color:#888">';
    html += '<b>source:</b> <span style="color:#1976D2">' + data.source + '</span> &nbsp; ';
    html += '<b>target:</b> <span style="color:#FF9800">' + data.target + '</span>';
    html += '</div>';
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
        if (data.sourceLine) {
            html += '<pre class="source-line">' + escapeHtml(data.sourceLine) + '</pre>';
        }
        const githubURL = generateGitHubURL(data.file, data.line);
        if (githubURL) {
            html += '<div><a href="' + githubURL + '" target="_blank" class="location-link">View on GitHub</a></div>';
        }
        html += '</div>';
    } else {
        html += '<p>呼び出し位置情報がありません</p>';
        html += '<p><small>この呼び出しは動的に発生するか、CodeQLで検出できない方法で行われている可能性があります。</small></p>';
    }
// HTMLエスケープ関数
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
    });
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
        panel.style.transform = 'scale(1.02)';
        setTimeout(() => { panel.style.transform = 'scale(1)'; }, 200);
    } else {
        panel.classList.add('hidden');
    }
}

function generateGitHubURL(file, line) {
    if (!repo || !file) return null;
    let normalizedFile = file.replace(/\\\\/g, '/');
    if (normalizedFile.includes('/src/')) {
        const srcIndex = normalizedFile.lastIndexOf('/src/');
        normalizedFile = normalizedFile.substring(srcIndex + 1);
    } else if (normalizedFile.startsWith('src/')) {
        normalizedFile = normalizedFile;
    } else {
        const lastSlash = normalizedFile.lastIndexOf('/');
        if (lastSlash !== -1) {
            normalizedFile = normalizedFile.substring(lastSlash + 1);
        }
    }
    return 'https://github.com/' + repo + '/blob/' + branch + '/' + normalizedFile + '#L' + line;
}

function resetLayout() {
    currentLayoutIndex = 0;
    const layout = cy.layout(getLayoutConfig(layoutNames[currentLayoutIndex]));
    layout.run();
}

function switchLayout(button) {
    currentLayoutIndex = (currentLayoutIndex + 1) % layoutNames.length;
    const layoutName = layoutNames[currentLayoutIndex];
    const layout = cy.layout(getLayoutConfig(layoutName));
    layout.run();
    if (button) button.textContent = 'レイアウト切替 (' + layoutName + ')';
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
        cy.nodes('[hasCalleeLocationInfo = false]').style('display', 'none');
        cy.edges('[hasCalleeLocationInfo = false]').style('display', 'none');
        button.textContent = 'Show No-Callee-Location';
        button.style.backgroundColor = '#FF5722';
    } else {
        cy.nodes().style('display', 'element');
        cy.edges().style('display', 'element');
        button.textContent = 'Hide No-Callee-Location';
        button.style.backgroundColor = '#2196F3';
    }
}

cy.ready(function() {
    resetLayout();
});

if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(function(e) {
        window.location.reload();
    });
}
