# 🎓 Gemini Quiz App

Google Gemini APIを活用したAI搭載クイズ学習アプリケーション

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ 特徴

- 🤖 **AI会話型アシスタント（RAGボット）**:
  - **クイズレコメンド**: 自然な対話で最適な問題を提案
  - **知識検索（RAG）**: アプリ内の技術記事（Markdown）を参照して質問に回答
  - **モード選択**: 用途に合わせてAIの挙動を切り替え可能
- 📚 **多様な出題モード**: 基本・中級・上級・ランダム・カスタマイズ
- 🎨 **モダンなUI/UX**:
  - Geminiアプリ風のスタイリッシュなチャットインターフェース
  - Zenn風のタグ表示で記事のトピックを一目で把握
  - 美しいグラデーションとアニメーション
- 📝 **Markdown対応**: コードブロックを含む問題を美しく表示
- 📱 **レスポンシブデザイン**: モバイルからデスクトップまで完全対応

## 🚀 クイックスタート

### 前提条件
- Node.js 18以上
- npm 9以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/Juna1013/toon-app.git
cd toon-app

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集してAPI keyを設定
```

### 環境変数

`.env` ファイルを作成し、以下を設定：

```bash
VITE_GEMINI_KEY=your_gemini_api_key_here
```

Gemini APIキーの取得: [Google AI Studio](https://makersuite.google.com/app/apikey)

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:5173/ を開く

## 📁 プロジェクト構造

```
toon-app/
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── utils/          # ユーティリティ関数
│   ├── data/           # 問題データ・コンテンツ定義
│   ├── content/        # Markdown記事ファイル
│   ├── styles/         # 共通スタイル
│   └── App.tsx         # メインアプリ
├── docs/               # ドキュメント
├── public/             # 静的ファイル
└── README.md           # このファイル
```

## 📖 ドキュメント

詳細なドキュメントは `docs/` ディレクトリにあります：

- 📋 [プロジェクト概要](./docs/overview.md) - プロジェクトの目的と特徴
- 🛠️ [セットアップガイド](./docs/setup.md) - 詳細なインストール手順
- ✨ [機能説明](./docs/features.md) - アプリケーションの主要機能
- 🤖 [RAGボットガイド](./docs/rag-bot.md) - AI会話型問題選択の詳細
- 🔌 [APIドキュメント](./docs/api.md) - Gemini API統合
- 🏗️ [アーキテクチャ](./docs/architecture.md) - システム構成と設計
- 👨‍💻 [開発ガイド](./docs/development.md) - 開発者向けガイド

## 🎯 主な機能

### 🤖 RAGボット

Gemini APIを活用した高度なアシスタント機能です。2つのモードを搭載しています：

1.  **🎯 クイズレコメンドモード**:
    - ユーザーの要望（「ネットワークの問題を3問」など）を解析
    - 最適なクイズをデータベースから検索して提示

2.  **📚 RAG検索拡張生成モード**:
    - ユーザーの質問（「RAGとは？」「セキュリティ対策は？」など）に関連するアプリ内のMarkdown記事を検索
    - 記事の内容に基づいて、正確で分かりやすい回答を生成

```
ユーザー: ネットワークについて勉強したい
ボット: ネットワークに関連する問題を5問見つけました！
       1. TCPとUDPの違いについて...
       2. OSI参照モデルの7層...
       ...
       この問題セットでクイズを開始しますか？
```

### 📝 クイズモード

- **基本問題**: 初級レベル（問題1-10）
- **中級問題**: 標準レベル（問題11-20）
- **上級問題**: 高度な問題（問題21-30）
- **ランダム**: 全レベルからランダム出題

### 💡 学習支援

- 選択式問題（4択）
- 即時フィードバック
- 詳細な解説
- スコア管理

## 🛠 技術スタック

### コア
- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール

### スタイリング
- **Tailwind CSS** - ユーティリティファースト
- **Material UI** - UIコンポーネント
- **Emotion** - CSS-in-JS

### AI/機能
- **Google Gemini API** - AI会話
- **react-markdown** - Markdown描画
- **react-syntax-highlighter** - コードハイライト

## 🧪 スクリプト

```bash
# 開発サーバー
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview

# リント
npm run lint
```

## 📦 ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

## 🌐 デプロイ

### Vercel (推奨)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

環境変数 `VITE_GEMINI_KEY` を設定してください。

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

ビルドコマンド: `npm run build`
公開ディレクトリ: `dist`

## 🤝 コントリビューション

貢献を歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Google Gemini](https://ai.google.dev/) - AI機能の提供
- [React](https://reactjs.org/) - UIフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- すべてのオープンソースコントリビューター

## 📞 サポート

質問や問題がある場合は：

1. [ドキュメント](./docs/README.md)を確認
2. [Issue](https://github.com/Juna1013/toon-app/issues) を作成
3. [プルリクエスト](https://github.com/Juna1013/toon-app/pulls) でコントリビュート

---

Made with ❤️ by [Juna1013](https://github.com/Juna1013)
