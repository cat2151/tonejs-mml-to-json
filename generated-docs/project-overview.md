Last updated: 2025-10-03

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で記述された音楽データを解析します。
- 解析されたMMLデータを、Web Audio APIライブラリであるTone.jsが解釈可能なJSONシーケンサーフォーマットに変換します。
- この変換により、ブラウザ上でMMLベースの音楽を再生・試聴できる環境を提供します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLの再生インターフェースを提供する
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化した高機能な音声ライブラリで、音楽シーケンスとシンセシスを扱う
    - Web Audio API - ブラウザに内蔵された音声処理技術（Tone.jsを通じて利用）
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、手軽な利用を可能にする
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法パーサー
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境
    - npm scripts - パッケージ管理と開発タスク（テスト、ビルドなど）を実行するタスクランナー
    - pnpm - 高速でディスク容量効率の良いパッケージマネージャー
    - Google Generative AI - AIによる文書生成のサポート（依存関係として組み込み）
    - @octokit/rest - GitHub APIと連携し、リポジトリの操作を自動化する
- テスト:
    - Vitest - Viteを基盤とした高速なユニットテストフレームワーク
    - TDD (Test-Driven Development) - テストを先に書くことで設計品質を高める開発手法
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) を用いてパーサーを生成するツール
    - PEG文法定義 - MML音楽記法を解析するための文法ルールを定義
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率化
- 自動化・CI/CD:
    - GitHub Actions - コードの変更時に自動でテスト、デプロイ、ドキュメント生成などのワークフローを実行
    - プロジェクト要約自動生成 - プロジェクトの情報を基に概要を自動生成する
    - Issue自動管理 - GitHub Issuesの管理を自動化する
    - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳する
    - i18n automation - 国際化対応のための翻訳プロセスを自動化するワークフロー
- 開発標準:
    - EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル

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
- **`.editorconfig`**: 異なる開発環境でコードのインデントスタイルや文字コードなどの書式設定を統一するための設定ファイルです。
- **`.gitignore`**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **`LICENSE`**: プロジェクトの利用条件や配布に関するライセンス情報が記載されています。
- **`README.ja.md`**: プロジェクトの概要、機能、使い方、開発方法などを日本語で説明するドキュメントです。
- **`README.md`**: プロジェクトの概要、機能、使い方、開発方法などを英語で説明するドキュメントです。
- **`dev-setup/README.md`**: 開発環境のセットアップ手順や開発者向けの追加情報が記載されたドキュメントです。
- **`dev-setup/setup.js`**: 開発環境を初期設定するためのJavaScriptスクリプトです。
- **`generated-docs/callgraph-enhanced.html`**: プロジェクト内の関数呼び出し関係を視覚的に表示するインタラクティブなHTMLドキュメントです。
- **`generated-docs/callgraph.js`**: `callgraph-enhanced.html` で使用される、関数呼び出しグラフの描画およびインタラクションロジックを実装したJavaScriptファイルです。
- **`generated-docs/style.css`**: `generated-docs` ディレクトリ内のHTMLドキュメントのスタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのルートに配置された、デモやアプリケーションの主要な入り口となるHTMLファイルです。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発スクリプトなどを定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm` パッケージマネージャーが生成するロックファイルで、依存パッケージの正確なバージョンとインストールパスを保証します。
- **`src/grammar.js`**: `src/grammar.pegjs` で定義された文法からPeggyによって自動生成された、MMLパーサーの実装ファイルです。MML文字列を解析し、抽象構文木（AST）に変換するロジックが含まれます。
- **`src/grammar.pegjs`**: MML（Music Macro Language）の構文を定義するためのParsing Expression Grammar (PEG) 形式のファイルです。これを元にパーサーが生成されます。
- **`src/index.html`**: `src` ディレクトリ内に含まれるデモ用のHTMLファイルです。MML入力フィールドと音楽再生ボタンなどを提供します。
- **`src/main.js`**: プロジェクトのメインとなるロジックや初期化処理を実行するJavaScriptファイルです。
- **`src/mml2json.js`**: MML文字列をTone.jsライブラリが利用できるJSONシーケンサーフォーマットに変換する中心的なロジックを実装したJavaScriptファイルです。MMLの各要素を音楽イベントにマッピングします。
- **`src/play.js`**: 変換されたJSONデータを使用して、Tone.jsを用いたブラウザでの音楽再生を制御するJavaScriptファイルです。再生開始・停止、テンポ設定などを担当します。
- **`test/parser.test.js`**: `src/grammar.js` で実装されたMMLパーサーの正確性と機能を検証するためのテストスクリプトです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch` (dev-setup/setup.js)**: 開発環境のセットアッププロセス中に発生する可能性のあるエラーを捕捉し、適切に処理するための一般的なエラーハンドリング構造です。
- **`mml2json` (src/mml2json.js)**:
    - **役割**: MML（Music Macro Language）形式の音楽文字列を解析し、Tone.jsが利用可能なJSONシーケンサーフォーマットのデータ構造に変換します。
    - **機能**: MMLで記述された音符、休符、テンポ、オクターブなどの情報を抽出し、Tone.jsで音楽シーケンスとして再生できるイベントオブジェクトの配列を生成します。
