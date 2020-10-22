INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Marketing'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 85000, 1),
    ('Accountant', 125000, 3),
    ('Chief Marketing Officer', 145000, 4),
    ('Legal Team Lead', 175000, 5),
    ('Software Engineer', 90000, 2),
    ('Lawyer', 100000, 5),
    ('Graphic Designer', 95000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Pierre-Emerick', 'Aubameyang', 101, null ),
    ('Alexandre', 'Lacazette', 102, 1),
    ('Thomas', 'Partey', 103, null),
    ('Granit', 'Xhaka', 104, null),
    ('Bukayo', 'Saka', 105, null),
    ('Gabriel','Magalhães', 106, null),
    ('Hector', 'Bellerin', 107, 5),
    ('Kieran', 'Tierney', 108, 4);
