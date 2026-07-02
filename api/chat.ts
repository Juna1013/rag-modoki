/**
 * チャットAPI（Vercel Function）
 * POST /api/chat
 *   { mode: 'rag',  question: string, history?: ChatTurn[] } → { text, sources }
 *   { mode: 'quiz', question: string, history?: ChatTurn[] } → { text }
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { answerWithRag, recommendQuiz, type ChatTurn } from './_lib/rag.js';

const MAX_QUESTION_LENGTH = 500;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { mode, question, history } = (req.body ?? {}) as {
    mode?: string;
    question?: string;
    history?: ChatTurn[];
  };

  if (!question || typeof question !== 'string' || question.length > MAX_QUESTION_LENGTH) {
    res.status(400).json({ error: 'Invalid question' });
    return;
  }
  if (mode !== 'rag' && mode !== 'quiz') {
    res.status(400).json({ error: 'Invalid mode' });
    return;
  }

  const turns: ChatTurn[] = Array.isArray(history)
    ? history
        .filter((t) => (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
        .slice(-4)
    : [];

  try {
    const result =
      mode === 'rag' ? await answerWithRag(question, turns) : await recommendQuiz(question, turns);
    res.status(200).json(result);
  } catch (error) {
    console.error('chat API error:', error);
    res.status(500).json({ error: 'Failed to generate a response' });
  }
}
