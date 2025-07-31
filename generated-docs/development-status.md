Last updated: 2025-08-01

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（プロジェクト概要・関数コールグラフ生成）や、開発環境の `pnpm watch` コマンド改善に関するIssueがオープンしています。
- 特に `pnpm watch` は、VSCodeでの自動実行やPEGファイルの自動ビルド・テスト・ページオープン連動を目指しています。
- プロジェクトの主要機能であるMML変換（mml2ast, ast2json, mml2json）については、TDDによる再実装と品質向上に向けた準備と実装が課題として残っています。

## 次の一手候補
1. 開発環境の `pnpm watch` コマンド機能改善と自動化
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md) に着手し、VSCodeのタスク設定（`tasks.json`）を調査して、ワークスペースオープン時に `pnpm watch` が自動で開始されるように設定を追加します。

2. GitHub Actionsの共通ワークフローの実現
   - 最初の小さな一歩: まず [Issue #18](issue-notes/18.md) に着手し、既存の「project概要生成」ワークフローを再利用可能な共通ワークフローとして定義するためのYAML構文とディレクトリ構造を調査します。

3. MML変換機能のTDDによる堅牢な再実装に着手
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に着手し、既存の `mml2json` コードベースからテストケースを自動生成するための具体的なアプローチ（例: スナップショットテスト、プロパティベーステストなど）を検討し、必要なツールやライブラリを調査します。
```

---
Generated at: 2025-08-01 07:03:55 JST
