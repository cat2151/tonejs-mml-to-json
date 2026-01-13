Last updated: 2026-01-14

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書かれた音楽を、ブラウザで再生可能なTone.js JSONシーケンサーフォーマットへ変換します。
- テキストベースで音楽を手軽に作成し、ウェブサイト上で演奏するための軽量かつポータブルなライブラリを提供します。
- npmパッケージやCDN経由で簡単に利用でき、変換機能に特化し、実際の音楽再生は外部の`tonejs-json-sequencer`プロジェクトと連携します。

## 技術スタック
- フロントエンド: JavaScript (ブラウザ実行用), WebAssembly (WASM) (高性能なMMLパース用), HTML/CSS (デモページ、ライブラリ利用例), CDN (ライブラリ配信)
- 音楽・オーディオ: MML (入力形式), Tone.js JSON Sequencer Format (出力形式), Tone.js (間接的に音楽再生機能を提供)
- 開発ツール: npm, pnpm (パッケージ管理), TypeScript (静的型付け言語とトランスパイラ), Vitest (高速なテストフレームワーク), http-server (ローカル開発サーバー), dotenv, @octokit/rest, @google/generative-ai (自動ドキュメント生成などの開発支援ツール)
- テスト: Vitest (ユニットテスト、統合テスト、WASM関連テスト)
- ビルドツール: TypeScript Compiler (TSからJSへのトランスパイル), Rust/WASM Toolchain (RustコードからWebAssemblyバイナリ生成), build.rs (Rustビルド設定)
- 言語機能: JavaScript (アプリケーションロジック、ラッパー), Rust (MMLパーサーのコアロジックに利用し、WASM経由で高性能化)
- 自動化・CI/CD: GitHub Actions (READMEの自動生成やビルド・テストの自動化を示唆)
- 開発標準: .editorconfig (エディタのコードスタイル統一設定), tsconfig.json (TypeScriptコンパイラ設定), package-lock.json / pnpm-lock.yaml (依存関係の厳密な管理)

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
- **`.editorconfig`**: 複数の開発者間で一貫したコードスタイルを維持するための設定ファイル。
- **`.github_automation/`**: GitHub ActionsなどのCI/CDや自動化プロセスに関連するスクリプトや設定を格納するディレクトリ。
    - **`callgraph/config/my.json`**: プロジェクト内の関数呼び出しグラフを生成するツールの設定ファイル。
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイル。
- **`.nojekyll`**: GitHub PagesでJekyllビルドプロセスを無効にするためのファイル。
- **`IMPLEMENTATION_SUMMARY.md`**: プロジェクトの実装概要や重要な設計に関する詳細を記述したドキュメント。
- **`LIBRARY_USAGE.md`**: このライブラリをプロジェクトで利用するための詳細なガイドと手順を説明するドキュメント。
- **`LICENSE`**: プロジェクトの利用条件を定めるライセンス情報ファイル。
- **`QUICKSTART.md`**: プロジェクトを素早く開始するための導入ガイド。
- **`README.ja.md`**: プロジェクトの日本語版概要および説明書。
- **`README.md`**: プロジェクトの英語版概要および説明書。
- **`_config.yml`**: GitHub Pagesのサイト設定ファイル。
- **`dev-setup/`**: 開発環境のセットアップや準備に関するファイル群。
    - **`README.md`**: 開発環境のセットアップ手順を説明するドキュメント。
    - **`setup.js`**: 開発環境を初期化するためのJavaScriptスクリプト。
