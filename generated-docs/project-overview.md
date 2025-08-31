Last updated: 2025-09-01

# Project Overview

## プロジェクト概要
- MML形式の音楽データをTone.jsが理解できるJSONシーケンサーフォーマットへ変換します。
- Web Audio APIを活用し、変換された音楽データをブラウザ上で手軽に再生・試聴できます。
- 音楽記法MMLを用いた作曲や、Webアプリケーションでの音楽再生を容易にするツールです。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築基盤として利用されます。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザ上で高度な音声処理やMMLの再生を実現するライブラリです。
    - Tone.js CDN (unpkg) - Tone.jsライブラリをウェブアプリケーションに効率的に配信するためのコンテンツデリバリーネットワークです。
    - MML (Music Macro Language) - テキストベースで音楽を記述するための記法で、このプロジェクトの変換元となる入力形式です。
    - Web Audio API - ブラウザに内蔵された音声処理機能で、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションの開発やスクリプト実行のための環境です。
    - npm scripts - パッケージ管理やタスクの自動化に利用されるスクリプト実行機能です。
    - pnpm - 高速でディスク容量を効率的に利用するパッケージマネージャーです。
    - Google Generative AI (@google/generative-ai) - AIを活用した文書生成や自動化をサポートするために利用されます。
    - @octokit/rest - GitHub APIと連携し、リポジトリ操作の自動化を可能にします。
    - dotenv - 環境変数を管理し、設定を分離するために使用されます。
- テスト:
    - Vitest - 高速なViteベースのJavaScript/TypeScriptテストフレームワークで、コードの品質を保証します。
    - TDD (Test-Driven Development) - テストを先に記述することで、堅牢なコードを開発する手法です。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLパーサーの自動生成に利用されます。
    - PEG文法定義 - MML音楽記法を正確に解析するための文法ルールを定義します。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用を促進します。
- 自動化・CI/CD:
    - GitHub Actions - コードのビルド、テスト、デプロイなどのCI/CDパイプラインを自動化するツールです。プロジェクト要約の自動生成、Issue管理、READMEの多言語翻訳、国際化（i18n）の自動化などに活用されます。
- 開発標準:
    - EditorConfig - 複数の開発者が異なるエディタやIDEを使用しても、コードのスタイル（インデント、改行など）を統一するための設定ファイルです。

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
-   `.editorconfig`: コードのインデントスタイルや文字コード、行末文字などをプロジェクト全体で統一するための設定ファイルです。
-   `.gitignore`: Gitによるバージョン管理から除外するファイルやディレクトリを指定します。
-   `LICENSE`: プロジェクトのライセンス情報が記述されています。
-   `README.ja.md`: プロジェクトの日本語での説明、使用方法、デモリンクなどが記載されたメインドキュメントです。
-   `README.md`: プロジェクトの英語での説明、使用方法、デモリンクなどが記載されたメインドキュメントです。
-   `dev-setup/README.md`: 開発環境のセットアップに関する追加情報や手順が記述されています。
-   `dev-setup/setup.js`: 開発環境の初期設定や準備を行うためのJavaScriptスクリプトです。
-   `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し関係を視覚的に表示する、高機能なグラフ化されたHTMLドキュメントです。
-   `generated-docs/callgraph.js`: `callgraph-enhanced.html`で関数呼び出しグラフを描画するためのJavaScriptロジックが含まれています。
-   `generated-docs/development-status.md`: プロジェクトの開発状況や進捗が記述されたMarkdownファイルです。
-   `generated-docs/project-overview.md`: プロジェクトの概要がまとめられたMarkdownファイルです。
-   `generated-docs/style.css`: 自動生成されたドキュメントの見た目を定義するスタイルシートです。
-   `index.html`: プロジェクトのデモやメインアプリケーションの入り口となるHTMLファイルです。
-   `issue-notes/`: 開発中に記録された、特定の課題や検討事項に関するメモが保存されています。
-   `package.json`: プロジェクトのメタデータ（名前、バージョンなど）、スクリプト、依存関係が定義されたファイルです。
-   `pnpm-lock.yaml`: `pnpm`パッケージマネージャーが管理する依存関係の正確なバージョンと構造を記録するロックファイルです。
-   `src/grammar.js`: `src/grammar.pegjs`に基づいて`Peggy`によって自動生成された、MML記法を解析するためのJavaScriptパーサークラスです。
-   `src/grammar.pegjs`: MML (Music Macro Language) の文法ルールを定義するPEG (Parsing Expression Grammar) ファイルです。
-   `src/index.html`: `index.html`と同様に、プロジェクトのデモやアプリケーションのウェブインターフェースを提供します。
-   `src/main.js`: プロジェクトの主要な処理を調整する、メインのエントリスクリプトです。
-   `src/mml2json.js`: MML文字列を解析し、Tone.jsのシーケンサーが利用できるJSONフォーマットに変換する核心的なロジックを実装しています。
-   `src/play.js`: 変換されたJSONデータとTone.jsを使用して、MML音楽をブラウザ上で再生する機能を提供します。
-   `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの機能が正しく動作するかを検証するためのテストコードです。
-   `vitest.config.js`: `Vitest`テストフレームワークの各種設定を定義するファイルです。

## 関数詳細説明
-   `catch` (dev-setup/setup.js): エラー発生時に処理を捕捉し、適切に対応するための汎用的なエラーハンドリング関数です。
-   `mml2json` (src/mml2json.js): 引数としてMML文字列を受け取り、それをTone.jsが解釈可能なJSONシーケンサーフォーマットに変換して返します。プロジェクトの主要な変換ロジックを担います。
-   `compileMmlToCommands` (src/mml2json.js): MML文字列を内部的なコマンドリストの配列にコンパイルする関数です。`mml2json`関数内で呼び出されます。
-   `getMmlCommands` (src/mml2json.js): コンパイルされたMMLコマンドリストから、必要なコマンドを抽出・整理する関数です。
-   `calcAttackToReleaseTicks` (src/mml2json.js): 音楽ノートのアタックからリリースまでの時間（ティック単位）を計算します。
-   `repeat` (src/mml2json.js): MMLの繰り返し記号に対応するための処理を行います。
-   `toInt` (src/mml2json.js): 文字列などの値を整数型に変換するユーティリティ関数です。
-   `calcDuration` (src/mml2json.js): 音楽ノートの演奏時間（デュレーション）を計算します。
-   `calcStartTick` (src/mml2json.js): 各音楽イベントの開始時刻（ティック単位）を計算します。
-   `increaseStartTick` (src/mml2json.js): 現在の開始ティック値を増加させ、次のイベントの開始時刻を決定します。
-   `calcLtick` (src/mml2json.js): MMLのLコマンド（デフォルトの音長）に対応するティック値を計算します。
-   `getNodeId` (src/mml2json.js): 内部的にノードにユニークなIDを割り当てるか取得する関数です。
-   `sort` (src/mml2json.js): 音楽イベントを特定の順序（例: 時系列順）に並べ替えるための関数です。
-   `play` (src/play.js): 変換されたTone.js JSONデータを受け取り、Web Audio API (Tone.js経由) を用いてブラウザで音楽を再生します。
-   `sub` (src/play.js): `play`関数内で使用される補助的な関数で、具体的な再生ロジックの一部を担います。
-   `escapeHtml` (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションなどを防ぐセキュリティ関連のユーティリティ関数です。
-   `getLayoutConfig` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトに関する設定を取得する関数です。
-   `placeCentralNode` (generated-docs/callgraph.js): 呼び出しグラフの中央ノードを配置する関数です。
-   `showNodeInfo`, `showEdgeInfo`, `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel` (generated-docs/callgraph.js): 呼び出しグラフ上でノードやエッジの詳細情報を表示/非表示/切り替えするためのUI制御関数です。
-   `generateGitHubURL` (generated-docs/callgraph.js): GitHubリポジトリへのリンクを生成する関数です。
-   `resetLayout`, `watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps`, `resolveNodeOverlaps`, `switchLayout`, `resetNodeStates`, `fitToContent`, `toggleNodeLabels`, `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトの初期化、ノードの移動監視、オーバーラップ解消、レイアウトの切り替え、ノード状態のリセット、コンテンツへのフィット、ラベル表示の切り替え、呼び出し元フィルタリングなど、インタラクティブなグラフ操作に関する関数群です。
-   `hex`, `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `text`, `offset`, `range`, `location`, `expected`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$parsestart`, `peg$parsenote`, `peg$throw`, `constructor`, `format`, `if`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while` (src/grammar.js): これらは`Peggy`パーサージェネレーターによって自動生成された、MML構文解析の内部的なヘルパー関数およびルール関数です。MML文字列をトークン化し、構文木を構築する処理の中核を成します。
-   `start` (src/grammar.pegjs): MMLパーサーの開始ルールを定義します。
-   `note` (src/grammar.pegjs): MMLパーサーにおける個々の音符（ノート）の解析ルールを定義します。

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
Generated at: 2025-09-01 07:03:35 JST
