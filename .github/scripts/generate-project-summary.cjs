const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class ProjectSummaryGenerator {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../../');
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // agentが提案したもの
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // userが調査して、こちらがベターである、と判断したもの
  }

  /**
   * 過去24時間以内にユーザーコミットがあるかチェック
   */
  async hasUserCommitsInLast24Hours() {
    try {
      console.log('Checking for user commits in the last 24 hours...');

      // 過去24時間のコミット履歴を取得（author情報付き）
      const gitCommand = `git log --since="24 hours ago" --pretty=format:"%H %an %s" --oneline`;

      const result = execSync(gitCommand, {
        cwd: this.projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe'
      });

      const allCommits = result.trim();
      if (!allCommits) {
        console.log('No commits found in the last 24 hours.');
        return false;
      }

      // GitHub Actionsによるコミットを除外
      const userCommits = allCommits
        .split('\n')
        .filter(line => {
          const lowerLine = line.toLowerCase();
          return !lowerLine.includes('github-actions') &&
                 !lowerLine.includes('action@github.com');
        });

      const hasCommits = userCommits.length > 0;

      console.log(`User commits found: ${hasCommits}`);
      if (hasCommits) {
        console.log('Recent user commits:');
        userCommits.forEach(commit => console.log(commit));
      }

      return hasCommits;
    } catch (error) {
      console.error('Error checking commits:', error.message);
      return false;
    }
  }

  /**
   * プロジェクト基本情報を収集
   */
  async collectProjectInfo() {
    console.log('Collecting project information...');

    const projectInfo = {
      name: '',
      description: '',
      structure: '',
      dependencies: {},
      techStack: {},
      fileTree: '',
      fileAnalysis: [],
      functionHierarchy: {}
    };

    try {
      // package.json から基本情報取得
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      projectInfo.name = packageJson.name || 'Unknown';
      projectInfo.description = packageJson.description || '';
      projectInfo.dependencies = {
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {}
      };

      // 技術スタックの分析
      projectInfo.techStack = this.analyzeTechStack(packageJson);
    } catch (error) {
      console.warn('Could not read package.json:', error.message);
    }

    try {
      // README.ja.md を優先、なければ README.md を読み込み
      let readmePath = path.join(this.projectRoot, 'README.ja.md');
      try {
        await fs.access(readmePath);
      } catch {
        readmePath = path.join(this.projectRoot, 'README.md');
      }

      const readmeContent = await fs.readFile(readmePath, 'utf-8');
      // READMEの最初の500文字程度を取得
      projectInfo.description = readmeContent.substring(0, 500) + '...';
    } catch (error) {
      console.warn('Could not read README:', error.message);
    }

    try {
      // プロジェクト構造を取得（Node.jsのfsモジュールを使用）
      const structure = await this.getProjectStructure();
      projectInfo.structure = structure;
    } catch (error) {
      console.warn('Could not get project structure:', error.message);
    }

    try {
      // 詳細なファイルツリーを取得
      console.log('Generating detailed file tree...');
      projectInfo.fileTree = await this.getDetailedFileTree();
    } catch (error) {
      console.warn('Could not get detailed file tree:', error.message);
    }

    try {
      // 全ファイルの詳細分析
      console.log('Analyzing all files...');
      projectInfo.fileAnalysis = await this.analyzeAllFiles();
    } catch (error) {
      console.warn('Could not analyze files:', error.message);
    }

    try {
      // 関数呼び出し階層の分析
      console.log('Analyzing function call hierarchy...');
      projectInfo.functionHierarchy = await this.analyzeFunctionCallHierarchy(projectInfo.fileAnalysis);
    } catch (error) {
      console.warn('Could not analyze function hierarchy:', error.message);
      projectInfo.functionHierarchy = {};
    }

    return projectInfo;
  }

  /**
   * 技術スタックを分析
   */
  analyzeTechStack(packageJson) {
    const techStack = {
      frontend: [],
      music: [],
      backend: [],
      development: [],
      testing: [],
      buildTools: [],
      languageFeatures: [],
      automation: [],
      standards: []
    };

    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // フロントエンド技術
    if (this.checkFileExists('src/index.html')) {
      techStack.frontend.push('HTML5 - ブラウザベースのMMLプレイヤー');
    }

    // 音楽・オーディオ技術
    if (deps['tonejs'] || this.checkFileExists('src/**/*.js', 'Tone.js')) {
      techStack.music.push('Tone.js - Web Audio API音声ライブラリ');
    }

    if (this.checkFileExists('src/index.html')) {
      const htmlContent = this.readFileContent('src/index.html');
      if (htmlContent && htmlContent.includes('unpkg.com/tone')) {
        techStack.music.push('Tone.js CDN - unpkg経由でのライブラリ配信');
      }
    }

    if (this.checkFileExists('src/grammar.pegjs') || this.checkFileExists('src/**/*.js')) {
      techStack.music.push('MML (Music Macro Language) - 音楽記法パーサー');
    }

    if (deps['tonejs'] || this.checkFileExists('src/**/*.js', 'Tone.js')) {
      techStack.music.push('Web Audio API - ブラウザ音声技術（Tone.js経由）');
    }

    // 開発環境・ランタイム
    techStack.development.push('Node.js runtime - JavaScript実行環境');

    if (packageJson.scripts && Object.keys(packageJson.scripts).length > 0) {
      const scriptCount = Object.keys(packageJson.scripts).length;
      techStack.development.push(`npm scripts - タスクランナー (${scriptCount}個のスクリプト)`);
    }

    // 開発ツール
    if (packageJson.packageManager === 'pnpm' || this.checkFileExists('pnpm-lock.yaml')) {
      techStack.development.push('pnpm - 高速で効率的なパッケージマネージャー');
    }

    // テストツール・手法
    if (deps['vitest']) {
      techStack.testing.push('Vitest - 高速なViteベースのテストフレームワーク');
    }

    if (this.checkFileExists('.gitignore')) {
      const gitignoreContent = this.readFileContent('.gitignore');
      if (gitignoreContent && gitignoreContent.includes('TDD開発環境')) {
        techStack.testing.push('TDD (Test-Driven Development) - テスト駆動開発手法');
      }
    }

    // ビルドツール

    // ビルドツール
    if (deps['peggy']) {
      techStack.buildTools.push('Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター');
    }

    // PegJSファイルの存在チェック
    if (this.checkFileExists('src/grammar.pegjs')) {
      techStack.buildTools.push('PEG文法定義 - MML音楽記法のパーサー生成');
    }

    // 開発標準・設定
    if (this.checkFileExists('.editorconfig')) {
      techStack.standards.push('EditorConfig - コード統一ルール');
    }

    // その他の開発ツール
    if (deps['@google/generative-ai']) {
      techStack.development.push('Google Generative AI - AI文書生成サポート');
    }

    if (deps['@octokit/rest']) {
      techStack.development.push('@octokit/rest - GitHub API連携');
    }

    // 言語機能
    if (packageJson.type === 'module') {
      techStack.languageFeatures.push('ES Modules - モダンなJavaScriptモジュールシステム');
    }

    // PegJSファイルの存在チェック
    if (this.checkFileExists('src/grammar.pegjs')) {
      techStack.buildTools.push('PEG文法定義 - MML音楽記法のパーサー生成');
    }

    // GitHub Actionsの検出
    if (this.checkFileExists('.github/workflows')) {
      const workflowFiles = this.getWorkflowFiles();
      if (workflowFiles.length > 0) {
        techStack.automation.push(`GitHub Actions - CI/CD自動化 (${workflowFiles.length}個のワークフロー)`);

        // 特定のワークフローの詳細を追加
        workflowFiles.forEach(workflow => {
          const workflowName = workflow.replace('.yml', '').replace('.yaml', '');
          if (workflowName.includes('summary')) {
            techStack.automation.push('  - プロジェクト要約自動生成');
          }
          if (workflowName.includes('translate')) {
            techStack.automation.push('  - README多言語翻訳');
            techStack.automation.push('  - i18n automation - 自動翻訳ワークフロー');
          }
          if (workflowName.includes('issue')) {
            techStack.automation.push('  - Issue自動管理');
          }
        });
      }
    }

    return techStack;
  }

  /**
   * ファイル存在チェック（簡易版）
   */
  checkFileExists(pattern, keyword = null) {
    try {
      const fs = require('fs');
      const path = require('path');

      if (pattern.includes('**')) {
        // glob的なパターンの場合は簡易チェック
        const basePath = pattern.split('**')[0];
        const fullPath = path.join(this.projectRoot, basePath);
        return fs.existsSync(fullPath);
      } else {
        // 具体的なファイルパス
        const fullPath = path.join(this.projectRoot, pattern);
        return fs.existsSync(fullPath);
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * GitHub Actionsワークフローファイルを取得
   */
  getWorkflowFiles() {
    try {
      const fs = require('fs');
      const path = require('path');
      const workflowsPath = path.join(this.projectRoot, '.github/workflows');

      if (!fs.existsSync(workflowsPath)) {
        return [];
      }

      const files = fs.readdirSync(workflowsPath);
      return files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
    } catch (error) {
      return [];
    }
  }

  /**
   * ファイル内容を読み取る（簡易版）
   */
  readFileContent(filePath) {
    try {
      const fs = require('fs');
      const path = require('path');
      const fullPath = path.join(this.projectRoot, filePath);

      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath, 'utf-8');
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * プロジェクト構造を取得（クロスプラットフォーム対応）
   */
  async getProjectStructure() {
    const extensions = ['.js', '.ts', '.json', '.md', '.html', '.css', '.pegjs'];
    const excludeDirs = ['.git', 'node_modules', '.github'];
    const files = [];

    const walkDir = async (dir, relativePath = '') => {
      try {
        const items = await fs.readdir(path.join(this.projectRoot, dir));

        for (const item of items) {
          const fullPath = path.join(dir, item);
          const absolutePath = path.join(this.projectRoot, fullPath);
          const relativeItemPath = path.join(relativePath, item);

          // 除外ディレクトリをスキップ
          if (excludeDirs.includes(item)) {
            continue;
          }

          try {
            const stat = await fs.stat(absolutePath);
            if (stat.isDirectory()) {
              await walkDir(fullPath, relativeItemPath);
            } else if (stat.isFile()) {
              const ext = path.extname(item);
              if (extensions.includes(ext)) {
                files.push(relativeItemPath.replace(/\\/g, '/'));
                if (files.length >= 30) break; // 最大30ファイル
              }
            }
          } catch (error) {
            // ファイル/ディレクトリアクセスエラーをスキップ
            continue;
          }
        }
      } catch (error) {
        // ディレクトリ読み取りエラーをスキップ
      }
    };

    await walkDir('.');
    return files.join('\n');
  }

  /**
   * GitHub Issues情報を収集
   */
  async collectIssues() {
    console.log('Collecting GitHub Issues...');

    try {
      const { Octokit } = require('@octokit/rest');
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });

      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

      const { data: issues } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: 'open',
        per_page: 10
      });

      return issues.map(issue => ({
        number: issue.number,
        title: issue.title,
        body: issue.body ? issue.body.substring(0, 300) + '...' : '',
        labels: issue.labels.map(label => label.name)
      }));
    } catch (error) {
      console.warn('Could not fetch GitHub Issues:', error.message);
      return [];
    }
  }

  /**
   * 最近の変更履歴を取得
   */
  async collectRecentChanges() {
    console.log('Collecting recent changes...');

    try {
      // 過去7日間のコミット履歴
      const commits = execSync('git log --since="7 days ago" --oneline', {
        cwd: this.projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe'
      }).trim().split('\n').slice(0, 10);

      // 最近変更されたファイル
      const changedFiles = execSync('git diff --name-only HEAD~7..HEAD', {
        cwd: this.projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe'
      }).trim().split('\n').filter(file => file.length > 0);

      return {
        commits,
        changedFiles
      };
    } catch (error) {
      console.warn('Could not get recent changes:', error.message);
      return {
        commits: [],
        changedFiles: []
      };
    }
  }

  /**
   * プロンプトファイルを読み込み
   */
  async loadPrompts() {
    const prompts = {
      overview: '',
      development: ''
    };

    try {
      const overviewPromptPath = path.join(this.projectRoot, '.github/prompts/project-overview-prompt.md');
      prompts.overview = await fs.readFile(overviewPromptPath, 'utf-8');
    } catch (error) {
      console.warn('Could not read project-overview-prompt.md:', error.message);
      prompts.overview = `プロジェクト概要、技術スタック、ファイル構造、関数構造を詳細に説明してください。`;
    }

    try {
      const developmentPromptPath = path.join(this.projectRoot, '.github/prompts/development-status-prompt.md');
      prompts.development = await fs.readFile(developmentPromptPath, 'utf-8');
    } catch (error) {
      console.warn('Could not read development-status-prompt.md:', error.message);
      prompts.development = `現在のissuesを要約し、次の一手の候補を3つリストしてください。`;
    }

    return prompts;
  }

  /**
   * Gemini APIを使って2つのテキストを生成
   */
  async generateSummaries(projectInfo, issues, recentChanges, prompts) {
    console.log('Generating summaries with Gemini API...');

    const contextData = {
      projectInfo,
      issues,
      recentChanges,
      timestamp: new Date().toISOString()
    };

    const summaries = {
      overview: '',
      development: ''
    };

    // 共通のフォーマット関数
    const formatFunctionHierarchy = (hierarchy) => {
      if (!hierarchy || typeof hierarchy !== 'object' || Object.keys(hierarchy).length === 0) {
        return '関数呼び出し階層を分析できませんでした';
      }

      let result = '';
      const processedFunctions = new Set();

      // エントリーポイント（他から呼ばれない関数）を探す
      const entryPoints = Object.keys(hierarchy).filter(func =>
        hierarchy[func] && hierarchy[func].calledBy && hierarchy[func].calledBy.length === 0
      );

      const buildTree = (func, depth = 0) => {
        if (processedFunctions.has(func) || depth > 3) return '';
        processedFunctions.add(func);

        const indent = '  '.repeat(depth);
        let tree = `${indent}- ${func} (${hierarchy[func].file})\n`;

        if (hierarchy[func] && hierarchy[func].calls) {
          hierarchy[func].calls.forEach(calledFunc => {
            if (hierarchy[calledFunc]) {
              tree += buildTree(calledFunc, depth + 1);
            }
          });
        }

        return tree;
      };

      entryPoints.forEach(entry => {
        result += buildTree(entry);
      });

      return result || '関数呼び出し階層を分析できませんでした';
    };

    // ファイル詳細をフォーマット
    const formatFileDetails = (fileAnalysis) => {
      return fileAnalysis.map(file => {
        const functions = file.functions.length > 0 ? file.functions.join(', ') : 'なし';
        const imports = file.imports.length > 0 ? file.imports.slice(0, 3).join(', ') : 'なし';
        return `**${file.path}** (${file.lines}行, ${file.size}バイト)\n  - 関数: ${functions}\n  - インポート: ${imports}`;
      }).join('\n\n');
    };

    // 技術スタックをフォーマット
    const formatTechStack = (techStack) => {
      let result = '';
      Object.entries(techStack).forEach(([category, items]) => {
        if (items.length > 0) {
          const categoryNames = {
            frontend: 'フロントエンド',
            music: '音楽・オーディオ',
            backend: 'バックエンド',
            development: '開発ツール',
            testing: 'テスト',
            buildTools: 'ビルドツール',
            languageFeatures: '言語機能',
            automation: '自動化・CI/CD',
            standards: '開発標準'
          };
          result += `**${categoryNames[category]}:**\n${items.map(item => `  - ${item}`).join('\n')}\n\n`;
        }
      });
      return result || '技術スタック情報を取得できませんでした';
    };

    // 1. プロジェクト概要生成（来訪者向け）
    const overviewPrompt = `
${prompts.overview}

以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: ${projectInfo.name}
説明: ${projectInfo.description}

依存関係:
${JSON.stringify(projectInfo.dependencies, null, 2)}

## 技術スタック
${formatTechStack(projectInfo.techStack)}

## ファイル階層ツリー
${projectInfo.fileTree}

## ファイル詳細分析
${formatFileDetails(projectInfo.fileAnalysis)}

## 関数呼び出し階層
${formatFunctionHierarchy(projectInfo.functionHierarchy)}

## プロジェクト構造（ファイル一覧）
${projectInfo.structure}

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく
`;

    // 2. 開発状況生成（開発者向け）
    const developmentPrompt = `
${prompts.development}

以下の開発状況情報を参考にして要約を生成してください：

## 現在のオープンIssues
${issues.length === 0 ? 'オープン中のIssueはありません' : issues.map(issue =>
  `[Issue #${issue.number}](issue-notes/${issue.number}.md): ${issue.title}\n${issue.body}\nラベル: ${issue.labels.join(', ')}`
).join('\n\n')}

