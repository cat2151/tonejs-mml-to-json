Last updated: 2025-10-07

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された楽譜データを解析します。
- 解析されたMMLデータをWeb Audio APIライブラリTone.jsが解釈可能なJSON形式に変換します。
- これにより、ブラウザ上でMMLベースの音楽を再生・シーケンスすることを可能にするコンバータープロジェクトです。

## 技術スタック
- フロントエンド: **HTML5** (ブラウザベースのMMLプレイヤーの基盤)
- 音楽・オーディオ: **Tone.js** (Web Audio APIを抽象化し、音楽制作を容易にするライブラリ)、**Web Audio API** (ブラウザに組み込まれた音声処理技術、Tone.js経由で使用)、**Tone.js CDN** (unpkg経由でのTone.jsライブラリ配信)、**MML (Music Macro Language)** (音楽記法パーサーの対象となる言語)
- 開発ツール: **Node.js runtime** (JavaScript実行環境)、**npm scripts** (タスクランナー、開発プロセス自動化)、**pnpm** (高速で効率的なパッケージマネージャー)、**Google Generative AI** (AIを活用した文書生成サポート)、**@octokit/rest** (GitHub APIとの連携ツール)
- テスト: **Vitest** (高速なViteベースのテストフレームワーク)、**TDD (Test-Driven Development)** (テスト駆動開発手法)
- ビルドツール: **Peggy** (PEG (Parsing Expression Grammar) パーサージェネレーター)、**PEG文法定義** (MML音楽記法のパーサー生成に用いられる文法定義)
- 言語機能: **ES Modules** (モダンなJavaScriptモジュールシステム)
- 自動化・CI/CD: **GitHub Actions** (CI/CD自動化ツール、プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationなど4つのワークフローで使用)
- 開発標準: **EditorConfig** (異なる開発環境間でのコードスタイルの一貫性を保証するための設定ファイル)

