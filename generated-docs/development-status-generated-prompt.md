Last updated: 2026-01-16

# 開発状況生成プロンプト（開発者向け）

## 生成するもの：
- 現在openされているissuesを3行で要約する
- 次の一手の候補を3つlistする
- 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く

## 生成しないもの：
- 「今日のissue目標」などuserに提案するもの
  - ハルシネーションの温床なので生成しない
- ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
- プロジェクト構造情報（来訪者向け情報のため、別ファイルで管理）

## 「Agent実行プロンプト」生成ガイドライン：
「Agent実行プロンプト」作成時は以下の要素を必ず含めてください：

### 必須要素
1. **対象ファイル**: 分析/編集する具体的なファイルパス
2. **実行内容**: 具体的な分析や変更内容（「分析してください」ではなく「XXXファイルのYYY機能を分析し、ZZZの観点でmarkdown形式で出力してください」）
3. **確認事項**: 変更前に確認すべき依存関係や制約
4. **期待する出力**: markdown形式での結果や、具体的なファイル変更

### Agent実行プロンプト例

**良い例（上記「必須要素」4項目を含む具体的なプロンプト形式）**:
```
対象ファイル: `.github/workflows/translate-readme.yml`と`.github/workflows/call-translate-readme.yml`

実行内容: 対象ファイルについて、外部プロジェクトから利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
1) 必須入力パラメータ（target-branch等）
2) 必須シークレット（GEMINI_API_KEY）
3) ファイル配置の前提条件（README.ja.mdの存在）
4) 外部プロジェクトでの利用時に必要な追加設定

確認事項: 作業前に既存のworkflowファイルとの依存関係、および他のREADME関連ファイルとの整合性を確認してください。

期待する出力: 外部プロジェクトがこの`call-translate-readme.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
```

**避けるべき例**:
- callgraphについて調べてください
- ワークフローを分析してください
- issue-noteの処理フローを確認してください

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Development Status

## 現在のIssues
[以下の形式で3行でオープン中のissuesを要約。issue番号を必ず書く]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 次の一手候補
1. [候補1のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

2. [候補2のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

3. [候補3のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```
```


# 開発状況情報
- 以下の開発状況情報を参考にしてください。
- Issue番号を記載する際は、必ず [Issue #番号](../issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。

## プロジェクトのファイル一覧
- .editorconfig
- .github/actions-tmp/.github/workflows/call-callgraph.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-rust-windows-check.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-recent-human-commit.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/rust-windows-check.yml
- .github/actions-tmp/.github/workflows/translate-readme.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/callgraph.ql
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/codeql-pack.lock.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/qlpack.yml
- .github/actions-tmp/.github_automation/callgraph/config/example.json
- .github/actions-tmp/.github_automation/callgraph/docs/callgraph.md
- .github/actions-tmp/.github_automation/callgraph/presets/callgraph.js
- .github/actions-tmp/.github_automation/callgraph/presets/style.css
- .github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/callgraph-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-codeql-exists.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
- .github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md
- .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md
- .github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md
- .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/GitUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/generate-project-summary.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/CodeAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectAnalysisOrchestrator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataCollector.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataFormatter.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectOverviewGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/BaseGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/FileSystemUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/ProjectFileUtils.cjs
- .github/actions-tmp/.github_automation/translate/docs/TRANSLATION_SETUP.md
- .github/actions-tmp/.github_automation/translate/scripts/translate-readme.cjs
- .github/actions-tmp/.gitignore
- .github/actions-tmp/.vscode/settings.json
- .github/actions-tmp/LICENSE
- .github/actions-tmp/README.ja.md
- .github/actions-tmp/README.md
- .github/actions-tmp/_config.yml
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview-generated-prompt.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/googled947dc864c270e07.html
- .github/actions-tmp/issue-notes/10.md
- .github/actions-tmp/issue-notes/11.md
- .github/actions-tmp/issue-notes/12.md
- .github/actions-tmp/issue-notes/13.md
- .github/actions-tmp/issue-notes/14.md
- .github/actions-tmp/issue-notes/15.md
- .github/actions-tmp/issue-notes/16.md
- .github/actions-tmp/issue-notes/17.md
- .github/actions-tmp/issue-notes/18.md
- .github/actions-tmp/issue-notes/19.md
- .github/actions-tmp/issue-notes/2.md
- .github/actions-tmp/issue-notes/20.md
- .github/actions-tmp/issue-notes/21.md
- .github/actions-tmp/issue-notes/22.md
- .github/actions-tmp/issue-notes/23.md
- .github/actions-tmp/issue-notes/24.md
- .github/actions-tmp/issue-notes/25.md
- .github/actions-tmp/issue-notes/26.md
- .github/actions-tmp/issue-notes/27.md
- .github/actions-tmp/issue-notes/28.md
- .github/actions-tmp/issue-notes/29.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/30.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/workflows/call-callgraph.yml
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- .github/workflows/deploy-pages.yml
- .github_automation/callgraph/config/my.json
- .gitignore
- .nojekyll
- IMPLEMENTATION_SUMMARY.md
- LIBRARY_USAGE.md
- LICENSE
- QUICKSTART.md
- README.ja.md
- README.md
- _config.yml
- dev-setup/README.md
- dev-setup/setup.js
- dist/ast2json.d.ts
- dist/ast2json.d.ts.map
- dist/ast2json.js
- dist/ast2json.js.map
- dist/demos.d.ts
- dist/demos.d.ts.map
- dist/demos.js
- dist/demos.js.map
- dist/index.d.ts
- dist/index.d.ts.map
- dist/index.js
- dist/index.js.map
- dist/libs/tonejs-json-sequencer.d.ts
- dist/libs/tonejs-json-sequencer.mjs
- dist/main.d.ts
- dist/main.d.ts.map
- dist/main.js
- dist/main.js.map
- dist/mml2ast.d.ts
- dist/mml2ast.d.ts.map
- dist/mml2ast.js
- dist/mml2ast.js.map
- dist/mml2json-wasm.d.ts
- dist/mml2json-wasm.d.ts.map
- dist/mml2json-wasm.js
- dist/mml2json-wasm.js.map
- dist/play.d.ts
- dist/play.d.ts.map
- dist/play.js
- dist/play.js.map
- generated-docs/callgraph-enhanced.html
- generated-docs/callgraph.html
- generated-docs/callgraph.js
- generated-docs/project-overview-generated-prompt.md
- generated-docs/style.css
- googled947dc864c270e07.html
- index.html
- issue-notes/61.md
- issue-notes/63.md
- issue-notes/65.md
- issue-notes/67.md
- issue-notes/69.md
- issue-notes/71.md
- issue-notes/72.md
- issue-notes/73.md
- library-usage-example.html
- package-lock.json
- package.json
- pkg/.npmignore
- pkg/README.md
- pkg/package.json
- pkg/tonejs_mml_to_json.d.ts
- pkg/tonejs_mml_to_json.js
- pkg/tonejs_mml_to_json_bg.wasm
- pkg/tonejs_mml_to_json_bg.wasm.d.ts
- pnpm-lock.yaml
- rust/Cargo.toml
- rust/IMPLEMENTATION.md
- rust/README.md
- rust/build.rs
- rust/examples/basic_usage.rs
- rust/src/ast.rs
- rust/src/ast2json.rs
- rust/src/cst_to_ast.rs
- rust/src/lib.rs
- rust/src/mml2ast.rs
- rust/src/mml2ast_manual.rs
- scripts/copy-libs.js
- src/ast2json.ts
- src/demos.ts
- src/index.html
- src/index.ts
- src/main.ts
- src/mml2ast.ts
- src/mml2json-wasm.ts
- src/play.ts
- test/ast2json.test.js
- test/demo-test.mjs
- test/integration.test.js
- test/library-entry.test.js
- test/mml2ast.test.js
- test/setup.js
- test/wasm-init-test.mjs
- test/wasm-integration-test.mjs
- test/wasm-test.mjs
- tsconfig.json
- vitest.config.js

## 現在のオープンIssues
## [Issue #74](../issue-notes/74.md): Implement Tree-sitter parser with grammar.js as SSOT, remove manual parser
Per issue #73: Implement Tree-sitter parsing with `grammar.js` as the single source of truth for MML syntax. The manual parser implementation was causing hallucinations with coding agents and needed replacement with a proper grammar-based approach.

## Changes

- **Created `tree-sitter-mml/grammar.j...
ラベル: 
--- issue-notes/74.md の内容 ---

