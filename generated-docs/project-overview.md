Last updated: 2025-07-31

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式で記述された音楽データを、Web Audio APIライブラリであるTone.jsが利用可能なJSONシーケンサー形式に変換するツールです。
- 変換されたJSONデータを用いることで、ウェブブラウザ上でMMLによる音楽をリアルタイムに再生・制御することが可能になります。
- パーサーの自動生成、開発ワークフローの自動化、多言語対応などを備え、効率的な開発と利用を支援します。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの基盤)
- 音楽・オーディオ: Tone.js (Web Audio API音声ライブラリ), Tone.js CDN (unpkg経由でのライブラリ配信), MML (Music Macro Language - 音楽記法パーサー), Web Audio API (ブラウザ音声技術、Tone.js経由で利用)
- 開発ツール: Node.js runtime (JavaScript実行環境), npm scripts (5個のタスクランナー), pnpm (高速で効率的なパッケージマネージャー), Google Generative AI (AI文書生成サポート), @octokit/rest (GitHub API連携)
- テスト: Vitest (高速なViteベースのテストフレームワーク), TDD (Test-Driven Development - テスト駆動開発手法)
- ビルドツール: Peggy (PEG - Parsing Expression Grammar パーサージェネレーター), PEG文法定義 (MML音楽記法のパーサー生成に使用)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステム)
- 自動化・CI/CD: GitHub Actions (4個のCI/CD自動化ワークフロー - プロジェクト要約自動生成, Issue自動管理, README多言語翻訳, i18n automation)
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
- **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイル。
- **README.ja.md / README.md**: プロジェクトの概要、使い方、開発情報などを記述したドキュメント（日本語版と英語版）。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明ドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップや初期設定を行うためのスクリプト。
- **generated-docs/callgraph-enhanced.html**: 自動生成された関数呼び出し階層グラフをインタラクティブに表示するHTMLファイル。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用される、関数呼び出しグラフのレンダリングや操作ロジックを提供するJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメント。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメント。
- **generated-docs/style.css**: `generated-docs`内のHTMLページのスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのデモや主要機能にアクセスするためのルートHTMLファイル。
- **issue-notes/**: GitHub Issuesから自動生成された開発メモや議論の記録を格納するディレクトリ。
- **package.json**: プロジェクトのメタデータ（名前、バージョンなど）や依存関係（ライブラリ）を定義するファイル。npmやpnpmなどのパッケージマネージャーが利用します。
- **pnpm-lock.yaml**: pnpmによって生成された、依存関係の正確なバージョンとツリー構造を記録するロックファイル。
- **src/grammar.js**: `grammar.pegjs`から自動生成されたMMLパーサーの本体。MML文字列を解析し、抽象構文ツリーを構築します。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を定義するPEG (Parsing Expression Grammar) ファイル。このファイルに基づいてパーサーが生成されます。
- **src/index.html**: `src`ディレクトリ内のデモ用HTMLファイル。
- **src/main.js**: プロジェクトのメインロジックや初期化処理を含むJavaScriptファイル。
- **src/mml2json.js**: MMLの解析結果をTone.jsのJSONシーケンサー形式に変換する主要なロジックを実装したJavaScriptファイル。
- **src/play.js**: 生成されたTone.js JSONシーケンサーデータを用いて、実際に音楽を再生する機能を提供するJavaScriptファイル。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの機能をテストするためのファイル。
- **vitest.config.js**: テストフレームワークVitestの設定ファイル。

## 関数詳細説明
- **mml2json(mmlString)** (src/mml2json.js): MML文字列を受け取り、それをTone.jsのJSONシーケンサー形式に変換して返します。MMLの各コマンドを解析し、対応する音符データやシーケンスイベントに変換する中心的な役割を担います。
- **compileMmlToCommands()** (src/mml2json.js): MMLパーサーによって生成された構文木を、より処理しやすいMMLコマンドのリストに変換します。
- **getMmlCommands()** (src/mml2json.js): MMLコマンドのリストを取得するユーティリティ関数。
- **calcAttackToReleaseTicks()** (src/mml2json.js): MMLの音符の持続時間（アタックからリリースまで）を計算します。
- **repeat()** (src/mml2json.js): MMLの繰り返し記号に対応するロジックを処理します。
- **toInt()** (src/mml2json.js): 文字列を整数に変換するヘルパー関数。
- **calcDuration()** (src/mml2json.js): 音符の長さや休符の長さを計算します。
- **calcStartTick()** (src/mml2json.js): 各イベントの開始時刻（ティック単位）を計算します。
- **increaseStartTick()** (src/mml2json.js): 開始時刻を次のイベントのために増加させます。
- **calcLtick()** (src/mml2json.js): 音符のLコマンド（長さ）に基づいてティックを計算します。
- **getNodeId()** (src/mml2json.js): 内部的にノードのIDを取得する関数。
- **play(jsonSequencerData)** (src/play.js): Tone.jsのJSONシーケンサーデータを受け取り、Web Audio APIを通じて実際の音楽再生を開始・制御します。
- **sub()** (src/play.js): 再生機能内で利用されるサブ処理を行う関数。
- **escapeHtml()** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティを向上させる関数。
- **getLayoutConfig()** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトに関する設定を取得します。
- **placeCentralNode()** (generated-docs/callgraph.js): グラフの中心となるノードを配置します。
- **showNodeInfo()** (generated-docs/callgraph.js): 選択されたノード（関数）の詳細情報を表示します。
- **showEdgeInfo()** (generated-docs/callgraph.js): 選択されたエッジ（呼び出し関係）の詳細情報を表示します。
- **hideInfoPanel() / showInfoPanel() / toggleInfoPanel()** (generated-docs/callgraph.js): 情報表示パネルの表示・非表示を制御します。
- **generateGitHubURL()** (generated-docs/callgraph.js): GitHub上の関連ファイルのURLを生成します。
- **resetLayout()** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットします。
- **watchNodeMovementAndFixOverlapsWrap() / watchNodeMovementAndFixOverlaps() / resolveNodeOverlaps()** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを解決して視覚的な整理を保ちます。
- **switchLayout()** (generated-docs/callgraph.js): グラフのレイアウト方式を切り替えます。
- **resetNodeStates()** (generated-docs/callgraph.js): ノードの状態をリセットします。
- **fitToContent()** (generated-docs/callgraph.js): グラフ全体がビューポートに収まるようにズームレベルを調整します。
- **toggleNodeLabels()** (generated-docs/callgraph.js): ノードのラベルの表示・非表示を切り替えます。
- **toggleCalleeLocationFilter()** (generated-docs/callgraph.js): 呼び出し先の場所によるフィルタリングを切り替えます。
- **replace()** (generated-docs/callgraph.js): 文字列の置換を行います。
- **function()** (generated-docs/callgraph.js): 関数呼び出しグラフ内で利用される、特定の匿名関数またはコールバック関数。
- **max()** (generated-docs/callgraph.js): 数値の最大値を計算します。
- **on()** (generated-docs/callgraph.js): イベントリスナーを登録します。
- **ready()** (generated-docs/callgraph.js): ドキュメントの準備が完了した際に実行される処理を定義します。
- **addListener()** (generated-docs/callgraph.js): イベントリスナーを追加します。
- **hex()** (src/grammar.js): 16進数に関連する処理を行う関数。
- **unicodeEscape() / literalEscape() / classEscape()** (src/grammar.js): 文字列のエスケープ処理に関連するパーサー内部関数。
- **describeExpectation() / describeExpected() / describeFound()** (src/grammar.js): パーシング時の期待値や検出された内容を記述するエラー報告関連の関数。
- **peg$parse()** (src/grammar.js): MMLパーサーのエントリポイント。MML文字列を解析し、結果を返します。
- **peg$f0()** (src/grammar.js): パーサー内部で生成される、特定のルールに関連する関数。
- **text() / offset() / range() / location() / expected() / error()** (src/grammar.js): パーシング中のテキスト、オフセット、範囲、位置、期待値、エラーに関する情報を提供するパーサー内部関数。
- **peg$getUnicode()** (src/grammar.js): Unicode文字を取得するパーサー内部関数。
- **peg$literalExpectation() / peg$classExpectation() / peg$anyExpectation() / peg$endExpectation() / peg$otherExpectation()** (src/grammar.js): パーシング時の期待パターン（リテラル、クラス、任意、終了など）を定義する関数。
- **peg$computePosDetails() / peg$computeLocation()** (src/grammar.js): 位置情報の詳細やロケーションを計算するパーサー内部関数。
- **peg$fail()** (src/grammar.js): パーシングが失敗した際に呼び出される関数。
- **peg$buildSimpleError() / peg$buildStructuredError()** (src/grammar.js): 単純なエラーメッセージや構造化されたエラーメッセージを構築する関数。
- **peg$parsestart() / peg$parsenote()** (src/grammar.js): MMLの`start`ルールと`note`ルールに対応するパーサー内部関数。
- **peg$throw()** (src/grammar.js): パーシング中にエラーをスローする関数。
- **constructor()** (src/grammar.js): クラスのインスタンス化時に初期化を行うコンストラクタ。
- **format()** (src/grammar.js): データのフォーマットを行う関数。
- **buildMessage()** (src/grammar.js): メッセージを構築する関数。
- **literal() / class() / any() / end() / other()** (src/grammar.js): パーシング要素を表す関数。
- **start()** (src/grammar.pegjs): MML文法の解析開始点となるルール。
- **note()** (src/grammar.pegjs): MML文法における音符の解析ルール。
- **sort()** (src/mml2json.js): データのソートを行う関数。

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
Generated at: 2025-07-31 07:03:45 JST
