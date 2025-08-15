Last updated: 2025-08-16

# Development Status

## 現在のIssues
- GitHub Actionsの自動化として、プロジェクト概要生成と関数コールグラフHTMLビジュアライズ生成の共通ワークフロー化が課題です。
- 開発環境の効率化として、`pnpm watch` コマンドの機能拡張とVSCode起動時の自動実行化に取り組む必要があります。
- MMLからJSONへの変換機能の実装に向けて、`mml2ast` および `ast2json` のTDD準備と、既存コードベースからのTDD用テストケース生成が進行中です。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化を進める
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に記載されている「project概要生成」ワークフローの現状を確認し、共通化の要件を定義するために、既存の `.github/workflows/generate-project-summaries.yml` ファイルの内容をレビューしてください。

2. 開発環境の`pnpm watch`コマンドを改善する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の目標である「1行コマンド実行でページオープン、PEGファイルウォッチャー、PEG更新時の自動ビルド＆テスト」を実現するため、まず `package.json` の `scripts` セクションにある `watch` コマンドの現在の定義を確認してください。

3. MMLからJSONへのTDD実装の準備を開始する
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) にある「TDD用テストケースを、今のコードベースからagentに生成させる」ために、既存のMML処理コード（例: `mml2json` 関数）の入力例と期待される出力例を少なくとも3つ具体的にリストアップしてください。

---
Generated at: 2025-08-16 07:03:43 JST
