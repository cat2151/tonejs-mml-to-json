Last updated: 2025-08-09

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsのワークフロー共通化を進めており、プロジェクト概要と関数コールグラフの自動生成を効率化する計画です。
- 開発環境においては、`pnpm watch`スクリプトの自動実行と機能強化を図り、開発フローの利便性向上を目指しています。
- 主要機能であるMMLからJSONへの変換ロジックをTDDで再実装するため、`mml2json`、`mml2ast`、`ast2json`のテストケース整備と段階的な実装準備を進めています。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化を推進する
   - 最初の小さな一歩: `github-actions/project-summary-generator`を共通ワークフロー化するためのブランチを作成し、[Issue #18](issue-notes/18.md) に基づき共通ワークフローの導入に着手する。
     * `git checkout -b feature/common-workflow-project-summary`

2. 開発環境の自動化と効率化を完了させる
   - 最初の小さな一歩: VSCodeのタスク設定に`pnpm watch`の自動実行を追加するブランチを作成し、[Issue #9](issue-notes/9.md) の内容を実装する。
     * `git checkout -b feature/vscode-auto-watch`

3. MMLからJSONへの変換ロジックのTDDによる再実装準備を進める
   - 最初の小さな一歩: `mml2json`関数のTDD用テストケースを既存コードから生成するブランチを作成し、[Issue #5](issue-notes/5.md) のタスクを実行する。
     * `git checkout -b feature/generate-mml2json-tests`
```

---
Generated at: 2025-08-09 07:04:13 JST
