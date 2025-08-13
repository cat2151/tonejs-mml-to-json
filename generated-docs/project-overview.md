Last updated: 2025-08-14

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサー形式に変換するコンバーターです。
- Web Audio APIとTone.jsを活用し、ブラウザ上でMMLベースの音楽再生を可能にします。
- Peggyによるパーサー自動生成やGitHub ActionsによるCI/CDを統合し、効率的な開発と多機能な音楽処理を実現します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのインターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの音声合成やシーケンス処理を容易にするJavaScriptライブラリ。Tone.js CDNを通じてライブラリが配信され、MML (Music Macro Language) は音楽記法パーサーとして機能し、Web Audio APIがブラウザの音声技術の基盤となります。
- 開発ツール: Node.js runtime - JavaScript実行環境として利用。npm scripts - 5つのタスクスクリプトを定義し、各種開発タスクを自動化。pnpm - 高速で効率的なパッケージマネージャー。Google Generative AI - ドキュメント生成をAIで支援。@octokit/rest - GitHub APIとの連携に利用。
- テスト: Vitest - 高速なViteベースのテストフレームワーク。TDD (Test-Driven Development) - テスト駆動開発手法を採用し、品質を保証します。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーター。MML音楽記法のパーサー生成に用いられるPEG文法定義がプロジェクトのコア機能です。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、コードの構造化と再利用性を高めます。
- 自動化・CI/CD: GitHub Actions - 4つのワークフローが定義されており、CI/CDを自動化します。具体的には、プロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、i18n automation（自動翻訳）などが含まれます。
- 開発標準: EditorConfig - コードの統一ルールを定義し、複数人での開発におけるコードスタイルの一貫性を保ちます。

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
-   **dev-setup/setup.js** (146行, 3586バイト): 開発環境のセットアップやテスト実行のためのスクリプトが含まれます。Vitestなどのテストツールとの連携やエラーハンドリング (`catch` 関数) のロジックを持ちます。
-   **generated-docs/callgraph-enhanced.html** (778行, 23298バイト): プロジェクト内の関数呼び出し関係を視覚的に表現するためのHTMLファイルです。インタラクティブなグラフ表示を提供し、コードの構造理解を助けます。
-   **generated-docs/callgraph.js** (527行, 17906バイト): `callgraph-enhanced.html`と連携し、関数呼び出しグラフのレンダリングと操作ロジックを提供するJavaScriptファイルです。ノードの配置、情報パネルの表示/非表示、レイアウト調整、GitHub URL生成など、多岐にわたるユーティリティ関数を含みます。
-   **generated-docs/style.css** (276行, 5034バイト): `generated-docs`ディレクトリ内のHTMLドキュメント、特に呼び出しグラフの視覚スタイルを定義するCSSファイルです。
-   **index.html** (12行, 266バイト): プロジェクトのトップレベルのHTMLファイルです。おそらくデモページやメインアプリケーションのエントリポイントとして機能します。
-   **src/grammar.js** (414行, 10439バイト): `src/grammar.pegjs`で定義されたPEG文法に基づいてPeggyによって生成されたMMLパーサーの実装ファイルです。MML文字列を解析し、内部的な抽象構文木（AST）に変換するコアロジックを含みます。
-   **src/grammar.pegjs** (8行, 108バイト): MML (Music Macro Language) の構文ルールをPEG (Parsing Expression Grammar) 形式で定義するファイルです。この定義を基に`src/grammar.js`が自動生成されます。
-   **src/index.html** (15行, 454バイト): `src`ディレクトリ内にあるHTMLファイルで、MMLプレイヤーのユーザーインターフェースを提供します。MML入力、再生コントロールなどの要素が含まれます。
-   **src/main.js** (19行, 545バイト): `src/index.html`からロードされ、MMLの入力処理や`mml2json.js`、`play.js`との連携を制御するメインスクリプトです。
-   **src/mml2json.js** (157行, 4296バイト): MMLパーサー（`src/grammar.js`）によって解析されたMMLのASTを、Tone.jsのJSONシーケンサーフォーマットに変換する中心的なロジックを実装しています。MMLコマンドのコンパイル、音符の持続時間や開始時刻の計算、繰り返し処理などを担当します。
-   **src/play.js** (56行, 1535バイト): `mml2json.js`で生成されたTone.js JSONシーケンスデータを受け取り、Tone.jsライブラリを用いて実際にブラウザで音楽を再生する機能を提供します。再生開始、停止、エラー処理ロジックなどが含まれます。
-   **test/parser.test.js** (11行, 275バイト): `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストケースをVitestフレームワークで記述したファイルです。
-   **vitest.config.js** (9行, 138バイト): Vitestテストフレームワークのプロジェクト固有の設定を定義するファイルです。

## 関数詳細説明
-   **catch** (dev-setup/setup.js): エラーハンドリングのための一般的な関数です。通常、try-catchブロック内で例外を捕捉し、適切なエラー処理を実行します。
-   **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字を安全なエンティティに変換し、XSS攻撃などを防ぐためにHTML文字列をエスケープする関数です。
-   **getLayoutConfig** (generated-docs/callgraph.js): 呼び出しグラフの描画に使用されるレイアウト設定オブジェクトを取得します。グラフの視覚的な配置を決定するパラメータを返します。
-   **placeCentralNode** (generated-docs/callgraph.js): 呼び出しグラフにおいて、特定のノード（関数）を中央に配置する関数です。
-   **showNodeInfo** (generated-docs/callgraph.js): グラフ内の特定のノード（関数）が選択された際に、その関数の詳細情報（名前、ファイルパスなど）を表示するパネルを更新する関数です。
-   **showEdgeInfo** (generated-docs/callgraph.js): グラフ内の特定のエッジ（関数間の呼び出し関係）が選択された際に、その呼び出しに関する詳細情報を表示するパネルを更新する関数です。
-   **hideInfoPanel** (generated-docs/callgraph.js): グラフ情報表示パネルを非表示にする関数です。
-   **showInfoPanel** (generated-docs/callgraph.js): グラフ情報表示パネルを表示する関数です。
-   **toggleInfoPanel** (generated-docs/callgraph.js): グラフ情報表示パネルの表示/非表示を切り替える関数です。
-   **generateGitHubURL** (generated-docs/callgraph.js): 関連するGitHubリポジトリやファイルのURLを生成するユーティリティ関数です。
-   **resetLayout** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
-   **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを自動的に解消するロジックをラップする関数です。
-   **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): 呼び出しグラフ内のノードが移動した際に、他のノードとの重なりを検出し、視覚的な衝突を修正する関数です。
-   **resolveNodeOverlaps** (generated-docs/callgraph.js): 呼び出しグラフ内のノード間の重なりを数学的に計算し、それらを解消するようにノードの位置を調整する関数です。
-   **switchLayout** (generated-docs/callgraph.js): 呼び出しグラフの異なるレイアウトアルゴリズム（例: 力学ベース、階層ベースなど）を切り替える関数です。
-   **resetNodeStates** (generated-docs/callgraph.js): グラフ内のすべてのノードの視覚的な状態（例: 選択、ハイライト）をデフォルトにリセットする関数です。
-   **fitToContent** (generated-docs/callgraph.js): グラフ全体がビューポート内に収まるようにズームレベルとパン位置を調整する関数です。
-   **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数です。
-   **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先の位置に基づいて、グラフ表示をフィルタリングする機能を有効/無効にする関数です。
-   **replace** (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する汎用的な関数です。
-   **function** (generated-docs/callgraph.js): JavaScriptの一般的な関数定義を示します。具体的な機能は文脈依存ですが、通常はコールバック関数やユーティリティ関数として使用されます。
-   **max** (generated-docs/callgraph.js): 複数の数値の中から最大値を返す汎用的な関数です。
-   **on** (generated-docs/callgraph.js): イベントリスナーを登録するための一般的な関数です。特定のイベントが発生した際にコールバック関数を実行します。
-   **if** (generated-docs/callgraph.js, src/mml2json.js, src/play.js): 条件分岐ロジックを実行する言語構造を示します。与えられた条件が真である場合に特定のコードブロックを実行します。
-   **for** (generated-docs/callgraph.js): ループ処理を実行する言語構造を示します。指定された回数、または条件が満たされるまでコードブロックを繰り返し実行します。
-   **ready** (generated-docs/callgraph.js): DOM (Document Object Model) が完全にロードされ、操作可能になったときに実行されるコールバック関数を登録するための一般的な関数です。
-   **addListener** (generated-docs/callgraph.js): 特定のDOM要素やオブジェクトに対してイベントリスナーを追加する関数です。
-   **switch** (generated-docs/callgraph.js, src/mml2json.js, src/play.js): 複数の条件に基づいて異なるコードブロックを実行する条件分岐構造です。
-   **hex** (src/grammar.js): 16進数に関連する文字列や数値の変換、解析を行う関数です。MMLパーサー内で数値の解釈に用いられます。
-   **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンス（例: `\uXXXX`）を処理し、対応する文字に変換する関数です。
-   **literalEscape** (src/grammar.js): リテラルエスケープシーケンス（例: `\n`, `\t`）を処理し、対応する特殊文字に変換する関数です。
-   **classEscape** (src/grammar.js): 文字クラス内のエスケープシーケンスを処理する関数です。
-   **describeExpectation** (src/grammar.js): パーサーが入力ストリームで次に何を期待しているかを記述するユーティリティ関数です。
-   **describeExpected** (src/grammar.js): パーサーが期待する具体的な文字列や文字セットを説明する関数です。
-   **describeFound** (src/grammar.js): パーサーが解析中に実際に見つけたが、期待とは異なる入力について説明する関数です。
-   **peg$parse** (src/grammar.js): Peggyが生成するパーサーのメインエントリポイントです。MML文字列を解析し、結果のASTを返します。
-   **peg$f0** (src/grammar.js): Peggyが生成する内部関数であり、特定の文法ルールに関連するアクション（例: ASTノードの作成）を実行します。
-   **text** (src/grammar.js): パーサーが現在処理している入力テキストの部分を取得する関数です。
-   **offset** (src/grammar.js): パーサーが現在処理している入力ストリーム内のバイトオフセット（位置）を返す関数です。
-   **range** (src/grammar.js): パーサーが現在処理している入力の開始と終了のオフセットを含む範囲オブジェクトを返す関数です。
-   **location** (src/grammar.js): パーサーが現在処理している入力の行番号、列番号などの詳細な位置情報オブジェクトを返す関数です。
-   **expected** (src/grammar.js): パーサーがエラーを報告する際に、期待していたトークンやパターンを格納する内部配列です。
-   **error** (src/grammar.js): パーサーのエラーオブジェクトを生成するユーティリティ関数です。
-   **peg$getUnicode** (src/grammar.js): Unicode文字の処理に関連する内部ユーティリティ関数です。
-   **peg$literalExpectation** (src/grammar.js): 特定のリテラル文字列の期待値オブジェクトを作成する内部関数です。
-   **peg$classExpectation** (src/grammar.js): 特定の文字クラスの期待値オブジェクトを作成する内部関数です。
-   **peg$anyExpectation** (src/grammar.js): 任意の文字の期待値オブジェクトを作成する内部関数です。
-   **peg$endExpectation** (src/grammar.js): 入力の終了を期待する期待値オブジェクトを作成する内部関数です。
-   **peg$otherExpectation** (src/grammar.js): その他の一般的な期待値オブジェクトを作成する内部関数です。
-   **peg$computePosDetails** (src/grammar.js): 入力ストリーム内の位置に関する詳細情報（例: 行の開始オフセット）を計算する内部関数です。
-   **peg$computeLocation** (src/grammar.js): 入力ストリーム内の現在のオフセットから、行と列の情報を計算して返す内部関数です。
-   **peg$fail** (src/grammar.js): パーサーが現在のルールでのマッチングに失敗したことを通知し、バックトラックをトリガーする内部関数です。
-   **peg$buildSimpleError** (src/grammar.js): シンプルな形式のエラーメッセージと位置情報を含むエラーオブジェクトを構築する内部関数です。
-   **peg$buildStructuredError** (src/grammar.js): 期待される入力、実際に見つかった入力、位置情報など、より詳細な情報を含む構造化されたエラーオブジェクトを構築する内部関数です。
-   **peg$parsestart** (src/grammar.js): MMLパーサーの定義における`start`ルールに対応する内部解析関数です。MML文字列全体の解析を開始します。
-   **peg$parsenote** (src/grammar.js): MMLパーサーの定義における`note`ルールに対応する内部解析関数です。個々の音符や休符のセクションを解析します。
-   **peg$throw** (src/grammar.js): パーサー内部でエラーをスローし、解析プロセスを中断させる関数です。
-   **constructor** (src/grammar.js): オブジェクト指向プログラミングにおけるコンストラクタ関数。新しいオブジェクトが作成される際に初期化処理を行います。
-   **format** (src/grammar.js): 文字列の書式設定や整形を行うユーティリティ関数です。
-   **buildMessage** (src/grammar.js): エラーやログなどのメッセージ文字列を構築する関数です。
-   **literal** (src/grammar.js): 文字列リテラルに関する処理を行う関数です。
-   **class** (src/grammar.js): 文字クラス（例: `[a-z]`）に関する処理を行う関数です。
-   **any** (src/grammar.js): 任意の文字や要素に関する処理を行う関数です。
-   **end** (src/grammar.js): 処理の終了に関連する関数です。
-   **other** (src/grammar.js): 上記のカテゴリに分類されない、その他の処理を行う関数です。
-   **for** (src/grammar.js): ループ処理を実行する言語構造を示します。
-   **while** (src/grammar.js): 条件が真である間、繰り返し処理を実行する言語構造を示します。
-   **start** (src/grammar.pegjs): MMLパーサーのPEG文法定義における、解析の開始点となるルールです。
-   **note** (src/grammar.pegjs): MMLパーサーのPEG文法定義における、個々の音符や休符の解析に関連するルールです。
-   **mml2json** (src/mml2json.js): MMLパーサーによって生成されたASTを受け取り、Tone.jsのJSONシーケンサー形式に変換する主要な関数です。MMLから音楽イベントのシーケンスデータを生成します。
-   **compileMmlToCommands** (src/mml2json.js): MMLのASTを、内部で扱いやすいコマンドリスト形式に変換する処理を行います。
-   **getMmlCommands** (src/mml2json.js): MML文字列から直接、あるいはパーサー結果から、実行すべき音楽コマンドのリストを取得する関数です。
-   **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタックからリリースまでの時間（ティック単位）を計算する関数です。
-   **repeat** (src/mml2json.js): MMLの繰り返しコマンドを処理し、指定された回数だけ音楽パターンを複製する関数です。
-   **toInt** (src/mml2json.js): 入力値を整数に変換するユーティリティ関数です。
-   **calcDuration** (src/mml2json.js): MMLの音符の長さ指定に基づいて、その音符の持続時間（ティック単位）を計算する関数です。
-   **calcStartTick** (src/mml2json.js): 各音楽イベントの開始時刻（ティック単位）を計算する関数です。
-   **increaseStartTick** (src/mml2json.js): 現在の開始ティック数を指定された量だけ増加させる関数です。
-   **calcLtick** (src/mml2json.js): MMLのLコマンド（デフォルトの音長）に基づいてティック数を計算する関数です。
-   **getNodeId** (src/mml2json.js): 処理中の音楽イベントやノードに一意のIDを割り当てる関数です。
-   **sort** (src/mml2json.js): 生成された音楽イベントリストを、開始時刻などの基準でソートする関数です。
-   **play** (src/play.js): Tone.jsライブラリを初期化し、変換されたJSONシーケンスデータに基づいて音楽再生を開始する関数です。
-   **sub** (src/play.js): 減算処理や、何らかのサブタスクを実行する汎用的な関数です。

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
Generated at: 2025-08-14 07:03:48 JST
