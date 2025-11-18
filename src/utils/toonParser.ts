export interface QuizData {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export function parseTOON(toonText: string): QuizData[] {
  const lines = toonText.trim().split('\n');
  const quizzes: QuizData[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // コメント行をスキップ
    if (line.startsWith('//')) {
      continue;
    }
    
    // [id]{...}: の行をスキップ
    if (line.startsWith('[') && line.includes('{')) {
      continue;
    }
    
    // データ行をパース
    const parts = line.split(' | ');
    if (parts.length === 4) {
      const question = parts[0].trim();
      const choices = parts[1].split(',').map(c => c.trim());
      const answer = parseInt(parts[2].trim());
      const explanation = parts[3].trim();
      
      // IDを取得（前の行から）
      let id = quizzes.length + 1;
      if (i > 0) {
        const prevLine = lines[i - 1];
        const idMatch = prevLine.match(/\[(\d+)\]/);
        if (idMatch) {
          id = parseInt(idMatch[1]);
        }
      }
      
      quizzes.push({
        id,
        question,
        choices,
        answer,
        explanation
      });
    }
  }
  
  return quizzes;
}

// 難易度別に問題を取得
export function getQuestionsByDifficulty(quizzes: QuizData[], difficulty: 'basic' | 'intermediate' | 'advanced'): QuizData[] {
  switch (difficulty) {
    case 'basic':
      return quizzes.filter(q => q.id >= 1 && q.id <= 10);
    case 'intermediate':
      return quizzes.filter(q => q.id >= 11 && q.id <= 20);
    case 'advanced':
      return quizzes.filter(q => q.id >= 21 && q.id <= 30);
    default:
      return [];
  }
}

// ランダムに問題を選択
export function getRandomQuestions(questions: QuizData[], count: number = 5): QuizData[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}
