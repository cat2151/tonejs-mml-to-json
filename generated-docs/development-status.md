Last updated: 2025-10-02

# Development Status

## 現在のIssues
- GitHub Actionsのコールグラフ生成共通ワークフロー [Issue #16](../issue-notes/16.md) のテストと、開発体験を向上させるpnpm watch関連設定 [Issue #9](../issue-notes/9.md), [Issue #8](../issue-notes/8.md) に焦点が当たっています。
- MMLからJSONへの変換パス (`mml2ast`, `ast2json`, `mml2json`) のTDD準備を進め、各変換ステップのテストケース生成 [Issue #5](../issue-notes/5.md), [Issue #6](../issue-notes/6.md), [Issue #7](../issue-notes/7.md) が進行中です。
- 最終的な目標であるMML "c" をtonejs-json-sequencerが演奏可能な形式へ変換する機能 [Issue #3](../issue-notes/3.md) のTDD実装に向けた基盤構築が行われています。

## 次の一手候補
1.  GitHub Actions「関数コールグラフhtmlビジュアライズ生成」共通ワークフローのテスト検証とIssueクローズ [Issue #16](../issue-notes/16.md)
    -   最初の小さな一歩: 日次バッチの実行結果ログを確認し、コールグラフが生成されたことを検証する。生成内容に変化がないためにコミットされない場合も、その旨がログで確認できることを確認する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: issue-notes/16.md

        実行内容: GitHub Actionsのコールグラフ生成共通ワークフローのテスト検証結果に基づき、issue-notes/16.md の「状況」セクションを更新し、テストが成功した旨を追記してください。また、タスクが完了したと判断できる場合は、Issueクローズに向けた最終確認内容を追記してください。

        確認事項: ユーザーが手動でログを確認し、コールグラフが期待通りに生成されたか、またはコミットされなかった場合のログが確認できたことを前提とします。

        期待する出力: issue-notes/16.md の更新内容を示すMarkdown形式の差分。
        ```

2.  pnpm script watchの改善（PEGファイルの自動ビルド・テスト・ページリロード） [Issue #8](../issue-notes/8.md)
    -   最初の小さな一歩: `package.json` に `watch` スクリプトのベースを作成し、`src/grammar.pegjs` の変更をトリガーとしてビルドとテストを実行する設定を追加する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: package.json

        実行内容: package.json に新しい `watch` スクリプトを定義してください。このスクリプトは `src/grammar.pegjs` の変更を検知し、`pegjs src/grammar.pegjs -o src/grammar.js` コマンドでPEGファイルをビルドした後、`vitest` を実行するものとします。また、開発サーバーの起動とブラウザの自動オープン、ライブリロード機能も組み込んでください（例: `vite --open` や `concurrently` などを使用して）。

        確認事項: 既存のスクリプトと競合しないこと。PEG.jsのビルドコマンドが正しく動作すること。`vitest` が正しく実行されること。

        期待する出力: package.json に新しい `watch` スクリプトが追加された差分をMarkdown形式で生成してください。
        ```

3.  `mml2json` 関数再実装のためのTDD用テストケース生成 [Issue #5](../issue-notes/5.md)
    -   最初の小さな一歩: `src/main.js` または `src/mml2json.js` を分析し、既存のMML文字列入力とそのMMLを解析して生成されるJSONオブジェクト出力をペアとして抽出する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: src/main.js, src/mml2json.js, test/parser.test.js

        実行内容: src/main.js および src/mml2json.js 内の既存のMMLからJSONへの変換ロジックを分析し、少なくとも一つのMML文字列入力とその期待されるJSONオブジェクト出力のペアを抽出してください。これらのペアを使用して、test/parser.test.js に新しい `describe` ブロックを追加し、vitest形式でテストケースを生成してください。テストケースは、仮の `mml2json` 関数が与えられたMML入力に対して抽出されたJSON出力を返すことを検証するものとします。

        確認事項: 既存のテストコードを上書きしないこと。生成されるJSON構造は、現状のコードが生成する形式に準拠していることを確認してください。

        期待する出力: test/parser.test.js に追加される新しいテストケースのコードブロックをMarkdown形式で生成してください。

---
Generated at: 2025-10-02 07:05:29 JST
