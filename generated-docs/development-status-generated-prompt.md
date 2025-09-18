Last updated: 2025-09-19

# 開発状況生成プロンプト（開発者向け）

## 生成するもの：
- 現在openされているissuesを3行で要約する
- 次の一手の候補を3つlistする
- 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く

## 生成しないもの：
- 「今日のissue目標」などuserに提案するもの
  - ハルシネーションの温床なので生成しない
- ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
- プロジェクト構造情報（来訪者向け情報のため、別ファイルで管理）

## 「Agent実行プロンプト」生成ガイドライン：
「Agent実行プロンプト」作成時は以下の要素を必ず含めてください：

### 必須要素
1. **対象ファイル**: 分析/編集する具体的なファイルパス
2. **実行内容**: 具体的な分析や変更内容（「分析してください」ではなく「XXXファイルのYYY機能を分析し、ZZZの観点でmarkdown形式で出力してください」）
3. **確認事項**: 変更前に確認すべき依存関係や制約
4. **期待する出力**: markdown形式での結果や、具体的なファイル変更

### Agent実行プロンプト例

**良い例（上記「必須要素」4項目を含む具体的なプロンプト形式）**:
```
対象ファイル: `.github/workflows/translate-readme.yml`と`.github/workflows/call-translate-readme.yml`

実行内容: 対象ファイルについて、外部プロジェクトから利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
1) 必須入力パラメータ（target-branch等）
2) 必須シークレット（GEMINI_API_KEY）
3) ファイル配置の前提条件（README.ja.mdの存在）
4) 外部プロジェクトでの利用時に必要な追加設定

確認事項: 作業前に既存のworkflowファイルとの依存関係、および他のREADME関連ファイルとの整合性を確認してください。

期待する出力: 外部プロジェクトがこの`call-translate-readme.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
```

**避けるべき例**:
- callgraphについて調べてください
- ワークフローを分析してください
- issue-noteの処理フローを確認してください

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Development Status

## 現在のIssues
[以下の形式で3行でオープン中のissuesを要約。issue番号を必ず書く]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 次の一手候補
1. [候補1のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

2. [候補2のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

3. [候補3のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```
```


# 開発状況情報
- 以下の開発状況情報を参考にしてください。
- Issue番号を記載する際は、必ず [Issue #番号](../issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。

## プロジェクトのファイル一覧
- .editorconfig
- .github/actions-tmp/.github/workflows/call-callgraph.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/translate-readme.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/callgraph.ql
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/codeql-pack.lock.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/qlpack.yml
- .github/actions-tmp/.github_automation/callgraph/config/example.json
- .github/actions-tmp/.github_automation/callgraph/docs/callgraph.md
- .github/actions-tmp/.github_automation/callgraph/presets/callgraph.js
- .github/actions-tmp/.github_automation/callgraph/presets/style.css
- .github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/callgraph-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-codeql-exists.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-commits.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md
- .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md
- .github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md
- .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/GitUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/generate-project-summary.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/CodeAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectAnalysisOrchestrator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataCollector.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataFormatter.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectOverviewGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/TechStackAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/BaseGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/FileSystemUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/ProjectFileUtils.cjs
- .github/actions-tmp/.github_automation/translate/docs/TRANSLATION_SETUP.md
- .github/actions-tmp/.github_automation/translate/scripts/translate-readme.cjs
- .github/actions-tmp/.gitignore
- .github/actions-tmp/.vscode/settings.json
- .github/actions-tmp/LICENSE
- .github/actions-tmp/README.ja.md
- .github/actions-tmp/README.md
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/issue-notes/10.md
- .github/actions-tmp/issue-notes/11.md
- .github/actions-tmp/issue-notes/12.md
- .github/actions-tmp/issue-notes/13.md
- .github/actions-tmp/issue-notes/14.md
- .github/actions-tmp/issue-notes/15.md
- .github/actions-tmp/issue-notes/16.md
- .github/actions-tmp/issue-notes/17.md
- .github/actions-tmp/issue-notes/18.md
- .github/actions-tmp/issue-notes/19.md
- .github/actions-tmp/issue-notes/2.md
- .github/actions-tmp/issue-notes/20.md
- .github/actions-tmp/issue-notes/21.md
- .github/actions-tmp/issue-notes/22.md
- .github/actions-tmp/issue-notes/23.md
- .github/actions-tmp/issue-notes/24.md
- .github/actions-tmp/issue-notes/25.md
- .github/actions-tmp/issue-notes/26.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/codeql-queries/callgraph.ql
- .github/codeql-queries/codeql-pack.lock.yml
- .github/codeql-queries/qlpack.yml
- .github/docs/callgraph.md
- .github/scripts/callgraph-utils.cjs
- .github/scripts/callgraph_enhanced/analyze-codeql.cjs
- .github/scripts/callgraph_enhanced/check-codeql-exists.cjs
- .github/scripts/callgraph_enhanced/check-commits.cjs
- .github/scripts/callgraph_enhanced/check-node-version.cjs
- .github/scripts/callgraph_enhanced/copy-commit-results.cjs
- .github/scripts/callgraph_enhanced/find-process-results.cjs
- .github/scripts/callgraph_enhanced/generate-html-graph.cjs
- .github/scripts/callgraph_enhanced/generateHTML.cjs
- .github/scripts/enhanced-convert-to-html.cjs
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/callgraph_enhanced.yml
- .github/workflows/issue-note.yml
- .github/workflows/translate-readme.yml
- .gitignore
- LICENSE
- README.ja.md
- README.md
- dev-setup/README.md
- dev-setup/setup.js
- generated-docs/callgraph-enhanced.html
- generated-docs/callgraph.js
- generated-docs/style.css
- index.html
- issue-notes/1.md
- issue-notes/10.md
- issue-notes/11.md
- issue-notes/12.md
- issue-notes/13.md
- issue-notes/14.md
- issue-notes/15.md
- issue-notes/16.md
- issue-notes/17.md
- issue-notes/18.md
- issue-notes/2.md
- issue-notes/20.md
- issue-notes/3.md
- issue-notes/4.md
- issue-notes/5.md
- issue-notes/6.md
- issue-notes/7.md
- issue-notes/8.md
- issue-notes/9.md
- package.json
- pnpm-lock.yaml
- src/grammar.js
- src/grammar.pegjs
- src/index.html
- src/main.js
- src/mml2json.js
- src/play.js
- test/parser.test.js
- vitest.config.js

## 現在のオープンIssues
## [Issue #18](../issue-notes/18.md): GitHub Actions「project概要生成」を共通ワークフロー化する
[issue-notes/18.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/18.md)

...
ラベル: 
--- issue-notes/18.md の内容 ---

```markdown
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #18
[issues #18](https://github.com/cat2151/tonejs-mml-to-json/issues/18)

# close条件
- project概要生成を、github-actions リポジトリの共通ワークフローを呼び出すことで実現すること

# 課題
- どのリポジトリのどのymlファイルか？の可視化がされていない
  - 対策案
    - まずここに可視化する
  - `github-actions/.github/workflows/call-daily-project-summary.yml`

# どうする？
- call版を持ってくる
  - github-actions リポジトリの共通ワークフローを持ってくるということ
- 持ってくるときに課題があればこのmdの課題コーナーに可視化すること
  - 例、手順がわからない等

# 持ってきた
- どうする？
  - 上記を整頓する
  - 日次バッチでtestする

# 結果
- エラー
  - `Issueノートが存在しません: /home/runner/work/tonejs-mml-to-json/tonejs-mml-to-json/.github/actions-tmp/issue-notes/6.md`
  - 分析
    - 共通workflow側のissue-notesを参照してしまっている。バグである
  - 対策
    - 共通workflow側を修正する。共通workflow側にissue作成する
- issue作成して修正したつもり
  - 次の日次バッチでtestする

```

## [Issue #16](../issue-notes/16.md): GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する
[issue-notes/16.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/16.md)

...
ラベル: 
--- issue-notes/16.md の内容 ---

```markdown
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #16
[issues #16](https://github.com/cat2151/tonejs-mml-to-json/issues/16)



```

## [Issue #9](../issue-notes/9.md): pnpm watchを、VSCodeを起動したら自動で実行開始させる
[issue-notes/9.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/9.md)

...
ラベル: 
--- issue-notes/9.md の内容 ---

```markdown
# issue pnpm watchを、VSCodeを起動したら自動で実行開始させる #9
[issues #9](https://github.com/cat2151/tonejs-mml-to-json/issues/9)

- これまでの課題
  - 手動でwatchを入力するのは手間
- 対策
  - VSCodeでprojectを開いたら自動watchがよい
    - VSCodeはprojectを開いたときにscriptの自動実行ができる
      - そのproject設定をgit管理できる

- 状況
  - 既存のmml2abc/chord2mmlにあるか失念した
  - その調査からやる
  - 試しにagentにきいてみる

```

## [Issue #8](../issue-notes/8.md): pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
[issue-notes/8.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/8.md)

...
ラベル: 
--- issue-notes/8.md の内容 ---

```markdown
# issue pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする #8
[issues #8](https://github.com/cat2151/tonejs-mml-to-json/issues/8)

- これまでの課題
  - TDDのサイクルが手間
    - PEGを更新
    - 手動build
    - 手動test
    - ※watchの対象が、vitest対象jsなので、
      - PEGファイルを更新しても、自動buildと自動testがされないので
- 対策
  - こうする
    - PEGを更新
    - 自動build
    - 自動test
    - ブラウザのホットリロード or ライブリロード
  - 方法
    - 既存のmml2abc/chord2mmlから持ってくるつもり

```

## [Issue #7](../issue-notes/7.md): ast2jsonのTDD準備をする
[issue-notes/7.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/7.md)

...
ラベル: 
--- issue-notes/7.md の内容 ---

```markdown
# issue ast2jsonのTDD準備をする #7
[issues #7](https://github.com/cat2151/tonejs-mml-to-json/issues/7)

- issueの狙い
  - mml2ast にするのは確定
    - 根拠はmml2abc/chord2mml
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度に投げずに、ここまで分解してからやるのを試す
- 方法
  - 前提
    - 仮ast仕様ができており、mml2astのTDDがある程度test greenであること
      - それより早期に始めてしまうと手戻りの確率が高い
    - mml2jsonのTDD test caseが作成済みであること
      - ※ast2jsoのtest caseのexpectsに利用する用
  - 仮ast仕様を元に、今のコードベースのjson生成結果から、TDDを書く
    - 実際には、mml2jsonのTDD test caseをexpectsに利用するつもり

```

## [Issue #6](../issue-notes/6.md): mml2astのTDD準備をする
[issue-notes/6.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/6.md)

...
ラベル: 
--- issue-notes/6.md の内容 ---

```markdown
# issue mml2astのTDD準備をする #6
[issues #6](https://github.com/cat2151/tonejs-mml-to-json/issues/6)

- issueの狙い
  - mml2ast にするのは確定
    - 根拠はmml2abc/chord2mml
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度にげずに、ここまで分解してからやるのを試す

```

## [Issue #5](../issue-notes/5.md): mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる
[issue-notes/5.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/5.md)

...
ラベル: 
--- issue-notes/5.md の内容 ---

```markdown
# issue mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる #5
[issues #5](https://github.com/cat2151/tonejs-mml-to-json/issues/5)

- issueの狙い
  - 好奇心、LLMがどれくらいスムーズに動作するか
  - 手でtest case書くより速そう
  - test caseレビューがスムーズそう
    - 想定は、test case 1つのみが正しく生成されること
      - 今のsampleを実行すれば、in/outがすべて得られるので、それを使う
  - agentに生成させたものがミスっていても、test caseの枠組みが生成できていればよい
    - 現在できてるのは str to strのtest caseである
      - str to object のcaseが生成できていればよい
  - test redである想定
  - mml2astのtestは、別途ゼロから検討しなおせばよいので気にしない
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度に投げずに、ここまで分解してからやるのを試す

```

## [Issue #3](../issue-notes/3.md): TDDにより、MML c を、tonejs-json-sequencerが演奏できる形式に変換、を実現する
[issue-notes/3.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/3.md)

...
ラベル: 
--- issue-notes/3.md の内容 ---

```markdown
# issue TDDにより、MML c を、tonejs-json-sequencerが演奏できる形式に変換、を実現する #3
[issues #3](https://github.com/cat2151/tonejs-mml-to-json/issues/3)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
```yml
name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml@main
    # uses: ./.github/workflows/daily-project-summary.yml # ローカルでのテスト用
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

```

### .github/workflows/call-daily-project-summary.yml
```yml
name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml@main
    # uses: ./.github/workflows/daily-project-summary.yml # ローカルでのテスト用
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

```

### .github/actions-tmp/.github/workflows/daily-project-summary.yml
```yml
name: Daily Project Summary
on:
  workflow_call:
    secrets:
      GEMINI_API_KEY:
        required: true
env:
  TMP_DIR: .github/actions-tmp
  SCRIPT_DIR: .github/actions-tmp/.github_automation/project_summary/scripts
  PROMPT_DIR: .github/actions-tmp/.github_automation/project_summary/prompts
  DOCS_DIR: generated-docs
  OVERVIEW_PROMPT: project-overview-prompt.md
  DEVELOPMENT_STATUS_BASE_PROMPT: development-status-prompt.md
  OUT_OVERVIEW: project-overview.md
  OUT_DEVELOPMENT_STATUS: development-status.md
  OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT: development-status-generated-prompt.md

jobs:
  generate-summary:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      issues: read
      pull-requests: read

    steps:
      - name: Checkout repository # サマリ対象を取得するため、呼び出し元リポジトリをcheckout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0  # 履歴を取得するため

      - name: Checkout shared github-actions repo # スクリプトを取得するため、共有のgithub-actionsリポジトリをcheckout
        uses: actions/checkout@v4
        with:
          repository: cat2151/github-actions
          path: ${{ env.TMP_DIR }}
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          mkdir -p ${{ env.TMP_DIR }}
          cd ${{ env.TMP_DIR }}
          npm init -y
          npm install @google/generative-ai @octokit/rest

      - name: remove generated files # こうしないと生成ミスを検知できない
        run: |
          rm -f ${{ env.DOCS_DIR }}/${{ env.OUT_OVERVIEW }}
          rm -f ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS }}
          rm -f ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }}

      - name: Generate project summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          NODE_PATH: ${{ env.TMP_DIR }}/node_modules
        run: |
          mkdir -p ${{ env.DOCS_DIR }}
          node ${{ env.SCRIPT_DIR }}/generate-project-summary.cjs \
            ${{ env.PROMPT_DIR }}/${{ env.OVERVIEW_PROMPT }} \
            ${{ env.PROMPT_DIR }}/${{ env.DEVELOPMENT_STATUS_BASE_PROMPT }} \
            ${{ env.DOCS_DIR }}/${{ env.OUT_OVERVIEW }} \
            ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS }} \
            ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }} \
            ${{ github.workspace }}

      - name: Verify generated files # 生成後のtimestampやfilesizeのチェック用
        run: |
          ls -la ${{ env.DOCS_DIR }}/${{ env.OUT_OVERVIEW }}
          ls -la ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS }}
          ls -la ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }}

      - name: Check for generated summaries
        id: check_summaries
        run: |
          if [ -f "${{ env.DOCS_DIR }}/${{ env.OUT_OVERVIEW }}" ] && [ -f "${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS }}" ] && [ -f "${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }}" ]; then
            echo "summaries_generated=true" >> $GITHUB_OUTPUT
          else
            echo "summaries_generated=false" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push summaries
        if: steps.check_summaries.outputs.summaries_generated == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add ${{ env.DOCS_DIR }}/${{ env.OUT_OVERVIEW }}
          git add ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS }}
          git add ${{ env.DOCS_DIR }}/${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }}
          if git diff --cached --quiet; then
            echo "No changes to commit"
          else
            git commit -m "Update project summaries (overview & development status)"
            git push
          fi

      - name: Summary generation result
        run: |
          if [ "${{ steps.check_summaries.outputs.summaries_generated }}" == "true" ]; then
            echo "✅ Project summaries updated successfully"
            echo "📊 Generated: ${{ env.OUT_OVERVIEW }} & ${{ env.OUT_DEVELOPMENT_STATUS }} & ${{ env.OUT_DEVELOPMENT_STATUS_GENERATED_PROMPT }}"
          else
            echo "ℹ️ No summaries generated (likely no user commits in the last 24 hours)"
          fi

```

### .github/actions-tmp/issue-notes/16.md
```md
# issue issue-note / project-summary / translate / callgraph をtonejs-mml-to-jsonから呼び出す #16
[issues #16](https://github.com/cat2151/github-actions/issues/16)

# これまでの課題
- issue issue-note / project-summary / translate / callgraph は、github-actions リポジトリ上ではtest greenである。
- だが他のリポジトリにおいて動作するか？が可視化不足である。

# 対策
- issue-note / project-summary / translate / callgraph をtonejs-mml-to-jsonから呼び出す
- 詳しく
    - まず、現状、tonejs-mml-to-json でその4つのworkflowがどうなっているか、このmdに可視化する
    - 例えば、既に呼び出している、呼び出していない、tonejs-mml-to-jsonにある古いworkflowを呼び出している

# 調査結果
- まず、現状、tonejs-mml-to-json でその4つのworkflowがどうなっているか、このmdに可視化する
    - 結果：
        - issue-note
            - tonejs-mml-to-jsonにある古いworkflowを呼び出している
        - project-summary
            - tonejs-mml-to-jsonにある古いworkflowを呼び出している
        - translate
            - tonejs-mml-to-jsonにある古いworkflowを呼び出している
        - callgraph
            - tonejs-mml-to-jsonにある古いworkflowを呼び出している

# どうする？
- issue-note
    - github-actions リポジトリにある、call-issue-note.yml をcpして使うようにする、まず単純cpして動くかを確認する
- project-summary
    - github-actions リポジトリにある、call-daily-project-summary.yml をcpして使うようにする、まず単純cpして動くかを確認する
- translate
    - github-actions リポジトリにある、call-translate-readme.yml をcpして使うようにする、まず単純cpして動くかを確認する
- callgraph
    - github-actions リポジトリにある、call-callgraph.yml をcpして使うようにする、まず単純cpして動くかを確認する

```

### issue-notes/16.md
```md
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #16
[issues #16](https://github.com/cat2151/tonejs-mml-to-json/issues/16)



```

### .github/actions-tmp/issue-notes/18.md
```md
# issue DevelopmentStatusGenerator.cjs 内に、Geminiに与えるpromptがハードコーディングされてしまっている #18
[issues #18](https://github.com/cat2151/github-actions/issues/18)

# 何が困るの？
- project把握しづらい。どこにpromptが書いてあるのか、把握しづらい。
- prompts/ にほかのpromptがあるため、方針がブレていると、読みづらい。
- 備忘、いくらテンプレートリテラルとプレースホルダーで密結合しているからとはいえ、ハードコーディングはNG。
    - それらはreplaceを使う等で楽に切り出しできるので。

# 問題のcjsの場所は？
- ファイルパス : .github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- 関数 : generateDevelopmentStatus

# 結果
- Geminiに生成させたpromptを、agentに投げて、リファクタリングさせてみた
- ハルシネーションした。使い物にならなかった
- 人力でやる

# 結果
- test green

# closeとする


```

### issue-notes/18.md
```md
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #18
[issues #18](https://github.com/cat2151/tonejs-mml-to-json/issues/18)

# close条件
- project概要生成を、github-actions リポジトリの共通ワークフローを呼び出すことで実現すること

# 課題
- どのリポジトリのどのymlファイルか？の可視化がされていない
  - 対策案
    - まずここに可視化する
  - `github-actions/.github/workflows/call-daily-project-summary.yml`

# どうする？
- call版を持ってくる
  - github-actions リポジトリの共通ワークフローを持ってくるということ
- 持ってくるときに課題があればこのmdの課題コーナーに可視化すること
  - 例、手順がわからない等

# 持ってきた
- どうする？
  - 上記を整頓する
  - 日次バッチでtestする

# 結果
- エラー
  - `Issueノートが存在しません: /home/runner/work/tonejs-mml-to-json/tonejs-mml-to-json/.github/actions-tmp/issue-notes/6.md`
  - 分析
    - 共通workflow側のissue-notesを参照してしまっている。バグである
  - 対策
    - 共通workflow側を修正する。共通workflow側にissue作成する
- issue作成して修正したつもり
  - 次の日次バッチでtestする

```

### .github/actions-tmp/issue-notes/3.md
```md
# issue GitHub Actions「issue note生成」を共通ワークフロー化する #3
[issues #3](https://github.com/cat2151/github-actions/issues/3)

- 前提
  - userは、translateのworkflowを共通ワークフロー化し、動くようにしたので、共通ワークフロー化の知識がある
  - よって、今回は、promptでplanさせ、そのplanをuserがレビューし、planの改善を指示できるので、ハルシネーションのリスクを下げることができる

- prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlはまだ共通ワークフロー化されず、
呼び出し元からコピーされたままの状態です。
このymlファイル名のまま、
中身を共通ワークフロー化してください。
呼び出し元ymlは別途書きますので気にしないでください。
まずplanしてください
```

- plan 生成結果
```
共通ワークフロー化のためのplanは以下の通りです。

1. 目的
現在の issue-note.yml を「共通ワークフロー」として再設計し、他リポジトリや他ワークフローから workflow_call で呼び出せるようにする。
2. 主な変更点
on: トリガーを workflow_call に変更（直接イベントで起動しない）。
必要な入力（inputs）やシークレット（secrets）を workflow_call セクションで定義。
github.event.issue などのイベント依存部分を、inputs経由で受け取る形に修正。
既存の処理（issueノート生成、コミット、issue body更新）はそのまま活かすが、パラメータ化する。
3. 具体的な修正内容
on: issues: → on: workflow_call: に変更。
inputs で必要な値（例: issue_title, issue_number, issue_body, issue_url など）を受け取る。
スクリプト内の ${{ github.event.issue.xxx }} を ${{ inputs.xxx }} に置換。
github-script ステップも同様にinputsを参照。
必要に応じて secrets も workflow_call で受け取れるようにする。
4. ファイル名・配置
ファイル名はそのまま issue-note.yml。
配置場所は workflows でOK（共通ワークフローとしてもこの場所で良い）。
5. 呼び出し元への影響
呼び出し元ワークフローで uses: <repo>/.github/workflows/issue-note.yml@main のように参照し、inputsを渡す形になる。
このplanで進めます。次に、実際の共通ワークフロー化のためのyml修正案を作成しますか？
```

- userがplanレビューし、OKを出した
- agentに生成結果ymlをレビューさせた、OKとなった
  - userはこのレビューは認知負荷が高いのでskipとする（単純な細かい間違い探し作業になるので、それはagentに任せた）
-  エラー。呼び出し元ymlのエラーがあり修正。共通ワークフローのエラー指摘があり、共通ワークフロー側の修正が必要となった
```
原因の分析：

呼び出し元（tonejs-mml-to-jsonのissue-note.yml）は、reusable workflow（cat2151/github-actions/.github/workflows/issue-note.yml@main）をusesで呼び出し、inputsをwithで渡しています。
共通ワークフロー（reusable workflow）は inputs を workflow_call で受け取り、各ステップで ${{ inputs.xxx }} で参照しています。
しかし、エラーが発生したのは actions/github-script@v7 の script 内です。
エラーの本質的な原因：

actions/github-script の script: で ${{ inputs.issue_number }} のような式を直接 JavaScript テンプレートリテラル内で使っていますが、これはサポートされていません。
script: の中は JavaScript であり、YAMLの ${{ ... }} は展開されません（または意図通りに展開されません）。
そのため、inputs 変数は script 内の JavaScript で未定義となり、ReferenceError になります。
正しい書き方：

actions/github-script の script: でワークフローの inputs を使いたい場合は、with: で input を environment 変数や script の引数として渡し、JavaScript で process.env から取得するか、github-script の input 機能を使う必要があります。
例（修正版）：

このように、inputs の値を env で渡し、script 内では process.env で参照してください。

まとめ：

actions/github-script の script 内で ${{ inputs.xxx }} を直接使うと ReferenceError になる
env: で値を渡し、process.env で参照するのが正しい
修正が必要です。修正版のワークフローが必要な場合はお知らせください。
```

- test green
- closeとする

```

### issue-notes/3.md
```md
# issue TDDにより、MML c を、tonejs-json-sequencerが演奏できる形式に変換、を実現する #3
[issues #3](https://github.com/cat2151/tonejs-mml-to-json/issues/3)



```

### .github/actions-tmp/issue-notes/7.md
```md
# issue issue note生成できるかのtest用 #7
[issues #7](https://github.com/cat2151/github-actions/issues/7)

- 生成できた
- closeとする

```

### issue-notes/7.md
```md
# issue ast2jsonのTDD準備をする #7
[issues #7](https://github.com/cat2151/tonejs-mml-to-json/issues/7)

- issueの狙い
  - mml2ast にするのは確定
    - 根拠はmml2abc/chord2mml
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度に投げずに、ここまで分解してからやるのを試す
- 方法
  - 前提
    - 仮ast仕様ができており、mml2astのTDDがある程度test greenであること
      - それより早期に始めてしまうと手戻りの確率が高い
    - mml2jsonのTDD test caseが作成済みであること
      - ※ast2jsoのtest caseのexpectsに利用する用
  - 仮ast仕様を元に、今のコードベースのjson生成結果から、TDDを書く
    - 実際には、mml2jsonのTDD test caseをexpectsに利用するつもり

```

### .github/actions-tmp/issue-notes/8.md
```md
# issue 関数コールグラフhtmlビジュアライズ生成の対象ソースファイルを、呼び出し元ymlで指定できるようにする #8
[issues #8](https://github.com/cat2151/github-actions/issues/8)

# これまでの課題
- 以下が決め打ちになっていた
```
  const allowedFiles = [
    'src/main.js',
    'src/mml2json.js',
    'src/play.js'
  ];
```

# 対策
- 呼び出し元ymlで指定できるようにする

# agent
- agentにやらせることができれば楽なので、初手agentを試した
- 失敗
    - ハルシネーションしてscriptを大量破壊した
- 分析
    - 修正対象scriptはagentが生成したもの
    - 低品質な生成結果でありソースが巨大
    - ハルシネーションで破壊されやすいソース
    - AIの生成したソースは、必ずしもAIフレンドリーではない

# 人力リファクタリング
- 低品質コードを、最低限agentが扱えて、ハルシネーションによる大量破壊を防止できる内容、にする
- 手短にやる
    - そもそもビジュアライズは、agentに雑に指示してやらせたもので、
    - 今後別のビジュアライザを選ぶ可能性も高い
    - 今ここで手間をかけすぎてコンコルド効果（サンクコストバイアス）を増やすのは、project群をトータルで俯瞰して見たとき、損
- 対象
    - allowedFiles のあるソース
        - callgraph-utils.cjs
            - たかだか300行未満のソースである
            - この程度でハルシネーションされるのは予想外
            - やむなし、リファクタリングでソース分割を進める

# agentに修正させる
## prompt
```
allowedFilesを引数で受け取るようにしたいです。
ないならエラー。
最終的に呼び出し元すべてに波及して修正したいです。

呼び出し元をたどってエントリポイントも見つけて、
エントリポイントにおいては、
引数で受け取ったjsonファイル名 allowedFiles.js から
jsonファイル allowedFiles.jsonの内容をreadして
変数 allowedFilesに格納、
後続処理に引き渡す、としたいです。

まずplanしてください。
planにおいては、修正対象のソースファイル名と関数名を、呼び出し元を遡ってすべて特定し、listしてください。
```

# 修正が順調にできた
- コマンドライン引数から受け取る作りになっていなかったので、そこだけ指示して修正させた
- yml側は人力で修正した

# 他のリポジトリから呼び出した場合にバグらないよう修正する
- 気付いた
    - 共通ワークフローとして他のリポジトリから使った場合はバグるはず。
        - ymlから、共通ワークフロー側リポジトリのcheckoutが漏れているので。
- 他のyml同様に修正する
- あわせて全体にymlをリファクタリングし、修正しやすくし、今後のyml読み書きの学びにしやすくする

# local WSL + act : test green

# closeとする
- もし生成されたhtmlがNGの場合は、別issueとするつもり

```

### issue-notes/8.md
```md
# issue pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする #8
[issues #8](https://github.com/cat2151/tonejs-mml-to-json/issues/8)

- これまでの課題
  - TDDのサイクルが手間
    - PEGを更新
    - 手動build
    - 手動test
    - ※watchの対象が、vitest対象jsなので、
      - PEGファイルを更新しても、自動buildと自動testがされないので
- 対策
  - こうする
    - PEGを更新
    - 自動build
    - 自動test
    - ブラウザのホットリロード or ライブリロード
  - 方法
    - 既存のmml2abc/chord2mmlから持ってくるつもり

```

### .github/actions-tmp/issue-notes/9.md
```md
# issue 関数コールグラフhtmlビジュアライズが0件なので、原因を可視化する #9
[issues #9](https://github.com/cat2151/github-actions/issues/9)

# agentに修正させたり、人力で修正したりした
- agentがハルシネーションし、いろいろ根の深いバグにつながる、エラー隠蔽などを仕込んでいたため、検知が遅れた
- 詳しくはcommit logを参照のこと
- WSL + actの環境を少し変更、act起動時のコマンドライン引数を変更し、generated-docsをmountする（ほかはデフォルト挙動であるcpだけにする）ことで、デバッグ情報をコンテナ外に出力できるようにし、デバッグを効率化した

# test green

# closeとする

```

### issue-notes/9.md
```md
# issue pnpm watchを、VSCodeを起動したら自動で実行開始させる #9
[issues #9](https://github.com/cat2151/tonejs-mml-to-json/issues/9)

- これまでの課題
  - 手動でwatchを入力するのは手間
- 対策
  - VSCodeでprojectを開いたら自動watchがよい
    - VSCodeはprojectを開いたときにscriptの自動実行ができる
      - そのproject設定をgit管理できる

- 状況
  - 既存のmml2abc/chord2mmlにあるか失念した
  - その調査からやる
  - 試しにagentにきいてみる

```

### issue-notes/5.md
```md
# issue mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる #5
[issues #5](https://github.com/cat2151/tonejs-mml-to-json/issues/5)

- issueの狙い
  - 好奇心、LLMがどれくらいスムーズに動作するか
  - 手でtest case書くより速そう
  - test caseレビューがスムーズそう
    - 想定は、test case 1つのみが正しく生成されること
      - 今のsampleを実行すれば、in/outがすべて得られるので、それを使う
  - agentに生成させたものがミスっていても、test caseの枠組みが生成できていればよい
    - 現在できてるのは str to strのtest caseである
      - str to object のcaseが生成できていればよい
  - test redである想定
  - mml2astのtestは、別途ゼロから検討しなおせばよいので気にしない
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度に投げずに、ここまで分解してからやるのを試す

```

### issue-notes/6.md
```md
# issue mml2astのTDD準備をする #6
[issues #6](https://github.com/cat2151/tonejs-mml-to-json/issues/6)

- issueの狙い
  - mml2ast にするのは確定
    - 根拠はmml2abc/chord2mml
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度にげずに、ここまで分解してからやるのを試す

```

## 最近の変更（過去7日間）
### コミット履歴:
d5ddf88 Update callgraph-enhanced.html [auto]
582c5ad Merge branch 'main' of github.com:cat2151/tonejs-mml-to-json into main
6594cdf #18 状況を反映
5be20d9 Update callgraph-enhanced.html [auto]
5102de9 Merge branch 'main' of github.com:cat2151/tonejs-mml-to-json into main
a2ac2e5 #18 test red 整理した
7db1b9c Update callgraph-enhanced.html [auto]
c4242fb Merge branch 'main' of github.com:cat2151/tonejs-mml-to-json into main
2065436 #18 github-actions リポジトリから、call-daily-project-summary.yml を持ってきた
3f65a04 Update project summaries (overview & development status)

### 変更されたファイル:
.github/docs/daily-summary-setup.md
.github/prompts/development-status-prompt.md
.github/prompts/project-overview-prompt.md
.github/scripts/generate-project-summary.cjs
.github/scripts/test-summary.cjs
.github/workflows/call-daily-project-summary.yml
.github/workflows/daily-project-summary.yml
generated-docs/callgraph-enhanced.html
generated-docs/development-status.md
generated-docs/project-overview.md
issue-notes/18.md


---
Generated at: 2025-09-19 07:04:47 JST