- **`dist/`**: TypeScriptソースコードからトランスパイルされ、配布用にビルドされたJavaScriptファイルや型定義ファイル、ソースマップを含むディレクトリ。
    - **`ast2json.d.ts`, `ast2json.js`, `ast2json.js.map`**: AST (抽象構文木) をTone.js JSON形式に変換するロジックの型定義、コンパイル済みJavaScriptコード、およびソースマップ。
    - **`demos.d.ts`, `demos.js`, `demos.js.map`**: プロジェクトのデモ機能に関連するコードの型定義、JavaScriptコード、およびソースマップ。
    - **`index.d.ts`, `index.js`, `index.js.map`**: ライブラリのエントリーポイントとなるメインファイルの型定義、JavaScriptコード、およびソースマップ。
    - **`libs/tonejs-json-sequencer.d.ts`, `libs/tonejs-json-sequencer.mjs`**: 音楽再生を担当する外部ライブラリ`tonejs-json-sequencer`の型定義ファイルとESモジュール。
    - **`main.d.ts`, `main.js`, `main.js.map`**: プロジェクトのメインアプリケーションまたはデモ実行ロジックの型定義、JavaScriptコード、およびソースマップ。
    - **`mml2ast.d.ts`, `mml2ast.js`, `mml2ast.js.map`**: MML文字列をASTに変換するパーサーロジックの型定義、JavaScriptコード、およびソースマップ。
    - **`mml2json-wasm.d.ts`, `mml2json-wasm.js`, `mml2json-wasm.js.map`**: WebAssemblyモジュールの初期化とラッパー関数に関連するコードの型定義、JavaScriptコード、およびソースマップ。
    - **`play.d.ts`, `play.js`, `play.js.map`**: 音楽再生機能に関連するロジックの型定義、JavaScriptコード、およびソースマップ。
- **`generated-docs/`**: 自動生成されたドキュメントファイル群。
    - **`callgraph-enhanced.html`, `callgraph.html`**: プロジェクト内の関数呼び出し関係を視覚化したインタラクティブなHTMLドキュメント。
    - **`callgraph.js`**: 呼び出しグラフのレンダリングやインタラクションを制御するJavaScriptコード。
    - **`style.css`**: 生成されたドキュメントの表示スタイルを定義するCSSファイル。
- **`googled947dc864c270e07.html`**: Googleサイト所有権の確認に使用されるファイル。
- **`index.html`**: プロジェクトの主要なデモページまたはランディングページ。
- **`issue-notes/`**: GitHub Issueに関連する詳細なメモや考察を記述したドキュメントを格納するディレクトリ。
    - **`61.md`, `63.md`, `65.md`, `67.md`**: 特定のIssue番号に関連する個別のメモファイル。
- **`library-usage-example.html`**: ライブラリの具体的な使用方法を示すHTMLのサンプルコード。
- **`package-lock.json`**: `npm`パッケージマネージャーによって生成される、プロジェクトの依存関係の正確なツリー構造とバージョンをロックするファイル。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発スクリプトなどを定義するファイル。
- **`pkg/`**: Rustで書かれたMMLパーサーがWebAssemblyにコンパイルされた成果物を格納するディレクトリ。
    - **`.npmignore`**: `pkg`ディレクトリ内のファイルが`npm`パッケージとして公開される際に除外されるファイルを指定。
    - **`README.md`**: `pkg`ディレクトリとその内容に関する説明。
    - **`package.json`**: WebAssemblyモジュール自体がnpmパッケージとして機能するためのメタデータ。
    - **`tonejs_mml_to_json.d.ts`, `tonejs_mml_to_json.js`, `tonejs_mml_to_json_bg.wasm`, `tonejs_mml_to_json_bg.wasm.d.ts`**: Rust WASMモジュールの型定義ファイル、JavaScriptラッパー、WebAssemblyバイナリ、バイナリの型定義ファイル。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成される、プロジェクトの依存関係の正確なツリー構造とバージョンをロックするファイル。
- **`rust/`**: MMLパーサーの高性能な部分を実装したRust言語のソースコードを含むディレクトリ。
    - **`Cargo.toml`**: Rustプロジェクトのビルド設定、依存関係、メタデータを定義するファイル。
    - **`IMPLEMENTATION.md`**: Rust実装の詳細な技術ドキュメント。
    - **`README.md`**: Rust部分の概要と説明。
    - **`build.rs`**: Rustプロジェクトのビルドプロセスをカスタマイズするためのスクリプト。
    - **`examples/basic_usage.rs`**: Rustで実装されたMMLパーサーの基本的な使用方法を示すサンプルコード。
    - **`src/`**: Rustのソースコード本体を格納するディレクトリ。
        - **`ast.rs`**: MMLパース結果の中間表現である抽象構文木 (AST) のデータ構造定義。
        - **`ast2json.rs`**: ASTからTone.js JSONシーケンサーフォーマットへの変換ロジック。
        - **`cst_to_ast.rs`**: 構文解析木 (CST) から抽象構文木 (AST) への変換ロジック。
        - **`lib.rs`**: Rustライブラリのメインエントリーポイント。
        - **`mml2ast.rs`**: MML文字列をASTに変換する主要なパーサーロジック。
        - **`mml2ast_manual.rs`**: 手動で記述されたMMLからASTへの変換ロジックの代替実装。
