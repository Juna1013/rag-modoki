import { useState, useEffect, useRef } from 'react';
import { callGeminiAPI } from './gemini';

import './App.css'

// コンポーネントのインポート
import AnswerForm from './AnswerForm';
import QuestionDisplay from './QuestionDisplay';
import ControlButtons from './ControlButtons';


function App() {
    const [questionText, setQuestionText] = useState(''); // 生成されたクイズ問題文
    const [answerWord, setAnswerWord] = useState(''); // クイズの解答となる用語 
    const [userAnswer, setUserAnswer] = useState(''); // ユーザーの回答
    const [isLoading, setIsLoading] = useState(false); // クイズ生成中のローディング状態の管理
    const inputRef = useRef<HTMLInputElement>(null); // 入力フィールドの参照

    // クイズの解答となる用語の候補
    const itTermsForExam: string[] = [
        "ITIL", // サービスマネジメント
        "PaaS", // クラウドサービスモデル
        "ブロックチェーン", // 新技術・分散システム
        "SCM", // 経営戦略・システム戦略
        "SLA", // サービスレベル管理
        "アジャイル開発", // ソフトウェア開発手法
        "DDoS攻撃", // セキュリティ・脅威
        "IoT", // ハードウェア・ネットワーク
        "正規化", // データベース設計（より専門的）
        "BCP" // リスクマネジメント・事業戦略
      ];


    //配列からランダムに単語を選んで返す関数
    const pickRandomWord = (wordList: string[]): string => {
        if (wordList.length === 0) {
            console.error("Answer words list is empty");
            return "";
        }
        const randomIndex = Math.floor(Math.random() * wordList.length);
        return wordList[randomIndex];
    };

    // Gemini APIを呼び出してクイズを一問生成しステートに保存する関数
    const generateQuiz = async () => {
        const answerWord: string = pickRandomWord(itTermsForExam)// 候補からランダムに選ばれた用語を取得
        setAnswerWord(answerWord); // 正解判定用のStateにセット
        setIsLoading(true); // ローディング状態を開始
        setUserAnswer(""); // ユーザーの回答をリセット
        // プロンプトを生成
        const quizGeneratePrompt = `${answerWord}を解答とするようなクイズの問題文を一問生成してください。\n
            問題文以外は出力しないでください。\n
            ${answerWord}を使用した問題ではなく、必ず${answerWord}という用語名自体が解答となるような問題にしてください。\n`;
        try {
            const response = await callGeminiAPI(quizGeneratePrompt);
            setQuestionText(response);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setQuestionText("エラーが発生しました");
        } finally {
            setIsLoading(false); // ローディング状態を終了
        }
    };

    // クイズの回答を送信し正解判定を行う関数
    const checkAnswer = async () => {
        if (userAnswer === "") {
            alert("回答を入力してください");
            return;
        }
        //setIsLoading(true); // ローディング状態を開始
        const quizCheckPrompt = `次のクイズに対するユーザーの回答が正しいかどうかを判定してください。

            問題文: ${questionText}\n
            正解: ${answerWord}\n
            ユーザーの回答: ${userAnswer}\n
            正しい場合は「正解」、間違っている場合は「不正解」とだけ出力してください。`;
        try {
            const result = await callGeminiAPI(quizCheckPrompt);
            alert(`${result}\n正解: ${answerWord}`);
            generateQuiz();
            setUserAnswer("");
        } catch (error) {
            console.error("Error checking answer:", error);
            alert("エラーが発生しました");
            generateQuiz();
            setUserAnswer("");
        } finally {
        //setIsLoading(false); // ローディング状態を終了
        }
    }

    //クイズスタート時に一問目を生成するためのuseEffect
    useEffect(() => {
        if (itTermsForExam.length > 0) {
            generateQuiz();
        }
    }, []);

    // 問題が変わるたびに回答フォームにフォーカスするためのuseEffect
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [questionText, isLoading]); // 
  

  return (
    <div className="w-full flex flex-col justify-center items-center">
        {/* 問題文の表示  */}
        <QuestionDisplay questionText={questionText} isLoading={isLoading} />

        {/* 回答フォームと送信ボタン */}
        <AnswerForm
            userAnswer={userAnswer}  
            setUserAnswer={setUserAnswer}
            checkAnswer={checkAnswer}
            isLoading={isLoading}
            inputRef={inputRef} // 入力フィールドの参照を渡す
        />
        
        {/* 次の問題へボタン */}
        <ControlButtons
            nextAction={generateQuiz}
        />
    </div>
  )
}

export default App
