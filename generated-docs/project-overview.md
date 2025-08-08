Last updated: 2025-08-09

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で記述された楽譜データを、Web Audio APIライブラリTone.jsが利用可能なJSONシーケンサーフォーマットに変換するツールです。
- ブラウザ上でMML音楽を直接再生できるWebアプリケーションを提供し、手軽にMMLの音源を試聴・利用できます。
- 自動化されたテスト、文書生成、多言語対応、CI/CDプロセスにより、開発効率とプロジェクト品質が維持されています。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの構築に使用)
- 音楽・オーディオ: Tone.js (Web Audio APIを抽象化した音声ライブラリ)、Tone.js CDN (unpkg経由でのライブラリ配信)、MML (Music Macro Language、音楽記法パーサーの対象)、Web Audio API (ブラウザネイティブの音声技術、Tone.js経由で利用)
- 開発ツール: Node.js runtime (JavaScript実行環境)、npm scripts (タスクランナー、開発ワークフローの自動化)、pnpm (高速で効率的なパッケージマネージャー)、Google Generative AI (AIによる文書生成サポート)、@octokit/rest (GitHub API連携)
- テスト: Vitest (高速なViteベースのテストフレームワーク)、TDD (Test-Driven Development、テスト駆動開発手法)
- ビルドツール: Peggy (PEG Parsing Expression Grammarパーサージェネレーター)、PEG文法定義 (MML音楽記法のパーサー生成に利用)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステム、コードの構造化と再利用を促進)
- 自動化・CI/CD: GitHub Actions (CI/CD自動化、プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationなど4つのワークフローを運用)
- 開発標準: EditorConfig (コード統一ルール、複数の開発者間でのコーディングスタイルの一貫性を保証)

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
-   **`.editorconfig`**: コードの整形ルールを定義し、開発者間のコードスタイルを統一するために使用されます。
-   **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定し、不要なファイルがリポジトリに含まれるのを防ぎます。
-   **`LICENSE`**: プロジェクトのライセンス情報（通常はMIT Licenseなど）を記述し、ソフトウェアの利用条件を明示します。
-   **`README.ja.md`, `README.md`**: プロジェクトの概要、使い方、開発方法などを説明するドキュメントです。日本語版と英語版があります。
-   **`dev-setup/README.md`**: 開発環境のセットアップ手順に関するドキュメントを提供します。
-   **`dev-setup/setup.js`**: 開発環境の初期設定や準備を行うためのスクリプトです。
-   **`generated-docs/callgraph-enhanced.html`**: プロジェクト内の関数呼び出し関係を視覚化したインタラクティブなHTMLドキュメントで、コード構造の理解を助けます。
-   **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で利用されるJavaScriptコードで、グラフの描画やインタラクション機能を提供します。
-   **`generated-docs/development-status.md`**: プロジェクトの開発状況や進捗に関するドキュメントです。
-   **`generated-docs/project-overview.md`**: プロジェクトの全体像をまとめた概要ドキュメントです。
-   **`generated-docs/style.css`**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシートです。
-   **`index.html`**: プロジェクトのライブデモやWebアプリケーションのエントリーポイントとなるHTMLファイルです。Tone.jsを利用してMMLの再生機能を提供します。
-   **`issue-notes/`**: 開発中の課題や検討事項を記録したIssue関連のマークダウンファイルが格納されています。
-   **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどを定義するNode.jsの構成ファイルです。
-   **`pnpm-lock.yaml`**: pnpmが管理する依存関係の厳密なバージョンを記録し、ビルドの再現性を保証します。
-   **`src/grammar.js`**: `src/grammar.pegjs`からPeggyによって自動生成されたJavaScriptファイルで、MMLテキストを解析するためのパーサーの実装が含まれています。
-   **`src/grammar.pegjs`**: MML（Music Macro Language）の文法をPEG（Parsing Expression Grammar）形式で定義したファイルです。この定義に基づいてパーサーが自動生成されます。
-   **`src/index.html`**: `index.html`と同様に、MMLプレイヤーのメイン画面を提供するHTMLファイルです。
-   **`src/main.js`**: MMLの入力とTone.jsでの再生を繋ぐ主要なロジックを管理するJavaScriptファイルです。
-   **`src/mml2json.js`**: MMLテキストをTone.jsのシーケンサーが利用できるJSONフォーマットに変換する主要なロジックを実装したファイルです。
-   **`src/play.js`**: 変換されたJSONデータを受け取り、Tone.jsを使用して実際に音を再生する機能を実装したファイルです。
-   **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーのテストケースを記述したファイルです。Vitestを用いて実行されます。
-   **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
-   **`mml2json(mmlText)`** (src/mml2json.js):
    -   **役割**: MMLテキスト文字列を受け取り、Tone.jsのシーケンサーで利用可能なJSON形式の音楽データに変換するプロジェクトの主要な関数です。
    -   **機能**: MMLの構文を解析し、音符、休符、テンポ、音量などの情報をJSONオブジェクトにマッピングします。
