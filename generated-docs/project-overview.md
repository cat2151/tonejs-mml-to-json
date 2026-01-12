Last updated: 2026-01-13

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書かれた音楽をTone.jsのJSON形式に変換するライブラリです。
- テキストベースで音楽を記述し、ウェブブラウザで再生可能な形式へ手軽に変換できます。
- npmパッケージやCDN経由で提供され、ウェブプロジェクトへの音楽表現の組み込みを容易にします。

## 技術スタック
- フロントエンド: 特に明記されていませんが、`index.html`や`dist`ディレクトリの存在から、ウェブブラウザでの利用を最終ターゲットとしています。
- 音楽・オーディオ: `tonejs-json-sequencer` (MMLから変換されたJSON形式の音楽データを再生するためのライブラリ、間接的に依存)。
- 開発ツール: `http-server` (ローカル開発サーバー), `typescript` (型安全なJavaScript開発環境と開発支援), `dotenv` (環境変数管理)。
- テスト: `vitest` (高速な単体・統合テストフレームワーク)。
- ビルドツール: `TypeScript` (JavaScriptへのトランスパイル), `Rust`コンパイラおよび`wasm-bindgen` (RustコードをWebAssemblyへコンパイルし、JavaScriptから利用可能にするため)。
- 言語機能: `TypeScript` (モダンなJavaScript開発を強化), `Rust` (パフォーマンスが要求されるMMLパーシング処理をWebAssemblyで実現するため)。
- 自動化・CI/CD: GitHub Actions (リポジトリ内の`README.md`の自動生成などに利用), `@octokit/rest` (GitHub API操作)。
- 開発標準: `tsconfig.json` (TypeScriptコンパイラ設定), `.editorconfig` (エディタのコードスタイル設定), `package.json` / `pnpm-lock.yaml` (プロジェクトのメタデータと依存関係管理)。

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
- **`.editorconfig`**: 異なるエディタやIDEを使用する開発者間で、コードのスタイルとフォーマットを統一するための設定ファイル。
- **`.github_automation/callgraph/config/my.json`**: GitHub Actionsで関数呼び出しグラフを自動生成する際の、そのツール固有の設定を記述したファイル。
- **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。例えば、ビルド生成物や一時ファイルなど。
- **`.nojekyll`**: GitHub PagesでJekyll静的サイトジェネレータを使用しないことをGitHubに伝えるための空ファイル。
- **`IMPLEMENTATION_SUMMARY.md`**: プロジェクトの実装に関する概要や設計思想をまとめたドキュメント。
- **`LIBRARY_USAGE.md`**: 本ライブラリをプロジェクトで利用するための詳細なガイドと手順が記載されたドキュメント。
- **`LICENSE`**: 本プロジェクトのソフトウェアライセンス情報。
- **`QUICKSTART.md`**: プロジェクトを素早くセットアップし、基本的な機能を試すための手引き。
- **`README.ja.md`**: プロジェクトの目的、機能、使用方法などを日本語で説明する主要なドキュメント。
- **`README.md`**: プロジェクトの主要な説明ドキュメントの英語版（`README.ja.md`から自動生成されます）。
- **`_config.yml`**: GitHub PagesのJekyll設定ファイル。テーマやプラグインなどの設定を定義します。
- **`dev-setup/README.md`**: 開発環境を構築するための手順や要件を説明するドキュメント。
- **`dev-setup/setup.js`**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプト。
- **`dist/`ディレクトリ**: TypeScriptソースコードをコンパイルしたJavaScriptファイルと、型定義ファイル、WebAssembly関連ファイルが格納されるディレクトリ。
    - **`dist/ast2json.d.ts` / `dist/ast2json.js`**: 抽象構文木（AST）をTone.jsのJSON形式に変換する機能の型定義とJavaScript実装。
    - **`dist/demos.d.ts` / `dist/demos.js`**: デモ機能に関連する型定義とJavaScript実装。
    - **`dist/index.d.ts` / `dist/index.js`**: ライブラリの主要なエントリーポイント。`initWasm`や`mml2json`といった主要なAPIが公開されます。
    - **`dist/libs/tonejs-json-sequencer.d.ts`**: 依存ライブラリである`tonejs-json-sequencer`の型定義ファイル。
    - **`dist/main.d.ts` / `dist/main.js`**: プロジェクトのデモページ（`index.html`）の挙動を制御するJavaScriptコードと型定義。
    - **`dist/mml2ast.d.ts` / `dist/mml2ast.js`**: MML文字列を抽象構文木（AST）にパースする機能の型定義とJavaScript実装。
    - **`dist/mml2json-wasm.d.ts` / `dist/mml2json-wasm.js`**: WebAssemblyモジュールの初期化と、JavaScriptからの利用を可能にするための型定義とJavaScript実装。
    - **`dist/play.d.ts` / `dist/play.js`**: 生成されたTone.js JSONシーケンスを再生する機能の型定義とJavaScript実装。
