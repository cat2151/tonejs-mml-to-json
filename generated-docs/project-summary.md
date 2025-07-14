# Project Summary

Last updated: 2025-07-15

# Project Summary

## プロジェクト概要
`tonejs-mml-to-json`は、MML (Music Macro Language) をJSON形式に変換するライブラリです。
`tonejs-json-sequencer`との連携を通じて、MMLを用いた音楽シーケンス開発を効率化することを目的としています。
PEGを活用し、MMLから中間形式のAST（JSON）を生成する機能の開発と、その入出力定義の具体化が進められています。

## 現在のIssues
現在、プロジェクトはMMLからJSONへの変換ロジックをTDDで再構築するフェーズにあります。
具体的には、`mml2ast`や`ast2json`のTDD準備、既存コードからのテストケース生成、そしてMML 'c'の変換が主要な課題です。
同時に、開発効率向上のため、`pnpm watch`スクリプトの自動化やビルドプロセスの改善も課題となっています。

## 次の一手候補
1.  TDDによるMML 'c'の演奏可能形式への変換 (#3)
    -   最初の小さな一歩: `mml2json`関数がMML "c"をパースし、`tonejs-json-sequencer`が演奏できるJSON形式を出力するためのテストケースを記述する。

2.  mml2json関数のTDD用テストケース生成 (#5)
    -   最初の小さな一歩: 既存の`mml2json`コードを分析し、音符、長さ、オクターブなどの基本的なMML表現に対する入出力ペアのサンプルをリストアップする。

3.  `pnpm script watch`の統合と自動化 (#8)
    -   最初の小さな一歩: `package.json`に`watch`スクリプトのひな形（例: `peggy --watch src/grammar.js --output src/grammar.js && vitest watch`）を追加し、手動でビルドとテストが自動実行されることを確認する。

---
Generated at: 2025-07-15 08:18:31 JST
