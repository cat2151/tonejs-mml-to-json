Last updated: 2025-08-11

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsが解釈可能なJSONシーケンサー形式に変換するツールです。
- Web Audio APIとTone.jsを用いてブラウザ上でMMLベースの音楽を簡単に再生することを可能にします。
- パーサー生成、テスト、自動化されたドキュメント生成、多言語対応など、開発と運用を効率化する仕組みを備えています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声処理を可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、効率的なロードを実現します。
    - MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトの解析対象です。
    - Web Audio API - ブラウザで直接音声処理を行うための標準APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptの実行環境として、プロジェクトのビルドやスクリプト実行に使用されます。
    - npm scripts - package.jsonに定義されたタスクを実行するためのランナーです（5個のスクリプトが存在）。
    - pnpm - 高速でディスクスペースを効率的に利用するJavaScriptパッケージマネージャーです。
    - Google Generative AI - プロジェクトの文書生成、特に要約などの自動生成をサポートします。
    - @octokit/rest - GitHub APIと連携し、Issue管理やドキュメント生成などの自動化を可能にします。
- テスト:
    - Vitest - Viteをベースにした高速なテストフレームワークで、ユニットテストや統合テストに使用されます。
    - TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法を採用しています。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLパーサーの生成に使用されます。
    - PEG文法定義 - MML音楽記法を解析するための文法ルールが定義されており、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、依存関係の管理とコードの分割を効率化します。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化するワークフローです（4個のワークフローが存在）。
        - プロジェクト要約自動生成: プロジェクトの概要や進捗状況のドキュメントを自動的に生成します。
        - Issue自動管理: GitHub Issuesのライフサイクル管理やラベル付けなどを自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
        - i18n automation - 自動翻訳ワークフローの一環として、国際化対応をサポートします。