- **`generated-docs/`ディレクトリ**: 自動生成された各種ドキュメントや解析結果が格納されるディレクトリ。
    - **`generated-docs/callgraph-enhanced.html`**: 関数呼び出し関係をより詳細に、インタラクティブに可視化したHTMLファイル。
    - **`generated-docs/callgraph.html`**: 関数呼び出し関係を視覚化した基本的なHTMLファイル。
    - **`generated-docs/callgraph.js`**: 関数呼び出しグラフの描画、操作、情報表示などを制御するJavaScriptコード。
    - **`generated-docs/style.css`**: `generated-docs`内のHTMLドキュメントに適用されるスタイルシート。
- **`googled947dc864c270e07.html`**: Googleサイト認証（Search Consoleなど）のために配置されるHTMLファイル。
- **`index.html`**: プロジェクトのデモページやメインページのエントリーポイントとなるHTMLファイル。
- **`issue-notes/`ディレクトリ**: GitHubの特定のIssueに関する議論や調査結果を記録したMarkdownファイル。
- **`library-usage-example.html`**: ライブラリの具体的な使用方法を示すためのHTMLによるサンプルページ。
- **`package-lock.json`**: `npm`パッケージマネージャーが生成するファイルで、プロジェクトの依存関係の正確なツリー構造とバージョンを記録。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、依存関係、開発依存関係を定義するファイル。
- **`pkg/`ディレクトリ**: Rustで記述されたコードをWebAssemblyにコンパイルした成果物と、それをJavaScriptから利用するためのバインディングコードが含まれる。
    - **`pkg/tonejs_mml_to_json.d.ts`**: WebAssemblyモジュールが公開するJavaScriptバインディングの型定義ファイル。
    - **`pkg/tonejs_mml_to_json.js`**: WebAssemblyモジュールをJavaScriptからロードし、利用するためのGlueコード。
    - **`pkg/tonejs_mml_to_json_bg.wasm`**: コンパイルされたWebAssemblyバイナリ。
    - **`pkg/tonejs_mml_to_json_bg.wasm.d.ts`**: WebAssemblyバイナリの型定義。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーが生成するファイルで、プロジェクトの依存関係の正確なツリー構造とバージョンを記録。
- **`rust/`ディレクトリ**: MMLパーサーのRust実装ソースコードが格納されるディレクトリ。
    - **`rust/Cargo.toml`**: Rustプロジェクトの設定ファイル。依存クレート、バージョン、ビルド設定などを定義。
    - **`rust/IMPLEMENTATION.md`**: Rust実装に関する詳細なドキュメント。
    - **`rust/README.md`**: Rust実装の概要を説明するドキュメント。
    - **`rust/build.rs`**: Rustのビルド時に実行されるカスタムビルドスクリプト。
    - **`rust/examples/basic_usage.rs`**: Rust実装の基本的な利用方法を示すサンプルコード。
    - **`rust/src/ast.rs`**: 抽象構文木（AST）のデータ構造をRustで定義したファイル。
    - **`rust/src/ast2json.rs`**: ASTをTone.js互換JSONに変換するロジックをRustで実装したファイル。
    - **`rust/src/cst_to_ast.rs`**: 具象構文木（CST）からASTへの変換ロジックをRustで実装したファイル。
    - **`rust/src/lib.rs`**: Rustライブラリのメインファイル。主要なモジュールを公開し、WebAssemblyバインディングの定義もここに含まれる。
    - **`rust/src/mml2ast.rs`**: MML文字列をASTにパースする主要なロジックをRustで実装したファイル。
    - **`rust/src/mml2ast_manual.rs`**: MMLをASTに変換する手動実装パーサー（実験的または代替実装）のRustコード。
