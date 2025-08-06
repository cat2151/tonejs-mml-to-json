Last updated: 2025-08-07

```markdown
# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Web Audio APIライブラリTone.jsが利用できるJSONシーケンサー形式に変換するツールです。
- 変換された音楽データをブラウザ上で再生するデモンストレーション機能を提供し、Webブラウザを介したインタラクティブな音楽体験を可能にします。
- パーサー生成、テスト駆動開発、CI/CD、多言語翻訳、ドキュメント自動生成など、効率的な開発プロセスと自動化を重視しています。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーの構築とMMLデモの提供に使用)
- 音楽・オーディオ: Tone.js (Web Audio APIを活用した高機能な音声ライブラリ、シーケンサーやシンセサイザー機能を提供), Tone.js CDN (unpkg経由でTone.jsライブラリを配信し、手軽な利用を可能にする), MML (Music Macro Language - 音楽記法パーサーの基盤となる音楽記法), Web Audio API (ブラウザネイティブの音声処理技術、Tone.jsを通じて間接的に利用)
- 開発ツール: Node.js runtime (JavaScriptコードの実行環境として開発プロセス全体をサポート), npm scripts (タスクランナーとしてビルド、テスト、ドキュメント生成などの開発タスクを自動化), pnpm (高速で効率的なパッケージマネージャー、依存関係の管理を最適化), Google Generative AI (AIを活用した文書生成や要約をサポート), @octokit/rest (GitHub APIと連携し、Issue管理やリポジトリ操作を自動化)
- テスト: Vitest (高速なViteベースのテストフレームワーク、ユニットテストや統合テストの実行に使用), TDD (Test-Driven Development - テストを先行して記述する開発手法、品質と信頼性の高いコードを担保)
- ビルドツール: Peggy (PEG (Parsing Expression Grammar) パーサージェネレーター、MML構文解析のためのパーサーを自動生成), PEG文法定義 (MML音楽記法の構文ルールを定義し、Peggyを通じてパーサーを生成)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステム、コードの分割と再利用性を向上)
- 自動化・CI/CD: GitHub Actions (継続的インテグレーション/デプロイメントの自動化プラットフォーム、以下4つのワークフローを含む), プロジェクト要約自動生成 (AIを用いてプロジェクトの要約を自動生成), Issue自動管理 (GitHub Issuesの管理を自動化し、開発ワークフローを効率化), README多言語翻訳 (READMEファイルを複数の言語に自動翻訳し、国際的な利用を促進), i18n automation (多言語化（国際化）の自動化ワークフロー)
- 開発標準: EditorConfig (異なるエディタやIDE間でのコードフォーマットを統一するための設定ファイル)

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
- **.editorconfig**: 開発環境全体でコードのインデント、エンコーディング、改行コードなどのフォーマットルールを統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理システムが追跡しないファイルやディレクトリを指定する設定ファイルです。
- **LICENSE**: プロジェクトの利用、配布、変更に関するライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、目的、使用方法、インストール手順などを日本語で説明するドキュメントです。
- **README.md**: プロジェクトの概要、目的、使用方法、インストール手順などを英語で説明するドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や注意点に関する情報を提供するドキュメントです。
- **dev-setup/setup.js**: 開発環境の初期設定やテスト環境の準備、補助的なスクリプト機能を提供するJavaScriptファイルです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数の呼び出し関係を視覚的に表示するためのインタラクティブなHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で表示される関数呼び出しグラフのロジックを制御するJavaScriptファイルです。ノードの配置、情報パネル表示、レイアウト切り替えなどの機能を提供します。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況、進捗、今後の計画などに関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントやグラフの表示スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのルートに配置されたHTMLファイルで、おそらくデモアプリケーションのメインエントリーポイントとして機能します。
- **issue-notes/**: GitHub Issuesに関連する詳細なメモや補足情報を格納するためのディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、依存関係（dependencies, devDependencies）を定義する設定ファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが生成するロックファイルで、プロジェクトの依存関係ツリーの正確なバージョンとハッシュ情報を記録します。
- **src/grammar.js**: `src/grammar.pegjs`のPEG文法定義からPeggyパーサージェネレーターによって自動生成されたJavaScriptファイルです。MML文字列を解析し、抽象構文木（AST）などの構造化されたデータに変換するパーサーロジックを含みます。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則をPEG (Parsing Expression Grammar) 形式で定義するファイルです。このファイルがパーサー自動生成の元になります。
- **src/index.html**: `src`ディレクトリ内に配置されたHTMLファイルで、MMLの入力・変換・再生を行うメインアプリケーションのUIを提供します。
- **src/main.js**: アプリケーションのメインエントリーポイントとなるJavaScriptファイルです。MMLの入力、`mml2json.js`を介した変換、`play.js`を介した再生処理を連携させます。
- **src/mml2json.js**: MMLパーサー（`src/grammar.js`）が出力した解析結果を、Tone.jsのシーケンサーが解釈できるJSON形式のイベントデータに変換するコアロジックを実装したJavaScriptファイルです。音符のデュレーション計算、タイムスタンプ付与などを行います。
- **src/play.js**: 変換されたTone.js形式のJSONデータを受け取り、Tone.jsライブラリを使用して実際にWeb Audio API経由で音を再生する機能を提供するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの正確性と、MMLからJSONへの変換ロジックの正しさを検証するためのテストスイートです。Vitestを用いて実行されます。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テストの実行環境、モック、カバレッジレポートなどのオプションを定義します。

## 関数詳細説明
- **catch (dev-setup/setup.js)**: エラーハンドリングのための一般的なブロック。何らかの処理中に発生した例外を捕らえ、適切なエラー処理を実行します。
- **escapeHtml (generated-docs/callgraph.js)**: 引数に与えられた文字列内のHTML特殊文字（`<`, `>`, `&`, `'`, `"`など）を、HTMLエンティティに変換し、ブラウザでの安全な表示を保証します。
- **getLayoutConfig (generated-docs/callgraph.js)**: 関数呼び出しグラフの描画に使用されるレイアウト関連の設定情報を取得します。引数なし。
- **placeCentralNode (generated-docs/callgraph.js)**: 関数呼び出しグラフにおいて、中心となるノード（特定の関数）を適切な位置に配置します。引数: なし。
- **showNodeInfo (generated-docs/callgraph.js)**: グラフ内の特定のノード（関数）が選択された際、その関数に関する詳細情報（ファイルパス、行数、説明など）を情報パネルに表示します。引数: ノードオブジェクト。
- **showEdgeInfo (generated-docs/callgraph.js)**: グラフ内の特定のエッジ（呼び出し関係）が選択された際、その呼び出しに関する詳細情報（呼び出し元/先、引数、戻り値の型など、もしあれば）を情報パネルに表示します。引数: エッジオブジェクト。
- **hideInfoPanel (generated-docs/callgraph.js)**: グラフに表示されている情報パネル（ノードやエッジの詳細を表示する領域）を非表示にします。引数なし。
- **showInfoPanel (generated-docs/callgraph.js)**: グラフに情報パネルを表示します。引数なし。
- **toggleInfoPanel (generated-docs/callgraph.js)**: 情報パネルの表示/非表示状態を切り替えます。引数なし。
- **generateGitHubURL (generated-docs/callgraph.js)**: 関連するGitHubリポジトリやファイルへのURLを動的に生成します。引数: パス、行番号など。
- **resetLayout (generated-docs/callgraph.js)**: 現在の関数呼び出しグラフのレイアウトを初期状態にリセットし、ノードの配置を再計算します。引数なし。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**: ノードの移動を監視し、他のノードとの重なりを解決するロジックをラップする関数。引数なし。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**: グラフ内のノード（関数）が移動した際に、他のノードとの重なりを防ぐために自動的に位置を調整する処理を監視・実行します。引数なし。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**: グラフ内の重なっているノード（関数）を検出し、視認性を高めるためにそれらの位置を調整して重なりを解消します。引数: ノードのリスト。
- **switchLayout (generated-docs/callgraph.js)**: 関数呼び出しグラフの表示レイアウト（例: ツリー、強制指向など）を切り替えます。引数: レイアウトの種類。
- **resetNodeStates (generated-docs/callgraph.js)**: グラフ内のノードの選択状態、ハイライト状態などの視覚的な状態を初期状態にリセットします。引数なし。
- **fitToContent (generated-docs/callgraph.js)**: グラフの表示領域を、全てのノードとエッジが収まるように自動的に調整します。引数なし。
- **toggleNodeLabels (generated-docs/callgraph.js)**: グラフ内のノードに表示されるラベル（関数名など）の表示/非表示を切り替えます。引数なし。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**: 呼び出し先の関数のファイルパスに基づいて、グラフ内のノードをフィルタリングする機能を切り替えます。引数なし。
- **replace (generated-docs/callgraph.js)**: 文字列内の特定の部分を別の文字列に置換する汎用関数です。
- **function (generated-docs/callgraph.js)**: 匿名関数または内部スコープで定義された関数を指します。具体的な機能は使用箇所に依存します。
- **max (generated-docs/callgraph.js)**: 複数の数値の中から最大値を返す関数です。
- **on (generated-docs/callgraph.js)**: イベントリスナーを要素に登録するための汎用的な関数です。
- **if (generated-docs/callgraph.js)**: 条件分岐の制御フローを表します。
- **for (generated-docs/callgraph.js)**: ループ処理の制御フローを表します。
- **ready (generated-docs/callgraph.js)**: DOM（Document Object Model）が完全にロードされ、操作可能になったときに実行されるコールバック関数を登録します。
- **addListener (generated-docs/callgraph.js)**: DOM要素やオブジェクトにイベントリスナーを追加し、特定のイベントが発生した際に指定された関数を実行させます。
- **mml2json (src/mml2json.js)**: MMLパーサー（`src/grammar.js`）から得られたMMLの解析結果（AST）を、Tone.jsのJSONシーケンサー形式に変換する主要な関数です。音符、テンポ、楽器などの情報をJSONオブジェクトにマッピングします。引数: MML解析結果オブジェクト。戻り値: Tone.js形式のJSONオブジェクト。
- **compileMmlToCommands (src/mml2json.js)**: MMLの解析結果を、内部的なMMLコマンドのリスト形式にコンパイルする補助関数です。引数: MML解析結果。戻り値: コマンドの配列。
- **getMmlCommands (src/mml2json.js)**: コンパイルされたMMLコマンドのリストを取得します。引数: MML解析結果。戻り値: コマンドの配列。
- **calcAttackToReleaseTicks (src/mml2json.js)**: 音符のアタック開始からリリース終了までのティック数を計算します。引数: 音符の長さ情報。戻り値: ティック数。
- **repeat (src/mml2json.js)**: MMLの繰り返し記号（`[`と`]`）を処理し、指定された回数だけ音楽シーケンスを繰り返すロジックを実装します。引数: 繰り返し回数、対象シーケンス。
- **toInt (src/mml2json.js)**: 入力値を整数型に変換します。引数: 任意の値。戻り値: 変換された整数。
- **calcDuration (src/mml2json.js)**: MMLで指定された音符の長さを、内部的なティック数に変換して計算します。引数: MMLの音符長さ指定。戻り値: ティック数。
- **calcStartTick (src/mml2json.js)**: 各音符やイベントの開始ティック（時間）を計算します。これはシーケンサーの正確なタイミングに必要です。引数: 現在のティック、音符の長さ。戻り値: 開始ティック。
- **increaseStartTick (src/mml2json.js)**: 開始ティックの値を増加させ、次のイベントの開始位置を決定します。引数: 増加量。
- **calcLtick (src/mml2json.js)**: MMLのLコマンド（デフォルトの音符長を設定）に対応するティック数を計算します。引数: Lコマンドの値。戻り値: ティック数。
- **getNodeId (src/mml2json.js)**: 処理中のMML構造からユニークなノードIDを生成または取得します。引数: ノードオブジェクト。戻り値: ID文字列。
- **sort (src/mml2json.js)**: 配列やリストを特定の基準でソートする汎用関数です。
- **play (src/play.js)**: `mml2json.js`によって生成されたTone.js形式のJSONデータを受け取り、Web Audio APIを通じて実際にMML音楽を再生する主要な関数です。Tone.jsのTransportとPartを初期化し、イベントをスケジュールします。引数: Tone.jsシーケンサーデータ。戻り値: Promise (再生が完了した際に解決)。
- **sub (src/play.js)**: `play`関数内で使用される補助的な関数で、特定のサブプロセスや計算を担当します。
- **hex (src/grammar.js)**: 16進数に関連する処理を行う関数。通常、文字コードの解析などで使用されます。
- **unicodeEscape (src/grammar.js)**: Unicodeエスケープシーケンスを処理する関数。
- **literalEscape (src/grammar.js)**: リテラル文字列のエスケープ処理を行う関数。
- **classEscape (src/grammar.js)**: 文字クラスのエスケープ処理を行う関数。
- **describeExpectation (src/grammar.js)**: パーサーが期待する構文要素を記述するための内部関数。
- **describeExpected (src/grammar.js)**: 解析中に期待される入力を記述するための内部関数。
- **describeFound (src/grammar.js)**: 解析中に実際に見つかった入力を記述するための内部関数。
- **peg$parse (src/grammar.js)**: Peggyによって生成されたパーサーのメインエントリポイント。MML文字列を解析し、その結果を返します。引数: 解析対象のMML文字列。
- **peg$f0 (src/grammar.js)**: Peggyによって生成される内部的な匿名関数またはヘルパー関数です。
- **text (src/grammar.js)**: パーサーが現在処理しているテキストの一部を取得する関数です。
- **offset (src/grammar.js)**: パーサーが現在処理している入力文字列のオフセット（位置）を返します。
- **range (src/grammar.js)**: パーサーが現在処理しているテキストの開始位置と終了位置を示す範囲情報を返します。
- **location (src/grammar.js)**: 現在の解析位置（行番号、列番号など）に関する詳細情報を提供します。
- **expected (src/grammar.js)**: パーサーが現在の位置で期待するトークンやパターンをリストします。
- **error (src/grammar.js)**: パーサーのエラーを生成または処理する関数です。
- **peg$getUnicode (src/grammar.js)**: Unicode文字を取得するための内部ヘルパー関数。
- **peg$literalExpectation (src/grammar.js)**: 特定のリテラル文字列が期待されることを示すオブジェクトを生成します。
- **peg$classExpectation (src/grammar.js)**: 特定の文字クラス（例: 数字、文字）が期待されることを示すオブジェクトを生成します。
- **peg$anyExpectation (src/grammar.js)**: 任意の文字が期待されることを示すオブジェクトを生成します。
- **peg$endExpectation (src/grammar.js)**: 入力文字列の終端が期待されることを示すオブジェクトを生成します。
- **peg$otherExpectation (src/grammar.js)**: その他の種類の期待されるパターンを示すオブジェクトを生成します。
- **peg$computePosDetails (src/grammar.js)**: パーサーの現在位置に関する詳細な情報（行、列など）を計算します。
- **peg$computeLocation (src/grammar.js)**: 解析されたトークンやルールに対応するソースコード内の位置情報を計算します。
- **peg$fail (src/grammar.js)**: パーサーが構文解析に失敗したことを示す内部関数です。
- **peg$buildSimpleError (src/grammar.js)**: シンプルなエラーメッセージオブジェクトを構築します。
- **peg$buildStructuredError (src/grammar.js)**: より詳細な情報を盛り込んだ構造化されたエラーオブジェクトを構築します。
- **peg$parsestart (src/grammar.js)**: MMLパーサーのトップレベルルールである`start`を処理する関数。MMLの全体構造を解析します。
- **peg$parsenote (src/grammar.js)**: MMLパーサーの`note`ルールを処理する関数。個々の音符や休符、MMLコマンドの解析を担当します。
- **peg$throw (src/grammar.js)**: 解析エラーをスローします。
- **constructor (src/grammar.js)**: オブジェクト指向プログラミングにおけるクラスのコンストラクタ。インスタンスの初期化を行います。
- **format (src/grammar.js)**: 文字列を特定の形式に整形します。
- **buildMessage (src/grammar.js)**: エラーやデバッグ用のメッセージ文字列を組み立てます。
- **literal (src/grammar.js)**: リテラル（固定文字列）の構文解析に関連する内部関数。
- **class (src/grammar.js)**: 文字クラス（特定の文字の集合）の構文解析に関連する内部関数。
- **any (src/grammar.js)**: 任意の文字にマッチする構文解析に関連する内部関数。
- **end (src/grammar.js)**: 入力ストリームの終端を検出する構文解析に関連する内部関数。
- **other (src/grammar.js)**: その他の構文解析ルールに関連する内部関数。
- **start (src/grammar.pegjs)**: Peggy文法ファイルで定義された、MML全体の解析を開始する最上位のルールです。
- **note (src/grammar.pegjs)**: Peggy文法ファイルで定義された、MMLにおける個々の音符、休符、および音長などのコマンドを解析するためのルールです。

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
Generated at: 2025-08-07 07:04:00 JST
