Last updated: 2025-10-07

# Development Status

## 現在のIssues
- GitHub Actionsの関数コールグラフ生成ワークフローの共通化（[Issue #16](../issue-notes/16.md)）は、対象ソース指定の修正と設定ファイル (`my.json`) の更新を完了し、日次バッチでのテスト結果確認が次のステップ。
- 開発環境の改善として、VSCode起動時の `pnpm watch` 自動実行（[Issue #9](../issue-notes/9.md)）と、PEGファイル更新時に自動ビルド・テスト・ブラウザリロードを行う `watch` スクリプトの実現（[Issue #8](../issue-notes/8.md)）が計画されており、既存プロジェクトの調査から着手する。
- TDDを用いた `mml2json` の再実装（[Issue #3](../issue-notes/3.md)）に向け、`mml2ast`（[Issue #6](../issue-notes/6.md)）と `ast2json`（[Issue #7](../issue-notes/7.md)）の準備、および `mml2json` のTDDテストケース生成（[Issue #5](../issue-notes/5.md)）が段階的に進められる予定。

## 次の一手候補
1. GitHub Actions「関数コールグラフhtmlビジュアライズ生成」のテスト結果を確認する [Issue #16](../issue-notes/16.md)
   - 最初の小さな一歩: 最新の日次バッチの実行ログを確認し、`generated-docs/callgraph.html`が意図通りに更新され、指定されたソースファイルが正しく反映されているかを検証する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `.github/workflows/call-callgraph.yml`, `.github_automation/callgraph/config/my.json`, `generated-docs/callgraph.html`, およびGitHub Actionsの実行ログ

     実行内容: 最新の日次バッチ実行ログ（`call-callgraph.yml`）を確認し、`generated-docs/callgraph.html` が更新されたか、そしてその内容が `.github_automation/callgraph/config/my.json` に指定されたソースファイル（`src/main.js`, `src/mml2json.js`, `src/play.js`）を正しく反映しているかを確認してください。

     確認事項: ワークフローがエラーなく完了しているか、生成日時が最新であるか、コールグラフHTML内に指定されたファイルからの関数呼び出し構造が描画されているか。

     期待する出力: `callgraph.html` の更新状況と、コールグラフの内容が適切であるかを評価する簡潔なレポート（Markdown形式）。もし問題があれば、その具体的な内容と、考えられる原因について記述してください。
     ```

2. VSCode起動時の `pnpm watch` 自動実行設定を既存プロジェクトで調査する [Issue #9](../issue-notes/9.md)
   - 最初の小さな一歩: 既存の `mml2abc` および `chord2mml` プロジェクトのリポジトリで、VSCode起動時に `pnpm watch` コマンドが自動実行される設定があるかを調査する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `mml2abc` および `chord2mml` リポジトリの `.vscode/tasks.json`, `.vscode/settings.json`, `package.json`

     実行内容: 既存の `mml2abc` および `chord2mml` プロジェクトにおいて、VSCodeの起動時に `pnpm watch` コマンドが自動実行される設定があるかを調査してください。具体的には、`.vscode` ディレクトリ内の設定ファイルや `package.json` のスクリプト定義を確認してください。

     確認事項: `tasks.json` の `group` プロパティが `isDefault: true` か `isBackground: true` で `runOn: 'folderOpen'` のような設定があるか、あるいは `settings.json` で `terminal.integrated.shellArgs` や `terminal.integrated.profiles.windows` などに自動起動スクリプトが指定されていないか。

     期待する出力: 調査結果をMarkdown形式で出力してください。自動実行設定が見つかった場合は、その設定方法（ファイルパス、具体的なJSON設定）と、`tonejs-mml-to-json` プロジェクトに適用するための簡単な手順を記述してください。見つからなかった場合はその旨を報告してください。
     ```

3. PEGファイル更新時の自動ビルド・テスト・ブラウザリロードを実現する `watch` スクリプトを既存プロジェクトで調査する [Issue #8](../issue-notes/8.md)
   - 最初の小さな一歩: 既存の `mml2abc` および `chord2mml` プロジェクトのリポジトリで、PEGファイル更新時に自動ビルド・テスト・ブラウザリロードが実行される `watch` スクリプトの実装例があるかを調査する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `mml2abc` および `chord2mml` リポジトリの `package.json`, `vitest.config.js`, および開発関連のスクリプトファイル

     実行内容: 既存の `mml2abc` および `chord2mml` プロジェクトにおいて、`pnpm script watch` が「PEGファイル更新時に自動ビルド・テスト・ブラウザリロード」を実現している実装例があるかを調査してください。具体的には `package.json` の `scripts` セクションと、関連するスクリプトファイルの内容を確認してください。

     確認事項: `watch` スクリプトが `pegjs` または類似のパーサージェネレーターのビルドプロセスと `vitest` のテスト実行を連携させているか、また `browser-sync` や `live-server` のようなホットリロードツールが利用されているか。

     期待する出力: 調査結果をMarkdown形式で出力してください。そのような `watch` スクリプトが見つかった場合は、そのスクリプト定義と、関連する設定（例: `vitest.config.js` の `watch` 設定、ビルドコマンド）を記述してください。`tonejs-mml-to-json` プロジェクトに適用するためのアイデアや、もし見つからなかった場合の代替案（例: `npm-run-all` を使った複数の `watch` コマンドの並行実行）についても言及してください。

---
Generated at: 2025-10-07 07:05:26 JST
