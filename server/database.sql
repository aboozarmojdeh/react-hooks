CREATE DATABASE reacthooks;


CREATE TABLE todo(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email TEXT NOT NULL,
todo_date DATE NOT NULL,
todo_check BOOLEAN NOT NULL DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);