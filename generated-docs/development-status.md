Last updated: 2026-01-10

# Development Status

## 現在のIssues
- GitHub Pagesのデモでビルド成果物が見つからず404エラーが発生しており、[Issue #32](../issue-notes/32.md)としてワークフローの最適化が求められています。
- JSON変換がエラーとなる[Issue #31](../issue-notes/31.md)が発生しており、根本原因の特定と修正が必要です。
- 長期的には、TypeScriptとRust WASMで重複する機能の洗い出しと一本化（[Issue #26](../issue-notes/26.md)）およびmjsライブラリとしての利用（[Issue #24](../issue-notes/24.md)）が課題として挙げられています。

## 次の一手候補
1. [Issue #32](../issue-notes/32.md) GitHub Pagesデモの404エラー修正
   - 最初の小さな一歩: `generated-docs`ディレクトリの内容と、TypeScript/WASMのビルド成果物がGitHub Pagesで正しく提供されるように、デプロイワークフローが参照すべきパスを特定する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/workflows/deploy-pages.yml` (存在しない場合は新規作成), `package.json`, `tsconfig.json`

     実行内容: GitHub Pagesのデモで発生している404エラー（`dist/mml2json-wasm.js`, `dist/play.js`, `dist/main.js`が見つからない）を修正するため、GitHub Pagesへのデプロイワークフローを分析・設計してください。具体的には、TypeScriptとRust WASMのビルドステップ、アーティファクトのアップロード、およびGitHub Pagesへのデプロイ設定を最適化し、ビルド成果物のパスがGitHub Pagesの配信パスと整合するように調整してください。

     確認事項: `package.json`および`tsconfig.json`に定義されているビルドコマンドと出力ディレクトリ（`dist`）、GitHub Pagesのデプロイ設定、既存の`.github/workflows`内のデプロイ関連ワークフローとの依存関係、`generated-docs`ディレクトリとの兼ね合い。

     期待する出力: GitHub Pagesデプロイ用のワークフローファイル (`.github/workflows/deploy-pages.yml`など) の変更案、または新規作成案をMarkdown形式で提示してください。
     ```

2. [Issue #31](../issue-notes/31.md) JSON変換エラーの根本原因調査と修正方針の提案
   - 最初の小さな一歩: 最新のコミット履歴（特にTypeScript移行に関する`#30`, `#29`）をレビューし、JSON変換ロジック（`src/mml2ast.ts`, `src/ast2json.ts`など）に影響を与えうる変更点を特定する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/mml2ast.ts`, `src/ast2json.ts`, `src/mml2json-wasm.ts`, `test/mml2ast.test.js`, `test/ast2json.test.js`, `package.json`, `tsconfig.json`

     実行内容: [Issue #31](../issue-notes/31.md)「エラーのためJSON変換ができない」の根本原因を特定するため、最近のTypeScript移行による`mml2ast.ts`や`ast2json.ts`への影響を分析してください。既存のテストがパスするかを確認し、エラーメッセージや挙動から原因を仮説として立て、具体的な修正方針を提案してください。

     確認事項: `package.json`の依存関係、`tsconfig.json`の設定、`test/`ディレクトリ内の既存テストの実行結果、WASMモジュールの利用状況とJS/TSコードとの連携。

     期待する出力: [Issue #31](../issue-notes/31.md)のJSON変換エラーの根本原因に関する分析結果と、その問題を解決するための具体的な修正方針をMarkdown形式で出力してください。可能であれば、エラーの再現手順と期待する修正箇所を特定してください。
     ```

3. [Issue #26](../issue-notes/26.md) TypeScriptとRust WASMの機能重複洗い出しと一本化の検討
   - 最初の小さな一歩: `src/`ディレクトリ内のTypeScriptファイルと`rust/src/`ディレクトリ内のRustファイルを比較し、MMLからASTへの変換（mml2ast）、ASTからJSONへの変換（ast2json）など、機能的に重複している可能性のあるモジュールや関数を概観する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/mml2ast.ts`, `src/ast2json.ts`, `rust/src/mml2ast.rs`, `rust/src/ast2json.rs`, `rust/src/lib.rs` (および関連ファイル)

     実行内容: [Issue #26](../issue-notes/26.md)の目標達成のため、`src/`ディレクトリ内のTypeScriptコードと`rust/src/`ディレクトリ内のRustコードを比較し、機能的に重複している箇所を洗い出してください。特に、MMLからASTへの変換（mml2ast）やASTからJSONへの変換（ast2json）に焦点を当ててください。また、それぞれの実装の現状と、Rust WASMへの一本化の際の技術的課題（データ型変換、パフォーマンス、既存コードへの影響など）について分析してください。

     確認事項: 両言語で実装されている変換ロジックの詳細、インターフェースの互換性、テストカバレッジ、および既存のJavaScript/TypeScript側からのWASM呼び出し箇所。

     期待する出力: 重複機能のリストと、Rust WASMに一本化する際の技術的アプローチ、および具体的なロードマップの初期案をMarkdown形式で提示してください。
     ```

---
Generated at: 2026-01-10 07:05:44 JST
