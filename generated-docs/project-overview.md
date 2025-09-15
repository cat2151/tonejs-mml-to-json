Last updated: 2025-09-16

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）形式の楽譜データを解析し、Tone.jsで利用可能なJSONシーケンサー形式に変換するツールです。
- Webブラウザ上でMMLベースの音楽を容易に合成・再生することを可能にし、音楽制作やWebオーディオアプリケーション開発を支援します。
- Peggyを用いたMMLパーサー、Tone.jsを利用したWebオーディオ再生、GitHub Actionsによる開発自動化を特徴としています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLを再生・操作するユーザーインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザ上で高度な音声合成、シーケンス、エフェクト処理を可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトでの利用を簡素化します。
    - MML (Music Macro Language) - 音楽をテキストで記述するための簡易記法で、このプロジェクトの解析対象となる音楽データ形式です。
    - Web Audio API - ブラウザに内蔵された高機能なオーディオ処理APIで、Tone.jsはこのAPIを基盤として動作します。
- 開発ツール:
    - Node.js runtime - プロジェクトのビルド、テスト、スクリプト実行のためのJavaScript実行環境です。
    - npm scripts - package.jsonに定義されたスクリプトを通じて、様々な開発タスク（ビルド、テスト、実行など）を自動化します。
    - pnpm - 効率的なパッケージインストールと依存関係管理を提供する高速パッケージマネージャーです。
    - Google Generative AI - AIによるドキュメント生成やその他のテキスト関連タスクをサポートするために利用されます。
    - @octokit/rest - GitHub APIと連携し、GitHub上のリポジトリ操作やIssue管理などをプログラムから行うためのライブラリです。
- テスト:
    - Vitest - 高速なViteベースのユニットテストおよびコンポーネントテストフレームワークです。
    - TDD (Test-Driven Development) - テストを先に書き、それに合わせてコードを開発する手法を採用し、品質の高いコードベースを維持します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) 文法定義からJavaScriptパーサーを自動生成するツールです。
    - PEG文法定義 - MML音楽記法を正確に解析するための構文ルールを記述したファイル群です。
- 言語機能:
    - ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割、再利用、依存関係管理を効率化します。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）パイプラインを自動化するサービスです。
        - プロジェクト要約自動生成: プロジェクトの概要ドキュメントを自動で生成します。
        - Issue自動管理: GitHub Issueのライフサイクル管理（作成、更新、クローズなど）を自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動で翻訳し、国際的な利用をサポートします。
        - i18n automation: 国際化対応のための自動翻訳ワークフローを提供します。
- 開発標準:
    - EditorConfig - 異なるエディタやIDEを使用する開発者間で、インデントスタイルや改行コードなど、一貫したコーディングスタイルを維持するための設定ファイルです。

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
-   `.editorconfig`: 複数の開発者が異なるエディタを使用する際も、インデントや改行コードなどのコーディングスタイルを統一するための設定ファイルです。
-   `.gitignore`: Gitのバージョン管理システムが追跡しないファイルやディレクトリ（例: ビルド成果物、依存関係モジュールなど）を指定するための設定ファイルです。
-   `LICENSE`: プロジェクトがどのようなライセンスの下で公開されているかを明記するファイルです。
-   `README.ja.md`: プロジェクトの概要、使い方、開発方法などを日本語で説明するドキュメントファイルです。
-   `README.md`: プロジェクトの概要、使い方、開発方法などを英語で説明するメインのドキュメントファイルです。
-   `dev-setup/`: 開発環境のセットアップや初期設定に関するスクリプトを格納するディレクトリです。
    -   `dev-setup/README.md`: `dev-setup`ディレクトリ内のコンテンツや目的について説明するドキュメントです。
    -   `dev-setup/setup.js`: 開発環境を初期化したり、特定の開発タスクを実行したりするためのJavaScriptスクリプトです。
