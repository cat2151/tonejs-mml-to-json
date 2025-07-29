Last updated: 2025-07-30

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Web Audio APIライブラリTone.jsが利用可能なJSONシーケンサー形式に変換するコンバーターです。
- このプロジェクトは、Webブラウザ上でMMLベースの音楽を手軽に再生・編集できる環境を提供し、プログラマブルな音楽表現を可能にします。
- パーサー生成にはPEG.jsを、テストにはVitestを、そして多言語対応や自動文書生成にGitHub Actionsを活用し、開発の効率と品質を追求しています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして機能し、ユーザーインターフェースを構築します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、高品質な音声合成とシーケンス機能を提供するJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトでの利用を容易にします。
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法であり、このプロジェクトの入力フォーマットです。
    - Web Audio API - ブラウザに内蔵された音声処理APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境です。
    - npm scripts - package.jsonに定義されたスクリプトを実行するタスクランナーとして使用されます。
    - pnpm - 高速でディスク効率の良いパッケージマネージャーです。
    - Google Generative AI - AIによる文書生成、特にプロジェクト要約などのサポートに利用されます。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得やIssue管理などの自動化を可能にします。
- テスト:
    - Vitest - Viteをベースにした高速なテストフレームワークで、効率的なテスト実行をサポートします。
    - TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法で、品質の高いコードを保証します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) を使用してパーサーを自動生成するツールです。
    - PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールを定義します。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率的に行います。
- 自動化・CI/CD:
    - GitHub Actions - コードのテスト、ビルド、デプロイなどのワークフローを自動化するCI/CDプラットフォームです。
        - プロジェクト要約自動生成 - プロジェクトの概要文書を自動で作成します。
        - Issue自動管理 - GitHub Issueの管理を自動化し、開発効率を高めます。
        - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳します。
        - i18n automation - 国際化対応のための自動翻訳ワークフローです。
