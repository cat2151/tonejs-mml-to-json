Last updated: 2025-08-01

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Web Audio APIライブラリTone.jsが解釈可能なJSONシーケンサー形式に変換するツールです。
- このプロジェクトは、MMLパーサーと、ブラウザ上での変換・再生機能を提供し、MML音楽表現のWeb上での活用を可能にします。
- 自動化されたドキュメント生成、多言語翻訳、開発管理機能を組み込み、効率的な開発と利用体験をサポートしています。

## 技術スタック
- フロントエンド:
  - HTML5: ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
  - Tone.js: Web Audio APIを抽象化し、ブラウザ上で高機能なオーディオ処理とシーケンスを可能にするJavaScriptライブラリです。
  - Tone.js CDN: unpkgを通じてTone.jsライブラリを配信し、ウェブページへの容易な組み込みを実現します。
  - Web Audio API: ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて間接的に利用されます。
- 音楽・オーディオ:
  - Tone.js: 音楽シーケンスとオーディオ合成のコアエンジンとして機能します。
  - MML (Music Macro Language): 音楽をテキストベースで記述するための記法で、このプロジェクトの主要な入力形式です。
- 開発ツール:
  - Node.js runtime: JavaScriptコードの実行環境として、開発スクリプトやビルドプロセスに利用されます。
  - npm scripts: プロジェクトのビルド、テスト、ドキュメント生成などのタスクを自動化するためのコマンドラインインターフェースです。
  - pnpm: 効率的なパッケージ管理を実現し、依存関係のインストールを高速化します。
  - Google Generative AI: プロジェクトの文書生成を支援するAIサービスです。
  - @octokit/rest: GitHub APIと連携し、Issue管理やリポジトリ操作を自動化するために使用されます。
- テスト:
  - Vitest: Viteベースの高速なテストフレームワークで、ユニットテストや統合テストの実行に利用されます。
  - TDD (Test-Driven Development): テスト駆動開発手法を採用し、品質の高いコードベースを維持します。
- ビルドツール:
  - Peggy: PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLからJSONへの変換ロジックの核となるパーサーを生成します。
  - PEG文法定義: MMLの音楽記法を解析するための文法ルールを定義し、Peggyによってパーサーが生成されます。
- 言語機能:
  - ES Modules: モダンなJavaScriptのモジュールシステムを採用し、コードの再利用性と保守性を高めています。
- 自動化・CI/CD:
  - GitHub Actions: CI/CD (継続的インテグレーション/継続的デリバリー) パイプラインを自動化するツールで、以下のワークフローが含まれます。
    - プロジェクト要約自動生成: プロジェクト概要やドキュメントを自動的に生成します。
    - Issue自動管理: GitHub Issuesのライフサイクル管理を自動化します。
    - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
    - i18n automation: 国際化対応のための翻訳プロセスを自動化します。
