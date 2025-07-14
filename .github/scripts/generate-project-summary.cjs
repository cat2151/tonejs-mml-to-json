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
      dependencies: {}
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

    return projectInfo;
  }

  /**
   * プロジェクト構造を取得（クロスプラットフォーム対応）
   */
  async getProjectStructure() {
    const extensions = ['.js', '.ts', '.json', '.md'];
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
                if (files.length >= 20) break; // 最大20ファイル
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
      const { Octokit } = await import('@octokit/rest');
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
  async loadPrompt() {
    try {
      const promptPath = path.join(this.projectRoot, '.github/prompts/project-summary-prompt.md');
      return await fs.readFile(promptPath, 'utf-8');
    } catch (error) {
      console.warn('Could not read prompt file:', error.message);
      return `プロジェクトを3行で要約し、現在のissuesを3行で要約し、次の一手の候補を3つリストしてください。`;
    }
  }

  /**
   * Gemini APIを使ってテキスト生成
   */
  async generateSummary(projectInfo, issues, recentChanges, promptTemplate) {
    console.log('Generating summary with Gemini API...');

    const contextData = {
      projectInfo,
      issues,
      recentChanges,
      timestamp: new Date().toISOString()
    };

    const prompt = `
${promptTemplate}

以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: ${projectInfo.name}
説明: ${projectInfo.description}

依存関係:
${JSON.stringify(projectInfo.dependencies, null, 2)}

プロジェクト構造:
${projectInfo.structure}

## 現在のオープンIssues
${issues.length === 0 ? 'オープン中のIssueはありません' : issues.map(issue =>
  `#${issue.number}: ${issue.title}\n${issue.body}\nラベル: ${issue.labels.join(', ')}`
).join('\n\n')}

## 最近の変更（過去7日間）
コミット履歴:
${recentChanges.commits.join('\n')}

変更されたファイル:
${recentChanges.changedFiles.join('\n')}

上記の情報を基に、プロンプトで指定された形式で要約を生成してください。
`;

    try {
      const result = await this.model.generateContent(prompt);
      const generatedText = result.response.text();

      console.log('Summary generated successfully');
      return generatedText;
    } catch (error) {
      console.error('Error generating summary:', error.message);
      throw error;
    }
  }

  /**
   * 生成した要約をファイルに保存
   */
  async saveSummary(summary) {
    const now = new Date();
    const jstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // JST変換
    const dateStr = jstDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = jstDate.toISOString().replace('T', ' ').split('.')[0]; // YYYY-MM-DD HH:mm:ss

    const filename = `project-summary.md`;
    const summaryPath = path.join(this.projectRoot, 'generated-docs', filename);

    const content = `# Project Summary

Last updated: ${dateStr}

${summary}

---
Generated at: ${timeStr} JST
`;

    await fs.writeFile(summaryPath, content, 'utf-8');
    console.log(`Summary saved to: generated-docs/${filename}`);

    return filename;
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
      const [projectInfo, issues, recentChanges, promptTemplate] = await Promise.all([
        this.collectProjectInfo(),
        this.collectIssues(),
        this.collectRecentChanges(),
        this.loadPrompt()
      ]);

      // Octokitのインストールが必要な場合のハンドリング
      if (issues.length === 0 && !process.env.GITHUB_TOKEN) {
        console.warn('GITHUB_TOKEN not set, skipping Issues collection');
      }

      // テキスト生成
      const summary = await this.generateSummary(projectInfo, issues, recentChanges, promptTemplate);

      // ファイル保存
      const filename = await this.saveSummary(summary);

      console.log('Project summary generation completed successfully!');
      return filename;

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
