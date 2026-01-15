Last updated: 2026-01-16

# Development Status

## 現在のIssues
- [Issue #74](../issue-notes/74.md)と[Issue #73](../issue-notes/73.md)は、既存の手動パーサーを廃止し、Tree-sitterパーサーを導入することが主要な課題です。
- [Issue #72](../issue-notes/72.md)と[Issue #71](../issue-notes/71.md)は、未使用コードや陳腐化したドキュメントを整理し、README.ja.mdに情報を集約してプロジェクトの見通しを良くすることを目指しています。
- また、[Issue #56](../issue-notes/56.md)では主要機能の動作確認が残っており、実装後の品質保証が必要です。

## 次の一手候補
1. [Issue #73](../issue-notes/73.md): Tree-sitter導入のための先行成功リポジトリ調査と実装方針の確立
   - 最初の小さな一歩: `tree-sitter-mml` の `grammar.js` を作成する前に、GitHub上で既存の成功している `tree-sitter` 言語パーサーリポジトリをいくつか調査し、`grammar.js` の記述方法とRust/WASMとの統合パターンを特定する。
   - Agent実行プロンプ:
     ```
     対象ファイル: なし（GitHubリポジトリの調査が主）

     実行内容: GitHubで「tree-sitter」と「grammar.js」をキーワードに検索し、特に言語パーサーとして機能している人気のあるリポジトリを5つ特定してください。それらのリポジトリについて、`grammar.js` の構成、Rust/WASMとの連携方法、およびテスト戦略（もしあれば）を分析し、調査結果をMarkdown形式でまとめてください。

     確認事項: 既存のMML構文（`README.ja.md`に記載）と照らし合わせ、将来の `tree-sitter-mml` の設計に役立つパターンがあるかを確認してください。ハルシネーションを避け、具体的なファイルパスやコード変更の提案は不要です。

     期待する出力: 調査したリポジトリ名とURL、各リポジトリから得られた `grammar.js` 設計、Rust/WASM連携、テスト戦略に関する知見をまとめたMarkdownリスト。
     ```

2. [Issue #72](../issue-notes/72.md): 未使用のソースコードの調査と削除によるコードベースの整理
   - 最初の小さな一歩: プロジェクト内で現在参照されていない、あるいはビルドプロセスに含まれていないソースファイルやスクリプトを特定する。特に、RustとTypeScript両方の実装パスから確認する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/` ディレクトリ内のTypeScriptファイル群、`rust/src/` ディレクトリ内のRustファイル群、および `dist/` ディレクトリ内のファイル。
                   また、`package.json`、`tsconfig.json`、Rustの`Cargo.toml`、およびGitHub Actionsのワークフロー（`.github/workflows/`）も参照します。

     実行内容: `package.json` の `scripts` や `main` / `module` フィールド、`tsconfig.json`、Rustの`Cargo.toml`、およびGitHub Actionsのワークフローで直接参照されていない、未使用のソースコードファイル（`.ts`, `.js`, `.rs`）をリストアップしてください。

     確認事項: 誤って必要なファイルを削除しないよう、複数の参照パス（ビルドスクリプト、テスト、アクション、デモ、外部から呼び出されるAPIエントリーポイントなど）を慎重に確認してください。

     期待する出力: 未使用と判断されたソースコードファイルのパスをMarkdownのリスト形式で出力してください。
     ```

3. [Issue #71](../issue-notes/71.md): 陳腐化したドキュメントの調査、削除、README.ja.mdへの情報集約
   - 最初の小さな一歩: `README.ja.md` 以外の既存のドキュメントファイル (`IMPLEMENTATION_SUMMARY.md`, `LIBRARY_USAGE.md`, `QUICKSTART.md`, `rust/README.md` など) を一覧し、それぞれが `README.ja.md` の内容と重複していないか、または `README.ja.md` に統合可能かを評価する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `README.ja.md`, `IMPLEMENTATION_SUMMARY.md`, `LIBRARY_USAGE.md`, `QUICKSTART.md`, `rust/README.md`, `dev-setup/README.md`, `.github/actions-tmp/README.ja.md` および `docs/` ディレクトリ内のMarkdownファイル。

     実行内容: 上記ファイルの内容を分析し、情報が陳腐化している、あるいは `README.ja.md` の情報と重複しているドキュメントファイルを特定してください。その上で、各ドキュメントの主要な情報が `README.ja.md` に既に含まれているか、または容易に統合できるかを評価し、Markdown形式で報告してください。

     確認事項: `README.ja.md` の「Quick Links」セクションも参照し、リンク先のドキュメントがまだ必要とされているかを考慮してください。ただし、`README.md` は `README.ja.md` から自動生成されるため、分析対象から除外してください。

     期待する出力: 陳腐化または重複が疑われるドキュメントファイルのパスと、そのファイルの内容を `README.ja.md` に統合可能かどうかの簡潔な評価をMarkdownのリスト形式で出力してください。
     ```

---
Generated at: 2026-01-16 07:05:51 JST
