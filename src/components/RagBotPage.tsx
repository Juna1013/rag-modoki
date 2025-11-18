import React from 'react';
import Footer from './Footer';
import RagBot from './RagBot';
import type { QuizData } from '../utils/toonParser';
import { baseStyles, headerStyles, buttonStyles, cardStyles } from '../styles/sharedStyles';

interface RagBotPageProps {
  onStartQuiz: (selectedQuestions: QuizData[]) => void;
  onBackToDashboard: () => void;
}

const RagBotPage: React.FC<RagBotPageProps> = ({ onStartQuiz, onBackToDashboard }) => {
  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className="w-full max-w-4xl">
          {/* ヘッダー */}
          <header className={headerStyles.pageHeader}>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBackToDashboard}
                className={buttonStyles.back}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>ダッシュボードに戻る</span>
              </button>
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-3 leading-tight">
                🤖 RAGボット
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  AI問題選択システム
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                  カスタマイズ出題
                </span>
              </div>
            </div>
          </header>

          {/* メインコンテンツエリア */}
          <div className={cardStyles.main}>
            <div className="p-6 sm:p-8 md:p-10">
              <RagBot onStartQuiz={onStartQuiz} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RagBotPage;