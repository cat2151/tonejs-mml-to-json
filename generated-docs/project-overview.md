Last updated: 2025-08-20

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) 形式で記述された音楽データを、Web Audio APIを扱うためのTone.js JSONシーケンサーフォーマットに変換するツールです。
- この変換により、ブラウザ上でMMLベースの音楽を手軽に再生できるプレイヤー機能を提供します。
- 高速なパーサージェネレーター（Peggy）とテスト駆動開発（TDD）を活用し、堅牢なMML解析と変換ロジックを実現しています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザで高度な音声処理を行うためのJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、ウェブページから直接利用されます。
    - MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトの主要な入力形式です。
    - Web Audio API - ブラウザに組み込まれている音声処理APIで、Tone.jsを通じて間接的に利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションの実行環境として利用されます。
    - npm scripts - パッケージ管理と開発ワークフローを自動化するためのタスクランナーです。
    - pnpm - 高速で効率的なJavaScriptパッケージマネージャーです。
    - Google Generative AI - ドキュメント生成などのAIを活用した開発支援に利用されます。
    - @octokit/rest - GitHub APIと連携し、リポジトリの操作や情報取得に利用されます。
    - dotenv - 環境変数を管理し、開発環境と本番環境で異なる設定を容易に切り替えられるようにします。
- テスト:
    - Vitest - Viteベースの高速なテストフレームワークで、コードの品質と信頼性を保証するためのユニットテストや統合テストに利用されます。
    - TDD (Test-Driven Development) - テストを先に書く開発手法で、設計の品質向上とバグの早期発見に貢献します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの構文解析器を自動生成するために使用されます。
    - PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールが記述されています。
- 言語機能:
    - ES Modules - モダンなJavaScriptモジュールシステムで、コードのモジュール化と依存関係管理を効率的に行います。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）パイプラインを自動化するためのプラットフォームです。プロジェクト要約自動生成、Issue自動管理、READMEの多言語翻訳、i18n（国際化）の自動化など、複数のワークフローが定義されています。
