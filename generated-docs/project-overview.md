Last updated: 2026-01-16

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書かれた音楽データを、ウェブブラウザで再生可能なTone.js互換JSON形式に変換するライブラリです。
- ユーザーは簡単なテキスト形式で音楽を作成し、それをウェブサイトで演奏できるようになります。
- JavaScriptとRust (WASM) で実装されており、npmパッケージまたはCDNを通じて簡単にプロジェクトに統合し利用できます。

## 技術スタック
- フロントエンド: WASM (WebAssembly) - Rustで書かれた高速な変換ロジックをブラウザで実行するために使用されます。
- 音楽・オーディオ: Tone.js - 変換されたJSONフォーマットが対象とするJavaScriptオーディオフレームワークです。直接は利用しませんが、`tonejs-json-sequencer`を通じて関連します。
- 開発ツール:
    - TypeScript: プロジェクトの主要な開発言語として利用され、コードの品質と保守性を高めます。
    - @types/node: Node.jsの型定義。
    - http-server: ローカル開発環境で静的ファイルを提供するためのシンプルなWebサーバー。
    - @google/generative-ai, @octokit/rest, dotenv: AIによるドキュメント生成やGitHub連携などの開発支援ツールやユーティリティ。
- テスト: Vitest - JavaScript/TypeScriptコードの高速な単体テストフレームワーク。
- ビルドツール:
    - Rust: 高性能なMMLパーサーおよびAST-JSON変換器のWASMモジュールを生成するために使用されます。
    - TypeScript Compiler (tsc): TypeScriptコードをJavaScriptにコンパイルします。
- 言語機能:
    - TypeScript: 静的型付けを特徴とするJavaScriptのスーパーセット。
    - JavaScript: ブラウザおよびNode.js環境での実行を可能にする主要言語。
    - Rust: パフォーマンスが重要なMMLパース処理のためにWebAssemblyのバックエンドとして採用されています。
- 自動化・CI/CD: GitHub Actions - READMEの自動生成など、リポジトリのワークフロー自動化に利用されます。
- 開発標準: .editorconfig - 複数の開発者が一貫したコーディングスタイルを維持するための設定ファイル。

## ファイル階層ツリー
```
📄 .editorconfig
📁 .github_automation/
  📁 callgraph/
    📁 config/
      📊 my.json
📄 .gitignore
📄 .nojekyll
📖 IMPLEMENTATION_SUMMARY.md
📖 LIBRARY_USAGE.md
📄 LICENSE
📖 QUICKSTART.md
📖 README.ja.md
📖 README.md
📄 _config.yml
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 dist/
  📘 ast2json.d.ts
  📄 ast2json.d.ts.map
  📜 ast2json.js
  📄 ast2json.js.map
  📘 demos.d.ts
  📄 demos.d.ts.map
  📜 demos.js
  📄 demos.js.map
  📘 index.d.ts
  📄 index.d.ts.map
  📜 index.js
  📄 index.js.map
  📁 libs/
    📘 tonejs-json-sequencer.d.ts
    📄 tonejs-json-sequencer.mjs
  📘 main.d.ts
  📄 main.d.ts.map
  📜 main.js
  📄 main.js.map
  📘 mml2ast.d.ts
  📄 mml2ast.d.ts.map
  📜 mml2ast.js
  📄 mml2ast.js.map
  📘 mml2json-wasm.d.ts
  📄 mml2json-wasm.d.ts.map
  📜 mml2json-wasm.js
  📄 mml2json-wasm.js.map
  📘 play.d.ts
  📄 play.d.ts.map
  📜 play.js
  📄 play.js.map
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
  📜 callgraph.js
  🎨 style.css
🌐 googled947dc864c270e07.html
🌐 index.html
📁 issue-notes/
  📖 61.md
  📖 63.md
  📖 65.md
  📖 67.md
  📖 69.md
  📖 71.md
  📖 72.md
  📖 73.md
🌐 library-usage-example.html
📊 package-lock.json
📊 package.json
📁 pkg/
  📄 .npmignore
  📖 README.md
  📊 package.json
  📘 tonejs_mml_to_json.d.ts
  📜 tonejs_mml_to_json.js
  📄 tonejs_mml_to_json_bg.wasm
  📘 tonejs_mml_to_json_bg.wasm.d.ts
📄 pnpm-lock.yaml
📁 rust/
  📄 Cargo.toml
  📖 IMPLEMENTATION.md
  📖 README.md
  📄 build.rs
  📁 examples/
    📄 basic_usage.rs
  📁 src/
    📄 ast.rs
    📄 ast2json.rs
    📄 cst_to_ast.rs
    📄 lib.rs
    📄 mml2ast.rs
    📄 mml2ast_manual.rs
📁 scripts/
  📜 copy-libs.js
📁 src/
  📘 ast2json.ts
  📘 demos.ts
  🌐 index.html
  📘 index.ts
  📘 main.ts
  📘 mml2ast.ts
  📘 mml2json-wasm.ts
  📘 play.ts
📁 test/
  📜 ast2json.test.js
  📄 demo-test.mjs
  📜 integration.test.js
  📜 library-entry.test.js
  📜 mml2ast.test.js
  📜 setup.js
  📄 wasm-init-test.mjs
  📄 wasm-integration-test.mjs
  📄 wasm-test.mjs
📊 tsconfig.json
📜 vitest.config.js
```

