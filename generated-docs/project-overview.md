Last updated: 2025-08-12

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で記述された音楽データを、Tone.jsが利用可能なJSONシーケンサー形式に変換するツールです。
- Web Audio APIを利用して、変換されたJSONデータに基づきブラウザ上でMMLベースの音楽を再生・操作することを可能にします。
- 音楽制作やWebアプリケーション開発におけるMMLを用いたオーディオコンテンツの統合を支援します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンスを可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトでの利用を容易にします。
    - MML (Music Macro Language) - 音符やテンポなどを記述するシンプルな音楽記法であり、このプロジェクトの変換対象となる入力形式です。
    - Web Audio API - ブラウザに組み込まれている音声処理機能で、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードの実行環境として使用されます。
    - npm scripts - ビルド、テスト、ドキュメント生成などのタスクを自動化するためのスクリプト群です。
    - pnpm - 高速でディスク容量効率の良いJavaScriptパッケージマネージャーです。
    - Google Generative AI - プロジェクトのドキュメント生成や要約などを支援するために使用されます。
    - @octokit/rest - GitHub APIと連携し、Issue管理やドキュメント生成などの自動化に利用されます。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストに使用されます。
    - TDD (Test-Driven Development) - テスト駆動開発手法が採用されており、堅牢なコード品質を保証します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MML記法を解析するためのパーサーを自動生成します。
    - PEG文法定義 - MML音楽記法のパーサーを生成するために使用される文法ルールを定義します。
- 言語機能:
    - ES Modules - モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を高めます。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化するためのプラットフォームです。
        - プロジェクト要約自動生成: AIを利用してプロジェクトの概要を自動生成します。
        - Issue自動管理: GitHub Issuesのライフサイクル管理を自動化します。
        - README多言語翻訳: プロジェクトのREADMEファイルを複数の言語に自動翻訳します。
        - i18n automation: 国際化対応のための自動翻訳ワークフローを提供します。
