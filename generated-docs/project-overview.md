Last updated: 2025-08-02

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) 形式の音楽データを、Web Audio APIライブラリTone.jsが理解できるJSONシーケンサーフォーマットへ変換するツールです。
- ユーザーはMML記法で記述された音楽を入力し、本プロジェクトを通じてウェブブラウザ上で手軽に音楽を生成・再生できます。
- MMLを用いた音楽作成と、Tone.jsによる高度なウェブオーディオ処理を融合させることで、ブラウザベースの音楽体験を提供します。

## 技術スタック
- フロントエンド:
    - HTML5: ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築しています。
- 音楽・オーディオ:
    - Tone.js: Web Audio APIをラップした高機能な音声ライブラリで、ブラウザでの音楽生成と再生を担います。
    - Tone.js CDN: `unpkg`経由でTone.jsライブラリを効率的に配信し、利用しています。
    - MML (Music Macro Language): 音楽をテキストで記述するための記法で、このプロジェクトのパーサーが処理します。
    - Web Audio API: ブラウザに組み込まれた音声処理技術であり、Tone.jsを通じて利用されています。
- 開発ツール:
    - Node.js runtime: JavaScriptコードの実行環境として開発時に利用されます。
    - npm scripts: プロジェクトのビルド、テスト、ドキュメント生成などのタスクを自動化するために定義されたスクリプトです。
    - pnpm: 高速かつディスク容量効率の良いパッケージマネージャーです。
    - Google Generative AI: ドキュメント生成などの開発支援にAIを活用しています。
    - @octokit/rest: GitHub APIと連携し、リポジトリ管理や自動化に利用されています。
- テスト:
    - Vitest: Viteを基盤とした高速なテストフレームワークで、コードの品質と信頼性を確保するために使用されます。
    - TDD (Test-Driven Development): テストを先に書く開発手法を採用し、堅牢なコードベースを目指しています。
- ビルドツール:
    - Peggy: PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLの文法定義からパーサーコードを自動生成します。
    - PEG文法定義: MML音楽記法を解析するための文法ルールが記述されており、Peggyによってパーサーが生成されます。
- 言語機能:
    - ES Modules: モダンなJavaScriptのモジュールシステムを採用し、コードの分割と再利用性を高めています。
- 自動化・CI/CD:
    - GitHub Actions: CI/CD（継続的インテグレーション/継続的デリバリー）パイプラインを自動化するためのツールで、プロジェクト要約生成、Issue管理、README翻訳など複数のワークフローが設定されています。
    - i18n automation: READMEの多言語翻訳を自動化するワークフローが組み込まれています。
- 開発標準:
    - EditorConfig: 異なるエディタやIDEを使用する開発者間でも、インデントや文字コードなどのコードスタイルを統一するための設定ファイルです。

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
- **`.editorconfig`**: 異なるエディタ間でコードのインデント、改行コードなどの書式を統一するための設定ファイルです。
- **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記載されています。
- **`README.ja.md`**: プロジェクトの概要、使い方、開発情報などが日本語で記述されたドキュメントです。
- **`README.md`**: プロジェクトの概要、使い方、開発情報などが英語で記述されたドキュメントです。
- **`dev-setup/README.md`**: 開発環境のセットアップに関する説明ドキュメントです。
- **`dev-setup/setup.js`**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプトです。
- **`generated-docs/callgraph-enhanced.html`**: プロジェクト内の関数呼び出し関係を視覚化した、インタラクティブなグラフのHTMLビューアです。
- **`generated-docs/callgraph.js`**: 上記の関数呼び出しグラフを生成・表示するためのJavaScriptコードです。
- **`generated-docs/development-status.md`**: プロジェクトの現在の開発状況に関するドキュメントです。
- **`generated-docs/project-overview.md`**: プロジェクトの概要ドキュメント（本出力のような内容）です。
- **`generated-docs/style.css`**: `generated-docs`ディレクトリ内のHTMLドキュメントに適用されるスタイルシートです。
- **`index.html` (ルート)**: プロジェクトのデモページへの入り口となるHTMLファイルです。
- **`issue-notes/`ディレクトリ**: GitHub Issuesに関連するメモや詳細が格納されていますが、来訪者向けには内容は公開されません。
- **`package.json`**: Node.jsプロジェクトの設定ファイルで、プロジェクト名、バージョン、依存関係、スクリプトなどが定義されています。
- **`pnpm-lock.yaml`**: `pnpm`パッケージマネージャーが生成するロックファイルで、依存関係のバージョンを固定し、再現可能なビルドを保証します。
- **`src/grammar.js`**: `src/grammar.pegjs`のMML文法定義からPeggyによって自動生成された、MML文字列を解析するためのJavaScriptパーサーコードです。
- **`src/grammar.pegjs`**: Music Macro Language (MML) の構文規則を記述したParsing Expression Grammar (PEG) ファイルです。
- **`src/index.html`**: MMLを入力し、変換されたJSONデータをTone.jsで再生する機能を備えた、MMLプレイヤーのデモ用ウェブインターフェースです。
- **`src/main.js`**: `src/index.html`から呼び出され、MMLの入力、`mml2json.js`による変換、`play.js`による再生機能を連携させる主要なスクリプトです。
- **`src/mml2json.js`**: MML文字列をTone.jsが理解できるJSONシーケンサーフォーマットに変換する、プロジェクトの核心となるロジックを実装したファイルです。
- **`src/play.js`**: `mml2json.js`によって生成されたJSON形式の音楽データを、Tone.jsライブラリを使用して実際に音声としてブラウザで再生する機能を提供します。
- **`test/parser.test.js`**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストスクリプトです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`mml2json(mmlString)` (src/mml2json.js)**:
    - **役割**: MML (Music Macro Language) の文字列をTone.jsのJSONシーケンサーフォーマットに変換する主要な関数です。
    - **引数**: `mmlString` (文字列): 変換対象のMMLコード。
    - **戻り値**: Tone.jsシーケンサー互換のJSONオブジェクト。
    - **機能**: 入力されたMMLを解析し、音符、リズム、テンポなどの音楽要素をJSON形式のデータ構造にマッピングします。
