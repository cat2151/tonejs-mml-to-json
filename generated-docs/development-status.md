Last updated: 2025-08-28

# Development Status

## 現在のIssues
- コア機能であるMMLからJSONへの変換のTDDによる再実装とその準備が進行中です。
- 開発環境の改善として、`pnpm watch` コマンドの自動化と機能強化が挙げられています。
- GitHub Actionsを用いたプロジェクト概要や関数コールグラフ生成のワークフロー共通化が課題です。

## 次の一手候補
1. MMLからJSONへの変換機能のTDD開発を開始する
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、現在のコードベースからMML2JSONのTDD用テストケースを生成する具体的な方法を調査する。例えば、`jest` や `vitest` などのテストフレームワークで既存のコードの挙動をスナップショットテストとして取得する方法を検討する。

2. 開発時の `pnpm watch` スクリプトを強化する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の内容（1行コマンドでページオープン、PEG watch、自動ビルド＆テスト）を実現するために、既存の `package.json` の `scripts` セクションを見直し、最小限の変更で一部機能を追加する方法を検討する。例えば、`concurrently` や `npm-run-all` などのツール導入を検討する。

3. GitHub Actionsのドキュメント生成ワークフローを共通化する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、既存の `project概要生成` のGitHub Actionsワークフロー（`.github/workflows` ディレクトリ内）を特定し、再利用可能なワークフロー（`reusable workflow`）として定義するための具体的な手順を調査する。

---
Generated at: 2025-08-28 07:04:02 JST
