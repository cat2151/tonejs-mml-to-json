Last updated: 2025-07-29

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサー形式に変換するツールです。
- 変換されたデータはTone.jsを通じてWeb Audio APIでブラウザ上で音楽再生に利用されます。
- 音楽記法パーサーや音声ライブラリを組み合わせ、MMLを手軽に演奏可能にする目的で開発されています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されます。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザで高度な音声処理を行うためのJavaScriptライブラリです。Tone.js CDN (unpkg経由) - Tone.jsライブラリを効率的に配信・利用するためのCDNです。MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法であり、このプロジェクトのパーシング対象です。Web Audio API - ブラウザに組み込まれた音声処理APIであり、Tone.jsがこれを活用して音声を生成・操作します。
- 開発ツール: Node.js runtime - JavaScriptアプリケーションの実行環境です。npm scripts - `package.json`に定義されたスクリプトを実行するためのタスクランナーです。pnpm - 高速でディスク効率の良いパッケージマネージャーです。Google Generative AI - プロジェクトの文書生成などを支援するために利用されます。@octokit/rest - GitHub APIと連携し、リポジトリ情報を取得・操作するために使用されます。
- テスト: Vitest - Viteをベースとした高速なユニットテストフレームワークです。TDD (Test-Driven Development) - テストを先に書き、それに合わせてコードを開発する手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) 形式で記述された文法定義からJavaScriptパーサーを生成するツールです。PEG文法定義 - MML音楽記法を解析するための文法ルールを定義するファイルです。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムであり、コードの依存関係管理とバンドル効率化に貢献します。
- 自動化・CI/CD: GitHub Actions - CI/CD (継続的インテグレーション/継続的デリバリー) を自動化するためのワークフロープラットフォームです。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationといった複数の自動化ワークフローが設定されています。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。

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
- **`.editorconfig`**: エディタの設定を統一し、異なる開発環境間でのコーディングスタイルの一貫性を保つための設定ファイルです。
- **`.gitignore`**: Gitによるバージョン管理の対象外とするファイルやディレクトリを指定します。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`**: プロジェクトの概要、使い方、開発情報などが日本語で記述されたドキュメントです。
- **`README.md`**: プロジェクトの概要、使い方、開発情報などが英語で記述されたドキュメントです。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報が記述されています。
- **`dev-setup/setup.js`**: 開発環境をセットアップするためのJavaScriptスクリプトです。テスト設定や特定のモジュールのインポート処理が含まれる可能性があります。
- **`generated-docs/callgraph-enhanced.html`**: 自動生成された関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
- **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で利用され、関数呼び出しグラフの描画、ノードの配置、情報パネルの表示/非表示、レイアウト制御などのロジックを提供するJavaScriptファイルです。
- **`generated-docs/development-status.md`**: プロジェクトの現在の開発状況に関する情報が記述されています。
- **`generated-docs/project-overview.md`**: 自動生成されたプロジェクトの概要ドキュメントです。
- **`generated-docs/style.css`**: `generated-docs`ディレクトリ内のHTMLドキュメント（特に呼び出しグラフ）の表示スタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのルートにあるメインのHTMLファイルであり、アプリケーションのデモページやエントリポイントとして機能します。
- **`issue-notes/*.md`**: GitHub Issueに関連するメモや詳細がMarkdown形式で格納されています。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されたファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、依存関係のバージョンを固定し、再現性のあるインストールを保証します。
- **`src/grammar.js`**: `src/grammar.pegjs`からPeggyパーサージェネレーターによって生成されたJavaScriptファイルです。MML文字列を解析し、抽象構文木（AST）を構築するパーサーロジックが含まれます。
- **`src/grammar.pegjs`**: Music Macro Language (MML) の構文ルールをPEG (Parsing Expression Grammar) 形式で定義するファイルです。このファイルから`src/grammar.js`が生成されます。
- **`src/index.html`**: `src`ディレクトリ内にあるHTMLファイルで、アプリケーションのメインビューやコンポーネントの表示に使用される可能性があります。
- **`src/main.js`**: アプリケーションの主要なロジックを統合し、MML入力からJSON変換、音楽再生までの全体の流れを制御するJavaScriptファイルです。
- **`src/mml2json.js`**: MML文字列をTone.jsのJSONシーケンサー形式に変換するコアロジックを実装したJavaScriptファイルです。MMLコマンドの解釈、音符の持続時間や開始時刻の計算などを行います。
- **`src/play.js`**: 変換されたJSONデータを使用してTone.jsライブラリを通じて実際に音楽を再生する機能を提供するJavaScriptファイルです。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストケースを記述したファイルです。Vitestテストフレームワークを利用しています。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境に関する設定が含まれます。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): エラー発生時に例外を捕捉し、適切なエラーハンドリングを行うための関数。
- **`escapeHtml`** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、文字列を安全にHTMLコンテンツとして表示できるようにするユーティリティ関数。
- **`getLayoutConfig`** (generated-docs/callgraph.js): 関数呼び出しグラフの描画に使用されるレイアウト設定を取得する関数。
- **`placeCentralNode`** (generated-docs/callgraph.js): グラフの中心となるノードを配置するロジックを制御する関数。
- **`showNodeInfo`** (generated-docs/callgraph.js): グラフ内の特定のノード（関数）に関する詳細情報を表示する関数。
- **`showEdgeInfo`** (generated-docs/callgraph.js): グラフ内のエッジ（関数間の呼び出し関係）に関する詳細情報を表示する関数。
- **`hideInfoPanel`** (generated-docs/callgraph.js): 情報を表示するパネルを非表示にする関数。
- **`showInfoPanel`** (generated-docs/callgraph.js): 情報を表示するパネルを表示する関数。
- **`toggleInfoPanel`** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替えるトグル関数。
- **`generateGitHubURL`** (generated-docs/callgraph.js): 関連するGitHubリポジトリやファイルへのURLを生成する関数。
- **`resetLayout`** (generated-docs/callgraph.js): グラフの表示レイアウトを初期状態にリセットする関数。
- **`watchNodeMovementAndFixOverlapsWrap`** (generated-docs/callgraph.js): ノードの移動を監視し、ノードの重なりを修正するロジックをラップする関数。
- **`watchNodeMovementAndFixOverlaps`** (generated-docs/callgraph.js): ノードが移動した際に他のノードとの重なりを検出し、自動的に修正する関数。
- **`resolveNodeOverlaps`** (generated-docs/callgraph.js): 複数のノードが重なっている場合に、それらを適切に配置し直して重なりを解消する関数。
- **`switchLayout`** (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウト方式（例: 円形、階層型など）を切り替える関数。
- **`resetNodeStates`** (generated-docs/callgraph.js): グラフ内のノードの表示状態（選択、ハイライトなど）をリセットする関数。
- **`fitToContent`** (generated-docs/callgraph.js): グラフの表示領域を、全てのノードとエッジが収まるように調整する関数。
- **`toggleNodeLabels`** (generated-docs/callgraph.js): グラフノードに表示されるラベルの表示/非表示を切り替える関数。
- **`toggleCalleeLocationFilter`** (generated-docs/callgraph.js): 呼び出し元や呼び出し先の関数の位置に基づいて表示をフィルタリングする機能を切り替える関数。
- **`replace`** (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する一般的なユーティリティ関数。
- **`function`** (generated-docs/callgraph.js): 匿名関数やコールバック関数、または汎用的な関数定義を指す。
- **`max`** (generated-docs/callgraph.js): 複数の数値の中から最大値を計算する関数。
- **`on`** (generated-docs/callgraph.js): イベントリスナーを登録するための一般的な関数。
- **`if`** (generated-docs/callgraph.js, src/mml2json.js, src/play.js, src/grammar.js): 条件分岐ロジックを示す制御構造。
- **`for`** (generated-docs/callgraph.js, src/mml2json.js, src/grammar.js): 繰り返し処理を行うループ制御構造。
- **`ready`** (generated-docs/callgraph.js): DOMが完全に読み込まれ、準備ができたときに実行されるコールバック関数。
- **`addListener`** (generated-docs/callgraph.js): 指定されたイベントに対してリスナー関数を追加する関数。
- **`mml2json`** (src/mml2json.js): MML文字列を解析し、Tone.jsで利用可能なJSONシーケンサー形式のデータ構造に変換する主要な関数。
- **`compileMmlToCommands`** (src/mml2json.js): MMLを内部的なコマンド表現にコンパイルする過程を管理する関数。
- **`getMmlCommands`** (src/mml2json.js): MML文字列から個々のコマンドを抽出し、リストとして取得する関数。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): 音符のアタックからリリースまでの持続時間をティック単位で計算する関数。
- **`repeat`** (src/mml2json.js): 特定の処理を指定された回数だけ繰り返すユーティリティ関数。
- **`toInt`** (src/mml2json.js): 入力値を整数型に変換する関数。
- **`calcDuration`** (src/mml2json.js): 音符の実際の演奏持続時間を計算する関数。
- **`calcStartTick`** (src/mml2json.js): 音符の開始時刻をティック単位で計算する関数。
- **`increaseStartTick`** (src/mml2json.js): 現在の開始ティックを次のイベントのために増加させる関数。
- **`calcLtick`** (src/mml2json.js): MMLのLコマンド（音符の長さ）に関連するティック値を計算する関数。
- **`getNodeId`** (src/mml2json.js): 内部的にノードの一意なIDを生成または取得する関数。
- **`sort`** (src/mml2json.js): 配列やリストの要素を特定の順序で並べ替えるための関数。
- **`play`** (src/play.js): 変換されたTone.js JSONシーケンサー形式のデータを基に、実際に音を再生するための制御を行う関数。
- **`sub`** (src/play.js): 補助的な処理や、メイン処理から切り出されたサブタスクを実行する関数。
- **`switch`** (generated-docs/callgraph.js, src/mml2json.js, src/play.js, src/grammar.js): 複数のケースに基づいて異なる処理を実行する制御構造。
- **`hex`** (src/grammar.js): 16進数に関連する処理を行うパーサー内部関数。
- **`unicodeEscape`** (src/grammar.js): Unicodeエスケープシーケンスの解析に関連するパーサー内部関数。
- **`literalEscape`** (src/grammar.js): リテラル文字列のエスケープ処理に関連するパーサー内部関数。
- **`classEscape`** (src/grammar.js): 文字クラスのエスケープ処理に関連するパーサー内部関数。
- **`describeExpectation`** (src/grammar.js): パーサーが特定の構文要素を期待する際の記述を生成する内部関数。
- **`describeExpected`** (src/grammar.js): エラー発生時にパーサーが期待していたトークンを記述する内部関数。
- **`describeFound`** (src/grammar.js): エラー発生時にパーサーが見つけた実際のトークンを記述する内部関数。
- **`peg$parse`** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリーポイントであり、MML文字列全体の解析を開始します。
- **`peg$f0`** (src/grammar.js): Peggyによって生成される内部的なヘルパー関数で、特定の構文ルールに関連する処理をカプセル化しています。
- **`text`** (src/grammar.js): 現在パース中のテキスト部分を取得するパーサー内部関数。
- **`offset`** (src/grammar.js): 現在のパース位置のオフセットを取得するパーサー内部関数。
- **`range`** (src/grammar.js): 現在パース中のテキストの開始と終了オフセットの範囲を取得するパーサー内部関数。
- **`location`** (src/grammar.js): 現在のパース位置の行番号、列番号などの詳細な位置情報を取得するパーサー内部関数。
- **`expected`** (src/grammar.js): パース中に期待されるトークンのリストを取得するパーサー内部関数。
- **`error`** (src/grammar.js): パースエラーオブジェクトを構築または処理するパーサー内部関数。
- **`peg$getUnicode`** (src/grammar.js): Unicode文字を取得するための内部ヘルパー関数。
- **`peg$literalExpectation`** (src/grammar.js): リテラル文字列を期待するルールを表現するオブジェクトを生成する内部関数。
- **`peg$classExpectation`** (src/grammar.js): 文字クラス（例: `[a-z]`）を期待するルールを表現するオブジェクトを生成する内部関数。
- **`peg$anyExpectation`** (src/grammar.js): 任意の文字を期待するルールを表現するオブジェクトを生成する内部関数。
- **`peg$endExpectation`** (src/grammar.js): 入力の終端を期待するルールを表現するオブジェクトを生成する内部関数。
- **`peg$otherExpectation`** (src/grammar.js): 特定のリテラルやクラスに該当しない、一般的な「その他」の期待値を表現するオブジェクトを生成する内部関数。
- **`peg$computePosDetails`** (src/grammar.js): ソースコード内の位置詳細情報（行、列など）を計算する内部関数。
- **`peg$computeLocation`** (src/grammar.js): ソースコード内の特定のオフセットに対応する位置情報を計算する内部関数。
- **`peg$fail`** (src/grammar.js): パースが失敗したことを示す内部関数。
- **`peg$buildSimpleError`** (src/grammar.js): シンプルな形式のエラーオブジェクトを構築する内部関数。
- **`peg$buildStructuredError`** (src/grammar.js): より詳細な構造化されたエラーオブジェクトを構築する内部関数。
- **`peg$parsestart`** (src/grammar.js): Peggy文法定義の`start`ルールに基づいてパースを開始する内部関数。
- **`peg$parsenote`** (src/grammar.js): Peggy文法定義の`note`ルールに基づいて音符をパースする内部関数。
- **`peg$throw`** (src/grammar.js): パースエラーをスローする内部関数。
- **`constructor`** (src/grammar.js): オブジェクトのインスタンスを初期化するためのコンストラクタ関数。
- **`format`** (src/grammar.js): 文字列のフォーマットやデータの整形を行う関数。
- **`buildMessage`** (src/grammar.js): エラーメッセージやその他の通知メッセージを構築する関数。
- **`literal`** (src/grammar.js): リテラルマッチングに関連するパーサー内部関数。
- **`class`** (src/grammar.js): 文字クラスマッチングに関連するパーサー内部関数。
- **`any`** (src/grammar.js): 任意の文字マッチングに関連するパーサー内部関数。
- **`end`** (src/grammar.js): 入力終端のマッチングに関連するパーサー内部関数。
- **`other`** (src/grammar.js): その他のパーサー内部関数。
- **`while`** (src/grammar.js): 特定の条件が満たされている間、処理を繰り返すループ制御構造。
- **`start`** (src/grammar.pegjs): MMLパーシングの開始点となるPEG文法ルール。
- **`note`** (src/grammar.pegjs): MMLの音符構造を定義するPEG文法ルール。

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
Generated at: 2025-07-29 07:04:03 JST
