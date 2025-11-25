import { useState } from 'react';
import './App.css'

// コンポーネントのインポート
// コンポーネントのインポート
import Dashboard from './components/dashboard/DashboardNew';
import Quiz from './components/quiz/Quiz';
import RagBotPage from './components/ragbot/RagBotPage';
import ContentPage from './components/content/ContentPage';
import MemberIntro from './components/members/MemberIntro';
import type { QuizData } from './utils/toonParser';

function App() {
    const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'ragbot' | 'content' | 'members'>('dashboard');
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

    // メンバー紹介へ移動
    const handleNavigateToMembers = () => {
        setCurrentView('members');
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
                    onNavigateToMembers={handleNavigateToMembers}
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

            {currentView === 'members' && (
                <MemberIntro
                    onBackToDashboard={handleBackToDashboard}
                    onNavigateToRagBot={handleNavigateToRagBot}
                    onNavigateToContent={handleNavigateToContent}
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
