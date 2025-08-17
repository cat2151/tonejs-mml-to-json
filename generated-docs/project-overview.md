Last updated: 2025-08-18

# Project Overview

## プロジェクト概要
- このプロジェクトは、MML（Music Macro Language）で記述された音楽データを、Web Audio APIライブラリTone.jsが解釈できるJSONシーケンサーフォーマットに変換します。
- 変換された音楽データはブラウザ上で再生可能となり、MMLを用いた作曲やプログラミングをWebブラウザ上で実現します。
- 音楽記法のパーシングからJSON変換、そしてブラウザでの音声再生までを一貫して提供する、MMLプレイヤーの基盤ツールです。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成とシーケンス再生を可能にするJavaScriptライブラリです。Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、手軽に利用できます。MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトの入力形式です。Web Audio API - ブラウザに標準搭載されている音声処理の低レベルAPIで、Tone.jsがこれを活用しています。
- 開発ツール: Node.js runtime - JavaScriptコードの実行環境として使用されます。npm scripts - パッケージ管理とタスク実行のためのスクリプト群（5個）が定義されています。pnpm - 高速で効率的なJavaScriptパッケージマネージャーです。Google Generative AI - AIによる文書生成をサポートするために使用されています。@octokit/rest - GitHub APIとの連携に使用され、GitHub上の操作を自動化します。
- テスト: Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストを実行します。TDD (Test-Driven Development) - テスト駆動開発手法が採用されており、テストを先に書くことで品質と設計を向上させています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLの文法定義からパーサーコードを自動生成します。PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールが記述されています。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムが採用されており、依存関係の管理とコードの分割が効率的に行われています。
- 自動化・CI/CD: GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）の自動化プラットフォームとして使用され、4個のワークフローが定義されています（プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automation）。
- 開発標準: EditorConfig - 異なるエディタやIDE間でコードスタイルの一貫性を保つための設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でコードのスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの日本語での概要、使い方、デモリンクなどが記述されたドキュメントです。
- **README.md**: プロジェクトの英語での概要、使い方、デモリンクなどが記述されたドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明が記述されています。
- **dev-setup/setup.js**: 開発環境の初期設定や依存関係のインストールなどを行うためのJavaScriptスクリプトです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を視覚的に表示するための、拡張されたHTMLファイルです。自動生成されます。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で関数呼び出しグラフを生成し、操作するためのJavaScriptコードです。自動生成されます。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況に関する情報が記述された、自動生成されるドキュメントです。
- **generated-docs/project-overview.md**: プロジェクトの概要が記述された、自動生成されるドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシートです。
- **index.html**: プロジェクトのWebデモまたはメインアプリケーションのエントリポイントとなるHTMLファイルです。Tone.jsを利用したMMLプレイヤーのインターフェースを提供します。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報が自動生成されて格納されるディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョンなど）、依存関係、開発依存関係、実行スクリプトなどが定義されているファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが使用する、プロジェクトの正確な依存関係ツリーをロックするためのファイルです。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyパーサージェネレーターによって自動生成された、MML構文解析のためのJavaScriptコードです。
- **src/grammar.pegjs**: MML（Music Macro Language）の文法規則を定義するPEG (Parsing Expression Grammar) ファイルです。このファイルから`src/grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内のアプリケーションのフロントエンドのHTML構造を定義するファイルです。
- **src/main.js**: アプリケーションのメインのJavaScriptロジックや初期化処理を記述するファイルです。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する、このプロジェクトの中核となるロジックが含まれています。
- **src/play.js**: 変換されたJSONデータを使用して、Web Audio API (Tone.js経由) で音楽を実際に再生するロジックを実装しています。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの機能が正しく動作するかを検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的なJavaScriptの`catch`ブロックまたは関数です。ここでは、開発セットアップ中の例外を捕捉し処理します。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティを向上させるための関数です。自動生成されたドキュメント表示に使用されます。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウト設定を取得するための関数です。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中心ノードを配置するための関数です。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ内の特定のノード（関数）の詳細情報を表示するための関数です。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ内のエッジ（関数呼び出し関係）の詳細情報を表示するための関数です。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報パネルを非表示にするための関数です。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報パネルを表示するための関数です。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報パネルの表示/非表示を切り替える関数です。
- **generateGitHubURL (generated-docs/callgraph.js)**: GitHub上のソースコードへのURLを生成するための関数です。
- **resetLayout (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトを初期状態にリセットするための関数です。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正するラッパー関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの動きを監視し、他のノードとの重なりを自動的に解消する関数です。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: ノード間の重なりを解決し、視認性を高めるための関数です。
- **switchLayout (generated-docs/callgraph.js)**: 呼び出しグラフの表示レイアウトを切り替えるための関数です。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの状態（選択状態など）をリセットするための関数です。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体が画面に収まるようにズームレベルを調整する関数です。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出された関数のファイルパスによるフィルタリングを切り替える関数です。
- **replace (generated-docs/callgraph.js)**: 文字列置換を行うための関数です。
- **mml2json (src/mml2json.js)**: MML文字列を解析し、Tone.jsが利用可能なJSONシーケンサーフォーマットに変換する主要な関数です。
- **compileMmlToCommands (src/mml2json.js)**: MMLパーサーの出力から、より抽象的なコマンドリストを生成する関数です。
- **getMmlCommands (src/mml2json.js)**: MML文字列を構文解析し、一連のMMLコマンドとして抽出する関数です。
- **calcAttackToReleaseTicks (src/mml2json.js)**: MMLの音符の長さから、実際の再生時間（ティック単位）を計算する関数です。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号（例: `[CDEF]2`）を処理するための繰り返しロジックを提供するヘルパー関数です。
- **toInt (src/mml2json.js)**: 文字列を整数値に変換するヘルパー関数です。
- **calcDuration (src/mml2json.js)**: MMLの長さ記号（例: `L4`, `C8.`）に基づいて、音符の正確な持続時間を計算する関数です。
- **calcStartTick (src/mml2json.js)**: 音符の開始時刻（ティック単位）を計算する関数です。シーケンス内のタイミング調整に利用されます。
- **increaseStartTick (src/mml2json.js)**: 現在のティック位置を音符の長さ分だけ進める関数です。
- **calcLtick (src/mml2json.js)**: MMLのLコマンド（デフォルトの音符の長さ）に対応するティック値を計算する関数です。
- **getNodeId (src/mml2json.js)**: シーケンサー内の各ノード（音符など）に一意のIDを割り当てるための関数です。
- **play (src/play.js)**: 変換されたTone.jsのJSONデータを受け取り、Web Audio APIを介して実際に音を再生する関数です。
- **sub (src/play.js)**: 数値の減算を行うヘルパー関数です。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数です。Peggyによって生成されたパーサーの内部で使われます。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数です。パーサーの内部処理です。
- **literalEscape (src/grammar.js)**: 文字列リテラルのエスケープ処理を行う関数です。パーサーの内部処理です。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープ処理を行う関数です。パーサーの内部処理です。
- **describeExpectation (src/grammar.js)**: 期待される構文要素を説明する関数です。エラーメッセージ生成などに使われます。
- **describeExpected (src/grammar.js)**: 期待される構文のリストを説明する関数です。パーサーのエラー報告に使用されます。
- **describeFound (src/grammar.js)**: パース中に見つかった要素を説明する関数です。エラー報告に使用されます。
- **peg$parse (src/grammar.js)**: Peggyパーサーのメインエントリポイントとなる関数で、入力文字列を解析します。
- **peg$f0 (src/grammar.js)**: Peggyパーサーによって内部的に生成される関数（ファクトリ関数）です。
- **text (src/grammar.js)**: 解析されたテキストの一部を取得する関数です。パーサーの内部処理です。
- **offset (src/grammar.js)**: 現在のパース位置のオフセットを取得する関数です。パーサーの内部処理です。
- **range (src/grammar.js)**: 現在のパース範囲を取得する関数です。パーサーの内部処理です。
- **location (src/grammar.js)**: 現在のパース位置の行、列情報などを取得する関数です。パーサーの内部処理です。
- **expected (src/grammar.js)**: パーサーが次に期待するトークンに関する情報を取得する関数です。パーサーの内部処理です。
- **error (src/grammar.js)**: パーシングエラーを生成する関数です。パーサーの内部処理です。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するヘルパー関数です。パーサーの内部処理です。
- **peg$literalExpectation (src/grammar.js)**: リテラル（固定文字列）が期待されることを示すオブジェクトを生成する関数です。パーサーの内部処理です。
- **peg$classExpectation (src/grammar.js)**: 文字クラスが期待されることを示すオブジェクトを生成する関数です。パーサーの内部処理です。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字が期待されることを示すオブジェクトを生成する関数です。パーサーの内部処理です。
- **peg$endExpectation (src/grammar.js)**: 入力文字列の終端が期待されることを示すオブジェクトを生成する関数です。パーサーの内部処理です。
- **peg$otherExpectation (src/grammar.js)**: その他の期待される構文要素を示すオブジェクトを生成する関数です。パーサーの内部処理です。
- **peg$computePosDetails (src/grammar.js)**: 文字列内の位置の詳細（行、列など）を計算する関数です。パーサーの内部処理です。
- **peg$computeLocation (src/grammar.js)**: 構文解析中の位置情報を計算する関数です。パーサーの内部処理です。
- **peg$fail (src/grammar.js)**: パースの失敗を処理する関数です。パーサーの内部処理です。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなパースエラーオブジェクトを構築する関数です。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたパースエラーオブジェクトを構築する関数です。
- **peg$parsestart (src/grammar.js)**: MMLパーサーの開始ルールを処理する関数です。
- **peg$parsenote (src/grammar.js)**: MMLの音符ルールを処理する関数です。
- **peg$throw (src/grammar.js)**: エラーをスローするためのヘルパー関数です。パーサーの内部処理です。
- **constructor (undefined)**: JavaScriptオブジェクトのコンストラクタ関数です。
- **format (src/grammar.js)**: データのフォーマットを行う関数です。
- **buildMessage (src/grammar.js)**: エラーメッセージを構築する関数です。
- **literal (src/grammar.js)**: リテラル（固定文字列）の構文要素を処理する関数です。
- **class (src/grammar.js)**: 文字クラスの構文要素を処理する関数です。
- **any (src/grammar.js)**: 任意の文字の構文要素を処理する関数です。
- **end (src/grammar.js)**: 入力終端の構文要素を処理する関数です。
- **other (src/grammar.js)**: その他の構文要素を処理する関数です。
- **start (src/grammar.pegjs)**: `grammar.pegjs`内で定義された、MMLパーシングの開始ルールです。
- **note (src/grammar.pegjs)**: `grammar.pegjs`内で定義された、MMLの音符に関するパーシングルールです。

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
Generated at: 2025-08-18 07:03:36 JST
