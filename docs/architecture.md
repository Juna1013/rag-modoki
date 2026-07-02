# アーキテクチャ

## 🏛 システム構成

```
┌─────────────────────────────────────────────────┐
│              フロントエンド                        │
│         (React + TypeScript + Vite)             │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ ダッシュボード │  │   RAGボット   │            │
│  └──────────────┘  └──────────────┘            │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  クイズ画面   │  │   結果画面    │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  ┌──────────────────────────────────┐          │
│  │     問題検索エンジン              │          │
│  │  (キーワードマッチング + RAG)      │          │
│  └──────────────────────────────────┘          │
└─────────────────────────────────────────────────┘
                      │
                      ↓
         ┌─────────────────────────┐
         │   Google Gemini API     │
         │  (AI会話処理)            │
         └─────────────────────────┘
                      │
                      ↓
         ┌─────────────────────────┐
         │   問題データベース       │
         │  (TOON形式ファイル)      │
         └─────────────────────────┘
```

## 📁 ディレクトリ構造

```
rag-modoki/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── DashboardNew.tsx    # ダッシュボード
│   │   ├── RagBotPage.tsx      # RAGボットページ
│   │   ├── RagBot.tsx          # RAGボット本体
│   │   ├── Quiz.tsx            # クイズコンポーネント
│   │   ├── QuestionDisplay.tsx # 問題表示
│   │   ├── ChoiceButtons.tsx   # 選択肢ボタン
│   │   ├── AnswerForm.tsx      # 解答フォーム
│   │   ├── ControlButtons.tsx  # 制御ボタン
│   │   ├── ContentPage.tsx     # コンテンツページ
│   │   └── Footer.tsx          # フッター
│   │
│   ├── utils/              # ユーティリティ
│   │   ├── toonParser.ts       # TOON形式パーサー
│   │   └── gemini.ts           # Gemini API接続
│   │
│   ├── data/               # データファイル
│   │   └── quizData.toon       # 問題データ
│   │
│   ├── styles/             # スタイル
│   │   └── sharedStyles.ts     # 共通スタイル
│   │
│   ├── App.tsx             # メインアプリ
│   ├── App.css             # アプリスタイル
│   ├── index.css           # グローバルスタイル
│   └── main.tsx            # エントリーポイント
│
├── docs/                   # ドキュメント
│   ├── README.md
│   ├── overview.md
│   ├── setup.md
│   ├── features.md
│   ├── rag-bot.md
│   ├── api.md
│   ├── architecture.md
│   └── development.md
│
├── public/                 # 静的ファイル
├── dist/                   # ビルド出力
├── .env                    # 環境変数
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係
├── tsconfig.json           # TypeScript設定
├── vite.config.ts          # Vite設定
└── README.md               # プロジェクトREADME
```

## 🧩 コンポーネント構成

### 階層構造

```
App (アプリケーションルート)
│
├─ DashboardNew (メインダッシュボード)
│
├─ RagBotPage (RAGボットページ)
│   └─ RagBot (RAGボット本体)
│      └─ メッセージリスト
│         ├─ ユーザーメッセージ
│         └─ アシスタントメッセージ
│            └─ クイズ開始ボタン
│
├─ ContentPage (基本/中級/上級/ランダム)
│   └─ Quiz (クイズコンポーネント)
│      ├─ QuestionDisplay (問題表示)
│      │   └─ ReactMarkdown (Markdown描画)
│      ├─ ChoiceButtons (選択肢)
│      └─ ControlButtons (制御ボタン)
│
└─ Footer (フッター)
```

## 🔄 データフロー

### 1. 問題選択フロー（RAGボット）

```
ユーザー入力
    ↓
[RagBot.tsx]
handleSend()
    ↓
パターンマッチング判定
    ├─ 簡単な挨拶/感謝 → 即座に応答
    └─ 問題検索が必要
        ↓
    callGeminiAPI()
        ↓
    [gemini.ts]
    Gemini API呼び出し
        ↓
    応答パース
        ↓
    retrieveRelevant()
    (キーワード検索)
        ↓
    filterByDifficulty()
    (難易度フィルタ)
        ↓
    問題リスト表示
        ↓
    "クイズを開始"ボタン
        ↓
    onStartQuiz()
        ↓
    [App.tsx]
    setQuizMode('rag')
    setSelectedQuizzes()
    setCurrentPage('quiz')
```

### 2. クイズフロー

