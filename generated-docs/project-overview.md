Last updated: 2025-07-23

# Project Overview

## プロジェクト概要
- MML形式の楽譜データをWeb Audio APIライブラリTone.jsが利用可能なJSONシーケンサー形式へ変換します。
- ブラウザベースのデモを通じて、変換されたMML音楽の再生と視覚化を提供します。
- GitHub Actionsによる自動化や多言語対応など、効率的な開発と運用をサポートするツールが組み込まれています。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの基盤), Tone.js (Web Audio APIを抽象化した音声ライブラリ), Tone.js CDN (unpkg経由でTone.jsライブラリを提供), Web Audio API (ブラウザで高度な音声処理を行うための標準API、Tone.js経由で利用)。
- 音楽・オーディオ: Tone.js (複雑なオーディオ処理やシーケンスを容易にするライブラリ), MML (Music Macro Language、音楽をテキストで記述するための記法パーサーの対象), Web Audio API (ブラウザでの音の生成、処理、解析の基盤技術)。
- 開発ツール: Node.js runtime (JavaScriptコードの実行環境), npm scripts (様々な開発タスクを実行するためのスクリプト群), pnpm (高速で効率的なパッケージマネージャー), Google Generative AI (AIによる文書生成サポート), @octokit/rest (GitHub APIと連携し、開発プロセスを自動化)。
- テスト: Vitest (Viteを基盤とした高速なテストフレームワーク), TDD (Test-Driven Development、テストを先に書く開発手法)。
- ビルドツール: Peggy (PEG文法定義からパーサーを自動生成するツール), PEG文法定義 (MML音楽記法を解析するための文法ルール)。
- 言語機能: ES Modules (モダンなJavaScriptでモジュールを管理するための標準システム)。
- 自動化・CI/CD: GitHub Actions (継続的インテグレーション/デリバリーを自動化するワークフロー、プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automationなど)。
- 開発標準: EditorConfig (様々なエディタやIDE間でコードスタイルの一貫性を維持するための設定ファイル)。

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
- `.editorconfig`: 異なる開発環境間でのコードスタイルの一貫性を保つための設定ファイルです。
- `.gitignore`: Gitのバージョン管理システムで追跡しないファイルやディレクトリを指定します。
- `LICENSE`: プロジェクトのライセンス情報が記載されており、ソフトウェアの利用条件を定義します。
- `README.ja.md`, `README.md`: プロジェクトの概要、機能、セットアップ方法、使用方法などが記述された主要なドキュメントファイルです。多言語対応（日本語と英語）しています。
- `dev-setup/README.md`: 開発環境のセットアップ手順や関連情報が記載されています。
- `dev-setup/setup.js`: 開発環境を初期設定するためのJavaScriptスクリプトです。
- `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し関係を視覚的に表現するインタラクティブなHTMLドキュメントです。
- `generated-docs/callgraph.js`: `callgraph-enhanced.html`で呼び出しグラフのレンダリングとインタラクションを制御するJavaScriptコードです。
- `generated-docs/development-status.md`: プロジェクトの現在の開発状況や進捗が記述されたドキュメントです。
- `generated-docs/project-overview.md`: 本ドキュメントのようなプロジェクトの全体概要を自動生成する際に使用されるテンプレート、またはその結果が格納されます。
- `generated-docs/style.css`: 生成されたドキュメントや視覚化（呼び出しグラフなど）のスタイルを定義するCSSファイルです。
- `index.html`: プロジェクトのデモやメインアプリケーションの入り口となるHTMLファイルです。
- `package.json`: Node.jsプロジェクトのメタデータ、依存関係、スクリプトなどを定義する設定ファイルです。
- `pnpm-lock.yaml`: `pnpm`パッケージマネージャーによって生成されるロックファイルで、依存関係のバージョンを固定し、プロジェクトの再現性を保証します。
- `src/grammar.js`: `src/grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）を構築します。
- `src/grammar.pegjs`: MMLを解析するためのPEG (Parsing Expression Grammar) 形式の文法定義ファイルです。
- `src/index.html`: `src`ディレクトリ内のデモページやアプリケーションのエントリーポイントとなるHTMLファイルです。
- `src/main.js`: アプリケーションの主要な初期化ロジックやグローバルな処理を含むJavaScriptファイルです。
- `src/mml2json.js`: MMLの解析結果をTone.jsのJSONシーケンサー形式に変換するコアロジックを実装したJavaScriptファイルです。
- `src/play.js`: 生成されたTone.js JSONデータを使用してMML音楽をブラウザ上で再生する機能を提供するJavaScriptファイルです。
- `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードです。
- `vitest.config.js`: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- `catch` (dev-setup/setup.js): 一般的なエラーハンドリングを行うために使用される関数です。
- `escapeHtml` (generated-docs/callgraph.js): HTMLの特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティ脆弱性を防ぎます。
- `getLayoutConfig` (generated-docs/callgraph.js): 呼び出しグラフの描画レイアウトに関する設定を取得します。
- `placeCentralNode` (generated-docs/callgraph.js): 呼び出しグラフにおける中心となるノードの配置を決定します。
- `showNodeInfo` (generated-docs/callgraph.js): 呼び出しグラフ上の特定のノード（関数）に関する詳細情報を表示します。
- `showEdgeInfo` (generated-docs/callgraph.js): 呼び出しグラフ上のエッジ（呼び出し関係）に関する詳細情報を表示します。
- `hideInfoPanel` (generated-docs/callgraph.js): 情報表示パネルを非表示にします。
- `showInfoPanel` (generated-docs/callgraph.js): 情報表示パネルを表示します。
- `toggleInfoPanel` (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替えます。
- `generateGitHubURL` (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成します。
- `resetLayout` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットします。
- `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの移動を監視し、その重なりを修正するロジックをラップする関数です。
- `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): グラフのノードが移動した際に、他のノードとの重なりを自動的に調整します。
- `resolveNodeOverlaps` (generated-docs/callgraph.js): グラフ上のノードが重なっている場合に、それらを適切に配置し直して重なりを解消します。
- `switchLayout` (generated-docs/callgraph.js): 呼び出しグラフの表示レイアウト（例: ツリー、ネットワーク）を切り替えます。
- `resetNodeStates` (generated-docs/callgraph.js): 呼び出しグラフ内のノードの強調表示などの状態をリセットします。
- `fitToContent` (generated-docs/callgraph.js): グラフの表示領域をコンテンツ全体が収まるように調整します。
- `toggleNodeLabels` (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替えます。
- `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出し先関数の場所に基づいてフィルタリングを切り替えます。
- `replace` (generated-docs/callgraph.js): 文字列や配列内の要素を置換する一般的な処理を行います。
- `switch` (generated-docs/callgraph.js): 複数の条件分岐を効率的に処理するために使用されます。
- `function` (generated-docs/callgraph.js): 匿名関数や汎用的な関数定義に関連する内部的な処理を示唆します。
- `max` (generated-docs/callgraph.js): 複数の値の中から最大値を決定します。
- `on` (generated-docs/callgraph.js): イベントリスナーを登録し、特定のイベントが発生したときに指定されたコールバック関数を実行します。
- `if` (generated-docs/callgraph.js): 条件が真の場合に特定のコードブロックを実行するために使用されます。
- `for` (generated-docs/callgraph.js): ループ処理を実行し、コレクション内の各要素に対して操作を行います。
- `ready` (generated-docs/callgraph.js): ドキュメントオブジェクトモデル (DOM) が完全に読み込まれ、準備が完了したときに実行される処理を定義します。
- `addListener` (generated-docs/callgraph.js): 特定のイベント（例: クリック、キープレス）が発生したときに実行されるリスナー関数を追加します。
- `hex` (src/grammar.js): 16進数形式のデータを処理するための関数です。
- `unicodeEscape` (src/grammar.js): Unicodeエスケープシーケンスを処理します。
- `literalEscape` (src/grammar.js): リテラル文字列のエスケープ処理を行います。
- `classEscape` (src/grammar.js): 文字クラスのエスケープ処理を行います。
- `describeExpectation` (src/grammar.js): パーサーが期待する入力の形式を説明するメッセージを生成します。
- `describeExpected` (src/grammar.js): パーサーが解析中に期待していた要素の説明を生成します。
- `describeFound` (src/grammar.js): パーサーが期待に反して見つけた要素の説明を生成します。
- `peg$parse` (src/grammar.js): Peggyが生成するパーサーのメインエントリポイントで、入力文字列を解析して構文木を構築します。
- `peg$f0` (src/grammar.js): Peggyによって生成される内部的なヘルパー関数で、特定のパーシングルールに関連します。
- `text` (src/grammar.js): 現在解析中の入力文字列のテキスト部分を取得します。
- `offset` (src/grammar.js): 現在の解析位置のオフセット（文字数）を取得します。
- `range` (src/grammar.js): 現在の解析範囲（開始オフセットと終了オフセット）を取得します。
- `location` (src/grammar.js): 現在の解析位置の行番号と列番号を取得します。
- `expected` (src/grammar.js): パーサーが期待していたトークンやパターンを示します。
- `error` (src/grammar.js): 解析エラーオブジェクトを生成または処理します。
- `peg$getUnicode` (src/grammar.js): Unicode文字を取得するPeggyパーサーの内部関数です。
- `peg$literalExpectation` (src/grammar.js): Peggyパーサーがリテラル文字列を期待する際の内部処理です。
- `peg$classExpectation` (src/grammar.js): Peggyパーサーが文字クラスを期待する際の内部処理です。
- `peg$anyExpectation` (src/grammar.js): Peggyパーサーが任意の文字を期待する際の内部処理です。
- `peg$endExpectation` (src/grammar.js): Peggyパーサーが入力の終端を期待する際の内部処理です。
- `peg$otherExpectation` (src/grammar.js): Peggyパーサーがその他の特定のパターンを期待する際の内部処理です。
- `peg$computePosDetails` (src/grammar.js): 解析位置の詳細情報（行、列など）を計算します。
- `peg$computeLocation` (src/grammar.js): 解析位置のロケーション情報を計算します。
- `peg$fail` (src/grammar.js): 解析が失敗した際に呼び出されるPeggyパーサーの内部関数です。
- `peg$buildSimpleError` (src/grammar.js): シンプルなエラーメッセージを構築します。
- `peg$buildStructuredError` (src/grammar.js): 構造化されたエラーメッセージを構築します。
- `peg$parsestart` (src/grammar.js): MML解析の開始ルールを処理するPeggyパーサー関数です。
- `peg$parsenote` (src/grammar.js): MMLの音符部分を解析するPeggyパーサー関数です。
- `peg$throw` (src/grammar.js): 解析中にエラーをスローする内部関数です。
- `constructor` (src/grammar.js): オブジェクトの初期化を行うコンストラクタです。
- `format` (src/grammar.js): 文字列のフォーマットを整形します。
- `buildMessage` (src/grammar.js): エラーや通知のためのメッセージを構築します。
- `literal` (src/grammar.js): リテラル値を処理します。
- `class` (src/grammar.js): 文字クラスを処理します。
- `any` (src/grammar.js): 任意の要素を処理します。
- `end` (src/grammar.js): 処理の終了条件を管理します。
- `other` (src/grammar.js): 特定のカテゴリに属さないその他の要素を処理します。
- `mml2json` (src/mml2json.js): MMLの解析結果をTone.jsのJSONシーケンサー形式に変換する主要な関数です。
- `compileMmlToCommands` (src/mml2json.js): MMLを内部的なコマンドリストにコンパイルします。
- `getMmlCommands` (src/mml2json.js): MMLから抽出されたコマンドを取得します。
- `calcAttackToReleaseTicks` (src/mml2json.js): 音符のアタックからリリースまでのティック数を計算します。
- `repeat` (src/mml2json.js): 特定の処理を指定された回数だけ繰り返します。
- `toInt` (src/mml2json.js): 入力値を整数に変換します。
- `calcDuration` (src/mml2json.js): 音符の持続時間（デュレーション）を計算します。
- `calcStartTick` (src/mml2json.js): 音符の開始ティック（時間的な位置）を計算します。
- `increaseStartTick` (src/mml2json.js): 開始ティック値を増加させます。
- `calcLtick` (src/mml2json.js): 音符の長さに関連するティック値を計算します。
- `getNodeId` (src/mml2json.js): 内部的なノード（データ構造）の識別子を取得します。
- `sort` (src/mml2json.js): データ配列を特定の基準でソートします。
- `play` (src/play.js): 変換されたTone.js JSONデータを使用してMML音楽をブラウザで再生する機能をトリガーします。
- `sub` (src/play.js): `play`関数内の補助的な処理、または内部的に呼び出されるユーティリティ関数です。
- `start` (src/grammar.pegjs): MMLの解析を開始するためのエントリポイントとなるPeggy文法ルールです。
- `note` (src/grammar.pegjs): MML文法における音符の解析ルールを定義します。

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
Generated at: 2025-07-23 07:03:48 JST
