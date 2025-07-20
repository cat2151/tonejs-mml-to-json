Last updated: 2025-07-21

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) 形式の音楽データを解析し、Web Audio APIライブラリTone.jsが利用可能なJSONシーケンサーフォーマットに変換するツールです。
- この変換により、ブラウザ上でMML記述された楽曲を高品質に再生することを可能にし、手軽なMMLプレイヤー機能を提供します。
- Peggyパーサージェネレーターを用いてMMLの強力な解析エンジンを構築し、音楽表現のデジタル化とWeb上での活用を支援します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンスを可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトに組み込みます。
    - MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトのパーシング対象です。
    - Web Audio API - ブラウザに内蔵された音声処理APIで、Tone.jsを通じて間接的に利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境です。
    - npm scripts - package.jsonに定義されたスクリプトを実行し、ビルド、テスト、ドキュメント生成などのタスクを自動化します。
    - pnpm - 高速で効率的なパッケージマネージャーであり、依存関係の管理に使用されます。
    - Google Generative AI - プロジェクトの文書生成（例: 要約、翻訳）をAIでサポートするために利用されます。
    - @octokit/rest - GitHub APIと連携し、Issue管理やドキュメント生成などの自動化に貢献します。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークであり、プロジェクトの単体テストや統合テストに使用されます。
    - TDD (Test-Driven Development) - テストを先に記述し、それに合わせてコードを開発する手法で、品質の高いコードベースを維持します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターであり、MMLの解析ロジックを自動生成するために使用されます。
    - PEG文法定義 - MML音楽記法のパーサーを生成するための文法ルールを定義したファイルです。
- 言語機能:
    - ES Modules - モダンなJavaScriptモジュールシステムであり、コードのモジュール化と依存関係の管理を標準的な方法で行います。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション・継続的デリバリー）を自動化するためのワークフロープラットフォームです。
        - プロジェクト要約自動生成: プロジェクトの概要を自動で生成します。
        - Issue自動管理: GitHub Issuesのライフサイクルを自動化します。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳します。
        - i18n automation: 国際化対応に関する自動化ワークフローです。
