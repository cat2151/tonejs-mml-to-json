Last updated: 2025-07-29

```markdown
# Development Status

## 現在のIssues
- 開発プロセスの効率化として、GitHub Actionsにおける「project概要生成」([Issue #18](issue-notes/18.md))および「関数コールグラフHTMLビジュアライズ生成」([Issue #16](issue-notes/16.md))の共通ワークフロー化がオープン状態です。
- 開発環境の改善として、VSCode起動時のpnpm watch自動実行([Issue #9](issue-notes/9.md))と、`pnpm script watch`によるPEGファイルの監視、自動ビルド/テスト、ページ自動オープン機能の強化([Issue #8](issue-notes/8.md))が検討されています。
- コア機能開発では、TDDを活用したMMLからTone.jsが演奏可能な形式への変換ロジック（特にMML `c` の変換([Issue #3](issue-notes/3.md)))の実装に向け、`mml2ast` ([Issue #6](issue-notes/6.md))および`ast2json` ([Issue #7](issue-notes/7.md))のTDD準備、さらに既存コードベースからのTDD用テストケース生成([Issue #5](issue-notes/5.md))が進められています。

## 次の一手候補
1. MMLからASTへの変換（mml2ast）のTDD準備を開始する
   - 最初の小さな一歩: `src/parser/mml2ast.ts` に対応するテストファイル `src/parser/mml2ast.test.ts` を作成し、`describe` ブロックと、最も単純なMML入力（例: `c`）に対する期待されるAST構造をコメントで記述した`test`のスケルトンを追加する。

2. 開発環境のpnpm script watchを強化し、ページを自動で開くようにする
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) の「1行コマンド実行したらpage open」を実現するため、`package.json`の`scripts`セクションにある`watch`コマンドに、ブラウザで開発ページを開くコマンド（例: `open http://localhost:XXXX` や `start http://localhost:XXXX`）を追加する。
     ```json
     // package.json (scripts section) 例:
     "watch": "tsc -w & peggy -w src/parser/mml.peggy & browser-sync start --server --files \"**/*\""
     ```
     ※`browser-sync`などのツールを利用して自動リロードも考慮に入れる。

3. GitHub Actions「project概要生成」を共通ワークフロー化する計画を立てる
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) を確認し、既存の`generate-project-summaries.yml`ワークフローの中から、共通化して再利用可能なステップ（例: 特定のスクリプト実行、ファイルのコミットなど）を特定し、`composite action` として実装可能かどうかの初期調査を開始する。
```

---
Generated at: 2025-07-29 07:04:03 JST