- **`scripts/`**: ビルドやデプロイなどの補助的なタスクを実行するためのスクリプトファイル群。
    - **`copy-libs.js`**: 特定のライブラリファイルをコピーするためのJavaScriptスクリプト。
- **`src/`**: プロジェクトのTypeScriptソースコード。
    - **`ast2json.ts`**: TypeScriptで実装されたASTからJSONへの変換ロジック。
    - **`demos.ts`**: TypeScriptで実装されたデモ機能のロジック。
    - **`index.html`**: (`src`ディレクトリ内の) デモ用のHTMLファイル。
    - **`index.ts`**: TypeScriptで実装されたライブラリのエントリーポイント。
    - **`main.ts`**: TypeScriptで実装されたメインアプリケーションまたはデモの実行ロジック。
    - **`mml2ast.ts`**: TypeScriptで実装されたMMLからASTへの変換ロジック。
    - **`mml2json-wasm.ts`**: TypeScriptで実装されたWebAssemblyモジュールの初期化とラッパー関数。
    - **`play.ts`**: TypeScriptで実装された音楽再生機能のロジック。
- **`test/`**: プロジェクトのテストコードを格納するディレクトリ。
    - **`ast2json.test.js`**: `ast2json`モジュールのテスト。
    - **`demo-test.mjs`**: デモ機能に関するテスト。
    - **`integration.test.js`**: ライブラリ全体の統合テスト。
    - **`library-entry.test.js`**: ライブラリのエントリーポイントのテスト。
    - **`mml2ast.test.js`**: `mml2ast`モジュールのテスト。
    - **`setup.js`**: テスト環境の初期設定スクリプト。
    - **`wasm-init-test.mjs`, `wasm-integration-test.mjs`, `wasm-test.mjs`**: WebAssemblyモジュールに関する初期化、統合、およびユニットテスト。
- **`tsconfig.json`**: TypeScriptコンパイラのオプションや設定を定義するファイル。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイル。

