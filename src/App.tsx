import { useState } from 'react';
import './App.css'

// コンポーネントのインポート
// コンポーネントのインポート
import Dashboard from './components/dashboard/DashboardNew';
import Quiz from './components/quiz/Quiz';
import RagBotPage from './components/ragbot/RagBotPage';
import ContentPage from './components/content/ContentPage';
import type { QuizData } from './utils/toonParser';

function App() {
    const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'ragbot' | 'content'>('dashboard');
    const [selectedQuestions, setSelectedQuestions] = useState<QuizData[]>([]);
    const [contentType, setContentType] = useState<string>('');

    // クイズ開始
    const handleStartQuiz = (questions: QuizData[]) => {
        setSelectedQuestions(questions);
        setCurrentView('quiz');
    };

    // RAGボットページへ移動
    const handleNavigateToRagBot = () => {
        setCurrentView('ragbot');
    };

    // コンテンツページへ移動
    const handleNavigateToContent = (type: string) => {
        setContentType(type);
        setCurrentView('content');
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
                    onNavigateToRagBot={handleNavigateToRagBot}
                    onNavigateToContent={handleNavigateToContent}
                />
            )}

            {currentView === 'ragbot' && (
                <RagBotPage
                    onStartQuiz={handleStartQuiz}
                    onBackToDashboard={handleBackToDashboard}
                    onNavigateToRagBot={handleNavigateToRagBot}
                    onNavigateToContent={handleNavigateToContent}
                />
            )}

            {currentView === 'content' && (
                <ContentPage
                    title={contentType}
                    onBackToDashboard={handleBackToDashboard}
                    onNavigateToRagBot={handleNavigateToRagBot}
                    onNavigateToContent={handleNavigateToContent}
                    currentView={currentView}
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