- 開発標準: EditorConfig - 異なるエディタやIDEを使用する開発者間で、コードスタイル（インデント、改行など）の統一ルールを適用します。

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
- **.gitignore**: Gitのバージョン管理から除外すべきファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報（例: MITライセンス）を記述したファイル。
- **README.ja.md**: プロジェクトの日本語版概要、使い方、セットアップ方法などが記載されたドキュメント。
- **README.md**: プロジェクトの英語版概要、使い方、セットアップ方法などが記載されたドキュメント。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関する説明が記載されたドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップや特定のテスト準備に関連するJavaScriptスクリプト。
- **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出しグラフを可視化するための拡張HTMLファイル。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの描画、操作、インタラクションを制御するJavaScriptコード。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗が記載された自動生成ドキュメント。
- **generated-docs/project-overview.md**: プロジェクトの概要が記載された自動生成ドキュメント。
- **generated-docs/style.css**: 生成されたドキュメント（特に呼び出しグラフ）の見た目を定義するCSSスタイルシート。
- **index.html**: プロジェクトのルートにある、MML-to-JSONコンバーターのメインデモまたはエントリポイントとなるHTMLファイル。
- **issue-notes/** (ディレクトリ): GitHub Issuesに関連する詳細なメモや補足情報が格納されているディレクトリ。
- **package.json**: Node.jsプロジェクトのメタデータ（プロジェクト名、バージョン）、依存関係、スクリプトなどが定義されたファイル。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、プロジェクトの依存関係の正確なバージョンと構造をロックするファイル。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成された、MMLを解析するためのJavaScriptパーサーコード。
- **src/grammar.pegjs**: MML (Music Macro Language) を解釈するためのPEG (Parsing Expression Grammar) 文法定義ファイル。
- **src/index.html**: `src`ディレクトリ内にある、アプリケーションのコア機能のデモまたはエントリポイントとなるHTMLファイル。
- **src/main.js**: アプリケーションの主要なロジックを担うJavaScriptファイルで、MML入力処理や変換フローを調整する役割。
- **src/mml2json.js**: MMLテキストをTone.jsのJSONシーケンサー形式に変換する核心的なロジックが実装されているJavaScriptファイル。
- **src/play.js**: 変換されたTone.js JSONデータを受け取り、Web Audio API (Tone.js経由) を使用して実際に音楽を再生するJavaScriptファイル。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストスクリプト。
- **vitest.config.js**: Vitestテストフレームワークの各種設定（テストファイルの場所、カバレッジオプションなど）を定義するファイル。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラーハンドリングのための一般的な関数。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、安全なHTML出力を生成するユーティリティ関数。
- **getLayoutConfig** (generated-docs/callgraph.js): 呼び出しグラフのレイアウト設定を取得する関数。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心ノードを配置する関数。
- **showNodeInfo** (generated-docs/callgraph.js): 特定のノード（関数）に関する詳細情報を表示する関数。
- **showEdgeInfo** (generated-docs/callgraph.js): 特定のエッジ（呼び出し関係）に関する詳細情報を表示する関数。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを非表示にする関数。
- **showInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを表示する関数。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替える関数。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubのソースコードへのURLを生成する関数。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする関数。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正するためのラッパー関数。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの動きを監視し、他のノードとの重なりを解決する関数。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): ノードの重なりを解決するロジックを実行する関数。
- **switchLayout** (generated-docs/callgraph.js): グラフのレイアウトを切り替える関数。
- **resetNodeStates** (generated-docs/callgraph.js): ノードの状態をリセットする関数。
- **fitToContent** (generated-docs/callgraph.js): グラフ表示領域をコンテンツに合わせる関数。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードラベルの表示/非表示を切り替える関数。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先のファイル位置によるフィルタリングを切り替える関数。
- **replace** (generated-docs/callgraph.js): 文字列置換を行う関数（汎用的な可能性がある）。
- **function** (generated-docs/callgraph.js): (一般的なJavaScriptの`function`キーワードに関する参照、特定の名前付き関数ではない可能性が高い)
- **max** (generated-docs/callgraph.js): 最大値を計算する関数（汎用的な可能性がある）。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定する関数（特定のライブラリのメソッドである可能性が高い）。
- **ready** (generated-docs/callgraph.js): DOMが準備できたときに実行されるイベントハンドラ（jQueryの`$(document).ready()`のようなもの）。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する関数。
- **mml2json** (src/mml2json.js): MML文字列をTone.jsのJSONシーケンサー形式に変換するメイン関数。
- **compileMmlToCommands** (src/mml2json.js): MMLを内部的なコマンドリストにコンパイルする関数。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々のコマンドを抽出する関数。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタックからリリースまでのティック数を計算する関数。
- **repeat** (src/mml2json.js): 特定のMMLパターンを繰り返す処理を行う関数。
- **toInt** (src/mml2json.js): 値を整数に変換するユーティリティ関数。
- **calcDuration** (src/mml2json.js): 音符や休符のデュレーション（長さ）を計算する関数。
- **calcStartTick** (src/mml2json.js): 音符の開始ティックを計算する関数。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増加させる関数。
- **calcLtick** (src/mml2json.js): Lコマンド（音符の長さ設定）に関連するティック値を計算する関数。
- **getNodeId** (src/mml2json.js): ノードの一意なIDを取得する関数。
- **sort** (src/mml2json.js): 配列などをソートする関数（汎用的な可能性がある）。
- **play** (src/play.js): 変換されたJSONデータを使用して音楽再生を開始するメイン関数。
- **sub** (src/play.js): 音楽再生に関連するサブルーチンまたはヘルパー関数。
- **hex** (src/grammar.js): 16進数処理に関連する関数（Peggy生成コードの一部）。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンス処理に関連する関数（Peggy生成コードの一部）。
- **literalEscape** (src/grammar.js): リテラルエスケープ処理に関連する関数（Peggy生成コードの一部）。
- **classEscape** (src/grammar.js): 文字クラスエスケープ処理に関連する関数（Peggy生成コードの一部）。
- **describeExpectation** (src/grammar.js): パーサーが期待する入力を記述する関数（Peggy生成コードの一部）。
- **describeExpected** (src/grammar.js): 期待される入力に関する説明を生成する関数（Peggy生成コードの一部）。
- **describeFound** (src/grammar.js): 見つかった入力を記述する関数（Peggy生成コードの一部）。
- **peg$parse** (src/grammar.js): Peggyによって生成されたメインパーサー関数。MML文字列を解析し、抽象構文木を生成します。
- **peg$f0** (src/grammar.js): Peggyによって生成された内部ヘルパー関数。
- **text** (src/grammar.js): 現在解析中のテキストを取得する関数（Peggy内部）。
- **offset** (src/grammar.js): 現在の解析オフセットを取得する関数（Peggy内部）。
- **range** (src/grammar.js): 現在の解析範囲を取得する関数（Peggy内部）。
- **location** (src/grammar.js): 現在の解析位置情報を取得する関数（Peggy内部）。
- **expected** (src/grammar.js): 期待される解析要素を取得する関数（Peggy内部）。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得する関数（Peggy内部）。
- **peg$literalExpectation** (src/grammar.js): リテラルに対する期待を生成する関数（Peggy内部）。
- **peg$classExpectation** (src/grammar.js): 文字クラスに対する期待を生成する関数（Peggy内部）。
- **peg$anyExpectation** (src/grammar.js): 任意の文字に対する期待を生成する関数（Peggy内部）。
- **peg$endExpectation** (src/grammar.js): 入力終端に対する期待を生成する関数（Peggy内部）。
- **peg$otherExpectation** (src/grammar.js): その他の期待を生成する関数（Peggy内部）。
- **peg$computePosDetails** (src/grammar.js): 位置詳細を計算する関数（Peggy内部）。
- **peg$computeLocation** (src/grammar.js): 位置情報を計算する関数（Peggy内部）。
- **peg$fail** (src/grammar.js): 解析失敗を処理する関数（Peggy内部）。
- **peg$buildSimpleError** (src/grammar.js): 単純なエラーを構築する関数（Peggy内部）。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたエラーを構築する関数（Peggy内部）。
- **peg$parsestart** (src/grammar.js): MMLの開始ルールを解析する関数（Peggy生成コード）。
- **peg$parsenote** (src/grammar.js): MMLの音符ルールを解析する関数（Peggy生成コード）。
- **peg$throw** (src/grammar.js): 解析エラーをスローする関数（Peggy内部）。
- **constructor** (src/grammar.js): エラーオブジェクトなどのコンストラクタ。
- **format** (src/grammar.js): エラーメッセージなどのフォーマットを行う関数。
- **buildMessage** (src/grammar.js): メッセージを構築する関数。
- **literal** (src/grammar.js): リテラルを処理する関数。
- **class** (src/grammar.js): クラスを処理する関数。
- **any** (src/grammar.js): 任意の要素を処理する関数。
- **end** (src/grammar.js): 終了を処理する関数。
- **other** (src/grammar.js): その他の要素を処理する関数。
- **start** (src/grammar.pegjs): `src/grammar.pegjs`で定義されたMML文法のエントリポイントとなる開始ルール。
- **note** (src/grammar.pegjs): `src/grammar.pegjs`で定義されたMML文法における音符のルール。

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
```

---
Generated at: 2025-08-11 07:03:47 JST
