Last updated: 2025-09-25

# Development Status

## 現在のIssues
- 現在のMMLパーサー (`mml2json`) のTDD移行のため、既存コードベースからJSON出力テストケースを生成する準備を進めています ([Issue #5](../issue-notes/5.md))。
- 開発効率向上のため、`PEG`ファイル更新時に自動ビルド・テスト・ページオープンを行う`pnpm watch`スクリプトの整備が課題です ([Issue #8](../issue-notes/8.md))。
- GitHub Actionsの共通ワークフロー化が進んでおり、特に`translate`と`callgraph`ワークフローを外部リポジトリから呼び出す形に移行する必要があります ([Issue #16](../issue-notes/16.md))。

## 次の一手候補
1. [Issue #5](../issue-notes/5.md): mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる
   - 最初の小さな一歩: 現在の `src/mml2json.js` のMML文字列からJSONオブジェクトへの変換ロジックを分析し、既存のテストファイル (`test/parser.test.js`) に追記するためのTDDテストケース（入力MMLと期待されるJSON出力）を1つ生成する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/mml2json.js`, `test/parser.test.js`

     実行内容: `src/mml2json.js` の `mml2json` 関数について、以下の点を分析し、`test/parser.test.js` に追記できる形式のTDDテストケース（入力MML文字列と、そのMMLが変換される期待JSONオブジェクト）を1つ生成してください。現在の`test/parser.test.js`の`parser`テストスイートに倣って、`describe`ブロック内に`test`を記述し、`expect(mml2json(inputMML)).toEqual(expectedJSON);`の形式で出力してください。

     確認事項: `src/mml2json.js`が、`mml2json`関数をエクスポートしていることを確認してください。また、生成されるJSONオブジェクトはTone.js Sequencerが解釈可能な形式であることを考慮してください。現在の `test/parser.test.js` の既存テストケースの形式と競合しないことを確認してください。

     期待する出力: markdown形式で、`test/parser.test.js`に直接追加可能な`describe`ブロックと`test`関数を含むJavaScriptコードブロック。
     ```

2. [Issue #8](../issue-notes/8.md): pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: `package.json`の`scripts`セクションに、`src/grammar.pegjs`ファイルの変更を監視し、変更があった場合に`npm run build`と`npm run test`を実行するwatchスクリプトを追加する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `package.json`, `src/grammar.pegjs`, `src/grammar.js`, `test/parser.test.js`

     実行内容: `package.json`の`scripts`セクションに、`peg`ファイルの変更を監視し、自動でビルドとテストを実行する`watch`スクリプトを追加してください。具体的には、`src/grammar.pegjs`ファイルの変更を検知したら、`npm run build`（PEGファイルを`src/grammar.js`にコンパイル）と`npm run test`（`test/parser.test.js`を実行）を連続して実行するスクリプトを記述してください。既存の`build`および`test`スクリプトのコマンドを利用することを想定します。` concurrently ` や ` onchange ` などのツール利用を検討し、提案してください。

     確認事項: 既存の`build`および`test`スクリプトが正しく機能することを確認してください。`src/grammar.pegjs`を監視対象とし、`src/grammar.js`がビルド成果物として生成されることを確認してください。

     期待する出力: `package.json` の `scripts` セクションに追加/変更される内容を記述したmarkdown形式のJSONコードブロック。
     ```

3. [Issue #16](../issue-notes/16.md): GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する (translateワークフローの共通化)
   - 最初の小さな一歩: `translate`ワークフローについて、既存の`.github/workflows/translate-readme.yml`が`github-actions`リポジトリの共通ワークフロー`call-translate-readme.yml`を正しく呼び出すように修正する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/workflows/translate-readme.yml`, `.github/actions-tmp/.github/workflows/call-translate-readme.yml`

     実行内容: `.github/workflows/translate-readme.yml` を編集し、`cat2151/github-actions`リポジトリで定義されている共通ワークフロー `.github/workflows/call-translate-readme.yml` を呼び出すように変更してください。既存の `translate-readme.yml` の内容は削除し、共通ワークフロー (`uses: cat2151/github-actions/.github/workflows/call-translate-readme.yml@main`) を呼び出す形式に書き換えてください。その際、必要な `inputs` および `secrets` は適切に `with` で渡すようにしてください。

     確認事項: 呼び出し元の `translate-readme.yml` が存在するパスと、共通ワークフローのパスが正しいことを確認してください。共通ワークフローに渡すべき `inputs` や `secrets` が不足していないか、また過剰でないかを確認してください。`main`ブランチへの参照が適切であることを確認してください。

     期待する出力: 変更後の `.github/workflows/translate-readme.yml` の内容を記述したmarkdown形式のYAMLコードブロック。

---
Generated at: 2025-09-25 07:05:45 JST
