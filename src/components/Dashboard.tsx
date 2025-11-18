import Footer from './Footer';
import type { QuizData } from '../utils/toonParser';

interface DashboardProps {
  quizList: QuizData[];
  onStartQuiz: (selectedQuestions: QuizData[]) => void;
}

const Dashboard = ({ quizList, onStartQuiz }: DashboardProps) => {
  // 難易度別に問題を分類
  const getDifficultyQuestions = (difficulty: string): QuizData[] => {
    switch (difficulty) {
      case '基本':
        return quizList.filter(q => q.id >= 1 && q.id <= 10);
      case '中級':
        return quizList.filter(q => q.id >= 11 && q.id <= 20);
      case '上級':
        return quizList.filter(q => q.id >= 21 && q.id <= 30);
      default:
        return [];
    }
  };

  // ランダムに5問選択
  const getRandomQuestions = (questions: QuizData[], count: number = 5): QuizData[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  };

  // 難易度クイズを開始
  const handleStartQuiz = (difficulty: string) => {
    const difficultyQuestions = getDifficultyQuestions(difficulty);
    const randomQuestions = getRandomQuestions(difficultyQuestions, 5);
    onStartQuiz(randomQuestions);
  };



  const difficulties = ['基本', '中級', '上級'];
  const difficultyColors = {
    '基本': { bg: 'from-green-400 to-blue-500', border: 'border-green-500' },
    '中級': { bg: 'from-yellow-400 to-orange-500', border: 'border-yellow-500' },
    '上級': { bg: 'from-red-400 to-pink-500', border: 'border-red-500' }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-grow flex flex-col items-center pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="dashboard-container w-full max-w-7xl">
          {/* ヘッダー */}
          <header className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
              応用情報技術者試験
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
              クイズダッシュボード
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 px-2">
              💡 難易度タイルをタップして直接クイズに挑戦！
            </p>
          </header>

          {/* 難易度選択タイル */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center px-2">難易度を選択してクイズを開始</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {difficulties.map(difficulty => {
                const questions = getDifficultyQuestions(difficulty);
                const colors = difficultyColors[difficulty as keyof typeof difficultyColors];
                
                return (
                  <div 
                    key={difficulty}
                    className="relative group"
                  >
                    {/* メインタイル - クリックでクイズ開始 */}
                    <div 
                      className={`relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br ${colors.bg} cursor-pointer group`}
                      onClick={() => handleStartQuiz(difficulty)}
                    >
                    {/* 高度な背景エフェクト */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 group-hover:bg-white/30 transition-all duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover:bg-white/20 transition-all duration-500"></div>
                    <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                    
                    {/* グラデーションボーダー */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 via-white/10 to-transparent p-[1px]">
                      <div className={`h-full w-full rounded-2xl bg-gradient-to-br ${colors.bg}`}></div>
                    </div>
                    
                    {/* ホバー時の魔法的なオーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-center justify-center">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-white text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="text-sm font-bold bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                          5問クイック開始
                        </div>
                      </div>
                    </div>
                    
                    {/* メインコンテンツ */}
                    <div className="relative z-20 p-8">
                      {/* ヘッダー部分 */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {difficulty}レベル
                          </h3>
                          <div className="flex items-center mt-1">
                            {[...Array(difficulty === '基本' ? 1 : difficulty === '中級' ? 2 : 3)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            {[...Array(3 - (difficulty === '基本' ? 1 : difficulty === '中級' ? 2 : 3))].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">
                            {questions.length}
                          </div>
                          <div className="text-sm text-white/80">
                            問題
                          </div>
                        </div>
                      </div>
                      

                      
                      {/* 説明文 */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                            <svg className="text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white/90 text-sm font-medium mb-1">
                              {difficulty === '基本' ? '基礎固めに最適' : 
                               difficulty === '中級' ? '実践力を身につけよう' : 
                               'エキスパートレベル'}
                            </div>
                            <div className="text-white/70 text-xs leading-relaxed">
                              {difficulty === '基本' ? 'IT基礎知識・基本概念・用語理解を中心とした問題です。' : 
                               difficulty === '中級' ? 'アルゴリズム・設計・開発手法など実践的な技術問題です。' : 
                               '高度なアーキテクチャ・最新技術・理論的な問題にチャレンジします。'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* アクションヒント */}
                      <div className="mt-6 flex items-center justify-center">
                        <div className="flex items-center space-x-2 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                          <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 transition-colors">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">タップして即座にスタート</span>
                        </div>
                      </div>
                    </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;