Last updated: 2025-08-10

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の音楽データを解析するパーサーを生成します。
- 解析されたMMLデータを、Web Audio APIライブラリTone.jsが利用できるJSONシーケンサー形式に変換します。
- ブラウザ上でMMLベースの音楽を再生するためのデモと、開発支援ツール、CI/CDワークフローを提供します。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの基盤)
- 音楽・オーディオ: Tone.js (Web Audio API音声ライブラリ), Tone.js CDN (unpkg経由でのライブラリ配信), MML (Music Macro Language - 音楽記法パーサーの対象), Web Audio API (ブラウザ音声技術、Tone.js経由で利用)
- 開発ツール: Node.js runtime (JavaScript実行環境), npm scripts (タスクランナー、5個のスクリプト), pnpm (高速で効率的なパッケージマネージャー), Google Generative AI (AI文書生成サポート), @octokit/rest (GitHub API連携)
- テスト: Vitest (高速なViteベースのテストフレームワーク), TDD (Test-Driven Development - テスト駆動開発手法)
- ビルドツール: Peggy (PEG (Parsing Expression Grammar) パーサージェネレーター), PEG文法定義 (MML音楽記法のパーサー生成に利用)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステム)
- 自動化・CI/CD: GitHub Actions (CI/CD自動化、4個のワークフロー: プロジェクト要約自動生成, Issue自動管理, README多言語翻訳, i18n automation (自動翻訳ワークフロー))
- 開発標準: EditorConfig (コード統一ルール)

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
- **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル。
- **.gitignore**: Gitがバージョン管理の対象から除外すべきファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイル。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明する主要なドキュメントファイル。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語で説明する主要なドキュメントファイル。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記述されたディレクトリ内のREADMEファイル。
- **dev-setup/setup.js**: 開発環境のセットアップやユーティリティ機能を提供するJavaScriptスクリプト。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表現し、インタラクティブに操作できる機能を持つHTMLファイル。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画、レイアウト、情報の表示、ノード操作などのロジックを提供するJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗が記述されたドキュメント。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメント。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメント（特に呼び出しグラフ）のスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのウェブデモやエントリーポイントとなるHTMLファイル。
- **issue-notes/*.md**: GitHub Issuesに関連するメモや詳細が個別のMarkdownファイルとして保存されているディレクトリ（開発者向け情報だが、ファイル構造の一部として存在）。
- **package.json**: Node.jsプロジェクトのメタデータ、依存関係、スクリプトなどが定義されたファイル。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する、依存関係ツリーの正確なバージョンとチェックサムを記録したロックファイル。
- **src/grammar.js**: `src/grammar.pegjs`から生成された、MML (Music Macro Language) を解析するためのJavaScriptパーサーの実装。MML文字列を構造化されたデータに変換する。
- **src/grammar.pegjs**: MMLの構文規則を記述したPEG (Parsing Expression Grammar) ファイル。このファイルに基づいて`src/grammar.js`が自動生成される。
- **src/index.html**: `src`ディレクトリ内のデモページまたはアプリケーションのメインビューを提供するHTMLファイル。
- **src/main.js**: アプリケーションのメインロジックや初期化処理を含むJavaScriptファイル。
- **src/mml2json.js**: `src/grammar.js`で解析されたMMLデータを、Tone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックを担うJavaScriptファイル。
- **src/play.js**: Tone.jsを使用して、変換されたJSONシーケンサーデータを実際にウェブブラウザで再生する機能を提供するJavaScriptファイル。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの機能が正しく動作するかを検証するためのテストスイート。Vitestを用いて実行される。
- **vitest.config.js**: Vitestテストフレームワークの挙動を設定するための設定ファイル。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラー発生時に処理を捕捉し、対応を行うための関数。
- **escapeHtml** (generated-docs/callgraph.js): HTMLの特殊文字をエスケープし、安全に表示するための文字列処理関数。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウト設定を取得する。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心となるノードを配置するロジック。
- **showNodeInfo** (generated-docs/callgraph.js): グラフ内のノード（関数）に関する詳細情報を表示する。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフ内のエッジ（呼び出し関係）に関する詳細情報を表示する。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを非表示にする。
- **showInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを表示する。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替える。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを修正する処理のラッパー。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを解決する主要ロジック。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): グラフ内のノード間の重なりを解消し、見やすい配置に調整する。
- **switchLayout** (generated-docs/callgraph.js): グラフのレイアウト方式を切り替える。
- **resetNodeStates** (generated-docs/callgraph.js): グラフ内のノードの状態（選択、ハイライトなど）をリセットする。
- **fitToContent** (generated-docs/callgraph.js): グラフ表示領域をコンテンツ全体にフィットさせる。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードのラベル（関数名など）の表示/非表示を切り替える。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先のファイル位置に基づいて表示をフィルタリングする機能を切り替える。
- **replace** (generated-docs/callgraph.js): 文字列内の特定のパターンを置換する汎用関数。
- **switch** (generated-docs/callgraph.js): 複数のケースに基づいて処理を分岐させる制御構造。
- **function** (generated-docs/callgraph.js): 無名関数または他の関数に渡されるコールバックとしてのプレースホルダー。
- **max** (generated-docs/callgraph.js): 複数の値の中から最大値を取得する。
- **on** (generated-docs/callgraph.js): イベントリスナーを登録する。
- **if** (generated-docs/callgraph.js): 条件に基づいて処理を分岐させる制御構造。
- **for** (generated-docs/callgraph.js): ループ処理を実行する制御構造。
- **ready** (generated-docs/callgraph.js): DOMが完全にロードされた際に実行されるコールバックとして使用される可能性がある。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する。
- **mml2json** (src/mml2json.js): MMLコマンドのリストをTone.jsのJSONシーケンサー形式に変換する主要な関数。
    - 引数: 不明 (通常は解析されたMMLコマンドの配列)
    - 戻り値: Tone.jsシーケンサー形式のJSONオブジェクト
    - 機能: 音楽的な時間計算やイベント生成を行い、Tone.jsが解釈可能な形式に整形する。
- **compileMmlToCommands** (src/mml2json.js): MML文字列を内部的なコマンド表現にコンパイルする関数。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々の音楽コマンドを抽出する関数。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタックからリリースまでのティック数を計算する。
- **repeat** (src/mml2json.js): MMLの繰り返し記号を処理する関数。
- **toInt** (src/mml2json.js): 値を整数に変換する。
- **calcDuration** (src/mml2json.js): 音符のデュレーション（長さ）を計算する。
- **calcStartTick** (src/mml2json.js): 各イベントの開始ティック（時間軸上の位置）を計算する。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増加させる。
- **calcLtick** (src/mml2json.js): Lコマンド（音符の長さのデフォルト値）に関連するティック値を計算する。
- **getNodeId** (src/mml2json.js): ノード識別子を取得する。
- **sort** (src/mml2json.js): 配列やリストをソートする汎用関数。
- **hex** (src/grammar.js): 16進数に関連する処理。パーサー内部で文字コードなどを扱う際に使われる可能性。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理する。
- **literalEscape** (src/grammar.js): リテラル文字列のエスケープ処理。
- **classEscape** (src/grammar.js): 文字クラスのエスケープ処理。
- **describeExpectation** (src/grammar.js): パーサーが期待するパターンを説明する。
- **describeExpected** (src/grammar.js): パーサーが期待したものを記述する。
- **describeFound** (src/grammar.js): パーサーが見つけたものを記述する。
- **peg$parse** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイント。MML文字列を解析し、結果を返す。
    - 引数: `input` (string) - 解析対象のMML文字列
    - 戻り値: 解析結果（通常は抽象構文木や特定のデータ構造）
    - 機能: PEG文法定義に基づき、入力文字列をトークン化し、構文木を構築する。
- **text** (src/grammar.js): 現在解析中のテキスト部分を取得する。
- **offset** (src/grammar.js): 現在の解析オフセット（位置）を取得する。
- **range** (src/grammar.js): 現在の解析範囲を取得する。
- **location** (src/grammar.js): 現在の解析位置情報を取得する。
- **expected** (src/grammar.js): パーサーが現在期待しているトークンやパターン。
- **error** (src/grammar.js): 解析エラーオブジェクトを生成する。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得する内部ヘルパー関数。
- **peg$literalExpectation** (src/grammar.js): リテラル期待値オブジェクトを生成する。
- **peg$classExpectation** (src/grammar.js): 文字クラス期待値オブジェクトを生成する。
- **peg$anyExpectation** (src/grammar.js): 任意の文字期待値オブジェクトを生成する。
- **peg$endExpectation** (src/grammar.js): 入力終了期待値オブジェクトを生成する。
- **peg$otherExpectation** (src/grammar.js): その他の期待値オブジェクトを生成する。
- **peg$computePosDetails** (src/grammar.js): 解析位置の詳細（行、列など）を計算する。
- **peg$computeLocation** (src/grammar.js): 解析位置のロケーションオブジェクトを計算する。
- **peg$fail** (src/grammar.js): 解析失敗の状態を設定する。
- **peg$buildSimpleError** (src/grammar.js): シンプルな解析エラーメッセージを構築する。
- **peg$buildStructuredError** (src/grammar.js): 構造化された解析エラーメッセージを構築する。
- **peg$parsestart** (src/grammar.js): MML全体の開始ルール`start`に対応するパーサー関数。
- **peg$parsenote** (src/grammar.js): MMLの`note`ルールに対応するパーサー関数。
- **peg$throw** (src/grammar.js): パーシングエラーをスローする。
- **constructor** (src/grammar.js): オブジェクトの初期化を行うコンストラクタ。
- **format** (src/grammar.js): 文字列のフォーマットを行う。
- **buildMessage** (src/grammar.js): エラーメッセージを構築する。
- **literal** (src/grammar.js): リテラル値を扱う。
- **class** (src/grammar.js): 文字クラスを扱う。
- **any** (src/grammar.js): 任意の要素を扱う。
- **end** (src/grammar.js): 終了条件を扱う。
- **other** (src/grammar.js): その他の要素を扱う。
- **while** (src/grammar.js): 繰り返し処理を行う。
- **start** (src/grammar.pegjs): MMLのルートとなる構文規則。MML全体をパースするエントリポイント。
- **note** (src/grammar.pegjs): MMLの個々の音符や休符などの音楽イベントを定義する構文規則。
- **play** (src/play.js): Tone.jsを利用して、変換されたMMLのJSONデータを実際に再生する関数。
    - 引数: 不明 (通常はTone.jsシーケンサー形式のJSONデータ)
    - 戻り値: なし
    - 機能: Tone.jsのシーケンサーを初期化し、イベントをスケジュールして音を鳴らす。
- **sub** (src/play.js): 減算処理を行う。
- **vitest/config** (vitest.config.js): Vitestの設定オブジェクトをエクスポートする。

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
Generated at: 2025-08-10 07:03:24 JST
