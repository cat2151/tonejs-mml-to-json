Last updated: 2025-08-29

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) を解析し、Web Audio APIライブラリであるTone.jsが利用できるJSONシーケンサー形式へ変換します。
- このツールは、ブラウザ上でMMLベースの音楽を再生するための基盤を提供し、Webブラウザでの音楽表現を可能にします。
- パーサージェネレーターPeggyを利用してMML文法を解析し、変換プロセスとテストはVitest、CI/CDはGitHub Actionsで自動化されています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLプレイヤーのユーザーインターフェースを構築するための基盤技術。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用したブラウザベースの音声ライブラリ。MMLから変換されたJSONデータに基づく音楽再生に使用されます。Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、ブラウザから手軽に利用できるようにします。MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法であり、このプロジェクトのパーサーの対象です。Web Audio API - ブラウザ上で高度な音声処理を行うためのAPIで、Tone.jsを通じて利用されます。
- 開発ツール: Node.js runtime - JavaScriptの実行環境であり、開発スクリプトやビルドプロセスに利用されます。npm scripts - `package.json`に定義されたタスクを効率的に実行するためのタスクランナー。pnpm - パッケージのインストールと管理を高速かつ効率的に行うためのパッケージマネージャー。Google Generative AI - AIによる文書生成をサポートするために利用されます。@octokit/rest - GitHub APIとの連携を可能にし、自動化ワークフローに利用されます。
- テスト: Vitest - Viteベースの高速なJavaScriptテストフレームワーク。MMLパーサーや変換ロジックのテストに利用されます。TDD (Test-Driven Development) - テストを先行して記述することで、堅牢なコード開発を促進する開発手法。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター。MMLの文法定義からJavaScriptパーサー（`grammar.js`）を自動生成するために利用されます。PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールを定義するファイル。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムであり、依存関係の管理とコードの構造化を改善します。
- 自動化・CI/CD: GitHub Actions - GitHub上でCI/CDパイプラインを自動化するためのツール。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationといったワークフローが定義されています。
- 開発標準: EditorConfig - 異なるエディタやIDE間でコードスタイル（インデント、改行など）を統一するための設定ファイル。

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
- **`.editorconfig`**: コードのインデントスタイル、改行コード、文字エンコーディングなど、開発環境全体でのコーディング規約を定義する設定ファイルです。これにより、複数人での開発におけるコードの統一性が保たれます。
- **`.gitignore`**: Gitのバージョン管理システムで追跡対象から除外するファイルやディレクトリを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **`LICENSE`**: プロジェクトの配布および使用条件を規定するライセンス情報が記述されています。
- **`README.ja.md`, `README.md`**: プロジェクトの概要、目的、使用方法、デモリンクなどを提供する主要なドキュメントファイルです。それぞれ日本語版と英語版があります。
- **`dev-setup/`**: 開発環境のセットアップに関連するスクリプトやドキュメントを格納するディレクトリです。
    - **`dev-setup/README.md`**: `dev-setup`ディレクトリ内のファイルに関する説明を提供します。
    - **`dev-setup/setup.js`**: 開発環境を構築するためのスクリプトを含みます。依存関係のインストールや初期設定などを行う可能性があります。
- **`generated-docs/`**: 自動生成されたドキュメントやレポートを格納するためのディレクトリです。
    - **`generated-docs/callgraph-enhanced.html`**: プロジェクト内の関数呼び出し関係を視覚的に表現した、強化版のHTMLドキュメントです。
    - **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で使用される、関数呼び出しグラフの描画、操作、情報表示ロジックを実装したJavaScriptファイルです。
    - **`generated-docs/development-status.md`**: プロジェクトの現在の開発状況や進捗に関する情報が記述されたドキュメントです。
    - **`generated-docs/project-overview.md`**: プロジェクトの概要を自動生成したドキュメントです。
    - **`generated-docs/style.css`**: 自動生成されたドキュメントの見栄えを整えるためのスタイルシートです。
- **`index.html`**: プロジェクトのWebインターフェースのルートファイルです。おそらくMMLを入力し、結果を再生するUIを提供します。
- **`issue-notes/`**: GitHub Issuesに関する詳細なメモや補足情報を個別のMarkdownファイルとして格納するディレクトリです。
    - **`issue-notes/1.md`から`issue-notes/20.md`**: 各Issue番号に対応する詳細なノートや情報が記述されています。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン）、依存関係、開発依存関係、スクリプトコマンドなどを定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係のバージョンを厳密に固定し、再現可能なビルドを保証します。
