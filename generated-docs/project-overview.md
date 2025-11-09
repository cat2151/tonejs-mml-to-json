Last updated: 2025-11-10

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

## 技術スタック
- フロントエンド:
    - HTML/CSS: ウェブページ表示とスタイリングに使用され、デモページや生成ドキュメントの視覚的な部分を構成します。
    - JavaScript: ブラウザ上で動作する主要なプログラミング言語であり、MMLの解析、JSONへの変換、およびデモでの音楽再生ロジックを実装しています。
    - Tone.js JSON Sequencer Format: 本プロジェクトの出力形式であり、Tone.jsライブラリで利用可能な音楽シーケンスデータを記述するためのJSON構造です。
- 音楽・オーディオ:
    - MML (Music Macro Language): 音楽をテキストベースで記述するためのシンプルな言語であり、本プロジェクトの入力形式です。
- 開発ツール:
    - Peggy (旧PEG.js): MMLパーサーを自動生成するために使用されるパーサー・ジェネレーターです。`src/grammar.pegjs`に文法定義を記述し、`src/grammar.js`にパーサーコードが生成されます。
    - Node.js: JavaScriptの実行環境であり、開発スクリプト、パッケージ管理、テスト実行などに利用されます。
    - `@google/generative-ai`: Googleの生成AIモデルと連携するためのクライアントライブラリで、自動化されたドキュメント生成などの用途で利用されている可能性があります。
    - `@octokit/rest`: GitHub APIを操作するためのライブラリで、GitHub Actionsにおけるリポジトリ操作や自動化スクリプトに利用されている可能性があります。
    - `dotenv`: 環境変数を管理するためのライブラリで、開発環境での設定値の読み込みなどに利用されます。
- テスト:
    - Vitest: JavaScript/TypeScriptプロジェクト向けの高速な単体テストフレームワークで、MMLパーサーの正確性を検証するために使用されます。
- ビルドツール:
    - Peggy: MML文法からパーサーを生成する役割を担います。
- 言語機能:
    - JavaScript (ECMAScript): プロジェクト全体で利用される主要なプログラミング言語であり、その最新の言語仕様や機能が活用されています。
- 自動化・CI/CD:
    - GitHub Actions: GitHubリポジトリのワークフローを自動化するためのプラットフォームで、READMEファイルの自動生成など、様々なタスクに使用されています。
- 開発標準:
    - .editorconfig: 異なる開発環境（エディタやIDE）間で、コードのインデント、文字コードなどのコーディングスタイルを統一するための設定ファイルです。
    - Markdown: ドキュメンテーションの記述に広く用いられる軽量マークアップ言語であり、READMEファイルや開発メモなどで使用されています。

## ファイル階層ツリー
```
📄 .editorconfig
📁 .github_automation/
  📁 callgraph/
    📁 config/
      📊 my.json
📄 .gitignore
📄 LICENSE
📖 README.ja.md
📖 README.md
📄 _config.yml
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
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
-   `.editorconfig`: 開発環境全体でコードの書式（インデント、改行コードなど）を統一するための設定ファイルです。
-   `.github_automation/callgraph/config/my.json`: GitHub Actionsで関数呼び出しグラフ（コールグラフ）の生成を自動化するための設定情報が記述されています。
-   `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、一時ファイルなど）を指定するファイルです。
-   `LICENSE`: プロジェクトの配布条件や利用許諾を定めるライセンス情報が記述されています。
-   `README.ja.md`: プロジェクトの日本語版説明書で、概要、使い方、デモリンクなどが含まれます。
-   `README.md`: プロジェクトの英語版説明書です。日本語版が自動翻訳されて生成されています。
-   `_config.yml`: GitHub Pagesなどの静的サイトジェネレータで使用される設定ファイルで、サイトの挙動を定義します。
-   `dev-setup/README.md`: 開発環境をセットアップするための手順や情報が記述されています。
-   `dev-setup/setup.js`: 開発環境の初期設定や、開発支援ツールに関連するスクリプトが含まれています。
-   `generated-docs/callgraph-enhanced.html`: プロジェクト内の関数呼び出し関係を視覚化した、拡張されたコールグラフのHTML表示ファイルです。
-   `generated-docs/callgraph.html`: プロジェクト内の関数呼び出し関係を視覚化した、基本的なコールグラフのHTML表示ファイルです。
-   `generated-docs/callgraph.js`: 生成されたコールグラフのHTMLページで、グラフの描画、インタラクション、レイアウト制御などのロジックを提供するJavaScriptファイルです。
-   `generated-docs/style.css`: 生成されたドキュメントやコールグラフの視覚的なスタイルを定義するCSSファイルです。
-   `index.html`: プロジェクトのメインデモページ、またはルートとなるウェブページファイルです。
-   `issue-notes/`: 開発中に検討された事項や、特定の課題に関するメモがMarkdown形式で記録されているディレクトリです。
-   `package.json`: プロジェクトのメタデータ（名前、バージョンなど）や、依存するライブラリ（`dependencies`）、開発時に必要なツール（`devDependencies`）を定義するファイルです。
-   `pnpm-lock.yaml`: `pnpm`パッケージマネージャーによって生成される、プロジェクトの依存関係の正確なバージョンとインストール順序をロックするファイルです。
-   `src/grammar.js`: `src/grammar.pegjs`で定義された文法に基づいて、Peggyによって自動生成されたMMLパーサーのJavaScriptコードです。
-   `src/grammar.pegjs`: MML（Music Macro Language）の文法規則を記述したファイルで、これをもとに`src/grammar.js`が生成されます。
-   `src/index.html`: `src`ディレクトリ内のデモやテスト用HTMLファイルです。
-   `src/main.js`: プロジェクトの主要なアプリケーションロジック、またはエントリポイントとなるJavaScriptファイルです。
-   `src/mml2json.js`: MML形式の音楽データを、Tone.jsが理解できるJSONシーケンサーフォーマットに変換する中心的なロジックが実装されているファイルです。
-   `src/play.js`: 変換されたJSONデータを使用して、ブラウザ上で実際に音楽を再生するための簡易的な機能を提供するJavaScriptファイルです。
-   `test/parser.test.js`: MMLパーサーの挙動が期待通りであることを検証するための単体テストコードが記述されています。
-   `vitest.config.js`: Vitestテストフレームワークの動作設定を定義するファイルです。