-   **`compileMmlToCommands()`** (src/mml2json.js):
    -   **役割**: MMLを内部コマンドリストにコンパイルする補助関数です。
    -   **機能**: `getMmlCommands`、`calcAttackToReleaseTicks`、`repeat`、`toInt`、`calcDuration`、`calcStartTick`、`increaseStartTick`、`calcLtick`、`getNodeId`などのヘルパー関数を用いて、MMLの各要素を処理し、コマンド列を生成します。
-   **`play(jsonData)`** (src/play.js):
    -   **役割**: `mml2json`によって生成されたJSONデータを受け取り、Tone.jsライブラリを使用して実際にブラウザ上で音楽を再生します。
    -   **機能**: JSONデータをTone.jsのシーケンサーに渡し、指定されたテンポと音程で音楽イベントをトリガーします。
-   **`sub()`** (src/play.js):
    -   **役割**: 音楽再生に関連する補助的な処理を行う関数です。
    -   **機能**: `play`関数内で呼び出され、再生ロジックの一部を担います。
-   **`hex()`, `unicodeEscape()`, `literalEscape()`, `classEscape()`** (src/grammar.js):
    -   **役割**: Peggyによって生成されるパーサーの内部で、文字のエスケープや文字コード処理を行うためのユーティリティ関数群です。
    -   **機能**: MMLの特殊文字やUnicode文字の正確なパースを保証します。
-   **`describeExpectation()`, `describeExpected()`, `describeFound()`** (src/grammar.js):
    -   **役割**: Peggyパーサーがパースエラー時に、期待される入力や実際に見つかった入力を説明するために使用する内部ヘルパー関数です。
    -   **機能**: エラーメッセージの生成に貢献し、デバッグの助けとなります。
-   **`peg$parse()`** (src/grammar.js):
    -   **役割**: Peggyによって生成されたMMLパーサーのメインエントリポイントです。
    -   **機能**: MML文字列を解析し、抽象構文ツリー（AST）を生成します。
-   **`peg$f0()`, `text()`, `offset()`, `range()`, `location()`, `expected()`, `error()`** (src/grammar.js):
    -   **役割**: Peggyパーサーの内部で、テキストの取得、オフセット計算、エラー報告などを行うための関数です。
    -   **機能**: パース処理の各段階で情報を提供し、エラーハンドリングをサポートします。
-   **`peg$getUnicode()`, `peg$literalExpectation()`, `peg$classExpectation()`, `peg$anyExpectation()`, `peg$endExpectation()`, `peg$otherExpectation()`** (src/grammar.js):
    -   **役割**: Peggyパーサーが期待する入力の種類を定義・管理するための内部ヘルパー関数です。
    -   **機能**: 文法ルールに基づいて、次に来るべきトークンや文字を判断します。
-   **`peg$computePosDetails()`, `peg$computeLocation()`** (src/grammar.js):
    -   **役割**: Peggyパーサーがエラー発生時の正確な位置情報を詳細に計算するための内部関数です。
    -   **機能**: エラーメッセージに詳細な行番号や列番号を提供します。
