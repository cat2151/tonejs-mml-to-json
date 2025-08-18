Last updated: 2025-08-19

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）形式で記述された音楽データを解析するツールです。
- 解析されたMMLデータを、Web Audio APIライブラリであるTone.jsのシーケンサーが解釈可能なJSON形式に変換します。
- この変換により、Webブラウザ上でMMLベースの楽曲を簡単に再生・シーケンスできるようになります。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのユーザーインターフェースを構築し、MMLプレイヤーの機能を提供します。)
- 音楽・オーディオ:
    - Tone.js (Web Audio APIを抽象化し、ブラウザでの高機能な音声合成やシーケンスを可能にするJavaScriptライブラリです。)
    - Tone.js CDN (unpkgを通じてTone.jsライブラリを効率的に配信し、利用を容易にします。)
    - MML (Music Macro Language) (音楽をテキストで記述するための簡易的な記法を指し、このプロジェクトではそのパーサーを実装しています。)
    - Web Audio API (ブラウザに標準で搭載されている音声処理機能で、Tone.jsはこのAPIを基盤として動作します。)
- 開発ツール:
    - Node.js runtime (プロジェクトのJavaScriptコード実行環境として使用されます。)
    - npm scripts (プロジェクトのビルド、テスト、ドキュメント生成などのタスクを自動化するために定義されたスクリプト群です。)
    - pnpm (パッケージのインストールを高速かつ効率的に行うためのパッケージマネージャーです。)
    - Google Generative AI (プロジェクトの文書（例えば、この概要など）の自動生成を支援するために利用されます。)
    - @octokit/rest (GitHub APIと連携し、Issue管理や自動化ワークフローなどに利用されます。)
- テスト:
    - Vitest (Viteをベースとした高速な単体テストフレームワークで、コードの品質と信頼性を保証します。)
    - TDD (Test-Driven Development) (テストを先に記述し、それに合格するようにコードを開発する手法を採用しています。)
- ビルドツール:
    - Peggy (Parsing Expression Grammar (PEG) に基づくパーサージェネレーターで、MMLの文法解析エンジンを自動生成します。)
    - PEG文法定義 (MML音楽記法のパーサーを生成するために使用される文法規則の記述ファイルです。)
- 言語機能:
    - ES Modules (モダンなJavaScriptのモジュールシステムで、コードの分割と再利用性を高めます。)
- 自動化・CI/CD:
    - GitHub Actions (継続的インテグレーション/継続的デリバリー (CI/CD) のための自動化プラットフォームで、以下のワークフローが自動実行されます。)
        - プロジェクト要約自動生成 (プロジェクトの概要文書などを自動的に生成します。)
        - Issue自動管理 (GitHub Issuesの管理を自動化し、開発プロセスの効率化を図ります。)
        - README多言語翻訳 (READMEファイルを複数の言語に自動翻訳します。)
        - i18n automation (国際化対応のための自動翻訳ワークフローです。)
- 開発標準:
    - EditorConfig (異なるエディタやIDEを使用する開発者間で、インデントスタイルや文字コードなどのコードフォーマットを統一するための設定ファイルです。)

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
-   **`.editorconfig`**: 異なる開発環境間でのコードスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
-   **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定します（例: ビルド成果物、依存関係モジュール）。
-   **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
-   **`README.ja.md`**, **`README.md`**: プロジェクトの概要、使い方、開発方法などを説明するドキュメントです。それぞれ日本語版と英語版です。
-   **`dev-setup/README.md`**: 開発環境のセットアップ手順に関する情報を提供します。
-   **`dev-setup/setup.js`**: 開発環境のセットアップや初期化に関連するスクリプトです。
-   **`generated-docs/`**: 自動生成されたドキュメントやレポートを格納するディレクトリです。
    -   **`generated-docs/callgraph-enhanced.html`**: 関数呼び出し階層を視覚的に表現するインタラクティブなHTMLドキュメントです。
    -   **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で呼び出し階層グラフを生成・操作するためのJavaScriptコードです。
    -   **`generated-docs/development-status.md`**: プロジェクトの現在の開発状況や進捗に関する情報です。
    -   **`generated-docs/project-overview.md`**: このプロジェクト概要自体が自動生成されて格納されるファイルです。
    -   **`generated-docs/style.css`**: `callgraph-enhanced.html`などの自動生成ドキュメントのスタイルを定義するCSSファイルです。
