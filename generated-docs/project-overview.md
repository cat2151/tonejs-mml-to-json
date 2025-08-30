Last updated: 2025-08-31

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）記法で書かれた音楽データを、Web Audio APIライブラリTone.jsが理解できるJSON形式に変換します。
- このツールは、MMLで定義された音楽シーケンスをWebブラウザ上で効率的に再生・視覚化することを可能にします。
- 高度なテスト、ビルド、ドキュメント自動生成、多言語対応といった開発支援機能も統合されたプロジェクトです。

## 技術スタック
- フロントエンド: HTML5 - ブラウザベースのMMLプレイヤーとして、ユーザーインターフェースを提供します。
- 音楽・オーディオ:
    - Tone.js - Web Audio APIを抽象化し、ブラウザ上で高度な音楽合成やシーケンスを可能にするJavaScriptライブラリです。
    - Tone.js CDN - unpkg経由でTone.jsライブラリを配信し、プロジェクトへの組み込みを容易にしています。
    - MML (Music Macro Language) - 音楽をテキストで記述するための記法であり、このプロジェクトのパーサーの入力形式です。
    - Web Audio API - ブラウザに組み込まれた音声処理APIで、Tone.jsを通じて利用されます。
- 開発ツール:
    - Node.js runtime - JavaScriptコードを実行するための環境です。
    - npm scripts - パッケージ管理とスクリプト実行のためのタスクランナーとして使用されます。
    - pnpm - 高速で効率的なパッケージマネージャーであり、依存関係の管理に利用されます。
    - Google Generative AI - ドキュメントやコードの生成を支援するAIサービスです。
    - @octokit/rest - GitHub APIと連携し、リポジトリ操作や自動化タスクを実行します。
- テスト:
    - Vitest - 高速なViteベースのテストフレームワークで、ユニットテストや統合テストの実行に使用されます。
    - TDD (Test-Driven Development) - テストを先に書く開発手法を採用し、品質と設計の向上を目指します。
- ビルドツール:
    - Peggy - PEG (Parsing Expression Grammar) パーサージェネレーターで、MML記法を解析するためのパーサーを自動生成します。
    - PEG文法定義 - MML音楽記法を解析するための文法ルールを定義し、Peggyによってパーサーが生成されます。
- 言語機能: ES Modules - モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を高めています。
- 自動化・CI/CD:
    - GitHub Actions - CI/CD（継続的インテグレーション/継続的デリバリー）のための自動化プラットフォームです。
    - プロジェクト要約自動生成 - プロジェクトの概要説明などを自動で生成するワークフローです。
    - Issue自動管理 - GitHub Issuesの管理を自動化し、開発ワークフローを効率化します。
    - README多言語翻訳 - READMEファイルを複数の言語に自動翻訳します。
    - i18n automation - 国際化（i18n）関連の翻訳プロセスを自動化します。