- **`scripts/copy-libs.js`**: 外部のJavaScriptライブラリなどを特定のディレクトリにコピーするためのスクリプト。
- **`src/`ディレクトリ**: プロジェクトのTypeScriptソースコードが格納されるディレクトリ。
    - **`src/ast2json.ts`**: 抽象構文木（AST）をTone.jsのJSON形式に変換するTypeScript実装。
    - **`src/demos.ts`**: デモページで使用されるMMLサンプルデータや関連ロジックをTypeScriptで実装。
    - **`src/index.html`**: デモ用のHTMLファイル。
    - **`src/index.ts`**: ライブラリの主要なTypeScriptエントリーポイント。主要な変換関数やWASM初期化関数をエクスポート。
    - **`src/main.ts`**: デモページのスクリプトエントリーポイント。ドロップダウンの初期化やイベントハンドリングを定義。
    - **`src/mml2ast.ts`**: MML文字列を抽象構文木（AST）にパースするTypeScript実装。
    - **`src/mml2json-wasm.ts`**: WebAssemblyモジュールの初期化と、JavaScriptからの利用を可能にするためのTypeScriptコード。
    - **`src/play.ts`**: 生成されたTone.js JSONシーケンスを実際に再生するためのTypeScriptコード。
- **`test/`ディレクトリ**: プロジェクトのテストコードが格納されるディレクトリ。
    - **`test/ast2json.test.js`**: `ast2json`変換機能のテストケース。
    - **`test/demo-test.mjs`**: デモ機能に関するテストケース。
    - **`test/integration.test.js`**: MMLパースからJSON変換までの一連の処理をテストする統合テストケース。
    - **`test/library-entry.test.js`**: ライブラリのエントリーポイント（公開API）が正しく機能するかをテスト。
    - **`test/mml2ast.test.js`**: `mml2ast`パース機能のテストケース。
    - **`test/setup.js`**: テスト環境をセットアップするためのスクリプト。
    - **`test/wasm-init-test.mjs` / `test/wasm-integration-test.mjs` / `test/wasm-test.mjs`**: WebAssemblyモジュールが正しく初期化され、機能するかを検証するテストケース。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイル。コンパイルオプション、ターゲットECMAScriptバージョン、モジュール解決戦略などを指定。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイル。テストの実行方法やカバレッジレポートなどの設定を定義。

## 関数詳細説明
- **`initWasm()`**: WebAssembly (WASM) モジュールを初期化します。Rustで実装されたMMLパーサーをJavaScriptから利用するために最初に呼び出す必要があります。
- **`mml2json(mml: string): string`**: MML (Music Macro Language) 文字列をTone.jsのJSONシーケンサーフォーマットに変換する主要な関数です。
    - 引数: `mml` (string) - 変換対象のMML文字列。
    - 戻り値: (string) - Tone.jsで音楽を再生可能なJSON形式のデータ。
- **`mml2ast(mml: string): object`**: MML文字列を解析し、その構造を抽象構文木 (AST) オブジェクトとして返します。これは`mml2json`内部で利用される中間ステップです。
    - 引数: `mml` (string) - パース対象のMML文字列。
    - 戻り値: (object) - MMLの構文構造を表すASTオブジェクト。
- **`ast2json(ast: object): string`**: 抽象構文木 (AST) オブジェクトをTone.jsのJSONシーケンサーフォーマットに変換します。
    - 引数: `ast` (object) - `mml2ast`によって生成されたASTオブジェクト。
    - 戻り値: (string) - Tone.jsで音楽を再生可能なJSON形式のデータ。
