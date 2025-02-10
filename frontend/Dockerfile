# ベースイメージを指定
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# ポートを公開
EXPOSE 5173

# アプリケーションを起動
CMD ["npm", "run", "dev"]