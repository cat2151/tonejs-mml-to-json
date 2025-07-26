# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## Quick Links
| 項目 | リンク |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# 3行で説明
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します

# notes
- MML（Music Macro Language）で音楽を書くメリットは？
  - **簡潔性とポータビリティ**: テキストベースで軽量、Webならプラットフォーム非依存
  - **プログラマー親和性**: コードライクな記法、Git管理、生成が容易
  - **Web開発との親和性**: ブラウザで直接再生、リアルタイム編集、軽量配信
  - **学習コストの低さ**: シンプルな文法、段階的学習が可能
  - **モジュラー設計**: 変換と再生が分離され、それぞれを独立して進化可能
  - **エコシステムの土壌になる**: 再利用性が高く、ノウハウを共有、蓄積しやすい
  - **方言への対応力**: 各システム固有のMML方言も、簡易変換なら各位がPEGで作りやすく対応しやすい想定

- なぜ tonejs-json-sequencer と tonejs-mml-to-json は別プロジェクトなの？
  - **開発の独立性とスピードを重視しているため**
    - MMLパーサーの開発に集中できる
    - パーサー機能と演奏機能の依存関係に縛られることなく、素早く進化できる
  - 詳細は [tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) もご参照ください

# 検討中メモ
## 入出力定義
- ※例示してイメージを可視化する
- 入力例
  - `o4 l16 e`
- 中間フォーマット例
  - ※薄いレイヤーの疎結合とし、それぞれを変更しやすくする
  - json（AST）
  - json（加工前）
    - 加工とは
      - nodeId採番ほか
- 出力例
  - json（加工後）
    - tonejs-json-sequencerが認識するformat
    - 詳細は割愛、TDDのtest caseをもって詳細とする
## TDD方針
- test対象は、mml2ast、ast2ast、ast2json、のそれぞれである
  - mml2abc / chord2mml のTDDを参照のこと

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています
