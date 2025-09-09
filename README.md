# API REST Node.js - Sistema de Cursos

Uma API REST moderna construída com Node.js, Fastify, TypeScript e PostgreSQL para gerenciamento de cursos.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas TypeScript
- **Docker** - Containerização do banco de dados

## 📋 Funcionalidades

- ✅ Criar novos cursos
- ✅ Listar todos os cursos
- ✅ Buscar curso por ID
- ✅ Documentação automática da API (Swagger/OpenAPI)
- ✅ Validação de dados com Zod
- ✅ Logs estruturados com Pino
- ✅ Migrações de banco de dados com Drizzle

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/IghorTI/new-api-rest-nodejs.git
   cd new-api-rest-nodejs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
   NODE_ENV=development
   ```

4. **Inicie o banco de dados com Docker**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco**
   ```bash
   npm run db:migrate
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333`

## 📚 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run test` - Executa o servidor (modo produção)
- `npm run db:generate` - Gera migrações do banco de dados
- `npm run db:migrate` - Executa migrações do banco de dados
- `npm run db:studio` - Abre o Drizzle Studio para visualizar o banco

## 🔗 Endpoints da API

### Base URL
```
http://localhost:3333
```

### Cursos

#### Criar Curso
```http
POST /courses
Content-Type: application/json

{
  "title": "Nome do Curso"
}
```

**Resposta (201):**
```json
{
  "courseId": "uuid-do-curso"
}
```

#### Listar Todos os Cursos
```http
GET /courses
```

**Resposta (200):**
```json
{
  "courses": [
    {
      "id": "uuid-do-curso",
      "title": "Nome do Curso"
    }
  ]
}
```

#### Buscar Curso por ID
```http
GET /courses/:id
```

**Resposta (200):**
```json
{
  "course": {
    "id": "uuid-do-curso",
    "title": "Nome do Curso",
    "description": "Descrição do curso"
  }
}
```

**Resposta (404):**
```json
null
```

## 🔄 Fluxo da Aplicação

O diagrama abaixo ilustra o fluxo mais importante da aplicação - o ciclo de vida dos cursos:

```mermaid
flowchart TD
    subgraph "Cliente"
        A[Cliente HTTP]
    end
    
    subgraph "API Layer"
        B[Fastify Server<br/>Port: 3333]
        C[Validação Zod<br/>Schema Validation]
        D[Rotas de Cursos<br/>/courses endpoints]
    end
    
    subgraph "Data Layer"
        E[Drizzle ORM<br/>TypeScript ORM]
        F[PostgreSQL<br/>Database]
    end
    
    subgraph "Operações"
        G[POST /courses<br/>Criar Curso]
        H[GET /courses<br/>Listar Cursos]
        I[GET /courses/:id<br/>Buscar por ID]
    end
    
    A -->|HTTP Request| B
    B --> C
    C -->|Valid| D
    C -->|Invalid| J[400 Bad Request]
    D --> E
    E --> F
    
    D --> G
    D --> H
    D --> I
    
    G -->|Insert| K[Curso Criado<br/>201 Created]
    H -->|Select All| L[Lista de Cursos<br/>200 OK]
    I -->|Select by ID| M{Curso Existe?}
    M -->|Sim| N[Curso Encontrado<br/>200 OK]
    M -->|Não| O[404 Not Found]
    
    K --> A
    L --> A
    N --> A
    O --> A
    J --> A
    
    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#e1f5fe
    style H fill:#e1f5fe
    style I fill:#e1f5fe
```

### Componentes Principais

- **Fastify Server**: Servidor web rápido com suporte a TypeScript
- **Zod**: Validação de schemas e tipos em tempo de execução
- **Drizzle ORM**: ORM TypeScript-first para interação com PostgreSQL
- **PostgreSQL**: Banco de dados relacional para persistência dos dados

## 📖 Documentação da API

Quando o servidor estiver rodando em modo de desenvolvimento, a documentação interativa da API estará disponível em:

- **Swagger UI**: `http://localhost:3333/docs`
- **Scalar API Reference**: Interface moderna para explorar a API

## 🗄️ Estrutura do Banco de Dados

### Tabela `courses`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (chave primária) |
| title | TEXT | Título do curso (único, obrigatório) |
| description | TEXT | Descrição do curso (opcional) |

### Tabela `users`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (chave primária) |
| name | TEXT | Nome do usuário (obrigatório) |
| email | TEXT | Email do usuário (único, obrigatório) |

## 🏗️ Estrutura do Projeto

```
src/
├── database/
│   ├── client.ts      # Configuração do cliente Drizzle
│   └── schema.ts      # Definição das tabelas do banco
└── routes/
    ├── create-course.ts      # Rota para criar cursos
    ├── get-courses.ts        # Rota para listar cursos
    └── get-courses-by-id.ts  # Rota para buscar curso por ID
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | `postgresql://postgres:postgres@localhost:5432/desafio` |
| `NODE_ENV` | Ambiente de execução | `development` |

### Docker Compose

O projeto inclui um `docker-compose.yml` configurado com:
- PostgreSQL 17
- Usuário: `postgres`
- Senha: `postgres`
- Banco: `desafio`
- Porta: `5432`

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente adequadas
2. Execute as migrações do banco de dados
3. Inicie o servidor com `npm run test`

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**IghorTI**
- GitHub: [@IghorTI](https://github.com/IghorTI)

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma [issue](https://github.com/IghorTI/new-api-rest-nodejs/issues) no repositório.
