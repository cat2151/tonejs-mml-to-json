Last updated: 2025-11-10

# Development Status

## 現在のIssues
- [Issue #5](../issue-notes/5.md) では、`mml2json`関数のTDDを再実装するため、現在のコードベースからテストケースをAgentに生成させることを目指しています。
- [Issue #8](../issue-notes/8.md) は、開発サイクルを効率化するため、`pnpm script watch`をPEGファイル更新時の自動ビルド・テスト・ページオープンに対応させることを目標としています。
- [Issue #9](../issue-notes/9.md) では、VSCode起動時に`pnpm watch`が自動で実行されるよう設定を検討しており、開発環境のセットアップを簡素化します。

## 次の一手候補
1. [Issue #5](../issue-notes/5.md): mml2json関数のTDD用テストケースを現在のコードベースから生成する
   - 最初の小さな一歩: 既存の `mml2json.js` の挙動を分析し、MML入力 "c" に対して生成されるJSONオブジェクトを特定し、それをテストケースの期待値として記述します。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/mml2json.js`, `src/main.js`, `test/parser.test.js`

     実行内容: `src/main.js`を通じて`src/mml2json.js`がMML文字列 "c" をTone.js sequencerが演奏できるJSON形式に変換する現在の挙動を分析してください。この分析結果に基づき、`test/parser.test.js`ファイル内の`describe('mml2json', ...)`ブロックに、入力 "c" とそれに対応する期待されるJSON出力を含む新しい`test`ブロックを生成してください。

     確認事項: `src/mml2json.js`が生成するJSON形式が、Tone.js sequencerの期待する形式に合致していることを確認してください。また、生成されるテストケースが`test/parser.test.js`の既存のテスト構造と命名規則に沿っていることを確認してください。

     期待する出力: 新しい`test`ブロックが追加された`test/parser.test.js`ファイルの内容をMarkdownコードブロックで出力してください。
     ```

2. [Issue #8](../issue-notes/8.md): pnpm script watchをPEGファイル変更時の自動ビルド・テストに対応させる
   - 最初の小さな一歩: `package.json`に新しい`watch-peg`スクリプトを追加し、`src/grammar.pegjs`が変更された際に`pegjs`コマンドで`src/grammar.js`をビルドし、その後`vitest`を実行するように設定します。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `src/grammar.pegjs`, `src/grammar.js`, `vitest.config.js`

     実行内容: `package.json`の`scripts`セクションに`watch-peg`という新しいスクリプトを追加してください。このスクリプトは、`src/grammar.pegjs`ファイルの変更を監視し、変更が検出された際に`pegjs`コマンドを用いて`src/grammar.js`を再ビルドし、その後`vitest`を実行する一連の処理を自動で行うようにします。既存の`build`コマンドや`test`コマンドの呼び出し方を参考にしてください。

     確認事項: `pegjs`コマンドが`package.json`の`dependencies`または`devDependencies`に含まれていること、および`vitest`コマンドが正しく機能することを確認してください。新しく追加するスクリプトが、既存のスクリプトと競合しないことを確認してください。

     期待する出力: 新しい`watch-peg`スクリプトが追加された`package.json`の内容をMarkdownコードブロックで出力してください。
     ```

3. [Issue #6](../issue-notes/6.md): mml2astのTDD準備をする
   - 最初の小さな一歩: `src/grammar.pegjs`に、MMLの音符 "c" を基本的なASTノードに変換するための最小限のPEG文法ルールを追加し、同時に新規ファイル`test/mml2ast.test.js`にそのAST変換を検証するテストケースを記述します。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/grammar.pegjs`, `test/mml2ast.test.js` (新規作成)

     実行内容: `src/grammar.pegjs`にMMLの音符 "c" を抽象構文木（AST）に変換するための最小限のPEG文法ルールを追加してください。具体的には、"c" を `{ type: 'note', value: 'c' }` のようなASTノードに変換するルールを定義します。また、`test/mml2ast.test.js`というファイルを新規作成し、MML入力 "c" がこの期待されるAST構造に変換されることを検証するテストケースをVitest形式で記述してください。

     確認事項: 追加するPEG文法ルールが既存の文法と重複しないことを確認してください。生成されるAST構造は、今後の`ast2json`変換を考慮し、拡張性のあるものにしてください。

     期待する出力: 変更された`src/grammar.pegjs`の内容と、新規作成された`test/mml2ast.test.js`ファイルの内容をそれぞれMarkdownコードブロックで出力してください。

---
Generated at: 2025-11-10 07:05:16 JST
