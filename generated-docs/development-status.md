Last updated: 2025-08-14

```markdown
# Development Status

## 現在のIssues
- プロジェクトの中核機能であるMMLからJSONへの変換について、[Issue #3](issue-notes/3.md), [Issue #5](issue-notes/5.md), [Issue #6](issue-notes/6.md), [Issue #7](issue-notes/7.md) にてTDDによる実装と準備が進行中です。
- 開発環境の改善として、[Issue #8](issue-notes/8.md) と [Issue #9](issue-notes/9.md) で`pnpm watch`スクリプトの機能強化とVSCodeでの自動実行が課題となっています。
- GitHub Actionsの効率化として、[Issue #16](issue-notes/16.md) と [Issue #18](issue-notes/18.md) でプロジェクト概要や関数コールグラフの自動生成ワークフローの共通化が計画されています。

## 次の一手候補
1. TDD用テストケースの生成に着手する ([Issue #5](issue-notes/5.md))
   - 最初の小さな一歩: `mml2json`関数のTDD用テストケースを生成するため、現在のコードベースから、MML入力と期待されるJSON出力の具体的なペアを5つ以上特定し、テスト設計を開始する。

2. `pnpm watch`スクリプトの機能を拡張し開発効率を向上させる ([Issue #8](issue-notes/8.md))
   - 最初の小さな一歩: `pnpm watch`スクリプトが実行時に自動でローカル開発サーバーを起動し、ブラウザで対応するページを開く機能を追加する。

3. GitHub Actions「project概要生成」の共通ワークフロー化を進める ([Issue #18](issue-notes/18.md))
   - 最初の小さな一歩: 既存の「project概要生成」ワークフローのYAMLファイル（例: `.github/workflows/project-summary.yml`）をレビューし、共通化できる設定やスクリプトブロックを特定する。
```

---
Generated at: 2025-08-14 07:03:48 JST
