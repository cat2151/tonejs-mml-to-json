# tonejs-mml-to-json の Copilot 指示書

## 基本方針

**重要**: このプロジェクトは、すべてのパースに Tree-sitter を使用します。

1. **grammar.js が唯一の情報源（Single Source of Truth）**
   - すべての MML 構文は `tree-sitter-mml/grammar.js` で定義されています
   - パース処理のロジック変更は、必ず grammar.js で最初に行う必要があります
   - 生成されるパーサー（C および WASM）は grammar.js から派生します

2. **手動パーサーの実装禁止**
   - 文字列パース、正規表現パーサー、カスタムパースロジックを実装しないでください
   - Tree-sitter の CST を AST に変換するだけにしてください

3. **参考**: https://github.com/cat2151/tree-sitter-wasm-c-generate-example

## 外部ライブラリ

**外部ライブラリにパッチや変更を加えないでください**（特に tonejs-json-sequencer）
- アドホックなパッチを作成せず、バグはユーザーに報告してください
- 適切な修正は、上流のライブラリで行うべきです