- 開発標準:
    - EditorConfig - 異なるエディタやIDE間でのコードスタイル（インデント、改行など）の統一を支援します。

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
- **.editorconfig**: 異なる開発環境間でのコードスタイルの一貫性を保つための設定ファイルです。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定する設定ファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの概要や使い方を日本語で説明するドキュメントです。
- **README.md**: プロジェクトの概要や使い方を英語で説明するドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明ドキュメントです。
- **dev-setup/setup.js**: 開発環境のセットアップに関連するスクリプトファイルです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を可視化するための拡張されたHTMLドキュメントです。
- **generated-docs/callgraph.js**: 関数呼び出し階層のデータを処理し、可視化ロジックを提供するJavaScriptファイルです。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: generated-docs内のHTMLドキュメントのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートにある、デモページやアプリケーションのエントリーポイントとなるHTMLファイルです。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報を管理するディレクトリです。各ファイルは特定のIssueに関するものです。
- **package.json**: Node.jsプロジェクトの設定ファイルで、プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
- **pnpm-lock.yaml**: pnpmによって管理される依存関係の正確なバージョンと構造を記録するロックファイルです。
- **src/grammar.js**: Peggyによって`grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文ツリーを構築します。
- **src/grammar.pegjs**: MMLの構文ルールを定義するPEG (Parsing Expression Grammar) ファイルです。この定義に基づいて`grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内のデモページやアプリケーションのエントリーポイントとなるHTMLファイルです。
- **src/main.js**: メインのアプリケーションロジックや初期化処理を含むJavaScriptファイルです。
- **src/mml2json.js**: MMLデータをTone.jsのJSONシーケンサー形式に変換する主要なロジックを実装するJavaScriptファイルです。
- **src/play.js**: 変換されたTone.js JSONシーケンサーデータに基づいて音声を再生するロジックを実装するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたパーサーのテストケースを記述するJavaScriptファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための関数、またはエラーを捕捉するブロック。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティと表示の一貫性を確保するユーティリティ関数。
- **getLayoutConfig (generated-docs/callgraph.js)**: グラフレイアウトに関する設定を取得する関数。
- **placeCentralNode (generated-docs/callgraph.js)**: グラフの中心にノードを配置する関数。
- **showNodeInfo (generated-docs/callgraph.js)**: 特定のノード（関数など）の詳細情報を表示する関数。
- **showEdgeInfo (generated-docs/callgraph.js)**: 特定のエッジ（呼び出し関係など）の詳細情報を表示する関数。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを隠す関数。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示する関数。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える関数。
- **generateGitHubURL (generated-docs/callgraph.js)**: GitHubリソースへのURLを生成する関数。
- **resetLayout (generated-docs/callgraph.js)**: グラフのレイアウトを初期状態にリセットする関数。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの移動を監視し、重なりを解消するためのラッパー関数。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの移動を監視し、視覚的な重なりを自動的に解消する関数。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: ノード間の重なりを解決するアルゴリズムを実装した関数。
- **switchLayout (generated-docs/callgraph.js)**: グラフのレイアウト方式を切り替える関数。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの表示状態をリセットする関数。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体が画面に収まるようにズームレベルを調整する関数。
- **toggleNodeLabels (generated-docs/callgraph.js)**: ノードのラベル表示を切り替える関数。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出される側の関数の場所に基づいてフィルターを切り替える関数。
- **hex (src/grammar.js)**: 16進数文字を処理するパーサー内部の関数。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理するパーサー内部の関数。
- **literalEscape (src/grammar.js)**: リテラルエスケープシーケンスを処理するパーサー内部の関数。
- **classEscape (src/grammar.js)**: 文字クラスエスケープシーケンスを処理するパーサー内部の関数。
- **describeExpectation (src/grammar.js)**: パース時に期待される入力形式を記述するパーサー内部のユーティリティ関数。
- **describeExpected (src/grammar.js)**: 期待されるトークンの説明を生成するパーサー内部のユーティリティ関数。
- **describeFound (src/grammar.js)**: 見つかったトークンの説明を生成するパーサー内部のユーティリティ関数。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたMMLパーサーのメイン関数で、入力文字列を解析します。
- **peg$f0 (src/grammar.js)**: Peggyによって生成されたパーサー内の内部処理関数。
- **text (src/grammar.js)**: 現在パース中のテキスト部分を返すパーサー内部の関数。
- **offset (src/grammar.js)**: 現在のパースオフセットを返すパーサー内部の関数。
- **range (src/grammar.js)**: 現在のパース範囲を返すパーサー内部の関数。
- **location (src/grammar.js)**: 現在のパース位置情報（行、列など）を返すパーサー内部の関数。
- **expected (src/grammar.js)**: パースエラー時に期待される入力形式を返すパーサー内部の関数。
- **error (src/grammar.js)**: パースエラーを生成または処理するパーサー内部の関数。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するパーサー内部の関数。
- **peg$literalExpectation (src/grammar.js)**: リテラル期待値を生成するパーサー内部の関数。
- **peg$classExpectation (src/grammar.js)**: 文字クラス期待値を生成するパーサー内部の関数。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字期待値を生成するパーサー内部の関数。
- **peg$endExpectation (src/grammar.js)**: 入力終了期待値を生成するパーサー内部の関数。
- **peg$otherExpectation (src/grammar.js)**: その他の期待値を生成するパーサー内部の関数。
- **peg$computePosDetails (src/grammar.js)**: 位置詳細情報を計算するパーサー内部の関数。
- **peg$computeLocation (src/grammar.js)**: 位置情報を計算するパーサー内部の関数。
- **peg$fail (src/grammar.js)**: パース失敗を処理するパーサー内部の関数。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなパースエラーを構築するパーサー内部の関数。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたパースエラーを構築するパーサー内部の関数。
- **peg$parsestart (src/grammar.js)**: MMLパーサーの開始ルールを処理する関数。
- **peg$parsenote (src/grammar.js)**: MMLパーサーの音符ルールを処理する関数。
- **peg$throw (src/grammar.js)**: パースエラーをスローするパーサー内部の関数。
- **constructor (src/grammar.js)**: クラスのコンストラクタ（詳細不明）。
- **format (src/grammar.js)**: フォーマット処理を行う関数（詳細不明）。
- **buildMessage (src/grammar.js)**: エラーメッセージを構築するパーサー内部の関数。
- **mml2json (src/mml2json.js)**: MML文字列をTone.jsのJSONシーケンサー形式に変換するメイン関数。
- **compileMmlToCommands (src/mml2json.js)**: MMLを内部コマンドリストにコンパイルする関数。
- **getMmlCommands (src/mml2json.js)**: MML文字列からコマンドを抽出する関数。
- **calcAttackToReleaseTicks (src/mml2json.js)**: アタックからリリースまでのティック数を計算する関数。
- **repeat (src/mml2json.js)**: MMLの繰り返し処理を扱う関数。
- **toInt (src/mml2json.js)**: 値を整数に変換するユーティリティ関数。
- **calcDuration (src/mml2json.js)**: 音符のデュレーション（長さ）を計算する関数。
- **calcStartTick (src/mml2json.js)**: 音符の開始ティックを計算する関数。
- **increaseStartTick (src/mml2json.js)**: 開始ティックを増加させる関数。
- **calcLtick (src/mml2json.js)**: ティックに関連する値を計算する関数（詳細不明）。
- **getNodeId (src/mml2json.js)**: ノードIDを取得する関数。
- **play (src/play.js)**: 変換されたJSONデータに基づいて音を再生する関数。
- **sub (src/play.js)**: 再生処理のサブ機能を担う関数（詳細不明）。
- **start (src/grammar.pegjs)**: MML文法の開始ルールを定義する関数（Peggy内部）。
- **note (src/grammar.pegjs)**: MML文法の音符ルールを定義する関数（Peggy内部）。

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
Generated at: 2025-08-12 07:03:28 JST
