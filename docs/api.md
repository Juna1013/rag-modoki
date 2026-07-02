# APIドキュメント

## 🔌 構成

Gemini API の呼び出しはすべてサーバー側（Vercel Functions）で行います。フロントエンドは `/api/chat` を呼び出すだけで、API キーを保持しません。

| 用途 | モデル |
| --- | --- |
| 回答・意図抽出の生成 | gemini-2.5-flash |
| 記事チャンク・質問の埋め込み | gemini-embedding-001（768次元） |

## 📋 セットアップ

### APIキーの取得

1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. Googleアカウントでサインイン
3. "Create API Key" をクリックしてキーを生成

### 環境変数の設定

ローカルでは `.env` に、Vercel ではプロジェクトの環境変数に設定します：

```bash
GEMINI_API_KEY=your_api_key_here
```

ローカル開発で API 関数を動かすには `npx vercel dev` を使用します（`npm run dev` は UI のみ）。

## 🛠 エンドポイント

### POST /api/chat

チャットの統一エンドポイントです。**ファイル**: [api/chat.ts](../api/chat.ts)

#### リクエスト

```json
{
  "mode": "rag",
  "question": "RAGでハルシネーションが減るのはなぜ？",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `mode` | `"rag"` \| `"quiz"` | RAG検索モード / クイズレコメンドモード |
| `question` | `string` | ユーザーの質問（500文字まで） |
| `history` | `ChatTurn[]`（省略可） | 直近の会話履歴（最大4件を使用） |

#### レスポンス（mode: "rag"）

```json
{
  "text": "RAGでは回答の根拠となる資料を検索して渡すため…[1]",
  "sources": [
    {
      "ref": 1,
      "docId": "rag-explanation",
      "docTitle": "RAG（検索拡張生成）とは",
      "heading": "RAGが必要とされる理由 › ② ハルシネーション（事実誤認）が発生",
      "similarity": 0.712
    }
  ]
}
```

#### レスポンス（mode: "quiz"）

Gemini が抽出した検索パラメータを含むテキストを返し、クライアント側でパースしてクイズ検索に使用します。

```json
{
  "text": "SEARCH_QUERY: ネットワーク\nMAX_RESULTS: 3\nDIFFICULTY: all\nネットワークの問題を3問探しますね！"
}
```

#### エラー

| ステータス | 意味 |
| --- | --- |
| 400 | `mode` または `question` が不正 |
| 405 | POST 以外のメソッド |
| 500 | Gemini API の呼び出しに失敗 |

## 🔍 RAGパイプラインの内部

コアロジックは [api/_lib/rag.ts](../api/_lib/rag.ts) にあります。

1. **チャンク埋め込みの読み込み** — `npm run embed`（[scripts/build-embeddings.mjs](../scripts/build-embeddings.mjs)）が事前計算した `api/_data/embeddings.json` を読み込む
2. **質問の埋め込み** — `taskType: RETRIEVAL_QUERY` でベクトル化し、L2正規化
3. **類似度検索** — 全チャンクとの内積（＝コサイン類似度）を計算し、しきい値 0.5 以上の上位 4 件を採用
4. **プロンプト構築** — 採用チャンクを出典番号付きで参考資料としてプロンプトへ埋め込む
5. **生成** — gemini-2.5-flash が根拠付きの回答を生成し、出典一覧とともに返す

記事（`src/content/*.md`）を更新した場合は `npm run embed` を再実行して埋め込みを更新してください。

## 🔒 セキュリティ

- API キーはサーバー側の環境変数のみで使用し、フロントエンドのバンドルに含まれません
- `question` は長さを検証し、`history` は直近 4 件までに制限しています
