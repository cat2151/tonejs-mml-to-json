Last updated: 2026-01-10

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

## 技術スタック
- フロントエンド: 
  - **WebAssembly (WASM)**: Rustで実装された変換ロジックをブラウザで高速に実行するために利用されます。
  - **Tone.js (JSON Sequencer Format)**: 変換後の音楽データの出力形式であり、ブラウザでの音楽再生ライブラリであるTone.jsと連携することを想定しています。
- 音楽・オーディオ: 
  - **MML (Music Macro Language)**: 音楽をテキストで記述するための入力形式として使用されます。
  - **Tone.js JSON Sequencer Format**: 変換後の音楽データを表現するためのターゲット形式です。
- 開発ツール: 
  - **TypeScript**: 静的型付けされたJavaScriptで、堅牢なコード開発を支援します。
  - **Peggy (PEG.js)**: MML文字列を解析するためのパーサー（構文解析器）を生成するツールです。
  - **Vitest**: JavaScript/TypeScriptプロジェクト向けの高速なユニットテストフレームワークです。
  - **dotenv**: 環境変数を管理し、設定を柔軟にするために使用されます。
  - **@octokit/rest**: GitHub APIと連携し、自動化スクリプトなどでの利用が想定されます。
  - **@google/generative-ai**: 自動化されたドキュメント生成などに利用される可能性があります。
- テスト: 
  - **Vitest**: 各モジュール（mml2ast, ast2jsonなど）の機能が正しく動作することを検証するためのテストを実行します。
- ビルドツール: 
  - **Peggy**: MMLパーサーをJavaScriptコードとして生成します。
  - **TypeScript Compiler**: TypeScriptコードをJavaScriptにコンパイルします。
- 言語機能: 
  - **JavaScript**: プロジェクトの主要な実装言語です。
  - **TypeScript**: JavaScriptのスーパーセットであり、型安全性を提供します。
  - **Rust**: 変換ロジックの代替実装を提供し、WASMを通じてWebブラウザでの利用も可能です。
  - **WebAssembly (WASM)**: Rust実装をブラウザでネイティブに近い速度で実行するためのバイナリ形式です。
- 自動化・CI/CD: 
  - **GitHub Actions**: READMEファイルの多言語対応（日本語から英語への自動翻訳）など、開発プロセスの自動化に利用されます。
- 開発標準: 
  - **EditorConfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。

## ファイル階層ツリー
```
.
├── .editorconfig
├── .github_automation/
│   └── callgraph/
│       └── config/
│           └── my.json
├── .gitignore
├── IMPLEMENTATION_SUMMARY.md
├── LICENSE
├── QUICKSTART.md
├── README.ja.md
├── README.md
├── TYPESCRIPT_MIGRATION.md
├── _config.yml
├── dev-setup/
│   ├── README.md
│   └── setup.js
├── generated-docs/
│   ├── callgraph-enhanced.html
│   ├── callgraph.html
│   ├── callgraph.js
│   └── style.css
├── googled947dc864c270e07.html
├── index.html
├── issue-notes/
│   ├── 1.md
│   ├── 10.md
│   ├── 11.md
│   ├── 12.md
│   ├── 13.md
│   ├── 14.md
│   ├── 15.md
│   ├── 16.md
│   ├── 17.md
│   ├── 18.md
│   ├── 2.md
│   ├── 20.md
│   ├── 21.md
│   ├── 23.md
│   ├── 24.md
│   ├── 26.md
│   ├── 27.md
│   ├── 28.md
│   ├── 3.md
│   ├── 31.md
│   ├── 4.md
│   ├── 5.md
│   ├── 6.md
│   ├── 7.md
│   ├── 8.md
│   └── 9.md
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── rust/
│   ├── Cargo.toml
│   ├── IMPLEMENTATION.md
│   ├── README.md
│   ├── examples/
│   │   └── basic_usage.rs
│   └── src/
│       ├── ast.rs
│       ├── ast2json.rs
│       ├── lib.rs
│       └── mml2ast.rs
├── src/
│   ├── ast2json.ts
│   ├── grammar.js
│   ├── grammar.pegjs
│   ├── index.html
│   ├── main.ts
│   ├── mml2ast.ts
│   ├── mml2json-wasm.ts
│   ├── mml2json.js
│   └── play.ts
├── test/
│   ├── ast2json.test.js
│   ├── demo-test.mjs
│   ├── integration.test.js
│   ├── mml2ast.test.js
│   ├── parser.test.js
│   ├── wasm-init-test.mjs
│   ├── wasm-integration-test.mjs
│   └── wasm-test.mjs
├── tsconfig.json
└── vitest.config.js
```

