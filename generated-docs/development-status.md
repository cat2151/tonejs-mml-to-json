Last updated: 2025-08-22

# Development Status

## 現在のIssues
- MMLパーサーの中核機能（mml2ast, ast2json, mml2json）をTDDで実装するための準備とテストケースの生成が進行中です。
- プロジェクト概要や関数コールグラフのHTMLビジュアライズ生成といったGitHub Actionsワークフローの共通化が課題として残っています。
- 開発環境においては、`pnpm watch` スクリプトの機能強化と、VSCode起動時の自動実行による効率化が求められています。

## 次の一手候補
1. MMLパーサーのTDDによる機能実装の推進
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) の TDD 準備に着手するため、`test/mml2ast/` ディレクトリと `test/mml2ast/index.test.ts` ファイルを作成する。

2. GitHub Actionsワークフローの共通化によるCI/CDの効率化
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) の「project概要生成」を共通ワークフロー化するための計画を立て、既存のワークフローを共通化可能な要素に分解する。

3. 開発環境の自動化と効率改善
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md) の「pnpm watchをVSCode起動時に自動実行させる」ためのVSCodeタスク（`.vscode/tasks.json`）の構成方法を調査し、最小限のタスク設定を試みる。

---
Generated at: 2025-08-22 07:03:49 JST
