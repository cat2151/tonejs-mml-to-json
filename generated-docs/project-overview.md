Last updated: 2025-10-02

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Web Audio APIライブラリTone.jsが解釈できるJSONシーケンサー形式に変換するツールです。
- これにより、Webブラウザ上でMMLで記述された音楽データを再生・制御することが可能になります。
- 主な用途は、MMLを活用したブラウザベースの音楽アプリケーション開発の支援と、MMLとTone.jsの連携を容易にすることです。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザ上でMMLプレイヤーのインターフェースを提供するために使用されます。
- 音楽・オーディオ: **Tone.js** - Web Audio APIを抽象化し、ブラウザ上での高度な音声合成とシーケンスを可能にするJavaScriptライブラリです。**Web Audio API** - ブラウザに標準搭載されている音声処理技術で、Tone.jsを通じて利用されます。**Tone.js CDN** - unpkg経由でTone.jsライブラリを配信し、手軽に利用できるようにしています。**MML (Music Macro Language)** - 音楽をテキストで記述するための記法で、このプロジェクトのパーサーの対象です。
- 開発ツール: **Node.js runtime** - JavaScriptの実行環境として開発プロセス全体で利用されます。**npm scripts** - ビルド、テスト、ドキュメント生成などのタスクを自動化するために定義されたスクリプトです。**pnpm** - 高速かつディスク容量効率の良いパッケージマネージャーとして使用されます。**Google Generative AI** - ドキュメントの自動生成など、AIによる開発支援に活用されます。**@octokit/rest** - GitHub APIと連携し、リポジトリ情報の取得やIssue管理の自動化に利用されます。
- テスト: **Vitest** - Viteをベースにした高速なテストフレームワークで、プロジェクトのコードの動作確認に使用されます。**TDD (Test-Driven Development)** - テストを先に書き、それに合わせてコードを開発する手法が採用されています。
- ビルドツール: **Peggy** - PEG (Parsing Expression Grammar) に基づいてパーサーを自動生成するツールです。**PEG文法定義** - MMLの音楽記法を解析するための文法ルールが定義され、これによりMMLパーサーが生成されます。
- 言語機能: **ES Modules** - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用性を高めます。
- 自動化・CI/CD: **GitHub Actions** - コードの変更がプッシュされた際に、テスト、ドキュメント生成、翻訳などの自動化されたワークフローを実行します。これには、プロジェクト要約の自動生成、Issueの自動管理、READMEファイルの多言語翻訳、i18n (国際化) の自動化が含まれます。
- 開発標準: **EditorConfig** - 異なるエディタやIDEを使用する開発者間でも、プロジェクトのコーディングスタイル（インデント、改行コードなど）を統一するための設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でのコーディングスタイル（インデント、文字コードなど）の統一を定義する設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトの利用条件や配布に関するライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの概要、目的、使用方法、インストール手順などを日本語で説明する主要なドキュメントです。
- **README.md**: プロジェクトの概要、目的、使用方法、インストール手順などを英語で説明する主要なドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップや準備に関する情報を提供するドキュメントです。
- **dev-setup/setup.js**: 開発環境の初期設定や特定の開発タスク（例: テスト設定）を実行するためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚化し、よりインタラクティブに探索できるHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で表示される関数呼び出しグラフのデータ処理、レイアウト、およびインタラクションを制御するJavaScriptコードです。
- **generated-docs/style.css**: 生成されたドキュメントの視覚的なスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのデモページやメインのウェブアプリケーションとして機能するHTMLファイルです。
- **issue-notes/**: 開発者向けの課題（Issue）に関するメモや詳細情報が格納されているディレクトリです。来訪者向け情報のため、各ファイルの詳細説明は省略します。
- **package.json**: プロジェクトのメタデータ（名前、バージョン）、スクリプト、依存関係、開発依存関係などを定義する設定ファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する、プロジェクトの依存関係の厳密なバージョンをロックするためのファイルです。これにより、開発者間で同じ依存関係ツリーが保証されます。
- **src/grammar.js**: `src/grammar.pegjs`に定義されたPEG文法に基づいてPeggyによって自動生成された、MMLを解析するためのJavaScriptパーサーです。MML文字列を構造化されたデータに変換します。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則をPEG (Parsing Expression Grammar) 形式で定義するファイルです。この定義を基に`src/grammar.js`が生成されます。
- **src/index.html**: MMLパーサーとTone.jsを活用したデモページやアプリケーションのエントリポイントとなるHTMLファイルです。
- **src/main.js**: アプリケーションの主要なロジックや初期化処理を記述するJavaScriptファイルです。
- **src/mml2json.js**: `src/grammar.js`で解析されたMMLのデータ構造を、Tone.jsライブラリが利用できるJSONシーケンサー形式に変換するコアロジックを実装しています。
- **src/play.js**: Tone.jsを使用して、MMLから変換されたJSON形式の音楽データを実際にブラウザ上で再生するためのオーディオ再生ロジックを提供します。
- **test/parser.test.js**: `src/grammar.js`で実装されたMMLパーサーの正確性を検証するための単体テストコードが記述されています。Vitestフレームワークを利用しています。
- **vitest.config.js**: Vitestテストフレームワークの各種設定を定義するファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラー発生時にそのエラーを捕捉し、適切なエラーハンドリング処理を実行します。引数: `error` (発生したエラーオブジェクト), 戻り値: なし。
- **escapeHtml** (generated-docs/callgraph.js): 文字列中のHTML特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティ脆弱性を防ぎます。引数: `htmlString` (エスケープ対象の文字列), 戻り値: エスケープされた文字列。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフの描画に使用されるレイアウト設定（例: 配置アルゴリズム、ノード間隔）を取得します。引数: なし, 戻り値: レイアウト設定オブジェクト。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心となるノードを特定し、その配置を調整します。引数: なし, 戻り値: なし。
- **showNodeInfo** (generated-docs/callgraph.js): グラフ上の特定のノード（関数）に関する詳細情報（例: ファイルパス、行数）を情報パネルに表示します。引数: `nodeId` (ノードの識別子), 戻り値: なし。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフ上の特定のエッジ（呼び出し関係）に関する詳細情報を情報パネルに表示します。引数: `edgeId` (エッジの識別子), 戻り値: なし。
- **hideInfoPanel** (generated-docs/callgraph.js): 表示されている情報パネルを非表示にします。引数: なし, 戻り値: なし。
- **showInfoPanel** (generated-docs/callgraph.js): 情報パネルを表示します。引数: なし, 戻り値: なし。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの表示状態（表示/非表示）を切り替えます。引数: なし, 戻り値: なし。
- **generateGitHubURL** (generated-docs/callgraph.js): 指定されたファイルパスに基づいて、GitHubリポジトリ内のそのファイルへのURLを生成します。引数: `filePath` (ファイルパス), 戻り値: GitHubのURL文字列。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットし、ノードとエッジを再配置します。引数: なし, 戻り値: なし。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、ノードの重なりを自動的に解消する処理をラップします。引数: なし, 戻り値: なし。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの動きを監視し、ノードが重なった場合にその配置を調整して重なりを解消します。引数: なし, 戻り値: なし。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): 互いに重なっているノードの位置を調整し、視覚的な明確性を向上させます。引数: なし, 戻り値: なし。
- **switchLayout** (generated-docs/callgraph.js): グラフの描画レイアウトアルゴリズム（例: 力学モデル、階層型）を切り替えます。引数: `layoutType` (新しいレイアウトの種類), 戻り値: なし。
- **resetNodeStates** (generated-docs/callgraph.js): グラフ内のノードの選択状態、ハイライト状態などを初期値に戻します。引数: なし, 戻り値: なし。
- **fitToContent** (generated-docs/callgraph.js): グラフ全体が画面に収まるようにズームレベルや位置を調整します。引数: なし, 戻り値: なし。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードに表示されるラベルの表示/非表示を切り替えます。引数: なし, 戻り値: なし。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し元または呼び出し先の場所に基づいてグラフ表示をフィルタリングする機能を切り替えます。引数: なし, 戻り値: なし。
- **replace** (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換します。汎用的な文字列操作関数です。引数: `text`, `search`, `replacement`, 戻り値: 置換後の文字列。
- **function** (generated-docs/callgraph.js): 匿名関数または特定の関数宣言のコンテキストを示唆します。具体的な引数、戻り値、機能はコンテキストに依存します。
- **max** (generated-docs/callgraph.js): 複数の数値の中から最大値を計算します。引数: `numbers` (数値の配列), 戻り値: 最大値。
- **on** (generated-docs/callgraph.js): DOM要素やカスタムイベントに対してイベントリスナーを設定します。引数: `eventName`, `handler` (イベント発生時に実行される関数), 戻り値: なし。
- **if** (generated-docs/callgraph.js): JavaScriptの条件分岐構文`if`を示唆します。具体的な引数、戻り値、機能はコンテキストに依存します。
- **for** (generated-docs/callgraph.js): JavaScriptのループ構文`for`を示唆します。具体的な引数、戻り値、機能はコンテキストに依存します。
- **ready** (generated-docs/callgraph.js): ドキュメントオブジェクトモデル (DOM) の準備が完了したときに実行されるコールバック関数を登録します。引数: `callback` (DOMが準備完了した際に実行される関数), 戻り値: なし。
- **addListener** (generated-docs/callgraph.js): 特定のオブジェクトや要素にイベントリスナーを追加します。引数: `eventName`, `listener` (イベントハンドラ関数), 戻り値: なし。
- **hex** (src/grammar.js): 16進数に関連する処理（例: 16進数文字のパース）を実行します。MMLパーサーの内部処理で使用されます。引数: 不明, 戻り値: 不明。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンス（例: `\uXXXX`）を処理し、対応する文字に変換します。引数: 不明, 戻り値: 不明。
- **literalEscape** (src/grammar.js): リテラル文字列内の特殊文字をエスケープ解除します。引数: 不明, 戻り値: 不明。
- **classEscape** (src/grammar.js): 文字クラス定義内の特殊文字をエスケープ解除します。引数: 不明, 戻り値: 不明。
- **describeExpectation** (src/grammar.js): パーサーが現在の位置で期待している入力パターンを説明する文字列を生成します。デバッグやエラーメッセージに利用されます。引数: `expectation` (期待オブジェクト), 戻り値: 説明文字列。
- **describeExpected** (src/grammar.js): 複数または単一の期待される入力パターンについて、人間が読める形式で説明を生成します。引数: `expected` (期待オブジェクトの配列), 戻り値: 説明文字列。
- **describeFound** (src/grammar.js): パーサーが予期せず見つけた文字について説明します。引数: `found` (見つかった文字), 戻り値: 説明文字列。
- **peg$parse** (src/grammar.js): Peggyによって生成されたMMLパーサーのメインエントリポイントです。MML文字列を入力として受け取り、解析結果を返します。引数: `text` (MML文字列), `options` (パーサーオプション), 戻り値: 解析結果の抽象構文木 (AST)。
- **peg$f0** (src/grammar.js): Peggyパーサー内部で特定の文法ルールに結びつけられたアクションを実行する自動生成関数です。引数: 不明, 戻り値: 不明。
- **text** (src/grammar.js): 現在解析中の入力テキストの一部または全体を返します。引数: なし, 戻り値: 文字列。
- **offset** (src/grammar.js): 現在の解析位置の入力文字列からのオフセット（文字数）を返します。引数: なし, 戻り値: 数値。
- **range** (src/grammar.js): 現在の解析範囲の開始オフセットと終了オフセットを返します。引数: なし, 戻り値: オブジェクト。
- **location** (src/grammar.js): 現在の解析位置の行番号、列番号、オフセットなどの詳細な位置情報を返します。引数: なし, 戻り値: 位置情報オブジェクト。
- **expected** (src/grammar.js): 現在の解析位置でパーサーが期待している入力パターンのリストを保持します。引数: なし, 戻り値: 期待オブジェクトの配列。
- **error** (src/grammar.js): 解析中にエラーが発生した際に、エラーオブジェクトを生成または処理します。引数: `message` (エラーメッセージ), `location` (エラー位置情報), 戻り値: エラーオブジェクト。
- **peg$getUnicode** (src/grammar.js): Unicode文字コードから実際の文字を取得する内部関数です。引数: `code` (Unicodeコードポイント), 戻り値: 文字列。
- **peg$literalExpectation** (src/grammar.js): リテラル文字列が期待される場合に、その期待オブジェクトを生成します。引数: `text` (期待されるリテラル文字列), `ignoreCase` (大文字小文字を無視するかどうか), 戻り値: 期待オブジェクト。
- **peg$classExpectation** (src/grammar.js): 文字クラス（例: `[a-z]`）が期待される場合に、その期待オブジェクトを生成します。引数: `charClass` (文字クラス定義), `inverted` (反転フラグ), `ignoreCase` (大文字小文字を無視するかどうか), 戻り値: 期待オブジェクト。
- **peg$anyExpectation** (src/grammar.js): 任意の単一文字が期待される場合に、その期待オブジェクトを生成します。引数: なし, 戻り値: 期待オブジェクト。
- **peg$endExpectation** (src/grammar.js): 入力文字列の終端が期待される場合に、その期待オブジェクトを生成します。引数: なし, 戻り値: 期待オブジェクト。
- **peg$otherExpectation** (src/grammar.js): 特定のパターンに当てはまらない、一般的な期待を説明する期待オブジェクトを生成します。引数: `description` (期待の説明), 戻り値: 期待オブジェクト。
- **peg$computePosDetails** (src/grammar.js): 指定されたオフセットに基づいて、行番号や列番号などの詳細な位置情報を計算する内部関数です。引数: `offset` (オフセット値), 戻り値: 位置詳細オブジェクト。
- **peg$computeLocation** (src/grammar.js): 指定された開始オフセットと終了オフセットに基づいて、その範囲の場所情報（行、列）を計算する内部関数です。引数: `startOffset`, `endOffset`, 戻り値: 位置情報オブジェクト。
- **peg$fail** (src/grammar.js): 解析が失敗したことを示す内部関数です。引数: 不明, 戻り値: 不明。
- **peg$buildSimpleError** (src/grammar.js): メッセージと位置情報を含むシンプルな解析エラーオブジェクトを構築します。引数: `message`, `location`, 戻り値: エラーオブジェクト。
- **peg$buildStructuredError** (src/grammar.js): より詳細な情報（期待されるもの、見つかったもの）を含む構造化された解析エラーオブジェクトを構築します。引数: `message`, `expected`, `found`, `location`, 戻り値: エラーオブジェクト。
- **peg$parsestart** (src/grammar.js): MMLパーサーの最上位（開始）ルールを処理する関数です。MML文字列全体の解析を開始します。引数: 不明, 戻り値: 解析されたMML構造。
- **peg$parsenote** (src/grammar.js): MMLの個々の音符や休符などの音楽要素を解析するルールに対応する関数です。引数: 不明, 戻り値: 解析された音符情報。
- **peg$throw** (src/grammar.js): 指定されたメッセージでエラーをスローします。引数: `message` (エラーメッセージ), 戻り値: なし (例外をスロー)。
- **constructor** (src/grammar.js): クラスのインスタンスを初期化するコンストラクタ関数です。引数: 不明, 戻り値: インスタンスオブジェクト。
- **format** (src/grammar.js): 指定されたフォーマット文字列と引数を使用して、整形された文字列を生成します。エラーメッセージの生成などに利用されます。引数: `formatString`, `args` (可変引数), 戻り値: 整形された文字列。
- **buildMessage** (src/grammar.js): エラーメッセージや情報メッセージを構築する内部関数です。引数: 不明, 戻り値: 文字列。
- **literal** (src/grammar.js): MML文法内のリテラル要素（例: 文字列、数値）に関連する処理を行います。引数: 不明, 戻り値: 不明。
- **class** (src/grammar.js): MML文法内の文字クラス（例: `[a-z]`）に関連する処理を行います。引数: 不明, 戻り値: 不明。
- **any** (src/grammar.js): MML文法内の任意の文字要素に関連する処理を行います。引数: 不明, 戻り値: 不明。
- **end** (src/grammar.js): MML文法の終端条件に関連する処理を行います。引数: 不明, 戻り値: 不明。
- **other** (src/grammar.js): MML文法内のその他の要素に関連する処理を行います。引数: 不明, 戻り値: 不明。
- **while** (src/grammar.js): JavaScriptの`while`ループ構文のコンテキストで使用される関数、またはそれに類似する機能を持つ関数です。引数: 不明, 戻り値: 不明。
- **start** (src/grammar.pegjs): Peggy文法定義におけるMMLパーサーの開始ルールです。MML文字列全体を解析します。引数: なし, 戻り値: 解析されたMMLの抽象構文木。
- **note** (src/grammar.pegjs): Peggy文法定義におけるMMLの「音符」要素（例: `c4`, `r8`）を解析するためのルールです。引数: なし, 戻り値: 解析された音符のデータ。
- **mml2json** (src/mml2json.js): MMLの解析結果をTone.jsが利用できるJSONシーケンサー形式に変換する主要な関数です。引数: `mmlAST` (MMLパーサーの解析結果), 戻り値: Tone.js互換のJSONオブジェクト。
- **compileMmlToCommands** (src/mml2json.js): MML文字列をTone.jsのシーケンスコマンドのリストにコンパイルする内部関数です。引数: `mmlString` (MML文字列), 戻り値: コマンドオブジェクトの配列。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々のMMLコマンドを抽出し、解析します。引数: `mmlString` (MML文字列), 戻り値: 解析されたMMLコマンドのリスト。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符の開始から解放までのティック数を計算します。MMLの長さ情報に基づいて、Tone.jsのタイミングに変換します。引数: `duration`, `ltick`, 戻り値: 計算されたティック数。
- **repeat** (src/mml2json.js): 指定された回数だけ特定の処理を繰り返します。MMLの繰り返し記号 (`:`) の実装に使用されます。引数: `action` (繰り返す関数), `count` (繰り返し回数), 戻り値: なし。
- **toInt** (src/mml2json.js): 文字列を整数値に変換します。MMLの数値パラメータ（例: 音長、テンポ）の処理に利用されます。引数: `stringValue` (数値を含む文字列), 戻り値: 整数値。
- **calcDuration** (src/mml2json.js): MMLの音長指定（例: `4`, `8.`) から、音符の実際の持続時間を計算します。引数: `length` (音符の長さ), `dotCount` (付点数), 戻り値: 計算された持続時間。
- **calcStartTick** (src/mml2json.js): 音符の開始ティック（時間軸上の位置）を計算します。MMLの相対的な時間指定を絶対的なティックに変換します。引数: `currentTick`, `noteLength`, 戻り値: 次の音符の開始ティック。
- **increaseStartTick** (src/mml2json.js): 現在の開始ティックを特定のティック数だけ増加させます。音符や休符が経過した後の時間進行を管理します。引数: `currentTick`, `incrementTicks`, 戻り値: 更新された開始ティック。
- **calcLtick** (src/mml2json.js): MMLのLコマンド（デフォルト音長）の値に基づいて、その音長に対応するティック数を計算します。引数: `lValue` (Lコマンドの値), 戻り値: ティック数。
- **getNodeId** (src/mml2json.js): ノード（特定のデータ要素）に一意のIDを割り当てるか、既存のIDを取得します。引数: 不明, 戻り値: ノードID。
- **sort** (src/mml2json.js): 配列を特定の基準に基づいてソートします。生成された音楽イベントを時間順に並べるためなどに使用されます。引数: `array` (ソート対象の配列), `compareFunction` (比較関数), 戻り値: ソートされた配列。
- **play** (src/play.js): Tone.jsシーケンサーを初期化し、MMLから変換されたJSON形式の音楽データを読み込み、ブラウザ上で再生を開始します。引数: `musicData` (Tone.js JSONシーケンサー形式の音楽データ), 戻り値: なし。
- **sub** (src/play.js): 補助的な処理や計算を行う関数です。具体的な機能は利用コンテキストに依存します。引数: 不明, 戻り値: 不明。

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
Generated at: 2025-10-02 07:06:31 JST
