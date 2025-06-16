FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install -g expo-cli

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]
