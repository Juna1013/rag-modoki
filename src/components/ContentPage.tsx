import React from 'react';
import Footer from './Footer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { baseStyles, headerStyles, buttonStyles, cardStyles } from '../styles/sharedStyles';

import cybersecurityMd from '../content/cybersecurity.md?raw';
import cloudComparisonMd from '../content/cloud-comparison.md?raw';
import ragExplanationMd from '../content/rag-explanation.md?raw';
import opencvScanMd from '../content/opencv-scan.md?raw';

interface ContentPageProps {
  title: string;
  onBackToDashboard: () => void;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, onBackToDashboard }) => {
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

  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className={baseStyles.contentContainer}>
          {/* ヘッダー */}
          <header className={headerStyles.pageHeader}>
            <div className="flex items-center justify-start mb-6">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-2 leading-tight">
                {title === 'サイバーセキュリティ'
                  ? '🔒 2025年度に発生したサイバーセキュリティ事案'
                  : title === 'クラウド比較'
                    ? '☁️ クラウドとオンプレミスのメリット・デメリット'
                    : title === 'RAGの解説'
                      ? '🤖 RAGの解説'
                      : '📱 紙アンケートのOpenCVによるスキャン'}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-4">
                {title === 'サイバーセキュリティ'
                  ? '最新のセキュリティ脅威と対策について'
                  : title === 'クラウド比較'
                    ? 'システム導入時の重要な検討事項'
                    : title === 'RAGの解説'
                      ? '検索拡張生成技術の理解'
                      : '画像処理による自動化'}
              </p>
            </div>
          </header>

          {/* コンテンツ */}
          <div className={cardStyles.main}>
            <div className="p-6 sm:p-8 md:p-10 max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-gray-800 border-b-2 border-blue-200 pb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
                  p: ({ node, ...props }) => <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-700" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                  li: ({ node, ...props }) => <li className="text-base sm:text-lg ml-4" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full border-collapse mb-6 border border-gray-300" {...props} />,
                  thead: ({ node, ...props }) => <thead className="bg-blue-100" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />,
                  code(props: any) {
                    const { children, className, node, ...rest } = props
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
                  pre: ({ node, ...props }) => <pre className="not-prose mb-4" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                  hr: ({ node, ...props }) => <hr className="my-6 border-t-2 border-gray-300" {...props} />,
                }}
              >
                {getContentMarkdown()}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage;