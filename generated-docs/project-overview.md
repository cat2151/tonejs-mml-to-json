Last updated: 2025-09-19

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsが解釈可能なJSONシーケンサー形式に変換するツールです。
- ウェブブラウザ上でMML記法に基づいた音楽を再生するための基盤を提供します。
- 音楽プログラミング愛好家やウェブオーディオ開発者向けのユーティリティです。

## 技術スタック
- フロントエンド:
  - HTML5: ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ:
  - Tone.js: Web Audio APIをラップした高機能な音声ライブラリで、ブラウザでの音楽シーケンスとシンセシスを可能にします。
  - Web Audio API: ブラウザに組み込まれた低レベルの音声処理APIで、Tone.jsを通じて利用されます。
  - Tone.js CDN: unpkg経由でTone.jsライブラリを配信し、手軽に利用できるようにします。
  - MML (Music Macro Language): 音楽をテキスト形式で記述するための記法であり、このプロジェクトでパーシングの対象となります。
- 開発ツール:
  - Node.js runtime: JavaScriptコードを実行するための環境を提供します。
  - npm scripts: プロジェクトのビルド、テスト、実行などのタスクを自動化するためのスクリプト群です。
  - pnpm: 依存関係のインストールを高速かつ効率的に行うパッケージマネージャーです。
  - Google Generative AI: AIによる文書生成（例: プロジェクト要約）をサポートするために利用されます。
  - @octokit/rest: GitHub APIと連携し、GitHub上での自動化や情報取得に利用されます。
- テスト:
  - Vitest: Viteをベースとした高速なJavaScriptテストフレームワークで、コードの品質と信頼性を確保します。
  - TDD (Test-Driven Development): テストを先に書く開発手法で、堅牢なコードベースの構築に貢献します。
- ビルドツール:
  - Peggy: PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MML記法を解析するためのパーサーを自動生成します。
  - PEG文法定義: MMLの構文ルールを記述するための文法ファイルで、Peggyによってパーサーが生成されます。
- 言語機能:
  - ES Modules: モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用性を高めます。
- 自動化・CI/CD:
  - GitHub Actions: コードの変更を検知し、テスト、デプロイ、ドキュメント生成などのワークフローを自動化するCI/CDプラットフォームです。
    - プロジェクト要約自動生成: AIを利用してプロジェクト概要を自動で生成するワークフローです。
    - Issue自動管理: GitHub Issuesの管理を自動化するワークフローです。
    - README多言語翻訳: READMEファイルを複数の言語に自動翻訳するワークフローです。
    - i18n automation: 国際化（i18n）関連の翻訳作業を自動化します。
- 開発標準:
  - EditorConfig: 異なるIDEやエディターを使用する開発者間で、コードのインデント、行末文字などのコーディングスタイルを統一するための設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でのコードスタイル（インデント、改行コードなど）の一貫性を保証するための設定ファイルです。
