Last updated: 2025-08-19

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの「project概要生成」と「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化し、CI/CDの効率化を目指しています。
- 開発効率向上のため、`pnpm watch`スクリプトの自動実行と機能強化（PEGファイル監視、自動ビルド・テスト実行）を進めています。
- コア機能であるMMLからJSONへの変換について、TDDによる再実装に向けた準備（テストケース生成、TDD環境設定）を進めています。

## 次の一手候補
1. MMLからJSONへの変換機能のTDD準備を進める
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に従って、`mml2json`関数の既存コードベースから、TDDで実装し直すためのテストケースをAgentに生成させるプロンプトを準備・実行してください。

2. 開発環境の`pnpm watch`スクリプトを改善する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に従って、`package.json`内の`watch`スクリプトを修正し、PEGファイルの変更を監視して自動でビルドとテストが実行されるようにしてください。

3. GitHub Actionsの共通ワークフロー化に着手する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に従って、`project概要生成`のGitHub Actionsワークフローを再利用可能な共通ワークフローとして`./.github/workflows/reusable/generate-project-summary.yml`に切り出すためのファイルを作成してください。
```

---
Generated at: 2025-08-19 07:03:43 JST
