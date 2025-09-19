Last updated: 2025-09-20

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の楽譜データを解析し、ブラウザ上で演奏可能なJSONシーケンサー形式に変換します。
- Web Audio APIライブラリTone.jsを活用して、変換されたMML楽曲のブラウザ上での再生を実現します。
- 自動化されたドキュメント生成やCI/CDパイプラインにより、開発効率とプロジェクト品質の維持を支援しています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されるマークアップ言語。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザで高度な音楽・オーディオ処理を実現するJavaScriptライブラリ。
    - Web Audio API - ブラウザに組み込まれた音声処理APIで、Tone.js経由で利用されます。
    - Tone.js CDN - unpkgを通じてTone.jsライブラリが提供され、Webページから直接利用可能にします。
    - MML (Music Macro Language) - 音楽をテキストで記述するための簡易的な音楽記法パーサー。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境。
    - npm scripts - パッケージ管理ツールnpmに付属するタスクランナーで、プロジェクト内の各種スクリプトを実行します（5個のスクリプト）。
    - pnpm - 高速かつディスク容量効率の良いパッケージマネージャー。
    - Google Generative AI - AIによる文書生成のサポートに利用。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報を取得・操作するためのライブラリ。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストやコンポーネントテストに利用されます。
    - TDD (Test-Driven Development) - テストを先に書き、それから実装を行う開発手法。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーター。MMLパーサーの生成に利用されます。
    - PEG文法定義 - MML音楽記法を解析するための文法ルールを定義。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率化します。
- 自動化・CI/CD:
    - GitHub Actions - GitHub上でCI/CDパイプラインを自動化するためのプラットフォーム（4個のワークフロー）。
        - プロジェクト要約自動生成: プロジェクトの概要を自動的に生成するワークフロー。
        - Issue自動管理: Issueのライフサイクル管理を自動化するワークフロー。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳するワークフロー。
        - i18n automation - 国際化（i18n）に関連する自動翻訳ワークフロー。