- **`src/`**: プロジェクトの主要なソースコードを格納するディレクトリです。
    - **`src/grammar.js`**: Peggyによって`src/grammar.pegjs`から自動生成された、MMLを解析するためのパーサー本体です。
    - **`src/grammar.pegjs`**: MMLの文法をParsing Expression Grammar (PEG) 形式で定義するファイルです。このファイルが`src/grammar.js`を生成します。
    - **`src/index.html`**: `src`ディレクトリ内のウェブインターフェースのエントリポイントとなるHTMLファイルで、デモやテスト用のUIを提供します。
    - **`src/main.js`**: アプリケーションのメインとなるJavaScriptロジックが含まれるファイルで、MMLの入力からJSON変換、そして再生までの全体的な流れを制御します。
    - **`src/mml2json.js`**: MMLテキストを解析し、Tone.jsが解釈できるJSONシーケンサー形式のデータ構造に変換する中心的なロジックを実装したファイルです。
    - **`src/play.js`**: `mml2json.js`によって生成されたJSONデータを受け取り、Tone.jsライブラリを利用して実際にMMLの音楽をWeb Audio APIで再生する機能を提供します。
- **`test/`**: プロジェクトのテストコードを格納するディレクトリです。
    - **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストケースが記述されたファイルです。Vitestフレームワークを使用します。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。テストの実行方法や環境に関する設定が含まれます。

