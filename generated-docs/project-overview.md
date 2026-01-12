Last updated: 2026-01-11

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で書かれた音楽を、Webブラウザで再生可能なTone.js JSONシーケンス形式に変換するライブラリです。
- JavaScript/TypeScriptとRust+WASMの両実装を提供し、npmパッケージやCDNを通じてWebアプリケーションへ手軽に統合できます。
- 音楽変換機能に特化しており、生成されたJSONは`tonejs-json-sequencer`などの外部ライブラリと連携して、Web上での音楽演奏を実現します。

## 技術スタック
- フロントエンド:
    - **JavaScript**: ブラウザ上での実行環境を提供し、ライブラリのコア機能やラッパーとして使用されます。
    - **TypeScript**: コードの型安全性を高め、大規模なプロジェクトでの開発効率と保守性を向上させます。
    - **WASM (WebAssembly)**: Rustで実装されたMMLパーサーをWeb上で高速に実行するために利用されます。
    - **HTML/CSS**: デモページやドキュメントの表示に使用されます。
- 音楽・オーディオ:
    - **MML (Music Macro Language)**: 音楽をテキスト形式で記述するための入力言語として利用されます。
    - **Tone.js JSON Sequencer Format**: MMLから変換される音楽データの出力形式であり、`tonejs-json-sequencer`ライブラリと連携して音楽を再生します。
- 開発ツール:
    - **Node.js**: 開発環境の基盤として、スクリプト実行やパッケージ管理に利用されます。
    - **npm/pnpm**: プロジェクトの依存関係を管理し、パッケージのインストールや公開を行います。
    - **http-server**: ローカルで開発サーバーを立ち上げ、デモやドキュメントの確認に使用されます。
- テスト:
    - **Vitest**: JavaScript/TypeScriptコードの単体テストや結合テストを高速に実行するためのテストフレームワークです。
- ビルドツール:
    - **Peggy**: MML文字列をAST (抽象構文木) に変換するためのパーサーコードを生成するツールです。
    - **TypeScript Compiler (tsc)**: TypeScriptコードを標準のJavaScriptにコンパイルするために使用されます。
    - **Rust Cargo**: Rust言語プロジェクトのビルドシステムであり、WASMへのコンパイルも管理します。
- 言語機能:
    - **JavaScript**: プロジェクトの主要なプログラミング言語です。
    - **TypeScript**: JavaScriptに静的型付けを追加し、開発プロセスを強化します。
    - **Rust**: 高性能なMMLパーサーの実装に用いられ、WebAssemblyとしてブラウザで実行されます。
- 自動化・CI/CD:
    - **GitHub Actions**: READMEの自動翻訳など、プロジェクトの継続的インテグレーション・デプロイメントワークフローに利用されています。
- 開発標準:
    - **EditorConfig**: 開発チーム全体でコードの書式設定を統一し、一貫性のあるコードスタイルを維持します。

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
  📁 examples/
    📄 basic_usage.rs
  📁 src/
    📄 ast.rs
    📄 ast2json.rs
    📄 lib.rs
    📄 mml2ast.rs
📁 scripts/
  📜 copy-libs.js
📁 src/
  📘 ast2json.ts
  📘 demos.ts
  📜 grammar.js
  📝 grammar.pegjs
  🌐 index.html
  📘 index.ts
  📘 main.ts
  📘 mml2ast.ts
  📘 mml2json-wasm.ts
  📜 mml2json.js
  📘 play.ts
📁 test/
  📜 ast2json.test.js
  📄 demo-test.mjs
  📜 integration.test.js
  📜 library-entry.test.js
  📜 mml2ast.test.js
  📜 parser.test.js
  📜 setup.js
  📄 wasm-init-test.mjs
  📄 wasm-integration-test.mjs
  📄 wasm-test.mjs