## 関数詳細説明
-   `mml2json` (src/mml2json.js):
    -   **役割**: MML形式の音楽データをTone.js JSON Sequencer形式に変換する主要な関数です。
    -   **機能**: 入力されたMML文字列を解析し、音符、休符、テンポなどの音楽情報を抽出し、Tone.jsが解釈可能なJSON構造に変換します。
-   `compileMmlToCommands` (src/mml2json.js):
    -   **役割**: MMLを中間コマンドリストにコンパイルする関数です。
    -   **機能**: MMLの構文を解析して、音の長さ、音高、タイミングなどの情報を表す内部的なコマンドリストを生成します。
-   `getMmlCommands` (src/mml2json.js):
    -   **役割**: MML文字列からMMLコマンドを抽出する関数です。
    -   **機能**: 入力されたMMLテキストを解析し、個々のMMLコマンド（例: 'c', 'l16', 'o4'）の配列を返します。
-   `calcAttackToReleaseTicks` (src/mml2json.js):
    -   **役割**: 音の開始からリリースまでの内部的なティック数を計算する関数です。
    -   **機能**: 音符の長さやタイ（連結）情報に基づき、音が鳴り始めてから音が終わるまでの内部的な時間単位（ティック）を計算します。
-   `repeat` (src/mml2json.js):
    -   **役割**: MML内の繰り返し指示を処理する関数です。
    -   **機能**: MMLの繰り返し記号（例: `[cde]x2`）を解釈し、指定された回数だけ音符やコマンドを複製します。
-   `toInt` (src/mml2json.js):
    -   **役割**: 文字列を整数に安全に変換する補助関数です。
    -   **機能**: MML内で数値として指定される情報（例: 音量、テンポなど）を整数値に変換します。
-   `calcDuration` (src/mml2json.js):
    -   **役割**: 音符の正確な持続時間を計算する関数です。
    -   **機能**: MMLの長さ指定（例: `l4`, `l8.`）に基づき、音符が鳴るべき正確な持続時間を内部的なティック単位で計算します。
-   `calcStartTick` (src/mml2json.js):
    -   **役割**: 音符の開始ティック（時間的な位置）を計算する関数です。
    -   **機能**: 曲の開始からの相対的な時間で、現在の音符がいつ始まるべきか（ティック単位）を計算します。
-   `increaseStartTick` (src/mml2json.js):
    -   **役割**: 次の音符が始まるべき時間（スタートティック）を更新する関数です。
    -   **機能**: 現在の音符の長さに基づいて、次に音符が開始するべきティック位置を進行させます。
-   `calcLtick` (src/mml2json.js):
    -   **役割**: 現在設定されているデフォルトの音符長（`L`コマンド）を内部的なティック値に変換する関数です。
    -   **機能**: MMLで指定されたデフォルトの音符長（例: `L4`）を解釈し、そのティック値を返します。
