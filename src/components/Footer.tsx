

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* アプリ情報 */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
              応用情報技術者試験クイズ
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              応用情報技術者試験の過去問をベースにした学習クイズアプリです。
              基本・中級・上級の3つの難易度から選んで学習できます。
            </p>
          </div>

          {/* 学習内容 */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">学習分野</h4>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
              <li>• アルゴリズム・データ構造</li>
              <li>• データベース設計</li>
              <li>• ネットワーク・セキュリティ</li>
              <li>• システム開発・管理</li>
              <li>• プロジェクト管理</li>
            </ul>
          </div>

          {/* 統計・情報 */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">クイズ情報</h4>
            <div className="text-xs sm:text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>総問題数:</span>
                <span className="font-medium">30問</span>
              </div>
              <div className="flex justify-between">
                <span>基本レベル:</span>
                <span className="font-medium">10問</span>
              </div>
              <div className="flex justify-between">
                <span>中級レベル:</span>
                <span className="font-medium">10問</span>
              </div>
              <div className="flex justify-between">
                <span>上級レベル:</span>
                <span className="font-medium">10問</span>
              </div>
            </div>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* コピーライト */}
            <div className="text-sm text-gray-500">
              © {currentYear} 応用情報技術者試験クイズアプリ. All rights reserved.
            </div>

            {/* ソーシャルリンク・機能 */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>学習を継続しよう</span>
              </div>
              

              
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Made with React & TypeScript</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;