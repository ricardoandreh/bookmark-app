# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /workspace

# Copiando arquivos principais do monorepo
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.base.json tsconfig.json nx.json pnpm-workspace.yaml ./

# Copiando apps e libs
COPY apps apps
COPY libs libs

# Instalando pnpm e dependências
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build do app NestJS
RUN pnpm nx build api

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

# Copiando apenas os artefatos necessários
COPY --from=builder /workspace/dist/out-tsc/src ./dist
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/api/assets ./assets

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
