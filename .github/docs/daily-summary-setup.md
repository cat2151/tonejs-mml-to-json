# Daily Project Summary Setup

このドキュメントでは、Daily Project Summary機能のセットアップ方法を説明します。

## 必要な設定

### GitHub Secrets

リポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

1. **GEMINI_API_KEY** (必須)
   - Google AI Studio で取得したGemini APIキー
   - [Google AI Studio](https://aistudio.google.com/) でAPIキーを作成

2. **GITHUB_TOKEN** (自動設定)
   - GitHub Actionsで自動的に提供されます
   - Issue情報の取得に使用

### ファイル構成

```
.github/
├── workflows/
│   └── daily-project-summary.yml     # メインワークフロー
├── scripts/
│   ├── generate-project-summary.js   # 要約生成スクリプト
│   └── test-summary.js              # 手動テスト用
└── prompts/
    └── project-summary-prompt.md     # 生成プロンプト設定

generated-docs/                       # 生成された要約の保存先
└── project-summary.md               # プロジェクト要約ファイル
```

## 実行条件

- **スケジュール**: 毎日日本時間 07:00
- **実行条件**: 過去24時間以内にユーザーによるコミットプッシュがある場合のみ
- **除外条件**: GitHub Actionsによるコミットは除外

## プロンプトのカスタマイズ

`.github/prompts/project-summary-prompt.md` を編集することで、生成内容をカスタマイズできます。

### デフォルト設定
- プロジェクト概要（3行）
- オープンIssues要約（3行）
- 次の一手候補（3つ）
- 各候補の最初の小さな一歩

## 手動実行

### GitHub Actions UI
1. GitHub リポジトリの Actions タブに移動
2. "Daily Project Summary" ワークフローを選択
3. "Run workflow" ボタンをクリック

### ローカルテスト
```bash
# 環境変数を設定
export GEMINI_API_KEY="your-api-key"
export GITHUB_TOKEN="your-github-token"  # オプション

# テストスクリプト実行
node .github/scripts/test-summary.js
```

## トラブルシューティング

### よくある問題

1. **GEMINI_API_KEY not set**
   - GitHub SecretsでGEMINI_API_KEYが設定されているか確認

2. **No user commits found**
   - 過去24時間以内にユーザーによるコミットがない場合は正常な動作

3. **Issues collection failed**
   - GITHUB_TOKENの権限を確認
   - リポジトリがプライベートの場合はissues:read権限が必要

### ログの確認

GitHub Actions の実行ログで詳細なエラー情報を確認できます：
1. Actions タブ → ワークフロー実行 → ログを確認

## API制限について

### Gemini API
- 無料枠: 月間15リクエスト
- 1日1回実行なので月間最大31リクエスト
- 必要に応じて有料プランの検討

### GitHub API
- 認証済みリクエスト: 5000回/時間
- 1日1回のIssue取得なので十分な余裕

## セキュリティ

- APIキーはGitHub Secretsで管理
- 生成されたコンテンツはパブリックリポジトリの場合公開される
- プライベート情報を含むプロンプトは避ける
