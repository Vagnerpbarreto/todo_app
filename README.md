# ✅ To-do App (Flask + Angular + Docker)

Este é um projeto fullstack de gerenciamento de tarefas com backend em **Flask (Python)**, frontend em **Angular**, persistência com **SQLite**, testes automatizados com **pytest** e containerização com **Docker**.

---

## 🚀 Tecnologias utilizadas

- **Frontend**: Angular 7+
- **Backend**: Flask (Python 3.11)
- **Banco de dados**: SQLite
- **Testes**: Pytest
- **Containerização**: Docker + Docker Compose

---

## ⚙️ Funcionalidades da API

| Método | Endpoint         | Descrição                  |
|--------|------------------|----------------------------|
| GET    | `/tasks`         | Lista todas as tarefas     |
| POST   | `/tasks`         | Cria uma nova tarefa       |
| PUT    | `/tasks/<id>`    | Atualiza uma tarefa        |
| DELETE | `/tasks/<id>`    | Remove uma tarefa          |

---

## 🧑‍💻 Frontend Angular

- Interface para listar, criar, editar e remover tarefas
- Comunicação com a API usando Angular `HttpClient`

---

## 📦 Como executar o projeto com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/Vagnerpbarreto/todo_app.git
cd todo_app
```

### 2. Suba os containers (backend + frontend)

```bash
docker-compose up --build
```

> O backend estará disponível em: [http://localhost:5000](http://localhost:5000)  
> O frontend estará disponível em: [http://localhost:4200](http://localhost:4200)

Se quiser rodar os containers em segundo plano:

```bash
docker-compose up --build -d
```

Para parar todos os containers:

```bash
docker-compose down
```

---

## ✅ Executar os testes do backend

Os testes automatizados utilizam `pytest` com SQLite em memória.

Para executá-los via Docker:

```bash
docker-compose run --rm backend-tests
```

