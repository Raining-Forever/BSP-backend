CREATE DATABASE test;

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    age INT NOT NULL,
    address VARCHAR(255),
    email VARCHAR(50)
);