-   `generated-docs/`: プロジェクトによって自動生成されたドキュメント（関数呼び出しグラフなど）を格納するディレクトリです。
    -   `generated-docs/callgraph-enhanced.html`: 関数間の呼び出し関係を視覚的に表示する、機能強化版のHTMLベースの呼び出しグラフです。
    -   `generated-docs/callgraph.js`: `callgraph-enhanced.html`で利用される、関数呼び出しグラフの生成、表示、操作ロジックを含むJavaScriptファイルです。
    -   `generated-docs/development-status.md`: プロジェクトの現在の開発状況や進捗に関する情報を提供するドキュメントです。
    -   `generated-docs/project-overview.md`: プロジェクトの全体像を要約したドキュメントで、本出力もこのドキュメントの一部として生成される可能性があります。
    -   `generated-docs/style.css`: `generated-docs`ディレクトリ内のHTMLドキュメント（例: 呼び出しグラフ）の表示スタイルを定義するCSSファイルです。
-   `index.html`: プロジェクトのWebデモやメインのインタフェースとして機能するHTMLファイルです。MML入力とTone.jsでの再生機能を提供します。
-   `issue-notes/`: 開発中に発生した課題やその解決策に関するメモを格納するディレクトリです。（来訪者向けには詳細な説明は割愛します）
-   `package.json`: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。npmやpnpmなどのパッケージマネージャーによって利用されます。
-   `pnpm-lock.yaml`: `pnpm`が依存関係を解決した際の正確なバージョンとインストールパスを記録するファイルで、再現性のあるビルドを保証します。
-   `src/`: プロジェクトの主要なソースコードを格納するディレクトリです。
    -   `src/grammar.js`: `grammar.pegjs`からPeggyによって自動生成された、MMLを解析するためのJavaScriptパーサーコードです。
    -   `src/grammar.pegjs`: MML (Music Macro Language) の構文ルールを記述したPEG (Parsing Expression Grammar) ファイルです。このファイルがパーサーの基盤となります。
    -   `src/index.html`: `src`ディレクトリ内で利用されるHTMLファイルで、おそらく開発中のデモやテストに使用されます。
    -   `src/main.js`: アプリケーションのメインエントリポイントとなるJavaScriptファイルです。
    -   `src/mml2json.js`: MML文字列をTone.js JSONシーケンサー形式に変換するコアロジックを含むJavaScriptファイルです。
    -   `src/play.js`: 変換されたMMLデータ（JSON形式）をTone.jsライブラリを使ってWebブラウザ上で再生するためのロジックを含むJavaScriptファイルです。
