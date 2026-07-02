/**
 * チャットAPI（/api/chat）のクライアント。
 * Gemini API の呼び出しはすべてサーバー側（Vercel Function）で行うため、
 * フロントエンドは API キーを保持しない。
 */

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface RagSource {
  ref: number;
  docId: string;
  docTitle: string;
  heading: string;
  similarity: number;
}

export interface ChatResult {
  text: string;
  sources?: RagSource[];
}

export async function sendChat(
  mode: 'rag' | 'quiz',
  question: string,
  history: ChatTurn[],
): Promise<ChatResult> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, question, history }),
  });

  if (!response.ok) {
    throw new Error(`chat API error: ${response.status}`);
  }
  return response.json();
}
