INSERT INTO departments (name)
VALUES  
('Sales'),
('Engineering'),
('Finance'),
('Marketing'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES  
('Sales Lead', 100000, 1),
('Salesperson', 85000, 1),
('Accountant', 125000, 3),
('Chief Marketing Officer', 145000, 4),
('Legal Team Lead', 175000, 5),
('Software Engineer', 90000, 2),
('Lawyer', 100000, 5),
('Graphic Designer', 95000, 4);

-- Employee table seed data
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Pierre-Emerick', 'Aubameyang', 1, null),
('Alexandre', 'Lacazette', 2, 1),
('Thomas', 'Partey', 3, null),
('Granit', 'Xhaka', 4, null),
('Bukayo', 'Saka', 5, null),
('Gabriel','Magalhães', 6, null),
('Hector', 'Bellerin', 7, 5),
('Kieran', 'Tierney', 8, 4);
