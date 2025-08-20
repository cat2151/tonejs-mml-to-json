Last updated: 2025-08-21

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) を、Web Audio APIライブラリTone.jsが理解するJSONシーケンサー形式へ変換するコンバーターです。
- このツールは、MMLで記述された音楽データをブラウザで直接再生可能にし、Webベースの音楽アプリケーション開発を支援します。
- Peggyを用いたMMLパーサーの自動生成から、テスト駆動開発、自動化されたドキュメント生成や多言語対応まで、包括的な開発プロセスが構築されています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIの複雑さを抽象化し、ブラウザでの高機能な音声合成とシーケンスを可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトでの利用を容易にします。
    - MML (Music Macro Language) - テキストベースの音楽記法であり、このプロジェクトの主要な入力形式です。
    - Web Audio API - ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて間接的に利用され、リアルタイムの音声生成や加工を実現します。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションの実行環境として使用されます。
    - npm scripts - パッケージ管理とタスクランナーとして機能し、ビルド、テスト、ドキュメント生成などの開発ワークフローを自動化します（5個のスクリプトが存在します）。
    - pnpm - 高速で効率的なパッケージマネージャーとして、依存関係の管理とインストールに使用されます。
    - Google Generative AI - AIによる文書生成をサポートし、プロジェクトのドキュメント作成を効率化します。
    - @octokit/rest - GitHub APIとの連携を可能にし、Issue管理やドキュメント生成などの自動化に利用されます。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストの実行に使用されます。
    - TDD (Test-Driven Development) - テスト駆動開発の手法が採用されており、コードの品質と信頼性を高めます。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLの文法定義からJavaScriptコードのパーサーを自動生成するために使用されます。
    - PEG文法定義 - MML音楽記法を解析するための形式文法が定義されており、これに基づいてパーサーが生成されます。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用を促進します。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）の自動化ツールとして、以下の4つのワークフローが実行されます。
        - プロジェクト要約自動生成: プロジェクトの概要ドキュメントを自動で生成します。
        - Issue自動管理: GitHub Issuesの管理プロセスを自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動で翻訳します。
        - i18n automation: 国際化（i18n）関連の翻訳ワークフローを自動化します。
