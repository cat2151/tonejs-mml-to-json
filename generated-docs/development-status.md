Last updated: 2025-10-08

# Development Status

## 現在のIssues
- [Issue #9](../issue-notes/9.md): VSCodeでプロジェクトを開いた際に`pnpm watch`を自動実行する設定を導入し、開発環境の手間を削減する。
- [Issue #8](../issue-notes/8.md): `pnpm script watch`を改善し、PEGファイル更新時に自動ビルド、自動テスト、およびブラウザのホットリロードを統合する効率的なTDDサイクルを構築する。
- [Issue #7](../issue-notes/7.md): `mml2ast`のTDDが前提として進んでいる中で、`ast2json`変換のためのTDD準備に着手し、`mml2json`のテストケースを活用してテストを記述する。

## 次の一手候補
1. [Issue #5](../issue-notes/5.md): mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる
   - 最初の小さな一歩: 現在の`src/main.js`と`src/mml2json.js`の実行結果から、MML入力とJSON出力のペアを抽出し、Vitest形式の`str to object`テストケースの骨子を作成する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/mml2json.js`, `src/main.js`, `test/parser.test.js`

     実行内容: `src/main.js`の現在の実行結果（MML入力とそれに対応するJSON出力）を分析し、新しい`mml2json`関数のためのTDDテストケースを、`str to object`形式で生成してください。具体的には、`test/parser.test.js`の既存のテスト構造を参考に、`mml2json`の`it`ブロックと`expect`文を含むテストファイルを`test/mml2json.test.js`として作成してください。テストケースは最低3つ生成し、それぞれMML文字列と期待されるJSONオブジェクトを含めてください。

     確認事項: 既存の`test/parser.test.js`のテスト形式と、`package.json`の`scripts`セクションに定義されているテストコマンド（`vitest`）の構成を確認してください。生成されるJSON構造は、`tonejs-json-sequencer`が受け入れ可能な形式であることを考慮してください。

     期待する出力: `test/mml2json.test.js`という新しいファイルと、その内容をMarkdownコードブロックで示してください。ファイルの内容は、Vitestで実行可能な`str to object`形式のテストケースを複数含んでいるものとします。
     ```

2. [Issue #6](../issue-notes/6.md): mml2astのTDD準備をする
   - 最初の小さな一歩: MMLの各要素がASTノードにどのように変換されるかの仮のAST仕様を検討し、簡単なMML入力（例: `"c8"`）に対する期待されるAST出力のJSON構造を定義する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/grammar.pegjs`, `src/mml2json.js`, `issue-notes/6.md`

     実行内容: `src/grammar.pegjs`の構文解析ルールと`issue-notes/6.md`に記載されている「mml2ast」への分割意図を分析し、MML文字列`"c8"`がパースされた際の仮のAST構造をJSON形式で定義してください。その後、この仮AST構造をテストするためのTDDテストケースを`test/mml2ast.test.js`として生成してください。テストは`"c8"`入力に対して定義したASTを返すことを期待する形式にしてください。

     確認事項: `PEG.js`の出力がどのような中間形式になるかを考慮し、その中間形式からASTを生成する`mml2ast`の責務範囲を明確にしてください。既存のテストファイル(`test/parser.test.js`など)の構成を参考にしてください。

     期待する出力: `test/mml2ast.test.js`という新しいファイルの内容と、`"c8"`のMMLが変換される期待ASTのJSON構造をMarkdownコードブロックで示してください。
     ```

3. [Issue #8](../issue-notes/8.md): pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: `package.json`の`scripts`セクションに、PEGコンパイル、テスト実行、および開発サーバー起動を`concurrently`や`nodemon`を用いて統合する`watch`スクリプトの骨子を作成する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `package.json`, `src/grammar.pegjs`, `test/parser.test.js`, `index.html`

     実行内容: `package.json`の`scripts`セクションを分析し、`src/grammar.pegjs`の変更を監視して自動で`src/grammar.js`を再生成し、その後`vitest`によるテストを自動実行し、さらにブラウザで`index.html`を自動的に開いてライブリロードを可能にする`pnpm watch`スクリプトを提案してください。`concurrently`や`nodemon`などのツール利用を検討してください。

     確認事項: 既存の`package.json`のスクリプト（例: `build:peg`, `test`）との競合がないことを確認してください。`index.html`のライブリロードには開発サーバー（例: `http-server`や`vite`の開発サーバー機能）が必要になる可能性があります。

     期待する出力: `package.json`の`scripts`セクションに新たに追加または修正される`watch`スクリプトの提案をMarkdownコードブロックで示してください。また、そのスクリプトがどのように動作するかの説明も加えてください。

---
Generated at: 2025-10-08 07:05:43 JST
