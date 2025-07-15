# Project Overview

Last updated: 2025-07-15

# Project Overview

## プロジェクト概要
`tonejs-mml-to-json`は、MML（Music Macro Language）形式の音楽データを、Web Audio APIライブラリであるTone.jsが解釈可能なJSONフォーマットに変換するプロジェクトです。
この変換により、MMLで記述された音楽シーケンスをブラウザ上で容易に再生・制御することが可能になります。
プロジェクトは、MMLからJSONへの変換ロジックに特化しており、関連プロジェクトである`tonejs-json-sequencer`と連携して機能します。

## 技術スタック
使用している技術をカテゴリ別に整理して説明します。
- フロントエンド: **HTML5** - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ:
  - **Tone.js** - Web Audio APIを抽象化した強力なJavaScriptライブラリで、ブラウザでの複雑な音声処理やシーケンス再生を可能にします。
  - **Tone.js CDN** - unpkg経由でTone.jsライブラリを配信し、プロジェクトへの組み込みを簡素化します。
  - **MML (Music Macro Language)** - 音楽をテキストベースで記述するための記法であり、本プロジェクトの主要な入力形式です。
  - **Web Audio API** - ブラウザに内蔵された音声処理APIで、Tone.jsがその上に構築されています。
- 開発ツール:
  - **Node.js runtime** - JavaScriptコードの実行環境として使用されます。
  - **npm scripts** - パッケージ管理と開発タスクの自動化に使用されるスクリプト定義です。
  - **pnpm** - 高速でディスクスペースを効率的に使用するパッケージマネージャーです。
  - **Google Generative AI** - ドキュメント生成などの開発支援にAIを活用します。
  - **@octokit/rest** - GitHub APIと連携し、開発プロセスの自動化をサポートします。
- テスト:
  - **Vitest** - Viteを基盤とした高速なテストフレームワークで、効率的な単体テストを実現します。
  - **TDD (Test-Driven Development)** - テストを先に書くことで、堅牢なコード設計と品質向上を目指す開発手法です。
- ビルドツール:
  - **Peggy** - PEG (Parsing Expression Grammar) パーサージェネレーターで、MML文法に基づいたパーサーを自動生成します。
  - **PEG文法定義** - MMLの音楽記法を解析するためのルールを定義したファイルです。
- 言語機能:
  - **ES Modules** - モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を高めます。
- 自動化・CI/CD:
  - **GitHub Actions** - CI/CDパイプラインを自動化し、プロジェクト要約の自動生成、Issue管理、READMEの多言語翻訳、i18n自動化などのワークフローを実行します。
- 開発標準:
  - **EditorConfig** - 異なるIDEやエディターを使用する開発者間でのコードスタイルの一貫性を保つための設定ファイルです。

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
  📖 project-summary.md
