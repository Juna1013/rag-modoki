import { choiceStyles } from '../styles/sharedStyles';

type Props = {
  choices: string[];
  onSelect: (index: number) => void;
  disabled: boolean;
};

const ChoiceButtons = ({ choices, onSelect, disabled }: Props) => (
  <div className={choiceStyles.container}>
    <div className={choiceStyles.grid}>
      {choices.map((choice, index) => (
        <div
          key={index}
          onClick={() => !disabled && onSelect(index)}
          className={`${choiceStyles.tile} ${
            disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-102'
          }`}
        >
          <div className={choiceStyles.content}>
            
            {/* 選択肢番号 */}
            <div className={choiceStyles.number}>
              <span className={choiceStyles.numberText}>
                {String.fromCharCode(65 + index)}
              </span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            {/* 選択肢テキスト */}
            <div className={choiceStyles.textContainer}>
              <p className={choiceStyles.text}>
                {choice}
              </p>
            </div>
            
            {/* 選択インジケーター */}
            <div className={choiceStyles.indicator}>
              <div className={choiceStyles.indicatorIcon}>
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
