import { GoogleGenAI } from "@google/genai";

// 環境変数の読み込みと検証
const getGeminiApiKey = (): string => {
    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    if (!apiKey) {
        console.error("Gemini API key is missing. Please set VITE_GEMINI_KEY in your .env file.");
        throw new Error("Gemini API key is not configured.");
    }
    return apiKey;
};

// APIキーを使用してGoogleGenerativeAIのインスタンスを作成
// 初期化は遅延させるか、エラーハンドリングを含めるのが理想的ですが、
// ここでは呼び出し時にキーを取得するように変更します。
let genAI: GoogleGenAI | null = null;

const getGenAIInstance = (): GoogleGenAI => {
    if (!genAI) {
        const apiKey = getGeminiApiKey();
        genAI = new GoogleGenAI({ apiKey });
    }
    return genAI;
};

export const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
        const ai = getGenAIInstance();

        // プロンプトに基づいてGeminiAPIを呼び出し、出力を取得
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ],
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
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error; // 再スローして呼び出し元で処理できるようにする
    }
}