- 開発標準:
    - EditorConfig - 異なるエディタやIDE間でのコードスタイルの一貫性を保つための設定ファイルです。

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
- **`.editorconfig`**: コードエディタ間の設定（インデントスタイル、文字コードなど）を統一するためのファイルです。
- **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`**, **`README.md`**: プロジェクトの概要、使い方、開発情報などを記述した多言語対応のMarkdownファイルです。
- **`dev-setup/README.md`**: 開発環境のセットアップ手順に関する情報が記述されています。
- **`dev-setup/setup.js`**: 開発環境のセットアップや特定のテスト準備など、開発支援のためのスクリプトです。Vitestや依存関係の解決に使用される可能性があります。
- **`generated-docs/callgraph-enhanced.html`**: 関数呼び出し階層を可視化した、インタラクティブなHTMLドキュメントです。
- **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で利用される、呼び出しグラフの描画や操作ロジックを提供するJavaScriptファイルです。ノードやエッジの表示制御、レイアウト調整、情報パネルの表示などを担当します。
- **`generated-docs/development-status.md`**: プロジェクトの開発状況や進捗が記述されたMarkdownファイルです。
- **`generated-docs/project-overview.md`**: プロジェクトの全体像をまとめたドキュメント（この出力自体もここに生成される可能性があります）。
- **`generated-docs/style.css`**: `generated-docs`内のHTMLドキュメントに適用されるスタイルシートです。
- **`index.html` (ルート)**: プロジェクトのライブデモやメインの入り口となるHTMLファイルです。Tone.js CDNの読み込みなどが行われます。
- **`issue-notes/`**: GitHub Issuesに関連するメモや詳細がMarkdown形式で格納されているディレクトリです。開発者向けの追加情報ですが、ファイル自体は存在します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプトなど）および依存関係を定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`が依存関係の解決結果を記録するロックファイルで、再現性のあるインストールを保証します。
- **`src/grammar.js`**: `grammar.pegjs`からPeggyによって自動生成された、MMLを解析するためのJavaScriptパーサーコードです。
- **`src/grammar.pegjs`**: MML (Music Macro Language) の文法規則を定義するPEG (Parsing Expression Grammar) 形式のファイルです。このファイルから`src/grammar.js`が生成されます。
- **`src/index.html`**: アプリケーションのフロントエンド部分のHTMLエントリポイントです。MML入力と結果表示のUIを含みます。
- **`src/main.js`**: アプリケーションのメインロジックや初期化処理を担うJavaScriptファイルです。
- **`src/mml2json.js`**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックが実装されています。MMLコマンドの解釈、時間計算、データ構造の構築を行います。
- **`src/play.js`**: `mml2json.js`によって生成されたJSONデータを受け取り、Tone.jsを利用して実際に音楽を再生する機能を提供します。
- **`test/parser.test.js`**: `src/grammar.js`で生成されたパーサーの機能を確認するためのテストケースが記述されています。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch` (dev-setup/setup.js)**: エラーハンドリングのための一般的なブロック。具体的な引数や戻り値はコンテキストによるが、通常はエラーオブジェクトを受け取り、エラー処理を行う。
- **`error` ()**: 一般的なエラーを発生させる、またはエラーメッセージを処理する関数。引数、戻り値は文脈依存。
- **`on` ()**: イベントリスナーの設定や、特定の条件でのコールバック実行を扱う関数。引数、戻り値は文脈依存。
- **`mml2json` (src/mml2json.js)**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する。引数: MML文字列。戻り値: Tone.js互換のJSONオブジェクト。
- **`compileMmlToCommands` (src/mml2json.js)**: MML文字列を内部的なコマンドリストにコンパイルする。引数: MML文字列。戻り値: MMLコマンドの配列。
- **`getMmlCommands` (src/mml2json.js)**: MMLから解析されたコマンドを取得する。引数: MML文字列。戻り値: MMLコマンドの配列。
- **`calcAttackToReleaseTicks` (src/mml2json.js)**: ノートのアタックからリリースまでのティック数を計算する。引数: ノート情報。戻り値: ティック数。
- **`repeat` (src/mml2json.js)**: 特定の処理を繰り返すためのヘルパー関数。引数: 繰り返し回数、処理。戻り値: なし。
- **`toInt` (src/mml2json.js)**: 値を整数に変換する。引数: 変換する値。戻り値: 整数。
- **`calcDuration` (src/mml2json.js)**: ノートの持続時間を計算する。引数: ノート情報。戻り値: 持続時間（ティック）。
- **`calcStartTick` (src/mml2json.js)**: ノートの開始ティックを計算する。引数: 現在のティック、ノート情報。戻り値: 開始ティック。
- **`increaseStartTick` (src/mml2json.js)**: 開始ティックを増加させる。引数: 現在のティック、増加量。戻り値: 更新されたティック。
- **`calcLtick` (src/mml2json.js)**: MMLのLコマンド（音長指定）に対応するティックを計算する。引数: Lコマンドの値。戻り値: ティック。
- **`getNodeId` (src/mml2json.js)**: ノードの一意なIDを取得または生成する。引数: なし。戻り値: ノードID。
- **`sort` (src/mml2json.js)**: 配列をソートする。引数: 配列、比較関数。戻り値: ソートされた配列。
- **`play` (src/play.js)**: MMLから変換されたJSONデータに基づいて音楽を再生する。引数: JSONデータ。戻り値: Promise (再生完了時)。
- **`sub` (src/play.js)**: 音楽再生ロジックの一部を構成する補助関数。引数、戻り値は文脈依存。
- **`escapeHtml` (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、安全に表示するための文字列処理関数。引数: 文字列。戻り値: エスケープされた文字列。
- **`getLayoutConfig` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウト設定を取得する。引数: なし。戻り値: レイアウト設定オブジェクト。
- **`placeCentralNode` (generated-docs/callgraph.js)**: グラフの中央ノードを配置する。引数: ノードオブジェクト。戻り値: なし。
- **`showNodeInfo` (generated-docs/callgraph.js)**: 選択されたノード（関数）の詳細情報を表示する。引数: ノードデータ。戻り値: なし。
- **`showEdgeInfo` (generated-docs/callgraph.js)**: 選択されたエッジ（呼び出し関係）の詳細情報を表示する。引数: エッジデータ。戻り値: なし。
- **`hideInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルを非表示にする。引数: なし。戻り値: なし。
- **`showInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルを表示する。引数: なし。戻り値: なし。
- **`toggleInfoPanel` (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える。引数: なし。戻り値: なし。
- **`generateGitHubURL` (generated-docs/callgraph.js)**: 関連するGitHubリソースへのURLを生成する。引数: リソース情報。戻り値: GitHub URL文字列。
- **`resetLayout` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトをリセットする。引数: なし。戻り値: なし。
- **`watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js)**: ノードの移動を監視し、重なりを解消する処理をラップする。引数: なし。戻り値: なし。
- **`watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js)**: ノードの動きを監視し、視覚的な重なりを防ぐように位置を調整する。引数: なし。戻り値: なし。
- **`resolveNodeOverlaps` (generated-docs/callgraph.js)**: 複数のノードが重なっている場合に、それらを離して配置する。引数: ノードリスト。戻り値: なし。
- **`switchLayout` (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトアルゴリズムを切り替える。引数: レイアウト名。戻り値: なし。
- **`resetNodeStates` (generated-docs/callgraph.js)**: グラフ内のノードの表示状態をリセットする。引数: なし。戻り値: なし。
- **`fitToContent` (generated-docs/callgraph.js)**: グラフの表示範囲をコンテンツに合わせて調整する。引数: なし。戻り値: なし。
- **`toggleNodeLabels` (generated-docs/callgraph.js)**: ノードのラベル表示を切り替える。引数: なし。戻り値: なし。
- **`toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: 呼び出し先（Callee）の位置によるフィルタリングを切り替える。引数: なし。戻り値: なし。
- **`replace` (generated-docs/callgraph.js)**: 文字列内の特定のパターンを置換する。引数: 検索パターン、置換文字列。戻り値: 置換後の文字列。
- **`function` (generated-docs/callgraph.js)**: JavaScriptの関数定義または匿名関数。具体的な役割はコンテキストに依存。
- **`max` (generated-docs/callgraph.js)**: 複数の値から最大値を取得する。引数: 数値のリスト。戻り値: 最大値。
- **`on` (generated-docs/callgraph.js)**: イベントリスナーを登録する。引数: イベント名、コールバック関数。戻り値: なし。
- **`if` (generated-docs/callgraph.js)**: 条件分岐のロジックをカプセル化した関数。具体的な役割はコンテキストに依存。
- **`for` (generated-docs/callgraph.js)**: 繰り返し処理のロジックをカプセル化した関数。具体的な役割はコンテキストに依存。
- **`ready` (generated-docs/callgraph.js)**: DOMが完全にロードされたときに実行されるコールバックを設定する。引数: コールバック関数。戻り値: なし。
- **`addListener` (generated-docs/callgraph.js)**: イベントリスナーを追加する。引数: イベント名、リスナー関数。戻り値: なし。
- **`hex` (src/grammar.js)**: 16進数を処理する関数。MMLパーサー内の文字コード処理に関連する可能性。引数、戻り値は文脈依存。
- **`unicodeEscape` (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数。引数、戻り値は文脈依存。
- **`literalEscape` (src/grammar.js)**: リテラルエスケープシーケンスを処理する関数。引数、戻り値は文脈依存。
- **`classEscape` (src/grammar.js)**: 文字クラスのエスケープシーケンスを処理する関数。引数、戻り値は文脈依存。
- **`describeExpectation` (src/grammar.js)**: パーサーの期待値を説明する関数。引数、戻り値は文脈依存。
- **`describeExpected` (src/grammar.js)**: 期待されるトークンを説明する関数。引数、戻り値は文脈依存。
- **`describeFound` (src/grammar.js)**: 発見されたトークンを説明する関数。引数、戻り値は文脈依存。
- **`peg$parse` (src/grammar.js)**: Peggyによって生成されたパーサーの主要なエントリポイント。MML文字列を解析し、構文木または結果を生成する。引数: MML文字列。戻り値: 解析結果。
- **`peg$f0` (src/grammar.js)**: Peggyが生成する内部ヘルパー関数。具体的な役割は生成コードに依存。
- **`text` (src/grammar.js)**: 現在の解析位置のテキストを取得する。引数: なし。戻り値: 文字列。
- **`offset` (src/grammar.js)**: 現在の解析位置のオフセットを取得する。引数: なし。戻り値: 数値。
- **`range` (src/grammar.js)**: 解析されたトークンの範囲を取得する。引数: なし。戻り値: オブジェクト（開始、終了位置）。
- **`location` (src/grammar.js)**: 現在の解析位置の行番号と列番号を取得する。引数: なし。戻り値: オブジェクト（行、列）。
- **`expected` (src/grammar.js)**: パーサーが期待する次の入力について情報を得る。引数: なし。戻り値: 期待値のリスト。
- **`peg$getUnicode` (src/grammar.js)**: Unicode文字を取得する。引数: なし。戻り値: 文字。
- **`peg$literalExpectation` (src/grammar.js)**: リテラル文字列の期待値オブジェクトを生成する。引数: 文字列、大文字小文字を区別するかどうか。戻り値: 期待値オブジェクト。
- **`peg$classExpectation` (src/grammar.js)**: 文字クラスの期待値オブジェクトを生成する。引数: 文字列、反転するかどうか、大文字小文字を区別するかどうか。戻り値: 期待値オブジェクト。
- **`peg$anyExpectation` (src/grammar.js)**: 任意の文字の期待値オブジェクトを生成する。引数: なし。戻り値: 期待値オブジェクト。
- **`peg$endExpectation` (src/grammar.js)**: 入力の終端の期待値オブジェクトを生成する。引数: なし。戻り値: 期待値オブジェクト。
- **`peg$otherExpectation` (src/grammar.js)**: その他の種類の期待値オブジェクトを生成する。引数: 説明文字列。戻り値: 期待値オブジェクト。
- **`peg$computePosDetails` (src/grammar.js)**: 解析位置の詳細（行、列）を計算する。引数: オフセット。戻り値: オブジェクト。
- **`peg$computeLocation` (src/grammar.js)**: 解析範囲の開始・終了位置の詳細を計算する。引数: 開始オフセット、終了オフセット。戻り値: ロケーションオブジェクト。
- **`peg$fail` (src/grammar.js)**: 解析失敗時に使用される内部関数。引数、戻り値は文脈依存。
- **`peg$buildSimpleError` (src/grammar.js)**: シンプルなエラーオブジェクトを構築する。引数: メッセージ、期待値、位置。戻り値: エラーオブジェクト。
- **`peg$buildStructuredError` (src/grammar.js)**: 構造化されたエラーオブジェクトを構築する。引数: メッセージ、期待値、位置。戻り値: エラーオブジェクト。
- **`peg$parsestart` (src/grammar.js)**: MMLパーサーの`start`ルールに対応する処理。MML全体の解析を開始する。引数: なし。戻り値: 解析結果。
- **`peg$parsenote` (src/grammar.js)**: MMLパーサーの`note`ルールに対応する処理。個々の音符を解析する。引数: なし。戻り値: 解析結果（音符データ）。
- **`peg$throw` (src/grammar.js)**: 解析エラーをスローする。引数: エラーメッセージ。戻り値: なし (例外をスロー)。
- **`constructor` (src/grammar.js)**: クラスのコンストラクタ関数。具体的なクラスはコンテキストによる。
- **`format` (src/grammar.js)**: フォーマット処理を行う関数。引数、戻り値は文脈依存。
- **`buildMessage` (src/grammar.js)**: エラーメッセージを構築する。引数: メッセージタイプ、情報。戻り値: 文字列。
- **`literal` (src/grammar.js)**: リテラル値を処理する。引数、戻り値は文脈依存。
- **`class` (src/grammar.js)**: クラスに関連する処理。引数、戻り値は文脈依存。
- **`any` (src/grammar.js)**: 任意の値を処理する。引数、戻り値は文脈依存。
- **`end` (src/grammar.js)**: 終端処理。引数、戻り値は文脈依存。
- **`other` (src/grammar.js)**: その他の処理。引数、戻り値は文脈依存。
- **`start` (src/grammar.pegjs)**: MML文法定義の開始ルール。MML全体の構造を定義します。
- **`note` (src/grammar.pegjs)**: MML文法定義の音符ルール。個々の音符の構文を定義します。

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
Generated at: 2025-08-21 07:03:39 JST
