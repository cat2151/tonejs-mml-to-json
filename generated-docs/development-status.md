Last updated: 2025-08-27

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（[Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md)）と、開発環境（[Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)）の自動化に関する課題が残っています。
- 主要機能である`mml2ast`や`ast2json`のTDD準備（[Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md)）を進める必要があります。
- 特に`mml2json`関数のTDDによる実装し直し（[Issue #5](issue-notes/5.md)）やMML "c" の変換機能の実現（[Issue #3](issue-notes/3.md)）が主な焦点となっています。

## 次の一手候補
1. `mml2json` 関数のTDD実装に向けた準備を進める
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に基づき、`mml2ast` のTDDに必要なファイル構造（例: `src/mml2ast/index.ts`, `test/mml2ast.test.ts`）や、初期のテストコードを作成する。

2. 開発効率を高めるため、`pnpm watch` スクリプトを改善する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の要件に基づき、「1行コマンド実行でpage openし、PEGファイルをwatchして、更新時に自動でbuildしてtest」を実現するための`package.json`スクリプトの構成を検討し、最初の修正を試みる。

3. GitHub Actionsのワークフローを共通化し、保守性を向上させる
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、「project概要生成」のGitHub Actionsを共通ワークフローとして定義するための、既存のワークフローファイルの分析と、再利用可能なコンポーネントの特定を開始する。
```

---
Generated at: 2025-08-27 07:03:45 JST
