Last updated: 2025-08-22

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の音楽データを、Web Audio APIライブラリTone.jsが解釈可能なJSONシーケンサー形式へ変換します。
- ブラウザ上でMMLをリアルタイムに解析し、音楽再生を可能にするためのパーサーと再生ロジックを提供します。
- 開発プロセスはTDD、CI/CD、自動化ツールを活用し、効率的かつ高品質なコードベースを維持しています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLの入力・表示・再生機能を提供するユーザーインターフェースを構築します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成とシーケンスを可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkgを通じてTone.jsライブラリを効率的に配信し、利用します。
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法であり、このプロジェクトの主要な入力形式です。
    - Web Audio API - ブラウザに内蔵された音声処理APIで、Tone.jsを通じて間接的に利用されます。
- 開発ツール:
    - Node.js runtime - プロジェクトのJavaScriptコードを実行するための環境を提供します。
    - npm scripts - ビルド、テスト、ドキュメント生成などの様々な開発タスクを自動化・管理します。
    - pnpm - 高速かつディスクスペースを効率的に使用するパッケージマネージャーです。
    - Google Generative AI - ドキュメント生成やその他のテキスト関連タスクを支援するためにAIを活用します。
    - @octokit/rest - GitHub APIと連携し、Issue管理やリポジトリ操作を自動化します。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストを実行します。
    - TDD (Test-Driven Development) - コードを書く前にテストを記述する開発手法を採用し、品質と設計の向上を目指します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの構文解析器を自動生成します。
    - PEG文法定義 - MML音楽記法の構文ルールを記述し、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を高めます。
- 自動化・CI/CD:
    - GitHub Actions - コードの変更がプッシュされるたびに自動テスト、ビルド、デプロイなどのワークフローを実行し、CI/CDプロセスを自動化します。
    - プロジェクト要約自動生成 - プロジェクトの情報を自動的に要約する仕組みです。
    - Issue自動管理 - GitHub Issuesの作成、更新、クローズなどの管理を自動化します。
    - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳します。
    - i18n automation - 国際化（i18n）に関連する自動翻訳ワークフローを管理します。