📊 tsconfig.json
📜 vitest.config.js
```

## ファイル詳細説明
- **`.editorconfig`**: コードエディタの設定を統一し、インデントスタイルや文字コードなど、プロジェクト全体のコーディング規約を維持するための設定ファイルです。
- **`.github_automation/callgraph/config/my.json`**: GitHub Actionsによって生成される可能性のある、関数呼び出しグラフ自動生成の設定ファイルです。
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **`.nojekyll`**: GitHub PagesでJekyll処理を無効にするための空ファイルです。
- **`IMPLEMENTATION_SUMMARY.md`**: プロジェクトの実装に関する全体的な概要や重要な点をまとめたドキュメントです。
- **`LIBRARY_USAGE.md`**: このライブラリをどのようにプロジェクトで使用するかを説明するガイドドキュメントです。
- **`LICENSE`**: プロジェクトのライセンス情報が記載されています。
- **`QUICKSTART.md`**: プロジェクトを素早く開始するための手順や最小限の利用方法を説明するドキュメントです。
- **`README.ja.md`**: プロジェクトの日本語版概要ドキュメントです。
- **`README.md`**: プロジェクトの英語版概要ドキュメントです。
- **`_config.yml`**: GitHub PagesのJekyll設定ファイルです。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する説明ドキュメントです。
- **`dev-setup/setup.js`**: 開発環境のセットアップやテスト準備のためのスクリプトファイルです。
- **`dist/ast2json.d.ts`**: AST (抽象構文木) をJSON形式に変換する関数の型定義ファイルです。
- **`dist/ast2json.js`**: ASTをJSON形式に変換するJavaScriptコードです。WASMモジュールへのラッパーとしても機能します。
- **`dist/demos.d.ts`**: デモ関連のコードの型定義ファイルです。
- **`dist/demos.js`**: デモ関連のJavaScriptコードです。
- **`dist/index.d.ts`**: ライブラリの主要なエクスポート (initWasm, mml2jsonなど) の型定義ファイルです。
- **`dist/index.js`**: ライブラリのエントリーポイントとなるJavaScriptファイルで、WASM版とJS版の機能を統合して提供します。
- **`dist/libs/tonejs-json-sequencer.d.ts`**: 依存する`tonejs-json-sequencer`ライブラリの型定義ファイルです。
- **`dist/main.d.ts`**: デモページのメインスクリプトの型定義ファイルです。
- **`dist/main.js`**: デモページの初期化や音楽再生を制御するJavaScriptファイルです。
- **`dist/mml2ast.d.ts`**: MMLをASTに変換する関数の型定義ファイルです。
- **`dist/mml2ast.js`**: MMLをASTに変換するJavaScriptコードです。WASMモジュールへのラッパーとしても機能します。
- **`dist/mml2json-wasm.d.ts`**: WebAssemblyモジュールの初期化に関する型定義ファイルです。
- **`dist/mml2json-wasm.js`**: WebAssemblyモジュールをロードし、初期化するためのJavaScriptコードです。
- **`dist/play.d.ts`**: 音楽再生関連の関数の型定義ファイルです。
- **`dist/play.js`**: 生成されたJSONデータをTone.jsシーケンスイベントに変換し、再生するJavaScriptコードです。
- **`generated-docs/callgraph-enhanced.html`**: 詳細な関数呼び出しグラフを表示するHTMLドキュメントです。
- **`generated-docs/callgraph.html`**: 基本的な関数呼び出しグラフを表示するHTMLドキュメントです。
- **`generated-docs/callgraph.js`**: 関数呼び出しグラフの表示ロジックやインタラクティブ機能を提供するJavaScriptファイルです。
- **`generated-docs/style.css`**: 生成されたドキュメントのスタイルを定義するCSSファイルです。
- **`googled947dc864c270e07.html`**: Googleサイト認証用のファイルです。
- **`index.html`**: プロジェクトのデモページまたはトップページとなるHTMLファイルです。
- **`library-usage-example.html`**: ライブラリの使用方法を示す具体的なコード例を掲載したHTMLファイルです。
- **`package-lock.json`**: `npm`が使用する依存関係の正確なツリーを記録するファイルです。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、依存関係、スクリプトなど）を定義するファイルです。
- **`pkg/`**: RustのWASMコンパイル結果と、それを利用するためのJavaScriptラッパーが格納されているディレクトリです。
    - **`pkg/tonejs_mml_to_json.d.ts`**: WASMモジュールが提供するRust関数の型定義ファイルです。
    - **`pkg/tonejs_mml_to_json.js`**: WASMモジュールをロードし、JavaScriptからRust関数を呼び出すためのラッパーJavaScriptファイルです。
    - **`pkg/tonejs_mml_to_json_bg.wasm`**: RustコードからコンパイルされたWebAssemblyバイナリファイルです。
    - **`pkg/tonejs_mml_to_json_bg.wasm.d.ts`**: WASMバイナリの型定義ファイルです。
- **`pnpm-lock.yaml`**: `pnpm`が使用する依存関係の正確なツリーを記録するファイルです。
- **`rust/`**: Rust言語で実装されたMMLパーサーとAST-JSON変換ロジックのソースコードが格納されているディレクトリです。
    - **`rust/Cargo.toml`**: Rustプロジェクトの設定ファイルです。
    - **`rust/IMPLEMENTATION.md`**: Rust実装の詳細に関するドキュメントです。
    - **`rust/README.md`**: Rustモジュールの概要ドキュメントです。
    - **`rust/examples/basic_usage.rs`**: Rustモジュールの基本的な使用例を示すコードです。
    - **`rust/src/ast.rs`**: Rust版のASTデータ構造を定義しています。
    - **`rust/src/ast2json.rs`**: RustでASTをJSONに変換するロジックを実装しています。
    - **`rust/src/lib.rs`**: Rustライブラリのエントリーポイントです。
    - **`rust/src/mml2ast.rs`**: RustでMML文字列をASTに変換するロジックを実装しています。
- **`scripts/copy-libs.js`**: 外部ライブラリファイルを特定のディレクトリにコピーするためのスクリプトです。
- **`src/ast2json.ts`**: TypeScriptで記述された、ASTをJSON形式に変換するロジックのソースコードです。
- **`src/demos.ts`**: TypeScriptで記述されたデモ関連のソースコードです。
- **`src/grammar.js`**: Peggyによって`grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。
- **`src/grammar.pegjs`**: MMLの文法を定義するPEG (Parsing Expression Grammar) 形式のファイルです。
- **`src/index.html`**: デモ用のHTMLファイルです。
- **`src/index.ts`**: TypeScriptで記述された、ライブラリのメインエントリーポイントとなるソースコードです。
- **`src/main.ts`**: TypeScriptで記述された、デモページのメインロジックのソースコードです。
- **`src/mml2ast.ts`**: TypeScriptで記述された、MMLをASTに変換するロジックのソースコードです。
- **`src/mml2json-wasm.ts`**: TypeScriptで記述された、WebAssemblyモジュールの初期化ロジックのソースコードです。
- **`src/mml2json.js`**: 初期または代替のMMLからJSONへの変換を行うJavaScript実装コードです。
- **`src/play.ts`**: TypeScriptで記述された、音楽再生ロジックのソースコードです。
- **`test/`**: プロジェクトのテストコードが格納されているディレクトリです。
    - **`test/ast2json.test.js`**: AST-JSON変換モジュールのテストコードです。
    - **`test/demo-test.mjs`**: デモ関連機能のテストコードです。
    - **`test/integration.test.js`**: 複数のモジュール間の連携をテストする結合テストコードです。
    - **`test/library-entry.test.js`**: ライブラリのエントリーポイントのテストコードです。
    - **`test/mml2ast.test.js`**: MML-AST変換モジュールのテストコードです。
    - **`test/parser.test.js`**: MMLパーサーのテストコードです。
    - **`test/setup.js`**: テスト環境のセットアップスクリプトです。
    - **`test/wasm-init-test.mjs`**: WASM初期化に関するテストコードです。
    - **`test/wasm-integration-test.mjs`**: WASMモジュールを含む結合テストコードです。
    - **`test/wasm-test.mjs`**: WASMモジュールのテストコードです。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`ast2json(ast: object): object`**: AST (抽象構文木) をTone.jsシーケンサーが認識するJSON形式のデータ構造に変換します。WASM版も利用できます。
