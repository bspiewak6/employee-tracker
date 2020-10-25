const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const names = [];

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
  welcome();
});

const welcome = () => {
// employee manager application banner
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
  // startup main menu as mainMenu()
  mainMenu();
};

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
        // "Update An Employee Role", 
        "Exit Application"
        // "Delete An Employee", // bonus
        // "Update Employee Managers", // bonus
        // "View Employees By Manager", // bonus
        // "View Employees By Department" // bonus
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
      case "Exit Application":
        exitApp();
        break;
      // case "Update An Employee Role":
      //   updateEmployeeRole();
      //   break;
      // case "Delete An Employee":
      //   deleteEmployee();
      //   break;
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
      type: "input",
      name: "department",
      message: "What would you like to name the new department?"
    })
    .then(answers => {
      console.log(answers)
      connection.query(`INSERT INTO departments SET ?`,
        {
          name: answers.department,
        },
        function(err, res) {
          if(err) throw err;
          console.log(res.affectedRows + ' department added! Please view all departments to verify \n');
          mainMenu();
        });
    });
};

// query to add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What would you like to name the role?",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log('You must enter the name of the role.');
            return false;
          }
        }
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary for this role?",
        validate: (salaryInput) => {
          if (salaryInput >= 20000) {
            return true;           
          } else {
            console.log('You must enter the appropriate salary for this role.');
            return false;
          }
        }
      },
      {
         type: "number",
         name: "dept",
         message: "What is the department ID for this role?", 
         validate: (deptInput) => {
           if (!deptInput) {
            console.log('You must enter the department ID for this role'); 
            return false;
           } else {
            return true;
           }
         } 
      }
    ])
    .then(answers => {
      console.log(answers)
      connection.query(`INSERT INTO roles SET ?`,
        {
          title: answers.roleTitle,
          salary: answers.salary,
          department_id: answers.dept
        },
        function(err, res) {
          if(err) throw err;
          console.log(res.affectedRows + ' role added! Please view all roles to verify \n');
          mainMenu()
        });
    });
};

// query to add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empFirstName",
        message: "What is the employee's first name?",
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log("You must enter the employee's first name."); 
           return false;
          }
        } 
      },
      {
        type: "input",
        name: "empLastName",
        message: "What is the employee's last name?",
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log("You must enter the employee's last name."); 
           return false;
          }
        }
      },
      {
        type: 'number',
        name: 'empRole',
        message: `What is the employee's role id from the list below? \n (1) Sales Lead \n (2) Salesperson \n (3) Accountant \n (4) Chief Marketing Officer
 (5) Legal Team Lead \n (6) Software Engineer \n (7) Lawyer \n (8) Graphic Designer \n`,
        validate: function (idInput) {
        var valid = !isNaN(parseFloat(idInput));
        return valid || "Please enter the employee's role id number.";
        },
        filter: Number
      },
      {
        type: 'number',
        name: 'empManager',
        message: `Who is this employee's manager? Please provide the manager's ID \n (null) None \n (1) Pierre-Emerick Aubameyang \n (2) Granit Xhaka \n (3) Bukayo Saka \n`,
      }
      ])
      .then(answers => {
      connection.query(`INSERT INTO employees SET ?`,
        {
          first_name: answers.empFirstName,
          last_name: answers.empLastName,
          role_id: answers.empRole,
          manager_id: answers.empManager
        },
        function(err, res) {
          if(err) throw err;
          console.log(res.affectedRows + ' employee added! Please view all employees to verify \n');
          mainMenu()
        });
    });
};

// query to update an employee role
updateEmployeeRole = () => {
  connection.query(`SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Employee_Name FROM employees;`,
      function (err, res) {
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
              let name = res[i].Employee_Name;
              names.push(name);
          }
          console.log(names);
          inquirer.prompt([
              {
                  type: 'list',
                  name: 'selectedEmp',
                  message: 'Which employee do you want to update a role for?',
                  choices: names
              }
          ])
              .then((response) => {
                  inquirer.prompt({
                      type: 'input',
                      name: 'empRoleUpdate',
                      message: `What is the new role this employee?`
                  })
                      .then(
                          connection.query(`UPDATE employees SET role_id VALUES ? WHERE CONCAT(employees.first_name, " ", employees.last_name) = ${selectedEmp}; `,
                              {
                                  role_id: response.empRole
                              },
                              (err, res) => {
                                  if (err) throw err;
                                  console.log(`\n ${selectedEmp} 's role updated! \n`);;
                              },
                              mainMenu()
                          )
                      );
              });
      });
};

// query to delete an employee
// const deleteEmployee = () => {
//   connection.query(`SELECT id, first_name, last_name FROM employees;`,
//       (err, res) => {
//           if (err) throw err;
//           console.table(res);
//       })
//       .then(
//           inquirer.prompt([
//               {
//                   type: 'number',
//                   name: 'deleteEmp',
//                   message: 'Provide the ID of the employee listed above that you want to delete. \n'
//               }
//           ]))
//       .then((deleteEmp) => {
//           connection.query(`DELETE FROM employees WHERE ?; `,
//               {
//                   id: deleteEmp.id
//               },
//               function(err, res) {
//                   if (err) throw err;
//                   console.log(res.affectedRows + ' employee deleted! Please view all employees to verify \n');
//               }
//           );
//       });
// };

// exit app
const exitApp = () => {
  connection.end();
};
