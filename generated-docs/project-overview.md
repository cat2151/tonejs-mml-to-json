Last updated: 2025-10-05

# Project Overview

## プロジェクト概要
- 本プロジェクトは、MML (Music Macro Language) 形式の音楽データを、Web Audio APIライブラリTone.jsが解釈できるJSONシーケンサー形式に変換します。
- 変換されたJSONデータを利用して、ブラウザ上で手軽に音楽を再生・試聴できるMMLプレイヤー機能を提供します。
- PeggyパーサージェネレーターによるMML文法解析とTone.jsの統合を通じて、Web上でのインタラクティブな音楽体験を実現します。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーのユーザーインターフェースを構築するために使用されます。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザでの高度な音声合成やシーケンス再生を容易にするJavaScriptライブラリです。
    - Web Audio API - ブラウザに標準搭載されている音声処理APIで、Tone.jsを通じて利用されます。
    - Tone.js CDN - unpkg経由でTone.jsライブラリが配信され、手軽に利用できるようにしています。
    - MML (Music Macro Language) - 音符や休符、テンポなどをテキスト形式で記述する音楽記法で、このプロジェクトの変換対象です。
- 開発ツール:
    - Node.js runtime - JavaScriptアプリケーションの実行環境として使用されます。
    - npm scripts - プロジェクト内の様々なタスク（テスト、ビルド、スクリプト実行など）を自動化するためのコマンドラインツールです。5つのスクリプトが定義されています。
    - pnpm - Node.jsパッケージの高速で効率的な管理を行うためのパッケージマネージャーです。
    - Google Generative AI - ドキュメント生成などの開発支援にAIを活用しています。
    - @octokit/rest - GitHub APIと連携し、リポジトリ情報の取得や操作を行うために使用されます。
- テスト:
    - Vitest - 高速なViteベースの単体テストフレームワークで、プロジェクトのコードの信頼性を保証するために使用されます。
    - TDD (Test-Driven Development) - テストを先に書く開発手法を採用し、堅牢なコードベースを構築しています。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MMLの文法定義からMMLパーサーを自動生成するために使用されます。
    - PEG文法定義 - MML音楽記法を解析するための文法ルールを記述したファイルで、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、コードのモジュール化と再利用性を高めています。
- 自動化・CI/CD:
    - GitHub Actions - プロジェクトのCI/CD（継続的インテグレーション/継続的デリバリー）を自動化するサービスで、4つのワークフローが設定されています。
        - プロジェクト要約自動生成: プロジェクトの概要を自動的に生成するワークフロー。
        - Issue自動管理: GitHub Issuesの管理を自動化するワークフロー。
        - README多言語翻訳: READMEファイルを複数の言語に自動翻訳するワークフロー。
        - i18n automation: 国際化（i18n）関連の自動翻訳処理を行うワークフロー。
- 開発標準: EditorConfig - 異なるエディタやIDE間で一貫したコーディングスタイルを強制するための設定ファイルです。

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
- **.editorconfig**: プロジェクト全体のコードのインデントスタイル、文字コード、改行コードなどの統一ルールを定義する設定ファイルです。
- **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、一時ファイル、依存関係モジュールなど）を指定するファイルです。
- **LICENSE**: プロジェクトの利用条件や配布に関するライセンス情報が記載されています。
- **README.ja.md / README.md**: プロジェクトの目的、機能、使用方法、開発者情報などを説明するドキュメントで、それぞれ日本語版と英語版です。
- **dev-setup/README.md**: 開発環境のセットアップ手順や必要なツールに関する情報を提供します。
- **dev-setup/setup.js**: 開発環境を初期化したり、特定の開発タスクを実行したりするための補助スクリプトです。
- **generated-docs/callgraph-enhanced.html**: プロジェクト内の関数呼び出し関係を視覚的に表示するインタラクティブなHTMLドキュメントです。
- **generated-docs/callgraph.js**: `callgraph-enhanced.html`で関数呼び出しグラフを生成し、その操作ロジックを提供するJavaScriptファイルです。
- **generated-docs/style.css**: 生成されたドキュメント（例: 呼び出しグラフ）の見た目を定義するスタイルシートファイルです。
- **index.html**: プロジェクトのライブデモや公開されているメインページのエントリポイントとなるHTMLファイルです。
- **issue-notes/ (各種.mdファイル)**: 開発中に発生したIssueに関する詳細なメモや解決策を記録した開発者向けドキュメントです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発依存関係、および実行可能なスクリプトを定義するファイルです。
- **pnpm-lock.yaml**: `pnpm`パッケージマネージャーによって生成される、プロジェクトの正確な依存関係ツリーとバージョンを固定するためのロックファイルです。
- **src/grammar.js**: `src/grammar.pegjs`で定義された文法に基づいて、Peggyによって自動生成されたMMLパーサーのJavaScript実装です。MML文字列を解析し、抽象構文木（AST）を構築します。
- **src/grammar.pegjs**: MML (Music Macro Language) の文法規則を定義するためのPEG (Parsing Expression Grammar) 形式のファイルです。
- **src/index.html**: MMLプレイヤーのデモやユーザーインターフェースを提供する、アプリケーションの主要なHTMLファイルの一つです。
- **src/main.js**: アプリケーションの主要なエントリーポイントとなるJavaScriptファイルで、初期化やメインロジックの調整を行います。
- **src/mml2json.js**: MMLの抽象構文木をTone.jsのシーケンサーが解釈できるJSON形式のコマンド（音符イベントなど）に変換する主要なロジックを実装しています。
- **src/play.js**: `mml2json.js`によって生成されたTone.js JSONデータを受け取り、Tone.jsライブラリを使用して実際に音楽をブラウザで再生する機能を提供します。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーの正確性を検証するためのテストコードです。
- **vitest.config.js**: Vitestテストフレームワークの動作を設定するためのファイルです。

