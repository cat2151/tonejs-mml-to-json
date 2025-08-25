Last updated: 2025-08-26

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の音楽データを、Web Audio APIライブラリTone.jsが解釈できるJSONシーケンサー形式に変換します。
- このプロジェクトは、MMLの構文解析、楽曲のタイミング計算、そしてTone.js互換のイベントシーケンス生成を効率的に行います。
- ブラウザ上でMMLベースの音楽を再生するインタラクティブなデモを提供し、音楽プログラミングの学習やツール開発に貢献します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとインターフェースを構築するための標準マークアップ言語。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高度な音声合成とシーケンスを可能にするJavaScriptライブラリ。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを効率的に配信し、利用可能にする仕組み。
    - MML (Music Macro Language) - 簡潔なテキスト形式で音楽を記述するための記法。このプロジェクトの入力フォーマット。
    - Web Audio API - ブラウザで高機能な音声処理を可能にするネイティブAPI（Tone.js経由で利用）。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションをサーバーサイドや開発環境で実行するためのランタイム。
    - npm scripts - package.jsonに定義されたスクリプトを実行し、開発タスクを自動化するための機能。
    - pnpm - 依存関係を高速かつ効率的に管理するパッケージマネージャー。
    - Google Generative AI - ドキュメント生成などの開発支援にAIを活用。
    - @octokit/rest - GitHub APIと連携し、GitHub上の操作を自動化するためのライブラリ。
- テスト:
    - Vitest - 高速でViteと統合されたJavaScriptテストフレームワーク。
    - TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの構文解析エンジンを生成します。
    - PEG文法定義 - MML音楽記法を解析するための文法ルールを記述したファイル。
- 言語機能:
    - ES Modules - モダンなJavaScriptで推奨されるモジュールシステムで、コードの構造化と再利用を促進します。
- 自動化・CI/CD:
    - GitHub Actions - コードの変更を検知し、テスト、ビルド、デプロイなどのワークフローを自動化するCI/CDサービス。
        - プロジェクト要約自動生成: AIを利用してプロジェクトの概要ドキュメントを自動生成。
        - Issue自動管理: GitHub Issuesの管理を自動化。
        - README多言語翻訳: プロジェクトのREADMEファイルを複数言語に自動翻訳。
        - i18n automation - 国際化（i18n）関連の自動化ワークフロー。
- 開発標準:
    - EditorConfig - 異なるIDEやエディタ間でコードの整形ルール（インデント、改行など）を統一するためのファイルフォーマット。

## ファイル階層ツリー
```
.editorconfig
.gitignore
LICENSE
README.ja.md
README.md
dev-setup/
  README.md
  setup.js
generated-docs/
  callgraph-enhanced.html
  callgraph.js
  development-status.md
  project-overview.md
  style.css
index.html
issue-notes/
  1.md
  10.md
  11.md
  12.md
  13.md
  14.md
  15.md
  16.md
  17.md
  18.md
  2.md
  20.md
  3.md
  4.md
  5.md
  6.md
  7.md
  8.md
  9.md
package.json
pnpm-lock.yaml
src/
  grammar.js
  grammar.pegjs
  index.html
  main.js
  mml2json.js
  play.js
test/
  parser.test.js
vitest.config.js
```

