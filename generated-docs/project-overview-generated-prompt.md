Last updated: 2026-01-11


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
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 ライブラリ利用ガイド | [LIBRARY_USAGE.md](LIBRARY_USAGE.md) |
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# 概要
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- npmパッケージおよびCDN経由で利用可能で、プロジェクトへの統合が簡単です
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

# 使い方

## npmパッケージとして利用

```bash
npm install tonejs-mml-to-json
```

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// WASMモジュールを初期化
await initWasm();

// MMLをJSONに変換
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## CDN経由で利用

```html
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  await initWasm();
  const json = mml2json('o4 l16 e f g+ a');
  console.log(json);
</script>
```

詳細な使い方については [LIBRARY_USAGE.md](LIBRARY_USAGE.md) を参照してください。

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
## Rust実装について
- **Rust + WASM 実装を追加しました**
  - Rustライブラリクレートとして利用可能
  - WASMコンパイルでブラウザでも動作
  - JavaScript実装と100%互換
  - 詳細は [rust/README.md](rust/README.md) を参照

## アーキテクチャ
- **mml2ast**: MML文字列をASTに変換するパーサー
- **ast**: AST（抽象構文木）のデータ構造
- **ast2json**: ASTをTone.js互換JSONに変換

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
    "@types/node": "^25.0.3",
    "http-server": "^14.1.1",
    "peggy": "^5.0.5",
    "tonejs-json-sequencer": "github:cat2151/tonejs-json-sequencer",
    "typescript": "^5.9.3",
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
📄 .nojekyll
📖 CONSOLIDATION.md
📖 IMPLEMENTATION_ISSUE_24.md
📖 IMPLEMENTATION_SUMMARY.md
📖 LIBRARY_USAGE.md
📄 LICENSE
📖 MULTI_TRACK_INVESTIGATION.md
📖 QUICKSTART.md
📖 README.ja.md
📖 README.md
📖 TYPESCRIPT_MIGRATION.md
📄 _config.yml
📁 dev-setup/
  📖 README.md
  📜 setup.js
📁 dist/
  📘 ast2json.d.ts
  📄 ast2json.d.ts.map
  📜 ast2json.js
  📄 ast2json.js.map
  📘 demos.d.ts
  📄 demos.d.ts.map
  📜 demos.js
  📄 demos.js.map
  📘 index.d.ts
  📄 index.d.ts.map
  📜 index.js
  📄 index.js.map
  📁 libs/
    📘 tonejs-json-sequencer.d.ts
    📄 tonejs-json-sequencer.mjs
  📘 main.d.ts
  📄 main.d.ts.map
  📜 main.js
  📄 main.js.map
  📘 mml2ast.d.ts
  📄 mml2ast.d.ts.map
  📜 mml2ast.js
  📄 mml2ast.js.map
  📘 mml2json-wasm.d.ts
  📄 mml2json-wasm.d.ts.map
  📜 mml2json-wasm.js
  📄 mml2json-wasm.js.map
  📘 play.d.ts
  📄 play.d.ts.map
  📜 play.js
  📄 play.js.map
📁 generated-docs/
  🌐 callgraph-enhanced.html
  🌐 callgraph.html
  📜 callgraph.js
  🎨 style.css
🌐 googled947dc864c270e07.html
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
  📖 21.md
  📖 23.md
  📖 24.md
  📖 26.md
  📖 27.md
  📖 28.md
  📖 3.md
  📖 31.md
  📖 33.md
  📖 37.md
  📖 39.md
  📖 4.md
  📖 40.md
  📖 41.md
  📖 45.md
  📖 5.md
  📖 6.md
  📖 7.md
  📖 8.md
  📖 9.md
🌐 library-usage-example.html
📊 package-lock.json
📊 package.json
📁 pkg/
  📄 .npmignore
  📖 README.md
  📊 package.json
  📘 tonejs_mml_to_json.d.ts
  📜 tonejs_mml_to_json.js
  📄 tonejs_mml_to_json_bg.wasm
  📘 tonejs_mml_to_json_bg.wasm.d.ts
📄 pnpm-lock.yaml
📁 rust/
  📄 Cargo.toml
  📖 IMPLEMENTATION.md
  📖 README.md
  📁 examples/
    📄 basic_usage.rs
  📁 src/
    📄 ast.rs
    📄 ast2json.rs
    📄 lib.rs
    📄 mml2ast.rs
📁 scripts/
  📜 copy-libs.js
📁 src/
  📘 ast2json.ts
  📘 demos.ts
  📜 grammar.js
  📝 grammar.pegjs
  🌐 index.html
  📘 index.ts
  📘 main.ts
  📘 mml2ast.ts
  📘 mml2json-wasm.ts
  📜 mml2json.js
  📘 play.ts
📁 test/
  📜 ast2json.test.js
  📄 demo-test.mjs
  📜 integration.test.js
  📜 library-entry.test.js
  📜 mml2ast.test.js
  📜 parser.test.js
  📜 setup.js
  📄 wasm-init-test.mjs
  📄 wasm-integration-test.mjs
  📄 wasm-test.mjs
