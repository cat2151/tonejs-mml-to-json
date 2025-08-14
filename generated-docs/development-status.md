Last updated: 2025-08-15

```markdown
# Development Status

## 現在のIssues
- 現在のオープンなIssueは、主に開発ワークフローの自動化と主要なMML変換機能のTDDベースでの再構築に焦点を当てています。
- 具体的には、GitHub Actionsの共通ワークフロー化 ([Issue #18], [Issue #16]) や、pnpm watchスクリプトの強化 ([Issue #9], [Issue #8]) による開発環境の改善が進行中です。
- また、`mml2ast` ([Issue #6]), `ast2json` ([Issue #7]), `mml2json` ([Issue #5]) のTDD準備を進め、最終的なMMLからTone.js互換JSONへの変換機能 ([Issue #3]) の実装を目指しています。

## 次の一手候補
1. TDDによるMML変換機能の基盤構築
   - 最初の小さな一歩: [Issue #5] に記載されている通り、`mml2json` 関数のTDD用テストケースを、現在のコードベースから自動生成するためのプロンプトを作成します。これは、以降のTDD実装の出発点となります。

2. 開発ワークフローの自動化と効率化
   - 最初の小さな一歩: [Issue #8] に従い、`pnpm script watch` を強化します。具体的には、1行コマンドでページを開き、PEGファイルを監視し、更新時に自動でビルドとテストを実行する機能を実装します。

3. GitHub Actionsの共通ワークフロー化によるCI/CD改善
   - 最初の小さな一歩: [Issue #18] に記載されている「project概要生成」のGitHub Actionsを、再利用可能な共通ワークフローとして抽出し、 `.github/workflows/` ディレクトリ配下に配置する準備を始めます。
```

---
Generated at: 2025-08-15 07:03:35 JST
