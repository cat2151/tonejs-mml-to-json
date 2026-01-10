Last updated: 2026-01-11

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
- CONSOLIDATION.md
- IMPLEMENTATION_ISSUE_24.md
- IMPLEMENTATION_SUMMARY.md
- LIBRARY_USAGE.md
- LICENSE
- MULTI_TRACK_INVESTIGATION.md
- QUICKSTART.md
- README.ja.md
- README.md
- TYPESCRIPT_MIGRATION.md
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
- issue-notes/1.md
- issue-notes/10.md
- issue-notes/11.md
- issue-notes/12.md
- issue-notes/13.md
- issue-notes/14.md
- issue-notes/15.md
- issue-notes/16.md
- issue-notes/17.md
- issue-notes/18.md
- issue-notes/2.md
- issue-notes/20.md
- issue-notes/21.md
- issue-notes/23.md
- issue-notes/24.md
- issue-notes/26.md
- issue-notes/27.md
- issue-notes/28.md
- issue-notes/3.md
- issue-notes/31.md
- issue-notes/33.md
- issue-notes/37.md
- issue-notes/39.md
- issue-notes/4.md
- issue-notes/40.md
- issue-notes/41.md
- issue-notes/45.md
- issue-notes/5.md
- issue-notes/6.md
- issue-notes/7.md
- issue-notes/8.md
- issue-notes/9.md
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
- rust/examples/basic_usage.rs
- rust/src/ast.rs
- rust/src/ast2json.rs
- rust/src/lib.rs
- rust/src/mml2ast.rs
- scripts/copy-libs.js
- src/ast2json.ts
- src/demos.ts
- src/grammar.js
- src/grammar.pegjs
- src/index.html
- src/index.ts
- src/main.ts
- src/mml2ast.ts
- src/mml2json-wasm.ts
- src/mml2json.js
- src/play.ts
- test/ast2json.test.js
- test/demo-test.mjs
- test/integration.test.js
- test/library-entry.test.js
- test/mml2ast.test.js
- test/parser.test.js
- test/setup.js
- test/wasm-init-test.mjs
- test/wasm-integration-test.mjs
- test/wasm-test.mjs
- tsconfig.json
- vitest.config.js

## 現在のオープンIssues
## [Issue #45](../issue-notes/45.md): 動作確認する
[issue-notes/45.md](https://github.com/cat2151/tonejs-mml-to-json/blob/main/issue-notes/45.md)

...
ラベル: 
--- issue-notes/45.md の内容 ---

```markdown
# issue 動作確認する #45
[issues #45](https://github.com/cat2151/tonejs-mml-to-json/issues/45)



```

## ドキュメントで言及されているファイルの内容
### issue-notes/45.md
```md
{% raw %}
# issue 動作確認する #45
[issues #45](https://github.com/cat2151/tonejs-mml-to-json/issues/45)



{% endraw %}
```

### issue-notes/5.md
```md
{% raw %}
# issue mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる #5
[issues #5](https://github.com/cat2151/tonejs-mml-to-json/issues/5)

- issueの狙い
  - 好奇心、LLMがどれくらいスムーズに動作するか
  - 手でtest case書くより速そう
  - test caseレビューがスムーズそう
    - 想定は、test case 1つのみが正しく生成されること
      - 今のsampleを実行すれば、in/outがすべて得られるので、それを使う
  - agentに生成させたものがミスっていても、test caseの枠組みが生成できていればよい
    - 現在できてるのは str to strのtest caseである
      - str to object のcaseが生成できていればよい
  - test redである想定
  - mml2astのtestは、別途ゼロから検討しなおせばよいので気にしない
  - 小さく始める、agentに全部（mml2ast, ast2json, mml2json）を一度に投げずに、ここまで分解してからやるのを試す

{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
2c7280d Update callgraph.html [auto]
e0b7f13 Add issue note for #45 [auto]
c669850 Merge pull request #44 from cat2151/copilot/remove-custom-player-use-tonejs
b05d03b Fix type safety and cross-platform build compatibility
efe9f38 Replace custom player with tonejs-json-sequencer library
1f8c172 Initial plan
cc234ed Merge pull request #43 from cat2151/copilot/implement-mml-semicolon
fa198d7 Fix node ID collision issue and use stable sort for multi-track
fdc7df2 Address code review feedback: add safety checks and use constants
fca5dc7 Add WASM integration tests for multi-track support

### 変更されたファイル:
dist/demos.d.ts
dist/demos.d.ts.map
dist/demos.js
dist/demos.js.map
dist/libs/tonejs-json-sequencer.d.ts
dist/libs/tonejs-json-sequencer.mjs
dist/main.js
dist/main.js.map
dist/play.d.ts
dist/play.d.ts.map
dist/play.js
dist/play.js.map
generated-docs/callgraph.html
issue-notes/40.md
issue-notes/41.md
issue-notes/45.md
package-lock.json
package.json
pkg/tonejs_mml_to_json_bg.wasm
rust/src/ast.rs
rust/src/ast2json.rs
rust/src/lib.rs
rust/src/mml2ast.rs
scripts/copy-libs.js
src/demos.ts
src/index.html
src/main.ts
src/play.ts
test/ast2json.test.js
test/integration.test.js
test/mml2ast.test.js
test/wasm-integration-test.mjs


---
Generated at: 2026-01-11 07:05:10 JST
