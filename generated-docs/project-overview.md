Last updated: 2025-10-06

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の楽譜データを解析し、音楽再生ライブラリTone.jsが理解できるJSONシーケンサー形式に変換するツールです。
- この変換により、ブラウザ上でMML記法を用いた楽曲を容易に生成し、Web Audio APIを介して再生することが可能になります。
- 複雑なWeb Audio APIの実装なしに、手軽にMMLで音楽を記述・再生できる環境を提供し、開発と音楽表現の橋渡しをします。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして、ユーザーインターフェースを構築するための基盤技術。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザ上での高度な音声合成・シーケンス再生を可能にするJavaScriptライブラリ。
    - Web Audio API - ブラウザに内蔵された音声処理機能で、Tone.jsを介して利用され、リアルタイムな音声生成・加工を実現します。
    - Tone.js CDN - unpkgなどのコンテンツデリバリーネットワークを通じてTone.jsライブラリを効率的に配信し、利用可能にします。
    - MML (Music Macro Language) - 音楽をテキストで記述するための簡易記法で、このプロジェクトの入力フォーマットとして機能します。
- 開発ツール:
    - Node.js runtime - プロジェクトのJavaScriptコードを実行するためのランタイム環境。開発時のスクリプト実行やビルドプロセスに利用されます。
    - npm scripts - package.jsonに定義されたスクリプトを通じて、開発、テスト、ビルドなどのタスクを自動化するための機能。
    - pnpm - 高速で効率的なパッケージ管理を実現するツール。プロジェクトの依存関係のインストールと管理に使用されます。
    - Google Generative AI - ドキュメント生成など、AIを活用した開発支援機能のために利用される可能性のあるライブラリ。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得や操作を自動化するために利用されます。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワーク。ユニットテストや結合テストを実行し、コードの品質と信頼性を保証します。
    - TDD (Test-Driven Development) - テストを先行して記述する開発手法。機能の実装前にテストを書き、そのテストが通るようにコードを開発することで、堅牢なシステム構築を目指します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター。MMLの文法定義からJavaScript製のパーサーコードを自動生成します。
    - PEG文法定義 - MML音楽記法を解析するためのルールを定義するファイルで、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステム。コードの分割と再利用を効率的に行い、依存関係を明確にします。
- 自動化・CI/CD:
    - GitHub Actions - コードのプッシュやプルリクエストなどのイベントに基づいて、ビルド、テスト、デプロイ、ドキュメント生成などのワークフローを自動化するサービス。
    - プロジェクト要約自動生成 - GitHub Actionsを活用し、プロジェクトの概要やドキュメントを自動で生成するワークフロー。
    - Issue自動管理 - GitHub Actionsにより、Issueの作成、更新、クローズなどの管理作業を自動化するワークフロー。
    - README多言語翻訳 - GitHub ActionsでREADMEファイルを複数の言語に自動翻訳するワークフロー。
    - i18n automation - 国際化（i18n）関連の自動化ワークフロー。
- 開発標準: EditorConfig - 異なるエディターやIDEを使用する開発者間で、インデントスタイル、文字コードなどの基本的なコーディングスタイルを統一するための設定ファイル。

## ファイル階層ツリー
```
.
├── .editorconfig
├── .gitignore
├── LICENSE
├── README.ja.md
├── README.md
├── dev-setup/
│   ├── README.md
│   └── setup.js
├── generated-docs/
│   ├── callgraph-enhanced.html
│   ├── callgraph.js
│   └── style.css
├── index.html
├── issue-notes/
│   ├── 1.md
│   ├── 10.md
│   ├── 11.md
│   ├── 12.md
│   ├── 13.md
│   ├── 14.md
│   ├── 15.md
│   ├── 16.md
│   ├── 17.md
│   ├── 18.md
│   ├── 2.md
│   ├── 20.md
│   ├── 3.md
│   ├── 4.md
│   ├── 5.md
│   ├── 6.md
│   ├── 7.md
│   ├── 8.md
│   └── 9.md
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── grammar.js
│   ├── grammar.pegjs
│   ├── index.html
│   ├── main.js
│   ├── mml2json.js
│   └── play.js
├── test/
│   └── parser.test.js
└── vitest.config.js
```

