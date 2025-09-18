Last updated: 2025-09-19

# Development Status

## 現在のIssues
- [Issue #18](../issue-notes/18.md) は、プロジェクト概要生成の共通ワークフロー化で発生した、`issue-notes` のパス参照エラーの解決を必要としています。
- [Issue #16](../issue-notes/16.md) は、関数コールグラフHTMLビジュアライズ生成ワークフローの共通ワークフローへの移行を進める必要があります。
- [Issue #9](../issue-notes/9.md) と [Issue #8](../issue-notes/8.md) は、開発効率化のため `pnpm watch` スクリプトの自動化と機能強化の検討が進行中です。

## 次の一手候補
1. [Issue #18](../issue-notes/18.md) プロジェクト概要生成ワークフローのissueノートパス参照エラーを修正する
   - 最初の小さな一歩: `github-actions` リポジトリ内の `daily-project-summary.yml` および関連スクリプトを分析し、Issueノートのパス解決ロジックが現在のリポジトリのルート (`github.workspace`) を適切に参照するように修正します。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - .github/actions-tmp/.github/workflows/daily-project-summary.yml
     - .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
     - .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs

     実行内容: `daily-project-summary.yml`から呼び出されるNode.jsスクリプトにおいて、Issueノートファイルのパス解決が呼び出し元のリポジトリ（`github.workspace`）の`issue-notes`ディレクトリを正しく参照するように修正してください。特に`IssueTracker.cjs`でのパス解決ロジックを確認し、絶対パスまたは`github.workspace`を基準としたパス構築が適切に行われるように変更してください。

     確認事項: 現在の実装で`GITHUB_REPOSITORY`や`github.workspace`などの環境変数がどのように利用されているか、またそれが`IssueTracker.cjs`にどのように伝播されているかを確認してください。修正が、`github-actions`リポジトリ自身で実行された場合と、他のリポジトリから呼び出された場合のどちらでも正しく動作することを確認してください。

     期待する出力: 修正されたファイルの内容（YAMLおよびJavaScriptコード）をMarkdown形式で出力してください。また、修正前後の動作の違いと、`issue-notes`のパス解決がどのように改善されたかを説明する短いレポートを記述してください。
     ```

2. [Issue #16](../issue-notes/16.md) 関数コールグラフHTMLビジュアライズ生成ワークフローを共通ワークフロー化する
   - 最初の小さな一歩: `tonejs-mml-to-json` リポジトリの既存のコールグラフ関連ワークフロー (`.github/workflows/callgraph_enhanced.yml` など) を無効化または削除し、`github-actions` リポジトリの `call-callgraph.yml` をコピーして `tonejs-mml-to-json` の `.github/workflows/` ディレクトリに配置します。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - .github/workflows/callgraph_enhanced.yml (tonejs-mml-to-jsonリポジトリ内)
     - .github/actions-tmp/.github/workflows/call-callgraph.yml (github-actionsリポジトリ内)

     実行内容: `tonejs-mml-to-json` リポジトリ内の既存のコールグラフ生成ワークフロー `.github/workflows/callgraph_enhanced.yml` を無効化し、`github-actions` リポジトリの共通ワークフロー `.github/actions-tmp/.github/workflows/call-callgraph.yml` の内容をコピーして、`tonejs-mml-to-json` の新しいワークフローファイル（例：`.github/workflows/call-callgraph.yml`）として作成してください。コピーする際に、`uses: ./.github/workflows/callgraph.yml` のようなローカル参照ではなく、`cat2151/github-actions/.github/workflows/callgraph.yml@main` のようなリポジトリ参照に修正してください。

     確認事項: 共通ワークフロー `call-callgraph.yml` が呼び出す `callgraph.yml` が、呼び出し元リポジトリのコンテキストで正しく動作するために必要なシークレットや入力が適切に設定されているかを確認してください。また、既存の `.github/workflows/callgraph_enhanced.yml` が無効化されることを確認してください。

     期待する出力: 新しいワークフローファイル `.github/workflows/call-callgraph.yml` の内容と、無効化された `.github/workflows/callgraph_enhanced.yml` の修正（もしあれば）をMarkdownコードブロックで出力してください。
     ```

3. [Issue #8](../issue-notes/8.md) pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: `package.json` に `watch:peg` スクリプトを定義し、`pegjs` を用いて `src/grammar.pegjs` が変更されたときに `src/grammar.js` を自動的に再生成する機能を実装します。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - package.json
     - src/grammar.pegjs
     - src/grammar.js

     実行内容: `package.json`に新しい`watch:peg`スクリプトを追加してください。このスクリプトは、`src/grammar.pegjs`が変更されたときに`src/grammar.js`を自動的に再生成する機能を持つようにします。`pegjs`コマンドラインツールを使用するか、Node.jsスクリプトで`peggy`パッケージを利用することを検討してください。まずは`pegjs`（または`peggy`）の実行を確認するための最小限のスクリプトとしてください。

     確認事項: `package.json`に`peggy`または`pegjs`が依存関係として追加されているか確認してください。スクリプトが正しく`src/grammar.pegjs`をコンパイルし、`src/grammar.js`を更新することを確認してください。

     期待する出力: 修正された`package.json`の`scripts`セクションをMarkdownコードブロックで出力してください。また、`src/grammar.pegjs`から`src/grammar.js`を生成するためのコマンド、またはNode.jsスクリプトの提案を記述してください。

---
Generated at: 2025-09-19 07:05:23 JST