- **`initializeDemoDropdown()`**: デモページのドロップダウンメニューを初期化し、利用可能なMMLサンプルを読み込んで表示します。
- **`play(json: string)`**: Tone.jsのJSONシーケンスデータを受け取り、ブラウザ上で音楽を再生します。
    - 引数: `json` (string) - Tone.js JSON形式の音楽データ。
    - 戻り値: (void)
- **`toSequenceEvent(json: object): array`**: Tone.js JSON形式の音楽データオブジェクトを、`tonejs-json-sequencer`ライブラリが内部的に処理するシーケンスイベントの配列形式に変換します。
    - 引数: `json` (object) - Tone.js JSON形式の音楽データオブジェクト。
    - 戻り値: (array) - `tonejs-json-sequencer`が解釈可能なイベントの配列。
- **`scheduleOrExecuteEvent(event: object)`**: (`dist/libs/tonejs-json-sequencer.d.ts`から推測) Tone.jsシーケンスイベントをタイムラインにスケジュールするか、即座に実行します。
- **`playSequence(sequence: array)`**: (`dist/libs/tonejs-json-sequencer.d.ts`から推測) 一連のシーケンスイベント（音楽データ）を再生開始します。
- **`ast2json_wasm(ast_json: string): string`**: WebAssemblyモジュール内で実行される、ASTのJSON文字列をTone.js JSONに変換する関数。JavaScriptの`ast2json`関数の内部で利用されます。
    - 引数: `ast_json` (string) - ASTをJSON文字列化したもの。
    - 戻り値: (string) - Tone.js JSON形式の音楽データ。
- **`cst_to_ast_wasm(cst_json: string): string`**: WebAssemblyモジュール内で実行される、具象構文木（CST）のJSON文字列を抽象構文木（AST）のJSON文字列に変換する関数。
    - 引数: `cst_json` (string) - CSTをJSON文字列化したもの。
    - 戻り値: (string) - ASTをJSON文字列化したもの。
- **`cst_to_json_wasm(cst_json: string): string`**: WebAssemblyモジュール内で実行される、CSTのJSON文字列を直接Tone.js JSONに変換する関数。
    - 引数: `cst_json` (string) - CSTをJSON文字列化したもの。
    - 戻り値: (string) - Tone.js JSON形式の音楽データ。
- **`initSync(module_or_path: WebAssembly.Module | Response | BufferSource, maybe_memory?: WebAssembly.Memory): WebAssembly.Instance`**: WebAssemblyモジュールを同期的に初期化するための内部ヘルパー関数。
    - 引数: `module_or_path` (WebAssembly.Module | Response | BufferSource) - WASMモジュールまたはそのパス/データ。`maybe_memory` (WebAssembly.Memory) - オプションで指定するWebAssemblyメモリ。
    - 戻り値: (WebAssembly.Instance) - 初期化されたWebAssemblyインスタンス。
- **`__wbg_init()`**: WebAssemblyモジュール内部の、WebAssembly Bindgenによって生成された初期化処理。
- **`getStringFromWasm0()`**: WebAssemblyメモリから文字列データを取得するための内部ヘルパー関数。
- **`getUint8ArrayMemory0()`**: WebAssemblyメモリからUint8Array（符号なし8ビット整数配列）を取得するための内部ヘルパー関数。
- **`passStringToWasm0()`**: JavaScriptの文字列をWebAssemblyメモリに渡すための内部ヘルパー関数。
- **`decodeText()`**: テキストデータをデコードするための内部ヘルパー関数。
- **`__wbg_load()`**: (`pkg/tonejs_mml_to_json.js`から推測) WebAssemblyモジュールのロードに関連する内部処理関数。
- **`__wbg_get_imports()`**: (`pkg/tonejs_mml_to_json.js`から推測) WebAssemblyモジュールがJavaScriptからインポートする関数（ホスト関数）を取得する内部処理関数。
- **`__wbg_finalize_init()`**: (`pkg/tonejs_mml_to_json.js`から推測) WebAssemblyモジュールの初期化プロセスを完了させるための内部処理関数。
- **`escapeHtml(unsafe: string): string`**: (generated-docs/callgraph.js) HTML特殊文字をエスケープして、スクリプトインジェクションなどを防ぎ、安全にHTMLに表示できるようにします。
    - 引数: `unsafe` (string) - エスケープ処理が必要な文字列。
    - 戻り値: (string) - エスケープされた文字列。
