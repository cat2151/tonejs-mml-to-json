Last updated: 2026-01-11

# Development Status

## 現在のIssues
- 最近のコミットで `tonejs-json-sequencer` ライブラリへの移行が行われたため、主要機能の動作確認が喫緊の課題となっています。
- また、TDDアプローチで `mml2json` 関数を再実装する準備として、既存のコードベースからAgentにテストケースを生成させる計画が進行中です。
- これらのタスクは、プロジェクトの安定性向上と効率的な開発ワークフロー確立を目指しています。

## 次の一手候補
1.  Tone.jsシーケンサーライブラリへの移行に伴う主要機能の動作確認とテスト強化
    -   最初の小さな一歩: `src/play.ts` と `src/demos.ts` を確認し、`tonejs-json-sequencer` の具体的な利用方法と、既存のMML入力に対する再生動作を把握する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/play.ts`, `src/demos.ts`, `test/integration.test.js`, `test/mml2ast.test.js`

        実行内容: `src/play.ts`と`src/demos.ts`における`tonejs-json-sequencer`の利用状況を分析し、既存のテストファイル(`test/integration.test.js`や`test/mml2ast.test.js`)でカバーされている範囲と、`tonejs-json-sequencer`への移行によって新たに考慮すべきテストシナリオを洗い出してください。特に、複数のMMLトラックの再生、テンポ・音量・音色変更が正しく反映されるかを確認する観点で分析してください。

        確認事項: `package.json`で`tonejs-json-sequencer`が正しく依存関係として定義され、最新バージョンが利用されていることを確認してください。また、`src/mml2json-wasm.ts`や`rust/src/lib.rs`など、MMLパーシング部分の出力が期待通りであることを前提とします。

        期待する出力: 既存のテストを拡張するための具体的なテストケース案（MML入力と期待される再生結果の記述、またはテストコードの骨格）をmarkdown形式で出力してください。また、未カバーの動作確認シナリオがあれば列挙してください。
        ```

2.  `mml2json` 関数TDD再実装のためのテストケース生成
    -   最初の小さな一歩: `src/mml2json.js` (または`src/mml2json-wasm.ts`のラッパー関数) の現在の入出力仕様を理解し、既存のMMLパーサー関連テスト(`test/parser.test.js`)から典型的な入力MML文字列とそれに対応するJSON出力を特定する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/mml2json.js`, `src/mml2json-wasm.ts`, `test/parser.test.js`, `test/mml2ast.test.js`, `rust/src/mml2ast.rs`, `rust/src/ast2json.rs`

        実行内容: `mml2json`関数の新規TDD実装の準備として、現在のJavaScript/WASM実装（`src/mml2json.js`または`src/mml2json-wasm.ts`を通じてRustの`mml2ast.rs`と`ast2json.rs`）の入出力挙動を分析してください。MML文字列がJSONオブジェクトに変換される際の、主要な文法要素（音符、休符、長さ、オクターブ、ボリューム、テンポ、トラックなど）に対応する入力MMLと期待されるJSON出力のペアを、テストケースとして利用可能な形式で5つ生成してください。

        確認事項: `mml2json`の出力が、`tonejs-json-sequencer`で利用可能なJSONフォーマットに準拠していることを確認してください。生成するテストケースは、TDDのREDフェーズを想定し、簡潔かつ明確なものとしてください。

        期待する出力: 生成された入力MMLと期待されるJSON出力のペアを、JavaScriptのテストフレームワーク（例: `test`関数）で直接利用できる形式のコードブロックとしてmarkdownで出力してください。
        ```

3.  `tonejs-json-sequencer` への移行に関するドキュメント更新
    -   最初の小さな一歩: `README.md`, `QUICKSTART.md`, `LIBRARY_USAGE.md` をレビューし、古い再生方法やプレイヤーに言及している箇所がないか、また `tonejs-json-sequencer` の導入によって変更されたAPIや使用方法について記述が不足していないかを確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `README.md`, `QUICKSTART.md`, `LIBRARY_USAGE.md`, `src/play.ts`, `src/demos.ts`

        実行内容: 最近のコミット(`efe9f38`)でカスタムプレイヤーが`tonejs-json-sequencer`ライブラリに置き換えられたことを踏まえ、既存のドキュメント(`README.md`, `QUICKSTART.md`, `LIBRARY_USAGE.md`)を分析してください。この変更がユーザーに与える影響を考慮し、ドキュメント内で更新または追加が必要な箇所（例: ライブラリのセットアップ、MMLデータの再生方法、利用可能な機能の記述など）を具体的に特定してください。

        確認事項: ドキュメントの変更案は、既存のプロジェクト構造や用語の整合性を保つようにしてください。特に、`tonejs-json-sequencer`の利用方法が明確に示されているかを確認してください。

        期待する出力: 更新が必要なドキュメントのセクション名と、それぞれのセクションに対する具体的な変更内容の提案をmarkdown形式で出力してください。提案には、必要に応じて`src/play.ts`や`src/demos.ts`からのコードスニペットを含めることができます。

---
Generated at: 2026-01-11 07:05:24 JST
