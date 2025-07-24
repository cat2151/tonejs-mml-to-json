Last updated: 2025-07-25

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）記法を解析し、音楽データを抽出します。
- 抽出したMMLデータを、Tone.jsライブラリが利用可能なJSONシーケンサー形式に変換します。
- この変換を通じて、ウェブブラウザ上でMML音楽の再生を可能にするMMLコンバーターおよびプレーヤーを提供します。

## 技術スタック
- フロントエンド:
    - HTML5: ブラウザベースのMMLプレイヤーのインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js: Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・再生を可能にするJavaScriptライブラリです。unpkg経由でCDN配信されています。
    - MML (Music Macro Language): 音楽をテキストで記述するための記法であり、このプロジェクトのパーサーによって処理されます。
    - Web Audio API: ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime: JavaScriptコードの実行環境として使用されます。
    - npm scripts: プロジェクト内の様々な開発タスク（テスト、ビルド、ドキュメント生成など）を実行するためのタスクランナーです。5つのスクリプトが定義されています。
    - pnpm: 効率的かつ高速なパッケージマネージャーで、依存関係の管理に使用されます。
    - Google Generative AI: ドキュメント生成などの開発支援にAIを活用します。
    - @octokit/rest: GitHub APIと連携し、リポジトリ操作や自動化に利用されます。
- テスト:
    - Vitest: Viteを基盤とした高速なJavaScriptテストフレームワークで、ユニットテストや統合テストに使用されます。
    - TDD (Test-Driven Development): テストを先に書く開発手法を採用し、品質と設計の向上を目指します。
- ビルドツール:
    - Peggy: PEG (Parsing Expression Grammar) に基づくパーサージェネレーターです。
    - PEG文法定義: MML音楽記法を解析するためのPEG文法が定義されており、これを用いてパーサーが生成されます。
- 言語機能:
    - ES Modules: モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率的に行います。
- 自動化・CI/CD:
    - GitHub Actions: コードの変更を検知して自動的にテスト、ビルド、デプロイなどのタスクを実行するCI/CDプラットフォームです。以下の4つのワークフローが定義されています。
        - プロジェクト要約自動生成: プロジェクトの概要ドキュメントを自動生成します。
        - Issue自動管理: GitHub Issuesの管理を自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
        - i18n automation: 国際化（i18n）関連の自動翻訳ワークフローを指します。
