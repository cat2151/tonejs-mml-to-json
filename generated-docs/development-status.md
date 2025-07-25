Last updated: 2025-07-26

# Development Status

## 現在のIssues
- GitHub Actionsにおける`project概要生成`と`関数コールグラフhtmlビジュアライズ生成`のワークフロー共通化が課題となっています。
- 開発効率向上のため、`pnpm watch`の自動実行や、`pnpm script watch`の機能強化（watchと自動ビルド・テスト）が求められています。
- 主要機能であるMMLからJSONへの変換について、TDDによる再実装とその準備（テストケース生成、`mml2ast`・`ast2json`のTDD環境整備）が進められています。

## 次の一手候補
1. TDDにより、MML c を、tonejs-json-sequencerが演奏できる形式に変換する ([Issue #3](issue-notes/3.md))
   - 最初の小さな一歩: `[Issue #5](issue-notes/5.md)` に従い、現在のコードベースから`mml2json`関数のTDD用テストケースを生成する。
2. pnpm script watchを、PEGファイルのwatch、自動build、test、page openを一元化するスクリプトに強化する ([Issue #8](issue-notes/8.md))
   - 最初の小さな一歩: 現在の `package.json` に定義されている `watch` スクリプトの内容を確認し、PEGファイル変更時に自動でビルドが実行されるように設定を調整する。
3. GitHub Actions「project概要生成」を共通ワークフロー化する ([Issue #18](issue-notes/18.md))
   - 最初の小さな一歩: 現在の `project概要生成` に関連するGitHub Actionsワークフローファイル（`.github/workflows/` ディレクトリ内）を特定し、その構造と処理内容を把握する。

---
Generated at: 2025-07-26 07:03:48 JST