-   `test/`: プロジェクトのテストコードを格納するディレクトリです。
    -   `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの機能が正しく動作するかどうかを検証するためのテストファイルです。
-   `vitest.config.js`: Vitestテストフレームワークの設定ファイルで、テストの実行方法やカバレッジレポートなどを定義します。

## 関数詳細説明
-   **dev-setup/setup.js**
    -   `catch()`: 一般的なエラーハンドリングを行うための関数です。通常、非同期処理でのエラーを捕捉し、適切な処理（ログ記録、ユーザー通知など）を行います。引数、戻り値は実装に依存します。
-   **generated-docs/callgraph.js**
    -   `escapeHtml(text)`: 文字列中のHTML特殊文字（`&`, `<`, `>`, `"`, `'`など）をエスケープして、HTMLとして安全に表示するための関数です。XSS攻撃の防止などに役立ちます。
        -   引数: `text` (string) - エスケープ対象の文字列。
        -   戻り値: (string) - エスケープされた文字列。
    -   `getLayoutConfig()`: 呼び出しグラフの表示レイアウトに関する設定（例: ノード間の距離、配置アルゴリズムなど）を取得する関数です。
        -   引数: なし。
        -   戻り値: (object) - レイアウト設定オブジェクト。
    -   `placeCentralNode()`: グラフの中心となるノード（関数）を決定し、そのノードを適切に配置する関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `showNodeInfo()`: グラフ上で選択されたノード（特定の関数）に関する詳細情報（例: ファイルパス、行数、呼び出し関係）を表示する関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `showEdgeInfo()`: グラフ上で選択されたエッジ（特定の関数呼び出し関係）に関する詳細情報（例: 呼び出し元と呼び出し先）を表示する関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `hideInfoPanel()`: グラフのノードやエッジの詳細を表示する情報パネルを非表示にする関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `showInfoPanel()`: グラフのノードやエッジの詳細を表示する情報パネルを表示する関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `toggleInfoPanel()`: 情報パネルの表示・非表示を切り替える関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `generateGitHubURL()`: プロジェクトのGitHubリポジトリ内のファイルやコードに直接リンクするURLを生成する関数です。
        -   引数: 不明。
        -   戻り値: (string) - 生成されたGitHub URL。
    -   `resetLayout()`: 呼び出しグラフの表示レイアウトを初期状態にリセットする関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `watchNodeMovementAndFixOverlapsWrap()`: ノードの動きを監視し、重なりを修正する処理をラップする高階関数またはイベントハンドラーです。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `watchNodeMovementAndFixOverlaps()`: 呼び出しグラフ上のノード（関数）が移動した際に、他のノードとの重なりを検出し、自動的に修正して見やすく配置し直す関数です。
        -   引数: 不明。
        -   戻り値: なし。
    -   `resolveNodeOverlaps()`: グラフ上の複数のノードが重なっている状態を検出し、視覚的に分かりやすいようにノードの位置を調整して重なりを解消する関数です。
        -   引数: 不明。
        -   戻り値: なし。
    -   `switchLayout()`: 呼び出しグラフのレイアウト方式（例: 階層型、力学モデルなど）を切り替える関数です。
        -   引数: 不明 (新しいレイアウトの種類)。
        -   戻り値: なし。
    -   `resetNodeStates()`: グラフ上のノードの選択状態、ハイライト状態などの視覚的な状態を初期値にリセットする関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `fitToContent()`: 呼び出しグラフの表示範囲を、すべてのノードとエッジが収まるように自動的に調整する関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `toggleNodeLabels()`: 呼び出しグラフ上のノードに表示されるラベル（関数名など）の表示・非表示を切り替える関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `toggleCalleeLocationFilter()`: 呼び出し先（Callee）のファイルパスや場所に基づいて、グラフに表示するノードをフィルタリングする機能をオン/オフする関数です。
        -   引数: なし。
        -   戻り値: なし。
    -   `replace(target, search, replacement)`: 文字列の置換を行う一般的な関数です。
        -   引数: `target` (string), `search` (string or RegExp), `replacement` (string).
        -   戻り値: (string) - 置換後の文字列。
    -   `switch()`: 複数の条件に基づいて処理を分岐させるための構造（JavaScriptの`switch`文に相当するユーティリティ関数や、コールバックを切り替える関数）。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `function()`: 汎用的な匿名関数、または高階関数の一部として使われる関数です。具体的な機能はコンテキストに依存します。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `max(a, b, ...)`: 複数の数値の中から最大値を返す関数です。
        -   引数: `...values` (number) - 比較対象の数値。
        -   戻り値: (number) - 最大値。
    -   `on()`: イベントリスナーを登録するための関数です。DOMイベントやカスタムイベントのハンドラを設定します。
        -   引数: 不明 (イベント名、ハンドラ関数など)。
        -   戻り値: なし。
    -   `if()`: 条件に基づいてコードの実行を制御する、基本的な条件分岐構造（JavaScriptの`if`文に相当するユーティリティ関数）。
        -   引数: 不明 (条件、真の場合の処理など)。
        -   戻り値: 不明。
    -   `for()`: 特定の回数またはコレクションの要素に対して繰り返し処理を実行する、基本的なループ構造（JavaScriptの`for`文に相当するユーティリティ関数）。
        -   引数: 不明 (初期化、条件、更新、ループ本体など)。
        -   戻り値: 不明。
    -   `ready()`: ドキュメントの読み込みとDOMの構築が完了したときに実行されるコールバックを登録する関数です（例: jQueryの`$(document).ready()`に相当）。
        -   引数: (function) - DOM準備完了時に実行される関数。
        -   戻り値: なし。
    -   `addListener()`: 特定のイベントに対するイベントリスナーを追加する関数です。
        -   引数: 不明 (イベントの種類、リスナー関数など)。
        -   戻り値: なし。
