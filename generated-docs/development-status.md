Last updated: 2025-08-18

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（project概要生成、関数コールグラフhtmlビジュアライズ生成）が進行中です。
- 主要機能であるMMLからJSONへの変換を実現するため、TDDの準備（mml2ast, ast2json, テストケース生成）が進められています。
- 開発環境の効率化を図るため、`pnpm watch` スクリプトの自動化と機能強化が検討されています。

## 次の一手候補
1. MMLからJSONへの変換機能のTDD実装に着手する
   - 最初の小さな一歩: [Issue #3](issue-notes/3.md) の達成に向けて、`MML c` を `tonejs-json-sequencer` が演奏できる形式に変換するための最小限のテストケースを定義し、それをパスするコードの記述を開始する。

2. 開発環境の`pnpm watch`スクリプトを機能強化する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の要件である「1行コマンド実行したらpage openする」機能を実現するため、`pnpm script watch`にWebブラウザを自動で開く機能（例: `open`パッケージの利用）を組み込む調査と試作を行う。

3. GitHub Actionsの共通ワークフロー化を進める
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) の「project概要生成」GitHub Actionsを共通ワークフローとして切り出すための具体的な計画を立て、共通化のメリットと影響範囲を評価する。
```

---
Generated at: 2025-08-18 07:03:36 JST