- **`getLayoutConfig()`**: (generated-docs/callgraph.js) 関数呼び出しグラフのレイアウトに関する設定を取得します。
- **`placeCentralNode()`**: (generated-docs/callgraph.js) 関数呼び出しグラフの中心となるノードを配置します。
- **`showNodeInfo(node: object)`**: (generated-docs/callgraph.js) グラフ内の特定のノード（関数）に関する詳細情報を表示します。
- **`showEdgeInfo(edge: object)`**: (generated-docs/callgraph.js) グラフ内の特定のエッジ（呼び出し関係）に関する詳細情報を表示します。
- **`hideInfoPanel()`**: (generated-docs/callgraph.js) グラフに表示されている情報パネルを非表示にします。
- **`showInfoPanel(element: HTMLElement)`**: (generated-docs/callgraph.js) 指定されたHTML要素を情報パネルとして表示します。
- **`toggleInfoPanel()`**: (generated-docs/callgraph.js) 情報パネルの表示/非表示を切り替えます。
- **`generateGitHubURL(node: object): string`**: (generated-docs/callgraph.js) グラフノードに対応するGitHubリポジトリのURLを生成します。
- **`resetLayout()`**: (generated-docs/callgraph.js) 関数呼び出しグラフのレイアウトを初期状態にリセットします。
- **`watchNodeMovementAndFixOverlapsWrap()`**: (generated-docs/callgraph.js) ノードの移動を監視し、その重なりを修正する処理をラップします。
- **`watchNodeMovementAndFixOverlaps()`**: (generated-docs/callgraph.js) グラフ内のノードが移動した際に、他のノードとの重なりを防ぐための位置調整を行います。
- **`resolveNodeOverlaps()`**: (generated-docs/callgraph.js) グラフ内の重なっているノードの位置を調整し、見やすくします。
- **`switchLayout(layoutName: string)`**: (generated-docs/callgraph.js) 関数呼び出しグラフの描画レイアウト（例えば、円形、ツリーなど）を切り替えます。
- **`resetNodeStates()`**: (generated-docs/callgraph.js) グラフ内のノードの選択状態や強調表示などをリセットし、初期状態に戻します。
- **`fitToContent()`**: (generated-docs/callgraph.js) グラフの表示領域をコンテンツ（ノードとエッジ）全体に合わせて調整します。
- **`toggleNodeLabels(show: boolean)`**: (generated-docs/callgraph.js) グラフノードに表示されるラベルの表示/非表示を切り替えます。
- **`toggleCalleeLocationFilter()`**: (generated-docs/callgraph.js) 呼び出し先の場所に基づいてノードをフィルタリングする機能を切り替えます。
- **`replace()`**: (generated-docs/callgraph.js) 文字列内の特定のパターンを別の文字列に置換する一般的なユーティリティ関数。
- **`max()`**: (generated-docs/callgraph.js) 複数の値の中から最大値を見つける一般的なユーティリティ関数。
- **`on()`**: (generated-docs/callgraph.js) イベントハンドラーを要素に登録するための一般的なユーティリティ関数。
- **`ready()`**: (generated-docs/callgraph.js) ドキュメントが完全に読み込まれ、DOMが構築されたときに実行される関数。
- **`addListener()`**: (generated-docs/callgraph.js) 指定された要素にイベントリスナーを追加する一般的なユーティリティ関数。
- **`catch()`**: (dev-setup/setup.js, dist/play.js, pkg/tonejs_mml_to_json.js) エラー処理のためのJavaScriptの構文。非同期処理のエラー捕捉などに使用されます。

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
Generated at: 2026-01-13 07:06:14 JST