📊 tsconfig.json
📜 vitest.config.js

## ファイル詳細分析
**dev-setup/setup.js** (146行, 3586バイト)
  - 関数: catch
  - インポート: vitest, ../src/grammar.js, vitest/config

**dist/ast2json.d.ts** (45行, 1527バイト)
  - 関数: ast2json
  - インポート: ./mml2ast

**dist/ast2json.js** (32行, 1191バイト)
  - 関数: ast2json, if
  - インポート: ../pkg/tonejs_mml_to_json.js

**dist/demos.d.ts** (15行, 319バイト)
  - 関数: なし
  - インポート: なし

**dist/demos.js** (22行, 570バイト)
  - 関数: なし
  - インポート: なし

**dist/index.d.ts** (51行, 1984バイト)
  - 関数: initWasm, mml2json, mml2ast, ast2json
  - インポート: ./mml2ast.js, ./ast2json.js

**dist/index.js** (84行, 2548バイト)
  - 関数: initWasm, mml2json, mml2ast, ast2json, if
  - インポート: ../pkg/tonejs_mml_to_json.js, ./mml2ast.js, ./ast2json.js

**dist/libs/tonejs-json-sequencer.d.ts** (47行, 1394バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone

**dist/main.d.ts** (2行, 45バイト)
  - 関数: なし
  - インポート: なし

**dist/main.js** (85行, 2947バイト)
  - 関数: initializeDemoDropdown, if
  - インポート: ./play.js, ./demos.js

**dist/mml2ast.d.ts** (60行, 1738バイト)
  - 関数: mml2ast
  - インポート: なし

**dist/mml2ast.js** (31行, 1138バイト)
  - 関数: mml2ast, if
  - インポート: ../pkg/tonejs_mml_to_json.js

**dist/mml2json-wasm.d.ts** (10行, 304バイト)
  - 関数: initWasm
  - インポート: なし

**dist/mml2json-wasm.js** (35行, 1347バイト)
  - 関数: initWasm, if, function
  - インポート: ../pkg/tonejs_mml_to_json.js

**dist/play.d.ts** (5行, 220バイト)
  - 関数: play
  - インポート: tonejs-json-sequencer

**dist/play.js** (47行, 1698バイト)
  - 関数: toSequenceEvent, play, if, catch
  - インポート: tonejs-json-sequencer

**generated-docs/callgraph-enhanced.html** (778行, 23298バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.html** (639行, 19712バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.js** (527行, 17906バイト)
  - 関数: escapeHtml, getLayoutConfig, placeCentralNode, showNodeInfo, showEdgeInfo, hideInfoPanel, showInfoPanel, toggleInfoPanel, generateGitHubURL, resetLayout, watchNodeMovementAndFixOverlapsWrap, watchNodeMovementAndFixOverlaps, resolveNodeOverlaps, switchLayout, resetNodeStates, fitToContent, toggleNodeLabels, toggleCalleeLocationFilter, replace, switch, function, max, on, if, for, ready, addListener
  - インポート: なし

**generated-docs/style.css** (276行, 5034バイト)
  - 関数: なし
  - インポート: なし

**googled947dc864c270e07.html** (1行, 53バイト)
  - 関数: なし
  - インポート: なし

**index.html** (12行, 266バイト)
  - 関数: なし
  - インポート: なし

**library-usage-example.html** (178行, 5824バイト)
  - 関数: なし
  - インポート: なし

**pkg/tonejs_mml_to_json.d.ts** (54行, 1929バイト)
  - 関数: ast2json_wasm, mml2ast_wasm, mml_to_json_wasm, initSync, __wbg_init
  - インポート: なし

**pkg/tonejs_mml_to_json.js** (248行, 7611バイト)
  - 関数: getStringFromWasm0, getUint8ArrayMemory0, passStringToWasm0, decodeText, ast2json_wasm, mml2ast_wasm, mml_to_json_wasm, __wbg_load, __wbg_get_imports, __wbg_finalize_init, initSync, __wbg_init, if, for, function, catch
  - インポート: なし

**pkg/tonejs_mml_to_json_bg.wasm.d.ts** (12行, 627バイト)
  - 関数: なし
  - インポート: なし

**scripts/copy-libs.js** (19行, 640バイト)
  - 関数: なし
  - インポート: fs, path, url

**src/ast2json.ts** (66行, 1983バイト)
  - 関数: ast2json, if
  - インポート: ../pkg/tonejs_mml_to_json.js, ./mml2ast

**src/demos.ts** (30行, 601バイト)
  - 関数: なし
  - インポート: なし

**src/grammar.js** (414行, 10439バイト)
  - 関数: hex, unicodeEscape, literalEscape, classEscape, describeExpectation, describeExpected, describeFound, peg$parse, peg$f0, text, offset, range, location, expected, error, peg$getUnicode, peg$literalExpectation, peg$classExpectation, peg$anyExpectation, peg$endExpectation, peg$otherExpectation, peg$computePosDetails, peg$computeLocation, peg$fail, peg$buildSimpleError, peg$buildStructuredError, peg$parsestart, peg$parsenote, peg$throw, constructor, format, if, buildMessage, literal, class, any, end, other, for, switch, while
  - インポート: なし

**src/grammar.pegjs** (8行, 108バイト)
  - 関数: start, note
  - インポート: なし

**src/index.html** (25行, 735バイト)
  - 関数: なし
  - インポート: なし

**src/index.ts** (124行, 3037バイト)
  - 関数: initWasm, mml2json, mml2ast, ast2json, if
  - インポート: ../pkg/tonejs_mml_to_json.js, ./mml2ast.js, ./ast2json.js

**src/main.ts** (99行, 2870バイト)
  - 関数: initializeDemoDropdown, if
  - インポート: ./play.js, ./demos.js

**src/mml2ast.ts** (89行, 2016バイト)
  - 関数: mml2ast, if
  - インポート: ../pkg/tonejs_mml_to_json.js

**src/mml2json-wasm.ts** (49行, 1482バイト)
  - 関数: initWasm, if
  - インポート: ../pkg/tonejs_mml_to_json.js

**src/mml2json.js** (157行, 4296バイト)
  - 関数: mml2json, compileMmlToCommands, getMmlCommands, calcAttackToReleaseTicks, repeat, toInt, calcDuration, calcStartTick, increaseStartTick, calcLtick, getNodeId, if, sort, function, switch, for
  - インポート: なし

**src/play.ts** (58行, 1830バイト)
  - 関数: toSequenceEvent, play, if, catch
  - インポート: ./ast2json, tonejs-json-sequencer

**test/ast2json.test.js** (414行, 15527バイト)
  - 関数: なし
  - インポート: vitest, ../src/ast2json

**test/integration.test.js** (347行, 12418バイト)
  - 関数: for, if
  - インポート: vitest, ../src/mml2ast, ../src/ast2json

**test/library-entry.test.js** (59行, 1784バイト)
  - 関数: なし
  - インポート: vitest, ../src/index.js

**test/mml2ast.test.js** (315行, 10172バイト)
  - 関数: なし
  - インポート: vitest, ../src/mml2ast

**test/parser.test.js** (11行, 275バイト)
  - 関数: なし
  - インポート: vitest, ../src/grammar.js

**test/setup.js** (18行, 551バイト)
  - 関数: なし
  - インポート: ../pkg/tonejs_mml_to_json.js, fs, url

**vitest.config.js** (10行, 175バイト)
  - 関数: なし
  - インポート: vitest/config

## 関数呼び出し階層
- if (dist/ast2json.js)
  - ast2json (dist/ast2json.d.ts)
    - on ()
      - function (dist/mml2json-wasm.js)
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
    - ast2json_wasm ()
      - mml2ast_wasm ()
      - mml_to_json_wasm ()
      - initSync ()
      - __wbg_init (pkg/tonejs_mml_to_json.d.ts)
      - getStringFromWasm0 (pkg/tonejs_mml_to_json.js)
      - getUint8ArrayMemory0 ()
      - passStringToWasm0 ()
      - decodeText ()
      - __wbg_load ()
      - __wbg_get_imports ()
      - __wbg_finalize_init ()
      - start ()
    - initWasm (dist/index.d.ts)
      - mml2json ()
      - mml2ast ()
      - catch (dev-setup/setup.js)
      - error ()
  - initializeDemoDropdown (dist/main.js)
    - play ()
      - playSequence ()
      - toSequenceEvent (dist/play.js)
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
- switch (generated-docs/callgraph.js)
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
- note (src/grammar.pegjs)


## プロジェクト構造（ファイル一覧）
.github_automation/callgraph/config/my.json
CONSOLIDATION.md
IMPLEMENTATION_ISSUE_24.md
IMPLEMENTATION_SUMMARY.md
LIBRARY_USAGE.md
MULTI_TRACK_INVESTIGATION.md
QUICKSTART.md
README.ja.md
README.md
TYPESCRIPT_MIGRATION.md
dev-setup/README.md
dev-setup/setup.js
dist/ast2json.d.ts
dist/ast2json.js
dist/demos.d.ts
dist/demos.js
dist/index.d.ts
dist/index.js
dist/libs/tonejs-json-sequencer.d.ts
dist/main.d.ts
dist/main.js
dist/mml2ast.d.ts
dist/mml2ast.js
dist/mml2json-wasm.d.ts
dist/mml2json-wasm.js
dist/play.d.ts
dist/play.js
generated-docs/callgraph-enhanced.html
generated-docs/callgraph.html
generated-docs/callgraph.js
googled947dc864c270e07.html

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-01-11 07:05:09 JST
