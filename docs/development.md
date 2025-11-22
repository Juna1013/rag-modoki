# 開発ガイド

## 👨‍💻 開発環境

### 推奨エディタ
- **Visual Studio Code**
  - 拡張機能:
    - ESLint
    - Prettier
    - TypeScript and JavaScript Language Features
    - Tailwind CSS IntelliSense
    - GitLens

### 推奨設定

**VS Code settings.json**:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 📝 コーディング規約

### TypeScript

#### 命名規則
```typescript
// コンポーネント: PascalCase
const DashboardNew: React.FC = () => { ... }

// 関数: camelCase
const handleSend = () => { ... }

// 定数: UPPER_SNAKE_CASE
const MAX_RESULTS = 10;

// インターフェース: PascalCase
interface QuizData { ... }

// 型エイリアス: PascalCase
type Page = 'dashboard' | 'quiz' | 'result';
```

#### 型定義
```typescript
// ✅ Good: 明示的な型定義
const [count, setCount] = useState<number>(0);

// ❌ Bad: 型推論に頼りすぎ（複雑な場合）
const [data, setData] = useState(initialData);

// ✅ Good: インターフェースの使用
interface Props {
  onStartQuiz: (questions: QuizData[]) => void;
}

// ✅ Good: 戻り値の型指定
const parseQuiz = (data: string): QuizData[] => {
  // ...
}
```

### React

#### コンポーネント構造
```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { QuizData } from '../types';

// 2. Types/Interfaces
interface Props {
  quizzes: QuizData[];
  onComplete: (score: number) => void;
}

// 3. Component
const QuizComponent: React.FC<Props> = ({ quizzes, onComplete }) => {
  // 4. State
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, [currentIndex]);
  
  // 6. Event Handlers
  const handleNext = () => {
    // ...
  };
  
  // 7. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
};

// 8. Export
export default QuizComponent;
```

#### Hooks のルール
```typescript
// ✅ Good: トップレベルで呼び出し
const [state, setState] = useState(0);

// ❌ Bad: 条件分岐内で呼び出し
if (condition) {
  const [state, setState] = useState(0); // NG!
}

// ✅ Good: カスタムフックの作成
const useQuizLogic = (quizzes: QuizData[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  return { currentIndex, score, setCurrentIndex, setScore };
};
```

### CSS/Tailwind

```typescript
// ✅ Good: 共通スタイルの使用
className={buttonStyles.primary}

// ✅ Good: Tailwindクラスの組み合わせ
className="flex items-center gap-2 p-4 rounded-lg bg-white shadow-sm"

// ❌ Bad: インラインスタイル（避ける）
style={{ backgroundColor: 'blue', padding: '10px' }}

// ✅ Good: レスポンシブ
className="text-sm sm:text-base md:text-lg"
```

## 🔧 ユーティリティ関数

### 新しい問題の追加

**ファイル**: `src/data/quizData.toon`

```
::: 問題31
# 新しい問題のタイトル

問題文をここに記述...

::選択肢::
A. 選択肢1
B. 選択肢2
C. 選択肢3
D. 選択肢4

::正解::
A

::解説::
詳しい解説をここに...
```

### 新しいトピックの追加

**ファイル**: `src/components/RagBot.tsx`

```typescript
const keywordMap: { [key: string]: string[] } = {
  // 既存のトピック...
  '新しいトピック': ['keyword1', 'keyword2', 'keyword3'],
};
```

## 🐛 デバッグ

### Console Logging

```typescript
// 開発時のみログ出力
if (import.meta.env.DEV) {
  console.log('Debug:', data);
}

// エラーログは常に出力
console.error('Error occurred:', error);
```

### React DevTools

1. ブラウザ拡張機能をインストール
2. F12 でデベロッパーツールを開く
3. "Components" タブでコンポーネントツリーを確認
4. "Profiler" タブでパフォーマンスを測定

### Vite のデバッグ

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,  // ブラウザ自動起動
  },
  build: {
    sourcemap: true,  // ソースマップ生成
  },
});
```

## ✅ リント・フォーマット

### ESLint実行

```bash
# リントチェック
npm run lint

