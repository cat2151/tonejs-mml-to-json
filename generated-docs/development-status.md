Last updated: 2025-07-17

# Development Status

## 現在のIssues
- MMLからTone.js互換JSONへの変換機能の実装が主要目標であり、複数のIssueがオープンしています。
- そのためのTDD環境の整備と主要関数の準備（[Issue #3](issue-notes/3.md), [Issue #5](issue-notes/5.md), [Issue #6](issue-notes/6.md), [Issue #7](issue-notes/7.md)）を進めています。
- 並行して、GitHub Actionsを用いたコールグラフ自動生成（[Issue #10](issue-notes/10.md)）とローカル開発環境（[Issue #8](issue-notes/8.md), [Issue #9](issue-notes/9.md)）の改善にも取り組んでいます。

## 次の一手候補
1. GitHub Actionsでのコールグラフ生成の安定化
   - 最初の小さな一歩: [Issue #10](issue-notes/10.md)に関連する最近のコミット履歴とGitHub Actionsのログを詳細に分析し、`codeql-action/init`ステップのエラー原因を特定する。特に`qlpack.yml`やワークフロー設定に誤りがないか確認し、修正をコミットしてActionsの再実行を試みる。

2. 開発用`pnpm watch`スクリプトの機能強化と自動化
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md)に基づき、`package.json`の`scripts`に`watch`コマンドの初期バージョンを定義する。まず、PEGファイルの変更を監視して自動でビルドする部分（例: `pegjs --watch`）を実装し、ビルド後に簡単なテストが実行されるように設定を検討する。

3. `mml2json`関数のTDD用テストケースの生成
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md)の準備として、`mml2json`関数のテストケースを生成するための具体的なプロンプトを作成する。プロンプトには、`MML c`のようなシンプルなMML入力例と、それに対応するTone.js互換の期待JSON出力構造を含め、AI AgentがTDDに使えるテストコードを生成できるように明確に指示する。

---
Generated at: 2025-07-17 07:04:04 JST
