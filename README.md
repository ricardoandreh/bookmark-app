# Bookmark APP

Bookmark APP é uma aplicação fullstack para gerenciamento de favoritos (bookmarks), composta por um frontend Angular e um backend Node.js (NestJS), ambos organizados em um monorepo Nx. O projeto utiliza banco de dados PostgreSQL e pode ser executado tanto localmente (via PNPM/Nx) quanto em containers Docker (via Docker Compose).

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Requisitos](#requisitos)
- [Instalação e Execução Local (PNPM + Nx)](#instalação-e-execução-local-pnpm--nx)
- [Execução com Docker Compose](#execução-com-docker-compose)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Comandos Úteis Nx](#comandos-úteis-nx)
- [Licença](#licença)

---

## Sobre o Projeto

O **Bookmark APP** permite que usuários cadastrem, organizem e consultem seus links favoritos. O frontend é construído em Angular, enquanto o backend expõe uma API RESTful (Node.js/NestJS) e utiliza PostgreSQL para persistência dos dados.

- **Frontend:** Angular (`apps/ui`)
- **Backend:** Node.js/NestJS (`apps/api`)
- **Banco de Dados:** PostgreSQL
- **Monorepo:** Nx
- **Gerenciador de pacotes:** PNPM

---

## Requisitos

- [Node.js](https://nodejs.org/) (recomendado: v18+)
- [PNPM](https://pnpm.io/) (recomendado: v8+)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, para execução via containers)

---

## Instalação e Execução Local (PNPM + Nx)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/bookmark-app.git
   cd bookmark-app
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário.

4. **Suba o banco de dados (opcional, se não for usar Docker Compose):**
   - Você pode rodar um PostgreSQL localmente ou usar o Docker Compose apenas para o banco:
     ```bash
     docker compose up -d postgres
     ```

5. **Execute o backend:**
   ```bash
   pnpm nx serve api
   ```
   O backend estará disponível em `http://localhost:3000`.

6. **Execute o frontend:**
   ```bash
   pnpm nx serve ui
   ```
   O frontend estará disponível em `http://localhost:4200`.

---

## Execução com Docker Compose

A maneira mais simples de rodar toda a stack (frontend, backend e banco) é via Docker Compose:

1. **Configure as variáveis de ambiente:**
   - Copie `.env.example` para `.env` e ajuste as variáveis conforme necessário.

2. **Suba todos os serviços:**
   ```bash
   docker compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: [http://localhost:4200](http://localhost:4200)
   - Backend (API): [http://localhost:3000](http://localhost:3000)
   - Banco de dados: [localhost:5432](localhost:5432) (PostgreSQL)

4. **Parar os containers:**
   ```bash
   docker compose down
   ```

---

## Estrutura do Projeto

```
bookmark-app/
├── apps/
│   ├── api/         # Backend (Node.js/NestJS)
│   └── ui/          # Frontend (Angular)
├── libs/            # Bibliotecas compartilhadas (se houver)
├── compose.yml      # Docker Compose
├── package.json     # Dependências e scripts do monorepo
├── pnpm-workspace.yaml
├── nx.json          # Configuração do Nx
└── ...
```

---

## Comandos Úteis Nx

- **Build frontend:**  
  `pnpm nx build ui`

- **Build backend:**  
  `pnpm nx build api`

- **Rodar backend:**  
  `pnpm nx serve api`

- **Rodar frontend:**  
  `pnpm nx serve ui`

- **Lint:**  
  `pnpm nx lint api`  
  `pnpm nx lint ui`

- **Executar todos os builds e testes afetados:**  
  `pnpm nx affected -t test build`

---

## Licença

Este projeto está sob a licença MIT.

---

Se precisar de mais detalhes ou quiser expandir o README com exemplos de uso da API, testes ou contribuições, é só avisar!
