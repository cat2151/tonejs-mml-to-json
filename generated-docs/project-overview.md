Last updated: 2025-09-25

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) 形式の楽譜データを解析し、音楽再生可能なJSONフォーマットへ変換します。
- 変換されたJSONデータは、Web Audio APIを基盤とするTone.jsライブラリを用いてブラウザ上で音声として再生されます。
- このプロジェクトはMMLを用いたブラウザベースの音楽シーケンサーを実現し、MML音楽のプレビューや共有を容易にします。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されます。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用したブラウザ音声ライブラリ。Web Audio API - ブラウザのネイティブ音声技術。Tone.js CDN - unpkg経由でTone.jsライブラリを配信。MML (Music Macro Language) - 音楽記法のパーサー定義に使用されます。
- 開発ツール: Node.js runtime - JavaScriptの実行環境。npm scripts - プロジェクトのタスク自動化（5個のスクリプト）。pnpm - 高速で効率的なパッケージマネージャー。Google Generative AI - ドキュメント生成などのAI支援。@octokit/rest - GitHub API連携。
- テスト: Vitest - 高速なViteベースのテストフレームワーク。TDD (Test-Driven Development) - テスト駆動開発手法。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター。PEG文法定義 - MML音楽記法のパーサー生成に用いられます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステム。
- 自動化・CI/CD: GitHub Actions - CI/CD自動化（4個のワークフロー）。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationといった自動翻訳ワークフローが含まれます。
- 開発標準: EditorConfig - 異なるIDEやエディタ間でのコード整形ルールを統一するための設定。

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
-   `.editorconfig`: 開発環境全体で一貫したコーディングスタイル（インデント、改行など）を強制するための設定ファイルです。
-   `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
-   `LICENSE`: プロジェクトのライセンス情報が含まれています。
-   `README.ja.md`: プロジェクトの概要、使い方、開発方法などを日本語で記述したドキュメントです。
-   `README.md`: プロジェクトの概要、使い方、開発方法などを英語で記述したドキュメントです。
-   `dev-setup/README.md`: 開発環境のセットアップ手順に関する情報を提供します。
-   `dev-setup/setup.js`: 開発環境の初期設定や準備を行うためのJavaScriptスクリプトです。
-   `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し関係を視覚化した、インタラクティブなHTMLドキュメントです。
-   `generated-docs/callgraph.js`: `callgraph-enhanced.html`で関数呼び出しグラフを生成、表示、操作するためのJavaScriptロジックが含まれています。
-   `generated-docs/style.css`: 呼び出しグラフの表示スタイルを定義するCSSファイルです。
-   `index.html`: プロジェクトのメインデモページ、またはアプリケーションのエントリポイントとなるHTMLファイルです。
-   `issue-notes/`: GitHub Issuesに関連するメモや詳細情報が格納されています。（内容は開発者向けのため省略）
-   `package.json`: プロジェクトのメタデータ（名前、バージョンなど）、依存関係、スクリプト、設定を定義するファイルです。
-   `pnpm-lock.yaml`: `pnpm`パッケージマネージャーによって生成される、プロジェクトの依存関係の正確なツリー構造とバージョンを固定するファイルです。
-   `src/grammar.js`: `src/grammar.pegjs`のPEG文法定義から生成された、MML文字列を解析するためのJavaScriptパーサーです。
-   `src/grammar.pegjs`: MML (Music Macro Language) の構文ルールをParsing Expression Grammar (PEG) 形式で定義したファイルです。この定義に基づいて`src/grammar.js`が生成されます。
-   `src/index.html`: `src`ディレクトリ内のデモ用またはコンポーネント用のHTMLファイルです。
-   `src/main.js`: アプリケーションの主要なロジックや初期化処理を担うJavaScriptファイルです。
-   `src/mml2json.js`: MMLパーサーによって解析されたMMLデータを、Tone.jsライブラリが利用できるJSONシーケンサーフォーマットに変換するロジックを実装しています。
-   `src/play.js`: 変換されたTone.js JSONシーケンサーデータを読み込み、Web Audio API (Tone.js経由) を使用してブラウザで音楽を再生する機能を提供します。
-   `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの機能を検証するためのテストコードです。
-   `vitest.config.js`: Vitestテストフレームワークの挙動をカスタマイズするための設定ファイルです。

## 関数詳細説明
-   **`catch`** (`dev-setup/setup.js`): エラー発生時に例外を捕捉し、適切な処理を実行するための一般的なエラーハンドリング関数です。
-   **`escapeHtml`** (`generated-docs/callgraph.js`): 文字列内のHTML特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティリスクを防ぎながら、安全にHTMLに表示できるようにします。
-   **`getLayoutConfig`** (`generated-docs/callgraph.js`): グラフの表示レイアウトに関する設定情報を取得します。
-   **`placeCentralNode`** (`generated-docs/callgraph.js`): グラフの中心となるノードを特定の位置に配置する役割を担います。
-   **`showNodeInfo`** (`generated-docs/callgraph.js`): 特定のグラフノード（関数など）に関する詳細情報を表示パネルに表示します。
-   **`showEdgeInfo`** (`generated-docs/callgraph.js`): 特定のグラフエッジ（関数呼び出し関係など）に関する詳細情報を表示パネルに表示します。
-   **`hideInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルを非表示にします。
-   **`showInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルを表示します。
-   **`toggleInfoPanel`** (`generated-docs/callgraph.js`): 情報表示パネルの表示状態（表示/非表示）を切り替えます。
-   **`generateGitHubURL`** (`generated-docs/callgraph.js`): グラフ内の要素（ファイル、関数など）に対応するGitHubリポジトリのURLを生成します。
-   **`resetLayout`** (`generated-docs/callgraph.js`): グラフの表示レイアウトを初期状態にリセットします。
-   **`watchNodeMovementAndFixOverlapsWrap`** (`generated-docs/callgraph.js`): ノードの動きを監視し、重なりを修正するロジックをラップする関数です。
-   **`watchNodeMovementAndFixOverlaps`** (`generated-docs/callgraph.js`): グラフノードの移動を監視し、ノード同士の重なりが発生した際に自動的に位置を調整して解決します。
-   **`resolveNodeOverlaps`** (`generated-docs/callgraph.js`): グラフノードの重なりを解決するための具体的なアルゴリズムを実行します。
-   **`switchLayout`** (`generated-docs/callgraph.js`): グラフの異なるレイアウト方式（例: 円形、ツリー）に切り替える機能を提供します。
-   **`resetNodeStates`** (`generated-docs/callgraph.js`): グラフノードの選択状態やハイライトなどの状態をリセットします。
-   **`fitToContent`** (`generated-docs/callgraph.js`): グラフ全体がビューポートに収まるようにズームレベルや位置を調整します。
-   **`toggleNodeLabels`** (`generated-docs/callgraph.js`): グラフノードに表示されるラベルの表示/非表示を切り替えます。
-   **`toggleCalleeLocationFilter`** (`generated-docs/callgraph.js`): 呼び出し先のファイルパスなどに基づいてグラフノードをフィルタリングする機能を切り替えます。
-   **`replace`** (`generated-docs/callgraph.js`): 文字列内の特定のパターンを別の文字列に置換する処理を実行します。
-   **`switch`** (`generated-docs/callgraph.js`): 複数の条件分岐を効率的に処理するJavaScriptの予約語であり、関数呼び出しグラフ内では特定の処理ブロックの開始点として識別されています。
-   **`function`** (`generated-docs/callgraph.js`): 無名関数やコールバック関数として、または関数定義の開始点として識別されています。特定の機能を持つ関数名ではありません。
-   **`max`** (`generated-docs/callgraph.js`): 与えられた数値の中から最大値を計算する関数です。
-   **`on`** (`generated-docs/callgraph.js`): イベントリスナーを設定するための一般的な関数で、特定のイベントが発生した際に指定されたコールバック関数を実行します。
-   **`if`** (`generated-docs/callgraph.js`): 条件に基づいてコードの実行パスを分岐させるJavaScriptの予約語であり、関数呼び出しグラフ内では特定の処理ブロックの開始点として識別されています。
-   **`for`** (`generated-docs/callgraph.js`): 指定された回数だけ処理を繰り返すためのJavaScriptの予約語であり、関数呼び出しグラフ内ではループ処理の開始点として識別されています。
-   **`ready`** (`generated-docs/callgraph.js`): 通常、DOMが完全にロードされ、スクリプトが安全に実行できる状態になったときに呼び出されるイベントハンドラです。
-   **`addListener`** (`generated-docs/callgraph.js`): イベントリスナーを要素に追加するための関数です。
-   **`hex`** (`src/grammar.js`): 16進数に関連する処理を行うパーサー内部関数。主に文字コードの変換やエスケープシーケンスの処理に利用されます。
-   **`unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `peg$parse`, `peg$f0`, `text`, `offset`, `range`, `location`, `expected`, `error`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$parsestart`, `peg$parsenote`, `peg$throw`, `constructor`, `format`, `if`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while`** (`src/grammar.js`): これらは`Peggy`によって`src/grammar.pegjs`から自動生成されたMMLパーサーの内部関数群です。MML文字列の解析、エラー処理、トークン化、AST構築など、パーサーのコア機能を構成します。通常、開発者が直接呼び出すことはありません。
-   **`start`** (`src/grammar.pegjs`): MMLの文法定義における、パーサーが解析を開始する最高位のルールを定義しています。
-   **`note`** (`src/grammar.pegjs`): MMLの文法定義における、個々の音符や休符を解析するためのルールを定義しています。
-   **`mml2json`** (`src/mml2json.js`): MMLの解析結果を引数として受け取り、Tone.jsライブラリが利用できるJSON形式のシーケンサーデータ構造に変換して返します。
-   **`compileMmlToCommands`** (`src/mml2json.js`): MMLの構文ツリーを、より抽象的な音楽コマンドのリストに変換する中間処理を行います。
-   **`getMmlCommands`** (`src/mml2json.js`): MMLの解析結果から、音楽の構成要素（音符、テンポ変更など）を表すコマンドを抽出します。
-   **`calcAttackToReleaseTicks`** (`src/mml2json.js`): 音符のアタック（発音）からリリース（消音）までのティック数を計算します。
-   **`repeat`** (`src/mml2json.js`): MMLの繰り返し記号（例: `[MML]`）を処理し、指定された回数だけコマンドを複製するロジックを実装します。
-   **`toInt`** (`src/mml2json.js`): 与えられた値を整数型に変換します。
-   **`calcDuration`** (`src/mml2json.js`): MMLの音長指定に基づいて、音符の持続時間（デュレーション）をティック単位で計算します。
-   **`calcStartTick`** (`src/mml2json.js`): 各音符やイベントが開始するタイミングを全体のティック数で計算します。
-   **`increaseStartTick`** (`src/mml2json.js`): 現在の開始ティック値を、直前の音符やイベントの長さに応じて増加させます。
-   **`calcLtick`** (`src/mml2json.js`): MMLのLコマンド（デフォルト音長）によって指定されるティック数を計算します。
-   **`getNodeId`** (`src/mml2json.js`): 内部的なノード識別のためのIDを生成または取得します。
-   **`if`** (`src/mml2json.js`): 条件に基づいてコードの実行パスを分岐させるJavaScriptの予約語であり、関数呼び出しグラフ内では特定の処理ブロックの開始点として識別されています。
-   **`sort`** (`src/mml2json.js`): 配列の要素を特定の順序で並べ替える関数です。
-   **`function`** (`src/mml2json.js`): 無名関数やコールバック関数として、または関数定義の開始点として識別されています。特定の機能を持つ関数名ではありません。
-   **`switch`** (`src/mml2json.js`): 複数の条件分岐を効率的に処理するJavaScriptの予約語であり、関数呼び出しグラフ内では特定の処理ブロックの開始点として識別されています。
-   **`for`** (`src/mml2json.js`): 指定された回数だけ処理を繰り返すためのJavaScriptの予約語であり、関数呼び出しグラフ内ではループ処理の開始点として識別されています。
-   **`play`** (`src/play.js`): Tone.jsのJSONシーケンサーフォーマットを受け取り、Web Audio APIを通じて実際の音楽再生を開始する主要な関数です。
-   **`sub`** (`src/play.js`): `play`関数内で呼び出される補助的な関数で、音楽再生に関する特定のサブタスクを実行します。
-   **`catch`** (`src/play.js`): エラー発生時に例外を捕捉し、音楽再生中の問題を適切に処理するためのエラーハンドリング関数です。

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
Generated at: 2025-09-25 07:06:10 JST
