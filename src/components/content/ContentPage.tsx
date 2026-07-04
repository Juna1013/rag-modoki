import React from 'react';
import Footer from '../layout/Footer';
import NavigationBar from '../layout/NavigationBar';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { baseStyles, headerStyles, cardStyles } from '../../styles/sharedStyles';

import cybersecurityMd from '../../content/cybersecurity.md?raw';
import cloudComparisonMd from '../../content/cloud-comparison.md?raw';
import ragExplanationMd from '../../content/rag-explanation.md?raw';
import opencvScanMd from '../../content/opencv-scan.md?raw';

import contentData from '../../data/dashboard/contentTiles.json';

interface ContentPageProps {
  title: string;
  onBackToDashboard: () => void;
  onNavigateToRagBot: () => void;
  onNavigateToContent: (type: string) => void;
  currentView: string;
}

const ContentPage: React.FC<ContentPageProps> = ({
  title,
  onBackToDashboard,
  onNavigateToRagBot,
  onNavigateToContent,
  currentView
}) => {
  // タイトルに応じたマークダウンコンテンツ
  const getContentMarkdown = () => {
    if (title === 'サイバーセキュリティ') {
      return cybersecurityMd;
    } else if (title === 'クラウド比較') {
      return cloudComparisonMd;
    } else if (title === 'RAGの解説') {
      return ragExplanationMd;
    } else if (title === '紙アンケートのOpenCVによるスキャン') {
      return opencvScanMd;
    }
    return '';
  };

  // 現在のコンテンツに対応するタイルデータを検索
  const currentTile = contentData.contentTiles.find(tile =>
    tile.contentType === title || tile.title === title
  );

  return (
    <div className={baseStyles.appBackground}>
      {/* NavigationBarとGitHubアイコンのコンテナ */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-3">
        <div className="flex-grow flex justify-center">
          <NavigationBar
            currentView={currentView}
            onNavigateToRagBot={onNavigateToRagBot}
            onNavigateToContent={onNavigateToContent}
            onNavigateToHome={onBackToDashboard}
          />
        </div>

        {/* GitHubアイコン - NavigationBarの右側 */}
        <a
          href="https://github.com/Juna1013/security-rag"
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
            {/* ヘッダー */}
            <header className={headerStyles.pageHeader}>
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4 leading-tight">
                  {title === 'サイバーセキュリティ'
                    ? '🔒 2025年度に発生したサイバーセキュリティ事案'
                    : title === 'クラウド比較'
                      ? '☁️ クラウドとオンプレミスのメリット・デメリット'
                      : title === 'RAGの解説'
                        ? '🤖 RAGの解説'
                        : '📱 紙アンケートのOpenCVによるスキャン'}
                </h1>

                <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6">
                  {title === 'サイバーセキュリティ'
                    ? '最新のセキュリティ脅威と対策について'
                    : title === 'クラウド比較'
                      ? 'システム導入時の重要な検討事項'
                      : title === 'RAGの解説'
                        ? '検索拡張生成技術の理解'
                        : '画像処理による自動化'}
                </p>

                {/* Zenn風タグ表示 */}
                {currentTile && currentTile.keywords && (
                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {currentTile.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors cursor-default"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* コンテンツ */}
            <div className={cardStyles.main}>
              <div className="p-6 sm:p-8 md:p-10 max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node: _node, ...props }) => <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" {...props} />,
                    h2: ({ node: _node, ...props }) => <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-gray-800 border-b-2 border-blue-200 pb-2" {...props} />,
                    h3: ({ node: _node, ...props }) => <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
                    p: ({ node: _node, ...props }) => <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-700" {...props} />,
                    ul: ({ node: _node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                    ol: ({ node: _node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                    li: ({ node: _node, ...props }) => <li className="text-base sm:text-lg ml-4" {...props} />,
                    table: ({ node: _node, ...props }) => <table className="w-full border-collapse mb-6 border border-gray-300" {...props} />,
                    thead: ({ node: _node, ...props }) => <thead className="bg-blue-100" {...props} />,
                    th: ({ node: _node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800" {...props} />,
                    td: ({ node: _node, ...props }) => <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />,
                    code(props: React.ComponentPropsWithoutRef<'code'> & { node?: unknown }) {
                      const { children, className, node: _node, ...rest } = props
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          PreTag="div"
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          style={vscDarkPlus}
                          className="rounded-lg text-sm font-mono my-4"
                        />
                      ) : (
                        <code {...rest} className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-sm">
                          {children}
                        </code>
                      )
                    },
                    pre: ({ node: _node, ...props }) => <pre className="not-prose mb-4" {...props} />,
                    blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700" {...props} />,
                    a: ({ node: _node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                    hr: ({ node: _node, ...props }) => <hr className="my-6 border-t-2 border-gray-300" {...props} />,
                  }}
                >
                  {getContentMarkdown()}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage;