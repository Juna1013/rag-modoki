import React from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import { baseStyles } from '../styles/sharedStyles';

interface DashboardProps {
  onNavigateToRagBot: () => void;
  onNavigateToContent: (type: string) => void;
}

const DashboardNew: React.FC<DashboardProps> = ({ onNavigateToRagBot, onNavigateToContent }) => {
  return (
    <div className={baseStyles.appBackground}>
      <NavigationBar
        currentView="home"
        onNavigateToRagBot={onNavigateToRagBot}
        onNavigateToContent={onNavigateToContent}
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className={baseStyles.pageContainer}>
          <div className={baseStyles.contentContainer}>
            {/* GitHubアイコン */}
            <a
              href="https://github.com/Juna1013/gemini-quiz-app"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full hover:bg-gray-900 transition-all duration-200 shadow-lg"
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

            {/* コンテンツセクション */}
            <div className="flex flex-col gap-6 max-w-3xl mx-auto py-24">
              {/* タイトルタイル */}
              <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-[2rem] p-8 sm:p-12 shadow-xl relative">
                <div className="relative z-10 text-center space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                      🎓
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
                    茨城高専<br className="sm:hidden" />
                    <span className="block mt-2">メディア・デザイン・ラボ</span>
                  </h1>
                  <p className="text-white/95 text-lg sm:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                    最新のセキュリティ事案からAIを用いた業務効率化まで
                  </p>
                </div>
              </div>

              {/* コンテンツグリッド */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* サイバーセキュリティ */}
                <button
                  onClick={() => onNavigateToContent('サイバーセキュリティ')}
                  className="group bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                        🔒
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        2025年度の<br />
                        サイバーセキュリティ事案
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                      最新のセキュリティ脅威と対策について詳しく解説します。
                    </p>
                  </div>
                </button>

                {/* クラウド比較 */}
                <button
                  onClick={() => onNavigateToContent('クラウド比較')}
                  className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                        ☁️
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        クラウドと<br />
                        オンプレミス比較
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                      システム導入時の重要な検討項目を比較解説。
                    </p>
                  </div>
                </button>

                {/* RAGの解説 */}
                <button
                  onClick={() => onNavigateToContent('RAGの解説')}
                  className="group bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                        🤖
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        RAG<br />
                        の解説
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                      検索拡張生成技術について詳しく学べます。
                    </p>
                  </div>
                </button>

                {/* 紙アンケートのOpenCVによるスキャン */}
                <button
                  onClick={() => onNavigateToContent('紙アンケートのOpenCVによるスキャン')}
                  className="group bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                        📱
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        紙アンケートの<br />
                        OpenCV処理
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                      画像処理による自動化技術を解説します。
                    </p>
                  </div>
                </button>
              </div>

              {/* RAGボット - 全幅タイル */}
              <button
                onClick={onNavigateToRagBot}
                className="group bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 hover:from-pink-500 hover:via-rose-500 hover:to-red-500 rounded-[2rem] p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
              >
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                      ✨
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      RAG による<br />
                      クイズレコメンド
                    </h2>
                  </div>
                  <p className="text-white/95 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                    希望するトピックから最適な問題を AI が選択します。
                  </p>
                </div>
              </button>
            </div>
          </div >
        </div >
      </div >
      <Footer />
    </div >
  );
};

export default DashboardNew;
