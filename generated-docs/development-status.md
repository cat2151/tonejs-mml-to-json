Last updated: 2025-10-03

# Development Status

## 現在のIssues
- [Issue #16](../issue-notes/16.md) は、共通ワークフロー化したGitHub Actions「関数コールグラフ生成」がエラー終了しており、ログ分析とAgentによる原因調査が必要です。
- MMLからJSONへの変換機能 (`mml2json`, `mml2ast`, `ast2json`) のTDD準備 ([Issue #5](../issue-notes/5.md), [#6](../issue-notes/6.md), [#7](../issue-notes/7.md)) が進行中で、Agentを活用したテストケース生成を検討しています。
- 開発体験向上のため、`pnpm watch` コマンドの自動化と機能拡張 ([Issue #8](../issue-notes/8.md), [#9](../issue-notes/9.md)) を計画しています。

## 次の一手候補
1. [Issue #16](../issue-notes/16.md): GitHub Actions「関数コールグラフhtmlビジュアライズ生成」のエラー調査と修正
   - 最初の小さな一歩: GitHub Actionsの実行ログ（特にエラー箇所）を詳細に分析し、エラーメッセージとスタックトレースから具体的な原因候補を特定します。
   - Agent実行プロンプ:
     ```
     対象ファイル: `.github/workflows/call-callgraph.yml`、`issue-notes/16.md`、およびGitHub Actionsの実行ログ（https://github.com/cat2151/tonejs-mml-to-json/actions/runs/18174089969/job/51735711014）

     実行内容: 提供されたGitHub Actionsの実行ログとワークフロー定義ファイル `.github/workflows/call-callgraph.yml` を分析し、`callgraph.yml` がエラー終了した根本原因を特定してください。特に、呼び出し元ワークフローでの設定不足や、呼び出されたアクション内でのスクリプト実行エラー（例: `.github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs` などのスクリプト内部のエラー）に焦点を当てて調査してください。

     確認事項: `call-callgraph.yml` が `github-actions` リポジトリの共通ワークフローを正しく呼び出せているか、必要な入力パラメータやシークレットが適切に渡されているかを確認してください。また、エラーメッセージが共通ワークフロー内のどのステップやスクリプトに関連しているかを明確にしてください。

     期待する出力: Markdown形式で、エラーの根本原因を特定し、具体的な修正案（例: ワークフローYAMLの変更点、関連スクリプトの修正点）を記述してください。
     ```

2. [Issue #5](../issue-notes/5.md): `mml2json` 関数TDD用テストケースのAgentによる生成
   - 最初の小さな一歩: 現在の `src/mml2json.js` に存在する `mml2json` 関数について、具体的なMML文字列の入力とそれに対応するJSONオブジェクトの出力を一例（例: "c" というMML入力）として手動で抽出します。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/main.js`, `src/mml2json.js`, `src/grammar.js`, `src/grammar.pegjs`, `test/parser.test.js`

     実行内容: `src/mml2json.js` に含まれる既存の `mml2json` 関数について、MML入力文字列とそれに対応する出力JSONオブジェクトを抽出し、Vitest形式のテストケースを生成してください。特に、MML文字列 "c" がどのようなJSONオブジェクトに変換されるか、具体的な例を基にテストケースを作成してください。

     確認事項: `mml2json.js` が依存する `src/grammar.js` (PEG.jsによって生成されるパーサー) の出力構造を考慮すること。既存の `test/parser.test.js` のテスト形式と整合性があること。生成されるテストケースは、TDDの初期段階としてテストレッドになることを想定します。

     期待する出力: `test/mml2json.test.js` という新規ファイルに、最低1つの「MML入力文字列とその期待されるJSON出力オブジェクト」を含むVitest形式のテストケースをMarkdown形式で記述してください。
     ```

3. [Issue #9](../issue-notes/9.md): pnpm watchをVSCode起動時に自動実行させる設定の調査と提案
   - 最初の小さな一歩: 既存のmml2abc/chord2mmlプロジェクト内で、VSCodeの自動実行設定（`tasks.json`や`settings.json`など）が存在しないか確認し、その設定方法を調査します。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.vscode/tasks.json` (もしあれば), `.vscode/settings.json`, `package.json`, `dev-setup/README.md`

     実行内容: VSCodeでプロジェクトを開いた際に `pnpm watch` コマンドが自動で実行されるようにするための設定方法を調査し、具体的な `.vscode/tasks.json` の内容を提案してください。また、既存の `mml2abc` または `chord2mml` プロジェクトに同様の自動実行設定が存在しないか調査し、その結果も考慮に入れてください。

     確認事項: `package.json` に `watch` スクリプトが定義されていること。VSCodeの自動実行設定がプロジェクトローカルに保存され、Gitで管理できる形式であること。提案された設定が、既存のVSCode設定と競合しないか、または簡単に統合できることを確認してください。

     期待する出力: `pnpm watch` をVSCode起動時に自動実行するための `.vscode/tasks.json` の設定例をMarkdown形式で記述してください。既存プロジェクトの調査結果も簡潔に含めてください。

---
Generated at: 2025-10-03 07:05:39 JST
