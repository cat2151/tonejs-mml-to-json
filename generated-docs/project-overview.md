Last updated: 2025-08-25

# Project Overview

## プロジェクト概要
- MML (Music Macro Language) をWeb Audio API対応のTone.js JSONシーケンサー形式へ変換するツールです。
- ウェブブラウザ上でMML形式の楽譜を解析し、インタラクティブに音楽を再生・視覚化できます。
- 音楽プログラミング愛好家やWeb開発者が、MMLを用いた独自のWeb音楽アプリケーションを構築するための基盤を提供します。

## 技術スタック
- フロントエンド: **HTML5** - ブラウザベースでMMLプレイヤーのユーザーインターフェースを構築し、Web環境で直接動作します。
- 音楽・オーディオ:
    - **Tone.js** - 高度なWeb Audio APIを抽象化し、ブラウザ上で音楽の合成、シーケンス、エフェクト処理を可能にするJavaScriptライブラリです。
    - **Tone.js CDN** - unpkg経由でTone.jsライブラリを効率的に配信し、利用を容易にします。
    - **MML (Music Macro Language)** - 音楽をテキストベースで記述するための記法であり、プロジェクトの中核となる入力形式です。
    - **Web Audio API** - ブラウザに組み込まれた音声処理技術で、Tone.jsを通じてこの機能を利用し、高品質なオーディオ出力を実現します。
- 開発ツール:
    - **Node.js runtime** - JavaScriptの実行環境として開発プロセスをサポートします。
    - **npm scripts** - 複数のタスクを自動化するためのスクリプト群（5個）を定義し、開発作業の効率化を図ります。
    - **pnpm** - 高速かつディスク容量を効率的に使用するパッケージマネージャーで、依存関係の管理を最適化します。
    - **Google Generative AI** - AIを活用して文書生成プロセスを支援し、ドキュメント作成の効率を高めます。
    - **@octokit/rest** - GitHub APIと連携し、リポジトリの操作やCI/CDパイプラインとの統合に利用されます。
- テスト:
    - **Vitest** - 高速なViteベースのテストフレームワークで、MMLパーサーなどプロジェクトの各コンポーネントの品質を保証します。
    - **TDD (Test-Driven Development)** - テスト駆動開発手法を採用し、堅牢で信頼性の高いコードベースを構築します。
- ビルドツール:
    - **Peggy** - PEG (Parsing Expression Grammar) パーサージェネレーターであり、MMLの複雑な構文解析ロジックを自動生成します。
    - **PEG文法定義** - MML音楽記法の正確なパーサーを生成するための文法ルールを定義します。
- 言語機能: **ES Modules** - モダンなJavaScriptモジュールシステムを採用し、コードの再利用性、保守性、パフォーマンスを向上させます。
- 自動化・CI/CD:
    - **GitHub Actions** - 4つのワークフローを通じて、開発プロセスの自動化と継続的インテグレーション/デリバリーを実現します。
    - プロジェクト要約自動生成 - プロジェクトの概要ドキュメントを自動的に作成します。
    - Issue自動管理 - GitHub Issuesのライフサイクルを自動化し、開発タスクを効率的に管理します。
    - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳し、国際的なユーザーに対応します。
    - i18n automation - 国際化対応（i18n）プロセスを自動化します。
