import { useState } from 'react';
import QuestionDisplay from './QuestionDisplay';
import ChoiceButtons from './ChoiceButtons';
import Button from "@mui/material/Button";
import Footer from './Footer';
import type { QuizData } from '../utils/toonParser';
import { baseStyles, headerStyles, buttonStyles, resultStyles } from '../styles/sharedStyles';

interface QuizProps {
  questions: QuizData[];
  onBackToDashboard: () => void;
}

const Quiz = ({ questions, onBackToDashboard }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [_answers, setAnswers] = useState<{questionId: number, selectedIndex: number, isCorrect: boolean}[]>([]);
  const [result, setResult] = useState<{isCorrect: boolean, correctChoice: string, explanation: string} | null>(null);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const currentQuiz = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const questionNumber = currentQuestionIndex + 1;

  // 選択肢がクリックされたときの処理
  const handleChoiceSelect = (selectedIndex: number) => {
    if (!currentQuiz || isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedIndex === currentQuiz.answer;
    const correctChoice = currentQuiz.choices[currentQuiz.answer];
    
    // 回答を記録
    setAnswers(prev => [...prev, {
      questionId: currentQuiz.id,
      selectedIndex,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // 結果をページ下部に表示するための情報を設定
    setResult({
      isCorrect,
      correctChoice,
      explanation: currentQuiz.explanation
    });
  };

  // 次の問題へ
  const showNextQuiz = () => {
    if (isLastQuestion) {
      // 最終結果表示
      setShowFinalResult(true);
      return;
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
    setIsAnswered(false);
    setResult(null); // 結果表示をクリア
  };

  // リセット処理
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
    setResult(null);
    setShowFinalResult(false);
  };

  if (!currentQuiz) {
    return (
      <div className="text-center p-8">
        <p className="text-xl mb-4">問題が見つかりません</p>
        <Button variant="contained" onClick={onBackToDashboard}>
          ダッシュボードに戻る
        </Button>
      </div>
    );
  }

  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className={baseStyles.contentContainer}>
          {/* ヘッダー */}
          <header className={headerStyles.pageHeader}>
            <div className={headerStyles.quizHeaderControls}>
              <button 
                onClick={onBackToDashboard}
                className={`${buttonStyles.quizControl} order-2 sm:order-1`}
              >
                ← ダッシュボード
              </button>
              <div className={`${headerStyles.quizProgress} order-1 sm:order-2`}>
                問題 {questionNumber}/{questions.length}
              </div>
              <button 
                onClick={resetQuiz}
                className={`${buttonStyles.quizControl} order-3`}
              >
                リセット
              </button>
            </div>
            <h1 className={headerStyles.pageTitle}>
              応用情報技術者試験 クイズ
            </h1>
            <div className={headerStyles.pageSubtitle}>
              <span>現在のスコア: {score}/{questionNumber - 1}</span>
              <span>正答率: {questionNumber > 1 ? Math.round((score / (questionNumber - 1)) * 100) : 0}%</span>
            </div>
        </header>

          {/* プログレスバー */}
          <div className="mb-6 sm:mb-8 px-2 sm:px-0">
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(questionNumber / questions.length) * 100}%`
                }}
              />
            </div>
          </div>

        {/* 問題文の表示  */}
        <QuestionDisplay 
          questionText={currentQuiz.question} 
          isLoading={false} 
          questionNumber={currentQuiz.id} 
        />

        {/* 選択肢ボタン */}
        <ChoiceButtons
          choices={currentQuiz.choices}
          onSelect={handleChoiceSelect}
          disabled={isAnswered}
        />
        
        {/* 回答結果表示 */}
        {result && (
          <div className={result.isCorrect ? resultStyles.cardCorrect : resultStyles.cardIncorrect}>
            <div className={result.isCorrect ? resultStyles.titleCorrect : resultStyles.titleIncorrect}>
              {result.isCorrect ? '✓ 正解！' : '✗ 不正解'}
            </div>
            {!result.isCorrect && (
              <div className={resultStyles.text}>
                <span className="font-semibold">正解: </span>
                {result.correctChoice}
              </div>
            )}
            <div className={resultStyles.text}>
              <span className="font-semibold">解説: </span>
              {result.explanation}
            </div>
          </div>
        )}

        {/* 最終結果表示 */}
        {showFinalResult && (
          <div className={resultStyles.cardFinal}>
            <div className={resultStyles.titleFinal}>
              🎉 クイズ終了！
            </div>
            <div className={resultStyles.score}>
              <div className={resultStyles.scoreNumber}>
                正解数: {score}/{questions.length}
              </div>
              <div className={resultStyles.scorePercentage}>
                正答率: {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
          </div>
        )}

        {/* 次の問題へボタン */}
          {isAnswered && !showFinalResult && (
            <div className="text-center mt-6 sm:mt-8">
              <Button
                variant="contained"
                size={window.innerWidth < 640 ? "medium" : "large"}
                onClick={showNextQuiz}
                className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                sx={{
                  background: isLastQuestion 
                    ? 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)'
                    : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  minWidth: { xs: '120px', sm: 'auto' }
                }}
              >
                {isLastQuestion ? '結果を見る' : '次の問題へ'}
              </Button>
            </div>
          )}

        {/* ダッシュボードに戻るボタン（最終結果表示時） */}
        {showFinalResult && (
          <div className="text-center mt-6 sm:mt-8">
            <Button
              variant="contained"
              size={window.innerWidth < 640 ? "medium" : "large"}
              onClick={onBackToDashboard}
              className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base mr-4"
              sx={{
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                minWidth: { xs: '120px', sm: 'auto' }
              }}
            >
              ダッシュボードに戻る
            </Button>
            <Button
              variant="outlined"
              size={window.innerWidth < 640 ? "medium" : "large"}
              onClick={resetQuiz}
              className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
              sx={{
                minWidth: { xs: '120px', sm: 'auto' }
              }}
            >
              もう一度挑戦
            </Button>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;