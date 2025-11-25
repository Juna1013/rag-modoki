import React from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import RagBot from './RagBot';
import type { QuizData } from '../utils/toonParser';
import { baseStyles, headerStyles } from '../styles/sharedStyles';

interface RagBotPageProps {
  onStartQuiz: (selectedQuestions: QuizData[]) => void;
  onBackToDashboard: () => void;
  onNavigateToRagBot: () => void;
  onNavigateToContent: (type: string) => void;
}

const RagBotPage: React.FC<RagBotPageProps> = ({
  onStartQuiz,
  onBackToDashboard,
  onNavigateToRagBot,
  onNavigateToContent
}) => {
  return (
    <div className={baseStyles.appBackground}>
      {/* NavigationBarとGitHubアイコンのコンテナ */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-3">
        <div className="flex-grow flex justify-center">
          <NavigationBar
            currentView="ragbot"
            onNavigateToRagBot={onNavigateToRagBot}
            onNavigateToContent={onNavigateToContent}
            onNavigateToHome={onBackToDashboard}
          />
        </div>

        {/* GitHubアイコン - NavigationBarの右側 */}
        <a
          href="https://github.com/Juna1013/gemini-quiz-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full hover:bg-gray-900 transition-all duration-200 shadow-lg"
          title="GitHubで表示"
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

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-purple-100">
        <div className={baseStyles.pageContainer}>
          <div className="w-full max-w-4xl">
            {/* ヘッダー */}
            <header className={headerStyles.pageHeader}>
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3 leading-tight">
                  🤖 RAGボット
                </h1>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                  AIと対話しながら、あなたに最適な問題を選んで出題します
                </p>
              </div>
            </header>

            {/* メインコンテンツエリア */}
            <RagBot onStartQuiz={onStartQuiz} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RagBotPage;