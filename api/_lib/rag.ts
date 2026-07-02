/**
 * RAGパイプラインの中核ロジック（Vercel Function から利用）。
 * 事前計算済みのチャンク埋め込み（api/_data/embeddings.json）に対して
 * 質問ベクトルのコサイン類似度検索を行い、上位チャンクを根拠として回答を生成する。
 */
import fs from 'node:fs';
import { GoogleGenAI } from '@google/genai';

const GENERATION_MODEL = 'gemini-2.5-flash';
const TOP_K = 4;
const MIN_SIMILARITY = 0.5;

export interface RagSource {
  ref: number;
  docId: string;
  docTitle: string;
  heading: string;
  similarity: number;
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface EmbeddedChunk {
  id: string;
  docId: string;
  docTitle: string;
  heading: string;
  text: string;
  embedding: number[];
}

interface EmbeddingsFile {
  model: string;
  dimensions: number;
  chunks: EmbeddedChunk[];
}

const embeddingsUrl = new URL('../_data/embeddings.json', import.meta.url);
const embeddingsData: EmbeddingsFile = JSON.parse(fs.readFileSync(embeddingsUrl, 'utf8'));

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return new GoogleGenAI({ apiKey });
}

/** L2正規化（クエリ側は正規化されずに返るため必須） */
function normalize(vector: number[]): number[] {
  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  return vector.map((v) => v / norm);
}

/** 正規化済みベクトル同士なので内積＝コサイン類似度 */
function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

/** 質問をベクトル化し、類似度上位のチャンクを返す */
export async function retrieveChunks(question: string) {
  const ai = getClient();
  const response = await ai.models.embedContent({
    model: embeddingsData.model,
    contents: [question],
    config: {
      taskType: 'RETRIEVAL_QUERY',
      outputDimensionality: embeddingsData.dimensions,
    },
  });
  const values = response.embeddings?.[0]?.values;
  if (!values) {
    throw new Error('Failed to embed the question.');
  }
  const queryVector = normalize(values);

  return embeddingsData.chunks
    .map((chunk) => ({ chunk, similarity: dot(chunk.embedding, queryVector) }))
    .filter((item) => item.similarity >= MIN_SIMILARITY)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, TOP_K);
}

function formatHistory(history: ChatTurn[]): string {
  return history
    .slice(-4)
    .map((turn) => `${turn.role === 'user' ? 'ユーザー' : 'アシスタント'}: ${turn.content}`)
    .join('\n');
}

async function generate(prompt: string, maxOutputTokens: number): Promise<string> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: GENERATION_MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    // 展示用途では応答速度を優先し、thinkingを無効化する
    config: { maxOutputTokens, temperature: 0.1, thinkingConfig: { thinkingBudget: 0 } },
  });
  if (response.text === undefined) {
    throw new Error('No text in Gemini response.');
  }
  return response.text;
}

/** RAGモード: 検索した根拠チャンクに基づいて回答を生成する */
export async function answerWithRag(
  question: string,
  history: ChatTurn[],
): Promise<{ text: string; sources: RagSource[] }> {
  const retrieved = await retrieveChunks(question);

  const sources: RagSource[] = retrieved.map((item, i) => ({
    ref: i + 1,
    docId: item.chunk.docId,
    docTitle: item.chunk.docTitle,
    heading: item.chunk.heading,
    similarity: Number(item.similarity.toFixed(3)),
  }));

  const context = retrieved
    .map((item, i) => `[${i + 1}] ${item.chunk.docTitle} › ${item.chunk.heading}\n${item.chunk.text}`)
    .join('\n\n---\n\n');

  const prompt = `あなたは展示ブースのRAG（検索拡張生成）アシスタントです。以下の参考資料に基づいてユーザーの質問に答えてください。

【参考資料】
${context || '（関連する資料は見つかりませんでした）'}

【会話履歴】
${formatHistory(history)}
ユーザー: ${question}

【指示】
1. 参考資料の内容を根拠として回答し、根拠にした資料は文末に [1] のように番号で示してください。
2. 参考資料に答えがない場合は、その旨を明示したうえで一般的な知識として簡潔に補足してください。
3. 回答はMarkdown形式で見やすく整形してください（箇条書きなどを活用）。
4. 回答は親しみやすく、300字程度に収めてください。

応答:`;

  const text = await generate(prompt, 800);
  return { text, sources };
}

/** クイズレコメンドモード: 質問から検索パラメータを抽出する */
export async function recommendQuiz(question: string, history: ChatTurn[]): Promise<{ text: string }> {
  const prompt = `あなたはクイズレコメンドAIです。ユーザーの入力から最適なクイズを検索するためのパラメータを抽出してください。

【利用可能なトピック】ネットワーク、データベース、セキュリティ、アルゴリズム、プログラミング、システム、数学、開発手法、新技術

【会話履歴】
${formatHistory(history)}
ユーザー: ${question}

【指示】
1. ユーザーの入力に基づいて、以下の形式でのみ応答してください：
   SEARCH_QUERY: <検索キーワード>
   MAX_RESULTS: <1-10>
   DIFFICULTY: <basic|intermediate|advanced|all>
   (ユーザーへの短いメッセージ)

2. 雑談や挨拶の場合は、パラメータなしでメッセージのみ返してください。
3. メッセージは親しみやすく、100文字以内で記述してください。

応答:`;

  const text = await generate(prompt, 500);
  return { text };
}
