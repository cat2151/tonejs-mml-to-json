Last updated: 2025-07-16

# Project Overview

## プロジェクト概要
- このプロジェクトは、音楽記法であるMML（Music Macro Language）のコードを、Web Audio APIライブラリであるTone.jsが利用できるJSONシーケンサーフォーマットに変換します。
- 変換されたJSONデータを用いることで、ウェブブラウザ上でMMLに基づく音楽を再生・試聴することが可能になります。
- Peggyによるパーサー自動生成、Vitestでのテスト駆動開発、GitHub ActionsによるCI/CD自動化などを活用し、効率的な開発と品質維持が図られています。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ:
    - **Tone.js** - Web Audio APIを抽象化し、ブラウザ上での高度な音声生成と再生を可能にするJavaScriptライブラリです。
    - **Tone.js CDN** - unpkgを通じてTone.jsライブラリが効率的に配信され、Webアプリケーションから利用されます。
    - **MML (Music Macro Language)** - 音楽をテキストで記述するための簡易的な記法であり、このプロジェクトの変換対象となる入力形式です。
    - **Web Audio API** - ブラウザに組み込まれたオーディオ処理のネイティブAPIで、Tone.jsはこのAPIを基盤として動作します。
- 開発ツール:
    - **Node.js runtime** - JavaScriptコードを実行するための環境で、開発スクリプトやパッケージ管理に利用されます。
    - **npm scripts** - `package.json`に定義されたカスタムスクリプトで、ビルド、テスト、ドキュメント生成などのタスクを自動化します（5個のスクリプトが存在）。
    - **pnpm** - 高速かつディスクスペース効率の良いパッケージマネージャーで、プロジェクトの依存関係を管理します。
    - **Google Generative AI** - AIによる文書生成のサポートに利用され、例えばプロジェクト要約の自動生成などに活用されます。
    - **@octokit/rest** - GitHub APIと連携するためのライブラリで、GitHub Actionsなどと組み合わせてIssue管理やリポジトリ操作に利用されます。
- テスト:
    - **Vitest** - Viteをベースとした高速なユニットテストフレームワークで、テストコードの記述と実行に使用されます。
    - **TDD (Test-Driven Development)** - テストを先に書き、それに合わせてコードを開発する手法で、品質の高いコードベースを構築するために採用されています。
- ビルドツール:
    - **Peggy** - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MML音楽記法を解析するためのパーサーを自動生成します。
    - **PEG文法定義** - PeggyによってMML音楽記法のパーサーを生成するために記述された文法ルールです。
- 言語機能:
    - **ES Modules** - 最新のJavaScriptモジュールシステムで、コードの分割と再利用を効率的に行います。
- 自動化・CI/CD:
    - **GitHub Actions** - コードリポジトリのイベントに基づいて、ビルド、テスト、デプロイなどのワークフローを自動化するCI/CDサービスです（5個のワークフローが定義済み）。
    - **プロジェクト要約自動生成** - GitHub Actionsワークフローの一つで、プロジェクトの概要やドキュメントを自動的に生成します。
    - **Issue自動管理** - GitHub Actionsワークフローの一つで、GitHub Issuesのライフサイクル管理や自動応答などを行います。
    - **README多言語翻訳** - GitHub Actionsワークフローの一つで、READMEファイルなどを自動的に多言語に翻訳します。
    - **i18n automation** - 国際化（i18n）関連の自動翻訳ワークフローです。
- 開発標準:
    - **EditorConfig** - 異なるIDEやエディターを使用する開発者間で、インデントスタイルや文字コードなどのコーディングスタイルを統一するための設定ファイルです。

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
  🌐 callgraph-org.html
  📖 development-status.md
  📖 project-overview.md
🌐 index.html
📁 issue-notes/
  📖 1.md
  📖 10.md
  📖 2.md
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
*   **`.editorconfig`**: プロジェクト全体のコードスタイル（インデント、エンコーディングなど）を定義し、異なるエディタ間での統一性を保つための設定ファイルです。
*   **`.gitignore`**: Gitのバージョン管理から除外すべきファイルやディレクトリ（例: ビルド成果物、依存関係モジュール、一時ファイル）を指定します。
*   **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
*   **`README.ja.md`**, **`README.md`**: プロジェクトの概要、使い方、機能、貢献方法など、ユーザーや開発者向けの基本的な情報を提供するドキュメントです。それぞれ日本語版と英語版です。
*   **`dev-setup/README.md`**: 開発環境のセットアップに関する手順や情報が記述されています。
*   **`dev-setup/setup.js`**: 開発環境を初期設定するためのJavaScriptスクリプトです。
*   **`generated-docs/`**: 自動生成されたドキュメントを格納するディレクトリです。
    *   **`callgraph-enhanced.html`**, **`callgraph-org.html`**: プロジェクト内の関数呼び出し関係を視覚化したグラフがHTML形式で出力されたファイルです。
    *   **`development-status.md`**: プロジェクトの現在の開発状況や進捗が記述されたドキュメントです。
    *   **`project-overview.md`**: このプロジェクト概要自体など、自動生成されるプロジェクトの全体像に関するドキュメントです。
*   **`index.html`**: アプリケーションのメインとなるHTMLファイルで、ブラウザでアクセスした際にロードされます。デモページとして機能する可能性があります。
*   **`issue-notes/`**: GitHub Issuesに関連する詳細なメモや解決策が記述されたMarkdownファイルが格納されています。
    *   **`1.md`**, **`10.md`** など: 個々のIssueに関する詳細な記録やディスカッションのメモです。