```markdown

```

## [Issue #73](../issue-notes/73.md): Tree-sitterを使うよう、直近のTree-sitter成功リポジトリをすべてlistして報告し、それを参照し、実装する
[issue-notes/73.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/73.md)

...
ラベル: 
--- issue-notes/73.md の内容 ---

```markdown
# issue Tree-sitterを使うよう、直近のTree-sitter成功リポジトリをすべてlistして報告し、それを参照し、実装する #73
[issues #73](https://github.com/cat2151/tonejs-mml-to-json/issues/73)



```

## [Issue #72](../issue-notes/72.md): 未使用のソースコードがあるか調査する。未使用のソースコードはすべて削除し、見通しをよくする
[issue-notes/72.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/72.md)

...
ラベル: 
--- issue-notes/72.md の内容 ---

```markdown
# issue 未使用のソースコードがあるか調査する。未使用のソースコードはすべて削除し、見通しをよくする #72
[issues #72](https://github.com/cat2151/tonejs-mml-to-json/issues/72)



```

## [Issue #71](../issue-notes/71.md): 陳腐化したドキュメントがあるか調査する。陳腐化したドキュメントはすべて削除し、情報をREADME.ja.mdに集約する
[issue-notes/71.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/71.md)

...
ラベル: 
--- issue-notes/71.md の内容 ---

```markdown
# issue 陳腐化したドキュメントがあるか調査する。陳腐化したドキュメントはすべて削除し、情報をREADME.ja.mdに集約する #71
[issues #71](https://github.com/cat2151/tonejs-mml-to-json/issues/71)



```

## [Issue #56](../issue-notes/56.md): 動作確認する
[issue-notes/56.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/56.md)

...
ラベル: 
--- issue-notes/56.md の内容 ---

