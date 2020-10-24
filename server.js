const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password1',
  database: 'employee_db'
});

// Establish connection to database
connection.connect(err => {
  if (err) throw err;

  // startup main menu as mainMenu()
  console.log('Employee Tracker Main Menu');
  mainMenu();
});

mainMenu = () => {
  // prompt creating main menu for user to choose from
  inquirer.prompt(
    {
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: 
      [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Exit Application"
        // "Update Employee Managers",
        // "View Employees By Manager",
        // "View Employees By Department"
        // "Delete An Employee",
        // "Delete A Role",
        // "Delete A Department",
        // "View Department Budgets"
      ]
  })
  .then(answers => {
    switch (answers.menu) {
      case "View All Departments":
        viewAllDept();
        break;  
      case "View All Roles":
        viewAllRoles();
        break  
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add A Department":
        addDepartment();
        break;
      case "Add A Role":
        addRole();
        break;
      case "Add An Employee":
        addEmployee();
        break;
      case "Update An Employee Role":
        updateEmployeeRole();
        break;
      case "Exit Application":
        exitApp();
        break;
    }
  })
};

// query to view all departments
const viewAllDept = () => {
    console.log('Displaying all departments');
    connection.query('SELECT * FROM departments;', function (err, res) {
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
};

// query to view all roles
const viewAllRoles = () => {
  console.log('Displaying all roles');
  connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS departments_name 
                    FROM roles 
                    LEFT JOIN departments ON roles.department_id = departments.id;`, function (err, res) {
      if(err) throw err;
      console.table(res);
      mainMenu();
  });
};

// query to view all employees
const viewAllEmployees = () => {
  console.log('Displaying all employees');
  connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS Dept_Name,
                  FROM employees
                  RIGHT JOIN roles ON employees.role_id = roles.id
                  RIGHT JOIN departments ON roles.department_id = departments.id;`, function (err, res) {
      if(err) throw err;
      console.table(res);
      mainMenu();
  });
};

// query to add a department
const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What would you like to name the new department?"
    })
    .then(answers => {
      connection.query(`INSERT INTO department SET ?`,
        {
          name: answers.department,
        },
        function(err, res) {
          if(err) throw err;
          mainMenu();
        });
    });
};

// exit app
const exitApp = () => {
  connection.end();
};