## ファイル詳細説明
- **README.ja.md / README.md**: プロジェクトの目的、機能、使い方、MMLコマンドリファレンス、開発状況など、プロジェクトの全体像を説明する主要なドキュメントです。
- **LIBRARY_USAGE.md**: ライブラリをnpmパッケージまたはCDN経由で利用する具体的な方法とコード例を提供します。
- **src/index.ts**: ライブラリのエントリーポイント。WASMモジュールの初期化や主要なMML-to-JSON変換関数を外部に公開します。
- **src/mml2ast.ts**: MML文字列を抽象構文木（AST）にパースするJavaScript/TypeScriptコードが含まれています。
- **src/ast2json.ts**: 抽象構文木（AST）をTone.jsシーケンサー互換のJSONフォーマットに変換するJavaScript/TypeScriptコードが含まれています。
- **src/mml2json-wasm.ts**: Rustで実装されたWebAssemblyモジュールを初期化し、JavaScriptから利用するためのラッパー関数を提供します。
- **pkg/tonejs_mml_to_json.js**: RustコードをWebAssemblyにコンパイルした際のJavaScriptグルーコード。WASMモジュールとのインターフェースを提供します。
- **pkg/tonejs_mml_to_json_bg.wasm**: Rustコードから生成されたWebAssemblyバイナリファイル。MMLパースやAST-JSON変換のコアロジックを含みます。
- **rust/src/\*.rs**: プロジェクトのRust部分のソースコード。`ast.rs` (AST定義)、`mml2ast.rs` (MMLパーサー)、`ast2json.rs` (AST-JSON変換) などが含まれ、WASMモジュールとしてコンパイルされます。
- **dist/\***: プロジェクトのビルド成果物が格納されるディレクトリ。JavaScriptファイル、型定義ファイル、ソースマップなどが含まれ、npmパッケージとして配布されます。
- **src/play.ts**: 変換されたTone.js JSONシーケンサーデータをブラウザで再生するためのデモ用ロジック。`tonejs-json-sequencer`ライブラリを利用します。
- **src/demos.ts**: デモページで使用されるMMLサンプルデータや、それらを選択・表示するためのスクリプトを提供します。
- **index.html / src/index.html / library-usage-example.html**: ブラウザでライブラリのデモや使用例を確認するためのHTMLファイルです。
- **test/\*.test.js / test/\*.mjs**: 各変換ステップ（MML-AST、AST-JSON）やライブラリ全体、WASMモジュールの機能が正しく動作するか検証するためのテストファイル群です。

## 関数詳細説明
- **initWasm()**:
    - 役割: WebAssemblyモジュールを非同期で初期化します。
    - 引数: なし。
    - 戻り値: Promise<void>。WASMモジュールの初期化が完了した後に解決されます。
    - 機能: ライブラリのWASMベースの変換機能を使用する前に必ず呼び出す必要があります。
- **mml2json(mml: string)**:
    - 役割: 入力されたMML（Music Macro Language）文字列を、Tone.jsが解釈できるJSONシーケンサーフォーマットに変換します。
    - 引数: `mml` (string) - 変換対象のMML文字列。
    - 戻り値: `any` (JSONオブジェクト) - 変換後のTone.jsシーケンサーJSONデータ。
    - 機能: MMLパースとAST-JSON変換のプロセスを統合した、ライブラリのメイン変換関数です。
- **mml2ast(mml: string)**:
    - 役割: MML文字列を抽象構文木（AST）データ構造にパースします。
    - 引数: `mml` (string) - パース対象のMML文字列。
    - 戻り値: `any` (ASTオブジェクト) - MML構造を表すAST。
    - 機能: MMLの構文解析を行い、音楽の論理構造を中間表現として構築します。
