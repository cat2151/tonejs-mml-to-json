# Development Status

Last updated: 2025-07-15

# Development Status

## 現在のIssues
MMLからTone.jsが解釈できるJSON形式への変換機能の実装（TDDベース）が進行中です。
変換ロジック（AST生成、JSON変換）のTDD準備とテストケース生成に取り組んでいます。
加えて、開発環境の自動化（`pnpm watch`自動実行、PEGファイルの自動ビルド・テスト）も進めています。

## 次の一手候補
1. `mml2json`変換機能のTDD準備を進める
   - 最初の小さな一歩: 既存のMMLからJSONへの変換コードを基に、エージェントを使ってTDD用のテストケース（Issue #5）を生成する。

2. 開発効率向上のため、`pnpm watch`の自動化と機能拡張を進める
   - 最初の小さな一歩: VSCode起動時に`pnpm watch`スクリプトが自動で実行されるよう設定を試みる（Issue #9）。

3. MMLの最も基本的な要素「c」のJSON変換をTDDで実装する
   - 最初の小さな一歩: TDDのREDフェーズとして、MML "c" が期待されるJSON形式に変換されることを検証する最初のテストケースを記述し、失敗することを確認する（Issue #3）。

---
Generated at: 2025-07-15 09:18:40 JST
