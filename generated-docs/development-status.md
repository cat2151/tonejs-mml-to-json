Last updated: 2025-08-23

# Development Status

## 現在のIssues
- 開発プロセスの改善として、GitHub Actionsにおける`project概要生成`と`関数コールグラフhtmlビジュアライズ生成`の共通ワークフロー化が課題となっています（`[Issue #18](issue-notes/18.md)`, `[Issue #16](issue-notes/16.md)`）。
- 開発効率向上のため、`pnpm watch`コマンドをVSCode起動時の自動実行や、ファイル更新時の自動ビルド・テスト・ページオープン機能に拡張することが計画されています（`[Issue #9](issue-notes/9.md)`, `[Issue #8](issue-notes/8.md)`）。
- MMLからTone.js互換JSONへの変換ロジックを再構築するため、`mml2ast`や`ast2json`のTDD準備を進め、MML 'c'の変換を含め、TDDに基づく実装を進める必要があります（`[Issue #7](issue-notes/7.md)`, `[Issue #6](issue-notes/6.md)`, `[Issue #5](issue-notes/5.md)`, `[Issue #3](issue-notes/3.md)`）。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化に着手する
   - 最初の小さな一歩: まず[Issue #18](issue-notes/18.md)の内容を確認し、`project概要生成`ワークフローの共通化に向けた現在の実装状況を把握する。

2. pnpm watch機能の強化に着手する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md)と[Issue #9](issue-notes/9.md)の内容を再確認し、既存の`pnpm watch`スクリプトをどのように拡張できるか、実現可能性を調査し、改善点をリストアップする。

3. MMLからJSONへの変換のTDD実装準備を進める
   - 最初の小さな一歩: `mml2ast`のTDD準備である[Issue #6](issue-notes/6.md)に取り組み、必要なテスト環境のセットアップやモックの作成を行う。

---
Generated at: 2025-08-23 07:03:32 JST
