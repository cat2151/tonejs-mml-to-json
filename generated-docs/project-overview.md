Last updated: 2025-10-08

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の音楽データを解析し、Tone.jsのJSONシーケンサーフォーマットに変換します。
- 変換されたJSONデータは、Web Audio APIライブラリTone.jsを介してブラウザ上で音楽再生が可能です。
- 開発支援として、関数呼び出し階層の自動可視化やGitHub Actionsによる自動翻訳、AI要約などの自動化ツールも備えています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤー
- 音楽・オーディオ:
  - Tone.js - Web Audio API音声ライブラリ
  - Web Audio API - ブラウザ音声技術（Tone.js経由）
  - Tone.js CDN - unpkg経由でのライブラリ配信
  - MML (Music Macro Language) - 音楽記法パーサー
- 開発ツール:
  - Node.js runtime - JavaScript実行環境
  - npm scripts - タスクランナー (5個のスクリプト)
  - pnpm - 高速で効率的なパッケージマネージャー
  - Google Generative AI - AI文書生成サポート
  - @octokit/rest - GitHub API連携
- テスト:
  - Vitest - 高速なViteベースのテストフレームワーク
  - TDD (Test-Driven Development) - テスト駆動開発手法
- ビルドツール:
  - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター
  - PEG文法定義 - MML音楽記法のパーサー生成
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステム
- 自動化・CI/CD:
  - GitHub Actions - CI/CD自動化 (4個のワークフロー)
  - プロジェクト要約自動生成
  - Issue自動管理
  - README多言語翻訳
  - i18n automation - 自動翻訳ワークフロー
- 開発標準: EditorConfig - コード統一ルール

