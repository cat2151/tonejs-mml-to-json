Last updated: 2025-07-22

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサーフォーマットに変換するツールです。
- Web Audio APIとTone.jsを活用し、ブラウザ上でMMLベースの音楽を再生可能にします。
- Peggyパーサージェネレーターを用いたMMLパーサーをコアに持ち、自動化されたドキュメント生成や国際化ワークフローをサポートします。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤー)
- 音楽・オーディオ: Tone.js (Web Audio API音声ライブラリ), Tone.js CDN (unpkg経由でのライブラリ配信), MML (Music Macro Language - 音楽記法パーサー), Web Audio API (ブラウザ音声技術、Tone.js経由)
- 開発ツール: Node.js runtime (JavaScript実行環境), npm scripts (タスクランナー - 5個のスクリプト), pnpm (高速で効率的なパッケージマネージャー), Google Generative AI (AI文書生成サポート), @octokit/rest (GitHub API連携)
- テスト: Vitest (高速なViteベースのテストフレームワーク), TDD (Test-Driven Development - テスト駆動開発手法)
- ビルドツール: Peggy (PEG (Parsing Expression Grammar) パーサージェネレーター), PEG文法定義 (MML音楽記法のパーサー生成)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステム)
- 自動化・CI/CD: GitHub Actions (CI/CD自動化 - 4個のワークフロー: プロジェクト要約自動生成, Issue自動管理, README多言語翻訳, i18n automation - 自動翻訳ワークフロー)
- 開発標準: EditorConfig (コード統一ルール)

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
- **.editorconfig**: 異なるエディタやIDE間でコードスタイルを統一するための設定ファイル。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイル。
- **README.ja.md**: プロジェクトの日本語版説明ドキュメント。
- **README.md**: プロジェクトの英語版説明ドキュメント（メインの概要）。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明ドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプト。
- **generated-docs/callgraph-enhanced.html**: 生成された関数呼び出しグラフをインタラクティブに表示するためのHTMLファイル。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用される、関数呼び出しグラフの描画や操作ロジックを含むJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況を記した生成済みドキュメント。
- **generated-docs/project-overview.md**: プロジェクトの概要を記した生成済みドキュメント。
- **generated-docs/style.css**: 生成されたドキュメントやグラフのスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのデモやメインアプリケーションの入り口となるHTMLファイル。
- **issue-notes/** (ディレクトリ): GitHub Issuesに関連する個別のメモや詳細情報が格納されているディレクトリ。
- **package.json**: Node.jsプロジェクトの設定ファイル。依存関係、スクリプト、メタデータなどが定義されています。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する、依存関係の正確なツリー構造とバージョンをロックするファイル。
- **src/grammar.js**: `grammar.pegjs`で定義されたPEG文法に基づいてPeggyによって生成された、MMLパーサーのJavaScriptコード。
- **src/grammar.pegjs**: MML (Music Macro Language) の解析ルールを定義するPEG (Parsing Expression Grammar) 文法ファイル。
- **src/index.html**: (`index.html`と同じ名前だが、`src`ディレクトリ内にあるデモ関連のHTMLファイル)。
- **src/main.js**: アプリケーションの主要なロジックやエントリーポイントとなるJavaScriptファイル。
- **src/mml2json.js**: MML文字列をTone.jsが解釈できるJSONシーケンサーフォーマットに変換する中心的なロジックを実装したJavaScriptファイル。
- **src/play.js**: 変換された音楽データをTone.jsライブラリを使用して再生するためのロジックを含むJavaScriptファイル。
- **test/parser.test.js**: MMLパーサーの正確性を検証するためのテストコード。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイル。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための関数。通常、非同期処理の例外を捕捉するために使用されます。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、安全に表示するための関数。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウト設定を取得する関数。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中央ノードを配置する関数。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフのノード（関数）に関する情報を表示する関数。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフのエッジ（呼び出し関係）に関する情報を表示する関数。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報パネルを非表示にする関数。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報パネルを表示する関数。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報パネルの表示・非表示を切り替える関数。
- **generateGitHubURL (generated-docs/callgraph.js)**: GitHubのURLを生成する関数。
- **resetLayout (generated-docs/callgraph.js)**: グラフのレイアウトをリセットする関数。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正するためのラッパー関数。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正する主要な関数。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: ノードの重なりを解消する関数。
- **switchLayout (generated-docs/callgraph.js)**: グラフのレイアウトを切り替える関数。
- **resetNodeStates (generated-docs/callgraph.js)**: ノードの状態をリセットする関数。
- **fitToContent (generated-docs/callgraph.js)**: グラフ表示をコンテンツにフィットさせる関数。
- **toggleNodeLabels (generated-docs/callgraph.js)**: ノードラベルの表示・非表示を切り替える関数。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出される側の位置フィルターを切り替える関数。
- **replace (generated-docs/callgraph.js)**: 文字列の置換などを行う汎用的な関数。
- **function (generated-docs/callgraph.js)**: 無名関数やコールバック関数として使用される可能性のある一般的なキーワード。
- **max (generated-docs/callgraph.js)**: 最大値を計算する関数。
- **on (generated-docs/callgraph.js)**: イベントリスナーを設定する関数。
- **ready (generated-docs/callgraph.js)**: ドキュメントの準備が完了した際に実行される処理。
- **addListener (generated-docs/callgraph.js)**: イベントリスナーを追加する関数。
- **mml2json (src/mml2json.js)**: MML文字列をTone.jsのJSONフォーマットに変換するメイン関数。
- **compileMmlToCommands (src/mml2json.js)**: MMLを内部コマンド形式にコンパイルする関数。
- **getMmlCommands (src/mml2json.js)**: MMLコマンドを取得する関数。
- **calcAttackToReleaseTicks (src/mml2json.js)**: アタックからリリースまでのティック数を計算する関数。
- **repeat (src/mml2json.js)**: MMLにおける繰り返し処理を制御する関数。
- **toInt (src/mml2json.js)**: 値を整数に変換する関数。
- **calcDuration (src/mml2json.js)**: 音符のデュレーション（長さ）を計算する関数。
- **calcStartTick (src/mml2json.js)**: 音符の開始ティックを計算する関数。
- **increaseStartTick (src/mml2json.js)**: 開始ティックを増加させる関数。
- **calcLtick (src/mml2json.js)**: Lティック（音符の基本長）を計算する関数。
- **getNodeId (src/mml2json.js)**: ノードのユニークなIDを取得する関数。
- **sort (src/mml2json.js)**: データなどをソートする汎用的な関数。
- **play (src/play.js)**: 変換されたTone.js JSONデータを使って音楽を再生する関数。
- **sub (src/play.js)**: 補助的な計算や処理を行う関数。
- **hex (src/grammar.js)**: 16進数を処理するための内部関数（Peggy生成パーサーの一部）。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する内部関数（Peggy生成パーサーの一部）。
- **literalEscape (src/grammar.js)**: リテラルエスケープシーケンスを処理する内部関数（Peggy生成パーサーの一部）。
- **classEscape (src/grammar.js)**: 文字クラスエスケープシーケンスを処理する内部関数（Peggy生成パーサーの一部）。
- **describeExpectation (src/grammar.js)**: パーサーが期待するパターンを記述するための内部関数。
- **describeExpected (src/grammar.js)**: 期待された入力に関する記述を生成する内部関数。
- **describeFound (src/grammar.js)**: 見つかった入力に関する記述を生成する内部関数。
- **peg$parse (src/grammar.js)**: Peggyパーサーのメイン解析関数。
- **peg$f0 (src/grammar.js)**: Peggyパーサー内部で定義される匿名関数またはヘルパー関数。
- **text (src/grammar.js)**: 解析中の入力テキストを取得するパーサー内部関数。
- **offset (src/grammar.js)**: 現在の解析オフセット（位置）を取得するパーサー内部関数。
- **range (src/grammar.js)**: 解析中の現在の範囲を取得するパーサー内部関数。
- **location (src/grammar.js)**: 現在の解析位置情報（行、列など）を取得するパーサー内部関数。
- **expected (src/grammar.js)**: パーサーが期待する次の入力を示すパーサー内部関数。
- **error (src/grammar.js)**: エラーオブジェクトを生成または処理する関数。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するための内部関数。
- **peg$literalExpectation (src/grammar.js)**: リテラルパターンに関する期待値を生成する内部関数。
- **peg$classExpectation (src/grammar.js)**: 文字クラスパターンに関する期待値を生成する内部関数。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字に関する期待値を生成する内部関数。
- **peg$endExpectation (src/grammar.js)**: 入力の終端に関する期待値を生成する内部関数。
- **peg$otherExpectation (src/grammar.js)**: その他の期待値を生成する内部関数。
- **peg$computePosDetails (src/grammar.js)**: 位置詳細を計算する内部関数。
- **peg$computeLocation (src/grammar.js)**: 解析位置を計算する内部関数。
- **peg$fail (src/grammar.js)**: 解析失敗時に使用される内部関数。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなエラーオブジェクトを構築する内部関数。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたエラーオブジェクトを構築する内部関数。
- **peg$parsestart (src/grammar.js)**: `grammar.pegjs`で定義された`start`ルールを解析する関数。
- **peg$parsenote (src/grammar.js)**: `grammar.pegjs`で定義された`note`ルールを解析する関数。
- **peg$throw (src/grammar.js)**: 解析エラーをスローする内部関数。
- **constructor (src/grammar.js)**: オブジェクトの初期化を行うためのコンストラクタ関数。
- **format (src/grammar.js)**: フォーマット処理を行う関数。
- **buildMessage (src/grammar.js)**: メッセージを構築する関数。
- **literal (src/grammar.js)**: リテラル値を処理する内部関数。
- **class (src/grammar.js)**: クラス関連の処理を行う内部関数。
- **any (src/grammar.js)**: 任意の要素を処理する内部関数。
- **end (src/grammar.js)**: 終了処理を行う内部関数。
- **other (src/grammar.js)**: その他の処理を行う内部関数。
- **if (src/mml2json.js, generated-docs/callgraph.js, src/play.js, src/grammar.js)**: 条件分岐の制御構造。
- **switch (src/mml2json.js, generated-docs/callgraph.js, src/play.js, src/grammar.js)**: 複数条件の分岐の制御構造。
- **for (src/mml2json.js, generated-docs/callgraph.js, src/grammar.js)**: ループ処理の制御構造。
- **while (src/grammar.js)**: 条件が真である間繰り返すループ処理の制御構造。
- **start (src/grammar.pegjs)**: MMLパーサーの開始ルールを定義。
- **note (src/grammar.pegjs)**: MMLパーサーにおける音符の解析ルールを定義。

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
Generated at: 2025-07-22 07:03:47 JST
