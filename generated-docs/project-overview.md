Last updated: 2025-07-28

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのシーケンサー形式JSONに変換する、ブラウザベースの音楽ツールです。
- PEGパーサージェネレーターを用いてMML文字列を精密に解析し、音楽再生に必要なデータ構造を生成します。
- Web Audio APIとTone.jsライブラリを活用し、変換されたJSONデータを基にブラウザ上でMMLの即時再生を提供します。

## 技術スタック
- フロントエンド: **HTML5** (ブラウザベースのMMLプレイヤーの構築), **ES Modules** (モダンなJavaScriptモジュールシステムを採用し、コードの構造化と再利用性を向上)
- 音楽・オーディオ: **Tone.js** (Web Audio APIを活用した強力な音声ライブラリで、複雑なオーディオ処理とシーケンスを容易に実現), **Tone.js CDN** (unpkg経由でライブラリを配信し、デプロイと利用を簡素化), **MML (Music Macro Language)** (古典的な音楽記法をサポートし、パーサーによって音楽イベントに変換), **Web Audio API** (ブラウザで高度な音声処理を行うための基盤技術、Tone.jsを通じて利用)
- 開発ツール: **Node.js runtime** (JavaScriptの実行環境として開発プロセスをサポート), **npm scripts** (タスクランナーとして5つのスクリプトで開発ワークフローを自動化), **pnpm** (高速で効率的なパッケージマネージャーで依存関係の管理を最適化), **Google Generative AI** (AIを活用した文書生成をサポートし、ドキュメント作成を効率化), **@octokit/rest** (GitHub APIとの連携を可能にし、リポジトリ操作やIssue管理をプログラムから実行)
- テスト: **Vitest** (高速なViteベースのテストフレームワークで、効率的な単体テストと統合テストを実現), **TDD (Test-Driven Development)** (テスト駆動開発手法を採用し、堅牢なコード品質と信頼性を確保)
- ビルドツール: **Peggy** (PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLのような複雑な音楽記法のカスタムパーサーを自動生成), **PEG文法定義** (MMLの音楽記法を定義した文法ファイルで、パーサーの生成元となる)
- 言語機能: **ES Modules** (最新のJavaScriptモジュールシステムで、コードの依存関係を明確にし、最適化されたバンドルを可能に)
- 自動化・CI/CD: **GitHub Actions** (4つのワークフローでCI/CDプロセスを自動化。プロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、i18n自動化ワークフローが含まれる)
- 開発標準: **EditorConfig** (プロジェクト全体でコードの書式統一ルールを定義し、チーム開発におけるコード品質と一貫性を維持)

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
- **.editorconfig**: エディタのコードスタイル設定を定義し、プロジェクト全体のコードの一貫性を保ちます。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発情報などを日本語で説明する主要なドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発情報などを英語で説明する主要なドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明ドキュメントです。
- **dev-setup/setup.js**: 開発環境のセットアップを行うためのスクリプトです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を可視化するグラフ表示の強化版HTMLインターフェースです。
- **generated-docs/callgraph.js**: プロジェクト内の関数の呼び出し関係を解析し、可視化するためのJavaScriptロジックが含まれています。ノードの配置、情報表示、レイアウト調整などを行います。
- **generated-docs/development-status.md**: 開発の進捗状況や計画に関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: generated-docsディレクトリ内のHTMLドキュメントのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのメインのデモページまたはエントリーポイントとなるHTMLファイルです。ユーザーインターフェースを提供します。
- **issue-notes/** (ディレクトリ): 各Issueに関する詳細なメモや議論がMarkdown形式で格納されています。
- **package.json**: Node.jsプロジェクトの設定ファイルで、プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成する依存関係のロックファイルで、ビルドの再現性を保証します。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成されたMMLパーサーのJavaScriptコードです。MML文字列を構文解析し、抽象構文木（AST）を構築するコアロジックを含みます。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を定義したPEG (Parsing Expression Grammar) ファイルです。この定義に基づいてパーサーが生成されます。
- **src/index.html**: `src`ディレクトリ内のデモやテスト用のHTMLファイルです。
- **src/main.js**: アプリケーションの主要なエントリーポイントとなるJavaScriptファイルです。
- **src/mml2json.js**: MMLの構文解析結果（AST）を受け取り、Tone.jsのシーケンサーが理解できるJSONフォーマットに変換する中心的なロジックを実装しています。
- **src/play.js**: `mml2json.js`によって生成されたJSONデータをTone.jsライブラリに渡し、ブラウザ上でMML音楽を実際に再生するためのロジックを含みます。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの機能が正しく動作するかを検証するためのテストスイートです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境に関する設定を定義します。

## 関数詳細説明
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションを防ぐためのユーティリティ関数。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウト設定を取得する。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中央ノードを配置するロジック。
- **showNodeInfo** (generated-docs/callgraph.js): 特定のノード（関数）の詳細情報を表示する。
- **showEdgeInfo** (generated-docs/callgraph.js): 特定のエッジ（呼び出し関係）の詳細情報を表示する。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを非表示にする。
- **showInfoPanel** (generated-docs/callgraph.js): 情報表示パネルを表示する。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報表示パネルの表示/非表示を切り替える。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、重なりを修正するラッパー関数。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの移動を監視し、重なりを動的に修正する。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): ノード間の重なりを解消する。
- **switchLayout** (generated-docs/callgraph.js): グラフのレイアウト方式を切り替える。
- **resetNodeStates** (generated-docs/callgraph.js): グラフノードの状態（選択、強調など）をリセットする。
- **fitToContent** (generated-docs/callgraph.js): グラフの表示をコンテンツに合わせてズーム・パンする。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードのラベル表示を切り替える。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先の位置によるフィルタリングを切り替える。
- **hex** (src/grammar.js): 16進数パーシングに関連する内部関数。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスの処理に関する内部関数。
- **literalEscape** (src/grammar.js): リテラルエスケープシーケンスの処理に関する内部関数。
- **classEscape** (src/grammar.js): 文字クラスエスケープシーケンスの処理に関する内部関数。
- **describeExpectation** (src/grammar.js): パーサーが期待する次の入力を記述する内部関数。
- **describeExpected** (src/grammar.js): 期待される入力を記述する内部関数。
- **describeFound** (src/grammar.js): 発見された入力を記述する内部関数。
- **peg$parse** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイント。MML文字列を解析し、ASTを生成します。
- **peg$f0** (src/grammar.js): Peggyが生成する内部関数。
- **text** (src/grammar.js): 現在解析中のテキストを取得する内部関数。
- **offset** (src/grammar.js): 現在の解析オフセットを取得する内部関数。
- **range** (src/grammar.js): 現在の解析範囲を取得する内部関数。
- **location** (src/grammar.js): 現在の解析位置情報を取得する内部関数。
- **expected** (src/grammar.js): パーサーが期待する要素のリストを取得する内部関数。
- **error** (src/grammar.js): パーサーエラーを生成する内部関数。
- **peg$getUnicode** (src/grammar.js): Unicode文字を取得する内部関数。
- **peg$literalExpectation** (src/grammar.js): リテラル期待値を作成する内部関数。
- **peg$classExpectation** (src/grammar.js): 文字クラス期待値を作成する内部関数。
- **peg$anyExpectation** (src/grammar.js): 任意の文字期待値を作成する内部関数。
- **peg$endExpectation** (src/grammar.js): 入力終了期待値を作成する内部関数。
- **peg$otherExpectation** (src/grammar.js): その他の期待値を作成する内部関数。
- **peg$computePosDetails** (src/grammar.js): 位置詳細を計算する内部関数。
- **peg$computeLocation** (src/grammar.js): 解析位置を計算する内部関数。
- **peg$fail** (src/grammar.js): 解析失敗を処理する内部関数。
- **peg$buildSimpleError** (src/grammar.js): シンプルなパーサーエラーを構築する内部関数。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたパーサーエラーを構築する内部関数。
- **peg$parsestart** (src/grammar.js): MML解析の開始ルールに関連する内部関数。
- **peg$parsenote** (src/grammar.js): MMLの音符ルールに関連する内部関数。
- **peg$throw** (src/grammar.js): パーサーのエラーをスローする内部関数。
- **constructor** (src/grammar.js): Peggy生成パーサーのコンストラクタに関連する内部関数。
- **start** (src/grammar.pegjs): MML文法の開始ルールを定義。
- **note** (src/grammar.pegjs): MML文法の音符ルールを定義。
- **mml2json** (src/mml2json.js): MML文字列を解析し、Tone.jsシーケンサー形式のJSONデータに変換する主要な関数。
- **compileMmlToCommands** (src/mml2json.js): MMLから抽象的なコマンドリストをコンパイルする。
- **getMmlCommands** (src/mml2json.js): MMLコマンドのリストを取得する。
- **calcAttackToReleaseTicks** (src/mml2json.js): アタックからリリースまでのティック数を計算する。
- **repeat** (src/mml2json.js): 指定された回数だけ処理を繰り返すためのヘルパー関数。
- **toInt** (src/mml2json.js): 値を整数に変換するヘルパー関数。
- **calcDuration** (src/mml2json.js): 音楽イベントのデュレーション（長さ）を計算する。
- **calcStartTick** (src/mml2json.js): イベントの開始ティック（時間単位）を計算する。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増加させる。
- **calcLtick** (src/mml2json.js): Lティック（最小時間単位）を計算する。
- **getNodeId** (src/mml2json.js): ノードの一意なIDを取得する。
- **play** (src/play.js): 変換されたTone.js JSONデータを受け取り、Web Audio APIを介してMML音楽を再生する関数。
- **sub** (src/play.js): `play`関数内で使用される補助的な処理を行う関数。

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
Generated at: 2025-07-28 07:03:51 JST
