Last updated: 2025-09-23

# Development Status

## 現在のIssues
- [Issue #5](../issue-notes/5.md), [Issue #6](../issue-notes/6.md), [Issue #7](../issue-notes/7.md) は、MMLからJSONへの変換をmml2ast, ast2json, mml2jsonと分解し、TDDで実装するためのテストケース生成と準備に焦点を当てています。
- [Issue #8](../issue-notes/8.md) と [Issue #9](../issue-notes/9.md) は、TDDサイクルを効率化するため、PEGファイルの変更に連動した自動ビルド・テスト・ブラウザリロード機能を持つ`pnpm watch`スクリプトの強化とVSCodeでの自動実行を目指しています。
- [Issue #16](../issue-notes/16.md) は、`issue-note`、`project-summary`、`translate`、`callgraph`のGitHub Actionsワークフローを既存の`github-actions`リポジトリから共通ワークフローとして呼び出すように移行することを計画しています。

## 次の一手候補
1. [Issue #5](../issue-notes/5.md): mml2jsonのTDD用テストケースを既存コードからAgentに生成させる
   - 最初の小さな一歩: 現在の`src/main.js`と`src/mml2json.js`のMML入力とJSON出力を分析し、`test/parser.test.js`に追記するためのテストケースの形式を定義する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/main.js`, `src/mml2json.js`, `test/parser.test.js`

     実行内容: `src/main.js`と`src/mml2json.js`を分析し、与えられたMML入力に対する現在のJSON出力結果を特定してください。そして、`test/parser.test.js`の既存のテストケース形式に合わせて、`mml2json`関数用の`str to object`形式のテストケースを1つ生成してください。

     確認事項: 既存の`test/parser.test.js`のテスト構造と、現在の`mml2json.js`が生成するJSON出力の正確性を確認してください。生成されるテストケースは、既存のテストフレームワーク（Vitestを想定）に準拠していることを確認してください。

     期待する出力: `test/parser.test.js`に追記可能な`mml2json`関数用の`str to object`形式のテストケース（MML入力と期待されるJSON出力）をmarkdownコードブロックで出力してください。
     ```

2. [Issue #8](../issue-notes/8.md): pnpm script watchを強化し、自動ビルド・テスト・ページオープンを実現する
   - 最初の小さな一歩: `package.json`の`scripts`セクションを調査し、既存の`watch`スクリプトがないか、またはどのように拡張できるかを特定する。mml2abc/chord2mmlの類似プロジェクトの`package.json`の`scripts`も参考に、理想の`watch`スクリプトの構成を検討する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`

     実行内容: `package.json`の`scripts`セクションを分析し、現在の開発ワークフローにおいてPEGファイルの変更時に自動でビルド、テスト、そしてブラウザのホットリロード/ライブリロードを可能にするための`watch`スクリプトの変更案を生成してください。`mml2abc`や`chord2mml`プロジェクトの類似の機能があれば、その実装パターンを調査し、このプロジェクトに適用可能な形にしてください。

     確認事項: 既存の`build`、`test`スクリプトとの依存関係、および`src/grammar.pegjs`ファイルの変更を監視し、`src/grammar.js`を生成するための`pegjs`コンパイラの実行方法を確認してください。ホットリロード/ライブリロードを実現するためのツールの利用可能性も検討してください。

     期待する出力: `package.json`の`scripts`セクションに追記・修正するための新しい`watch`スクリプトの定義をmarkdownコードブロックで出力してください。スクリプトが複数のコマンドを結合する場合は`npm-run-all`等の利用も考慮してください。
     ```

3. [Issue #16](../issue-notes/16.md): GitHub Actionsの各ワークフローを共通ワークフローとして呼び出すように移行する
   - 最初の小さな一歩: まず`callgraph`ワークフローに絞り、現在の`.github/workflows/callgraph_enhanced.yml`を削除し、`github-actions`リポジトリの`call-callgraph.yml`を参考に、新しい共通ワークフロー呼び出し用の`.github/workflows/call-callgraph_enhanced.yml`を作成する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/workflows/callgraph_enhanced.yml`, `.github/workflows/call-callgraph_enhanced.yml` (新規作成), `.github/actions-tmp/.github/workflows/call-callgraph.yml` (参考)

     実行内容: 現在の`.github/workflows/callgraph_enhanced.yml`の機能を、外部の共通ワークフロー（`cat2151/github-actions/.github/workflows/call-callgraph.yml`を想定）を呼び出す形で再構築してください。まず、`callgraph_enhanced.yml`を削除し、新たに`.github/workflows/call-callgraph_enhanced.yml`を作成します。この新しいファイルは、`workflow_dispatch`または`push`トリガーで動作し、`uses`キーワードを使って共通ワークフローを呼び出す形式とします。`inputs`と`secrets`は、共通ワークフローが要求するものを適切に渡してください。

     確認事項: 共通ワークフローが期待する全ての入力パラメータとシークレットが正しく渡されているか、および現在の`callgraph_enhanced.yml`が提供していた機能が新しい呼び出しワークフローで損なわれないことを確認してください。また、`actions-tmp`ディレクトリ内の類似の呼び出しワークフローの例も参考にしてください。

     期待する出力: 新たに作成される`.github/workflows/call-callgraph_enhanced.yml`の内容をmarkdownコードブロックで出力してください。このファイルは、外部の共通ワークフローを`uses`で呼び出し、必要な`with`パラメータを含んでいるものとします。

---
Generated at: 2025-09-23 07:05:54 JST
