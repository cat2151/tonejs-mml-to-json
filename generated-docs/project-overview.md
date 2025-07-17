Last updated: 2025-07-17

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式で書かれた楽譜データを入力として受け取ります。
- 受け取ったMMLデータを、Web Audio APIライブラリTone.jsが利用可能なJSONシーケンサー形式に変換します。
- これにより、ブラウザ上でMMLベースの音楽を再生するための基盤を提供します。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ: **Tone.js** - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンス再生を可能にするJavaScriptライブラリ。**Tone.js CDN** (unpkg経由) でライブラリが配信されます。**MML (Music Macro Language)** は音楽記法として使用され、**Web Audio API** がTone.jsを介して音声出力の基盤となります。
- 開発ツール: **Node.js runtime** - JavaScriptの実行環境として利用されます。**npm scripts** はタスクランナーとしてプロジェクト内の様々な操作（ビルド、テストなど）を実行します。**pnpm** は高速で効率的なパッケージマネージャーです。**Google Generative AI** はAIによる文書生成をサポートし、**@octokit/rest** はGitHub API連携を可能にします。
- テスト: **Vitest** - Viteベースの高速なテストフレームワークで、プロジェクトのテストコード実行に使用されます。**TDD (Test-Driven Development)** はテスト駆動開発の手法として採用されています。
- ビルドツール: **Peggy** - PEG (Parsing Expression Grammar) パーサージェネレーターであり、MML音楽記法のパーサー生成に利用されます。**PEG文法定義** によってMMLの構文が定義され、パーサーが生成されます。
- 言語機能: **ES Modules** - モダンなJavaScriptモジュールシステムを採用し、コードの構造化と再利用性を高めます。
- 自動化・CI/CD: **GitHub Actions** - CI/CD（継続的インテグレーション・継続的デリバリー）の自動化ツールとして、プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationといった4つのワークフローが設定されています。
- 開発標準: **EditorConfig** - 異なるエディタやIDE間でコードのフォーマットを統一するための設定ファイルです。

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
-   **dev-setup/setup.js**: 開発環境のセットアップを行うJavaScriptファイルです。特定の依存関係の確認や、テスト関連の初期設定に利用されます。
-   **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。コードの構造と依存関係を視覚的に理解するのに役立ちます。
-   **generated-docs/callgraph.js**: `callgraph-enhanced.html`の動作を制御するJavaScriptファイルです。関数呼び出しグラフの表示ロジック、ノード情報の表示、レイアウト調整などの機能を提供します。
-   **generated-docs/style.css**: `generated-docs`ディレクトリ内のドキュメント（特に呼び出しグラフ）の表示スタイルを定義するCSSファイルです。
-   **index.html**: プロジェクトのルートディレクトリに配置されたHTMLファイルで、簡易的なデモページやプロジェクト情報のランディングページとして機能します。
-   **src/grammar.js**: Peggyによって生成されたMMLパーサーのJavaScriptコードです。`src/grammar.pegjs`で定義された文法に基づいて、MML文字列を解析し、プログラムが扱える内部表現に変換する役割を担います。
-   **src/grammar.pegjs**: MMLの文法規則をPEGJS形式で定義したファイルです。この定義に基づいて、MMLを解析するためのパーサーコード（`src/grammar.js`）が自動生成されます。
-   **src/index.html**: プロジェクトのメイン機能（MMLからJSONへの変換と再生デモ）を提供するウェブアプリケーションのエントリーポイントとなるHTMLファイルです。
-   **src/main.js**: `src/index.html`から読み込まれ、アプリケーションの主要な初期化処理やイベントハンドリング、MML-JSON変換ロジックの呼び出しなどを行うJavaScriptファイルです。
-   **src/mml2json.js**: MMLパーサーが出力した解析結果を、Tone.jsライブラリが利用可能なJSONシーケンサー形式に変換する主要なロジックを含むファイルです。音符の長さ、開始時刻、繰り返しなどの複雑な音楽的な計算処理を行います。
-   **src/play.js**: `mml2json.js`によって生成されたTone.js JSONデータを受け取り、Web Audio APIを介して実際に音を再生するロジックを含むファイルです。Tone.jsライブラリを操作して音楽をブラウザで出力します。
-   **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するための単体テストを記述したファイルです。Vitestテストフレームワークを使用して実行されます。
-   **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テストの実行方法や環境、モックの設定など、テストに関する様々な構成が含まれます。
-   **.editorconfig**: さまざまなエディタやIDE間でコードスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
-   **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定する設定ファイルです。
-   **LICENSE**: プロジェクトのライセンス情報が記述されたファイルです。
-   **README.ja.md**, **README.md**: プロジェクトの概要、使い方、開発者向け情報などを記述したドキュメントファイルです（日本語版と英語版）。
-   **dev-setup/README.md**: `dev-setup`ディレクトリの目的や内容について説明するドキュメントです。
-   **generated-docs/development-status.md**, **generated-docs/project-overview.md**: 自動生成されたプロジェクトの開発状況や概要に関する追加ドキュメントです。
-   **issue-notes/** (ディレクトリ): プロジェクトのIssueに関するメモや詳細情報がMarkdown形式でまとめられたディレクトリです。
-   **package.json**: Node.jsプロジェクトのメタデータ（プロジェクト名、バージョン、説明など）や、依存関係（インストールされるライブラリ）、スクリプトコマンドなどを定義する設定ファイルです。
-   **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係の正確なバージョンとツリー構造を記録し、再現可能なビルドを保証します。

## 関数詳細説明
-   **mml2json (src/mml2json.js)**
    -   役割と機能: MML（Music Macro Language）形式の音楽データを、Tone.jsライブラリが利用可能なJSONシーケンサー形式に変換するプロジェクトの主要関数です。音符の長さ、タイミング、繰り返しなどMMLの音楽記法を正確に解釈し、Tone.jsで再生可能なデータ構造に変換します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `compileMmlToCommands`
-   **compileMmlToCommands (src/mml2json.js)**
    -   役割と機能: MMLを解析し、内部的なコマンドリストにコンパイルする補助関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `getMmlCommands`, `calcAttackToReleaseTicks`, `repeat`, `toInt`, `calcDuration`, `calcStartTick`, `increaseStartTick`, `calcLtick`, `getNodeId`, `sort`
-   **getMmlCommands (src/mml2json.js)**
    -   役割と機能: MML文字列から個々の音楽コマンド（音符、休符、制御コマンドなど）を抽出します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **calcAttackToReleaseTicks (src/mml2json.js)**
    -   役割と機能: 音符のアタック（発音）からリリース（消音）までのティック数を計算します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **repeat (src/mml2json.js)**
    -   役割と機能: MMLの繰り返し記号を処理し、指定された回数だけ音楽セクションを複製します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **toInt (src/mml2json.js)**
    -   役割と機能: 文字列を整数に変換するユーティリティ関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **calcDuration (src/mml2json.js)**
    -   役割と機能: 音符の実際の長さをティック単位で計算します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **calcStartTick (src/mml2json.js)**
    -   役割と機能: 音符やイベントの開始ティック（時間位置）を計算します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **increaseStartTick (src/mml2json.js)**
    -   役割と機能: 現在の開始ティックを進める（時間を進める）関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **calcLtick (src/mml2json.js)**
    -   役割と機能: MMLのLコマンド（デフォルトの音符長指定）を処理し、ティック値を計算します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **getNodeId (src/mml2json.js)**
    -   役割と機能: 内部的なノードIDを生成または取得する関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **play (src/play.js)**
    -   役割と機能: Tone.jsのJSONデータを受け取り、Web Audio APIを介して実際に音楽をブラウザで再生します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `sub`
-   **sub (src/play.js)**
    -   役割と機能: `play`関数から呼び出される、再生関連の補助的な処理を行う関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **peg$parse (src/grammar.js)**
    -   役割と機能: Peggyによって生成されたパーサーのメインエントリポイントとなる関数です。MML文字列を入力として受け取り、定義された文法に従って解析し、抽象構文木（AST）などの構造化されたデータを生成します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `peg$parsestart`, `peg$parsenote`, `peg$throw` など多くの内部関数
-   **peg$parsestart (src/grammar.js)**
    -   役割と機能: MML解析の開始点となる文法ルールを処理するパーサー内部関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **peg$parsenote (src/grammar.js)**
    -   役割と機能: MMLの音符解析に関連する文法ルールを処理するパーサー内部関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **hex (src/grammar.js)**
    -   役割と機能: パーサー内部で16進数文字を処理するためのユーティリティ関数です。文字コードのエスケープ処理などに利用されます。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `peg$parse`, `peg$f0`, `text`, `offset`, `range`, `location`, `expected`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$parsestart`, `peg$parsenote`, `peg$throw`
-   **start (src/grammar.pegjs)**
    -   役割と機能: MML解析におけるトップレベルの開始ルールを定義します。PEGJS文法ファイル内のキーワードです。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **note (src/grammar.pegjs)**
    -   役割と機能: MMLの音符（Nコマンド）に関する文法ルールを定義します。PEGJS文法ファイル内のキーワードです。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **escapeHtml (generated-docs/callgraph.js)**
    -   役割と機能: HTML特殊文字をエスケープし、安全に表示するためのユーティリティ関数です。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
    -   呼び出し先: `getLayoutConfig`, `showNodeInfo`, `showEdgeInfo`, `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel`, `generateGitHubURL`, `resetLayout`, `switchLayout`, `fitToContent`, `toggleNodeLabels`, `toggleCalleeLocationFilter`, `replace`, `function`, `ready`, `addListener`
-   **getLayoutConfig (generated-docs/callgraph.js)**
    -   役割と機能: 関数呼び出しグラフのレイアウトに関する設定を取得します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **showNodeInfo (generated-docs/callgraph.js)**
    -   役割と機能: 関数呼び出しグラフ上で、特定のノード（関数）に関する詳細情報を表示します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **showEdgeInfo (generated-docs/callgraph.js)**
    -   役割と機能: 関数呼び出しグラフ上で、特定のエッジ（関数間の呼び出し関係）に関する詳細情報を表示します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **hideInfoPanel (generated-docs/callgraph.js)**
    -   役割と機能: 情報表示パネルを非表示にします。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **showInfoPanel (generated-docs/callgraph.js)**
    -   役割と機能: 情報表示パネルを表示します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **toggleInfoPanel (generated-docs/callgraph.js)**
    -   役割と機能: 情報表示パネルの表示/非表示を切り替えます。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **generateGitHubURL (generated-docs/callgraph.js)**
    -   役割と機能: GitHubリポジトリへのURLを生成します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **resetLayout (generated-docs/callgraph.js)**
    -   役割と機能: 関数呼び出しグラフのレイアウトを初期状態にリセットします。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **switchLayout (generated-docs/callgraph.js)**
    -   役割と機能: 関数呼び出しグラフの表示レイアウトを切り替えます。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **fitToContent (generated-docs/callgraph.js)**
    -   役割と機能: グラフの内容全体が表示されるようにビューポートを調整します。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **toggleNodeLabels (generated-docs/callgraph.js)**
    -   役割と機能: グラフのノード（関数）ラベルの表示/非表示を切り替えます。
    -   引数: (情報なし)
    -   戻り値: (情報なし)
-   **toggleCalleeLocationFilter (generated-docs/callgraph.js)**
    -   役割と機能: 呼び出し先の場所によるフィルタリングの有効/無効を切り替えます。
    -   引数: (情報なし)
    -   戻り値: (情報なし)

※ `catch`, `switch`, `if`, `for`, `error()`, `on()`, `replace()`, `function()`, `ready()`, `addListener()`, `sort()`, `unicodeEscape()`, `literalEscape()`, `classEscape()`, `describeExpectation()`, `describeExpected()`, `describeFound()`, `peg$f0()`, `text()`, `offset()`, `range()`, `location()`, `expected()`, `peg$getUnicode()`, `peg$literalExpectation()`, `peg$classExpectation()`, `peg$anyExpectation()`, `peg$endExpectation()`, `peg$otherExpectation()`, `peg$computePosDetails()`, `peg$computeLocation()`, `peg$fail()`, `peg$buildSimpleError()`, `peg$buildStructuredError()`, `peg$throw()` については、これらはJavaScriptの一般的な制御構造、イベントリスナー、またはパーサー内部の低レベルなユーティリティ関数であり、個別のプロジェクト固有の詳細な役割や引数・戻り値に関する情報が提供されていないため、上記では主要な関数に絞って説明しています。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
  - error()
  - on()
    - escapeHtml (generated-docs/callgraph.js)
      - getLayoutConfig()
      - showNodeInfo()
      - showEdgeInfo()
      - hideInfoPanel()
      - showInfoPanel()
      - toggleInfoPanel()
      - generateGitHubURL()
      - resetLayout()
      - switchLayout()
      - fitToContent()
      - toggleNodeLabels()
      - toggleCalleeLocationFilter()
      - replace()
      - function()
      - ready()
      - addListener()
  - mml2json (src/mml2json.js)
    - compileMmlToCommands()
      - getMmlCommands()
      - calcAttackToReleaseTicks()
      - repeat()
      - toInt()
      - calcDuration()
      - calcStartTick()
      - increaseStartTick()
      - calcLtick()
      - getNodeId()
      - sort()
  - play (src/play.js)
    - sub()
- switch (generated-docs/callgraph.js)
- if (generated-docs/callgraph.js)
- hex (src/grammar.js)
  - unicodeEscape()
  - literalEscape()
  - classEscape()
  - describeExpectation()
  - describeExpected()
  - describeFound()
  - peg$parse()
  - peg$f0()
  - text()
  - offset()
  - range()
  - location()
  - expected()
  - peg$getUnicode()
  - peg$literalExpectation()
  - peg$classExpectation()
  - peg$anyExpectation()
  - peg$endExpectation()
  - peg$otherExpectation()
  - peg$computePosDetails()
  - peg$computeLocation()
  - peg$fail()
  - peg$buildSimpleError()
  - peg$buildStructuredError()
  - peg$parsestart()
  - peg$parsenote()
  - peg$throw()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
- for (src/mml2json.js)
```

---
Generated at: 2025-07-17 07:04:04 JST
