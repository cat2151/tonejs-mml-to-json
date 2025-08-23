Last updated: 2025-08-24

# Project Overview

## プロジェクト概要
- MML形式の楽譜をWeb Audio APIとTone.jsが利用できるJSONシーケンサー形式に変換します。
- ブラウザ上でMML音楽の解析、変換、再生を可能にし、手軽なMMLプレイヤーを提供します。
- CI/CDによる自動化、多言語対応、開発標準の統一で、効率的な開発と高い品質を維持しています。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの基盤)
- 音楽・オーディオ: Tone.js (Web Audio APIを活用したブラウザでの音声合成・再生), Tone.js CDN (unpkg経由でTone.jsライブラリを提供), MML (音楽記法パーサー), Web Audio API (ブラウザネイティブの音声処理技術)
- 開発ツール: Node.js runtime (JavaScript実行環境), npm scripts (様々な開発タスクを自動化), pnpm (高速で効率的なパッケージマネージャー), Google Generative AI (AIによるドキュメント生成支援), @octokit/rest (GitHub API連携でリポジトリ操作を自動化)
- テスト: Vitest (高速なViteベースのテストフレームワーク), TDD (テスト駆動開発手法を採用し、品質を保証)
- ビルドツール: Peggy (PEG文法に基づいてMMLパーサーを自動生成), PEG文法定義 (MML音楽記法のパーサー生成に使用する文法定義)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を向上)
- 自動化・CI/CD: GitHub Actions (CI/CDワークフローを自動化し、プロジェクトの品質と開発効率を向上), プロジェクト要約自動生成, Issue自動管理, README多言語翻訳, i18n automation (国際化対応の自動化)
- 開発標準: EditorConfig (異なる開発環境間でのコードスタイル統一を支援)

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
📄 LICENSE
📖 README.ja.md
📖 README.md
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 generated-docs/
  🌐 callgraph-enhanced.html
  📜 callgraph.js
  📖 development-status.md
  📖 project-overview.md
  🎨 style.css
🌐 index.html
📁 issue-notes/
  📖 1.md
  📖 10.md
  📖 11.md
  📖 12.md
  📖 13.md
  📖 14.md
  📖 15.md
  📖 16.md
  📖 17.md
  📖 18.md
  📖 2.md
  📖 20.md
  📖 3.md
  📖 4.md
  📖 5.md
  📖 6.md
  📖 7.md
  📖 8.md
  📖 9.md
📊 package.json
📄 pnpm-lock.yaml
📁 src/
  📜 grammar.js
  📝 grammar.pegjs
  🌐 index.html
  📜 main.js
  📜 mml2json.js
  📜 play.js
📁 test/
  📜 parser.test.js
