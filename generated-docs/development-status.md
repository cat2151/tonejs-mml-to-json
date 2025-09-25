Last updated: 2025-09-26

# Development Status

## 現在のIssues
- [Issue #16](../issue-notes/16.md)は、issue-note, project-summary, translate, callgraphの共通ワークフロー化に取り組んでおり、translateとcallgraphの導入が進行中。
- [Issue #9](../issue-notes/9.md)と[Issue #8](../issue-notes/8.md)は、pnpm watchの自動開始と機能強化により開発体験の向上を目指している。
- [Issue #7](../issue-notes/7.md)、[Issue #6](../issue-notes/6.md)、[Issue #5](../issue-notes/5.md)は、mml2jsonのTDD実装に向け、mml2astおよびast2jsonのTDD準備を進めている。

## 次の一手候補
1. [Issue #16](../issue-notes/16.md) 関数コールグラフhtmlビジュアライズ生成の共通ワークフロー化を進める
   - 最初の小さな一歩: `github-actions` リポジトリの `call-callgraph.yml` を `tonejs-mml-to-json` リポジトリの `.github/workflows/` にコピーする。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - .github/workflows/call-callgraph.yml (新規作成または更新対象)
     - .github/actions-tmp/.github/workflows/call-callgraph.yml (参照元)
     - .github/workflows/callgraph_enhanced.yml (既存のcallgraph workflow、必要であれば削除またはリネーム)

     実行内容:
     `tonejs-mml-to-json` リポジトリに、`github-actions` リポジトリ (`.github/actions-tmp/.github/workflows/call-callgraph.yml` の内容) から「関数コールグラフhtmlビジュアライズ生成」の共通ワークフロー呼び出しファイル `call-callgraph.yml` をコピーし、`.github/workflows/` ディレクトリに配置してください。その後、既存の `callgraph_enhanced.yml` がこの新しいワークフローとどのように整合するかを分析し、必要であれば `callgraph_enhanced.yml` を削除または無効化する提案をしてください。

     確認事項:
     コピーする `call-callgraph.yml` が `workflow_call` で `github-actions` リポジトリの共通ワークフローを正しく参照しているか確認してください。また、既存の `callgraph_enhanced.yml` が持つ機能が新しい `call-callgraph.yml` で完全にカバーされるか、または不要になるかを分析してください。

     期待する出力:
     `.github/workflows/call-callgraph.yml` の新規内容をMarkdownコードブロックで出力し、さらに、`callgraph_enhanced.yml` を削除または無効化するための推奨事項をMarkdown形式で記述してください。
     ```

2. [Issue #8](../issue-notes/8.md) pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: 現在の `package.json` の `scripts` を確認し、`watch` コマンドがどのような設定になっているかを調査する。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - package.json
     - src/grammar.pegjs
     - src/grammar.js
     - test/parser.test.js
     - vitest.config.js

     実行内容:
     現在の `package.json` ファイル内の `watch` スクリプトの定義を分析し、[Issue #8](../issue-notes/8.md) で提案されている「PEGファイルをwatchし、PEG更新時に自動でbuildしてtest」という機能を実現するために、`package.json` の `scripts` セクションをどのように変更すべきか、具体的な `watch` コマンドの提案をMarkdown形式で記述してください。現在の `build` や `test` スクリプトとの連携も考慮に入れてください。

     確認事項:
     既存の `package.json` の `scripts` に `build`, `test`, `watch` 関連のコマンドが存在するか、また `vite` や `vitest` の設定ファイル (`vitest.config.js`) がどのようにテストをトリガーしているかを確認してください。PEG.jsのビルドプロセス（`src/grammar.pegjs` から `src/grammar.js` への変換）が現在のスクリプトでどのように行われているかを確認してください。

     期待する出力:
     `package.json` の `scripts` セクションの修正案（`watch` コマンドの追加または変更）をMarkdown形式で出力してください。併せて、提案する `watch` コマンドがどのように機能するか、簡単な説明も加えてください。
     ```

3. [Issue #6](../issue-notes/6.md) mml2astのTDD準備をする
   - 最初の小さな一歩: `src/mml2json.js` の現状を分析し、`mml` を `ast` に変換する中間ステップを導入するために、既存のパース結果がどのように利用できるかを調査する。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - src/grammar.pegjs
     - src/mml2json.js
     - test/parser.test.js (または新規テストファイル)

     実行内容:
     [Issue #6](../issue-notes/6.md) に基づき、`mml2ast` 関数のTDD準備として、`src/grammar.pegjs` でパースされたMMLから抽象構文木 (AST) を生成する `mml2ast` 関数の初期実装に向けたテストファイル (`test/mml2ast.test.js` など) の作成を検討してください。具体的には、ASTのシンプルな構造（例: `{ type: 'note', value: 'c', duration: 4 }`）を想定し、一つの簡単なMML入力 (`'c'`) に対する期待されるAST出力を定義したテストケースのひな形をMarkdown形式で出力してください。

     確認事項:
     既存の `src/grammar.pegjs` の出力構造と `src/mml2json.js` でその結果がどのように処理されているかを確認し、`mml2ast` がその間に割り込む場合のAST設計の初期案と整合性が取れるか確認してください。

     期待する出力:
     `test/mml2ast.test.js` のひな形として、`mml2ast` 関数の最初のテストケース（簡単なMML文字列に対する期待されるAST構造）を定義したJavaScriptコードをMarkdown形式で出力してください。また、`src/mml2json.js` に `mml2ast` を組み込む場合の簡単なコード変更の方向性についても言及してください。

---
Generated at: 2025-09-26 07:05:12 JST