-   **`index.html` (ルート)**: プロジェクトのデモやメインアプリケーションのエントリーポイントとなるHTMLファイルです。
-   **`issue-notes/`**: GitHub Issuesに関連するメモや詳細情報を格納するディレクトリです。開発プロセスにおける課題や議論の記録です。
-   **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
-   **`pnpm-lock.yaml`**: pnpmパッケージマネージャーが生成する、インストールされたパッケージの厳密な依存関係ツリーとバージョンを記録するファイルです。
-   **`src/`**: プロジェクトのソースコードを格納するディレクトリです。
    -   **`src/grammar.js`**: `src/grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構文木を構築します。
    -   **`src/grammar.pegjs`**: MML（Music Macro Language）の文法規則を定義するPEG (Parsing Expression Grammar) ファイルです。この定義に基づいて`src/grammar.js`が生成されます。
    -   **`src/index.html`**: `src`ディレクトリ内のデモやテスト用のHTMLファイルです。
    -   **`src/main.js`**: アプリケーションのメインロジックや初期化処理を担うJavaScriptファイルです。
    -   **`src/mml2json.js`**: MMLパーサーによって生成された構文木を、Tone.jsのシーケンサーが理解できるJSONフォーマットに変換する主要なロジックが実装されています。
    -   **`src/play.js`**: 変換されたTone.js JSONデータを使用して、Web Audio APIを介して実際に音楽を再生する機能を提供します。
-   **`test/parser.test.js`**: MMLパーサー（`src/grammar.js`）の機能と正確性を検証するための単体テストコードです。
-   **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。テストの実行方法や環境が定義されています。

## 関数詳細説明
-   **`catch` (dev-setup/setup.js)**: エラーハンドリングのための一般的なブロック/関数です。主に非同期処理などで発生した例外を捕捉し、適切に処理するために使用されます。
-   **`escapeHtml` (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、安全に表示するためのユーティリティ関数です。
-   **`getLayoutConfig` (generated-docs/callgraph.js)**: グラフのレイアウト設定を取得するための関数です。
-   **`placeCentralNode` (generated-docs/callgraph.js)**: グラフの中心ノードを配置するための関数です。
-   **`showNodeInfo` (generated-docs/callgraph.js)**: グラフのノード（関数など）に関する情報を表示する関数です。
-   **`showEdgeInfo` (generated-docs/callgraph.js)**: グラフのエッジ（呼び出し関係）に関する情報を表示する関数です。
-   **`hideInfoPanel` (generated-docs/callgraph.js)**: 情報パネルを非表示にする関数です。
-   **`showInfoPanel` (generated-docs/callgraph.js)**: 情報パネルを表示する関数です。
-   **`toggleInfoPanel` (generated-docs/callgraph.js)**: 情報パネルの表示/非表示を切り替える関数です。
-   **`generateGitHubURL` (generated-docs/callgraph.js)**: GitHubの特定のファイルや行へのURLを生成する関数です。
-   **`resetLayout` (generated-docs/callgraph.js)**: グラフのレイアウトを初期状態にリセットする関数です。
-   **`watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正する処理をラップする関数です。
-   **`watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js)**: ノードの動きを監視し、他のノードとの重なりを解決する関数です。
-   **`resolveNodeOverlaps` (generated-docs/callgraph.js)**: ノード間の重なりを解決し、視認性を高める関数です。
-   **`switchLayout` (generated-docs/callgraph.js)**: グラフのレイアウトアルゴリズムを切り替える関数です。
-   **`resetNodeStates` (generated-docs/callgraph.js)**: ノードの状態（選択状態など）をリセットする関数です。
-   **`fitToContent` (generated-docs/callgraph.js)**: グラフ全体がビューポートに収まるようにズームレベルを調整する関数です。
-   **`toggleNodeLabels` (generated-docs/callgraph.js)**: ノードのラベル表示を切り替える関数です。
-   **`toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: 呼び出し先の位置によるフィルタリングを切り替える関数です。
-   **`replace` (generated-docs/callgraph.js)**: 文字列置換などの汎用的な処理を行う関数です。
-   **`function` (generated-docs/callgraph.js)**: JavaScriptの`function`キーワードに関連する、コールバックなどで動的に使用される可能性のある参照です。
-   **`max` (generated-docs/callgraph.js)**: 最大値を計算する汎用的な関数です。
-   **`on` (generated-docs/callgraph.js)**: イベントリスナーを登録する際に使用されることが多い関数です。
-   **`if` (generated-docs/callgraph.js)**: 条件分岐の制御フローを表すJavaScriptのキーワードですが、このコンテキストではCy.jsなどのライブラリの内部で動的に生成・参照される可能性があります。
-   **`for` (generated-docs/callgraph.js)**: 繰り返し処理の制御フローを表すJavaScriptのキーワードですが、同様に内部的な参照としてリストされている可能性があります。
-   **`ready` (generated-docs/callgraph.js)**: DOMやライブラリの準備が完了した際に実行されるコールバックやイベント名です。
-   **`addListener` (generated-docs/callgraph.js)**: イベントリスナーを追加するための関数です。
-   **`mml2json` (src/mml2json.js)**: MML文字列を解析し、Tone.jsのシーケンサーが利用できるJSON形式に変換する主要な関数です。
    -   *引数*: MML文字列
    -   *戻り値*: Tone.jsシーケンサー向けのJSONオブジェクト
