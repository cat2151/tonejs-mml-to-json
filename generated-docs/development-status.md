Last updated: 2025-07-25

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（プロジェクト概要、コールグラフHTMLビジュアライズ）と、開発環境の自動化（pnpm watchの機能拡張と自動起動）に関するIssueがオープン中です。
- 主要機能であるMMLからJSONへの変換について、TDDによる再実装の準備（テストケース生成、`mml2ast`/`ast2json`のTDD環境構築）が進められています。
- 具体的には、MML "c" をTone.jsが演奏可能な形式に変換する機能のTDD実装が目標とされています。

## 次の一手候補
1. MMLパーシング・変換機能のTDD準備を進める
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に対応するため、`mml2json` 関数のTDD用テストケースを生成するプロンプトをAI agentに与える。例えば「現在の `mml2json` 関数のコードベースを分析し、主要なMML構文（単音、休符、タイ、スラーなど）を網羅するテストケース（MML文字列と期待されるTone.js JSON出力のペア）を生成してください。」
2. 開発環境の自動化を改善する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に対応するため、`package.json` の `scripts.watch` を編集し、PEGファイルの変更を監視して自動でビルド・テストが実行されるように設定する。
3. GitHub Actionsの共通ワークフロー化に着手する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に対応するため、既存の「project概要生成」GitHub Actionsワークフローを分析し、共通ワークフローとして再利用可能な部分を特定する。

---
Generated at: 2025-07-25 07:03:55 JST