- 開発標準:
    - EditorConfig: 異なるIDEやエディタを使用する開発者間で、コードの書式設定（インデントスタイル、文字コードなど）を統一するためのファイル形式です。

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
- **.editorconfig**: エディタの設定を統一し、異なる開発環境間でのコードスタイルの一貫性を保つための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの日本語版説明書です。
- **README.md**: プロジェクトの英語版説明書（メインのREADME）です。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記述されています。
- **dev-setup/setup.js**: 開発環境のセットアップに関連するスクリプトです。主にVitestのインポートや、テスト関連の処理を記述する可能性があります。
- **generated-docs/callgraph-enhanced.html**: 生成された関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフのレンダリング、インタラクション（ノード情報表示、レイアウト調整など）を担当するJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメントです。
- **generated-docs/project-overview.md**: プロジェクトの概要を自動生成するドキュメントです（本出力自体がこのファイルの生成に貢献している可能性があります）。
- **generated-docs/style.css**: 生成されたドキュメントや関数呼び出しグラフのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートにあるHTMLファイルで、デモページやアプリケーションのエントリーポイントとして機能します。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報を管理するディレクトリです。個々のファイルは特定のIssueに関するノートです。（来訪者向けのため個々の内容は省略）
- **package.json**: Node.jsプロジェクトの設定ファイルで、プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成するロックファイルで、依存関係の正確なバージョンとツリー構造を記録し、ビルドの再現性を保証します。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構文木を生成するコアロジックを含みます。
- **src/grammar.pegjs**: MML（Music Macro Language）を解析するためのPEG（Parsing Expression Grammar）形式の文法定義ファイルです。ここからパーサーが生成されます。
- **src/index.html**: `src`ディレクトリ内のデモページやアプリケーションのHTMLファイルで、メインのアプリケーションUIを提供します。
- **src/main.js**: メインのJavaScriptエントリポイントファイルで、アプリケーションの初期化や主要なロジックを連携させます。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサー形式に変換する主要なロジックが実装されているファイルです。音楽コマンドの解析、タイミング計算、JSON構造へのマッピングを行います。
- **src/play.js**: 変換されたJSONデータをTone.jsライブラリを使用して実際にブラウザで再生する機能を提供するファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのVitestテストファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラーハンドリングのための一般的なJavaScriptの`catch`ブロックまたは関連する関数の一部である可能性があります。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティを確保しながら文字列を安全にHTMLに表示するための関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトに関する設定を取得する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): グラフ表示において、中心となるノードの配置を決定する関数です。
- **showNodeInfo** (generated-docs/callgraph.js): 特定のノード（関数）に関する詳細情報を表示する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフのエッジ（呼び出し関係）に関する詳細情報を表示する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): 情報パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの表示・非表示を切り替える関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): 関連するGitHubリソースへのURLを生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、オーバーラップを修正する処理をラップする関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): グラフノードの動きを監視し、ノード同士の重なりを自動的に調整・修正する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): ノードの重なりを解消するための具体的なロジックを実装する関数です。
- **switchLayout** (generated-docs/callgraph.js): グラフの表示レイアウト（例：ツリー、フォースディレクテッド）を切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): グラフノードの状態（選択状態、ハイライトなど）をリセットする関数です。
- **fitToContent** (generated-docs/callgraph.js): グラフ全体が画面に収まるようにズームレベルや位置を調整する関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードのラベル（関数名など）の表示・非表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先の場所（ファイルパスなど）に基づいてフィルタリングのオン・オフを切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列置換などの一般的な処理を行う関数です。
- **function** (generated-docs/callgraph.js): JavaScriptの一般的な`function`キーワードまたは無名関数を定義するコンテキスト。
- **max** (generated-docs/callgraph.js): 数値の最大値を計算する関数、または関連する処理の一部です。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定するための一般的な関数名です。
- **ready** (generated-docs/callgraph.js): ドキュメントがロードされた後など、特定の状態になったときに実行されるコールバックやイベントハンドラです。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加するための一般的な関数です。
- **hex** (src/grammar.js): 16進数に関連する処理（パース、変換など）を行う関数です。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理するパーサー内のルールまたは関数です。
- **literalEscape** (src/grammar.js): リテラル文字のエスケープシーケンスを処理するパーサー内のルールまたは関数です。
- **classEscape** (src/grammar.js): 文字クラスのエスケープシーケンスを処理するパーサー内のルールまたは関数です。
- **describeExpectation** (src/grammar.js): パーサーが期待する次の入力について説明を生成する関数です。
- **describeExpected** (src/grammar.js): 期待される入力に関する説明を生成する関数です。
- **describeFound** (src/grammar.js): 見つかった入力に関する説明を生成する関数です。
- **peg$parse** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイントとなる関数です。MML文字列を解析し、結果を返します。
- **peg$f0** (src/grammar.js): Peggyによって生成された内部関数で、特定のパーシングルールに関連する処理を行います。
- **text** (src/grammar.js): パーサーが現在処理しているテキスト部分を取得する関数です。
- **offset** (src/grammar.js): パーサーが現在処理している入力文字列のオフセット（位置）を取得する関数です。
- **range** (src/grammar.js): パースされた部分の開始・終了オフセットを示す範囲を返す関数です。
- **location** (src/grammar.js): パースされた部分の行番号や列番号などの位置情報を返す関数です。
- **expected** (src/grammar.js): パーシングエラー発生時に期待された入力情報を取得する関数です。
- **error** (src/grammar.js): パーシングエラーを生成または報告する関数です。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得するための内部ヘルパー関数です。
- **peg$literalExpectation** (src/grammar.js): リテラル文字列を期待するパーサーの期待値オブジェクトを生成する関数です。
- **peg$classExpectation** (src/grammar.js): 文字クラスを期待するパーサーの期待値オブジェクトを生成する関数です。
- **peg$anyExpectation** (src/grammar.js): 任意の文字を期待するパーサーの期待値オブジェクトを生成する関数です。
- **peg$endExpectation** (src/grammar.js): 入力文字列の終端を期待するパーサーの期待値オブジェクトを生成する関数です。
- **peg$otherExpectation** (src/grammar.js): その他の種類の期待値を生成する関数です。
- **peg$computePosDetails** (src/grammar.js): 入力文字列中の位置の詳細（行、列）を計算する内部ヘルパー関数です。
- **peg$computeLocation** (src/grammar.js): パースされたノードの正確な開始・終了位置を計算する関数です。
- **peg$fail** (src/grammar.js): パースの失敗をマークし、エラーを生成する内部関数です。
- **peg$buildSimpleError** (src/grammar.js): シンプルなパーシングエラーオブジェクトを構築する関数です。
- **peg$buildStructuredError** (src/grammar.js): 詳細な構造化されたパーシングエラーオブジェクトを構築する関数です。
- **peg$parsestart** (src/grammar.js): MMLパーサーの`start`ルールを実行する関数です。MMLの全体を解析します。
- **peg$parsenote** (src/grammar.js): MMLパーサーの`note`ルールを実行する関数です。個々の音符や休符などを解析します。
- **peg$throw** (src/grammar.js): パーシングエラーをスローする内部ヘルパー関数です。
- **constructor** (src/grammar.js, undefined): JavaScriptのクラスインスタンスを初期化するための特別なメソッドです。ここでは特定のクラスが不明なため、一般的なコンストラクタの役割を指します。
- **format** (src/grammar.js): 情報を特定の形式に整形する関数です。
- **buildMessage** (src/grammar.js): エラーメッセージや診断メッセージを構築する関数です。
- **literal** (src/grammar.js): リテラル（固定文字列）のパーシングに関連する関数です。
- **class** (src/grammar.js): 文字クラス（例: `[a-z]`）のパーシングに関連する関数です。
- **any** (src/grammar.js): 任意の文字のパーシングに関連する関数です。
- **end** (src/grammar.js): 入力ストリームの終端を検出するパーシングに関連する関数です。
- **other** (src/grammar.js): その他の種類のパーシング要素に関連する関数です。
- **for** (src/grammar.js): JavaScriptの一般的な`for`ループ構造またはそれに関連する処理の一部です。
- **switch** (src/grammar.js): JavaScriptの一般的な`switch`文構造またはそれに関連する処理の一部です。
- **while** (src/grammar.js): JavaScriptの一般的な`while`ループ構造またはそれに関連する処理の一部です。
- **start** (src/grammar.pegjs): `grammar.pegjs`で定義されたMMLの最上位（開始）ルールです。
- **note** (src/grammar.pegjs): `grammar.pegjs`で定義された、MMLの個々の音符や休符をパースするルールです。
- **mml2json** (src/mml2json.js): MML文字列全体を解析し、Tone.jsのシーケンサー形式に準拠したJSONオブジェクトに変換するメイン関数です。
    - 引数: `mmlString` (string) - 変換するMML文字列。
    - 戻り値: `object` - Tone.jsシーケンサー形式のJSONデータ。
