FROM node:lts-alpine

WORKDIR /app

RUN npm install -g http-server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 8123

CMD ["http-server", "dist"]