- **.gitignore**: Gitによってバージョン管理の対象外とするファイルやディレクトリ（例: ビルド成果物、依存関係モジュール）を指定します。
- **LICENSE**: プロジェクトの著作権、利用許諾、再配布に関する法的情報を提供します。
- **README.ja.md**, **README.md**: プロジェクトの概要、機能、インストール方法、使い方などを説明するドキュメントファイルです（日本語版と英語版）。
- **dev-setup/README.md**: 開発環境のセットアップ手順や関連情報に関するドキュメントです。
- **dev-setup/setup.js**: 開発環境の準備や初期設定を行うためのJavaScriptスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係をインタラクティブに可視化したドキュメントのHTMLファイルです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの描画、操作、情報表示ロジックを含むJavaScriptファイルです。
- **generated-docs/style.css**: 生成されたドキュメントのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのメインのエントリーポイントとなるHTMLファイル、またはMMLプレイヤーのデモページです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係）を定義するファイルで、npm/pnpmによって管理されます。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーが生成するロックファイルで、プロジェクトの依存関係の正確なツリー構造とバージョンを固定し、再現性を保証します。
- **src/grammar.js**: `grammar.pegjs`で定義されたMML文法に基づき、Peggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析して抽象構文木 (AST) に変換します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文ルールを定義するPEG (Parsing Expression Grammar) ファイルです。この定義からパーサーが生成されます。
- **src/index.html**: MMLプレイヤー機能を含むアプリケーションのデモまたはメインのエントリーポイントとなるHTMLファイルです。
- **src/main.js**: アプリケーションの主要なロジックを統括し、MMLの入力、変換、再生のワークフローを管理するJavaScriptファイルです。
- **src/mml2json.js**: MMLパーサーによって生成されたASTを受け取り、Tone.jsライブラリが利用可能なJSON形式のシーケンサーデータに変換する核心的なロジックを実装したJavaScriptファイルです。
- **src/play.js**: `mml2json.js`で生成されたJSONシーケンサーデータを利用して、Tone.jsを通じて実際にブラウザ上で音楽を再生するロジックを実装したJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの正確性を検証するためのテストスイートを定義するJavaScriptファイルです。Vitestフレームワークを使用します。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法やカバレッジレポートなどのオプションを定義します。

