Last updated: 2025-08-17

```markdown
# Project Overview

## プロジェクト概要
- `tonejs-mml-to-json`は、MML（Music Macro Language）記法をWeb Audio APIベースの音楽ライブラリTone.jsが利用できるJSONシーケンサー形式に変換するツールです。
- このプロジェクトは、ブラウザ上でMMLによる音楽の定義と再生を可能にし、フロントエンドでのインタラクティブな音楽体験を支援します。
- コードの品質管理、自動テスト、CI/CD、多言語対応、AIを活用したドキュメント生成など、堅牢な開発プロセスと運用体制が確立されています。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築します。
- 音楽・オーディオ: **Tone.js** - Web Audio APIをラップした高機能な音声ライブラリで、音楽シーケンスやシンセサイザーの制御に使用されます。**Tone.js CDN** - unpkg経由でTone.jsライブラリを配信し、手軽な利用を可能にします。**MML (Music Macro Language)** - 音楽記法としてMMLが使用され、このプロジェクトの主要なパーシング対象です。**Web Audio API** - ブラウザに標準搭載された音声処理APIで、Tone.jsを通じて利用されます。
- 開発ツール: **Node.js runtime** - JavaScriptの実行環境として、開発スクリプトやパッケージ管理に利用されます。**npm scripts** - パッケージのビルド、テスト、ドキュメント生成などのタスクを自動化するために使用されるコマンドラインスクリプトです。**pnpm** - 高速かつ効率的なNode.jsパッケージマネージャーとして、プロジェクトの依存関係を管理します。**Google Generative AI** - AIを活用した文書生成や要約サポートに利用されます。**@octokit/rest** - GitHub APIと連携し、リポジトリの操作や自動化タスクを実行します。
- テスト: **Vitest** - 高速なViteベースのテストフレームワークで、プロジェクトの単体テストや統合テストに使用されます。**TDD (Test-Driven Development)** - テストを先に記述し、それに合わせてコードを開発する手法が採用され、コードの品質と信頼性を高めます。
- ビルドツール: **Peggy** - PEG (Parsing Expression Grammar) パーサージェネレーターで、MML記法の解析エンジンを自動生成するために使用されます。**PEG文法定義** - MML音楽記法を正確に解析するための文法ルールが定義されています。
- 言語機能: **ES Modules** - モダンなJavaScriptモジュールシステムが採用されており、コードのモジュール化と再利用性を向上させます。
- 自動化・CI/CD: **GitHub Actions** - 継続的インテグレーション/継続的デリバリー (CI/CD) の自動化プラットフォームとして、テスト実行、ドキュメント生成、翻訳、Issue管理などのワークフローが設定されています。**プロジェクト要約自動生成** - AIを活用し、プロジェクトの概要を自動生成するワークフローです。**Issue自動管理** - GitHub Issuesのライフサイクルを自動化するワークフローです。**README多言語翻訳** - READMEファイルを自動で多言語に翻訳するワークフローです。**i18n automation** - 国際化（i18n）関連の自動翻訳ワークフローを指します。
- 開発標準: **EditorConfig** - 異なるIDEやエディタ間でコードの整形ルール（インデント、改行コードなど）を統一するために使用されます。

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
- **.editorconfig**: 異なるエディタやIDEを使用する開発者間で、インデントスタイル、文字コード、改行コードなどのコードフォーマットを統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトのライセンス情報（例: MIT License）を記述したファイルです。プロジェクトの利用条件や再配布の規則を明示します。
- **README.ja.md**: プロジェクトの日本語版の概要、使い方、セットアップ方法などを説明するマークダウンファイルです。
- **README.md**: プロジェクトの英語版の概要、使い方、セットアップ方法などを説明するマークダウンファイルです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や開発者向けの追加情報を提供します。
- **dev-setup/setup.js**: 開発環境の初期設定やテスト環境の準備など、開発支援のためのスクリプトが含まれています。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層を視覚的に表現した、拡張版のHTMLドキュメントです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフのデータを処理し、視覚化ロジックを提供するJavaScriptファイルです。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況、進行中の作業、計画などを記述したマークダウンファイルです。
- **generated-docs/project-overview.md**: このプロンプトによって自動生成されるプロジェクトの概要を格納するマークダウンファイルです。
- **generated-docs/style.css**: generated-docsディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。
- **index.html**: プロジェクトのメインエントリポイントまたはデモページとなるHTMLファイルです。
- **issue-notes/**: GitHub Issuesから自動生成されたメモや関連情報が格納されるディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発依存関係、およびnpmスクリプトを定義するファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成される、プロジェクトの依存関係の正確なツリー構造とバージョンを固定するためのロックファイルです。
- **src/grammar.js**: Peggyによって`src/grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータに変換する役割を担います。
- **src/grammar.pegjs**: MML（Music Macro Language）の文法ルールをParsing Expression Grammar (PEG) 形式で定義するファイルです。このファイルからパーサーが生成されます。
- **src/index.html**: `src`ディレクトリ内のHTMLファイルで、おそらくメインアプリケーションのデモや特定の機能のテストに使われるものです。
- **src/main.js**: アプリケーションの主要なロジックや初期化処理をまとめるエントリポイントとなるJavaScriptファイルです。
- **src/mml2json.js**: MML記法をTone.jsが解釈できるJSONシーケンサー形式に変換するコアロジックを実装したJavaScriptファイルです。
- **src/play.js**: 変換されたMMLのJSONデータを使用して、Tone.jsを通じて音楽を再生する機能を提供するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードが記述されたファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テスト実行時のオプションやプラグインなどが定義されます。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラー発生時に例外を捕捉し、適切な処理（ログ記録など）を行うための汎用的なエラーハンドリング関数です。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、ブラウザでの安全な表示を可能にするユーティリティ関数です。引数: `htmlString` (文字列)。戻り値: エスケープされた文字列。
- **getLayoutConfig** (generated-docs/callgraph.js): グラフのレイアウトに関する設定情報を取得する関数です。引数: なし。戻り値: レイアウト設定オブジェクト。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心となるノードを配置するための関数です。引数: `node` (ノードオブジェクト)。戻り値: なし。
- **showNodeInfo** (generated-docs/callgraph.js): グラフ内の特定のノードに関する情報をUIパネルに表示する関数です。引数: `node` (ノードオブジェクト)。戻り値: なし。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフ内の特定のエッジ（線）に関する情報をUIパネルに表示する関数です。引数: `edge` (エッジオブジェクト)。戻り値: なし。
- **hideInfoPanel** (generated-docs/callgraph.js): UI上の情報表示パネルを非表示にする関数です。引数: なし。戻り値: なし。
- **showInfoPanel** (generated-docs/callgraph.js): UI上の情報表示パネルを表示する関数です。引数: なし。戻り値: なし。
- **toggleInfoPanel** (generated-docs/callgraph.js): UI上の情報表示パネルの表示/非表示を切り替える関数です。引数: なし。戻り値: なし。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリへのURLを生成する関数です。引数: なし (またはリポジトリ情報)。戻り値: GitHub URL文字列。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする関数です。引数: なし。戻り値: なし。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを解決する処理のラッパー関数です。引数: なし。戻り値: なし。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの動きを監視し、重なりが発生した場合に位置を調整して解決する関数です。引数: なし。戻り値: なし。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): グラフ内のノードの重なりを検出し、解消する関数です。引数: なし。戻り値: なし。
- **switchLayout** (generated-docs/callgraph.js): グラフの表示レイアウトを切り替える関数です。引数: `layoutType` (文字列)。戻り値: なし。
- **resetNodeStates** (generated-docs/callgraph.js): グラフ内のノードの状態（選択状態など）をリセットする関数です。引数: なし。戻り値: なし。
- **fitToContent** (generated-docs/callgraph.js): グラフの表示領域をコンテンツ全体に合わせて調整する関数です。引数: なし。戻り値: なし。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードのラベルの表示/非表示を切り替える関数です。引数: なし。戻り値: なし。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先のロケーションに基づいてフィルタリングを切り替える関数です。引数: なし。戻り値: なし。
- **replace** (generated-docs/callgraph.js): 文字列の置換を行うユーティリティ関数です。引数: `originalString`, `searchString`, `replaceString`。戻り値: 置換後の文字列。
- **function** (generated-docs/callgraph.js): 汎用的な関数定義の一部として出現するキーワードです。具体的な機能はコンテキストによる。
- **max** (generated-docs/callgraph.js): 複数の値の中から最大値を取得する関数です。引数: 可変長引数。戻り値: 最大値。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定するための関数です。引数: `eventType`, `callback`。戻り値: なし。
- **if** (generated-docs/callgraph.js): 条件分岐を行うための制御フローキーワードです。具体的な機能はコンテキストによる。
- **for** (generated-docs/callgraph.js): ループ処理を行うための制御フローキーワードです。具体的な機能はコンテキストによる。
- **ready** (generated-docs/callgraph.js): ドキュメントがロードされ、準備が完了した際に実行されるコールバックを設定する関数です。引数: なし。戻り値: なし。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加するための関数です。引数: `event`, `listener`。戻り値: なし。
- **mml2json** (src/mml2json.js): MML文字列を解析し、Tone.jsのシーケンサーが扱えるJSON形式の音楽データに変換するメイン関数です。引数: `mmlString` (MML文字列)。戻り値: JSON形式の音楽データオブジェクト。
- **compileMmlToCommands** (src/mml2json.js): MML文字列を内部的なコマンドリストにコンパイルする関数です。引数: `mmlString`。戻り値: コマンドの配列。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々の音楽コマンドを抽出する関数です。引数: `mmlString`。戻り値: コマンドの配列。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符のアタック（発音）からリリース（消音）までのティック数を計算する関数です。引数: `noteDuration`, `releaseRatio`。戻り値: ティック数。
- **repeat** (src/mml2json.js): 指定された回数だけ処理を繰り返すためのヘルパー関数です。引数: `count`, `callback`。戻り値: なし。
- **toInt** (src/mml2json.js): 文字列を整数値に変換するユーティリティ関数です。引数: `str` (文字列)。戻り値: 整数。
- **calcDuration** (src/mml2json.js): 音符の長さ（デュレーション）を計算する関数です。引数: `durationString`, `baseTick`。戻り値: ティック数。
- **calcStartTick** (src/mml2json.js): 音符の開始ティックを計算する関数です。引数: `currentTick`, `noteDuration`。戻り値: 開始ティック。
- **increaseStartTick** (src/mml2json.js): 現在の開始ティックを次のイベントのために増加させる関数です。引数: `currentTick`, `increment`。戻り値: 更新されたティック数。
- **calcLtick** (src/mml2json.js): MMLのLコマンド（音符の長さ指定）を処理し、対応するティック値を計算する関数です。引数: `lValue`。戻り値: ティック数。
- **getNodeId** (src/mml2json.js): ノードに一意のIDを付与または取得するための内部関数です。引数: `node`。戻り値: ID。
- **sort** (src/mml2json.js): 配列をソートするための汎用的な関数です。引数: `array`, `compareFunction`。戻り値: ソートされた配列。
- **play** (src/play.js): 変換されたJSON音楽データを受け取り、Tone.jsを使用して実際に音を再生する関数です。引数: `jsonData` (JSON音楽データ)。戻り値: なし。
- **sub** (src/play.js): `play`関数内で使用される補助的な関数です。具体的な機能は、音楽再生ロジックの一部を分離したものと推測されます。引数: コンテキストによる。戻り値: コンテキストによる。
- **hex** (src/grammar.js): 16進数処理に関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理するパーサー内部関数です。引数: なし。戻り値: なし。
- **literalEscape** (src/grammar.js): リテラルエスケープシーケンスを処理するパーサー内部関数です。引数: なし。戻り値: なし。
- **classEscape** (src/grammar.js): 文字クラスのエスケープシーケンスを処理するパーサー内部関数です。引数: なし。戻り値: なし。
- **describeExpectation** (src/grammar.js): パーシングエラー発生時に期待される入力の記述を生成するパーサー内部関数です。引数: `expectation`。戻り値: 記述文字列。
- **describeExpected** (src/grammar.js): 期待される文字やパターンの説明を生成するパーサー内部関数です。引数: `expected`。戻り値: 記述文字列。
- **describeFound** (src/grammar.js): 実際に見つかった文字やパターンの説明を生成するパーサー内部関数です。引数: `found`。戻り値: 記述文字列。
- **peg$parse** (src/grammar.js): Peggyパーサーのメインエントリポイントとなる関数です。MML文字列を解析し、結果を返します。引数: `mmlString`。戻り値: 解析結果のAST（抽象構文木）。
- **peg$f0** (src/grammar.js): Peggyによって生成される内部的なヘルパー関数で、特定のパーシングルールに関連付けられています。引数: なし。戻り値: なし。
- **text** (src/grammar.js): 現在パーサーが処理しているテキストを取得するパーサー内部関数です。引数: なし。戻り値: 文字列。
- **offset** (src/grammar.js): 現在のパーシング位置のオフセットを取得するパーサー内部関数です。引数: なし。戻り値: 数値。
- **range** (src/grammar.js): 現在のパーシング範囲を取得するパーサー内部関数です。引数: なし。戻り値: オブジェクト。
- **location** (src/grammar.js): 現在のパーシング位置の行、列、オフセット情報を取得するパーサー内部関数です。引数: なし。戻り値: オブジェクト。
- **expected** (src/grammar.js): 次に期待される入力の情報を取得するパーサー内部関数です。引数: なし。戻り値: オブジェクト。
- **error** (src/grammar.js): パーシングエラーを生成・報告するためのパーサー内部関数です。引数: `message`, `expected`, `found`, `location`。戻り値: エラーオブジェクト。
- **peg$getUnicode** (src/grammar.js): Unicode文字の処理に関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **peg$literalExpectation** (src/grammar.js): リテラル文字列の期待値を生成するパーサー内部関数です。引数: `value`, `ignoreCase`。戻り値: オブジェクト。
- **peg$classExpectation** (src/grammar.js): 文字クラスの期待値を生成するパーサー内部関数です。引数: `value`, `ignoreCase`, `inverted`。戻り値: オブジェクト。
- **peg$anyExpectation** (src/grammar.js): 任意の一文字の期待値を生成するパーサー内部関数です。引数: なし。戻り値: オブジェクト。
- **peg$endExpectation** (src/grammar.js): 入力の終端の期待値を生成するパーサー内部関数です。引数: なし。戻り値: オブジェクト。
- **peg$otherExpectation** (src/grammar.js): その他の特定の期待値を生成するパーサー内部関数です。引数: `description`。戻り値: オブジェクト。
- **peg$computePosDetails** (src/grammar.js): オフセットから行、列の詳細を計算するパーサー内部関数です。引数: `offset`。戻り値: オブジェクト。
- **peg$computeLocation** (src/grammar.js): 指定された範囲のロケーション情報を計算するパーサー内部関数です。引数: `startOffset`, `endOffset`。戻り値: オブジェクト。
- **peg$fail** (src/grammar.js): パーシングの失敗を記録するパーサー内部関数です。引数: `expectation`。戻り値: なし。
- **peg$buildSimpleError** (src/grammar.js): シンプルなパーシングエラーメッセージを構築するパーサー内部関数です。引数: `message`, `expected`, `found`, `location`。戻り値: エラーオブジェクト。
- **peg$buildStructuredError** (src/grammar.js): 構造化されたパーシングエラーメッセージを構築するパーサー内部関数です。引数: `expected`, `found`, `location`。戻り値: エラーオブジェクト。
- **peg$parsestart** (src/grammar.js): `grammar.pegjs`で定義された`start`ルールに対応するパーシング関数です。MML全体の解析開始点。引数: なし。戻り値: 解析結果。
- **peg$parsenote** (src/grammar.js): `grammar.pegjs`で定義された`note`ルールに対応するパーシング関数です。個々の音符を解析します。引数: なし。戻り値: 解析結果。
- **peg$throw** (src/grammar.js): パーシングエラーをスローするパーサー内部関数です。引数: `error`。戻り値: なし。
- **constructor** (src/grammar.js): オブジェクトのインスタンスを初期化するためのコンストラクタ関数です。引数: コンテキストによる。戻り値: インスタンス。
- **format** (src/grammar.js): メッセージのフォーマットを行うユーティリティ関数です。引数: `formatString`, `...args`。戻り値: フォーマットされた文字列。
- **buildMessage** (src/grammar.js): エラーメッセージを構築するパーサー内部関数です。引数: `expected`, `found`。戻り値: メッセージ文字列。
- **literal** (src/grammar.js): リテラルな文字列のパーシングに関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **class** (src/grammar.js): 文字クラスのパーシングに関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **any** (src/grammar.js): 任意の文字のパーシングに関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **end** (src/grammar.js): 入力終端のパーシングに関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **other** (src/grammar.js): その他のパーシング期待値に関連するパーサー内部関数です。引数: なし。戻り値: なし。
- **switch** (generated-docs/callgraph.js, src/mml2json.js, src/play.js): 複数の条件分岐を処理するための制御フローキーワードです。具体的な機能はコンテキストによる。
- **while** (src/grammar.js): 条件が真である間、処理を繰り返すための制御フローキーワードです。具体的な機能はコンテキストによる。
- **start** (src/grammar.pegjs): PEG文法で定義された、MMLの解析を開始するための最上位ルールです。引数: なし。戻り値: AST。
- **note** (src/grammar.pegjs): PEG文法で定義された、個々のMMLノート（音符）を解析するためのルールです。引数: なし。戻り値: 音符のデータ。

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
Generated at: 2025-08-17 07:03:29 JST
