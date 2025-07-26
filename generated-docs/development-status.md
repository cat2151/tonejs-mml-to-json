Last updated: 2025-07-27

# Development Status

## 現在のIssues
- MMLからTone.jsが解釈できるJSON形式への変換機能について、TDDによる実装準備が主要な課題です。
- 開発効率向上のため、`pnpm watch`コマンドの強化やVSCode連携による開発環境の自動化が検討されています。
- GitHub Actionsにおける「project概要生成」と「関数コールグラフHTMLビジュアライズ生成」の共通ワークフロー化が残っています。

## 次の一手候補
1. MML→JSON変換機能のTDDによる実装を進める
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、現在のコードベースからTDD用テストケースをagentに生成させる。具体的なプロンプトを検討し、実行する。

2. 開発環境の自動化と効率化を進める
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`pnpm script watch` を「1行コマンド実行でページオープン、PEGファイルのwatch、PEG更新時の自動ビルドとテスト」を実現するように修正する。

3. GitHub Actionsの共通ワークフロー化に着手する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、「project概要生成」のGitHub Actionsワークフローを共通ワークフローとして抽象化するための調査と設計を開始する。

---
Generated at: 2025-07-27 07:03:59 JST
