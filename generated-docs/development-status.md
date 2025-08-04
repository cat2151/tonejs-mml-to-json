Last updated: 2025-08-05

```markdown
# Development Status

## 現在のIssues
- GitHub Actionsに関して、プロジェクト概要生成と関数コールグラフHTMLビジュアライズのワークフロー共通化が主要なタスクです。
- 開発環境の改善として、`pnpm watch`コマンドのVSCode自動実行と、PEGファイル監視・自動ビルド・テスト機能の統合が挙げられます。
- MMLパーサー（mml2ast, ast2json, mml2json）のTDDによる再実装と、そのためのテストケース生成、およびMMLからtonejs-json-sequencer形式への変換が進行中です。

## 次の一手候補
1. GitHub Actionsの共通ワークフロー化を進める
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) に基づき、`generate-project-summaries`ワークフローを共通化するためのファイル構成と設定を検討し始める。具体的には、`.github/workflows`ディレクトリに共通ワークフローの基盤となるファイルを作成する。

2. 開発環境の`pnpm watch`スクリプトを強化する
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`pnpm watch`スクリプトに、コマンド実行時に自動でブラウザのページを開く機能（例: `open`コマンドの追加）の実装に着手する。

3. MMLパーサーのTDD開発環境を整備する
   - 最初の小さな一歩: [Issue #6](issue-notes/6.md) に基づき、`mml2ast`のTDD準備として、`src/mml2ast`ディレクトリ内にテストファイル（例: `mml2ast.test.ts`）を作成し、基本的なテストスイートの構造を定義する。
```

---
Generated at: 2025-08-05 07:03:46 JST
