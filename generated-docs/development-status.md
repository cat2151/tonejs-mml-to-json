Last updated: 2025-08-04

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの「project概要生成」([Issue #18](issue-notes/18.md))と「関数コールグラフhtmlビジュアライズ生成」([Issue #16](issue-notes/16.md))の共通ワークフロー化が課題です。
- 開発環境の自動化（`pnpm watch`のVSCodeでの自動開始や多機能化）に関する改善要望（[Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)）があります。
- `mml2json`関数のTDDによる再実装に向けた準備（テストケース生成、`mml2ast`と`ast2json`のTDD準備）と、MMLの`c`音変換のTDD実装（[Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md), [Issue #5](issue-notes/5.md), [Issue #3](issue-notes/3.md)）が進められています。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化を進める
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) を確認し、「project概要生成」のための共通ワークフローの初期設計を開始する。具体的には、共通ワークフローのテンプレートとなるymlファイルを作成し、必要な入出力を定義する。

2. 開発環境（pnpm watch）の自動化と効率化
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`pnpm script watch`を「1行コマンドでpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」にするための調査を開始する。まずは既存のwatchスクリプトにページオープン機能を追加できるか試行する。

3. MML変換機能のTDD実装の準備と着手
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に着手し、現在のコードベースから`mml2json`関数のTDD用テストケースを生成するアプローチを検討・試行する。既存のMML入力と期待されるJSON出力のペアを抽出するためのスクリプトや手順をまとめる。
```

---
Generated at: 2025-08-04 07:03:44 JST