-   **src/grammar.js** (Peggyによって生成されたMMLパーサーの内部関数とAPI)
    -   `hex(char)`: 16進数文字を処理する内部関数。
        -   引数: `char` (string) - 16進数文字。
        -   戻り値: (number) - 変換された数値。
    -   `unicodeEscape()`: Unicodeエスケープシーケンスを解析する内部関数。
        -   引数: なし。
        -   戻り値: (string) - 変換された文字。
    -   `literalEscape()`: リテラル文字のエスケープ処理を行う内部関数。
        -   引数: なし。
        -   戻り値: (string) - 変換された文字。
    -   `classEscape()`: 文字クラスのエスケープ処理を行う内部関数。
        -   引数: なし。
        -   戻り値: (string) - 変換された文字。
    -   `describeExpectation()`: パーサーが期待する構文要素を記述するためのヘルパー関数。
        -   引数: 不明。
        -   戻り値: (string) - 期待される構文要素の説明。
    -   `describeExpected()`: 期待されるトークンや構文要素に関する詳細な説明を生成する内部関数。
        -   引数: 不明。
        -   戻り値: (string) - 説明文字列。
    -   `describeFound()`: パーシング中に実際に発見されたトークンや構文要素を記述する内部関数。
        -   引数: 不明。
        -   戻り値: (string) - 説明文字列。
    -   `peg$parse(input, options)`: Peggyパーサーのメインエントリポイントです。MML文字列を解析し、結果を返します。
        -   引数: `input` (string) - 解析対象のMML文字列。`options` (object) - パーサーのオプション。
        -   戻り値: (object) - 解析結果（抽象構文木など）。
    -   `peg$f0()`: Peggyによって内部的に生成される、特定のパーシングルールに関連する関数です。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `text()`: 現在パーシング中の文字列部分を取得する関数です。
        -   引数: なし。
        -   戻り値: (string) - 現在のテキスト。
    -   `offset()`: 現在のパーシング位置の入力文字列におけるオフセット（文字数）を取得する関数です。
        -   引数: なし。
        -   戻り値: (number) - オフセット値。
    -   `range()`: 現在のパーシング範囲（開始オフセットと終了オフセット）を取得する関数です。
        -   引数: なし。
        -   戻り値: (array) - `[startOffset, endOffset]`の配列。
    -   `location()`: 現在のパーシング位置の行番号と列番号を取得する関数です。
        -   引数: なし。
        -   戻り値: (object) - `{ start: { line, column }, end: { line, column } }`のようなオブジェクト。
    -   `expected()`: パーサーが次に期待する構文要素のリストを記録する関数です。エラーメッセージ生成に利用されます。
        -   引数: 不明。
        -   戻り値: なし。
    -   `error()`: パーシング中にエラーが発生した場合に、エラーオブジェクトを生成する関数です。
        -   引数: 不明。
        -   戻り値: (Error) - 生成されたエラーオブジェクト。
    -   `peg$getUnicode()`: Unicode文字を取得するための内部ヘルパー関数。
        -   引数: 不明。
        -   戻り値: (string) - Unicode文字。
    -   `peg$literalExpectation()`: リテラル（固定文字列）が期待されることを表すオブジェクトを生成する内部関数。
        -   引数: 不明。
        -   戻り値: (object) - 期待オブジェクト。
    -   `peg$classExpectation()`: 文字クラス（例: `[a-z]`）が期待されることを表すオブジェクトを生成する内部関数。
        -   引数: 不明。
        -   戻り値: (object) - 期待オブジェクト。
    -   `peg$anyExpectation()`: 任意の文字が期待されることを表すオブジェクトを生成する内部関数。
        -   引数: なし。
        -   戻り値: (object) - 期待オブジェクト。
    -   `peg$endExpectation()`: 入力の終端が期待されることを表すオブジェクトを生成する内部関数。
        -   引数: なし。
        -   戻り値: (object) - 期待オブジェクト。
    -   `peg$otherExpectation()`: その他の種類の期待値を表すオブジェクトを生成する内部関数。
        -   引数: 不明。
        -   戻り値: (object) - 期待オブジェクト。
    -   `peg$computePosDetails()`: 入力文字列中の位置の詳細情報（行、列、オフセット）を計算する内部関数。
        -   引数: 不明。
        -   戻り値: (object) - 位置詳細オブジェクト。
    -   `peg$computeLocation()`: パーシングエラー発生時の正確な位置情報を計算する内部関数。
        -   引数: 不明。
        -   戻り値: (object) - 位置情報オブジェクト。
    -   `peg$fail()`: パーシングが失敗したことを記録し、適切なエラー処理をトリガーする内部関数。
        -   引数: 不明。
        -   戻り値: なし。
    -   `peg$buildSimpleError()`: シンプルな形式のエラーメッセージを構築する内部関数。
        -   引数: 不明。
        -   戻り値: (Error) - エラーオブジェクト。
    -   `peg$buildStructuredError()`: 構造化された詳細なエラーメッセージを構築する内部関数。
        -   引数: 不明。
        -   戻り値: (Error) - エラーオブジェクト。
    -   `peg$parsestart()`: `start`ルールに従ってMMLの解析を開始する内部関数。
        -   引数: なし。
        -   戻り値: (object) - 解析結果。
    -   `peg$parsenote()`: `note`ルールに従って個々の音符や休符を解析する内部関数。
        -   引数: なし。
        -   戻り値: (object) - 解析された音符情報。
    -   `peg$throw()`: 解析エラーをスローする内部関数。
        -   引数: (Error) - スローするエラーオブジェクト。
        -   戻り値: なし (例外をスロー)。
    -   `constructor()`: オブジェクト指向プログラミングにおいて、クラスのインスタンスが作成される際に初期化処理を行う特別なメソッドです。
        -   引数: 不明。
        -   戻り値: なし。
    -   `format(message, ...args)`: テンプレート文字列やプレースホルダーを使用してメッセージを整形する関数です。
        -   引数: `message` (string), `...args` (any) - フォーマット引数。
        -   戻り値: (string) - フォーマットされた文字列。
    -   `buildMessage()`: エラーや情報表示のためのメッセージ文字列を構築する関数です。
        -   引数: 不明。
        -   戻り値: (string) - 構築されたメッセージ。
    -   `literal()`: プログラミング言語におけるリテラル値（例: 数値リテラル、文字列リテラル）を処理する一般的な関数、またはPEGパーサー内のリテラルルールに関連する内部関数。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `class()`: プログラミング言語におけるクラス定義、またはPEGパーサー内の文字クラスルールに関連する内部関数。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `any()`: 任意の文字や要素を処理する一般的な関数、またはPEGパーサー内の任意の文字ルールに関連する内部関数。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `end()`: 処理の終了を示す、またはPEGパーサー内の入力終端ルールに関連する内部関数。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `other()`: その他の汎用的な処理、またはPEGパーサー内の特定ルールに属さない一般ルールに関連する内部関数。
        -   引数: 不明。
        -   戻り値: 不明。
    -   `while()`: 条件が真である限り処理を繰り返す、基本的なループ構造（JavaScriptの`while`文に相当するユーティリティ関数）。
        -   引数: 不明 (条件、ループ本体など)。
        -   戻り値: 不明。