## 最近の変更（過去7日間）
コミット履歴:
${recentChanges.commits.join('\n')}

変更されたファイル:
${recentChanges.changedFiles.join('\n')}

上記の情報を基に、プロンプトで指定された形式で開発状況を生成してください。
Issue番号を記載する際は、必ず [Issue #番号](issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。
`;

    try {
      // プロジェクト概要生成
      console.log('Generating project overview...');
      const overviewResult = await this.model.generateContent(overviewPrompt);
      summaries.overview = overviewResult.response.text();

      // 開発状況生成
      console.log('Generating development status...');
      const developmentResult = await this.model.generateContent(developmentPrompt);
      summaries.development = developmentResult.response.text();

      console.log('Both summaries generated successfully');
      return summaries;
    } catch (error) {
      console.error('Error generating summaries:', error.message);
      throw error;
    }
  }

  /**
   * 生成した2つの要約をファイルに保存
   */
  async saveSummaries(summaries) {
    const now = new Date();
    const jstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // JST変換
    const dateStr = jstDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = jstDate.toISOString().replace('T', ' ').split('.')[0]; // YYYY-MM-DD HH:mm:ss

    const summaryDir = path.join(this.projectRoot, 'generated-docs');

    // ディレクトリが存在しない場合は作成
    try {
      await fs.mkdir(summaryDir, { recursive: true });
    } catch (error) {
      // ディレクトリが既に存在する場合はエラーを無視
    }

    const filenames = [];

    // 1. プロジェクト概要を保存
    const overviewFilename = 'project-overview.md';
    const overviewPath = path.join(summaryDir, overviewFilename);
    const overviewContent = `Last updated: ${dateStr}

${summaries.overview}

---
Generated at: ${timeStr} JST
`;
    await fs.writeFile(overviewPath, overviewContent, 'utf-8');
    console.log(`Project overview saved to: generated-docs/${overviewFilename}`);
    filenames.push(overviewFilename);

    // 2. 開発状況を保存
    const developmentFilename = 'development-status.md';
    const developmentPath = path.join(summaryDir, developmentFilename);
    const developmentContent = `Last updated: ${dateStr}

${summaries.development}

---
Generated at: ${timeStr} JST
`;
    await fs.writeFile(developmentPath, developmentContent, 'utf-8');
    console.log(`Development status saved to: generated-docs/${developmentFilename}`);
    filenames.push(developmentFilename);

    return filenames;
  }

  /**
   * 詳細なファイル階層ツリーを生成
   */
  async getDetailedFileTree() {
    const excludeDirs = ['.git', 'node_modules', '.github'];
    const tree = [];

    const buildTree = async (dir, depth = 0) => {
      try {
        const items = await fs.readdir(path.join(this.projectRoot, dir));
        items.sort();

        for (const item of items) {
          if (excludeDirs.includes(item)) continue;

          const fullPath = path.join(dir, item);
          const absolutePath = path.join(this.projectRoot, fullPath);
          const indent = '  '.repeat(depth);

          try {
            const stat = await fs.stat(absolutePath);
            if (stat.isDirectory()) {
              tree.push(`${indent}📁 ${item}/`);
              await buildTree(fullPath, depth + 1);
            } else {
              const ext = path.extname(item);
              const icon = this.getFileIcon(ext);
              tree.push(`${indent}${icon} ${item}`);
            }
          } catch (error) {
            continue;
          }
        }
      } catch (error) {
        // ディレクトリ読み取りエラーをスキップ
      }
    };

    await buildTree('.');
    return tree.join('\n');
  }

  /**
   * ファイル拡張子に応じたアイコンを取得
   */
  getFileIcon(ext) {
    const icons = {
      '.js': '📜',
      '.ts': '📘',
      '.json': '📊',
      '.md': '📖',
      '.html': '🌐',
      '.css': '🎨',
      '.pegjs': '📝'
    };
    return icons[ext] || '📄';
  }

  /**
   * 全ファイルの詳細分析
   */
  async analyzeAllFiles() {
    const extensions = ['.js', '.ts', '.pegjs', '.html', '.css'];
    const excludeDirs = ['.git', 'node_modules', '.github'];
    const fileAnalysis = [];

    const analyzeFiles = async (dir) => {
      try {
        const items = await fs.readdir(path.join(this.projectRoot, dir));

        for (const item of items) {
          const fullPath = path.join(dir, item);
          const absolutePath = path.join(this.projectRoot, fullPath);

          if (excludeDirs.includes(item)) continue;

          try {
            const stat = await fs.stat(absolutePath);
            if (stat.isDirectory()) {
              await analyzeFiles(fullPath);
            } else if (stat.isFile()) {
              const ext = path.extname(item);
              if (extensions.includes(ext)) {
                const analysis = await this.analyzeFile(absolutePath, fullPath);
                if (analysis) {
                  fileAnalysis.push(analysis);
                }
              }
            }
          } catch (error) {
            continue;
          }
        }
      } catch (error) {
        // ディレクトリ読み取りエラーをスキップ
      }
    };

    await analyzeFiles('.');
    return fileAnalysis;
  }

  /**
   * 個別ファイルの分析
   */
  async analyzeFile(absolutePath, relativePath) {
    try {
      const content = await fs.readFile(absolutePath, 'utf-8');
      const ext = path.extname(relativePath);

      const analysis = {
        path: relativePath.replace(/\\/g, '/'),
        size: content.length,
        lines: content.split('\n').length,
        functions: [],
        imports: [],
        exports: []
      };

      if (ext === '.js' || ext === '.ts') {
        analysis.functions = this.extractJavaScriptFunctions(content);
        analysis.imports = this.extractImports(content);
        analysis.exports = this.extractExports(content);
      } else if (ext === '.pegjs') {
        analysis.functions = this.extractPegJSRules(content);
      }

      return analysis;
    } catch (error) {
      return null;
    }
  }

  /**
   * JavaScript/TypeScript関数を抽出
   */
  extractJavaScriptFunctions(content) {
    const functions = [];

    // 関数宣言のパターン
    const patterns = [
      /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)/g,
      /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s+)?function/g,
      /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>/g,
      /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*{/g,
      /async\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && !functions.includes(match[1])) {
          functions.push(match[1]);
        }
      }
    });

    return functions;
  }

  /**
   * import文を抽出
   */
  extractImports(content) {
    const imports = [];
    const importPattern = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
    const requirePattern = /require\(['"`]([^'"`]+)['"`]\)/g;

    let match;
    while ((match = importPattern.exec(content)) !== null) {
      imports.push(match[1]);
    }
    while ((match = requirePattern.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  /**
   * export文を抽出
   */
  extractExports(content) {
    const exports = [];
    const exportPattern = /export\s+(?:default\s+)?(?:function\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    const moduleExportsPattern = /module\.exports\s*=\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    let match;
    while ((match = exportPattern.exec(content)) !== null) {
      exports.push(match[1]);
    }
    while ((match = moduleExportsPattern.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  /**
   * PegJSルールを抽出
   */
  extractPegJSRules(content) {
    const rules = [];
    const rulePattern = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/gm;

    let match;
    while ((match = rulePattern.exec(content)) !== null) {
      rules.push(match[1]);
    }

    return rules;
  }

  /**
   * 関数呼び出し階層を分析
   */
  async analyzeFunctionCallHierarchy(fileAnalysis) {
    const hierarchy = {};

    // 各ファイルの関数について、どの関数を呼び出しているかを分析
    for (const file of fileAnalysis) {
      try {
        const content = await fs.readFile(path.join(this.projectRoot, file.path), 'utf-8');

        for (const func of file.functions) {
          if (!hierarchy[func]) {
            hierarchy[func] = {
              file: file.path,
              calls: [],
              calledBy: []
            };
          }

          // この関数が呼び出している他の関数を検索
          const allFunctions = fileAnalysis.flatMap(f => f.functions);
          allFunctions.forEach(targetFunc => {
            if (targetFunc !== func && content.includes(targetFunc + '(')) {
              if (!hierarchy[func].calls.includes(targetFunc)) {
                hierarchy[func].calls.push(targetFunc);
              }

              if (!hierarchy[targetFunc]) {
                hierarchy[targetFunc] = { file: '', calls: [], calledBy: [] };
              }
              if (!hierarchy[targetFunc].calledBy.includes(func)) {
                hierarchy[targetFunc].calledBy.push(func);
              }
            }
          });
        }
      } catch (error) {
        continue;
      }
    }

    return hierarchy;
  }

  /**
   * メイン実行関数
   */
  async run() {
    try {
      console.log('Starting project summary generation...');

      // 環境変数チェック
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
      }

      // 過去24時間のユーザーコミットチェック
      const hasUserCommits = await this.hasUserCommitsInLast24Hours();
      if (!hasUserCommits) {
        console.log('No user commits in the last 24 hours. Skipping summary generation.');
        return;
      }

      // データ収集
      console.log('Collecting project data...');
      const [projectInfo, issues, recentChanges, prompts] = await Promise.all([
        this.collectProjectInfo(),
        this.collectIssues(),
        this.collectRecentChanges(),
        this.loadPrompts()
      ]);

      // Octokitのインストールが必要な場合のハンドリング
      if (issues.length === 0 && !process.env.GITHUB_TOKEN) {
        console.warn('GITHUB_TOKEN not set, skipping Issues collection');
      }

      // テキスト生成
      const summaries = await this.generateSummaries(projectInfo, issues, recentChanges, prompts);

      // ファイル保存
      const filenames = await this.saveSummaries(summaries);

      console.log('Project summary generation completed successfully!');
      console.log(`Generated files: ${filenames.join(', ')}`);
      return filenames;

    } catch (error) {
      console.error('Project summary generation failed:', error.message);
      if (error.response) {
        console.error('API Response:', error.response);
      }
      process.exit(1);
    }
  }
}

// メイン処理実行
const generator = new ProjectSummaryGenerator();
generator.run();