- 開発標準:
    - EditorConfig - 異なるエディタやIDEを使用する開発者間で、コードのインデント、改行コード、文字コードなどのスタイルを統一するための設定ファイルです。

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
- **.editorconfig**: 複数の開発者やエディタ間で、コードのインデントスタイル、文字コード、改行コードなどのフォーマットを統一するための設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定する設定ファイルです。
- **LICENSE**: プロジェクトの配布条件や利用許諾を定めるライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの日本語版の概要、使い方、ビルド方法などを説明する主要なドキュメントファイルです。
- **README.md**: プロジェクトの英語版の概要、使い方、ビルド方法などを説明する主要なドキュメントファイルです。
- **dev-setup/README.md**: 開発環境のセットアップ手順や関連情報が記述されています。
- **dev-setup/setup.js**: 開発環境の準備やセットアップを自動化するためのスクリプトです。テスト環境の初期化や設定などを行う可能性があります。
- **generated-docs/callgraph-enhanced.html**: プロジェクトの関数呼び出し階層を視覚的に表現したHTMLドキュメントであり、対話的な操作が可能です。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で関数呼び出し階層の描画やインタラクションを制御するJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況、進捗、今後の計画などが記述されたドキュメントです。
- **generated-docs/project-overview.md**: プロジェクトの全体的な概要をまとめたドキュメントファイルです。
- **generated-docs/style.css**: 生成されたドキュメント（特に呼び出しグラフ）の表示スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのWebデモページやメインの入り口となるHTMLファイルです。MML入力と変換・再生機能を提供します。
- **issue-notes/ (各種 .md ファイル)**: GitHub Issuesに関連するメモや詳細な議論を記録するディレクトリです。各ファイルが特定のIssueに対応している可能性があります。
- **package.json**: Node.jsプロジェクトのメタデータ（名前、バージョン）、依存関係（dependencies, devDependencies）、実行スクリプト（scripts）などを定義するファイルです。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、プロジェクトの依存関係ツリーの正確なバージョンとハッシュを記録するロックファイルです。再現性のあるビルドを保証します。
- **src/grammar.js**: Peggyによって`grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文ツリー（AST）を構築するコアロジックを含みます。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文を定義したPEG (Parsing Expression Grammar) ファイルです。これを基に`src/grammar.js`が生成されます。
- **src/index.html**: `index.html`と同様に、プロジェクトのWebデモまたはアプリケーションのルートとなるHTMLファイルです。
- **src/main.js**: メインのアプリケーションロジックを記述するJavaScriptファイルです。MMLパーサーとTone.jsの連携を担う可能性があります。
- **src/mml2json.js**: MML解析結果をTone.jsのJSONシーケンサーフォーマットに変換する主要なロジックが実装されているJavaScriptファイルです。
- **src/play.js**: Tone.jsを使用して、変換されたJSONデータに基づきMML音楽をブラウザで再生するロジックが実装されているJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で生成されたMMLパーサーの正確性を検証するためのテストコードです。Vitestフレームワークを使用しています。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。テスト実行時の動作やオプションを定義します。

## 関数詳細説明
- **catch (dev-setup/setup.js)**:
    - 役割: エラー処理を担う関数です。テストのセットアップや非同期処理中の例外を捕捉し、適切な処理を行います。
    - 引数: `error` (捕捉されたエラーオブジェクト)
    - 戻り値: 不明 (通常はvoidまたはエラー情報)
    - 機能: エラー発生時にデバッグ情報表示やクリーンアップ処理を行うことが想定されます。
- **escapeHtml (generated-docs/callgraph.js)**:
    - 役割: HTML特殊文字を安全にエスケープし、スクリプトインジェクションなどのセキュリティリスクを防ぎます。
    - 引数: `str` (エスケープ対象の文字列)
    - 戻り値: エスケープされた文字列
    - 機能: `<, >, &, ", '` などの文字を対応するHTMLエンティティに変換します。
