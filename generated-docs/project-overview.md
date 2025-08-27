Last updated: 2025-08-28

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）形式で記述された音楽データを解析します。
- 解析したMMLデータを、Web Audio APIライブラリTone.jsが利用できるJSONシーケンサー形式に変換します。
- これにより、ブラウザ上でMMLベースの楽曲を簡単に再生・視覚化するための基盤を提供します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMML音楽を再生・表示するためのユーザーインターフェースを構築
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高度な音声合成とシーケンス処理を可能にするライブラリ
    - Tone.js CDN - unpkg経由でTone.jsライブラリを効率的に配信し、利用可能にする
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法パーサー
    - Web Audio API - ブラウザ上で音声処理を行うための標準API（Tone.jsを通じて利用）
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境
    - npm scripts - パッケージ管理と開発タスク（テスト、ビルドなど）を自動化するためのスクリプト
    - pnpm - 高速でディスク効率の良いパッケージマネージャー
    - Google Generative AI - AIを活用した文書生成やコンテンツ作成をサポート
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得や操作を行う
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、効率的なユニットテストを可能にする
    - TDD (Test-Driven Development) - テストを先に書き、それに合わせてコードを開発する手法
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーター。MMLパーサーの生成に使用
    - PEG文法定義 - MML音楽記法の構文解析ルールを定義し、パーサーを自動生成する
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用を促進する
- 自動化・CI/CD:
    - GitHub Actions - コードの変更時に自動テスト、ビルド、デプロイなどのワークフローを実行するCI/CDプラットフォーム
    - プロジェクト要約自動生成 - プロジェクトの情報を自動的に要約する機能
    - Issue自動管理 - GitHub Issueの管理を自動化する機能
    - README多言語翻訳 - READMEドキュメントの多言語対応を自動化する機能
    - i18n automation - 国際化（i18n）関連の自動化ワークフロー
- 開発標準: EditorConfig - 複数のエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル

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
- **.editorconfig**: 異なるエディタやIDE間でコードの書式設定（インデントスタイル、文字コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理システムが追跡しないファイルやディレクトリを指定するファイルです。
- **LICENSE**: 本プロジェクトの利用条件や配布に関するライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの目的、使い方、機能などを日本語で説明するドキュメントです。
- **README.md**: プロジェクトの目的、使い方、機能などを英語（または主要言語）で説明するドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や関連情報が記載されたドキュメントです。
- **dev-setup/setup.js**: 開発環境を準備するためのセットアップスクリプトです。テスト環境の構築や依存関係の初期設定を行う可能性があります。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表示する、インタラクティブなHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`でグラフの描画、操作、データ処理を行うためのJavaScriptロジックが含まれています。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況、進捗、今後の計画などが記述されたドキュメントです。
- **generated-docs/project-overview.md**: 本プロジェクトの概要や主要な特徴を説明するドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。
- **index.html**: プロジェクトのルートにあるHTMLファイルで、通常はデモページやアプリケーションのエントリーポイントとして機能します。
- **issue-notes/** (ディレクトリ): プロジェクトのIssue（課題）に関するメモや詳細情報を保管するためのディレクトリです。
- **package.json**: Node.jsプロジェクトのメタデータ、依存関係、スクリプトなどが定義されている設定ファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係の正確なバージョンを固定し、再現可能なビルドを保証します。
- **src/grammar.js**: `grammar.pegjs`の定義に基づいて`Peggy`によって自動生成されたMMLパーサーの実装です。MML文字列を解析し、構造化されたデータに変換する主要なロジックを含みます。
- **src/grammar.pegjs**: MML（Music Macro Language）の文法ルールをPEG（Parsing Expression Grammar）形式で定義したファイルです。この定義から`src/grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内のHTMLファイルで、アプリケーションのユーザーインターフェースの一部やデモページを構成します。
- **src/main.js**: アプリケーションの主要なエントリーポイントとなるJavaScriptファイルです。初期化処理や主要なロジックを読み込みます。
- **src/mml2json.js**: MMLの解析結果をTone.jsシーケンサーが解釈できるJSON形式に変換するためのコアロジックを実装したJavaScriptファイルです。
- **src/play.js**: `mml2json.js`で変換されたJSONデータを使用して、Tone.jsライブラリを通じて音楽を実際に再生するためのロジックを実装したJavaScriptファイルです。
- **test/parser.test.js**: MMLパーサー（`src/grammar.js`）の機能と正確性を検証するためのテストケースが記述されています。Vitestフレームワークを使用します。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テスト実行時のオプションや挙動を定義します。

