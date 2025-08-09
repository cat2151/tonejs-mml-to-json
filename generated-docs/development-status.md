Last updated: 2025-08-10

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化（プロジェクト概要、関数コールグラフビジュアライズ生成）によるCI/CDの整備が進められています。
- 開発者の生産性向上を目指し、pnpm watchスクリプトの機能拡張とVSCodeでの自動実行が検討されています。
- プロジェクトの中核機能であるMMLからAST、ASTからJSONへの変換ロジックをTDDで再実装するための準備が進められています。

## 次の一手候補
1. pnpm script watchを、「1行コマンドでページオープンとPEGファイル監視・自動ビルド・テスト」を可能にする ([Issue #8](issue-notes/8.md))
   - 最初の小さな一歩: 現在の`package.json`ファイルを開き、`scripts.watch`コマンドの定義を確認し、既存の機能と拡張ポイントを把握する。

2. TDDによりmml2json関数を新たにPEGから実装しなおすためのテストケースを生成する ([Issue #5](issue-notes/5.md))
   - 最初の小さな一歩: 既存の`mml2json`関数のソースコードを読み込み、シンプルなMML入力（例: `c`）に対してどのようなJSONが出力されるべきかを分析し、最初のテストケースの要件を定義する。

3. GitHub Actions「project概要生成」を共通ワークフロー化する ([Issue #18](issue-notes/18.md))
   - 最初の小さな一歩: プロジェクトリポジトリの`.github/workflows/`ディレクトリ内で、現在の「project概要生成」に使用されているワークフローファイル（例: `generate-docs.yml`など）を特定し、その内容を確認する。

---
Generated at: 2025-08-10 07:03:24 JST
