# To-Do Task Frontend

A React frontend application for managing tasks.

## Prerequisites

- Node.js (v18+)
- Docker
- Backend API running on `http://localhost:8081`

## Quick Start

### Local Development
```bash
git clone <repository-url>
cd to-do-task-frontend
npm install
npm start
```

### Docker (Recommended)
```bash
git clone <repository-url>
cd to-do-task-frontend
docker build -t to-do-task-frontend .
docker run -d -p 3000:80 --name my-todo-app to-do-task-frontend
```

Access at: `http://localhost:3000`

## Environment Setup

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8081/api
```

## Docker Commands

```bash
# Build image
docker build -t to-do-task-frontend .

# Run container
docker run -d -p 3000:80 --name my-todo-app to-do-task-frontend

# Stop container
docker stop my-todo-app

# Remove container
docker rm my-todo-app
```

## Backend Requirements

Ensure your Spring Boot backend is running on `http://localhost:8081/api` with CORS configured for `http://localhost:3000`.
