Last updated: 2025-07-19

# Project Overview

## プロジェクト概要
- 本プロジェクトは、音楽記法であるMML (Music Macro Language) を、Web Audio APIライブラリTone.jsが利用できるJSONシーケンサー形式へ変換するツールです。
- 変換されたデータはブラウザ上で直接音楽として再生可能であり、Webベースの音楽アプリケーションやMMLコンテンツ作成に活用できます。
- 高度なパーシング技術と効率的な変換ロジックにより、MMLの表現力をWeb上で手軽に再現し、インタラクティブな音楽体験を提供します。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するためのマークアップ言語です。
- 音楽・オーディオ:
    - **Tone.js** - Web Audio APIを抽象化し、強力な音楽合成・シーケンス機能を提供するJavaScriptライブラリです。
    - **Tone.js CDN** - unpkgを通じてTone.jsライブラリが効率的に配信され、ウェブページから直接利用できるようになっています。
    - **MML (Music Macro Language)** - 音楽をテキストで記述するための簡易的なプログラミング言語であり、本プロジェクトの入力形式です。
    - **Web Audio API** - ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて音源の生成、処理、再生を行います。
- 開発ツール:
    - **Node.js runtime** - JavaScriptをサーバーサイドや開発環境で実行するためのランタイム環境です。
    - **npm scripts** - `package.json`に定義されたコマンドを実行するためのタスクランナーで、開発ワークフローを効率化します。
    - **pnpm** - npmやYarnに比べて高速でディスクスペース効率の良いパッケージマネージャーです。
    - **Google Generative AI** - ドキュメント生成など、AIによるコンテンツ作成をサポートするために使用されます。
    - **@octokit/rest** - GitHub APIと連携し、リポジトリ情報の取得や操作をプログラムから行うためのライブラリです。
- テスト:
    - **Vitest** - 高速なViteベースのテストフレームワークで、本プロジェクトのコードの正確性を保証します。
    - **TDD (Test-Driven Development)** - テストを先に記述し、それに合わせてコードを開発する手法で、堅牢なソフトウェア設計に貢献します。
- ビルドツール:
    - **Peggy** - PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLのような複雑な記法を解析するためのパーサーを自動生成します。
    - **PEG文法定義** - MML音楽記法を解析するための文法ルールを定義したファイルで、PeggyによってJavaScriptパーサーに変換されます。
- 言語機能:
    - **ES Modules** - モダンなJavaScriptのモジュールシステムで、コードの依存関係管理と再利用性を向上させます。
- 自動化・CI/CD:
    - **GitHub Actions** - コードのテスト、デプロイ、ドキュメント生成、多言語翻訳、Issue管理など、様々な開発プロセスを自動化するためのCI/CDプラットフォームです。
        - プロジェクト要約自動生成
        - Issue自動管理
        - README多言語翻訳
        - i18n automation (自動翻訳ワークフロー)
- 開発標準:
    - **EditorConfig** - 異なるIDEやエディタ間でコードの整形ルール（インデント、改行など）を統一するためのファイル形式です。

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
- **`.editorconfig`**: 異なるエディタやIDEを使用する開発者間で、インデントスタイル、文字エンコーディング、改行コードなどの基本的なコードスタイルを統一するための設定ファイルです。
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリのパターンを定義するファイルです。ビルド生成物や一時ファイルなどが含まれます。
- **`LICENSE`**: プロジェクトのライセンス情報が記載されています。これにより、プロジェクトの利用、配布、改変の条件が明確になります。
- **`README.ja.md` / `README.md`**: プロジェクトの概要、目的、使い方、インストール方法などが記述された説明ファイルです。それぞれ日本語版と英語版を提供しています。
- **`dev-setup/`**: 開発環境のセットアップに関するファイルが含まれるディレクトリです。
    - **`dev-setup/README.md`**: `dev-setup`ディレクトリに関する説明です。
    - **`dev-setup/setup.js`**: 開発環境のセットアップや初期化を行うためのスクリプトです。テスト環境の準備や依存関係の解決などに関与します。
- **`generated-docs/`**: GitHub Actionsなどにより自動生成されたドキュメントやリソースが格納されるディレクトリです。
    - **`generated-docs/callgraph-enhanced.html`**: プロジェクト内の関数呼び出し関係を視覚的に表現したインタラクティブなグラフを表示するHTMLファイルです。
    - **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で利用されるJavaScriptコードで、呼び出しグラフの描画、ノード・エッジ情報の表示、レイアウト制御などの機能を提供します。
    - **`generated-docs/development-status.md`**: プロジェクトの現在の開発状況や進捗が記載されたドキュメントです。
    - **`generated-docs/project-overview.md`**: 自動生成されたプロジェクトの概要ドキュメントです。
    - **`generated-docs/style.css`**: 生成されたドキュメントや呼び出しグラフの表示に使用されるスタイルシートです。
