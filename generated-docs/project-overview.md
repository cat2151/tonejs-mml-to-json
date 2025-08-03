Last updated: 2025-08-04

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsが解釈できるJSONシーケンサー形式に変換するツールです。
- Web Audio APIとTone.jsを活用し、ブラウザ上でMMLベースの音楽を再生可能にします。
- パーサー生成、テスト、CI/CD、多言語対応など、包括的な開発支援システムが構築されています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されています。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、音声合成やエフェクトを容易にするためのJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、手軽に利用できます。
    - MML (Music Macro Language) - 音楽を記述するためのテキストベースの記法であり、このプロジェクトの入力形式です。
    - Web Audio API - ブラウザ上で高度な音声処理を行うための標準APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境です。
    - npm scripts - package.jsonに定義されたタスクを自動化するための機能です（5個のスクリプトが存在）。
    - pnpm - 高速でディスク効率の良いパッケージマネージャーです。
    - Google Generative AI - プロジェクトのAI文書生成をサポートするために利用されます。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報を操作するために使用されます。
    - dotenv - 環境変数を管理し、安全に設定情報を使用するために利用されます。
- テスト:
    - Vitest - 高速でViteベースのテストフレームワークであり、ユニットテストや統合テストに使用されます。
    - TDD (Test-Driven Development) - テストを先に書き、それからコードを実装する開発手法が採用されています。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターです。
    - PEG文法定義 - MML音楽記法を解析するためのパーサーを生成するのに使用される文法定義ファイルです。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムであり、コードの分割と再利用を促進します。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化するためのワークフロープラットフォームです（4個のワークフローが存在）。
        - プロジェクト要約自動生成: プロジェクトの概要ドキュメントを自動生成します。
        - Issue自動管理: GitHub Issuesの管理を自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
        - i18n automation: 国際化（i18n）関連の自動翻訳ワークフローを指します。
