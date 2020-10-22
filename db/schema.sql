DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,0),
    department_id INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11) NOT NULL,
    manager_id INTEGER(11),
    PRIMARY KEY (id)
);