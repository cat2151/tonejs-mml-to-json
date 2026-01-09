Last updated: 2026-01-10

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
- .github/actions-tmp/.github/workflows/call-rust-windows-check.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-recent-human-commit.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/rust-windows-check.yml
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
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
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
- .github/actions-tmp/_config.yml
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview-generated-prompt.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/googled947dc864c270e07.html
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
- .github/actions-tmp/issue-notes/27.md
- .github/actions-tmp/issue-notes/28.md
- .github/actions-tmp/issue-notes/29.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/30.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/workflows/call-callgraph.yml
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- .github_automation/callgraph/config/my.json
- .gitignore
- IMPLEMENTATION_SUMMARY.md
- LICENSE
- QUICKSTART.md
- README.ja.md
- README.md
- TYPESCRIPT_MIGRATION.md
- _config.yml
- dev-setup/README.md
- dev-setup/setup.js
- generated-docs/callgraph-enhanced.html
- generated-docs/callgraph.html
- generated-docs/callgraph.js
- generated-docs/project-overview-generated-prompt.md
- generated-docs/style.css
- googled947dc864c270e07.html
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
- issue-notes/21.md
- issue-notes/23.md
- issue-notes/24.md
- issue-notes/26.md
- issue-notes/27.md
- issue-notes/28.md
- issue-notes/3.md
- issue-notes/31.md
- issue-notes/4.md
- issue-notes/5.md
- issue-notes/6.md
- issue-notes/7.md
- issue-notes/8.md
- issue-notes/9.md
- package-lock.json
- package.json
- pnpm-lock.yaml
- rust/Cargo.toml
- rust/IMPLEMENTATION.md
- rust/README.md
- rust/examples/basic_usage.rs
- rust/src/ast.rs
- rust/src/ast2json.rs
- rust/src/lib.rs
- rust/src/mml2ast.rs
- src/ast2json.ts
- src/grammar.js
- src/grammar.pegjs
- src/index.html
- src/main.ts
- src/mml2ast.ts
- src/mml2json-wasm.ts
- src/mml2json.js
- src/play.ts
- test/ast2json.test.js
- test/demo-test.mjs
- test/integration.test.js
- test/mml2ast.test.js
- test/parser.test.js
- test/wasm-init-test.mjs
- test/wasm-integration-test.mjs
- test/wasm-test.mjs
- tsconfig.json
- vitest.config.js

## 現在のオープンIssues
## [Issue #32](../issue-notes/32.md): Add optimized GitHub Actions workflow to build and deploy to GitHub Pages
The GitHub Pages demo fails with 404 errors for `dist/mml2json-wasm.js`, `dist/play.js`, and `dist/main.js`. These are build artifacts (TypeScript → JS, Rust → WASM) excluded from git but required at runtime.

## Changes

- **`.github/workflows/deploy-pages.yml`**: Optimized workflow that builds WAS...
ラベル: 
--- issue-notes/32.md の内容 ---

```markdown

```

## [Issue #31](../issue-notes/31.md): エラーのためJSON変換ができない
[issue-notes/31.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/31.md)

...
ラベル: 
--- issue-notes/31.md の内容 ---

```markdown
# issue エラーのためJSON変換ができない #31
[issues #31](https://github.com/cat2151/tonejs-mml-to-json/issues/31)



```

## [Issue #26](../issue-notes/26.md): TypeScriptとRust WASMとで重複した機能を洗い出し、Rust WASMに一本化する
[issue-notes/26.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/26.md)

...
ラベル: 
--- issue-notes/26.md の内容 ---

```markdown
# issue TypeScriptとRust WASMとで重複した機能を洗い出し、Rust WASMに一本化する #26
[issues #26](https://github.com/cat2151/tonejs-mml-to-json/issues/26)



```

## [Issue #24](../issue-notes/24.md): WAVLPF と tonejs-json-sequencer からmjsライブラリとして利用できるようにする
[issue-notes/24.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/24.md)

