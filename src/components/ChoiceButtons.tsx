type Props = {
  choices: string[];
  onSelect: (index: number) => void;
  disabled: boolean;
};

const ChoiceButtons = ({ choices, onSelect, disabled }: Props) => (
  <div className="mt-6 sm:mt-8 w-full px-4 sm:px-6 lg:px-0">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
      {choices.map((choice, index) => (
        <div
          key={index}
          onClick={() => !disabled && onSelect(index)}
          className={`
            choice-tile relative group cursor-pointer transition-all duration-300 transform rounded-xl
            ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-102'}
          `}
        >
          <div className="relative p-4 sm:p-6 min-h-[90px] sm:min-h-[110px] flex items-center overflow-hidden">
            {/* バックグラウンドパターン */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
              }}></div>
            </div>
            
            {/* 選択肢番号 */}
            <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 sm:mr-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-sm sm:text-lg">
                {String.fromCharCode(65 + index)}
              </span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            {/* 選択肢テキスト */}
            <div className="relative flex-grow pr-2">
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                {choice}
              </p>
            </div>
            
            {/* 選択インジケーター */}
            <div className="relative flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            {/* ホバー時の光沢エフェクト */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:-translate-x-full"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ChoiceButtons;
