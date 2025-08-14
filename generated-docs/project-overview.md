Last updated: 2025-08-15

```markdown
# Project Overview

## プロジェクト概要
- このプロジェクトは、MML (Music Macro Language) 形式で記述された音楽データを、Web Audio APIライブラリであるTone.jsが解釈可能なJSONシーケンサー形式に変換するツールです。
- 変換されたJSONデータを用いることで、ウェブブラウザ上でMMLベースの楽曲を正確に解析し、高品質な音楽再生とシーケンスを可能にします。
- Peggyパーサージェネレーターを活用してMML記法を効率的に解析し、開発支援ツールや自動化ワークフローも充実させています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザで高度な音声処理と音楽シーケンスを実現するためのJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトに手軽に組み込むために利用されます。
    - MML (Music Macro Language) - 音楽をテキストで記述するための簡易的な記法であり、このプロジェクトの変換対象となる入力形式です。
    - Web Audio API - ブラウザに組み込まれた音声処理APIであり、Tone.jsを通じて直接的または間接的に利用され、実際の音声生成と再生を担います。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションの実行環境を提供し、開発スクリプトやビルドプロセスに利用されます。
    - npm scripts - package.jsonに定義されたスクリプトを実行するタスクランナーであり、ビルド、テスト、ドキュメント生成などの開発ワークフローを自動化します（5個のスクリプトが存在）。
    - pnpm - 高速でディスクスペースを効率的に使用するパッケージマネージャーであり、プロジェクトの依存関係管理に採用されています。
    - Google Generative AI - ドキュメント生成プロセスにおいて、自動要約や記述サポートに利用される可能性があります。
    - @octokit/rest - GitHub APIと連携し、Issue管理やドキュメント生成などの自動化ワークフローをサポートします。
- テスト:
    - Vitest - Viteをベースとした高速なユニットテストフレームワークで、プロジェクトのコードの品質と信頼性を保証するために使用されます。
    - TDD (Test-Driven Development) - テストを先に記述する開発手法であり、堅牢なコードベースの構築とバグの早期発見に貢献します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターであり、MMLのような複雑な文法を解析するためのパーサーコードを自動生成します。
    - PEG文法定義 - MML音楽記法の構文規則を定義するファイルで、PeggyによってJavaScriptパーサーに変換されます。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムであり、コードの依存関係を明確にし、効率的なバンドルとロードを可能にします。
- 自動化・CI/CD:
    - GitHub Actions - コードの変更がリポジトリにプッシュされるたびに自動的にテスト、ビルド、デプロイなどのワークフローを実行するCI/CDプラットフォームです（4個のワークフローが存在）。
        - プロジェクト要約自動生成: プロジェクトの概要ドキュメントを自動的に更新します。
        - Issue自動管理: GitHub Issuesのライフサイクル管理や自動応答をサポートします。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
        - i18n automation: 国際化対応のための自動翻訳ワークフローを指します。
- 開発標準:
    - EditorConfig - 異なるエディタやIDEを使用する開発者間で、インデントスタイル、文字コード、改行コードなどのコーディングスタイルを統一するための設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でコードのインデント、文字コード、改行コードなどの書式設定を統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、依存関係モジュール）を指定します。
- **LICENSE**: プロジェクトのソフトウェアライセンス情報（例: MIT License）を記述したファイルです。
- **README.ja.md**: プロジェクトの日本語版概要、使い方、セットアップ方法などが記載されたMarkdownファイルです。
- **README.md**: プロジェクトの英語版概要、使い方、セットアップ方法などが記載されたMarkdownファイルです。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関する情報が記載されたMarkdownファイルです。
- **dev-setup/setup.js**: 開発環境の初期設定やセットアップ処理を実行するためのJavaScriptスクリプトです。テスト関連の依存をインポートしており、テスト環境の構築の一部を担う可能性があります。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表現するインタラクティブなコールグラフのHTMLページ（拡張版）です。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用される、関数呼び出しグラフのレンダリング、インタラクション、レイアウト制御などのJavaScriptロジックが含まれています。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗に関するドキュメントです。
- **generated-docs/project-overview.md**: このドキュメント自体、または自動生成されたプロジェクト概要が含まれるMarkdownファイルです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメント（例: コールグラフ）の表示スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートディレクトリにあるHTMLファイルで、おそらくMML to Tone.js変換ツールの主要なデモやUIを提供するエントリポイントです。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報がMarkdown形式で格納されているディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係（`dependencies`, `devDependencies`）、スクリプトなどが定義されたファイルです。`npm`や`pnpm`で利用されます。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、依存関係の正確なバージョンとツリー構造を記録し、ビルドの再現性を保証します。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成された、MML文字列を解析するためのJavaScriptパーサーコードです。MML文法に基づいた構文解析ロジックが含まれます。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則をPEG (Parsing Expression Grammar) 形式で定義したファイルです。これが`src/grammar.js`を生成する元となります。
- **src/index.html**: `src`ディレクトリ内のHTMLファイルで、`index.html`と同様にMMLプレイヤーのユーザーインターフェースやデモの一部を提供する可能性があります。
- **src/main.js**: プロジェクトの主要なJavaScriptロジックのエントリポイントで、アプリケーションの初期化や主要機能の連携を担います。
- **src/mml2json.js**: MMLパーサーによって生成されたデータ構造を、Tone.jsが利用できるJSONシーケンサー形式に変換する核心的なロジックが実装されています。
- **src/play.js**: `mml2json.js`によって生成されたTone.js JSONデータを受け取り、Tone.jsライブラリを介して実際の音楽再生を実行する機能を提供します。
- **test/parser.test.js**: `src/grammar.js`によって生成されたMMLパーサーの動作を検証するための単体テストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境に関する定義が含まれます。

## 関数詳細説明
- **`catch` (dev-setup/setup.js)**: エラーが発生した場合に、そのエラーを捕捉し、適切な処理（ログ記録など）を行うための関数です。
- **`escapeHtml` (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、Webページに安全に表示できるように文字列を変換する関数です。主に呼び出しグラフのノード情報表示などで利用されます。
- **`getLayoutConfig` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトに関する設定情報を取得する関数です。グラフの表示スタイルや配置に影響します。
- **`placeCentralNode` (generated-docs/callgraph.js)**: 呼び出しグラフの中央に特定のノード（関数）を配置するロジックを処理する関数です。
- **`showNodeInfo` (generated-docs/callgraph.js)**: 呼び出しグラフの特定のノード（関数）に関する詳細情報を表示するパネルを制御する関数です。
- **`showEdgeInfo` (generated-docs/callgraph.js)**: 呼び出しグラフのエッジ（関数間の呼び出し関係）に関する詳細情報を表示するパネルを制御する関数です。
- **`hideInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルを非表示にする関数です。
- **`showInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルを表示にする関数です。
- **`toggleInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える関数です。
- **`generateGitHubURL` (generated-docs/callgraph.js)**: 関数やファイルに関連するGitHubリポジトリのURLを生成する関数です。
- **`resetLayout` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- **`watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js)**: ノードの移動を監視し、重なりを修正する処理をラップする関数です。
- **`watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js)**: 呼び出しグラフ内のノード（関数）の移動を監視し、互いに重ならないように位置を調整する関数です。
- **`resolveNodeOverlaps` (generated-docs/callgraph.js)**: ノード間の重なりを検出し、それらを解消するための位置調整を行う関数です。
- **`switchLayout` (generated-docs/callgraph.js)**: 呼び出しグラフの表示レイアウト（例: 円形、ツリー）を切り替える関数です。
- **`resetNodeStates` (generated-docs/callgraph.js)**: グラフ内のノードの表示状態（選択状態、ハイライトなど）をリセットする関数です。
- **`fitToContent` (generated-docs/callgraph.js)**: グラフ全体がビューポートに収まるようにズームレベルなどを調整する関数です。
- **`toggleNodeLabels` (generated-docs/callgraph.js)**: グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- **`toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: 呼び出される側の関数の場所に基づいてフィルタリングを切り替える関数です。
- **`replace` (generated-docs/callgraph.js)**: 文字列の置換処理を行う汎用関数です。
- **`function`, `max`, `on`, `if`, `for`, `ready`, `addListener`, `switch` (generated-docs/callgraph.js)**: これらはJavaScriptの基本的なキーワードや一般的なユーティリティ関数であり、`callgraph.js`内で特定のロジックやイベントハンドリング、条件分岐、ループ処理などに利用されています。
- **`mml2json` (src/mml2json.js)**: MMLコマンドのリストを受け取り、Tone.jsのJSONシーケンサーフォーマットに変換する主要な関数です。MMLから音楽データを生成する中心的な役割を担います。
    - 引数: MMLコマンドの配列（または文字列）
    - 戻り値: Tone.jsシーケンサー形式のJSONオブジェクト
    - 機能: MMLの音符、休符、テンポ、オクターブ、長さなどの情報を解析し、Tone.jsが再生可能なJSON構造に変換します。
- **`compileMmlToCommands` (src/mml2json.js)**: MML文字列を内部的なコマンド表現にコンパイルする関数です。`mml2json`が呼び出す前処理です。
- **`getMmlCommands` (src/mml2json.js)**: MMLの特定の要素からコマンドを抽出するヘルパー関数です。
- **`calcAttackToReleaseTicks` (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算する関数です。
- **`repeat` (src/mml2json.js)**: MMLの繰り返し記法を処理する関数です。
- **`toInt` (src/mml2json.js)**: 文字列を整数に変換するヘルパー関数です。
- **`calcDuration` (src/mml2json.js)**: 音符の長さを計算する関数です。
- **`calcStartTick` (src/mml2json.js)**: 各イベントの開始ティックを計算する関数です。
- **`increaseStartTick` (src/mml2json.js)**: 現在の開始ティックを増分させる関数です。
- **`calcLtick` (src/mml2json.js)**: MMLのLコマンド（デフォルトの音符長）を処理する関数です。
- **`getNodeId` (src/mml2json.js)**: 内部的なノードIDを生成または取得する関数です。
- **`sort` (src/mml2json.js)**: 配列をソートする汎用関数です。
- **`play` (src/play.js)**: Tone.js JSONデータに基づいて音楽再生を開始する関数です。
    - 引数: Tone.js JSON形式の音楽データ
    - 戻り値: なし (または再生制御オブジェクト)
    - 機能: Tone.jsエンジンを初期化し、与えられたJSONデータをシーケンサーに渡し、音楽の再生を開始します。
- **`sub` (src/play.js)**: `play`関数によって呼び出される補助的な関数で、音楽再生の詳細なロジックの一部を処理します。
- **`hex`, `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `peg$parse`, `peg$f0`, `text`, `offset`, `range`, `location`, `expected`, `error`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$parsestart`, `peg$parsenote`, `peg$throw`, `constructor`, `format`, `if`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while` (src/grammar.js)**: これらはPeggyパーサージェネレーターによって自動生成されたMMLパーサーの内部関数群です。MML文字列を解析し、トークン化、構文木の構築、エラー報告などの低レベルなパーシング操作を実行します。これらは通常、直接呼び出されることはなく、パーサーの動作を構成する要素です。
- **`start`, `note` (src/grammar.pegjs)**: これらは`src/grammar.pegjs`で定義されたPEG文法のルール名です。`start`はパーシングの開始点となるトップレベルのルールを、`note`はMMLの音符の構文を定義するルールを指します。これらはJavaScript関数としては直接存在せず、`src/grammar.js`にコンパイルされる際にパーサー内部のメソッドとして具現化されます。

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
Generated at: 2025-08-15 07:03:35 JST
