import React, { useState, useRef, useEffect } from 'react';
import { parseTOON, type QuizData } from '../../utils/toonParser';
import { callGeminiAPI } from '../../utils/gemini';
import quizRaw from '../../data/quiz/quizData.toon?raw';

// Markdownコンテンツのインポート
import cybersecurityMd from '../../content/cybersecurity.md?raw';
import cloudComparisonMd from '../../content/cloud-comparison.md?raw';
import ragExplanationMd from '../../content/rag-explanation.md?raw';
import opencvScanMd from '../../content/opencv-scan.md?raw';

interface RagBotProps {
  onStartQuiz?: (questions: QuizData[]) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  questions?: QuizData[];
}

interface Document {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

const RagBot: React.FC<RagBotProps> = ({ onStartQuiz }) => {
  const quizzes: QuizData[] = parseTOON(quizRaw as string);
  const advanced = quizzes.filter(q => q.id >= 67 && q.id <= 100);

  // ドキュメントデータベースの構築
  const documents: Document[] = [
    {
      id: 'security',
      title: '2025年度のサイバーセキュリティ事案',
      content: cybersecurityMd,
      keywords: ['セキュリティ', 'サイバー', '攻撃', '脆弱性', 'ランサムウェア', 'ゼロデイ', 'サプライチェーン']
    },
    {
      id: 'cloud',
      title: 'クラウドとオンプレミス比較',
      content: cloudComparisonMd,
      keywords: ['クラウド', 'オンプレミス', 'AWS', 'Azure', 'GCP', 'コスト', '拡張性', 'セキュリティ']
    },
    {
      id: 'rag',
      title: 'RAGの解説',
      content: ragExplanationMd,
      keywords: ['RAG', '検索拡張生成', 'LLM', 'AI', 'ハルシネーション', 'ベクトル', '埋め込み']
    },
    {
      id: 'opencv',
      title: '紙アンケートのOpenCVによるスキャン',
      content: opencvScanMd,
      keywords: ['OpenCV', '画像処理', 'スキャン', 'アンケート', 'OCR', 'Python', '輪郭']
    }
  ];

  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'こんにちは！RAGボットです😊\n\nアプリ内の記事内容について質問したり、クイズを出題したりできます。\n\n💡 例：\n・「RAGって何？」\n・「最近のセキュリティ事案は？」\n・「ネットワークの問題を出して」'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ドキュメント検索（簡易版）
  function retrieveDocuments(userQuery: string): string {
    const queryLower = userQuery.toLowerCase();

    // キーワードマッチングでスコアリング
    const scoredDocs = documents.map(doc => {
      let score = 0;
      // タイトルの一致
      if (doc.title.toLowerCase().includes(queryLower)) score += 5;

      // キーワードの一致
      doc.keywords.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) score += 3;
      });

      // 本文の部分一致（簡易）
      if (doc.content.toLowerCase().includes(queryLower)) score += 1;

      return { doc, score };
    });

    // スコアが高い順にソートし、スコアが0より大きいものを選択
    const relevantDocs = scoredDocs
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.doc);

    // 上位2件のドキュメントを返す（なければ空文字）
    if (relevantDocs.length === 0) return '';

    return relevantDocs.slice(0, 2).map(doc =>
      `【タイトル: ${doc.title}】\n${doc.content}\n`
    ).join('\n---\n');
  }

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
      return questions.filter(q => q.id >= 1 && q.id <= 33);
    } else if (difficulty === 'intermediate') {
      return questions.filter(q => q.id >= 34 && q.id <= 66);
    } else if (difficulty === 'advanced') {
      return questions.filter(q => q.id >= 67 && q.id <= 100);
    }
    return questions;
  };

  const [mode, setMode] = useState<'quiz' | 'rag'>('quiz');

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
        fallbackResponse = 'こんにちは！😊\n何かお手伝いしましょうか？';
        shouldUseGemini = false;
      }
      // ありがとうパターン
      else if (/^(ありがとう|あり|thanks)/.test(input)) {
        fallbackResponse = 'どういたしまして！✨';
        shouldUseGemini = false;
      }

      // クイズモードの場合のみ数量抽出を行う
      if (mode === 'quiz') {
        const numberMatch = input.match(/(\d+)(問|個|つ)/);
        if (numberMatch) {
          maxResults = Math.min(Math.max(parseInt(numberMatch[1]), 1), 10);
        }
      }

      // Gemini APIを試行
      let aiResponse = '';
      if (shouldUseGemini) {
        try {
          const conversationHistory = messages
            .slice(-4)
            .map(m => `${m.role === 'user' ? 'ユーザー' : 'アシスタント'}: ${m.content}`)
            .join('\n');

          let prompt = '';

          if (mode === 'quiz') {
            // クイズレコメンドモードのプロンプト
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

            prompt = `あなたはクイズレコメンドAIです。ユーザーの入力から最適なクイズを検索するためのパラメータを抽出してください。

【利用可能なトピック】${availableTopics}

【会話履歴】
${conversationHistory}
ユーザー: ${userInput}

【指示】
1. ユーザーの入力に基づいて、以下の形式でのみ応答してください：
   SEARCH_QUERY: <検索キーワード>
   MAX_RESULTS: <1-10>
   DIFFICULTY: <basic|intermediate|advanced|all>
   (ユーザーへの短いメッセージ)

2. 雑談や挨拶の場合は、パラメータなしでメッセージのみ返してください。
3. メッセージは親しみやすく、100文字以内で記述してください。

応答:`;
          } else {
            // RAG検索拡張生成モードのプロンプト
            const relevantContext = retrieveDocuments(userInput);

            prompt = `あなたはRAG（検索拡張生成）AIです。以下の参考資料に基づいてユーザーの質問に答えてください。

【参考資料（Markdown記事）】
${relevantContext || '（関連する資料は見つかりませんでした。一般的な知識で回答してください。）'}

【会話履歴】
${conversationHistory}
ユーザー: ${userInput}

【指示】
1. 【参考資料】の内容に基づいて回答してください。
2. 参考資料にない情報は、一般的な知識として答えてください。
3. 回答はMarkdown形式で見やすく整形してください（箇条書きなどを活用）。
4. クイズの出題は行わないでください。
5. 回答は親しみやすく、簡潔に（300文字程度）してください。

応答:`;
          }

          aiResponse = await callGeminiAPI(prompt);
        } catch (apiError) {
          console.warn('Gemini API failed, using fallback:', apiError);
          aiResponse = '';
        }
      }

      // AIの応答またはフォールバックを使用
      const responseToUse = aiResponse || fallbackResponse;

      if (!responseToUse) {
        // フォールバック処理
        if (mode === 'quiz') {
          const selectedQuestions = retrieveRelevant(searchQuery, maxResults);
          if (selectedQuestions.length === 0) {
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: '申し訳ありません。条件に合う問題が見つかりませんでした。😅'
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
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '申し訳ありません。うまく回答できませんでした。別の質問を試してみてください。'
          }]);
        }
      } else {
        // AI応答の解析
        if (mode === 'quiz') {
          const searchMatch = responseToUse.match(/SEARCH_QUERY:\s*(.+)/);
          const maxResultsMatch = responseToUse.match(/MAX_RESULTS:\s*(\d+)/);
          const difficultyMatch = responseToUse.match(/DIFFICULTY:\s*(basic|intermediate|advanced|all)/);

          const cleanResponse = responseToUse
            .replace(/SEARCH_QUERY:.+/g, '')
            .replace(/MAX_RESULTS:.+/g, '')
            .replace(/DIFFICULTY:.+/g, '')
            .trim();

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
                content: cleanResponse || '問題が見つかりませんでした。'
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
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: cleanResponse
            }]);
          }
        } else {
          // RAGモード: そのまま表示
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseToUse
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
    <div className="flex flex-col h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth p-4 space-y-6"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm">
                    U
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm shadow-sm animate-pulse-slow">
                    ✨
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${msg.role === 'user'
                    ? 'bg-gray-900 text-white rounded-tr-sm'
                    : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-sm'
                    }`}
                >
                  <pre className="whitespace-pre-wrap font-sans bg-transparent border-none p-0 m-0 overflow-x-auto max-w-full">
                    {msg.content}
                  </pre>
                </div>

                {msg.questions && onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(msg.questions!)}
                    className="mt-3 bg-white border border-blue-200 hover:border-blue-400 text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-sm group"
                  >
                    <span>クイズを開始する</span>
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm shadow-sm">
                ✨
              </div>
              <div className="bg-gray-50 px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 pb-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Settings Chips */}
          <div className="flex flex-wrap gap-2 px-1">
            <div className="relative group">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as 'quiz' | 'rag')}
                className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium py-1.5 pl-3 pr-8 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                disabled={loading}
              >
                <option value="quiz">🎯 クイズレコメンド</option>
                <option value="rag">📚 RAG検索拡張生成</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-3xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all shadow-sm hover:shadow-md">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'quiz' ? "例: ネットワークの問題を3問出して" : "例: RAGについて教えて"}
              className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-gray-800 placeholder-gray-400 text-sm sm:text-base resize-none max-h-32 min-h-[48px]"
              rows={1}
              disabled={loading}
              style={{ height: 'auto', minHeight: '48px' }}
            />
            <button
              onClick={handleSend}
              disabled={!query.trim() || loading}
              className="mb-1.5 p-2 bg-gray-900 hover:bg-black text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-center text-[10px] text-gray-400">
            Gemini can make mistakes, so double-check it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RagBot;