- **`compileMmlToCommands(mml)` (src/mml2json.js)**:
    - **役割**: MML文字列を内部処理用のコマンドリストにコンパイルします。
    - **引数**: `mml` (文字列): コンパイル対象のMMLコード。
    - **戻り値**: コマンドオブジェクトの配列。
    - **機能**: `getMmlCommands`で取得したMMLコマンドを処理し、具体的な音楽イベントとして整形します。
- **`getMmlCommands(parsedMml)` (src/mml2json.js)**:
    - **役割**: 解析されたMMLデータから、個々の音楽コマンド（音符、休符など）を抽出します。
    - **引数**: `parsedMml` (オブジェクト): `grammar.js`で解析されたMMLの抽象構文木。
    - **戻り値**: MMLコマンドの配列。
    - **機能**: パーサーの出力から音楽的な意味を持つ要素をリストアップします。
- **`play(jsonSequencerData)` (src/play.js)**:
    - **役割**: `mml2json`によって生成されたJSON形式のシーケンサーデータをTone.jsを用いて再生します。
    - **引数**: `jsonSequencerData` (オブジェクト): Tone.jsシーケンサー形式の音楽データ。
    - **戻り値**: なし。
    - **機能**: Tone.jsのインスタンスを初期化し、指定されたJSONデータに基づいてシーケンスを開始し、音を鳴らします。
- **`peg$parse(input, options)` (src/grammar.js)**:
    - **役割**: MML文字列を解析し、抽象構文木（AST）を生成するパーサーのメインエントリポイントです。Peggyによって自動生成されます。
    - **引数**: `input` (文字列): 解析対象のMML文字列。`options` (オブジェクト): パーサーオプション。
    - **戻り値**: MMLの抽象構文木（AST）。
    - **機能**: `src/grammar.pegjs`で定義された文法規則に基づき、入力文字列を解析し、構造化されたデータに変換します。
- **`calcAttackToReleaseTicks(commands, currentIndex)` (src/mml2json.js)**:
    - **役割**: 指定された音楽コマンドの前後関係に基づき、アタックからリリースまでのティック数を計算します。
    - **引数**: `commands` (配列): コマンドのリスト。`currentIndex` (数値): 現在のコマンドのインデックス。
    - **戻り値**: アタックからリリースまでのティック数。
    - **機能**: 主に音符の継続時間やレガートなどの演奏表現を計算するために使用されます。
- **`repeat(n, func)` (src/mml2json.js)**:
    - **役割**: 指定された回数だけ関数を繰り返して実行します。
    - **引数**: `n` (数値): 繰り返し回数。`func` (関数): 実行する関数。
    - **戻り値**: なし。
    - **機能**: MMLの繰り返し記号などを処理する際に利用される汎用ヘルパー関数です。
- **`toInt(value)` (src/mml2json.js)**:
    - **役割**: 値を整数に変換します。
    - **引数**: `value` (任意): 変換対象の値。
    - **戻り値**: 整数値。
    - **機能**: MMLの数値パラメータ（テンポ、音量など）を処理する際に利用されます。
