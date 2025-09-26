Last updated: 2025-09-27

# Project Overview

## プロジェクト概要
- MML形式の音楽データをTone.js互換のJSONシーケンサーフォーマットへ変換します。
- Web Audio APIとTone.jsを活用し、ブラウザ上で変換された音楽データを即座に再生・プレビューする機能を提供します。
- このツールは、ユーザーがMMLを手軽に試せる環境を提供し、音楽制作のプロセスを支援することを目指します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLプレイヤーのユーザーインターフェースを構築
- 音楽・オーディオ:
  - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音楽生成・再生を可能にするJavaScriptライブラリ
  - Web Audio API - ブラウザに組み込まれた音声処理APIで、動的なオーディオ生成とエフェクトをサポート（Tone.js経由で利用）
  - Tone.js CDN (unpkg) - Tone.jsライブラリをunpkg経由で提供し、簡単にプロジェクトに組み込み可能にする
  - MML (Music Macro Language) - 音楽をテキストベースで記述するための簡易的なプログラミング言語・記法
- 開発ツール:
  - Node.js runtime - JavaScriptコードを実行するためのサーバーサイド環境
  - npm scripts - `package.json`に定義されたカスタムスクリプトを実行するタスクランナー（テスト、ビルド、ドキュメント生成など）
  - pnpm - ディスクスペースを効率的に利用し、高速なパッケージインストールを可能にするJavaScriptパッケージマネージャー
  - Google Generative AI - プロジェクトの文書生成などをAIでサポートする
  - @octokit/rest - GitHub APIと連携し、リポジトリ情報を取得したり、自動化処理を実行したりする
- テスト:
  - Vitest - Viteを基盤とした高速なユニットテストフレームワーク
  - TDD (Test-Driven Development) - テストコードを先に書き、それから実装を行う開発手法
- ビルドツール:
  - Peggy - PEG (Parsing Expression Grammar) 形式の文法定義から、構文解析器（パーサー）を生成するためのツール
  - PEG文法定義 - MML音楽記法を解析するための文法ルールを記述したもの。Peggyがこれを元にパーサーを生成します。
- 言語機能: ES Modules - JavaScriptの標準的なモジュールシステム。コードの分割と再利用を効率化します。
- 自動化・CI/CD:
  - GitHub Actions - GitHub上でコードのビルド、テスト、デプロイなどのワークフローを自動化するCI/CDサービス
    - プロジェクト要約自動生成 - AIを用いてプロジェクトの概要などを自動生成する
    - Issue自動管理 - Issueの作成、更新、クローズなどを自動化する
    - README多言語翻訳 - READMEファイルを自動的に多言語に翻訳する
    - i18n automation - 国際化対応のための翻訳プロセスを自動化する
- 開発標準: EditorConfig - 複数のIDEやエディタ間で、インデントスタイル、文字コードなどのコーディングスタイルを統一するための設定ファイル

## ファイル階層ツリー
```
.
├── .editorconfig
├── .gitignore
├── LICENSE
├── README.ja.md
├── README.md
├── dev-setup/
│   ├── README.md
│   └── setup.js
├── generated-docs/
│   ├── callgraph-enhanced.html
│   ├── callgraph.js
│   └── style.css
├── index.html
├── issue-notes/
│   ├── 1.md
│   ├── 10.md
│   ├── ... (その他、issue関連のノートファイル)
│   └── 9.md
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── grammar.js
│   ├── grammar.pegjs
│   ├── index.html
│   ├── main.js
│   ├── mml2json.js
│   └── play.js
├── test/
│   └── parser.test.js
└── vitest.config.js
```

