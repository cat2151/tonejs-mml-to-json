Last updated: 2025-09-27

# Development Status

## 現在のIssues
- GitHub Actionsの共通ワークフロー化が進行中であり、特に「関数コールグラフhtmlビジュアライズ生成」の共通ワークフロー化が残っています。[Issue #16](../issue-notes/16.md)
- 開発体験の向上を目指し、`pnpm script watch`をPEGファイル更新時の自動ビルド・テスト・ブラウザリロードに対応させ、さらにVSCode起動時に自動実行させる改善が課題です。[Issue #8](../issue-notes/8.md), [Issue #9](../issue-notes/9.md)
- MMLからJSONへの変換ロジックをTDDで再実装するため、「mml2jsonのTDD用テストケース生成」、「mml2astのTDD準備」、「ast2jsonのTDD準備」が優先されており、特に初期テストケースの作成が重要視されています。[Issue #5](../issue-notes/5.md), [Issue #6](../issue-notes/6.md), [Issue #7](../issue-notes/7.md)

## 次の一手候補
1.  GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する [Issue #16](../issue-notes/16.md)
    -   最初の小さな一歩: `github-actions`リポジトリにある`call-callgraph.yml`を参考に、現在の`.github/workflows/callgraph_enhanced.yml`を、共通ワークフローを呼び出す形に修正し、既存のCallgraph機能を維持しつつ外部化されたアクションを利用するように変更します。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `.github/workflows/callgraph_enhanced.yml`と`.github/actions-tmp/.github/workflows/call-callgraph.yml`

        実行内容: `.github/workflows/callgraph_enhanced.yml`を、外部の共通ワークフロー`cat2151/github-actions/.github/workflows/call-callgraph.yml@main`を呼び出す形式に修正してください。`callgraph_enhanced.yml`の現在の機能を維持しつつ、共通ワークフローへの入力パラメータとして必要な値を渡すように変更してください。参照として、`.github/actions-tmp/.github/workflows/call-callgraph.yml`の内容を分析し、共通ワークフローのinputsに関する理解を深めてください。

        確認事項: 変更前に、`callgraph_enhanced.yml`が現在どのようなイベントでトリガーされ、どのようなステップを実行しているかを確認してください。また、`cat2151/github-actions`リポジトリの`call-callgraph.yml`がどのような`inputs`を受け取るかを考慮し、互換性を保つようにしてください。

        期待する出力: 修正された`.github/workflows/callgraph_enhanced.yml`の内容をMarkdown形式のコードブロックで出力してください。
        ```

2.  pnpm script watchを、「1行コマンド実行したらpage openし、PEGファイルをwatchして、PEG更新時に自動でbuildしてtest」というものにする [Issue #8](../issue-notes/8.md)
    -   最初の小さな一歩: `package.json`の`scripts`セクションに、`pegjs`のコンパイル、`vitest`のwatchモード実行、およびブラウザのホットリロードまたはライブリロードを連携させる新しい`watch`スクリプトを作成します。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `package.json`と`src/grammar.pegjs`

        実行内容: `package.json`の`scripts`セクションを分析し、`pnpm script watch`として機能拡張するための新しいスクリプトを追加してください。このスクリプトは、以下の機能を1行コマンドで実行できるように統合する必要があります：
        1. `src/grammar.pegjs`ファイルの変更を監視し、変更があった場合に自動で`pegjs`をコンパイルして`src/grammar.js`を更新する。
        2. `vitest`をwatchモードで実行し、コード変更時に自動でテストを実行する。
        3. 開発サーバーを起動し、ブラウザのホットリロードまたはライブリロードを可能にする。
        既存の`dev-setup/setup.js`や`mml2abc/chord2mml`プロジェクトの同様のスクリプトを参考に、統合された`watch`スクリプトを提案してください。

        確認事項: `package.json`に既存の`build`や`test`スクリプトがあれば、それらとの整合性を確認してください。また、`src/grammar.pegjs`から`src/grammar.js`へのコンパイルがどのように行われているか（例: `pegjs`コマンドの使用方法）を確認し、新しいスクリプトに組み込む方法を検討してください。

        期待する出力: 修正された`package.json`の`scripts`セクションを含む、完全な`package.json`の内容をMarkdown形式のコードブロックで出力してください。
        ```

3.  mml2json関数を新たにPEGからTDDで実装しなおすため、TDD用テストケースを、今のコードベースからagentに生成させる [Issue #5](../issue-notes/5.md)
    -   最初の小さな一歩: 現在の`src/mml2json.js`の動作を分析し、入力MML文字列とそれに対応する出力JSONオブジェクトのペアを少なくとも5つ抽出し、`test/parser.test.js`に追記できる形式のテストケースとして生成します。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `src/mml2json.js`と`test/parser.test.js`

        実行内容: `src/mml2json.js`を分析し、MML文字列をJSONオブジェクトに変換する現在のロジックに基づいて、TDD用のテストケースを生成してください。具体的には、既存の`mml2json`関数への入力（MML文字列）と、その関数が返す出力（JSONオブジェクト）のペアを少なくとも5つ抽出し、`test/parser.test.js`に追記可能な`test`ブロックの形式で出力してください。これらのテストケースは、TDDの初期段階で"test red"となることを想定しており、後の実装で"test green"にすることを目的とします。

        確認事項: `src/mml2json.js`が現在どのようにMMLをパースし、どのような構造のJSONを生成しているか正確に把握してください。また、`test/parser.test.js`の既存のテスト形式（`describe`, `test`, `expect`の使用方法）に合わせてください。

        期待する出力: `test/parser.test.js`に追加するための、生成されたテストケースを含むMarkdown形式のコードブロックで出力してください。

---
Generated at: 2025-09-27 07:05:37 JST
