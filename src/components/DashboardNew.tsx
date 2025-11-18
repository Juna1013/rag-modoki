import Footer from './Footer';
import type { QuizData } from '../utils/toonParser';
import { baseStyles, headerStyles, tileStyles, utilityStyles } from '../styles/sharedStyles';

interface DashboardProps {
  quizList: QuizData[];
  onStartQuiz: (selectedQuestions: QuizData[]) => void;
  onNavigateToRagBot?: () => void;
}

const DashboardNew = ({ quizList, onStartQuiz, onNavigateToRagBot }: DashboardProps) => {

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

  const getRandomQuestions = (questions: QuizData[], count: number = 5): QuizData[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  };

  const handleStartQuiz = (difficulty: string) => {
    if (difficulty === 'RAGボット') {
      onNavigateToRagBot?.();
      return;
    }
    const difficultyQuestions = getDifficultyQuestions(difficulty);
    const randomQuestions = getRandomQuestions(difficultyQuestions, 5);
    onStartQuiz(randomQuestions);
  };

  const difficulties = ['基本', '中級', '上級', 'RAGボット'];


  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className={baseStyles.contentContainer}>
          {/* GitHub Link - Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
            <a
              href="https://github.com/Juna1013/gemini-quiz-app"
              target="_blank"
              rel="noopener noreferrer"
              className={utilityStyles.githubIcon}
              title="View on GitHub"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-gray-200 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <header className={headerStyles.pageHeader}>
            <h1 className={headerStyles.pageTitle}>
              応用情報技術者試験 クイズ
            </h1>
            <div className={headerStyles.pageSubtitle}>
              <span>難易度を選んでクイズに挑戦しよう！</span>
            </div>
          </header>

          <div className="mb-6 sm:mb-8">
            <div className={baseStyles.dashboardGrid}>
              {difficulties.map(difficulty => {
                const questions = difficulty === 'RAGボット' ? [] : getDifficultyQuestions(difficulty);


                return (
                  <div key={difficulty} className="relative group">
                    <div
                      className={tileStyles.base}
                      onClick={() => handleStartQuiz(difficulty)}
                    >
                      <div className={tileStyles.content}>
                        <div className={tileStyles.info}>
                          <div className={tileStyles.icon}>
                            {difficulty === 'RAGボット' ? '🤖' : 
                             difficulty === '基本' ? '📚' : 
                             difficulty === '中級' ? '⚙️' : '🏆'}
                          </div>
                          <div>
                            <h3 className={tileStyles.title}>
                              {difficulty === 'RAGボット' ? (
                                <>
                                  RAGボット
                                  <span className="text-xs bg-white/20 text-white backdrop-blur-sm px-2 py-1 rounded-full font-medium border border-white/30">AI生成</span>
                                </>
                              ) : (
                                `${difficulty}レベル`
                              )}
                            </h3>
                            <p className={tileStyles.subtitle}>
                              {difficulty === '基本' ? '基礎固めに最適' : 
                               difficulty === '中級' ? '実践力を身につけよう' : 
                               difficulty === '上級' ? 'エキスパートレベル' :
                               'AIカスタム問題'}
                            </p>
                          </div>
                        </div>
                        <div className={tileStyles.stats}>
                          {difficulty !== 'RAGボット' ? (
                            <>
                              <div className={tileStyles.number}>{questions.length}</div>
                              <div className={tileStyles.label}>問題</div>
                            </>
                          ) : (
                            <div className={tileStyles.number}>∞</div>
                          )}
                        </div>
                      </div>

                      <div className={tileStyles.description}>
                        {difficulty === '基本' ? 'IT基礎知識・基本概念・用語理解を中心とした問題' : 
                         difficulty === '中級' ? 'アルゴリズム・設計・開発手法など実践的な技術問題' : 
                         difficulty === '上級' ? '高度なアーキテクチャ・最新技術・理論的な問題' :
                         '希望するトピックに基づいてAIが5問のカスタム問題を生成'}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {difficulty === 'RAGボット' ? 'カスタム生成' : `難易度: ${difficulty}`}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          <span className="mr-1">タップして開始</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
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

export default DashboardNew;
