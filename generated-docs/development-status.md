Last updated: 2025-07-30

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsのワークフロー共通化（[Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md)）を進め、プロジェクト概要や関数コールグラフの自動生成プロセスを効率化することを目指しています。
- 開発環境の改善として、`pnpm watch` コマンドの自動実行（[Issue #9](issue-notes/9.md)）と機能強化（[Issue #8](issue-notes/8.md)）が挙げられており、PEGファイルの監視と自動ビルド/テストを実現する計画です。
- コア機能であるMMLからJSONへの変換（[Issue #3](issue-notes/3.md)）の実装に向け、`mml2ast`（[Issue #6](issue-notes/6.md)）と `ast2json`（[Issue #7](issue-notes/7.md)）のTDD準備、および既存コードからTDD用テストケースを生成するタスク（[Issue #5](issue-notes/5.md)）が進められています。

## 次の一手候補
1. GitHub Actions「project概要生成」の共通ワークフロー化を進める
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) の詳細を確認し、現在の `project概要生成` ワークフローのスクリプト内容と依存関係を洗い出す。

2. pnpm watchスクリプトの機能強化に着手する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の詳細を確認し、現在の `pnpm watch` スクリプトが提供している機能と、追加で実装すべき「1行コマンド実行でページオープン」「PEGファイルwatch」「更新時の自動ビルド/テスト」の実現方法を調査する。

3. mml2json関数のTDD用テストケース生成（Agent利用）の準備を行う
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) の詳細を確認し、既存のコードベースからAgentにテストケースを生成させるための具体的なプロンプトや、エージェントに渡すコンテキスト（例: コードスニペット、期待される出力形式）を整理する。
```

---
Generated at: 2025-07-30 07:03:53 JST
