Last updated: 2025-08-17

# Development Status

## 現在のIssues
- GitHub Actionsにおける自動ドキュメント生成（プロジェクト概要、関数コールグラフ）の共通ワークフロー化が課題としてオープンされています。
- 開発効率向上のため、`pnpm watch`スクリプトの機能強化とVSCode連携による自動実行の改善が進行中です。
- コア機能であるMMLからJSONへの変換について、TDDによる再実装の準備（テストケース生成、mml2ast/ast2jsonのTDD環境構築）と、最初の変換ロジック（MML cの変換）の実装が控えています。

## 次の一手候補
1. TDDによるMML変換機能の初期ステップに着手
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に従って、既存のmml2jsonコードからTDD用のテストケースを自動生成するスクリプトを記述・実行する。例えば、`src/mml2json.ts` の機能を網羅するテストデータを `tests/test_cases.ts` に生成するエージェントプロンプトを考案し実行する。

2. 開発環境の自動化と効率化を進める
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`package.json` の `scripts.watch` コマンドを修正し、PEGファイルの変更を検知して自動でビルドとテストを実行する機能を組み込む。具体的には、`chokidar-cli`や`nodemon`などのツール導入を検討し、`pnpm build && pnpm test`を自動化する。

3. GitHub Actionsの共通ワークフロー化を調査・計画
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に関連して、現在のGitHub Actionsワークフロー (`.github/workflows/`) をレビューし、プロジェクト概要生成と関数コールグラフ生成で共通化できる部分（例: 依存関係のインストール、環境設定など）を特定する。共通ワークフロー化のための具体的な手順を簡単なドキュメントとしてまとめる。

---
Generated at: 2025-08-17 07:03:29 JST
