import { useState, useEffect } from 'react';
import './App.css'

// コンポーネントのインポート
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import { parseTOON } from './utils/toonParser';
import type { QuizData } from './utils/toonParser';
import quizDataToon from './data/quizData.toon?raw';

function App() {
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [currentView, setCurrentView] = useState<'dashboard' | 'quiz'>('dashboard');
    const [selectedQuestions, setSelectedQuestions] = useState<QuizData[]>([]);

    // TOON形式データをパース
    useEffect(() => {
        const parsed = parseTOON(quizDataToon);
        setQuizList(parsed);
    }, []);

    // クイズ開始
    const handleStartQuiz = (questions: QuizData[]) => {
        setSelectedQuestions(questions);
        setCurrentView('quiz');
    };

    // ダッシュボードに戻る
    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
        setSelectedQuestions([]);
    };

    return (
        <div className="App">
            {currentView === 'dashboard' && (
                <Dashboard
                    quizList={quizList}
                    onStartQuiz={handleStartQuiz}
                />
            )}
            
            {currentView === 'quiz' && selectedQuestions.length > 0 && (
                <Quiz
                    questions={selectedQuestions}
                    onBackToDashboard={handleBackToDashboard}
                />
            )}
        </div>
    );
}

export default App