-   **`peg$fail()`, `peg$buildSimpleError()`, `peg$buildStructuredError()`** (src/grammar.js):
    -   **役割**: Peggyパーサーのエラー処理に関連する内部関数で、シンプルまたは構造化されたエラーメッセージを生成します。
    -   **機能**: パース中に発生した問題を開発者に分かりやすく伝えます。
-   **`peg$parsestart()`, `peg$parsenote()`** (src/grammar.js):
    -   **役割**: `src/grammar.pegjs`で定義された`start`ルールと`note`ルールに対応するパーシング関数です。
    -   **機能**: それぞれMML全体の開始点と個々の音符のパース処理を実行します。
-   **`peg$throw()`** (src/grammar.js):
    -   **役割**: パーシング中にエラーをスローするための内部関数です。
    -   **機能**: 不正なMML入力が検出された場合に処理を中断します。
-   **`constructor()`** (src/grammar.js):
    -   **役割**: Peggyパーサーが生成するエラーオブジェクトなどのコンストラクタです。
    -   **機能**: エラーオブジェクトの初期化を行います。
-   **`format()`, `buildMessage()`, `literal()`, `class()`, `any()`, `end()`, `other()`** (src/grammar.js):
    -   **役割**: エラーメッセージのフォーマットや、期待される入力の種類を扱うための関数です。
    -   **機能**: エラー報告の際、より具体的で分かりやすいメッセージを作成します。
-   **`escapeHtml()`, `getLayoutConfig()`, `placeCentralNode()`, `showNodeInfo()`, `showEdgeInfo()`, `hideInfoPanel()`, `showInfoPanel()`, `toggleInfoPanel()`, `generateGitHubURL()`, `resetLayout()`, `watchNodeMovementAndFixOverlapsWrap()`, `watchNodeMovementAndFixOverlaps()`, `resolveNodeOverlaps()`, `switchLayout()`, `resetNodeStates()`, `fitToContent()`, `toggleNodeLabels()`, `toggleCalleeLocationFilter()`, `replace()`, `max()`, `on()`, `ready()`, `addListener()`** (generated-docs/callgraph.js):
    -   **役割**: 生成された関数呼び出しグラフHTMLドキュメント内で、グラフの描画、レイアウト調整、ノード・エッジ情報の表示/非表示、GitHubへのリンク生成など、インタラクティブな機能を提供する関数群です。
    -   **機能**: 複雑な関数呼び出し関係を視覚的に探索・理解するのを支援します。
-   **`catch()`** (dev-setup/setup.js):
    -   **役割**: JavaScriptのエラーハンドリングで使用される`try...catch`ブロック内の一般的な機能です。
    -   **機能**: 発生した例外を捕捉し、適切なエラー処理を実行します。
-   **`error()`** (dev-setup/setup.js):
    -   **役割**: エラーを処理するための汎用的な関数です。
    -   **機能**: エラーメッセージのログ出力や、エラー状態の通知などを行います。
-   **`sort()`** (src/mml2json.js):
    -   **役割**: データをソートするための一般的なJavaScriptのメソッドです。
    -   **機能**: MMLデータ処理の際に、順序を保証するために使用されます。
-   **`start()`** (src/grammar.pegjs):
    -   **役割**: MMLパーサーの開始ルールをPEG文法で定義します。
    -   **機能**: MMLテキスト全体のパースを開始するためのエントリーポイントです。
-   **`note()`** (src/grammar.pegjs):
    -   **役割**: MMLの音符のルールをPEG文法で定義します。
    -   **機能**: 個々の音符（長さ、音高など）の構文解析を定義します。
-   **`if`, `for`, `switch`** (複数のファイルに存在):
    -   **役割**: JavaScriptの基本的な制御構造であり、特定の関数ではありません。
    -   **機能**: コード内の条件分岐や繰り返し処理に使用され、プログラムのフローを制御します。

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
- format ()
- buildMessage ()
- literal ()
- class ()
- any ()
- end ()
- other ()
- for ()
- switch ()
- while ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-08-09 07:04:13 JST