## ファイル詳細説明
- `.editorconfig`: プロジェクト全体でコードスタイル（インデント、改行など）を統一するための設定ファイルです。
- `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリを指定します（例: ビルド成果物、ログファイルなど）。
- `LICENSE`: プロジェクトのライセンス情報（著作権、利用条件など）を記述したファイルです。
- `README.ja.md`, `README.md`: プロジェクトの概要、使い方、セットアップ方法などを説明するドキュメントファイル（日本語版と英語版）です。
- `dev-setup/README.md`: 開発環境のセットアップ手順や関連情報を提供するドキュメントです。
- `dev-setup/setup.js`: 開発環境の初期設定や特定の開発タスクを実行するためのJavaScriptユーティリティスクリプトです。
- `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し階層を視覚的に強化して表示するHTMLドキュメントです。
- `generated-docs/callgraph.js`: `callgraph-enhanced.html`で関数呼び出し階層を生成・表示するためのJavaScriptコードです。レイアウト計算、インタラクティブ要素の制御などを担当します。
- `generated-docs/development-status.md`: プロジェクトの現在の開発状況、進捗、今後の計画などをまとめたドキュメントです。
- `generated-docs/project-overview.md`: AIによって自動生成されたプロジェクトの概要ドキュメントです。
- `generated-docs/style.css`: 生成されたドキュメントのスタイルを定義するCSSファイルです。
- `index.html`: プロジェクトのライブデモやメインアプリケーションのエントリーポイントとなるHTMLファイルです。Tone.jsを利用したMMLプレイヤーが組み込まれています。
- `issue-notes/`内の各`.md`ファイル (例: `1.md`, `10.md`など): 特定のIssue（課題）に関するメモや詳細情報が記述されているドキュメントファイルです。
- `package.json`: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- `pnpm-lock.yaml`: pnpmパッケージマネージャーが管理する依存関係の正確なバージョンとハッシュを記録するロックファイルです。
- `src/grammar.js`: `src/grammar.pegjs`からPeggyによって自動生成されたJavaScriptのMMLパーサロジックです。MML文字列を解析し、抽象構文木（AST）を構築します。
- `src/grammar.pegjs`: MML (Music Macro Language) の構文ルールをPEG (Parsing Expression Grammar) 形式で記述したファイルです。これを元に`grammar.js`が生成されます。
- `src/index.html`: `src`ディレクトリ内のデモやコンポーネント用HTMLファイル。メインの`index.html`と連携して動作することが想定されます。
- `src/main.js`: `src`ディレクトリにおける主要なアプリケーションロジックや初期化処理を含むJavaScriptファイルです。
- `src/mml2json.js`: MMLのASTを受け取り、Tone.jsのシーケンサーが利用できるJSON形式のイベントデータに変換するコアロジックを実装したファイルです。音符の長さ、タイミング、繰り返しなどを計算します。
- `src/play.js`: 生成されたTone.js JSONデータを受け取り、Web Audio APIを介して実際に音楽を再生する機能を提供するJavaScriptファイルです。
- `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードです。
- `vitest.config.js`: Vitestテストフレームワークの挙動をカスタマイズするための設定ファイルです。

## 関数詳細説明
- `catch` (dev-setup/setup.js): エラー発生時に処理を捕捉し、エラーハンドリングを行うためのブロックまたは関数です。具体的な引数や戻り値はコンテキストに依存しますが、通常はエラーオブジェクトを受け取ります。
- `escapeHtml` (generated-docs/callgraph.js): HTML特殊文字（例: `<`, `>`, `&`）をエスケープ処理し、HTMLコンテンツとして安全に表示するための文字列を返す関数です。
- `getLayoutConfig` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトに関する設定情報を取得する関数です。
- `placeCentralNode` (generated-docs/callgraph.js): 呼び出しグラフの中央ノードを特定の位置に配置する関数です。
- `showNodeInfo`, `showEdgeInfo` (generated-docs/callgraph.js): 呼び出しグラフのノード（関数）またはエッジ（呼び出し関係）に関する詳細情報をパネルに表示する関数です。
- `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel` (generated-docs/callgraph.js): 呼び出しグラフの情報パネルの表示・非表示を制御する関数です。`toggleInfoPanel`は現在の状態に応じて表示・非表示を切り替えます。
- `generateGitHubURL` (generated-docs/callgraph.js): 関連するソースコードのGitHub URLを生成し、リンクとして提供する関数です。
- `resetLayout` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- `watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps`, `resolveNodeOverlaps` (generated-docs/callgraph.js): ノードの動きを監視し、グラフ上のノードが重ならないように配置を調整する関連関数です。
- `switchLayout` (generated-docs/callgraph.js): 呼び出しグラフの表示レイアウト（例: 円形、ツリー）を切り替える関数です。
- `resetNodeStates` (generated-docs/callgraph.js): 呼び出しグラフ内のノードの表示状態（ハイライト、選択など）をリセットする関数です。
- `fitToContent` (generated-docs/callgraph.js): 呼び出しグラフ全体が表示領域に収まるようにズームレベルやパンを調整する関数です。
- `toggleNodeLabels` (generated-docs/callgraph.js): 呼び出しグラフのノードラベル（関数名）の表示・非表示を切り替える関数です。
- `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出される関数（Callee）の場所に基づいたフィルターのオン/オフを切り替える関数です。
- `replace` (generated-docs/callgraph.js): 文字列の置換を行う汎用的なJavaScriptのメソッドです。特定の文字列パターンを別の文字列に置き換える役割を持ちます。
- `function`, `max`, `on`, `if`, `for`, `ready`, `addListener` (generated-docs/callgraph.js): これらは特定のプロジェクト固有の関数名ではなく、JavaScriptの言語構造、組み込み関数（`Math.max`など）、またはイベントリスナーやコールバック関数として使用される汎用的なキーワードです。呼び出しグラフの表示ロジック内で条件分岐、ループ、イベント処理などに利用されます。
- `mml2json` (src/mml2json.js): MML文字列を解析し、Tone.jsのシーケンサーが利用可能なJSON形式の音楽イベントデータに変換する主要な関数です。
    - 引数: `mmlString` (string) - 変換対象のMML文字列。
    - 戻り値: `object` - Tone.js互換のJSONシーケンスデータ。
