# Task / To-Do Management Application

A full-stack task management app built with **Spring Boot**, **MySQL**, and **React**, based on the mini-project spec (Project #4) from the Department of CSE.

## Features
- Add task with title, description, due date, priority
- Mark task as completed / pending (checkbox toggle)
- Edit and delete tasks
- Filter tasks by status and/or priority
- Search tasks by title
- Dashboard showing task summary (total, pending, completed, high priority, overdue)
- Backend validation (DTOs) and centralized exception handling
- REST API built with Spring Boot, Spring Data JPA, Hibernate
- Frontend built with React, useState/useEffect hooks, Axios

## Project Structure
```
task-management-app/
├── backend/                 # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/taskapp/
│       ├── entity/           # Task, Priority, TaskStatus
│       ├── repository/       # TaskRepository (Spring Data JPA)
│       ├── dto/               # TaskRequest, TaskResponse, TaskSummary
│       ├── service/           # TaskService (business logic)
│       ├── controller/        # TaskController (REST endpoints)
│       ├── exception/         # Custom exceptions + global handler
│       └── config/            # CORS configuration
├── frontend/                # React app
│   └── src/
│       ├── api/taskApi.js     # Axios API calls
│       ├── components/        # TaskForm, TaskList, TaskItem, FilterBar, Dashboard
│       └── App.js
└── database/
    └── schema.sql            # Reference SQL (auto-created by Hibernate too)
```

## Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8+ running locally

## Setup & Run

### 1. Database
Create the database (or let Hibernate auto-create it — see `application.properties`):
```sql
CREATE DATABASE taskdb;
```
Update credentials in `backend/src/main/resources/application.properties` if your MySQL
username/password differ from the defaults (`root` / `root`).

### 2. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
The API will start on **http://localhost:8080**. Hibernate will auto-create the `tasks` table.

### 3. Frontend (React)
In a separate terminal:
```bash
cd frontend
npm install
npm start
```
The app will open on **http://localhost:3000** and talk to the backend at `http://localhost:8080/api/tasks`.

## API Endpoints

| Method | Endpoint                    | Description                          |
|--------|------------------------------|---------------------------------------|
| POST   | `/api/tasks`                 | Create a new task                     |
| GET    | `/api/tasks`                 | List all tasks (optional `status`, `priority` query params) |
| GET    | `/api/tasks/{id}`            | Get a task by id                      |
| PUT    | `/api/tasks/{id}`            | Update a task (full update)           |
| PATCH  | `/api/tasks/{id}/status`     | Update just the status                |
| DELETE | `/api/tasks/{id}`            | Delete a task                         |
| GET    | `/api/tasks/search?title=`   | Search tasks by title (partial match) |
| GET    | `/api/tasks/summary`         | Dashboard summary counts              |

### Example: create a task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Finish project report",
    "description": "Compile findings and submit",
    "dueDate": "2026-07-20",
    "priority": "HIGH",
    "status": "PENDING"
  }'
```

## Notes
- CORS is configured to allow requests from `http://localhost:3000`.
- Validation errors (e.g. missing title) return HTTP 400 with field-level messages.
- Requesting a task that doesn't exist returns HTTP 404 with a clear error message.
- `spring.jpa.hibernate.ddl-auto=update` means the schema is kept in sync automatically;
  disable this and use `database/schema.sql` manually for production use.