- 開発標準:
    - EditorConfig - 異なるエディタやIDE間で一貫したコードスタイルを維持するための設定ファイルです。

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
- **.editorconfig**: 異なるエディタやIDEを使用する開発者間で、インデントスタイル、文字コード、行末文字などの基本的なコーディングスタイルを統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。本プロジェクトの配布・利用条件を定めます。
- **README.ja.md**: プロジェクトの日本語版説明書です。プロジェクトの概要、使い方、開発方法などが記載されています。
- **README.md**: プロジェクトの英語版説明書です。README.ja.mdと同様の内容が英語で提供されます。
- **dev-setup/README.md**: `dev-setup`ディレクトリ内のセットアップスクリプトに関する説明が記述されています。
- **dev-setup/setup.js**: 開発環境をセットアップするためのJavaScriptスクリプトです。特定の開発ツールや依存関係の初期設定を行う可能性があります。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を可視化するための拡張版HTMLファイルです。動的なグラフ表示機能を持つ可能性があります。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画やインタラクションを制御するJavaScriptロジックが含まれています。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況や進捗に関する情報が記述されているドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクト概要のMarkdownファイルです。本出力の元となる情報が含まれます。
- **generated-docs/style.css**: `generated-docs`内のHTMLドキュメント（例: callgraph-enhanced.html）のスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトの公開デモページやメインエントリーポイントとなるHTMLファイルです。Tone.jsを利用したMMLプレイヤーのUIを提供する可能性があります。
- **issue-notes/*.md**: GitHub Issuesに関する個別のメモや詳細が記述されたMarkdownファイル群です。開発者向けの追跡情報が含まれます。
- **package.json**: Node.jsプロジェクトの設定ファイルです。プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成されるロックファイルです。依存関係の正確なバージョンとツリー構造を記録し、ビルドの再現性を保証します。
- **src/grammar.js**: Peggyによって生成されたMML文法パーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）を構築します。
- **src/grammar.pegjs**: MMLの文法規則を定義するPEG.js形式のファイルです。このファイルから`src/grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内のメインHTMLファイルです。アプリケーション本体のUIを提供し、`main.js`や`mml2json.js`などのスクリプトを読み込みます。
- **src/main.js**: アプリケーションのメインロジックや初期化処理を含むJavaScriptファイルです。MMLの入力からJSON変換、再生までのフローを調整します。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する核心的なロジックが実装されたJavaScriptファイルです。
- **src/play.js**: 変換されたTone.js JSONデータをTone.jsライブラリを使用して実際に再生するロジックが実装されたJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの機能をテストするためのVitestテストファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テストの実行方法やカバレッジに関する設定が含まれます。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的なJavaScriptのtry-catch構文の一部として使用される関数です。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、安全に文字列をHTMLに挿入するためのユーティリティ関数です。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウト設定を取得または決定するための関数です。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中心ノードを配置するための関数です。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ内のノード（関数）に関する情報を表示するための関数です。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ内のエッジ（関数呼び出し）に関する情報を表示するための関数です。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にするための関数です。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示するための関数です。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替えるための関数です。
- **generateGitHubURL (generated-docs/callgraph.js)**: GitHubリポジトリへのURLを生成するための関数です。
- **resetLayout (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトを初期状態にリセットするための関数です。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正するためのラッパー関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの動きを監視し、他のノードとの重なりを解決するための関数です。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: グラフ内でノードが重なっている場合に、その重なりを解消するための関数です。
- **switchLayout (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトモードを切り替えるための関数です。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの状態（選択、ハイライトなど）をリセットするための関数です。
- **fitToContent (generated-docs/callgraph.js)**: グラフの表示範囲をコンテンツ全体に合わせて調整するための関数です。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフノードのラベル（関数名など）の表示/非表示を切り替えるための関数です。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先の場所に基づいてフィルタリングを切り替えるための関数です。
- **replace (generated-docs/callgraph.js)**: 文字列の置換を行う汎用的な関数です。
- **function (generated-docs/callgraph.js)**: 匿名関数または関数定義を示す一般的なキーワードです。特定の機能名ではありません。
- **max (generated-docs/callgraph.js)**: 数値の最大値を計算する汎用的な関数です。
- **on (generated-docs/callgraph.js)**: イベントリスナーを設定するための一般的な関数名です。
- **ready (generated-docs/callgraph.js)**: ドキュメントがロードされた準備完了状態を検出するための関数です。
- **addListener (generated-docs/callgraph.js)**: イベントリスナーを追加するための関数です。
- **mml2json (src/mml2json.js)**: MML文字列全体を解析し、Tone.jsのJSONシーケンサーフォーマットに変換するメイン関数です。
- **compileMmlToCommands (src/mml2json.js)**: MMLを内部的なコマンドリストにコンパイルする関数です。
- **getMmlCommands (src/mml2json.js)**: MMLパーサーからコマンドを取得する関数です。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算する関数です。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号を処理するための関数です。
- **toInt (src/mml2json.js)**: 値を整数に変換するユーティリティ関数です。
- **calcDuration (src/mml2json.js)**: 音符や休符のデュレーション（長さ）を計算する関数です。
- **calcStartTick (src/mml2json.js)**: 音符やイベントの開始ティックを計算する関数です。
- **increaseStartTick (src/mml2json.js)**: 現在の開始ティックを次のイベントのために増加させる関数です。
- **calcLtick (src/mml2json.js)**: MMLのLコマンド（音符の長さ設定）に関連するティック値を計算する関数です。
- **getNodeId (src/mml2json.js)**: 内部的なノードIDを生成または取得する関数です。
- **sort (src/mml2json.js)**: 配列のソートを行う汎用的な関数です。
- **play (src/play.js)**: 変換されたJSONデータを使用してTone.jsによる音楽再生を開始するメイン関数です。
- **sub (src/play.js)**: `play`関数内で使用される補助的な関数、またはサブプロセスを指す可能性があります。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数です。パーサーの文字コード処理などで使用される可能性があります。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数です。
- **literalEscape (src/grammar.js)**: リテラル文字のエスケープを処理する関数です。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープを処理する関数です。
- **describeExpectation (src/grammar.js)**: パーサーが期待する入力を説明するための関数です。
- **describeExpected (src/grammar.js)**: 期待されるトークンを記述する関数です。
- **describeFound (src/grammar.js)**: 実際に発見されたトークンを記述する関数です。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリポイントとなる関数です。MML文字列を解析します。
- **peg$f0 (src/grammar.js)**: Peggy生成コード内の内部的なヘルパー関数または匿名関数の一部です。
- **text (src/grammar.js)**: 現在解析中のテキストを取得する関数です。
- **offset (src/grammar.js)**: 現在の解析オフセットを取得する関数です。
- **range (src/grammar.js)**: 現在の解析範囲を取得する関数です。
- **location (src/grammar.js)**: 現在の解析位置（行、列）を取得する関数です。
- **expected (src/grammar.js)**: パーサーが次に期待する入力を保持するプロパティまたは関数です。
- **error (src/grammar.js)**: パーサーのエラーを生成または処理する関数です。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するための内部ヘルパー関数です。
- **peg$literalExpectation (src/grammar.js)**: リテラル文字列の期待値を作成する関数です。
- **peg$classExpectation (src/grammar.js)**: 文字クラスの期待値を作成する関数です。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字の期待値を作成する関数です。
- **peg$endExpectation (src/grammar.js)**: 入力の終端の期待値を作成する関数です。
- **peg$otherExpectation (src/grammar.js)**: その他の種類の期待値を作成する関数です。
- **peg$computePosDetails (src/grammar.js)**: 位置詳細を計算する内部ヘルパー関数です。
- **peg$computeLocation (src/grammar.js)**: 位置情報を計算する内部ヘルパー関数です。
- **peg$fail (src/grammar.js)**: パーサーが解析に失敗した際に呼び出される内部ヘルパー関数です。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなパーサーエラーメッセージを構築する関数です。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたパーサーエラーメッセージを構築する関数です。
- **peg$parsestart (src/grammar.js)**: 文法定義の`start`ルールに対応するパーサー関数です。
- **peg$parsenote (src/grammar.js)**: 文法定義の`note`ルールに対応するパーサー関数です。
- **peg$throw (src/grammar.js)**: パーサーエラーをスローするための内部ヘルパー関数です。
- **constructor (src/grammar.js)**: オブジェクトのコンストラクタ関数です。
- **format (src/grammar.js)**: 文字列のフォーマットを行う汎用関数です。
- **buildMessage (src/grammar.js)**: エラーメッセージを構築する関数です。
- **literal (src/grammar.js)**: 文字列リテラルを処理する関数です。
- **class (src/grammar.js)**: 文字クラスを処理する関数です。
- **any (src/grammar.js)**: 任意の文字を処理する関数です。
- **end (src/grammar.js)**: 解析の終了を処理する関数です。
- **other (src/grammar.js)**: その他のパーサー要素を処理する関数です。
- **start (src/grammar.pegjs)**: MMLパーサーの開始ルールを定義します。
- **note (src/grammar.pegjs)**: MMLパーサーにおける音符の文法ルールを定義します。

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
Generated at: 2025-08-04 07:03:44 JST