## 関数詳細説明
- **catch** (`dev-setup/setup.js`, `src/play.js`): エラーが発生した際にその例外を捕捉し、適切なエラーハンドリングロジックを実行します。
- **error** (`src/grammar.js`): 主にMMLパーサー内で構文解析エラーを報告するために使用される、エラーオブジェクトの生成や関連処理を行います。
- **on** (`generated-docs/callgraph.js`): イベントリスナーを登録する関数で、ユーザーインタラクションやシステムイベントに応じて特定の処理を実行します。
- **escapeHtml** (`generated-docs/callgraph.js`): HTMLの特殊文字をエスケープし、セキュリティ脆弱性（XSSなど）を防ぎながらHTMLコンテンツを安全に表示できるようにします。
- **getLayoutConfig** (`generated-docs/callgraph.js`): 呼び出しグラフのレイアウトに関する設定情報を取得します。
- **placeCentralNode** (`generated-docs/callgraph.js`): 呼び出しグラフ内で特定のノード（通常は中心となる関数）を配置する処理を行います。
- **showNodeInfo** (`generated-docs/callgraph.js`): グラフ上のノード（関数など）が選択された際に、その詳細情報を表示するUIを制御します。
- **showEdgeInfo** (`generated-docs/callgraph.js`): グラフ上のエッジ（関数間の呼び出し関係）が選択された際に、その詳細情報を表示するUIを制御します。
- **hideInfoPanel** (`generated-docs/callgraph.js`): 詳細情報表示パネルを非表示にします。
- **showInfoPanel** (`generated-docs/callgraph.js`): 詳細情報表示パネルを表示します。
- **toggleInfoPanel** (`generated-docs/callgraph.js`): 詳細情報表示パネルの表示・非表示を切り替えます。
- **generateGitHubURL** (`generated-docs/callgraph.js`): 関連するGitHubリポジトリやファイルへのURLを生成します。
- **resetLayout** (`generated-docs/callgraph.js`): 呼び出しグラフの現在のレイアウトを初期状態にリセットします。
- **watchNodeMovementAndFixOverlapsWrap** (`generated-docs/callgraph.js`): ノードの移動を監視し、他のノードとの重なりを修正する処理をラップします。
- **watchNodeMovementAndFixOverlaps** (`generated-docs/callgraph.js`): 呼び出しグラフ内のノードの動きを継続的に監視し、ノード同士が重ならないように配置を調整します。
- **resolveNodeOverlaps** (`generated-docs/callgraph.js`): グラフ内のノード間の重なりを検出し、解消するためのアルゴリズムを実行します。
- **switchLayout** (`generated-docs/callgraph.js`): 呼び出しグラフの表示レイアウト（例: ツリー、力学シミュレーションなど）を切り替えます。
- **resetNodeStates** (`generated-docs/callgraph.js`): グラフ内のノードの表示状態（選択、ハイライトなど）をリセットします。
- **fitToContent** (`generated-docs/callgraph.js`): グラフの表示領域を、全てのノードとエッジが収まるように調整します。
- **toggleNodeLabels** (`generated-docs/callgraph.js`): グラフノードに表示されるラベルの表示・非表示を切り替えます。
- **toggleCalleeLocationFilter** (`generated-docs/callgraph.js`): 呼び出し先（Callee）の場所に基づいたフィルタリング機能のON/OFFを切り替えます。
- **replace** (`generated-docs/callgraph.js`): 文字列内の特定の部分を別の文字列で置換する処理を行います。
- **function** (`generated-docs/callgraph.js`): JavaScriptの`function`キーワードや無名関数、高階関数のコールバックなどで使われる汎用的な関数定義です。
- **max** (`generated-docs/callgraph.js`): 複数の数値の中から最大値を取得します。
- **ready** (`generated-docs/callgraph.js`): ウェブページのDOM（Document Object Model）の読み込みが完了した後に実行される処理を登録します。
- **addListener** (`generated-docs/callgraph.js`): 特定のイベントが発生したときに実行されるイベントリスナー関数を追加します。
- **mml2json** (`src/mml2json.js`): MML形式の音楽データを解析し、Tone.jsライブラリが利用可能なJSONシーケンサー形式に変換する主要な関数です。
    - 引数: `mmlString` (string) - 変換対象のMML文字列。
    - 戻り値: (object) - Tone.jsシーケンサー互換のJSONオブジェクト。
