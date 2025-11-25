import React from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import { baseStyles } from '../styles/sharedStyles';
import contentData from '../data/contentTiles.json';

interface DashboardProps {
  onNavigateToRagBot: () => void;
  onNavigateToContent: (type: string) => void;
}

interface ContentTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
  contentType?: string;
  type?: string;
  action: () => void;
  gradient: string;
  bgGradient: string;
  hoverColor: string;
}

const DashboardNew: React.FC<DashboardProps> = ({
  onNavigateToRagBot,
  onNavigateToContent
}) => {

  // JSONデータからコンテンツタイルを作成し、actionを追加
  const contentTiles: ContentTile[] = contentData.contentTiles.map((tile) => ({
    ...tile,
    action: tile.type === 'ragbot'
      ? onNavigateToRagBot
      : () => onNavigateToContent(tile.contentType!)
  }));

  return (
    <div className={baseStyles.appBackground}>
      {/* NavigationBarとGitHubアイコンのコンテナ */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-3">
        <div className="flex-grow flex justify-center">
          <NavigationBar
            currentView="home"
            onNavigateToRagBot={onNavigateToRagBot}
            onNavigateToContent={onNavigateToContent}
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
          <div className={baseStyles.contentContainer}>
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
                {contentTiles.slice(0, 4).map((tile) => (
                  <button
                    key={tile.id}
                    onClick={tile.action}
                    className={`group bg-white hover:bg-gradient-to-br ${tile.hoverColor} rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative`}
                  >
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${tile.bgGradient} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                          {tile.icon}
                        </div>
                        <h2 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${tile.gradient} bg-clip-text text-transparent`}>
                          {tile.title.split(/[\s　]/).map((word, i, arr) => (
                            <React.Fragment key={i}>
                              {word}
                              {i < arr.length - 2 && <br />}
                              {i === arr.length - 2 && ' '}
                            </React.Fragment>
                          ))}
                        </h2>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                        {tile.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* RAGボット - 全幅タイル (検索結果に含まれている場合のみ表示) */}
              {contentTiles.find(tile => tile.id === 'ragbot') && (
                <button
                  onClick={onNavigateToRagBot}
                  className="group bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-[2rem] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden relative"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                        ✨
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        RAG による<br />
                        クイズレコメンド
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                      希望するトピックから最適な問題を AI が選択します。
                    </p>
                  </div>
                </button>
              )}


            </div>
          </div >
        </div >
      </div >
      <Footer />
    </div >
  );
};

export default DashboardNew;
