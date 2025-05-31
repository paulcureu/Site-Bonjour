FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y wget

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./
RUN pnpm install

COPY . .

# ✅ generează Prisma Client după ce codul e copiat
RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "dev"]
