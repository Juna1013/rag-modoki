import { useState, useEffect } from 'react';
import './App.css'

// コンポーネントのインポート
import QuestionDisplay from './components/QuestionDisplay';
import ChoiceButtons from './components/ChoiceButtons';
import ControlButtons from './components/ControlButtons';
import { parseTOON } from './utils/toonParser';
import type { QuizData } from './utils/toonParser';
import quizDataToon from './data/quizData.toon?raw';


function App() {
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // TOON形式データをパース
    useEffect(() => {
        const parsed = parseTOON(quizDataToon);
        setQuizList(parsed);
    }, []);

    // ランダムにクイズを選択
    const pickRandomQuiz = (quizzes: QuizData[]): QuizData | null => {
        if (quizzes.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        return quizzes[randomIndex];
    };

    // 次の問題を表示
    const showNextQuiz = () => {
        const quiz = pickRandomQuiz(quizList);
        setCurrentQuiz(quiz);
        setIsAnswered(false);
    };

    // 選択肢がクリックされたときの処理
    const handleChoiceSelect = (selectedIndex: number) => {
        if (!currentQuiz || isAnswered) return;
        
        setIsAnswered(true);
        const isCorrect = selectedIndex === currentQuiz.answer;
        const correctChoice = currentQuiz.choices[currentQuiz.answer];
        
        if (isCorrect) {
            alert(`正解！\n${currentQuiz.explanation}`);
        } else {
            alert(`不正解\n正解: ${correctChoice}\n${currentQuiz.explanation}`);
        }
        
        // 次の問題へ自動遷移
        setTimeout(() => {
            showNextQuiz();
        }, 500);
    };

    // クイズリストが読み込まれたら最初の問題を表示
    useEffect(() => {
        if (quizList.length > 0) {
            showNextQuiz();
        }
    }, [quizList]); 
  

  return (
    <div className="w-full flex flex-col justify-center items-center">
        {/* 問題文の表示  */}
        <QuestionDisplay 
            questionText={currentQuiz?.question || ''} 
            isLoading={!currentQuiz} 
            questionNumber={currentQuiz?.id || null} 
        />

        {/* 選択肢ボタン */}
        {currentQuiz && (
            <ChoiceButtons
                choices={currentQuiz.choices}
                onSelect={handleChoiceSelect}
                disabled={isAnswered}
            />
        )}
        
        {/* 次の問題へボタン */}
        <ControlButtons
            nextAction={showNextQuiz}
        />
    </div>
  )
}

export default App