# 自動修正
npx eslint . --fix
```

### TypeScriptチェック

```bash
# 型チェック
npx tsc --noEmit
```

## 🧪 テスト（今後の実装）

### Jest + React Testing Library

```bash
# インストール
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```typescript
// QuizComponent.test.tsx
import { render, screen } from '@testing-library/react';
import QuizComponent from './QuizComponent';

test('renders question', () => {
  const mockQuiz = {
    id: 1,
    question: 'Test Question',
    choices: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Test explanation'
  };
  
  render(<QuizComponent quizzes={[mockQuiz]} onComplete={() => {}} />);
  expect(screen.getByText('Test Question')).toBeInTheDocument();
});
```

## 📦 新しいパッケージの追加

```bash
# 依存関係の追加
npm install package-name

# 開発依存関係の追加
npm install --save-dev package-name

# 型定義の追加
npm install --save-dev @types/package-name
```

## 🌿 Git ワークフロー

### ブランチ戦略

```bash
main        # プロダクション環境
├─ develop  # 開発環境
   ├─ feature/new-feature  # 新機能
   ├─ fix/bug-fix          # バグ修正
   └─ docs/update-readme   # ドキュメント
```

### コミットメッセージ

```bash
# フォーマット
<type>: <subject>

# 例
feat: RAGボットにGemini API統合
fix: 問題検索のバグ修正
docs: セットアップガイド更新
style: コードフォーマット統一
refactor: QuizComponentのリファクタリング
test: ユニットテスト追加
```

### 作業フロー

```bash
# 1. 新しいブランチを作成
git checkout -b feature/new-feature

# 2. 変更を加える
# ...

# 3. ステージング
git add .

# 4. コミット
git commit -m "feat: 新機能追加"

# 5. プッシュ
git push origin feature/new-feature

# 6. プルリクエスト作成
# GitHubでPR作成

# 7. レビュー後マージ
```

## 🚀 デプロイ

### Vercel へのデプロイ

```bash
# Vercel CLIインストール
npm install -g vercel

# デプロイ
vercel

# プロダクション デプロイ
vercel --prod
```

### 環境変数の設定

Vercel Dashboard:
1. プロジェクトを選択
2. Settings → Environment Variables
3. `VITE_GEMINI_KEY` を追加
4. 値を入力
5. Save

## 📊 パフォーマンス最適化

### バンドルサイズの確認

```bash
npm run build
npx vite-bundle-visualizer
```

### Lazy Loading

```typescript
// コンポーネントの遅延ロード
const DashboardNew = lazy(() => import('./components/DashboardNew'));

// 使用時
<Suspense fallback={<div>Loading...</div>}>
  <DashboardNew />
</Suspense>
```

### メモ化

```typescript
// useMemo: 計算結果のメモ化
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback: 関数のメモ化
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// React.memo: コンポーネントのメモ化
const MemoizedComponent = React.memo(MyComponent);
```

## 🔍 トラブルシューティング

### よくある問題

#### 1. TypeScriptエラー

```bash
# node_modules を削除して再インストール
rm -rf node_modules
npm install
```

#### 2. Vite が起動しない

```bash
# キャッシュをクリア
rm -rf node_modules/.vite
npm run dev
```

#### 3. ホットリロードが効かない

```bash
# vite.config.ts を確認
export default defineConfig({
  server: {
    watch: {
      usePolling: true,  // ポーリングを使用
    },
  },
});
```

## 📚 参考資料

### 公式ドキュメント
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### ベストプラクティス
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

## 💡 Tips

### 開発効率化

1. **VS Code スニペット**: 頻繁に使うコードをスニペット化
2. **Hot Keys**: ショートカットキーを活用
3. **Console snippets**: よく使うconsole.logをスニペット化
4. **Git Aliases**: 頻繁に使うGitコマンドにエイリアス設定

### コードレビューチェックリスト

- [ ] 型定義は適切か
- [ ] エラーハンドリングは適切か
- [ ] パフォーマンスに問題はないか
- [ ] レスポンシブデザインは対応しているか
- [ ] アクセシビリティは考慮されているか
- [ ] コメントは必要十分か

## 🤝 コントリビューション

貢献を歓迎します！以下の流れでお願いします：

1. Issue を作成して議論
2. Fork してブランチ作成
3. 変更を加える
4. テストを追加・実行
5. プルリクエストを作成
6. レビューを待つ
