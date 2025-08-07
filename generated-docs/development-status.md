Last updated: 2025-08-08

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化が主な課題として残っており、特にプロジェクト概要と関数コールグラフの生成ワークフローを対象としています。
- 開発環境の改善として、`pnpm watch`の自動実行と機能拡張に関するIssueが存在しています。
- 主要な機能であるMMLからJSONへの変換について、TDD（テスト駆動開発）の準備と具体的な実装を進める必要があります。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化に着手
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md)「GitHub Actions「project概要生成」を共通ワークフロー化する」に着手し、既存のワークフローファイルの内容を確認して、共通化のスコープを特定する。

2. 開発環境の`pnpm watch`自動化を実装する
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md)「pnpm watchを、VSCodeを起動したら自動で実行開始させる」に取り組み、VSCodeの`tasks.json`や拡張機能を用いて自動実行の設定方法を調査・試行する。

3. MML2AST変換のTDD準備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md)「mml2astのTDD準備をする」に着手し、mml2ast機能のテストケースを定義するための準備（テスト環境のセットアップや基本的なテストファイルの作成）を行う。

---
Generated at: 2025-08-08 07:04:01 JST
