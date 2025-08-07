Last updated: 2025-08-08

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサー形式へ変換するツールです。
- 変換された音楽データはWeb Audio APIを通じてブラウザ上で再生可能になります。
- 音楽記法解析から音声再生、自動ドキュメント生成まで、開発プロセス全体を支援する機能を含みます。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして機能します。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用した高性能な音声ライブラリです。Tone.js CDNを通じて配信され、MML (Music Macro Language) は音楽記法の解析に使用されます。Web Audio API自体はTone.jsを通じて利用されます。
- 開発ツール: Node.js runtime - JavaScript実行環境として利用されます。npm scripts - プロジェクト内の様々なタスク（5個のスクリプト）を自動化します。pnpm - 高速で効率的なパッケージマネージャーです。Google Generative AI - AIによる文書生成をサポートします。@octokit/rest - GitHub APIとの連携に使用されます。
- テスト: Vitest - 高速なViteベースのテストフレームワークです。TDD (Test-Driven Development) - テスト駆動開発手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターです。MML音楽記法のパーサー生成に利用されるPEG文法定義が含まれます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムが採用されています。
- 自動化・CI/CD: GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化する4個のワークフローが設定されています。これにはプロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、i18n automation (自動翻訳ワークフロー) が含まれます。
- 開発標準: EditorConfig - コードの統一ルールを定義し、プロジェクト全体のコード品質を維持します。

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
- **`.editorconfig`**: コーディングスタイルを定義し、異なるIDEやエディタ間でコードの整形ルールを統一するための設定ファイルです。
- **`.gitignore`**: Gitが追跡しないファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`**: プロジェクトの概要、使い方、開発方法などを日本語で説明する主要なドキュメントファイルです。
- **`README.md`**: プロジェクトの概要、使い方、開発方法などを英語で説明する主要なドキュメントファイルです。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する情報が記載されています。
- **`dev-setup/setup.js`**: 開発環境の初期設定や特定のタスク（Vitestを用いたテストのセットアップなど）を実行するためのJavaScriptスクリプトです。
- **`generated-docs/callgraph-enhanced.html`**: 自動生成された関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
- **`generated-docs/callgraph.js`**: 関数呼び出しグラフの描画、操作、レイアウト調整、情報表示といった機能を担うJavaScriptファイルです。
- **`generated-docs/development-status.md`**: プロジェクトの開発状況や進捗が記録されたドキュメントファイルです。
- **`generated-docs/project-overview.md`**: プロジェクトの自動生成された概要ドキュメントです。
- **`generated-docs/style.css`**: `generated-docs`内のHTMLドキュメントやグラフの表示に使用されるスタイルシートファイルです。
- **`index.html`**: プロジェクトのライブデモやメインアプリケーションの入り口となるHTMLファイルです。
- **`issue-notes/*.md`**: GitHub Issuesに関連するメモや詳細が個別のMarkdownファイルにまとめられています。（例: `1.md`, `10.md` など）
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、依存関係、スクリプトなど）を定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーによって生成される、依存関係の正確なバージョンとツリー構造をロックするためのファイルです。
- **`src/grammar.js`**: Peggyパーサージェネレーターによって`src/grammar.pegjs`から生成された、MMLの文法解析器の具体的な実装が含まれるJavaScriptファイルです。
- **`src/grammar.pegjs`**: MML (Music Macro Language) の文法規則を定義するPEG (Parsing Expression Grammar) 形式のファイルです。このファイルからパーサーが生成されます。
- **`src/index.html`**: `src`ディレクトリ内のデモやメインアプリケーションの表示に使用されるHTMLファイルです。
- **`src/main.js`**: アプリケーションの主要な処理を開始するエントリーポイントとなるJavaScriptファイルです。
- **`src/mml2json.js`**: MML文字列をTone.jsで使用可能なJSONシーケンサー形式に変換する主要なロジックが実装されているJavaScriptファイルです。
- **`src/play.js`**: `mml2json.js`で変換されたJSONデータを使用して、Web Audio API (Tone.js) 経由でMMLの音楽をブラウザで再生するロジックが実装されているJavaScriptファイルです。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性と機能性を検証するためのVitestによるテストスクリプトです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`mml2json(mmlString)`** (`src/mml2json.js`):
    - 役割: MML (Music Macro Language) の文字列をTone.jsのJSONシーケンサー形式に変換します。
    - 引数: `mmlString` (string) - 変換対象のMML文字列。
    - 戻り値: (object) - Tone.jsで利用可能なJSON形式のシーケンスデータ。
- **`compileMmlToCommands(mmlString)`** (`src/mml2json.js`):
    - 役割: MML文字列を、処理しやすい内部的なコマンドリストの形式にコンパイルします。
    - 引数: `mmlString` (string) - コンパイル対象のMML文字列。
    - 戻り値: (Array<object>) - MMLコマンドを表すオブジェクトの配列。
- **`getMmlCommands(parsedMml)`** (`src/mml2json.js`):
    - 役割: パースされたMMLデータから、実際の音楽コマンド（ノート、休符、制御コマンドなど）を抽出します。
    - 引数: `parsedMml` (object) - パース済みのMMLデータ。
    - 戻り値: (Array<object>) - 抽出されたMMLコマンドの配列。
- **`calcAttackToReleaseTicks(baseTick, duration)`** (`src/mml2json.js`):
    - 役割: 音符のアタック（発音）からリリース（消音）までのティック数を計算します。
    - 引数: `baseTick` (number) - 基本となるティック数, `duration` (number) - 音符の長さ。
    - 戻り値: (number) - 計算されたティック数。
- **`repeat(func, count)`** (`src/mml2json.js`):
    - 役割: 指定された関数を複数回繰り返して実行します。
    - 引数: `func` (function) - 実行する関数, `count` (number) - 繰り返す回数。
    - 戻り値: なし。
- **`toInt(value)`** (`src/mml2json.js`):
    - 役割: 指定された値を整数に変換します。
    - 引数: `value` (any) - 変換対象の値。
    - 戻り値: (number) - 整数値。
- **`calcDuration(noteLength)`** (`src/mml2json.js`):
    - 役割: MMLの音符の長さ指定から、実際のデュレーション（期間）を計算します。
    - 引数: `noteLength` (number) - MMLの音符の長さ。
    - 戻り値: (number) - 計算されたデュレーション。
- **`calcStartTick(context)`** (`src/mml2json.js`):
    - 役割: 音符やイベントの開始ティックを計算します。
    - 引数: `context` (object) - 現在のMML解析コンテキスト。
    - 戻り値: (number) - 開始ティック。
- **`increaseStartTick(context, duration)`** (`src/mml2json.js`):
    - 役割: 現在のMML解析コンテキストの開始ティックを指定されたデュレーション分増加させます。
    - 引数: `context` (object) - MML解析コンテキスト, `duration` (number) - 増加させるデュレーション。
    - 戻り値: なし。
- **`calcLtick(context, lValue)`** (`src/mml2json.js`):
    - 役割: MMLのLコマンド（音符の長さを設定）に基づいてティック数を計算します。
    - 引数: `context` (object) - MML解析コンテキスト, `lValue` (number) - Lコマンドの値。
    - 戻り値: (number) - 計算されたLティック。
- **`getNodeId(node)`** (`src/mml2json.js`):
    - 役割: 特定のノードに対して一意のIDを生成または取得します。（主にグラフ描画用）
    - 引数: `node` (object) - IDを取得するノードオブジェクト。
    - 戻り値: (string) - ノードのID。
- **`play(jsonSequenceData)`** (`src/play.js`):
    - 役割: `mml2json.js`によって生成されたJSONシーケンスデータを受け取り、Tone.jsを使用して音楽を再生します。
    - 引数: `jsonSequenceData` (object) - Tone.js形式のJSONシーケンスデータ。
    - 戻り値: なし。
- **`sub(a, b)`** (`src/play.js`):
    - 役割: 減算処理を行う補助関数です。
    - 引数: `a` (number), `b` (number) - 演算対象の数値。
    - 戻り値: (number) - 減算結果。
- **`escapeHtml(unsafe)`** (`generated-docs/callgraph.js`):
    - 役割: HTMLの特殊文字をエスケープし、XSS攻撃などを防ぎます。
    - 引数: `unsafe` (string) - エスケープする文字列。
    - 戻り値: (string) - エスケープされた文字列。
- **`getLayoutConfig()`** (`generated-docs/callgraph.js`):
    - 役割: 関数呼び出しグラフのレイアウト設定を取得します。
    - 引数: なし。
    - 戻り値: (object) - レイアウト設定オブジェクト。
- **`placeCentralNode(node)`** (`generated-docs/callgraph.js`):
    - 役割: グラフの中心に特定のノードを配置します。
    - 引数: `node` (object) - 配置するノードオブジェクト。
    - 戻り値: なし。
- **`showNodeInfo(node)`** (`generated-docs/callgraph.js`):
    - 役割: 選択されたグラフノードの詳細情報を表示します。
    - 引数: `node` (object) - 情報表示対象のノード。
    - 戻り値: なし。
- **`showEdgeInfo(edge)`** (`generated-docs/callgraph.js`):
    - 役割: 選択されたグラフのエッジ（接続線）の詳細情報を表示します。
    - 引数: `edge` (object) - 情報表示対象のエッジ。
    - 戻り値: なし。
- **`hideInfoPanel()`** (`generated-docs/callgraph.js`):
    - 役割: グラフ情報の表示パネルを非表示にします。
    - 引数: なし。
    - 戻り値: なし。
- **`showInfoPanel()`** (`generated-docs/callgraph.js`):
    - 役割: グラフ情報の表示パネルを表示します。
    - 引数: なし。
    - 戻り値: なし。
- **`toggleInfoPanel()`** (`generated-docs/callgraph.js`):
    - 役割: グラフ情報の表示パネルの表示/非表示を切り替えます。
    - 引数: なし。
    - 戻り値: なし。
- **`generateGitHubURL(nodeId)`** (`generated-docs/callgraph.js`):
    - 役割: GitHub上の関連リソースへのURLを生成します。
    - 引数: `nodeId` (string) - ノードID。
    - 戻り値: (string) - 生成されたURL。
- **`resetLayout()`** (`generated-docs/callgraph.js`):
    - 役割: グラフのレイアウトを初期状態にリセットします。
    - 引数: なし。
    - 戻り値: なし。
- **`watchNodeMovementAndFixOverlapsWrap(graph)`** (`generated-docs/callgraph.js`):
    - 役割: ノードの移動を監視し、重なりを修正する処理のラッパー関数です。
    - 引数: `graph` (object) - グラフオブジェクト。
    - 戻り値: なし。
- **`watchNodeMovementAndFixOverlaps(graph)`** (`generated-docs/callgraph.js`):
    - 役割: グラフノードの移動をリアルタイムで監視し、ノードの重なりを解消します。
    - 引数: `graph` (object) - グラフオブジェクト。
    - 戻り値: なし。
- **`resolveNodeOverlaps(graph)`** (`generated-docs/callgraph.js`):
    - 役割: グラフ内の重なっているノードの位置を調整し、重なりを解消します。
    - 引数: `graph` (object) - グラフオブジェクト。
    - 戻り値: なし。
- **`switchLayout(layoutType)`** (`generated-docs/callgraph.js`):
    - 役割: グラフのレイアウトタイプを切り替えます。
    - 引数: `layoutType` (string) - レイアウトの種類（例: 'cola', 'dagre'など）。
    - 戻り値: なし。
- **`resetNodeStates()`** (`generated-docs/callgraph.js`):
    - 役割: グラフ内のすべてのノードの状態（選択状態、ハイライトなど）をリセットします。
    - 引数: なし。
    - 戻り値: なし。
- **`fitToContent()`** (`generated-docs/callgraph.js`):
    - 役割: グラフの表示範囲を、すべてのコンテンツが収まるように調整します。
    - 引数: なし。
    - 戻り値: なし。
- **`toggleNodeLabels()`** (`generated-docs/callgraph.js`):
    - 役割: グラフノードのラベルの表示/非表示を切り替えます。
    - 引数: なし。
    - 戻り値: なし。
- **`toggleCalleeLocationFilter()`** (`generated-docs/callgraph.js`):
    - 役割: 呼び出し元/呼び出し先の位置によるフィルターのオン/オフを切り替えます。
    - 引数: なし。
    - 戻り値: なし。
- **`hex(ch)`** (`src/grammar.js`):
    - 役割: 16進数文字を処理します。Peggyパーサーの内部処理で利用されます。
    - 引数: `ch` (string) - 16進数文字。
    - 戻り値: (string)。
- **`unicodeEscape(ch)`** (`src/grammar.js`):
    - 役割: Unicodeエスケープシーケンスを処理します。Peggyパーサーの内部処理で利用されます。
    - 引数: `ch` (string) - Unicodeエスケープ文字。
    - 戻り値: (string)。
- **`literalEscape(ch)`** (`src/grammar.js`):
    - 役割: リテラルエスケープシーケンスを処理します。Peggyパーサーの内部処理で利用されます。
    - 引数: `ch` (string) - リテラルエスケープ文字。
    - 戻り値: (string)。
- **`classEscape(ch)`** (`src/grammar.js`):
    - 役割: 文字クラスエスケープシーケンスを処理します。Peggyパーサーの内部処理で利用されます。
    - 引数: `ch` (string) - 文字クラスエスケープ文字。
    - 戻り値: (string)。
- **`describeExpectation(e)`** (`src/grammar.js`):
    - 役割: パーサーが期待する次の入力について説明を生成します。
    - 引数: `e` (object) - 期待値オブジェクト。
    - 戻り値: (string) - 説明文字列。
- **`describeExpected(expected)`** (`src/grammar.js`):
    - 役割: 期待される複数の入力について説明を生成します。
    - 引数: `expected` (Array<object>) - 期待値オブジェクトの配列。
    - 戻り値: (string) - 説明文字列。
- **`describeFound(found)`** (`src/grammar.js`):
    - 役割: パース中に見つかったが期待されなかった入力について説明を生成します。
    - 引数: `found` (string|null) - 見つかった入力文字列、またはnull。
    - 戻り値: (string) - 説明文字列。
- **`peg$parse(input, options)`** (`src/grammar.js`):
    - 役割: Peggyパーサーのメインエントリポイント。指定されたMML入力文字列を解析します。
    - 引数: `input` (string) - 解析するMML文字列, `options` (object) - 解析オプション。
    - 戻り値: (object) - 解析結果のAST (抽象構文木)。
- **`peg$f0(ch)`** (`src/grammar.js`):
    - 役割: Peggyパーサー内部で生成される無名関数（ファクトリー関数）。特定の文法ルールに関連します。
    - 引数: `ch` (string) - 文字。
    - 戻り値: (string)。
- **`text()`** (`src/grammar.js`):
    - 役割: 現在パース中の入力文字列のテキストを取得します。
    - 引数: なし。
    - 戻り値: (string) - テキスト。
- **`offset()`** (`src/grammar.js`):
    - 役割: 現在のパース位置のオフセットを取得します。
    - 引数: なし。
    - 戻り値: (number) - オフセット値。
- **`range()`** (`src/grammar.js`):
    - 役割: 現在パース中の範囲（開始と終了オフセット）を取得します。
    - 引数: なし。
    - 戻り値: (Array<number>) - [開始オフセット, 終了オフセット]。
- **`location()`** (`src/grammar.js`):
    - 役割: 現在のパース位置の行、列、オフセット情報を取得します。
    - 引数: なし。
    - 戻り値: (object) - 位置情報。
- **`expected(expected)`** (`src/grammar.js`):
    - 役割: パーシングエラー発生時に期待された入力のリストを生成します。
    - 引数: `expected` (Array<object>) - 期待値の配列。
    - 戻り値: (Array<object>) - 期待値オブジェクトの配列。
- **`peg$getUnicode(codePoint)`** (`src/grammar.js`):
    - 役割: 指定されたコードポイントのUnicode文字を取得します。
    - 引数: `codePoint` (number) - Unicodeコードポイント。
    - 戻り値: (string) - 対応する文字。
- **`peg$literalExpectation(text, ignoreCase)`** (`src/grammar.js`):
    - 役割: リテラル文字列の期待値を生成します。
    - 引数: `text` (string) - 期待されるリテラル, `ignoreCase` (boolean) - 大文字小文字を無視するか。
    - 戻り値: (object) - 期待値オブジェクト。
- **`peg$classExpectation(parts, inverted, ignoreCase)`** (`src/grammar.js`):
    - 役割: 文字クラスの期待値を生成します。
    - 引数: `parts` (Array<string>) - 文字クラスの構成要素, `inverted` (boolean) - 反転するか, `ignoreCase` (boolean) - 大文字小文字を無視するか。
    - 戻り値: (object) - 期待値オブジェクト。
- **`peg$anyExpectation()`** (`src/grammar.js`):
    - 役割: 任意の文字の期待値を生成します。
    - 引数: なし。
    - 戻り値: (object) - 期待値オブジェクト。
- **`peg$endExpectation()`** (`src/grammar.js`):
    - 役割: 入力終了の期待値を生成します。
    - 引数: なし。
    - 戻り値: (object) - 期待値オブジェクト。
- **`peg$otherExpectation(description)`** (`src/grammar.js`):
    - 役割: その他のタイプの期待値を生成します。
    - 引数: `description` (string) - 説明。
    - 戻り値: (object) - 期待値オブジェクト。
- **`peg$computePosDetails(pos)`** (`src/grammar.js`):
    - 役割: 指定されたオフセット位置から行、列、オフセットの詳細を計算します。
    - 引数: `pos` (number) - オフセット。
    - 戻り値: (object) - 位置詳細オブジェクト。
- **`peg$computeLocation(startPos, endPos)`** (`src/grammar.js`):
    - 役割: 開始位置と終了位置から、パースされた範囲のロケーション情報を計算します。
    - 引数: `startPos` (number) - 開始オフセット, `endPos` (number) - 終了オフセット。
    - 戻り値: (object) - ロケーション情報。
- **`peg$fail(expected)`** (`src/grammar.js`):
    - 役割: パーシング失敗時のエラー処理を行います。
    - 引数: `expected` (Array<object>) - 期待値の配列。
    - 戻り値: なし (エラーをスロー)。
- **`peg$buildSimpleError(message, expected, location)`** (`src/grammar.js`):
    - 役割: シンプルなパーシングエラーオブジェクトを構築します。
    - 引数: `message` (string) - エラーメッセージ, `expected` (Array<object>) - 期待値, `location` (object) - 位置情報。
    - 戻り値: (Error) - エラーオブジェクト。
- **`peg$buildStructuredError(message, expected, location)`** (`src/grammar.js`):
    - 役割: 構造化されたパーシングエラーオブジェクトを構築します。
    - 引数: `message` (string) - エラーメッセージ, `expected` (Array<object>) - 期待値, `location` (object) - 位置情報。
    - 戻り値: (Error) - エラーオブジェクト。
- **`peg$parsestart()`** (`src/grammar.js`):
    - 役割: MML文法における「start」ルールを解析します。パーサーのエントリーポイントの一つ。
    - 引数: なし。
    - 戻り値: (object) - 解析結果。
- **`peg$parsenote()`** (`src/grammar.js`):
    - 役割: MML文法における「note」ルール（音符）を解析します。
    - 引数: なし。
    - 戻り値: (object) - 解析結果。
- **`peg$throw(error)`** (`src/grammar.js`):
    - 役割: 指定されたエラーをスローします。
    - 引数: `error` (Error) - スローするエラーオブジェクト。
    - 戻り値: なし。
- **`format(message, ...args)`** (`src/grammar.js`):
    - 役割: フォーマット文字列と引数を使用してメッセージを生成します。
    - 引数: `message` (string) - フォーマット文字列, `...args` (any) - フォーマット引数。
    - 戻り値: (string) - フォーマットされた文字列。
- **`buildMessage(expected, found)`** (`src/grammar.js`):
    - 役割: パーシングエラーメッセージの核心部分を構築します。
    - 引数: `expected` (Array<object>) - 期待される入力, `found` (string|null) - 見つかった入力。
    - 戻り値: (string) - 構築されたメッセージ。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
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
```

---
Generated at: 2025-08-08 07:04:01 JST