- 開発標準: EditorConfig - 異なるエディタやIDEを使用する開発者間でも、コードの書式設定（インデント、改行など）を統一するための設定ファイルです。

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
- **.editorconfig**: 異なるエディタやIDE間でのコードの整形ルール（インデントスタイル、文字コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定するファイルで、ビルド成果物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトのライセンス情報が記述されており、このソフトウェアの利用条件を定めます。
- **README.ja.md**: プロジェクトの日本語での概要、使用方法、開発情報などが記載された説明書です。
- **README.md**: プロジェクトの英語での概要、使用方法、開発情報などが記載された説明書です。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報や手順を説明するファイルです。
- **dev-setup/setup.js**: 開発環境の初期設定やテストの準備などを行うためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を可視化したドキュメントを、よりリッチなUIで表示するためのHTMLファイルです。
- **generated-docs/callgraph.js**: 関数呼び出し階層のデータを取得し、グラフとして描画するためのJavaScriptロジックが含まれています。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況や進捗に関する情報が記載されたドキュメントです。
- **generated-docs/project-overview.md**: プロジェクト全体の概要をまとめたドキュメントで、この出力のような内容が含まれます。
- **generated-docs/style.css**: 生成されたドキュメントや可視化グラフのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのメインのエントリーポイントとなるHTMLファイルで、デモやアプリケーションの開始点です。
- **issue-notes/**: (開発者向け情報のため詳細説明を省略)
- **package.json**: プロジェクトのメタデータ（名前、バージョン、スクリプトなど）および依存関係パッケージを定義するファイルです。
- **pnpm-lock.yaml**: pnpmによってインストールされたパッケージの正確な依存関係ツリーとバージョンを記録し、再現可能なビルドを保証するファイルです。
- **src/grammar.js**: `grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコードです。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文ルールを定義するPEG (Parsing Expression Grammar) 形式のファイルです。
- **src/index.html**: `src`ディレクトリ内のデモやテスト用のHTMLファイルです。
- **src/main.js**: メインのJavaScriptロジックが含まれるファイルで、アプリケーションのエントリーポイントとして機能します。
- **src/mml2json.js**: MML文字列を解析し、Tone.jsのシーケンサーが解釈できるJSON形式に変換する主要なロジックが実装されています。
- **src/play.js**: 変換されたTone.js JSONデータを受け取り、実際にWeb Audio APIとTone.jsを使用して音楽を再生するロジックが含まれています。
- **test/parser.test.js**: MMLパーサー (`src/grammar.js`) の正確性を検証するためのVitestによる単体テストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法やカバレッジレポートなどを定義します。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラー発生時に例外を捕捉し、適切なエラーハンドリングを行うためのブロックまたは関数です。
- **mml2json (src/mml2json.js)**: MML文字列を受け取り、それをTone.jsが利用可能なJSONシーケンサー形式に変換する中心的な関数です。
- **compileMmlToCommands (src/mml2json.js)**: MML文字列を解析し、個々の音楽コマンド（音符、休符、テンポ変更など）のリストにコンパイルします。
- **getMmlCommands (src/mml2json.js)**: コンパイルされたMMLコマンドのリストから、次のステップで処理されるコマンドを取得します。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符の攻撃開始からリリースまでの時間（ティック単位）を計算します。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号（例: `[CDEFG]`）を処理し、指定された回数だけ音楽パターンを繰り返すロジックを適用します。
- **toInt (src/mml2json.js)**: 値を整数に変換するユーティリティ関数です。
- **calcDuration (src/mml2json.js)**: MMLの音符の長さ（例: `C4`, `D8`）に基づいて、その持続時間を計算します。
- **calcStartTick (src/mml2json.js)**: 各音符やイベントの開始タイミング（ティック単位）を計算します。
- **increaseStartTick (src/mml2json.js)**: 現在の開始ティックを次のイベントのために増加させます。
- **calcLtick (src/mml2json.js)**: MMLのLコマンド（デフォルトの音符長さ設定）に基づいて、ティック単位の長さを計算します。
- **getNodeId (src/mml2json.js)**: 各ノード（音符やコマンド）にユニークなIDを割り当てるために使用されます。
- **sort (src/mml2json.js)**: 配列内の要素を特定の基準に基づいてソートするために使用される汎用的なソート関数です。
- **play (src/play.js)**: 変換されたTone.js JSONデータを受け取り、ブラウザ上で音楽の再生を開始する関数です。
- **sub (src/play.js)**: `play`関数内で使用される補助的な関数で、再生ロジックの一部を担います。
- **escapeHtml (generated-docs/callgraph.js)**: HTML文字列中の特殊文字をエスケープし、スクリプトインジェクションなどを防ぎ、安全に表示できるようにします。
- **getLayoutConfig (generated-docs/callgraph.js)**: 関数呼び出しグラフのレイアウト設定を取得または生成します。
- **placeCentralNode (generated-docs/callgraph.js)**: グラフの中心となるノードを配置します。
- **showNodeInfo (generated-docs/callgraph.js)**: 特定のノード（関数）に関する詳細情報を表示パネルに表示します。
- **showEdgeInfo (generated-docs/callgraph.js)**: 特定のエッジ（呼び出し関係）に関する詳細情報を表示パネルに表示します。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にします。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示します。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替えます。
- **generateGitHubURL (generated-docs/callgraph.js)**: 関数に関連するGitHub上のソースコードへのURLを生成します。
- **resetLayout (generated-docs/callgraph.js)**: グラフのレイアウトを初期状態にリセットします。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、重なりを修正する処理をラップする関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: グラフ内のノードが重ならないように位置を調整するロジックです。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: 具体的にノードの重なりを解決するためのアルゴリズムを実行します。
- **switchLayout (generated-docs/callgraph.js)**: グラフの表示レイアウト（例：ツリー、フォースディレクテッド）を切り替えます。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの強調表示などの状態をリセットします。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体がビューポートに収まるようにズームレベルや位置を調整します。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフノードに表示されるラベルの表示/非表示を切り替えます。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出された関数の位置に基づいてフィルタリングを行う機能のオン/オフを切り替えます。
- **hex (src/grammar.js)**: MMLパーサー内で16進数値を解析する際に使用される内部関数です。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理するパーサー内部関数です。
- **literalEscape (src/grammar.js)**: リテラル文字のエスケープシーケンスを処理するパーサー内部関数です。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープシーケンスを処理するパーサー内部関数です。
- **describeExpectation (src/grammar.js)**: パーサーが期待する構文要素を記述するための内部ヘルパー関数です。
- **describeExpected (src/grammar.js)**: 期待されるトークンやパターンを説明する内部関数です。
- **describeFound (src/grammar.js)**: 構文解析中に見つかった要素を説明する内部関数です。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリーポイントで、入力文字列を解析します。
- **peg$f0 (src/grammar.js)**: Peggyによって生成された内部関数で、パーサーロジックの一部を構成します。
- **text (src/grammar.js)**: 現在解析中のテキストを取得するパーサー内部メソッドです。
- **offset (src/grammar.js)**: 現在の解析位置のオフセットを取得するパーサー内部メソッドです。
- **range (src/grammar.js)**: 現在の解析範囲を取得するパーサー内部メソッドです。
- **location (src/grammar.js)**: 現在の解析位置の行番号や列番号などの詳細な場所情報を取得するパーサー内部メソッドです。
- **expected (src/grammar.js)**: パーサーが現在の位置で期待するものを管理するパーサー内部メソッドです。
- **error (src/grammar.js)**: パーサーのエラーオブジェクトを生成または処理する内部メソッドです。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するパーサー内部ユーティリティです。
- **peg$literalExpectation (src/grammar.js)**: リテラル文字列の期待値オブジェクトを生成するパーサー内部関数です。
- **peg$classExpectation (src/grammar.js)**: 文字クラスの期待値オブジェクトを生成するパーサー内部関数です。
- **peg$anyExpectation (src/grammar.js)**: 任意の一文字の期待値オブジェクトを生成するパーサー内部関数です。
- **peg$endExpectation (src/grammar.js)**: 入力終了の期待値オブジェクトを生成するパーサー内部関数です。
- **peg$otherExpectation (src/grammar.js)**: その他の汎用的な期待値オブジェクトを生成するパーサー内部関数です。
- **peg$computePosDetails (src/grammar.js)**: 解析位置の詳細（行、列など）を計算するパーサー内部関数です。
- **peg$computeLocation (src/grammar.js)**: 位置情報オブジェクトを計算するパーサー内部関数です。
- **peg$fail (src/grammar.js)**: 解析失敗を通知するパーサー内部関数です。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなエラーオブジェクトを構築するパーサー内部関数です。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたエラーオブジェクトを構築するパーサー内部関数です。
- **peg$parsestart (src/grammar.js)**: MMLパーサーの`start`ルールに対応する内部解析関数です。
- **peg$parsenote (src/grammar.js)**: MMLパーサーの`note`ルールに対応する内部解析関数です。
- **peg$throw (src/grammar.js)**: エラーをスローするパーサー内部関数です。
- **start (src/grammar.pegjs)**: MML文法定義における開始ルールで、パーサーが最初に解析を始めるエントリポイントです。
- **note (src/grammar.pegjs)**: MML文法定義における音符の解析ルールです。
- **on (generated-docs/callgraph.js)**: イベントリスナーを登録する一般的な関数で、グラフのインタラクションに使用されます。
- **ready (generated-docs/callgraph.js)**: DOMが完全にロードされたときに実行されるイベントハンドラを登録する関数です。
- **addListener (generated-docs/callgraph.js)**: 特定のイベントが発生したときに呼び出されるリスナー関数を追加する一般的なメソッドです。

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
Generated at: 2025-08-22 07:03:49 JST
