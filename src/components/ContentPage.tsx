import React from 'react';
import Footer from './Footer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { baseStyles, headerStyles, buttonStyles, cardStyles } from '../styles/sharedStyles';

interface ContentPageProps {
  title: string;
  onBackToDashboard: () => void;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, onBackToDashboard }) => {
  // タイトルに応じたマークダウンコンテンツ
  const getContentMarkdown = () => {
    if (title === 'サイバーセキュリティ') {
      return `
# 2025年度に発生したサイバーセキュリティ事案

## 概要
2025年度は、デジタル化の急速な進展に伴い、様々なサイバーセキュリティ事案が発生しています。
このページでは、注目すべき事案と対策について紹介します。

## 主要なセキュリティ事案

### 1. ランサムウェア攻撃の増加
- **背景**: リモートワークの普及に伴い、エンドポイントセキュリティの脆弱性が顕在化
- **特徴**: 暗号化通信を悪用した新種のランサムウェアが急増
- **影響**: 医療機関や重要インフラへの被害が報告

### 2. ゼロデイ脆弱性の悪用
- **傾向**: AIを活用した自動化された脆弱性スキャン
- **対策**: パッチ管理とセキュリティ情報の迅速な共有

### 3. サプライチェーン攻撃
- **事案**: ソフトウェア開発チェーン全体への侵入
- **リスク**: 上流から下流まで広範な影響

## 対策フレームワーク

### 技術的対策
\`\`\`
- 多要素認証 (MFA)
- エンドツーエンド暗号化
- 継続的なセキュリティモニタリング
\`\`\`

### 組織的対策
1. セキュリティ意識の向上
2. 定期的なセキュリティ監査
3. インシデント対応計画の策定

## まとめ
2025年度のセキュリティ脅威に対応するには、技術と組織的対策の両立が重要です。
`;
    } else if (title === 'クラウド比較') {
      return `
# クラウドとオンプレミスのメリット・デメリット

## クラウドコンピューティング

### メリット
- **スケーラビリティ**: 需要に応じてリソースを動的に調整
- **コスト効率**: 初期投資が不要で、従量課金制
- **可用性**: 99.9%以上のSLAを提供
- **保守性**: ベンダーが保守を担当
- **アクセス性**: インターネット経由でどこからでもアクセス可能

### デメリット
- **セキュリティ**: データが外部に保存される不安
- **ネットワーク依存性**: インターネット接続が必須
- **ベンダーロックイン**: 移行が困難になる可能性
- **レイテンシ**: ネットワーク遅延による影響
- **コスト**: 長期利用で割高になる可能性

## オンプレミス

### メリット
- **セキュリティ**: データを物理的に管理できる
- **カスタマイズ性**: 自由に構成を変更可能
- **パフォーマンス**: レイテンシが最小限
- **独立性**: 外部に依存しない運用が可能

### デメリット
- **初期コスト**: 高額な設備投資が必要
- **保守負担**: 自社で保守を担当
- **スケーラビリティ**: 拡張に時間とコストがかかる
- **技術人材**: 高度な技術者が必要
- **可用性**: 自社で高可用性を構築する必要

## 比較表

| 項目 | クラウド | オンプレミス |
|------|--------|-----------|
| 初期投資 | 低い | 高い |
| 運用コスト | 中程度 | 高い |
| スケーラビリティ | 優秀 | 劣る |
| セキュリティ | 高い | 物理的に制御可能 |
| 保守性 | 簡単 | 複雑 |

## 最適な選択

### クラウドを選ぶべき場合
- スタートアップやスケール成長を想定している企業
- 急速に変化する業務要件を持つ企業
- 初期投資を抑えたい企業

### オンプレミスを選ぶべき場合
- 規制要件が厳しい業界 (金融、医療など)
- 極めて高いセキュリティ要件を持つ企業
- 完全なコントロールが必要な企業

## ハイブリッドアプローチ
両者の長所を活かすハイブリッドクラウドが主流化しつつあります。
`;
    } else if (title === 'RAGの解説') {
      return `
# RAG（Retrieval-Augmented Generation）の解説

## RAGとは

Retrieval-Augmented Generation（RAG）は、大規模言語モデル（LLM）と情報検索システムを組み合わせた技術です。
ユーザーの質問に対して、まず関連する情報を検索し、その情報をLLMに提供することで、より正確で根拠のある回答を生成します。

## RAGの主要な特徴

### 1. 情報検索機能
- **ベクトル検索**: ユーザーの質問を意味的に理解し、類似した文書を検索
- **キーワードマッチング**: 直接的な単語の一致による検索
- **セマンティック理解**: 文脈を考慮した関連情報の抽出

### 2. 動的な回答生成
- 検索した情報を基にして、常に新しく、最新の情報に基づいた回答が可能
- ハルシネーション（存在しない情報の生成）を削減
- 回答の信頼性と検証可能性が向上

### 3. スケーラビリティ
- 大規模なドキュメントベースに対応可能
- リアルタイムで新しい情報を組み込める
- 継続的な学習なしでナレッジを更新

## RAGの活用事例

### 教育分野
- クイズシステム: 関連する学習教材から問題を自動生成
- 学習支援: 学生の質問に対して、教科書から引用した回答を生成

### ビジネス分野
- カスタマーサポート: 社内ナレッジベースから適切な回答を検索して提示
- 文書分析: 大量の契約書やレポートから必要な情報を抽出

### 医療分野
- 医学情報検索: 最新の論文や治療ガイドラインを参照した医療相談
- 診断支援: 症状と医学知識を組み合わせた提案

## RAGの利点と課題

### 利点
- **正確性**: 実データに基づいた回答
- **透明性**: 情報源を提示できる
- **最新性**: リアルタイム情報に対応可能
- **拡張性**: 新しいドキュメントを追加するだけで対応可能

### 課題
- **検索精度**: 関連情報の正確な検索が必要
- **処理速度**: 検索と生成の両方に時間がかかる可能性
- **品質管理**: ドキュメントベースの品質が結果に直結

## まとめ

RAGは、LLMの能力と情報検索の正確性を結合した革新的な技術です。
特に教育やカスタマーサポートなど、正確性が重要な分野での活用が期待されています。
`;
    } else if (title === '紙アンケートのOpenCVによるスキャン') {
      return `
# 紙アンケートのOpenCVによるスキャン

## 概要

紙ベースのアンケートを効率的にデータ化するために、OpenCVを用いた画像処理技術を活用します。
手書きのマークシートや選択肢のスキャンから、自動的にデータを抽出することが可能になります。

## OpenCVによる処理パイプライン

### 1. 画像の取得と前処理
- スマートフォンやスキャナーで撮影
- グレースケール変換
- ノイズ除去（ガウシアンフィルタ）
- コントラスト調整

### 2. マークシートの検出
- **輪郭検出**: cv2.findContours()でマークシート領域を検出
- **四角形認識**: マークシートの四隅を特定
- **射影変換**: 撮影角度を補正して平面化

### 3. 回答部分の認識
- **領域分割**: 各設問の回答欄を分割
- **ピクセル密度分析**: マークされた部分を検出
- **閾値処理**: 回答判定基準を設定

### 4. データ抽出

\`\`\`python
import cv2
import numpy as np

# 画像の読み込み
image = cv2.imread('questionnaire.jpg')

# グレースケール変換
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 二値化
_, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

# 輪郭検出
contours, _ = cv2.findContours(binary, cv2.RETR_TREE, 
                                cv2.CHAIN_APPROX_SIMPLE)

# 回答領域の抽出と分析
for contour in contours:
    area = cv2.contourArea(contour)
    if area > MIN_AREA:
        # マークされているかどうか判定
        pass
\`\`\`

## 実装上の考慮事項

### 照明条件の対応
- **均等な照明**: 影による誤検出を最小化
- **動的閾値処理**: Otsu二値化や適応的閾値処理の活用
- **複数パスの処理**: 異なるパラメータでの処理結果の統合

### 精度向上の工夫
- **サンプリング**: 複数ピクセルの平均値で判定
- **機械学習**: SVM や CNN で複雑なパターンを認識
- **ユーザー検証**: 自動判定後の確認ステップ

### パフォーマンス最適化
- **並列処理**: 複数アンケートを同時処理
- **解像度調整**: 処理速度と精度のバランス
- **キャッシング**: 同じ形式の使用回答は前回の結果を活用

## 応用例

### 学校教育
- 選択式テストの自動採点
- 出席簿の自動入力
- アンケート集計の自動化

### 企業調査
- 顧客満足度調査の効率化
- 社員向けアンケートのデータ化
- 大規模サーベイの自動処理

### 医療現場
- 患者問診票の電子化
- 症状チェックリストのデータ入力
- 医療記録の自動化

## 今後の発展

- **3D対応**: 複数角度からの撮影による精度向上
- **AI統合**: 深層学習を用いたさらなる高精度化
- **クラウド処理**: エッジデバイスでの軽量処理と中央サーバーでの詳細分析
`;
    }
    return '';
  };

  return (
    <div className={baseStyles.appBackground}>
      <div className={baseStyles.pageContainer}>
        <div className={baseStyles.contentContainer}>
          {/* ヘッダー */}
          <header className={headerStyles.pageHeader}>
            <div className="flex items-center justify-start mb-6">
              <button
                onClick={onBackToDashboard}
                className={buttonStyles.back}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>ダッシュボードに戻る</span>
              </button>
            </div>

            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-2 leading-tight">
                {title === 'サイバーセキュリティ'
                  ? '🔒 2025年度に発生したサイバーセキュリティ事案'
                  : title === 'クラウド比較'
                    ? '☁️ クラウドとオンプレミスのメリット・デメリット'
                    : title === 'RAGの解説'
                      ? '🤖 RAGの解説'
                      : '📱 紙アンケートのOpenCVによるスキャン'}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-4">
                {title === 'サイバーセキュリティ'
                  ? '最新のセキュリティ脅威と対策について'
                  : title === 'クラウド比較'
                    ? 'システム導入時の重要な検討事項'
                    : title === 'RAGの解説'
                      ? '検索拡張生成技術の理解'
                      : '画像処理による自動化'}
              </p>
            </div>
          </header>

          {/* コンテンツ */}
          <div className={cardStyles.main}>
            <div className="p-6 sm:p-8 md:p-10 max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-gray-800 border-b-2 border-blue-200 pb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
                  p: ({ node, ...props }) => <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-700" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
                  li: ({ node, ...props }) => <li className="text-base sm:text-lg ml-4" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full border-collapse mb-6 border border-gray-300" {...props} />,
                  thead: ({ node, ...props }) => <thead className="bg-blue-100" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />,
                  code(props: any) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={vscDarkPlus}
                        className="rounded-lg text-sm font-mono my-4"
                      />
                    ) : (
                      <code {...rest} className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-sm">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ node, ...props }) => <pre className="not-prose mb-4" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                  hr: ({ node, ...props }) => <hr className="my-6 border-t-2 border-gray-300" {...props} />,
                }}
              >
                {getContentMarkdown()}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage;