Last updated: 2025-09-26

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサーフォーマットへ変換するツールです。
- Web Audio API (Tone.js経由) を利用し、ブラウザ上でMML音楽の再生を可能にします。
- パーサージェネレーター（Peggy）でMMLを解析し、音楽再生のためのデータを生成します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化したJavaScriptライブラリで、ブラウザでの高機能な音声合成・シーケンス再生を可能にします。Web Audio API - ブラウザに標準搭載されている音声処理技術で、Tone.jsを通じて利用されます。Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、ブラウザから直接利用されます。MML (Music Macro Language) - 音楽をテキストで記述するための記法で、このプロジェクトの変換対象です。
- 開発ツール: Node.js runtime - JavaScriptの実行環境として開発プロセス全体で使用されます。npm scripts - `package.json`に定義されたタスクランナーで、ビルド、テスト、ドキュメント生成などの開発作業を自動化します。pnpm - 高速で効率的なパッケージマネージャーで、依存関係の管理に使用されます。Google Generative AI - プロジェクトの文書生成をサポートするAI技術です。@octokit/rest - GitHub APIと連携し、Issue管理やREADMEの自動翻訳などの自動化機能を実現します。
- テスト: Vitest - Viteをベースとした高速なユニットテストフレームワークで、プロジェクトのコードの品質を保証するために使用されます。TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの文法定義からJavaScriptコードのパーサーを生成します。PEG文法定義 - MML音楽記法を解析するための構文規則を記述したファイルで、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用を促進します。
- 自動化・CI/CD: GitHub Actions - プロジェクトの継続的インテグレーション/継続的デリバリー (CI/CD) を自動化するプラットフォームです。具体的には、プロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、i18n (国際化) のための自動翻訳ワークフローが設定されています。
- 開発標準: EditorConfig - 異なるエディタやIDEを使用する開発者間でのコードスタイル（インデント、改行コードなど）の統一を支援する設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でのコーディングスタイル（インデント、エンコードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理から無視するファイルやディレクトリを指定するファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明するドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語で説明するドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する追加情報や手順が記述されたドキュメントです。
- **dev-setup/setup.js**: 開発環境を構築するためのスクリプトファイルです。
- **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出しグラフを視覚的に表示するためのHTMLファイルです。よりリッチな表示機能を提供します。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの描画ロジックとインタラクティブな機能を提供するJavaScriptファイルです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシートです。
- **index.html**: プロジェクトのメインのデモページまたはエントリーポイントとなるHTMLファイルです。MML入力と変換・再生のインターフェースを提供します。
- **issue-notes/**: 開発中の課題やGitHub Issueに関連するメモを格納するディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係（dependencies, devDependencies）、およびスクリプト（npm scripts）が定義されたファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係ツリーの正確な状態を記録し、ビルドの一貫性を保証します。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木（AST）を生成します。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を記述したPEG (Parsing Expression Grammar) 形式のファイルです。この定義に基づいて`src/grammar.js`が生成されます。
- **src/index.html**: `index.html`と同様に、MML変換と再生のフロントエンドインターフェースを提供します（プロジェクトによっては開発用または組み込み用）。
- **src/main.js**: アプリケーションの主要なロジックを構成するJavaScriptファイルです。
- **src/mml2json.js**: MML文字列をTone.jsが解釈できるJSONシーケンサーフォーマットに変換するコアロジックを実装したJavaScriptファイルです。
- **src/play.js**: `mml2json.js`で生成されたJSONデータを使用して、Tone.jsを通じてMML音楽をブラウザで再生するためのJavaScriptコードです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの動作を検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラーハンドリングのための一般的な関数です。通常はPromiseのエラーを捕捉するために使用されます。
- **error** (): エラーオブジェクトを生成または処理する関数です。
- **on** (): 特定のイベントが発生したときに実行されるコールバックを設定するための関数です。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティリスクを防ぐための関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウト設定を取得する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中央ノードを配置する関数です。
- **showNodeInfo** (generated-docs/callgraph.js): グラフのノード（関数）に関する情報を表示する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフのエッジ（呼び出し関係）に関する情報を表示する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): 情報パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトをリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正するラッパー関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを解決する主要なロジックを実装した関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): グラフのノード間の重なりを解決する関数です。
- **switchLayout** (generated-docs/callgraph.js): グラフのレイアウト方式を切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): ノードの状態を初期状態にリセットする関数です。
- **fitToContent** (generated-docs/callgraph.js): グラフの表示をコンテンツに合わせて拡大縮小する関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードのラベル表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先のロケーションフィルターを切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列の置換を行う汎用関数です。
- **function** (generated-docs/callgraph.js): 匿名関数またはコールバック関数として使用される関数です。
- **max** (generated-docs/callgraph.js): 最大値を計算する関数です。
- **ready** (generated-docs/callgraph.js): ドキュメントがロードされたときに実行されるイベントハンドラを登録する関数です。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する関数です。
- **mml2json** (src/mml2json.js): MML文字列をTone.jsのシーケンサーが解釈できるJSONフォーマットに変換する主要な関数です。
    - 引数: MML文字列
    - 戻り値: Tone.jsシーケンサー互換のJSONオブジェクト
    - 機能: MMLを解析し、音符、デュレーション、アタック、リリースなどの音楽イベントをJSON構造にマッピングします。
- **compileMmlToCommands** (src/mml2json.js): MMLを内部的なコマンドリストにコンパイルする関数です。
- **getMmlCommands** (src/mml2json.js): MML文字列からコマンドの配列を抽出する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): アタックからリリースまでのティック数を計算する関数です。
- **repeat** (src/mml2json.js): 繰り返し処理を行う汎用関数です。
- **toInt** (src/mml2json.js): 値を整数に変換する関数です。
- **calcDuration** (src/mml2json.js): 音符のデュレーション（長さ）を計算する関数です。
- **calcStartTick** (src/mml2json.js): イベントの開始ティックを計算する関数です。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増やす関数です。
- **calcLtick** (src/mml2json.js): `L`コマンドに基づいてティックを計算する関数です。
- **getNodeId** (src/mml2json.js): ノードIDを取得する関数です。
- **sort** (src/mml2json.js): 配列をソートする関数です。
- **play** (src/play.js): 変換されたJSONデータを受け取り、Tone.jsを使用して音楽を再生する関数です。
    - 引数: Tone.jsシーケンサー互換のJSONオブジェクト
    - 戻り値: なし
    - 機能: Tone.jsのSynthやSequenceを設定し、指定された音楽データを再生します。
- **sub** (src/play.js): サブプロセスまたは補助的な処理を行うための関数です。
- **hex** (src/grammar.js): 16進数に関連する処理を行う関数です。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理する関数です。
- **literalEscape** (src/grammar.js): リテラル文字のエスケープを処理する関数です。
- **classEscape** (src/grammar.js): 文字クラスのエスケープを処理する関数です。
- **describeExpectation** (src/grammar.js): パーサーが期待するパターンを記述する関数です。
- **describeExpected** (src/grammar.js): 期待される入力を記述する関数です。
- **describeFound** (src/grammar.js): 実際に見つかった入力を記述する関数です。
- **peg$parse** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイントです。MML文字列の解析を実行します。
    - 引数: MML文字列
    - 戻り値: 解析結果のAST
    - 機能: 文法定義に基づき入力を解析し、結果を返します。
- **peg$f0** (src/grammar.js): Peggyが生成する内部関数で、特定のパーシングルールに対応します。
- **text** (src/grammar.js): 現在パース中のテキストを取得する関数です。
- **offset** (src/grammar.js): 現在のパースオフセット（位置）を取得する関数です。
- **range** (src/grammar.js): パースされたトークンの範囲を取得する関数です。
- **location** (src/grammar.js): パースされたトークンの位置情報（行、列など）を取得する関数です。
- **expected** (src/grammar.js): パース中に期待されるトークンのリストを取得する関数です。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得する内部関数です。
- **peg$literalExpectation** (src/grammar.js): リテラル期待値オブジェクトを生成する内部関数です。
- **peg$classExpectation** (src/grammar.js): 文字クラス期待値オブジェクトを生成する内部関数です。
- **peg$anyExpectation** (src/grammar.js): 任意の文字期待値オブジェクトを生成する内部関数です。
- **peg$endExpectation** (src/grammar.js): 入力の終端期待値オブジェクトを生成する内部関数です。
- **peg$otherExpectation** (src/grammar.js): その他の期待値オブジェクトを生成する内部関数です。
- **peg$computePosDetails** (src/grammar.js): 位置の詳細を計算する内部関数です。
- **peg$computeLocation** (src/grammar.js): 位置情報を計算する内部関数です。
- **peg$fail** (src/grammar.js): パース失敗を処理する内部関数です。
- **peg$buildSimpleError** (src/grammar.js): シンプルなエラーオブジェクトを構築する内部関数です。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたエラーオブジェクトを構築する内部関数です。
- **peg$parsestart** (src/grammar.js): `start`ルールに対応するパーシング関数です。
- **peg$parsenote** (src/grammar.js): `note`ルールに対応するパーシング関数です。
- **peg$throw** (src/grammar.js): パースエラーをスローする内部関数です。
- **constructor** (src/grammar.js): オブジェクトのコンストラクタ関数です（PEG.js内部で使用される）。
- **format** (src/grammar.js): フォーマット処理を行う関数です。
- **buildMessage** (src/grammar.js): エラーメッセージを構築する関数です。
- **literal** (src/grammar.js): リテラルに関連する処理を行う関数です。
- **class** (src/grammar.js): 文字クラスに関連する処理を行う関数です。
- **any** (src/grammar.js): 任意の文字に関連する処理を行う関数です。
- **end** (src/grammar.js): 終端処理に関連する関数です。
- **other** (src/grammar.js): その他の処理に関連する関数です。
- **start** (src/grammar.pegjs): MML文法の開始ルールです。
- **note** (src/grammar.pegjs): MML文法の音符（note）ルールです。

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
Generated at: 2025-09-26 07:05:10 JST
