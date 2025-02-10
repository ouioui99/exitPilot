# ベースイメージを指定
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "dev"]