## 関数詳細説明
- `catch` (dev-setup/setup.js): エラー発生時に処理を捕捉し、適切なエラーハンドリングを実行するための一般的なJavaScriptの例外処理メカニズムです。
- `catch` (src/play.js): `src/play.js`ファイル内で発生する可能性のあるランタイムエラーを捕捉し、音楽再生プロセスが中断しないように処理するためのハンドラです。
- `error` (src/grammar.js): パーサーの内部でエラーが発生した際に、そのエラー情報を処理または生成するために使用される関数です。
- `escapeHtml` (generated-docs/callgraph.js): HTMLの特殊文字（例: `<`, `>`, `&`）をエスケープ処理し、クロスサイトスクリプティング（XSS）などのセキュリティ脆弱性を防ぐために使用される関数です。
- `getLayoutConfig` (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトに関する設定オプション（例: ノード間隔、配置アルゴリズム）を取得する関数です。
- `placeCentralNode` (generated-docs/callgraph.js): グラフ表示の中心となるノードを特定し、その配置を制御するための関数です。
- `showNodeInfo` (generated-docs/callgraph.js): グラフ上の特定の関数ノードが選択された際に、その関数に関する詳細情報（ファイルパス、行数など）をパネルに表示する関数です。
- `showEdgeInfo` (generated-docs/callgraph.js): グラフ上の呼び出し関係（エッジ）が選択された際に、その呼び出しに関する詳細情報（呼び出し元/先、引数など）を表示する関数です。
- `hideInfoPanel` (generated-docs/callgraph.js): 画面に表示されている情報表示パネルを非表示にする関数です。
- `showInfoPanel` (generated-docs/callgraph.js): 画面に情報表示パネルを表示する関数です。
- `toggleInfoPanel` (generated-docs/callgraph.js): 情報表示パネルの現在の表示状態を切り替える（表示されていれば非表示に、非表示であれば表示に）関数です。
- `generateGitHubURL` (generated-docs/callgraph.js): グラフのノードやエッジに関連するGitHubリポジトリのURL（例: ソースコードへのリンク）を生成する関数です。
- `resetLayout` (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトを初期状態またはデフォルト設定に戻す関数です。
- `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりが発生した場合に位置を自動調整する処理をラップ（上位で制御）する関数です。
- `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): グラフ上のノードがユーザー操作などで移動した際に、他のノードとの視覚的な重なりを防ぐために位置を調整する機能を提供する関数です。
- `resolveNodeOverlaps` (generated-docs/callgraph.js): 複数のノードが視覚的に重なっている状態を検出し、それらの位置を調整して重なりを解消する関数です。
- `switchLayout` (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウト（例: 円形、ツリー形、力指向形）を切り替える関数です。
- `resetNodeStates` (generated-docs/callgraph.js): グラフ内のすべてのノードの選択状態、強調表示、位置などの視覚的状態を初期値に戻す関数です。
- `fitToContent` (generated-docs/callgraph.js): グラフ全体が現在のビューポートに収まるように、ズームレベルやパン位置を自動調整する関数です。
- `toggleNodeLabels` (generated-docs/callgraph.js): グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出される側の関数のファイルパスやモジュールに基づいて、表示するノードをフィルタリングする機能のオン/オフを切り替える関数です。
- `replace` (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する、汎用的な文字列操作関数です。
- `function` (generated-docs/callgraph.js): コード分析ツールが識別した、匿名関数や高階関数として利用される可能性のある一般的な関数定義です。
- `max` (generated-docs/callgraph.js): 複数の数値の中から最大値を見つける、汎用的な数値計算関数です。
- `on` (generated-docs/callgraph.js): 特定のイベントが発生した際に実行されるコールバック関数を登録するための汎用的なイベントリスナー設定関数です。
- `ready` (generated-docs/callgraph.js): ドキュメントオブジェクトモデル（DOM）が完全にロードされ、スクリプトの実行準備ができた時点で特定の処理を実行するためのイベントハンドラです。
- `addListener` (generated-docs/callgraph.js): DOM要素やカスタムオブジェクトにイベントリスナーを追加するための汎用的な関数です。
- `mml2json` (src/mml2json.js): Music Macro Language (MML) の文字列を入力として受け取り、これを解析してTone.jsライブラリが利用可能なJSON形式のシーケンサーデータ構造に変換する、このプロジェクトの主要な変換ロジックを担う関数です。
- `compileMmlToCommands` (src/mml2json.js): MML文字列を、より抽象化された内部コマンドのリストにコンパイル（変換）する関数です。これにより、MMLの構文から具体的な音楽イベントへのマッピングが行われます。
- `getMmlCommands` (src/mml2json.js): コンパイルされたMMLから、個々の音楽コマンド（例: 音符、休符、テンポ変更）を取得する関数です。
- `calcAttackToReleaseTicks` (src/mml2json.js): 音符のアタック（発音）からリリース（消音）までの時間間隔を、内部的なティック単位で計算する関数です。
- `repeat` (src/mml2json.js): 指定された処理を特定の回数だけ繰り返すためのヘルパー関数です。MMLの繰り返し記号の処理などに使われます。
- `toInt` (src/mml2json.js): 与えられた値を整数型に安全に変換するためのヘルパー関数です。
- `calcDuration` (src/mml2json.js): 音符の長さ（デュレーション）を計算し、MMLの表記（例: `c4`の`4`）を内部的な時間単位に変換する関数です。
- `calcStartTick` (src/mml2json.js): 各音符やイベントがシーケンスのどの時間点（ティック）から開始するかを計算する関数です。
- `increaseStartTick` (src/mml2json.js): 次のイベントのために、現在の開始ティックを進める（増加させる）関数です。
- `calcLtick` (src/mml2json.js): MMLにおけるLコマンド（デフォルトの音符の長さ）から、ティック単位の基本長さを計算する関数です。
- `getNodeId` (src/mml2json.js): 内部的なノードやイベントに一意の識別子（ID）を割り当てるための関数です。
- `sort` (src/mml2json.js): 配列やリストの要素を特定の順序（例: 時間順）で並べ替えるための汎用ソート関数です。
- `play` (src/play.js): `mml2json.js`から得られたJSONシーケンサーデータを利用して、Tone.jsを通じて実際にWeb Audio APIで音楽再生を開始する主要な関数です。
- `sub` (src/play.js): `play`関数内で呼び出される補助的な処理を行う関数です。再生ロジックの一部をモジュール化している可能性があります。
- `switch` (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js): 複数の条件分岐を効率的に処理するためのJavaScriptの`switch`ステートメントまたはそのロジックを表す関数です。
- `if` (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js, src/play.js): 特定の条件が真である場合にコードブロックを実行するためのJavaScriptの`if`ステートメントまたはそのロジックを表す関数です。
- `for` (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js): 指定された回数またはコレクションの各要素に対してコードブロックを繰り返し実行するためのJavaScriptの`for`ステートメントまたはそのロジックを表す関数です。
- `hex` (src/grammar.js): 16進数に関連する文字列や数値の処理を行う、パーサー内部のヘルパー関数です。
- `unicodeEscape` (src/grammar.js): MMLパーサー内でUnicodeエスケープシーケンス（例: `\uXXXX`）を処理するための関数です。
- `literalEscape` (src/grammar.js): MMLパーサー内でリテラル文字列中の特殊文字エスケープシーケンスを処理する関数です。
- `classEscape` (src/grammar.js): MMLパーサー内で文字クラス内の特殊文字エスケープシーケンスを処理する関数です。
- `describeExpectation` (src/grammar.js): パーサーが現在どのような入力（トークン、パターン）を期待しているかを記述する内部関数です。
- `describeExpected` (src/grammar.js): パーサーが期待していたが、実際には見つからなかった入力トークンを記述する内部関数です。
- `describeFound` (src/grammar.js): パーサーが入力ストリーム内で実際に発見したトークンを記述する内部関数です。
- `peg$parse` (src/grammar.js): Peggyパーサージェネレーターによって生成されたパーサーの、MML文字列解析を開始するメインのエントリポイント関数です。
- `peg$f0` (src/grammar.js): Peggyパーサーによって生成される内部的な匿名ヘルパー関数で、特定のパーシングルールに関連する処理を行います。
- `text` (src/grammar.js): パーサーが現在処理しているテキストの断片を取得する関数です。
- `offset` (src/grammar.js): パーサーが入力文字列内で現在いる位置（オフセット）を取得する関数です。
- `range` (src/grammar.js): パーサーが現在処理している入力範囲（開始オフセットと終了オフセット）を取得する関数です。
- `location` (src/grammar.js): パーサーが現在処理している入力の位置情報（行番号、列番号）を取得する関数です。
- `expected` (src/grammar.js): パーサーが入力の次の部分で期待している構文要素に関する情報を提供する関数です。
- `peg$getUnicode` (src/grammar.js): パーサー内部でUnicode文字を取得・処理するためのヘルパー関数です。
- `peg$literalExpectation` (src/grammar.js): 特定のリテラル文字列の期待値（パーサーが次にその文字列を期待しているという情報）を定義する内部関数です。
- `peg$classExpectation` (src/grammar.js): 特定の文字クラス（例: `[a-z]`）の期待値を定義する内部関数です。
- `peg$anyExpectation` (src/grammar.js): 任意の文字の期待値を定義する内部関数です。
- `peg$endExpectation` (src/grammar.js): 入力文字列の終端を期待する状態を定義する内部関数です。
- `peg$otherExpectation` (src/grammar.js): 上記以外の一般的な期待値を定義する内部関数です。
- `peg$computePosDetails` (src/grammar.js): 入力文字列内の位置から詳細な位置情報（行、列、オフセットなど）を計算する内部関数です。
- `peg$computeLocation` (src/grammar.js): エラー報告などで使用される、具体的なロケーションオブジェクトを計算する内部関数です。
- `peg$fail` (src/grammar.js): パーサーが現在のルールで解析に失敗した際に呼び出される内部関数です。
- `peg$buildSimpleError` (src/grammar.js): 解析エラーが発生した際に、シンプルで読みやすいエラーオブジェクトを構築する内部関数です。
- `peg$buildStructuredError` (src/grammar.js): 解析エラーの詳細な情報を含む、構造化されたエラーオブジェクトを構築する内部関数です。
- `peg$parsestart` (src/grammar.js): MML文法の`start`ルールに対応するパーサー内部関数で、MML解析の全体的なエントリポイントを処理します。
- `peg$parsenote` (src/grammar.js): MML文法の`note`ルールに対応するパーサー内部関数で、個々の音符要素を解析するロジックを含みます。
- `peg$throw` (src/grammar.js): パーサー内部で特定の条件に基づいてエラーをスローする関数です。
- `constructor` (src/grammar.js): JavaScriptクラスのインスタンスを初期化するための特殊なメソッドです。パーサー関連のオブジェクトの生成時に呼び出されます。
- `format` (src/grammar.js): エラーメッセージやその他のテキストを整形する関数です。
- `buildMessage` (src/grammar.js): エラーや通知のためのメッセージ文字列を構成する関数です。
- `literal` (src/grammar.js): MMLパーサーでリテラル（固定文字列）の構文要素を処理するロジックに関連する関数です。
- `class` (src/grammar.js): MMLパーサーで文字クラス（例: `[a-z]`）の構文要素を処理するロジックに関連する関数です。
- `any` (src/grammar.js): MMLパーサーで任意の単一文字の構文要素を処理するロジックに関連する関数です。
- `end` (src/grammar.js): MMLパーサーで入力の終端を処理するロジックに関連する関数です。
- `other` (src/grammar.js): MMLパーサーで、上記以外の「その他の」構文要素を処理するロジックに関連する関数です。
- `while` (src/grammar.js): 特定の条件が真である限りコードブロックを繰り返し実行するためのJavaScriptの`while`ステートメントまたはそのロジックを表す関数です。
- `start` (src/grammar.pegjs): Peggy文法定義ファイル内で、MML解析の開始点となるトップレベルのルールです。
- `note` (src/grammar.pegjs): Peggy文法定義ファイル内で、MMLの個々の音符（例: `c4`, `r8`）を解析するためのルールです。

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
  - catch ()
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
  - if ()
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
Generated at: 2025-08-29 07:03:58 JST