-   **`compileMmlToCommands` (src/mml2json.js)**: MMLをより具体的な内部コマンドのリストに変換する処理を担当します。
-   **`getMmlCommands` (src/mml2json.js)**: MMLコマンドを取得・解析する内部的な関数です。
-   **`calcAttackToReleaseTicks` (src/mml2json.js)**: 音符のアタックからリリースまでのtick数を計算します。
-   **`repeat` (src/mml2json.js)**: MMLの繰り返し記号を処理するための関数です。
-   **`toInt` (src/mml2json.js)**: 値を整数に変換するユーティリティ関数です。
-   **`calcDuration` (src/mml2json.js)**: 音符や休符のデュレーション（長さ）を計算します。
-   **`calcStartTick` (src/mml2json.js)**: イベントの開始tick位置を計算します。
-   **`increaseStartTick` (src/mml2json.js)**: 開始tick位置を増加させる関数です。
-   **`calcLtick` (src/mml2json.js)**: 特定の長さのtick値を計算します。
-   **`getNodeId` (src/mml2json.js)**: 内部でノードに一意のIDを割り当てるための関数です。
-   **`sort` (src/mml2json.js)**: 配列のソートを行う汎用的な関数です。
-   **`play` (src/play.js)**: 変換されたTone.js JSONデータを受け取り、Tone.jsライブラリを介して音楽を再生する機能を提供します。
    -   *引数*: Tone.jsシーケンスJSONデータ
    -   *戻り値*: なし（音楽再生を実行）
