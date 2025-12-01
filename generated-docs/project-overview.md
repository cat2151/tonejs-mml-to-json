Last updated: 2025-12-02

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

## 技術スタック
- フロントエンド: HTML/CSS/JavaScript (デモページや表示ロジックに使用)
- 音楽・オーディオ: MML (Music Macro Language) と Tone.js JSON Sequencer フォーマット (音楽表現と再生フォーマット)
- 開発ツール:
    - `@google/generative-ai`: AIを活用したドキュメント生成などの開発支援に利用
    - `@octokit/rest`: GitHub APIを介した各種自動化や連携に利用
    - `dotenv`: 環境変数を安全に管理するために利用
- テスト:
    - `vitest`: 高速でモダンなJavaScriptテストフレームワークで、コードの品質と正確性を保証
- ビルドツール:
    - `peggy`: パーサージェネレータで、MMLの文法定義からJavaScriptのパーサーを自動生成
- 言語機能:
    - JavaScript: プロジェクトの主要なプログラミング言語
    - Node.js: 開発環境および一部のスクリプトの実行環境
- 自動化・CI/CD:
    - GitHub Actions: `README.md` の自動翻訳など、CI/CDパイプラインを構築し、開発プロセスを自動化
    - `@octokit/rest`: GitHub Actions内でのGitHub API連携をサポート
- 開発標準:
    - `.editorconfig`: 複数の開発者間でのコードスタイルの一貫性を維持するための設定ファイル

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
📄 _config.yml
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
  📜 callgraph.js
  🎨 style.css
