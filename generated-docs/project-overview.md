Last updated: 2025-08-06

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Tone.jsが利用可能なJSONシーケンサーフォーマットへ変換するツールです。
- Web Audio APIを活用し、ブラウザ上でMMLベースの音楽の再生を可能にする機能を提供します。
- Peggyパーサージェネレーターを用いてMML記法を解析し、音楽再生のためのデータ変換を自動化します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に利用されます。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用したブラウザベースの音声ライブラリです。Tone.js CDN - unpkg経由でTone.jsライブラリが提供されます。MML (Music Macro Language) - 音楽記法パーサーの基となる音楽記述言語です。Web Audio API - ブラウザで高度な音声処理を行うためのAPIで、Tone.jsがこれを抽象化して使用します。
- 開発ツール: Node.js runtime - JavaScript実行環境として使用されます。npm scripts - プロジェクトのタスク自動化に利用される5つのスクリプトです。pnpm - 高速で効率的なパッケージマネージャーです。Google Generative AI - プロジェクトのAI文書生成サポートに利用されます。@octokit/rest - GitHub APIとの連携に使用されます。
- テスト: Vitest - 高速なViteベースのテストフレームワークです。TDD (Test-Driven Development) - テスト駆動開発手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターです。PEG文法定義 - MML音楽記法のパーサーを生成するための文法定義ファイルです。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムが採用されています。
- 自動化・CI/CD: GitHub Actions - CI/CDの自動化に利用される4つのワークフローです（プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automation - 自動翻訳ワークフロー）。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。

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
- **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発状況などを日本語で説明する主要なドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発状況などを英語で説明する主要なドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記載されています。
- **dev-setup/setup.js**: 開発環境をセットアップするためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を視覚的に表示するためのHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で呼び出しグラフの描画とインタラクションを制御するJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況をまとめたドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: 生成されたドキュメントのスタイル定義です。
- **index.html**: プロジェクトのルートに配置された、デモまたはランディングページです。
- **issue-notes/**: プロジェクトのIssue管理に関連する詳細なメモや記録がMarkdown形式で格納されているディレクトリです。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されているファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する、プロジェクトの依存関係の正確なバージョンと構造をロックするファイルです。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成された、MMLをパースするためのJavaScriptコードです。
- **src/grammar.pegjs**: MMLの構文を定義するPEG (Parsing Expression Grammar) 形式のファイルです。このファイルからパーサーが生成されます。
- **src/index.html**: MMLの入力と再生を体験できるブラウザベースのデモページです。
- **src/main.js**: プロジェクトの主要な処理を連携させるエントリーポイントまたはメインロジックのファイルです。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックが実装されています。
- **src/play.js**: 変換されたJSONデータを使用して、Tone.jsで音楽を再生する機能を提供します。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの機能を検証するためのテストファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js):
    - 役割: エラーハンドリング。
    - 引数: エラーオブジェクト
    - 戻り値: なし
    - 機能: スクリプト実行中に発生した例外を捕捉し、適切な処理を行います。
- **escapeHtml** (generated-docs/callgraph.js):
    - 役割: HTML特殊文字のエスケープ。
    - 引数: 文字列
    - 戻り値: エスケープされた文字列
    - 機能: HTMLに表示する文字列の特殊文字をエスケープし、XSS攻撃などを防ぎます。
- **getLayoutConfig** (generated-docs/callgraph.js):
    - 役割: グラフレイアウト設定の取得。
    - 引数: なし
    - 戻り値: レイアウト設定オブジェクト
    - 機能: 関数呼び出しグラフの表示レイアウトに関する設定を取得します。
- **placeCentralNode** (generated-docs/callgraph.js):
    - 役割: 中央ノードの配置。
    - 引数: ノードオブジェクト
    - 戻り値: なし
    - 機能: 呼び出しグラフの中心となるノードを特定の位置に配置します。
- **showNodeInfo** (generated-docs/callgraph.js):
    - 役割: ノード情報の表示。
    - 引数: ノードオブジェクト
    - 戻り値: なし
    - 機能: グラフ上の特定の関数（ノード）の詳細情報を表示パネルに表示します。
- **showEdgeInfo** (generated-docs/callgraph.js):
    - 役割: エッジ情報の表示。
    - 引数: エッジオブジェクト
    - 戻り値: なし
    - 機能: グラフ上の特定の呼び出し関係（エッジ）の詳細情報を表示パネルに表示します。
- **hideInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報パネルの非表示化。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフの詳細情報を表示するパネルを隠します。
- **showInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報パネルの表示。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフの詳細情報を表示するパネルを表示します。
- **toggleInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報パネルの表示切り替え。
    - 引数: なし
    - 戻り値: なし
    - 機能: 情報パネルの表示/非表示を切り替えます。
- **generateGitHubURL** (generated-docs/callgraph.js):
    - 役割: GitHub URLの生成。
    - 引数: パス、ライン番号など
    - 戻り値: GitHub上のファイルへのURL文字列
    - 機能: 指定されたファイルやコード位置へのGitHub URLを生成します。
- **resetLayout** (generated-docs/callgraph.js):
    - 役割: レイアウトのリセット。
    - 引数: なし
    - 戻り値: なし
    - 機能: 呼び出しグラフの表示レイアウトを初期状態に戻します。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js):
    - 役割: ノード移動監視と重なり解消のラッパー。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードの動きを監視し、他のノードとの重なりを自動的に解消する処理のラッパーです。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js):
    - 役割: ノード移動監視と重なり解消。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフノードの移動を検知し、ノード同士の視覚的な重なりを自動的に修正します。
- **resolveNodeOverlaps** (generated-docs/callgraph.js):
    - 役割: ノードの重なり解消。
    - 引数: なし
    - 戻り値: なし
    - 機能: 複数のノードが重なっている場合に、それらを離して配置し直します。
- **switchLayout** (generated-docs/callgraph.js):
    - 役割: レイアウトの切り替え。
    - 引数: レイアウト名
    - 戻り値: なし
    - 機能: 呼び出しグラフの異なる表示レイアウト（例：ツリー、円形）に切り替えます。
- **resetNodeStates** (generated-docs/callgraph.js):
    - 役割: ノード状態のリセット。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフノードの選択状態やハイライトなどを初期状態に戻します。
- **fitToContent** (generated-docs/callgraph.js):
    - 役割: コンテンツへのフィット。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフの表示ズームレベルを、すべてのノードが画面に収まるように調整します。
- **toggleNodeLabels** (generated-docs/callgraph.js):
    - 役割: ノードラベルの表示切り替え。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフノードに表示されるラベルの表示/非表示を切り替えます。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js):
    - 役割: 呼び出し先位置フィルタの切り替え。
    - 引数: なし
    - 戻り値: なし
    - 機能: 呼び出し先関数のファイルパスなどに基づいてフィルタリング機能を有効/無効にします。
- **replace** (generated-docs/callgraph.js):
    - 役割: 文字列置換。
    - 引数: 対象文字列、検索パターン、置換文字列
    - 戻り値: 置換後の文字列
    - 機能: 文字列内の特定のパターンを別の文字列に置換します。
- **max** (generated-docs/callgraph.js):
    - 役割: 最大値の取得。
    - 引数: 数値のリスト
    - 戻り値: 最大値
    - 機能: 与えられた数値のリストから最大値を返します。
- **on** (generated-docs/callgraph.js):
    - 役割: イベントリスナーの設定。
    - 引数: イベント名、コールバック関数
    - 戻り値: なし
    - 機能: 特定のイベントが発生した際に実行されるコールバック関数を設定します。
- **ready** (generated-docs/callgraph.js):
    - 役割: ドキュメント準備完了。
    - 引数: なし
    - 戻り値: なし
    - 機能: DOMが完全にロードされ、スクリプトが実行可能になった時点で処理を実行します。
- **addListener** (generated-docs/callgraph.js):
    - 役割: イベントリスナーの追加。
    - 引数: イベントターゲット、イベント名、リスナー関数
    - 戻り値: なし
    - 機能: 指定されたイベントターゲットにイベントリスナーを追加します。
- **hex** (src/grammar.js):
    - 役割: 16進数パーシングヘルパー。
    - 引数: なし
    - 戻り値: パーサー生成コード内で使用される内部的な値。
    - 機能: Peggyパーサーが16進数を解析する際に使用する内部ヘルパー関数です。
- **unicodeEscape** (src/grammar.js):
    - 役割: Unicodeエスケープ処理。
    - 引数: なし
    - 戻り値: パーサー生成コード内で使用される内部的な値。
    - 機能: PeggyパーサーがUnicodeエスケープシーケンスを処理する際に使用します。
- **literalEscape** (src/grammar.js):
    - 役割: リテラルエスケープ処理。
    - 引数: なし
    - 戻り値: パーサー生成コード内で使用される内部的な値。
    - 機能: Peggyパーサーがリテラルエスケープシーケンスを処理する際に使用します。
- **classEscape** (src/grammar.js):
    - 役割: 文字クラスエスケープ処理。
    - 引数: なし
    - 戻り値: パーサー生成コード内で使用される内部的な値。
    - 機能: Peggyパーサーが文字クラスエスケープシーケンスを処理する際に使用します。
- **describeExpectation** (src/grammar.js):
    - 役割: 期待値の記述生成。
    - 引数: 期待値オブジェクト
    - 戻り値: 期待値の記述文字列
    - 機能: パーサーのエラーメッセージ生成に役立つ、期待される入力の記述を生成します。
- **describeExpected** (src/grammar.js):
    - 役割: 期待されるトークンの記述生成。
    - 引数: 期待されるトークン情報
    - 戻り値: 記述文字列
    - 機能: エラー発生時に、パーサーが期待していたトークンの詳細な記述を生成します。
- **describeFound** (src/grammar.js):
    - 役割: 見つかったトークンの記述生成。
    - 引数: 見つかったトークン情報
    - 戻り値: 記述文字列
    - 機能: エラー発生時に、実際に見つかったトークンの詳細な記述を生成します。
- **peg$parse** (src/grammar.js):
    - 役割: メインパース関数。
    - 引数: MML文字列
    - 戻り値: 解析結果の抽象構文木（AST）
    - 機能: Peggyによって生成された、MML文字列を解析して構造化されたデータ（AST）に変換する主要な関数です。
- **peg$f0** (src/grammar.js):
    - 役割: 内部ヘルパー関数。
    - 引数: なし
    - 戻り値: 内部処理の結果
    - 機能: Peggy生成コード内で使用される匿名関数または内部的なヘルパー関数です。
- **text** (src/grammar.js):
    - 役割: 現在のパーステキスト取得。
    - 引数: なし
    - 戻り値: 現在パース中のテキスト
    - 機能: パーサーが現在処理しているテキスト部分を返します。
- **offset** (src/grammar.js):
    - 役割: 現在のオフセット取得。
    - 引数: なし
    - 戻り値: 数値（オフセット）
    - 機能: パーサーが現在入力のどの位置（オフセット）にいるかを返します。
- **range** (src/grammar.js):
    - 役割: 現在のパース範囲取得。
    - 引数: なし
    - 戻り値: [開始オフセット, 終了オフセット] の配列
    - 機能: パーサーが現在処理している入力の範囲を返します。
- **location** (src/grammar.js):
    - 役割: 現在の位置情報取得。
    - 引数: なし
    - 戻り値: 位置情報オブジェクト（行、列など）
    - 機能: パーサーが現在入力のどの行、列にいるかなどの詳細な位置情報を返します。
- **expected** (src/grammar.js):
    - 役割: 期待されるトークン情報取得。
    - 引数: なし
    - 戻り値: 期待されるトークンのリスト
    - 機能: エラー発生時にパーサーがどのトークンを期待していたかという情報を返します。
- **error** (src/grammar.js):
    - 役割: パースエラーの生成。
    - 引数: エラーメッセージ、期待されるトークン、見つかったトークン、位置情報など
    - 戻り値: エラーオブジェクト
    - 機能: パース中にエラーが発生した場合に、エラーオブジェクトを生成します。
- **peg$getUnicode** (src/grammar.js):
    - 役割: Unicode文字の取得。
    - 引数: コードポイント
    - 戻り値: 文字列
    - 機能: 与えられたUnicodeコードポイントに対応する文字を返します。
- **peg$literalExpectation** (src/grammar.js):
    - 役割: リテラル期待値の生成。
    - 引数: リテラル文字列、大文字小文字無視フラグ
    - 戻り値: 期待値オブジェクト
    - 機能: 特定のリテラル文字列が入力で期待されることを示す期待値オブジェクトを生成します。
- **peg$classExpectation** (src/grammar.js):
    - 役割: 文字クラス期待値の生成。
    - 引数: 文字クラス定義、大文字小文字無視フラグ、反転フラグ
    - 戻り値: 期待値オブジェクト
    - 機能: 特定の文字クラスが入力で期待されることを示す期待値オブジェクトを生成します。
- **peg$anyExpectation** (src/grammar.js):
    - 役割: 任意の文字期待値の生成。
    - 引数: なし
    - 戻り値: 期待値オブジェクト
    - 機能: 任意の文字が入力で期待されることを示す期待値オブジェクトを生成します。
- **peg$endExpectation** (src/grammar.js):
    - 役割: 入力終了期待値の生成。
    - 引数: なし
    - 戻り値: 期待値オブジェクト
    - 機能: 入力の終わりが期待されることを示す期待値オブジェクトを生成します。
- **peg$otherExpectation** (src/grammar.js):
    - 役割: その他の期待値の生成。
    - 引数: 記述文字列
    - 戻り値: 期待値オブジェクト
    - 機能: 特定のカテゴリに属さない一般的な期待値オブジェクトを生成します。
- **peg$computePosDetails** (src/grammar.js):
    - 役割: 位置詳細の計算。
    - 引数: オフセット
    - 戻り値: 位置詳細オブジェクト
    - 機能: 与えられたオフセットに対応する行、列などの詳細な位置情報を計算します。
- **peg$computeLocation** (src/grammar.js):
    - 役割: 位置情報の計算。
    - 引数: 開始オフセット、終了オフセット
    - 戻り値: 位置情報オブジェクト
    - 機能: 与えられた開始・終了オフセットに基づいて、位置情報オブジェクトを計算します。
- **peg$fail** (src/grammar.js):
    - 役割: パース失敗の記録。
    - 引数: 期待値オブジェクト
    - 戻り値: なし
    - 機能: パースが失敗した際に、その原因となった期待値情報を記録します。
- **peg$buildSimpleError** (src/grammar.js):
    - 役割: シンプルなエラーオブジェクトの構築。
    - 引数: エラーメッセージ
    - 戻り値: エラーオブジェクト
    - 機能: 単純なエラーメッセージからエラーオブジェクトを構築します。
- **peg$buildStructuredError** (src/grammar.js):
    - 役割: 構造化エラーオブジェクトの構築。
    - 引数: エラーメッセージ、期待値、見つかった値、位置情報
    - 戻り値: エラーオブジェクト
    - 機能: 詳細な情報を含む構造化されたエラーオブジェクトを構築します。
- **peg$parsestart** (src/grammar.js):
    - 役割: MMLパーサーの開始ルール。
    - 引数: なし
    - 戻り値: 解析結果
    - 機能: Peggyパーサーの定義における、パースを開始する際のメインルールを処理します。
- **peg$parsenote** (src/grammar.js):
    - 役割: MML音符ルールの解析。
    - 引数: なし
    - 戻り値: 解析結果
    - 機能: Peggyパーサーの定義における、MMLの音符部分のルールを処理します。
- **peg$throw** (src/grammar.js):
    - 役割: エラーのスロー。
    - 引数: エラーオブジェクト
    - 戻り値: なし（例外をスロー）
    - 機能: 生成されたパーサー内で、パースエラーを例外としてスローします。
- **format** (src/grammar.js):
    - 役割: メッセージのフォーマット。
    - 引数: フォーマット文字列、引数リスト
    - 戻り値: フォーマット済み文字列
    - 機能: 渡された引数を用いて文字列をフォーマットします。
- **buildMessage** (src/grammar.js):
    - 役割: エラーメッセージの構築。
    - 引数: エラー情報
    - 戻り値: エラーメッセージ文字列
    - 機能: パーサーエラーの詳細情報に基づいて、人間が読めるエラーメッセージを構築します。
- **literal** (src/grammar.js):
    - 役割: リテラル値の処理。
    - 引数: なし
    - 戻り値: 処理結果
    - 機能: パーサーが定義されたリテラル値を処理する際に使用される内部関数です。
- **class** (src/grammar.js):
    - 役割: 文字クラスの処理。
    - 引数: なし
    - 戻り値: 処理結果
    - 機能: パーサーが定義された文字クラスを処理する際に使用される内部関数です。
- **any** (src/grammar.js):
    - 役割: 任意の文字の処理。
    - 引数: なし
    - 戻り値: 処理結果
    - 機能: パーサーが任意の文字を処理する際に使用される内部関数です。
- **end** (src/grammar.js):
    - 役割: 入力終了の処理。
    - 引数: なし
    - 戻り値: 処理結果
    - 機能: パーサーが入力の終了を処理する際に使用される内部関数です。
- **other** (src/grammar.js):
    - 役割: その他の要素の処理。
    - 引数: なし
    - 戻り値: 処理結果
    - 機能: パーサーが特定のカテゴリに属さないその他の要素を処理する際に使用される内部関数です。
- **mml2json** (src/mml2json.js):
    - 役割: MMLからJSONへの変換。
    - 引数: MML文字列
    - 戻り値: Tone.js互換のJSONシーケンサーフォーマット
    - 機能: MML (Music Macro Language) で記述された音楽データを解析し、Tone.jsライブラリが利用可能なJSONシーケンサーフォーマットに変換します。
- **compileMmlToCommands** (src/mml2json.js):
    - 役割: MMLを内部コマンドにコンパイル。
    - 引数: MML文字列
    - 戻り値: MMLコマンドの配列
    - 機能: MML文字列を、処理しやすい内部的な音楽コマンドのリストに変換します。
- **getMmlCommands** (src/mml2json.js):
    - 役割: MMLコマンドの抽出。
    - 引数: MML文字列
    - 戻り値: 抽出されたMMLコマンドの配列
    - 機能: MML文字列から個々の音楽コマンド（例: 音符、休符、テンポ変更）を抽出します。
- **calcAttackToReleaseTicks** (src/mml2json.js):
    - 役割: アタックからリリースまでのティック計算。
    - 引数: デュレーション、レガート率
    - 戻り値: ティック数
    - 機能: 音符のアタックからリリースまでの時間をティック単位で計算します。
- **repeat** (src/mml2json.js):
    - 役割: MML繰り返し処理。
    - 引数: コマンドリスト、繰り返し回数
    - 戻り値: 繰り返しが展開されたコマンドリスト
    - 機能: MMLの繰り返し記号（例: `[CDEFG]2`）を解釈し、対応する音楽コマンドを展開します。
- **toInt** (src/mml2json.js):
    - 役割: 整数変換。
    - 引数: 文字列または数値
    - 戻り値: 整数
    - 機能: 入力を安全に整数に変換します。
- **calcDuration** (src/mml2json.js):
    - 役割: 音符デュレーション計算。
    - 引数: 音符定義
    - 戻り値: デュレーション値
    - 機能: MMLの音符定義（例: `C4`）から、その音符の長さ（デュレーション）を計算します。
- **calcStartTick** (src/mml2json.js):
    - 役割: 開始ティック計算。
    - 引数: 現在のティック、デュレーション
    - 戻り値: 開始ティック値
    - 機能: 音符やイベントが始まる時間位置（ティック）を計算します。
- **increaseStartTick** (src/mml2json.js):
    - 役割: 開始ティックの増分。
    - 引数: ティック値、増分量
    - 戻り値: 増分されたティック値
    - 機能: 音楽の現在時間（ティック）を指定された量だけ進めます。
- **calcLtick** (src/mml2json.js):
    - 役割: Lコマンドのティック計算。
    - 引数: Lコマンドパラメータ
    - 戻り値: 計算されたティック値
    - 機能: MMLのLコマンド（音長設定）に関連するティック値を計算します。
- **getNodeId** (src/mml2json.js):
    - 役割: ノードIDの取得。
    - 引数: オブジェクト
    - 戻り値: ID文字列
    - 機能: 内部的なオブジェクトから一意の識別子（ノードID）を取得します。
- **sort** (src/mml2json.js):
    - 役割: 配列のソート。
    - 引数: 配列、比較関数
    - 戻り値: ソートされた配列
    - 機能: 指定された比較関数に基づいて配列の要素をソートします。
- **play** (src/play.js):
    - 役割: 音楽再生の実行。
    - 引数: JSON形式の音楽データ
    - 戻り値: なし
    - 機能: `mml2json.js`で変換されたJSONデータを受け取り、Tone.jsを使用してブラウザ上で音楽を再生します。
- **sub** (src/play.js):
    - 役割: 音楽再生の補助処理。
    - 引数: なし
    - 戻り値: なし
    - 機能: `play`関数から呼び出される、音楽再生に関連する内部的な補助処理を実行します。
- **start** (src/grammar.pegjs):
    - 役割: 文法の開始ルール定義。
    - 引数: なし
    - 戻り値: なし
    - 機能: PeggyパーサージェネレーターがMMLを解析する際の、最上位の文法ルールを定義します。
- **note** (src/grammar.pegjs):
    - 役割: 音符ルールの定義。
    - 引数: なし
    - 戻り値: なし
    - 機能: PeggyパーサージェネレーターがMMLの音符構文を解析するためのルールを定義します。

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
Generated at: 2025-08-06 07:04:19 JST
