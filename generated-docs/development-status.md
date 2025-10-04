Last updated: 2025-10-05

# Development Status

## 現在のIssues
- [Issue #16](../issue-notes/16.md) でGitHub Actions「コールグラフHTML生成」の共通ワークフロー化がエラー終了しており、ログ可視化と原因特定が必要な状況です。
- 開発環境の効率化として、[Issue #9](../issue-notes/9.md) でVSCode起動時の`pnpm watch`自動実行、[Issue #8](../issue-notes/8.md) で`pnpm watch`の機能強化が検討されています。
- MMLパーサーのTDD準備として、[Issue #5](../issue-notes/5.md) で`mml2json`のテストケース生成、[Issue #6](../issue-notes/6.md) で`mml2ast`のTDD準備が進められています。

## 次の一手候補
1. [Issue #16](../issue-notes/16.md): GitHub Actions「関数コールグラフhtmlビジュアライズ生成」のエラー原因特定
   - 最初の小さな一歩: `tonejs-mml-to-json`リポジトリで発生している最新のコールグラフ生成ワークフロー実行ログ（https://github.com/cat2151/tonejs-mml-to-json/actions/runs/18174089969/job/51735711014 など）を確認し、エラーメッセージとスタックトレースを詳細に把握する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `.github/workflows/call-callgraph.yml` および関連するログファイル（URLで提供）

     実行内容: 提供されたGitHub Actionsの実行ログURLからエラー情報を抽出し、`.github/workflows/call-callgraph.yml`の定義と照らし合わせて、エラーの原因を分析してください。特に、`github-actions`リポジトリ側では動作しているが、`tonejs-mml-to-json`でエラーになっている点に注目してください。

     確認事項: `tonejs-mml-to-json`と`github-actions`リポジトリ間でのworkflow_callのパラメータの渡し方、シークレットの設定、および`checkout`アクションの有無と設定を比較し、相違点がないかを確認してください。

     期待する出力: Markdown形式で、エラーの具体的な原因と、その解決のための具体的な修正案（ファイルパスと修正内容）を提示してください。
     ```

2. [Issue #9](../issue-notes/9.md): VSCode起動時の `pnpm watch` 自動実行設定の調査
   - 最初の小さな一歩: 既存のmml2abcやchord2mmlプロジェクト（もしアクセス可能であれば）の`.vscode`ディレクトリ内にある`tasks.json`や`settings.json`ファイルを調査し、VSCode起動時に特定のコマンドを自動実行する設定例があるかを確認する。
   - Agent実行プロンプ:
     ```
     対象ファイル:
       - `dev-setup/README.md`
       - `package.json`
       - プロジェクト内の既存の`.vscode/`ディレクトリ内のファイル（例: `.vscode/tasks.json`, `.vscode/settings.json`）。もしmml2abcやchord2mmlのプロジェクトファイルパスが分かれば、それらも対象に含める。

     実行内容: `pnpm watch`をVSCode起動時に自動実行するための設定方法について、一般的なVSCodeの設定慣行とこのプロジェクトの既存ファイル構造を考慮し、調査してください。特に、`package.json`の`scripts`セクションとVSCodeの`tasks.json`の関連性に焦点を当てて分析してください。

     確認事項: ハルシネーションを避けるため、既存のVSCode設定ファイルがない場合は、一般的なVSCodeのタスク自動実行のベストプラクティスを基に提案してください。

     期待する出力: Markdown形式で、VSCode起動時に`pnpm watch`を自動実行するための具体的な設定手順と、`tasks.json`に記述すべき内容の例を生成してください。
     ```

3. [Issue #5](../issue-notes/5.md): `mml2json`のTDD用テストケースを既存コードから生成
   - 最初の小さな一歩: `src/mml2json.js`の現在の実装がどのようなMML文字列をJSONに変換しているか、いくつかの具体的なMML入力とそれに対応する現在のJSON出力のペアを特定または作成する。
   - Agent実行プロンプ:
     ```
     対象ファイル: `src/mml2json.js` および `test/parser.test.js`

     実行内容: `src/mml2json.js`の現在の実装を分析し、MML文字列を入力として受け取り、JSONオブジェクトを出力する形式のテストケースを複数生成してください。生成するテストケースは、`test/parser.test.js`のようなVitestのテスト形式に準拠し、`expect(result).toEqual(expectedJson)`の形式で、具体的なMML文字列と、それに対応する期待されるJSONオブジェクトを含めてください。

     確認事項: テストケースは、現在の`mml2json`の挙動を正確に反映するものであること。また、`str to object`形式のテストケースを優先し、既存の`str to str`形式のテストケースとは異なる内容とすること。ハルシネーションにより、`mml2json`関数を勝手に変更するような内容は避けてください。

     期待する出力: Markdown形式で、生成された`mml2json`用のTDDテストケース（Vitest形式のJavaScriptコードブロック）を提示してください。最低3つの異なるMML入力とJSON出力ペアを含むこと。

---
Generated at: 2025-10-05 07:04:45 JST
