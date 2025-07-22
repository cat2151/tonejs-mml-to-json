Last updated: 2025-07-23

# Development Status

## 現在のIssues
- GitHub Actions関連では、プロジェクト概要生成と関数コールグラフHTMLビジュアライズ生成の共通ワークフロー化が課題としてオープンされています。
- 開発環境においては、`pnpm watch`のVSCode起動時自動実行と、`pnpm script watch`の機能拡張（PEGファイルの監視と自動ビルド・テスト）が挙げられています。
- 主要なMML変換機能の実装に関しては、`mml2ast`と`ast2json`のTDD準備、`mml2json`関数のTDD用テストケース生成、そしてMMLの`c`音符をTone.jsの形式に変換するTDD実装が進行中です。

## 次の一手候補
1. MML変換コアロジックのTDD準備と実装
   - 最初の小さな一歩: [Issue #5](issue-notes/5.md) に基づき、現在の`mml2json`関数の動作を分析し、それを網羅するテストケース（成功ケース、失敗ケース、エッジケースを含む）を生成する。この際、既存のコードから期待される出力形式を抽出し、入力MMLに対するJSON出力を明確に定義するプロンプトをAIに与える。

2. 開発環境の効率化（`pnpm watch`スクリプトの改善）
   - 最初の小さな一歩: [Issue #8](issue-notes/8.md) に基づき、`package.json`の`watch`スクリプトを更新し、PEGファイルの変更を検出して自動的にビルドとテストが実行されるように設定する。まずはシンプルなファイル変更監視とコマンド実行の連携を確立する。

3. GitHub Actionsの共通ワークフロー基盤の整備
   - 最初の小さな一歩: [Issue #18](issue-notes/18.md) と [Issue #16](issue-notes/16.md) を参照し、現在の`project概要生成`と`関数コールグラフhtmlビジュアライズ生成`のGitHub Actionsワークフローを比較分析する。共通化できそうな処理ブロックや、再利用可能な入力・出力パターンを特定し、共通ワークフローの初期設計を行う。

---
Generated at: 2025-07-23 07:03:48 JST
