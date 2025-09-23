Last updated: 2025-09-23

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsで利用可能なJSONシーケンサー形式に変換するプロジェクトです。
- Web Audio APIとTone.jsライブラリを活用し、ブラウザ上で音楽再生機能を提供します。
- MML記法で記述された音楽を手軽に作成・再生するための基盤とデモを提供します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されます。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用したブラウザ音声ライブラリとして、音楽の合成と再生に利用されます。Web Audio API - Tone.jsを通じてブラウザのネイティブ音声処理技術が使用されます。Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、手軽に利用できます。MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトのパーサーが対象とします。
- 開発ツール: Node.js runtime - JavaScript実行環境として開発作業に利用されます。npm scripts - 5つのタスクスクリプトが定義され、開発タスクを自動化します。pnpm - 高速で効率的なパッケージマネージャーとして、プロジェクトの依存関係管理に使用されます。Google Generative AI - ドキュメント生成などのAI支援機能に利用されます。@octokit/rest - GitHub APIとの連携に使用され、自動化ワークフローなどに貢献します。
- テスト: Vitest - 高速なViteベースのテストフレームワークとして、ユニットテストの実行に使用されます。TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターとして、MMLパーサーのコード生成に利用されます。PEG文法定義 - MML音楽記法を解析するための文法が定義されています。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムとして、コードの構造化と再利用を促進します。
- 自動化・CI/CD: GitHub Actions - 4つのワークフローが定義されており、CI/CDの自動化に利用されます。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationといった自動化ワークフローが実行されます。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するためのコード統一ルールを定義します。

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
- **.editorconfig**: 異なるエディタやIDE間でコードの整形ルール（インデントスタイル、文字コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md / README.md**: プロジェクトの目的、使い方、インストール方法、デモリンクなどの概要を説明する多言語対応のドキュメントファイルです。
- **dev-setup/README.md**: `dev-setup`ディレクトリ内のファイルに関する説明が記述されています。
- **dev-setup/setup.js**: 開発環境のセットアップや特定の開発タスクを実行するためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表示するインタラクティブなHTMLページです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で関数呼び出しグラフの描画、操作、動的な更新を行うJavaScriptロジックが含まれています。
- **generated-docs/style.css**: `callgraph-enhanced.html`の視覚スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートにあるHTMLファイルで、通常はデモページやアプリケーションのエントリポイントとして機能します。
- **issue-notes/**: プロジェクト開発中に発生した課題や検討事項を記録するためのMarkdownファイル群が格納されています。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、および開発・実行時の依存関係が定義されています。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成される、依存関係の厳密なバージョンと解決策を記録するロックファイルです。
- **src/grammar.js**: `src/grammar.pegjs`で定義されたMML文法に基づき、Peggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文ツリー（AST）を構築します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則をPEG (Parsing Expression Grammar) 形式で記述したファイルです。これを元に`src/grammar.js`が生成されます。
- **src/index.html**: MMLの入力、Tone.jsへの変換、そして音楽再生のデモを提供するフロントエンドのWebページです。
- **src/main.js**: プロジェクトの主要なロジックを初期化または実行するためのエントリポイントとなるJavaScriptファイルです。
- **src/mml2json.js**: MML文字列を解析し、Tone.jsのシーケンサーが解釈できるJSONデータ形式（音符、テンポ、オクターブ、長さなどの情報を含む）に変換する核心的なロジックが含まれています。
- **src/play.js**: `mml2json.js`で変換されたJSONデータを受け取り、Tone.jsライブラリを使用して実際にブラウザ上で音楽を再生する機能を提供します。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーが正しく機能するかを検証するためのテストスイートです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: 非同期処理におけるエラーを捕捉し、適切に処理するためのJavaScriptの構文。
- **error ()**: 汎用的なエラーオブジェクトを生成するか、エラー処理ロジックを実行する関数。
- **on ()**: イベントリスナーを登録する汎用的な関数。特定のイベント発生時にコールバックを実行します。
- **escapeHtml (generated-docs/callgraph.js)**: HTMLの特殊文字（<, >, &, ", 'など）を対応するHTMLエンティティに変換し、XSS攻撃を防ぐなど、文字列をHTMLとして安全に表示できるようにします。
- **getLayoutConfig (generated-docs/callgraph.js)**: 関数呼び出しグラフの描画に使用されるレイアウト設定（ノード間の距離、配置アルゴリズムなど）を取得または定義します。
- **placeCentralNode (generated-docs/callgraph.js)**: グラフの中心に特定のノード（関数）を配置し、グラフ全体の視点を調整します。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ上で選択されたノード（関数）に関する詳細情報（ファイルパス、行数、呼び出し元/先など）を情報パネルに表示します。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ上で選択されたエッジ（関数間の呼び出し関係）に関する詳細情報（呼び出しの種類、関連するコードスニペットなど）を情報パネルに表示します。
- **hideInfoPanel (generated-docs/callgraph.js)**: 関数やエッジの詳細を表示する情報パネルを非表示にします。
- **showInfoPanel (generated-docs/callgraph.js)**: 関数やエッジの詳細を表示する情報パネルを表示します。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報パネルの表示状態（表示/非表示）を切り替えます。
- **generateGitHubURL (generated-docs/callgraph.js)**: グラフのノードやエッジに関連するGitHubリポジトリのソースコードへのURLを生成します。
- **resetLayout (generated-docs/callgraph.js)**: 関数呼び出しグラフのレイアウトを初期状態にリセットし、ノードとエッジの配置を再計算します。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正するロジックのラッパー関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: グラフ内のノードが動いた際に、他のノードとの重なりを動的に検出し、修正して視認性を高めます。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: グラフ内のノードが互いに重ならないように、位置を調整して解決します。
- **switchLayout (generated-docs/callgraph.js)**: グラフの描画に使用されるレイアウトアルゴリズム（例: 力指向、ツリーなど）を切り替えます。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの選択状態、ハイライト状態などの視覚的な状態をリセットします。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体が現在のビューポートに収まるようにズームレベルを調整します。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフ内のノードに表示されるラベル（関数名など）の表示/非表示を切り替えます。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先のファイル場所に基づいてノードをフィルタリングする機能を切り替えます。
- **replace (generated-docs/callgraph.js)**: 文字列内の特定のパターンを別の文字列で置換します。
- **function (generated-docs/callgraph.js)**: 匿名関数やコールバック関数として使用されるJavaScriptのキーワード。
- **max (generated-docs/callgraph.js)**: 複数の数値の中から最大の値を返します。
- **ready (generated-docs/callgraph.js)**: DOMが完全に読み込まれて準備ができたときに実行されるイベントハンドラを登録します。
- **addListener (generated-docs/callgraph.js)**: 特定のイベントが発生したときに実行されるリスナー関数を追加します。
- **mml2json (src/mml2json.js)**: MML文字列全体を解析し、Tone.jsのシーケンサーが理解できるJSON形式の音楽データ構造に変換する、プロジェクトの核心的な関数です。
- **compileMmlToCommands (src/mml2json.js)**: MML文字列をより処理しやすい中間的なコマンドリストにコンパイルします。
- **getMmlCommands (src/mml2json.js)**: MML文字列から個々の音楽コマンド（例: 'c4', 'o5', 'l8'）を抽出し、解析可能な形式で返します。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符の開始からリリースまでの時間（ティック数）を計算します。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号（例: `[cde]`）を処理し、指定された回数だけ音楽コマンドを複製します。
- **toInt (src/mml2json.js)**: 文字列を整数値に安全に変換します。
- **calcDuration (src/mml2json.js)**: MMLの音符の長さ指定（例: `4`, `8.`, `16t`）を基に、実際の音の持続時間（ティック数）を計算します。
- **calcStartTick (src/mml2json.js)**: 各音符やイベントが開始するタイムライン上のティック位置を計算します。
- **increaseStartTick (src/mml2json.js)**: 現在のタイムライン上の開始ティック位置を、直前の音符やイベントの長さに基づいて増加させます。
- **calcLtick (src/mml2json.js)**: MMLの`L`コマンドによって設定されるデフォルトの音符長（ティック数）を計算します。
- **getNodeId (src/mml2json.js)**: グラフのノードに一意の識別子を付与するための関数。
- **sort (src/mml2json.js)**: 配列の内容を特定の基準に従って並べ替える関数。
- **play (src/play.js)**: `mml2json.js`によって生成されたJSONデータを受け取り、Tone.jsライブラリを使用してWeb Audio API経由で実際に音楽を再生する関数です。
- **sub (src/play.js)**: 数値の減算を行うか、MMLにおけるサブコマンド（例: サブメロディの指定など）を処理する。
- **hex (src/grammar.js)**: 16進数文字に関連するパーサー内部の処理を行う関数。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンス（例: `\uXXXX`）を解析するためのパーサー内部の関数。
- **literalEscape (src/grammar.js)**: リテラルエスケープシーケンス（例: `\n`, `\t`）を解析するためのパーサー内部の関数。
- **classEscape (src/grammar.js)**: 文字クラス内のエスケープシーケンス（例: `\d`）を解析するためのパーサー内部の関数。
- **describeExpectation (src/grammar.js)**: パーサーが期待する文法パターンを説明するための内部ヘルパー関数。
- **describeExpected (src/grammar.js)**: 解析中に期待されるトークンを詳細に記述する関数。
- **describeFound (src/grammar.js)**: 解析中に実際に見つかったトークンを記述する関数。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたパーサーの主要なエントリポイントであり、MML文字列を解析し、結果を返します。
- **peg$f0 (src/grammar.js)**: パーサー内部で使用される匿名関数または特定の解析ルールに関連する関数。
- **text (src/grammar.js)**: 現在の解析位置でマッチしたテキストを取得します。
- **offset (src/grammar.js)**: 現在の解析位置のオフセット（文字位置）を取得します。
- **range (src/grammar.js)**: 現在の解析範囲（開始オフセットと終了オフセット）を取得します。
- **location (src/grammar.js)**: 現在の解析位置の詳細情報（行番号、列番号など）を取得します。
- **expected (src/grammar.js)**: パーサーが解析中に期待するルールやトークンのリストを管理します。
- **error (src/grammar.js)**: パーサーのエラー処理メカニズム。解析失敗時にエラーを生成・報告します。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するためのパーサー内部関数。
- **peg$literalExpectation (src/grammar.js)**: 特定のリテラル文字列を期待するルールを定義します。
- **peg$classExpectation (src/grammar.js)**: 文字クラス（例: `[a-z]`）を期待するルールを定義します。
- **peg$anyExpectation (src/grammar.js)**: 任意の単一文字を期待するルールを定義します。
- **peg$endExpectation (src/grammar.js)**: 入力の終わりを期待するルールを定義します。
- **peg$otherExpectation (src/grammar.js)**: 上記以外の特定の条件を期待するルールを定義します。
- **peg$computePosDetails (src/grammar.js)**: 解析位置の詳細な情報を計算します。
- **peg$computeLocation (src/grammar.js)**: 解析位置の行番号や列番号などの情報を計算します。
- **peg$fail (src/grammar.js)**: 解析が失敗したことを通知し、エラー情報を収集します。
- **peg$buildSimpleError (src/grammar.js)**: シンプルな形式のエラーメッセージを構築します。
- **peg$buildStructuredError (src/grammar.js)**: 詳細な構造を持つエラーメッセージを構築します。
- **peg$parsestart (src/grammar.js)**: MML文法の`start`ルールを解析する関数。これがMML文字列解析のエントリポイントとなります。
- **peg$parsenote (src/grammar.js)**: MML文法の`note`ルールを解析する関数。個々の音符や休符などを解析します。
- **peg$throw (src/grammar.js)**: パーサーのエラーをスローし、解析プロセスを中断します。
- **constructor (src/grammar.js)**: オブジェクト指向プログラミングにおけるクラスのインスタンスを初期化するための特殊なメソッド。
- **format (src/grammar.js)**: 文字列の書式設定を行う汎用的な関数。
- **if (generated-docs/callgraph.js)**: 条件分岐を行うJavaScriptのキーワード。
- **buildMessage (src/grammar.js)**: エラーメッセージなどの特定のメッセージを構築する関数。
- **literal (src/grammar.js)**: 特定のリテラル（文字、文字列）を処理するためのパーサー内部関数。
- **class (src/grammar.js)**: 文字クラス（例：数字、アルファベット）を処理するためのパーサー内部関数。
- **any (src/grammar.js)**: 任意の文字を処理するためのパーサー内部関数。
- **end (src/grammar.js)**: 解析の終了条件を処理するためのパーサー内部関数。
- **other (src/grammar.js)**: その他のパーサー内部ルールを処理するための関数。
- **for (generated-docs/callgraph.js)**: ループ処理を行うJavaScriptのキーワード。
- **switch (generated-docs/callgraph.js)**: 複数の条件に基づいて異なる処理を実行するJavaScriptのキーワード。
- **while (src/grammar.js)**: 特定の条件が真である間、繰り返し処理を実行するJavaScriptのキーワード。
- **start (src/grammar.pegjs)**: MML文法で定義された最上位の開始ルール。MML文字列全体の構造を定義します。
- **note (src/grammar.pegjs)**: MML文法で定義された音符や休符などの音楽イベントを解析するためのルール。

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
Generated at: 2025-09-23 07:06:09 JST