🌐 index.html
📁 issue-notes/
  📖 1.md
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
- **`.editorconfig`**: コーディングスタイル（インデント、改行コードなど）を定義し、プロジェクト全体で一貫したコードフォーマットを強制します。
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定します。
- **`LICENSE`**: プロジェクトのライセンス情報（MITライセンス）が記述されています。
- **`README.ja.md` / `README.md`**: プロジェクトの概要、目的、使い方などを日本語と英語で説明するドキュメントです。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報を提供します。
- **`dev-setup/setup.js`**: 開発環境の初期設定やセットアッププロセスを実行するためのスクリプトです。
- **`generated-docs/project-summary.md`**: GitHub Actionsによって自動生成されるプロジェクトの要約ドキュメントです。
- **`index.html` (ルート)**: プロジェクトのデモページまたは主要なエントリポイントとなるHTMLファイルです。
- **`issue-notes/`**: GitHub Issuesに関連するメモや詳細情報を格納するディレクトリです。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されているファイルです。
- **`pnpm-lock.yaml`**: pnpmによって生成される依存関係のロックファイルで、ビルドの再現性を保証します。
- **`src/grammar.js`**: `src/grammar.pegjs`からPeggyによって生成されたJavaScriptファイルで、MMLを解析するためのパーサロジックを含みます。
- **`src/grammar.pegjs`**: PeggyパーサージェネレーターがMMLの構文を解釈するための文法ルール（PEG形式）を定義します。
- **`src/index.html`**: `src`ディレクトリ内のデモ用HTMLファイルで、`main.js`や`play.js`などの主要スクリプトを読み込み、ブラウザ上でMMLの変換・再生機能を提供します。
- **`src/main.js`**: MML入力の処理、`mml2json.js`への連携、そして結果の`play.js`への引き渡しなど、アプリケーションの主要なフローを管理します。
- **`src/mml2json.js`**: プロジェクトの中核機能であり、MML文字列をTone.jsが利用可能なJSON形式のデータ構造に変換するロジックが実装されています。MMLコマンドの解析、音の長さや開始時間の計算、ノードIDの生成などを行います。
- **`src/play.js`**: `mml2json.js`で生成されたJSONデータを基に、Tone.jsライブラリを使用して音楽を実際にブラウザで再生する機能を担当します。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのVitestを用いたテストスクリプトです。
- **`vitest.config.js`**: Vitestテストフレームワークの動作を設定するためのファイルです。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): エラー発生時にそのエラーを捕捉し、適切なハンドリングを行うための関数です。
- **`mml2json`** (src/mml2json.js): MML文字列全体を解析し、Tone.jsで利用可能なJSON形式のデータ構造に変換する主要な関数です。
- **`compileMmlToCommands`** (src/mml2json.js): MML文字列を、処理しやすいMMLコマンドの内部リストに変換する関数です。
- **`getMmlCommands`** (src/mml2json.js): MML文字列から個々の音楽コマンド（例: 音符、休符、テンポなど）を抽出する関数です。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): 音符のアタック（発音開始）からリリース（発音終了）までのティック数を計算する補助関数です。
- **`repeat`** (src/mml2json.js): MMLの繰り返し記号を処理し、指定された回数だけ要素を繰り返すための関数です。
- **`toInt`** (src/mml2json.js): 文字列を整数値に安全に変換する補助関数です。
- **`calcDuration`** (src/mml2json.js): MMLの記法に基づいて、音符や休符の実際のデュレーション（長さ）を計算する関数です。
- **`calcStartTick`** (src/mml2json.js): 各MMLイベントがシーケンス内で開始する正確なティック位置を計算する関数です。
- **`increaseStartTick`** (src/mml2json.js): イベントのデュレーションに基づいて、次のイベントの開始ティックを更新する関数です。
- **`calcLtick`** (src/mml2json.js): MMLの音長修飾子 `L` に基づいて、デフォルトのティック値を計算する関数です。
- **`getNodeId`** (src/mml2json.js): 生成されるJSONツリー内の各ノードに一意のIDを割り当てる関数です。
- **`sort`** (src/mml2json.js): データ構造を特定の基準で並べ替えるための汎用的なソート関数です。
- **`function`** (src/mml2json.js): 無名関数やコールバックとして利用される一般的なJavaScriptの`function`の記述であり、特定の名前を持つ関数ではありません。
- **`play`** (src/play.js): 変換されたJSONデータを使用して、Tone.jsシーケンサーを初期化し、音楽の再生を開始する主要な関数です。
- **`sub`** (src/play.js): `play`関数の内部で使用される補助関数で、再生ロジックの一部をカプセル化します。
- **`hex`, `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `peg$parse`, `peg$f0`, `text`, `offset`, `range`, `location`, `expected`, `error`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$parsestart`, `peg$parsenote`, `peg$throw`, `constructor`, `format`, `buildMessage`, `literal`, `class`, `any`, `end`, `other`** (src/grammar.js): これらはPeggyによって自動生成されたMMLパーサーの内部関数群です。MML文字列の構文解析、トークンの識別、位置情報の追跡、エラーの生成と報告などの低レベルな処理を担います。
- **`start`** (src/grammar.pegjs): PEG文法におけるMML解析の開始ルールを定義します。
- **`note`** (src/grammar.pegjs): PEG文法におけるMMLの音符（ノート）要素の解析ルールを定義します。

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
  - constructor ()
  - format ()
  - buildMessage ()
  - literal ()
  - class ()
  - any ()
  - end ()
  - other ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-07-15 09:18:40 JST
