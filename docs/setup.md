# セットアップガイド

## 📋 前提条件

### 必須
- **Node.js**: v18.0.0 以上
- **npm**: v9.0.0 以上
- **Git**: バージョン管理用

### 推奨
- **Google Gemini API Key**: AI会話機能を使用する場合に必要

## 🚀 インストール手順

### 1. リポジトリのクローン
```bash
git clone https://github.com/Juna1013/toon-app.git
cd toon-app
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定

`.env`ファイルをプロジェクトルートに作成します：

```bash
# .env
VITE_GEMINI_KEY=your_gemini_api_key_here
```

#### Gemini APIキーの取得方法
1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. Googleアカウントでログイン
3. "Create API Key" をクリック
4. 生成されたAPIキーをコピーして`.env`に貼り付け

**注意**: `.env`ファイルは`.gitignore`に含まれており、Gitにコミットされません。

### 4. 開発サーバーの起動
```bash
npm run dev
```

サーバーが起動したら、ブラウザで以下にアクセス：
- **URL**: http://localhost:5173/

## 🏗 ビルド

### プロダクションビルド
```bash
npm run build
```

ビルドされたファイルは`dist/`ディレクトリに出力されます。

### ビルドのプレビュー
```bash
npm run preview
```

## 🔧 トラブルシューティング

### ポートが使用中の場合
Viteは自動的に別のポートを使用します。ターミナルに表示されるURLを確認してください。

### Gemini APIエラー
- APIキーが正しく設定されているか確認
- APIキーのクォータ（無料枠の制限）を確認
- `.env`ファイルの形式が正しいか確認

### 画面が真っ暗/白い場合
1. ブラウザのコンソールを開く（F12キー）
2. エラーメッセージを確認
3. `npm run dev`を再起動

### 依存関係のエラー
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## 📦 主な依存関係

### フロントエンド
- **react**: ^19.1.1
- **react-dom**: ^19.1.1
- **@google/genai**: ^1.27.0

### スタイリング
- **tailwindcss**: ^4.1.16
- **@tailwindcss/vite**: ^4.1.16

### ビルド・開発
- **vite**: ^7.1.7
- **typescript**: ~5.9.3
- **@vitejs/plugin-react**: ^5.0.4

### その他
- **react-markdown**: ^10.1.0
- **react-syntax-highlighter**: ^16.1.0

## 🌐 デプロイ

### Vercelへのデプロイ
1. [Vercel](https://vercel.com/)にログイン
2. GitHubリポジトリを接続
3. 環境変数`VITE_GEMINI_KEY`を設定
4. デプロイ

### Netlifyへのデプロイ
1. [Netlify](https://www.netlify.com/)にログイン
2. GitHubリポジトリを接続
3. ビルドコマンド: `npm run build`
4. 公開ディレクトリ: `dist`
5. 環境変数`VITE_GEMINI_KEY`を設定

## ✅ セットアップ確認

すべてが正しく動作しているか確認：
1. ダッシュボードが表示される
2. RAGボットページに移動できる
3. 「ネットワーク」と入力すると問題が表示される
4. クイズが開始できる

問題がある場合は、[トラブルシューティング](#-トラブルシューティング)を参照してください。