- 開発標準: **EditorConfig** - 異なるIDEやエディタ間でコードの書式設定を統一し、一貫性のあるコードスタイルを維持します。

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
- **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを適用するための設定ファイル。
- **.gitignore**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイル。
- **LICENSE**: プロジェクトのライセンス情報が記述されたファイル。
- **README.ja.md / README.md**: プロジェクトの概要、使い方、開発方法などを説明するドキュメント（日本語版と英語版）。
- **dev-setup/README.md**: 開発環境のセットアップ手順に関する情報を提供するドキュメント。
- **dev-setup/setup.js**: 開発環境のセットアップや特定のテスト関連の初期化タスクを実行するスクリプト。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出し階層をよりリッチな形で視覚化したHTMLドキュメント。
- **generated-docs/callgraph.js**: 関数呼び出しグラフの描画ロジックとインタラクティブ機能を提供するJavaScriptファイル。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況や進捗に関するドキュメント。
- **generated-docs/project-overview.md**: プロジェクトの概要を自動生成するGitHub Actionsによって生成されたドキュメント。
- **generated-docs/style.css**: `generated-docs`内のHTMLドキュメントのスタイルを定義するCSSファイル。
- **index.html**: プロジェクトのライブデモやメインのWebアプリケーションへのエントリーポイントとなるHTMLファイル。
- **issue-notes/** (ディレクトリ): 各Issueに関するメモや詳細情報が格納されているディレクトリ。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどを定義するファイル。
- **pnpm-lock.yaml**: pnpmによって管理される依存関係の正確なバージョンをロックするファイル。
- **src/grammar.js**: Peggyによって `src/grammar.pegjs` から自動生成されたMMLパーサーのJavaScriptコード。MML文字列を解析し、抽象構文木を構築します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文規則を定義するPEG文法ファイル。このファイルから `src/grammar.js` が生成されます。
- **src/index.html**: `src/main.js` や `src/play.js` と連携し、MMLの入力・変換・再生を行うためのシンプルなWebインターフェースを提供します。
- **src/main.js**: プロジェクトの主要なロジックを統合し、MMLの変換と音楽再生のフローを制御するメインのJavaScriptファイル。
- **src/mml2json.js**: MML文字列をTone.jsで利用可能なJSON形式のシーケンスデータに変換する、プロジェクトの中核をなすロジックが含まれています。
- **src/play.js**: Tone.jsライブラリを使用して、変換されたJSONデータに基づき、Web Audio APIを介して実際に音楽を再生する機能を提供します。
- **test/parser.test.js**: `src/grammar.js` で定義されたMMLパーサーの動作を検証するためのテストスイート。
- **vitest.config.js**: テストフレームワークVitestの設定ファイル。

## 関数詳細説明
- **mml2json(mmlString)** (`src/mml2json.js`):
    - **役割**: MML (Music Macro Language) 文字列をTone.jsシーケンサーが解釈できるJSON形式のデータ構造に変換します。
    - **引数**: `mmlString` (string) - 変換対象のMML文字列。
    - **戻り値**: Tone.jsシーケンサーが利用可能なJSONオブジェクトの配列。
    - **機能**: MMLの各コマンドを解析し、音符、休符、テンポ、オクターブなどの情報をJSONオブジェクトにマッピングします。
- **compileMmlToCommands(mmlString)** (`src/mml2json.js`):
    - **役割**: MML文字列を個々の音楽コマンド（音符、休符、設定変更など）の内部表現に変換します。
    - **引数**: `mmlString` (string) - コンパイルするMML文字列。
    - **戻り値**: 内部表現されたMMLコマンドの配列。
    - **機能**: `getMmlCommands` を利用してMMLを解析し、音符の長さや開始時間などを計算するための前処理を行います。
- **getMmlCommands(mmlString)** (`src/mml2json.js`):
    - **役割**: MMLパーサー (`src/grammar.js`) を使用して、MML文字列から生のコマンド構造を取得します。
    - **引数**: `mmlString` (string) - 解析するMML文字列。
    - **戻り値**: パーサーによって生成されたMMLコマンドの抽象構文木。
    - **機能**: MMLの構文解析を行い、コマンドとそのパラメータを識別します。
- **calcAttackToReleaseTicks(baseTick, duration)** (`src/mml2json.js`):
    - **役割**: 音符のアタック（発音開始）からリリース（発音終了）までのティック数を計算します。
    - **引数**: `baseTick` (number) - 基本となるティック数、`duration` (number) - 音符の長さを表す数値。
    - **戻り値**: 計算されたアタックからリリースまでのティック数。
    - **機能**: MMLの音長指定に基づき、Tone.jsシーケンサーで使用する正確な持続時間を算出します。
- **play(jsonSequencerData)** (`src/play.js`):
    - **役割**: MMLから変換されたJSONシーケンサーデータを使用して、Tone.jsを通じて音楽を再生します。
    - **引数**: `jsonSequencerData` (array) - `mml2json` 関数によって生成されたシーケンスデータ。
    - **戻り値**: なし (副作用として音楽が再生されます)。
    - **機能**: Tone.jsのインスタンスを初期化し、提供されたJSONデータに従って音源のロード、シーケンサーの設定、再生の開始、停止などを制御します。
- **peg$parse(input)** (`src/grammar.js`):
    - **役割**: Peggyによって自動生成されたMMLパーサーのメインエントリポイント。
    - **引数**: `input` (string) - 解析対象のMML文字列。
    - **戻り値**: MMLの構文解析結果を示す抽象構文木 (AST)。
    - **機能**: `src/grammar.pegjs` で定義された文法規則に従い、MML文字列を解析し、構文エラーを検出します。
- **escapeHtml(str)** (`generated-docs/callgraph.js`):
    - **役割**: HTML特殊文字をエスケープし、スクリプトインジェクションを防ぎながら安全にHTMLとして表示できる文字列を生成します。
    - **引数**: `str` (string) - エスケープする文字列。
    - **戻り値**: エスケープ処理された文字列。
    - **機能**: `<>&"'` などの文字を対応するHTMLエンティティに置換します。
- **getLayoutConfig(), placeCentralNode(), showNodeInfo(), showEdgeInfo(), hideInfoPanel(), showInfoPanel(), toggleInfoPanel(), generateGitHubURL(), resetLayout(), watchNodeMovementAndFixOverlapsWrap(), watchNodeMovementAndFixOverlaps(), resolveNodeOverlaps(), switchLayout(), resetNodeStates(), fitToContent(), toggleNodeLabels(), toggleCalleeLocationFilter()** (`generated-docs/callgraph.js`):
    - **役割**: これらの関数は、生成された関数呼び出しグラフの可視化ツールにおいて、グラフのレイアウト、ノードとエッジの情報表示、ユーザーインターフェースの操作、レイアウトのリセット、ノードのラベル表示切り替えなど、インタラクティブな描画と制御を担います。
    - **引数・戻り値**: 各関数によって異なりますが、主にグラフデータ、DOM要素、イベント情報などを操作します。
    - **機能**: ユーザーが関数呼び出しグラフを探索し、理解を深めるための様々な視覚的・インタラクティブな機能を提供します。

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
Generated at: 2025-08-25 07:03:40 JST
