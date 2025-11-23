import React, { useState } from 'react';

interface NavigationBarProps {
    currentView?: string;
    onNavigateToRagBot: () => void;
    onNavigateToContent: (type: string) => void;
    onNavigateToHome?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    currentView,
    onNavigateToRagBot,
    onNavigateToContent,
    onNavigateToHome
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { label: 'ホーム', action: () => onNavigateToHome?.(), key: 'home' },
        { label: 'サイバーセキュリティ', action: () => onNavigateToContent('サイバーセキュリティ'), key: 'security' },
        { label: 'クラウド比較', action: () => onNavigateToContent('クラウド比較'), key: 'cloud' },
        { label: 'RAGの解説', action: () => onNavigateToContent('RAGの解説'), key: 'rag' },
        { label: 'OpenCV処理', action: () => onNavigateToContent('紙アンケートのOpenCVによるスキャン'), key: 'opencv' },
        { label: 'RAGクイズ', action: onNavigateToRagBot, key: 'ragbot' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Search query:', searchQuery);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pr-16 sm:pr-20">
            <nav className="w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/50">
                <div className="px-6 sm:px-8">
                    <div className="flex items-center justify-between h-14 gap-4">
                        {/* ロゴ/タイトル */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => onNavigateToHome?.()}
                                className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                            >
                                MDL
                            </button>
                        </div>

                        {/* 検索ボックス */}
                        <div className="flex-grow max-w-md hidden md:block">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="コンテンツを検索..."
                                    className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </form>
                        </div>

                        {/* デスクトップナビゲーション */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.slice(0, 3).map((item) => (
                                <button
                                    key={item.key}
                                    onClick={item.action}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${currentView === item.key
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;