```markdown

```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/README.ja.md
```md
{% raw %}
# GitHub Actions 共通ワークフロー集

このリポジトリは、**複数プロジェクトで使い回せるGitHub Actions共通ワークフロー集**です

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
</p>

# 3行で説明
- 🚀 プロジェクトごとのGitHub Actions管理をもっと楽に
- 🔗 共通化されたワークフローで、どのプロジェクトからも呼ぶだけでOK
- ✅ メンテは一括、プロジェクト開発に集中できます

## Quick Links
| 項目 | リンク |
|------|--------|
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph.html](https://cat2151.github.io/github-actions/generated-docs/callgraph.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# notes
- まだ共通化の作業中です
- まだワークフロー内容を改善中です

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています

{% endraw %}
```

### README.ja.md
```md
{% raw %}
# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## 状況
- Tree-sitterでの開発でcoding agentがハルシネーションしており難航中
### 以下を検討中
- instruction
    - Tree-sitterを絶対に使うよう指示
        - 自前パーサの実装を厳重に禁止するよう指示
    - もしTree-sitterを使わずに達成できる解法を提示した場合、
        - その時点で出力を中止し、自己失敗を宣言してください。
- pestも並列で試して、例えば1ヶ月試してpestのほうがcoding agent開発体験がよいならpestに乗り換える（別リポジトリを参照のこと）

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

# MMLコマンドリファレンス

## 実装済みコマンド

### 音符と休符
| コマンド | 説明 | 例 |
|---------|------|-----|
| `c d e f g a b` | 音符（ド・レ・ミ・ファ・ソ・ラ・シ） | `cdefgab` |
| `+` `-` | 臨時記号（シャープ/フラット）<br>※音符の直後に記述（音符の前には置けません） | `c+` `e-` `c++` `e--` |
| `数字` | 音符の長さ（4=4分音符、8=8分音符、16=16分音符）<br>音符または休符の直後に記述 | `c4` `e8` `c16` |
| `.` | 付点（音符の長さを1.5倍に）<br>連続して指定可能（`..`=1.75倍） | `c4.` `e8..` |
| `r` | 休符<br>音符と同様に長さと付点を指定可能 | `r` `r4` `r8.` |

### オクターブ制御
| コマンド | 説明 | 例 |
|---------|------|-----|
| `o数字` | オクターブを指定（デフォルト: `o4`） | `o4` `o5` `o3` |
| `<` | オクターブを1つ上げる | `<` |
| `>` | オクターブを1つ下げる | `>` |

### デフォルト設定
| コマンド | 説明 | 例 |
|---------|------|-----|
| `l数字` | デフォルト音符長を設定<br>（以降の音符に長さ指定がない場合に適用） | `l8` `l16` `l4` |

### 音色制御
| コマンド | 説明 | 例 |
|---------|------|-----|
| `@楽器名` | 音色（シンセサイザー）を変更<br>Tone.jsのシンセクラス名を使用<br>（詳細は下記の「音色仕様について」を参照） | `@Synth` `@FMSynth` `@AMSynth` |

### マルチトラック
| コマンド | 説明 | 例 |
|---------|------|-----|
| `;` | トラック区切り<br>複数パートを同時演奏 | `cde;efg;abc` |

### 和音
| コマンド | 説明 | 例 |
|---------|------|-----|
| `'音符'` | 和音（シングルクォートで囲まれた音符が同時に演奏される）<br>臨時記号、長さ、付点を指定可能<br>※長さは最初の音符の後ろ（クォート内）、付点はクォート外 | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### 使用例
```mml
// 基本的な音階
o4 l16 cdefgab

// 臨時記号付き音階
o4 l16 c c+ d d+ e f f+ g g+ a a+ b

// 付点音符とリズム
o4 l8 c4. d e8. f16 g4

// オクターブ変更
o4 c d e < f g a > b < c

// マルチトラック（別々のパート）
o4 l8 ceg;dfb;ace

// 和音（同時に演奏される音符）
o4 l4 'ceg' 'dfb' 'ace'

// 単音と和音の混在
o4 c 'eg' d 'fac' e

// 臨時記号と長さを含む和音
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// 楽器変更（音色）
@Synth cde @FMSynth efg @AMSynth abc

// 異なる楽器タイプ
@FMSynth o4 l8 cdefgab>c  // FMSynth - エレピの音
@MonoSynth o3 l8 ccccdddd    // MonoSynth - ベース音
@PluckSynth o4 l8 cdefgab     // PluckSynth - ギターの音

