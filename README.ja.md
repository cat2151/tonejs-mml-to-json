# tonejs-mml-to-json

[日本語 README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-mml-to-json/index.html)

# why
- tonejs-json-sequencer を参照ください

# なぜ tonejs-json-sequencer と tonejs-mml-to-json は別projectなの？
- そのほうがMML開発がスムーズだからです
  - しがらみがあるとそこで開発が止まってしまうので
- tonejs-json-sequencer も参照ください

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
