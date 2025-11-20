# toon-app

## プロジェクト概要

このプロジェクトは、Google Gemini APIを活用したインタラクティブなクイズアプリケーションです。
ユーザーはクイズを通じて知識を確認できるほか、RAG（検索拡張生成）技術を用いたチャットボット機能により、関連情報について深く学習することができます。
モダンなUI/UXデザインを採用し、直感的で魅力的な学習体験を提供します。

## 技術スタック

### コアフレームワーク & ビルドツール
- **React (v19)**: UIライブラリ
- **TypeScript**: 静的型付け
- **Vite**: 高速なビルドツール・開発サーバー

### UI & スタイリング
- **Material UI (MUI)**: UIコンポーネントライブラリ
- **Tailwind CSS**: ユーティリティファーストCSS
- **Emotion**: CSS-in-JS (MUI依存)

### 機能・その他
- **Google GenAI SDK**: 生成AI機能 (Gemini)
- **React Markdown**: Markdownレンダリング
- **React Syntax Highlighter**: コードハイライト

### 開発ツール
- **ESLint**: コード品質チェック

## Gemini RAG Bot (環境変数設定)

このアプリの RAG ボット機能は外部の Gemini（もしくは類似の生成 API）を呼び出します。ローカルで動作させるにはプロジェクトルートに `.env` ファイルを作成し、以下の環境変数を追加してください（Vite を使用しているため先頭に `VITE_` を付けます）。

```
VITE_GEMINI_API_URL=https://your-gemini-endpoint.example/v1/generate
VITE_GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

注: 実際の Gemini のエンドポイント/リクエスト形式はプロバイダーによって異なります。`src/components/RagBot.tsx` の fetch 呼び出しは汎用的な JSON body (`{ prompt, max_tokens, temperature }`) を送信します。必要に応じてエンドポイントに合わせて調整してください。

開発サーバーを再起動して環境変数を反映してください:

```bash
npm run dev
```

