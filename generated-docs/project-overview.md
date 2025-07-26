Last updated: 2025-07-27

```markdown
# Project Overview

## プロジェクト概要
- MML形式の音楽データを、Tone.jsが利用可能なJSONシーケンサー形式に変換するツールです。
- Web Audio APIとTone.jsを活用し、ブラウザ上でMMLベースの楽曲再生を可能にします。
- Peggyによる堅牢なパーサー生成とGitHub Actionsによる開発プロセス自動化を特徴としています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーを構築するための標準マークアップ言語。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザで高度な音声処理と音楽シーケンスを可能にするJavaScriptライブラリ。unpkg経由でCDN配信も利用。
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法。このプロジェクトの変換対象。
    - Web Audio API - ブラウザでオーディオ処理を行うためのJavaScript API。Tone.jsを介して利用される。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための開発環境。
    - npm scripts - プロジェクトのタスク自動化（ビルド、テストなど）に使用されるスクリプト定義。
    - pnpm - 高速かつディスクスペース効率の良いパッケージマネージャー。
    - Google Generative AI - プロジェクトの文書生成（例: 要約）をサポートするためのAIサービス。
    - @octokit/rest - GitHub APIと連携し、リポジトリ操作やIssue管理を自動化するためのライブラリ。
- テスト:
    - Vitest - 高速でViteをベースとしたテストフレームワーク。JavaScript/TypeScriptプロジェクトの単体テストや統合テストに使用される。
    - TDD (Test-Driven Development) - テストを先に書き、それに合わせてコードを開発する手法。プロジェクトの品質保証と設計に貢献。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づいてパーサーを自動生成するツール。MMLの構文解析器の生成に使用される。
    - PEG文法定義 - MML音楽記法を解析するためのPEG文法ルール。PeggyによってJavaScriptパーサーに変換される。
- 言語機能: ES Modules - モダンなJavaScriptで推奨されるモジュールシステム。コードの分割と再利用を効率化。
- 自動化・CI/CD: GitHub Actions - コードの変更を検知して自動的にテスト実行、デプロイ、プロジェクト要約生成、Issue自動管理、README多言語翻訳、国際化（i18n）関連の自動化ワークフローを実行するCI/CDプラットフォーム。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するためのファイルフォーマット。

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
- **.editorconfig**: 開発環境全体でコードのインデントや文字コードなどのコーディングスタイルを統一するための設定ファイル。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定する設定ファイル。
- **LICENSE**: プロジェクトのライセンス情報（著作権や利用条件）を記述したファイル。
- **README.ja.md**: プロジェクトの概要や使い方を日本語で説明するメインのドキュメントファイル。
- **README.md**: プロジェクトの概要や使い方を英語で説明するメインのドキュメントファイル。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明ドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプト。
- **generated-docs/**: 自動生成されたドキュメントや関連ファイルが格納されるディレクトリ。
    - **callgraph-enhanced.html**: 関数呼び出しグラフをインタラクティブに表示するためのHTMLファイル。
    - **callgraph.js**: 関数呼び出しグラフのデータを処理し、表示ロジックを提供するJavaScriptファイル。
    - **development-status.md**: プロジェクトの開発状況を自動生成したドキュメント。
    - **project-overview.md**: プロジェクトの概要を自動生成したドキュメント。
    - **style.css**: generated-docs内のHTMLファイルに適用されるスタイルシート。
- **index.html**: プロジェクトのウェブサイトのメインエントリーポイントとなるHTMLファイル。デモページやアプリケーションの起動に使われる。
- **issue-notes/**: 開発中の特定の課題（Issue）に関するメモや詳細がMarkdown形式で格納されているディレクトリ。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイル。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する、プロジェクトの依存関係の正確なバージョンと解決状態を記録するロックファイル。
- **src/**: プロジェクトの主要なソースコードが格納されるディレクトリ。
    - **grammar.js**: `grammar.pegjs`からPeggyによって生成されたMMLパーサーのJavaScriptコード。MML文字列を解析し、抽象構文木（AST）を生成する。
    - **grammar.pegjs**: MML記法を解析するためのPEG (Parsing Expression Grammar) 文法定義ファイル。このファイルから`grammar.js`が生成される。
    - **index.html**: `src`ディレクトリ内にある、MMLプレイヤーのインタフェースを提供するHTMLファイル。
    - **main.js**: アプリケーションの主要なロジックや初期化処理を実行するJavaScriptファイル。
    - **mml2json.js**: MML文字列をTone.jsのJSONシーケンサー形式に変換するコアロジックを実装したJavaScriptファイル。
    - **play.js**: 変換されたJSONデータを受け取り、Tone.jsを使用して音楽を再生する機能を提供するJavaScriptファイル。
- **test/parser.test.js**: MMLパーサー（`src/grammar.js`）の機能と正確性を検証するためのテストコード。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイル。テストの実行方法やカバレッジレポートなどを定義する。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的なブロック。非同期処理などで発生した例外を捕捉し、適切な処理を行う。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティを向上させる関数。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウト設定を取得する関数。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中心ノードを配置する関数。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ上のノード（関数）の詳細情報を表示する関数。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ上のエッジ（呼び出し関係）の詳細情報を表示する関数。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にする関数。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示する関数。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える関数。
- **generateGitHubURL (generated-docs/callgraph.js)**: 関連するGitHubリソースへのURLを生成する関数。
- **resetLayout (generated-docs/callgraph.js)**: グラフのレイアウトを初期状態にリセットする関数。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの移動を監視し、重なりを修正するためのラッパー関数。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: ノードの移動を監視し、グラフ上のノードが重ならないように配置を調整する関数。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: グラフノードの重なりを解決する関数。
- **switchLayout (generated-docs/callgraph.js)**: グラフの表示レイアウトを切り替える関数。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフノードの視覚的状態（ハイライトなど）をリセットする関数。
- **fitToContent (generated-docs/callgraph.js)**: グラフ全体が画面に収まるようにズームレベルを調整する関数。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフノードのラベル表示を切り替える関数。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先の場所によるフィルタリングを切り替える関数。
- **replace (generated-docs/callgraph.js)**: 文字列内のパターンを置換する関数。
- **switch (generated-docs/callgraph.js)**: 条件に基づいて異なる処理パスを選択する制御構造（解析ツールが関数と認識した可能性あり）。
- **function (generated-docs/callgraph.js)**: 匿名関数やコールバック関数として使用される可能性のある一般的な関数定義。（解析ツールが関数と認識した可能性あり）。
- **max (generated-docs/callgraph.js)**: 最大値を計算する関数。
- **on (generated-docs/callgraph.js)**: イベントリスナーを設定する関数（例: `addEventListener`）。
- **if (generated-docs/callgraph.js)**: 条件分岐を行う制御構造（解析ツールが関数と認識した可能性あり）。
- **for (generated-docs/callgraph.js)**: ループ処理を行う制御構造（解析ツールが関数と認識した可能性あり）。
- **ready (generated-docs/callgraph.js)**: DOMが準備完了した際に実行されるコールバック関数を設定する。
- **addListener (generated-docs/callgraph.js)**: イベントリスナーを追加する汎用的な関数。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数。通常、文字コードの変換などに使用される。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数。
- **literalEscape (src/grammar.js)**: リテラル文字のエスケープ処理を行う関数。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープ処理を行う関数。
- **describeExpectation (src/grammar.js)**: パーサーが期待する入力を記述する関数。
- **describeExpected (src/grammar.js)**: 期待される入力に関する詳細を記述する関数。
- **describeFound (src/grammar.js)**: 見つかった入力に関する詳細を記述する関数。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリポイント。入力文字列を解析する。
- **peg$f0 (src/grammar.js)**: Peggyによって生成された、パーサー内部で使用される匿名関数またはヘルパー関数。
- **text (src/grammar.js)**: 解析中の現在のテキスト部分を取得する関数。
- **offset (src/grammar.js)**: 現在の解析位置のオフセットを取得する関数。
- **range (src/grammar.js)**: 解析中の現在の範囲を取得する関数。
- **location (src/grammar.js)**: 現在の解析位置の行番号と列番号を取得する関数。
- **expected (src/grammar.js)**: パーサーが期待していたトークンやパターンを管理する関数。
- **error (src/grammar.js)**: 解析エラーを生成または処理する関数。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得する関数。
- **peg$literalExpectation (src/grammar.js)**: リテラルな文字列の期待値を生成する関数。
- **peg$classExpectation (src/grammar.js)**: 文字クラスの期待値を生成する関数。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字の期待値を生成する関数。
- **peg$endExpectation (src/grammar.js)**: 入力終了の期待値を生成する関数。
- **peg$otherExpectation (src/grammar.js)**: その他の期待値を生成する関数。
- **peg$computePosDetails (src/grammar.js)**: 解析位置の詳細（行、列、オフセットなど）を計算する関数。
- **peg$computeLocation (src/grammar.js)**: 解析エラーの正確な位置を計算する関数。
- **peg$fail (src/grammar.js)**: パーサーが現在のルールにマッチできなかったときに呼び出される関数。
- **peg$buildSimpleError (src/grammar.js)**: シンプルな解析エラーオブジェクトを構築する関数。
- **peg$buildStructuredError (src/grammar.js)**: 構造化された詳細な解析エラーオブジェクトを構築する関数。
- **peg$parsestart (src/grammar.js)**: Peggyパーサーの開始ルールを処理する関数。
- **peg$parsenote (src/grammar.js)**: Peggyパーサーの`note`ルールを処理する関数。
- **peg$throw (src/grammar.js)**: 解析エラーをスローする関数。
- **constructor (src/grammar.js)**: JavaScriptクラスのインスタンスを初期化するための特殊な関数。
- **format (src/grammar.js)**: 文字列のフォーマットを行う関数。
- **if (src/grammar.js)**: パーサー内部で条件分岐に使用される制御構造（解析ツールが関数と認識した可能性あり）。
- **buildMessage (src/grammar.js)**: エラーメッセージを構築する関数。
- **literal (src/grammar.js)**: リテラル値を処理する関数。
- **class (src/grammar.js)**: クラス定義またはクラス関連の処理（解析ツールが関数と認識した可能性あり）。
- **any (src/grammar.js)**: 任意の値を処理する関数。
- **end (src/grammar.js)**: 処理の終了に関連する関数。
- **other (src/grammar.js)**: その他の汎用的な処理を行う関数。
- **for (src/grammar.js)**: パーサー内部でループ処理に使用される制御構造（解析ツールが関数と認識した可能性あり）。
- **switch (src/grammar.js)**: パーサー内部で複数条件の分岐に使用される制御構造（解析ツールが関数と認識した可能性あり）。
- **while (src/grammar.js)**: パーサー内部で繰り返し処理に使用される制御構造（解析ツールが関数と認識した可能性あり）。
- **start (src/grammar.pegjs)**: MMLを解析する際のPEG文法の開始ルール。
- **note (src/grammar.pegjs)**: MMLの音符を解析するためのPEG文法ルール。
- **mml2json (src/mml2json.js)**: MML文字列をTone.jsのJSONシーケンサー形式に変換するメイン関数。
- **compileMmlToCommands (src/mml2json.js)**: MMLを内部的なコマンドリストにコンパイルする関数。
- **getMmlCommands (src/mml2json.js)**: MMLコマンドの配列を取得する関数。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算する関数。
- **repeat (src/mml2json.js)**: 指定された回数だけ処理を繰り返すためのヘルパー関数。
- **toInt (src/mml2json.js)**: 値を整数に変換する関数。
- **calcDuration (src/mml2json.js)**: 音符のデュレーション（長さ）を計算する関数。
- **calcStartTick (src/mml2json.js)**: 音符が開始するティック位置を計算する関数。
- **increaseStartTick (src/mml2json.js)**: 開始ティック位置を増加させる関数。
- **calcLtick (src/mml2json.js)**: Lコマンド（音長指定）に対応するティック値を計算する関数。
- **getNodeId (src/mml2json.js)**: グラフノードのIDを取得または生成する関数。
- **sort (src/mml2json.js)**: 配列などの要素をソートする関数。
- **function (src/mml2json.js)**: 匿名関数やコールバック関数として使用される可能性のある一般的な関数定義。（解析ツールが関数と認識した可能性あり）。
- **if (src/mml2json.js)**: 条件分岐を行う制御構造（解析ツールが関数と認識した可能性あり）。
- **switch (src/mml2json.js)**: 複数条件の分岐を行う制御構造（解析ツールが関数と認識した可能性あり）。
- **for (src/mml2json.js)**: ループ処理を行う制御構造（解析ツールが関数と認識した可能性あり）。
- **play (src/play.js)**: 変換されたJSONデータに基づいて音楽再生を開始するメイン関数。
- **sub (src/play.js)**: 再生処理の補助的な計算や処理を行う関数。
- **catch (src/play.js)**: エラーハンドリングのためのブロック。再生中のエラーを捕捉する。
- **switch (src/play.js)**: 再生ロジック内で、異なる再生イベントやコマンドに対応するための制御構造（解析ツールが関数と認識した可能性あり）。
- **if (src/play.js)**: 再生ロジック内で、条件に基づいて処理を分岐させる制御構造（解析ツールが関数と認識した可能性あり）。

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
Generated at: 2025-07-27 07:03:59 JST
