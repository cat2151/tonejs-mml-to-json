Last updated: 2025-08-05

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をWeb Audio APIライブラリTone.jsのJSONシーケンサー形式に変換するツールです。
- これにより、ブラウザ上でMML記法に基づいた音楽の生成、シーケンス、再生を可能にします。
- Peggyパーサージェネレーターを用いてMMLを解析し、高機能なサウンド出力とインタラクティブな音楽体験を提供します。

## 技術スタック
- フロントエンド: **HTML5** (ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築)
- 音楽・オーディオ: **Tone.js** (Web Audio APIを抽象化し、高度な音声処理とシーケンスを可能にするJavaScriptライブラリ)、**Tone.js CDN** (unpkg経由でTone.jsライブラリを配信)、**MML (Music Macro Language)** (音楽記法をテキストで表現するためのパーサー技術)、**Web Audio API** (ブラウザ内で高機能なオーディオ処理を行うための標準API、Tone.js経由で利用)
- 開発ツール: **Node.js runtime** (JavaScript実行環境)、**npm scripts** (プロジェクトの様々なタスクを自動化するスクリプト群、5個のスクリプトを定義)、**pnpm** (高速でディスク効率の良いパッケージマネージャー)、**Google Generative AI** (AIを活用した文書生成やコンテンツ作成をサポート)、**@octokit/rest** (GitHub APIをJavaScriptから操作するためのライブラリ)、**dotenv** (環境変数をロードするためのモジュール)
- テスト: **Vitest** (Viteを基盤とした高速なテストフレームワーク)、**TDD (Test-Driven Development)** (テストを先に書く開発手法を採用)
- ビルドツール: **Peggy** (PEG (Parsing Expression Grammar) パーサージェネレーター、MMLパーサーの生成に利用)、**PEG文法定義** (MML音楽記法のパーサーを生成するための文法ルール)
- 言語機能: **ES Modules** (モダンなJavaScriptでモジュールをインポート・エクスポートするための標準的なシステム)
- 自動化・CI/CD: **GitHub Actions** (CI/CDワークフローを自動化、プロジェクト要約の自動生成、Issue自動管理、READMEの多言語翻訳、i18n自動化ワークフローを含む4個のワークフロー)
- 開発標準: **EditorConfig** (異なるエディタやIDE間でコードの整形ルールを統一するための設定ファイル)

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
- **.editorconfig**: 異なるエディタやIDE間でコードのインデントスタイル、文字コードなどの整形ルールを統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理対象から除外するファイルやディレクトリを指定します。ビルド生成物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトの利用条件や著作権を定めるライセンス情報（例: MITライセンス）が記述されています。
- **README.ja.md / README.md**: プロジェクトの概要、インストール方法、使い方、開発への貢献方法などを説明する多言語対応のメインドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や、開発に役立つ情報が記述されています。
- **dev-setup/setup.js**: 開発環境の初期設定や、特定の開発タスクを自動化するためのJavaScriptスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数の呼び出し関係を視覚的に表現したインタラクティブなグラフを表示するHTMLファイルです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画、インタラクション、ノード情報の表示などを制御するJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの開発状況、現在の進捗、今後のロードマップなどに関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの全体像や主要な側面をまとめたドキュメントです。
- **generated-docs/style.css**: 生成されたドキュメントや呼び出しグラフの視覚スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのWebデモページやメインのアプリケーションエントリーポイントとなるHTMLファイルで、MMLプレイヤーのインターフェースを提供します。
- **issue-notes/** (ディレクトリ): GitHub Issuesに関連する個別のメモや詳細情報が格納されています。（内容の詳細は生成しないルールに基づき省略）
- **package.json**: Node.jsプロジェクトのメタデータ（プロジェクト名、バージョン、説明など）、依存関係、開発依存関係、実行スクリプトなどを定義するファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係ツリーを固定し、ビルドの再現性を保証します。
- **src/grammar.js**: `src/grammar.pegjs`のPEG文法定義からPeggyパーサージェネレーターによって生成されたJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）を構築するMMLパーサーの実体です。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を記述したPEG (Parsing Expression Grammar) 形式のファイルです。このファイルが`src/grammar.js`を生成するための元となります。
- **src/index.html**: `index.html`と同様に、MMLプレイヤーのフロントエンド部分を提供します。
- **src/main.js**: アプリケーションのメインロジックの開始点となるJavaScriptファイルです。
- **src/mml2json.js**: MMLパーサーが出力したMMLコマンドやASTを、Tone.jsのシーケンサーが解釈できるJSON形式のデータ構造に変換する主要なロジックを実装しています。音符のデュレーション計算、繰り返し処理などを担当します。
- **src/play.js**: `mml2json.js`で生成されたTone.js互換のJSONデータを実際にWeb Audio APIとTone.jsを使って再生する機能を提供するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーのテストコードです。`vitest`フレームワークを使用して、MML文字列が正しく解析されるか検証します。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テストの実行方法や環境に関する設定を定義します。

## 関数詳細説明
- **mml2json** (src/mml2json.js): MMLパーサーからの出力（MMLコマンド）を受け取り、Tone.jsが利用可能なJSONシーケンサー形式に変換する主要な関数です。音符の長さや開始時刻などを計算し、シーケンスデータを構築します。
- **compileMmlToCommands** (src/mml2json.js): MML文字列を解析し、中間的なMMLコマンドのリストにコンパイルする役割を担います。
- **getMmlCommands** (src/mml2json.js): MMLコマンドのリストを取得するユーティリティ関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタックからリリースまでのティック数を計算します。MMLにおける音符の持続時間を正確に算出するために使用されます。
- **repeat** (src/mml2json.js): MMLの繰り返し記号に対応し、指定された回数だけ音楽パターンを繰り返すロジックを処理します。
- **toInt** (src/mml2json.js): 文字列形式の数値を整数に安全に変換するためのユーティリティ関数です。
- **calcDuration** (src/mml2json.js): MMLの記法に基づいて音符のデュレーション（長さ）を計算します。
- **calcStartTick** (src/mml/mml2json.js): 音符の開始時刻をティック単位で計算します。
- **increaseStartTick** (src/mml/mml2json.js): シーケンス内の次のイベントの開始ティックを更新・増加させます。
- **calcLtick** (src/mml/mml2json.js): MMLのLコマンド（音の長さの基準）に基づいてティック値を計算します。
- **getNodeId** (src/mml/mml2json.js): 内部的にノード（イベント）を一意に識別するためのIDを生成・取得します。
- **play** (src/play.js): `mml2json`で生成されたTone.js JSONシーケンスデータを、実際にTone.jsとWeb Audio APIを使用してブラウザで音楽として再生する関数です。
- **sub** (src/play.js): `play`関数から呼び出される補助的な関数で、再生ロジックの一部をカプセル化しています。
- **hex, unicodeEscape, literalEscape, classEscape** (src/grammar.js): `src/grammar.js`内で定義されるパーサーの内部ヘルパー関数群で、文字列のエスケープ処理や文字コードの変換に関連します。
- **describeExpectation, describeExpected, describeFound** (src/grammar.js): パーサーが構文解析エラーを検出した際に、より詳細で分かりやすいエラーメッセージを生成するために使用される関数群です。
- **peg$parse, peg$f0, text, offset, range, location, expected, error, peg$getUnicode, peg$literalExpectation, peg$classExpectation, peg$anyExpectation, peg$endExpectation, peg$otherExpectation, peg$computePosDetails, peg$computeLocation, peg$fail, peg$buildSimpleError, peg$buildStructuredError, peg$parsestart, peg$parsenote, peg$throw, constructor, format, buildMessage** (src/grammar.js): これらはPeggyパーサージェネレーターによって自動生成されたMMLパーサーのコアとなる内部関数群です。MML文字列のトークン化、構文木の構築、エラー報告、位置情報の追跡など、解析処理の全てを担います。
- **start, note** (src/grammar.pegjs): `src/grammar.pegjs`ファイル内で定義されるMML文法のルール名です。`start`は解析の開始点、`note`はMMLにおける音符の定義を示します。
- **catch** (dev-setup/setup.js): 一般的なエラーハンドリングのためのブロックや関数で、非同期処理などで発生した例外を捕捉します。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションなどを防ぎ安全にHTMLに文字列を表示するためのユーティリティ関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトに関する設定情報を取得します。
- **placeCentralNode** (generated-docs/callgraph.js): 呼び出しグラフの中心となるノード（関数）を配置する処理を担います。
- **showNodeInfo, showEdgeInfo** (generated-docs/callgraph.js): グラフ内のノード（関数）やエッジ（呼び出し関係）をクリックした際に、その詳細情報をパネルに表示する機能を提供します。
- **hideInfoPanel, showInfoPanel, toggleInfoPanel** (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を制御する関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): 関連するソースコードやドキュメントへのGitHub URLを生成します。
- **resetLayout** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットします。
- **watchNodeMovementAndFixOverlapsWrap, watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): グラフノードの動きを監視し、ノード同士が重ならないように位置を調整する機能に関連する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): グラフノードの重なりを解決し、視覚的に見やすく配置します。
- **switchLayout** (generated-docs/callgraph.js): 呼び出しグラフのレイアウト表示形式（例：ツリー、フォースディレクテッドなど）を切り替える機能です。
- **resetNodeStates** (generated-docs/callgraph.js): グラフノードの選択状態や強調表示などをリセットします。
- **fitToContent** (generated-docs/callgraph.js): グラフ全体が画面内に収まるようにズームレベルを調整します。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードに表示されるラベルの表示/非表示を切り替えます。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し元/呼び出し先の関数表示を特定の場所でフィルタリングする機能を切り替えます。
- **on, addListener** (generated-docs/callgraph.js): イベントリスナーを設定するための一般的な関数です。
- **ready** (generated-docs/callgraph.js): DOMが読み込み完了した際に実行される処理を定義するイベントハンドラです。
- **sort** (src/mml2json.js): 配列をソートするための標準的なJavaScriptのメソッドです。
- **if, for, switch, function, max, replace** (様々なファイル): これらはJavaScriptの基本的な制御フロー構造、関数定義、組み込み関数であり、特定のビジネスロジックではなく汎用的なプログラミングパターンとして使用されます。

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
  - constructor ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-08-05 07:03:46 JST
