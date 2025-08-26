Last updated: 2025-08-27

# Project Overview

## プロジェクト概要
- MML (Music Macro Language)をWeb Audio APIライブラリTone.jsのJSONシーケンサー形式へ変換するツールです。
- 生成されたJSONデータを用いて、ブラウザ上でMMLで記述された音楽の再生を可能にするプレイヤー機能を提供します。
- 文法パーサーの自動生成、Vitestによるテスト、GitHub Actionsを活用した多言語対応や文書自動生成によって開発効率を高めています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLを再生・表示するための標準マークアップ言語です。
- 音楽・オーディオ:
  - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンス処理を容易にするJavaScriptライブラリです。
  - Tone.js CDN - unpkg経由でTone.jsライブラリを効率的に配信し、利用可能にします。
  - MML (Music Macro Language) - 音楽をテキストで記述するための簡易的な記法であり、このプロジェクトの入力形式です。
  - Web Audio API - ブラウザに内蔵された音声処理機能で、Tone.jsを通じて利用されます。
- 開発ツール:
  - Node.js runtime - JavaScriptコードを実行するための環境です。
  - npm scripts - package.jsonで定義されたスクリプトを実行するタスクランナーです（5個のスクリプト）。
  - pnpm - 依存関係を高速かつ効率的に管理するパッケージマネージャーです。
  - Google Generative AI - AIによる文書生成、特にプロジェクト要約などのサポートに利用されます。
  - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得やIssue管理を自動化します。
- テスト:
  - Vitest - 高速なViteベースのJavaScriptテストフレームワークで、テスト駆動開発をサポートします。
  - TDD (Test-Driven Development) - 最初にテストを記述し、それに合わせてコードを開発する手法です。
- ビルドツール:
  - Peggy - PEG (Parsing Expression Grammar) を基にしたパーサージェネレーターで、MMLの解析器を自動生成します。
  - PEG文法定義 - MML音楽記法の構文ルールを定義し、パーサーの生成元となります。
- 言語機能:
  - ES Modules - モダンなJavaScriptでモジュールをインポート・エクスポートするための標準的なシステムです。
- 自動化・CI/CD:
  - GitHub Actions - コードの変更を検知し、自動テスト、デプロイ、ドキュメント生成などを行うCI/CDワークフローを提供します（4個のワークフロー）。
  - プロジェクト要約自動生成 - プロジェクトの情報を自動的に要約するワークフローです。
  - Issue自動管理 - GitHub Issuesの作成や更新を自動化するワークフローです。
  - README多言語翻訳 - READMEファイルを多言語に自動翻訳するワークフローです。
  - i18n automation - 国際化対応（i18n）に関連する自動翻訳ワークフローです。
- 開発標準:
  - EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。

## ファイル階層ツリー
```
.editorconfig
.gitignore
LICENSE
README.ja.md
README.md
dev-setup/
  README.md
  setup.js
generated-docs/
  callgraph-enhanced.html
  callgraph.js
  development-status.md
  project-overview.md
  style.css
index.html
issue-notes/
  1.md
  10.md
  11.md
  12.md
  13.md
  14.md
  15.md
  16.md
  17.md
  18.md
  2.md
  20.md
  3.md
  4.md
  5.md
  6.md
  7.md
  8.md
  9.md
package.json
pnpm-lock.yaml
src/
  grammar.js
  grammar.pegjs
  index.html
  main.js
  mml2json.js
  play.js
test/
  parser.test.js
vitest.config.js
```