- **compileMmlToCommands** (`src/mml2json.js`): MML文字列を、内部処理で扱いやすいコマンドのリストにコンパイル（変換）します。
- **getMmlCommands** (`src/mml2json.js`): MML文字列から個々の音楽コマンド（音符、休符、テンポ変更など）を抽出します。
- **calcAttackToReleaseTicks** (`src/mml2json.js`): 音符のアタックからリリースまでの時間（ティック単位）を計算します。
- **repeat** (`src/mml2json.js`): 指定された回数だけ特定の処理を繰り返すためのヘルパー関数です。
- **toInt** (`src/mml2json.js`): 値を整数型に変換します。
- **calcDuration** (`src/mml2json.js`): 音楽イベント（音符など）の持続時間（デュレーション）を計算します。
- **calcStartTick** (`src/mml2json.js`): 音楽イベントが開始するタイミング（ティック単位）を計算します。
- **increaseStartTick** (`src/mml2json.js`): 現在の開始ティック値を所定の量だけ増加させます。
- **calcLtick** (`src/mml2json.js`): MMLにおける音符の長さ（Ltick）を計算します。
- **getNodeId** (`src/mml2json.js`): グラフノードなど、特定の要素に対する一意の識別子を生成または取得します。
- **sort** (`src/mml2json.js`): 配列の要素を特定の基準に基づいて並べ替えます。
- **play** (`src/play.js`): 変換されたTone.js JSONデータを受け取り、Web Audio APIとTone.jsを使用して実際にブラウザで音楽を再生する関数です。
    - 引数: `jsonData` (object) - Tone.jsシーケンサー互換のJSONオブジェクト。
    - 戻り値: なし。