## ファイル詳細説明
- **`.editorconfig`**: コードエディタのインデント、エンコーディングなどの設定を統一し、異なる開発環境間でのコードスタイルの一貫性を保つための設定ファイルです。
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されたファイルです。
- **`README.ja.md`**: プロジェクトの概要、使い方、設定方法などを日本語で説明するドキュメントです。
- **`README.md`**: プロジェクトの概要、使い方、設定方法などを英語で説明するドキュメント（通常は主要言語）です。
- **`dev-setup/README.md`**: 開発環境のセットアップ手順や関連情報が記述されたドキュメントです。
- **`dev-setup/setup.js`**: 開発環境の初期設定や準備を行うためのスクリプトです。
- **`generated-docs/callgraph-enhanced.html`**: 関数の呼び出し階層を視覚的に表示するためのHTMLファイルです。
- **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で関数の呼び出し階層を動的に生成・操作するためのJavaScriptコードです。
- **`generated-docs/style.css`**: 生成されたドキュメント（例: `callgraph-enhanced.html`）のスタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのルートにあるHTMLファイル。通常、デモやトップページとして機能し、Webサイトへの入り口を提供します。
- **`issue-notes/`**: (来訪者向けではないため詳細省略) 開発中の課題や検討事項を記録したMarkdownファイルの集合です。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、インストールされたパッケージの正確なバージョンと依存関係ツリーを記録します。
- **`src/grammar.js`**: `grammar.pegjs`から`Peggy`によって生成された、MMLを解析するためのJavaScriptパーサです。
- **`src/grammar.pegjs`**: MML (Music Macro Language) の構文を定義するPEG (Parsing Expression Grammar) 形式のファイルです。この定義に基づいてパーサが生成されます。
- **`src/index.html`**: アプリケーションのメインとなるHTMLファイルで、MML入力とTone.jsによる再生インターフェースを含むデモページです。
- **`src/main.js`**: アプリケーションの主要なロジックを初期化または調整するJavaScriptファイルです。
- **`src/mml2json.js`**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックを含むJavaScriptファイルです。
- **`src/play.js`**: 変換されたJSONデータを使用してTone.jsで音楽を再生する機能を提供するJavaScriptファイルです。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサのテストコードです。
- **`vitest.config.js`**: `Vitest`テストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch`**:
  - `dev-setup/setup.js`: エラーハンドリングのための一般的なJavaScriptのキーワード。通常はPromiseチェーンの最後で例外を捕捉し、処理を行います。
  - `src/play.js`: 音楽再生処理中に発生したエラーを捕捉し、適切なエラーメッセージを表示するなどの処理を行います。
- **`error`**: 処理中に発生したエラーオブジェクトまたはエラーメッセージを生成・操作します。
- **`on`**: イベントリスナーを設定するための一般的な関数名。特定のイベント発生時に指定されたコールバック関数を実行します。
- **`escapeHtml`** (`generated-docs/callgraph.js`): HTML特殊文字をエスケープし、スクリプトインジェクションを防ぐなど、安全に表示可能な文字列に変換します。
- **`getLayoutConfig`** (`generated-docs/callgraph.js`): グラフのレイアウトに関する設定を取得・提供します。
- **`placeCentralNode`** (`generated-docs/callgraph.js`): グラフの中心となるノード（関数）を配置します。
- **`showNodeInfo`** (`generated-docs/callgraph.js`): 特定のノード（関数）に関する詳細情報を表示するUI要素を操作します。
- **`showEdgeInfo`** (`generated-docs/callgraph.js`): グラフのエッジ（関数間の呼び出し関係）に関する詳細情報を表示するUI要素を操作します。
- **`hideInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルを非表示にします。
- **`showInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルを表示します。
- **`toggleInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルの表示/非表示を切り替えます。
- **`generateGitHubURL`** (`generated-docs/callgraph.js`): GitHubリポジトリへのURLを生成します。
- **`resetLayout`** (`generated-docs/callgraph.js`): グラフのレイアウトを初期状態にリセットします。
- **`watchNodeMovementAndFixOverlapsWrap`** (`generated-docs/callgraph.js`): ノードの動きを監視し、重なりを修正するためのラッパー関数です。
- **`watchNodeMovementAndFixOverlaps`** (`generated-docs/callgraph.js`): ノードの重なりを動的に検出し、修正します。
- **`resolveNodeOverlaps`** (`generated-docs/callgraph.js`): 発生したノードの重なりを解決します。
- **`switchLayout`** (`generated-docs/callgraph.js`): グラフのレイアウト方式を切り替えます。
- **`resetNodeStates`** (`generated-docs/callgraph.js`): すべてのノードの状態（選択状態、ハイライトなど）をリセットします。
- **`fitToContent`** (`generated-docs/callgraph.js`): グラフの内容に合わせて表示領域を調整します。
- **`toggleNodeLabels`** (`generated-docs/callgraph.js`): ノードのラベルの表示/非表示を切り替えます。
- **`toggleCalleeLocationFilter`** (`generated-docs/callgraph.js`): 呼び出し先の場所によるフィルタリングのON/OFFを切り替えます。
- **`replace`** (`generated-docs/callgraph.js`): 文字列の置換を行います。
- **`function`** (`generated-docs/callgraph.js`): JavaScriptの関数を定義するキーワード。文脈に応じて特定の処理を行う無名関数またはヘルパー関数を指します。
- **`max`** (`generated-docs/callgraph.js`): 複数の値の中から最大値を取得します。
- **`ready`** (`generated-docs/callgraph.js`): DOMが完全に読み込まれたときに実行される処理を定義します。
- **`addListener`** (`generated-docs/callgraph.js`): イベントリスナーを追加します。
- **`mml2json`** (`src/mml2json.js`): MML (Music Macro Language) 形式の文字列を解析し、Tone.jsで利用可能なJSON形式のシーケンスデータに変換する主要な関数です。
- **`compileMmlToCommands`** (`src/mml2json.js`): MMLを内部的なコマンドリストにコンパイルします。
- **`getMmlCommands`** (`src/mml2json.js`): コンパイルされたMMLコマンドを取得します。
- **`calcAttackToReleaseTicks`** (`src/mml2json.js`): 音符のアタックからリリースまでのティック数を計算します。
- **`repeat`** (`src/mml2json.js`): 文字列や処理を複数回繰り返します。
- **`toInt`** (`src/mml2json.js`): 引数を整数に変換します。
- **`calcDuration`** (`src/mml2json.js`): 音符の持続時間（デュレーション）を計算します。
- **`calcStartTick`** (`src/mml2json.js`): 音符の開始ティックを計算します。
- **`increaseStartTick`** (`src/mml2json.js`): 開始ティックを増加させます。
- **`calcLtick`** (`src/mml2json.js`): 最終ティックに関連する値を計算します。
- **`getNodeId`** (`src/mml2json.js`): ノードの一意識別子を取得します。
- **`sort`** (`src/mml2json.js`): 配列などの要素をソートします。
- **`play`** (`src/play.js`): Tone.jsを使用して、変換されたMMLシーケンス（JSON形式）を再生する機能を提供します。
- **`sub`** (`src/play.js`): サブプロセスの実行や、Tone.jsのオーディオコンテキストにおけるサブミキサー/バス操作などを行います。
- **`hex`** (`src/grammar.js`): 16進数に関連する処理を行います。通常、パーサー内で文字コードの解析などに使われます。
- **`unicodeEscape`** (`src/grammar.js`): Unicodeエスケープシーケンスを処理します。
- **`literalEscape`** (`src/grammar.js`): リテラルエスケープシーケンスを処理します。
- **`classEscape`** (`src/grammar.js`): 文字クラスエスケープシーケンスを処理します。
- **`describeExpectation`** (`src/grammar.js`): パーサーが期待する次の入力について説明を生成します。
- **`describeExpected`** (`src/grammar.js`): 期待される入力に関する説明を生成します。
- **`describeFound`** (`src/grammar.js`): 見つかった入力について説明を生成します。
- **`peg$parse`** (`src/grammar.js`): Peggyによって生成されたメインのパーサー関数。MML文字列を解析し、AST（抽象構文木）または指定された出力形式に変換します。
- **`peg$f0`** (`src/grammar.js`): Peggyによって生成された内部ヘルパー関数の一つです。
- **`text`** (`src/grammar.js`): 解析中の入力文字列から現在のマッチング部分を取得します。
- **`offset`** (`src/grammar.js`): 現在の解析位置のオフセット（文字数）を取得します。
- **`range`** (`src/grammar.js`): 解析中の入力文字列における現在のマッチング部分の範囲（開始・終了オフセット）を取得します。
- **`location`** (`src/grammar.js`): 現在の解析位置の行番号や列番号などの位置情報を取得します。
- **`expected`** (`src/grammar.js`): パーサーが次に期待する入力を表現するオブジェクトを生成します。
- **`peg$getUnicode`** (`src/grammar.js`): Unicode文字を取得します。
- **`peg$literalExpectation`** (`src/grammar.js`): リテラル文字列を期待するパーサーの振る舞いを定義します。
- **`peg$classExpectation`** (`src/grammar.js`): 文字クラス（例: `[a-z]`）を期待するパーサーの振る舞いを定義します。
- **`peg$anyExpectation`** (`src/grammar.js`): 任意の文字を期待するパーサーの振る舞いを定義します。
- **`peg$endExpectation`** (`src/grammar.js`): 入力の終わりを期待するパーサーの振る舞いを定義します。
- **`peg$otherExpectation`** (`src/grammar.js`): その他の種類の期待される入力を定義します。
- **`peg$computePosDetails`** (`src/grammar.js`): 位置の詳細情報（行、列など）を計算します。
- **`peg$computeLocation`** (`src/grammar.js`): 入力文字列内の特定の位置に対応するソースコード位置情報を計算します。
- **`peg$fail`** (`src/grammar.js`): パーサーのエラーを通知します。
- **`peg$buildSimpleError`** (`src/grammar.js`): シンプルな形式のエラーオブジェクトを構築します。
- **`peg$buildStructuredError`** (`src/grammar.js`): 構造化された形式のエラーオブジェクトを構築します。
- **`peg$parsestart`** (`src/grammar.js`): `grammar.pegjs`で定義された`start`ルールに対応するパーサー関数です。
- **`peg$parsenote`** (`src/grammar.js`): `grammar.pegjs`で定義された`note`ルールに対応するパーサー関数です。
- **`peg$throw`** (`src/grammar.js`): エラーをスローします。
- **`constructor`** (`src/grammar.js`): クラスのインスタンスを初期化するコンストラクタ関数です。
- **`format`** (`src/grammar.js`): 文字列のフォーマットを行います。
- **`buildMessage`** (`src/grammar.js`): エラーメッセージを構築します。
- **`literal`** (`src/grammar.js`): リテラル値を処理します。
- **`class`** (`src/grammar.js`): CSSクラス名またはJavaScriptのクラスキーワードを指します。文脈によって異なる処理を行います。
- **`any`** (`src/grammar.js`): 任意の値を処理します。
- **`end`** (`src/grammar.js`): 処理の終了を示すキーワードまたは関数です。
- **`other`** (`src/grammar.js`): その他のケースを処理します。
- **`start`** (`src/grammar.pegjs`): MML文法の開始ルール。MML文字列全体のパースを開始するエントリポイントです。
- **`note`** (`src/grammar.pegjs`): MML文法における音符の定義ルール。個々の音符や休符、長さなどを解析します。
- **`switch`**: プログラムの制御フローを分岐させるためのJavaScriptのキーワード。
- **`if`**: 条件に基づいてコードの実行を制御するJavaScriptのキーワード。
- **`for`**: ループ処理を行うためのJavaScriptのキーワード。
- **`while`**: 条件が真である間、コードブロックを繰り返し実行するJavaScriptのキーワード。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
  - error ()
  - on ()
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
      - ready ()
      - addListener ()
  - mml2json (src/mml2json.js)
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
  - play (src/play.js)
    - sub ()
- switch (generated-docs/callgraph.js)
- if (generated-docs/callgraph.js)
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
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)

---
Generated at: 2025-09-27 07:06:07 JST
