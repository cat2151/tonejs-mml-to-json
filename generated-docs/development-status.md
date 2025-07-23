Last updated: 2025-07-24

```markdown
# Development Status

## 現在のIssues
- コア機能であるMMLからJSONへの変換（[Issue #3]）をTDDで実装するため、関連する`mml2ast`や`ast2json`のTDD準備（[Issue #6], [Issue #7]）とテストケース生成（[Issue #5]）が進行中です。
- 開発効率を高めるために、`pnpm watch`スクリプトの機能拡張とVSCode起動時の自動実行化（[Issue #8], [Issue #9]）が課題となっています。
- さらに、GitHub Actionsを用いたプロジェクト概要や関数コールグラフ生成の共通ワークフロー化（[Issue #16], [Issue #18]）によるCI/CD環境の整備も進められています。

## 次の一手候補
1. MMLからTone.js JSONへの変換機能のTDDによる実装推進
   - 最初の小さな一歩: [Issue #3]で示されているMML "c"をパースし、Tone.jsが演奏できるJSON形式に変換するための最初のテストケースを定義する。
     - プロンプト: 「MML "c"を`tonejs-json-sequencer`が演奏できる形式に変換する仕様を定義し、そのためのJestテストファイルを作成してください。」

2. 開発効率向上のための`pnpm watch`スクリプトの完成
   - 最初の小さな一歩: [Issue #8]に記載されている、1行コマンドで「ページオープン、PEGファイルのwatch、PEG更新時の自動ビルドとテスト実行」を統合した`pnpm watch`スクリプトの初期実装に着手する。
     - プロンプト: 「`package.json`の`scripts`セクションに、PEGファイルの監視、変更時の自動ビルド、テスト実行、そして指定ポートでのページ自動オープンを統合した`watch`スクリプトを追加してください。」

3. GitHub ActionsによるCI/CDとドキュメント自動生成の共通化
   - 最初の小さな一歩: [Issue #18]「GitHub Actions「project概要生成」を共通ワークフロー化する」に着手し、既存のプロジェクト概要生成ワークフローを再利用可能な共通ワークフローとして抽象化する。
     - プロンプt: 「`.github/workflows`ディレクトリ内に、`project-summary-generator.yml`などの共通ワークフローファイルを定義し、既存のプロジェクト概要生成ロジックをそこに移行してください。」
```

---
Generated at: 2025-07-24 07:04:01 JST