## ファイル詳細説明
- **.editorconfig**: 異なる開発環境で統一されたコーディングスタイルを強制するための設定ファイル。
- **.gitignore**: Gitがバージョン管理の対象から外すファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイル。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明するドキュメント。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語で説明するドキュメント。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関する説明が記述されたドキュメント。
- **dev-setup/setup.js**: 開発環境を構築するためのスクリプト。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出しグラフを視覚化した、機能拡張されたHTMLドキュメント。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの生成と描画を管理するJavaScriptコード。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況や進捗に関するドキュメント。
- **generated-docs/project-overview.md**: プロジェクトの全体像をまとめた概要ドキュメント。
- **generated-docs/style.css**: 生成されたドキュメントのスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのメインデモまたはエントリーポイントとなるHTMLファイル（ルートディレクトリ）。
- **issue-notes/*.md**: 個別のIssueに関するメモや詳細情報が記述されたMarkdownファイル群。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されたファイル。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、依存関係の正確なバージョンを固定するためのロックファイル。
- **src/grammar.js**: `grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコード。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文ルールを記述したPEG (Parsing Expression Grammar) 定義ファイル。
- **src/index.html**: `src`ディレクトリ内の機能を示すデモまたはエントリーポイントとなるHTMLファイル。
- **src/main.js**: プロジェクトの主要なロジックやアプリケーションのエントリーポイントとなるJavaScriptファイル。
- **src/mml2json.js**: MML文字列をTone.jsで利用可能なJSONシーケンサー形式に変換するコアロジックを実装したJavaScriptファイル。
- **src/play.js**: 変換されたTone.js JSONデータを使って音楽を再生するためのロジックを実装したJavaScriptファイル。
- **test/parser.test.js**: MMLパーサーの正確性を検証するためのテストコード。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイル。

## 関数詳細説明
- **catch** (dev-setup/setup.js): Promiseのエラー処理やtry-catchブロックで使用される一般的なエラーハンドリング関数。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションを防ぐための関数。
- **getLayoutConfig** (generated-docs/callgraph.js): 呼び出しグラフのレイアウト設定を取得する関数。
- **placeCentralNode** (generated-docs/callgraph.js): 呼び出しグラフの中央ノードを配置する関数。
- **showNodeInfo** (generated-docs/callgraph.js): 選択されたノード（関数）の詳細情報を表示する関数。
- **showEdgeInfo** (generated-docs/callgraph.js): 選択されたエッジ（関数呼び出し関係）の詳細情報を表示する関数。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報パネルを非表示にする関数。
- **showInfoPanel** (generated-docs/callgraph.js): 情報パネルを表示する関数。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する関数。
- **resetLayout** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットする関数。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、重なりを解消する処理のラッパー関数。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの移動を監視し、視覚的な重なりを自動的に調整する関数。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): 呼び出しグラフ内のノードの重なりを解消するアルゴリズム。
- **switchLayout** (generated-docs/callgraph.js): 呼び出しグラフのレイアウトアルゴリズムを切り替える関数。
- **resetNodeStates** (generated-docs/callgraph.js): すべてのノードの視覚的な状態をリセットする関数。
- **fitToContent** (generated-docs/callgraph.js): グラフの表示範囲をコンテンツ全体に合わせる関数。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードラベルの表示/非表示を切り替える関数。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出される関数の位置によるフィルタリングを切り替える関数。
- **replace** (generated-docs/callgraph.js): 文字列の置換を行う汎用的な関数。
- **function** (generated-docs/callgraph.js): 匿名関数またはコールバック関数。
- **max** (generated-docs/callgraph.js): 最大値を計算する汎用的な関数。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定する関数。
- **if** (generated-docs/callgraph.js): 条件分岐を行う制御フロー文。
- **for** (generated-docs/callgraph.js): 繰り返し処理を行う制御フロー文。
- **ready** (generated-docs/callgraph.js): ドキュメントやアプリケーションの準備完了時に実行されるコールバック関数。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する関数。
- **hex** (src/grammar.js): 16進数パーシングに関連する関数。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスのパーシングに関連する関数。
- **literalEscape** (src/grammar.js): リテラルエスケープシーケンスのパーシングに関連する関数。
- **classEscape** (src/grammar.js): 文字クラスエスケープシーケンスのパーシングに関連する関数。
- **describeExpectation** (src/grammar.js): パーサーのエラーメッセージ生成に使う期待値を記述する関数。
- **describeExpected** (src/grammar.js): パーサーのエラーメッセージ生成に使う期待されるトークンを記述する関数。
- **describeFound** (src/grammar.js): パーサーのエラーメッセージ生成に使う実際に見つかったトークンを記述する関数。
- **peg$parse** (src/grammar.js): Peggyが生成するメインのパーシング関数。
- **peg$f0** (src/grammar.js): Peggyが内部的に生成する、特定の文法ルールに関連する関数。
- **text** (src/grammar.js): パース中の現在のテキストを取得するパーサー内部関数。
- **offset** (src/grammar.js): パース中の現在のオフセット（位置）を取得するパーサー内部関数。
- **range** (src/grammar.js): パース結果の範囲を取得するパーサー内部関数。
- **location** (src/grammar.js): パース結果の場所（行、列など）を取得するパーサー内部関数。
- **expected** (src/grammar.js): パーサーが期待する次のトークンを取得するパーサー内部関数。
- **error** (src/grammar.js): パーサーのエラーオブジェクトを生成する内部関数。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得するパーサー内部関数。
- **peg$literalExpectation** (src/grammar.js): リテラル（文字列）の期待値を生成するパーサー内部関数。
- **peg$classExpectation** (src/grammar.js): 文字クラスの期待値を生成するパーサー内部関数。
- **peg$anyExpectation** (src/grammar.js): 任意の文字の期待値を生成するパーサー内部関数。
- **peg$endExpectation** (src/grammar.js): 入力終了の期待値を生成するパーサー内部関数。
- **peg$otherExpectation** (src/grammar.js): その他の期待値を生成するパーサー内部関数。
- **peg$computePosDetails** (src/grammar.js): 位置の詳細（行、列）を計算するパーサー内部関数。
- **peg$computeLocation** (src/grammar.js): コード内の正確な位置情報を計算するパーサー内部関数。
- **peg$fail** (src/grammar.js): パース失敗を記録するパーサー内部関数。
- **peg$buildSimpleError** (src/grammar.js): シンプルなパースエラーメッセージを構築するパーサー内部関数。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたパースエラーメッセージを構築するパーサー内部関数。
- **peg$parsestart** (src/grammar.js): `start`文法ルールに対応するパース関数。
- **peg$parsenote** (src/grammar.js): `note`文法ルールに対応するパース関数。
- **peg$throw** (src/grammar.js): パースエラーをスローするパーサー内部関数。
- **constructor** (src/grammar.js): JavaScriptオブジェクトのコンストラクタ関数。
- **format** (src/grammar.js): 文字列やデータを特定の形式に整形する汎用関数。
- **buildMessage** (src/grammar.js): エラーメッセージを構築する関数。
- **literal** (src/grammar.js): リテラルな期待値を表すオブジェクトまたは関数。
- **class** (src/grammar.js): 文字クラスの期待値を表すオブジェクトまたは関数。
- **any** (src/grammar.js): 任意の入力の期待値を表すオブジェクトまたは関数。
- **end** (src/grammar.js): 入力終端の期待値を表すオブジェクトまたは関数。
- **other** (src/grammar.js): その他の期待値を表すオブジェクトまたは関数。
- **switch** (src/grammar.js): 複数分岐を行う制御フロー文。
- **while** (src/grammar.js): 条件が真の間、繰り返し処理を行う制御フロー文。
- **start** (src/grammar.pegjs): MMLパーサーの開始ルール。
- **note** (src/grammar.pegjs): MMLパーサーにおける音符の文法ルール。
- **mml2json** (src/mml2json.js): MML文字列をTone.jsのJSONシーケンス形式に変換するメイン関数。
- **compileMmlToCommands** (src/mml2json.js): MMLを解析し、中間的なコマンドリストにコンパイルする関数。
- **getMmlCommands** (src/mml2json.js): パースされたMML構造からコマンドを抽出する関数。
- **calcAttackToReleaseTicks** (src/mml2json.js): アタックからリリースまでのティック数を計算する関数。
- **repeat** (src/mml2json.js): MMLの繰り返し記号を処理する関数。
- **toInt** (src/mml2json.js): 値を整数に変換するヘルパー関数。
- **calcDuration** (src/mml2json.js): 音符や休符の継続時間（デュレーション）を計算する関数。
- **calcStartTick** (src/mml2json.js): イベントの開始ティックを計算する関数。
- **increaseStartTick** (src/mml2json.js): 現在の開始ティックを増加させる関数。
- **calcLtick** (src/mml2json.js): 長さティック（duration unit）を計算する関数。
- **getNodeId** (src/mml2json.js): ユニークなノードIDを生成する関数。
- **sort** (src/mml2json.js): 配列をソートする汎用関数。
- **play** (src/play.js): 変換されたTone.jsシーケンスを再生するメイン関数。
- **sub** (src/play.js): 特定の処理（例: Tone.jsのイベント購読やサブタスク）を行うヘルパー関数。
- **vitest** (test/parser.test.js): Vitestテストフレームワークのインポート。

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
  - constructor ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-08-27 07:03:45 JST
