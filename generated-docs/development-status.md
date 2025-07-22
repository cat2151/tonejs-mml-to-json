Last updated: 2025-07-22

# Development Status

## 現在のIssues
- 現在の開発は、GitHub Actionsの共通ワークフロー化、ディレクトリ構成の整理、そして複数のプロジェクト間での同期状態可視化に重点を置いています。
- また、開発環境の改善として、`pnpm watch` コマンドの自動化と機能強化に関する課題が残っています。
- MMLパーサー関連では、`mml2ast` および `ast2json` のTDD準備、そして `mml2json` 関数の新しいPEGベース実装に向けたテストケースの生成が進行中です。

## 次の一手候補
1. GitHub Actions共通ワークフローのさらなる適用と整理
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) にて言及されている「project概要生成」ワークフローを、[Issue #13](issue-notes/13.md) の方針に従ってprojectごとの設定部分を切り出し、共通ワークフローとして呼び出す形に移行する。具体的な実装方法について、既存の共通化されたActions（例：#17の成果）を参考にしながら、`agent` に共通ワークフロー呼び出しの設定コードを生成させるプロンプトを作成・実行する。

2. GitHub Actionsの同期状態可視化プロジェクト「actions-status」の初期構築
   - 最初の小さな一歩: [Issue #14](issue-notes/14.md) に基づき、新しいリポジトリ `actions-status` をGitHub上に作成する。初期コミットとして、プロジェクトの目的を記述したREADME.mdと、将来のActions設定のための空の`.github/workflows` ディレクトリ、および`package.json`（空で良い）を作成し、プッシュする。

3. 開発環境におけるpnpm watchスクリプトの機能改善
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の目標である「PEG更新時に自動でbuildしてtest」が確実に機能するように、現在の `pnpm watch` スクリプトを確認・修正する。具体的には、PEGファイルの変更を検知し、ビルド（`pegjs`）とテスト（`vitest`）を自動実行する最小限のスクリプトを記述・テストする。

---
Generated at: 2025-07-22 07:03:47 JST