## 関数詳細説明
- `catch` (dev-setup/setup.js): エラー発生時に処理を捕捉し、適切に対応するための汎用的なエラーハンドリング関数です。
- `escapeHtml` (generated-docs/callgraph.js): HTMLの特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティリスクを防ぐユーティリティ関数です。
- `getLayoutConfig` (generated-docs/callgraph.js): グラフ描画ライブラリにおけるレイアウト設定（ノードの配置や接続線のスタイルなど）を取得する関数です。
- `placeCentralNode` (generated-docs/callgraph.js): グラフの中心となるノードを特定の座標に配置する関数です。
- `showNodeInfo` (generated-docs/callgraph.js): グラフ上の特定のノード（関数など）に関する詳細情報を表示するUI要素を制御する関数です。
- `showEdgeInfo` (generated-docs/callgraph.js): グラフ上のエッジ（関数呼び出しなど）に関する詳細情報を表示するUI要素を制御する関数です。
- `hideInfoPanel` (generated-docs/callgraph.js): 情報表示パネルを非表示にする関数です。
- `showInfoPanel` (generated-docs/callgraph.js): 情報表示パネルを表示する関数です。
- `toggleInfoPanel` (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替える関数です。
- `generateGitHubURL` (generated-docs/callgraph.js): GitHubリポジトリ上の特定のファイルや行へのURLを生成する関数です。
- `resetLayout` (generated-docs/callgraph.js): グラフのノード配置やズームレベルなどを初期状態に戻す関数です。
- `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの動きを監視し、重なりが発生しないように自動調整する処理のラッパー関数です。
- `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): ノードの動きを監視し、他のノードとの重なりを検出し、解消するコアロジックを実装した関数です。
- `resolveNodeOverlaps` (generated-docs/callgraph.js): グラフ内のノードが重なっている場合に、それらを離して視認性を向上させるための位置調整を行う関数です。
- `switchLayout` (generated-docs/callgraph.js): グラフの描画レイアウトアルゴリズムを切り替える関数です。
- `resetNodeStates` (generated-docs/callgraph.js): グラフノードの選択状態や強調表示などを初期状態に戻す関数です。
- `fitToContent` (generated-docs/callgraph.js): グラフ全体がビューポートに収まるようにズームレベルを調整する関数です。
- `toggleNodeLabels` (generated-docs/callgraph.js): グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出し先のファイルパスなどに基づいてノードの表示をフィルタリングする機能を切り替える関数です。
- `replace`, `switch`, `function`, `max`, `on`, `if`, `for`, `ready`, `addListener` (generated-docs/callgraph.js): これらはJavaScriptの組み込み機能や一般的なプログラミングパターン、あるいはイベントハンドリングに関連する汎用的な関数やキーワードです。`generated-docs/callgraph.js`のコンテキストでは、グラフ操作のためのイベント処理やデータ変換の一部として利用されています。
- `hex`, `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `text`, `offset`, `range`, `location`, `expected`, `error`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$throw`, `constructor`, `format`, `if`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while` (src/grammar.js): これらの関数は、MMLパーサー（`peg$parse`）の内部処理を構成するもので、主にMML文字列の解析、エラー処理、位置情報の計算、期待されるトークンの記述などに関連します。特に`peg$`プレフィックスを持つものは、PeggyパーサージェネレーターによってMML文法定義から自動生成された内部ヘルパー関数です。
- `peg$parse` (src/grammar.js): MML文字列を解析し、その構造を抽象構文木 (AST) に変換するパーサーのメインエントリポイント関数です。
- `peg$parsestart` (src/grammar.js): MML文法の開始ルールに従って解析を進める関数です。
- `peg$parsenote` (src/grammar.js): MML文法における音符のルールに従って解析を進める関数です。
- `start` (src/grammar.pegjs): Peggy文法定義における、パーシングの開始点となるルールです。MML全体の構成要素を定義します。
- `note` (src/grammar.pegjs): Peggy文法定義における、単一の音符や休符、およびその修飾子（長さ、音量など）を解析するためのルールです。
- `mml2json` (src/mml2json.js):
  - 役割: MMLパーサーの出力（AST）をTone.jsが利用できるJSONシーケンサー形式に変換する主要な関数。
  - 引数: `mml` (文字列またはパース済みMMLオブジェクト)
  - 戻り値: Tone.jsのイベント形式に合わせたJSON配列
  - 機能: MMLコマンド（音符、テンポ、オクターブ変更など）を解析し、Tone.jsの`Part`や`Sequence`で利用可能な`[time, note]`形式のイベントリストに変換します。
- `compileMmlToCommands` (src/mml2json.js): MML文字列を解析し、個々のMMLコマンドのリストにコンパイルする関数です。
- `getMmlCommands` (src/mml2json.js): MMLの解析結果から、実行すべき個々のMMLコマンドを抽出するヘルパー関数です。
- `calcAttackToReleaseTicks` (src/mml2json.js): 音符のアタック（発音開始）からリリース（発音終了）までのティック数を計算する関数です。
- `repeat` (src/mml2json.js): 特定の処理を指定回数繰り返すためのユーティリティ関数です。
- `toInt` (src/mml2json.js): 入力値を整数型に安全に変換するヘルパー関数です。
- `calcDuration` (src/mml2json.js): MMLの音符の長さ指定に基づいて、音符の正確なデュレーション（持続時間）を計算する関数です。
- `calcStartTick` (src/mml2json.js): 各MMLイベントが開始する正確なティック位置を計算する関数です。
- `increaseStartTick` (src/mml2json.js): シーケンス内の次のイベントの開始ティックを更新・増加させる関数です。
- `calcLtick` (src/mml2json.js): MMLの音長指定に関連する内部的なティック値を計算するヘルパー関数です。
- `getNodeId` (src/mml2json.js): 処理中のMMLノードに一意のIDを割り当てる、または取得する関数です。
- `sort` (src/mml2json.js): 生成されたイベントリストなどを、時間順にソートするための関数です。
- `play` (src/play.js):
  - 役割: `mml2json`で生成されたJSONシーケンスデータを受け取り、Tone.jsを使用して音楽として再生を開始する関数。
  - 引数: `sequenceData` (Tone.jsが解釈可能なJSON配列)
  - 戻り値: なし (サイドエフェクトとして音楽再生を開始)
  - 機能: Tone.jsの`Transport`と`Part`を初期化・設定し、与えられたシーケンスデータをロードして、ブラウザ上でMML音楽を再生します。
- `sub` (src/play.js): 音楽再生ロジック内で利用される、補助的な処理を実行する関数です。

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
Generated at: 2025-09-19 07:06:35 JST
