# 🎓 Gemini Quiz App

> 🚀 **Google Gemini API搭載のインタラクティブな学習支援アプリケーション**  
> AIが対話しながら最適な問題を提案し、学習効率を最大化します。

<p align="center">
  <a>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white"/>
    <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
</p>

---

## 📖 概要

**Gemini Quiz App**は、応用情報技術者試験の学習を支援する、AI搭載の次世代クイズアプリケーションです。

従来の静的な問題形式ではなく、**Google Gemini APIを活用したAIアシスタント**が：
- 💬 自然な対話であなたの学習ニーズを理解
- 🎯 最適な問題を自動選択・提案
- 📚 アプリ内の技術記事を参照した詳細な解説を提供

まるで個人教師がそばにいるような、パーソナライズされた学習体験を実現します。

### 🎯 こんな方におすすめ

- 📝 **応用情報技術者試験の受験を考えている方**
- 🔰 **IT基礎知識を効率的に学びたい初学者**
- 💼 **スキマ時間に勉強したい社会人**
- 🎓 **最新のAI技術を活用した学習を体験したい方**

---

## 🎬 デモ

> **🔗 Live Demo**: [https://toon-app.vercel.app](https://toon-app.vercel.app) _(デプロイ済みの場合)_

### スクリーンショット

_※ スクリーンショットは後ほど追加予定_

---

## ✨ 主な特徴

### 🤖 1. AI会話型アシスタント（RAGボット）

最大の特徴は、**Gemini APIを活用した対話型学習支援**です。

#### 🎯 クイズレコメンドモード
自然な会話で学習したい内容を伝えると、AIが最適な問題をデータベースから検索して提案します。

```
例：「ネットワークについて勉強したい」
→ AIがネットワーク関連の問題を5問選んで提示
```

#### 📚 RAG（検索拡張生成）モード
技術的な質問をすると、アプリ内のMarkdown記事を検索し、その内容に基づいて詳細な回答を生成します。

```
例：「RAGとは何ですか？」
→ AIが関連記事を参照して分かりやすく解説
```

### � 2. 多様なクイズモード

- **基本問題**: IT基礎知識（問題1-10）
- **中級問題**: 応用レベル（問題11-20）
- **上級問題**: 高度な知識（問題21-30）
- **ランダム**: 全レベルからランダム出題
- **カスタマイズ**: 自分で問題を選択

### 🎨 3. 洗練されたUI/UX

- ✨ **Gemini風のチャットインターフェース**: 直感的で使いやすい
- 🏷️ **Zenn風のタグ表示**: 記事のトピックを視覚的に把握
- 🌈 **美しいグラデーション**: モダンなデザイン
- � **完全レスポンシブ**: スマホ・タブレット・PCに対応
- 💻 **Markdownサポート**: コードブロックも美しく表示

## 🚀 クイックスタート

### 📋 前提条件

以下がインストールされていることを確認してください：

- **Node.js**: バージョン 18以上 ([ダウンロード](https://nodejs.org/))
- **npm**: バージョン 9以上（Node.jsに同梱）
- **Gemini APIキー**: [Google AI Studio](https://makersuite.google.com/app/apikey) から無料で取得

### 📥 インストール手順

#### 1. リポジトリをクローン

```bash
git clone https://github.com/Juna1013/toon-app.git
cd toon-app
```

#### 2. 依存関係をインストール

```bash
npm install
```

#### 3. 環境変数を設定

プロジェクトルートに `.env` ファイルを作成し、以下を追加：

```bash
VITE_GEMINI_KEY=your_gemini_api_key_here
```

> 💡 **ヒント**: Gemini APIキーは [Google AI Studio](https://makersuite.google.com/app/apikey) から取得できます（無料）

#### 4. 開発サーバーを起動

```bash
npm run dev
```

#### 5. アプリにアクセス

ブラウザで http://localhost:5173/ を開いてください 🎉

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

---

## 🎮 使い方

### 🏠 ダッシュボード

アプリを起動すると、以下のタイルが表示されます：

1. **🤖 RAG Quiz Recommend** - AIアシスタントと対話
2. **📚 記事一覧** - 技術記事を閲覧
3. **👥 メンバー紹介** - 開発チームの紹介
4. **📝 クイズモード選択** - 基本・中級・上級・ランダム

### 💬 AIアシスタントの使い方

#### ステップ1: モード選択
「RAG Quiz Recommend」タイルをクリックし、モードを選択：
- **🎯 クイズレコメンド**: 問題を探す
- **📚 RAG検索**: 技術的な質問をする

#### ステップ2: 対話開始
自然な日本語で話しかけてください：

**クイズレコメンドの例**:
```
「セキュリティについて勉強したい」
「データベースの問題を3問ください」
「初級レベルの問題をランダムに」
```

**RAG検索の例**:
```
「RAGとは何ですか？」
「OSI参照モデルについて教えて」
「クラウドとオンプレミスの違いは？」
```

#### ステップ3: 問題に挑戦
AIが提案した問題セットで「クイズを開始」をクリック！

### 📝 通常のクイズモード

1. ダッシュボードから難易度を選択
2. 問題を読んで4択から回答を選択
3. 即座にフィードバックと解説を確認
4. 次の問題に進む





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

プロジェクトへの貢献を心から歓迎します！バグ報告、機能提案、ドキュメント改善など、どんな貢献も大歓迎です。

### 貢献方法

1. **Fork** - このリポジトリをフォーク
2. **Branch** - 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. **Commit** - 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. **Push** - ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. **Pull Request** - プルリクエストを作成

### 貢献のアイデア

- 🐛 バグ修正
- ✨ 新機能の追加
- 📝 ドキュメントの改善
- 🎨 UI/UXの向上
- 🌍 多言語対応
- ✅ テストの追加

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 💡 プロジェクトの背景

このプロジェクトは、**応用情報技術者試験の学習をもっと楽しく、効率的にしたい**という思いから始まりました。

従来の問題集は静的で、学習者のニーズに合わせたパーソナライズが難しいという課題がありました。そこで、最新のAI技術（Google Gemini API）を活用し、**対話しながら学べる**新しい学習体験を実現しました。

## 🙏 謝辞

このプロジェクトは、以下の素晴らしい技術・サービスによって支えられています：

- 🤖 [Google Gemini API](https://ai.google.dev/) - 強力なAI機能
- ⚛️ [React](https://reactjs.org/) - UIライブラリ
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - スタイリングフレームワーク
- ⚡ [Vite](https://vitejs.dev/) - 高速ビルドツール
- 📝 [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown描画
- 🎭 [Material-UI](https://mui.com/) - UIコンポーネント
- 💻 すべてのオープンソースコントリビューター

## 📞 サポート

質問や問題がある場合は：

1. [ドキュメント](./docs/README.md)を確認
2. [Issue](https://github.com/Juna1013/toon-app/issues) を作成
3. [プルリクエスト](https://github.com/Juna1013/toon-app/pulls) でコントリビュート

---

## 👤 作者

**Juna1013**

- GitHub: [@Juna1013](https://github.com/Juna1013)
- Email: _リポジトリのメールアドレスを参照_

---

<div align="center">
  <p>Made with ❤️ and ☕ by <a href="https://github.com/Juna1013">Juna1013</a></p>
  <p>⭐ このプロジェクトが役に立ったら、スターをつけていただけると嬉しいです！</p>
</div>