- 開発標準: EditorConfig - 異なる開発者やエディタ間でのコードスタイルの一貫性を維持するための設定ファイル。

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
- **.editorconfig**: 異なるIDEやエディタ間でインデントスタイル、文字コードなどの基本的なコードスタイルを統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理システムで無視するファイルやディレクトリのパターンを指定するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **LICENSE**: プロジェクトの利用条件や再配布に関するライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明するドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語で説明するメインドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や、開発ツールに関する情報が記述されたドキュメントです。
- **dev-setup/setup.js**: 開発環境の構築や、プロジェクトの初期設定を行うためのスクリプトです。テストフレームワークやMMLパーサーに関連するモジュールをインポートしています。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表示するためのインタラクティブなHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用され、関数呼び出しグラフの描画、操作、情報表示ロジックを提供するJavaScriptファイルです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。グラフの見た目などを定義します。
- **index.html**: プロジェクトのライブデモや、MML入力・再生インターフェースを提供するメインのHTMLファイルです。
- **issue-notes/**: 開発中に記録されたIssueに関するメモや詳細情報が格納されています。（来訪者向けのため詳細は割愛）
- **package.json**: プロジェクトのメタデータ（名前、バージョン）、依存関係（dependencies, devDependencies）、および実行可能なスクリプト（npm scripts）が定義されたファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイルで、プロジェクトの依存関係の正確なバージョンとインストール時の構成を保証します。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって自動生成されたJavaScriptファイルです。MML文字列を解析し、抽象構文木（AST）を構築するパーサーのロジックを含みます。
- **src/grammar.pegjs**: MML (Music Macro Language) を解析するための文法ルールを定義するPeggyパーサージェネレーターの入力ファイルです。
- **src/index.html**: プロジェクトのデモやMMLプレイヤーのユーザーインターフェースを提供するHTMLファイルです。
- **src/main.js**: アプリケーションの主要なロジックをまとめるエントリポイントとなるJavaScriptファイルです。
- **src/mml2json.js**: MMLの構文解析結果（AST）を、Tone.jsが解釈できるJSONシーケンサー形式のデータ構造に変換する中心的なロジックを含むJavaScriptファイルです。
- **src/play.js**: `mml2json.js`で生成されたTone.js形式のJSONデータを受け取り、Web Audio API (Tone.js) を介して実際に音楽を再生するロジックを含むJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの機能が正しく動作するか検証するためのテストコードです。Vitestフレームワークを使用しています。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法やカバレッジレポートの設定などが記述されています。

## 関数詳細説明
- **catch** (dev-setup/setup.js): プログラム実行中に発生したエラーを捕捉し、適切な処理を行うための一般的なエラーハンドリング関数です。
- **escapeHtml** (generated-docs/callgraph.js): 文字列中のHTML特殊文字（例: `<`、`>`、`&`）をエスケープシーケンスに変換し、XSS攻撃などを防ぎながら安全にHTMLコンテンツとして表示できるようにする関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフの描画に使用されるレイアウトに関する設定（ノード間隔、配置アルゴリズムなど）を取得する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心となるノードを特定し、そのノードを適切に配置する処理を行う関数です。
- **showNodeInfo** (generated-docs/callgraph.js): グラフ上の特定のノード（関数）が選択された際に、そのノードに関する詳細情報（ファイルパス、行番号など）を情報パネルに表示する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): グラフ上の特定のエッジ（関数間の呼び出し関係）が選択された際に、そのエッジに関する詳細情報を情報パネルに表示する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): 関数やエッジの詳細を表示する情報パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): 関数やエッジの詳細を表示する情報パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの現在の表示状態を切り替え（表示されていれば非表示に、非表示であれば表示に）る関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): グラフ内のノードやエッジに関連するGitHubリポジトリのURL（ソースコードへのリンクなど）を生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態に戻し、ノードの配置やズームレベルをリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、他のノードとの重なりを自動的に修正する処理をラップする関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): グラフ内のノードの移動を検知し、ノード同士が重ならないように位置を調整する機能を提供する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): グラフ内のノードが互いに重なっている場合に、それらの重なりを解消して見やすく配置を調整する関数です。
- **switchLayout** (generated-docs/callgraph.js): グラフの表示レイアウト（例: 円形、階層型）を別のタイプに切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): グラフ内のすべてのノードの選択状態や強調表示などの状態を初期値にリセットする関数です。
- **fitToContent** (generated-docs/callgraph.js): グラフ全体がビューポート内に収まるようにズームレベルやパン位置を調整する関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し元や呼び出し先の位置に基づいて、グラフの表示をフィルタリングする機能のオン/オフを切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する汎用的な関数です。
- **function** (generated-docs/callgraph.js): 匿名関数やユーティリティ関数として使用される場合が多いですが、具体的な機能は呼び出し元やコンテキストによって異なります。
- **max** (generated-docs/callgraph.js): 複数の数値の中から最大値を返す汎用的な関数です。
- **on** (generated-docs/callgraph.js): イベントリスナーを要素にアタッチし、特定のイベントが発生したときに指定された関数を実行する関数です。
- **if** (generated-docs/callgraph.js, src/mml2json.js): 条件に基づいて異なるコードブロックを実行する制御構造です。
- **for** (generated-docs/callgraph.js, src/mml2json.js): 特定の回数または条件が満たされるまでコードブロックを繰り返し実行するループ構造です。
- **ready** (generated-docs/callgraph.js): DOM (Document Object Model) が完全にロードされ、スクリプトが安全に操作できる状態になったときに実行される関数です。
- **addListener** (generated-docs/callgraph.js): 特定のイベントに対してイベントリスナー（コールバック関数）を追加する関数です。
- **mml2json** (src/mml2json.js): MML形式の音楽データを解析し、Tone.jsライブラリで再生可能なJSON形式のシーケンサーデータに変換する主要な関数です。
- **compileMmlToCommands** (src/mml2json.js): MMLの構文解析結果を、内部的に処理しやすいコマンドのリストにコンパイルする関数です。
- **getMmlCommands** (src/mml2json.js): MMLコマンドのリストを取得し、その構造を解析する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): 音符の「アタック」から「リリース」までの時間（ティック単位）を計算する関数です。
- **repeat** (src/mml2json.js): MMLにおける繰り返し指定（例: `[CDE]x2`）を処理し、展開する関数です。
- **toInt** (src/mml2json.js): 与えられた値を整数型に変換するユーティリティ関数です。
- **calcDuration** (src/mml2json.js): MMLの音符の長さを基に、Tone.jsが利用する形式の持続時間（Duration）を計算する関数です。
- **calcStartTick** (src/mml2json.js): 音符やイベントの開始時刻（ティック単位）を計算する関数です。
- **increaseStartTick** (src/mml2json.js): 現在の開始ティック値に指定されたティック数を加算し、次のイベントの開始時刻を更新する関数です。
- **calcLtick** (src/mml2json.js): MMLのLコマンド（音長）で指定される基本ティック値を計算する関数です。
- **getNodeId** (src/mml2json.js): 内部的にノードを一意に識別するためのIDを生成または取得する関数です。
- **sort** (src/mml2json.js): 配列などの要素を特定の順序で並べ替える汎用的なソート関数です。
- **play** (src/play.js): `mml2json.js`から変換されたJSONデータを使用して、Tone.js経由で実際に音楽の再生を開始・制御する関数です。
- **sub** (src/play.js): `play`関数内や関連するコンテキストで、補助的な処理やサブルーチンとして実行される関数です。
- **switch** (generated-docs/callgraph.js, src/mml2json.js): 複数の条件に基づいて異なる処理パスを選択する制御構造です。
- **hex** (src/grammar.js): 16進数に関連する文字列の解析や変換を行う関数です。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンス（例: `\uXXXX`）を処理し、対応する文字に変換するパーサー関連の関数です。
- **literalEscape** (src/grammar.js): リテラル文字列中のエスケープシーケンス（例: `\n`, `\"`）を処理するパーサー関連の関数です。
- **classEscape** (src/grammar.js): 文字クラス（例: `[a-z]`）内で使用されるエスケープシーケンスを処理するパーサー関連の関数です。
- **describeExpectation** (src/grammar.js): パーサーが現在どのような入力（トークン、パターン）を期待しているかを記述する関数です。
- **describeExpected** (src/grammar.js): パーサーが期待している特定の要素を詳細に記述する関数です。
- **describeFound** (src/grammar.js): パーサーが入力から実際に何を見つけたかを記述する関数です。
- **peg$parse** (src/grammar.js): Peggyによって生成されたMMLパーサーのメイン関数で、入力MML文字列を受け取り、その構文木を構築します。
- **peg$f0** (src/grammar.js): Peggyによって生成されるパーサー内部で利用される匿名関数またはヘルパー関数です。
- **text** (src/grammar.js): 現在解析中の入力文字列の一部を返すパーサー内部の関数です。
- **offset** (src/grammar.js): 現在の解析位置のオフセット（文字数）を返すパーサー内部の関数です。
- **range** (src/grammar.js): 現在解析中の入力範囲（開始オフセットと終了オフセット）を返すパーサー内部の関数です。
- **location** (src/grammar.js): 現在の解析位置に関する詳細情報（行、列、オフセット）を返すパーサー内部の関数です。
- **expected** (src/grammar.js): パーサーがエラーを報告する際に、期待されていた入力要素のリストを返すパーサー内部の関数です。
- **error** (src/grammar.js): パーサーのエラーオブジェクトを生成し、エラーメッセージや位置情報を含める関数です。
- **peg$getUnicode** (src/grammar.js): Unicode文字の処理に関連するパーサー内部のヘルパー関数です。
- **peg$literalExpectation** (src/grammar.js): 特定のリテラル文字列が期待される場合に、その期待値オブジェクトを生成するパーサー内部の関数です。
- **peg$classExpectation** (src/grammar.js): 特定の文字クラスが期待される場合に、その期待値オブジェクトを生成するパーサー内部の関数です。
- **peg$anyExpectation** (src/grammar.js): 任意の文字が期待される場合に、その期待値オブジェクトを生成するパーサー内部の関数です。
- **peg$endExpectation** (src/grammar.js): 入力の終端が期待される場合に、その期待値オブジェクトを生成するパーサー内部の関数です。
- **peg$otherExpectation** (src/grammar.js): 上記以外の一般的な期待値を表現するパーサー内部の関数です。
- **peg$computePosDetails** (src/grammar.js): 解析位置の詳細（行番号や列番号など）を計算するパーサー内部のヘルパー関数です。
- **peg$computeLocation** (src/grammar.js): 解析中のコードの正確な位置情報を計算するパーサー内部の関数です。
- **peg$fail** (src/grammar.js): パーサーの解析が失敗したことを通知し、エラー情報を記録するパーサー内部の関数です。
- **peg$buildSimpleError** (src/grammar.js): シンプルな形式のエラーメッセージを構築するパーサー内部の関数です。
- **peg$buildStructuredError** (src/grammar.js): 構造化された詳細なエラーメッセージを構築するパーサー内部の関数です。
- **peg$parsestart** (src/grammar.js): MML文法の開始ルールから解析を開始するパーサー内部の関数です。
- **peg$parsenote** (src/grammar.js): MML文法の音符（note）ルールを解析するパーサー内部の関数です。
- **peg$throw** (src/grammar.js): パーサーのエラーを例外としてスローする関数です。
- **constructor** (src/grammar.js): オブジェクトが生成される際に初期化処理を行う特別な関数です。
- **format** (src/grammar.js): エラーメッセージなどのテキストを指定された書式で整形する関数です。
- **buildMessage** (src/grammar.js): パーサーエラーのメッセージ文字列を構築する関数です。
- **literal** (src/grammar.js): パーサーがリテラル（固定文字列）を処理するロジックに関連する関数です。
- **class** (src/grammar.js): パーサーが文字クラス（例: `[a-zA-Z]`）を処理するロジックに関連する関数です。
- **any** (src/grammar.js): パーサーが任意の単一文字を処理するロジックに関連する関数です。
- **end** (src/grammar.js): パーサーが入力の終端を検出するロジックに関連する関数です。
- **other** (src/grammar.js): パーサーがその他の定義済みでない要素を処理するロジックに関連する関数です。
- **while** (src/grammar.js): 特定の条件が真である間、コードブロックを繰り返し実行する制御構造です。
- **start** (src/grammar.pegjs): MML文法定義の開始ルールを宣言しており、パーサー生成時にエントリポイントとして機能します。
- **note** (src/grammar.pegjs): MML文法定義で音符の構文を定義しており、MMLパーサーが音符を識別・解析する際の基盤となります。

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
Generated at: 2025-09-20 07:05:59 JST