- 開発標準:
  - EditorConfig: 異なるIDEやエディタ間でコードの書式設定（インデント、改行など）を統一するための設定ファイルです。

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
- **.editorconfig**: 複数の開発者が異なるエディタやIDEを使用しても、コードのインデントスタイルや文字エンコーディングなどの書式設定を統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象から外すファイルやディレクトリを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイルで、ソフトウェアの利用、配布、変更に関する条件を定めます。
- **README.ja.md**: プロジェクトの概要、使い方、セットアップ方法などが日本語で記述された説明書です。
- **README.md**: プロジェクトの概要、使い方、セットアップ方法などが英語で記述された説明書です。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関する情報が記述されたディレクトリ固有のREADMEファイルです。
- **dev-setup/setup.js**: 開発環境のセットアップや初期化に関連するスクリプトです。Vitestやパーサーに関連する初期設定を行う可能性があります。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し階層を視覚的に表現した、拡張されたインタラクティブなHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用されるJavaScriptファイルで、関数呼び出しグラフの描画、操作、情報表示ロジックを含みます。ノードの配置、情報の表示/非表示、GitHub URL生成などの機能を提供します。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗が記述されたドキュメントです。
- **generated-docs/project-overview.md**: このプロジェクト概要自体が自動生成されて保存されるドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメント（特に呼び出しグラフ）のスタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートにある、デモやアプリケーションの主要なエントリーポイントとなるHTMLファイルです。
- **issue-notes/**: GitHub Issuesに関連するメモや詳細情報がMarkdown形式で格納されているディレクトリです。開発者向けの追跡情報として利用されます。
- **package.json**: Node.jsプロジェクトの設定ファイルで、プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発スクリプトなどを定義します。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係の正確なバージョンとツリー構造を記録し、再現可能なビルドを保証します。
- **src/grammar.js**: Peggyによって`src/grammar.pegjs`から生成されたJavaScriptファイルで、MMLを解析するためのパーサーの実装が含まれます。MML文字列を抽象構文木（AST）に変換するコアロジックです。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則を記述したPEG (Parsing Expression Grammar) ファイルです。`src/grammar.js`を生成するためのソースとなります。
- **src/index.html**: `src`ディレクトリ内のデモやメインアプリケーションのHTMLファイルです。おそらくルートの`index.html`から読み込まれます。
- **src/main.js**: メインのJavaScriptエントリスクリプトで、アプリケーションの初期化や主要な処理の呼び出しを行う可能性があります。
- **src/mml2json.js**: MMLの解析結果をTone.jsのJSONシーケンサー形式に変換する主要なロジックが実装されているファイルです。音符、休符、テンポなどのMMLコマンドをTone.jsが理解できるデータ構造にマッピングします。
- **src/play.js**: 変換されたTone.js JSONデータを使用して、実際にブラウザ上で音楽を再生する機能を提供するファイルです。Tone.jsのAPIを介してオーディオ再生を制御します。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーのテストケースが記述されたファイルです。Vitestフレームワークを使用してテストが実行されます。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行オプションや環境設定を定義します。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的な`catch`ブロックの関数表現です。特定の処理中に発生した例外を捕捉し、適切なエラー処理を行います。
- **escapeHtml (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、文字列を安全にHTMLに埋め込むためのユーティリティ関数です。スクリプトインジェクション攻撃などを防ぎます。
- **getLayoutConfig (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトに関する設定を取得する関数です。グラフの表示方法や要素の配置に影響する情報を返します。
- **placeCentralNode (generated-docs/callgraph.js)**: 呼び出しグラフの中心となるノードを配置する関数です。グラフの視覚的な開始点やフォーカスポイントを決定します。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ内の特定のノード（関数など）に関する詳細情報を表示する関数です。ノードがクリックされた際などに呼び出されます。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ内の特定のエッジ（呼び出し関係）に関する詳細情報を表示する関数です。エッジがクリックされた際などに呼び出されます。
- **hideInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを非表示にする関数です。ユーザーが情報を閉じた際に利用されます。
- **showInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルを表示する関数です。詳細情報をユーザーに提示する際に利用されます。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報表示パネルの表示/非表示を切り替える関数です。
- **generateGitHubURL (generated-docs/callgraph.js)**: 特定のコード要素（関数、ファイルなど）に対応するGitHubリポジトリ上のURLを生成する関数です。
- **resetLayout (generated-docs/callgraph.js)**: 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの動きを監視し、オーバーラップ（重なり）を修正する処理をラップする関数です。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: 呼び出しグラフ内のノードが移動した際に、他のノードとの重なりを検出し、修正するロジックを実装した関数です。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: 呼び出しグラフ内のノードの重なりを解消するための具体的なアルゴリズムを実行する関数です。
- **switchLayout (generated-docs/callgraph.js)**: 呼び出しグラフの表示レイアウトを切り替える関数です（例：ツリーレイアウトからフォースダイレクトレイアウトへ）。
- **resetNodeStates (generated-docs/callgraph.js)**: 呼び出しグラフ内の各ノードの状態（選択状態、ハイライトなど）をリセットする関数です。
- **fitToContent (generated-docs/callgraph.js)**: 呼び出しグラフ全体が表示領域に収まるようにズームレベルや位置を調整する関数です。
- **toggleNodeLabels (generated-docs/callgraph.js)**: 呼び出しグラフ内のノードラベルの表示/非表示を切り替える関数です。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先（callee）の場所に基づいてグラフの表示をフィルタリングする機能を切り替える関数です。
- **replace (generated-docs/callgraph.js)**: 文字列内の特定のパターンを置換するユーティリティ関数です。
- **mml2json (src/mml2json.js)**: MML文字列を解析し、Tone.jsが解釈できるJSON形式のシーケンスデータに変換する主要な関数です。音符、リズム、テンポなどのMML要素をTone.jsのイベントとして構造化します。
- **compileMmlToCommands (src/mml2json.js)**: MML文字列を、処理しやすい中間的なコマンドリストにコンパイルする関数です。
- **getMmlCommands (src/mml2json.js)**: MMLパーサーから得られた結果を基に、MMLコマンドのリストを生成する関数です。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のアタックからリリースまでのティック数を計算する関数です。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号を処理し、指定された回数分コマンドを複製する関数です。
- **toInt (src/mml2json.js)**: 値を整数に変換するユーティリティ関数です。
- **calcDuration (src/mml2json.js)**: MMLの音符の長さから、対応する内部的な持続時間（ティック数など）を計算する関数です。
- **calcStartTick (src/mml2json.js)**: 各MMLイベントが開始するティック位置を計算する関数です。
- **increaseStartTick (src/mml2json.js)**: 現在の開始ティック位置を指定された量だけ進める関数です。
- **calcLtick (src/mml2json.js)**: MMLにおける音符の長さ（L）コマンドに基づいてティック値を計算する関数です。
- **getNodeId (src/mml2json.js)**: 各ノード（音符やコマンド）に一意のIDを割り当てる関数です。
- **play (src/play.js)**: MMLから変換されたTone.js JSONデータを読み込み、Web Audio APIを介して実際に音楽を再生する機能を提供する関数です。
- **sub (src/play.js)**: おそらく、音楽再生におけるサブパートやサブシーケンスを処理する関数、または補助的な計算を行う関数です。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数です。Peggyパーサー内部で文字コードの解析などに使われる可能性があります。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数です。
- **literalEscape (src/grammar.js)**: リテラル文字列のエスケープ処理を行う関数です。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープ処理を行う関数です。
- **describeExpectation (src/grammar.js)**: パーサーが期待する入力を記述する際に使用される関数です。
- **describeExpected (src/grammar.js)**: 期待される入力に関する詳細を記述する関数です。
- **describeFound (src/grammar.js)**: 実際に見つかった入力を記述する関数です。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたMMLパーサーのメインエントリポイント関数です。MML文字列を入力として受け取り、解析を実行します。
- **peg$f0 (src/grammar.js)**: Peggyパーサー内部で生成される無名関数（ファクトリー関数）の一つで、特定の構文ルールに関連する処理を行います。
- **text (src/grammar.js)**: 現在解析中のテキストを取得する関数です。
- **offset (src/grammar.js)**: 現在の解析位置のオフセットを取得する関数です。
- **range (src/grammar.js)**: 現在の解析範囲を取得する関数です。
- **location (src/grammar.js)**: 現在の解析位置の行番号や列番号などの詳細な場所情報を取得する関数です。
- **expected (src/grammar.js)**: パーサーが次に期待する入力を表す関数です。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するための内部ヘルパー関数です。
- **peg$literalExpectation (src/grammar.js)**: 特定のリテラル文字列の期待値を表現する関数です。
- **peg$classExpectation (src/grammar.js)**: 文字クラスの期待値を表現する関数です。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字の期待値を表現する関数です。
- **peg$endExpectation (src/grammar.js)**: 入力終了の期待値を表現する関数です。
- **peg$otherExpectation (src/grammar.js)**: その他の種類の期待値を表現する関数です。
- **peg$computePosDetails (src/grammar.js)**: 解析位置の詳細情報を計算する内部関数です。
- **peg$computeLocation (src/grammar.js)**: 解析位置のロケーション情報を計算する内部関数です。
- **peg$fail (src/grammar.js)**: パーシングが失敗した際にエラーを生成する関数です。
- **peg$buildSimpleError (src/grammar.js)**: 単純なパーシングエラーメッセージを構築する関数です。
- **peg$buildStructuredError (src/grammar.js)**: 構造化されたパーシングエラーメッセージを構築する関数です。
- **peg$parsestart (src/grammar.js)**: MMLパーサーの`start`ルールを実行する内部関数です。
- **peg$parsenote (src/grammar.js)**: MMLパーサーの`note`ルールを実行する内部関数です。
- **peg$throw (src/grammar.js)**: パーシングエラーをスローする内部関数です。
- **start (src/grammar.pegjs)**: MML文法における開始ルールです。MML文字列全体の解析のエントリーポイントとなります。
- **note (src/grammar.pegjs)**: MML文法における音符（note）を定義するルールです。

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
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-08-01 07:03:55 JST
