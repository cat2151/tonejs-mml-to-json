Last updated: 2025-08-25

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化 ([Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md)) を通じた自動化と効率向上に取り組んでいます。
- 開発ワークフローの改善として、`pnpm watch` の機能拡張とVSCode連携 ([Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md)) を目指しています。
- MMLパーサー（mml2ast, ast2json, mml2json）の中核機能について、TDDによる実装・再実装の準備 ([Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md)) とテストケースの生成 ([Issue #5](issue-notes/5.md), [Issue #3](issue-notes/3.md)) が進行中です。

## 次の一手候補
1. TDDによるMMLパーサーのテストケース生成に着手
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に記載されている通り、現在のコードベースから`agent`を使用してTDD用のテストケースを生成するための準備、または初回のテストケース生成スクリプトの作成に着手する。
     *プロンプト例: `agent-tool create-test-cases --from-mml-code-base ./src/mml-parser`*

2. `pnpm watch` スクリプトの自動化機能拡張
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の内容に沿って、まず`PEGファイルをwatchして、PEG更新時に自動でbuildする`部分を実装する。
     *プロンプト例: `package.json`の`scripts`セクションに`watch`コマンドを追加し、`peggy`などのツールを用いてファイルの変更を監視し、ビルドをトリガーするように設定する*

3. GitHub Actions「project概要生成」共通ワークフローの準備
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、GitHub Actionsの共通ワークフローを配置するディレクトリ (`.github/workflows/shared/`など) を作成し、`project-overview-generator.yml`の初期ファイルを作成する。
     *プロンプト例: `mkdir -p .github/workflows/shared && touch .github/workflows/shared/generate-project-overview.yml`*
```

---
Generated at: 2025-08-25 07:03:40 JST
