Last updated: 2025-08-03

```markdown
# Development Status

## 現在のIssues
- 現在、GitHub Actionsの共通ワークフロー化（プロジェクト概要と関数コールグラフの生成）によるCI/CDプロセスの効率化を目指しています。
- 開発環境の改善として、`pnpm watch`スクリプトの機能強化とVSCode起動時の自動実行を進めています。
- 主要機能であるMMLからJSONへの変換について、TDDに基づいた実装とmml2ast、ast2jsonモジュールのテスト準備に注力しています。

## 次の一手候補
1. MMLからJSONへの変換機能のTDDによる実装推進
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、`mml2json`関数のTDD用テストケースを既存コードから生成するためのプロンプトをagentに与える。

2. 開発時のwatchスクリプト機能の拡張
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) にて定義されている `pnpm watch` スクリプトの機能のうち、まず「1行コマンド実行したらpage openする」部分の実現方法を調査する。

3. mml2astとast2jsonモジュールのTDD準備
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に基づき、`mml2ast`のTDD環境をセットアップするためのファイル構成や必要なツールについて調査・準備を開始する。
```

---
Generated at: 2025-08-03 07:04:05 JST