- **getLayoutConfig (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフのレイアウト設定を取得または生成します。
    - 引数: 不明
    - 戻り値: レイアウト設定オブジェクト
    - 機能: グラフの表示方法に関する設定（例: ノード間隔、配置アルゴリズム）を提供します。
- **placeCentralNode (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフの中央ノードを特定の場所に配置します。
    - 引数: 不明 (通常はノードIDや座標)
    - 戻り値: void
    - 機能: グラフの視覚的な中心を決定し、レイアウトの基準点とします。
- **showNodeInfo (generated-docs/callgraph.js)**:
    - 役割: 選択されたノード（関数）に関する詳細情報を表示します。
    - 引数: 不明 (選択されたノードのデータ)
    - 戻り値: void
    - 機能: 関数名、ファイルパス、関連する情報などをユーザーインターフェースに表示します。
- **showEdgeInfo (generated-docs/callgraph.js)**:
    - 役割: 選択されたエッジ（呼び出し関係）に関する詳細情報を表示します。
    - 引数: 不明 (選択されたエッジのデータ)
    - 戻り値: void
    - 機能: 呼び出し元と呼び出し先の情報、呼び出しの種類などを表示します。
- **hideInfoPanel (generated-docs/callgraph.js)**:
    - 役割: 情報を表示するパネルを非表示にします。
    - 引数: なし
    - 戻り値: void
    - 機能: ノードやエッジの詳細情報パネルを画面から隠します。
- **showInfoPanel (generated-docs/callgraph.js)**:
    - 役割: 情報を表示するパネルを表示します。
    - 引数: なし
    - 戻り値: void
    - 機能: 非表示になっているノードやエッジの詳細情報パネルを画面に表示します。
- **toggleInfoPanel (generated-docs/callgraph.js)**:
    - 役割: 情報パネルの表示/非表示を切り替えます。
    - 引数: なし
    - 戻り値: void
    - 機能: 現在の状態に応じてパネルを隠すか表示するかを制御します。
- **generateGitHubURL (generated-docs/callgraph.js)**:
    - 役割: GitHub上の対応するファイルやコード行へのURLを生成します。
    - 引数: 不明 (ファイルパス、行番号など)
    - 戻り値: 生成されたGitHub URL (文字列)
    - 機能: 呼び出しグラフのノードから直接ソースコードにアクセスできるようにします。
- **resetLayout (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフのレイアウトを初期状態にリセットします。
    - 引数: なし
    - 戻り値: void
    - 機能: 手動で変更されたノード配置などを元のアルゴリズムに基づく状態に戻します。
- **watchNodeMovementAndFixOverlapsWrap (generated-docs/callgraph.js)**:
    - 役割: ノードの移動を監視し、その重なりを修正するロジックをラップする関数です。
    - 引数: 不明
    - 戻り値: void
    - 機能: `watchNodeMovementAndFixOverlaps` を適切なタイミングで呼び出すためのラッパー機能を提供します。
- **watchNodeMovementAndFixOverlaps (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフ内のノードの移動を監視し、ノード同士が重ならないように配置を調整します。
    - 引数: 不明 (グラフオブジェクトやノード情報)
    - 戻り値: void
    - 機能: 動的なレイアウト調整やユーザー操作によるノード移動後の重なり解消を行います。
- **resolveNodeOverlaps (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフ内の重なっているノードを検出し、重ならないように配置を解決します。
    - 引数: 不明 (ノードの集合)
    - 戻り値: void
    - 機能: 視認性を向上させるため、ノードの衝突を解消します。
- **switchLayout (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフの表示レイアウトを切り替えます。
    - 引数: 不明 (レイアウトの種類)
    - 戻り値: void
    - 機能: 異なるアルゴリズム（例: 力学モデル、ツリー）に基づいてノードを再配置します。
- **resetNodeStates (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフ内のノードの状態（例: 選択状態、ハイライト）を初期状態にリセットします。
    - 引数: なし
    - 戻り値: void
    - 機能: グラフの表示をクリアし、特定のノードに適用された視覚的状態を解除します。
- **fitToContent (generated-docs/callgraph.js)**:
    - 役割: グラフ全体がビューポートに収まるようにズームレベルやパン位置を調整します。
    - 引数: なし
    - 戻り値: void
    - 機能: 全てのノードが画面内に表示されるように、キャンバスを調整します。
- **toggleNodeLabels (generated-docs/callgraph.js)**:
    - 役割: 呼び出しグラフのノードラベル（関数名など）の表示/非表示を切り替えます。
    - 引数: なし
    - 戻り値: void
    - 機能: グラフの視認性向上や簡素化のためにラベル表示を制御します。
- **toggleCalleeLocationFilter (generated-docs/callgraph.js)**:
    - 役割: 呼び出し先の位置（ファイルパスなど）に基づいてノードをフィルタリングする機能の表示/非表示を切り替えます。
    - 引数: なし
    - 戻り値: void
    - 機能: 特定のファイルやモジュールに関連する関数呼び出しのみを表示するためのフィルタリングUIを制御します。
- **replace (generated-docs/callgraph.js)**:
    - 役割: 文字列内の特定のパターンを別の文字列に置換します。
    - 引数: `target` (置換対象文字列), `pattern` (置換するパターン), `replacement` (置換後の文字列)
    - 戻り値: 置換後の文字列
    - 機能: データ処理や表示文字列の整形に用いられます。
- **function (generated-docs/callgraph.js)**:
    - 役割: 匿名関数または特定のコンテキスト内で定義される内部関数。動的なコールバックや処理のラップに利用されることがあります。
    - 引数: コンテキストによる
    - 戻り値: コンテキストによる
    - 機能: 通常はイベントハンドラや高階関数の引数として特定の処理をカプセル化します。
- **max (generated-docs/callgraph.js)**:
    - 役割: 複数の数値の中から最大値を見つけます。
    - 引数: `a`, `b`, ... (数値)
    - 戻り値: 最大値
    - 機能: レイアウト計算や表示範囲の調整などで利用されます。
- **on (generated-docs/callgraph.js)**:
    - 役割: 特定のイベントが発生したときに実行されるリスナー関数を登録します。
    - 引数: `eventType` (イベントの種類), `handler` (イベント発生時に実行される関数)
    - 戻り値: void
    - 機能: ユーザーの操作やシステムイベントに応じたリアクションを実装します。
- **if (generated-docs/callgraph.js)**:
    - 役割: 条件分岐ロジックを定義する構成要素です。JavaScriptのキーワードであり、通常は関数として直接呼び出されるものではありませんが、コード生成ツールが内部的な処理構造を関数として表現した場合にリストされます。
    - 引数: `condition` (真偽値), `thenBlock`, `elseBlock` (実行されるコードブロック)
    - 戻り値: なし (制御フロー)
    - 機能: 条件に基づいて異なるコードパスを実行します。
- **for (generated-docs/callgraph.js)**:
    - 役割: 繰り返し処理を行う構成要素です。JavaScriptのキーワードであり、通常は関数として直接呼び出されるものではありません。
    - 引数: `initialization`, `condition`, `increment` (ループ制御), `body` (繰り返し実行されるコードブロック)
    - 戻り値: なし (制御フロー)
    - 機能: 指定された回数または条件が満たされるまでコードブロックを繰り返し実行します。
- **ready (generated-docs/callgraph.js)**:
    - 役割: ドキュメントオブジェクトモデル（DOM）が完全にロードされ、操作可能になったときに実行されるコールバックを設定します。
    - 引数: `callback` (DOM準備完了時に実行される関数)
    - 戻り値: void
    - 機能: ページ読み込み後にスクリプトを安全に実行するために使用されます。
- **addListener (generated-docs/callgraph.js)**:
    - 役割: 特定の要素やオブジェクトにイベントリスナーを追加します。
    - 引数: `event`, `listener` (イベント名とイベントハンドラ関数)
    - 戻り値: void
    - 機能: `on`と同様に、イベント駆動型プログラミングを可能にします。
- **mml2json (src/mml2json.js)**:
    - 役割: MML形式の文字列をTone.jsのJSONシーケンサーフォーマットに変換するメイン関数です。
    - 引数: `mmlString` (MML形式の文字列)
    - 戻り値: `jsonOutput` (Tone.jsシーケンサーフォーマットに準拠したJSONオブジェクト)
    - 機能: MMLパーサーの出力を受け取り、音楽イベント（ノート、休符、テンポ変更など）を時間軸上のコマンドに変換し、それを最終的なJSON構造にマッピングします。
- **compileMmlToCommands (src/mml2json.js)**:
    - 役割: MMLをより扱いやすい内部コマンドリストにコンパイルします。
    - 引数: `mmlData` (MMLの解析結果)
    - 戻り値: `commands` (音楽イベントを表すコマンドの配列)
    - 機能: MMLの構文要素を、実際の音符や休符、制御コマンドなどの抽象的な表現に変換します。
- **getMmlCommands (src/mml2json.js)**:
    - 役割: MMLから解析された音楽コマンドのリストを取得します。
    - 引数: 不明 (MML解析ツリー)
    - 戻り値: `commands` (解析されたコマンドの配列)
    - 機能: MMLパーサーの出力から、シーケンスに必要な個々の音楽的イベントを抽出します。
- **calcAttackToReleaseTicks (src/mml2json.js)**:
    - 役割: 音符のアタックからリリースまでの時間（ティック単位）を計算します。
    - 引数: `noteDuration`, `mmlTickRate` など (音符の長さ、MMLのティックレート)
    - 戻り値: `ticks` (計算されたティック数)
    - 機能: MMLの記法に基づいて、音符の持続時間をTone.jsが解釈できる時間単位に変換します。
- **repeat (src/mml2json.js)**:
    - 役割: MMLの繰り返しブロック（例: `[CDEFG]`）を処理し、展開します。
    - 引数: `repeatBlock` (繰り返し定義), `count` (繰り返し回数)
    - 戻り値: `expandedSequence` (展開されたMMLコマンドまたは音符列)
    - 機能: MMLの繰り返し構造を解析し、実際に演奏される一連の音符やコマンドに変換します。
- **toInt (src/mml2json.js)**:
    - 役割: 与えられた値を整数に変換します。
    - 引数: `value` (数値または数値に変換可能な文字列)
    - 戻り値: `integer` (変換された整数)
    - 機能: MMLのパラメータ（例: 音量、オクターブ）を数値として扱うために使用されます。
- **calcDuration (src/mml2json.js)**:
    - 役割: MMLの音符や休符の指定から実際の持続時間（ティック単位）を計算します。
    - 引数: `noteLength`, `dotCount`, `currentTempo` など (MMLの音長表記、付点数、テンポ)
    - 戻り値: `durationTicks` (計算された持続時間)
    - 機能: MMLの記号を基に、正確な音符の長さを算出します。
- **calcStartTick (src/mml2json.js)**:
    - 役割: 各音楽イベントが開始する時刻（ティック単位）を計算します。
    - 引数: `previousEndTick`, `currentDuration` など (前のイベントの終了時刻、現在のイベントの持続時間)
    - 戻り値: `startTick` (計算された開始時刻)
    - 機能: シーケンス内のイベントのタイミングを正確に配置するために使用されます。
- **increaseStartTick (src/mml2json.js)**:
    - 役割: 現在の開始ティックを特定の量だけ増加させます。
    - 引数: `currentTick`, `amount` (現在のティック、増加量)
    - 戻り値: `newTick` (増加後のティック)
    - 機能: シーケンス中のポインタを進めるなど、時間管理に利用されます。
- **calcLtick (src/mml2json.js)**:
    - 役割: MMLにおける`L`コマンド（音長指定）に対応するティック値を計算します。
    - 引数: `lValue` (Lコマンドの値)
    - 戻り値: `ltickValue` (計算されたティック値)
    - 機能: グローバルな音長設定をMMLの内部ティックに変換します。
- **getNodeId (src/mml2json.js)**:
    - 役割: シーケンサーのノード（音楽イベント）に一意のIDを割り当てます。
    - 引数: 不明 (イベントデータ)
    - 戻り値: `id` (生成された一意のID)
    - 機能: 各イベントを識別可能にし、Tone.jsシーケンサーで管理しやすくします。
- **sort (src/mml2json.js)**:
    - 役割: 音楽イベントのリストやコマンドを特定の基準（例: 開始時刻）でソートします。
    - 引数: `array` (ソート対象の配列), `compareFunction` (比較関数)
    - 戻り値: `sortedArray` (ソートされた配列)
    - 機能: イベントを時間順に並べ替え、正しいシーケンス実行を保証します。
- **play (src/play.js)**:
    - 役割: 変換されたJSONデータを使用して、Tone.jsによる音楽再生を開始します。
    - 引数: `jsonData` (Tone.jsシーケンサーフォーマットのJSONデータ)
    - 戻り値: void
    - 機能: Tone.jsのインスタンスを初期化し、JSONデータを読み込み、再生を開始します。
- **sub (src/play.js)**:
    - 役割: 減算処理、またはサブモジュール/サブプロセスを表す汎用的な関数です。コンテキストに依存して具体的な機能が異なります。
    - 引数: 不明 (通常は数値またはデータ)
    - 戻り値: 不明 (通常は計算結果または処理結果)
    - 機能: 音量調整、時間計算、またはサブステップの実行など。
- **hex (src/grammar.js)**:
    - 役割: 16進数に関連する処理を行います。主にパーサー内部で数値や文字のエスケープ処理に利用されます。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 16進数文字列から数値への変換やその逆など。
- **unicodeEscape (src/grammar.js)**:
    - 役割: Unicodeエスケープシーケンスを処理します。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: ソースコード内のUnicodeエスケープ文字を実際の文字に変換する際に使用されます。
- **literalEscape (src/grammar.js)**:
    - 役割: リテラル文字列内の特殊文字をエスケープ解除またはエスケープします。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: パーサーが文字列リテラルを正しく解釈するために使用されます。
- **classEscape (src/grammar.js)**:
    - 役割: 文字クラス（正規表現の `[a-z]` など）内の特殊文字をエスケープ解除またはエスケープします。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: パーサーが文字クラス定義を正しく解釈するために使用されます。
- **describeExpectation (src/grammar.js)**:
    - 役割: パーサーが特定の入力で何を期待していたかを説明するエラーメッセージの一部を生成します。
    - 引数: `expectation` (期待されるもののタイプ)
    - 戻り値: `description` (説明文字列)
    - 機能: パースエラーメッセージの可読性を高めます。
- **describeExpected (src/grammar.js)**:
    - 役割: パースエラー発生時に期待されていた要素（例: 特定の文字、ルール）を記述します。
    - 引数: `expected` (期待されていた要素の配列)
    - 戻り値: `description` (期待された要素の記述)
    - 機能: エラー報告の精度を高めます。
- **describeFound (src/grammar.js)**:
    - 役割: パースエラー発生時に実際に見つかった要素を記述します。
    - 引数: `found` (見つかった文字またはEOF)
    - 戻り値: `description` (見つかった要素の記述)
    - 機能: エラー報告の精度を高めます。
- **peg$parse (src/grammar.js)**:
    - 役割: Peggyによって生成されたMML文法に基づき、入力文字列を解析するメイン関数です。
    - 引数: `input` (解析対象のMML文字列), `options` (解析オプション)
    - 戻り値: `ast` (解析結果の抽象構文ツリー)
    - 機能: MML文字列を構文規則に従ってトークン化し、ツリー構造に変換します。
- **peg$f0 (src/grammar.js)**:
    - 役割: Peggyが生成する内部ヘルパー関数の一つで、パース処理の特定のステップで呼び出されます。
    - 引数: コンテキストによる
    - 戻り値: コンテキストによる
    - 機能: 文法ルールに対応するアクションやセマンティックチェックを実行します。
- **text (src/grammar.js)**:
    - 役割: パーサーが現在処理している入力文字列のテキスト部分を取得します。
    - 引数: なし
    - 戻り値: `currentText` (文字列)
    - 機能: パース中に特定のトークンの値を直接取得するために使用されます。
- **offset (src/grammar.js)**:
    - 役割: パーサーが現在処理している入力文字列内のオフセット（バイト位置）を取得します。
    - 引数: なし
    - 戻り値: `offset` (数値)
    - 機能: エラー報告や位置情報に関連する処理で使用されます。
- **range (src/grammar.js)**:
    - 役割: 現在パース中の入力範囲（開始オフセットと終了オフセット）を取得します。
    - 引数: なし
    - 戻り値: `[startOffset, endOffset]` (配列)
    - 機能: ASTノードにソースコード上の位置情報を付与するために使用されます。
- **location (src/grammar.js)**:
    - 役割: 現在パース中の入力の正確な位置情報（行番号、列番号など）を取得します。
    - 引数: なし
    - 戻り値: `locationObject` (位置情報オブジェクト)
    - 機能: エラーメッセージやデバッグ情報で具体的なソースコード上の場所を示すために使用されます。
- **expected (src/grammar.js)**:
    - 役割: パースエラー時にパーサーが期待していた要素のリストを管理します。
    - 引数: `expectation` (追加する期待値)
    - 戻り値: void
    - 機能: エラー報告システムの一部として、より詳細なエラーメッセージを生成します。
- **error (src/grammar.js)**:
    - 役割: パースエラーオブジェクトを生成し、スローします。
    - 引数: `message` (エラーメッセージ), `expected` (期待されていたもの), `found` (見つかったもの), `location` (エラー位置)
    - 戻り値: なし (例外をスロー)
    - 機能: 構文解析中にエラーが発生した際に、その詳細を伝えるために使用されます。
- **peg$getUnicode (src/grammar.js)**:
    - 役割: Unicode文字を取得し、その特性に基づいて処理を行います。
    - 引数: 不明
    - 戻り値: Unicode文字
    - 機能: パーサーが様々な文字セットを正確に扱えるようにします。
- **peg$literalExpectation (src/grammar.js)**:
    - 役割: 特定のリテラル文字列が期待されることを示す期待値オブジェクトを生成します。
    - 引数: `value` (期待されるリテラル文字列), `inverted` (反転フラグ)
    - 戻り値: 期待値オブジェクト
    - 機能: エラーメッセージの生成に利用されます。
- **peg$classExpectation (src/grammar.js)**:
    - 役割: 特定の文字クラス（例: `[a-z]`）が期待されることを示す期待値オブジェクトを生成します。
    - 引数: `value` (期待される文字クラス表現), `inverted` (反転フラグ), `ignoreCase` (大文字小文字無視フラグ)
    - 戻り値: 期待値オブジェクト
    - 機能: エラーメッセージの生成に利用されます。
- **peg$anyExpectation (src/grammar.js)**:
    - 役割: 任意の文字が期待されることを示す期待値オブジェクトを生成します。
    - 引数: なし
    - 戻り値: 期待値オブジェクト
    - 機能: エラーメッセージの生成に利用されます。
- **peg$endExpectation (src/grammar.js)**:
    - 役割: 入力文字列の終端（EOF）が期待されることを示す期待値オブジェクトを生成します。
    - 引数: なし
    - 戻り値: 期待値オブジェクト
    - 機能: エラーメッセージの生成に利用されます。
- **peg$otherExpectation (src/grammar.js)**:
    - 役割: リテラルや文字クラス以外の、一般的な期待される要素（例: ルール名）を示す期待値オブジェクトを生成します。
    - 引数: `description` (期待値の説明)
    - 戻り値: 期待値オブジェクト
    - 機能: エラーメッセージの生成に利用されます。
- **peg$computePosDetails (src/grammar.js)**:
    - 役割: 入力文字列内の特定のオフセットに対する行、列、オフセットなどの詳細な位置情報を計算します。
    - 引数: `offset` (位置情報取得対象のオフセット)
    - 戻り値: 位置詳細オブジェクト
    - 機能: エラー報告で正確なソースコード位置を提供するために使用されます。
- **peg$computeLocation (src/grammar.js)**:
    - 役割: パース結果のASTノードに付与する、ソースコード上の開始・終了位置情報を計算します。
    - 引数: `startOffset`, `endOffset` (開始・終了オフセット)
    - 戻り値: 位置情報オブジェクト
    - 機能: ASTノードとソースコードの対応付けを行います。
- **peg$fail (src/grammar.js)**:
    - 役割: パースが失敗したことを示し、関連するエラー情報を記録します。
    - 引数: `expectation` (失敗時の期待値)
    - 戻り値: なし
    - 機能: 文法ルールにマッチしなかった場合に呼び出され、エラー処理に繋がります。
- **peg$buildSimpleError (src/grammar.js)**:
    - 役割: シンプルな形式のパースエラーメッセージを構築します。
    - 引数: `message` (エラーメッセージ), `expected` (期待された要素), `found` (見つかった要素), `location` (エラー位置)
    - 戻り値: `Error`オブジェクト
    - 機能: エラーオブジェクトの作成に使用されます。
- **peg$buildStructuredError (src/grammar.js)**:
    - 役割: より詳細な構造化されたパースエラーメッセージを構築します。
    - 引数: `message`, `expected`, `found`, `location`
    - 戻り値: `Error`オブジェクト
    - 機能: デバッグやユーザーへの詳細なエラー通知のために使用されます。
- **peg$parsestart (src/grammar.js)**:
    - 役割: Peggy文法で定義された`start`ルールをパースします。通常、MMLの全体を解析するエントリポイントです。
    - 引数: なし
    - 戻り値: `astNode` (開始ルールに対応するASTノード)
    - 機能: 入力文字列全体のパースを開始します。
- **peg$parsenote (src/grammar.js)**:
    - 役割: Peggy文法で定義された`note`ルール（単一の音符や休符）をパースします。
    - 引数: なし
    - 戻り値: `astNode` (noteルールに対応するASTノード)
    - 機能: 個々の音符記号を解析します。
- **peg$throw (src/grammar.js)**:
    - 役割: パースエラーを発生させるための例外をスローします。
    - 引数: `errorObject` (スローするエラーオブジェクト)
    - 戻り値: なし (例外をスロー)
    - 機能: パース処理の異常終了を伝達します。
- **constructor (src/grammar.js)**:
    - 役割: クラスのインスタンスが生成される際に初期化処理を行う特殊な関数です。Peggyによって生成されたパーサークラスのコンストラクタとして機能します。
    - 引数: 不明 (通常は初期化パラメータ)
    - 戻り値: なし
    - 機能: パーサーの状態や設定を初期化します。
- **format (src/grammar.js)**:
    - 役割: エラーメッセージやその他の情報を整形します。
    - 引数: `templateString`, `args...` (フォーマット文字列と引数)
    - 戻り値: フォーマット済み文字列
    - 機能: 出力テキストの可読性を高めます。
- **buildMessage (src/grammar.js)**:
    - 役割: エラーメッセージの本文を構築します。
    - 引数: `expected`, `found` など (エラー報告に必要な情報)
    - 戻り値: `messageString`
    - 機能: `describeExpected` や `describeFound` などの結果を統合し、完全なエラーメッセージを作成します。
- **literal (src/grammar.js)**:
    - 役割: MMLパーサーにおけるリテラル（特定の文字列）の処理に関連する関数。
    - 引数: 不明
    戻り値: 不明
    - 機能: 特定のキーワードや記号のマッチングを扱います。
- **class (src/grammar.js)**:
    - 役割: MMLパーサーにおける文字クラス（ある範囲の文字）の処理に関連する関数。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 特定の文字集合（例: 数字、アルファベット）のマッチングを扱います。
- **any (src/grammar.js)**:
    - 役割: MMLパーサーにおいて、任意の文字のマッチング処理に関連する関数。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: 次の文字を消費する際に使用されます。
- **end (src/grammar.js)**:
    - 役割: MMLパーサーにおいて、入力の終端（EOF）の処理に関連する関数。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: パースが入力の最後に達したかをチェックします。
- **other (src/grammar.js)**:
    - 役割: MMLパーサーにおけるその他の要素のマッチング処理に関連する関数。
    - 引数: 不明
    - 戻り値: 不明
    - 機能: リテラルやクラスに該当しない、一般的なパターンのマッチングを扱います。
- **switch (src/grammar.js)**:
    - 役割: 複数の条件に基づいて異なるコードブロックを実行する制御フロー構造です。JavaScriptのキーワードであり、通常は関数として直接呼び出されませんが、Peggyの生成コード内で内部的に関数化されている可能性があります。
    - 引数: `expression` (評価される式), `cases` (各ケースに対応する処理ブロック)
    - 戻り値: なし (制御フロー)
    - 機能: パース中の分岐処理に利用されます。
- **while (src/grammar.js)**:
    - 役割: 条件が真である限りコードブロックを繰り返し実行する制御フロー構造です。JavaScriptのキーワードであり、通常は関数として直接呼び出されませんが、Peggyの生成コード内で内部的に関数化されている可能性があります。
    - 引数: `condition` (真偽値), `body` (繰り返し実行されるコードブロック)
    - 戻り値: なし (制御フロー)
    - 機能: 反復的なパース処理に利用されます。
- **start (src/grammar.pegjs)**:
    - 役割: `grammar.pegjs`ファイル内で定義されている、MMLパーサーの開始ルールです。MML文字列全体のパースをここから開始します。
    - 引数: なし
    - 戻り値: パース結果（ASTのルート）
    - 機能: MMLの最上位構造を定義します。
- **note (src/grammar.pegjs)**:
    - 役割: `grammar.pegjs`ファイル内で定義されている、MMLの個々の音符や休符をパースするためのルールです。
    - 引数: なし
    - 戻り値: パース結果（音符に対応するASTノード）
    - 機能: MMLの音符表現（例: `C4`, `R8`）を解析します。

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
Generated at: 2025-07-21 07:04:09 JST