## 関数詳細説明
- **`ast2json` (dist/ast2json.d.ts, dist/ast2json.js, src/ast2json.ts)**: 抽象構文木 (AST) を入力として受け取り、音楽再生ライブラリTone.jsが解釈できるJSONシーケンサーフォーマットに変換する主要な関数。
- **`initWasm` (dist/index.d.ts, dist/mml2json-wasm.d.ts, dist/mml2json-wasm.js, src/index.ts, src/mml2json-wasm.ts)**: WebAssembly (WASM) モジュールをロードし、初期化するための非同期関数。ブラウザ環境でRustで実装された高速なMMLパーサーを利用するために必須。
- **`mml2json` (dist/index.d.ts, dist/index.js, src/index.ts)**: MML文字列を直接入力として受け取り、WebAssemblyパーサーとJSON変換ロジックを統合してTone.js JSONシーケンサーフォーマットに変換する高レベルな統合関数。
- **`mml2ast` (dist/index.d.ts, dist/mml2ast.d.ts, dist/mml2ast.js, src/index.ts, src/mml2ast.ts)**: MML文字列を解析し、その構造を抽象構文木 (AST) として表現する関数。
- **`initializeDemoDropdown` (dist/main.js, src/main.ts)**: デモンストレーション用のウェブページにおいて、MMLのサンプルを選択し再生するためのドロップダウンメニューを初期化する関数。
- **`toSequenceEvent` (dist/play.js, src/play.ts)**: MMLから変換されたデータ構造を、`tonejs-json-sequencer`ライブラリが利用するシーケンスイベントの形式に整形する内部関数。
- **`play` (dist/play.d.ts, dist/play.js, src/play.ts)**: Tone.js JSONシーケンサーフォーマットの音楽データを入力として受け取り、`tonejs-json-sequencer`ライブラリを通してブラウザで音楽を再生する関数。
- **`escapeHtml` (generated-docs/callgraph.js)**: HTMLの特殊文字をエスケープし、スクリプトインジェクションなどを防ぎ安全に表示するためのユーティリティ関数。
- **`getLayoutConfig` (generated-docs/callgraph.js)**: 関数呼び出しグラフの視覚化ツールにおいて、レイアウトに関する設定を取得する関数。
- **`placeCentralNode` (generated-docs/callgraph.js)**: 関数呼び出しグラフの中央に配置されるべきノードを決定し配置する関数。
- **`showNodeInfo` (generated-docs/callgraph.js)**: グラフ上の特定のノード（関数）が選択された際に、その関数の詳細情報を表示する関数。
- **`showEdgeInfo` (generated-docs/callgraph.js)**: グラフ上のエッジ（関数間の呼び出し関係）が選択された際に、その詳細情報を表示する関数。
- **`hideInfoPanel` (generated-docs/callgraph.js)**: 関数やエッジの詳細を表示する情報パネルを非表示にする関数。
- **`showInfoPanel` (generated-docs/callgraph.js)**: 関数やエッジの詳細を表示する情報パネルを表示する関数。
- **`toggleInfoPanel` (generated-docs/callgraph.js)**: 情報パネルの表示状態を切り替える（表示/非表示）関数。
- **`generateGitHubURL` (generated-docs/callgraph.js)**: 該当するソースコードのGitHubリポジトリへのURLを生成する関数。
- **`resetLayout` (generated-docs/callgraph.js)**: 関数呼び出しグラフの表示レイアウトを初期状態にリセットする関数。
- **`watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js)**: グラフ内のノードの動きを監視し、ノード同士の重なりを自動的に修正するためのロジック。
- **`resolveNodeOverlaps` (generated-docs/callgraph.js)**: グラフ内の重なっているノードを検出し、視覚的に見やすくなるように位置を調整する関数。
- **`switchLayout` (generated-docs/callgraph.js)**: 関数呼び出しグラフの表示レイアウトを異なる形式に切り替える関数。
- **`resetNodeStates` (generated-docs/callgraph.js)**: グラフ内のノードの強調表示やフィルター状態などを初期状態に戻す関数。
- **`fitToContent` (generated-docs/callgraph.js)**: グラフ全体が現在のビューポートに収まるようにズームレベルや位置を調整する関数。
- **`toggleNodeLabels` (generated-docs/callgraph.js)**: グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数。
- **`toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: 呼び出し先のファイルパスなどに基づいたフィルターのオン/オフを切り替える関数。
- **`getStringFromWasm0` (pkg/tonejs_mml_to_json.js)**: WebAssemblyメモリからJavaScriptの文字列としてデータを取得する低レベルなヘルパー関数。
- **`getUint8ArrayMemory0` (pkg/tonejs_mml_to_json.js)**: WebAssemblyメモリからUint8Arrayビューを取得する低レベルなヘルパー関数。
- **`passStringToWasm0` (pkg/tonejs_mml_to_json.js)**: JavaScriptの文字列をWebAssemblyメモリに渡し、WASMモジュールが利用できるようにする低レベルなヘルパー関数。
- **`decodeText` (pkg/tonejs_mml_to_json.js)**: バイトデータをテキストとしてデコードするユーティリティ関数。
- **`ast2json_wasm` (pkg/tonejs_mml_to_json.d.ts)**: Rustで実装され、WebAssemblyとしてエクスポートされたASTからJSONへの変換関数。
- **`cst_to_ast_wasm` (pkg/tonejs_mml_to_json.d.ts)**: Rustで実装され、WebAssemblyとしてエクスポートされたCST (具象構文木) からASTへの変換関数。
- **`cst_to_json_wasm` (pkg/tonejs_mml_to_json.d.ts)**: Rustで実装され、WebAssemblyとしてエクスポートされたCSTからJSONへの変換関数。
- **`mml2ast_wasm` (pkg/tonejs_mml_to_json.d.ts)**: Rustで実装され、WebAssemblyとしてエクスポートされたMMLからASTへの変換関数。
- **`initSync` (pkg/tonejs_mml_to_json.d.ts)**: WebAssemblyモジュールを同期的に初期化するための関数。
- **`__wbg_init` (pkg/tonejs_mml_to_json.d.ts)**: WebAssemblyモジュールの内部的な初期化処理を実行する関数。
- **`scheduleOrExecuteEvent` (dist/libs/tonejs-json-sequencer.d.ts)**: `tonejs-json-sequencer`ライブラリの一部で、音楽イベントをタイムラインにスケジュールするか、即座に実行します。
- **`playSequence` (dist/libs/tonejs-json-sequencer.d.ts)**: `tonejs-json-sequencer`ライブラリの一部で、JSONシーケンスデータを解析し、音楽として再生を開始します。

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
```

---
Generated at: 2026-01-14 07:06:29 JST