## ファイル階層ツリー
```
📄 .editorconfig
📁 .github_automation/
  📁 callgraph/
    📁 config/
      📊 my.json
📄 .gitignore
📄 LICENSE
📖 README.ja.md
📖 README.md
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
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
-   `.editorconfig`: 異なるIDEやエディタを使用する開発者間で、コードのインデント、改行コードなどの書式設定を一貫させるための設定ファイルです。
-   `.github_automation/callgraph/config/my.json`: GitHub Actionsで生成される関数呼び出しグラフのカスタム設定を定義するファイルです。
-   `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリのパターンを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
-   `LICENSE`: プロジェクトが準拠するライセンス情報が記述されています。
-   `README.ja.md`, `README.md`: プロジェクトの概要、使い方、機能、開発方法などを説明する多言語（日本語、英語）の主要なドキュメントファイルです。
-   `dev-setup/README.md`: 開発環境のセットアップ手順や必要なツールについて説明するドキュメントです。
-   `dev-setup/setup.js`: 開発環境の初期設定や依存関係のインストールなどを自動化するためのJavaScriptスクリプトです。
-   `generated-docs/callgraph-enhanced.html`: プロジェクト内のJavaScript関数の呼び出し関係を視覚的に表現した、拡張機能付きのHTMLドキュメントです。
-   `generated-docs/callgraph.html`: プロジェクト内のJavaScript関数の呼び出し関係を視覚的に表現したHTMLドキュメントです。
-   `generated-docs/callgraph.js`: `callgraph.html`や`callgraph-enhanced.html`でグラフの動的な表示、操作、情報パネルの管理、レイアウト変更などを行うJavaScriptロジックが含まれています。
-   `generated-docs/style.css`: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルを定義するCSSファイルです。
-   `index.html`: プロジェクトのライブデモやメインのWebアプリケーションへのエントリポイントとなるHTMLファイルです。ユーザーがMMLを入力し、結果を試すことができます。
-   `issue-notes/*.md`: GitHub Issuesに関連する開発メモや詳細情報がMarkdown形式で保存されているファイル群です。
-   `package.json`: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、および開発・実行時の依存パッケージが定義されているファイルです。
-   `pnpm-lock.yaml`: pnpmパッケージマネージャーが生成するロックファイルで、プロジェクトの依存関係ツリーの正確なバージョンとハッシュが記録され、再現可能なビルドを保証します。
-   `src/grammar.js`: `src/grammar.pegjs`で定義されたMML構文からPeggyパーサージェネレーターによって生成されたJavaScriptコードです。MML文字列を解析する機能を提供します。
-   `src/grammar.pegjs`: Music Macro Language (MML) の構文規則を記述したPEG (Parsing Expression Grammar) 形式のファイルです。この定義に基づいてパーサーが生成されます。
-   `src/index.html`: `src`ディレクトリ内でMMLからTone.js JSONへの変換と音楽再生のデモを提供するHTMLファイルです。
-   `src/main.js`: プロジェクトの主要な処理を調整するメインのJavaScriptファイルです。
-   `src/mml2json.js`: MML文字列を解析し、Tone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックを実装したJavaScriptファイルです。音符の長さ、開始時刻、繰り返しなどを計算します。
-   `src/play.js`: `mml2json.js`で変換されたTone.js JSONデータを実際にWeb Audio APIとTone.jsライブラリを使用して再生する機能を提供するJavaScriptファイルです。
-   `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの正確性と機能性を検証するためのテストコードです。Vitestフレームワークを使用しています。
-   `vitest.config.js`: Vitestテストフレームワークのプロジェクト固有の設定が記述されているファイルです。

## 関数詳細説明
-   `catch` (dev-setup/setup.js): エラーを捕捉し、指定されたエラーハンドリングロジックを実行するために使用される汎用的なエラーハンドリング関数です。
-   `escapeHtml` (generated-docs/callgraph.js): 文字列内のHTML特殊文字をエスケープし、XSS攻撃を防ぎながら安全にHTMLコンテンツとして表示できるようにする関数です。
-   `getLayoutConfig` (generated-docs/callgraph.js): 関数呼び出しグラフの描画に使用されるレイアウト設定オブジェクトを取得する関数です。
-   `placeCentralNode` (generated-docs/callgraph.js): グラフの中心となるノードを特定し、その配置を調整する関数です。
-   `showNodeInfo` (generated-docs/callgraph.js): グラフ上で選択されたノード（関数）に関する詳細情報をパネルに表示する関数です。
-   `showEdgeInfo` (generated-docs/callgraph.js): グラフ上で選択されたエッジ（関数呼び出し関係）に関する詳細情報をパネルに表示する関数です。
-   `hideInfoPanel` (generated-docs/callgraph.js): グラフ情報表示パネルを非表示にする関数です。
-   `showInfoPanel` (generated-docs/callgraph.js): グラフ情報表示パネルを表示する関数です。
-   `toggleInfoPanel` (generated-docs/callgraph.js): グラフ情報表示パネルの表示状態（表示/非表示）を切り替える関数です。
-   `generateGitHubURL` (generated-docs/callgraph.js): グラフノードに関連するソースコードのGitHubリポジトリへのURLを生成する関数です。
-   `resetLayout` (generated-docs/callgraph.js): グラフのノード配置やズームレベルを初期状態にリセットする関数です。
-   `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの移動を監視し、その重なりを解消する処理をカプセル化（ラップ）する関数です。
-   `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): グラフノードの動きを継続的に監視し、他のノードとの重なりを自動的に調整・解消する関数です。
-   `resolveNodeOverlaps` (generated-docs/callgraph.js): グラフ内の複数のノードが重なっている場合に、それらを視覚的に分離するように再配置するアルゴリズムを実行する関数です。
-   `switchLayout` (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウト（例：ツリー型、放射状など）を切り替える関数です。
-   `resetNodeStates` (generated-docs/callgraph.js): グラフ内の全ノードのハイライトや選択状態などの視覚的な状態を初期値にリセットする関数です。
-   `fitToContent` (generated-docs/callgraph.js): グラフ全体が画面に収まるように、ズームレベルや中心位置を自動的に調整する関数です。
-   `toggleNodeLabels` (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数です。
-   `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出し先のファイルパスなどに基づいてノードをフィルタリングする機能のON/OFFを切り替える関数です。
-   `replace` (generated-docs/callgraph.js): 文字列の特定の部分を別の文字列に置換するJavaScriptの標準メソッド、またはそのラッパー関数。
-   `function` (generated-docs/callgraph.js): JavaScriptの関数定義キーワード、または匿名関数として検出されたものです。特定の機能を持つ関数名ではありません。
-   `max` (generated-docs/callgraph.js): 複数の数値の中から最大値を取得するJavaScriptの標準メソッド、またはそのラッパー関数。
-   `on` (generated-docs/callgraph.js): イベントリスナーを要素にアタッチするために使用される関数です。特定のイベント発生時にコールバックを実行します。
-   `if` (generated-docs/callgraph.js): JavaScriptの条件分岐構文キーワードであり、特定の機能を持つ関数名ではありません。
-   `for` (generated-docs/callgraph.js): JavaScriptのループ構文キーワードであり、特定の機能を持つ関数名ではありません。
-   `ready` (generated-docs/callgraph.js): ドキュメントオブジェクトモデル (DOM) が完全にロードされ、スクリプトの実行準備が整ったときに実行されるイベントハンドラを設定する関数です。
-   `addListener` (generated-docs/callgraph.js): オブジェクトにイベントリスナーを追加する汎用的な関数です。
-   `mml2json` (src/mml2json.js): MML文字列を解析し、Tone.jsライブラリで解釈可能なJSON形式のシーケンスデータに変換するプロジェクトのコア関数です。
-   `compileMmlToCommands` (src/mml2json.js): MMLをより扱いやすい内部的なコマンド構造にコンパイルする関数です。
-   `getMmlCommands` (src/mml2json.js): MML文字列から個々の音楽コマンドを抽出し、解析する関数です。
-   `calcAttackToReleaseTicks` (src/mml2json.js): 音符の攻撃開始からリリース終了までのティック数（時間単位）を計算する関数です。
-   `repeat` (src/mml2json.js): 特定の処理を指定された回数だけ繰り返すためのヘルパー関数です。
-   `toInt` (src/mml2json.js): 入力された値を整数型に変換するユーティリティ関数です。
-   `calcDuration` (src/mml2json.js): MMLの記法に基づいて音符の持続時間（デュレーション）を計算する関数です。
-   `calcStartTick` (src/mml2json.js): 音符が開始されるべき絶対的なティック位置を計算する関数です。
-   `increaseStartTick` (src/mml2json.js): 現在のMMLシーケンスの開始ティック値を、次の音符やイベントに合わせて増加させる関数です。
-   `calcLtick` (src/mml2json.js): MMLのLコマンド（音長）に基づいてティック値を計算する関数です。
-   `getNodeId` (src/mml2json.js): ノード（特定の要素やデータ）の一意な識別子を生成または取得する関数です。
-   `sort` (src/mml2json.js): 配列やリストの要素を特定の順序で並べ替えるJavaScriptの標準メソッド、またはそのラッパー関数。
-   `play` (src/play.js): `mml2json.js`で生成されたJSONシーケンスデータを受け取り、Web Audio API (Tone.js) を利用して実際に音楽を再生する関数です。
-   `sub` (src/play.js): 引き算の操作を行う、またはサブ関数/サブルーチンとして使用される汎用的な関数です。
-   `hex` (src/grammar.js): MMLパーサー内部で16進数を処理するために使用される補助関数です。
-   `unicodeEscape` (src/grammar.js): MMLパーサー内部でUnicodeエスケープシーケンスを処理する補助関数です。
-   `literalEscape` (src/grammar.js): MMLパーサー内部でリテラルエスケープシーケンスを処理する補助関数です。
-   `classEscape` (src/grammar.js): MMLパーサー内部で文字クラスエスケープシーケンスを処理する補助関数です。
-   `describeExpectation` (src/grammar.js): パーサーが特定の入力に対して何を期待しているかを記述する内部関数です。
-   `describeExpected` (src/grammar.js): パーサーが現在位置で期待する構文要素を記述する内部関数です。
-   `describeFound` (src/grammar.js): パーサーが入力から実際に検出した構文要素を記述する内部関数です。
-   `peg$parse` (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイント関数です。与えられたMML文字列を解析し、構文木または結果データを生成します。
-   `peg$f0` (src/grammar.js): Peggyパーサーによって生成される内部的なヘルパー関数で、特定の構文ルールに関連する処理を実行します。
-   `text` (src/grammar.js): パーサーが現在処理しているテキストの一部を取得する内部関数です。
-   `offset` (src/grammar.js): パーサーが現在処理している入力文字列のオフセット（位置）を取得する内部関数です。
-   `range` (src/grammar.js): パーサーが解析したテキストの開始と終了のオフセット範囲を取得する内部関数です。
-   `location` (src/grammar.js): 現在の解析位置（行、列、オフセット）に関する詳細情報を提供する内部関数です。
-   `expected` (src/grammar.js): パーサーが特定の解析段階で期待している入力パターンを記録・管理する内部プロパティまたは関数です。
-   `error` (src/grammar.js): MML解析中に構文エラーが検出された際に、エラーオブジェクトを生成または報告する関数です。
-   `peg$getUnicode` (src/grammar.js): パーサーがUnicode文字を適切に処理するために使用する内部補助関数です。
-   `peg$literalExpectation` (src/grammar.js): 特定のリテラル文字列の期待値オブジェクトを生成するパーサー内部関数です。
-   `peg$classExpectation` (src/grammar.js): 文字クラス（例: `[a-z]`）の期待値オブジェクトを生成するパーサー内部関数です。
-   `peg$anyExpectation` (src/grammar.js): 任意の文字の期待値オブジェクトを生成するパーサー内部関数です。
-   `peg$endExpectation` (src/grammar.js): 入力文字列の終端に対する期待値オブジェクトを生成するパーサー内部関数です。
-   `peg$otherExpectation` (src/grammar.js): 特定のリテラルやクラスに属さない、その他の一般的な期待値オブジェクトを生成するパーサー内部関数です。
-   `peg$computePosDetails` (src/grammar.js): 入力文字列内の特定の位置に関する詳細（行、列、オフセット）を計算する内部関数です。
-   `peg$computeLocation` (src/grammar.js): 解析された構文要素の開始と終了の位置情報（行、列、オフセット）を計算する内部関数です。
-   `peg$fail` (src/grammar.js): パーサーが特定のルールにマッチしなかった場合に、その失敗を記録し処理する内部関数です。
-   `peg$buildSimpleError` (src/grammar.js): 簡潔な形式のエラーメッセージを構築するパーサー内部関数です。
-   `peg$buildStructuredError` (src/grammar.js): より詳細で構造化されたエラーメッセージ（期待されるもの、発見されたものなど）を構築するパーサー内部関数です。
-   `peg$parsestart` (src/grammar.js): MML文法の`start`ルールに対応する解析ロジックを実行するパーサー内部関数です。
-   `peg$parsenote` (src/grammar.js): MML文法の`note`ルールに対応する解析ロジックを実行するパーサー内部関数です。
-   `peg$throw` (src/grammar.js): 検出された解析エラーを実際にスローする内部関数です。
-   `constructor` (src/grammar.js): オブジェクトのインスタンスを初期化するためのコンストラクタ関数です。
-   `format` (src/grammar.js): データを特定の形式に整形したり、メッセージを組み立てたりする汎用的な関数です。
-   `buildMessage` (src/grammar.js): エラーやログなどのメッセージ文字列を組み立てる関数です。
-   `literal` (src/grammar.js): リテラル値（固定の文字列や数値）に関連する処理を行う関数です。
-   `class` (src/grammar.js): 文字クラス（正規表現など）に関連する処理を行う関数です。
-   `any` (src/grammar.js): 任意の文字や値に関連する処理を行う関数です。
-   `end` (src/grammar.js): 処理やシーケンスの終了条件に関連する処理を行う関数です。
-   `other` (src/grammar.js): 特定のカテゴリに属さない、その他の一般的な処理を行う関数です。
-   `switch` (generated-docs/callgraph.js, src/mml2json.js): JavaScriptの条件分岐構文キーワードであり、特定の機能を持つ関数名ではありません。
-   `for` (generated-docs/callgraph.js, src/mml2json.js): JavaScriptのループ構文キーワードであり、特定の機能を持つ関数名ではありません。
-   `start` (src/grammar.pegjs): MML文法定義の開始ルールです。通常、パーサーのトップレベルのエントリポイントとなります。
-   `note` (src/grammar.pegjs): MML文法定義で音符の構文を定義するルールです。
-   `while` (src/grammar.js): JavaScriptのループ構文キーワードであり、特定の機能を持つ関数名ではありません。

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
Generated at: 2025-10-08 07:06:18 JST
