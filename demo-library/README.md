# demo-library - ライブラリ利用デモ

このディレクトリは、`tonejs-mml-to-json` を **npm パッケージとして GitHub から利用する方法** を示すミニマムなデモです。

## 📖 概要

このデモは以下を実証します：

- リポジトリをクローンせずに、npm パッケージとして `tonejs-mml-to-json` を利用する方法
- GitHub から直接パッケージをインストールする標準的な手順
- 外部リポジトリからの利用者にとって実用的なアプローチ

## 🚀 使い方

### 1. 依存関係のインストール

```bash
cd demo-library
npm install
```

このコマンドで、`tonejs-mml-to-json` が GitHub から直接インストールされます。

### 2. デモの実行

ローカルでHTTPサーバーを起動してデモを表示します：

```bash
# 親ディレクトリから実行（推奨）
cd ..
npx http-server . -p 8080
# ブラウザで http://localhost:8080/demo-library/ にアクセス
```

または、demo-library 内の `npm run serve` も使用できますが、その場合は node_modules のインストールが必要です：

```bash
npm run serve
# ブラウザが自動的に開きます（http://localhost:8080）
```

### 3. デモの動作確認

デモページでは以下を試すことができます：

1. **MMLをJSONに変換**: MMLコードを入力して、Tone.js JSON形式に変換
2. **2段階変換**: MML → AST → JSON の変換プロセスを確認

## 📦 パッケージのインストール方法

### GitHub から直接インストール

```bash
npm install github:cat2151/tonejs-mml-to-json
```

または `package.json` に以下を追加：

```json
{
  "dependencies": {
    "tonejs-mml-to-json": "github:cat2151/tonejs-mml-to-json"
  }
}
```

### npm レジストリからインストール（公開後）

```bash
npm install tonejs-mml-to-json
```

## 💻 コード例

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// WASMモジュールを初期化
await initWasm();

// MMLをJSONに変換
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## 🔍 重要なポイント

- **クローン不要**: リポジトリをクローンする必要はありません
- **npm標準**: npm の標準的なパッケージ管理機能を使用
- **簡単な統合**: 既存のプロジェクトに簡単に統合可能
- **自動ビルド**: インストール時に必要なファイルが自動的に取得されます

## 📁 ファイル構成

```
demo-library/
├── package.json       # npm パッケージ設定
├── index.html         # デモページ
└── README.md          # このファイル
```

## 🌐 オンラインデモ

このデモは GitHub Pages でも公開されています：

https://cat2151.github.io/tonejs-mml-to-json/demo-library/

## 🔗 関連リンク

- [メインリポジトリ](https://github.com/cat2151/tonejs-mml-to-json)
- [npm パッケージページ](https://www.npmjs.com/package/tonejs-mml-to-json)
- [ライブデモ](https://cat2151.github.io/tonejs-mml-to-json/index.html)

## ⚠️ 注意事項

- このデモは最小限の実装例です
- 実際のプロジェクトでは、エラーハンドリングなどを追加してください
- WASM モジュールの初期化は非同期処理なので、`await initWasm()` を忘れないでください
