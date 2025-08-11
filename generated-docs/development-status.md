Last updated: 2025-08-12

```markdown
# Development Status

## 現在のIssues
- 現在、GitHub Actionsの「project概要生成」([Issue #18](issue-notes/18.md))と「関数コールグラフhtmlビジュアライズ生成」([Issue #16](issue-notes/16.md))の共通ワークフロー化が課題としてオープンされています。
- 開発環境においては、VSCode起動時の`pnpm watch`自動実行([Issue #9](issue-notes/9.md))と、PEGファイル監視による自動ビルド/テストを含む`pnpm script watch`の機能強化([Issue #8](issue-notes/8.md))が検討されています。
- 主要機能であるMMLからTone.js形式への変換に関して、mml2ast([Issue #6](issue-notes/6.md))、ast2json([Issue #7](issue-notes/7.md))のTDD準備、mml2jsonのTDD用テストケース生成([Issue #5](issue-notes/5.md))、そしてMML 'c'の変換実装([Issue #3](issue-notes/3.md))が進行中です。

## 次の一手候補
1. MMLパーサー/コンバーターのTDD準備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に着手し、`mml2ast` 関数のTDD環境を構築するため、`src/parser/mml2ast.test.ts` ファイルを作成し、基本的なテストスイートの骨格を定義します。

2. 開発効率向上のためpnpm watchの自動化と機能強化に着手する
   - 最初の小さな一歩: [Issue #9](issue-notes/9.md) の実現に向けて、`.vscode/tasks.json` を編集し、VSCodeのワークスペースオープン時に `pnpm watch` コマンドが自動でバックグラウンド実行されるように設定を試みます。

3. GitHub Actions共通ワークフロー化の具体的な検討を開始する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に関連して、現在の `project-summary.yml` と `callgraph-enhanced.yml` の内容を比較検討し、共通化可能なステップや利用可能な既存アクションがないか調査を開始します。
```

---
Generated at: 2025-08-12 07:03:28 JST
