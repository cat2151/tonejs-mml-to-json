function writeDebugCallerSourceLines(sarifFile, debugOutFile) {
  const results = extractCallerinfo(sarifFile);
  try {
    fs.writeFileSync(debugOutFile, JSON.stringify(results, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

function writeDebugCalleeSourceLines(sarifFile, debugOutFile) {
  const results = extractCalleeinfo(sarifFile);
  try {
    fs.writeFileSync(debugOutFile, JSON.stringify(results, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

// 指定ファイル・行番号のソース行を取得
function getSourceLine(file, line) {
  try {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) return null;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    if (line > 0 && line <= lines.length) {
      return lines[line - 1];
    }
    return null;
  } catch (e) {
    return null;
  }
}
// callgraph-utils.cjs
// SARIF解析・データ変換・GitHubリンク生成ユーティリティ

const fs = require('fs');
const path = require('path');

function isValidSourceFile(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const allowedFiles = [
    'src/main.js',
    'src/mml2json.js',
    'src/play.js'
  ];
  for (const allowedFile of allowedFiles) {
    if (normalizedPath === allowedFile || normalizedPath.endsWith('/' + allowedFile)) {
      return true;
    }
  }
  return false;
}

function extractCallerinfo(sarifFile) {
  try {
    const fileContent = fs.readFileSync(sarifFile, 'utf8');
    const sarif = JSON.parse(fileContent);
    if (!sarif.runs || sarif.runs.length === 0) return [];
    const results = [];
    sarif.runs.forEach((run) => {
      if (!run.results) return;
      run.results.forEach((result) => {
        if (result.message && result.message.text) {
          const text = result.message.text;
          const match = text.match(/^(.+?)\s*->\s*(.+?)\s*\(at\s+(.+):(\d+)(?::(\d+))?\)$/);
          let caller = null, callee = null;
          if (match) {
            caller = match[1].trim();
            callee = match[2].trim();
          } else {
            const lines = text.split('\n').filter(line => line.trim().length > 0);
            for (const line of lines) {
              const m = line.match(/^(.+?)\s*->\s*(.+?)\s*\(at\s+(.+):(\d+)(?::(\d+))?\)$/);
              if (m) {
                caller = m[1].trim();
                callee = m[2].trim();
                break;
              }
            }
          }
          if (caller && callee && Array.isArray(result.locations) && result.locations.length > 0) {
            const loc = result.locations[0].physicalLocation;
            const fileUri = loc.artifactLocation.uri.replace(/^file:\/\//, '').replace(/\\/g, '/');
            const fileName = fileUri.startsWith('src/') ? fileUri : 'src/' + path.basename(fileUri);
            if (isValidSourceFile(fileName)) {
              const srcLine = getSourceLine(fileName, loc.region?.startLine || 1);
              results.push({
                caller,
                callee,
                file: fileName,
                line: loc.region?.startLine || 1,
                column: loc.region?.startColumn || 1,
                fullLocation: `${fileName}:${loc.region?.startLine || 1}:${loc.region?.startColumn || 1}`,
                sourceLine: srcLine
              });
            }
          }
        }
      });
    });
    return results;
  } catch (error) {
    return [];
  }
}

// SARIFファイルからcallee情報を抽出
function extractCalleeinfo(sarifFile) {
  try {
    const fileContent = fs.readFileSync(sarifFile, 'utf8');
    const sarif = JSON.parse(fileContent);
    if (!sarif.runs || sarif.runs.length === 0) return [];
    const results = [];
    sarif.runs.forEach((run) => {
      if (!run.results) return;
      run.results.forEach((result) => {
        if (result.message && result.message.text) {
          // 例: calcAttackToReleaseTicks (mml2json.js:111) -> calcLtick (mml2json.js:150) (at mml2json.js:116)
          const text = result.message.text;
          const calleeMatch = text.match(/->\s*([^(]+)\s*\(([^:]+):(\d+)\)/);
          if (calleeMatch) {
            const callee = calleeMatch[1].trim();
            const fileName = calleeMatch[2].trim().startsWith('src/') ? calleeMatch[2].trim() : 'src/' + calleeMatch[2].trim();
            const line = parseInt(calleeMatch[3], 10);
            let srcLine = null;
            try {
              srcLine = getSourceLine(fileName, line);
            } catch (e) {}
            results.push({
              callee,
              file: fileName,
              line: line,
              sourceLine: srcLine
            });
          }
        }
      });
    });
    return results;
  } catch (e) {
    return [];
  }
}

function convertDetailedData(detailedData, calleeInfo) {
  const nodes = new Map();
  const edges = [];
  const calleeLocationMap = new Map();
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
          type: 'definition',
          sourceLine: item.sourceLine || null
        });
      }
    }
  });
  detailedData.forEach((item, index) => {
    if (!item.caller || !item.callee) return;
    if (!nodes.has(item.caller)) {
      nodes.set(item.caller, {
        id: item.caller,
        label: item.caller,
        locations: [],
        hasLocationInfo: false,
        hasCalleeLocationInfo: false
      });
    }

    let calleeFncDef = null;
    calleeInfo.forEach((calleeItem) => {
      let calleeOfItem = item.callee;
      const calleeParts = calleeOfItem.split(/\s+/);
      if (calleeParts.length > 1) {
        calleeOfItem = calleeParts[0]; // 最初の部分を関数名として使用
      }
      if (calleeItem.callee === calleeOfItem) {
        calleeFncDef = calleeItem.sourceLine || null;
      }
    });

    if (!nodes.has(item.callee)) {
      const calleeLocations = calleeLocationMap.get(item.callee) || [];
      nodes.set(item.callee, {
        id: item.callee,
        label: item.callee,
        locations: [...calleeLocations],
        hasLocationInfo: calleeLocations.length > 0,
        hasCalleeLocationInfo: calleeLocations.length > 0,
        calleeFncDef: calleeFncDef
      });
    }
    if (item.file && item.line && item.line > 0 && isValidSourceFile(item.file)) {
      const callerNode = nodes.get(item.caller);
      if (!callerNode.locations.some(loc => loc.file === item.file && loc.line === item.line)) {
        callerNode.locations.push({
          file: item.file,
          line: item.line,
          column: item.column || 1,
          type: 'caller',
          sourceLine: item.sourceLine || null
        });
        callerNode.hasLocationInfo = true;
      }
    }
    const calleeNode = nodes.get(item.callee);
    if (calleeLocationMap.has(item.callee)) {
      calleeNode.hasCalleeLocationInfo = true;
    }
    const edgeData = {
      id: `edge-${index}`,
      source: item.caller,
      target: item.callee,
      hasCalleeLocationInfo: calleeLocationMap.has(item.callee)
    };
    if (item.file && item.line && item.line > 0 && isValidSourceFile(item.file)) {
      edgeData.file = item.file;
      edgeData.line = item.line;
      edgeData.column = item.column || 1;
      edgeData.location = item.fullLocation || `${item.file}:${item.line}:${item.column || 1}`;
      edgeData.hasLocationInfo = true;
      edgeData.sourceLine = item.sourceLine || null;
    } else {
      edgeData.hasLocationInfo = false;
    }
    edges.push(edgeData);
  });
  let allNodes = Array.from(nodes.values());
  let allEdges = edges;
  const blacklist = ['forEach', 'map', 'filter', 'reduce', 'find', 'some', 'every', 'sort', 'concat', 'join', 'push', 'pop', 'shift', 'unshift', 'splice', 'slice'];
  allNodes = allNodes.filter(node => !blacklist.includes(node.id));
  allEdges = allEdges.filter(edge => !blacklist.includes(edge.source) && !blacklist.includes(edge.target));
  return {
    nodes: allNodes,
    edges: allEdges
  };
}

function generateGitHubURL(file, line, repo = null, branch = 'main') {
  if (!repo) return null;
  let normalizedFile = file.replace(/\\/g, '/');
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
  return `https://github.com/${repo}/blob/${branch}/${normalizedFile}#L${line}`;
}

module.exports = {
  isValidSourceFile,
  extractCallerinfo,
  convertDetailedData,
  generateGitHubURL,
  getSourceLine,
  writeDebugCallerSourceLines,
  writeDebugCalleeSourceLines,
  extractCalleeinfo
};
