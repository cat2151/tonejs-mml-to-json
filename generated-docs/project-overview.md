Last updated: 2025-07-24

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の楽譜データを、Web Audio APIを活用した音楽データ形式へ変換します。
- 具体的には、MMLをブラウザ上で動作する音楽ライブラリTone.jsが解釈可能なJSONシーケンサーフォーマットに変換します。
- このプロジェクトにより、MMLを用いた音楽をWebブラウザ上で手軽に再生・シーケンスすることが可能になります。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーを構築するための標準マークアップ言語。
- 音楽・オーディオ:
  - Tone.js - Web Audio APIを抽象化し、ブラウザでの高度な音声処理を容易にするJavaScriptライブラリ。
  - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトへの組み込みを簡素化。
  - MML (Music Macro Language) - 音楽をテキストで記述するための記法。このプロジェクトではそのパーサーを扱います。
  - Web Audio API - ブラウザのネイティブな音声処理機能を提供し、Tone.jsを通じて利用されます。
- 開発ツール:
  - Node.js runtime - JavaScriptコードをサーバーサイドや開発環境で実行するためのランタイム環境。
  - npm scripts - package.jsonで定義されたスクリプトを実行し、開発タスクを自動化するツール。
  - pnpm - 高速でディスク効率の良いパッケージマネージャー。
  - Google Generative AI - AIによる文書生成、特にプロジェクト要約などのドキュメント作成をサポート。
  - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得やIssue管理などの自動化を可能にするライブラリ。
  - dotenv - 環境変数を管理し、機密情報などをコードから分離。
- テスト:
  - Vitest - 高速なViteベースのテストフレームワークで、JavaScript/TypeScriptコードの単体テストや統合テストに使用。
  - TDD (Test-Driven Development) - テストを先に書き、それに合わせてコードを開発する手法。
- ビルドツール:
  - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLのような特定文法の解析器を自動生成。
  - PEG文法定義 - MML音楽記法を解析するための文法ルールを記述したファイル。
- 言語機能:
  - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率化。
- 自動化・CI/CD:
  - GitHub Actions - リポジトリ上でのイベントに基づいて自動化ワークフローを実行するCI/CDサービス。
    - プロジェクト要約自動生成 - AIを利用してプロジェクトの概要ドキュメントを自動生成。
    - Issue自動管理 - GitHub Issuesの作成、更新、クローズなどを自動化。
    - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳。
    - i18n automation - 国際化（i18n）関連の自動翻訳ワークフロー。
- 開発標準:
  - EditorConfig - 異なるエディタやIDE間でコードのスタイル（インデント、改行など）を統一するための設定ファイル。

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
- **`.editorconfig`**: コードエディタ間の設定（インデントスタイル、文字コードなど）を統一し、一貫性のあるコードフォーマットを維持するための設定ファイルです。
- **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、依存関係のインストールディレクトリなど）を指定するファイルです。
- **`LICENSE`**: このプロジェクトのソフトウェアライセンス情報が記述されています。
- **`README.ja.md`**, **`README.md`**: それぞれ日本語版と英語版のプロジェクト説明ドキュメントです。プロジェクトの概要、セットアップ方法、使い方などが記載されています。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報や手順が記述されています。
- **`dev-setup/setup.js`**: 開発環境の初期設定や、開発に必要なツールやデータの準備を行うためのJavaScriptスクリプトです。
- **`generated-docs/`**: 自動生成されたドキュメントを格納するディレクトリです。
  - **`callgraph-enhanced.html`**: インタラクティブな関数呼び出しグラフを表示するためのHTMLファイルです。
  - **`callgraph.js`**: 関数呼び出しグラフのデータ処理、描画ロジック、およびインタラクティブ機能を提供するJavaScriptコードです。
  - **`development-status.md`**: プロジェクトの開発状況や進捗が記述されたドキュメントで、AIによって自動生成される可能性があります。
  - **`project-overview.md`**: プロジェクトの概要が記述されたドキュメントで、AIによって自動生成される可能性があります。
  - **`style.css`**: `generated-docs`内のHTMLドキュメント（特に呼び出しグラフ）のスタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのライブデモや、アプリケーションのメインのエントリーポイントとなる静的HTMLファイルです。
- **`issue-notes/`**: 開発中に発生した課題、検討事項、バグ報告などを記録したMarkdownファイル群が格納されています。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発依存関係、およびnpmスクリプトを定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーが生成するロックファイルで、プロジェクトの依存関係の正確なバージョンと構造を記録し、再現可能なビルドを保証します。
- **`src/`**: アプリケーションの主要なソースコードが格納されているディレクトリです。
  - **`grammar.js`**: `grammar.pegjs`からPeggyパーサージェネレーターによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、その構造を理解するために使用されます。
  - **`grammar.pegjs`**: MML (Music Macro Language) を解析するためのPEG (Parsing Expression Grammar) 文法が定義されたファイルです。このファイルが`grammar.js`を生成する元となります。
  - **`index.html`**: `src`ディレクトリ内のこのHTMLファイルは、MMLプレイヤーのフロントエンド部分を提供し、Web Audio APIとTone.jsを使用して音楽再生インターフェースを構築します。
  - **`main.js`**: アプリケーションのエントリーポイント、または主要な初期化ロジックを含むJavaScriptファイルです。
  - **`mml2json.js`**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する核心的なロジックが実装されているJavaScriptファイルです。
  - **`play.js`**: `mml2json.js`で生成されたJSONデータを受け取り、Tone.jsライブラリを介して実際に音を再生する機能を提供するJavaScriptファイルです。
