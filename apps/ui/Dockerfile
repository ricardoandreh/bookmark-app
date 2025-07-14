# Stage 1: Build Angular app
FROM node:22-alpine AS builder

WORKDIR /workspace

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.base.json tsconfig.json ./
COPY nx.json ./
COPY pnpm-workspace.yaml ./
COPY apps/ui apps/ui

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm nx build ui --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do Angular para a pasta pública do Nginx
COPY --from=builder /workspace/dist/apps/ui/browser /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY apps/ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