- **`index.html`**: プロジェクトのWebデモやメインアプリケーションのエントリーポイントとなるHTMLファイルです。ユーザーがMMLを入力し、結果を再生するインターフェースを提供します。
- **`issue-notes/`**: GitHub Issuesに関連するメモや詳細情報が格納されるディレクトリです。
- **`package.json`**: Node.jsプロジェクトのメタデータ（プロジェクト名、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`pnpm-lock.yaml`**: `pnpm`によって生成されるロックファイルで、依存関係ツリーの正確なバージョンと構造を記録し、ビルドの再現性を保証します。
- **`src/`**: プロジェクトの主要なソースコードが格納されるディレクトリです。
    - **`src/grammar.js`**: `src/grammar.pegjs`からPeggyによって生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータに変換する役割を担います。
    - **`src/grammar.pegjs`**: MML (Music Macro Language) の文法ルールを定義したPEG (Parsing Expression Grammar) ファイルです。この定義に基づいて`src/grammar.js`が生成されます。
    - **`src/index.html`**: `index.html`と同様に、アプリケーションのエントリーポイントまたは埋め込み用のHTMLファイルです。
    - **`src/main.js`**: アプリケーションのメインロジックを構成するJavaScriptファイルです。MMLの入力処理や変換処理の連携などを担当する可能性があります。
    - **`src/mml2json.js`**: MMLパーサーによって解析されたMMLデータを、Tone.jsが解釈できるJSONシーケンサー形式に変換するコアロジックを実装したファイルです。音符のデュレーション計算やイベントの整形などを行います。
    - **`src/play.js`**: Tone.jsライブラリを利用して、`mml2json.js`で変換されたJSONシーケンサーデータを再生するための機能を提供するファイルです。再生開始/停止、テンポ調整などの制御を行います。
- **`test/`**: プロジェクトのテストファイルが格納されるディレクトリです。
    - **`test/parser.test.js`**: `src/grammar.js`によって生成されたMMLパーサーの正確性を検証するための単体テストファイルです。Vitestフレームワークを使用しています。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。テスト実行時のオプションやプラグインなどが定義されています。

