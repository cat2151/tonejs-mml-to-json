Last updated: 2025-08-07

# Development Status

## 現在のIssues
- GitHub Actionsの「プロジェクト概要」および「関数コールグラフ」生成ワークフローの共通化を進め、開発基盤の整備を行っている。
- `pnpm watch` コマンドの機能拡張（VSCode自動実行、自動ビルド・テスト・ページオープン）や、主要機能であるMMLからJSONへの変換に関するTDD基盤の構築とテストケース生成に取り組んでいる。
- 具体的には、`mml2ast`と`ast2json`のTDD準備、そして最終的な目標であるMMLのTone.js互換JSON形式への変換（`MML c`のサポート）をTDDで実現するための作業が進行中である。

## 次の一手候補
1. pnpm watchコマンドの機能拡張と自動化の継続
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`pnpm script watch` を「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」という目標を達成するために、現在の `package.json` スクリプトと関連ファイルの現状を調査し、改善点を特定する。

2. TDD基盤のセットアップ（`mml2ast`または`ast2json`）
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) (`mml2ast`のTDD準備) または [Issue #7](issue-notes/7.md) (`ast2json`のTDD準備) のいずれかを選び、そのためのテスト環境（例: JestまたはVitest）をプロジェクトに導入し、最小限のテストコードが実行できる状態にする。

3. GitHub Actions共通ワークフロー化の検討開始
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) と [Issue #16](issue-notes/16.md) の内容を確認し、既存のGitHub Actionsワークフロー（例: `project概要生成` や `関数コールグラフhtmlビジュアライズ生成`）がどのように記述されているかを分析し、共通アクションや再利用可能なワークフローを作成するための最初のステップを計画する。

---
Generated at: 2025-08-07 07:04:00 JST
