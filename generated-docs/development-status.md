Last updated: 2025-09-01

# Development Status

## 現在のIssues
- GitHub Actionsの効率化と共通ワークフロー化（`project概要生成`と`関数コールグラフhtmlビジュアライズ生成`）が主要な課題としてオープンしています。
- 開発ワークフローの改善（`pnpm watch`の自動実行と機能強化）が挙げられており、開発体験の向上が求められています。
- MML変換機能（`mml2ast`、`ast2json`、`mml2json`）をTDDで実装し直すための準備と、具体的なテスト駆動開発による機能実現が進行中です。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化を推進する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、「project概要生成」GitHub Actionsの共通ワークフロー化に着手するため、まず既存のワークフロー（例: `.github/workflows/generate-project-summaries.yml`）を分析し、共通化の対象となる処理ブロックを特定する。

2. 開発環境の自動化と効率化を進める
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、pnpm script watchコマンドを「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにするための具体的な要件を洗い出し、既存のnpm-scriptsや利用可能なツール（例: `nodemon`, `concurrently`）の調査を開始する。

3. MML変換機能のTDD準備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に基づき、`mml2ast`のTDD準備として、テストフレームワークのセットアップ（もし未設定であれば）と、`c`のような最もシンプルなMML入力に対する最初のテストケースの作成に着手する。

---
Generated at: 2025-09-01 07:03:35 JST
