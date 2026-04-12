FROM node:20-alpine AS build

RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm python3

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]