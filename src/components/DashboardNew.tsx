import React from 'react';
import Footer from './Footer';
import { baseStyles } from '../styles/sharedStyles';

interface DashboardProps {
  onNavigateToRagBot: () => void;
  onNavigateToContent: (type: string) => void;
}

const DashboardNew: React.FC<DashboardProps> = ({ onNavigateToRagBot, onNavigateToContent }) => {
  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className={baseStyles.contentContainer}>
          {/* ヘッダー */}
          <header className="mb-8 sm:mb-12 text-center">
            <a
              href="https://github.com/Juna1013/gemini-quiz-app"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full hover:bg-gray-900 transition-all duration-200"
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

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-3 leading-tight">
              応用情報技術者試験 クイズ
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              AIが希望するテーマから最適な問題を出題
            </p>
          </header>

          {/* コンテンツセクション */}
          <div className={baseStyles.dashboardGrid}>
            {/* サイバーセキュリティ */}
            <button
              onClick={() => onNavigateToContent('サイバーセキュリティ')}
              className="text-left bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  🔒
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  2025年度の
                  <br />
                  サイバーセキュリティ事案
                </h2>
              </div>
              <p className="text-sm text-white/90 font-medium">
                最新のセキュリティ脅威と対策について詳しく解説します。
              </p>
            </button>

            {/* クラウド比較 */}
            <button
              onClick={() => onNavigateToContent('クラウド比較')}
              className="text-left bg-gradient-to-br from-purple-500 to-indigo-400 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  ☁️
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  クラウドと
                  <br />
                  オンプレミス比較
                </h2>
              </div>
              <p className="text-sm text-white/90 font-medium">
                システム導入時の重要な検討項目を比較解説。
              </p>
            </button>

            {/* RAGの解説 */}
            <button
              onClick={() => onNavigateToContent('RAGの解説')}
              className="text-left bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  🤖
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  RAG
                  <br />
                  の解説
                </h2>
              </div>
              <p className="text-sm text-white/90 font-medium">
                検索拡張生成技術について詳しく学べます。
              </p>
            </button>

            {/* 紙アンケートのOpenCVによるスキャン */}
            <button
              onClick={() => onNavigateToContent('紙アンケートのOpenCVによるスキャン')}
              className="text-left bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  📱
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  紙アンケートの
                  <br />
                  OpenCV処理
                </h2>
              </div>
              <p className="text-sm text-white/90 font-medium">
                画像処理による自動化技術を解説します。
              </p>
            </button>

            {/* RAGボット - ナビゲーションタイル */}
            <button
              onClick={onNavigateToRagBot}
              className="w-full bg-gradient-to-br from-pink-500 to-rose-400 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group text-left transform hover:-translate-y-1 sm:col-span-2 lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  RAG による
                  <br />
                  クイズレコメンド
                </h2>
              </div>
              <p className="text-sm text-white/90 font-medium">
                希望するトピックから最適な問題を AI が選択します。
              </p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardNew;
