import React, { useState } from 'react';
import contentData from '../../data/dashboard/contentTiles.json';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // JSONデータからナビゲーション項目を作成し、actionを追加
    const navItems = contentData.navigationItems.map((item) => ({
        ...item,
        action: item.type === 'home'
            ? () => onNavigateToHome?.()
            : item.type === 'ragbot'
                ? onNavigateToRagBot
                : () => onNavigateToContent(item.contentType!)
    }));

    const handleNavItemClick = (action: () => void) => {
        action();
        setIsMobileMenuOpen(false);
    };


    return (
        <nav className="w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* メインナビゲーションバー */}
                <div className="flex items-center justify-between h-16">
                    {/* ロゴ */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => {
                                onNavigateToHome?.();
                                setIsMobileMenuOpen(false);
                            }}
                            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            MDL
                        </button>
                    </div>

                    {/* デスクトップナビゲーション - すべてのアイテムを表示 */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={item.action}
                                className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${currentView === item.key
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* モバイルメニューボタン */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-all"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">メニューを開く</span>
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* モバイルメニュー */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden pb-4 space-y-2">
                        {/* モバイルナビゲーションアイテム */}
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleNavItemClick(item.action)}
                                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${currentView === item.key
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