-   **src/grammar.pegjs**
    -   `start`: MMLパーサーのエントリポイントとなるルールです。MML文字列全体の解析を開始します。
        -   引数: なし。
        -   戻り値: (array) - 解析されたMML要素のリスト。
    -   `note`: 個々の音符（例: `c4`, `d8`）や休符などを解析するためのルールです。
        -   引数: なし。
        -   戻り値: (object) - 解析された音符や休符のデータ構造。
-   **src/mml2json.js**
    -   `mml2json(mmlString)`: MML形式の文字列を、Tone.jsのシーケンサーが理解できるJSON形式のデータ構造に変換する主要な関数です。
        -   引数: `mmlString` (string) - 変換したいMML形式の音楽文字列。
        -   戻り値: (object) - Tone.jsで再生可能なJSON形式のシーケンサーデータ。
    -   `compileMmlToCommands(mmlCommands)`: MMLパーサーによって生成されたMMLコマンドのリストを、Tone.js JSON形式に変換する過程で必要な、より加工されたコマンドリストにコンパイルする関数です。
        -   引数: `mmlCommands` (array) - MMLパーサーからの生コマンドリスト。
        -   戻り値: (array) - コンパイルされたコマンドリスト。
    -   `getMmlCommands(mmlString)`: MML文字列を受け取り、それを解析して個々のMMLコマンド（音符、長さ、オクターブなど）のオブジェクトリストを返す関数です。
        -   引数: `mmlString` (string) - 解析対象のMML文字列。
        -   戻り値: (array) - 解析されたMMLコマンドのオブジェクトリスト。
    -   `calcAttackToReleaseTicks(note)`: 音符の開始（アタック）から終了（リリース）までのティック数（時間単位）を計算する関数です。
        -   引数: `note` (object) - 音符に関する情報を含むオブジェクト。
        -   戻り値: (number) - アタックからリリースまでのティック数。
    -   `repeat(count, fn)`: 指定された回数だけ特定の関数を実行するヘルパー関数です。
        -   引数: `count` (number) - 実行する回数。`fn` (function) - 繰り返し実行する関数。
        -   戻り値: なし。
    -   `toInt(value)`: 与えられた値を整数に変換するヘルパー関数です。
        -   引数: `value` (any) - 変換対象の値。
        -   戻り値: (number) - 整数に変換された値。
    -   `calcDuration(note)`: 音符の長さ（持続時間）を計算する関数です。MMLの記法（例: `c4`の`4`）から実際の持続時間を決定します。
        -   引数: `note` (object) - 音符に関する情報を含むオブジェクト。
        -   戻り値: (number) - 音符の持続時間。
    -   `calcStartTick(command)`: 特定のMMLコマンドが開始するティック位置を計算する関数です。
        -   引数: `command` (object) - MMLコマンド情報を含むオブジェクト。
        -   戻り値: (number) - 開始ティック位置。
    -   `increaseStartTick(command, duration)`: コマンドの開始ティック位置を指定された持続時間分だけ増加させる関数です。
        -   引数: `command` (object) - コマンド情報。`duration` (number) - 増加させる持続時間。
        -   戻り値: なし (コマンドオブジェクトを直接変更)。
    -   `calcLtick(note)`: 音符のLティック（MMLにおける長さの基準となるティック）を計算する関数です。
        -   引数: `note` (object) - 音符情報。
        -   戻り値: (number) - 計算されたLティック値。
    -   `getNodeId(node)`: グラフなどの構造におけるノードの一意な識別子（ID）を取得する関数です。
        -   引数: `node` (object) - 識別子を取得したいノードオブジェクト。
        -   戻り値: (string) - ノードのID。
    -   `sort(array, compareFn)`: 配列を、指定された比較関数に基づいてソートする汎用的な関数です。
        -   引数: `array` (array) - ソート対象の配列。`compareFn` (function) - 要素を比較するための関数。
        -   戻り値: (array) - ソートされた配列。
-   **src/play.js**
    -   `play(commands)`: `mml2json.js`によって変換されたTone.jsシーケンサー形式のコマンドリストを受け取り、Web Audio APIを介して実際に音楽を再生する関数です。
        -   引数: `commands` (array) - Tone.jsのフォーマットに準拠したコマンドの配列。
        -   戻り値: (Promise) - 音楽再生の完了を示すPromiseオブジェクト。
    -   `sub(a, b)`: 2つの数値の減算を行うシンプルなヘルパー関数です。
        -   引数: `a` (number), `b` (number) - 減算対象の数値。
        -   戻り値: (number) - `a`から`b`を引いた結果。
-   **汎用的な関数や言語機能**
    -   `if()`: プログラミングにおける基本的な条件分岐構造です。
    -   `switch()`: 複数の条件に基づいて異なるコードブロックを実行する条件分岐構造です。
    -   `for()`: 特定の回数だけ、またはコレクションの要素に対して繰り返し処理を実行するループ構造です。

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
Generated at: 2025-09-16 07:04:21 JST
