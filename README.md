# GymPass API

Aplicação estilo GymPass construída com Fastify, TypeScript, Prisma e PostgreSQL. Inclui autenticação JWT, controle de acesso por função (ADMIN/MEMBER), regras de negócio para check-ins e um conjunto de testes unitários e E2E.

## Sumário
- Sobre o projeto
- Tecnologias
- Pré-requisitos
- Configuração e execução
- Banco de dados e Prisma
- Scripts NPM
- Endpoints principais (com exemplos)
- Autenticação e autorização
- Testes
- CI/CD
- Convenções de código
- Troubleshooting
- Licença

## Sobre o projeto

Funcionalidades principais:
- Cadastro e autenticação de usuários
- Perfil do usuário autenticado
- Cadastro de academias (apenas ADMIN)
- Busca de academias por nome e por proximidade
- Check-in em academia próxima e validação de check-in (apenas ADMIN)
- Histórico e métricas de check-ins do usuário

Regras de negócio (resumo):
- E-mail único por usuário
- Um check-in por dia por academia
- Check-in permitido somente próximo à academia (100m)
- Validação de check-in até 20 minutos após a criação
- Ações administrativas restritas a usuários com role ADMIN

## Tecnologias
- Node.js + TypeScript
- Fastify 5
- Zod para validação
- Prisma ORM (PostgreSQL)
- JWT (com refresh token via cookie)
- Vitest (unitário e E2E)
- ESLint
- Docker (PostgreSQL via docker-compose)

## Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm (ou outro gerenciador, mas este projeto usa package-lock.json)
- Docker + Docker Compose (para subir PostgreSQL)

## Configuração e execução

1) Instale as dependências
- npm install

2) Configure variáveis de ambiente
- Copie o arquivo .env.exemple para .env e ajuste conforme necessário
  - cp .env.exemple .env

Variáveis disponíveis (padrão do exemplo):
- NODE_ENV=dev
- JWT_SECRET=supersecretkey
- DATABASE_URL=postgres://docker:docker@localhost:5432/gympassapi?schema=public
- PORT=3333

3) Suba o banco via Docker
- docker compose up -d

4) Gere o Prisma Client e aplique as migrations
- npx prisma generate
- npx prisma migrate deploy
  - Em ambiente de desenvolvimento você também pode usar: npx prisma migrate dev

5) Execute a aplicação em desenvolvimento
- npm run dev
  - Servidor em http://localhost:3333

6) Build e execução em produção (opcional)
- npm run build
- npm start

## Banco de dados e Prisma
- O datasource está configurado em prisma/schema.prisma usando a variável DATABASE_URL.
- O client do Prisma é gerado em generated/prisma (veja o generator no schema.prisma). Caso veja erros de import do PrismaClient, rode npx prisma generate.
- Para inspecionar os dados localmente, você pode usar: npx prisma studio

## Scripts NPM
- dev: Inicia o servidor em modo watch com tsx
- build: Gera build com tsup
- start: Executa o servidor compilado (build/server.js)
- test: Executa testes unitários (vitest --project unit --run)
- test:watch: Executa testes unitários em watch
- test:e2e: Executa testes E2E (vitest --project e2e --run)
- test:e2e:watch: Executa testes E2E em watch
- test:ui: Interface interativa do Vitest
- test:coverage: Gera relatório de cobertura

## Endpoints principais (com exemplos)
Base URL: http://localhost:3333

Usuários
- POST /users - Cadastro
  - body: { name: string, email: string, password: string }
  - 201 Created
- POST /sessions - Autenticação
  - body: { email: string, password: string }
  - 200 OK { token: string } e define um refreshToken em cookie HttpOnly
- PATCH /token/refresh - Renovação do token de acesso
  - Requer cookie refreshToken
  - 200 OK { token: string }
- GET /me - Perfil
  - Requer Bearer token (Authorization: Bearer <token>)
  - 200 OK { id, name, email, role, created_at }

Academias (requer JWT)
- GET /gyms/search?q=academia&page=1 - Busca por nome
  - 201 OK { gyms: Gym[] }
- GET /gyms/nearby?latitude=-23.5&longitude=-46.6 - Próximas
  - 201 OK { gyms: Gym[] }