- 開発標準:
    - EditorConfig - 異なるエディタやIDE間でコードの書式設定（インデント、改行コードなど）を統一するための設定ファイルです。

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
- **`.editorconfig`**: プロジェクト全体でコードの書式設定（インデントスタイル、文字コードなど）を統一するための設定ファイルです。
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定します。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md` / `README.md`**: プロジェクトの概要、セットアップ方法、使い方などが記述されたドキュメントファイル（日本語版と英語版）です。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報が記述されたドキュメントです。
- **`dev-setup/setup.js`**: 開発環境の初期設定や特定のタスク実行を自動化するためのJavaScriptスクリプトです。テスト環境の準備などに関わる可能性があります。
- **`generated-docs/callgraph-enhanced.html`**: 自動生成された関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
- **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画ロジック、ノード情報の表示、レイアウト調整などのインタラクティブ機能を提供するJavaScriptファイルです。
- **`generated-docs/development-status.md`**: プロジェクトの開発状況に関する情報が記述されたドキュメントです。
- **`generated-docs/project-overview.md`**: プロジェクトの概要を自動生成する際に利用される、または生成結果が格納されるドキュメントです。
- **`generated-docs/style.css`**: `generated-docs`ディレクトリ内のHTMLファイル（特に呼び出しグラフ）のスタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのルートにあるメインのHTMLファイルで、Webアプリケーションのエントリーポイントやデモページとして機能します。
- **`issue-notes/*.md`**: GitHub Issueに関連するメモや詳細情報が個別のMarkdownファイルとして保存されています（来訪者向けには内容は非公開）。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプトなど）と、依存関係（dependenciesとdevDependencies）が定義されたファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーが生成するロックファイルで、依存関係の正確なバージョンを記録し、ビルドの再現性を保証します。
- **`src/grammar.js`**: `src/grammar.pegjs`ファイルからPeggyによって生成されたJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）などの形式に変換するためのパーサーロジックを含みます。
- **`src/grammar.pegjs`**: MML (Music Macro Language) の文法ルールをPEG (Parsing Expression Grammar) 形式で定義したファイルです。この定義に基づいて`src/grammar.js`が生成されます。
- **`src/index.html`**: `src`ディレクトリ内のHTMLファイルで、おそらくMMLプレイヤーのメインインターフェースやデモページを提供します。
- **`src/main.js`**: アプリケーションの主要なロジックのエントリーポイントであり、MMLの変換やTone.jsを使った再生処理を統合します。
- **`src/mml2json.js`**: MML文字列を解析し、Tone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックが実装されています。MMLコマンドの解釈、時間計算、JSON構造の構築を行います。
- **`src/play.js`**: `mml2json.js`で生成されたTone.js JSONデータを受け取り、Web Audio API (Tone.js) を通じて実際にMMLの音楽を再生する機能を提供します。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性と期待通りの動作を検証するためのテストコードです。Vitestフレームワークを使用します。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルで、テストの実行オプションや環境設定を定義します。

## 関数詳細説明
- **`catch` (dev-setup/setup.js)**: エラーハンドリングのための一般的なJavaScriptのキーワードですが、このファイルでは特定のセットアップ処理中に発生した例外を捕捉し、適切に処理する役割を担います。
- **`escapeHtml` (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティを向上させる関数です。呼び出しグラフのUIで表示されるテキストが安全にレンダリングされるようにします。
- **`getLayoutConfig` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトに関する設定を取得する関数です。ノードの配置や接続線の描画スタイルなどを決定する情報を提供します。
- **`placeCentralNode` (generated-docs/callgraph.js)**: 呼び出しグラフの中央に特定のノードを配置するための関数です。
- **`showNodeInfo` (generated-docs/callgraph.js)**: 呼び出しグラフ上のノード（関数）に関する詳細情報を表示するための関数です。
- **`showEdgeInfo` (generated-docs/callgraph.js)**: 呼び出しグラフ上のエッジ（関数間の呼び出し関係）に関する詳細情報を表示するための関数です。
- **`hideInfoPanel` (generated-docs/callgraph.js)**: グラフの詳細情報表示パネルを非表示にする関数です。
- **`showInfoPanel` (generated-docs/callgraph.js)**: グラフの詳細情報表示パネルを表示にする関数です。
- **`toggleInfoPanel` (generated-docs/callgraph.js)**: グラフの詳細情報表示パネルの表示/非表示を切り替える関数です。
- **`generateGitHubURL` (generated-docs/callgraph.js)**: GitHubリポジトリ内のファイルやコミットへのURLを生成する関数です。
- **`resetLayout` (generated-docs/callgraph.js)**: 呼び出しグラフの表示レイアウトを初期状態にリセットする関数です。
- **`watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正する処理をラップする関数です。
- **`watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js)**: 呼び出しグラフのノードが移動した際に、他のノードとの重なりを検出し、自動で調整する機能を提供します。
- **`resolveNodeOverlaps` (generated-docs/callgraph.js)**: ノードの重なりを具体的なアルゴリズムで解決し、視認性を高める関数です。
- **`switchLayout` (generated-docs/callgraph.js)**: 呼び出しグラフの表示レイアウト（例えば、ツリー形式や放射状など）を切り替える関数です。
- **`resetNodeStates` (generated-docs/callgraph.js)**: グラフ内のノードの選択状態やハイライトなどをリセットする関数です。
- **`fitToContent` (generated-docs/callgraph.js)**: グラフ全体がビューポート内に収まるように拡大縮小やパンを調整する関数です。
- **`toggleNodeLabels` (generated-docs/callgraph.js)**: グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- **`toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: 呼び出し先関数のファイルパスによるフィルタリングを切り替える関数です。
- **`replace` (generated-docs/callgraph.js)**: 文字列内の特定のパターンを置換するための一般的な処理です。
- **`function` (generated-docs/callgraph.js)**: JavaScriptの関数定義キーワードですが、この文脈では匿名関数やコールバック関数を指す可能性があります。
- **`max` (generated-docs/callgraph.js)**: 数値の最大値を計算する一般的な機能、または配列の最大値を求める関数です。
- **`on` (generated-docs/callgraph.js)**: イベントリスナーを設定するための一般的な関数名です。特定のイベントが発生した際にコールバック関数を実行します。
- **`if` (generated-docs/callgraph.js)**: 条件分岐のための一般的なキーワードです。
- **`for` (generated-docs/callgraph.js)**: 繰り返し処理のための一般的なキーワードです。
- **`ready` (generated-docs/callgraph.js)**: DOMが完全にロードされたときに実行されるイベントを指すことが多いです（例: jQueryの`$(document).ready()`）。
- **`addListener` (generated-docs/callgraph.js)**: イベントリスナーを追加するための一般的な関数名です。
- **`mml2json` (src/mml2json.js)**: MML文字列をTone.js JSONシーケンサーフォーマットに変換するメイン関数です。MMLの構文を解析し、音楽イベントのタイムラインをJSONとして出力します。
    - 引数: MML文字列
    - 戻り値: Tone.js JSONシーケンサーフォーマットのオブジェクト
- **`compileMmlToCommands` (src/mml2json.js)**: MML文字列を内部的なMMLコマンドの配列にコンパイルする関数です。
- **`getMmlCommands` (src/mml2json.js)**: MMLコマンドを抽出・解析するためのヘルパー関数です。
- **`calcAttackToReleaseTicks` (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算する関数です。
- **`repeat` (src/mml2json.js)**: MMLの繰り返し記号を処理するための関数です。
- **`toInt` (src/mml2json.js)**: 値を整数に変換するヘルパー関数です。
- **`calcDuration` (src/mml2json.js)**: 音符のデュレーション（長さ）を計算する関数です。
- **`calcStartTick` (src/mml2json.js)**: 音符の開始ティック（時間単位）を計算する関数です。
- **`increaseStartTick` (src/mml2json.js)**: 開始ティックを指定された量だけ増加させる関数です。
- **`calcLtick` (src/mml2json.js)**: MMLのレガートティックを計算する関数です。
- **`getNodeId` (src/mml2json.js)**: ノードに一意のIDを付与するヘルパー関数です。
- **`sort` (src/mml2json.js)**: 配列をソートするための一般的なJavaScriptのメソッドですが、このファイルではMMLコマンドの順序付けなどに使用される可能性があります。
- **`play` (src/play.js)**: Tone.js JSONデータを受け取り、Web Audio API（Tone.js）を使用して実際に音楽を再生する関数です。
    - 引数: Tone.js JSONシーケンサーデータ
    - 戻り値: なし（音を再生する副作用を持つ）
- **`sub` (src/play.js)**: 減算処理を行うヘルパー関数、または購読（subscribe）のような処理を指す可能性もあります。
- **`hex` (src/grammar.js)**: 16進数に関連する処理を行う関数です。PEG.jsで生成されたパーサーの内部関数の一部として、文字コードの処理などに使われます。
- **`unicodeEscape` (src/grammar.js)**: Unicodeエスケープシーケンスを処理するパーサー内部の関数です。
- **`literalEscape` (src/grammar.js)**: リテラルエスケープシーケンスを処理するパーサー内部の関数です。
- **`classEscape` (src/grammar.js)**: 文字クラスエスケープシーケンスを処理するパーサー内部の関数です。
- **`describeExpectation` (src/grammar.js)**: パーサーのエラーメッセージ生成に使用される、期待されるトークンを記述する関数です。
- **`describeExpected` (src/grammar.js)**: パーサーのエラーメッセージにおいて、期待された入力を記述する関数です。
- **`describeFound` (src/grammar.js)**: パーサーのエラーメッセージにおいて、実際に見つかった入力を記述する関数です。
- **`peg$parse` (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリポイント関数です。入力文字列を解析します。
- **`peg$f0` (src/grammar.js)**: Peggyによって生成されたパーサーの内部で使われる匿名関数やヘルパー関数です。
- **`text` (src/grammar.js)**: 現在解析中のテキストを取得するパーサー内部の関数です。
- **`offset` (src/grammar.js)**: 現在の解析オフセット（位置）を取得するパーサー内部の関数です。
- **`range` (src/grammar.js)**: 解析中の現在の範囲（開始と終了オフセット）を取得するパーサー内部の関数です。
- **`location` (src/grammar.js)**: 現在の解析位置（行、列、オフセット）を取得するパーサー内部の関数です。
- **`expected` (src/grammar.js)**: パーサーが期待している入力に関する情報を取得するパーサー内部の関数です。
- **`error` (src/grammar.js)**: エラーオブジェクトを生成する一般的なJavaScriptのコンストラクタですが、この文脈ではパーシングエラーの発生を示すために使われます。
- **`peg$getUnicode` (src/grammar.js)**: Unicode文字を取得するためのパーサー内部の関数です。
- **`peg$literalExpectation` (src/grammar.js)**: リテラル（固定文字列）が期待される場合のパーサー内部表現です。
- **`peg$classExpectation` (src/grammar.js)**: 文字クラス（例: `[a-z]`）が期待される場合のパーサー内部表現です。
- **`peg$anyExpectation` (src/grammar.js)**: 任意の一文字が期待される場合のパーサー内部表現です。
- **`peg$endExpectation` (src/grammar.js)**: 入力終了が期待される場合のパーサー内部表現です。
- **`peg$otherExpectation` (src/grammar.js)**: その他の期待されるパターンを示すパーサー内部表現です。
- **`peg$computePosDetails` (src/grammar.js)**: 解析位置の詳細情報（行、列など）を計算するパーサー内部の関数です。
- **`peg$computeLocation` (src/grammar.js)**: 解析中の現在の位置情報を計算するパーサー内部の関数です。
- **`peg$fail` (src/grammar.js)**: パーシングが失敗したことを示すパーサー内部の関数です。
- **`peg$buildSimpleError` (src/grammar.js)**: シンプルなパーシングエラーオブジェクトを構築するパーサー内部の関数です。
- **`peg$buildStructuredError` (src/grammar.js)**: より詳細な構造化されたパーシングエラーオブジェクトを構築するパーサー内部の関数です。
- **`peg$parsestart` (src/grammar.js)**: MMLパーサーの開始ルールを処理する関数です。
- **`peg$parsenote` (src/grammar.js)**: MMLパーサーの音符ルールを処理する関数です。
- **`peg$throw` (src/grammar.js)**: パーシングエラーをスローするためのパーサー内部の関数です。
- **`constructor` (src/grammar.js)**: JavaScriptオブジェクトのコンストラクタ関数です。
- **`format` (src/grammar.js)**: 文字列のフォーマットを行う関数です。
- **`buildMessage` (src/grammar.js)**: エラーメッセージを構築するパーサー内部の関数です。
- **`literal` (src/grammar.js)**: リテラル文字列を扱うパーサー内部の関数です。
- **`class` (src/grammar.js)**: 文字クラスを扱うパーサー内部の関数です。
- **`any` (src/grammar.js)**: 任意の一文字を扱うパーサー内部の関数です。
- **`end` (src/grammar.js)**: 入力の終端を扱うパーサー内部の関数です。
- **`other` (src/grammar.js)**: その他のパーサー要素を扱うパーサー内部の関数です。
- **`while` (src/grammar.js)**: 繰り返し処理のための一般的なキーワードです。
- **`start` (src/grammar.pegjs)**: `grammar.pegjs`で定義されたMMLの解析開始点となるルールです。
- **`note` (src/grammar.pegjs)**: `grammar.pegjs`で定義されたMMLの音符を解析するためのルールです。

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
Generated at: 2025-07-30 07:03:53 JST
