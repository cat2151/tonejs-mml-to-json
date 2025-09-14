Last updated: 2025-09-15

# Development Status

## 現在のIssues
- GitHub Actionsにおける「project概要生成」と「関数コールグラフビジュアライズ生成」の共通ワークフロー化が課題です。
- 開発ワークフローの改善として、pnpm watchスクリプトの機能強化とVSCodeでの自動実行が検討されています。
- 主要機能であるMMLからJSONへの変換について、TDDでの再実装に向けた準備とテストケース生成が進められています。

## 次の一手候補
1. MML to JSON変換のTDD用テストケースを生成する
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) の内容に従い、既存の`mml2json`関数からTDDのためのテストケースを生成するプロンプトを作成し、agentに実行させる。

2. pnpm watchスクリプトを機能強化する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) を参照し、現在の`pnpm watch`スクリプトの内容を確認し、PEGファイルのウォッチ、自動ビルド、テスト実行を連携させるためのスクリプト修正計画を立てる。具体的には、`package.json`の`scripts`セクションを編集する。

3. GitHub Actionsの共通ワークフロー化を検討する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) と [Issue #16](issue-notes/16.md) の既存のGitHub Actionsワークフローファイルを比較し、共通化できるパターンやステップを洗い出す。再利用可能なコンポーネント（例: composite actions）の利用可能性を調査する。

---
Generated at: 2025-09-15 07:03:54 JST
