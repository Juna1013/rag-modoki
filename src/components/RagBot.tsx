import React, { useState } from 'react';
import { parseTOON, type QuizData } from '../utils/toonParser';
import quizRaw from '../data/quizData.toon?raw';

interface RagBotProps {
  onStartQuiz?: (questions: QuizData[]) => void;
}

const RagBot: React.FC<RagBotProps> = ({ onStartQuiz }) => {
  const quizzes: QuizData[] = parseTOON(quizRaw as string);
  const advanced = quizzes.filter(q => q.id >= 21 && q.id <= 30);

  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function handleGenerate() {
    setError(null);
    setLoading(true);

    try {
      // toonファイルから希望に沿った問題を選択
      const selectedQuestions = retrieveRelevant(query, 5);
      
      if (selectedQuestions.length === 0) {
        throw new Error('条件に合う問題が見つかりませんでした。キーワードを変更してお試しください。');
      }

      // 選択された問題を表示用にフォーマット
      const formattedResults = selectedQuestions.map((q, index) => 
        `【問題 ${index + 1}】\n${q.question}\n\n選択肢:\n${q.choices.map((choice, i) => `${i + 1}. ${choice}`).join('\n')}\n\n正解: ${q.answer + 1}番\n解説: ${q.explanation}\n`
      ).join('\n' + '='.repeat(50) + '\n\n');

      setMessages([`選択された問題 (${selectedQuestions.length}問):\n\n${formattedResults}`]);

      // クイズを開始
      if (onStartQuiz) {
        // 少し遅延させてユーザーが選択結果を確認できるようにする
        setTimeout(() => {
          onStartQuiz(selectedQuestions);
        }, 1500);
      }
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 説明文 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
            <svg className="text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <div className="text-purple-800 text-sm font-medium mb-1">RAG による問題選択システム</div>
            <div className="text-purple-700 text-xs leading-relaxed">
              希望するトピックやキーワードを入力すると、既存の問題データベースから関連する5問を検索・選択してクイズを開始できます。
            </div>
          </div>
        </div>
      </div>

      {/* 入力エリア */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            希望するトピック・キーワード
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="例: ネットワーク、データベース、セキュリティ、暗号化、アルゴリズム、TCP/IP、BGP、ハフマン符号化"
          />
          <div className="mt-1 text-xs text-gray-500">
            空白の場合は上級レベルからランダムに5問を選択します
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>問題選択中...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>5問を選択してクイズ開始</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => { setQuery(''); setMessages([]); setError(null); }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>リセット</span>
          </button>
        </div>
      </div>

      {/* 結果表示エリア */}
      {(error || messages.length > 0) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-gray-800 font-medium mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            選択結果
          </h4>          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
              <div className="text-red-700 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                エラーが発生しました
              </div>
              <div className="text-red-600 text-xs mt-1">{error}</div>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 mt-2">
              <pre className="whitespace-pre-wrap text-gray-800 text-xs sm:text-sm font-mono leading-relaxed overflow-auto max-h-60">{m}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RagBot;