- 開発標準:
    - EditorConfig - 異なるエディタやIDEを使用する開発者間でも、インデントスタイルや文字コードなどのコードの書式を統一するための設定ファイルです。

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
- **`.editorconfig`**: コードエディタ間でインデントスタイルや文字コードなどのコードフォーマットを統一するための設定ファイルです。
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`**: プロジェクトの日本語版説明書です。
- **`README.md`**: プロジェクトの英語版説明書です。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報が記載されています。
- **`dev-setup/setup.js`**: 開発環境のセットアップや初期化スクリプトです。テスト環境の準備などを行う可能性があります。
- **`generated-docs/callgraph-enhanced.html`**: 関数呼び出しグラフを可視化した、インタラクティブなHTMLドキュメントです。
- **`generated-docs/callgraph.js`**: 関数呼び出しグラフを生成し、表示するためのJavaScriptロジックが含まれています。グラフのレイアウト、ノードとエッジの情報表示、インタラクションなどを担当します。
- **`generated-docs/development-status.md`**: プロジェクトの開発状況に関するドキュメントです。
- **`generated-docs/project-overview.md`**: プロジェクトの概要に関するドキュメントです。
- **`generated-docs/style.css`**: `generated-docs`内のHTMLドキュメントに適用されるスタイルシートです。
- **`index.html`**: プロジェクトのメインのエントリポイントとなるHTMLファイルです。MMLプレイヤーのUIを提供する可能性があります。
- **`issue-notes/*.md`**: GitHub Issuesに関連するメモや詳細が個別のMarkdownファイルとして保存されています。（来訪者向けのため詳細は割愛）
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーが生成するロックファイルで、依存関係のバージョンを固定し、再現性のあるビルドを保証します。
- **`src/grammar.js`**: `grammar.pegjs`からPeggyによって生成された、MML構文を解析するためのJavaScriptパーサーです。
- **`src/grammar.pegjs`**: MML (Music Macro Language) の文法定義を記述したPEG (Parsing Expression Grammar) ファイルです。このファイルからパーサーが生成されます。
- **`src/index.html`**: `src`ディレクトリ内のデモやメインアプリケーションのHTMLエントリポイントです。
- **`src/main.js`**: アプリケーションの主要なスクリプトファイルで、全体の初期化やイベントハンドリングを行う可能性があります。
- **`src/mml2json.js`**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックが含まれています。
- **`src/play.js`**: 変換されたTone.js JSONデータを使って、MMLで記述された音楽をWeb Audio API経由で再生する機能を提供します。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの単体テストコードです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch`** (`dev-setup/setup.js`): エラーハンドリングのためのブロックまたは関数として使用されます。
- **`escapeHtml`** (`generated-docs/callgraph.js`): HTML特殊文字をエスケープし、安全に表示するための関数です。
- **`getLayoutConfig`** (`generated-docs/callgraph.js`): グラフのレイアウト設定を取得するための関数です。
- **`placeCentralNode`** (`generated-docs/callgraph.js`): グラフの中央ノードの配置を決定する関数です。
- **`showNodeInfo`** (`generated-docs/callgraph.js`): グラフのノード（関数）に関する情報を表示する関数です。
- **`showEdgeInfo`** (`generated-docs/callgraph.js`): グラフのエッジ（関数呼び出し関係）に関する情報を表示する関数です。
- **`hideInfoPanel`** (`generated-docs/callgraph.js`): 情報パネルを非表示にする関数です。
- **`showInfoPanel`** (`generated-docs/callgraph.js`): 情報パネルを表示する関数です。
- **`toggleInfoPanel`** (`generated-docs/callgraph.js`): 情報パネルの表示/非表示を切り替える関数です。
- **`generateGitHubURL`** (`generated-docs/callgraph.js`): GitHubのリソースへのURLを生成する関数です。
- **`resetLayout`** (`generated-docs/callgraph.js`): グラフのレイアウトを初期状態にリセットする関数です。
- **`watchNodeMovementAndFixOverlapsWrap`** (`generated-docs/callgraph.js`): ノードの動きを監視し、重なりを修正するためのラッパー関数です。
- **`watchNodeMovementAndFixOverlaps`** (`generated-docs/callgraph.js`): ノードの重なりを監視・修正する主要な関数です。
- **`resolveNodeOverlaps`** (`generated-docs/callgraph.js`): ノードの重なりを解決するための関数です。
- **`switchLayout`** (`generated-docs/callgraph.js`): グラフのレイアウトを切り替える関数です。
- **`resetNodeStates`** (`generated-docs/callgraph.js`): ノードの状態（選択状態など）をリセットする関数です。
- **`fitToContent`** (`generated-docs/callgraph.js`): グラフ表示領域をコンテンツに合わせる関数です。
- **`toggleNodeLabels`** (`generated-docs/callgraph.js`): ノードのラベル表示を切り替える関数です。
- **`toggleCalleeLocationFilter`** (`generated-docs/callgraph.js`): 呼び出し先の場所によるフィルタリングを切り替える関数です。
- **`mml2json`** (`src/mml2json.js`): MML文字列を解析し、Tone.jsが解釈できるJSONシーケンサーフォーマットに変換するメイン関数です。
- **`compileMmlToCommands`** (`src/mml2json.js`): MMLを中間的なコマンドリストにコンパイルする関数です。
- **`getMmlCommands`** (`src/mml2json.js`): MMLから個々のコマンドを抽出する関数です。
- **`calcAttackToReleaseTicks`** (`src/mml2json.js`): 音符のアタックからリリースまでのティック数を計算する関数です。
- **`repeat`** (`src/mml2json.js`): MMLのリピートブロックを処理する関数です。
- **`toInt`** (`src/mml2json.js`): 値を整数に変換するヘルパー関数です。
- **`calcDuration`** (`src/mml2json.js`): 音符の長さ（デュレーション）を計算する関数です。
- **`calcStartTick`** (`src/mml2json.js`): 音符の開始ティックを計算する関数です。
- **`increaseStartTick`** (`src/mml2json.js`): 開始ティックを進める関数です。
- **`calcLtick`** (`src/mml2json.js`): 音符の長さに関連するティックを計算する関数です。
- **`getNodeId`** (`src/mml2json.js`): ノード（音符やコマンド）のIDを取得する関数です。
- **`play`** (`src/play.js`): 変換されたJSONデータを使用して音楽再生を開始する関数です。
- **`sub`** (`src/play.js`): `play`関数内で使用される補助的な関数です。
- **`hex`** (`src/grammar.js`): 16進数に関連する処理を行うパーサー内部関数です。
- **`unicodeEscape`** (`src/grammar.js`): Unicodeエスケープシーケンスを処理するパーサー内部関数です。
- **`literalEscape`** (`src/grammar.js`): リテラルエスケープシーケンスを処理するパーサー内部関数です。
- **`classEscape`** (`src/grammar.js`): 文字クラスのエスケープシーケンスを処理するパーサー内部関数です。
- **`describeExpectation`** (`src/grammar.js`): 期待されるトークンを説明するパーサー内部関数です。
- **`describeExpected`** (`src/grammar.js`): 期待される入力に関する説明を生成するパーサー内部関数です。
- **`describeFound`** (`src/grammar.js`): 実際に見つかった入力を説明するパーサー内部関数です。
- **`peg$parse`** (`src/grammar.js`): Peggyによって生成されたメインの構文解析関数です。
- **`peg$f0`** (`src/grammar.js`): Peggyによって生成された内部関数の一つです。
- **`text`** (`src/grammar.js`): 解析対象のテキストを取得するパーサー内部関数です。
- **`offset`** (`src/grammar.js`): 現在の解析オフセットを取得するパーサー内部関数です。
- **`range`** (`src/grammar.js`): 解析中の範囲を取得するパーサー内部関数です。
- **`location`** (`src/grammar.js`): 現在の解析位置情報を取得するパーサー内部関数です。
- **`expected`** (`src/grammar.js`): 期待される入力を管理するパーサー内部関数です。
- **`error`** (`src/grammar.js`): エラーオブジェクトを生成するパーサー内部関数です。
- **`peg$getUnicode`** (`src/grammar.js`): Unicode文字を取得するパーサー内部関数です。
- **`peg$literalExpectation`** (`src/grammar.js`): リテラル期待値オブジェクトを生成するパーサー内部関数です。
- **`peg$classExpectation`** (`src/grammar.js`): 文字クラス期待値オブジェクトを生成するパーサー内部関数です。
- **`peg$anyExpectation`** (`src/grammar.js`): 任意文字期待値オブジェクトを生成するパーサー内部関数です。
- **`peg$endExpectation`** (`src/grammar.js`): 入力終了期待値オブジェクトを生成するパーサー内部関数です。
- **`peg$otherExpectation`** (`src/grammar.js`): その他期待値オブジェクトを生成するパーサー内部関数です。
- **`peg$computePosDetails`** (`src/grammar.js`): 位置の詳細を計算するパーサー内部関数です。
- **`peg$computeLocation`** (`src/grammar.js`): 現在の位置情報を計算するパーサー内部関数です。
- **`peg$fail`** (`src/grammar.js`): 解析失敗を処理するパーサー内部関数です。
- **`peg$buildSimpleError`** (`src/grammar.js`): 単純なエラーメッセージを構築するパーサー内部関数です。
- **`peg$buildStructuredError`** (`src/grammar.js`): 構造化されたエラーメッセージを構築するパーサー内部関数です。
- **`peg$parsestart`** (`src/grammar.js`): MMLの開始ルールを解析するパーサー内部関数です。
- **`peg$parsenote`** (`src/grammar.js`): MMLの音符ルールを解析するパーサー内部関数です。
- **`peg$throw`** (`src/grammar.js`): 解析エラーをスローするパーサー内部関数です。
- **`constructor`** (`src/grammar.js`): オブジェクトのコンストラクタ（パーサー内部でエラーオブジェクトなどに利用）。
- **`format`** (`src/grammar.js`): メッセージをフォーマットする関数（パーサー内部でエラーメッセージなどに利用）。
- **`buildMessage`** (`src/grammar.js`): エラーメッセージを構築するパーサー内部関数です。
- **`literal`** (`src/grammar.js`): リテラル定義に関連するパーサー内部関数です。
- **`class`** (`src/grammar.js`): 文字クラス定義に関連するパーサー内部関数です。
- **`any`** (`src/grammar.js`): 任意文字定義に関連するパーサー内部関数です。
- **`end`** (`src/grammar.js`): 入力終了定義に関連するパーサー内部関数です。
- **`other`** (`src/grammar.js`): その他定義に関連するパーサー内部関数です。
- **`start`** (`src/grammar.pegjs`): MMLパーサーの開始ルールを定義します。
- **`note`** (`src/grammar.pegjs`): MMLパーサーの音符ルールを定義します。

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
Generated at: 2025-08-20 07:03:27 JST