🌐 googled947dc864c270e07.html
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
- **.editorconfig**: 異なるエディタやIDE間でコードスタイル（インデント、改行など）を統一するための設定ファイルです。
- **.github_automation/**: GitHub Actionsなど、GitHub上での自動化処理に関する設定やスクリプトを格納するディレクトリです。
    - **.github_automation/callgraph/config/my.json**: コールグラフ生成ツール用の設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定するファイルです。
- **LICENSE**: プロジェクトのライセンス情報（著作権や利用条件）を記載したファイルです。
- **README.ja.md**: プロジェクトの概要、目的、使い方などを日本語で説明するメインのドキュメントです。
- **README.md**: `README.ja.md` の英語翻訳版です。
- **_config.yml**: GitHub Pagesなどのウェブサイト設定ファイルです。
- **dev-setup/**: 開発環境のセットアップに関連するファイルや手順を格納するディレクトリです。
    - **dev-setup/README.md**: 開発環境のセットアップ方法を説明するドキュメントです。
    - **dev-setup/setup.js**: 開発環境の初期設定や準備を行うJavaScriptスクリプトです。
- **generated-docs/**: プロジェクトから自動生成されたドキュメントやレポートを格納するディレクトリです。
    - **generated-docs/callgraph-enhanced.html**: 拡張機能付きの関数呼び出しグラフを可視化したHTMLファイルです。
    - **generated-docs/callgraph.html**: プロジェクトの関数呼び出しグラフを可視化したHTMLファイルです。
    - **generated-docs/callgraph.js**: 関数呼び出しグラフの表示ロジックやインタラクションを制御するJavaScriptファイルです。
    - **generated-docs/style.css**: 生成されたドキュメントの見た目を定義するCSSファイルです。
- **googled947dc864c270e07.html**: Googleサイト認証用のファイルです。
- **index.html**: プロジェクトのデモページやランディングページとして機能するHTMLファイルです。
- **issue-notes/**: 開発中に検討された課題やメモを記録したドキュメントを格納するディレクトリです。
    - **issue-notes/*.md**: 個別の課題に関するメモファイルです。
- **package.json**: プロジェクトのメタ情報（名前、バージョンなど）や依存関係、スクリプトなどを定義するファイルです。
- **pnpm-lock.yaml**: `pnpm` パッケージマネージャーが生成する依存関係のロックファイルで、ビルドの再現性を保証します。
- **src/**: プロジェクトのソースコード本体を格納するディレクトリです。
    - **src/grammar.js**: `grammar.pegjs` から `peggy` によって自動生成された、MMLを解析するためのJavaScriptパーサーコードです。
    - **src/grammar.pegjs**: MML（Music Macro Language）の文法規則を定義するPEG.jsファイルです。
    - **src/index.html**: プロジェクトの変換機能や再生機能のデモンストレーションを行うためのHTMLファイルです。
    - **src/main.js**: メインの処理ロジックやエントリポイントとなるJavaScriptファイルです。
    - **src/mml2json.js**: MML文字列をTone.js JSONシーケンサーフォーマットに変換する主要なロジックが実装されたJavaScriptファイルです。
    - **src/play.js**: 変換された音楽データをブラウザで再生する機能を提供するJavaScriptファイルです。
- **test/**: プロジェクトのテストコードを格納するディレクトリです。
    - **test/parser.test.js**: MMLパーサーの正確性を検証するためのテストスクリプトです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラー発生時の処理を捕捉し、適切にハンドリングするための関数です。
- **mml2json** (src/mml2json.js): MML文字列を入力として受け取り、解析してTone.js JSONシーケンサーフォーマットのデータ構造に変換する主要な関数です。
- **compileMmlToCommands** (src/mml2json.js): MML文字列を中間的なコマンドリストに変換する処理を担当する関数です。
- **getMmlCommands** (src/mml2json.js): MMLパーサーから得られたAST（抽象構文木）を元に、MMLコマンドのリストを抽出する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタック（発音）からリリース（消音）までの時間を計算する関数です。
- **repeat** (src/mml2json.js): 指定されたMMLコマンドを繰り返し処理するためのユーティリティ関数です。
- **toInt** (src/mml2json.js): 文字列を整数値に変換するためのヘルパー関数です。
- **calcDuration** (src/mml2json.js): 音符のデュレーション（長さ）を計算する関数です。
- **calcStartTick** (src/mml2json.js): 各音符が開始するタイムティックを計算する関数です。
- **increaseStartTick** (src/mml2json.js): 次の音符の開始タイムティックを増分する関数です。
- **calcLtick** (src/mml2json.js): Lコマンド（音長）に関連するタイムティックを計算する関数です。
- **getNodeId** (src/mml2json.js): 抽象構文木の各ノードに一意のIDを割り当てる関数です。
- **sort** (src/mml2json.js): データを特定の基準に基づいてソートするための汎用的な関数です。
- **play** (src/play.js): 変換されたTone.js JSONデータをブラウザのオーディオエンジンで再生を開始する関数です。
- **sub** (src/play.js): 再生処理の一部を担うサブルーチン、または購読処理を行う関数です。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティを確保したり、表示を正確にするための関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): コールグラフのレイアウトに関する設定を取得する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): コールグラフの中央ノードを配置する関数です。
- **showNodeInfo** (generated-docs/callgraph.js): コールグラフ内の特定のノード（関数）の詳細情報を表示する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): コールグラフ内の特定のエッジ（呼び出し関係）の詳細情報を表示する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替える関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): 関連するGitHubリポジトリへのURLを生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): コールグラフのレイアウトを初期状態にリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正する処理をラップする関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの移動を監視し、ノード同士の重なりが発生しないように調整する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): 発生したノードの重なりを解消する関数です。
- **switchLayout** (generated-docs/callgraph.js): コールグラフの表示レイアウトを切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): コールグラフ内のノードの状態をリセットする関数です。
- **fitToContent** (generated-docs/callgraph.js): コールグラフの表示範囲をコンテンツ全体に合わせる関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードラベルの表示/非表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出される関数（Callee）の位置によるフィルタリングを切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列置換などを行う汎用的な関数です。
- **switch** (generated-docs/callgraph.js): 条件分岐を行う制御フロー関数です。
- **function** (generated-docs/callgraph.js): 匿名関数または内部関数として定義されている汎用的な関数です。
- **max** (generated-docs/callgraph.js): 複数の値の中から最大値を取得する関数です。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定する関数です。
- **if** (generated-docs/callgraph.js): 条件分岐を行う制御フロー関数です。
- **for** (generated-docs/callgraph.js): ループ処理を行う制御フロー関数です。
- **ready** (generated-docs/callgraph.js): DOMが準備できた際に実行されるイベントハンドラ関数です。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する汎用的な関数です。
- **hex** (src/grammar.js): 16進数に関連する処理を行う関数、パーサーの内部で使われることがあります。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理するパーサーの内部関数です。
- **literalEscape** (src/grammar.js): リテラルエスケープシーケンスを処理するパーサーの内部関数です。
- **classEscape** (src/grammar.js): 文字クラスエスケープシーケンスを処理するパーサーの内部関数です。
- **describeExpectation** (src/grammar.js): パーサーが期待するパターンを記述する内部関数です。
- **describeExpected** (src/grammar.js): パーサーが期待したものを記述する内部関数です。
- **describeFound** (src/grammar.js): パーサーが実際に発見したものを記述する内部関数です。
- **peg$parse** (src/grammar.js): PEG.jsによって生成されたメインのパーシング関数で、入力文字列を解析します。
- **peg$f0** (src/grammar.js): パーサー内部で生成される無名関数（アクション）の一つです。
- **text** (src/grammar.js): パーシング中のテキストを取得する内部関数です。
- **offset** (src/grammar.js): パーシング中の現在のオフセット（位置）を取得する内部関数です。
- **range** (src/grammar.js): パーシング結果の範囲（開始と終了のオフセット）を取得する内部関数です。
- **location** (src/grammar.js): パーシング結果の正確な位置情報（行、列など）を取得する内部関数です。
- **expected** (src/grammar.js): パーサーが期待する入力パターンを管理する内部関数です。
- **error** (src/grammar.js): パーシングエラーを生成または処理する内部関数です。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得するパーサーの内部ヘルパー関数です。
- **peg$literalExpectation** (src/grammar.js): リテラル（固定文字列）の期待値を生成するパーサーの内部関数です。
- **peg$classExpectation** (src/grammar.js): 文字クラスの期待値を生成するパーサーの内部関数です。
- **peg$anyExpectation** (src/grammar.js): 任意の文字の期待値を生成するパーサーの内部関数です。
- **peg$endExpectation** (src/grammar.js): 入力終了の期待値を生成するパーサーの内部関数です。
- **peg$otherExpectation** (src/grammar.js): その他の特定の期待値を生成するパーサーの内部関数です。
- **peg$computePosDetails** (src/grammar.js): 位置の詳細情報（行、列など）を計算するパーサーの内部関数です。
- **peg$computeLocation** (src/grammar.js): 発生箇所の正確な位置情報を計算するパーサーの内部関数です。
- **peg$fail** (src/grammar.js): パーシング失敗を示す内部関数です。
- **peg$buildSimpleError** (src/grammar.js): 単純なパーシングエラーメッセージを構築する内部関数です。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたパーシングエラーメッセージを構築する内部関数です。
- **peg$parsestart** (src/grammar.js): MMLパーサーの開始ルールを処理する関数です。
- **peg$parsenote** (src/grammar.js): MMLパーサーの音符ルールを処理する関数です。
- **peg$throw** (src/grammar.js): パーシングエラーをスローする内部関数です。
- **constructor** (src/grammar.js): オブジェクトのインスタンスを初期化するコンストラクタ関数です。
- **format** (src/grammar.js): フォーマット処理を行う汎用的な関数です。
- **buildMessage** (src/grammar.js): メッセージ文字列を構築する関数です。
- **literal** (src/grammar.js): リテラル値を処理する関数です。
- **class** (src/grammar.js): クラス定義またはクラス関連の処理を行う関数です。
- **any** (src/grammar.js): 任意の要素を処理する関数です。
- **end** (src/grammar.js): 終了処理を行う関数です。
- **other** (src/grammar.js): その他の汎用的な処理を行う関数です。
- **while** (src/grammar.js): 条件が真である間、処理を繰り返す制御フロー関数です。
- **start** (src/grammar.pegjs): MML文法の開始点となるルールです。
- **note** (src/grammar.pegjs): MML文法で個々の音符を定義するルールです。

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
Generated at: 2025-12-02 07:04:59 JST
