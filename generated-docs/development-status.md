Last updated: 2025-08-13

# Development Status

## 現在のIssues
-   GitHub Actionsの共通ワークフロー化を進め、プロジェクト概要や関数コールグラフの自動生成を効率化しています。
-   開発環境の効率化のため、`pnpm watch`スクリプトを強化し、自動でブラウザを開き、PEGファイルの変更監視と自動ビルド・テストを行う機能の実装を進めています。
-   プロジェクトの中心機能であるMMLからJSONへの変換について、TDD（テスト駆動開発）を用いた堅牢な再実装に向けた準備と、具体的なテストケースに基づく実装を進めています。

## 次の一手候補
1.  TDDによりMML "c" の変換を実現する ([Issue #3](issue-notes/3.md))
    -   最初の小さな一歩: [Issue #3](issue-notes/3.md) の内容を確認し、MML "c" を入力とした際の最小限のtonejs-json-sequencerが演奏可能なJSON出力を定義するテストケースを作成してください。

2.  `pnpm script watch`の機能強化 ([Issue #8](issue-notes/8.md))
    -   最初の小さな一歩: 現在の `pnpm watch` スクリプトに、開発サーバー起動後、ブラウザを自動で開く機能を追記し、動作確認を行ってください。

3.  GitHub Actions「project概要生成」の共通ワークフロー化 ([Issue #18](issue-notes/18.md))
    -   最初の小さな一歩: `.github/workflows/reusable/` ディレクトリ配下に `generate-project-summary.yml` ファイルを作成し、共通ワークフローの基本構造（`on: workflow_call:` の定義を含む）を記述してください。

---
Generated at: 2025-08-13 07:03:27 JST
