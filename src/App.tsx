import { useState, useEffect } from 'react';
import './App.css'

// コンポーネントのインポート
import Dashboard from './components/DashboardNew';
import Quiz from './components/Quiz';
import RagBotPage from './components/RagBotPage';
import { parseTOON } from './utils/toonParser';
import type { QuizData } from './utils/toonParser';
import quizDataToon from './data/quizData.toon?raw';

function App() {
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'ragbot'>('dashboard');
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

    // RAGボットページに移動
    const handleNavigateToRagBot = () => {
        setCurrentView('ragbot');
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
                    onNavigateToRagBot={handleNavigateToRagBot}
                />
            )}
            
            {currentView === 'ragbot' && (
                <RagBotPage
                    onStartQuiz={handleStartQuiz}
                    onBackToDashboard={handleBackToDashboard}
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
