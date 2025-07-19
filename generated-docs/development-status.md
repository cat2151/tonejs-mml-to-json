Last updated: 2025-07-20

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsに関して、共通化の試行、ディレクトリ構成の再構築、およびプロジェクト間同期の可視化を進めています。
- 開発ワークフローの効率化のため、`pnpm watch`の機能拡張とVSCodeでの自動実行を計画しています。
- MMLパーサー（mml2ast, ast2json）のTDDによる再実装に向けたテスト準備とテストケースの生成を進めています。

## 次の一手候補
1. GitHub Actionsの共通化と構造化を検証する
   - 最初の小さな一歩: [Issue #15](issue-notes/15.md) に基づき、共通化された`translate-readme`アクションが正しく機能するかを検証するために、テストワークフローを手動で実行し結果を確認する。

2. 開発ワークフロー（pnpm watch）を効率化する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の要件（1行コマンドでページオープン、PEGファイル監視、自動ビルド・テスト）を満たす`pnpm script watch`の初期実装に着手する。

3. MMLパーサーのTDD実装に向けたテストケースを準備する
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、現在のコードベースからTDD用のテストケースを自動生成するための、具体的なプロンプトを設計しAIエージェントに適用する。
```

---
Generated at: 2025-07-20 07:03:20 JST
