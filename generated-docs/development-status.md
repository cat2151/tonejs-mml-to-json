Last updated: 2026-01-13

# Development Status

## 現在のIssues
- DeepWiki登録に伴い、[Issue #67](../issue-notes/67.md) にてREADME.ja.mdの先頭にDeepWikiバッジをcomドメインで追加する必要があります。
- [Issue #66](../issue-notes/66.md) と [Issue #65](../issue-notes/65.md) では、tonejs-json-sequencerのデモを参考にSampler機能を実装するため、MMLでの`@Sampler{JSON}`形式の仮仕様検討および実装に着手しています。
- [Issue #56](../issue-notes/56.md) は、既存のMML機能がRust WASM統合後も全体的に正しく動作することを確認するためのテストが計画されています。

## 次の一手候補
1. [Issue #67](../issue-notes/67.md): DeepWikiバッジのREADME.ja.mdへの追加
   - 最初の小さな一歩: `README.ja.md`の最新内容を確認し、DeepWikiバッジの適切なURLとMarkdown記述形式を特定する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `README.ja.md`

     実行内容: `README.ja.md`の先頭のQuick Linksセクションの前にDeepWikiのバッジを追加してください。バッジのURLは`https://deepwiki.com/tonejs-mml-to-json`を使用してください。

     確認事項: 既存のREADME.ja.mdのフォーマット（特に他のバッジとの整列やQuick Linksセクション前の配置）、DeepWikiの公式ロゴや推奨Markdown形式があればそれに従うこと。

     期待する出力: DeepWikiバッジが追加された`README.ja.md`のファイル内容。
     ```

2. [Issue #65](../issue-notes/65.md) および [Issue #66](../issue-notes/66.md): Sampler機能のMML仕様検討と実装開始
   - 最初の小さな一歩: `tonejs-json-sequencer`リポジトリ内のSampler関連デモのJSON構造を詳細に分析し、MMLでの表現方法（例：`@Sampler{...}`内のJSON構造）の仮設計を文書化する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `tonejs-json-sequencer`リポジトリ内のSampler関連デモファイル、`README.ja.md`（Samplerセクションの更新検討）、`src/mml2ast.ts`、`src/ast2json.ts`、`rust/src/lib.rs`、`rust/src/mml2ast.rs`、`rust/src/ast2json.rs`

     実行内容: [Issue #65](../issue-notes/65.md) で提案されている`@Sampler{～}`形式のMMLコマンドについて、`tonejs-json-sequencer`のSamplerデモJSON構造を参考に、MMLからAST、そしてJSONへの変換パスでどのようなデータ構造をサポートすべきかを分析してください。具体的には、`@Sampler{ ... }`内の`~`がどのようなJSONを受け入れ、それをAST、そして最終的なTone.js JSONシーケンサーフォーマットにどうマッピングするかを定義し、その実装に必要なコード変更（TypeScriptとRust両方）の概要をmarkdown形式で提示してください。

     確認事項:
     1. `tonejs-json-sequencer`のSamplerデモにおけるJSONフォーマットの正確な理解。
     2. 既存のMMLパーサー（`mml2ast.ts`/`rust/src/mml2ast.rs`）とAST to JSON変換（`ast2json.ts`/`rust/src/ast2json.rs`）の拡張性。
     3. MML構文として自然で、かつTone.jsのSampler機能をフル活用できるようなパラメータ設計。
     4. `README.ja.md`のMMLコマンドリファレンスにある「tonejs-json-sequencer との機能対応状況」セクションのSampler行の更新。

     期待する出力: Sampler機能のMML仕様案（`@Sampler`コマンドの詳細）、ASTの拡張案、およびTone.js JSONへのマッピング定義を記述したmarkdownファイル。可能であれば、TypeScriptおよびRustでの実装における主要な変更点（関数名、データ構造など）のコードスニペットの骨子も含めてください。
     ```

3. [Issue #56](../issue-notes/56.md): 既存MML機能の全体的な動作確認
   - 最初の小さな一歩: 既存の`test/`ディレクトリにあるテストファイルをリストアップし、実行可能なテストスイートの構成を把握する。特にRust WASM統合後の回帰テストの観点から、不足しているテストケースがないかを確認する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `test/`ディレクトリ内の全テストファイル（例: `test/mml2ast.test.js`, `test/ast2json.test.js`, `test/integration.test.js`, `test/wasm-integration-test.mjs` など）、`package.json`（テストスクリプト）、`src/`ディレクトリ内の各機能実装ファイル、`rust/src/`ディレクトリ内のテスト関連ファイル

     実行内容: 現在のプロジェクトで定義されている既存のMMLコマンド（音符、休符、オクターブ、長さ、楽器、マルチトラック、和音など）が全て正しく動作していることを確認するためのテスト計画を立案してください。特にRust WASM統合後の回帰テストの観点から、既存のテストカバレッジを評価し、不足しているテストケースがあればそれを具体的にリストアップしてください。

     確認事項:
     1. `package.json`に定義されているテスト実行コマンドとその詳細。
     2. JavaScript (TypeScript) とRust (WASM) の両実装で同等のテストが実施されているか。
     3. `README.ja.md`のMMLコマンドリファレンスに記載されている全ての「実装済みコマンド」が網羅的にテストされているか。
     4. 特に和音やマルチトラックなど、複雑な相互作用がある機能のテスト状況。

     期待する出力: 既存MML機能の動作確認テスト計画を記載したmarkdownファイル。計画には、テスト対象の機能、テストの実行方法、不足しているテストケースのリスト、およびそれらの追加方法（例: 新しいテストファイルまたは既存ファイルへの追記）を含めてください。
     ```

---
Generated at: 2026-01-13 07:05:44 JST
