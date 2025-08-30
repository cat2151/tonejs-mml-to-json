Last updated: 2025-08-31

# Development Status

## 現在のIssues
- 複数のGitHub Actions（プロジェクト概要生成、関数コールグラフ生成）の共通ワークフロー化（[Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md)）が課題となっています。
- 開発ワークフローの改善として、`pnpm watch` スクリプトの機能拡張と自動実行の仕組み（[Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)）が検討されています。
- TDDによる主要機能（mml2ast, ast2json, mml2json）の再実装に向けた準備と、MML `c` の変換実装（[Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md), [Issue #5](issue-notes/5.md), [Issue #3](issue-notes/3.md)）が進行中です。

## 次の一手候補
1. mml2astのTDD準備を進める（[Issue #6](issue-notes/6.md)）
   - 最初の小さな一歩: `src/mml2ast/` ディレクトリ内にテストファイル `index.test.ts` を作成し、基本的なテストスイートの雛形を定義する。

2. MML `c` のTDD実装に着手する（[Issue #3](issue-notes/3.md)）
   - 最初の小さな一歩: `mml2json` のテストディレクトリに、MML `c` を入力とし、期待される`tonejs-json-sequencer` 形式のJSONを出力とする最小限のテストケースを記述する。

3. 開発用watchスクリプトを改善する（[Issue #8](issue-notes/8.md)）
   - 最初の小さな一歩: `package.json` の `scripts` に定義されている `watch` コマンドの現在の動作を確認し、[Issue #8](issue-notes/8.md) に記載されている要件のうち、現状で満たされているものと不足しているものを洗い出す。

---
Generated at: 2025-08-31 07:03:23 JST
