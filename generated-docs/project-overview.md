Last updated: 2025-09-15

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) で記述された音楽データを、Web Audio APIライブラリTone.jsが解釈できるJSONシーケンサー形式に変換します。
- ブラウザ上でMMLベースの音楽を再生するためのデモンストレーション機能を提供し、簡単に音楽制作や試聴が可能です。
- PEGパーサージェネレーターを用いてMMLの複雑な記法を解析し、モダンなJavaScript環境で動作する効率的なツールセットを提供します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして機能し、ユーザーインターフェースを構築します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高度な音声処理を可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトでの利用を容易にします。
    - MML (Music Macro Language) - 音楽をテキスト形式で記述するための記法であり、このプロジェクトの入力形式です。
    - Web Audio API - ブラウザに標準搭載されている音声処理のAPIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptの実行環境を提供し、プロジェクトのビルドやテスト、スクリプト実行に使用されます。
    - npm scripts - package.jsonに定義されたタスクランナーで、ビルド、テスト、ドキュメント生成などの各種操作を自動化します。
    - pnpm - 高速でディスク効率の良いパッケージマネージャーで、依存関係の管理に使用されます。
    - Google Generative AI - AIによる文書生成をサポートし、プロジェクトのドキュメント作成を補助します。
    - @octokit/rest - GitHub APIと連携し、Issue管理やリポジトリ操作の自動化に利用されます。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストの実行に使用されます。
    - TDD (Test-Driven Development) - テストを先に書く開発手法を採用し、品質の高いコードを保証します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの文法解析エンジンを自動生成します。
    - PEG文法定義 - MML音楽記法を解析するための文法規則を記述したファイルで、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムを採用し、コードの再利用性と保守性を高めます。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション・継続的デリバリー）の自動化プラットフォームです。
    - プロジェクト要約自動生成 - プロジェクトの概要説明などを自動で生成するワークフローです。
    - Issue自動管理 - GitHubのIssueを自動で管理し、開発プロセスを効率化します。
    - README多言語翻訳 - READMEファイルを複数の言語に自動で翻訳し、国際的な利用を促進します。
    - i18n automation - 国際化（i18n）関連の自動化ワークフローです。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。

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
- **.editorconfig**: プロジェクト全体のコードスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、依存関係モジュールなど）を指定するファイルです。
- **LICENSE**: プロジェクトの配布・利用条件を定めるライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明したドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語（デフォルト）で説明したドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や注意事項を説明するドキュメントです。
- **dev-setup/setup.js**: 開発環境の初期設定や特定のタスクを実行するためのJavaScriptスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表示する、高機能なインタラクティブHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で関数呼び出しグラフを描画・操作するためのJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況や進捗に関する情報をまとめたドキュメントです。
- **generated-docs/project-overview.md**: このプロジェクトの概要（本プロンプトで生成される内容など）を記載するドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。
- **index.html**: プロジェクトのルートにある、Webブラウザでアプリケーションやデモを起動するための主要なHTMLファイルです。
- **issue-notes/**: GitHub Issuesに関連する個別のメモや詳細情報をMarkdown形式で保存しているディレクトリです。
- **package.json**: プロジェクト名、バージョン、依存関係、スクリプト、その他のメタデータが定義されているファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーが管理するプロジェクトの正確な依存関係ツリーをロックするファイルです。
- **src/grammar.js**: Peggyパーサージェネレーターによって`grammar.pegjs`から自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータに変換します。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を記述したParsing Expression Grammar (PEG) 形式のファイルです。
- **src/index.html**: MMLプレイヤーのユーザーインターフェースを提供するHTMLファイルで、ブラウザ上でのMML再生デモに使用されます。
- **src/main.js**: アプリケーションの主要なエントリーポイントまたはメインロジックを含むJavaScriptファイルです。
- **src/mml2json.js**: MML文字列を解析し、Tone.jsが解釈できるJSONシーケンサー形式に変換する核心的なロジックを実装したJavaScriptファイルです。
- **src/play.js**: `mml2json.js`で生成されたTone.jsのJSONデータを受け取り、実際にWeb Audio APIを通じて音楽を再生するロジックを含むJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルで、テストの実行方法や環境が定義されています。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラー発生時に例外を捕捉し、適切な処理を実行するためのエラーハンドリング関数です。
- **escapeHtml** (generated-docs/callgraph.js): HTMLコンテンツに挿入される文字列内の特殊文字をエスケープし、クロスサイトスクリプティング（XSS）攻撃などを防ぐための関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): 関数呼び出しグラフの描画レイアウトに関する設定を取得する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中心となるノード（関数）を配置する際の座標計算や描画処理を行う関数です。
- **showNodeInfo** (generated-docs/callgraph.js): 特定の関数ノードが選択された際に、その関数の詳細情報を表示するパネルを更新する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): 関数間の呼び出し線（エッジ）が選択された際に、その呼び出し関係の詳細情報を表示するパネルを更新する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): グラフ上の情報表示パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): グラフ上の情報表示パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): グラフ上の情報表示パネルの表示・非表示を切り替える関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリポジトリ内のファイルやコード行へのリンクURLを生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): 関数呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを修正するロジックをラップする関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): グラフ内のノードが移動した際に、他のノードとの視覚的な重なりを検出し、自動的に位置を調整する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): 複数のノードが重なっている場合に、それらの位置を調整して重なりを解消する関数です。
- **switchLayout** (generated-docs/callgraph.js): 関数呼び出しグラフの表示レイアウト（例: 円形、階層型など）を切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): グラフ内のノードの選択状態やハイライトなどの視覚的状態を初期値に戻す関数です。
- **fitToContent** (generated-docs/callgraph.js): グラフ全体がビューポートに収まるようにズームレベルや位置を調整する関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): グラフ内のノードに表示されるラベル（関数名など）の表示・非表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出し先の関数が特定の位置にあるノードのみを表示/非表示するフィルタリング機能を切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列内で特定のパターンを別の文字列に置換する関数です。
- **max** (generated-docs/callgraph.js): 複数の数値の中から最大値を返す関数です。
- **ready** (generated-docs/callgraph.js): ドキュメントオブジェクトモデル (DOM) の準備が完了したときに実行される処理を定義する関数です。
- **addListener** (generated-docs/callgraph.js): 特定のイベント（クリック、マウスオーバーなど）に対してイベントリスナー（ハンドラー）を登録する関数です。
- **mml2json** (src/mml2json.js): MML文字列を入力として受け取り、これを解析してTone.jsシーケンサーが解釈できるJSON形式の音楽データに変換するメイン関数です。
- **compileMmlToCommands** (src/mml2json.js): MML文字列を構文解析し、内部的なコマンドオブジェクトのリストにコンパイルする関数です。
- **getMmlCommands** (src/mml2json.js): MML文字列から個々の音楽コマンド（ノート、休符、テンポ変更など）を抽出する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): ノートのアタック（発音開始）からリリース（発音終了）までの時間（ティック単位）を計算する関数です。
- **repeat** (src/mml2json.js): 指定された回数だけ特定の処理やデータ要素を繰り返すためのヘルパー関数です。
- **toInt** (src/mml2json.js): 与えられた値を整数型に変換する関数です。
- **calcDuration** (src/mml2json.js): MMLの表記に基づき、音符の持続時間（デュレーション）を計算する関数です。
- **calcStartTick** (src/mml2json.js): 音符やイベントが開始する時刻（ティック単位）を計算する関数です。
- **increaseStartTick** (src/mml2json.js): 次のイベントのために現在の開始ティック値を増分する関数です。
- **calcLtick** (src/mml2json.js): MMLのLコマンド（ノートのデフォルト長）を処理し、それに応じたティック値を計算する関数です。
- **getNodeId** (src/mml2json.js): 内部的にノード（おそらくイベントやノート）に一意のIDを割り当てるか、取得する関数です。
- **sort** (src/mml2json.js): 生成された音楽イベントのリストなどを、開始時刻順などに並べ替えるための関数です。
- **play** (src/play.js): Tone.jsシーケンサーを初期化し、生成されたJSON音楽データをロードして実際に音声を再生する関数です。
- **sub** (src/play.js): 数値の減算処理を行う補助関数です。
- **hex** (src/grammar.js): 16進数に関連する文字列や値を処理するパーサー内部の関数です。
- **unicodeEscape** (src/grammar.js): Unicodeエスケープシーケンスを処理するパーサー内部の関数です。
- **literalEscape** (src/grammar.js): リテラル文字列のエスケープ処理を行うパーサー内部の関数です。
- **classEscape** (src/grammar.js): 文字クラスのエスケープ処理を行うパーサー内部の関数です。
- **describeExpectation** (src/grammar.js): パーサーが現在位置で期待している要素（トークンやルール）を記述する関数です。
- **describeExpected** (src/grammar.js): パーサーが期待する特定の結果を説明する関数です。
- **describeFound** (src/grammar.js): パーサーが入力中に実際に発見した要素を説明する関数です。
- **peg$parse** (src/grammar.js): Peggyが生成するパーサーの主要なエントリーポイントで、入力文字列を解析し構文木を構築します。
- **peg$f0** (src/grammar.js): Peggyが内部的に生成する無名関数で、特定の文法ルールのアクションを実行します。
- **text** (src/grammar.js): 現在パース中の入力文字列の一部を返すパーサー内部の関数です。
- **offset** (src/grammar.js): 現在のパース位置のオフセット（文字数）を返すパーサー内部の関数です。
- **range** (src/grammar.js): 現在のパース位置の範囲（開始オフセットと終了オフセット）を返すパーサー内部の関数です。
- **location** (src/grammar.js): 現在のパース位置に関する詳細情報（行番号、列番号など）を返すパーサー内部の関数です。
- **expected** (src/grammar.js): パース中に期待されるトークンやルールに関する情報を取得するパーサー内部の関数です。
- **error** (src/grammar.js): パースエラーが発生した際に、エラーオブジェクトを生成または報告するパーサー内部の関数です。
- **peg$getUnicode** (src/grammar.js): Unicode文字の処理に関連するパーサー内部の関数です。
- **peg$literalExpectation** (src/grammar.js): 特定のリテラル文字列の期待値を設定するパーサー内部の関数です。
- **peg$classExpectation** (src/grammar.js): 特定の文字クラスの期待値を設定するパーサー内部の関数です。
- **peg$anyExpectation** (src/grammar.js): 任意の文字の期待値を設定するパーサー内部の関数です。
- **peg$endExpectation** (src/grammar.js): 入力文字列の終端に対する期待値を設定するパーサー内部の関数です。
- **peg$otherExpectation** (src/grammar.js): 上記以外の一般的な期待値を設定するパーサー内部の関数です。
- **peg$computePosDetails** (src/grammar.js): パース位置の詳細情報（行、列など）を計算するパーサー内部の関数です。
- **peg$computeLocation** (src/grammar.js): パース中の現在の位置情報を計算するパーサー内部の関数です。
- **peg$fail** (src/grammar.js): パースが失敗した状態を記録し、エラー処理をトリガーするパーサー内部の関数です。
- **peg$buildSimpleError** (src/grammar.js): パースエラーが発生した際に、シンプルなエラーオブジェクトを構築するパーサー内部の関数です。
- **peg$buildStructuredError** (src/grammar.js): パースエラーが発生した際に、より詳細な情報を含む構造化されたエラーオブジェクトを構築するパーサー内部の関数です。
- **peg$parsestart** (src/grammar.js): MML文法の「start」ルールをパースするパーサー内部の関数です。
- **peg$parsenote** (src/grammar.js): MML文法の「note」ルールをパースするパーサー内部の関数です。
- **peg$throw** (src/grammar.js): パースエラーをスロー（発生）させるパーサー内部の関数です。
- **constructor** (src/grammar.js): パーサーの内部で使用されるオブジェクトのコンストラクタ関数です。
- **format** (src/grammar.js): エラーメッセージなどの特定のデータを整形するパーサー内部の関数です。
- **buildMessage** (src/grammar.js): パースエラーメッセージを構築するパーサー内部の関数です。
- **literal** (src/grammar.js): リテラル（固定文字列）のパースに関連するパーサー内部の関数です。
- **class** (src/grammar.js): 文字クラス（例: `[a-z]`）のパースに関連するパーサー内部の関数です。
- **any** (src/grammar.js): 任意の文字のパースに関連するパーサー内部の関数です。
- **end** (src/grammar.js): 入力終了の検出に関連するパーサー内部の関数です。
- **other** (src/grammar.js): その他のパース要素に関連するパーサー内部の関数です。
- **start** (src/grammar.pegjs): MML文法定義における「開始」ルールです。MML文字列全体のパースエントリーポイントを示します。
- **note** (src/grammar.pegjs): MML文法定義における「ノート」（音符）ルールです。個々の音符や休符の構文を定義します。

## 関数呼び出し階層ツリー
```
- catch (dev-setup/setup.js)
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
  - max ()
  - ready ()
  - addListener ()
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
  - error ()
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
  - literal ()
  - class ()
  - any ()
  - end ()
  - other ()
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-09-15 07:03:54 JST
