-- Task Management Application - MySQL Schema
-- Note: Hibernate (spring.jpa.hibernate.ddl-auto=update) will auto-create/update
-- this table on application startup. This file is provided for reference or
-- for manual setup if you prefer to disable Hibernate auto-DDL.

CREATE DATABASE IF NOT EXISTS taskdb;
USE taskdb;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(1000),
    due_date DATE,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Sample data (optional)
INSERT INTO tasks (title, description, due_date, priority, status, created_at, updated_at) VALUES
('Prepare project report', 'Compile findings and write final report', '2026-07-15', 'HIGH', 'PENDING', NOW(), NOW()),
('Team standup', 'Daily sync with the team', '2026-07-10', 'LOW', 'COMPLETED', NOW(), NOW()),
('Review pull requests', 'Check open PRs on the repo', '2026-07-12', 'MEDIUM', 'PENDING', NOW(), NOW());
