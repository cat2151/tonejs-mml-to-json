Last updated: 2025-07-26

```markdown
# Project Overview

## プロジェクト概要
- Music Macro Language (MML) 形式の音楽データをTone.jsが利用可能なJSONシーケンサー形式に変換するツールです。
- Web Audio APIとTone.jsを活用し、ブラウザ上でMMLベースの音楽再生を可能にするパーサーと関連ツールを提供します。
- 主にMMLの解析とJSONへの変換機能を提供し、変換されたデータを基にウェブ上で音楽を試聴できるデモも含まれます。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして、ユーザーインターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンスを可能にするJavaScriptライブラリです。Tone.js CDNはunpkg経由でこのライブラリを配信します。MML (Music Macro Language) は音楽をテキストで記述するための記法で、プロジェクトはこの記法をパーシングします。Web Audio APIは、ブラウザで直接オーディオを処理するためのネイティブAPIで、Tone.jsがこれを活用しています。
- 開発ツール: Node.js runtime - JavaScriptコードを実行する環境を提供します。npm scripts - `package.json`に定義された開発タスクを自動化するためのスクリプト群です。pnpm - 高速でディスク効率の良いパッケージマネージャーで、依存関係の管理に使用されます。Google Generative AI - プロジェクトのドキュメント生成や要約などを支援するためのAIツールです。@octokit/rest - GitHub APIと連携し、リポジトリ情報の取得やIssue管理などの自動化に使用されます。
- テスト: Vitest - Viteをベースとした高速なユニットテストフレームワークで、コードの品質と正確性を保証します。TDD (Test-Driven Development) - テストを先に書き、それからコードを実装する開発手法を採用し、堅牢な開発を促進します。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MML音楽記法を解析するためのパーサーコードを自動生成します。PEG文法定義は、このパーサーを生成するためのMMLの構文ルールを記述したファイルです。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、モジュールのインポート・エクスポートを標準的な方法で行います。
- 自動化・CI/CD: GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化するためのワークフロープラットフォームです。プロジェクト要約の自動生成、Issueの自動管理、READMEファイルの多言語翻訳、i18n automation（国際化対応の自動化）など、複数の自動化ワークフローが設定されています。
- 開発標準: EditorConfig - 異なるエディタやIDEを使用する開発者間でも、コードのインデント、改行コード、エンコーディングなどのスタイルを統一するための設定ファイルです。

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
-   `.editorconfig`: 開発者間でコードスタイルの一貫性を保つための設定ファイルです。
-   `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
-   `LICENSE`: プロジェクトの配布・利用条件を定めるライセンス情報が記述されています。
-   `README.ja.md`: プロジェクトの概要、使い方、開発方法などを日本語で記述した説明書です。
-   `README.md`: プロジェクトの概要、使い方、開発方法などを英語で記述した説明書です。
-   `dev-setup/README.md`: `dev-setup`ディレクトリ内のファイルに関する追加情報を提供します。
-   `dev-setup/setup.js`: 開発環境のセットアップや初期化を行うためのスクリプトで、テスト環境の準備などに関わります。
-   `generated-docs/callgraph-enhanced.html`: プロジェクトの関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
-   `generated-docs/callgraph.js`: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画、操作、情報表示などのロジックを実装しています。
-   `generated-docs/development-status.md`: プロジェクトの開発状況や進捗に関する情報をまとめたドキュメントです。
-   `generated-docs/project-overview.md`: プロジェクトの全体像をまとめた概要ドキュメントです。
-   `generated-docs/style.css`: 自動生成されたドキュメントの視覚的なスタイルを定義するCSSファイルです。
-   `index.html`: プロジェクトの公開デモページとして機能するメインのHTMLファイルです。
-   `issue-notes/`: GitHub Issuesに関連する個別のメモや詳細情報を管理するためのディレクトリです。
-   `package.json`: Node.jsプロジェクトのメタデータ、依存関係、および実行可能なスクリプトを定義する設定ファイルです。
-   `pnpm-lock.yaml`: pnpmパッケージマネージャーが使用するロックファイルで、依存関係の厳密なツリー構造とバージョンを記録し、ビルドの再現性を保証します。
-   `src/grammar.js`: `src/grammar.pegjs`から自動生成された、MMLをパースするためのJavaScriptパーサーコードです。MML構文を解釈し、プログラムが扱える形式に変換します。
-   `src/grammar.pegjs`: MMLの構文ルールをPEG.js形式で記述したファイルで、この定義に基づいて`src/grammar.js`が生成されます。
-   `src/index.html`: MML入力とTone.jsによる再生インターフェースを提供するアプリケーションの主要なUI部分を担うHTMLファイルです。
-   `src/main.js`: アプリケーションのメインロジックを制御するJavaScriptファイルで、MMLの入力処理や変換処理の連携を行います。
-   `src/mml2json.js`: MMLデータをTone.js JSONシーケンサー形式に変換する主要なロジックを実装したJavaScriptファイルです。MMLコマンドの解釈、音符の長さやタイミングの計算、繰り返し処理などを担当します。
-   `src/play.js`: 変換されたJSONデータを用いてTone.jsシーケンサーを初期化し、ブラウザ上で音楽を再生するためのロジックを実装したJavaScriptファイルです。
-   `test/parser.test.js`: MMLパーサー（`src/grammar.js`）の機能が期待通りに動作するかを検証するVitestのテストファイルです。
-   `vitest.config.js`: Vitestテストフレームワークの設定ファイルで、テストの実行環境やオプションを定義します。

