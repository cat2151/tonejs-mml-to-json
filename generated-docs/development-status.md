Last updated: 2025-07-18

# Development Status

## 現在のIssues
- MMLからJSONへの変換機能のTDDベースでの再実装と、それに必要なテストケースの自動生成準備を進めています。([Issue #3], [Issue #5], [Issue #6], [Issue #7])
- 開発ワークフローを効率化するため、`pnpm watch` コマンドの機能拡張とVSCode起動時の自動実行を目指しています。([Issue #8], [Issue #9])
- また、GitHub Actionsを利用したコードコールグラフの自動生成と、CI/CD環境の安定化に取り組んでいます。([Issue #10])

## 次の一手候補
1. 開発ワークフローの自動化と効率化の継続
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に着手し、現在の `package.json` の `watch` スクリプトを確認し、`serve` コマンドや `onchange` パッケージの導入について調査する。

2. MML to JSON変換機能のTDD準備を本格化
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に着手し、Agentに与えるプロンプトを具体化し、現在の `mml2json` の仕様と期待される出力を明確にするドキュメントを作成する。

3. GitHub Actionsによるコールグラフ生成の安定化
   - 最初の小さな一歩: [Issue #10](issue-notes/10.md) に着手し、最新のGitHub Actionsの失敗ログを確認し、具体的なエラー箇所と`agent`への指示内容を再検討する。

---
Generated at: 2025-07-18 07:03:48 JST
