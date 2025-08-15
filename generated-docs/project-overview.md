Last updated: 2025-08-16

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) を、Web Audio APIを基盤とする音響ライブラリTone.jsのJSONシーケンサー形式に変換します。
- これにより、MMLで記述された音楽データをブラウザ上で直接再生できる環境を提供します。
- 主にMMLパーサー、JSON変換ロジック、およびTone.jsを用いた再生機能から構成されています。

## 技術スタック
- フロントエンド: HTML5 (ブラウザベースのMMLプレイヤーを実現し、ユーザーインターフェースを提供します)
- 音楽・オーディオ: Tone.js (Web Audio APIを利用した高度な音声処理ライブラリで、音楽再生の核となります), Tone.js CDN (unpkg経由でTone.jsライブラリを効率的に配信します), MML (Music Macro Language - 音楽記法を解析するための独自のパーサー定義に使用されます), Web Audio API (ブラウザネイティブの音声処理技術で、Tone.jsを通じて利用されます)
- 開発ツール: Node.js runtime (JavaScriptの実行環境を提供します), npm scripts (様々な開発タスク（テスト、ビルド、ドキュメント生成など）を自動化するための5つのスクリプトが含まれます), pnpm (高速で効率的なパッケージマネージャーで、依存関係の管理を最適化します), Google Generative AI (AIによるドキュメント生成や要約をサポートします), @octokit/rest (GitHub APIと連携し、リポジトリ情報の取得やIssue管理を自動化します)
- テスト: Vitest (高速なViteベースのテストフレームワークで、効率的な単体テストを実現します), TDD (Test-Driven Development - テストを先行して記述する開発手法が採用されており、品質と信頼性を高めます)
- ビルドツール: Peggy (PEG (Parsing Expression Grammar) パーサージェネレーターで、MML音楽記法のパーサーを自動生成します), PEG文法定義 (MML音楽記法を正確に解析するための文法ルールが定義されています)
- 言語機能: ES Modules (モダンなJavaScriptモジュールシステムを採用し、コードの再利用性と保守性を向上させます)
- 自動化・CI/CD: GitHub Actions (継続的インテグレーション/デリバリーを自動化する4つのワークフローが含まれます。プロジェクト要約の自動生成、Issueの自動管理、READMEファイルの多言語翻訳、i18n関連の自動翻訳フローを実現します)
- 開発標準: EditorConfig (複数のエディタやIDE間でコードの書式設定を統一し、コード品質の一貫性を保ちます)

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
- `.editorconfig`: プロジェクト全体でコードのインデント、改行コード、エンコーディングなどの書式設定を統一するための設定ファイルです。
- `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、依存関係モジュールなど）を指定する設定ファイルです。
- `LICENSE`: プロジェクトが公開されているライセンス情報（例: MIT License）を記載したファイルです。
- `README.ja.md`: プロジェクトの日本語版説明書です。プロジェクトの目的、使用方法、デモリンクなどが記載されています。
- `README.md`: プロジェクトの英語版説明書です。`README.ja.md`と同様の内容が英語で記載されています。
- `dev-setup/README.md`: 開発環境のセットアップ手順や、開発に関する特記事項を説明するファイルです。
- `dev-setup/setup.js`: 開発環境を構築したり、初期設定を行ったりするためのJavaScriptスクリプトです。
- `generated-docs/callgraph-enhanced.html`: プロジェクトの関数呼び出し階層を視覚的に表示するための、拡張されたHTMLファイルです。
- `generated-docs/callgraph.js`: `callgraph-enhanced.html`と連携し、関数呼び出しグラフの描画やインタラクティブな操作を制御するJavaScriptロジックが含まれています。
- `generated-docs/development-status.md`: プロジェクトの開発状況や進捗、既知の問題などを記録したドキュメントです。
- `generated-docs/project-overview.md`: このプロンプトによって生成されるプロジェクトの概要ドキュメントです。
- `generated-docs/style.css`: 生成されたドキュメントや視覚化ツールの見た目を整えるためのスタイルシートです。
- `index.html`: プロジェクトのWebアプリケーション（デモページなど）のメインエントリーポイントとなるHTMLファイルです。
- `issue-notes/`: GitHub Issuesから自動生成された、各Issueに関する詳細なノートや情報を格納するディレクトリです。
- `package.json`: Node.jsプロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発スクリプトなどが定義されている設定ファイルです。
- `pnpm-lock.yaml`: pnpmパッケージマネージャーが生成する、プロジェクトの正確な依存関係ツリーをロックするためのファイルです。これにより、異なる環境でのビルドの再現性が保証されます。
- `src/grammar.js`: `src/grammar.pegjs`で定義されたPEG文法を基に、Peggyによって自動生成されたMMLパーサーのJavaScriptコードです。MML文字列を解析し、抽象構文木を生成します。
- `src/grammar.pegjs`: MML (Music Macro Language) の構文ルールを定義するPEG (Parsing Expression Grammar) 形式のファイルです。これを元に`src/grammar.js`が生成されます。
- `src/index.html`: `src`ディレクトリ内の開発中の機能やコンポーネントをテスト・デモするためのHTMLファイルです。
- `src/main.js`: アプリケーションの主要なロジックを統合し、初期化やメイン処理を行うJavaScriptファイルです。
- `src/mml2json.js`: MMLの解析結果を受け取り、Tone.jsが利用できるJSONシーケンサー形式に変換する核心的なロジックが実装されたファイルです。
- `src/play.js`: `mml2json.js`で変換されたJSONデータを使用して、Tone.jsライブラリを介して実際に音声を再生する機能を提供するJavaScriptファイルです。
- `test/parser.test.js`: `src/grammar.js`で定義されたMMLパーサーの機能が期待通りに動作するかを検証するための単体テストコードです。
- `vitest.config.js`: Vitestテストフレームワークの動作を設定するための設定ファイルです。

## 関数詳細説明
- `catch` (dev-setup/setup.js): エラーが発生した際に例外を捕捉し、適切な処理を行うための一般的なエラーハンドリングブロックです。
- `escapeHtml` (generated-docs/callgraph.js): HTML特殊文字（`<`, `>`, `&`など）をエンティティに変換し、安全にHTMLコンテンツとして表示できるようにする関数です。
  - 引数: `html` (string): エスケープ対象の文字列。
  - 戻り値: (string): エスケープされた文字列。
- `getLayoutConfig` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトに関する設定情報を取得する関数です。
- `placeCentralNode` (generated-docs/callgraph.js): 呼び出しグラフ内で特定のノード（通常は中心となる関数）を配置する関数です。
- `showNodeInfo` (generated-docs/callgraph.js): 呼び出しグラフ上のノード（関数）に関する詳細情報を表示する関数です。
- `showEdgeInfo` (generated-docs/callgraph.js): 呼び出しグラフ上のエッジ（呼び出し関係の線）に関する詳細情報を表示する関数です。
- `hideInfoPanel` (generated-docs/callgraph.js): グラフに関連する情報パネルを非表示にする関数です。
- `showInfoPanel` (generated-docs/callgraph.js): グラフに関連する情報パネルを表示する関数です。
- `toggleInfoPanel` (generated-docs/callgraph.js): グラフ情報パネルの表示状態（表示/非表示）を切り替える関数です。
- `generateGitHubURL` (generated-docs/callgraph.js): 関連するGitHubリソースへのURLを生成する関数です。
- `resetLayout` (generated-docs/callgraph.js): 呼び出しグラフのレイアウトを初期状態にリセットする関数です。
- `watchNodeMovementAndFixOverlapsWrap` (generated-docs/callgraph.js): ノードの動きを監視し、ノードの重なりを修正するロジックをラップする関数です。
- `watchNodeMovementAndFixOverlaps` (generated-docs/callgraph.js): 呼び出しグラフ内のノードの移動を継続的に監視し、ノード同士が重ならないように位置を調整する関数です。
- `resolveNodeOverlaps` (generated-docs/callgraph.js): 呼び出しグラフ内で重なっているノードの位置を調整し、視認性を高める関数です。
- `switchLayout` (generated-docs/callgraph.js): 呼び出しグラフの表示レイアウト（例: 円形、ツリー型など）を切り替える関数です。
- `resetNodeStates` (generated-docs/callgraph.js): 呼び出しグラフ内の各ノードの状態（選択、ハイライトなど）をリセットする関数です。
- `fitToContent` (generated-docs/callgraph.js): 呼び出しグラフの表示を、すべてのコンテンツが画面内に収まるように調整する関数です。
- `toggleNodeLabels` (generated-docs/callgraph.js): 呼び出しグラフのノードに表示されるラベルの表示/非表示を切り替える関数です。
- `toggleCalleeLocationFilter` (generated-docs/callgraph.js): 呼び出し元/呼び出し先の関数位置に基づいてグラフをフィルタリングする機能を切り替える関数です。
- `replace` (generated-docs/callgraph.js): 文字列内の特定のパターンを別の文字列に置換する一般的な関数です。
- `switch` (generated-docs/callgraph.js): 複数の条件に基づいて異なる処理を実行する制御フローの一部です。
- `function` (generated-docs/callgraph.js): JavaScriptの関数定義または無名関数を示すキーワードです。
- `max` (generated-docs/callgraph.js): 与えられた数値のセットから最大値を返す関数です。
- `on` (generated-docs/callgraph.js): 特定のイベントが発生したときに実行されるイベントリスナーを登録する関数です。
- `if` (generated-docs/callgraph.js): 指定された条件が真である場合にコードブロックを実行する制御フローの一部です。
- `for` (generated-docs/callgraph.js): 指定された回数または条件が満たされるまでコードブロックを繰り返し実行する制御フローの一部です。
- `ready` (generated-docs/callgraph.js): DOMが完全にロードされ、操作可能になったときに実行されるコールバックを設定する関数です。
- `addListener` (generated-docs/callgraph.js): イベントリスナーを追加し、特定のイベント発生時に指定された関数を実行させる関数です。
- `hex` (src/grammar.js): 16進数文字の解析に関連する、Peggyパーサー内部の補助関数です。
- `unicodeEscape` (src/grammar.js): Unicodeエスケープシーケンス（例: `\uXXXX`）を処理するパーサー内部の補助関数です。
- `literalEscape` (src/grammar.js): リテラル文字列内のエスケープシーケンスを処理するパーサー内部の補助関数です。
- `classEscape` (src/grammar.js): 文字クラス（例: `[a-z]`）内のエスケープシーケンスを処理するパーサー内部の補助関数です。
- `describeExpectation` (src/grammar.js): パーサーが入力に対して何を期待しているかを記述する内部関数です。
- `describeExpected` (src/grammar.js): パーサーが予期していた特定の要素を記述する内部関数です。
- `describeFound` (src/grammar.js): パーサーが入力中に実際に発見した要素を記述する内部関数です。
- `peg$parse` (src/grammar.js): Peggyによって生成されたメインのパース関数で、MML文字列を解析し、構文木を構築します。
  - 引数: `input` (string): パース対象のMML文字列。
  - 戻り値: (object): MMLの構文木を表すオブジェクト。
- `peg$f0` (src/grammar.js): Peggyパーサーによって生成される匿名内部関数の一つで、特定のルールのアクションロジックをカプセル化します。
- `text` (src/grammar.js): 現在パース中の入力文字列の一部を返すパーサー内部関数です。
- `offset` (src/grammar.js): 現在のパース位置のオフセット（文字数）を返すパーサー内部関数です。
- `range` (src/grammar.js): 現在のパース位置の範囲（開始と終了のオフセット）を返すパーサー内部関数です。
- `location` (src/grammar.js): 現在のパース位置の行、列、オフセットなどの詳細な位置情報を返すパーサー内部関数です。
- `expected` (src/grammar.js): パースエラー時に、パーサーが期待していた要素に関する情報を提供する内部関数です。
- `error` (src/grammar.js): パース中に発生したエラーオブジェクトを生成または処理する関数です。
- `peg$getUnicode` (src/grammar.js): Unicode文字コードポイントを取得するパーサー内部関数です。
- `peg$literalExpectation` (src/grammar.js): リテラル文字列に対する期待値を表現するオブジェクトを生成する内部関数です。
- `peg$classExpectation` (src/grammar.js): 文字クラスに対する期待値を表現するオブジェクトを生成する内部関数です。
- `peg$anyExpectation` (src/grammar.js): 任意の文字に対する期待値を表現するオブジェクトを生成する内部関数です。
- `peg$endExpectation` (src/grammar.js): 入力の終端に対する期待値を表現するオブジェクトを生成する内部関数です。
- `peg$otherExpectation` (src/grammar.js): 特定のカテゴリに属さないその他の期待値を表現するオブジェクトを生成する内部関数です。
- `peg$computePosDetails` (src/grammar.js): パース位置の詳細情報（行、列など）を計算するパーサー内部関数です。
- `peg$computeLocation` (src/grammar.js): パース中の現在の位置情報オブジェクトを計算して返すパーサー内部関数です。
- `peg$fail` (src/grammar.js): パースが失敗したことを通知し、エラー処理フローを開始するパーサー内部関数です。
- `peg$buildSimpleError` (src/grammar.js): シンプルな形式のパースエラーメッセージを構築する内部関数です。
- `peg$buildStructuredError` (src/grammar.js): 構造化された形式のパースエラーメッセージを構築する内部関数です。
- `peg$parsestart` (src/grammar.js): MMLパーサーの「start」ルールをパースする内部関数です。MML入力全体のパースを開始します。
- `peg$parsenote` (src/grammar.js): MMLパーサーの「note」ルール（音符の記述）をパースする内部関数です。
- `peg$throw` (src/grammar.js): エラーをスローするパーサー内部関数です。
- `constructor` (src/grammar.js): クラスのインスタンスを初期化するコンストラクタ関数です（主にエラーオブジェクトなどで使用されます）。
- `format` (src/grammar.js): 特定の形式に従ってデータを整形する関数です。
- `buildMessage` (src/grammar.js): エラーメッセージなどのテキストコンテンツを構築する関数です。
- `literal` (src/grammar.js): リテラル値の処理に関連するパーサー内部関数です。
- `class` (src/grammar.js): 文字クラスの処理に関連するパーサー内部関数です。
- `any` (src/grammar.js): 任意の文字の処理に関連するパーサー内部関数です。
- `end` (src/grammar.js): 入力の終端処理に関連するパーサー内部関数です。
- `other` (src/grammar.js): その他の特定のカテゴリに属さない処理に関連するパーサー内部関数です。
- `while` (src/grammar.js): 特定の条件が真である限り、コードブロックを繰り返し実行する制御フローの一部です。
- `mml2json` (src/mml2json.js): MML文字列を解析し、Tone.jsが利用可能なJSONシーケンサー形式のオブジェクトに変換する主要な関数です。
  - 引数: `mmlString` (string): 変換対象のMML文字列。
  - 戻り値: (object): Tone.jsシーケンサー互換のJSONオブジェクト。
- `compileMmlToCommands` (src/mml2json.js): MMLを内部的なコマンド表現のリストにコンパイルする関数です。
- `getMmlCommands` (src/mml2json.js): コンパイルされたMMLコマンドのリストを取得する関数です。
- `calcAttackToReleaseTicks` (src/mml2json.js): 音符のアタックからリリースまでのティック数を計算する補助関数です。
- `repeat` (src/mml2json.js): 特定の処理を指定された回数だけ繰り返す補助関数です。
- `toInt` (src/mml2json.js): 値を整数に変換する補助関数です。
  - 引数: `value` (any): 変換する値。
  - 戻り値: (number): 整数に変換された値。
- `calcDuration` (src/mml2json.js): MMLの記述に基づいて音符のデュレーション（長さ）を計算する関数です。
- `calcStartTick` (src/mml2json.js): 各音符やイベントの開始ティック（時間位置）を計算する関数です。
- `increaseStartTick` (src/mml2json.js): 現在の開始ティックを次のイベントのために増加させる関数です。
- `calcLtick` (src/mml2json.js): MMLのLコマンド（デフォルトの音符長さ）に基づいてティックを計算する関数です。
- `getNodeId` (src/mml2json.js): 処理中のノード（MMLコマンド）に一意のIDを割り当てる関数です。
- `sort` (src/mml2json.js): 配列やリストの要素を特定の基準で並び替える汎用的な関数です。
- `play` (src/play.js): 変換されたTone.js JSONデータを受け取り、Web Audio APIを介して実際に音楽を再生する関数です。
  - 引数: `jsonObject` (object): Tone.jsシーケンサー互換のJSONデータ。
  - 戻り値: (void)
- `sub` (src/play.js): `play`関数から呼び出される補助的な処理を行う関数です。

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
Generated at: 2025-08-16 07:03:43 JST