- 開発標準: EditorConfig - 複数の開発者や異なるIDE間でのコードスタイルの一貫性を保つための設定ファイルです。

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
- **.editorconfig**: 異なるエディタやIDE間で一貫したコードスタイルを維持するための設定ファイルです。
- **.gitignore**: Gitがバージョン管理の対象としないファイルやディレクトリを指定します。
- **LICENSE**: プロジェクトのライセンス情報が記載されています。
- **README.ja.md**: プロジェクトの概要、使い方、開発方法などを日本語で説明するメインドキュメントです。
- **README.md**: プロジェクトの概要、使い方、開発方法などを英語で説明するメインドキュメントです。
- **dev-setup/README.md**: 開発環境のセットアップに関する情報を提供します。
- **dev-setup/setup.js**: 開発環境のセットアップスクリプトまたは関連するユーティリティです。
- **generated-docs/callgraph-enhanced.html**: 関数呼び出しグラフをインタラクティブに表示するHTMLファイルです。
- **generated-docs/callgraph.js**: 関数呼び出しグラフのデータを処理し、表示を制御するJavaScriptコードです。
- **generated-docs/development-status.md**: プロジェクトの現在の開発状況に関するドキュメントです。
- **generated-docs/project-overview.md**: 自動生成されたプロジェクトの概要ドキュメントです。
- **generated-docs/style.css**: 生成されたドキュメントの表示スタイルを定義するCSSファイルです。
- **index.html**: プロジェクトのウェブサイトまたはデモアプリケーションのエントリーポイントとなるHTMLファイルです。
- **issue-notes/**: 開発中の課題や検討事項を記録するMarkdownファイルを格納するディレクトリです。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、依存関係など）とnpmスクリプトを定義します。
- **pnpm-lock.yaml**: pnpmパッケージマネージャーによって生成される、正確な依存関係のバージョンをロックするファイルです。
- **src/grammar.js**: Peggyパーサージェネレーターによって`grammar.pegjs`から生成されたMMLパーサーのJavaScriptコードです。MML記法を構文解析するロジックが含まれます。
- **src/grammar.pegjs**: MML（Music Macro Language）の構文ルールを定義するPEG（Parsing Expression Grammar）ファイルです。
- **src/index.html**: `src`ディレクトリ内の、MML変換・再生デモのHTMLファイルです。
- **src/main.js**: メインのアプリケーションロジックを構成するJavaScriptファイルです。
- **src/mml2json.js**: MML文字列をTone.jsのJSONシーケンサーフォーマットに変換する主要なロジックが含まれます。
- **src/play.js**: 生成されたJSONデータに基づいてTone.jsで音楽を再生する機能を提供するJavaScriptファイルです。
- **test/parser.test.js**: `src/grammar.js`で定義されたMMLパーサーのテストケースを含むファイルです。
- **vitest.config.js**: Vitestテストフレームワークの設定ファイルです。

## 関数詳細説明
- **catch** (dev-setup/setup.js): エラーハンドリングのための一般的な関数またはブロックです。
- **escapeHtml** (generated-docs/callgraph.js): HTML特殊文字をエスケープし、セキュリティを確保するためのユーティリティ関数です。
- **getLayoutConfig** (generated-docs/callgraph.js): グラフのレイアウト設定を取得または生成する関数です。
- **placeCentralNode** (generated-docs/callgraph.js): グラフの中央ノードを配置する関数です。
- **showNodeInfo** (generated-docs/callgraph.js): 特定のノード（関数）の詳細情報を表示する関数です。
- **showEdgeInfo** (generated-docs/callgraph.js): 特定のエッジ（呼び出し関係）の詳細情報を表示する関数です。
- **hideInfoPanel** (generated-docs/callgraph.js): 情報パネルを非表示にする関数です。
- **showInfoPanel** (generated-docs/callgraph.js): 情報パネルを表示する関数です。
- **toggleInfoPanel** (generated-docs/callgraph.js): 情報パネルの表示/非表示を切り替える関数です。
- **generateGitHubURL** (generated-docs/callgraph.js): GitHubリソースへのURLを生成する関数です。
- **resetLayout** (generated-docs/callgraph.js): グラフのレイアウトを初期状態にリセットする関数です。
- **watchNodeMovementAndFixOverlapsWrap** (generated-docs/callgraph.js): ノードの動きを監視し、重なりを修正する処理のラッパー関数です。
- **watchNodeMovementAndFixOverlaps** (generated-docs/callgraph.js): ノードの動きを監視し、ノードが重ならないように配置を調整する関数です。
- **resolveNodeOverlaps** (generated-docs/callgraph.js): ノードの重なりを解決する関数です。
- **switchLayout** (generated-docs/callgraph.js): グラフのレイアウトモードを切り替える関数です。
- **resetNodeStates** (generated-docs/callgraph.js): グラフノードの状態をリセットする関数です。
- **fitToContent** (generated-docs/callgraph.js): グラフビューをコンテンツに合わせて調整する関数です。
- **toggleNodeLabels** (generated-docs/callgraph.js): ノードラベルの表示/非表示を切り替える関数です。
- **toggleCalleeLocationFilter** (generated-docs/callgraph.js): 呼び出される側の関数のロケーションフィルターを切り替える関数です。
- **replace** (generated-docs/callgraph.js): 文字列置換を行う一般的なユーティリティ関数です。
- **function** (generated-docs/callgraph.js): 無名関数またはコールバック関数として使用される一般的なプレースホルダーです。
- **max** (generated-docs/callgraph.js): 最大値を計算する一般的なユーティリティ関数です。
- **on** (generated-docs/callgraph.js): イベントリスナーを設定する一般的な関数です。
- **ready** (generated-docs/callgraph.js): DOMが準備完了した際に実行されるコールバックを登録する関数です。
- **addListener** (generated-docs/callgraph.js): イベントリスナーを追加する関数です。
- **mml2json** (src/mml2json.js): MML文字列をTone.jsのJSONシーケンサーフォーマットに変換するメイン関数です。
- **compileMmlToCommands** (src/mml2json.js): MMLを中間コマンド形式にコンパイルする関数です。
- **getMmlCommands** (src/mml2json.js): MMLコマンドのリストを取得する関数です。
- **calcAttackToReleaseTicks** (src/mml2json.js): アタックからリリースまでのティック数を計算する関数です。
- **repeat** (src/mml2json.js): 特定の処理を繰り返すためのヘルパー関数です。
- **toInt** (src/mml2json.js): 値を整数に変換するヘルパー関数です。
- **calcDuration** (src/mml2json.js): 音符のデュレーション（継続時間）を計算する関数です。
- **calcStartTick** (src/mml2json.js): 音符の開始ティックを計算する関数です。
- **increaseStartTick** (src/mml2json.js): 開始ティックを増加させる関数です。
- **calcLtick** (src/mml2json.js): Lティック（長さの基本単位）を計算する関数です。
- **getNodeId** (src/mml2json.js): ノードIDを取得する関数です。
- **sort** (src/mml2json.js): リストや配列をソートするユーティリティ関数です。
- **play** (src/play.js): Tone.jsを使用して音楽シーケンスを再生するメイン関数です。
- **sub** (src/play.js): 再生ロジック内で使用される補助関数です。
- **hex**, **unicodeEscape**, **literalEscape**, **classEscape**, **describeExpectation**, **describeExpected**, **describeFound**, **peg$parse**, **peg$f0**, **text**, **offset**, **range**, **location**, **expected**, **error**, **peg$getUnicode**, **peg$literalExpectation**, **peg$classExpectation**, **peg$anyExpectation**, **peg$endExpectation**, **peg$otherExpectation**, **peg$computePosDetails**, **peg$computeLocation**, **peg$fail**, **peg$buildSimpleError**, **peg$buildStructuredError**, **peg$parsestart**, **peg$parsenote**, **peg$throw** (src/grammar.js): これらはPeggyパーサージェネレーターによって生成されたMMLパーサーの内部関数群であり、MML文字列の構文解析、エラー処理、位置情報の追跡など、パーサーのコア機能を提供します。
- **start** (src/grammar.pegjs): PEG文法定義の開始ルールです。
- **note** (src/grammar.pegjs): PEG文法定義における音符の解析ルールです。

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
- start (src/grammar.pegjs)
- note (src/grammar.pegjs)
```

---
Generated at: 2025-08-31 07:03:23 JST