## ファイル階層ツリー
```
📄 .editorconfig
📁 .github_automation/
  📁 callgraph/
    📁 config/
      📊 my.json
📄 .gitignore
📄 LICENSE
📖 README.ja.md
📖 README.md
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
  📜 callgraph.js
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
- **.editorconfig**: エディタ設定を定義し、異なる開発環境間でのコードスタイルの一貫性を保証します。
- **.github_automation/callgraph/config/my.json**: GitHub Actionsのワークフローで使用される設定ファイルで、特にコールグラフ生成に関連する設定を格納します。
- **.gitignore**: Gitがバージョン管理の対象から外すファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの日本語版説明書です。
- **README.md**: プロジェクトの英語版説明書です。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明書です。
- **dev-setup/setup.js**: 開発環境の初期設定や準備を行うためのスクリプトです。
- **generated-docs/callgraph-enhanced.html / generated-docs/callgraph.html**: プロジェクトの関数呼び出し関係を視覚化したHTMLドキュメントです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフをインタラクティブに表示・操作するためのJavaScriptコードです。ノード情報の表示、レイアウトのリセット、ズームなどの機能を提供します。
- **generated-docs/style.css**: generated-docsディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。
- **index.html**: プロジェクトのメインのエントリポイントとなるHTMLファイルで、デモやアプリケーションのルートページとして機能します。
- **issue-notes/**: プロジェクトのIssueに関するメモや詳細情報が格納されているディレクトリです。
- **package.json**: Node.jsプロジェクトのメタデータ、依存関係、スクリプトなどが定義されているファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、プロジェクトの依存関係のロックファイルです。
- **src/grammar.js**: Peggyによって生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）に変換します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文を定義するPEG (Parsing Expression Grammar) ファイルです。`src/grammar.js`の生成元となります。
- **src/index.html**: MMLの入力とTone.jsによる再生のデモンストレーションを行うためのHTMLファイルです。
- **src/main.js**: アプリケーションの主要なロジックや初期化処理を含むJavaScriptファイルです。
- **src/mml2json.js**: MMLパーサーによって生成されたASTをTone.jsのJSONシーケンサーフォーマットに変換するロジックが含まれています。
- **src/play.js**: Tone.jsを使用してMMLから変換されたJSONデータを再生する機能を担当するJavaScriptファイルです。
- **test/parser.test.js**: MMLパーサー（src/grammar.js）のテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的な関数です。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープして、HTMLコンテンツとして安全に表示できるようにします。
- **getLayoutConfig (generated-docs/callgraph.js)**: コールグラフのレイアウトに関する設定を取得します。
- **placeCentralNode (generated-docs/callgraph.js)**: コールグラフの中心となるノードを配置します。
- **showNodeInfo (generated-docs/callgraph.js)**: 特定のノード（関数）に関する詳細情報を表示します。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフのエッジ（呼び出し関係）に関する詳細情報を表示します。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にします。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示します。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替えます。
- **generateGitHubURL (generated-docs/callgraph.js)**: 関連するGitHubのURLを生成します。
- **resetLayout (generated-docs/callgraph.js)**: コールグラフのレイアウトを初期状態にリセットします。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの移動を監視し、重なりを修正する処理をラップします。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: コールグラフのノードが移動した際に、他のノードとの重なりを自動的に調整します。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: ノード間の重なりを解消するためのロジックを実行します。
- **switchLayout (generated-docs/callgraph.js)**: コールグラフの表示レイアウトを切り替えます。
- **resetNodeStates (generated-docs/callgraph.js)**: コールグラフ内のノードの状態をリセットします。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体が画面に収まるようにズームレベルを調整します。
- **toggleNodeLabels (generated-docs/callgraph.js)**: ノードのラベル表示を切り替えます。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先の場所によるフィルタリングを切り替えます。
- **replace (generated-docs/callgraph.js)**: 文字列置換などの処理を行います。
- **mml2json (src/mml2json.js)**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換するメイン関数です。
    - 引数: `mml` (string) - MML形式の文字列
    - 戻り値: Tone.jsのJSONシーケンサーフォーマットに準拠したオブジェクト
- **compileMmlToCommands (src/mml2json.js)**: MMLパーサーの結果（AST）を基に、より詳細な音楽コマンドリストをコンパイルします。
- **getMmlCommands (src/mml2json.js)**: MMLから解析されたコマンドを取得します。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算します。
- **repeat (src/mml2json.js)**: 繰り返し処理を行います。
- **toInt (src/mml2json.js)**: 値を整数に変換します。
- **calcDuration (src/mml2json.js)**: 音符のデュレーション（持続時間）を計算します。
- **calcStartTick (src/mml2json.js)**: 音符の開始ティックを計算します。
- **increaseStartTick (src/mml2json.js)**: 開始ティックを増加させます。
- **calcLtick (src/mml2json.js)**: Lコマンド（音長）に関連するティックを計算します。
- **getNodeId (src/mml2json.js)**: ノードのIDを取得します。
- **sort (src/mml2json.js)**: 配列などの要素をソートします。
- **play (src/play.js)**: Tone.jsを使用して、変換されたJSON形式の音楽データを再生します。
- **sub (src/play.js)**: 減算などの補助的な処理を行う関数です。
- **hex (src/grammar.js)**: 16進数に関連する処理を行います。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理します。
- **literalEscape (src/grammar.js)**: リテラルエスケープシーケンスを処理します。
- **classEscape (src/grammar.js)**: 文字クラスエスケープシーケンスを処理します。
- **describeExpectation (src/grammar.js)**: 期待される構文要素を記述します。
- **describeExpected (src/grammar.js)**: 期待される構文要素を説明します。
- **describeFound (src/grammar.js)**: 見つかった構文要素を説明します。
- **peg$parse (src/grammar.js)**: MMLパーサーのメインエントリポイントで、MML文字列を解析します。
    - 引数: `input` (string) - MML形式の文字列
    - 戻り値: 解析結果の抽象構文木（AST）
- **peg$f0 (src/grammar.js)**: Peggyによって生成される内部関数。特定の構文ルールに関連する処理を行います。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得します。
- **peg$literalExpectation (src/grammar.js)**: リテラルマッチングの期待値を生成します。
- **peg$classExpectation (src/grammar.js)**: 文字クラスマッチングの期待値を生成します。
- **peg$anyExpectation (src/grammar.js)**: 任意の一文字マッチングの期待値を生成します。
- **peg$endExpectation (src/grammar.js)**: 入力終端の期待値を生成します。
- **peg$otherExpectation (src/grammar.js)**: その他の期待値を生成します。
- **peg$computePosDetails (src/grammar.js)**: 入力文字列中の位置詳細を計算します。
- **peg$computeLocation (src/grammar.js)**: エラー発生時のロケーション情報を計算します。
- **peg$fail (src/grammar.js)**: パーサーの失敗を処理します。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなパーサーエラーオブジェクトを構築します。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたパーサーエラーオブジェクトを構築します。
- **peg$parsestart (src/grammar.js)**: PEG文法の`start`ルールに対応するパーサー関数です。
- **peg$parsenote (src/grammar.js)**: PEG文法の`note`ルールに対応するパーサー関数です。
- **peg$throw (src/grammar.js)**: エラーをスローします。
- **start (src/grammar.pegjs)**: MMLパーサーの開始ルールを定義します。
- **note (src/grammar.pegjs)**: MMLパーサーにおける音符の構文ルールを定義します。

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
Generated at: 2025-10-07 07:05:43 JST
