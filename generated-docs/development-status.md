Last updated: 2025-09-20

# Development Status

## 現在のIssues
- GitHub ActionsのコールグラフHTMLビジュアライズ生成の共通ワークフロー化 ([#16](../issue-notes/16.md)) に向けた継続的な取り組みがある。
- 開発効率向上のため、`pnpm watch`のVSCode自動実行設定 ([#9](../issue-notes/9.md)) と、PEG更新時の自動ビルド・テスト・ページリロード機能 ([#8](../issue-notes/8.md)) の改善が進行中である。
- MMLからJSONへの変換ロジック (`mml2ast`, `ast2json`, `mml2json`) のTDDによる再実装 ([#7](../issue-notes/7.md), [#6](../issue-notes/6.md), [#5](../issue-notes/5.md), [#3](../issue-notes/3.md)) が進行しており、特にテストケース生成が課題となっている。

## 次の一手候補
1. GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフローとして呼び出す ([#16](../issue-notes/16.md))
   - 最初の小さな一歩: `.github/workflows/callgraph_enhanced.yml` を、`github-actions` リポジトリにある共通ワークフロー (`call-callgraph.yml`) を呼び出す形に修正する。
   - Agent実行プロンプ:
     ```
     対象ファイル: .github/workflows/callgraph_enhanced.yml

     実行内容: `github-actions` リポジトリで既に共通ワークフローとして機能している `.github/actions-tmp/.github/workflows/call-callgraph.yml` の内容を参考に、`.github/workflows/callgraph_enhanced.yml` を共通ワークフローとして `github-actions` リポジトリから呼び出す形式に修正してください。`uses:` と `with:` パラメータを適切に設定し、既存の機能が正しく動作するようにしてください。

     確認事項: 修正前に、現在の `.github/workflows/callgraph_enhanced.yml` の機能と、`github-actions` リポジトリの `call-callgraph.yml` の入力・出力パラメータを確認してください。また、他のGitHub Actionsワークフローや`callgraph`関連スクリプトとの依存関係に影響がないことを確認してください。

     期待する出力: 修正された `.github/workflows/callgraph_enhanced.yml` ファイルの内容。
     ```

2. `pnpm script watch`をPEG更新時に自動ビルド・テスト・ページリロードする形に改善する ([#8](../issue-notes/8.md))
   - 最初の小さな一歩: `package.json` の `scripts` セクションを調査し、`src/grammar.pegjs` ファイルの変更を検知して自動で `pegjs` ビルドと `vitest` テストが実行されるよう `watch` スクリプトを修正する。
   - Agent実行プロンプ:
     ```
     対象ファイル: package.json, src/grammar.pegjs, vitest.config.js

     実行内容: `package.json` の `scripts` セクションにおいて、`pnpm watch` コマンドが `src/grammar.pegjs` の変更を監視し、変更があった場合に自動的に `pegjs` によるビルド (`src/grammar.pegjs` から `src/grammar.js` を生成) を実行し、その後 `vitest` のテストを自動実行するように修正してください。また、可能であればブラウザのホットリロードやライブリロード機能も組み込んでください。

     確認事項: 既存の `build` および `test` スクリプトの定義、`vitest.config.js` の設定、そして `pegjs` のビルドコマンドの正確性を確認してください。`package.json` に新たな依存関係を追加する必要がある場合は、その旨を明記してください。

     期待する出力: 修正された `package.json` の `scripts` セクションの内容、および必要に応じて `vitest.config.js` の変更案。
     ```

3. `mml2json`のTDD用テストケースを現在のコードからAgentに生成させる ([#5](../issue-notes/5.md))
   - 最初の小さな一歩: 既存のMMLからJSONへの変換ロジック (`src/main.js` や `src/mml2json.js`) が現在生成しているJSON出力を収集し、それらを期待値とする `vitest` 形式のテストケースを `test/mml2json.test.js` に生成する。
   - Agent実行プロンプ:
     ```
     対象ファイル: src/main.js, src/mml2json.js, test/parser.test.js

     実行内容: `src/main.js` および `src/mml2json.js` の現在のMMLからJSONへの変換ロジックを分析し、いくつかの代表的なMML入力文字列（例: "c", "cde", "o4cde"）に対する現在のJSON出力結果を抽出してください。これらの入力と出力のペアを元に、`test/mml2json.test.js` という新しいテストファイルを `vitest` 形式で作成し、抽出したJSON出力が期待値となるテストケースを生成してください。特に、MML文字列を入力としてJSONオブジェクトを比較するテストケースを重視してください。

     確認事項: 既存の `test/parser.test.js` のテスト形式と `vitest` の利用方法、および `src/main.js` または `src/mml2json.js` がMMLをJSONに変換する主要なロジックを含んでいることを確認してください。

     期待する出力: `test/mml2json.test.js` という新しいファイルの内容。このファイルは `vitest` 形式で記述された `mml2json` のテストケースを含み、入力MML文字列と期待されるJSONオブジェクトのペアを含みます。

---
Generated at: 2025-09-20 07:05:36 JST
