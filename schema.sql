DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    PRIMARY KEY (id),
    FOREIGN KEY (departments_id)
        REFERENCES department(id)
);

CREATE TABLE employees (
    id INT NOT NULL,
    PRIMARY KEY (id),
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
        REFERENCES roles(id), 
    manager_id INT
    FOREIGN KEY (manager_id)
        REFERENCES employees(id)
    
);