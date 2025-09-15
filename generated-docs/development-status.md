Last updated: 2025-09-16

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化として、プロジェクト概要生成と関数コールグラフのHTMLビジュアライズ生成を効率化する計画が進行中です。
- 開発体験向上のため、`pnpm watch` コマンドの機能を拡張し、VSCode起動時の自動実行や、PEGファイルのwatch、自動ビルド・テスト機能を統合することが検討されています。
- 主要機能である `mml2ast` や `ast2json`、`mml2json` のTDDによる実装およびテストケース生成、MML cからTone.js対応JSONへの変換が課題として挙げられています。

## 次の一手候補
1.  `mml2ast` のTDD準備を進める
    - 最初の小さな一歩: `mml2ast` 関数用のテストファイル `test/mml2ast.test.ts` を作成し、基本的なテスト構造（`describe` と `it` ブロックのスケルトン）を準備してください。
2.  `pnpm script watch` の機能拡張に着手する
    - 最初の小さな一歩: `package.json` の `scripts` セクションを確認し、現在の `watch` スクリプトの定義を教えてください。その上で、ページオープン機能を追加するための最初のステップを検討してください。
3.  GitHub Actions「project概要生成」の共通ワークフロー化に着手する
    - 最初の小さな一歩: `.github/workflows` ディレクトリ内の既存のGitHub Actionsワークフローをリストアップし、共通ワークフロー化の候補となるものを特定してください。もし存在しない場合、再利用可能なワークフローを作成するための最初のステップ（例: 新しいYAMLファイルの作成）を検討してください。

---
Generated at: 2025-09-16 07:04:21 JST
