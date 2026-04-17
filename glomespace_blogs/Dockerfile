# Stage 1 — Build
FROM node:20-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm python3

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 — Production
FROM node:20-alpine AS production

RUN apk add --no-cache libpng

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /opt/app/build ./build
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/config ./config
COPY --from=builder /opt/app/database ./database
COPY --from=builder /opt/app/src ./src

EXPOSE 1337

CMD ["npm", "run", "start"]