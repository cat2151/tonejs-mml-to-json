Last updated: 2025-08-30

```markdown
# Project Overview

## プロジェクト概要
- このプロジェクトは、音楽記法MML (Music Macro Language) をWebブラウザで再生可能な形式に変換します。
- 変換されたデータはTone.jsライブラリとWeb Audio APIを用いて、ブラウザ上でリアルタイムに音楽を再生します。
- MMLパーサーの自動生成、テスト駆動開発、そしてGitHub Actionsによる多言語対応や文書自動生成など、開発効率化の仕組みも備えています。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースでMMLの入力・変換・再生インターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンス再生を可能にするJavaScriptライブラリです。Tone.js CDNを通じて効率的に配信されます。MML (Music Macro Language) は、音楽をテキストで記述するための記法であり、このプロジェクトの主要な入力形式です。Web Audio APIは、ブラウザで直接オーディオを処理するためのネイティブAPIで、Tone.jsがこれを活用しています。
- 開発ツール: Node.js runtime - JavaScriptの実行環境であり、プロジェクトのビルドやテスト、スクリプト実行に使用されます。npm scripts - Node.jsのパッケージマネージャーに付属するタスクランナーで、ビルド、テスト、ドキュメント生成などの開発タスクを自動化します。pnpm - 効率的なパッケージ管理を実現する、高速なパッケージマネージャーです。Google Generative AI - AIによる文書生成を支援します。@octokit/rest - GitHub APIと連携し、リポジトリ操作や情報取得を自動化します。
- テスト: Vitest - Viteをベースにした高速なJavaScriptテストフレームワークで、開発中のMMLパーサーや変換ロジックの品質保証に利用されます。TDD (Test-Driven Development) - テストを先に書き、それから実装を行う開発手法で、堅牢なコードベースの構築に貢献します。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) に基づくパーサージェネレーターで、MMLの文法定義からMMLパーサーのJavaScriptコードを自動生成します。PEG文法定義 - MML音楽記法の構文ルールを記述したファイルで、Peggyがこれを読み込みパーサーを生成します。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムで、コードの構造化と再利用性を高めます。
- 自動化・CI/CD: GitHub Actions - ソースコードの変更をトリガーに、ビルド、テスト、デプロイ、ドキュメント生成などのワークフローを自動化します。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automation (国際化対応の自動化) など、多様な自動化スクリプトが組み込まれています。
- 開発標準: EditorConfig - 異なるエディタやIDEを使用する開発者間でのコードスタイル（インデント、改行コードなど）の統一を強制します。

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
- **.editorconfig**: 開発環境におけるコードスタイル（インデント、エンコーディングなど）を統一するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記述されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発情報などを日本語で説明するメインのドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発情報などを英語で説明するメインのドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報が記述されています。
- **dev-setup/setup.js**: 開発環境の初期設定や特定のタスクを実行するためのユーティリティスクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表現したインタラクティブなグラフを表示するHTMLファイルです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`の動作を制御するJavaScriptコードで、グラフの描画、ノードやエッジの操作、情報表示ロジックを含みます。
- **generated-docs/development-status.md**: プロジェクトの開発状況や進捗に関するドキュメントです。
- **generated-docs/project-overview.md**: プロジェクトの全体像をまとめたドキュメントです。
- **generated-docs/style.css**: `generated-docs`ディレクトリ内のHTMLファイルに適用されるスタイルシートです。
- **index.html**: プロジェクトのルートにある、簡易的なデモや情報の入り口となるHTMLファイルです。
- **issue-notes/** (ディレクトリ): 各Issueに関するメモや詳細情報がMarkdown形式で保存されています。（来訪者向けのため、個々のファイル説明は省略）
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されているnpm/pnpmの設定ファイルです。
- **pnpm-lock.yaml**: pnpmによって生成される、プロジェクトの依存関係の正確なバージョンと構造を記録するロックファイルです。
- **src/grammar.js**: `src/grammar.pegjs`の定義に基づいてPeggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、構造化されたデータ（抽象構文木）に変換します。
- **src/grammar.pegjs**: MML (Music Macro Language) の構文ルールをPEG (Parsing Expression Grammar) 形式で定義したファイルです。
- **src/index.html**: MMLの入力、変換、Tone.jsによる再生を行うブラウザベースのユーザーインターフェースを提供するHTMLファイルです。
- **src/main.js**: `src/index.html`から呼び出され、アプリケーションの主要なロジックをオーケストレーションするJavaScriptファイルです。MML入力の処理、`mml2json`への変換指示、`play`関数による再生フローなどを制御します。
- **src/mml2json.js**: MML文字列を解析し、Tone.jsが解釈できるJSONシーケンサー形式のデータ構造に変換する主要なロジックが実装されています。MMLコマンドの解釈、時間計算、ノートのプロパティ変換などを担当します。
- **src/play.js**: `mml2json.js`で生成されたTone.js形式のJSONデータを、Tone.jsライブラリを介して実際にブラウザで再生する機能を提供します。Web Audio APIを活用して音声を生成・制御します。
- **test/parser.test.js**: MMLパーサー (`src/grammar.js`) が正しくMML文字列を解析できるかを検証するためのテストコードです。Vitestフレームワークを使用しています。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **mml2json(mmlString)** (src/mml2json.js):
    - 役割: MML文字列をTone.jsのJSONシーケンサー形式に変換する。
    - 引数: `mmlString` (string) - 変換対象のMML形式の文字列。
    - 戻り値: Tone.jsシーケンサー形式のJSONオブジェクト。
    - 機能: 入力されたMMLを解析し、各音符やコマンドをTone.jsが解釈可能なJSON構造に変換します。
- **compileMmlToCommands()** (src/mml2json.js):
    - 役割: MMLを内部的なコマンド形式にコンパイルする。
    - 引数: なし (mml2jsonの内部でMML文字列を処理)。
    - 戻り値: コマンドオブジェクトの配列。
    - 機能: MMLパーサーから得られた構文木を基に、より具体的な実行可能なMMLコマンドリストを生成します。
- **getMmlCommands()** (src/mml2json.js):
    - 役割: MMLのコマンドリストを取得する。
    - 引数: なし。
    - 戻り値: MMLコマンドのリスト。
    - 機能: 既にコンパイルされたMMLコマンドの配列を返します。
- **calcAttackToReleaseTicks()** (src/mml2json.js):
    - 役割: ノートのアタックからリリースまでのティック数を計算する。
    - 引数: ノートに関連する持続時間や休符情報。
    - 戻り値: 計算されたティック数。
    - 機能: MMLの音符の長さやゲートタイムに基づいて、実際の演奏時間をティック単位で算出します。
- **play(jsonSequencerData)** (src/play.js):
    - 役割: Tone.jsのJSONシーケンサーデータを再生する。
    - 引数: `jsonSequencerData` (object) - `mml2json`によって生成されたTone.jsシーケンサーデータ。
    - 戻り値: なし。
    - 機能: Tone.jsライブラリを使用して、提供されたJSONデータに基づいて音楽をWeb Audio APIを介してブラウザで再生します。
- **peg$parse(mmlString)** (src/grammar.js):
    - 役割: MML文字列を解析し、抽象構文木（AST）を生成する。
    - 引数: `mmlString` (string) - 解析対象のMML文字列。
    - 戻り値: MMLの構造を表す抽象構文木。
    - 機能: Peggyパーサーの主要なエントリポイントであり、MML文法定義に基づいて入力文字列を解析し、プログラミング可能なデータ構造に変換します。
- **start()** (src/grammar.pegjs):
    - 役割: MML文法の開始ルールを定義する。
    - 機能: Peggy文法ファイルにおける解析の開始点となるルールを指定します。
- **note()** (src/grammar.pegjs):
    - 役割: MMLにおける音符の構文ルールを定義する。
    - 機能: Peggy文法ファイルで音符の形式（例: cdefg, オクターブ、長さなど）を定義します。
- **escapeHtml(str)** (generated-docs/callgraph.js):
    - 役割: HTML特殊文字をエスケープする。
    - 引数: `str` (string) - エスケープする文字列。
    - 戻り値: エスケープされた文字列。
    - 機能: HTMLコンテンツに文字列を安全に表示するために、特殊文字を対応するHTMLエンティティに変換します。
- **getLayoutConfig()** (generated-docs/callgraph.js):
    - 役割: グラフのレイアウト設定を取得する。
    - 機能: 呼び出しグラフの表示方法に関する設定値（例: ノード間隔、配置アルゴリズム）を提供します。
- **showNodeInfo(node)** (generated-docs/callgraph.js):
    - 役割: グラフ上のノードの詳細情報を表示する。
    - 引数: `node` (object) - クリックされたノードのデータ。
    - 機能: 関数名、ファイルパスなどのノード（関数）に関する詳細情報を情報パネルに表示します。
- **generateGitHubURL(path)** (generated-docs/callgraph.js):
    - 役割: 指定されたファイルパスに対するGitHubのURLを生成する。
    - 引数: `path` (string) - GitHubリポジトリ内のファイルパス。
    - 戻り値: 生成されたGitHubのファイルURL。
    - 機能: 呼び出しグラフ上の関数から直接GitHubの該当ソースコードにジャンプするためのリンクを作成します。
- **resetLayout()** (generated-docs/callgraph.js):
    - 役割: グラフのレイアウトを初期状態にリセットする。
    - 機能: ユーザーの操作で変更されたグラフの配置をデフォルトの状態に戻します。
- **fitToContent()** (generated-docs/callgraph.js):
    - 役割: グラフの表示範囲をコンテンツ全体に合わせる。
    - 機能: グラフ全体が画面内に収まるようにズームレベルとパン位置を調整します。

（その他、`toInt`, `calcDuration`, `calcStartTick`, `increaseStartTick`, `calcLtick`, `getNodeId`, `repeat`, `sort`などのユーティリティ関数は`mml2json`の内部ロジックをサポートします。）

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
Generated at: 2025-08-30 07:03:55 JST