📜 vitest.config.js
```

## ファイル詳細説明
- **.editorconfig**: 異なるエディタやIDE間でコードのスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象としないファイルやディレクトリを指定するファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの日本語版説明書です。
- **README.md**: プロジェクトの英語版説明書です。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記載されています。
- **dev-setup/setup.js**: 開発環境のセットアップを自動化するためのJavaScriptスクリプトです。テストフレームワーク`Vitest`のセットアップに関わります。
- **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出し関係を視覚的に表示するための強化されたHTMLドキュメントです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの生成・表示ロジックを含むJavaScriptファイルです。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのライブデモやメインのWebアプリケーションのエントリーポイントとなるHTMLファイルです。
- **issue-notes/** (ディレクトリ): 開発中の課題や検討事項に関するノートが格納されています。（来訪者向けのため、個別のファイル説明は省略します）
- **package.json**: プロジェクトのメタデータ、スクリプト、依存関係が定義されているファイルです。
- **pnpm-lock.yaml**: pnpmによって管理される依存関係の正確なバージョンとハッシュが記録されたロックファイルです。
- **src/grammar.js**: Peggyによって`src/grammar.pegjs`から自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）を生成する主要なロジックを含みます。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法を定義するPEG (Parsing Expression Grammar) 形式のファイルです。この定義に基づいてパーサーが自動生成されます。
- **src/index.html**: `src`ディレクトリ内のデモページまたはMMLプレイヤーのメインUIとなるHTMLファイルです。
- **src/main.js**: メインのアプリケーションロジックや初期化処理を含むJavaScriptファイルです。
- **src/mml2json.js**: MMLのAST（抽象構文木）をTone.jsが解釈できるJSONシーケンサー形式に変換する主要なロジックが含まれています。
- **src/play.js**: Tone.jsを使用して、変換されたJSONデータに基づいて音楽を再生するロジックを実装しています。
- **test/parser.test.js**: MMLパーサーの機能と正確性を検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): エラー発生時に例外を捕捉し、適切な処理を行うための関数です。
- **`error`** (): エラー処理を行う汎用的な関数です。通常、エラーメッセージの表示やログ記録に使用されます。
- **`on`** (): イベントリスナーやコールバックとして使用される汎用的な関数です。
- **`escapeHtml`** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティを確保したり、HTMLコンテンツとして正しく表示されるようにするためのユーティリティ関数です。
- **`getLayoutConfig`** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトに関する設定を取得する関数です。
- **`placeCentralNode`** (generated-docs/callgraph.js): 呼び出しグラフの中央ノードの配置を処理する関数です。
- **`showNodeInfo`** (generated-docs/callgraph.js): 呼び出しグラフの特定のノード（関数）に関する情報を表示する関数です。
- **`showEdgeInfo`** (generated-docs/callgraph.js): 呼び出しグラフのエッジ（呼び出し関係）に関する情報を表示する関数です。
- **`hideInfoPanel`** (generated-docs/callgraph.js): 情報パネルを非表示にする関数です。
- **`showInfoPanel`** (generated-docs/callgraph.js): 情報パネルを表示する関数です。
- **`toggleInfoPanel`** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数です。
- **`generateGitHubURL`** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する関数です。
- **`resetLayout`** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- **`watchNodeMovementAndFixOverlapsWrap`** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正する処理のラッパー関数です。
- **`watchNodeMovementAndFixOverlaps`** (generated-docs/callgraph.js): 呼び出しグラフのノードが動いた際に、他のノードとの重なりを検出し、自動的に修正する関数です。
- **`resolveNodeOverlaps`** (generated-docs/callgraph.js): 呼び出しグラフ内でノードが重なっている部分を解決する関数です。
- **`switchLayout`** (generated-docs/callgraph.js): 呼び出しグラフのレイアウト表示を切り替える関数です。
- **`resetNodeStates`** (generated-docs/callgraph.js): 呼び出しグラフのノードの状態（選択状態など）をリセットする関数です。
- **`fitToContent`** (generated-docs/callgraph.js): 呼び出しグラフが画面全体にフィットするように調整する関数です。
- **`toggleNodeLabels`** (generated-docs/callgraph.js): 呼び出しグラフのノードラベルの表示/非表示を切り替える関数です。
- **`toggleCalleeLocationFilter`** (generated-docs/callgraph.js): 呼び出される側の関数の場所に基づいてフィルタリングを切り替える関数です。
- **`replace`** (generated-docs/callgraph.js): 文字列置換などの一般的な置き換え処理を行う関数です。
- **`function`** (generated-docs/callgraph.js): 汎用的な関数定義の一部、またはコールバックとして利用される関数です。
- **`max`** (generated-docs/callgraph.js): 複数の値の中から最大値を計算する関数です。
- **`ready`** (generated-docs/callgraph.js): ドキュメントの読み込み完了時など、準備が整った際に実行される関数です。
- **`addListener`** (generated-docs/callgraph.js): イベントリスナーを追加する関数です。
- **`mml2json`** (src/mml2json.js): MML形式の音楽データをTone.jsが利用できるJSONシーケンサー形式に変換するメイン関数です。
- **`compileMmlToCommands`** (src/mml2json.js): MMLの抽象構文木をTone.jsコマンドのリストにコンパイルする関数です。
- **`getMmlCommands`** (src/mml2json.js): MML文字列からコマンドのリストを抽出する関数です。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): アタックからリリースまでのティック数を計算する関数です。
- **`repeat`** (src/mml2json.js): 指定された回数だけ処理を繰り返すためのヘルパー関数です。
- **`toInt`** (src/mml2json.js): 値を整数に変換する関数です。
- **`calcDuration`** (src/mml2json.js): ノートの持続時間（デュレーション）を計算する関数です。
- **`calcStartTick`** (src/mml2json.js): ノートが開始されるティック位置を計算する関数です。
- **`increaseStartTick`** (src/mml2json.js): 開始ティック値を増加させる関数です。
- **`calcLtick`** (src/mml2json.js): 特定のティック値を計算する関数です。
- **`getNodeId`** (src/mml2json.js): ノードの一意のIDを取得する関数です。
- **`sort`** (src/mml2json.js): 配列やリストをソートするためのヘルパー関数です。
- **`play`** (src/play.js): 変換されたJSONデータを使用して音楽再生を開始する関数です。Tone.jsのAPIを内部的に利用します。
- **`sub`** (src/play.js): `play`関数から呼び出される補助的な処理関数です。
- **`switch`** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js, src/play.js): 条件分岐を行うロジックブロックを指します。
- **`if`** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js, src/play.js): 条件に応じた処理の実行を行うロジックブロックを指します。
- **`for`** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js): 繰り返し処理を行うロジックブロックを指します。
- **`hex`** (src/grammar.js): 16進数表現の解析に関連するパーサー内部関数です。
- **`unicodeEscape`** (src/grammar.js): Unicodeエスケープシーケンスの解析に関連するパーサー内部関数です。
- **`literalEscape`** (src/grammar.js): リテラルエスケープシーケンスの解析に関連するパーサー内部関数です。
- **`classEscape`** (src/grammar.js): 文字クラスエスケープシーケンスの解析に関連するパーサー内部関数です。
- **`describeExpectation`** (src/grammar.js): パーサーが期待するパターンを説明するための内部ヘルパー関数です。
- **`describeExpected`** (src/grammar.js): パーサーが期待する要素を説明するための内部ヘルパー関数です。
- **`describeFound`** (src/grammar.js): パーサーが検出した要素を説明するための内部ヘルパー関数です。
- **`peg$parse`** (src/grammar.js): Peggyによって生成されたMMLパーサーのメインエントリポイント関数です。MML文字列を解析し、結果を返します。
- **`peg$f0`** (src/grammar.js): Peggyパーサーによって生成される内部ヘルパー関数で、特定の文法ルールに関連するアクションを実行します。
- **`text`** (src/grammar.js): 解析中の現在のテキストセグメントを取得するパーサー内部関数です。
- **`offset`** (src/grammar.js): 現在の解析位置のオフセットを取得するパーサー内部関数です。
- **`range`** (src/grammar.js): 解析されたトークンの範囲を取得するパーサー内部関数です。
- **`location`** (src/grammar.js): 現在の解析位置のロケーション情報（行、列など）を取得するパーサー内部関数です。
- **`expected`** (src/grammar.js): パーサーが次に期待する入力パターンを追跡する内部関数です。
- **`peg$getUnicode`** (src/grammar.js): Unicode文字の取得に関連するパーサー内部関数です。
- **`peg$literalExpectation`** (src/grammar.js): リテラル文字列の期待値を作成するパーサー内部関数です。
- **`peg$classExpectation`** (src/grammar.js): 文字クラスの期待値を作成するパーサー内部関数です。
- **`peg$anyExpectation`** (src/grammar.js): 任意の文字の期待値を作成するパーサー内部関数です。
- **`peg$endExpectation`** (src/grammar.js): 入力終端の期待値を作成するパーサー内部関数です。
- **`peg$otherExpectation`** (src/grammar.js): その他の期待値を作成するパーサー内部関数です。
- **`peg$computePosDetails`** (src/grammar.js): 位置詳細情報を計算するパーサー内部関数です。
- **`peg$computeLocation`** (src/grammar.js): ロケーション情報を計算するパーサー内部関数です。
- **`peg$fail`** (src/grammar.js): パーサーが解析に失敗した際に呼び出される内部関数です。
- **`peg$buildSimpleError`** (src/grammar.js): シンプルな解析エラーオブジェクトを構築するパーサー内部関数です。
- **`peg$buildStructuredError`** (src/grammar.js): 構造化された解析エラーオブジェクトを構築するパーサー内部関数です。
- **`peg$parsestart`** (src/grammar.js): `start`ルールに関連するパーサー内部関数です。
- **`peg$parsenote`** (src/grammar.js): `note`ルールに関連するパーサー内部関数です。
- **`peg$throw`** (src/grammar.js): エラーをスローするパーサー内部関数です。
- **`constructor`** (src/grammar.js): オブジェクトの初期化を行うコンストラクタ関数です。
- **`format`** (src/grammar.js): データやメッセージのフォーマット処理を行う関数です。
- **`buildMessage`** (src/grammar.js): エラーメッセージなどのメッセージを構築する関数です。
- **`literal`** (src/grammar.js): リテラル値の処理に関連する関数です。
- **`class`** (src/grammar.js): クラス定義または文字クラスに関連する関数です。
- **`any`** (src/grammar.js): 任意の要素を処理する関数です。
- **`end`** (src/grammar.js): 処理の終了に関連する関数です。
- **`other`** (src/grammar.js): その他の処理を行う関数です。
- **`while`** (src/grammar.js): ループ処理を行うロジックブロックを指します。
- **`start`** (src/grammar.pegjs): PEG文法で定義されたMML解析の開始ルールです。
- **`note`** (src/grammar.pegjs): PEG文法で定義されたMMLの音符（ノート）に関するルールです。

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
```

---
Generated at: 2025-08-24 07:03:35 JST
