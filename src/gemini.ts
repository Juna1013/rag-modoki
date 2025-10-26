import { GoogleGenAI } from "@google/genai";

// 環境変数の読み込み
const GEMINI_API_KEY: string = import.meta.env.VITE_GEMINI_KEY;

// APIキーを使用してGoogleGenerativeAIのインスタンスを作成
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const callGeminiAPI = async (prompt: string): Promise<string> => {
    // プロンプトに基づいてGeminiAPIを呼び出し、出力を取得
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            maxOutputTokens: 500,
            temperature: 0.1,
        },
    });

    // テキストを抽出する前に undefined の可能性をチェック
    if (response.text === undefined) {
        console.error("Geminiモデルからの応答テキストが含まれていませんでした。")
        throw new Error("Failed to generate quiz text: No text in response.");
    }
    // 生成されたテキストを取得
    return response.text;
}