```
クイズ開始
    ↓
[Quiz.tsx]
問題1を表示
    ↓
ユーザーが選択肢をクリック
    ↓
handleAnswer()
    ↓
正誤判定
    ↓
解説表示
    ↓
"次の問題"ボタン
    ↓
問題2へ...
    ↓
最終問題まで繰り返し
    ↓
結果画面表示
```

## 🗄 データモデル

### QuizData型

```typescript
interface QuizData {
    id: number;              // 問題ID
    question: string;        // 問題文 (Markdown対応)
    choices: string[];       // 選択肢 [A, B, C, D]
    correctAnswer: number;   // 正解のインデックス (0-3)
    explanation: string;     // 解説 (Markdown対応)
}
```

### Message型（RAGボット）

```typescript
interface Message {
    id: string;              // メッセージID
    role: 'user' | 'assistant';  // 送信者
    content: string;         // メッセージ内容
    questions?: QuizData[];  // 問題リスト（任意）
}
```

## 🎨 スタイリングアーキテクチャ

### Tailwind CSS + 共通スタイル

```typescript
// styles/sharedStyles.ts
export const baseStyles = {
    appBackground: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    pageContainer: "flex flex-col items-center justify-center p-4 sm:p-6 md:p-8",
};

export const buttonStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors",
    back: "flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors",
};
```

### レスポンシブデザイン

```css
/* Tailwind ブレークポイント */
sm: 640px   /* タブレット縦 */
md: 768px   /* タブレット横 */
lg: 1024px  /* デスクトップ小 */
xl: 1280px  /* デスクトップ大 */
```

## 🔌 外部サービス統合

### Google Gemini API

**役割**: AI会話処理

**統合方法**:
```typescript
// src/utils/gemini.ts
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ 
    apiKey: import.meta.env.VITE_GEMINI_KEY 
});
```

**使用箇所**:
- RAGボットの会話生成

## 🛡 状態管理

### React State（useState）

```typescript
// App.tsx - グローバル状態
const [currentPage, setCurrentPage] = useState<Page>('dashboard');
const [selectedQuizzes, setSelectedQuizzes] = useState<QuizData[]>([]);
const [quizMode, setQuizMode] = useState<QuizMode>('basic');

// RagBot.tsx - ローカル状態
const [messages, setMessages] = useState<Message[]>([]);
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);
```

**特徴**:
- シンプルなアプリなので Redux/Zustand不要
- Propsによる親子間のデータ受け渡し
- コールバック関数でイベント通知

## 🚀 ビルドとデプロイ

### 開発環境

```bash
npm run dev
# Vite開発サーバー起動
# ホットリロード有効
# ポート: 5173 (デフォルト)
```

### プロダクションビルド

```bash
npm run build
# TypeScriptコンパイル
# Viteビルド
# 出力先: dist/
```

### デプロイ先

1. **Vercel** (推奨)
   - 自動ビルド・デプロイ
   - 環境変数の管理
   - プレビューデプロイ

2. **Netlify**
   - 継続的デプロイ
   - Forms/Functions対応

3. **GitHub Pages**
   - 静的ホスティング
   - 無料

## 📊 パフォーマンス

### 最適化手法

1. **コード分割**: Viteの自動コード分割
2. **遅延ロード**: 画像のlazy loading
3. **Markdown最適化**: react-markdownのメモ化
4. **API呼び出し制限**: レート制限の実装

### バンドルサイズ

```
dist/assets/
├── index-[hash].js     (~200KB)  # メインバンドル
├── vendor-[hash].js    (~150KB)  # React + 依存関係
└── index-[hash].css    (~50KB)   # Tailwind CSS
```

## 🔐 セキュリティ

### 実装済み

1. **環境変数**: APIキーの保護
2. **入力サニタイゼーション**: XSS対策
3. **HTTPS**: デプロイ先で強制

### 今後の対策

1. **バックエンドAPI**: APIキーの隠蔽
2. **CORS設定**: リクエスト元の制限
3. **認証**: ユーザーログイン機能

## 🧪 テスト戦略

### 現状
- 手動テストのみ

### 推奨テスト

```typescript
// 例: RagBotのユニットテスト
describe('RagBot', () => {
    test('should retrieve relevant questions', () => {
        const result = retrieveRelevant('ネットワーク', 5);
        expect(result.length).toBeLessThanOrEqual(5);
    });
});
```

## 📈 スケーラビリティ

### 現在の制約
- クライアントサイドのみ
- 問題データは静的ファイル
- 会話履歴は揮発性

### 拡張案
1. **バックエンド追加**: Express/FastAPI
2. **データベース**: PostgreSQL/MongoDB
3. **キャッシング**: Redis
4. **CDN**: 静的アセットの配信
