Last updated: 2025-08-24

# Development Status

## 現在のIssues
- プロジェクトの核であるMMLからTone.js形式への変換機能をTDDで再構築する準備を進めています。
- 開発効率向上のため、`pnpm watch`スクリプトの自動化と機能拡張に取り組んでいます。
- GitHub Actionsのワークフローを共通化し、CI/CDの整備を進めています。

## 次の一手候補
1. MMLからTone.js形式への変換機能（MML 'c'）をTDDで実装する
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md)から着手し、「mml2json関数」のTDD用テストケースを現在のコードベースから生成するプロンプトをagentに与える。

2. `pnpm watch`スクリプトの機能拡張とVSCodeでの自動実行設定を行う
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md)の要件を満たすために、`package.json`の`watch`スクリプトを、PEGファイルの変更を監視し、自動でビルドとテストを実行するよう修正する。

3. GitHub ActionsのCI/CDワークフローを共通化・効率化する
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md)に着手し、「project概要生成」ワークフローを再利用可能な共通ワークフローとして抽出し、他のワークフローから呼び出せるようにする。

---
Generated at: 2025-08-24 07:03:35 JST
