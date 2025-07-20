Last updated: 2025-07-21

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化、ディレクトリ構成の改善、コピー同期状態の可視化 ([Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md), [Issue #14](issue-notes/14.md), [Issue #13](issue-notes/13.md), [Issue #12](issue-notes/12.md)) に注力しています。
- 開発環境の効率化として、`pnpm watch` スクリプトの自動実行と機能強化 ([Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)) に取り組んでいます。
- 主要な変換関数である `mml2ast`, `ast2json`, `mml2json` のTDD環境準備とテストケース生成 ([Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md), [Issue #5](issue-notes/5.md)) が進行中です。

## 次の一手候補
1. GitHub Actionsのディレクトリ構造を共通化しやすく再構築する
   - 最初の小さな一歩: [Issue #12](issue-notes/12.md) に基づき、GitHub Actionsのディレクトリ構成を調査し、共通化・分離の候補となるファイルを特定する。現在の`.github/workflows`内のファイルリストと各ファイルが実行する内容をまとめてください。

2. 開発環境の `pnpm script watch` を強化し、自動化を進める
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の一環として、現在の `package.json` の `scripts` セクションから `watch` コマンドに関連する部分を抽出し、PEGファイルの変更を監視して自動でビルドする設定の実現可能性を評価する。

3. コア機能である `mml2json` のTDD準備を進める
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、既存の `mml2json` 関数（または関連するロジック）から、入力MML文字列とそれに対応する期待されるJSON出力の具体的なテストケースをいくつか抽出または作成する。

---
Generated at: 2025-07-21 07:04:09 JST