// 1トラック内での楽器切り替え
@Synth o4 cde @FMSynth fga @AMSynth b>c
```

## 未実装コマンド（将来実装予定）

以下のコマンドは、標準的なMMLでよく使用されるコマンドですが、本ライブラリではまだ実装されていません。将来のバージョンで実装される可能性があります。

| コマンド | 説明 | 標準的な例 |
|---------|------|-----------|
| `t` `T` | テンポ設定（BPM） | `t120` `T140` |
| `v` `V` | 音量設定（0-127） | `v100` `V80` |
| `&` `^` | タイ（同じ音高の音符を結合） | `c4&c4` `c4^c4` |
| `q` `Q` | ゲートタイム（音符の長さの割合、スタッカート制御） | `q60` `Q80` |
| `p` `P` | パン（定位）設定 | `p64` `P0` |
| `u` `U` | ベロシティ（アタック強度） | `u120` |
| `[` `]` | ループ（繰り返し） | `[cde]4` |

**⚠️ 重要な注意事項**: 
- これらのコマンドの実装時期や仕様は未定です
- 実装される場合、仕様が変更される可能性があります
- プロトタイピング段階では破壊的変更が頻繁に発生する可能性があります

## 和音実装について

和音はTone.jsの`PolySynth`を使用して実装されており、複数のシンセサイザーボイスを管理して音符を同時に演奏します。

### 技術詳細

- **構文**: シングルクォートで囲まれた音符（例: `'ceg'`）が和音として扱われます
- **PolySynth**: 和音を含むトラックは自動的に通常の`Synth`ではなく`PolySynth`を使用します
- **機能**:
  - 和音内での臨時記号のサポート: `'c+eg-'` = C# E Gb
  - 長さと付点のサポート: `'c4eg'.` = 付点4分音符のC-E-G和音（長さはクォート内、付点はクォート外）
  - オクターブコマンドとの連携: `o5 'ceg'` = C5-E5-G5和音
  - マルチトラックとの互換性: 一部のトラックで和音を使用し、他のトラックでは使用しないことが可能
- **マルチトラックとの違い**:
  - マルチトラック（`;`）: 異なるメロディー/パートを同時に演奏する別々のトラック
  - 和音（`'...'`）: 完全に同じタイミングで一緒に演奏される複数の音符

### 比較例

```mml
// マルチトラック: C、E、Gが別々のパート（メロディライン）として演奏される
c;e;g

// 和音: C、E、Gが単一の和音として一緒に演奏される
'ceg'
```

## 音色仕様について（`@` コマンド）

現在の `@` コマンドは基本的な音色切り替えを実装していますが、将来的にはTone.jsの多様なシンセサイザータイプに対応する予定です。

### Tone.jsで利用可能なシンセサイザータイプ候補

以下は、将来的に `@` コマンドで指定できる可能性のあるTone.jsシンセサイザータイプです：

| タイプ | 特徴 | 適した音色 |
|--------|------|-----------|
| `Synth` | 基本的な減算合成<br>単一オシレータ + エンベロープ | リード、パッド、基本的な音色 |
| `AMSynth` | 振幅変調合成<br>2つのオシレータで振幅を変調 | ベル、金属的な音、トレモロ効果 |
| `FMSynth` | 周波数変調合成<br>2つのオシレータで周波数を変調 | エレクトリックピアノ、ベル、金属的な音 |
| `MonoSynth` | モノフォニック減算合成<br>フィルターエンベロープ付き | ベース、モノリード、アナログシンセ風 |
| `DuoSynth` | デュアルボイスポリフォニック<br>2つのMonoSynthを組み合わせ | 豊かなテクスチャ、コーラス効果、複雑な音色 |
| `PluckSynth` | カープラス・ストロング法<br>撥弦楽器シミュレーション | ギター、ハープ、琴、撥弦系 |
| `MembraneSynth` | 膜振動シミュレーション | ドラム、打楽器 |
| `MetalSynth` | 金属的な音響シミュレーション | シンバル、金属打楽器 |

### 現在の実装状況

- **現在**: `@` コマンドはTone.jsのクラス名を直接使用します：
  - `@Synth` = 基本減算合成（デフォルト）
  - `@FMSynth` = FM合成（エレクトリックピアノ、ベル）
  - `@AMSynth` = AM合成（ベル、金属的な音）
  - `@MonoSynth` = モノフォニック合成（ベース、リード）
  - `@PluckSynth` = 撥弦楽器（ギター、ハープ）
  - `@MembraneSynth` = ドラム、打楽器
  - `@MetalSynth` = シンバル、金属打楽器
  - `@DuoSynth` = デュアルボイス合成（豊かな音色）
  - `@PolySynth` = ポリフォニック合成
- **注意**: 和音を含むトラックは指定された楽器に関係なく自動的にPolySynthを使用します

### 使用例

```mml
// FMSynthでエレピの音
@FMSynth o4 l8 cdefgab>c

// トラック内で楽器を切り替え
@Synth o4 cde @FMSynth fga @AMSynth b>c

