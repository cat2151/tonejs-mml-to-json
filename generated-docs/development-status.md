Last updated: 2025-07-31

# Development Status

## 現在のIssues
- GitHub Actionsの「project概要生成」と「関数コールグラフhtmlビジュアライズ生成」の共通ワークフロー化が課題としてオープンされています。
- 開発環境の改善として、`pnpm watch` のVSCode自動実行と、PEGファイルの監視・自動ビルド・テスト実行の統合が求められています。
- MMLからJSONへの変換機能の実装に向け、`mml2ast` および `ast2json` のTDD準備、既存コードからのテストケース生成、そしてMML "c" の変換実装が進行中です。

## 次の一手候補
1. TDDによるMML変換機能の根幹実装に着手
   - 最初の小さな一歩: `[Issue #5](issue-notes/5.md)` に基づき、`mml2json` 関数のTDD用テストケースをAgentに生成させるためのプロンプトを準備・実行する。

2. 開発環境の自動化と効率化を推進
   - 最初の小さな一歩: `[Issue #8](issue-notes/8.md)` の一環として、`pnpm script watch` がPEGファイル更新時に自動でビルドしテストを実行するよう、スクリプトの内容を修正する。

3. GitHub Actionsの共通ワークフロー化に着手
   - 最初の小さな一歩: `[Issue #18](issue-notes/18.md)` の「project概要生成」を共通ワークフローとして独立させるための、必要なファイルの特定と構成案の検討を開始する。

---
Generated at: 2025-07-31 07:03:45 JST
