Last updated: 2025-07-18

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をTone.jsのJSONシーケンサーフォーマットに変換するツールです。
- Web Audio APIと連携し、ブラウザ上でMMLベースの楽曲再生を可能にします。
- 音楽プログラミングとウェブオーディオ技術を組み合わせた効率的な開発を支援します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの基盤を提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを活用した強力な音声ライブラリです。Tone.js CDNを通じて提供され、MML (Music Macro Language) の記法をWeb Audio APIで再生可能にします。
- 開発ツール: Node.js runtime - JavaScriptの実行環境です。npm scripts - タスク自動化のためのスクリプトです。pnpm - 高速で効率的なパッケージマネージャーです。Google Generative AI - ドキュメント生成を支援します。@octokit/rest - GitHub APIとの連携に利用します。
- テスト: Vitest - 高速なViteベースのテストフレームワークです。TDD (Test-Driven Development) - テスト駆動開発手法を採用しています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターです。PEG文法定義 - MML音楽記法のパーサー生成に利用されます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムです。
- 自動化・CI/CD: GitHub Actions - プロジェクトのCI/CD自動化ツールです。プロジェクト要約の自動生成、Issueの自動管理、READMEの多言語翻訳、i18n automationといったワークフローが定義されています。
- 開発標準: EditorConfig - コードの統一ルールを定義し、開発者間のコードスタイルを維持します。

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
  📖 2.md
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
- **.editorconfig**: 異なるエディタやIDEを使用する開発者間で、コードスタイルの一貫性を保つための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、使用方法、デモリンクなどが日本語で記述された説明書です。
- **README.md**: プロジェクトの概要、使用方法、デモリンクなどが英語で記述された説明書です。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記述されています。
- **dev-setup/setup.js**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数の呼び出し関係を可視化したインタラクティブなHTMLファイルです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`のインタラクティブ機能（グラフ描画、情報表示、レイアウト制御など）を実装するJavaScriptファイルです。
- **generated-docs/development-status.md**: プロジェクトの開発状況に関するドキュメントです。
- **generated-docs/project-overview.md**: 生成されたプロジェクト概要ドキュメント（この出力自体）が格納されるファイルです。
- **generated-docs/style.css**: 生成されたドキュメントのスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトの公開デモやメインアプリケーションのエントリポイントとなるHTMLファイルです。
- **issue-notes/** (複数のMarkdownファイル): GitHub Issuesのメモや詳細が記述されたファイル群ですが、来訪者向け情報としては含みません。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されているnpm/pnpmの設定ファイルです。
- **pnpm-lock.yaml**: `pnpm`が使用する厳密な依存関係の解決結果を記録するロックファイルです。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって生成された、MMLをパースするためのJavaScriptパーサーです。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文を定義するParsing Expression Grammar (PEG) ファイルです。
- **src/index.html**: `src`ディレクトリ内に含まれるHTMLファイルで、MMLの入力インターフェースや再生機能のUIを提供する可能性があります。
- **src/main.js**: アプリケーションのメインエントリポイントとなるJavaScriptファイルです。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する主要なロジックを実装したJavaScriptファイルです。
- **src/play.js**: 生成されたTone.js JSONフォーマットのデータを実際にWeb Audio API (Tone.js) を使って再生するロジックを実装したJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの動作を検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (`dev-setup/setup.js`, `src/play.js`): エラーが発生した際に処理を捕捉し、適切なエラーハンドリングを行うためのブロックまたは関数です。
- **escapeHtml** (`generated-docs/callgraph.js`): HTML特殊文字をエスケープし、セキュリティ脆弱性（XSSなど）を防ぐために使用されます。
- **getLayoutConfig** (`generated-docs/callgraph.js`): 呼び出しグラフの表示レイアウトに関する設定を取得します。
- **showNodeInfo** (`generated-docs/callgraph.js`): グラフ内のノード（関数など）に関する詳細情報を表示するパネルを制御します。
- **showEdgeInfo** (`generated-docs/callgraph.js`): グラフ内のエッジ（関数呼び出し関係など）に関する詳細情報を表示するパネルを制御します。
- **hideInfoPanel** (`generated-docs/callgraph.js`): 情報表示パネルを非表示にします。
- **showInfoPanel** (`generated-docs/callgraph.js`): 情報表示パネルを表示します。
- **toggleInfoPanel** (`generated-docs/callgraph.js`): 情報表示パネルの表示/非表示を切り替えます。
- **generateGitHubURL** (`generated-docs/callgraph.js`): GitHub上の関連リソースへのURLを生成します。
- **resetLayout** (`generated-docs/callgraph.js`): 呼び出しグラフのレイアウトを初期状態にリセットします。
- **switchLayout** (`generated-docs/callgraph.js`): 呼び出しグラフの表示レイアウト方式を切り替えます。
- **fitToContent** (`generated-docs/callgraph.js`): グラフ全体が画面内に収まるようにズームレベルを調整します。
- **toggleNodeLabels** (`generated-docs/callgraph.js`): グラフノードのラベル（関数名など）の表示/非表示を切り替えます。
- **toggleCalleeLocationFilter** (`generated-docs/callgraph.js`): 呼び出し先のファイルパスなどによるフィルタリングの有効/無効を切り替えます。
- **replace** (`generated-docs/callgraph.js`): 文字列の置換処理を行う汎用関数です。
- **ready** (`generated-docs/callgraph.js`): DOM (Document Object Model) が完全に読み込まれ、操作可能になった際に実行されるイベントハンドラです。
- **addListener** (`generated-docs/callgraph.js`): 特定のイベントに対するリスナー（イベント発生時に実行される関数）を追加します。
- **hex** (`src/grammar.js`): 16進数に関連する処理を行います。MMLパーサーの内部で文字コードや数値の解釈に利用されます。
- **unicodeEscape** (`src/grammar.js`): Unicodeエスケープシーケンスを処理します。
- **literalEscape** (`src/grammar.js`): リテラル文字列のエスケープ処理を行います。
- **classEscape** (`src/grammar.js`): 文字クラスのエスケープ処理を行います。
- **describeExpectation** (`src/grammar.js`): パース時に期待される構文に関する説明を生成します。
- **describeExpected** (`src/grammar.js`): 期待された構文要素の情報を記述します。
- **describeFound** (`src/grammar.js`): 実際にパースされた構文要素の情報を記述します。
- **peg$parse** (`src/grammar.js`): Peggyによって生成された、MML文字列を解析し、抽象構文木（AST）を構築する主要なパーシング関数です。
- **peg$f0** (`src/grammar.js`): Peggyパーサーの内部で使われる匿名関数やクロージャを指します。
- **text** (`src/grammar.js`): パース中の現在のテキスト内容を取得します。
- **offset** (`src/grammar.js`): パース中の現在のオフセット（位置）を取得します。
- **range** (`src/grammar.js`): パース中のテキストの範囲情報を取得します。
- **location** (`src/grammar.js`): パース中のコード上の位置情報（行、列）を取得します。
- **expected** (`src/grammar.js`): パースエラー時に期待された構文要素の情報を取得します。
- **error** (`src/grammar.js`): パースエラーオブジェクトを生成します。
- **peg$getUnicode** (`src/grammar.js`): Unicode文字に関する情報を取得します。
- **peg$literalExpectation** (`src/grammar.js`): リテラル文字列に関する構文の期待値を定義します。
- **peg$classExpectation** (`src/grammar.js`): 文字クラスに関する構文の期待値を定義します。
- **peg$anyExpectation** (`src/grammar.js`): 任意の文字に関する構文の期待値を定義します。
- **peg$endExpectation** (`src/grammar.js`): 入力の終端に関する構文の期待値を定義します。
- **peg$otherExpectation** (`src/grammar.js`): その他の構文の期待値を定義します。
- **peg$computePosDetails** (`src/grammar.js`): パース中の詳細な位置情報（行、列など）を計算します。
- **peg$computeLocation** (`src/grammar.js`): コード上の正確な位置情報を計算します。
- **peg$fail** (`src/grammar.js`): パースが失敗した際に呼び出される内部関数です。
- **peg$buildSimpleError** (`src/grammar.js`): シンプルなパースエラーオブジェクトを構築します。
- **peg$buildStructuredError** (`src/grammar.js`): 構造化された詳細なパースエラーオブジェクトを構築します。
- **peg$parsestart** (`src/grammar.js`): MML構文解析の開始点となるルール`start`をパースするための内部関数です。
- **peg$parsenote** (`src/grammar.js`): MMLの音符（ノート）をパースするための内部関数です。
- **peg$throw** (`src/grammar.js`): パース中にエラーをスローします。
- **format** (`src/grammar.js`): 文字列のフォーマットを行います。
- **buildMessage** (`src/grammar.js`): エラーメッセージなどの表示用メッセージを構築します。
- **start** (`src/grammar.pegjs`): MMLのパース処理の開始点となるPEG文法ルールです。
- **note** (`src/grammar.pegjs`): MMLの音符を解析するためのPEG文法ルールです。
- **mml2json** (`src/mml2json.js`): MML文字列をTone.js JSONシーケンサーフォーマットに変換するプロジェクトの中心的な関数です。
- **compileMmlToCommands** (`src/mml2json.js`): MMLを解析し、内部処理用のコマンドリストにコンパイルします。
- **getMmlCommands** (`src/mml2json.js`): コンパイルされたMMLコマンドのリストを取得します。
- **calcAttackToReleaseTicks** (`src/mml2json.js`): 音符のアタックからリリースまでのティック数を計算します。
- **repeat** (`src/mml2json.js`): MMLの繰り返し記号に対応し、指定された処理を繰り返します。
- **toInt** (`src/mml2json.js`): 文字列を整数に変換するユーティリティ関数です。
- **calcDuration** (`src/mml2json.js`): 音符の持続時間を計算します。
- **calcStartTick** (`src/mml2json.js`): 音符の開始ティック（時間単位）を計算します。
- **increaseStartTick** (`src/mml2json.js`): 開始ティックを増加させます。
- **calcLtick** (`src/mml2json.js`): MMLのLコマンド（音長）に対応するティック値を計算します。
- **getNodeId** (`src/mml2json.js`): ノードのユニークなIDを生成または取得します。
- **sort** (`src/mml2json.js`): 配列をソートする汎用関数です。
- **play** (`src/play.js`): Tone.jsライブラリを使用して、生成されたMMLデータをWeb Audio API経由で再生するメイン関数です。
- **sub** (`src/play.js`): 再生ロジック内で使用される補助的な関数または減算処理です。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
  - on ()
    - escapeHtml (generated-docs/callgraph.js)
      - getLayoutConfig ()
      - showNodeInfo ()
      - showEdgeInfo ()
      - hideInfoPanel ()
      - showInfoPanel ()
      - toggleInfoPanel ()
      - generateGitHubURL ()
      - resetLayout ()
      - switchLayout ()
      - fitToContent ()
      - toggleNodeLabels ()
      - toggleCalleeLocationFilter ()
      - replace ()
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
  - format ()
  - buildMessage ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-07-18 07:03:48 JST