-   **`sub` (src/play.js)**: 減算処理やサブシーケンス処理など、再生に関連する補助関数です。
-   **`switch` (generated-docs/callgraph.js, src/mml2json.js, src/play.js, src/grammar.js)**: プログラムの条件分岐を制御するJavaScriptの`switch`文に関連する記述です。各ファイル内で、複数の条件に応じた異なる処理を実行するために使用されます。
-   **`if` (generated-docs/callgraph.js, src/mml2json.js, src/play.js, src/grammar.js)**: プログラムの条件分岐を制御するJavaScriptの`if`文に関連する記述です。特定の条件が真である場合にコードブロックを実行するために使用されます。
-   **`for` (generated-docs/callgraph.js, src/mml2json.js, src/grammar.js)**: 繰り返し処理を制御するJavaScriptの`for`文に関連する記述です。配列の要素を処理したり、特定回数処理を繰り返したりするために使用されます。
-   **`hex` (src/grammar.js)**: 16進数を処理するためのパーサー内部関数です。
-   **`unicodeEscape` (src/grammar.js)**: Unicodeエスケープシーケンスを処理するためのパーサー内部関数です。
-   **`literalEscape` (src/grammar.js)**: 文字列リテラルのエスケープシーケンスを処理するためのパーサー内部関数です。
-   **`classEscape` (src/grammar.js)**: 文字クラスのエスケープシーケンスを処理するためのパーサー内部関数です。
-   **`describeExpectation` (src/grammar.js)**: パーサーのエラーメッセージ生成時に、期待される入力を記述するための関数です。
-   **`describeExpected` (src/grammar.js)**: 期待された入力形式を説明する関数です。
-   **`describeFound` (src/grammar.js)**: 解析中に見つかった実際の入力を説明する関数です。
-   **`peg$parse` (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリポイントとなる関数です。MML文字列を解析し、結果を返します。
    -   *引数*: 解析対象のMML文字列
    -   *戻り値*: 解析された構文木またはエラー情報
-   **`peg$f0` (src/grammar.js)**: Peggyパーサー内部で使用される匿名関数または補助関数です。
-   **`text` (src/grammar.js)**: 現在解析中のテキストを取得するパーサー内部関数です。
-   **`offset` (src/grammar.js)**: 現在の解析オフセット（位置）を取得するパーサー内部関数です。
-   **`range` (src/grammar.js)**: 現在の解析範囲を取得するパーサー内部関数です。
-   **`location` (src/grammar.js)**: 現在の解析位置情報（行、列など）を取得するパーサー内部関数です。
-   **`expected` (src/grammar.js)**: パーサーが次に期待する入力要素に関する情報を持つオブジェクトまたは関数です。
-   **`error` (src/grammar.js)**: パーサーのエラーを生成または報告する関数です。
-   **`peg$getUnicode` (src/grammar.js)**: Unicode文字を取得するためのパーサー内部関数です。
-   **`peg$literalExpectation` (src/grammar.js)**: リテラル文字列の期待値を作成するパーサー内部関数です。
-   **`peg$classExpectation` (src/grammar.js)**: 文字クラスの期待値を作成するパーサー内部関数です。
-   **`peg$anyExpectation` (src/grammar.js)**: 任意の文字の期待値を作成するパーサー内部関数です。
-   **`peg$endExpectation` (src/grammar.js)**: 入力の終端の期待値を作成するパーサー内部関数です。
-   **`peg$otherExpectation` (src/grammar.js)**: その他の期待値を作成するパーサー内部関数です。
-   **`peg$computePosDetails` (src/grammar.js)**: 解析位置の詳細を計算するパーサー内部関数です。
-   **`peg$computeLocation` (src/grammar.js)**: エラーや結果の位置情報を計算するパーサー内部関数です。
-   **`peg$fail` (src/grammar.js)**: 解析失敗時に使用されるパーサー内部関数です。
-   **`peg$buildSimpleError` (src/grammar.js)**: シンプルなエラーオブジェクトを構築するパーサー内部関数です。
-   **`peg$buildStructuredError` (src/grammar.js)**: 構造化されたエラーオブジェクトを構築するパーサー内部関数です。
-   **`peg$parsestart` (src/grammar.js)**: MML文法の解析開始ルールに対応するパーサー内部関数です。
-   **`peg$parsenote` (src/grammar.js)**: MMLの音符ルールに対応するパーサー内部関数です。
-   **`peg$throw` (src/grammar.js)**: パーサー内部でエラーをスローするための関数です。
-   **`constructor` (src/grammar.js)**: JavaScriptクラスのコンストラクタ。通常、新しいオブジェクトのインスタンスが作成されるときに初期化処理を実行します。
-   **`format` (src/grammar.js)**: 文字列やデータの整形を行うための汎用的な関数です。
-   **`buildMessage` (src/grammar.js)**: エラーメッセージなどを構築するための関数です。
-   **`literal` (src/grammar.js)**: リテラル（固定文字列）の処理に関連する関数です。
-   **`class` (src/grammar.js)**: 文字クラスの処理に関連する関数です。
-   **`any` (src/grammar.js)**: 任意の文字の処理に関連する関数です。
-   **`end` (src/grammar.js)**: 解析終端の処理に関連する関数です。
-   **`other` (src/grammar.js)**: その他のパーサー内部処理に関連する関数です。
-   **`while` (src/grammar.js)**: 繰り返し処理を制御するJavaScriptの`while`文に関連する記述です。
-   **`start` (src/grammar.pegjs)**: `src/grammar.pegjs`ファイル内で定義されている、MML解析の開始点となるPEG文法ルールです。
-   **`note` (src/grammar.pegjs)**: `src/grammar.pegjs`ファイル内で定義されている、MMLの音符（ノート）を解析するためのPEG文法ルールです。

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
Generated at: 2025-08-19 07:03:43 JST
