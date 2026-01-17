# tonejs-mml-to-json

**MML to Tone.js JSON Sequencer Format Converter**

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-mml-to-json"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-mml-to-json/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
</p>

## 実装方針
このプロジェクトは **Tree-sitter** を使用してMMLをパースします。
- パーサの実装は [`grammar.js`](tree-sitter-mml/grammar.js) を単一の信頼できる情報源（SSOT）として扱います
- 詳細は [copilot-instructions.md](copilot-instructions.md) を参照してください

## 参考リポジトリ
このプロジェクトは以下のTree-sitter実装リポジトリを参考にしています：

### Tree-sitter成功事例
- **[tree-sitter-wasm-c-generate-example](https://github.com/cat2151/tree-sitter-wasm-c-generate-example)**
  - Tree-sitterのgrammar.jsからC言語パーサとWASMパーサを生成する実装例
  - grammar.jsをSSOTとして扱う設計パターン
  - C生成とWASM生成の両方をサポートする方法
  - 本プロジェクトのTree-sitter実装の基礎となっています

## Quick Links
| 項目 | リンク |
|------|--------|
| 🎵 Demo | https://cat2151.github.io/tonejs-mml-to-json/index.html |
| 📦 NPM Package | [npm install tonejs-mml-to-json](https://www.npmjs.com/package/tonejs-mml-to-json) |
| 📚 ライブラリ利用ガイド | [LIBRARY_USAGE.md](LIBRARY_USAGE.md) |
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph-enhanced.html](https://cat2151.github.io/tonejs-mml-to-json/generated-docs/callgraph-enhanced.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# 概要
- MML（Music Macro Language）で書いた音楽を、ブラウザで再生できるJSON形式に変換します
- 簡単なテキストで音楽を作成し、ウェブサイトで演奏することができます
- npmパッケージおよびCDN経由で利用可能で、プロジェクトへの統合が簡単です
- 音楽の変換部分に特化したツールで、実際の再生は別プロジェクト（`tonejs-json-sequencer`）が担当します



# 使い方

## npmパッケージとして利用

```bash
npm install tonejs-mml-to-json
```

```javascript
import { initWasm, mml2json } from 'tonejs-mml-to-json';

// WASMモジュールを初期化
await initWasm();

// MMLをJSONに変換
const mml = 'o4 l16 e f g+ a b a g+ f e8. <e8. >e8';
const json = mml2json(mml);
console.log(json);
```

## CDN経由で利用

```html
<script type="module">
  import { initWasm, mml2json } from 'https://cat2151.github.io/tonejs-mml-to-json/dist/index.js';
  
  await initWasm();
  const json = mml2json('o4 l16 e f g+ a');
  console.log(json);
</script>
```

詳細な使い方については [LIBRARY_USAGE.md](LIBRARY_USAGE.md) を参照してください。

# MMLコマンドリファレンス

## 実装済みコマンド

### 音符と休符
| コマンド | 説明 | 例 |
|---------|------|-----|
| `c d e f g a b` | 音符（ド・レ・ミ・ファ・ソ・ラ・シ） | `cdefgab` |
| `+` `-` | 臨時記号（シャープ/フラット）<br>※音符の直後に記述（音符の前には置けません） | `c+` `e-` `c++` `e--` |
| `数字` | 音符の長さ（4=4分音符、8=8分音符、16=16分音符）<br>音符または休符の直後に記述 | `c4` `e8` `c16` |
| `.` | 付点（音符の長さを1.5倍に）<br>連続して指定可能（`..`=1.75倍） | `c4.` `e8..` |
| `r` | 休符<br>音符と同様に長さと付点を指定可能 | `r` `r4` `r8.` |

### オクターブ制御
| コマンド | 説明 | 例 |
|---------|------|-----|
| `o数字` | オクターブを指定（デフォルト: `o4`） | `o4` `o5` `o3` |
| `<` | オクターブを1つ上げる | `<` |
| `>` | オクターブを1つ下げる | `>` |

### デフォルト設定
| コマンド | 説明 | 例 |
|---------|------|-----|
| `l数字` | デフォルト音符長を設定<br>（以降の音符に長さ指定がない場合に適用） | `l8` `l16` `l4` |

### 音色制御
| コマンド | 説明 | 例 |
|---------|------|-----|
| `@楽器名` | 音色（シンセサイザー）を変更<br>Tone.jsのシンセクラス名を使用<br>（詳細は下記の「音色仕様について」を参照） | `@Synth` `@FMSynth` `@AMSynth` |

### マルチトラック
| コマンド | 説明 | 例 |
|---------|------|-----|
| `;` | トラック区切り<br>複数パートを同時演奏 | `cde;efg;abc` |

### 和音
| コマンド | 説明 | 例 |
|---------|------|-----|
| `'音符'` | 和音（シングルクォートで囲まれた音符が同時に演奏される）<br>臨時記号、長さ、付点を指定可能<br>※長さは最初の音符の後ろ（クォート内）、付点はクォート外 | `'ceg'` `'c+eg-'` `'c4eg'` `'c4eg'.` |

### 使用例
```mml
// 基本的な音階
o4 l16 cdefgab

// 臨時記号付き音階
o4 l16 c c+ d d+ e f f+ g g+ a a+ b

// 付点音符とリズム
o4 l8 c4. d e8. f16 g4

// オクターブ変更
o4 c d e < f g a > b < c

// マルチトラック（別々のパート）
o4 l8 ceg;dfb;ace

// 和音（同時に演奏される音符）
o4 l4 'ceg' 'dfb' 'ace'

// 単音と和音の混在
o4 c 'eg' d 'fac' e

// 臨時記号と長さを含む和音
o4 'c+4eg-' 'd+8f+a' 'e4g+b'.

// 楽器変更（音色）
@Synth cde @FMSynth efg @AMSynth abc

// 異なる楽器タイプ
@FMSynth o4 l8 cdefgab<c  // FMSynth - エレピの音
@MonoSynth o3 l8 ccccdddd    // MonoSynth - ベース音
@PluckSynth o4 l8 cdefgab     // PluckSynth - ギターの音

// 1トラック内での楽器切り替え
@Synth o4 cde @FMSynth fga @AMSynth b<c
```

## 未実装コマンド（将来実装予定）

以下のコマンドは、標準的なMMLでよく使用されるコマンドですが、本ライブラリではまだ実装されていません。将来のバージョンで実装される可能性があります。

| コマンド | 説明 | 標準的な例 |
|---------|------|-----------|
| `t` `T` | テンポ設定（BPM） | `t120` `T140` |
| `v` `V` | 音量設定（0-127） | `v100` `V80` |
| `&` `^` | タイ（同じ音高の音符を結合） | `c4&c4` `c4^c4` |
| `q` `Q` | ゲートタイム（音符の長さの割合、スタッカート制御） | `q60` `Q80` |
| `p` `P` | パン（定位）設定 | `p64` `P0` |
| `u` `U` | ベロシティ（アタック強度） | `u120` |
| `[` `]` | ループ（繰り返し） | `[cde]4` |

**⚠️ 重要な注意事項**: 
- これらのコマンドの実装時期や仕様は未定です
- 実装される場合、仕様が変更される可能性があります
- プロトタイピング段階では破壊的変更が頻繁に発生する可能性があります

## 和音実装について

和音はTone.jsの`PolySynth`を使用して実装されており、複数のシンセサイザーボイスを管理して音符を同時に演奏します。

### 技術詳細

- **構文**: シングルクォートで囲まれた音符（例: `'ceg'`）が和音として扱われます
- **PolySynth**: 和音を含むトラックは自動的に通常の`Synth`ではなく`PolySynth`を使用します
- **機能**:
  - 和音内での臨時記号のサポート: `'c+eg-'` = C# E Gb
  - 長さと付点のサポート: `'c4eg'.` = 付点4分音符のC-E-G和音（長さはクォート内、付点はクォート外）
  - オクターブコマンドとの連携: `o5 'ceg'` = C5-E5-G5和音
  - マルチトラックとの互換性: 一部のトラックで和音を使用し、他のトラックでは使用しないことが可能
- **マルチトラックとの違い**:
  - マルチトラック（`;`）: 異なるメロディー/パートを同時に演奏する別々のトラック
  - 和音（`'...'`）: 完全に同じタイミングで一緒に演奏される複数の音符

### 比較例

```mml
// マルチトラック: C、E、Gが別々のパート（メロディライン）として演奏される
c;e;g

// 和音: C、E、Gが単一の和音として一緒に演奏される
'ceg'
```

## 音色仕様について（`@` コマンド）

現在の `@` コマンドは基本的な音色切り替えを実装していますが、将来的にはTone.jsの多様なシンセサイザータイプに対応する予定です。

### Tone.jsで利用可能なシンセサイザータイプ候補

以下は、将来的に `@` コマンドで指定できる可能性のあるTone.jsシンセサイザータイプです：

| タイプ | 特徴 | 適した音色 |
|--------|------|-----------|
| `Synth` | 基本的な減算合成<br>単一オシレータ + エンベロープ | リード、パッド、基本的な音色 |
| `AMSynth` | 振幅変調合成<br>2つのオシレータで振幅を変調 | ベル、金属的な音、トレモロ効果 |
| `FMSynth` | 周波数変調合成<br>2つのオシレータで周波数を変調 | エレクトリックピアノ、ベル、金属的な音 |
| `MonoSynth` | モノフォニック減算合成<br>フィルターエンベロープ付き | ベース、モノリード、アナログシンセ風 |
| `DuoSynth` | デュアルボイスポリフォニック<br>2つのMonoSynthを組み合わせ | 豊かなテクスチャ、コーラス効果、複雑な音色 |
| `PluckSynth` | カープラス・ストロング法<br>撥弦楽器シミュレーション | ギター、ハープ、琴、撥弦系 |
| `MembraneSynth` | 膜振動シミュレーション | ドラム、打楽器 |
| `MetalSynth` | 金属的な音響シミュレーション | シンバル、金属打楽器 |

### 現在の実装状況

- **現在**: `@` コマンドはTone.jsのクラス名を直接使用します：
  - `@Synth` = 基本減算合成（デフォルト）
  - `@FMSynth` = FM合成（エレクトリックピアノ、ベル）
  - `@AMSynth` = AM合成（ベル、金属的な音）
  - `@MonoSynth` = モノフォニック合成（ベース、リード）
  - `@PluckSynth` = 撥弦楽器（ギター、ハープ）
  - `@MembraneSynth` = ドラム、打楽器
  - `@MetalSynth` = シンバル、金属打楽器
  - `@DuoSynth` = デュアルボイス合成（豊かな音色）
  - `@PolySynth` = ポリフォニック合成
- **注意**: 和音を含むトラックは指定された楽器に関係なく自動的にPolySynthを使用します

### 使用例

```mml
// FMSynthでエレピの音
@FMSynth o4 l8 cdefgab<c

// トラック内で楽器を切り替え
@Synth o4 cde @FMSynth fga @AMSynth b<c

// MonoSynthでベースライン
@MonoSynth o3 l8 c c c c d d d d
```

### 仕様変更の可能性について

⚠️ **重要**: 音色指定機能は現在プロトタイピング段階です

- Tone.jsのデフォルト音色表現を検証するための仮仕様です
- 各バリエーションを簡易的に確認できるよう実装しています
- 仕様は頻繁に破壊的変更される可能性があります
- プロダクション環境で使用する場合は、バージョンを固定することを推奨します
- フィードバックや要望があれば、GitHubのIssueで共有してください

# tonejs-json-sequencer との機能対応状況

このセクションでは、[tonejs-json-sequencer](https://github.com/cat2151/tonejs-json-sequencer) でサポートされている機能と、本ライブラリ（tonejs-mml-to-json）での対応状況を記載します。

## 調査の目的

tonejs-json-sequencer で表現可能な音楽要素を、本ライブラリのMMLでも表現できるようにすることを目指しています。これにより、MMLから完全な音楽表現への変換が可能になります。

## tonejs-json-sequencer でサポートされているコンポーネント

### 音源（Instrument）- 対応状況

| Tone.js クラス | tonejs-json-sequencer | 本ライブラリ(MML) | 備考 |
|---------------|----------------------|------------------|------|
| **Synth** | ✅ 対応済み | ✅ 対応済み | `@Synth` で実装済み（デフォルト） |
| **MonoSynth** | ✅ 対応済み | ✅ 対応済み | `@MonoSynth` で実装済み（ベース音色） |
| **FMSynth** | ✅ 対応済み | ✅ 対応済み | `@FMSynth` で実装済み（エレピ、ベル） |
| **AMSynth** | ✅ 対応済み | ✅ 対応済み | `@AMSynth` で実装済み（ベル、金属音） |
| **DuoSynth** | ✅ 対応済み | ✅ 対応済み | `@DuoSynth` で実装済み（デュアルボイス） |
| **PluckSynth** | ✅ 対応済み | ✅ 対応済み | `@PluckSynth` で実装済み（撥弦楽器） |
| **MembraneSynth** | ✅ 対応済み | ✅ 対応済み | `@MembraneSynth` で実装済み（ドラム） |
| **MetalSynth** | ✅ 対応済み | ✅ 対応済み | `@MetalSynth` で実装済み（シンバル） |
| **NoiseSynth** | ✅ 対応済み | ⏳ 未対応 | ノイズベース音色 |
| **PolySynth** | ✅ 対応済み | ✅ 対応済み | 和音機能で自動使用 |
| **Sampler** | ✅ 対応済み | ⏳ 未対応 | サンプルベース音源 |

### エフェクト（Effect）- 対応状況

#### 空間系（Spatial）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Reverb** | ✅ 対応済み | ⏳ 未対応 | リバーブ効果 |
| **Freeverb** | ✅ 対応済み | ⏳ 未対応 | Freeverbアルゴリズム |
| **JCReverb** | ✅ 対応済み | ⏳ 未対応 | JCReverbアルゴリズム |

#### モジュレーション系（Modulation）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Chorus** | ✅ 対応済み | ⏳ 未対応 | コーラス効果 |
| **Phaser** | ✅ 対応済み | ⏳ 未対応 | フェイザー効果 |
| **Tremolo** | ✅ 対応済み | ⏳ 未対応 | トレモロ効果 |
| **Vibrato** | ✅ 対応済み | ⏳ 未対応 | ビブラート効果 |
| **AutoFilter** | ✅ 対応済み | ⏳ 未対応 | オートフィルター |
| **AutoPanner** | ✅ 対応済み | ⏳ 未対応 | オートパンナー |
| **AutoWah** | ✅ 対応済み | ⏳ 未対応 | オートワウ |

#### ディレイ系（Delay）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **FeedbackDelay** | ✅ 対応済み | ⏳ 未対応 | フィードバックディレイ |
| **PingPongDelay** | ✅ 対応済み | ⏳ 未対応 | ピンポンディレイ |

#### 歪み系（Distortion）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **Distortion** | ✅ 対応済み | ⏳ 未対応 | ディストーション |
| **BitCrusher** | ✅ 対応済み | ⏳ 未対応 | ビットクラッシャー |
| **Chebyshev** | ✅ 対応済み | ⏳ 未対応 | チェビシェフ歪み（倍音生成） |

#### ピッチ系（Pitch）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **PitchShift** | ✅ 対応済み | ⏳ 未対応 | ピッチシフト |
| **FrequencyShifter** | ✅ 対応済み | ⏳ 未対応 | 周波数シフター |

#### ステレオ処理（Stereo）

| エフェクト | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|-----------|----------------------|------------------|------|
| **StereoWidener** | ✅ 対応済み | ⏳ 未対応 | ステレオワイドナー |

### 奏法・パラメータ制御（Performance）

| 機能 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **ディレイビブラート** | ✅ 対応済み | ⏳ 未対応 | 遅延ビブラート効果 |
| **depth.rampTo** | ✅ 対応済み | ⏳ 未対応 | パラメータの段階的変更 |
| **Panpot変更** | 🚧 計画中 | ⏳ 未対応 | パン（定位）のリアルタイム変更 |
| **Expression変更** | 🚧 計画中 | ⏳ 未対応 | 音量のリアルタイム変更 |
| **LPF変更** | 🚧 計画中 | ⏳ 未対応 | ローパスフィルターのリアルタイム変更 |
| **Portamento** | 🚧 計画中 | ⏳ 未対応 | ポルタメント効果 |

### 音源タイプ（Source）- 今後対応予定

| 音源 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **FatOscillator** | 🚧 計画中 | ⏳ 未対応 | SuperSaw音色、分厚いパッド |
| **PulseOscillator** | 🚧 計画中 | ⏳ 未対応 | パルス波（12.5%デューティパルスなど） |

### ダイナミクス・フィルター（Dynamics/Filter）- 今後対応予定

| 機能 | tonejs-json-sequencer | 本ライブラリ(MML) | 用途 |
|------|----------------------|------------------|------|
| **Compressor** | 🚧 計画中 | ⏳ 未対応 | コンプレッサー |
| **EQ3** | 🚧 計画中 | ⏳ 未対応 | 3バンドイコライザー |

## 実装の優先順位と計画

### 高優先度（早期実装予定）

1. **音色（Instrument）の拡張**
   - 現在実装済み: `@` コマンドでTone.jsのクラス名を直接指定（`@Synth`, `@FMSynth`, `@AMSynth`など）
   - 将来的な拡張案: 省略形や別名のサポート（例: `@fm` → `@FMSynth`）

2. **基本エフェクト**
   - リバーブ、コーラス、ディレイなどの基本エフェクト
   - MMLコマンド案: `R` (Reverb), `C` (Chorus), `D` (Delay) など

3. **パラメータ制御**
   - 音量（Volume/Expression）: `v` コマンド
   - パン（Panpot）: `p` コマンド
   - フィルター制御: 新規コマンド検討

### 中優先度

1. **高度なエフェクト**
   - Phaser, Tremolo, AutoFilter, AutoWah など
   - ビブラート、ディレイビブラートなどの奏法表現

2. **歪み系エフェクト**
   - Distortion, BitCrusher, Chebyshev

3. **ピッチ系エフェクト**
   - PitchShift, FrequencyShifter

### 低優先度（検討中）

1. **高度な音源**
   - FatOscillator, PulseOscillator などの特殊音源
   - Sampler によるサンプルベース音源

2. **ダイナミクス処理**
   - Compressor, EQ などのマスタリング系

3. **リアルタイムパラメータ変更**
   - パラメータの段階的変更（rampTo）
   - エンベロープ制御

## 実装方針

### 基本方針

1. **既存MML構文との互換性維持**
   - 既存の実装を壊さない
   - 段階的な機能追加

2. **シンプルさの重視**
   - MMLの簡潔さを損なわない
   - 学習コストを最小限に

3. **Tone.jsの機能を最大限活用**
   - tonejs-json-sequencer で実装済みの機能を活用
   - JSON出力フォーマットの拡張で対応

### 実装アプローチ

1. **段階的実装**
   - 高優先度の機能から順次実装
   - 各機能のプロトタイプを作成してフィードバック収集

2. **テスト駆動開発**
   - 各機能に対するテストケースを作成
   - 既存機能の退行テストも実施

3. **ドキュメント更新**
   - 実装完了時にREADMEとサンプルコードを更新
   - 使用例を充実させる

## 参考資料

- [tonejs-json-sequencer リポジトリ](https://github.com/cat2151/tonejs-json-sequencer)
- [tonejs-json-sequencer README](https://github.com/cat2151/tonejs-json-sequencer/blob/main/README.ja.md)
- [Tone.js コンポーネント JSON対応ロードマップ](https://github.com/cat2151/tonejs-json-sequencer/blob/main/docs/tonejs-components-roadmap.ja.md)
- [Tone.js 公式ドキュメント](https://tonejs.github.io/)

## 更新履歴

- 2026-01-12: tonejs-json-sequencer の調査結果を初版作成

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
## Rust実装について
- **Rust + WASM 実装を追加しました**
  - Rustライブラリクレートとして利用可能
  - WASMコンパイルでブラウザでも動作
  - JavaScript実装と100%互換
  - 詳細は [rust/README.md](rust/README.md) を参照

## アーキテクチャ
- **mml2ast**: MML文字列をASTに変換するパーサー
- **ast**: AST（抽象構文木）のデータ構造
- **ast2json**: ASTをTone.js互換JSONに変換

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
- このprojectではvitestによるTDDをしていた気がする
  - あとでtest手順を整理するつもり

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています
