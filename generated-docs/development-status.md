Last updated: 2025-08-06

```markdown
# Development Status

## 現在のIssues
- 現在オープン中の課題は、GitHub Actionsの共通ワークフロー化と開発環境の改善が中心です。
- 特に、`pnpm watch`スクリプトの機能強化とVSCode連携に関するタスクが優先度高く残っています。
- また、MMLからTone.jsが解釈可能なJSONへの変換機能 (`mml2json`) をTDDベースで再実装するための準備と、具体的な機能実装が主要な開発タスクとして挙げられています。

## 次の一手候補
1. MMLの基本要素(`c`)からTone.js形式へのTDD実装を開始する
   - 最初の小さな一歩: `mml2json`のテストディレクトリに`c_note.test.ts`を作成し、MML `c` が`[{ time: 0, notes: [{ note: 'C4', duration: '4n' }] }]`のようなJSONに変換されることを期待するテストケースを記述してください。このテストが通るように最小限の`mml2json`関数を実装し、テストを成功させてください。[Issue #3](issue-notes/3.md)

2. 開発環境の`pnpm watch`スクリプトを機能強化する
   - 最初の小さな一歩: `package.json`の`scripts.watch`に、`pegjs`ファイルの変更を監視し、変更があった場合に自動で`build`と`test`スクリプトを実行する機能を追加するための初期調査を行ってください。利用可能なNode.jsパッケージ（例: `chokidar`）を特定し、その使用方法の概要を記述してください。[Issue #8](issue-notes/8.md)

3. GitHub Actionsの「project概要生成」を共通ワークフロー化する
   - 最初の小さな一歩: `.github/actions/generate-project-summary`ディレクトリを作成し、`action.yml`ファイルを追加して、`project概要生成`ワークフローの共通化に向けたベースを定義してください。既存のワークフローから`uses`で呼び出せる形を目指します。[Issue #18](issue-notes/18.md)
```

---
Generated at: 2025-08-06 07:04:19 JST
