Last updated: 2025-12-02

# Development Status

## 現在のIssues
- MMLパーサーのTDD環境構築のため、[Issue #6](../issue-notes/6.md) mml2ast、[Issue #7](../issue-notes/7.md) ast2jsonの準備、および[Issue #5](../issue-notes/5.md) mml2jsonのテストケース生成が進行中です。
- 開発体験向上のため、[Issue #8](../issue-notes/8.md) PEGファイル更新時に自動ビルド・テスト・ページオープンを行うwatchスクリプトの改善が進められています。
- また、[Issue #9](../issue-notes/9.md) VSCode起動時のwatchスクリプト自動実行の検討と、[Issue #3](../issue-notes/3.md) TDDによるMML "c" からTone.js JSONへの変換実装が課題として残っています。

## 次の一手候補
1. [Issue #5](../issue-notes/5.md): mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる
   - 最初の小さな一歩: 現在の `src/mml2json.js` の `mmlToJson` 関数の入出力例を特定し、それを元に `test/parser.test.js` に `describe('mmlToJson')` ブロックを追加し、既存のMML文字列と生成されるJSONオブジェクトのペアをテストケースとして記述する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/mml2json.js`, `test/parser.test.js`

     実行内容: `src/mml2json.js` 内の `mml2json` 関数（またはそれに相当する現在MMLをJSONに変換している関数）を分析し、最低でも一つの具体的なMML入力文字列とその関数が返すJSON出力オブジェクトを特定してください。その後、`test/parser.test.js` に `describe('mmlToJson', () => { /* ここにテストケース */ });` の形式で新しいテストスイートを追加し、特定した入出力ペアを `test('should convert MML string to JSON object', () => { expect(mml2json(inputMML)).toEqual(expectedJSON); });` の形式でテストケースとして記述してください。

     確認事項: `src/mml2json.js` が現在どのようにMMLをJSONに変換しているかを正確に理解し、テストケースがその現状の変換ロジックを反映していることを確認してください。`test/parser.test.js` の既存テスト構造を尊重してください。

     期待する出力: `test/parser.test.js` に追記された、`mml2json` 関数の入出力ペアに基づく新しいテストケース。テストは最初はREDになることが想定されますが、現在のコードベースからの正しい期待値が設定されていることを確認してください。
     ```

2. [Issue #6](../issue-notes/6.md): mml2astのTDD準備をする
   - 最初の小さな一歩: `src/grammar.pegjs` を分析し、MMLの基本的な構造（例: `c`, `d`, `e` といった音符）をASTに変換するための初期のPEG.jsルールと、それをパースした結果のASTの形式を仮定義する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/grammar.pegjs`, `test/parser.test.js`

     実行内容: `src/grammar.pegjs` を分析し、単一の音符（例: "c"）をパースし、AST（例: `{ type: 'note', value: 'c' }`）を生成するための最小限のPEG.jsルールを提案してください。同時に、`test/parser.test.js` に `describe('mml2ast', () => { /* ここにテストケース */ });` ブロックを追加し、「c」というMML入力に対して期待されるAST構造を検証するテストケースを記述してください。

     確認事項: PEG.jsの文法に適合しているか、そして生成されるASTの構造が将来の `ast2json` の入力として適切であるかを確認してください。現在の `src/grammar.pegjs` の他のルールとの競合がないことを確認してください。

     期待する出力: `src/grammar.pegjs` に追記/修正されたMMLからASTへの変換ルール、および `test/parser.test.js` に追加された `mml2ast` の初期テストケース。
     ```

3. [Issue #8](../issue-notes/8.md): pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: `package.json` の `scripts` セクションに `watch` コマンドを定義し、まず `src/grammar.pegjs` の変更を監視し、変更があった場合に `pegjs` コマンドで `src/grammar.js` を再生成する処理を追加する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `src/grammar.pegjs`, `src/grammar.js`

     実行内容: `package.json` の `scripts` セクションに `watch` コマンドを追加してください。この `watch` コマンドは `chokidar-cli` または類似のツール（プロジェクトにインストールされていなければ提案してください）を使用して `src/grammar.pegjs` ファイルの変更を監視し、変更が検出されたら `pegjs --format commonjs -o src/grammar.js src/grammar.pegjs` コマンドを実行して `src/grammar.js` を再生成するように設定してください。

     確認事項: `pegjs` コマンドが `package.json` の `devDependencies` に追加されていることを確認してください。`chokidar-cli` がインストールされていない場合は、`package.json` の `devDependencies` に追加する提案も行ってください。

     期待する出力: `package.json` の `scripts` セクションに追加された `watch` コマンド定義。このコマンドを実行することで、`src/grammar.pegjs` の変更が監視され、`src/grammar.js` が自動的に更新されることを確認してください。

---
Generated at: 2025-12-02 07:04:52 JST
