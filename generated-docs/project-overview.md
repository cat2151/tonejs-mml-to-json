Last updated: 2025-08-03

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をWeb Audio APIのTone.jsが利用できるJSONシーケンサー形式へ変換するツールです。
- ユーザーはMML記法で記述された音楽をブラウザ上で簡単に演奏・視覚化できます。
- PEG.jsによるMMLパーサーとTone.jsによる音声生成を組み合わせ、MMLによる音楽プログラミングを可能にします。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーの構築に使用されます。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンスを可能にするJavaScriptライブラリ。
    - Tone.js CDN (unpkg) - Tone.jsライブラリを効率的に配信し、ブラウザで利用可能にするコンテンツデリバリーネットワーク。
    - MML (Music Macro Language) - 音楽をテキストで記述するための簡易的な記法。プロジェクトの中心となる入力フォーマットです。
    - Web Audio API - ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードの実行環境として利用されます。
    - npm scripts - パッケージ管理とタスク実行（ビルド、テスト、ドキュメント生成など）のためのスクリプトランナーです。
    - pnpm - 高速でディスク容量を効率的に使用するパッケージマネージャーです。
    - Google Generative AI - AIによる文書生成、特にプロジェクトの要約やドキュメント作成のサポートに利用されます。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得やIssue管理などの自動化を可能にします。
- テスト:
    - Vitest - Viteをベースとした高速なJavaScriptテストフレームワークです。
    - TDD (Test-Driven Development) - テストを先に書くことで、堅牢で品質の高いコードを開発する手法です。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) を用いてパーサーを自動生成するツールです。
    - PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールを定義します。
- 言語機能:
    - ES Modules - モダンなJavaScriptで推奨されるモジュールシステムで、コードの分割と再利用性を高めます。
- 自動化・CI/CD:
    - GitHub Actions - コードの変更を検知し、テスト、ビルド、デプロイ、ドキュメント生成、翻訳などのワークフローを自動化するCI/CDプラットフォームです。
        - プロジェクト要約自動生成
        - Issue自動管理
        - README多言語翻訳
        - i18n automation (自動翻訳ワークフロー)
- 開発標準:
    - EditorConfig - 異なるエディタやIDEを使用する開発者間でも、コードのインデントや文字コードなどのスタイルを統一するための設定ファイルです。

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
- **.editorconfig**: 異なる開発環境間でのコードスタイルの一貫性を維持するための設定ファイル。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定する設定ファイル。
- **LICENSE**: プロジェクトのライセンス情報が記載されたファイル。
- **README.ja.md**: プロジェクトの日本語版説明ドキュメント。概要、セットアップ、使用方法などが含まれる。
- **README.md**: プロジェクトの英語版説明ドキュメント。概要、セットアップ、使用方法などが含まれる。
- **dev-setup/README.md**: 開発環境のセットアップに関する説明を記載したドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップを自動化するためのJavaScriptスクリプト。
- **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出し関係を視覚的に表現した、強化版のHTMLドキュメント。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で利用される、関数呼び出しグラフの描画およびインタラクションロジックを提供するJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗に関する情報が記載されたドキュメント。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメント。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシート。
- **index.html**: プロジェクトのメインのデモページまたはエントリポイントとなるHTMLファイル。MML入力とTone.jsによる再生インターフェースを提供する。
- **issue-notes/** (ディレクトリ): GitHub Issuesに関連する詳細なメモや補足情報が個別のMarkdownファイルとして保存されているディレクトリ。
- **package.json**: Node.jsプロジェクトのメタデータ、スクリプト、依存関係などを定義する設定ファイル。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成されるロックファイル。プロジェクトの依存関係の正確なバージョンとツリー構造を記録し、ビルドの再現性を保証する。
- **src/grammar.js**: `src/grammar.pegjs`からPeggyによって自動生成されたMMLパーサーのJavaScriptコード。MML文字列を解析し、抽象構文木（AST）に変換する役割を持つ。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法ルールを定義するPEG (Parsing Expression Grammar) ファイル。このファイルが`src/grammar.js`を生成するための元となる。
- **src/index.html**: `src`ディレクトリ内にある、開発中のデモやテスト用のHTMLファイル。
- **src/main.js**: プロジェクトの主要なエントリスクリプト。MMLの変換とTone.jsを使った再生フローを統合的に管理する。
- **src/mml2json.js**: MMLの構文解析結果（AST）を、Tone.jsのシーケンサーが解釈可能なJSON形式のデータ構造に変換する核心ロジックを実装したファイル。音符の長さ、タイミング、繰り返しなどの音楽的な情報を計算する。
- **src/play.js**: `mml2json.js`によって生成されたTone.js JSONデータを実際にWeb Audio APIを通じて再生する機能を提供するJavaScriptファイル。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコード。Vitestフレームワークを使用。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイル。テストの実行方法やカバレッジ設定などを定義する。

## 関数詳細説明
- **catch** (dev-setup/setup.js):
    - 役割: エラーハンドリングのための一般的なブロック。非同期処理で発生した例外を捕捉し、適切な処理を実行します。
    - 引数: `error` (捕捉されたエラーオブジェクト)
    - 戻り値: なし
    - 機能: エラーメッセージのログ出力や、エラー状態に応じた処理の分岐を行います。
- **escapeHtml** (generated-docs/callgraph.js):
    - 役割: HTML特殊文字をエスケープし、安全に文字列を表示可能にするユーティリティ関数。
    - 引数: `text` (エスケープ対象の文字列)
    - 戻り値: `string` (エスケープされた文字列)
    - 機能: `<`、`>`、`&`、`"`などのHTMLエンティティを対応する文字参照に変換します。
- **getLayoutConfig** (generated-docs/callgraph.js):
    - 役割: グラフのレイアウト設定を取得する関数。
    - 引数: なし
    - 戻り値: `object` (レイアウト設定オブジェクト)
    - 機能: グラフの表示方法に関する設定（ノード間隔、アラインメントなど）を提供します。
- **placeCentralNode** (generated-docs/callgraph.js):
    - 役割: グラフの中心となるノードを配置する関数。
    - 引数: `node` (中心ノードのデータ)
    - 戻り値: なし
    - 機能: グラフの視覚的な中心に特定のノードを配置し、レイアウトの基準とします。
- **showNodeInfo** (generated-docs/callgraph.js):
    - 役割: 選択されたノード（関数）の詳細情報を表示する関数。
    - 引数: `node` (情報表示対象のノードデータ)
    - 戻り値: なし
    - 機能: ノードの名称、ファイルパス、関連する情報などをパネルに表示します。
- **showEdgeInfo** (generated-docs/callgraph.js):
    - 役割: 選択されたエッジ（関数呼び出し）の詳細情報を表示する関数。
    - 引数: `edge` (情報表示対象のエッジデータ)
    - 戻り値: なし
    - 機能: 呼び出し元、呼び出し先、呼び出し回数などの情報をパネルに表示します。
- **hideInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報表示パネルを非表示にする関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: ユーザーがノードやエッジの選択を解除した際に、情報パネルを閉じます。
- **showInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報表示パネルを表示する関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: ユーザーがノードやエッジを選択した際に、情報パネルを開きます。
- **toggleInfoPanel** (generated-docs/callgraph.js):
    - 役割: 情報表示パネルの表示/非表示を切り替える関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: パネルの現在の状態に応じて表示または非表示を切り替えます。
- **generateGitHubURL** (generated-docs/callgraph.js):
    - 役割: GitHub上のファイルや行にリンクするURLを生成する関数。
    - 引数: `path` (ファイルパス), `line` (行番号)
    - 戻り値: `string` (GitHub URL)
    - 機能: 選択された関数やファイルに対応するGitHubリポジトリのURLを生成し、直接ソースコードへアクセスできるようにします。
- **resetLayout** (generated-docs/callgraph.js):
    - 役割: グラフのレイアウトを初期状態にリセットする関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: ユーザーが手動で変更したノードの位置やズームレベルを初期設定に戻します。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js):
    - 役割: ノードの動きを監視し、オーバーラップを修正するラッパー関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: ノードのドラッグ操作中に、他のノードとの重なりをリアルタイムで解消する処理をトリガーします。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js):
    - 役割: ノードの動きを監視し、オーバーラップを修正するメインロジック。
    - 引数: なし
    - 戻り値: なし
    - 機能: `watchNodeMovementAndFixOverlapsWrap`から呼び出され、具体的な重なり解消のアルゴリズムを実行します。
- **resolveNodeOverlaps** (generated-docs/callgraph.js):
    - 役割: グラフ内のノードのオーバーラップ（重なり）を解消する関数。
    - 引数: `nodes` (ノードの配列)
    - 戻り値: なし
    - 機能: グラフの可読性を高めるため、重なり合ったノードを互いに押し離して配置します。
- **switchLayout** (generated-docs/callgraph.js):
    - 役割: グラフのレイアウトアルゴリズムを切り替える関数。
    - 引数: `layoutType` (切り替えたいレイアウトの種類)
    - 戻り値: なし
    - 機能: 異なる視覚的表現（例: 円形、階層型など）でグラフを表示します。
- **resetNodeStates** (generated-docs/callgraph.js):
    - 役割: グラフ内のノードの選択状態やハイライトをリセットする関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフの選択状態をクリアし、初期表示に戻します。
- **fitToContent** (generated-docs/callgraph.js):
    - 役割: グラフ全体がビューポートに収まるようにズームレベルを調整する関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフ全体を一目で確認できるように表示範囲を調整します。
- **toggleNodeLabels** (generated-docs/callgraph.js):
    - 役割: グラフノードのラベル（関数名など）の表示/非表示を切り替える関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: グラフの視認性を調整するためにラベルの表示を制御します。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js):
    - 役割: 関数呼び出し元の場所に基づいてフィルタリングを切り替える関数。
    - 引数: なし
    - 戻り値: なし
    - 機能: 特定のファイルやモジュールからの呼び出しのみを表示するなど、グラフの表示を絞り込みます。
- **replace** (generated-docs/callgraph.js):
    - 役割: 文字列置換を行う汎用関数。
    - 引数: `target` (置換対象文字列), `search` (検索文字列), `replacement` (置換文字列)
    - 戻り値: `string` (置換後の文字列)
    - 機能: 特定の文字列パターンを別のパターンに置き換えます。
- **switch** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js, src/play.js):
    - 役割: 複数の条件分岐を処理する制御フロー構文の一部。
    - 引数: `expression` (評価対象の式), `case_blocks` (各ケースに対応する処理ブロック)
    - 戻り値: なし
    - 機能: 式の値に応じて異なるコードブロックを実行します。
- **function** (generated-docs/callgraph.js, src/mml2json.js):
    - 役割: 関数定義を示すキーワード。
    - 引数: 可変 (定義された関数による)
    - 戻り値: 可変 (定義された関数による)
    - 機能: 独立したコードブロックを定義し、再利用可能な処理単位を作成します。
- **max** (generated-docs/callgraph.js):
    - 役割: 数値の最大値を取得する関数。
    - 引数: `num1, num2, ...` (比較対象の数値)
    - 戻り値: `number` (最大値)
    - 機能: 複数の数値の中から最も大きい値を見つけます。
- **on** (generated-docs/callgraph.js):
    - 役割: イベントリスナーを設定する関数。
    - 引数: `eventName` (イベント名), `handler` (イベントハンドラ関数)
    - 戻り値: なし
    - 機能: 特定のイベントが発生した際に指定された関数を実行するように登録します。
- **if** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js, src/play.js):
    - 役割: 条件分岐を処理する制御フロー構文の一部。
    - 引数: `condition` (真偽値を返す条件式), `true_block` (条件が真の場合の処理), `false_block` (条件が偽の場合の処理、オプション)
    - 戻り値: なし
    - 機能: 条件の真偽に基づいて異なるコードパスを実行します。
- **for** (generated-docs/callgraph.js, src/grammar.js, src/mml2json.js):
    - 役割: ループ処理を実行する制御フロー構文の一部。
    - 引数: `initialization` (初期化式), `condition` (継続条件), `increment` (更新式), `loop_block` (繰り返し実行される処理)
    - 戻り値: なし
    - 機能: 指定された回数または条件が満たされるまでコードブロックを繰り返し実行します。
- **ready** (generated-docs/callgraph.js):
    - 役割: ドキュメントの準備が完了した際に実行されるイベントハンドラ。
    - 引数: `callback` (準備完了時に実行する関数)
    - 戻り値: なし
    - 機能: HTMLドキュメントのDOMツリーが完全に構築され、スクリプトの実行準備が整ったことを検出します。
- **addListener** (generated-docs/callgraph.js):
    - 役割: イベントリスナーを追加する関数。
    - 引数: `event` (イベント名), `handler` (イベントハンドラ関数)
    - 戻り値: なし
    - 機能: 指定されたイベントが発生したときに実行される関数を登録します。
- **hex** (src/grammar.js):
    - 役割: 16進数文字を処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: MML中の16進数表記を解析します。
- **unicodeEscape** (src/grammar.js):
    - 役割: Unicodeエスケープシーケンスを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 文字列内のUnicodeエスケープシーケンス（例: `\uXXXX`）を解析します。
- **literalEscape** (src/grammar.js):
    - 役割: リテラルエスケープシーケンスを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: `\n`, `\t` などの特殊文字エスケープシーケンスを解析します。
- **classEscape** (src/grammar.js):
    - 役割: 文字クラス内のエスケープシーケンスを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 正規表現の文字クラス（例: `[a-z]`）内でエスケープされた文字を解析します。
- **describeExpectation** (src/grammar.js):
    - 役割: 期待されるトークンの種類を説明するパーサー内部関数。
    - 引数: `expectation` (期待値オブジェクト)
    - 戻り値: `string` (期待値の説明)
    - 機能: パーサーが予期した構文要素をユーザーフレンドリーな形式で説明します（主にエラーメッセージ用）。
- **describeExpected** (src/grammar.js):
    - 役割: 期待される複数の構文要素を結合して説明するパーサー内部関数。
    - 引数: `expectations` (期待値の配列)
    - 戻り値: `string` (結合された期待値の説明)
    - 機能: 複数の期待値がある場合に、それらを適切に連結してエラーメッセージに利用します。
- **describeFound** (src/grammar.js):
    - 役割: 実際に発見された不正なトークンを説明するパーサー内部関数。
    - 引数: `found` (発見されたトークン)
    - 戻り値: `string` (発見されたトークンの説明)
    - 機能: パーサーが予期しないトークンに遭遇した際、そのトークンを説明する文字列を生成します。
- **peg$parse** (src/grammar.js):
    - 役割: Peggyによって生成されたパーサーのメインエントリポイント。MML文字列を解析します。
    - 引数: `input` (解析対象のMML文字列), `options` (解析オプション)
    - 戻り値: `object` (解析結果のASTまたはエラー)
    - 機能: MML文字列を受け取り、定義された文法に従って構文木を構築します。
- **peg$f0** (src/grammar.js):
    - 役割: Peggyによって生成されたパーサー内の内部ヘルパー関数。
    - 引数: なし (コンテキストによる)
    - 戻り値: なし (コンテキストによる)
    - 機能: パーサーの特定のルールに関連する計算や処理を行います。
- **text** (src/grammar.js):
    - 役割: 現在解析中のテキストを取得するパーサー内部関数。
    - 引数: なし
    - 戻り値: `string` (現在の解析位置からのテキスト)
    - 機能: パーサーが現在処理しているテキストの一部を提供します。
- **offset** (src/grammar.js):
    - 役割: 現在の解析位置のオフセットを取得するパーサー内部関数。
    - 引数: なし
    - 戻り値: `number` (入力文字列の開始からの文字オフセット)
    - 機能: パーサーが現在入力文字列のどの位置にいるかを示します。
- **range** (src/grammar.js):
    - 役割: 解析結果に対応する入力文字列の範囲（開始・終了オフセット）を取得するパーサー内部関数。
    - 引数: なし
    - 戻り値: `array` (開始オフセットと終了オフセットの配列 `[start, end]`)
    - 機能: 構文要素が入力文字列のどの部分に対応するかを示します。
- **location** (src/grammar.js):
    - 役割: 現在の解析位置の行番号と列番号を取得するパーサー内部関数。
    - 引数: なし
    - 戻り値: `object` (位置情報オブジェクト `{line, column, offset}`)
    - 機能: エラーメッセージなどで利用される詳細な位置情報を提供します。
- **expected** (src/grammar.js):
    - 役割: 現在の解析位置で期待される構文要素のリストを取得するパーサー内部関数。
    - 引数: なし
    - 戻り値: `array` (期待される構文要素のリスト)
    - 機能: エラー発生時に、次に何が来るべきだったかを示す情報を提供します。
- **error** (src/grammar.js, dev-setup/setup.js):
    - 役割: 解析エラーを生成または処理する関数。
    - 引数: `message` (エラーメッセージ), `expected` (期待値), `found` (発見された値), `location` (エラー位置) など
    - 戻り値: `Error` (エラーオブジェクト) または なし
    - 機能: 構文エラーが発生した際に、エラーオブジェクトを構築し、エラー処理フローを開始します。
- **peg$getUnicode** (src/grammar.js):
    - 役割: Unicode文字を処理するためのパーサー内部関数。
    - 引数: なし (内部状態による)
    - 戻り値: なし (内部状態を更新)
    - 機能: Unicode文字の正しいバイト表現を扱います。
- **peg$literalExpectation** (src/grammar.js):
    - 役割: リテラル（固定文字列）が期待されることを示すオブジェクトを生成するパーサー内部関数。
    - 引数: `text` (期待されるリテラル文字列), `ignoreCase` (大文字小文字を区別するかどうか)
    - 戻り値: `object` (期待オブジェクト)
    - 機能: エラー報告時に、特定の文字列が期待されていたことを示します。
- **peg$classExpectation** (src/grammar.js):
    - 役割: 文字クラスが期待されることを示すオブジェクトを生成するパーサー内部関数。
    - 引数: `parts` (文字クラスの構成要素), `inverted` (反転フラグ), `ignoreCase` (大文字小文字を区別するかどうか)
    - 戻り値: `object` (期待オブジェクト)
    - 機能: エラー報告時に、特定の文字の集合が期待されていたことを示します。
- **peg$anyExpectation** (src/grammar.js):
    - 役割: 任意の文字が期待されることを示すオブジェクトを生成するパーサー内部関数。
    - 引数: なし
    - 戻り値: `object` (期待オブジェクト)
    - 機能: エラー報告時に、何らかの文字が期待されていたことを示します。
- **peg$endExpectation** (src/grammar.js):
    - 役割: 入力文字列の終端が期待されることを示すオブジェクトを生成するパーサー内部関数。
    - 引数: なし
    - 戻り値: `object` (期待オブジェクト)
    - 機能: エラー報告時に、入力の終了が期待されていたことを示します。
- **peg$otherExpectation** (src/grammar.js):
    - 役割: 特定のカスタムメッセージが期待されることを示すオブジェクトを生成するパーサー内部関数。
    - 引数: `description` (カスタム説明)
    - 戻り値: `object` (期待オブジェクト)
    - 機能: 汎用的な説明や特定のルールに関連するカスタム期待値をエラー報告に利用します。
- **peg$computePosDetails** (src/grammar.js):
    - 役割: 文字列中の指定されたオフセットに対する行番号と列番号を計算するパーサー内部関数。
    - 引数: `text` (入力文字列), `offset` (計算対象のオフセット)
    - 戻り値: `object` (位置詳細オブジェクト)
    - 機能: ソースコードの行と列の情報を効率的に計算します。
- **peg$computeLocation** (src/grammar.js):
    - 役割: 解析結果の開始・終了位置に対応する行番号、列番号、オフセットを計算するパーサー内部関数。
    - 引数: `startOffset` (開始オフセット), `endOffset` (終了オフセット)
    - 戻り値: `object` (位置情報オブジェクト)
    - 機能: 構文要素の正確なソースコード上の位置を提供します。
- **peg$fail** (src/grammar.js):
    - 役割: 解析失敗を記録するパーサー内部関数。
    - 引数: `expected` (期待される構文要素)
    - 戻り値: なし
    - 機能: パーサーが特定のルールにマッチしなかった場合に、エラー情報を蓄積します。
- **peg$buildSimpleError** (src/grammar.js):
    - 役割: シンプルなエラーメッセージを構築するパーサー内部関数。
    - 引数: `expected` (期待される要素のリスト), `found` (発見された要素), `location` (エラー位置)
    - 戻り値: `Error` (エラーオブジェクト)
    - 機能: 基本的な構文エラーメッセージを作成します。
- **peg$buildStructuredError** (src/grammar.js):
    - 役割: 構造化された詳細なエラーメッセージを構築するパーサー内部関数。
    - 引数: `expected` (期待される要素のリスト), `found` (発見された要素), `location` (エラー位置)
    - 戻り値: `Error` (エラーオブジェクト)
    - 機能: より詳細な情報を含むエラーメッセージを作成し、デバッグを支援します。
- **peg$parsestart** (src/grammar.js):
    - 役割: MMLパーサーの開始ルールを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: `object` (パーサー結果)
    - 機能: MML全体の解析を開始し、最終的なASTを生成します。
- **peg$parsenote** (src/grammar.js):
    - 役割: MMLパーサーの「note」ルール（音符の解析）を処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: `object` (音符のASTノード)
    - 機能: MML文字列から個々の音符や休符の情報を解析します。
- **peg$throw** (src/grammar.js):
    - 役割: パーサー内でエラーをスローするパーサー内部関数。
    - 引数: `error` (スローするエラーオブジェクト)
    - 戻り値: なし (例外をスロー)
    - 機能: 構文エラーを発生させ、解析プロセスを中断します。
- **constructor** (src/grammar.js):
    - 役割: JavaScriptのクラスまたはオブジェクトのコンストラクタ関数。
    - 引数: 可変 (オブジェクトの初期化引数)
    - 戻り値: なし
    - 機能: オブジェクトが生成される際に初期化処理を実行します。
- **format** (src/grammar.js):
    - 役割: 文字列のフォーマットを行うパーサー内部関数。
    - 引数: `message` (フォーマット文字列), `args` (挿入する引数)
    - 戻り値: `string` (フォーマットされた文字列)
    - 機能: エラーメッセージなどを整形するために使用されます。
- **buildMessage** (src/grammar.js):
    - 役割: エラーメッセージを構築するパーサー内部関数。
    - 引数: `expected` (期待される要素), `found` (発見された要素)
    - 戻り値: `string` (構築されたエラーメッセージ)
    - 機能: `describeExpected` や `describeFound` を用いてエラーメッセージの本文を生成します。
- **literal** (src/grammar.js):
    - 役割: リテラル（文字列）トークンを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 固定文字列のパターンマッチングを行います。
- **class** (src/grammar.js):
    - 役割: 文字クラス（例: `[a-zA-Z]`）トークンを処理するパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 定義された文字集合内の文字にマッチするかどうかを判定します。
- **any** (src/grammar.js):
    - 役割: 任意の文字にマッチするパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 入力ストリームから任意の1文字を消費します。
- **end** (src/grammar.js):
    - 役割: 入力ストリームの終端にマッチするパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: 入力の終わりに到達したことを確認します。
- **other** (src/grammar.js):
    - 役割: その他の汎用的なパーサー内部関数。
    - 引数: なし (パーサーの内部状態による)
    - 戻り値: なし (パーサーの内部状態を更新)
    - 機能: Peggyが生成する内部ロジックの一部として機能します。
- **while** (src/grammar.js):
    - 役割: 条件が真である限りループを繰り返す制御フロー構文の一部。
    - 引数: `condition` (ループ継続条件), `loop_block` (繰り返し実行される処理)
    - 戻り値: なし
    - 機能: 条件が満たされている間、コードブロックを繰り返し実行します。
- **start** (src/grammar.pegjs):
    - 役割: PEG文法の最上位ルール。MML文字列全体の解析を開始します。
    - 引数: なし (MML文字列)
    - 戻り値: `object` (解析されたMMLのAST)
    - 機能: MMLパーサーのエントリポイントとして、完全なMMLシーケンスの構造を定義します。
- **note** (src/grammar.pegjs):
    - 役割: PEG文法における個々の音符または休符を解析するルール。
    - 引数: なし (MML文字列中の音符部分)
    - 戻り値: `object` (音符または休符のASTノード)
    - 機能: 音の高さ、長さ、符点などのMML記法を個別の音楽イベントとして定義します。
- **mml2json** (src/mml2json.js):
    - 役割: MMLのAST (抽象構文木) をTone.jsが利用可能なJSONシーケンサー形式に変換するメイン関数。
    - 引数: `mmlAst` (MMLパーサーから得られたAST)
    - 戻り値: `object` (Tone.jsシーケンサー形式のJSONデータ)
    - 機能: MMLの音楽情報を解析し、Tone.jsのイベントスケジューリングに適したデータ構造に変換します。
- **compileMmlToCommands** (src/mml2json.js):
    - 役割: MMLのASTから、内部的な音楽コマンドのリストを生成する関数。
    - 引数: `mmlAst` (MMLのAST)
    - 戻り値: `array` (音楽コマンドの配列)
    - 機能: 音符、休符、テンポ変更、ボリューム変更など、MMLの各要素を具体的なコマンドとして抽出します。
- **getMmlCommands** (src/mml2json.js):
    - 役割: MML文字列をパースして音楽コマンドの配列を取得するヘルパー関数。
    - 引数: `mmlString` (MML文字列)
    - 戻り値: `array` (音楽コマンドの配列)
    - 機能: MMLパーサーを呼び出し、その結果をコマンド形式に変換します。
- **calcAttackToReleaseTicks** (src/mml2json.js):
    - 役割: 音符のアタックからリリースまでのティック数を計算する関数。
    - 引数: `durationTicks` (基本となる音符の長さのティック数), `legatoRatio` (レガート比率)
    - 戻り値: `number` (アタックからリリースまでのティック数)
    - 機能: 音符の表現力（レガート、スタッカートなど）を考慮した実際の演奏時間を計算します。
- **repeat** (src/mml2json.js):
    - 役割: 繰り返しブロックを処理する関数。
    - 引数: `commands` (繰り返しの内容となるコマンド配列), `count` (繰り返し回数)
    - 戻り値: `array` (展開されたコマンド配列)
    - 機能: MMLの繰り返し記号に対応し、指定された回数だけ音楽コマンドを複製します。
- **toInt** (src/mml2json.js):
    - 役割: 文字列を整数に安全に変換するユーティリティ関数。
    - 引数: `value` (変換対象の値)
    - 戻り値: `number` (整数)
    - 機能: パース結果の数値表現を内部計算に利用できる整数に変換します。
- **calcDuration** (src/mml2json.js):
    - 役割: MMLの音符表記からティック単位の演奏時間を計算する関数。
    - 引数: `durationString` (MMLの長さ表記), `currentDuration` (現在のデフォルトの長さ)
    - 戻り値: `number` (ティック単位での長さ)
    - 機能: 例: `c4`の`4`や`c8.`の`8.`などを解析し、具体的な演奏時間を計算します。
- **calcStartTick** (src/mml2json.js):
    - 役割: 各音楽イベントの開始ティックを計算する関数。
    - 引数: `currentTick` (現在のティック位置), `durationTicks` (イベントの長さ)
    - 戻り値: `number` (イベントの開始ティック)
    - 機能: イベントがいつ始まるかを決定し、シーケンサーのタイムライン上に配置します。
- **increaseStartTick** (src/mml2json.js):
    - 役割: 現在のティック位置を指定された量だけ進める関数。
    - 引数: `currentTick` (現在のティック位置), `amount` (進める量)
    - 戻り値: `number` (更新されたティック位置)
    - 機能: 音符の長さや休符に基づいて、次のイベントの開始位置を調整します。
- **calcLtick** (src/mml2json.js):
    - 役割: 音符の長さ（L）コマンドによって指定されるティック値を計算する関数。
    - 引数: `lValue` (Lコマンドの値)
    - 戻り値: `number` (計算されたティック値)
    - 機能: MMLのLコマンド（デフォルトの音符長を設定）を数値に変換します。
- **getNodeId** (src/mml2json.js):
    - 役割: ASTノードから一意のIDを取得する関数。
    - 引数: `node` (ASTノード)
    - 戻り値: `string` (ノードID)
    - 機能: 各ノードを識別するためのIDを提供し、デバッグや内部処理に利用します。
- **sort** (src/mml2json.js):
    - 役割: 配列の要素を並べ替える関数。
    - 引数: `array` (ソート対象の配列), `compareFunction` (比較関数)
    - 戻り値: `array` (ソートされた配列)
    - 機能: 音楽イベントが時間順に正しく並べられるようにソートします。
- **play** (src/play.js):
    - 役割: Tone.js JSONデータを実際にWeb Audio APIを通じて再生するメイン関数。
    - 引数: `jsonData` (Tone.jsシーケンサー形式のJSONデータ)
    - 戻り値: `Promise<void>` (再生完了時に解決するPromise)
    - 機能: Tone.jsのインスタンスを初期化し、JSONデータを基に音源をロード、シーケンスを開始します。
- **sub** (src/play.js):
    - 役割: 補助的な計算や処理を行うユーティリティ関数。
    - 引数: 可変 (コンテキストによる)
    - 戻り値: 可変 (コンテキストによる)
    - 機能: 再生ロジック内で必要なサブ計算やデータ変換を行います。

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
Generated at: 2025-08-03 07:04:05 JST
