Last updated: 2025-08-02

```markdown
# Development Status

## 現在のIssues
- 現在、主要なMMLからTone.js互換JSONへの変換機能をTDDで実装するための準備 ([Issue #3](issue-notes/3.md), [Issue #5](issue-notes/5.md)) と、`mml2ast`や`ast2json`といったコアモジュールのTDD基盤の整備（[Issue #6](issue-notes/6.md), [Issue #7](issue-notes/7.md)）が進行中です。
- 開発環境の改善として、`pnpm watch`スクリプトの機能拡張 ([Issue #8](issue-notes/8.md)) やVSCodeでの自動実行 ([Issue #9](issue-notes/9.md)) が課題として残っています。
- また、GitHub Actionsにおける「project概要生成」([Issue #18](issue-notes/18.md)) と「関数コールグラフhtmlビジュアライズ生成」([Issue #16](issue-notes/16.md)) の共通ワークフロー化も進行中の課題です。

## 次の一手候補
1. 主要なMML変換機能のTDD準備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に沿って、`mml2ast`のTDD準備として、プロジェクトにテストフレームワークをセットアップし、最低限のテストファイル（例: `test/mml2ast.test.ts`）を作成する。

2. 開発環境のpnpm watchスクリプトとVSCode連携を改善する
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md) に取り組み、VSCodeでプロジェクトを開いた際に `pnpm watch` コマンドが自動で実行されるように `.vscode/tasks.json` を設定する。

3. GitHub Actionsの共通ワークフロー化に着手する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に着手し、「project概要生成」ワークフローを共通化するための調査を開始する。既存のワークフローファイル（例: `.github/workflows/generate-project-summary.yml`）を特定し、共通ワークフローの構造を検討する。
```

---
Generated at: 2025-08-02 07:03:46 JST
