Last updated: 2025-08-13

# Project Overview

## プロジェクト概要
- このプロジェクトは、MML（Music Macro Language）で書かれた音楽データを、Web Audio APIライブラリであるTone.jsが解釈できるJSONシーケンサー形式に変換します。
- 変換された音楽データはウェブブラウザ上で直接再生可能となり、MMLを用いた作曲とブラウザでの試聴を容易にします。
- 音楽記法のパーシングからJSON出力、そしてブラウザでの再生までの一連のワークフローをサポートするツールセットを提供します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを提供します。
- 音楽・オーディオ: Tone.js - Web Audio APIを抽象化し、ブラウザでの高機能な音声合成・シーケンス再生を可能にするJavaScriptライブラリです。Tone.js CDN - unpkg経由でのライブラリ配信。MML (Music Macro Language) - 音楽記号をテキストで記述するための記法をパーシングします。Web Audio API - ブラウザに標準搭載されている音声処理技術で、Tone.jsを介して利用されます。
- 開発ツール: Node.js runtime - JavaScriptコードを実行するための環境です。npm scripts - パッケージ管理とタスク実行のためのスクリプト群（5個）。pnpm - 高速で効率的なパッケージマネージャーです。Google Generative AI - AIによる文書生成をサポートします。@octokit/rest - GitHub APIと連携するためのライブラリです。
- テスト: Vitest - 高速なViteベースのテストフレームワークです。TDD (Test-Driven Development) - テスト駆動開発手法が採用されています。
- ビルドツール: Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLの文法を解析するためのパーサーを自動生成します。PEG文法定義 - MML音楽記法のパーサー生成に使用される文法定義です。
- 言語機能: ES Modules - モダンなJavaScriptのモジュールシステムで、コードの分割と再利用を効率化します。
- 自動化・CI/CD: GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）を自動化するためのワークフロー（4個）です。プロジェクト要約自動生成、Issue自動管理、README多言語翻訳、i18n automation - 自動翻訳ワークフローが含まれます。
- 開発標準: EditorConfig - 異なるエディタやIDE間でコードの整形ルールを統一するための設定ファイルです。

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
- **`.editorconfig`**: 異なる開発環境間でのコードの整形ルール（インデント、改行コードなど）を統一するための設定ファイルです。
- **`.gitignore`**: Gitによるバージョン管理の対象から除外するファイルやディレクトリを指定します。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`, `README.md`**: プロジェクトの概要、使い方、開発方法などを説明するドキュメントです。日本語版と英語版があります。
- **`dev-setup/README.md`**: 開発セットアップに関する説明が含まれます。
- **`dev-setup/setup.js`**: 開発環境のセットアップや初期設定を行うためのJavaScriptスクリプトです。
- **`generated-docs/`ディレクトリ**: 自動生成されたドキュメントやレポートを格納します。
    - **`generated-docs/callgraph-enhanced.html`**: 関数呼び出しグラフをインタラクティブに表示するためのHTMLファイルです。
    - **`generated-docs/callgraph.js`**: `callgraph-enhanced.html`で利用される、関数呼び出しグラフの描画ロジックを含むJavaScriptファイルです。
    - **`generated-docs/development-status.md`**: プロジェクトの開発状況に関するドキュメントです。
    - **`generated-docs/project-overview.md`**: 自動生成されたプロジェクトの概要ドキュメントです。
    - **`generated-docs/style.css`**: 生成されたドキュメントのスタイルを定義するCSSファイルです。
- **`index.html`**: プロジェクトのメインのエントリーポイントとなるHTMLファイルで、デモページやアプリケーションの起動に使われます。
- **`issue-notes/`ディレクトリ**: GitHub Issuesから自動生成された、各Issueに関する詳細なメモや情報が格納されています。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプトなど）と、依存関係のあるパッケージ情報が記述されています。
- **`pnpm-lock.yaml`**: `pnpm`が依存関係を正確にロックするためのファイルで、再現性のあるビルドを保証します。
- **`src/`ディレクトリ**: プロジェクトの主要なソースコードが格納されています。
    - **`src/grammar.js`**: `src/grammar.pegjs`からPEG.jsによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、内部表現に変換するロジックが含まれます。
    - **`src/grammar.pegjs`**: MML (Music Macro Language) の構文規則を定義するPEG (Parsing Expression Grammar) 形式のファイルです。
    - **`src/index.html`**: `src`ディレクトリ内のデモやテスト用のHTMLファイルです。
    - **`src/main.js`**: アプリケーションの主要なロジックを読み込み、初期化を行うエントリーポイントファイルです。
    - **`src/mml2json.js`**: MML記法のデータをTone.jsのJSONシーケンサー形式に変換する、プロジェクトの核心となるロジックが含まれています。
    - **`src/play.js`**: 変換されたTone.js JSONデータを利用して、ブラウザで音楽を再生する機能を提供します。
- **`test/`ディレクトリ**: プロジェクトのテストコードが格納されています。
    - **`test/parser.test.js`**: `src/grammar.js`で生成されたMMLパーサーの動作を検証するためのテストファイルです。
- **`vitest.config.js`**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **`catch` (dev-setup/setup.js)**: エラーハンドリングのための一般的な関数です。`dev-setup/setup.js`内では、セットアッププロセス中に発生した例外を捕捉し、適切な処理を行うために使用されます。
- **`mml2json` (src/mml2json.js)**: MML文字列全体を解析し、Tone.jsが解釈可能なJSONシーケンサー形式のオブジェクトに変換するメイン関数です。
    - 引数: MML文字列
    - 戻り値: Tone.jsシーケンサー形式のJSONオブジェクト
- **`compileMmlToCommands` (src/mml2json.js)**: MMLテキストを内部的な音楽コマンドの配列にコンパイルする関数です。これは`mml2json`関数の一部としてMMLの解析結果を整形する役割を担います。
    - 引数: MMLの解析結果（ASTまたはそれに近い構造）
    - 戻り値: 音楽コマンドの配列
- **`getMmlCommands` (src/mml2json.js)**: MMLパーサーによって生成されたデータから、個々のMMLコマンドを抽出する補助関数です。
- **`calcAttackToReleaseTicks` (src/mml2json.js)**: MMLのノートや休符のDuration（音の長さ）をティック単位で計算する関数です。
- **`repeat` (src/mml2json.js)**: MMLの繰り返し記号（例: `[CDEFG]2`）を処理し、指定された回数分シーケンスを複製する機能を提供します。
- **`toInt` (src/mml2json.js)**: 文字列を整数に安全に変換するユーティリティ関数です。
- **`calcDuration` (src/mml2json.js)**: MMLで指定された音符の長さを、内部的なティック単位に換算する関数です。
- **`calcStartTick` (src/mml2json.js)**: 各ノートやイベントが開始するティック位置を計算する関数です。
- **`increaseStartTick` (src/mml2json.js)**: 現在の開始ティック位置を、直前のイベントの長さに応じて更新する関数です。
- **`calcLtick` (src/mml2json.js)**: Lコマンド（音長指定）が設定された場合のティック値を計算します。
- **`getNodeId` (src/mml2json.js)**: MML構造内の各ノードに一意のIDを割り当てるための関数です。
- **`sort` (src/mml2json.js)**: 変換過程で生成されたイベントの配列などを、時間順に並べ替えるための関数です。
- **`play` (src/play.js)**: 変換されたTone.js JSONデータを受け取り、Web Audio APIを通じて音楽再生を開始する主要な関数です。
    - 引数: Tone.js JSONシーケンサー形式のデータ
    - 戻り値: なし (サイドエフェクトとして音声再生)
- **`sub` (src/play.js)**: `play`関数の内部で利用される補助関数であり、具体的な再生ロジックの一部を担います。
- **`hex`, `unicodeEscape`, `literalEscape`, `classEscape` (src/grammar.js)**: PEG.jsによって生成されたパーサー内で使用される、文字列中の特定のエスケープシーケンスを処理するための内部関数です。
- **`describeExpectation`, `describeExpected`, `describeFound` (src/grammar.js)**: PEG.jsパーサーが解析エラーを報告する際に、期待される入力や実際に検出された入力を説明するエラーメッセージを生成するための内部関数です。
- **`peg$parse` (src/grammar.js)**: `src/grammar.pegjs`で定義されたMML文法に従って、入力文字列を解析するPEG.jsパーサーのメインエントリポイントとなる関数です。
    - 引数: MML文字列
    - 戻り値: MMLの抽象構文木（AST）
- **`peg$parsestart`, `peg$parsenote` (src/grammar.js)**: `peg$parse`によって呼び出される、MML文法内の特定のルール（`start`ルールや`note`ルールなど）を解析するための内部関数です。
- **`peg$throw` (src/grammar.js)**: 解析中にエラーが発生した場合に例外をスローするための内部関数です。
- **`constructor` (src/grammar.js)**: JavaScriptオブジェクトのコンストラクタに関連する、PEG.jsパーサーの内部で利用される関数です。
- **`escapeHtml` (generated-docs/callgraph.js)**: HTML特殊文字をエスケープし、セキュリティを確保するためのユーティリティ関数です。`generated-docs/callgraph.js`内では、グラフ表示でノード情報などを表示する際に利用されます。
- **`getLayoutConfig` (generated-docs/callgraph.js)**: 関数呼び出しグラフのレイアウト設定を取得する関数です。
- **`placeCentralNode` (generated-docs/callgraph.js)**: グラフの中心となるノードを配置する関数です。
- **`showNodeInfo`, `showEdgeInfo`, `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel` (generated-docs/callgraph.js)**: 関数呼び出しグラフ上でノードやエッジの情報を表示・非表示にしたり、情報パネルの状態を切り替えたりするための関数群です。
- **`generateGitHubURL` (generated-docs/callgraph.js)**: 関連するGitHubのURLを生成する関数です。
- **`resetLayout`, `watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps`, `resolveNodeOverlaps`, `switchLayout` (generated-docs/callgraph.js)**: 関数呼び出しグラフのレイアウトをリセットしたり、ノードの動きを監視して重なりを解消したり、レイアウトを切り替えたりするための関数群です。
- **`resetNodeStates`, `fitToContent`, `toggleNodeLabels`, `toggleCalleeLocationFilter` (generated-docs/callgraph.js)**: グラフ内のノードの状態をリセットしたり、内容に合わせてズームしたり、ノードのラベル表示を切り替えたり、呼び出し元の場所フィルターを切り替えたりするための関数群です。

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
Generated at: 2025-08-13 07:03:27 JST
