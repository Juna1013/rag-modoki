import React, { useState, useRef, useEffect } from 'react';
import { parseTOON, type QuizData } from '../utils/toonParser';
import { callGeminiAPI } from '../utils/gemini';
import quizRaw from '../data/quizData.toon?raw';

interface RagBotProps {
  onStartQuiz?: (questions: QuizData[]) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  questions?: QuizData[];
}

const RagBot: React.FC<RagBotProps> = ({ onStartQuiz }) => {
  const quizzes: QuizData[] = parseTOON(quizRaw as string);
  const advanced = quizzes.filter(q => q.id >= 21 && q.id <= 30);

  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'こんにちは！RAGボットです😊\n\n学びたいトピックを教えてください。\n会話しながら最適な問題を選びます！\n\n💡 例：「ネットワーク」「簡単なデータベース」「セキュリティ10問」\n❓ 使い方が分からない時は「ヘルプ」と入力してください'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function retrieveRelevant(userQuery: string, maxDocs = 5) {
    // 全問題から検索（基本・中級・上級すべて）
    const allQuestions = quizzes;

    if (!userQuery.trim()) {
      return [...advanced].sort(() => Math.random() - 0.5).slice(0, maxDocs);
    }

    // キーワードマッピング（日本語の類義語・関連語を含める）
    const keywordMap: { [key: string]: string[] } = {
      'ネットワーク': ['tcp', 'ip', 'bgp', 'osi', 'プロトコル', 'ipsec', 'smtp', 'pop3', 'http', 'ftp'],
      'データベース': ['rdbms', 'sql', 'acid', '正規化', '主キー', 'トランザクション'],
      'セキュリティ': ['暗号', 'rsa', '楕円曲線', 'ファイアウォール', '認証', 'ipsec', '不正アクセス'],
      'アルゴリズム': ['ソート', 'クイック', 'ハフマン', '計算量', '符号化', '圧縮'],
      'プログラミング': ['ループ', '分岐', '順次', 'uml', 'テスト', 'ホワイトボックス', 'ブラック'],
      'システム': ['os', 'cpu', 'デッドロック', 'プロセス', 'マイクロサービス', 'docker'],
      '数学': ['2進数', '10進数', '変換', '計算', '素因数分解'],
      '開発手法': ['pmbok', 'cmmi', 'devops', '継続的', 'アジャイル'],
      '新技術': ['ブロックチェーン', '機械学習', 'mapreduce', 'cap定理', 'docker']
    };

    const terms = userQuery
      .toLowerCase()
      .split(/[、,，\s]+/)
      .filter(Boolean);

    // 拡張キーワード作成
    const expandedTerms = new Set(terms);
    terms.forEach(term => {
      Object.entries(keywordMap).forEach(([category, keywords]) => {
        if (keywords.some(k => term.includes(k) || k.includes(term))) {
          keywords.forEach(k => expandedTerms.add(k));
          expandedTerms.add(category);
        }
      });
    });

    const scored = allQuestions.map(q => {
      const text = (q.question + ' ' + q.explanation + ' ' + q.choices.join(' ')).toLowerCase();
      let score = 0;

      // 完全一致チェック（高スコア）
      [...expandedTerms].forEach(term => {
        const termLower = term.toLowerCase();
        if (text.includes(termLower)) {
          score += 3; // 完全一致は高得点
        }
        // 部分一致チェック
        if (termLower.length >= 3) {
          const regex = new RegExp(termLower.split('').join('.*'), 'i');
          if (regex.test(text)) {
            score += 1; // 部分一致は低得点
          }
        }
      });

      return { q, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const selected = scored.filter(s => s.score > 0).map(s => s.q);

    if (selected.length >= maxDocs) {
      return selected.slice(0, maxDocs);
    }

    // 関連性のある問題が少ない場合、上級問題からランダムに補完
    const remaining = [...advanced]
      .filter(a => !selected.includes(a))
      .sort(() => Math.random() - 0.5);

    return selected.concat(remaining.slice(0, Math.max(0, maxDocs - selected.length)));
  }


  // 難易度に応じた問題フィルタリング
  const filterByDifficulty = (questions: QuizData[], difficulty: string): QuizData[] => {
    if (difficulty === 'basic') {
      return questions.filter(q => q.id >= 1 && q.id <= 10);
    } else if (difficulty === 'intermediate') {
      return questions.filter(q => q.id >= 11 && q.id <= 20);
    } else if (difficulty === 'advanced') {
      return questions.filter(q => q.id >= 21 && q.id <= 30);
    }
    return questions;
  };

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = query;
    setQuery('');
    setLoading(true);

    try {
      // 簡易的なパターンマッチングによるフォールバック
      const input = userInput.toLowerCase().trim();
      let shouldUseGemini = true;
      let fallbackResponse = '';
      let searchQuery = userInput;
      let maxResults = 5;
      let difficulty: string = 'all';

      // 挨拶パターン
      if (/^(こんにちは|こんばんは|おはよう|はじめまして|よろしく|hello|hi)/.test(input)) {
        fallbackResponse = 'こんにちは！😊\nどのようなトピックの問題に挑戦したいですか？';
        shouldUseGemini = false;
      }
      // ありがとうパターン
      else if (/^(ありがとう|あり|thanks)/.test(input)) {
        fallbackResponse = 'どういたしまして！✨\n他に気になるトピックがあれば教えてください。';
        shouldUseGemini = false;
      }
      // 数量の抽出
      const numberMatch = input.match(/(\d+)(問|個|つ)/);
      if (numberMatch) {
        maxResults = Math.min(Math.max(parseInt(numberMatch[1]), 1), 10);
      }

      // Gemini APIを試行
      let aiResponse = '';
      if (shouldUseGemini) {
        try {
          const availableTopics = Array.from(new Set(
            quizzes.map(q => {
              const topics = [];
              if (q.question.toLowerCase().includes('ネットワーク') || q.question.toLowerCase().includes('tcp') || q.question.toLowerCase().includes('ip')) topics.push('ネットワーク');
              if (q.question.toLowerCase().includes('データベース') || q.question.toLowerCase().includes('sql')) topics.push('データベース');
              if (q.question.toLowerCase().includes('セキュリティ') || q.question.toLowerCase().includes('暗号')) topics.push('セキュリティ');
              if (q.question.toLowerCase().includes('アルゴリズム') || q.question.toLowerCase().includes('ソート')) topics.push('アルゴリズム');
              return topics;
            }).flat()
          )).join('、');

          const conversationHistory = messages
            .slice(-4)
            .map(m => `${m.role === 'user' ? 'ユーザー' : 'アシスタント'}: ${m.content}`)
            .join('\n');

          const prompt = `あなたはクイズ学習アシスタントです。

【利用可能なトピック】${availableTopics}

【会話履歴】
${conversationHistory}
ユーザー: ${userInput}

【指示】
1. 100文字以内で簡潔に応答
2. 問題を提案する場合:
   SEARCH_QUERY: <検索キーワード>
   MAX_RESULTS: <1-10>
   DIFFICULTY: <basic|intermediate|advanced|all>

応答:`;

          aiResponse = await callGeminiAPI(prompt);
        } catch (apiError) {
          console.warn('Gemini API failed, using fallback:', apiError);
          // Gemini APIが失敗した場合、フォールバック
          aiResponse = '';
        }
      }

      // AIの応答またはフォールバックを使用
      const responseToUse = aiResponse || fallbackResponse;

      if (!responseToUse) {
        // デフォルト: 問題検索を実行
        let selectedQuestions = retrieveRelevant(searchQuery, maxResults);

        if (selectedQuestions.length === 0) {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '申し訳ありません。条件に合う問題が見つかりませんでした。😅\n\n別のトピックを試してみてください。'
          }]);
        } else {
          const formattedResults = selectedQuestions.map((q, index) =>
            `${index + 1}. ${q.question.substring(0, 45)}...`
          ).join('\n');

          const responseText = `「${userInput}」に関連する問題を${selectedQuestions.length}問見つけました！✨\n\n${formattedResults}\n\nこの問題セットでクイズを開始しますか？`;

          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseText,
            questions: selectedQuestions
          }]);
        }
      } else {
        // AI応答から検索パラメータを抽出
        const searchMatch = responseToUse.match(/SEARCH_QUERY:\s*(.+)/);
        const maxResultsMatch = responseToUse.match(/MAX_RESULTS:\s*(\d+)/);
        const difficultyMatch = responseToUse.match(/DIFFICULTY:\s*(basic|intermediate|advanced|all)/);

        let cleanResponse = responseToUse
          .replace(/SEARCH_QUERY:.+/g, '')
          .replace(/MAX_RESULTS:.+/g, '')
          .replace(/DIFFICULTY:.+/g, '')
          .trim();

        // 問題検索が必要な場合
        if (searchMatch) {
          searchQuery = searchMatch[1].trim();
          maxResults = maxResultsMatch ? Math.min(parseInt(maxResultsMatch[1]), 10) : maxResults;
          difficulty = difficultyMatch ? difficultyMatch[1] : 'all';

          let selectedQuestions = retrieveRelevant(searchQuery, maxResults);

          if (difficulty !== 'all') {
            selectedQuestions = filterByDifficulty(selectedQuestions, difficulty);
          }

          if (selectedQuestions.length === 0) {
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: cleanResponse || '問題が見つかりませんでした。別のトピックを試してください。'
            }]);
          } else {
            const formattedResults = selectedQuestions.map((q, index) =>
              `${index + 1}. ${q.question.substring(0, 45)}...`
            ).join('\n');

            const responseText = `${cleanResponse}\n\n見つかった問題：\n${formattedResults}\n\nクイズを開始しますか？`;

            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: responseText,
              questions: selectedQuestions
            }]);
          }
        } else {
          // 会話のみ
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: cleanResponse
          }]);
        }
      }
    } catch (e) {
      console.error('Error:', e);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'エラーが発生しました。もう一度お試しください。'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[600px] min-h-[400px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${msg.role === 'user' ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}
          >
            <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white text-sm font-semibold">
                    U
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-sm flex items-center justify-center text-white text-base">
                    🤖
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-gray-800">
                  {msg.content}
                </pre>

                {msg.questions && onStartQuiz && (
                  <div className="mt-4">
                    <button
                      onClick={() => onStartQuiz(msg.questions!)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                      <span>クイズを開始する</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="bg-gray-50 border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-sm flex items-center justify-center text-white text-base">
                  🤖
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="トピックを入力..."
              className="flex-1 border border-gray-300 rounded-3xl px-5 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-sm sm:text-base resize-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={!query.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AIは完璧ではありません。問題選択が最適でない場合もあります
          </p>
        </div>
      </div>
    </div>
  );
};

export default RagBot;