- **ast2json(ast: any)**:
    - 役割: 抽象構文木（AST）をTone.jsシーケンサー互換のJSONフォーマットに変換します。
    - 引数: `ast` (any) - `mml2ast`によって生成されたASTオブジェクト。
    - 戻り値: `any` (JSONオブジェクト) - 変換後のTone.jsシーケンサーJSONデータ。
    - 機能: ASTから具体的な音楽再生用のデータ構造を生成します。
- **play(json: any)**:
    - 役割: 変換されたTone.jsシーケンサーJSONデータを受け取り、ブラウザ上で音楽を再生します（デモ用途）。
    - 引数: `json` (any) - `mml2json`によって生成されたTone.jsシーケンサーJSONデータ。
    - 戻り値: `void`。
    - 機能: `tonejs-json-sequencer`ライブラリを利用して、音楽の再生フローを管理します。
- **toSequenceEvent(mmlEvent: any)**:
    - 役割: MMLのイベントオブジェクトを`tonejs-json-sequencer`が認識するシーケンスイベントの形式に変換します。
    - 引数: `mmlEvent` (any) - MMLのイベントを表すオブジェクト。
    - 戻り値: `object` - `tonejs-json-sequencer`が利用可能なイベントオブジェクト。
    - 機能: 内部的に`play`関数から呼び出され、データ構造の橋渡しをします。
- **ast2json_wasm(mml: string)**:
    - 役割: Rustで実装されたWASM版のAST-JSON変換関数で、高性能な変換を提供します。
    - 引数: `mml` (string) - 変換対象のMML文字列。
    - 戻り値: `any` (JSONオブジェクト) - 変換後のTone.jsシーケンサーJSONデータ。
    - 機能: JavaScript環境からWASMモジュールを介してRustの変換ロジックを呼び出します。
- **mml2ast_wasm(mml: string)**:
    - 役割: Rustで実装されたWASM版のMML-to-ASTパース関数で、高速なパース処理を提供します。
    - 引数: `mml` (string) - パース対象のMML文字列。
    - 戻り値: `any` (ASTオブジェクト) - MML構造を表すAST。
    - 機能: JavaScript環境からWASMモジュールを介してRustのパースロジックを呼び出します。
- **initializeDemoDropdown()**:
    - 役割: デモページのドロップダウンメニューを初期化し、利用可能なMMLサンプルをロード・表示します。
    - 引数: なし。
    - 戻り値: `void`。
    - 機能: ユーザーがデモページでMMLサンプルを簡単に試せるようにするためのユーティリティ関数です。

## 関数呼び出し階層ツリー
```
- if (dist/ast2json.js)
  - ast2json (dist/ast2json.d.ts)
    - on ()
      - function (dist/mml2json-wasm.js)
      - escapeHtml (generated-docs/callgraph.js)
      - getLayoutConfig ()
      - placeCentralNode ()
      - showNodeInfo ()
      - showEdgeInfo ()
      - hideInfoPanel ()
      - showInfoPanel ()
      - toggleInfoPanel ()
      - generateGitHubURL ()
      - resetLayout ()
      - watchNodeMovementAndFixOverlapsWrap ()
      - watchNodeMovementAndFixOverlaps ()
      - resolveNodeOverlaps ()
      - switchLayout ()
      - resetNodeStates ()
      - fitToContent ()
      - toggleNodeLabels ()
      - toggleCalleeLocationFilter ()
      - replace ()
      - max ()
      - ready ()
      - addListener ()
    - ast2json_wasm ()
      - cst_to_ast_wasm ()
      - cst_to_json_wasm ()
      - mml2ast_wasm ()
      - initSync ()
      - __wbg_init (pkg/tonejs_mml_to_json.d.ts)
      - getStringFromWasm0 (pkg/tonejs_mml_to_json.js)
      - getUint8ArrayMemory0 ()
      - passStringToWasm0 ()
      - decodeText ()
      - __wbg_load ()
      - __wbg_get_imports ()
      - __wbg_finalize_init ()
    - initWasm (dist/index.d.ts)
      - mml2json ()
      - mml2ast ()
      - catch (dev-setup/setup.js)
  - initializeDemoDropdown (dist/main.js)
    - play ()
      - playSequence ()
      - toSequenceEvent (dist/play.js)
- switch (generated-docs/callgraph.js)
- for (generated-docs/callgraph.js)

---
Generated at: 2026-01-16 07:06:03 JST