- **`calcDuration(note, currentL, currentO, currentQ)` (src/mml2json.js)**:
    - **役割**: MMLの音符情報からその持続時間（デュレーション）を計算します。
    - **引数**: `note` (オブジェクト): 音符データ。`currentL` (数値): 現在の長さ設定。`currentO` (数値): 現在のオクターブ設定。`currentQ` (数値): 現在のクオンタイズ設定。
    - **戻り値**: 音符のデュレーション（ティック単位）。
    - **機能**: Lコマンドや符点、タイなどのMML記法を考慮して正確な音長を算出します。
- **`calcStartTick(command, currentStartTick, trackTicks)` (src/mml2json.js)**:
    - **役割**: 各音楽イベントの開始ティック（時間軸上の位置）を計算します。
    - **引数**: `command` (オブジェクト): 音楽コマンド。`currentStartTick` (数値): 現在の開始ティック。`trackTicks` (オブジェクト): トラックごとのティック情報。
    - **戻り値**: 更新された開始ティック。
    - **機能**: テンポ変化やトラックの状態を考慮し、正確なイベント開始時刻を決定します。
- **`increaseStartTick(currentStartTick, duration)` (src/mml2json.js)**:
    - **役割**: 現在の開始ティックに持続時間を加算し、次のイベントの開始ティックを更新します。
    - **引数**: `currentStartTick` (数値): 現在の開始ティック。`duration` (数値): 加算する持続時間。
    - **戻り値**: 更新された開始ティック。
    - **機能**: シーケンス内のイベントが時間軸上で正しく配置されるようにします。
- **`calcLtick(lengthValue)` (src/mml2json.js)**:
    - **役割**: MMLの長さ（L）コマンドに基づいて、ティックの長さを計算します。
    - **引数**: `lengthValue` (数値): Lコマンドの値。
    - **戻り値**: 対応するティックの長さ。
    - **機能**: MMLの「L」コマンド（音長設定）を内部のティック表現に変換します。
- **`getNodeId(node)` (src/mml2json.js)**:
    - **役割**: 関数呼び出しグラフ生成のためのノードIDを生成します。
    - **引数**: `node` (オブジェクト): グラフのノードデータ。
    - **戻り値**: 生成されたノードID。
    - **機能**: `generated-docs/callgraph.js`で利用される内部関数です。
- **`escapeHtml(text)` (generated-docs/callgraph.js)**:
    - **役割**: HTML特殊文字をエスケープし、セキュリティを確保します。
    - **引数**: `text` (文字列): エスケープ対象の文字列。
    - **戻り値**: エスケープ後の文字列。
    - **機能**: HTMLコンテンツに表示する際にクロスサイトスクリプティング（XSS）攻撃を防ぎます。
- **`resetLayout()` (generated-docs/callgraph.js)**:
    - **役割**: 関数呼び出しグラフのレイアウトを初期状態にリセットします。
    - **引数**: なし。
    - **戻り値**: なし。
    - **機能**: ユーザーがグラフの表示を操作した後に、元の配置に戻したい場合に利用されます。
- その他（`getLayoutConfig`, `placeCentralNode`, `showNodeInfo`, `hideInfoPanel` など `generated-docs/callgraph.js` 内の関数）：
    - **役割**: 関数呼び出しグラフの表示、レイアウト、情報表示、インタラクションなどを制御するための補助関数群です。
    - **機能**: グラフの動的な描画やユーザーインターフェース操作に不可欠な役割を担います。
- **`start()` (src/grammar.pegjs)**:
    - **役割**: `src/grammar.pegjs`において定義された、MML全体のパースを開始するルールです。
    - **引数**: なし (パーサー内部で呼び出されます)。
    - **戻り値**: 解析結果。
    - **機能**: PeggyパーサーがMML文字列の解析を始める際の最上位ルールです。
- **`note()` (src/grammar.pegjs)**:
    - **役割**: `src/grammar.pegjs`において定義された、個々の音符や休符をパースするためのルールです。
    - **引数**: なし (パーサー内部で呼び出されます)。
    - **戻り値**: 解析された音符データ。
    - **機能**: MMLの`cdefgab`や休符`r`といった記法を認識し、そのプロパティを抽出します。
- **汎用的な関数**: `catch`, `if`, `for`, `switch`, `sort`, `function` などは、JavaScriptの言語機能の一部であり、様々なファイルでエラー処理、条件分岐、ループ処理、配列のソート、関数定義などに広く利用されています。

## 関数呼び出し階層ツ実験
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
Generated at: 2025-08-02 07:03:46 JST
