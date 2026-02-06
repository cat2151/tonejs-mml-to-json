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

### 外部ライブラリの調査手順

**重要**: 外部ライブラリの機能を調査する際は、必ず以下の手順に従ってください。

1. **最新バージョンの確認**（最優先）
   - `package-lock.json`のcommit SHAを確認
   - GitHub リポジトリで最新コミットを確認
   - 差分がある場合は`npm update <package>`を実行してから調査開始

2. **調査の優先順位**
   - **1st: GitHubリポジトリの最新ソースコード**
   - **2nd: `node_modules`のインストール済みコード**
   - **理由**: `node_modules`は古いバージョンが残っている可能性が高い

3. **GitHub依存パッケージの更新方法**
   ```bash
   # パッケージを最新に更新（npm installではなくupdateを使用）
   npm update tonejs-json-sequencer
   
   # 更新確認
   cat package-lock.json | grep -A 3 "tonejs-json-sequencer"
   
   # ビルド
   npm run build:libs
   ```

4. **調査前のチェックリスト**
   - [ ] GitHubリポジトリで最新コミット日を確認
   - [ ] package-lock.jsonのSHAと比較
   - [ ] 差分がある場合は`npm update`実行
   - [ ] 最新版のソースコードで機能確認
   - [ ] 調査時は必ずバージョン情報を記録

5. **なぜこのプロセスが必要か**
   - `package.json`で`github:owner/repo`形式を使用すると、npm installは既存のSHAを維持する
   - `npm update`を実行しないと、最新の機能が反映されない
   - 古いバージョンで調査すると、既に解決済みの問題を再現することになる
   - **実例**: 2026-02-06にtonejs-json-sequencerが古かったため、既に実装済みの機能を「未実装」と誤判断した事例が発生

詳細は`ROOT_CAUSE_ANALYSIS.md`と`PREVENTION_STRATEGY.md`を参照

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
