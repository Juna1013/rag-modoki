# rag-modoki

サイバーセキュリティ啓発イベントの展示用に開発した、RAG（Retrieval-Augmented Generation：検索拡張生成）のプロトタイプを含む学習支援 Web アプリです。

茨城高専メディア・デザイン・ラボが、茨城県警から委嘱を受けたサイバーセキュリティボランティア活動の一環として、「得意技・先進技術EXPO＆AI・ICTセミナー」（2025年11月）の広報啓発ブースで展示しました。

**デモ**: <https://nitic-rag.vercel.app>

## 機能

### RAG 検索ボット

アプリ内の解説記事（Markdown）を知識源として、質問に回答するチャットボットです。次の 2 つのモードを切り替えられます。

- **RAG 検索モード** — 質問をベクトル化して関連する記事チャンクを類似度検索し、その内容を根拠として Gemini が回答を生成します。回答には参照した出典（記事名と節）が表示されます
- **クイズレコメンドモード** — 「ネットワークの問題を3問出して」のような自然文から、Gemini がトピック・問題数・難易度を抽出し、該当するクイズを提案します

### IT クイズ（100問）

セキュリティ・ネットワーク・データベースなど IT 基礎知識の 4 択クイズです。基本・中級・上級・ランダムの各モードで挑戦でき、回答ごとに解説が表示されます。問題データは [TOON 形式](src/data/quiz/) で管理しています。

### 解説記事

展示テーマに合わせて作成した記事を閲覧できます。RAG ボットの知識源にもなっています。

- 2025年度のサイバー攻撃事例の比較分析（国内製造業へのランサムウェア攻撃・欧州空港へのサプライチェーン攻撃）
- オンプレミスとクラウドの比較（初期費用・拡張性・セキュリティ・運用負担・カスタマイズ性）
- RAG の仕組みの解説
- OpenCV を用いた紙アンケートのスキャン

## RAG の仕組み

埋め込みベクトルによる意味検索を用いた RAG パイプラインを実装しています。展示当初はキーワードマッチングによる簡易検索（「もどき」の由来）でしたが、現在は次の構成です。

### 事前準備（ビルド時）

`npm run embed` が解説記事を見出し単位でチャンク分割し、Gemini の埋め込みモデル（`gemini-embedding-001`・768次元）でベクトル化して [api/_data/embeddings.json](api/_data/embeddings.json) に保存します。記事を更新したら再実行します。

### 質問への回答（実行時）

```text
ブラウザ ─ 質問 ─▶ /api/chat (Vercel Function)
                    │
                    ▼
① 検索 (Retrieval)
   質問を gemini-embedding-001 でベクトル化し、
   事前計算済みチャンクとのコサイン類似度で上位4件を取得
                    │
                    ▼
② 拡張 (Augmentation)
   取得したチャンクを出典番号付きで参考資料としてプロンプトに埋め込む
                    │
                    ▼
③ 生成 (Generation)
   Gemini (gemini-2.0-flash) が参考資料を根拠に回答を生成
                    │
                    ▼
ブラウザ ◀─ 回答 + 出典（参照した記事名・節・類似度）
```

Gemini API の呼び出しはすべてサーバー側（Vercel Functions）で行うため、API キーはフロントエンドに露出しません。検索・生成のコアロジックは [api/_lib/rag.ts](api/_lib/rag.ts)、チャンク分割と埋め込み生成は [scripts/build-embeddings.mjs](scripts/build-embeddings.mjs) にまとまっています。

知識源が記事 4 本と小規模なため、ベクトルデータベースは使わず事前計算した埋め込みを JSON で同梱し、関数内で全件走査しています（34 チャンク程度なら十分高速です）。

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| フロントエンド | React 19 / TypeScript / Vite |
| バックエンド | Vercel Functions（サーバーレス） |
| スタイリング | Tailwind CSS / Material UI |
| AI | Gemini API（生成: gemini-2.0-flash / 埋め込み: gemini-embedding-001） |
| 描画 | react-markdown / react-syntax-highlighter |
| デプロイ | Vercel |

## セットアップ

前提: Node.js 18 以上

```bash
git clone https://github.com/Juna1013/rag-modoki.git
cd rag-modoki
npm install
cp .env.example .env   # GEMINI_API_KEY に Gemini APIキーを設定
npx vercel dev         # http://localhost:3000/（API関数込みで起動）
```

Gemini API キーは [Google AI Studio](https://aistudio.google.com/apikey) から無料で取得できます。

> **補足**: `npm run dev`（Vite 単体）でも UI は確認できますが、AI 機能は `/api/chat`（Vercel Function）に依存するため `vercel dev` での起動が必要です。デプロイ時は Vercel プロジェクトの環境変数に `GEMINI_API_KEY` を設定してください。

### スクリプト

```bash
npm run dev      # 開発サーバー（UIのみ、API関数なし）
npm run embed    # 記事の埋め込みベクトルを再生成
npm run build    # プロダクションビルド (dist/)
npm run lint     # ESLint
npm run preview  # ビルド結果のプレビュー
```

## プロジェクト構成

```text
rag-modoki/
├── api/                # Vercel Functions
│   ├── chat.ts         #   チャットAPI（RAG検索＋生成・クイズ意図抽出）
│   ├── _lib/rag.ts     #   ベクトル検索・プロンプト構築・生成のコアロジック
│   └── _data/          #   事前計算済みチャンク埋め込み（JSON）
├── scripts/            # 埋め込み生成スクリプト（npm run embed）
├── src/
│   ├── components/     # Reactコンポーネント（dashboard / quiz / ragbot / members など）
│   ├── content/        # 解説記事（RAGの知識源となるMarkdown）
│   ├── data/           # クイズ問題データ（TOON形式）・メンバー情報
│   ├── utils/          # チャットAPIクライアント・TOONパーサー
│   └── styles/         # 共通スタイル
├── docs/               # 開発ドキュメント
└── public/documents/   # 展示で使用した調査資料（PDF）
```

詳細は [docs/](./docs/README.md) を参照してください。

## 背景

このアプリは、「中小企業がシステムをオンプレミスとクラウドのどちらで運用すべきか」という展示テーマの判断指針の一例として、社内文書を安全に活用できる RAG という選択肢を来場者に紹介するために開発しました。関連する活動は茨城県警察の「[サイバーセキュリティの取組](https://www.pref.ibaraki.jp/kenkei/a01_safety/cyber/torikumi.html)」ページで紹介されています。

開発は 5 人チームで行い、担当は[メンバー紹介](src/data/members/members.json)のとおりです。

## ライセンス

[MIT License](./LICENSE)
