Last updated: 2025-07-16

# Development Status

## 現在のIssues
- 開発環境の自動化と効率化に関する改善が進められており、GitHub Actionsでのコールグラフ生成やpnpm watchの強化が進行中です。
- 主要なMMLパーシング機能（mml2ast, ast2json, mml2json）のTDD（テスト駆動開発）準備が多数のissueとしてオープンされています。
- 特に、既存のmml2json関数をPEGからTDDで再実装するために、現在のコードベースからテストケースを生成するタスクが挙げられています。

## 次の一手候補
1. [Issue #5](issue-notes/5.md): mml2json関数のTDD用テストケースをagentに生成させる
   - 最初の小さな一歩: Agentに対して、現在の`src/mml2json/index.ts`の内容を提供し、`mml2json`関数の既存の振る舞いを網羅するTDD形式のテストケース（入力MMLと期待されるTone.js JSON）を生成するよう指示するプロンプトを作成する。

2. [Issue #6](issue-notes/6.md): mml2astのTDD準備をする
   - 最初の小さな一歩: `src/mml2ast/`ディレクトリ内に`test`ディレクトリを作成し、`mml2ast.test.ts`ファイルを新規作成する。

3. [Issue #8](issue-notes/8.md): pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: `package.json`の`scripts`セクションに`watch`コマンドを追加し、`peggy`のwatch機能と、ローカルサーバーを起動しページを自動的に開くコマンド（例: `npm-run-all --parallel watch:peggy serve`のような形式）を組み合わせる方法を調査する。

---
Generated at: 2025-07-16 07:03:51 JST
