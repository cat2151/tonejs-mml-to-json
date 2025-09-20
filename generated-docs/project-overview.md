Last updated: 2025-09-21

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.js JSONシーケンサーフォーマットへ変換するツールです。
- Web Audio APIを活用し、ブラウザ上でMMLベースの音楽再生を可能にします。
- PEGパーサーとTone.jsを中核技術として利用し、音楽生成と再生をサポートします。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーを実現するためのマークアップ言語です。)
- 音楽・オーディオ: Tone.js (Web Audio APIを抽象化し、ブラウザでの音楽生成・再生を容易にするJavaScriptライブラリです。), Web Audio API (ブラウザが音声処理を行うためのAPIで、Tone.jsを通じて利用されます。), Tone.js CDN (unpkg経由でTone.jsライブラリを配信し、プロジェクトへの組み込みを簡素化します。), MML (Music Macro Language) (音楽をテキスト形式で記述するための記法であり、このプロジェクトのパーサーの対象です。)
- 開発ツール: Node.js runtime (JavaScriptの実行環境で、開発スクリプトやツールを実行します。), npm scripts (Node.jsプロジェクトで定義されたタスクを実行するためのコマンドで、ビルドやテストなどに利用されます。), pnpm (高速でディスクスペース効率の良いパッケージマネージャーです。), Google Generative AI (AIによる文書生成を支援するツールとして使用されています。), @octokit/rest (GitHub APIと連携し、GitHub上の操作を自動化するために使用されます。)
- テスト: Vitest (Viteを基盤とした高速なテストフレームワークで、ユニットテストや統合テストに使用されます。), TDD (Test-Driven Development) (テストを最初に記述し、それに合わせてコードを開発する手法です。)
- ビルドツール: Peggy (PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの解析ロジックを自動生成します。), PEG文法定義 (MML音楽記法の解析ルールを定義したファイルで、Peggyによってパーサーが生成されます。)
- 言語機能: ES Modules (モダンなJavaScriptでモジュールをインポート・エクスポートするための標準的なシステムです。)
- 自動化・CI/CD: GitHub Actions (CI/CD (継続的インテグレーション/継続的デリバリー) を自動化するためのプラットフォームで、テスト実行、デプロイ、ドキュメント生成などのワークフローを実行します。これには、プロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、国際化(i18n)の自動化ワークフローが含まれます。)
- 開発標準: EditorConfig (様々なエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。)

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
- **.editorconfig**: プロジェクト全体で一貫したコーディングスタイルを維持するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、機能、セットアップ方法、使用方法などを日本語で説明するメインドキュメントです。
- **README.md**: プロジェクトの概要、機能、セットアップ方法、使用方法などを英語で説明するメインドキュメントです。
- **dev-setup/README.md**: `dev-setup`ディレクトリ内の開発セットアップに関する情報を提供するドキュメントです。
- **dev-setup/setup.js**: 開発環境のセットアップやテスト設定のインポートなど、開発支援のためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数の呼び出し関係を視覚的に表示する、インタラクティブな呼び出しグラフHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`に埋め込まれたJavaScriptコードで、関数の呼び出しグラフのレンダリング、操作、情報表示ロジックを実装しています。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシートです。
- **index.html**: プロジェクトのライブデモや、MML入力と音楽再生インターフェースを提供するメインのHTMLファイルです。
- **issue-notes/*.md**: 開発中に発生した問題、検討事項、決定事項などを記録するためのMarkdownファイル群です。
- **package.json**: プロジェクトのメタデータ（名前、バージョンなど）、依存関係、開発スクリプトなどが定義されたファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係の正確なバージョンを固定し、再現可能なビルドを保証します。
- **src/grammar.js**: `src/grammar.pegjs`で定義されたMML文法に基づき、Peggyパーサージェネレーターによって自動生成されたJavaScriptファイルです。MML文字列を解析し、抽象構文ツリー(AST)を構築します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文ルールをPEG (Parsing Expression Grammar) 形式で記述したファイルです。このファイルから`src/grammar.js`が生成されます。
- **src/index.html**: `src`ディレクトリ内の開発やデモで使用されるHTMLファイルです。
- **src/main.js**: アプリケーションの主要なエントリーポイント、またはコアロジックを初期化するJavaScriptファイルです。
- **src/mml2json.js**: MMLパーサーによって生成されたASTを受け取り、Tone.jsライブラリが解釈できるJSONシーケンサーフォーマットに変換する主要なロジックが実装されています。音楽イベントのタイミングやデュレーション計算を行います。
- **src/play.js**: `mml2json.js`で変換されたTone.js JSONデータを使用して、Web Audio APIを通じて実際の音楽再生を制御するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストケースが記述されたファイルです。Vitestフレームワークを利用しています。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): 主にエラーハンドリングに使用されるブロックで、テスト実行時などに発生する例外を捕捉し、適切に処理する可能性があります。
    - 引数: 不明 (通常はエラーオブジェクト)
    - 戻り値: 不明
    - 機能: エラーの捕捉と処理。
- **`error`**: エラーオブジェクトを生成、またはエラーに関する情報を処理する関数。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: エラー処理。
- **`on`**: イベントリスナーを登録する汎用的な関数。特定のイベントが発生したときに指定されたコールバック関数を実行します。
    - 引数: 不明 (通常はイベント名とコールバック関数)
    - 戻り値: 不明
    - 機能: イベントハンドリング。
- **`escapeHtml`** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティ脆弱性（XSSなど）を防ぎながら、安全にHTMLコンテンツを表示できるようにします。
    - 引数: `htmlString` (文字列): エスケープするHTML文字列
    - 戻り値: `string`: エスケープされたHTML文字列
    - 機能: HTML文字列のエスケープ処理。
- **`getLayoutConfig`** (generated-docs/callgraph.js): 呼び出しグラフの描画に使用されるレイアウト設定を取得または生成します。
    - 引数: なし
    - 戻り値: `object`: レイアウト設定オブジェクト
    - 機能: グラフレイアウト設定の取得。
- **`placeCentralNode`** (generated-docs/callgraph.js): 呼び出しグラフ内で特定のノード（通常は中心となる関数）を中央に配置します。
    - 引数: なし
    - 戻り値: なし
    - 機能: 中央ノードの配置。
- **`showNodeInfo`** (generated-docs/callgraph.js): グラフ内の特定のノード（関数）に関する詳細情報を表示パネルに表示します。
    - 引数: `nodeId` (文字列): 表示するノードのID
    - 戻り値: なし
    - 機能: ノード情報の表示。
- **`showEdgeInfo`** (generated-docs/callgraph.js): グラフ内の特定の辺（関数間の呼び出し関係）に関する詳細情報を表示パネルに表示します。
    - 引数: `edgeId` (文字列): 表示する辺のID
    - 戻り値: なし
    - 機能: 辺情報の表示。
- **`hideInfoPanel`** (generated-docs/callgraph.js): グラフの詳細情報が表示されているパネルを非表示にします。
    - 引数: なし
    - 戻り値: なし
    - 機能: 情報パネルの非表示化。
- **`showInfoPanel`** (generated-docs/callgraph.js): グラフの詳細情報パネルを表示します。
    - 引数: なし
    - 戻り値: なし
    - 機能: 情報パネルの表示。
- **`toggleInfoPanel`** (generated-docs/callgraph.js): グラフの詳細情報パネルの表示/非表示を切り替えます。
    - 引数: なし
    - 戻り値: なし
    - 機能: 情報パネルの表示状態切り替え。
- **`generateGitHubURL`** (generated-docs/callgraph.js): プロジェクトのGitHubリポジトリ内の関連するファイルやコード行へのURLを生成します。
    - 引数: `filePath` (文字列), `lineNumber` (数値) など
    - 戻り値: `string`: GitHub URL
    - 機能: GitHubへのリンク生成。
- **`resetLayout`** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットします。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフレイアウトのリセット。
- **`watchNodeMovementAndFixOverlapsWrap`** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正するロジックをラップする関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードの動き監視と重なり修正のラッパー。
- **`watchNodeMovementAndFixOverlaps`** (generated-docs/callgraph.js): グラフ内のノードの移動を監視し、他のノードとの重なりを自動的に解決します。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードの重なりを解決。
- **`resolveNodeOverlaps`** (generated-docs/callgraph.js): グラフ内で重なっているノードの位置を調整し、視認性を高めます。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードの重なりを解決。
- **`switchLayout`** (generated-docs/callgraph.js): 呼び出しグラフの描画に使用するレイアウトアルゴリズムを切り替えます。
    - 引数: `layoutType` (文字列): 切り替えるレイアウトの種類
    - 戻り値: なし
    - 機能: グラフレイアウトの切り替え。
- **`resetNodeStates`** (generated-docs/callgraph.js): グラフ内のすべてのノードの選択状態、ハイライト状態などをリセットします。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードの状態リセット。
- **`fitToContent`** (generated-docs/callgraph.js): グラフの表示領域を現在のコンテンツに合わせて調整し、すべてのノードが表示されるようにします。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフ表示領域の調整。
- **`toggleNodeLabels`** (generated-docs/callgraph.js): グラフノードに表示されるラベルの表示/非表示を切り替えます。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードラベルの表示切り替え。
- **`toggleCalleeLocationFilter`** (generated-docs/callgraph.js): 呼び出し先のファイルパスなどに基づいてグラフの表示をフィルタリングする機能を切り替えます。
    - 引数: なし
    - 戻り値: なし
    - 機能: 呼び出し先フィルタの切り替え。
- **`replace`** (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する汎用的な関数です。
    - 引数: `target` (文字列), `pattern` (文字列または正規表現), `replacement` (文字列)
    - 戻り値: `string`: 置換後の文字列
    - 機能: 文字列置換。
- **`function`** (generated-docs/callgraph.js): コード分析により検出された匿名関数や、高階関数内で定義された関数を指します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 匿名関数の定義。
- **`max`** (generated-docs/callgraph.js): 複数の数値の中から最大値を見つける関数です。
    - 引数: `numbers` (数値の配列または可変長引数)
    - 戻り値: `number`: 最大値
    - 機能: 最大値の計算。
- **`ready`** (generated-docs/callgraph.js): DOM (Document Object Model) が完全にロードされ、操作可能になったときに実行されるイベントハンドラです。
    - 引数: 不明
    - 戻り値: なし
    - 機能: DOM準備完了時の処理。
- **`addListener`** (generated-docs/callgraph.js): 特定のイベントに対してイベントリスナー（イベントが発生したときに実行される関数）を追加します。
    - 引数: `eventType` (文字列), `listener` (関数)
    - 戻り値: なし
    - 機能: イベントリスナーの追加。
- **`mml2json`** (src/mml2json.js): MMLパーサーの出力（抽象構文ツリー）を受け取り、それをTone.jsライブラリが解釈できるJSONシーケンサーフォーマットに変換する中心的な関数です。音楽イベントのタイミングやデュレーションを計算します。
    - 引数: `mmlAst` (object): MMLパーサーによって生成された抽象構文ツリー
    - 戻り値: `object`: Tone.jsシーケンサーフォーマットのJSONオブジェクト
    - 機能: MML ASTからTone.js JSONへの変換。
- **`compileMmlToCommands`** (src/mml2json.js): MMLのASTを解析し、音楽コマンドの内部リストにコンパイルします。
    - 引数: `ast` (object): MMLの抽象構文ツリー
    - 戻り値: `Array<object>`: 音楽コマンドのリスト
    - 機能: MML ASTを音楽コマンドに変換。
- **`getMmlCommands`** (src/mml2json.js): MML文字列から音楽コマンドを抽出し、解析可能な形式に変換します。
    - 引数: `mmlString` (string): MML文字列
    - 戻り値: `Array<object>`: 音楽コマンドのリスト
    - 機能: MML文字列からコマンド抽出。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): 音符のアタック（発音）からリリース（消音）までのティック数を計算します。
    - 引数: `duration` (number), `staccato` (number) など
    - 戻り値: `number`: ティック数
    - 機能: 音符の持続時間計算。
- **`repeat`** (src/mml2json.js): 特定の処理や値を複数回繰り返すためのヘルパー関数です。
    - 引数: `value` (any), `count` (number)
    - 戻り値: `Array<any>`: 繰り返された値の配列
    - 機能: 値や処理の繰り返し。
- **`toInt`** (src/mml2json.js): 引数として受け取った値を整数に変換します。
    - 引数: `value` (any): 変換する値
    - 戻り値: `number`: 整数値
    - 機能: 値を整数に変換。
- **`calcDuration`** (src/mml2json.js): MMLの記述に基づいて音符のデュレーション（持続時間）を計算します。
    - 引数: `noteLength` (number), `dots` (number) など
    - 戻り値: `number`: デュレーションティック数
    - 機能: 音符のデュレーション計算。
- **`calcStartTick`** (src/mml2json.js): 音楽イベントが開始するティック位置を計算します。
    - 引数: `previousTick` (number), `duration` (number) など
    - 戻り値: `number`: 開始ティック
    - 機能: イベント開始時刻の計算。
- **`increaseStartTick`** (src/mml2json.js): 現在の開始ティック位置を指定された量だけ増分させます。
    - 引数: `currentTick` (number), `increment` (number)
    - 戻り値: `number`: 更新されたティック
    - 機能: 開始ティックの増分。
- **`calcLtick`** (src/mml2json.js): MMLのLコマンド（デフォルトの音長設定）に基づいてティック数を計算します。
    - 引数: `lValue` (number)
    - 戻り値: `number`: Lティック数
    - 機能: Lコマンドティックの計算。
- **`getNodeId`** (src/mml2json.js): グラフやデータ構造内でノードの一意識別子を取得または生成します。
    - 引数: `node` (object)
    - 戻り値: `string`: ノードID
    - 機能: ノードIDの取得。
- **`sort`**: 配列やリストの要素を特定の順序で並べ替える関数です。
    - 引数: `array` (Array), `compareFunction` (function)
    - 戻り値: `Array`: ソートされた配列
    - 機能: 配列のソート。
- **`play`** (src/play.js): `mml2json.js`によって生成されたTone.js JSONデータを受け取り、Web Audio APIを通じて実際の音楽再生を開始する関数です。
    - 引数: `jsonData` (object): Tone.jsシーケンサーフォーマットのJSONデータ
    - 戻り値: `Promise`: 再生完了時に解決されるPromise
    - 機能: MML音楽の再生開始。
- **`sub`** (src/play.js): `play`関数から呼び出される補助的な関数です。具体的な機能はコードに依存しますが、通常は複雑な処理の一部を分割するために使用されます。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 補助的な処理。
- **`switch`** (generated-docs/callgraph.js): 条件に基づいて異なるコードパスを実行する制御構造、またはグラフの表示モードを切り替えるなどの機能を指す場合があります。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 条件分岐、モード切り替え。
- **`if`** (generated-docs/callgraph.js): 条件が真である場合に特定のコードブロックを実行する制御構造です。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 条件分岐。
- **`for`** (generated-docs/callgraph.js): 指定された回数だけ、またはコレクションの各要素に対してコードブロックを繰り返し実行するループ制御構造です。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: ループ処理。
- **`hex`** (src/grammar.js): 16進数に関連する処理を行う関数で、パーサー内部で文字コードや数値の解析に使用される可能性があります。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 16進数処理。
- **`unicodeEscape`** (src/grammar.js): Unicodeエスケープシーケンス（例: `\uXXXX`）を処理し、対応する文字に変換します。パーサーで文字列リテラルを解析する際に使用されます。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: Unicodeエスケープの処理。
- **`literalEscape`** (src/grammar.js): リテラルエスケープシーケンス（例: `\n`, `\t`）を処理します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: リテラルエスケープの処理。
- **`classEscape`** (src/grammar.js): 文字クラスエスケープシーケンスを処理します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 文字クラスエスケープの処理。
- **`describeExpectation`** (src/grammar.js): パーサーが現在位置で期待している入力形式を説明するメッセージを生成します。エラー報告に利用されます。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: パーサーの期待値の説明生成。
- **`describeExpected`** (src/grammar.js): パーサーが期待する次の入力の記述を生成します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 期待入力の記述生成。
- **`describeFound`** (src/grammar.js): パーサーが実際に読み込んだ入力の記述を生成します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 実際入力の記述生成。
- **`peg$parse`** (src/grammar.js): Peggyパーサーのメインエントリポイントとなる関数です。MML文字列を解析し、その文法構造に従ってASTを構築します。
    - 引数: `text` (string): 解析するMML文字列
    - 戻り値: `object`: 構築された抽象構文ツリー (AST)
    - 機能: MML文字列の解析とASTの構築。
- **`peg$f0`** (src/grammar.js): Peggyパーサーが生成する内部ヘルパー関数の一つで、特定の文法ルールに関連する処理を実行します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: パーサー内部処理。
- **`text`** (src/grammar.js): 現在解析中のMML文字列の一部、または全体を取得します。
    - 引数: なし
    - 戻り値: `string`: 解析中のテキスト
    - 機能: 解析テキストの取得。
- **`offset`** (src/grammar.js): 現在の解析位置のオフセット（文字数）を取得します。
    - 引数: なし
    - 戻り値: `number`: 現在のオフセット
    - 機能: 解析位置の取得。
- **`range`** (src/grammar.js): 現在解析中の入力範囲（開始オフセットと終了オフセット）を取得します。
    - 引数: なし
    - 戻り値: `object`: `{ start: number, end: number }`
    - 機能: 解析範囲の取得。
- **`location`** (src/grammar.js): 現在の解析位置に関する詳細情報（行番号、列番号など）を取得します。
    - 引数: なし
    - 戻り値: `object`: `{ start: { line: number, column: number, offset: number }, end: { line: number, column: number, offset: number } }`
    - 機能: 解析位置情報の取得。
- **`expected`** (src/grammar.js): パーサーが現在の位置で期待している入力の種類（例: 'literal "a"', 'class [0-9]'）を格納する配列です。
    - 引数: なし
    - 戻り値: `Array<object>`: 期待される入力のリスト
    - 機能: 期待される入力の追跡。
- **`peg$getUnicode`** (src/grammar.js): Unicode文字コードを処理し、文字を取得します。
    - 引数: 不明
    - 戻り値: `string`: Unicode文字
    - 機能: Unicode文字の取得。
- **`peg$literalExpectation`** (src/grammar.js): 特定のリテラル文字列が期待される場合に、その期待値を表現するオブジェクトを生成します。
    - 引数: `text` (string): 期待されるリテラル文字列, `ignoreCase` (boolean): 大文字小文字を区別しないか
    - 戻り値: `object`: リテラル期待値オブジェクト
    - 機能: リテラル期待値の生成。
- **`peg$classExpectation`** (src/grammar.js): 文字クラス（例: `[a-z]`）が期待される場合に、その期待値を表現するオブジェクトを生成します。
    - 引数: `parts` (Array), `inverted` (boolean), `ignoreCase` (boolean)
    - 戻り値: `object`: 文字クラス期待値オブジェクト
    - 機能: 文字クラス期待値の生成。
- **`peg$anyExpectation`** (src/grammar.js): 任意の単一文字が期待される場合に、その期待値を表現するオブジェクトを生成します。
    - 引数: なし
    - 戻り値: `object`: 任意の文字期待値オブジェクト
    - 機能: 任意の文字期待値の生成。
- **`peg$endExpectation`** (src/grammar.js): 入力の終端が期待される場合に、その期待値を表現するオブジェクトを生成します。
    - 引数: なし
    - 戻り値: `object`: 終端期待値オブジェクト
    - 機能: 終端期待値の生成。
- **`peg$otherExpectation`** (src/grammar.js): 特定の種類に分類されない、一般的な期待値を表現するオブジェクトを生成します。
    - 引数: `description` (string): 説明
    - 戻り値: `object`: その他の期待値オブジェクト
    - 機能: その他の期待値の生成。
- **`peg$computePosDetails`** (src/grammar.js): 特定のオフセット（位置）に対する行番号や列番号などの詳細な位置情報を計算します。
    - 引数: `offset` (number)
    - 戻り値: `object`: 位置詳細情報
    - 機能: 位置詳細の計算。
- **`peg$computeLocation`** (src/grammar.js): 開始オフセットと終了オフセットに基づいて、完全な位置情報（行、列、オフセット）を計算します。
    - 引数: `startOffset` (number), `endOffset` (number)
    - 戻り値: `object`: 位置情報
    - 機能: 位置情報の計算。
- **`peg$fail`** (src/grammar.js): パーサーが現在の文法ルールに一致しない場合に、失敗状態を設定します。
    - 引数: `expected` (object): 期待される入力
    - 戻り値: なし
    - 機能: パーサーの失敗処理。
- **`peg$buildSimpleError`** (src/grammar.js): 比較的簡潔な形式のエラーメッセージオブジェクトを構築します。
    - 引数: `message` (string), `expected` (Array), `found` (any), `location` (object)
    - 戻り値: `object`: エラーオブジェクト
    - 機能: シンプルなエラーの構築。
- **`peg$buildStructuredError`** (src/grammar.js): より詳細な情報を含む、構造化されたエラーメッセージオブジェクトを構築します。
    - 引数: `message` (string), `expected` (Array), `found` (any), `location` (object)
    - 戻り値: `object`: 構造化エラーオブジェクト
    - 機能: 構造化エラーの構築。
- **`peg$parsestart`** (src/grammar.js): PeggyパーサーがMML文法の`start`ルールを処理する際に呼び出される内部関数です。MML全体の解析を開始します。
    - 引数: なし
    - 戻り値: `object`: ASTの一部
    - 機能: `start`ルール解析。
- **`peg$parsenote`** (src/grammar.js): PeggyパーサーがMML文法の`note`ルールを処理する際に呼び出される内部関数です。個々の音符や休符を解析します。
    - 引数: なし
    - 戻り値: `object`: 音符のASTノード
    - 機能: `note`ルール解析。
- **`peg$throw`** (src/grammar.js): パーサーが回復不可能なエラーを検出した際に、エラーオブジェクトをスローします。
    - 引数: `error` (object): スローするエラーオブジェクト
    - 戻り値: なし
    - 機能: エラーのスロー。
- **`constructor`**: JavaScriptクラスのインスタンスが作成されるときに自動的に呼び出される特殊なメソッドです。オブジェクトの初期化処理を行います。
    - 引数: クラス定義による
    - 戻り値: なし
    - 機能: オブジェクトの初期化。
- **`start`** (src/grammar.pegjs): PEG文法定義におけるメインの開始ルールです。MML文字列全体がこのルールによって解析されます。
    - 引数: なし (文法ルール内で定義)
    - 戻り値: ASTルートノード
    - 機能: MML全体の解析開始点。
- **`note`** (src/grammar.pegjs): PEG文法定義において、MMLの個々の音符や休符の構文を定義するルールです。
    - 引数: なし (文法ルール内で定義)
    - 戻り値: 音符または休符のASTノード
    - 機能: 音符/休符の構文解析。

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

---
Generated at: 2025-09-21 07:05:17 JST