-   `getNodeId` (src/mml2json.js):
    -   **役割**: データ構造内の要素に一意の識別子を付与する関数です。
    -   **機能**: 内部的なデータ構造の各要素に重複しないIDを割り当て、管理しやすくします。
-   `sort` (src/mml2json.js):
    -   **役割**: 音楽イベントやコマンドのリストを特定の順序で並べ替える関数です。
    -   **機能**: 複数のイベントやコマンドを時間順などで整理するために使用されます。
-   `play` (src/play.js):
    -   **役割**: 変換されたJSONデータを使用して音楽を再生する関数です。
    -   **機能**: `mml2json`で生成されたJSONデータを読み込み、ブラウザ上で実際に音を鳴らすための簡易的なインターフェースを提供します。
-   `sub` (src/play.js):
    -   **役割**: 音楽再生関連の補助的な処理を行う関数です。
    -   **機能**: `play`関数から呼び出され、再生処理の一部（例: 音源の準備、再生スケジューリング）を担います。
-   `peg$parse` (src/grammar.js):
    -   **役割**: Peggyによって生成されたMMLパーサーの主要なエントリポイントとなる関数です。
    -   **機能**: MML文字列を入力として受け取り、定義された文法規則に従って解析し、抽象構文木（AST）を生成します。
-   `peg$parsestart`, `peg$parsenote` (src/grammar.js):
    -   **役割**: MMLパーサー内で特定の文法ルール（例: MML全体の開始、単一の音符）を解析する関数です。
    -   **機能**: `start`ルール（MML全体の開始点）や`note`ルール（単一の音符）など、MML文法の特定の要素を解析します。
-   `catch` (dev-setup/setup.js):
    -   **役割**: スクリプト実行中のエラーを捕捉し処理する関数です。
    -   **機能**: 発生した例外を捕捉し、適切なエラーメッセージを表示したり、処理を継続したりします。
-   `escapeHtml` (generated-docs/callgraph.js):
    -   **役割**: HTML特殊文字をエスケープする関数です。
    -   **機能**: コールグラフ表示において、テキストがHTMLとして解釈されないように安全な文字列に変換します。
-   `getLayoutConfig` (generated-docs/callgraph.js):
    -   **役割**: コールグラフの表示レイアウトに関する設定を取得する関数です。
    -   **機能**: コールグラフのノード配置やエッジ描画などの視覚設定情報を読み込みます。
-   `placeCentralNode`, `showNodeInfo`, `showEdgeInfo`, `hideInfoPanel`, `showInfoPanel`, `toggleInfoPanel`, `generateGitHubURL`, `resetLayout`, `watchNodeMovementAndFixOverlapsWrap`, `watchNodeMovementAndFixOverlaps`, `resolveNodeOverlaps`, `switchLayout`, `resetNodeStates`, `fitToContent`, `toggleNodeLabels`, `toggleCalleeLocationFilter` (generated-docs/callgraph.js):
    -   **役割**: これら一連の関数は、生成された関数呼び出しグラフ（コールグラフ）の動的な表示とユーザーインタラクションを管理します。
    -   **機能**: グラフ上のノード（関数）やエッジ（呼び出し関係）の表示、詳細情報の表示・非表示、レイアウトのリセット、ノードの重なり解決、ラベルの切り替え、GitHubへのリンク生成など、ユーザーがグラフを探索しやすくするための多様な機能を提供します。
-   `hex`, `unicodeEscape`, `literalEscape`, `classEscape`, `describeExpectation`, `describeExpected`, `describeFound`, `peg$f0`, `text`, `offset`, `range`, `location`, `expected`, `error`, `peg$getUnicode`, `peg$literalExpectation`, `peg$classExpectation`, `peg$anyExpectation`, `peg$endExpectation`, `peg$otherExpectation`, `peg$computePosDetails`, `peg$computeLocation`, `peg$fail`, `peg$buildSimpleError`, `peg$buildStructuredError`, `peg$throw` (src/grammar.js):
    -   **役割**: これら多数の関数は、Peggyによって自動生成されたMMLパーサーの内部ヘルパー関数およびエラー処理関連の関数です。
    -   **機能**: MML文法の解析プロセス中に、文字の読み取り、位置情報の追跡、期待値の記述、エラーの構築・報告など、パーサーの低レベルな操作を支援します。これらは通常、プロジェクトの利用者が直接呼び出すことはありません。

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

---
Generated at: 2025-11-10 07:05:40 JST