## 関数詳細説明
-   `catch` (dev-setup/setup.js): エラー処理ブロックで使用され、非同期操作などで発生した例外を捕捉し、適切な対応を行うための一般的な関数です。
-   `escapeHtml` (generated-docs/callgraph.js): HTMLの特殊文字をエスケープすることで、クロスサイトスクリプティング (XSS) などのセキュリティ脆弱性を防ぐための関数です。
-   `getLayoutConfig` (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウトに関する設定を取得する関数です。
-   `placeCentralNode` (generated-docs/callgraph.js): グラフの中心に特定のノード（関数）を配置する処理を担う関数です。
-   `showNodeInfo` (generated-docs/callgraph.js): グラフ上のノード（関数）が選択された際に、その関数の詳細情報を表示する関数です。
-   `showEdgeInfo` (generated-docs/callgraph.js): グラフ上のエッジ（関数間の呼び出し関係）が選択された際に、その呼び出しに関する詳細情報を表示する関数です。
-   `hideInfoPanel` (generated-docs/callgraph.js): グラフ上に表示されている情報パネルを非表示にする関数です。
-   `showInfoPanel` (generated-docs/callgraph.js): グラフ上に情報パネルを表示する関数です。
-   `toggleInfoPanel` (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数です。
-   `generateGitHubURL` (generated-docs/callgraph.js): プロジェクトのGitHubリポジトリ内のファイルやコミットなどへのURLを生成する関数です。
-   `resetLayout` (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウトを初期状態にリセットする関数です。
-   `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを自動的に修正する処理のラッパー関数です。
-   `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): グラフ内のノードが移動した際に、他のノードとの視覚的な重なりを検出し、自動的に調整する関数です。
-   `resolveNodeOverlaps` (generated-docs/callgraph.js): グラフ上のノードが互いに重なり合っている場合に、それらを離して配置し直すことで視認性を高める関数です。
-   `switchLayout` (generated-docs/callgraph.js): 関数呼び出しグラフの表示形式（レイアウトアルゴリズム）を切り替える関数です。
-   `resetNodeStates` (generated-docs/callgraph.js): グラフ内のノードの選択状態やハイライトなどの視覚的状態をリセットする関数です。
-   `fitToContent` (generated-docs/callgraph.js): グラフ全体がビューポート内に収まるようにズームレベルを自動調整する関数です。
-   `toggleNodeLabels` (generated-docs/callgraph.js): グラフノードに表示されるラベル（関数名など）の表示/非表示を切り替える関数です。
-   `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出し元のファイルパスや場所に基づいて、グラフに表示する関数をフィルタリングする機能を切り替える関数です。
-   `replace` (generated-docs/callgraph.js): 文字列内の特定の部分を別の文字列で置換する汎用的な関数です。
-   `switch` (generated-docs/callgraph.js): 複数の条件分岐を効率的に処理するための制御構造に関連する処理を行う関数です。
-   `function` (generated-docs/callgraph.js): 匿名関数や特定のコンテキスト内で定義される内部関数を指す場合があります。
-   `max` (generated-docs/callgraph.js): 複数の数値の中から最大値を計算する関数です。
-   `on` (generated-docs/callgraph.js): イベントリスナーを登録し、特定のイベントが発生したときに指定された処理を実行するための関数です。
-   `if` (generated-docs/callgraph.js): 条件が真である場合に特定のコードブロックを実行するための制御構造に関連する処理を行う関数です。
-   `for` (generated-docs/callgraph.js): コードブロックを繰り返し実行するためのループ制御構造に関連する処理を行う関数です。
-   `ready` (generated-docs/callgraph.js): ウェブページのDOM（Document Object Model）が完全に読み込まれ、操作可能になったときに実行される処理を定義するための関数です。
-   `addListener` (generated-docs/callgraph.js): 特定のイベント（例：クリック、キーボード入力）が発生した際に実行されるコールバック関数を追加する関数です。
-   `hex` (src/grammar.js): 16進数に関連する処理（例：文字列から数値への変換、文字コードの処理）を行う関数です。
-   `unicodeEscape` (src/grammar.js): Unicodeエスケープシーケンス（例：`\uXXXX`）を解析・処理する関数です。
-   `literalEscape` (src/grammar.js): リテラル文字列内の特殊文字エスケープシーケンスを解析・処理する関数です。
-   `classEscape` (src/grammar.js): 文字クラス（例：`[a-z]`）内のエスケープシーケンスを解析・処理する関数です。
-   `describeExpectation` (src/grammar.js): パーサーが現在の位置で何を期待しているかを記述するメッセージを生成する関数です。
-   `describeExpected` (src/grammar.js): パーサーが期待する構文要素を説明するテキストを生成する関数です。
-   `describeFound` (src/grammar.js): パーサーが現在の位置で実際に検出した構文要素を説明するテキストを生成する関数です。
-   `peg$parse` (src/grammar.js): PEG.jsによって生成された、MML文字列全体を解析する主要なパーシング関数です。
-   `peg$f0` (src/grammar.js): PEG.jsによって自動生成された内部関数で、パーシングルールの特定のフラグメントに関連する処理を実行します。
-   `text` (src/grammar.js): パーサーが現在処理している入力テキストのセグメントを取得する関数です。
-   `offset` (src/grammar.js): パーサーが現在処理している入力テキスト内でのバイトオフセット（位置）を取得する関数です。
-   `range` (src/grammar.js): パーサーが現在処理している入力テキストの開始と終了のオフセット範囲を取得する関数です。
-   `location` (src/grammar.js): パーサーが現在処理している入力テキストの行番号、列番号などの位置情報を取得する関数です。
-   `expected` (src/grammar.js): パースエラー時に、パーサーが期待していた入力形式に関する情報を返す関数です。
-   `error` (src/grammar.js): パース中にエラーが発生した場合に、エラーオブジェクトを生成または報告する関数です。
-   `peg$getUnicode` (src/grammar.js): Unicode文字の処理に関連する内部ユーティリティ関数です。
-   `peg$literalExpectation` (src/grammar.js): 特定のリテラル文字列の期待値オブジェクトを生成する内部関数です。
-   `peg$classExpectation` (src/grammar.js): 文字クラスの期待値オブジェクトを生成する内部関数です。
-   `peg$anyExpectation` (src/grammar.js): 任意の文字の期待値オブジェクトを生成する内部関数です。
-   `peg$endExpectation` (src/grammar.js): 入力文字列の終端を期待するオブジェクトを生成する内部関数です。
-   `peg$otherExpectation` (src/grammar.js): その他の特定の期待値オブジェクトを生成する内部関数です。
-   `peg$computePosDetails` (src/grammar.js): 入力ストリーム内の特定の位置の詳細（行、列）を計算する内部関数です。
-   `peg$computeLocation` (src/grammar.js): パース中の現在の位置情報（行、列、オフセット）を計算する内部関数です。
-   `peg$fail` (src/grammar.js): パーシングの失敗を示す内部関数で、バックトラックをトリガーする可能性があります。
-   `peg$buildSimpleError` (src/grammar.js): シンプルな形式のパースエラーメッセージを構築する内部関数です。
-   `peg$buildStructuredError` (src/grammar.js): より詳細な情報を含む構造化されたパースエラーメッセージを構築する内部関数です。
-   `peg$parsestart` (src/grammar.js): MMLパーサーの開始ルールを処理する内部関数です。
-   `peg$parsenote` (src/grammar.js): MMLパーサーの音符ルールを処理する内部関数です。
-   `peg$throw` (src/grammar.js): 生成されたパーサー内でエラーをスローする内部関数です。
-   `constructor` (src/grammar.js): オブジェクトのインスタンスを初期化するための特別なメソッドです。
-   `format` (src/grammar.js): 文字列のフォーマット（例：プレースホルダーの置換）を行う汎用的な関数です。
-   `buildMessage` (src/grammar.js): エラーメッセージやログメッセージなどの文字列を構築する関数です。
-   `literal` (src/grammar.js): ソースコード内のリテラル値（数値、文字列など）を処理する関数です。
-   `class` (src/grammar.js): オブジェクト指向プログラミングにおけるクラスの定義やインスタンス生成に関連する処理を行う関数です。
-   `any` (src/grammar.js): 任意の型のデータや値を処理するための汎用的な関数です。
-   `end` (src/grammar.js): 特定の処理やフェーズの終了を管理する関数です。
-   `other` (src/grammar.js): 特定のカテゴリに属さない、その他の汎用的な処理を行う関数です。
-   `while` (src/grammar.js): 条件が真である限り、コードブロックを繰り返し実行するためのループ制御構造に関連する処理を行う関数です。
-   `start` (src/grammar.pegjs): `grammar.pegjs`ファイル内でMMLの解析を開始するためのルートとなる文法ルールです。
-   `note` (src/grammar.pegjs): `grammar.pegjs`ファイル内でMMLの音符構文を解析するための文法ルールです。
-   `mml2json` (src/mml2json.js): MML文字列を解析し、Tone.jsのシーケンサーが理解できるJSON形式のデータ構造に変換するメイン関数です。
-   `compileMmlToCommands` (src/mml2json.js): MML文字列を、内部で扱いやすいコマンドのリスト形式にコンパイルする関数です。
-   `getMmlCommands` (src/mml2json.js): MMLパーサーから抽出されたコマンドのリストを取得する関数です。
-   `calcAttackToReleaseTicks` (src/mml2json.js): 音符のアタック（発音開始）からリリース（発音終了）までのティック数を計算する関数です。
-   `repeat` (src/mml2json.js): MMLの繰り返し記号（例：`:`）を処理し、指定された回数だけ音楽パターンを反復させるロジックを実装した関数です。
-   `toInt` (src/mml2json.js): 文字列を整数値に安全に変換するための関数です。
-   `calcDuration` (src/mml2json.js): MMLの音符の長さ（デュレーション）を計算し、適切なティック値に変換する関数です。
-   `calcStartTick` (src/mml2json.js): 各音符やイベントの開始ティック（時間的な位置）を計算する関数です。
-   `increaseStartTick` (src/mml2json.js): タイムライン上の現在の開始ティックを進める（増加させる）関数です。
-   `calcLtick` (src/mml2json.js): MMLのLコマンド（デフォルトの音長設定）に基づいて、ティック値を計算する関数です。
-   `getNodeId` (src/mml2json.js): データ構造内のノードに一意の識別子を生成または取得する関数です。
-   `sort` (src/mml2json.js): 配列やリストの要素を特定の基準で並べ替えるための汎用的なソート関数です。
-   `play` (src/play.js): 変換されたMMLデータを基にTone.jsを使って音楽再生を開始・制御する関数です。
-   `sub` (src/play.js): `play`関数内で呼び出される補助的な処理やサブルーチンを担う関数です。

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
Generated at: 2025-07-26 07:03:48 JST