## ファイル詳細説明
- **.editorconfig**: 複数の開発者が異なるエディターを使用しても、一貫したコーディングスタイル（インデント、文字コードなど）を維持するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外すべきファイルやディレクトリ（例: ビルド成果物、依存関係モジュールなど）を指定する設定ファイルです。
- **LICENSE**: プロジェクトの利用条件や著作権情報が記載されたライセンスファイルです。
- **README.ja.md**: プロジェクトの概要、使い方、インストール方法などが日本語で説明された主要なドキュメントファイルです。
- **README.md**: プロジェクトの概要、使い方、インストール方法などが英語で説明された主要なドキュメントファイルです。
- **dev-setup/README.md**: `dev-setup`ディレクトリの目的や内容に関する説明ドキュメントです。
- **dev-setup/setup.js**: 開発環境のセットアップや特定の開発タスクを自動化するためのスクリプトファイルです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数の呼び出し関係を視覚的に表現した、詳細なHTML形式のドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で表示される呼び出しグラフの描画ロジックやインタラクティブ機能を提供するJavaScriptコードです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントのレイアウトやデザインを定義するスタイルシートです。
- **index.html**: プロジェクトのデモンストレーションやユーザーインターフェースを提供するメインのHTMLファイルです。MMLの入力、変換、再生が行えます。
- **package.json**: プロジェクト名、バージョン、スクリプト、依存関係など、プロジェクトに関するメタデータを定義するファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、プロジェクトの依存関係の正確なバージョンと解決方法を記録するロックファイルです。再現性のあるビルドを保証します。
- **src/grammar.js**: `src/grammar.pegjs`で定義されたMML文法に基づき、Peggyパーサージェネレーターによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列の解析を行います。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則をPEG (Parsing Expression Grammar) 形式で記述したファイルです。この定義から`src/grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内にある、開発中のデモやテスト用のHTMLファイルです。
- **src/main.js**: プロジェクトの初期化処理や主要なロジックを担うJavaScriptファイルです。MMLの入力と出力の連携を管理します。
- **src/mml2json.js**: MML形式の音楽データをTone.jsが解釈できるJSONシーケンサーフォーマットに変換する中心的なロジックが実装されたJavaScriptファイルです。音符のタイミング、持続時間、ピッチなどを計算します。
- **src/play.js**: `src/mml2json.js`で変換されたJSONデータを受け取り、Tone.jsライブラリを使用して実際にブラウザで音楽を再生するロジックを実装したJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの正確性を検証するためのテストケースが記述されたJavaScriptファイルです。Vitestフレームワークで実行されます。
- **vitest.config.js**: Vitestテストフレームワークの動作を設定するためのファイルです。テストの実行方法や環境に関する設定が含まれます。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: 非同期処理において発生したエラーを捕捉し、適切に処理するための一般的な関数です。エラーハンドリングのロジックを含みます。
- **escapeHtml (generated-docs/callgraph.js)**: HTMLの特殊文字（例: `<`や`>`）をエスケープシーケンスに変換し、XSS攻撃を防ぐなど、セキュリティを向上させる関数です。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフの描画に使用するレイアウト設定（ノード間隔、配置アルゴリズムなど）を取得・提供します。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中心となるノード（関数）を特定の位置に配置する役割を持ちます。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ上の特定のノード（関数）が選択された際に、その関数の詳細情報（ファイルパス、行数、説明など）を情報パネルに表示します。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ上の特定のエッジ（呼び出し関係）が選択された際に、その呼び出しに関する詳細情報を情報パネルに表示します。
- **hideInfoPanel (generated-docs/callgraph.js)**: 画面に表示されている情報パネルを非表示にします。
- **showInfoPanel (generated-docs/callgraph.js)**: 画面に情報パネルを表示します。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報パネルの表示状態（表示/非表示）を切り替える機能を提供します。
- **generateGitHubURL (generated-docs/callgraph.js)**: 選択されたファイルや関数に対応するGitHubリポジトリ上のURLを生成し、直接ソースコードへアクセスできるようにします。
- **resetLayout (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトを初期状態に戻し、ノードの配置やズームレベルをリセットします。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの移動を監視し、他のノードとの重なりが発生した場合に修正する処理のラッパー関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: グラフ内のノードが移動する際に、他のノードと重ならないように自動的に配置を調整する機能を実行します。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: グラフ内で重なっているノードの位置を検出し、互いに離れるように調整して視認性を高めます。
- **switchLayout (generated-docs/callgraph.js)**: 呼び出しグラフの表示形式（例: 円形レイアウト、階層レイアウトなど）を切り替える機能を提供します。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内の全ノードの状態（例: 選択状態、ハイライト状態）を初期値にリセットします。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体のコンテンツがビューポートに収まるように、ズームレベルや位置を自動的に調整します。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替えます。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先（callee）のファイルやディレクトリに基づいて、グラフの表示をフィルタリングする機能を切り替えます。
- **replace (generated-docs/callgraph.js)**: 文字列内の特定のパターンを別の文字列に置き換える汎用的な文字列操作関数です。
- **max (generated-docs/callgraph.js)**: 複数の数値の中から最大値を取得する関数です。
- **on (generated-docs/callgraph.js)**: 特定のイベントが発生したときに実行されるコールバック関数を登録するためのイベントリスナー関数です。
- **ready (generated-docs/callgraph.js)**: ドキュメントオブジェクトモデル (DOM) の準備が完了したときに実行される処理を定義するためのイベントハンドラです。
- **addListener (generated-docs/callgraph.js)**: イベントリスナーを追加するための一般的な関数です。
- **hex (src/grammar.js)**: 16進数表記の文字列を解析し、対応する数値または文字を処理します。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンス（例: `\uXXXX`）を処理し、対応する文字に変換します。
- **literalEscape (src/grammar.js)**: リテラル文字のエスケープシーケンスを処理します。
- **classEscape (src/grammar.js)**: 文字クラス（正規表現の一部）のエスケープシーケンスを処理します。
- **describeExpectation (src/grammar.js)**: パーサーが期待する次の入力の記述を生成する内部関数です。
- **describeExpected (src/grammar.js)**: パース時に期待される入力の具体的な形式を記述する関数です。
- **describeFound (src/grammar.js)**: パース時に実際に見つかった入力の形式を記述する関数です。
- **peg$parse (src/grammar.js)**: Peggyパーサージェネレーターによって生成されたMMLパーサーのメインエントリポイントとなる関数です。MML文字列全体を解析します。
- **text (src/grammar.js)**: 現在パーサーが処理しているテキストの一部を取得します。
- **offset (src/grammar.js)**: 現在のパース位置（入力文字列の先頭からのオフセット）を返します。
- **range (src/grammar.js)**: 現在パーサーが処理している入力の開始と終了のオフセット範囲を返します。
- **location (src/grammar.js)**: 現在のパース位置に関する詳細情報（行番号、列番号など）を提供します。
- **expected (src/grammar.js)**: 現在のパース位置で期待されるトークンやパターンをパーサーに通知します。
- **error (src/grammar.js)**: パースエラーが発生した際に、エラーオブジェクトを生成・報告するための関数です。
- **peg$getUnicode (src/grammar.js)**: Unicode文字の処理に関連する内部ヘルパー関数です。
- **peg$literalExpectation (src/grammar.js)**: リテラル（特定の文字列）に対する期待値を表現するオブジェクトを生成します。
- **peg$classExpectation (src/grammar.js)**: 文字クラス（例: `[a-z]`）に対する期待値を表現するオブジェクトを生成します。
- **peg$anyExpectation (src/grammar.js)**: 任意の単一文字に対する期待値を表現するオブジェクトを生成します。
- **peg$endExpectation (src/grammar.js)**: 入力文字列の終端に対する期待値を表現するオブジェクトを生成します。
- **peg$otherExpectation (src/grammar.js)**: 特定のリテラルや文字クラスではない、その他の期待値を表現するオブジェクトを生成します。
- **peg$computePosDetails (src/grammar.js)**: 文字列中の特定の位置における行番号や列番号などの詳細情報を計算します。
- **peg$computeLocation (src/grammar.js)**: パースエラー発生時の正確な位置情報を含むオブジェクトを計算・生成します。
- **peg$fail (src/grammar.js)**: パースが失敗したことを通知し、エラー処理フローを開始する内部関数です。
- **peg$buildSimpleError (src/grammar.js)**: 簡潔な形式のエラーメッセージを構築する内部関数です。
- **peg$buildStructuredError (src/grammar.js)**: 期待される入力と実際に見つかった入力を含む、より詳細な構造化されたエラーメッセージを構築する内部関数です。
- **peg$parsestart (src/grammar.js)**: MMLパーサーの「start」ルールに対応する関数で、MML文字列全体のパースを開始します。
- **peg$parsenote (src/grammar.js)**: MMLパーサーの「note」ルールに対応する関数で、MML内の個々の音符要素を解析します。
- **peg$throw (src/grammar.js)**: エラーを発生させるための内部関数です。
- **constructor (src/grammar.js)**: JavaScriptオブジェクトのコンストラクタ関数で、新しいインスタンスの初期化を行います。
- **format (src/grammar.js)**: 文字列を特定の書式に整形する関数です。
- **buildMessage (src/grammar.js)**: エラーメッセージを組み立てるための内部関数です。
- **literal (src/grammar.js)**: 特定のリテラル文字列をパースする処理を行います。
- **class (src/grammar.js)**: 文字クラス（正規表現の文字セット）をパースする処理を行います。
- **any (src/grammar.js)**: 任意の単一文字をパースする処理を行います。
- **end (src/grammar.js)**: 入力文字列の終端をチェックする処理を行います。
- **other (src/grammar.js)**: 上記以外の特定のパース要素を処理します。
- **mml2json (src/mml2json.js)**: **MML文字列をTone.jsのJSONシーケンサーフォーマットに変換するメインの関数です。** MMLの解析結果を元に、各音符やコマンドのタイミング、長さ、ピッチなどを計算し、Tone.jsが理解できるデータ構造にマッピングします。
    - **引数**: `mmlString` (string) - 変換対象のMML形式の文字列。
    - **戻り値**: (object) - Tone.jsで直接利用可能なJSONシーケンサーフォーマットのオブジェクト。
- **compileMmlToCommands (src/mml2json.js)**: MMLパーサーから得られた抽象構文木（AST）を、内部的に扱いやすいコマンドリスト形式に変換します。
- **getMmlCommands (src/mml2json.js)**: MML文字列を解析し、MMLコマンドのリストを抽出します。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符の開始（Attack）から終了（Release）までのティック数（時間単位）を計算します。
- **repeat (src/mml2json.js)**: 指定された文字列を複数回繰り返して生成します。
- **toInt (src/mml2json.js)**: 値を整数型に安全に変換します。
- **calcDuration (src/mml2json.js)**: MMLの記述に基づいて、音符の持続時間（デュレーション）を計算します。
- **calcStartTick (src/mml2json.js)**: 各音符やイベントの開始タイミングをティック単位で計算します。
- **increaseStartTick (src/mml2json.js)**: 現在のティックカウントを次のイベントの開始ティックまで増加させます。
- **calcLtick (src/mml2json.js)**: MMLのL（Length）コマンドに基づいて、音符のデフォルトの長さをティック単位で計算します。
- **getNodeId (src/mml2json.js)**: データ構造内の各ノード（MML要素）に一意のIDを割り当てるために使用されます。
- **sort (src/mml2json.js)**: 配列などのコレクションを特定の基準でソートします。
- **play (src/play.js)**: **Tone.jsのJSONシーケンサーデータを受け取り、Web Audio APIを介して実際に音楽を再生する関数です。** Tone.jsのインスタンスを初期化し、提供されたJSONデータに基づいて音源をシーケンスし、再生を開始します。
    - **引数**: `toneJson` (object) - `mml2json`関数によって生成されたTone.js互換のJSONシーケンサーデータ。
    - **戻り値**: なし (副作用として音声が再生されます)
- **sub (src/play.js)**: 減算処理を行う関数です。
- **switch (generated-docs/callgraph.js, src/mml2json.js, src/grammar.js, src/play.js)**: 複数の条件に基づいて異なるコードブロックを実行する制御フロー構文です。
- **if (generated-docs/callgraph.js, src/mml2json.js, src/grammar.js, src/play.js)**: 特定の条件が真である場合にのみコードブロックを実行する基本的な条件分岐構文です。
- **for (generated-docs/callgraph.js, src/mml2json.js, src/grammar.js)**: 特定の回数だけコードブロックを繰り返し実行するループ構文です。
- **while (src/grammar.js)**: 条件が真である限り、コードブロックを繰り返し実行するループ構文です。

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
Generated at: 2025-10-06 07:05:47 JST