- **`mml2ast(mml: string): object`**: MML (Music Macro Language) の文字列を入力として受け取り、それを解析して抽象構文木 (AST) を生成します。WASM版も利用できます。
- **`mml2json(mml: string): object`**: MML文字列を直接受け取り、内部的に`mml2ast`と`ast2json`を呼び出して、Tone.js JSONシーケンス形式に変換します。
- **`initWasm(): Promise<void>`**: WebAssemblyモジュールを非同期で初期化します。`mml2json`のWASM版を使用する前に一度呼び出す必要があります。
- **`play(json: object)`**: Tone.js JSONシーケンス形式の音楽データを受け取り、それを再生します。
- **`toSequenceEvent(mmlEvent: object): object`**: MMLイベントの内部表現を、`tonejs-json-sequencer`が扱えるシーケンスイベントの形式に変換します。
- **`initializeDemoDropdown()`**: デモページに表示されるMML選択ドロップダウンを初期化し、ユーザーが選択したMMLの再生を開始できるようにします。
- **`getStringFromWasm0(ptr: number, len: number): string`**: WASMのメモリから指定されたポインタと長さのUTF-8エンコードされた文字列をJavaScriptの文字列として取得します。
- **`getUint8ArrayMemory0(): Uint8Array`**: WASMのメモリをUint8Arrayとして取得し、JavaScriptから直接WASMメモリを操作できるようにします。
- **`passStringToWasm0(arg: string, len: number, is_null: boolean): number`**: JavaScriptの文字列をUTF-8エンコードしてWASMのメモリに書き込み、そのポインタを返します。
- **`decodeText(decoder: TextDecoder, byteoffset: number, byteLength: number): string`**: 指定されたバイトオフセットと長さのバイト配列をTextDecoderを使用して文字列にデコードします。
- **`ast2json_wasm(ast_json_ptr: number, ast_json_len: number): number`**: WASMモジュール内で、ASTのJSON表現（ポインタと長さで指定）を受け取り、それをTone.js JSON形式に変換して、結果のJSONへのポインタを返します。
- **`mml2ast_wasm(mml_ptr: number, mml_len: number): number`**: WASMモジュール内で、MML文字列（ポインタと長さで指定）を受け取り、それをASTのJSON表現に変換して、結果のASTへのポインタを返します。
- **`mml_to_json_wasm(mml_ptr: number, mml_len: number): number`**: WASMモジュール内で、MML文字列を受け取り、直接Tone.js JSON形式に変換して、結果のJSONへのポインタを返します。
- **`initSync(module: WebAssembly.Module | BufferSource, maybe_memory?: WebAssembly.Memory): void`**: WebAssemblyモジュールを同期的に初期化します。主にテストやNode.js環境での利用を想定しています。
- **`__wbg_init(input: RequestInfo | URL | Response | BufferSource, maybe_memory?: WebAssembly.Memory): Promise<void>`**: WASMモジュールを非同期でロードし、初期化します。ブラウザ環境での推奨される初期化方法です。
- **`peg$parse(input: string, options?: object): object`**: Peggyによって生成されたMMLパーサーの主要な関数で、入力MML文字列を解析し、その結果（AST）を返します。
- **`escapeHtml(unsafe: string): string`**: HTML特殊文字をエスケープし、セキュリティを向上させるとともに、HTMLコンテンツとして安全に表示できるようにします。主に呼び出しグラフのドキュメント生成で使用されます。
- **`getLayoutConfig(): object`**: 呼び出しグラフの視覚化に使用されるレイアウト設定オブジェクトを取得します。
- **`placeCentralNode(): void`**: 呼び出しグラフ内で特定のノード（通常は最も重要な関数）を中央に配置する処理を行います。
- **`showNodeInfo(nodeId: string): void`**: 呼び出しグラフ上の特定のノード（関数）に関する詳細情報をパネルに表示します。
- **`showEdgeInfo(fromNodeId: string, toNodeId: string): void`**: 呼び出しグラフ上の特定のエッジ（関数間の呼び出し関係）に関する詳細情報をパネルに表示します。
- **`hideInfoPanel(): void`**: 情報表示パネルを非表示にします。
- **`showInfoPanel(): void`**: 情報表示パネルを表示します。
- **`toggleInfoPanel(): void`**: 情報表示パネルの表示/非表示を切り替えます。
- **`generateGitHubURL(path: string, line?: number): string`**: GitHub上の特定のファイルや行へのURLを生成します。主に呼び出しグラフからソースコードへジャンプするために使用されます。
- **`resetLayout(): void`**: 呼び出しグラフのレイアウトを初期状態に戻します。
- **`watchNodeMovementAndFixOverlapsWrap(): void`**: ノードの移動を監視し、その重なりを修正するロジックのラッパー関数です。
- **`watchNodeMovementAndFixOverlaps(): void`**: 呼び出しグラフのノードが移動した際に、他のノードとの重なりを自動的に調整し、視認性を維持します。
- **`resolveNodeOverlaps(): void`**: 呼び出しグラフ内の重なっているノードを検出し、互いに重ならないように配置を調整します。
- **`switchLayout(layoutName: string): void`**: 呼び出しグラフの表示レイアウト（例：ツリー、フォースダイレクトなど）を切り替えます。
- **`resetNodeStates(): void`**: 呼び出しグラフのノードの表示状態（ハイライトなど）をリセットします。
- **`fitToContent(): void`**: 呼び出しグラフ全体が表示領域に収まるようにズームレベルや位置を調整します。
- **`toggleNodeLabels(): void`**: 呼び出しグラフのノードに表示されるラベルの表示/非表示を切り替えます。
- **`toggleCalleeLocationFilter(): void`**: 呼び出し先関数のロケーション（ファイルパスなど）でフィルターをかける機能の表示/非表示を切り替えます。
- **`hex(ch: string): string`**: Peggyパーサー内部で、16進数文字の処理を補助する関数です。
- **`unicodeEscape(ch: string): string`**: Peggyパーサー内部で、Unicodeエスケープシーケンスの処理を補助する関数です。
- **`literalEscape(ch: string): string`**: Peggyパーサー内部で、リテラルエスケープシーケンスの処理を補助する関数です。
- **`classEscape(ch: string): string`**: Peggyパーサー内部で、文字クラスエスケープシーケンスの処理を補助する関数です。
- **`describeExpectation(expectation: object): string`**: Peggyパーサー内部で、解析中に期待される要素を記述する関数です。
- **`describeExpected(expected: object): string`**: Peggyパーサー内部で、期待される入力の種類を説明する関数です。
- **`describeFound(found: string): string`**: Peggyパーサー内部で、解析中に実際に検出された要素を説明する関数です。
- **`text(): string`**: Peggyパーサー内部で、現在解析中のテキスト部分を返します。
- **`offset(): number`**: Peggyパーサー内部で、現在の解析位置のオフセット（文字数）を返します。
- **`range(): [number, number]`**: Peggyパーサー内部で、現在の解析範囲の開始と終了オフセットを返します。
- **`location(): object`**: Peggyパーサー内部で、現在の解析位置（行、列、オフセット）を返します。
- **`expected(): object`**: Peggyパーサー内部で、現在の解析位置で期待されるトークンやパターンを返します。
- **`error(message: string, details?: object): Error`**: Peggyパーサー内部で、解析エラーを生成してスローします。
- **`peg$getUnicode(): string`**: Peggyパーサー内部で、Unicode文字の処理を補助する関数です。
- **`peg$literalExpectation(value: string, ignoreCase: boolean): object`**: Peggyパーサー内部で、特定のリテラル文字列の期待値を生成します。
- **`peg$classExpectation(value: string, inverted: boolean, ignoreCase: boolean): object`**: Peggyパーサー内部で、特定の文字クラスの期待値を生成します。
- **`peg$anyExpectation(): object`**: Peggyパーサー内部で、任意の文字の期待値を生成します。
- **`peg$endExpectation(): object`**: Peggyパーサー内部で、入力の終了位置の期待値を生成します。
- **`peg$otherExpectation(description: string): object`**: Peggyパーサー内部で、特定のリテラルやクラスに該当しない「その他」の期待値を生成します。
- **`peg$computePosDetails(text: string, pos: number): object`**: Peggyパーサー内部で、指定されたテキストと位置から、行、列、オフセットの詳細を計算します。
- **`peg$computeLocation(startPos: number, endPos: number): object`**: Peggyパーサー内部で、開始位置と終了位置から、解析範囲のロケーション情報を計算します。
- **`peg$fail(expected: object): void`**: Peggyパーサー内部で、解析が失敗したことを通知し、期待される要素を記録します。
- **`peg$buildSimpleError(message: string, expected: object): Error`**: Peggyパーサー内部で、シンプルなエラーメッセージと期待値を含むエラーオブジェクトを構築します。
- **`peg$buildStructuredError(message: string, expected: object, location: object): Error`**: Peggyパーサー内部で、エラーメッセージ、期待値、ロケーション情報を含む構造化されたエラーオブジェクトを構築します。
- **`peg$parsestart(): object`**: Peggyパーサー内部で、MMLの解析を開始するための`start`ルールを実行します。
- **`peg$parsenote(): object`**: Peggyパーサー内部で、MMLの`note`要素を解析するためのルールを実行します。
- **`peg$throw(error: Error): never`**: Peggyパーサー内部で、与えられたエラーオブジェクトをスローします。
- **`compileMmlToCommands(mml: string): Array<object>`**: MML文字列を解析し、音楽コマンドのリストにコンパイルします。
- **`getMmlCommands(mml: string): Array<object>`**: MML文字列から抽出された音楽コマンドのリストを取得します。
- **`calcAttackToReleaseTicks(mml: string): number`**: MMLの記述に基づいて、アタックからリリースまでのティック数を計算します。
- **`repeat(n: number, char: string): string`**: 指定された文字をn回繰り返した文字列を生成します。
- **`toInt(value: any): number`**: 指定された値を整数に変換します。
- **`calcDuration(mmlEvent: object): number`**: MMLイベントの持続時間（ティック数）を計算します。
- **`calcStartTick(mmlEvent: object, currentTick: number): number`**: MMLイベントの開始ティックを計算します。
- **`increaseStartTick(tick: number, duration: number): number`**: 指定されたティックを開始点として、持続時間を加算して次の開始ティックを計算します。
- **`calcLtick(mmlEvent: object, defaultL: number): number`**: MMLイベントのLティック（音符の長さの基準）を計算します。
- **`getNodeId(): string`**: 一意のノードIDを生成します。
- **`sort(arr: Array<any>): Array<any>`**: 指定された配列をソートします。

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
      - mml2ast_wasm ()
      - mml_to_json_wasm ()
      - initSync ()
      - __wbg_init (pkg/tonejs_mml_to_json.d.ts)
      - getStringFromWasm0 (pkg/tonejs_mml_to_json.js)
      - getUint8ArrayMemory0 ()
      - passStringToWasm0 ()
      - decodeText ()
      - __wbg_load ()
      - __wbg_get_imports ()
      - __wbg_finalize_init ()
      - start ()
    - initWasm (dist/index.d.ts)
      - mml2json ()
      - mml2ast ()
      - catch (dev-setup/setup.js)
      - error ()
  - initializeDemoDropdown (dist/main.js)
    - play ()
      - playSequence ()
      - toSequenceEvent (dist/play.js)
  - compileMmlToCommands ()
    - getMmlCommands ()
      - calcAttackToReleaseTicks ()
      - repeat ()
      - toInt ()
      - calcDuration ()
      - calcStartTick ()
      - increaseStartTick ()
      - calcLtick ()
      - getNodeId ()
      - sort ()
- switch (generated-docs/callgraph.js)
- for (generated-docs/callgraph.js)
- hex (src/grammar.js)
  - unicodeEscape ()
  - literalEscape ()
  - classEscape ()
  - describeExpectation ()
  - describeExpected ()
  - describeFound ()
  - peg$parse ()
  - peg$f0 ()
  - text ()
  - offset ()
  - range ()
  - location ()
  - expected ()
  - peg$getUnicode ()
  - peg$literalExpectation ()
  - peg$classExpectation ()
  - peg$anyExpectation ()
  - peg$endExpectation ()
  - peg$otherExpectation ()
  - peg$computePosDetails ()
  - peg$computeLocation ()
  - peg$fail ()
  - peg$buildSimpleError ()
  - peg$buildStructuredError ()
  - peg$parsestart ()
  - peg$parsenote ()
  - peg$throw ()
  - constructor (undefined)
- note (src/grammar.pegjs)

---
Generated at: 2026-01-11 07:06:02 JST