## ファイル詳細説明
- **README.ja.md / README.md**: プロジェクトの概要、目的、使い方などを説明する多言語対応のメインドキュメントです。
- **src/mml2ast.ts**: MML（Music Macro Language）のテキストを解析し、抽象構文木（AST: Abstract Syntax Tree）に変換するTypeScriptファイルです。音楽の構造をデータとして表現します。
- **src/ast2json.ts**: `mml2ast.ts`によって生成されたASTを、Tone.jsが解釈できるJSONシーケンサーフォーマットに変換するTypeScriptファイルです。MMLの情報を具体的な音のイベントに落とし込みます。
- **src/grammar.pegjs**: Peggy（PEG.js）というパーサー生成ツールがMMLの構文を定義するために使用するファイルです。MMLのルールがここで記述され、`src/grammar.js`を生成します。
- **src/grammar.js**: `grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML文字列の解析を担当します。
- **src/mml2json-wasm.ts**: Rustで実装されたMML変換ロジックをWebAssembly（WASM）としてブラウザで利用するためのインターフェースを提供するTypeScriptファイルです。
- **rust/** (ディレクトリ): MMLからJSONへの変換ロジックのRust言語による実装を含みます。
  - **rust/src/mml2ast.rs**: Rust版のMMLからASTへのパーサーです。
  - **rust/src/ast2json.rs**: Rust版のASTからTone.js JSONへのコンバーターです。
- **src/play.ts**: 変換された音楽データをブラウザ上で実際に再生するためのロジックを含むTypeScriptファイルです。デモページで利用されます。
- **index.html / src/index.html**: プロジェクトのデモページやメインのウェブページを構成するHTMLファイルです。変換機能を試したり、結果を視覚的に確認したりするために使われます。
- **test/** (ディレクトリ): 各変換ステップ（mml2ast, ast2json）や統合テスト、WASMのテストなど、プロジェクトの機能が正しく動作することを検証するためのテストコードを含みます。
- **generated-docs/** (ディレクトリ): プロジェクトのコールグラフやその他の視覚化されたドキュメント、スタイルシートなど、自動生成されたドキュメント資産が格納されています。
- **issue-notes/** (ディレクトリ): 開発中の検討事項や、特定の課題に関するメモがMarkdown形式で記録されています。
- **dev-setup/setup.js**: 開発環境のセットアップや特定の開発タスクを実行するためのスクリプトです。

## 関数詳細説明
- **mml2ast (src/mml2ast.ts)**
  - 役割: MML文字列を抽象構文木（AST）にパースします。
  - 引数: MML形式の音楽文字列。
  - 戻り値: MMLの構造を表すASTオブジェクト。
  - 機能: MMLの文法（音符、休符、長さ、オクターブ、楽器など）に従って入力文字列を解析し、音の要素を階層的なデータ構造に変換します。
- **ast2json (src/ast2json.ts)**
  - 役割: 抽象構文木（AST）をTone.jsのJSONシーケンサーフォーマットに変換します。
  - 引数: `mml2ast`によって生成されたAST。
  - 戻り値: Tone.jsが認識するJSONオブジェクト。
  - 機能: AST内の音楽情報を解析し、Tone.jsがブラウザで再生できる時間軸ベースのイベントシーケンス（音符の開始時刻、長さ、ベロシティなど）に変換します。
- **play (src/play.ts)**
  - 役割: 変換された音楽データをブラウザで再生します。
  - 引数: Tone.js互換のJSON音楽データ。
  - 戻り値: なし。
  - 機能: `ast2json`によって生成された音楽データを利用して、Tone.jsのシーケンサーを初期化し、ウェブブラウザ上で実際に音を鳴らします。デモページのコア機能です。
- **initWasm (src/mml2json-wasm.ts)**
  - 役割: Rustで実装されたWebAssembly (WASM) モジュールを初期化します。
  - 引数: なし。
  - 戻り値: 初期化されたWASMモジュールが提供するMML変換機能。
  - 機能: プロジェクトのRust実装（MMLからJSONへの変換ロジック）をブラウザのJavaScript環境で利用可能にするため、WASMモジュールをロードし、必要な設定を行います。
- **mml2json (src/mml2json.js)**
  - 役割: MMLを直接Tone.js JSON形式に変換する（レガシーまたは代替実装）。
  - 引数: MML文字列。
  - 戻り値: Tone.js互換のJSONオブジェクト。
  - 機能: 以前の変換ロジック、または一部のシンプルなMML変換を直接処理する機能を提供します。
- **parseNote (src/mml2ast.ts)**
  - 役割: MML文字列の一部から音符の情報を解析します。
  - 引数: MML文字列。
  - 戻り値: 音符のASTノード。
  - 機能: MMLの音符表現（例: "c4", "e+8"）を抽出し、その音の高さ、長さ、符点などの属性を決定します。

## 関数呼び出し階層ツリー
```
- switch (generated-docs/callgraph.js)
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
      - function ()
      - max ()
      - on ()
      - ready ()
      - addListener ()
  - ast2json (src/ast2json.ts)
    - processNote ()
      - processRest ()
      - calcTicks ()
      - calcDuration ()
      - calcStartTick ()
      - increaseStartTick ()
      - getNodeId ()
      - repeat ()
  - mml2json (src/mml2json.js)
    - compileMmlToCommands ()
      - getMmlCommands ()
      - calcAttackToReleaseTicks ()
      - toInt ()
      - calcLtick ()
      - sort ()
  - error ()
  - play ()
    - sub ()
- if (generated-docs/callgraph.js)
  - catch (dev-setup/setup.js)
  - start (src/grammar.pegjs)
  - parseDigits (src/mml2ast.ts)
    - isValidDuration ()
      - isValidOctave ()
      - isValidInstrument ()
      - mml2ast ()
      - parseNote ()
      - parseRest ()
      - parseLength ()
      - parseOctave ()
      - parseInstrument ()
  - initWasm (src/mml2json-wasm.ts)
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
- while (src/mml2ast.ts)

---
Generated at: 2026-01-10 07:05:53 JST