...
ラベル: 
--- issue-notes/24.md の内容 ---

```markdown
# issue WAVLPF と tonejs-json-sequencer からmjsライブラリとして利用できるようにする #24
[issues #24](https://github.com/cat2151/tonejs-mml-to-json/issues/24)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/issue-notes/2.md
```md
{% raw %}
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #2
[issues #2](https://github.com/cat2151/github-actions/issues/2)


# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-callgraph_enhanced.yml
まずplanしてください
```

# 結果
- indent
    - linter？がindentのエラーを出しているがyml内容は見た感じOK
    - テキストエディタとagentの相性問題と判断する
    - 別のテキストエディタでsaveしなおし、テキストエディタをreload
    - indentのエラーは解消した
- LLMレビュー
    - agent以外の複数のLLMにレビューさせる
    - prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューしてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 共通ワークフロー

# GitHub Actions Reusable Workflow for Call Graph Generation
name: Generate Call Graph

# TODO Windowsネイティブでのtestをしていた名残が残っているので、今後整理していく。今はWSL act でtestしており、Windowsネイティブ環境依存問題が解決した
#  ChatGPTにレビューさせるとそこそこ有用そうな提案が得られたので、今後それをやる予定
#  agentに自己チェックさせる手も、セカンドオピニオンとして選択肢に入れておく

on:
  workflow_call:

jobs:
  check-commits:
    runs-on: ubuntu-latest
    outputs:
      should-run: ${{ steps.check.outputs.should-run }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 50 # 過去のコミットを取得

      - name: Check for user commits in last 24 hours
        id: check
        run: |
          node .github/scripts/callgraph_enhanced/check-commits.cjs

  generate-callgraph:
    needs: check-commits
    if: needs.check-commits.outputs.should-run == 'true'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      security-events: write
      actions: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Remove old CodeQL packages cache
        run: rm -rf ~/.codeql/packages

      - name: Check Node.js version
        run: |
          node .github/scripts/callgraph_enhanced/check-node-version.cjs

      - name: Install CodeQL CLI
        run: |
          wget https://github.com/github/codeql-cli-binaries/releases/download/v2.22.1/codeql-linux64.zip
          unzip codeql-linux64.zip
          sudo mv codeql /opt/codeql
          echo "/opt/codeql" >> $GITHUB_PATH

      - name: Install CodeQL query packs
        run: |
          /opt/codeql/codeql pack install .github/codeql-queries

      - name: Check CodeQL exists
        run: |
          node .github/scripts/callgraph_enhanced/check-codeql-exists.cjs

      - name: Verify CodeQL Configuration
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs verify-config

      - name: Remove existing CodeQL DB (if any)
        run: |
          rm -rf codeql-db

      - name: Perform CodeQL Analysis
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs analyze

      - name: Check CodeQL Analysis Results
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs check-results

      - name: Debug CodeQL execution
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs debug

      - name: Wait for CodeQL results
        run: |
          node -e "setTimeout(()=>{}, 10000)"

      - name: Find and process CodeQL results
        run: |
          node .github/scripts/callgraph_enhanced/find-process-results.cjs

      - name: Generate HTML graph
        run: |
          node .github/scripts/callgraph_enhanced/generate-html-graph.cjs

      - name: Copy files to generated-docs and commit results
        run: |
          node .github/scripts/callgraph_enhanced/copy-commit-results.cjs

--- 呼び出し元
# 呼び出し元ワークフロー: call-callgraph_enhanced.yml
name: Call Call Graph Enhanced

on:
  schedule:
    # 毎日午前5時(JST) = UTC 20:00前日
    - cron: '0 20 * * *'
  workflow_dispatch:

jobs:
  call-callgraph-enhanced:
    # uses: cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
    uses: ./.github/workflows/callgraph_enhanced.yml # ローカルでのテスト用
```

# レビュー結果OKと判断する
- レビュー結果を人力でレビューした形になった

# test
- #4 同様にローカル WSL + act でtestする
- エラー。userのtest設計ミス。
  - scriptの挙動 : src/ がある前提
  - 今回の共通ワークフローのリポジトリ : src/ がない
  - 今回testで実現したいこと
    - 仮のソースでよいので、関数コールグラフを生成させる
  - 対策
    - src/ にダミーを配置する
- test green
  - ただしcommit pushはしてないので、html内容が0件NG、といったケースの検知はできない
  - もしそうなったら別issueとしよう

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする
- もしhtml内容が0件NG、などになったら、別issueとするつもり

{% endraw %}
```

### issue-notes/2.md
```md
{% raw %}
# issue TDDを導入するため、環境構築scriptをagentに書かせる #2
[issues #2](https://github.com/cat2151/tonejs-mml-to-json/issues/2)

# close条件
- 環境構築scriptが生成されること
- サンプルPEGが生成されること
- サンプルPEGから生成されたstr to str関数が自動testされ、test green となること（toBeDefined をtestするレベルでOK）

# スコープ外
- ESMとcjs両方の生成。ESM利用projectと、cjs利用project、両方で利用可能にする用。
  - → 後回し。既存の mml2abc / chord2mml から取り込む。
- open live serverと、watchとを併用した、TDD作業フロー開始手順の効率化
  - → 後回し。既存の mml2abc / chord2mml から取り込む。
- VSCodeと連動した、TDD test結果の可視化
  - → 後回し。既存の mml2abc / chord2mml から取り込む。

# 方針
- agentに、環境構築scriptを生成させる

# 備忘
- 課題、agentの失敗が多い
  - 対策
    - やりなおすのが楽で、prompt修正サイクルを素早く回せる状況、であることを確認する
    - 失敗ごとにpromptを変更し、短時間で成功に到達できるかを様子見しながら、進める
  - 結果、成功した

# prompt
- このprojectに、TDDを導入したいです。
- IaCの観点から、pnpm + Peggyjs + Vitest の環境構築scriptを、Node.js用のscriptとして作成してください。
- scriptとdocumentは、dev-setup/ に配置してください。
- setup scriptの実行は、実行用にわざわざPowerShell script等の生成はせず、直接Node.jsを実行する方式を選んでください。
- PEG文法とtest caseは、1つだけにして、入力が`c`、出力が`c`、というtestとしてください。
  - わざわざ本番用とsample用のpegjsを分けることはせず、1つのpegjsに統一してください。
  - わざわざagentがそれっぽい（が根本的に間違っている）MML文法を勝手に考案して実装するかわりに、前述で指定した、入力が`c`、出力が`c`、というpegjsにしてください。
- scriptを生成したら、scriptを見直し、RERUN無限ループに陥ることがないかチェックしてください。
- チェック結果がOKであれば、scriptを実行してください。
- 日本語で回答してください。

# 結果
- 成功した

# closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/24.md
```md
{% raw %}
# issue Geminiが503で落ちたのでretryを実装する #24
[issues #24](https://github.com/cat2151/github-actions/issues/24)

# 何が困るの？
- 朝起きて、development statusがgenerateされてないのは困る
    - それをタスク実施のヒントにしているので
    - 毎朝generatedな状態を維持したい

# 方法
- retryを実装する
    - 現在は `this.model.generateContent(developmentPrompt);`
    - 実装後は `this.generateContent(developmentPrompt);`
    - BaseGenerator 側に、
        - generateContent関数を実装する
            - そこで、
                - `this.model.generateContent(developmentPrompt);` する
                - 503のとき、
                    - retryあり
                    - Exponential Backoff

# 結果
- 直近の実行結果をlog確認した
    - 本番で503が発生しなかったことをlog確認した
- 本番の503 testは、今回発生しなかったので、できず
- ここ1週間で2回発生しているので、次の1週間で1回発生する想定
- ソース机上確認した

# どうする？
- このissueはcloseしたほうがわかりやすい、と判断する
- 1週間503を毎日チェック、は省略とする
- もし今後503が発生したら別issueとする
- 2日チェックして503なし

# closeとする

{% endraw %}
```

### issue-notes/24.md
```md
{% raw %}
# issue WAVLPF と tonejs-json-sequencer からmjsライブラリとして利用できるようにする #24
[issues #24](https://github.com/cat2151/tonejs-mml-to-json/issues/24)



{% endraw %}
```

### .github/actions-tmp/issue-notes/26.md
```md
{% raw %}
# issue userによるcommitがなくなって24時間超経過しているのに、毎日ムダにproject summaryとcallgraphの自動生成が行われてしまっている #26
[issues #26](https://github.com/cat2151/github-actions/issues/26)

# どうする？
- logを確認する。24時間チェックがバグっている想定。
- もしlogから判別できない場合は、logを改善する。

# log確認結果
- botによるcommitなのに、user commitとして誤判別されている
```
Checking for user commits in the last 24 hours...
User commits found: true
Recent user commits:
7654bf7 Update callgraph.html [auto]
abd2f2d Update project summaries (overview & development status)
```

# ざっくり調査結果
- #27 が判明した

# どうする？
- [x] #27 を修正する。これで自動的に #26 も修正される想定。
    - 当該処理を修正する。
    - もしデータ不足なら、より詳細なlog生成を実装する。
- 別件として、このチェックはむしろworkflow ymlの先頭で行うのが適切と考える。なぜなら、以降のムダな処理をカットできるのでエコ。
    - [x] #28 を起票したので、そちらで実施する。

# close条件は？
- 前提
    - [x] 先行タスクである #27 と #28 が完了済みであること
- 誤爆がなくなること。
    - つまり、userによるcommitがなくなって24時間超経過後の日次バッチにて、
        - ムダなdevelopment status生成、等がないこと
        - jobのlogに「commitがないので処理しません」的なmessageが出ること
- どうする？
    - 日次バッチを本番を流して本番testする

# 結果
- github-actions logより：
    - 直近24hのcommitはbotによる1件のみであった
    - よって後続jobはskipとなった
    - ことを確認した
- close条件を満たした、と判断する
```
Run node .github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
BOT: Commit 5897f0c6df6bc2489f9ce3579b4f351754ee0551 | Author: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com> | Message: Update project summaries (overview & development status) [auto]
has_recent_human_commit=false
```

# closeとする

{% endraw %}
```

### issue-notes/26.md
```md
{% raw %}
# issue TypeScriptとRust WASMとで重複した機能を洗い出し、Rust WASMに一本化する #26
[issues #26](https://github.com/cat2151/tonejs-mml-to-json/issues/26)



{% endraw %}
```

### .github/actions-tmp/issue-notes/4.md
```md
{% raw %}
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #4
[issues #4](https://github.com/cat2151/github-actions/issues/4)

# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/daily-project-summary.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-daily-project-summary.yml
まずplanしてください
```

# 結果、あちこちハルシネーションのあるymlが生成された
- agentの挙動があからさまにハルシネーション
    - インデントが修正できない、「失敗した」という
    - 構文誤りを認識できない
- 人力で修正した

# このagentによるセルフレビューが信頼できないため、別のLLMによるセカンドオピニオンを試す
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 呼び出し元

name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

--- 共通ワークフロー
name: Daily Project Summary
on:
  workflow_call:

jobs:
  generate-summary:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      issues: read
      pull-requests: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0  # 履歴を取得するため

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          # 一時的なディレクトリで依存関係をインストール
          mkdir -p /tmp/summary-deps
          cd /tmp/summary-deps
          npm init -y
          npm install @google/generative-ai @octokit/rest
          # generated-docsディレクトリを作成
          mkdir -p $GITHUB_WORKSPACE/generated-docs

      - name: Generate project summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          NODE_PATH: /tmp/summary-deps/node_modules
        run: |
          node .github/scripts/generate-project-summary.cjs

      - name: Check for generated summaries
        id: check_summaries
        run: |
          if [ -f "generated-docs/project-overview.md" ] && [ -f "generated-docs/development-status.md" ]; then
            echo "summaries_generated=true" >> $GITHUB_OUTPUT
          else
            echo "summaries_generated=false" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push summaries
        if: steps.check_summaries.outputs.summaries_generated == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          # package.jsonの変更のみリセット（generated-docsは保持）
          git restore package.json 2>/dev/null || true
          # サマリーファイルのみを追加
          git add generated-docs/project-overview.md
          git add generated-docs/development-status.md
          git commit -m "Update project summaries (overview & development status)"
          git push

      - name: Summary generation result
        run: |
          if [ "${{ steps.check_summaries.outputs.summaries_generated }}" == "true" ]; then
            echo "✅ Project summaries updated successfully"
            echo "📊 Generated: project-overview.md & development-status.md"
          else
            echo "ℹ️ No summaries generated (likely no user commits in the last 24 hours)"
          fi
```

# 上記promptで、2つのLLMにレビューさせ、合格した

# 細部を、先行する2つのymlを参照に手直しした

# ローカルtestをしてからcommitできるとよい。方法を検討する
- ローカルtestのメリット
    - 素早く修正のサイクルをまわせる
    - ムダにgit historyを汚さない
        - これまでの事例：「実装したつもり」「エラー。修正したつもり」「エラー。修正したつもり」...（以降エラー多数）
- 方法
    - ※検討、WSL + act を環境構築済みである。test可能であると判断する
    - 呼び出し元のURLをコメントアウトし、相対パス記述にする
    - ※備考、テスト成功すると結果がcommit pushされる。それでよしとする
- 結果
    - OK
    - secretsを簡略化できるか試した、できなかった、現状のsecrets記述が今わかっている範囲でベストと判断する
    - OK

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする

{% endraw %}
```

### issue-notes/4.md
```md
{% raw %}
# issue GitHubActions「project全体を入力とし、なんらかのtextを生成する（生成方針は今後自由に変更すればよい）」を、agentに生成させるのを試す #4
[issues #4](https://github.com/cat2151/tonejs-mml-to-json/issues/4)

# issueの目的
- 好奇心。現状のLLMだとどれくらいできるか。
  - 想定。力不足。高度なことをさせるには、ハルシネーションが多く実用にならない。
    - 対策。ゆるく始める。ハルシネーションの出ない範囲の軽い利用で割り切る。
      - 作業優先度と作業負荷の許す範囲で、次第に高度なことを試す。

# prompt
- GitHub Actionsを使った、テキスト生成scriptを検討し、設計書を書いてください。実装はしないで。
- script機能は、Project全体を参照し、テキスト生成することです。
- テキスト生成にはGeminiを用います。
  - README.ja.mdの英語翻訳機能を既にGitHub Actionsで使っているので、参考にします。
- デイリーで日本時間の07:00に起動し、過去24時間以内にuserからのcommit pushがあった場合のみ、テキスト生成してください。
  - ※でないと、userが多忙でprojectから距離をおいているときも継続的にテキストが生成されて蓄積し、userの認知負荷になってしまうので
  - GitHub Actionsによるcommit pushは除外してください
    - ※でないと、userが何もしていないのに毎日GitHub Actionsによるテキスト生成が行われてしまうので
- テキスト生成用のプロンプトは、promptファイルに切り分け、それを編集することで生成方針をいつでも自由に変更できるように。
- promptファイルのデフォルト内容：
```
- 生成するもの：
  - projectを3行で要約する
  - 現在openされているissuesを3行で要約する
  - 次の一手の候補を3つlistする
  - 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く
- 生成しないもの：
  - 「今日のissue目標」などuserに提案するもの
    - ハルシネーションの温床なので生成しない
  - ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
```

# 結果
- `.github` と `daily-summaries` に、関連ソースとドキュメントが生成された
- testし、いくつかバグが出て、都度指示して修正させた
- ESM対応。package.jsonで、CommonJSでなくESMが指定されているため、GitHub Actions側で使っているCommonJSがエラー。
  - agentは、GitHub Actions側をESMに実装変更しようとした。
    - だがこの状況においては、cjsにrenameするほうがスムーズであると考える。この状況で、新たなバグを作り込むと、バグ原因切り分けコストが組み合わせ爆発的に増える。それは得策でない。ESM化の実装変更をするなら、後回しがよい。そのように指示して対処した。
- secretを一時的に環境変数に設定し、`pnpm test:summary` する
- testし、いくつかバグが出て、都度指示して修正させた
- test green
- model を `gemini-2.5-flash` にして、生成結果を比較する
  - ※agentが実装した `gemini-1.5-flash` は古くて生成品質が不足であるという認識
  - 結果、大差なかった。
    - どうする？
      - `gemini-2.5-flash` を採用とする。今後の状況やprompt次第で効果を発揮する可能性がある、と判断する。
- 状況
  - 最低限の実装ができたと判断し、 #4 としてはcloseする。
  - 今後ドッグフーディングを進め、課題が出たら、適宜、新たにissue起票とする。

# closeとする

{% endraw %}
```

### .github/actions-tmp/src/main.js
```js
{% raw %}
// 仮の解析対象 main.js
function greet(name) {
    console.log('Hello, ' + name + '!');
}

function main() {
    greet('World');
}

main();

{% endraw %}
```

### issue-notes/1.md
```md
{% raw %}
# issue 現在のdemoはprototypeなのでゼロから作り直す。README.ja.mdに入出力定義などをBluesky投稿を元にまとめる #1
[issues #1](https://github.com/cat2151/tonejs-mml-to-json/issues/1)

# titleを整理する
- `現在のdemoはprototypeなのでゼロから作り直す`
  - → 作り直しに着手、具体的にはTDD環境構築に着手、より具体的には issue #2 をcloseすればOK
- `README.ja.mdに入出力定義などをBluesky投稿を元にまとめる`
  - → README.ja.mdにまとめればOK

# close条件
- issue #2 がcloseされること
- 入出力定義などが、READMEに書かれること

# closeとする

{% endraw %}
```

### issue-notes/31.md
```md
{% raw %}
# issue エラーのためJSON変換ができない #31
[issues #31](https://github.com/cat2151/tonejs-mml-to-json/issues/31)



{% endraw %}
```

### issue-notes/6.md
```md
{% raw %}
# issue mml2astのTDD準備をする #6
[issues #6](https://github.com/cat2151/tonejs-mml-to-json/issues/6)

- issueの狙い
  - mml2ast にするのは確定
    - 根拠はmml2abc/chord2mml
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度にげずに、ここまで分解してからやるのを試す

{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
16f42b5 Update callgraph.html [auto]
80d7bf3 Add issue note for #31 [auto]
d066ba6 Merge pull request #30 from cat2151/copilot/change-javascript-to-typescript
900b334 Address PR review comments: import ToneCommand, use strict equality, export shared state, remove unused variables
5a1bfc6 Use extensionless import for WASM module for consistency
25b8856 Fix import paths to use extensionless imports for better TypeScript compatibility
c88291a Add TypeScript migration documentation
3014def Convert JavaScript to TypeScript with proper type definitions
5010975 Initial plan
7c28c37 Merge pull request #29 from cat2151/copilot/fix-json-generation-error

### 変更されたファイル:
.gitignore
TYPESCRIPT_MIGRATION.md
generated-docs/callgraph.html
issue-notes/26.md
issue-notes/27.md
issue-notes/28.md
issue-notes/31.md
package-lock.json
package.json
src/ast2json.ts
src/index.html
src/main.js
src/main.ts
src/mml2ast.ts
src/mml2json-wasm.ts
src/play.js
src/play.ts
test/ast2json.test.js
test/integration.test.js
test/mml2ast.test.js
test/wasm-init-test.mjs
tsconfig.json


---
Generated at: 2026-01-10 07:05:25 JST
