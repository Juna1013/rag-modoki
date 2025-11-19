# toon-app

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

