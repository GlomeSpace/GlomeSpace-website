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

RUN apk add --no-cache libpng        # only the runtime lib, not the dev tools

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev                # no devDependencies

COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/config ./config
COPY --from=builder /opt/app/database ./database

EXPOSE 1337

CMD ["npm", "run", "start"]