- **`test/parser.test.js`**: MMLパーサー（`src/grammar.js`）の機能が正しく動作するかどうかを検証するためのテストコードです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境に関する設定が含まれています。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): エラー発生時に処理を捕捉し、適切なエラーハンドリングを行うための一般的な関数またはブロックです。具体的な処理内容は呼び出し元のコンテキストに依存します。
- **`escapeHtml`** (generated-docs/callgraph.js): HTML特殊文字（`<`, `>`, `&`など）をエンティティ参照に変換し、XSS（クロスサイトスクリプティング）攻撃を防ぎつつ、安全にHTMLコンテンツを表示できるようにする関数です。
- **`getLayoutConfig`** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトに関する設定情報を取得する関数です。グラフの表示方法やノードの配置ルールを決定します。
- **`placeCentralNode`** (generated-docs/callgraph.js): グラフの中心となるノード（関数）を配置する関数です。グラフの視覚的な開始点やフォーカルポイントを設定します。
- **`showNodeInfo`** (generated-docs/callgraph.js): グラフ上のノード（関数）が選択された際に、その関数の詳細情報（名前、ファイルパス、行数など）を専用のパネルに表示する関数です。
- **`showEdgeInfo`** (generated-docs/callgraph.js): グラフ上のエッジ（関数間の呼び出し関係）が選択された際に、その呼び出しの詳細情報（呼び出し元、呼び出し先など）を情報パネルに表示する関数です。
- **`hideInfoPanel`** (generated-docs/callgraph.js): 関数やエッジの詳細情報を表示している情報パネルを非表示にする関数です。
- **`showInfoPanel`** (generated-docs/callgraph.js): 関数やエッジの詳細情報を表示する情報パネルを表示する関数です。
- **`toggleInfoPanel`** (generated-docs/callgraph.js): 情報パネルの表示状態（表示/非表示）を切り替える関数です。
- **`generateGitHubURL`** (generated-docs/callgraph.js): グラフ上の要素（関数、ファイルなど）に関連するGitHubリポジトリ内のURL（例: ソースコードへのリンク）を生成する関数です。
- **`resetLayout`** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする関数です。ユーザーがレイアウトを変更した後、元の配置に戻したい場合などに使用されます。
- **`watchNodeMovementAndFixOverlapsWrap`** (generated-docs/callgraph.js): ノードの動きを監視し、他のノードとの重なりを修正する処理をラップする関数です。主にイベントリスナーとして機能します。
- **`watchNodeMovementAndFixOverlaps`** (generated-docs/callgraph.js): ノードが移動した際に、他のノードとの視覚的な重なりを防ぐために位置を調整する関数です。
- **`resolveNodeOverlaps`** (generated-docs/callgraph.js): 複数のノードが重なっている場合に、それらを適切に配置し直して重なりを解消する関数です。
- **`switchLayout`** (generated-docs/callgraph.js): 関数呼び出しグラフの異なるレイアウトアルゴリズム（例: 木構造、強制指向など）を切り替える関数です。
- **`resetNodeStates`** (generated-docs/callgraph.js): グラフ内のすべてのノードの状態（選択状態、ハイライトなど）を初期値にリセットする関数です。
- **`fitToContent`** (generated-docs/callgraph.js): グラフ全体が現在のビューポートに収まるようにズームレベルや位置を調整する関数です。
- **`toggleNodeLabels`** (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数です。
- **`toggleCalleeLocationFilter`** (generated-docs/callgraph.js): 呼び出し先関数の位置に基づいてフィルタリングを適用/解除する関数です。
- **`replace`, `function`, `max`, `on`, `if`, `for`, `ready`, `addListener`, `switch`** (generated-docs/callgraph.js): これらの関数はJavaScriptの組み込み関数、言語キーワード、または一般的なユーティリティ関数であり、`generated-docs/callgraph.js`内でグラフ描画やUIインタラクションのロジックの一部として利用されています。具体的な機能は呼び出しコンテキストによって異なりますが、それぞれ文字列置換、関数定義、最大値計算、イベントリスナー登録、条件分岐、繰り返し、DOM準備イベント、イベントリスナー追加、多分岐処理を行います。
- **`hex`, `unicodeEscape`, `literalEscape`, `classEscape`** (src/grammar.js): これらはPeggyによって生成されたパーサーの内部ヘルパー関数で、文字列リテラルや文字クラス、Unicodeエスケープシーケンスなどの正規表現や文字列解析におけるエスケープ処理を担当します。
- **`describeExpectation`, `describeExpected`, `describeFound`** (src/grammar.js): Peggyパーサーがパースエラーを報告する際に、期待された入力形式や実際に見つかった内容を分かりやすく説明するための内部ヘルパー関数です。
- **`peg$parse`** (src/grammar.js): Peggyパーサーのメインエントリポイントとなる関数で、MML文字列を受け取り、定義された文法に従って解析します。
- **`peg$f0`** (src/grammar.js): Peggyによって自動生成される、特定のルールに関連する内部的なファクトリ関数やヘルパー関数です。
- **`text`, `offset`, `range`, `location`, `expected`, `error`** (src/grammar.js): これらはパース中に現在のテキスト、オフセット（位置）、範囲、ソースコード上の場所、期待されるトークン、エラー情報などを管理するためのパーサー内部の状態変数や関数です。
- **`peg$getUnicode`** (src/grammar.js): Unicode文字の取得や処理に関連するPeggyパーサーの内部関数です。
- **`peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`** (src/grammar.js): Peggyがパース時に「期待されるもの」を表現するための内部的なオブジェクトを生成するヘルパー関数です。
- **`peg$computePosDetails`, `peg$computeLocation`** (src/grammar.js): パース中の現在位置の詳細（行、列など）や、エラーが発生した位置の正確な情報を計算するための内部関数です。
- **`peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$throw`** (src/grammar.js): パースが失敗した際にエラーを生成、構築、スローするためのPeggyパーサーの内部エラーハンドリング関数です。
- **`peg$parsestart`, `peg$parsenote`** (src/grammar.js): `src/grammar.pegjs`で定義された`start`と`note`というMMLの主要なパースルールに対応する具体的なパース処理を行う関数です。
- **`constructor`, `format`, `if`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while`** (src/grammar.js): これらはPeggyパーサーが自動生成する際に内部的に利用されるJavaScriptの基本的な構造やユーティリティ関数です。MMLの文法解析ロジックの一部として機能します。
- **`start`** (src/grammar.pegjs): MMLパーサーのルートとなる文法ルール定義です。MML文字列全体のパースを開始するエントリポイント。
- **`note`** (src/grammar.pegjs): MMLの個々の音符（例: `c4`, `e8`）を解析するための文法ルール定義です。
- **`mml2json`** (src/mml2json.js): MML文字列をTone.jsのシーケンサーが解釈できるJSONフォーマットに変換するメイン関数です。このプロジェクトの中核機能を提供します。
- **`compileMmlToCommands`** (src/mml2json.js): MML文字列を、処理しやすい中間的なコマンドリストにコンパイルする関数です。
- **`getMmlCommands`** (src/mml2json.js): MML文字列から個々の音楽コマンド（音符、休符、テンポ変更など）を抽出する関数です。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): 音符のアタック（発音）からリリース（消音）までの時間（ティック数）を計算する関数です。
- **`repeat`** (src/mml2json.js): MMLの繰り返し記号（例: `[cde]2`）を処理し、指定された回数分音楽コマンドを繰り返す関数です。
- **`toInt`** (src/mml2json.js): 文字列を安全に整数に変換するユーティリティ関数です。
- **`calcDuration`** (src/mml2json.js): MMLの音符の長さ指定（例: `4`, `8`）に基づいて、その持続時間（ティック数）を計算する関数です。
- **`calcStartTick`** (src/mml2json.js): 各音符やイベントがシーケンスのどの時間（ティック数）から開始するかを計算する関数です。
- **`increaseStartTick`** (src/mml2json.js): 現在のティック数を次のイベントの開始ティックに更新するために増加させる関数です。
- **`calcLtick`** (src/mml2json.js): MMLのLコマンド（音符のデフォルトの長さ設定）が指定された際に、それに対応するティック値を計算する関数です。
- **`getNodeId`** (src/mml2json.js): 特定のノード（音符やコマンド）にユニークなIDを割り当てる、または取得する関数です。
- **`sort`, `function`, `switch`, `for`, `if`** (src/mml2json.js): `mml2json.js`内でデータ構造のソート、匿名関数の定義、条件分岐、繰り返し処理など、変換ロジックを構成する基本的なJavaScriptの制御構造やユーティリティ関数です。
- **`play`** (src/play.js): 変換されたTone.js JSONシーケンスデータを受け取り、Tone.jsライブラリを使用して実際に音楽を再生する関数です。
- **`sub`** (src/play.js): `play`関数から呼び出される補助的な関数です。特定のサブタスクや計算を実行するために使用されます。
- **`catch`** (src/play.js): `play`関数またはその内部で発生したエラーを捕捉し、適切に処理するためのエラーハンドリング関数またはブロックです。
- **`switch`, `if`** (src/play.js): `play`関数内で異なる音楽イベントタイプに応じた処理を分岐させたり、条件に基づいてロジックを実行したりするためのJavaScriptの制御フロー構造です。

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
Generated at: 2025-07-24 07:04:01 JST
