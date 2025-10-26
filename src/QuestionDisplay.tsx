import ReactMarkdown from "react-markdown";

type Props = {
    questionText: string;
    isLoading: boolean;
};

const QuestionDisplay = ({ questionText, isLoading }: Props) => (
    // 問題文のコンテナ
    // 生成中状態と問題文表示で異なる内容を表示
    <div className="flex justify-center items-center w-3/4 mt-20 bg-[#f5aff] rounded-xl p-4 min-h-[120px] mb-4 border-2 border-[#1976d2] shadow-lg">
        {isLoading ? (
            <p className="text-lg">生成中...</p>
        ) : (
            <div className="text-lg">
                <ReactMarkdown>{questionText}</ReactMarkdown>
            </div>
        )}
    </div>
);

export default QuestionDisplay;
