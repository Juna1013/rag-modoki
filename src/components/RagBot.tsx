import React, { useState, useRef, useEffect } from 'react';
import { parseTOON, type QuizData } from '../utils/toonParser';
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
      content: 'こんにちは！RAGボットです。\n希望するトピックやキーワードを教えてください。\n(例: ネットワーク、データベース、セキュリティ)'
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

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const selectedQuestions = retrieveRelevant(userMessage.content, 5);

      if (selectedQuestions.length === 0) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '申し訳ありません。条件に合う問題が見つかりませんでした。\n別のキーワードで試してみてください。'
        }]);
      } else {
        const formattedResults = selectedQuestions.map((q) =>
          `・${q.question.substring(0, 40)}...`
        ).join('\n');

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `「${userMessage.content}」に関連する問題を${selectedQuestions.length}問見つけました！\n\n${formattedResults}\n\nこの問題セットでクイズを開始しますか？`,
          questions: selectedQuestions
        }]);
      }
    } catch (e) {
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
    <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[600px] min-h-[400px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl shadow-sm">
          🤖
        </div>
        <div>
          <h3 className="font-bold text-gray-800">RAG Quiz Bot</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
            >
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {msg.content}
              </pre>

              {msg.questions && onStartQuiz && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onStartQuiz(msg.questions!)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
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
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="トピックを入力..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          AIが最適な問題を検索して提案します
        </p>
      </div>
    </div>
  );
};

export default RagBot;