## 関数詳細説明
- **mml2json (src/mml2json.js)**:
    - **役割**: MML（Music Macro Language）のパーシング結果（抽象構文木）を、Tone.jsのシーケンサーが直接利用できるJSON形式の音楽イベントデータに変換します。
    - **機能**: 音符、休符、テンポ、音量などのMML要素を解析し、Tone.jsのイベントオブジェクトの配列に構造化します。これにより、MMLで記述された楽曲をTone.jsで再生可能にします。
- **compileMmlToCommands (src/mml2json.js)**:
    - **役割**: MMLから抽出された個々のコマンドを、Tone.jsのシーケンスで必要となる詳細なイベント情報に変換する内部関数です。
    - **機能**: 音符の開始時間、長さ、ピッチ、ベロシティなどの情報を計算し、Tone.jsのイベント形式に合うように整形します。
- **play (src/play.js)**:
    - **役割**: `mml2json`によって生成されたTone.js JSONデータを基に、実際に音楽をWeb Audio API経由で再生します。
    - **機能**: Tone.jsのPlayerやPartなどのオブジェクトを初期化し、変換された音楽データをロードしてブラウザ上で音を鳴らします。エラーハンドリングも含まれます。
- **peg$parse (src/grammar.js)**:
    - **役割**: `src/grammar.pegjs`で定義された文法に従い、入力されたMML文字列を解析するパーサーのエントリポイントです。
    - **機能**: MML文字列をトークン化し、構文木を構築することで、MMLデータの構造をプログラムで扱える形式に変換します。これはPeggyによって自動生成されたMMLパーサーの主要な関数です。
- **escapeHtml (generated-docs/callgraph.js)**:
    - **役割**: HTML特殊文字をエスケープし、スクリプトインジェクションを防ぐためのヘルパー関数です。
    - **機能**: 関数呼び出しグラフなどのドキュメント生成において、表示するテキストが安全にHTMLとしてレンダリングされるようにします。
- **getLayoutConfig (generated-docs/callgraph.js)**:
    - **役割**: 関数呼び出しグラフの描画レイアウトに関する設定を取得します。
    - **機能**: グラフのノード配置やエッジのスタイルなど、表示オプションを決定するための設定値を提供します。
- **resetLayout (generated-docs/callgraph.js)**:
    - **役割**: 関数呼び出しグラフのレイアウトを初期状態にリセットします。
    - **機能**: ユーザーが操作して変更されたグラフの配置やズームレベルを、デフォルトの状態に戻します。
- **catch (dev-setup/setup.js, src/play.js)**:
    - **役割**: 例外処理を行うブロックです。
    - **機能**: 開発セットアップ時のエラーや音楽再生中のエラーなど、予期せぬ問題が発生した場合にそれを捕捉し、適切なメッセージ表示やフォールバック処理を実行します。
- **hex, unicodeEscape, literalEscape, classEscape (src/grammar.js)**:
    - **役割**: MMLパーサー内部で文字列や文字クラスの処理、エスケープシーケンスの解釈などに利用されるユーティリティ関数です。
    - **機能**: 主にPeggyによって自動生成されるパーサーの内部ロジックの一部として、MML構文解析の低レベルな部分を処理します。

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
Generated at: 2025-10-05 07:05:00 JST
