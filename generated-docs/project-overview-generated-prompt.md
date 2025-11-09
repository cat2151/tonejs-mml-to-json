Last updated: 2025-11-10


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: tonejs-mml-to-json
説明: # tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Quick Links
| 項目 | リンク |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# 3行で説明
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

# notes
- MML（Music Macro Language）で音楽を書くメリットは？
  - **簡潔性とポータビリティ**: テキストベースで軽量、Webならプラットフォーム非依存
  - **プログラマー親和性**: コードライクな記法、Git管理、生成が容易
  - **Web開発との親和性**: ブラウザで直接再生、リアルタイム編集、軽量配信
  - **学習コストの低さ**: シンプルな文法、段階的学習が可能
  - **モジュラー設計**: 変換と再生が分離され、それぞれを独立して進化可能
  - **エコシステムの土壌になる**: 再利用性が高く、ノウハウを共有、蓄積しやすい
  - **方言への対応力**: 各システム固有のMML方言も、簡易変換なら各位がPEGで作りやすく対応しやすい想定

- なぜ tonejs-json-sequencer と tonejs-mml-to-json は別プロジェクトなの？
  - **開発の独立性とスピードを重視しているため**
    - MMLパーサーの開発に集中できる
    - パーサー機能と演奏機能の依存関係に縛られることなく、素早く進化できる
  - 詳細は [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) もご参照ください

# 検討中メモ
## 入出力定義
- ※例示してイメージを可視化する
- 入力例
  - `o4 l16 e`
- 中間フォーマット例
  - ※薄いレイヤーの疎結合とし、それぞれを変更しやすくする
  - json（AST）
  - json（加工前）
    - 加工とは
      - nodeId採番ほか
- 出力例
  - json（加工後）
    - tonejs-json-sequencerが認識するformat
    - 詳細は割愛、TDDのtest caseをもって詳細とする
## TDD方針
- test対象は、mml2ast、ast2ast、ast2json、のそれぞれである
  - mml2abc / chord2mml のTDDを参照のこと
- このprojectではvitestによるTDDをしていた気がする
  - あとでtest手順を整理するつもり

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています


依存関係:
{
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@octokit/rest": "^22.0.0",
    "dotenv": "^17.2.0"
  },
  "devDependencies": {
    "peggy": "^5.0.5",
    "vitest": "^3.2.4"
  }
}

## ファイル階層ツリー
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

## ファイル詳細分析
**dev-setup/setup.js** (146行, 3586バイト)
  - 関数: catch
  - インポート: vitest, ../src/grammar.js, vitest/config

**generated-docs/callgraph-enhanced.html** (778行, 23298バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.html** (778行, 23298バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.js** (527行, 17906バイト)
  - 関数: escapeHtml, getLayoutConfig, placeCentralNode, showNodeInfo, showEdgeInfo, hideInfoPanel, showInfoPanel, toggleInfoPanel, generateGitHubURL, resetLayout, watchNodeMovementAndFixOverlapsWrap, watchNodeMovementAndFixOverlaps, resolveNodeOverlaps, switchLayout, resetNodeStates, fitToContent, toggleNodeLabels, toggleCalleeLocationFilter, replace, switch, function, max, on, if, for, ready, addListener
  - インポート: なし

**generated-docs/style.css** (276行, 5034バイト)
  - 関数: なし
  - インポート: なし

**index.html** (12行, 266バイト)
  - 関数: なし
  - インポート: なし

**src/grammar.js** (414行, 10439バイト)
  - 関数: hex, unicodeEscape, literalEscape, classEscape, describeExpectation, describeExpected, describeFound, peg$parse, peg$f0, text, offset, range, location, expected, error, peg$getUnicode, peg$literalExpectation, peg$classExpectation, peg$anyExpectation, peg$endExpectation, peg$otherExpectation, peg$computePosDetails, peg$computeLocation, peg$fail, peg$buildSimpleError, peg$buildStructuredError, peg$parsestart, peg$parsenote, peg$throw, constructor, format, if, buildMessage, literal, class, any, end, other, for, switch, while
  - インポート: なし

**src/grammar.pegjs** (8行, 108バイト)
  - 関数: start, note
  - インポート: なし

**src/index.html** (15行, 454バイト)
  - 関数: なし
  - インポート: なし

**src/main.js** (19行, 545バイト)
  - 関数: なし
  - インポート: なし

**src/mml2json.js** (157行, 4296バイト)
  - 関数: mml2json, compileMmlToCommands, getMmlCommands, calcAttackToReleaseTicks, repeat, toInt, calcDuration, calcStartTick, increaseStartTick, calcLtick, getNodeId, if, sort, function, switch, for
  - インポート: なし

**src/play.js** (56行, 1535バイト)
  - 関数: play, sub, catch, switch, if
  - インポート: なし

**test/parser.test.js** (11行, 275バイト)
  - 関数: なし
  - インポート: vitest, ../src/grammar.js

**vitest.config.js** (9行, 138バイト)
  - 関数: なし
  - インポート: vitest/config

## 関数呼び出し階層
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


## プロジェクト構造（ファイル一覧）
.github_automation/callgraph/config/my.json
README.ja.md
README.md
dev-setup/README.md
dev-setup/setup.js
generated-docs/callgraph-enhanced.html
generated-docs/callgraph.html
generated-docs/callgraph.js
generated-docs/style.css
index.html
issue-notes/1.md
issue-notes/10.md
issue-notes/11.md
issue-notes/12.md
issue-notes/13.md
issue-notes/14.md
issue-notes/15.md
issue-notes/16.md
issue-notes/17.md
issue-notes/18.md
issue-notes/2.md
issue-notes/20.md
issue-notes/3.md
issue-notes/4.md
issue-notes/5.md
issue-notes/6.md
issue-notes/7.md
issue-notes/8.md
issue-notes/9.md
package.json

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2025-11-10 07:04:58 JST