// MonoSynthでベースライン
@MonoSynth o3 l8 c c c c d d d d
```

### 仕様変更の可能性について

⚠️ **重要**: 音色指定機能は現在プロトタイピング段階です

- Tone.jsのデフォルト音色表現を検証するための仮仕様です
- 各バリエーションを簡易的に確認できるよう実装しています
- 仕様は頻繁に破壊的変更される可能性があります
- プロダクション環境で使用する場合は、バージョンを固定することを推奨します
- フィードバックや要望があれば、GitHubのIssueで共有してください

# tonejs-json-sequencer との機能対応状況

このセクションでは、[tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) でサポートされている機能と、本ライブラリ（tonejs-mml-to-json）での対応状況を記載します。

## 調査の目的

tonejs-json-sequencer で表現可能な音楽要素を、本ライブラリのMMLでも表現できるようにすることを目指しています。これにより、MMLから完全な音楽表現への変換が可能になります。

## tonejs-json-sequencer でサポートされているコンポーネント

### 音源（Instrument）- 対応状況

| Tone.js クラス | tonejs-json-sequencer | 本ライブラリ(MML) | 備考 |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ 対応済み | ✅ 対応済み | `@Synth` で実装済み（デフォルト） |
| **MonoSynth** | ✅ 対応済み | ✅ 対応済み | `@MonoSynth` で実装済み（ベース音色） |
| **FMSynth** | ✅ 対応済み | ✅ 対応済み | `@FMSynth` で実装済み（エレピ、ベル） |
| **AMSynth** | ✅ 対応済み | ✅ 対応済み | `@AMSynth` で実装済み（ベル、金属音） |
| **DuoSynth** | ✅ 対応済み | ✅ 対応済み | `@DuoSynth` で実装済み（デュアルボイス） |
| **PluckSynth** | ✅ 対応済み | ✅ 対応済み | `@PluckSynth` で実装済み（撥弦楽器） |
| **MembraneSynth** | ✅ 対応済み | ✅ 対応済み | `@MembraneSynth` で実装済み（ドラム） |
| **MetalSynth** | ✅ 対応済み | ✅ 対応済み | `@MetalSynth` で実装済み（シンバル） |
| **NoiseSynth** | ✅ 対応済み | ⏳ 未対応 | ノイズベース音色 |
| **PolySynth** | ✅ 対応済み | ✅ 対応済み | 和音機能で自動使用 |
| **Sampler** | ✅ 対応済み | ⏳ 未対応 | サンプルベース音源 |

### エフェクト（Effect）- 対応状況

#### 空間系（Spatial）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ 対応済み | ⏳ 未対応 | リバーブ効果 |
| **Freeverb** | ✅ 対応済み | ⏳ 未対応 | Freeverbアルゴリズム |
| **JCReverb** | ✅ 対応済み | ⏳ 未対応 | JCReverbアルゴリズム |

#### モジュレーション系（Modulation）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ 対応済み | ⏳ 未対応 | コーラス効果 |
| **Phaser** | ✅ 対応済み | ⏳ 未対応 | フェイザー効果 |
| **Tremolo** | ✅ 対応済み | ⏳ 未対応 | トレモロ効果 |
| **Vibrato** | ✅ 対応済み | ⏳ 未対応 | ビブラート効果 |
| **AutoFilter** | ✅ 対応済み | ⏳ 未対応 | オートフィルター |
| **AutoPanner** | ✅ 対応済み | ⏳ 未対応 | オートパンナー |
| **AutoWah** | ✅ 対応済み | ⏳ 未対応 | オートワウ |

#### ディレイ系（Delay）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ 対応済み | ⏳ 未対応 | フィードバックディレイ |
| **PingPongDelay** | ✅ 対応済み | ⏳ 未対応 | ピンポンディレイ |

#### 歪み系（Distortion）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ 対応済み | ⏳ 未対応 | ディストーション |
| **BitCrusher** | ✅ 対応済み | ⏳ 未対応 | ビットクラッシャー |
| **Chebyshev** | ✅ 対応済み | ⏳ 未対応 | チェビシェフ歪み（倍音生成） |

#### ピッチ系（Pitch）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ 対応済み | ⏳ 未対応 | ピッチシフト |
| **FrequencyShifter** | ✅ 対応済み | ⏳ 未対応 | 周波数シフター |

#### ステレオ処理（Stereo）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ 対応済み | ⏳ 未対応 | ステレオワイドナー |

### 奏法・パラメータ制御（Performance）

| 機能 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **ディレイビブラート** | ✅ 対応済み | ⏳ 未対応 | 遅延ビブラート効果 |
| **depth.rampTo** | ✅ 対応済み | ⏳ 未対応 | パラメータの段階的変更 |
| **Panpot変更** | 🚧 計画中 | ⏳ 未対応 | パン（定位）のリアルタイム変更 |
| **Expression変更** | 🚧 計画中 | ⏳ 未対応 | 音量のリアルタイム変更 |
| **LPF変更** | 🚧 計画中 | ⏳ 未対応 | ローパスフィルターのリアルタイム変更 |
| **Portamento** | 🚧 計画中 | ⏳ 未対応 | ポルタメント効果 |

### 音源タイプ（Source）- 今後対応予定

| 音源 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 計画中 | ⏳ 未対応 | SuperSaw音色、分厚いパッド |
| **PulseOscillator** | 🚧 計画中 | ⏳ 未対応 | パルス波（12.5%デューティパルスなど） |

### ダイナミクス・フィルター（Dynamics/Filter）- 今後対応予定

| 機能 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 計画中 | ⏳ 未対応 | コンプレッサー |
| **EQ3** | 🚧 計画中 | ⏳ 未対応 | 3バンドイコライザー |

## 実装の優先順位と計画

### 高優先度（早期実装予定）

1. **音色（Instrument）の拡張**
   - 現在実装済み: `@` コマンドでTone.jsのクラス名を直接指定（`@Synth`, `@FMSynth`, `@AMSynth`など）
   - 将来的な拡張案: 省略形や別名のサポート（例: `@fm` → `@FMSynth`）

2. **基本エフェクト**
   - リバーブ、コーラス、ディレイなどの基本エフェクト
   - MMLコマンド案: `R` (Reverb), `C` (Chorus), `D` (Delay) など

3. **パラメータ制御**
   - 音量（Volume/Expression）: `v` コマンド
   - パン（Panpot）: `p` コマンド
   - フィルター制御: 新規コマンド検討

### 中優先度

1. **高度なエフェクト**
   - Phaser, Tremolo, AutoFilter, AutoWah など
   - ビブラート、ディレイビブラートなどの奏法表現

2. **歪み系エフェクト**
   - Distortion, BitCrusher, Chebyshev

3. **ピッチ系エフェクト**
   - PitchShift, FrequencyShifter

### 低優先度（検討中）

1. **高度な音源**
   - FatOscillator, PulseOscillator などの特殊音源
   - Sampler によるサンプルベース音源

2. **ダイナミクス処理**
   - Compressor, EQ などのマスタリング系

3. **リアルタイムパラメータ変更**
   - パラメータの段階的変更（rampTo）
   - エンベロープ制御

## 実装方針

### 基本方針

1. **既存MML構文との互換性維持**
   - 既存の実装を壊さない
   - 段階的な機能追加

2. **シンプルさの重視**
   - MMLの簡潔さを損なわない
   - 学習コストを最小限に

3. **Tone.jsの機能を最大限活用**
   - tonejs-json-sequencer で実装済みの機能を活用
   - JSON出力フォーマットの拡張で対応

### 実装アプローチ

1. **段階的実装**
   - 高優先度の機能から順次実装
   - 各機能のプロトタイプを作成してフィードバック収集

2. **テスト駆動開発**
   - 各機能に対するテストケースを作成
   - 既存機能の退行テストも実施

3. **ドキュメント更新**
   - 実装完了時にREADMEとサンプルコードを更新
   - 使用例を充実させる

## 参考資料

- [tonejs-json-sequencer リポジトリ](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js コンポーネント JSON対応ロードマップ](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js 公式ドキュメント](https://tonejs.github.io/)

## 更新履歴

- 2026-01-12: tonejs-json-sequencer の調査結果を初版作成

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

{% endraw %}
```