- **`compileMmlToCommands` (src/mml2json.js)**:
    - **役割**: MML文字列を内部的な音楽コマンドのリストに変換します。
    - **機能**: パーサーによって得られたMMLの構文ツリーから、具体的な音楽イベント（音符の開始、停止など）を表現するコマンドを構築します。
- **`getMmlCommands` (src/mml2json.js)**:
    - **役割**: コンパイルされたMMLコマンドの配列を取得します。
- **`calcAttackToReleaseTicks` (src/mml2json.js)**:
    - **役割**: 音符のアタック（発音）からリリース（消音）までのティック数を計算します。
    - **引数**: 音符の長さやゲートタイムに関する情報など。
    - **戻り値**: ティック単位での持続時間。
- **`repeat` (src/mml2json.js)**:
    - **役割**: MMLで指定された繰り返し（ループ）を処理し、音楽イベントを適切に複製します。
- **`toInt` (src/mml2json.js)**:
    - **役割**: 指定された値を整数に変換します。
- **`calcDuration` (src/mml2json.js)**:
    - **役割**: MMLの音符の指定から、その音符の実際の持続時間を計算します。
- **`calcStartTick` (src/mml2json.js)**:
    - **役割**: 各音楽イベントが開始するタイムライン上のティック位置を計算します。
- **`increaseStartTick` (src/mml2json.js)**:
    - **役割**: 次のイベントのために、現在の開始ティック値を適切な量だけ増加させます。
- **`calcLtick` (src/mml2json.js)**:
    - **役割**: MMLのLコマンド（音符の基本長さ）に基づいてティック値を計算します。
- **`getNodeId` (src/mml2json.js)**:
    - **役割**: 内部的なデータ構造におけるノードの一意な識別子を取得します。
- **`sort` (src/mml2json.js)**:
    - **役割**: 生成された音楽イベントのリストを、タイムライン上の順序に従ってソートします。
- **`play` (src/play.js)**:
    - **役割**: Tone.jsを使用して、変換されたMMLの音楽データをブラウザで再生します。
    - **機能**: Tone.jsのインスタンスを初期化し、JSON形式のシーケンサーデータを読み込み、音楽の再生開始、停止、テンポ調整などの制御を行います。
- **`sub` (src/play.js)**:
    - **役割**: `play`関数によって呼び出される、再生関連の補助的な処理や内部ロジックを担当します。
- **`peg$parse` (src/grammar.js)**:
    - **役割**: Peggyパーサーのメインエントリポイントであり、MML文字列を受け取り解析を実行します。
    - **引数**: 解析対象のMML文字列。
    - **戻り値**: 解析結果として生成された抽象構文木 (AST) またはエラー。
- **`hex`, `unicodeEscape`, `literalEscape`, `classEscape` (src/grammar.js)**:
    - **役割**: `peg$parse`関数内部で使用される、文字のエスケープ処理やユニコード変換を行う補助関数です。
- **`describeExpectation`, `describeExpected`, `describeFound` (src/grammar.js)**:
    - **役割**: パーシングエラーが発生した際に、ユーザーフレンドリーなエラーメッセージを生成するために、期待された構文要素や実際に検出された要素を説明する補助関数です。
- **`text`, `offset`, `range`, `location`, `expected`, `error` (src/grammar.js)**:
    - **役割**: パーサーの現在の状態（解析中のテキスト、現在の位置、期待される要素、発生したエラーなど）に関する情報を提供する内部ヘルパー関数やプロパティです。
- **`peg$parsestart`, `peg$parsenote` (src/grammar.js)**:
    - **役割**: `src/grammar.pegjs`で定義された`start`ルールと`note`ルールに対応する、MMLパーサーの具体的な実装部分です。
- **`start` (src/grammar.pegjs)**:
    - **役割**: MML文法の開始点となるルールです。MML文字列全体がこのルールからパースされます。
- **`note` (src/grammar.pegjs)**:
    - **役割**: MML文法において、個々の音符や休符、長さなどを定義するルールです。
- **`escapeHtml` (generated-docs/callgraph.js)**:
    - **役割**: HTMLコンテンツに表示する文字列に含まれる特殊文字をエスケープし、クロスサイトスクリプティング (XSS) 攻撃などを防ぐためのセキュリティ対策を行います。
- **`getLayoutConfig`, `placeCentralNode`, `showNodeInfo`, `showEdgeInfo`, `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel`, `generateGitHubURL`, `resetLayout`, `watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps`, `resolveNodeOverlaps`, `switchLayout`, `resetNodeStates`, `fitToContent`, `toggleNodeLabels`, `toggleCalleeLocationFilter` (generated-docs/callgraph.js)**:
    - **役割**: これら一連の関数は、生成された呼び出しグラフのHTMLビューにおいて、グラフのレイアウト、ノードやエッジ情報の表示・非表示、インタラクション（マウスオーバー、クリックなど）、GitHubへのリンク生成、レイアウトのリセットなど、ユーザーインターフェースと動作を制御します。

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
- hex (src/grammar.js)
  - unicodeEscape ()
  - literalEscape ()
  - classEscape ()
  - describeExpectation ()
  - describeExpected ()
  - describeFound ()
  - peg$parse ()
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
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)

---
Generated at: 2025-10-03 07:06:07 JST
