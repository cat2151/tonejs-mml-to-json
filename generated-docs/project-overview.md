Last updated: 2025-08-23

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.js JSONシーケンサー形式に変換するWebベースのツールです。
- これにより、Webブラウザ上でMMLで記述された音楽をTone.jsライブラリを用いて再生できます。
- 自動化されたドキュメント生成や多言語対応、テスト環境も完備した開発者支援プロジェクトでもあります。

## 技術スタック
- フロントエンド: **HTML5** (ブラウザベースのMMLプレイヤーのUIを提供)
- 音楽・オーディオ: **Tone.js** (Web Audio APIを活用した高機能な音声ライブラリ), **Tone.js CDN** (unpkg経由でライブラリを配信), **MML (Music Macro Language)** (音楽記法パーサーの対象言語), **Web Audio API** (ブラウザでの音声処理基盤、Tone.js経由で使用)
- 開発ツール: **Node.js runtime** (JavaScript実行環境), **npm scripts** (タスク自動化), **pnpm** (高速で効率的なパッケージマネージャー), **Google Generative AI** (AIを活用した文書生成をサポート), **@octokit/rest** (GitHub APIとの連携を実現), **dotenv** (環境変数の管理)
- テスト: **Vitest** (高速なViteベースのテストフレームワーク), **TDD (Test-Driven Development)** (テストを最初に書く開発手法)
- ビルドツール: **Peggy** (PEG (Parsing Expression Grammar) パーサージェネレーター), **PEG文法定義** (MML音楽記法のパーサー生成に使用する文法定義ファイル)
- 言語機能: **ES Modules** (モダンなJavaScriptモジュールシステム)
- 自動化・CI/CD: **GitHub Actions** (CI/CDワークフローを自動化。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、国際化（i18n）の自動化などを実現)
- 開発標準: **EditorConfig** (異なるエディタ間でのコード整形ルールを統一)

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
-   **.editorconfig**: プロジェクトのコーディングスタイル（インデント、改行コードなど）を定義し、開発者間でコードの統一性を保つための設定ファイルです。
-   **.gitignore**: Gitがバージョン管理の対象から除外すべきファイルやディレクトリを指定するファイルです。
-   **LICENSE**: プロジェクトの利用条件や配布に関するライセンス情報が記述されています。
-   **README.ja.md**: プロジェクトの概要、目的、使い方などを日本語で説明する主要なドキュメントファイルです。
-   **README.md**: プロジェクトの概要、目的、使い方などを英語で説明する主要なドキュメントファイルです。
-   **dev-setup/**: 開発環境のセットアップに関連するスクリプトやドキュメントを格納するディレクトリです。
    -   `dev-setup/README.md`: 開発環境の構築手順や必要な設定について説明するドキュメントです。
    -   `dev-setup/setup.js`: 開発環境の初期設定や依存関係のインストールなどを自動化するためのスクリプトです。
-   **generated-docs/**: 自動生成されたドキュメントやレポートを格納するディレクトリです。
    -   `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し階層を可視化した、より詳細なHTML形式のグラフです。
    -   `generated-docs/callgraph.js`: 関数呼び出しグラフを生成、描画、操作するためのJavaScriptロジックが含まれています。
    -   `generated-docs/development-status.md`: プロジェクトの開発状況や進捗に関する自動生成ドキュメントです。
    -   `generated-docs/project-overview.md`: 自動生成されたプロジェクトの概要ドキュメントです。
    -   `generated-docs/style.css`: 生成されたドキュメントの見た目を整えるためのスタイルシートです。
-   **index.html** (ルートディレクトリ): プロジェクトのライブデモやメインのWebアプリケーションへの入り口となるHTMLファイルです。Tone.js CDNの読み込みやUI要素が含まれます。
-   **issue-notes/**: 開発中の課題やIssueに関するメモを個別に格納するディレクトリです。（来訪者向けの詳細は省略）
-   **package.json**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
-   **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成され、プロジェクトの依存関係の正確なバージョンと解決方法を記録するファイルです。
-   **src/**: プロジェクトの主要なソースコードが格納されているディレクトリです。
    -   `src/grammar.js`: `src/grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータに変換します。
    -   `src/grammar.pegjs`: MML (Music Macro Language) の構文ルールを定義するParsing Expression Grammar (PEG) ファイルです。これを基に`src/grammar.js`が生成されます。
    -   `src/index.html`: `src`ディレクトリ内のMMLプレイヤーのユーザーインターフェースを提供するHTMLファイルです。
    -   `src/main.js`: MMLの入力処理や変換、Tone.jsへのデータ受け渡しといった、アプリケーションのメインロジックを調整するファイルです。
    -   `src/mml2json.js`: MML記法を解析し、Tone.jsのシーケンサーが解釈できるJSON形式のデータ構造に変換する主要なロジックを実装しています。
    -   `src/play.js`: 変換されたTone.js JSONシーケンスデータを実際にWeb Audio APIとTone.jsを使って再生する機能を提供します。
-   **test/**: プロジェクトのテストコードを格納するディレクトリです。
    -   `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードです。
-   **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境に関する定義が含まれます。

## 関数詳細説明
-   **catch** (`dev-setup/setup.js`): エラーハンドリングのための一般的な`catch`ブロックまたは関数です。
    -   `error()`: エラーオブジェクトを生成するか、エラー状態を処理します。
    -   `on()`: イベントリスナーを設定するための関数です。
        -   `escapeHtml` (`generated-docs/callgraph.js`): HTML特殊文字をエスケープし、スクリプトインジェクションを防ぐ安全な文字列を返します。
        -   `getLayoutConfig` (`generated-docs/callgraph.js`): グラフのレイアウト設定を取得します。
        -   `placeCentralNode` (`generated-docs/callgraph.js`): グラフの中央にノードを配置します。
        -   `showNodeInfo` (`generated-docs/callgraph.js`): 特定のノード（関数）の詳細情報を表示します。
        -   `showEdgeInfo` (`generated-docs/callgraph.js`): グラフのエッジ（呼び出し関係）の詳細情報を表示します。
        -   `hideInfoPanel` (`generated-docs/callgraph.js`): 画面上の情報パネルを非表示にします。
        -   `showInfoPanel` (`generated-docs/callgraph.js`): 画面上の情報パネルを表示します。
        -   `toggleInfoPanel` (`generated-docs/callgraph.js`): 情報パネルの表示/非表示を切り替えます。
        -   `generateGitHubURL` (`generated-docs/callgraph.js`): GitHubリポジトリへのURLを生成します。
        -   `resetLayout` (`generated-docs/callgraph.js`): グラフのレイアウトを初期状態にリセットします。
        -   `watchNodeMovementAndFixOverlapsWrap` (`generated-docs/callgraph.js`): ノードの移動を監視し、重なりを修正する処理をラップします。
        -   `watchNodeMovementAndFixOverlaps` (`generated-docs/callgraph.js`): ノードの動きを監視し、視覚的な重なりが発生した場合に位置を調整します。
        -   `resolveNodeOverlaps` (`generated-docs/callgraph.js`): 複数のノードが重なっている場合に、それらを適切に配置し直して重なりを解消します。
        -   `switchLayout` (`generated-docs/callgraph.js`): グラフの表示レイアウト（例: 円形、階層型）を切り替えます。
        -   `resetNodeStates` (`generated-docs/callgraph.js`): グラフ内のノードの表示状態（選択、ハイライトなど）をリセットします。
        -   `fitToContent` (`generated-docs/callgraph.js`): グラフ全体が画面内に収まるようにズームレベルや位置を調整します。
        -   `toggleNodeLabels` (`generated-docs/callgraph.js`): ノードに表示されるラベルの表示/非表示を切り替えます。
        -   `toggleCalleeLocationFilter` (`generated-docs/callgraph.js`): 呼び出し元/呼び出し先のフィルターを切り替えます。
        -   `replace` (`generated-docs/callgraph.js`): 文字列の置換処理を実行します。
        -   `function` (`generated-docs/callgraph.js`): 匿名関数またはコールバック関数。
        -   `max` (`generated-docs/callgraph.js`): 複数の数値の中から最大値を計算します。
        -   `ready` (`generated-docs/callgraph.js`): DOMContentLoadedイベント発生時に実行される処理を設定します。
        -   `addListener` (`generated-docs/callgraph.js`): イベントリスナーを追加します。
-   **mml2json** (`src/mml2json.js`): MML文字列を引数に取り、Tone.jsが解釈可能なJSONシーケンサー形式に変換して返します。
    -   `compileMmlToCommands()`: MMLを内部処理用のコマンドリストにコンパイルします。
    -   `getMmlCommands()`: パースされたMMLデータから音楽コマンドを抽出します。
    -   `calcAttackToReleaseTicks()`: 音の開始からリリースまでのティック数を計算します。
    -   `repeat()`: 特定の値を指定された回数繰り返します。
    -   `toInt()`: 値を整数型に変換します。
    -   `calcDuration()`: 音符の長さを計算します。
    -   `calcStartTick()`: 音符の開始ティックを計算します。
    -   `increaseStartTick()`: 現在の開始ティックを次の音符のために増加させます。
    -   `calcLtick()`: 音符の論理的なティック長を計算します。
    -   `getNodeId()`: ノードの一意のIDを取得します。
    -   `sort()`: 配列をソートします。
-   **play** (`src/play.js`): Tone.jsのJSONデータを引数に取り、Tone.jsライブラリを使用して実際に音楽を再生します。
    -   `sub()`: 減算処理を行います。
-   **switch** (`generated-docs/callgraph.js`): 複数の条件分岐を処理するためのJavaScriptの`switch`文。
-   **if** (`generated-docs/callgraph.js`): 条件付き実行のためのJavaScriptの`if`文。
-   **for** (`generated-docs/callgraph.js`): ループ処理のためのJavaScriptの`for`文。
-   **hex** (`src/grammar.js`): 16進数に関連する処理を行う関数。
    -   `unicodeEscape()`: Unicodeエスケープシーケンスを処理します。
    -   `literalEscape()`: リテラル文字のエスケープ処理を行います。
    -   `classEscape()`: 文字クラスのエスケープ処理を行います。
    -   `describeExpectation()`: 期待される構文要素を説明します。
    -   `describeExpected()`: 期待される複数の構文要素のリストを説明します。
    -   `describeFound()`: パース時に見つかった文字列を説明します。
    -   `peg$parse()`: Peggyパーサーのメインエントリポイントで、入力MML文字列を解析します。
    -   `peg$f0()`: Peggyパーサー内部で使用されるフォーマット関数です。
    -   `text()`: 現在のパース位置のテキストを返します。
    -   `offset()`: 現在のパースオフセット（位置）を返します。
    -   `range()`: 現在のパース範囲を返します。
    -   `location()`: 現在のパース位置情報（行、列など）を返します。
    -   `expected()`: 次に期待されるパース要素のリストを返します。
    -   `peg$getUnicode()`: Unicode文字を取得します。
    -   `peg$literalExpectation()`: リテラル期待値オブジェクトを生成します。
    -   `peg$classExpectation()`: 文字クラス期待値オブジェクトを生成します。
    -   `peg$anyExpectation()`: 任意の文字期待値オブジェクトを生成します。
    -   `peg$endExpectation()`: 入力終了期待値オブジェクトを生成します。
    -   `peg$otherExpectation()`: その他の期待値オブジェクトを生成します。
    -   `peg$computePosDetails()`: パース位置の詳細を計算します。
    -   `peg$computeLocation()`: パース位置情報を計算します。
    -   `peg$fail()`: パース失敗を記録します。
    -   `peg$buildSimpleError()`: シンプルなエラーオブジェクトを構築します。
    -   `peg$buildStructuredError()`: 構造化されたエラーオブジェクトを構築します。
    -   `peg$parsestart()`: `start`ルール（PEG文法で定義されたMMLの開始点）のパース処理を開始します。
    -   `peg$parsenote()`: `note`ルール（PEG文法で定義された音符）のパース処理を開始します。
    -   `peg$throw()`: パースエラーをスローします。
    -   `constructor()`: オブジェクトのインスタンスを初期化するための特殊なメソッドです。
-   **format()** (`src/grammar.js`): メッセージと引数を受け取り、整形された文字列を生成します。
-   **if()** (`src/grammar.js`): 条件付き実行のためのJavaScriptの`if`文。
-   **buildMessage()** (`src/grammar.js`): 期待される要素と見つかった要素からエラーメッセージを構築します。
-   **literal()** (`src/grammar.js`): 特定のリテラル文字列にマッチングを行います。
-   **class()** (`src/grammar.js`): 文字クラス（例: `[a-z]`）にマッチングを行います。
-   **any()** (`src/grammar.js`): 任意の単一文字にマッチングを行います。
-   **end()** (`src/grammar.js`): 入力文字列の終端にマッチングを行います。
-   **other()** (`src/grammar.js`): その他の期待される要素を記述します。
-   **for()** (`src/grammar.js`): ループ処理のためのJavaScriptの`for`文。
-   **switch()** (`src/grammar.js`): 複数の条件分岐を処理するためのJavaScriptの`switch`文。
-   **while()** (`src/grammar.js`): ループ処理のためのJavaScriptの`while`文。
-   **start** (`src/grammar.pegjs`): MML文法の開始ルールを定義します。
-   **note** (`src/grammar.pegjs`): MML文法における音符のルールを定義します。

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
Generated at: 2025-08-23 07:03:32 JST
