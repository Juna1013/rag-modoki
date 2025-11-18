import React from 'react';
import Footer from './Footer';
import RagBot from './RagBot';
import type { QuizData } from '../utils/toonParser';

interface RagBotPageProps {
  onStartQuiz: (selectedQuestions: QuizData[]) => void;
  onBackToDashboard: () => void;
}

const RagBotPage: React.FC<RagBotPageProps> = ({ onStartQuiz, onBackToDashboard }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="flex-grow flex flex-col items-center pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* ヘッダー */}
          <header className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBackToDashboard}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>ダッシュボードに戻る</span>
              </button>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                🤖 RAGボット
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  AI問題選択システム
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  カスタマイズ出題
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                希望するトピックから最適な問題を選択
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 px-2">
                💡 キーワードを入力して、関連する5問のクイズに挑戦しよう！
              </p>
            </div>
          </header>

          {/* メインコンテンツエリア */}
          <div className="bg-white rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm">
            <div className="p-6 sm:p-8 md:p-10">
              <RagBot onStartQuiz={onStartQuiz} />
            </div>
          </div>

          {/* 特徴説明 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">スマート検索</h3>
              </div>
              <p className="text-gray-600 text-sm">
                入力したキーワードから関連性の高い問題を自動で検索・選択します。
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">全レベル対応</h3>
              </div>
              <p className="text-gray-600 text-sm">
                基本・中級・上級の全レベルから最適な問題を組み合わせて出題します。
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">即座に開始</h3>
              </div>
              <p className="text-gray-600 text-sm">
                問題選択後、すぐにクイズが開始され、学習効率を最大化します。
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RagBotPage;