- **sub** (`src/play.js`): サブスクリプションまたは購読に関連する処理を実行します。特定のイベントやデータストリームに登録する際に使用される可能性があります。
- **switch** (`generated-docs/callgraph.js`, `src/mml2json.js`, `src/grammar.js`, `src/play.js`): 条件分岐を行うJavaScriptの制御フロー文で、複数の実行パスを切り替えます。
- **if** (`generated-docs/callgraph.js`, `src/mml2json.js`, `src/grammar.js`, `src/play.js`): 条件が真の場合に特定のコードブロックを実行するJavaScriptの制御フロー文です。
- **for** (`generated-docs/callgraph.js`, `src/mml2json.js`, `src/grammar.js`): 指定された回数または条件が満たされるまでコードブロックを繰り返すJavaScriptのループ制御フロー文です。
- **hex** (`src/grammar.js`): 16進数形式のデータを処理する際に使用されます。MMLパーサーで16進数リテラルやエスケープシーケンスの解析に関連します。
- **unicodeEscape** (`src/grammar.js`): Unicodeエスケープシーケンス（例: `\uXXXX`）を解析し、対応する文字に変換する処理を行います。
- **literalEscape** (`src/grammar.js`): 特定のリテラル文字列内のエスケープシーケンスを処理します。
- **classEscape** (`src/grammar.js`): 文字クラス定義内のエスケープシーケンスを処理します。
- **describeExpectation** (`src/grammar.js`): PEGパーサーが構文解析中に期待するパターンやトークンを記述するためのヘルパー関数です。
- **describeExpected** (`src/grammar.js`): パーサーが期待している要素に関する説明を生成します。
- **describeFound** (`src/grammar.js`): パーサーが見つけた要素に関する説明を生成します。
- **peg$parse** (`src/grammar.js`): Peggyによって生成されたパーサーのメインエントリポイントで、入力MML文字列全体を解析します。
- **peg$f0** (`src/grammar.js`): Peggyパーサー内で生成される内部的なヘルパー関数で、特定の文法ルールに関連するロジックをカプセル化します。
- **text** (`src/grammar.js`): パーサーが現在処理している入力テキストの断片を取得します。
- **offset** (`src/grammar.js`): パーサーが現在入力文字列のどの位置（オフセット）にいるかを取得します。
- **range** (`src/grammar.js`): 現在の解析がカバーしている入力文字列の範囲（開始と終了オフセット）を取得します。
- **location** (`src/grammar.js`): 現在の解析位置における詳細な情報（行番号、列番号など）を取得します。
- **expected** (`src/grammar.js`): パーサーが次に期待するトークンやパターンのリストを取得します。
- **peg$getUnicode** (`src/grammar.js`): Unicode文字を取得するための内部ヘルパー関数です。
- **peg$literalExpectation** (`src/grammar.js`): リテラル値に対する期待値を生成します。
- **peg$classExpectation** (`src/grammar.js`): 文字クラスに対する期待値を生成します。
- **peg$anyExpectation** (`src/grammar.js`): 任意の文字に対する期待値を生成します。
- **peg$endExpectation** (`src/grammar.js`): 入力文字列の終端に対する期待値を生成します。
- **peg$otherExpectation** (`src/grammar.js`): その他のカテゴリの期待値を生成します。
- **peg$computePosDetails** (`src/grammar.js`): 入力文字列中の位置に関する詳細情報を計算します。
- **peg$computeLocation** (`src/grammar.js`): 現在の解析位置に対応する行、列、オフセットなどの情報を計算します。
- **peg$fail** (`src/grammar.js`): 構文解析が失敗したことを報告します。
- **peg$buildSimpleError** (`src/grammar.js`): シンプルな形式の構文解析エラーメッセージを構築します。
- **peg$buildStructuredError** (`src/grammar.js`): 構造化された形式の構文解析エラーメッセージを構築します。
- **peg$parsestart** (`src/grammar.js`): MMLパーサーの「start」ルール（MML全体の開始点）を解析する内部関数です。
- **peg$parsenote** (`src/grammar.js`): MMLパーサーの「note」ルール（個々の音符）を解析する内部関数です。
- **peg$throw** (`src/grammar.js`): パーサー内で例外をスローするために使用されます。
- **constructor** (`src/grammar.js`): JavaScriptのクラスやオブジェクトのインスタンスを初期化するための特別なメソッドです。主にエラーオブジェクトなどの作成時に使用されます。
- **format** (`src/grammar.js`): 文字列を特定の形式に整形します。エラーメッセージの生成などで使用されます。
- **buildMessage** (`src/grammar.js`): エラーや通知のためのメッセージを構築します。
- **literal** (`src/grammar.js`): 文字列リテラルやその解析に関連する処理です。
- **class** (`src/grammar.js`): 文字クラス定義やその解析に関連する処理です。
- **any** (`src/grammar.js`): 任意の文字や要素に対応する処理です。
- **end** (`src/grammar.js`): 解析処理の終了に関連する内部的な処理です。
- **other** (`src/grammar.js`): その他のカテゴリに分類される解析要素に関連する処理です。
- **while** (`src/grammar.js`): 条件が真である間、コードブロックを繰り返し実行するJavaScriptのループ制御フロー文です。
- **start** (`src/grammar.pegjs`): MML文法の最上位の開始ルールです。通常、MMLの全体構造を定義します。
- **note** (`src/grammar.pegjs`): MML文法において、個々の音符（ピッチ、長さなど）の記法を定義するルールです。

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
Generated at: 2025-08-28 07:04:02 JST
