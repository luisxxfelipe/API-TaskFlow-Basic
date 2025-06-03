# TaskFlow - Fullstack

Sistema completo para gerenciamento de tarefas e usuários, com autenticação JWT, frontend em React e backend em Node.js + Express + MySQL.

## 🚀 Tecnologias utilizadas

- Node.js
- Express.js
- MySQL
- React.js
- JWT (JSON Web Token)
- Axios
- Dotenv

## 📦 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/luisxxfelipe/API-TaskFlow-Basic
cd API-TaskFlow-Basic
```

### 2. Backend (Node.js)
```bash
npm install
```

- Crie um arquivo `.env` na raiz com:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=taskflow
JWT_SECRET=umsegurosegredoparajwt
```

- Crie o banco de dados e tabelas:
```sql
CREATE DATABASE IF NOT EXISTS taskflow DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taskflow;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Inicie o backend:
```bash
node server.js
```

### 3. Frontend (React)
```bash
cd client
npm install
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🔒 Autenticação
- Cadastro e login de usuários com senha.
- Após login, o frontend armazena o token JWT e envia em todas as requisições protegidas.
- Apenas usuários com `is_admin = 1` podem acessar a tela de usuários.
- Cada usuário só vê e gerencia suas próprias tasks.

## 🗂️ Estrutura de Pastas

```
API-TaskFlow-Basic/
  client/           # Frontend React
    src/
      components/   # Componentes reutilizáveis
      services/     # Serviço de API (axios)
      App.js        # Lógica principal
      App.css       # Estilos
  src/              # Backend Node.js
    controllers/
    middlewares/
    models/
    repositories/
    routes/
    services/
    config/
    app.js
  .env
  server.js
```

## 🛠️ Funcionalidades
- Cadastro, login e autenticação JWT
- CRUD de usuários (apenas admin)
- CRUD de tasks (cada usuário vê apenas as suas)
- Menu lateral para navegação
- UI moderna e responsiva

## 📄 Observações
- Para criar o primeiro admin, altere o campo `is_admin` do usuário no banco para 1.
- O sistema está pronto para crescer: adicione mais entidades, permissões, filtros, etc.