- **compileMmlToCommands** (src/mml2json.js): MMLを中間的なコマンドリストにコンパイルする関数です。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々のMMLコマンドを抽出する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): ノートの攻撃からリリースまでのティック数を計算する関数です。
- **repeat** (src/mml2json.js): MMLの繰り返し処理を実装する関数です。
- **toInt** (src/mml2json.js): 値を整数に変換するヘルパー関数です。
- **calcDuration** (src/mml2json.js): 音符のデュレーション（長さ）を計算する関数です。
- **calcStartTick** (src/mml2json.js): イベントの開始ティックを計算する関数です。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増加させる関数です。
- **calcLtick** (src/mml2json.js): MMLのLコマンド（音長設定）に関するティック値を計算する関数です。
- **getNodeId** (src/mml2json.js): ノード（内部処理要素）に一意のIDを付与する関数です。
- **sort** (src/mml2json.js): 配列やリストをソートするための一般的な関数です。
- **function** (src/mml2json.js): JavaScriptの一般的な`function`キーワードまたは無名関数を定義するコンテキスト。
- **if** (src/mml2json.js): JavaScriptの一般的な`if`文構造またはそれに関連する条件分岐処理の一部です。
- **switch** (src/mml2json.js): JavaScriptの一般的な`switch`文構造またはそれに関連する条件分岐処理の一部です。
- **for** (src/mml2json.js): JavaScriptの一般的な`for`ループ構造またはそれに関連する繰り返し処理の一部です。
- **play** (src/play.js): 変換されたTone.js JSONデータを実際に再生するメイン関数です。
    - 引数: `jsonData` (object) - Tone.jsシーケンサー形式のJSONデータ。
    - 戻り値: `void`
- **sub** (src/play.js): 音楽再生に関する補助的な処理を行う関数です。
- **if** (src/play.js): JavaScriptの一般的な`if`文構造またはそれに関連する条件分岐処理の一部です。

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
Generated at: 2025-07-25 07:03:55 JST
