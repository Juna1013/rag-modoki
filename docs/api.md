# APIドキュメント

## 🔌 Google Gemini API

このアプリケーションは、Google Gemini 2.0 Flash APIを使用してAI会話機能を実現しています。

## 📋 セットアップ

### APIキーの取得

1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. Googleアカウントでサインイン
3. "Create API Key" をクリック
4. プロジェクトを選択（または新規作成）
5. 生成されたAPIキーをコピー

### 環境変数の設定

`.env` ファイルに以下を追加：

```bash
VITE_GEMINI_KEY=your_api_key_here
```

## 🛠 実装詳細

### API呼び出しラッパー

**ファイル**: `src/utils/gemini.ts`

```typescript
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY: string = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const callGeminiAPI = async (prompt: string): Promise<string> => {
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
            {
                role: 'user',
                parts: [
                    { text: prompt }
                ]
            }
        ],
        config: {
            maxOutputTokens: 500,
            temperature: 0.1,
        },
    });

    if (response.text === undefined) {
        throw new Error("Failed to generate text: No response.");
    }
    
    return response.text;
}
```

### パラメータ説明

#### `model`
使用するAIモデル。

**値**: `"gemini-2.0-flash"`
- 高速で効率的
- 低コスト
- 会話に最適

#### `contents`
AIに送信するメッセージデータ。

**型**: `Array<{ role: string, parts: Array<{ text: string }> }>`

**構造**:
- `role`: メッセージの送信者（'user' または 'model'）
- `parts`: メッセージの内容（テキストなど）

#### `maxOutputTokens`
AIが生成するテキストの最大トークン数。

**値**: `500`
- 約300-400文字の日本語に相当
- 簡潔な応答を促す

#### `temperature`
応答のランダム性を制御。

**値**: `0.1`
- `0.0`: 最も決定論的（同じ入力に同じ出力）
- `1.0`: 最も創造的（ランダム）
- `0.1`: 一貫性重視、わずかな変化を許容

## 📡 使用例

### 基本的な呼び出し

```typescript
const response = await callGeminiAPI("こんにちは");
console.log(response); // "こんにちは！どのようなトピックについて学びたいですか？"
```

### RAGボットでの使用

RAGボットでは、モードに応じて異なるプロンプトを使用します。

#### 1. クイズレコメンドモード

```typescript
const prompt = `あなたはクイズレコメンドAIです。
ユーザーの入力から最適なクイズを検索するためのパラメータを抽出してください。

【利用可能なトピック】ネットワーク、データベース...

【会話履歴】
${conversationHistory}
ユーザー: ${userInput}

【指示】
以下の形式で応答:
SEARCH_QUERY: <検索キーワード>
MAX_RESULTS: <1-10>
DIFFICULTY: <basic|intermediate|advanced|all>
(ユーザーへのメッセージ)`;
```

#### 2. RAG検索拡張生成モード

```typescript
const prompt = `あなたはRAG（検索拡張生成）AIです。
以下の参考資料に基づいてユーザーの質問に答えてください。

【参考資料（Markdown記事）】
${relevantContext}

【会話履歴】
${conversationHistory}
ユーザー: ${userInput}

【指示】
1. 参考資料の内容に基づいて回答
2. 参考資料にない情報は一般的な知識として回答
3. Markdown形式で見やすく整形`;
```

### エラーハンドリング

```typescript
try {
    const response = await callGeminiAPI(prompt);
    // 成功時の処理
} catch (error) {
    console.error('Gemini API Error:', error);
    // フォールバック処理
    const fallbackResponse = "申し訳ありません。現在AIが利用できません。";
}
```

## 💰 料金と制限

### 無料枠
- **リクエスト数**: 1,500リクエスト/日
- **トークン数**: 制限なし（無料枠内）
- **レート制限**: 15 RPM (Requests Per Minute)

