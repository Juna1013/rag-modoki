import ReactMarkdown from "react-markdown";

type Props = {
    questionText: string;
    isLoading: boolean;
    questionNumber: number | null;
};

const QuestionDisplay = ({ questionText, isLoading, questionNumber }: Props) => (
    <div className="question-card w-full px-4 sm:px-6 lg:px-0">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mb-3 sm:mb-4"></div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">問題を読み込み中...</p>
            </div>
        ) : (
            <div className="space-y-3 sm:space-y-4">
                {questionNumber && (
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md">
                        問題 {questionNumber}
                    </div>
                )}
                <div className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-200 prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown>{questionText}</ReactMarkdown>
                </div>
            </div>
        )}
    </div>
);

export default QuestionDisplay;
