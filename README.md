# rag-modoki

サイバーセキュリティ啓発イベントの展示用に開発した、RAG（Retrieval-Augmented Generation：検索拡張生成）のプロトタイプを含む学習支援 Web アプリです。

茨城高専メディア・デザイン・ラボが、茨城県警から委嘱を受けたサイバーセキュリティボランティア活動の一環として、「得意技・先進技術EXPO＆AI・ICTセミナー」（2025年11月）の広報啓発ブースで展示しました。

**デモ**: <https://nitic-rag.vercel.app>

## 機能

### RAG 検索ボット

アプリ内の解説記事（Markdown）を知識源として、質問に回答するチャットボットです。次の 2 つのモードを切り替えられます。

- **RAG 検索モード** — 質問に関連する記事を検索し、その内容を根拠として Gemini が回答を生成します
- **クイズレコメンドモード** — 「ネットワークの問題を3問出して」のような自然文から、Gemini がトピック・問題数・難易度を抽出し、該当するクイズを提案します

### IT クイズ（100問）

セキュリティ・ネットワーク・データベースなど IT 基礎知識の 4 択クイズです。基本・中級・上級・ランダムの各モードで挑戦でき、回答ごとに解説が表示されます。問題データは [TOON 形式](src/data/quiz/) で管理しています。

### 解説記事

展示テーマに合わせて作成した記事を閲覧できます。RAG ボットの知識源にもなっています。

- 2025年度のサイバー攻撃事例の比較分析（国内製造業へのランサムウェア攻撃・欧州空港へのサプライチェーン攻撃）
- オンプレミスとクラウドの比較（初期費用・拡張性・セキュリティ・運用負担・カスタマイズ性）
- RAG の仕組みの解説
- OpenCV を用いた紙アンケートのスキャン

## 「もどき」の仕組み

名前のとおり、ベクトルデータベースや埋め込みモデルを使わない簡易構成で RAG の流れを再現したプロトタイプです。すべてクライアントサイドで完結します。

```text
ユーザーの質問
   │
   ▼
① 検索 (Retrieval)
   タイトル・キーワード・本文のマッチングで記事をスコアリングし、上位2件を取得
   │
   ▼
② 拡張 (Augmentation)
   取得した記事本文を参考資料としてプロンプトに埋め込む
   │
   ▼
③ 生成 (Generation)
   Gemini (gemini-2.0-flash) が参考資料に基づいて回答を生成
```

本格的なベクトル検索と比べて精度は劣りますが、「検索して根拠を渡してから生成する」という RAG の本質的な流れを、来場者にその場で体験してもらうことを目的としています。実装は [RagBot.tsx](src/components/ragbot/RagBot.tsx) にまとまっています。

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| フロントエンド | React 19 / TypeScript / Vite |
| スタイリング | Tailwind CSS / Material UI |
| AI | Google Gemini API (`@google/genai`) |
| 描画 | react-markdown / react-syntax-highlighter |
| デプロイ | Vercel |

## セットアップ

前提: Node.js 18 以上

```bash
git clone https://github.com/Juna1013/rag-modoki.git
cd rag-modoki
npm install
cp .env.example .env   # VITE_GEMINI_KEY に Gemini APIキーを設定
npm run dev            # http://localhost:5173/
```

Gemini API キーは [Google AI Studio](https://aistudio.google.com/apikey) から無料で取得できます。

> **注意**: Vite の `VITE_` プレフィックス付き環境変数は、ビルド後の JavaScript バンドルに埋め込まれます。公開デプロイする場合は、Google AI Studio 側でキーに HTTP リファラ制限を設定してください。

### スクリプト

```bash
npm run dev      # 開発サーバー
npm run build    # プロダクションビルド (dist/)
npm run lint     # ESLint
npm run preview  # ビルド結果のプレビュー
```

## プロジェクト構成

```text
rag-modoki/
├── src/
│   ├── components/     # Reactコンポーネント（dashboard / quiz / ragbot / members など）
│   ├── content/        # 解説記事（RAGの知識源となるMarkdown）
│   ├── data/           # クイズ問題データ（TOON形式）・メンバー情報
│   ├── utils/          # Gemini API呼び出し・TOONパーサー
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
