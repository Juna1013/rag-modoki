/**
 * 共通デザインシステム - rag-modoki
 */

// ベース背景とレイアウト
export const baseStyles = {
  appBackground: 'min-h-screen w-full flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-purple-100',
  pageContainer: 'flex-grow flex flex-col items-center pt-24 sm:pt-28 md:pt-32 pb-6 px-3 sm:px-6 lg:px-8',
  contentContainer: 'w-full max-w-6xl',
  dashboardGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto'
};

// ヘッダーコンポーネント
export const headerStyles = {
  pageHeader: 'text-center mb-6 sm:mb-8',
  pageTitle: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 leading-tight',
  pageSubtitle: 'flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600',
  quizHeaderControls: 'flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0',
  quizProgress: 'text-base sm:text-lg md:text-xl font-semibold order-1 sm:order-2'
};

// タイル共通スタイル
export const tileStyles = {
  base: 'relative group cursor-pointer p-6 gap-4 flex flex-col bg-white rounded-3xl transition-all duration-300 hover:scale-[1.02]',
  content: 'flex items-center justify-between',
  info: 'flex items-center gap-3',
  icon: 'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gray-100',
  title: 'text-xl font-bold text-black flex items-center gap-2',
  subtitle: 'text-sm text-black mt-1 font-medium',
  stats: 'text-right',
  number: 'text-2xl font-bold text-black',
  label: 'text-xs text-black font-medium',
  description: 'text-sm text-black leading-relaxed'
};

// ボタンコンポーネント
export const buttonStyles = {
  base: 'px-4 py-2 bg-white rounded-xl font-medium text-black hover:bg-gray-50 transition-all duration-300',
  small: 'text-xs sm:text-sm',
  medium: 'text-sm',
  quizControl: 'px-4 py-2 bg-white rounded-xl font-medium text-black hover:bg-gray-50 transition-all duration-300 text-xs sm:text-sm',
  back: 'px-4 py-2 bg-white rounded-xl font-medium text-black hover:bg-gray-50 transition-all duration-300 text-sm flex items-center space-x-2'
};

// カードコンポーネント
export const cardStyles = {
  base: 'bg-white rounded-2xl p-6 transition-all duration-300',
  main: 'bg-white rounded-3xl',
  feature: 'bg-white rounded-2xl p-6 transition-all duration-300',
  icon: 'w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center',
  title: 'text-lg font-bold text-black',
  text: 'text-black text-sm font-medium'
};

// 選択肢ボタンスタイル
export const choiceStyles = {
  container: 'mt-6 sm:mt-8 w-full px-4 sm:px-6 lg:px-0 max-w-5xl mx-auto',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4',
  tile: 'relative group cursor-pointer transition-all duration-300 transform rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:-translate-y-0.5',
  content: 'relative p-3 sm:p-4 md:p-6 min-h-[80px] sm:min-h-[110px] flex items-center overflow-hidden',
  number: 'relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 sm:mr-5 transition-all duration-300 group-hover:bg-white/30',
  numberText: 'text-white font-bold text-sm sm:text-lg',
  textContainer: 'relative flex-grow pr-2',
  text: 'text-white text-sm sm:text-base lg:text-lg leading-relaxed font-semibold',
  indicator: 'relative flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-3',
  indicatorIcon: 'w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'
};

// 問題表示スタイル
export const questionStyles = {
  container: 'w-full px-4 sm:px-6 lg:px-0 max-w-5xl mx-auto',
  content: 'space-y-3 sm:space-y-4',
  badge: 'inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xs sm:text-sm',
  text: 'text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 prose prose-sm sm:prose-base lg:prose-lg max-w-none'
};

// 結果表示スタイル
export const resultStyles = {
  cardCorrect: 'mt-6 p-6 rounded-2xl bg-blue-50',
  cardIncorrect: 'mt-6 p-6 rounded-2xl bg-red-50',
  cardFinal: 'mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50',
  titleCorrect: 'text-xl font-bold mb-3 text-blue-700',
  titleIncorrect: 'text-xl font-bold mb-3 text-red-700',
  titleFinal: 'text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-center',
  text: 'text-gray-700',
  score: 'text-center space-y-2',
  scoreNumber: 'text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent',
  scorePercentage: 'text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent'
};

// バッジスタイル
export const badgeStyles = {
  base: 'bg-white px-3 py-1 rounded-full text-sm font-medium',
  purple: 'bg-white px-3 py-1 rounded-full text-sm font-medium text-purple-800',
  indigo: 'bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-800'
};

// フッタースタイル
export const footerStyles = {
  container: 'w-full bg-transparent mt-auto',
  content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4',
  text: 'flex justify-center items-center text-sm text-gray-600'
};

// アニメーションスタイル
export const animationStyles = {
  loadingSpinner: 'animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mb-3 sm:mb-4',
  loadingText: 'text-base sm:text-lg text-gray-600'
};

// ユーティリティスタイル
export const utilityStyles = {
  githubIcon: 'absolute top-4 right-4 sm:top-6 sm:right-6 z-30 group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 backdrop-blur-md rounded-full hover:bg-gray-800 transition-all duration-200',
  gradientText: 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent'
};