*   **`package.json`**: Node.jsプロジェクトの設定ファイルで、プロジェクトのメタデータ、依存関係、およびnpmスクリプト（タスクランナー）の定義が含まれています。
*   **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、依存関係の正確なバージョンとツリー構造を固定し、一貫したビルドを保証します。
*   **`src/`**: プロジェクトの主要なソースコードを格納するディレクトリです。
    *   **`grammar.js`**: `grammar.pegjs`ファイルからPeggyパーサージェネレーターによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータに変換する役割を担います。
    *   **`grammar.pegjs`**: MML (Music Macro Language) の構文ルールを定義するPEG (Parsing Expression Grammar) 形式のファイルです。このファイルが`grammar.js`の生成元となります。
    *   **`src/index.html`**: `src`ディレクトリ内のHTMLファイルであり、おそらく開発用のデモページや特定のコンポーネントのテストハーネスとして機能します。
    *   **`main.js`**: アプリケーションの主要なロジックを制御するエントリーポイントまたはメインスクリプトです。
    *   **`mml2json.js`**: MML文字列をTone.js JSONシーケンサーフォーマットに変換する中心的なロジックが実装されているファイルです。
    *   **`play.js`**: 変換されたTone.js JSONデータを受け取り、Web Audio APIとTone.jsを使用して実際に音楽を再生する機能を提供します。
*   **`test/`**: プロジェクトのテストコードを格納するディレクトリです。
    *   **`parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのユニットテストコードです。
*   **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルで、テストの実行方法やカバレッジレポートなどのオプションを定義します。

## 関数詳細説明
*   **`catch` (dev-setup/setup.js)**: エラーハンドリングのための一般的な関数またはブロックです。スクリプト実行中に発生した例外を捕捉し、適切なエラー処理やログ記録を行います。
*   **`mml2json` (src/mml2json.js)**: MML文字列を解析し、Tone.jsシーケンサーが解釈できるJSONフォーマットの音楽データに変換するメイン関数です。
    *   引数: MML文字列 (`string`)
    *   戻り値: Tone.jsシーケンサーフォーマットのJSONオブジェクト (`object`)
    *   機能: MMLの各要素（音符、休符、テンポ、オクターブなど）を解釈し、対応する音楽イベントデータを生成します。
*   **`compileMmlToCommands` (src/mml2json.js)**: MML文字列を内部処理用のコマンドリストにコンパイルする関数です。`mml2json`関数によって呼び出され、解析の前処理を行います。
*   **`getMmlCommands` (src/mml2json.js)**: MML文字列から個々の音楽コマンドを抽出するユーティリティ関数です。
*   **`calcAttackToReleaseTicks` (src/mml2json.js)**: 音符のアタックからリリースまでの時間（ティック単位）を計算する関数です。
*   **`repeat` (src/mml2json.js)**: MMLの繰り返し記号を処理し、指定された回数だけ音楽要素を繰り返すための関数です。
*   **`toInt` (src/mml2json.js)**: 文字列を整数に安全に変換するためのユーティリティ関数です。
*   **`calcDuration` (src/mml2json.js)**: 音符のデュレーション（持続時間）を計算する関数です。
*   **`calcStartTick` (src/mml2json.js)**: 各音楽イベントの開始時刻（ティック単位）を計算する関数です。
*   **`increaseStartTick` (src/mml2json.js)**: 現在の開始ティック値を増加させるヘルパー関数です。
*   **`calcLtick` (src/mml2json.js)**: おそらく「length tick」に関連する計算を行う関数です。
*   **`getNodeId` (src/mml2json.js)**: 各音楽イベントやノードにユニークなIDを割り当てる関数です。
*   **`sort` (src/mml2json.js)**: データをソートするための汎用的な関数です。
*   **`function` (src/mml2json.js)**: これは特定の関数名ではなく、JavaScriptの`function`キーワードが解析時に検出されたものです。通常は匿名関数や高階関数内で使用されます。
*   **`play` (src/play.js)**: 変換されたTone.js JSONデータを受け取り、実際にTone.jsライブラリを使用して音楽をブラウザで再生を開始する関数です。
    *   引数: Tone.js JSONフォーマットの音楽データ (`object`)
    *   戻り値: なし (`void`)
    *   機能: Tone.jsのシーケンサーやシンセサイザーを初期化し、音楽を再生します。
*   **`sub` (src/play.js)**: `play`関数内で呼び出される補助関数です。おそらく音楽再生の一部分（例: サブシーケンスの再生や特定のイベント処理）を担当します。
*   **`hex` (src/grammar.js) 他多数の`peg$`で始まる関数**: これらは`src/grammar.pegjs`のPEG文法定義からPeggyパーサージェネレーターによって自動生成された、MMLパーサーの内部関数群です。MML文字列の構文解析、文字のエスケープ処理、エラー報告、現在の解析位置や期待されるトークンの情報管理など、パーサーの低レベルな動作に必要な機能を提供します。個々の詳細な動作はパーサーの内部実装に依存します。
*   **`start` (src/grammar.pegjs)**: `grammar.pegjs`ファイル内で定義された、MML解析の開始点となるPEG文法ルールです。MML文字列全体をどのように解析し始めるかを定義します。
*   **`note` (src/grammar.pegjs)**: `grammar.pegjs`ファイル内で定義された、MMLの音符（ノート）記号を解析するためのPEG文法ルールです。音符のピッチやデュレーションなどの情報を抽出します。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
  - error ()
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
      - function ()
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
Generated at: 2025-07-16 07:03:51 JST
