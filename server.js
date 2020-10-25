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
// employee manager banner
console.log(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`);
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
        "View All Departments", // required
        "View All Roles", // required
        "View All Employees", // required
        "Add A Department", // required
        "Add A Role", // required 
        "Add An Employee", // required
        "Update An Employee Role", // required
        "Exit Application" // required
        // "Update Employee Managers", // bonus
        // "View Employees By Manager", // bonus
        // "View Employees By Department" // bonus
        // "Delete An Employee", // bonus
        // "Delete A Role", // bonus
        // "Delete A Department", // bonus
        // "View Department Budgets" // bonus
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
  connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
                  departments.name AS department, roles.salary, employees.manager_id AS manager
                  FROM employees
                  RIGHT JOIN roles ON employees.role_id = roles.id
                  RIGHT JOIN departments ON roles.department_id = departments.id 
                  ORDER BY employees.id;`, function (err, res) {
      if(err) throw err;
      console.table(res);
      mainMenu();
  });
};

// query to add a department
const addDepartment = () => {
  console.log('Adding a new department...\n');
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What would you like to name the new department?"
    })
    .then(answers => {
      connection.query(`INSERT INTO departments SET ?`,
        {
          name: answers.department,
        },
        function(err, res) {
          if(err) throw err;
          console.log(res.affectedRows + ' department added! Please view all departments to verify \n');
          // console.table(res)
          // viewAllDept();
          mainMenu();
        });
    });
};

// query to add a role
const addRole = () => {
  inquirer
    .prompt(
      {
        name: "title",
        type: "input",
        message: "What would you like to name the role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
      },
    )
    .then(answers => {
      connection.query(`INSERT INTO roles SET ?`,
        {
          title: answers.title,
        },
        {
          salary: answers.salary
        },
        function(err, res) {
          if(err) throw err;
          console.table(res)
          mainMenu();
        });
    });
};

// query to add an employee
const addEmployee = () => {
  inquirer
    .prompt(
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "roleInput",
        type: "list",
        message: "What is the employee's role?"
      },
    )
    .then(answers => {
      connection.query(`INSERT INTO roles SET ?`,
        {
          firstName: answers.firstName,
        },
        {
          lastName: answers.lastName
        },
        function(err, res) {
          if(err) throw err;
          console.table(res)
          mainMenu();
        });
    });
};

// exit app
const exitApp = () => {
  connection.end();
};