- `compileMmlToCommands` (src/mml2json.js): MMLの構文解析結果（AST）から、音楽コマンドのリストを生成する内部ヘルパー関数です。
- `getMmlCommands` (src/mml2json.js): MMLコマンドの配列を抽出する関数です。
- `calcAttackToReleaseTicks` (src/mml2json.js): アタックからリリースまでのティック数を計算する関数です。
- `repeat` (src/mml2json.js): 特定の処理を繰り返すためのヘルパー関数です。
- `toInt` (src/mml2json.js): 値を整数に変換する関数です。
- `calcDuration` (src/mml2json.js): 音符のデュレーション（継続時間）を計算する関数です。
- `calcStartTick` (src/mml2json.js): 音符の開始ティックを計算する関数です。
- `increaseStartTick` (src/mml2json.js): 開始ティックを増加させる関数です。
- `calcLtick` (src/mml2json.js): 音符の長さに関連するティック値を計算する関数です。
- `getNodeId` (src/mml2json.js): ノードに一意のIDを割り当てる関数です。
- `sort` (src/mml2json.js): 配列をソートする汎用的なJavaScriptのメソッドです。MMLコマンドの順序付けなどに使用されます。
- `play` (src/play.js): 生成されたTone.js JSONデータをWeb Audio APIを介して再生する関数です。
    - 引数: `jsonSequence` (object) - Tone.js互換のJSONシーケンスデータ。
    - 戻り値: `void`
- `sub` (src/play.js): `play`関数内で使用される補助的な処理を行う内部関数です。
- `hex`, `unicodeEscape`, `literalEscape`, `classEscape` (src/grammar.js): Peggyパーサーによって生成される、エスケープシーケンスや文字クラスの処理に関連する内部ヘルパー関数です。
- `describeExpectation`, `describeExpected`, `describeFound` (src/grammar.js): Peggyパーサーの内部で、エラーメッセージのために期待される構文要素や見つかった構文要素を記述する関数です。
- `peg$parse` (src/grammar.js): Peggyによって生成されたメインのパーシング関数で、入力MML文字列を解析しASTを生成します。
- `peg$f0` (src/grammar.js): Peggyパーサーによって生成される内部関数の一つで、特定の構文ルールに関連する処理を行います。
- `text`, `offset`, `range`, `location`, `expected`, `error` (src/grammar.js): Peggyパーサーがパーシング中に利用する内部変数や関数で、現在の解析位置、期待されるトークン、エラー情報などを管理します。
- `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation` (src/grammar.js): Peggyパーサーが内部で利用する、文字コードの取得や期待されるトークンタイプを定義・管理する関数です。
- `peg$computePosDetails`, `peg$computeLocation` (src/grammar.js): パーシング中の位置情報や行/列の詳細を計算する内部関数です。
- `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$throw` (src/grammar.js): Peggyパーサーがエラーを報告し、構築するための内部関数です。
- `peg$parsestart`, `peg$parsenote` (src/grammar.js): Peggyパーサーによって生成される、MML文法定義の`start`ルールと`note`ルールに対応するパーシング関数です。
- `constructor` (src/grammar.js): JavaScriptのオブジェクト指向におけるコンストラクタ関数です。パーサー内部のオブジェクト初期化に利用されます。
- `format`, `buildMessage` (src/grammar.js): エラーメッセージなどのテキストを整形・構築するための内部関数です。
- `literal`, `class`, `any`, `end`, `other`, `for`, `switch`, `while` (src/grammar.js): これらはPeggyパーサーの生成コード内で使用される汎用的なJavaScriptのキーワードや、パーサーの内部ロジックで利用される特定のトークン型を示す識別子です。条件分岐やループ構造として組み込まれています。
- `start`, `note` (src/grammar.pegjs): `grammar.pegjs`ファイル内で定義されたMML文法のルール名です。`start`はMML全体の開始点、`note`は個々の音符を表すルールです。

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
Generated at: 2025-08-26 07:03:53 JST
