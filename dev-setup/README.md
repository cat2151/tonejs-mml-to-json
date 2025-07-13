# TDD環境構築ガイド

このディレクトリには、TDD（テスト駆動開発）環境を自動構築するスクリプトが含まれています。

## 概要

以下の技術スタックを使用してTDD環境を構築します：
- **pnpm**: 高速なパッケージマネージャー
- **Peggyjs**: PEG（Parsing Expression Grammar）パーサージェネレーター
- **Vitest**: 高速なテストフレームワーク

## 前提条件

- Node.js (v16 以上)
- pnpm がインストールされていること

pnpmがインストールされていない場合：
```bash
npm install -g pnpm
```

## セットアップ手順

1. プロジェクトルートで以下のコマンドを実行：
```bash
node dev-setup/setup.js
```

## 構築される環境

### ファイル構成
```
project-root/
├── package.json          # プロジェクト設定
├── vitest.config.js      # Vitest設定
├── src/
│   ├── grammar.pegjs     # PEG文法定義
│   └── grammar.js        # 生成されたパーサー
└── test/
    └── parser.test.js    # パーサーのテスト
```

### PEG文法仕様
- 入力: `"c"`
- 出力: `"c"`
- シンプルなテスト用文法として実装

### テストケース
- 入力 `"c"` をパースして `"c"` が返されることを確認
- `toBeDefined()` レベルの基本テスト

## 使用方法

### 開発モード
```bash
pnpm run dev
```
パーサー生成とテスト監視を同時に実行します。

### テスト実行
```bash
pnpm test          # 一回実行
pnpm test:watch    # 監視モード
```

### パーサー再生成
```bash
pnpm run build:parser
```

## トラブルシューティング

### セットアップが失敗した場合
1. Node.js とpnpmのバージョンを確認
2. ネットワーク接続を確認
3. 権限エラーの場合は管理者権限で実行

### テストが失敗した場合
1. パーサーが正常に生成されているか確認
2. `pnpm run build:parser` を実行してパーサーを再生成
3. `node_modules` を削除して `pnpm install` を実行

## 拡張について

この基本環境をベースに、以下の拡張が可能です：
- 実際のMML文法の実装
- より複雑なテストケースの追加
- ESMとCJS両方のサポート
- ライブサーバーとの連携
- VSCodeとの統合

現在のスコープでは基本的なTDD環境の構築のみを行っています。
