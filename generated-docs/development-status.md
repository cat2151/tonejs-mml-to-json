Last updated: 2025-08-11

# Development Status

## 現在のIssues
- プロジェクトのコア機能であるMMLからJSONへの変換（mml2json, mml2ast, ast2json）について、TDD（テスト駆動開発）アプローチによる実装とテスト準備が進行中です。
- 開発者の生産性向上を目指し、`pnpm watch`スクリプトの自動化や、PEGファイルの変更監視・自動ビルド・テスト機能の改善が計画されています。
- GitHub Actionsのワークフロー（プロジェクト概要生成、関数コールグラフHTMLビジュアライズ生成）を共通化し、CI/CD環境を整備するタスクが残っています。

## 次の一手候補
1. MML解析・変換（mml2ast/ast2json/mml2json）のTDD実装とテスト基盤の整備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に基づき、`mml2ast`のTDD環境を構築し、最初の簡単なテストケース（例: 空文字列の入力）を作成する。

2. 開発ワークフローの自動化と効率化 (`pnpm watch`スクリプトの改善)
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の実現に向け、PEGファイルの変更を監視し自動でビルド・テストを実行する基本的なwatchスクリプトを作成する。

3. GitHub Actionsの共通ワークフロー化によるCI/CD環境の整備
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、`project概要生成` GitHub Actionsを再利用可能な共通ワークフローとして定義する。

---
Generated at: 2025-08-11 07:03:47 JST
