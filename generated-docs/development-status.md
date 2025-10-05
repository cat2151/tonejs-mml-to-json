Last updated: 2025-10-06

# Development Status

## 現在のIssues
- Callgraph生成の共通ワークフロー`[Issue #16](../issue-notes/16.md)`が、対象ファイル指定の不備（`main.js`のみが対象）によりエラーで終了しており、`mml2json.js`も対象に含める修正が必要です。
- 開発効率向上のため、`pnpm watch`の自動化`[Issue #9](../issue-notes/9.md)`と、PEGファイル更新時に自動ビルド・テスト・ブラウザリロードを行う機能強化`[Issue #8](../issue-notes/8.md)`が検討されています。
- `mml2json`関数のPEGベースでのTDD再実装に向けて、`mml2ast`のTDD準備`[Issue #6](../issue-notes/6.md)`、`ast2json`のTDD準備`[Issue #7](../issue-notes/7.md)`、および既存コードからのTDDテストケース自動生成`[Issue #5](../issue-notes/5.md)`が進められています。

## 次の一手候補
1.  [Issue #16](../issue-notes/16.md): GitHub Actions「関数コールグラフhtmlビジュアライズ生成」の対象ファイル設定を修正
    - 最初の小さな一歩: `.github/actions-tmp/.github_automation/callgraph/config/my.json`に、callgraph生成の対象ソースファイルとして`src/main.js`と`src/mml2json.js`を追記します。
    - Agent実行プロンプ:
      ```
      対象ファイル: .github/actions-tmp/.github_automation/callgraph/config/my.json

      実行内容: Callgraph生成の対象ソースファイルとして、`src/main.js`と`src/mml2json.js`をJSON形式で追加してください。既存の`.github/actions-tmp/.github_automation/callgraph/config/example.json`の内容を参考にしてください。

      確認事項: 変更後のJSONが有効な形式であること。`example.json`の構造（配列形式）と整合していること。

      期待する出力: 更新された`.github/actions-tmp/.github_automation/callgraph/config/my.json`の内容。
      ```

2.  [Issue #8](../issue-notes/8.md): pnpm script watchの機能強化（PEG更新時自動ビルド・テスト・リロード）
    - 最初の小さな一歩: `package.json`内のスクリプト定義と、`src/grammar.pegjs`から`src/grammar.js`を生成する既存のコマンドや仕組みを調査し、PEGファイル変更時に自動ビルド・テストを連動させるための具体的な改善案を分析します。
    - Agent実行プロンプ:
      ```
      対象ファイル: package.json, src/grammar.pegjs, src/grammar.js

      実行内容: 現在の`package.json`内のスクリプト定義と、`src/grammar.pegjs`から`src/grammar.js`を生成する既存のコマンドや仕組みを調査し、現状のwatchスクリプトでPEGファイルを監視して自動ビルド・テスト・リロードを実現するために不足している要素と、次に取るべき具体的なアクションをmarkdown形式で分析してください。特に、PEG.jsをビルドするコマンドと、それをwatchスクリプトに組み込む方法に焦点を当ててください。

      確認事項: 既存の`package.json`内のスクリプト、特に`build`や`test`に関連するスクリプトの内容。PEG.jsのビルドに必要なツール（例: `pegjs`コマンド）がインストールされているか（`package.json`の`devDependencies`を参照）。

      期待する出力: `package.json`内の`scripts`セクションの現状分析と、PEGファイル変更時にビルド、テスト、リロードを自動で行うための`watch`スクリプトの改善案（最初のステップとしてビルドとテストを連動させる部分）をmarkdown形式で出力してください。
      ```

3.  [Issue #5](../issue-notes/5.md): mml2json関数のTDD用テストケース生成
    - 最初の小さな一歩: `src/mml2json.js`内の`mml2json`関数に、MML入力例`"c"`を与えた際のJSON出力結果を取得し、その結果を基に`test/parser.test.js`に新しいテストケースのコードスニペットを作成します。
    - Agent実行プロンプ:
      ```
      対象ファイル: src/mml2json.js, test/parser.test.js

      実行内容: `src/mml2json.js`内の`mml2json`関数について、現在の実装が返すJSONオブジェクト構造を分析してください。その上で、以下のMML入力文字列に対する`mml2json`関数の出力結果をJSON形式で取得し、`test/parser.test.js`に既存のテスト形式に合わせて新しいテストケース（`test.todo`形式でも可）を追記するための具体的なコードスニペットを生成してください。
      MML入力例: `"c"`

      確認事項: `src/mml2json.js`の現在の`mml2json`関数の動作ロジックと、`test/parser.test.js`の既存のテスト構造（`describe`, `test`, `expect`の使用法）を正確に把握すること。

      期待する出力: `test/parser.test.js`に追記する形式の新しいテストケースコードスニペット（MML `"c"`に対する期待されるJSON出力を含む）。

---
Generated at: 2025-10-06 07:05:05 JST
