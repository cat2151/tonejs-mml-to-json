Last updated: 2025-09-21

# Development Status

## 現在のIssues
- [Issue #16](../issue-notes/16.md): GitHub Actionsの関数コールグラフhtmlビジュアライズ生成を共通ワークフロー化し、`tonejs-mml-to-json` リポジトリの既存ワークフローを更新する必要があります。
- [Issue #8](../issue-notes/8.md): 開発中のTDDサイクルを効率化するため、`pnpm script watch` をPEGファイルの自動ビルド、自動テスト、ページオープン、ホットリロードに対応させる必要があります。
- [Issue #5](../issue-notes/5.md): `mml2json` 関数の新しいTDD実装に向けて、現在のコードベースから `str to object` 形式のテストケースをAgentに生成させる必要があります。

## 次の一手候補
1. [Issue #16](../issue-notes/16.md) GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する
   - 最初の小さな一歩: `github-actions` リポジトリの `call-callgraph.yml` の内容を参考に、`tonejs-mml-to-json` リポジトリの `.github/workflows/callgraph_enhanced.yml` を共通ワークフロー呼び出し形式に修正する。
   - Agent実行プロンプ:
     ```
     対象ファイル: .github/workflows/callgraph_enhanced.yml、および .github/actions-tmp/.github/workflows/call-callgraph.yml

     実行内容: .github/workflows/callgraph_enhanced.yml を、`github-actions` リポジトリの `call-callgraph.yml` (パスは `.github/actions-tmp/.github/workflows/call-callgraph.yml` として参照可能) を呼び出す共通ワークフロー形式に変換してください。具体的には、`uses` キーワードを使って `cat2151/github-actions/.github/workflows/call-callgraph.yml@main` を参照し、必要な `inputs` を `with` で渡すように修正してください。

     確認事項: `callgraph_enhanced.yml` が現在どのように機能しているか、また `call-callgraph.yml` がどのような `inputs` を期待しているかを確認してください。修正後も既存のCI/CDパイプラインが正しく機能することを確認します。

     期待する出力: 修正された `.github/workflows/callgraph_enhanced.yml` ファイルの内容をMarkdownコードブロックで出力してください。
     ```

2. [Issue #8](../issue-notes/8.md) pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする
   - 最初の小さな一歩: 既存の `mml2abc` や `chord2mml` プロジェクトに、PEGファイルのwatch、自動ビルド、自動テスト、ページオープン、ホットリロードを実現する `pnpm watch` スクリプトが存在するかを調査する。
   - Agent実行プロンプ:
     ```
     対象ファイル: package.json (現在のリポジトリ)

     実行内容: 現在の `package.json` の `scripts` セクションを分析し、既存の `watch` スクリプトの動作を確認してください。また、`mml2abc` と `chord2mml` の `package.json` に含まれる `watch` スクリプトの実装パターン（PEGファイルのwatch、自動ビルド、自動テスト、ページオープン、ホットリロードを実現するための構成）を、一般的な実装方法として仮定し、比較分析してください。

     確認事項: 現在の `package.json` の `scripts` に含まれる `watch` コマンドや関連するビルド・テストコマンドを確認してください。`mml2abc` や `chord2mml` の `package.json` の具体的なパスは提供できないため、一般的なNode.js/pnpmプロジェクトにおけるPEG.jsのコンパイルとVitestのウォッチャー、ライブサーバーの組み合わせ方を考慮して分析します。

     期待する出力: 比較分析の結果として、現在の `package.json` に追加または修正すべき `scripts` の提案をmarkdown形式で出力してください。具体的には、`pegjs` のwatchとビルド、`vitest` のwatchモード、ブラウザのライブリロード（例: `live-server` や `webpack-dev-server` の利用）を組み合わせる方法を含めてください。
     ```

3. [Issue #5](../issue-notes/5.md) mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる
   - 最初の小さな一歩: 既存の `src/main.js` がMMLをJSONに変換する処理をどのように実行しているかを分析し、サンプルMML文字列とそれに対応するJSON出力のペアを特定する。
   - Agent実行プロンプ:
     ```
     対象ファイル: src/main.js, test/parser.test.js, src/mml2json.js

     実行内容: 現在の `mml2json` のコードベース（特に `src/main.js` や `src/mml2json.js`）を分析し、テストケースとして利用可能な入力MML文字列と、それに対応する出力JSONオブジェクトのペアを少なくとも3つ特定してください。これらのペアは、既存の `mml2json` の機能が正しく動作していることを示すものです。

     確認事項: `src/main.js` がどのようにMML文字列をパースし、JSONオブジェクトを生成しているか、その変換ロジックを理解してください。また、既存の `test/parser.test.js` がどのようなテストケースを扱っているかを確認し、`str to object` の形式でのテストケース生成に役立つ情報を収集してください。

     期待する出力: 以下のようなMarkdown形式で、少なくとも3つの入力MMLと期待されるJSON出力のペアを記述してください。出力JSONは、`tonejs-json-sequencer` が演奏できると想定される形式に合わせてください。
     ```markdown
     ### Test Cases for mml2json

     #### Test Case 1
     - Input MML: `cde`
     - Expected JSON Output:
       ```json
       {
         "tracks": [
           {
             "notes": [
               {"pitch": "C4", "duration": "4n"},
               {"pitch": "D4", "duration": "4n"},
               {"pitch": "E4", "duration": "4n"}
             ]
           }
         ]
       }
       ```

     #### Test Case 2
     - Input MML: `o5cde`
     - Expected JSON Output:
       ```json
       {
         "tracks": [
           {
             "notes": [
               {"pitch": "C5", "duration": "4n"},
               {"pitch": "D5", "duration": "4n"},
               {"pitch": "E5", "duration": "4n"}
             ]
           }
         ]
       }
       ```

     #### Test Case 3
     - Input MML: `l8cde`
     - Expected JSON Output:
       ```json
       {
         "tracks": [
           {
             "notes": [
               {"pitch": "C4", "duration": "8n"},
               {"pitch": "D4", "duration": "8n"},
               {"pitch": "E4", "duration": "8n"}
             ]
           }
         ]
       }
       ```
     ```

---
Generated at: 2025-09-21 07:04:41 JST