- POST /gyms - Criação de academia (apenas ADMIN)
  - body: { title: string, description?: string | null, phone?: string | null, latitude: number, longitude: number }
  - 201 Created

Check-ins (requer JWT)
- POST /gyms/:gymId/check-ins - Realiza check-in na academia
  - body: { latitude: number, longitude: number }
  - 201 Created
- GET /check-ins/history?page=1 - Histórico do usuário
  - 200 OK { checkIns: CheckIn[] }
- GET /check-ins/metrics - Métricas do usuário
  - 200 OK { checkInsCount: number }
- PATCH /check-ins/:checkInId/validate - Valida check-in (apenas ADMIN)
  - 204 No Content

Exemplos de requisições (curl)
- Cadastro
  - curl -X POST http://localhost:3333/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'

- Login
  - curl -i -X POST http://localhost:3333/sessions \
    -H "Content-Type: application/json" \
    -d '{"email":"alice@example.com","password":"secret123"}'
  - Observação: a resposta retorna { token } e um cookie refreshToken (HttpOnly)

- Perfil (substitua TOKEN abaixo)
  - curl http://localhost:3333/me \
    -H "Authorization: Bearer TOKEN"

- Criar academia (ADMIN)
  - curl -X POST http://localhost:3333/gyms \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"title":"Academia X","description":null,"phone":null,"latitude":-23.5,"longitude":-46.6}'

- Buscar academias
  - curl "http://localhost:3333/gyms/search?q=academia&page=1" \
    -H "Authorization: Bearer TOKEN"

- Academias próximas
  - curl "http://localhost:3333/gyms/nearby?latitude=-23.5&longitude=-46.6" \
    -H "Authorization: Bearer TOKEN"

- Check-in
  - curl -X POST http://localhost:3333/gyms/GYM_ID/check-ins \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"latitude":-23.5,"longitude":-46.6}'

- Histórico de check-ins
  - curl "http://localhost:3333/check-ins/history?page=1" \
    -H "Authorization: Bearer TOKEN"

- Métricas
  - curl http://localhost:3333/check-ins/metrics \
    -H "Authorization: Bearer TOKEN"

- Validar check-in (ADMIN)
  - curl -X PATCH http://localhost:3333/check-ins/CHECKIN_ID/validate \
    -H "Authorization: Bearer TOKEN"

## Autenticação e autorização
- O login retorna um access token (JWT) que deve ser enviado no header Authorization: Bearer <token>.
- Um refresh token é definido em cookie HttpOnly na autenticação e no endpoint de refresh. Importante: o cookie é configurado com secure: true e sameSite: true. Em ambientes HTTP (sem HTTPS) alguns clientes não armazenam cookies com a flag secure. Para testar o fluxo de refresh localmente:
  - Use um cliente que tolere cookies secure em localhost via HTTP, ou rode o servidor atrás de HTTPS, ou ajuste o código para secure: false somente em dev (não recomendado em produção).
- Controle de acesso por função:
  - ADMIN: pode criar academias e validar check-ins
  - MEMBER: uso normal da aplicação

## Testes
- Pré-requisito: o PostgreSQL deve estar rodando (docker compose up -d).
- Testes unitários: npm test ou npm run test:watch
- Testes E2E: npm run test:e2e ou npm run test:e2e:watch
- Cobertura: npm run test:coverage
- Observação: o ambiente E2E cria um schema temporário por execução (prisma/vitest-environment-prisma). As migrations são aplicadas automaticamente (npx prisma migrate deploy) e o schema é descartado no teardown.

## CI/CD
- Workflows de GitHub Actions para testes unitários e E2E (arquivos em .github/workflows/). Os pipelines executam os scripts de testes definidos no package.json.

## Convenções de código
- TypeScript com strict
- ESLint (configuração em eslint.config.mts)
- Estilo recomendado: npx eslint . --ext .ts

## Troubleshooting
- PrismaClient not found / import errors
  - Rode npx prisma generate
- Erro de conexão com banco
  - Verifique docker compose up -d e a variável DATABASE_URL no .env
- Porta 3333 ocupada
  - Ajuste PORT no .env ou libere a porta
- Refresh token não é salvo em dev
  - O cookie usa secure: true. Em HTTP, clientes podem ignorá-lo. Use HTTPS ou um cliente que permita cookies secure em localhost para testar o fluxo de refresh

## Licença
- ISC