## 関数詳細説明
- **`catch`** (dev-setup/setup.js): エラー発生時に例外を捕捉し、適切な処理（ログ記録やフォールバックなど）を行うための一般的なエラーハンドリング関数です。
- **`error`** (): 一般的なエラーオブジェクト、またはエラーを処理するための関数です。
- **`on`** (): イベントリスナーの登録など、特定のイベントが発生した際にコールバック関数を実行するための関数です。
- **`escapeHtml`** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、スクリプトインジェクションなどのセキュリティリスクを防ぎながら、安全にWebページに表示するための関数です。
- **`getLayoutConfig`** (generated-docs/callgraph.js): グラフのレイアウトに関する設定情報を取得する関数です。
- **`placeCentralNode`** (generated-docs/callgraph.js): グラフ表示において、中央に配置すべき主要なノードを特定の位置に配置する関数です。
- **`showNodeInfo`** (generated-docs/callgraph.js): グラフ内の特定のノード（関数など）に関する詳細情報を表示する関数です。
- **`showEdgeInfo`** (generated-docs/callgraph.js): グラフ内の特定のエッジ（関数間の呼び出し関係など）に関する詳細情報を表示する関数です。
- **`hideInfoPanel`** (generated-docs/callgraph.js): 画面上に表示されている情報パネルを非表示にする関数です。
- **`showInfoPanel`** (generated-docs/callgraph.js): 画面上に情報パネルを表示する関数です。
- **`toggleInfoPanel`** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数です。
- **`generateGitHubURL`** (generated-docs/callgraph.js): GitHubリポジトリ内のファイルやコミットへのURLを生成する関数です。
- **`resetLayout`** (generated-docs/callgraph.js): グラフの表示レイアウトを初期状態にリセットする関数です。
- **`watchNodeMovementAndFixOverlapsWrap`** (generated-docs/callgraph.js): ノードの移動を監視し、他のノードとの重なりを自動的に解消する処理をラップする関数です。
- **`watchNodeMovementAndFixOverlaps`** (generated-docs/callgraph.js): グラフノードが移動した際に、他のノードとの重なりを検出し、視覚的な衝突を避けるように位置を調整する関数です。
- **`resolveNodeOverlaps`** (generated-docs/callgraph.js): グラフ内の重なり合ったノードを検出し、それらの位置を調整して重なりを解消する関数です。
- **`switchLayout`** (generated-docs/callgraph.js): グラフの表示レイアウト（例：ツリー型、フォースディレクテッド型）を切り替える関数です。
- **`resetNodeStates`** (generated-docs/callgraph.js): グラフ内の全ノードの状態（選択、ハイライトなど）をリセットする関数です。
- **`fitToContent`** (generated-docs/callgraph.js): グラフ全体がビューポート内に収まるようにズームレベルや位置を調整する関数です。
- **`toggleNodeLabels`** (generated-docs/callgraph.js): グラフノードのラベル（関数名など）の表示/非表示を切り替える関数です。
- **`toggleCalleeLocationFilter`** (generated-docs/callgraph.js): 呼び出し先の関数が特定の場所に存在するかどうかに基づいてフィルターを適用し、表示を切り替える関数です。
- **`replace`** (generated-docs/callgraph.js): 文字列置換などの一般的な置き換え操作を行う関数です。
- **`switch`** (generated-docs/callgraph.js): 一般的な制御フローの一部であり、複数のケースに基づいて異なるコードブロックを実行するために使用されます。
- **`function`** (generated-docs/callgraph.js): 匿名関数またはコールバック関数として、特定の処理をカプセル化するために利用される要素です。
- **`max`** (generated-docs/callgraph.js): 複数の数値の中から最大値を返す一般的な数学関数です。
- **`ready`** (generated-docs/callgraph.js): DOMが完全にロードされ、スクリプトの実行準備が整ったときに実行されるイベントハンドラを登録するための関数です。
- **`addListener`** (generated-docs/callgraph.js): 特定のイベント（例：クリック、キー入力）の発生を監視し、イベントが発生した際に指定されたコールバック関数を実行するように設定する関数です。
- **`hex`** (src/grammar.js): 16進数文字列を処理するための関数です。パーサー内で数値変換などに利用される可能性があります。
- **`unicodeEscape`** (src/grammar.js): Unicodeエスケープシーケンスを処理するための関数です。文字列リテラルの解析に関与します。
- **`literalEscape`** (src/grammar.js): 文字列リテラル内の特殊文字をエスケープ解除するための関数です。
- **`classEscape`** (src/grammar.js): 文字クラス内の特殊文字をエスケープ解除するための関数です。
- **`describeExpectation`** (src/grammar.js): パーサーのエラーメッセージにおいて、期待された入力の種類を記述するための関数です。
- **`describeExpected`** (src/grammar.js): 期待されたトークンやパターンを詳細に記述し、エラーメッセージを分かりやすくするための関数です。
- **`describeFound`** (src/grammar.js): 実際にパース中に見つかった文字やトークンを記述し、エラーメッセージに含めるための関数です。
- **`peg$parse`** (src/grammar.js): Peggyによって生成されたパーサーのメインエントリポイントとなる関数です。入力文字列を解析し、結果を返します。
- **`peg$f0`** (src/grammar.js): Peggyによって生成される内部的なヘルパー関数で、パースプロセスの一部を担います。
- **`text`** (src/grammar.js): パース中の現在のテキスト位置や部分文字列を取得する関数です。
- **`offset`** (src/grammar.js): パース中の現在の入力文字列におけるオフセット（位置）を返す関数です。
- **`range`** (src/grammar.js): パース中の特定の範囲に対応するテキストを取得する関数です。
- **`location`** (src/grammar.js): パース中の現在位置の行、列、オフセットなどの詳細な位置情報を返す関数です。
- **`expected`** (src/grammar.js): 現在のパース位置で期待される入力（トークン、パターンなど）の情報を保持する、または返す関数です。
- **`peg$getUnicode`** (src/grammar.js): Unicode文字を取得するための内部ヘルパー関数です。
- **`peg$literalExpectation`** (src/grammar.js): リテラル（固定文字列）が期待される場合の期待値オブジェクトを生成する内部関数です。
- **`peg$classExpectation`** (src/grammar.js): 文字クラスが期待される場合の期待値オブジェクトを生成する内部関数です。
- **`peg$anyExpectation`** (src/grammar.js): 任意の文字が期待される場合の期待値オブジェクトを生成する内部関数です。
- **`peg$endExpectation`** (src/grammar.js): 入力文字列の終端が期待される場合の期待値オブジェクトを生成する内部関数です。
- **`peg$otherExpectation`** (src/grammar.js): 上記以外の一般的な期待値オブジェクトを生成する内部関数です。
- **`peg$computePosDetails`** (src/grammar.js): パース位置の詳細情報（行、列など）を計算する内部関数です。
- **`peg$computeLocation`** (src/grammar.js): 特定のオフセットに対応する位置情報（行、列）を計算する内部関数です。
- **`peg$fail`** (src/grammar.js): パースに失敗したことを示すための内部関数です。
- **`peg$buildSimpleError`** (src/grammar.js): シンプルな形式のパースエラーメッセージを生成する内部関数です。
- **`peg$buildStructuredError`** (src/grammar.js): より構造化された形式のパースエラーメッセージを生成する内部関数です。
- **`peg$parsestart`** (src/grammar.js): PEG文法で定義された`start`ルールに対応するパース関数です。MML解析の開始点となります。
- **`peg$parsenote`** (src/grammar.js): PEG文法で定義された`note`ルールに対応するパース関数です。MML内の個々の音符を解析します。
- **`peg$throw`** (src/grammar.js): パースエラーをスローするための内部関数です。
- **`constructor`** (src/grammar.js): オブジェクト指向プログラミングにおいて、新しいオブジェクトが作成される際に初期化処理を行う特殊なメソッドです。
- **`format`** (src/grammar.js): 文字列の書式設定やデータの整形を行うための関数です。
- **`buildMessage`** (src/grammar.js): エラーやログなどのメッセージを構築するための関数です。
- **`literal`** (src/grammar.js): 文字列リテラルを扱う、または関連する関数です。
- **`class`** (src/grammar.js): 文字クラスを扱う、または関連する関数です。
- **`any`** (src/grammar.js): 任意の文字を扱う、または関連する関数です。
- **`end`** (src/grammar.js): 処理の終了点を示す、または関連する関数です。
- **`other`** (src/grammar.js): その他の汎用的な処理を行う、または関連する関数です。
- **`while`** (src/grammar.js): 繰り返し処理を行うための制御構造の一部です。
- **`mml2json`** (src/mml2json.js): MMLパーサーの出力結果（MMLコマンド）を受け取り、Tone.jsのJSONシーケンサー形式に変換するメイン関数です。音符、休符、テンポなどの音楽イベントをJSON構造にマッピングします。
- **`compileMmlToCommands`** (src/mml2json.js): MML文字列を内部的な音楽コマンドのリストにコンパイルする前処理関数です。
- **`getMmlCommands`** (src/mml2json.js): MMLコマンドのリストを取得する関数です。
- **`calcAttackToReleaseTicks`** (src/mml2json.js): 音符のアタックからリリースまでの時間（ティック単位）を計算する関数です。
- **`repeat`** (src/mml2json.js): 特定の処理やコマンドを繰り返し生成するためのヘルパー関数です。
- **`toInt`** (src/mml2json.js): 値を整数に変換するためのヘルパー関数です。
- **`calcDuration`** (src/mml2json.js): 音符の長さ（デュレーション）を計算する関数です。MMLの音長表記を内部的なティック数に変換します。
- **`calcStartTick`** (src/mml2json.js): 各音楽イベントの開始時刻（ティック単位）を計算する関数です。
- **`increaseStartTick`** (src/mml2json.js): 現在の開始ティック数を指定された量だけ増加させる関数です。
- **`calcLtick`** (src/mml2json.js): MMLのLコマンド（デフォルト音長）をティックに変換する関数です。
- **`getNodeId`** (src/mml2json.js): グラフ内のノードに一意のIDを割り当てる、または取得する関数です。
- **`sort`** (src/mml2json.js): 配列やリストの要素を特定の基準で並べ替えるための一般的なソート関数です。
- **`play`** (src/play.js): Tone.jsの機能を利用して、MMLから変換されたJSONシーケンサーデータをブラウザ上で実際に音として再生を開始する関数です。
- **`sub`** (src/play.js): サブプロセスや補助的な処理を実行するための関数です。
- **`if`**: コード内で条件分岐を制御するために使用されるロジックの一部です。
- **`for`**: コード内で繰り返し処理を制御するために使用されるロジックの一部です。

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
Generated at: 2025-07-19 07:03:57 JST
