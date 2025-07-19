Last updated: 2025-07-20

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) 形式の音楽データを、Web Audio APIライブラリTone.jsが利用可能なJSONシーケンサー形式に変換するツールです。
- ユーザーはブラウザ上でMMLを入力し、リアルタイムで音楽を再生・試聴することができます。
- 自動化されたテスト、ビルド、文書生成、国際化対応など、効率的な開発ワークフローが特徴です。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されています。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの音声合成やシーケンス再生を容易にするJavaScriptライブラリです。Tone.js CDN (unpkg経由) で配信され、MML (Music Macro Language) は音楽記法パーサーとして機能し、Web Audio APIはTone.js経由で利用されるブラウザ音声技術です。
- 開発ツール: Node.js runtime - JavaScript実行環境として利用され、npm scriptsは5個のタスクランナーとして機能します。pnpmは高速で効率的なパッケージマネージャーであり、Google Generative AIはAIによる文書生成サポート、@octokit/restはGitHub APIとの連携に使用されます。
- テスト: Vitest - 高速なViteベースのテストフレームワークであり、TDD (Test-Driven Development) の手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターとして使用され、MML音楽記法のパーサー生成のためのPEG文法定義が含まれています。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムが採用されています。
- 自動化・CI/CD: GitHub Actions - 4個のワークフローが設定されており、プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automation (自動翻訳ワークフロー) などのCI/CD自動化を実現しています。
- 開発標準: EditorConfig - コードの統一ルールを定義し、プロジェクト全体のコード品質を維持するために使用されています。

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
  📖 2.md
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
- **LICENSE**: プロジェクトのライセンス情報を含むファイル。
- **README.ja.md / README.md**: プロジェクトの概要、使い方、開発情報などを記述した多言語対応のドキュメントファイル。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関するドキュメント。
- **dev-setup/setup.js**: 開発環境の初期設定や準備を行うためのJavaScriptスクリプト。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出しグラフを可視化し、インタラクティブな機能を追加したHTMLファイル。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの描画ロジックやインタラクティブ機能を提供するJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメント。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメント。
- **generated-docs/style.css**: 生成されたドキュメントのスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのルートにあるデモまたはメインのHTMLファイル。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報が保存されているディレクトリ。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどを定義するファイル。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成された、プロジェクトの依存関係の正確なバージョンと構造を記録するファイル。
- **src/grammar.js**: `grammar.pegjs`からPEG.jsパーサージェネレーターによって生成されたMML構文解析のJavaScriptコード。
- **src/grammar.pegjs**: Music Macro Language (MML) の構文規則を定義するPEG (Parsing Expression Grammar) ファイル。
- **src/index.html**: プロジェクトのMML入力・再生インターフェースのHTMLファイル。
- **src/main.js**: メインアプリケーションのJavaScriptエントリポイント。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する主要なロジックを実装したJavaScriptファイル。
- **src/play.js**: 変換されたJSONデータを使用して、Tone.jsを通じてMML音楽を再生するロジックを実装したJavaScriptファイル。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの単体テストを記述したJavaScriptファイル。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイル。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的な`catch`ブロック。おそらく`try-catch`構文の一部としてエラーを捕捉し、処理するために使用されます。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティを確保するための関数。
- **getLayoutConfig (generated-docs/callgraph.js)**: グラフのレイアウトに関する設定を取得するための関数。
- **placeCentralNode (generated-docs/callgraph.js)**: グラフの中心ノードを配置するための関数。
- **showNodeInfo (generated-docs/callgraph.js)**: 特定のノード（関数など）の詳細情報を表示するための関数。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフのエッジ（呼び出し関係）の詳細情報を表示するための関数。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にするための関数。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示するための関数。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える関数。
- **generateGitHubURL (generated-docs/callgraph.js)**: GitHubリソースへのURLを生成するための関数。
- **resetLayout (generated-docs/callgraph.js)**: グラフのレイアウトを初期状態にリセットするための関数。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、オーバーラップを修正するラッパー関数。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの動きを監視し、グラフ上のノードが重なるのを防ぐための関数。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: ノードの重なりを解消するための関数。
- **switchLayout (generated-docs/callgraph.js)**: グラフのレイアウト方式を切り替えるための関数。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの状態（選択状態など）をリセットするための関数。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体がビューポートに収まるようにズームレベルを調整する関数。
- **toggleNodeLabels (generated-docs/callgraph.js)**: ノードのラベル（関数名など）の表示/非表示を切り替える関数。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出された関数の位置に基づくフィルターを切り替える関数。
- **replace (generated-docs/callgraph.js)**: 文字列置換を行うための関数。
- **switch (generated-docs/callgraph.js)**: JavaScriptの`switch`文。通常、複数の条件分岐を処理するために使用されます。
- **function (generated-docs/callgraph.js)**: JavaScriptの`function`キーワード。一般的に無名関数やコールバック関数として使用される可能性があります。
- **max (generated-docs/callgraph.js)**: 数値の最大値を計算するための関数。
- **on (generated-docs/callgraph.js)**: イベントリスナーを設定するための一般的な関数。
- **if (generated-docs/callgraph.js)**: JavaScriptの`if`文。条件分岐を処理するために使用されます。
- **for (generated-docs/callgraph.js)**: JavaScriptの`for`ループ。繰り返し処理のために使用されます。
- **ready (generated-docs/callgraph.js)**: ドキュメントがロードされ、準備ができたときに実行されるコールバックを設定する関数。
- **addListener (generated-docs/callgraph.js)**: イベントリスナーを追加するための関数。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数。PEG.jsで生成されたパーサーの内部ヘルパー関数の一部。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数。
- **literalEscape (src/grammar.js)**: リテラル文字のエスケープを処理する関数。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープを処理する関数。
- **describeExpectation (src/grammar.js)**: パーサーが期待する構文要素を記述するための関数。
- **describeExpected (src/grammar.js)**: 期待される構文要素を詳細に記述する関数。
- **describeFound (src/grammar.js)**: 実際に発見された構文要素を記述する関数。
- **peg$parse (src/grammar.js)**: PEG.jsパーサーのメインエントリポイント。入力文字列を解析し、抽象構文ツリー (AST) を構築します。
- **peg$f0 (src/grammar.js)**: パーサー内部で使用される匿名関数またはフラグメント関数。
- **text (src/grammar.js)**: 解析中の現在のテキスト位置を取得する関数。
- **offset (src/grammar.js)**: 解析中の現在のオフセット（文字位置）を取得する関数。
- **range (src/grammar.js)**: 解析中の現在の範囲を取得する関数。
- **location (src/grammar.js)**: 解析中の現在の位置情報（行、列など）を取得する関数。
- **expected (src/grammar.js)**: パーサーが現在期待している構文要素に関する情報を提供する関数。
- **error (src/grammar.js)**: 解析エラーを生成するための関数。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するヘルパー関数。
- **peg$literalExpectation (src/grammar.js)**: リテラルに対する期待値を定義する関数。
- **peg$classExpectation (src/grammar.js)**: 文字クラスに対する期待値を定義する関数。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字に対する期待値を定義する関数。
- **peg$endExpectation (src/grammar.js)**: 入力終了に対する期待値を定義する関数。
- **peg$otherExpectation (src/grammar.js)**: その他の期待値を定義する関数。
- **peg$computePosDetails (src/grammar.js)**: 位置の詳細情報を計算する関数。
- **peg$computeLocation (src/grammar.js)**: 位置情報を計算する関数。
- **peg$fail (src/grammar.js)**: 解析失敗を通知する関数。
- **peg$buildSimpleError (src/grammar.js)**: シンプルな解析エラーメッセージを構築する関数。
- **peg$buildStructuredError (src/grammar.js)**: 構造化された解析エラーメッセージを構築する関数。
- **peg$parsestart (src/grammar.js)**: PEG文法の`start`ルールに対応するパーサー関数。
- **peg$parsenote (src/grammar.js)**: PEG文法の`note`ルールに対応するパーサー関数。
- **peg$throw (src/grammar.js)**: 例外をスローするための関数。
- **constructor (src/grammar.js)**: JavaScriptクラスのコンストラクタ関数。
- **format (src/grammar.js)**: 文字列のフォーマットを行う関数。
- **if (src/grammar.js)**: JavaScriptの`if`文。
- **buildMessage (src/grammar.js)**: メッセージを構築するための関数。
- **literal (src/grammar.js)**: リテラル値を処理する関数。
- **class (src/grammar.js)**: クラスに関連する処理を行う関数。
- **any (src/grammar.js)**: 任意の値を処理する関数。
- **end (src/grammar.js)**: 終了条件を処理する関数。
- **other (src/grammar.js)**: その他の条件を処理する関数。
- **for (src/grammar.js)**: JavaScriptの`for`ループ。
- **switch (src/grammar.js)**: JavaScriptの`switch`文。
- **while (src/grammar.js)**: JavaScriptの`while`ループ。
- **start (src/grammar.pegjs)**: MMLパーシングのエントリーポイントとなるPEG文法のルール名。
- **note (src/grammar.pegjs)**: MMLの音符構文を定義するPEG文法のルール名。
- **mml2json (src/mml2json.js)**: Music Macro Language (MML) 文字列をTone.jsのJSONシーケンサー形式に変換するメイン関数。
- **compileMmlToCommands (src/mml2json.js)**: MML文字列を内部的なコマンドリストにコンパイルする関数。
- **getMmlCommands (src/mml2json.js)**: コンパイルされたMMLからコマンドを取得する関数。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のMMLのエンベロープ（アタックからリリースまで）に関連するティック（時間単位）を計算する関数。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号（例：`[MML]xN`）を処理する関数。
- **toInt (src/mml2json.js)**: 値を整数に変換するヘルパー関数。
- **calcDuration (src/mml2json.js)**: 音符の長さをMMLの記法に基づいて計算する関数。
- **calcStartTick (src/mml2json.js)**: 音符の開始ティックを計算する関数。
- **increaseStartTick (src/mml2json.js)**: 現在の開始ティックを更新（増加）させる関数。
- **calcLtick (src/mml2json.js)**: MMLの`L`コマンド（音長指定）に関連するティックを計算する関数。
- **getNodeId (src/mml2json.js)**: ノードの一意なIDを取得する関数。
- **sort (src/mml2json.js)**: 配列などのデータをソートするための関数。
- **function (src/mml2json.js)**: JavaScriptの`function`キーワード。
- **if (src/mml2json.js)**: JavaScriptの`if`文。
- **switch (src/mml2json.js)**: JavaScriptの`switch`文。
- **for (src/mml2json.js)**: JavaScriptの`for`ループ。
- **play (src/play.js)**: MMLをJSONに変換した後、そのJSONデータを使って実際にTone.jsで音楽を再生する関数。
- **sub (src/play.js)**: `play`関数から呼び出される補助的な関数。具体的な機能はコード依存。
- **catch (src/play.js)**: エラーハンドリングのための一般的な`catch`ブロック。

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
Generated at: 2025-07-20 07:03:20 JST