### .github/actions-tmp/issue-notes/2.md
```md
{% raw %}
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #2
[issues #2](https://github.com/cat2151/github-actions/issues/2)


# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-callgraph_enhanced.yml
まずplanしてください
```

# 結果
- indent
    - linter？がindentのエラーを出しているがyml内容は見た感じOK
    - テキストエディタとagentの相性問題と判断する
    - 別のテキストエディタでsaveしなおし、テキストエディタをreload
    - indentのエラーは解消した
- LLMレビュー
    - agent以外の複数のLLMにレビューさせる
    - prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューしてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 共通ワークフロー

# GitHub Actions Reusable Workflow for Call Graph Generation
name: Generate Call Graph

# TODO Windowsネイティブでのtestをしていた名残が残っているので、今後整理していく。今はWSL act でtestしており、Windowsネイティブ環境依存問題が解決した
#  ChatGPTにレビューさせるとそこそこ有用そうな提案が得られたので、今後それをやる予定
#  agentに自己チェックさせる手も、セカンドオピニオンとして選択肢に入れておく

on:
  workflow_call:

jobs:
  check-commits:
    runs-on: ubuntu-latest
    outputs:
      should-run: ${{ steps.check.outputs.should-run }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 50 # 過去のコミットを取得

      - name: Check for user commits in last 24 hours
        id: check
        run: |
          node .github/scripts/callgraph_enhanced/check-commits.cjs

  generate-callgraph:
    needs: check-commits
    if: needs.check-commits.outputs.should-run == 'true'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      security-events: write
      actions: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Remove old CodeQL packages cache
        run: rm -rf ~/.codeql/packages

      - name: Check Node.js version
        run: |
          node .github/scripts/callgraph_enhanced/check-node-version.cjs

      - name: Install CodeQL CLI
        run: |
          wget https://github.com/github/codeql-cli-binaries/releases/download/v2.22.1/codeql-linux64.zip
          unzip codeql-linux64.zip
          sudo mv codeql /opt/codeql
          echo "/opt/codeql" >> $GITHUB_PATH

      - name: Install CodeQL query packs
        run: |
          /opt/codeql/codeql pack install .github/codeql-queries

      - name: Check CodeQL exists
        run: |
          node .github/scripts/callgraph_enhanced/check-codeql-exists.cjs

      - name: Verify CodeQL Configuration
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs verify-config

      - name: Remove existing CodeQL DB (if any)
        run: |
          rm -rf codeql-db

      - name: Perform CodeQL Analysis
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs analyze

      - name: Check CodeQL Analysis Results
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs check-results

      - name: Debug CodeQL execution
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs debug

      - name: Wait for CodeQL results
        run: |
          node -e "setTimeout(()=>{}, 10000)"

      - name: Find and process CodeQL results
        run: |
          node .github/scripts/callgraph_enhanced/find-process-results.cjs

      - name: Generate HTML graph
        run: |
          node .github/scripts/callgraph_enhanced/generate-html-graph.cjs

      - name: Copy files to generated-docs and commit results
        run: |
          node .github/scripts/callgraph_enhanced/copy-commit-results.cjs

--- 呼び出し元
# 呼び出し元ワークフロー: call-callgraph_enhanced.yml
name: Call Call Graph Enhanced

on:
  schedule:
    # 毎日午前5時(JST) = UTC 20:00前日
    - cron: '0 20 * * *'
  workflow_dispatch:

jobs:
  call-callgraph-enhanced:
    # uses: cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
    uses: ./.github/workflows/callgraph_enhanced.yml # ローカルでのテスト用
```

# レビュー結果OKと判断する
- レビュー結果を人力でレビューした形になった

# test
- #4 同様にローカル WSL + act でtestする
- エラー。userのtest設計ミス。
  - scriptの挙動 : src/ がある前提
  - 今回の共通ワークフローのリポジトリ : src/ がない
  - 今回testで実現したいこと
    - 仮のソースでよいので、関数コールグラフを生成させる
  - 対策
    - src/ にダミーを配置する
- test green
  - ただしcommit pushはしてないので、html内容が0件NG、といったケースの検知はできない
  - もしそうなったら別issueとしよう

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする
- もしhtml内容が0件NG、などになったら、別issueとするつもり

{% endraw %}
```

### .github/actions-tmp/issue-notes/3.md
```md
{% raw %}
# issue GitHub Actions「issue note生成」を共通ワークフロー化する #3
[issues #3](https://github.com/cat2151/github-actions/issues/3)

- 前提
  - userは、translateのworkflowを共通ワークフロー化し、動くようにしたので、共通ワークフロー化の知識がある
  - よって、今回は、promptでplanさせ、そのplanをuserがレビューし、planの改善を指示できるので、ハルシネーションのリスクを下げることができる

- prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlはまだ共通ワークフロー化されず、
呼び出し元からコピーされたままの状態です。
このymlファイル名のまま、
中身を共通ワークフロー化してください。
呼び出し元ymlは別途書きますので気にしないでください。
まずplanしてください
```

- plan 生成結果
```
共通ワークフロー化のためのplanは以下の通りです。

1. 目的
現在の issue-note.yml を「共通ワークフロー」として再設計し、他リポジトリや他ワークフローから workflow_call で呼び出せるようにする。
2. 主な変更点
on: トリガーを workflow_call に変更（直接イベントで起動しない）。
必要な入力（inputs）やシークレット（secrets）を workflow_call セクションで定義。
github.event.issue などのイベント依存部分を、inputs経由で受け取る形に修正。
既存の処理（issueノート生成、コミット、issue body更新）はそのまま活かすが、パラメータ化する。
3. 具体的な修正内容
on: issues: → on: workflow_call: に変更。
inputs で必要な値（例: issue_title, issue_number, issue_body, issue_url など）を受け取る。
スクリプト内の ${{ github.event.issue.xxx }} を ${{ inputs.xxx }} に置換。
github-script ステップも同様にinputsを参照。
必要に応じて secrets も workflow_call で受け取れるようにする。
4. ファイル名・配置
ファイル名はそのまま issue-note.yml。
配置場所は workflows でOK（共通ワークフローとしてもこの場所で良い）。
5. 呼び出し元への影響
呼び出し元ワークフローで uses: <repo>/.github/workflows/issue-note.yml@main のように参照し、inputsを渡す形になる。
このplanで進めます。次に、実際の共通ワークフロー化のためのyml修正案を作成しますか？
```

- userがplanレビューし、OKを出した
- agentに生成結果ymlをレビューさせた、OKとなった
  - userはこのレビューは認知負荷が高いのでskipとする（単純な細かい間違い探し作業になるので、それはagentに任せた）
-  エラー。呼び出し元ymlのエラーがあり修正。共通ワークフローのエラー指摘があり、共通ワークフロー側の修正が必要となった
```
原因の分析：

呼び出し元（tonejs-mml-to-jsonのissue-note.yml）は、reusable workflow（cat2151/github-actions/.github/workflows/issue-note.yml@main）をusesで呼び出し、inputsをwithで渡しています。
共通ワークフロー（reusable workflow）は inputs を workflow_call で受け取り、各ステップで ${{ inputs.xxx }} で参照しています。
しかし、エラーが発生したのは actions/github-script@v7 の script 内です。
エラーの本質的な原因：

actions/github-script の script: で ${{ inputs.issue_number }} のような式を直接 JavaScript テンプレートリテラル内で使っていますが、これはサポートされていません。
script: の中は JavaScript であり、YAMLの ${{ ... }} は展開されません（または意図通りに展開されません）。
そのため、inputs 変数は script 内の JavaScript で未定義となり、ReferenceError になります。
正しい書き方：

actions/github-script の script: でワークフローの inputs を使いたい場合は、with: で input を environment 変数や script の引数として渡し、JavaScript で process.env から取得するか、github-script の input 機能を使う必要があります。
例（修正版）：

このように、inputs の値を env で渡し、script 内では process.env で参照してください。

まとめ：

actions/github-script の script 内で ${{ inputs.xxx }} を直接使うと ReferenceError になる
env: で値を渡し、process.env で参照するのが正しい
修正が必要です。修正版のワークフローが必要な場合はお知らせください。
```

- test green
- closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/4.md
```md
{% raw %}
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #4
[issues #4](https://github.com/cat2151/github-actions/issues/4)

# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/daily-project-summary.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-daily-project-summary.yml
まずplanしてください
```

# 結果、あちこちハルシネーションのあるymlが生成された
- agentの挙動があからさまにハルシネーション
    - インデントが修正できない、「失敗した」という
    - 構文誤りを認識できない
- 人力で修正した

# このagentによるセルフレビューが信頼できないため、別のLLMによるセカンドオピニオンを試す
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 呼び出し元

name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

--- 共通ワークフロー
name: Daily Project Summary
on:
  workflow_call:

jobs:
  generate-summary:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      issues: read
      pull-requests: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0  # 履歴を取得するため

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          # 一時的なディレクトリで依存関係をインストール
          mkdir -p /tmp/summary-deps
          cd /tmp/summary-deps
          npm init -y
          npm install @google/generative-ai @octokit/rest
          # generated-docsディレクトリを作成
          mkdir -p $GITHUB_WORKSPACE/generated-docs

      - name: Generate project summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          NODE_PATH: /tmp/summary-deps/node_modules
        run: |
          node .github/scripts/generate-project-summary.cjs

      - name: Check for generated summaries
        id: check_summaries
        run: |
          if [ -f "generated-docs/project-overview.md" ] && [ -f "generated-docs/development-status.md" ]; then
            echo "summaries_generated=true" >> $GITHUB_OUTPUT
          else
            echo "summaries_generated=false" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push summaries
        if: steps.check_summaries.outputs.summaries_generated == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          # package.jsonの変更のみリセット（generated-docsは保持）
          git restore package.json 2>/dev/null || true
          # サマリーファイルのみを追加
          git add generated-docs/project-overview.md
          git add generated-docs/development-status.md
          git commit -m "Update project summaries (overview & development status)"
          git push

      - name: Summary generation result
        run: |
          if [ "${{ steps.check_summaries.outputs.summaries_generated }}" == "true" ]; then
            echo "✅ Project summaries updated successfully"
            echo "📊 Generated: project-overview.md & development-status.md"
          else
            echo "ℹ️ No summaries generated (likely no user commits in the last 24 hours)"
          fi
```

# 上記promptで、2つのLLMにレビューさせ、合格した

# 細部を、先行する2つのymlを参照に手直しした

# ローカルtestをしてからcommitできるとよい。方法を検討する
- ローカルtestのメリット
    - 素早く修正のサイクルをまわせる
    - ムダにgit historyを汚さない
        - これまでの事例：「実装したつもり」「エラー。修正したつもり」「エラー。修正したつもり」...（以降エラー多数）
- 方法
    - ※検討、WSL + act を環境構築済みである。test可能であると判断する
    - 呼び出し元のURLをコメントアウトし、相対パス記述にする
    - ※備考、テスト成功すると結果がcommit pushされる。それでよしとする
- 結果
    - OK
    - secretsを簡略化できるか試した、できなかった、現状のsecrets記述が今わかっている範囲でベストと判断する
    - OK

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする

{% endraw %}
```

### issue-notes/71.md
```md
{% raw %}
# issue 陳腐化したドキュメントがあるか調査する。陳腐化したドキュメントはすべて削除し、情報をREADME.ja.mdに集約する #71
[issues #71](https://github.com/cat2151/tonejs-mml-to-json/issues/71)



{% endraw %}
```

### issue-notes/72.md
```md
{% raw %}
# issue 未使用のソースコードがあるか調査する。未使用のソースコードはすべて削除し、見通しをよくする #72
[issues #72](https://github.com/cat2151/tonejs-mml-to-json/issues/72)



{% endraw %}
```

### issue-notes/73.md
```md
{% raw %}
# issue Tree-sitterを使うよう、直近のTree-sitter成功リポジトリをすべてlistして報告し、それを参照し、実装する #73
[issues #73](https://github.com/cat2151/tonejs-mml-to-json/issues/73)



{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
fd8c28e Add issue note for #73 [auto]
bf759a8 Auto-translate README.ja.md to README.md [auto]
f61568c Update README.ja.md with development status
fcd825d Add issue note for #72 [auto]
396dd38 Add issue note for #71 [auto]
ffb832f Add issue note for #69 [auto]
ce653c8 Update project summaries (overview & development status) [auto]
2e2404d Auto-translate README.ja.md to README.md [auto]
44121ec Merge pull request #68 from cat2151/copilot/add-badge-to-readme-ja
6629a6c Add DeepWiki badge to README.ja.md with .com domain

### 変更されたファイル:
README.ja.md
README.md
generated-docs/development-status-generated-prompt.md
generated-docs/development-status.md
generated-docs/project-overview-generated-prompt.md
generated-docs/project-overview.md
issue-notes/69.md
issue-notes/71.md
issue-notes/72.md
issue-notes/73.md


---
Generated at: 2026-01-16 07:05:29 JST
