Last updated: 2025-08-30

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化、特にproject概要生成と関数コールグラフのビジュアライズについて検討中です。([Issue #18](issue-notes/18.md), [Issue #16](issue-notes/16.md))
- 開発環境の改善として、VSCode起動時のpnpm watch自動実行と、watchスクリプトの機能統合が進行中です。([Issue #9](issue-notes/9.md), [Issue #8](issue-notes/8.md))
- 主要機能であるMML2JSON変換のTDDによる再実装に向け、TDD準備と既存コードからのテストケース自動生成を進めています。([Issue #7](issue-notes/7.md), [Issue #6](issue-notes/6.md), [Issue #5](issue-notes/5.md), [Issue #3](issue-notes/3.md))

## 次の一手候補
1. GitHub Actions「project概要生成」の共通ワークフロー化に着手する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) の詳細を確認し、既存のproject概要生成ワークフローの内容を特定してください。共通化の対象となる主要なステップをリストアップし、汎用的なアクションとして切り出すための要件を定義します。
2. 開発効率向上のため、統合的な`pnpm watch`スクリプトを構築する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に記載されている「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」という目標を達成するために、現在利用可能なツールやスクリプト（例: `npm-run-all`, `nodemon`, `concurrently`など）を調査し、それらをどのように組み合わせるかの初期案を検討します。
3. MML2JSONのTDD再実装の足がかりとして、テストケース自動生成の準備を進める
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、現在の `mml2json` 関数のコードベースを特定します。この既存コードをAgentにインプットとして与え、TDDに必要なテストケース（入力MMLと期待されるJSON出力のペア）を生成させるための具体的なプロンプトのドラフトを作成してください。

---
Generated at: 2025-08-30 07:03:55 JST
