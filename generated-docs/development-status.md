Last updated: 2025-08-26

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（[Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md)）が主要なテーマです。
- 開発環境の改善、特に`pnpm watch`の自動実行と機能拡張（[Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)）に関する課題があります。
- MMLからAST/JSONへの変換機能をTDDで再実装するための準備と具体的な実装（[Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md), [Issue #5](issue-notes/5.md), [Issue #3](issue-notes/3.md)）が残っています。

## 次の一手候補
1. GitHub Actions「project概要生成」の共通ワークフロー化
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md)の目標とする共通ワークフローの形式を調査し、現在の`project概要生成`のワークフローをレビューして、共通化に必要な情報（入力、出力、ステップ）を洗い出す。

2. 開発時の`pnpm watch`の自動実行化
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md)の解決に向け、VSCodeの`tasks.json`や`settings.json`を利用して、ワークスペース起動時に`pnpm watch`コマンドを自動で実行開始させるための設定方法を調査する。

3. MMLからJSON変換TDD用テストケースの生成準備
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md)に着手するため、既存のMMLからJSONへの変換ロジックを特定し、シンプルなMML入力（例: `c4`, `o4cde`）に対して現在どのようなJSONが出力されるか、コードを読んで理解する。

---
Generated at: 2025-08-26 07:03:53 JST