### 有料プラン
詳細は[Google AI Pricing](https://ai.google.dev/pricing)を参照。

### クォータ管理

APIキーのクォータを確認：
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを選択
3. "APIs & Services" > "Quotas" を確認

## 🔒 セキュリティベストプラクティス

### 1. APIキーの保護

❌ **悪い例**: コードに直接埋め込む
```typescript
const apiKey = "AIzaSyC..."; // 絶対にNG！
```

✅ **良い例**: 環境変数を使用
```typescript
const apiKey = import.meta.env.VITE_GEMINI_KEY;
```

### 2. Gitから除外

`.gitignore` に以下を追加：
```
.env
.env.local
```

### 3. クライアント側の注意

現在の実装では、APIキーがクライアント側で使用されています。

**リスク**:
- ブラウザの開発者ツールでAPIキーが見える可能性

**対策**:
- プロダクション環境では、APIキーをバックエンドに移動
- Vercel/NetlifyのServerless Functionsを使用
- API Gateway経由でアクセス

### 4. レート制限の実装

```typescript
// 簡易的なレート制限
let lastCallTime = 0;
const MIN_INTERVAL = 1000; // 1秒

export const callGeminiAPI = async (prompt: string): Promise<string> => {
    const now = Date.now();
    const elapsed = now - lastCallTime;
    
    if (elapsed < MIN_INTERVAL) {
        await new Promise(resolve => setTimeout(resolve, MIN_INTERVAL - elapsed));
    }
    
    lastCallTime = Date.now();
    // API呼び出し処理...
}
```

## 🐛 エラーコードと対処法

### よくあるエラー

#### `401 Unauthorized`
**原因**: APIキーが無効または未設定

**対処法**:
1. `.env`ファイルの存在を確認
2. APIキーが正しいか確認
3. サーバーを再起動 (`npm run dev`)

#### `429 Too Many Requests`
**原因**: レート制限を超過

**対処法**:
1. リクエスト頻度を下げる
2. キャッシングを実装
3. 有料プランにアップグレード

#### `500 Internal Server Error`
**原因**: Gemini API側の問題

**対処法**:
1. しばらく待ってから再試行
2. フォールバック機能を使用
3. [Google Cloud Status](https://status.cloud.google.com/) を確認

#### `Response text is undefined`
**原因**: AIが応答を生成できなかった

**対処法**:
```typescript
if (response.text === undefined) {
    console.error("No response text from Gemini");
    throw new Error("Failed to generate text");
}
```

## 📊 パフォーマンス最適化

### 1. プロンプトの最適化

❌ **冗長なプロンプト**:
```typescript
const prompt = `あなたは親切で丁寧なクイズ学習アシスタントです。ユーザーの質問に対して、わかりやすく、丁寧に、かつ簡潔に答えてください。また、必要に応じて例を示したり、補足説明を加えたりしてください。さらに...`;
```

✅ **簡潔なプロンプト**:
```typescript
const prompt = `クイズアシスタントとして100文字以内で応答:
ユーザー: ${userInput}`;
```

### 2. 会話履歴の制限

```typescript
// 最新4メッセージのみ保持
const conversationHistory = messages
    .slice(-4)  // メモリとトークン数を節約
    .map(m => `${m.role}: ${m.content}`)
    .join('\n');
```

### 3. キャッシング

```typescript
const responseCache = new Map<string, string>();

export const callGeminiAPI = async (prompt: string): Promise<string> => {
    // キャッシュチェック
    if (responseCache.has(prompt)) {
        return responseCache.get(prompt)!;
    }
    
    const response = await genAI.models.generateContent({...});
    
    // キャッシュに保存
    responseCache.set(prompt, response.text);
    
    return response.text;
}
```

## 🔄 代替API

Gemini APIが利用できない場合の代替案：

### 1. OpenAI GPT
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
});
```

### 2. Anthropic Claude
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    messages: [{ role: "user", content: prompt }],
});
```

## 📚 参考資料

- [Google AI for Developers](https://ai.google.dev/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google GenAI SDK](https://github.com/google/generative-ai-js)
- [Pricing](https://ai.google.dev/pricing)
