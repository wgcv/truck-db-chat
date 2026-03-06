# truck-db-chat

A truck database chat application with backend API, AI agent, and frontend.

## Quick start

Using docker

```bash
make up    # Build and start all services
make down  # Stop services
make clean # Stop, remove volumes, and prune images
```

## Makefile

| Command | Description |
|---------|-------------|
| `make up` | Build and start all services (Docker Compose) |
| `make down` | Stop all services |
| `make build` | Build Docker images |
| `make clean` | Stop services, remove volumes, prune images |

## Environment variables

### `backend/`

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Path to SQLite database file | `./db.sqlite` or `/app/data/db.sqlite` (Docker) |

**Local dev:** Create `backend/.env` with `DATABASE_URL=./db.sqlite` (or your preferred path).

**Docker:** Set in `docker-compose.yml`; data is persisted in `./data/backend`.

---

### `ai-agent/`

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM calls | `sk-or-v1-xxx` |
| `BACKEND_URL` | Backend API base URL | `http://localhost:3000` (local) or `http://backend:3000` (Docker) |

**Local dev:** Create `ai-agent/.env`:

```
OPENROUTER_API_KEY="sk-or-v1-your-key" or ChatGPT Key
BACKEND_URL="http://localhost:3000"
```

**Docker:** Uses `ai-agent/.env`; `BACKEND_URL` is overridden to `http://backend:3000` for service-to-service calls.

---

### `frontend/`

No environment variables required for basic usage.
