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

## アーキテクチャ

3段階パイプライン:
```
MML文字列 → [Tree-sitter] → CST → [cst_to_ast (Rust/WASM)] → AST → [ast2json (Rust/WASM)] → Tone.js JSON
```

- **ブラウザ**: `web-tree-sitter` (JS) でパース、Rust/WASM で CST→AST→JSON 変換
- **ネイティブ Rust**: Tree-sitter C バインディング（`tree-sitter` feature フラグ）

## 主要ファイル

| 役割 | 場所 |
|------|------|
| MML文法 (SSOT) | `tree-sitter-mml/grammar.js` |
| CST→AST変換 | `rust/src/cst_to_ast.rs` |
| AST→JSON変換 | `rust/src/ast2json.rs` |
| AST型定義 | `rust/src/ast.rs` |
| TypeScriptエントリ | `src/index.ts` |
| テストセットアップ | `test/setup.js` |

## ビルド・テスト

```bash
pnpm run build      # フルビルド（WASM + TS + libs）
pnpm test           # vitest テスト
pnpm run test:wasm  # WASM統合テスト
pnpm run dev        # 開発用watchモード
```

## 新しい MML コマンドの追加手順

1. `tree-sitter-mml/grammar.js` にルール追加
2. Tree-sitter パーサー再生成
3. `rust/src/cst_to_ast.rs` の `parse_cst_node()` に追加
4. 必要に応じて `rust/src/ast.rs` に新しい `AstToken` を追加
5. `rust/src/ast2json.rs` で新トークンを処理
6. `test/mml2ast.test.js` と `test/ast2json.test.js` にテスト追加
