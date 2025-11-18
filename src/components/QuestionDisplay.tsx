import ReactMarkdown from "react-markdown";
import { questionStyles, animationStyles } from '../styles/sharedStyles';

type Props = {
    questionText: string;
    isLoading: boolean;
    questionNumber: number | null;
};

const QuestionDisplay = ({ questionText, isLoading, questionNumber }: Props) => (
    <div className={questionStyles.container}>
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                <div className={animationStyles.loadingSpinner}></div>
                <p className={animationStyles.loadingText}>問題を読み込み中...</p>
            </div>
        ) : (
            <div className={questionStyles.content}>
                {questionNumber && (
                    <div className={questionStyles.badge}>
                        問題 {questionNumber}
                    </div>
                )}
                <div className={questionStyles.text}>
                    <ReactMarkdown>{questionText}</ReactMarkdown>
                </div>
            </div>
        )}
    </div>
);

export default QuestionDisplay;
