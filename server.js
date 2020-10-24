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
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
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
    switch (answers.main) {
      case "View All Employees":
        viewAllEmployees();
        break;
    }

  })
};

// query to view all employees
// const viewAllEmployees = () => {
//     let query = ``

//     // simple query that will SELECT what is being targeted in query variable 
//     connection.query(query, function(err, res) {
//         if (err) throw err;
//         res.status(400).json({ error: err.message });
     
//     // display results of query using console.table
//     console.table(res);

//     // go back to main menu 
//     mainMenu();
//   });
// };


// query to view all departments
const viewAllDept = () => {
    let query = `SELECT * FROM departments`;

    connection.query(query, function(err, res) {
      if(err) throw err;
      console.log(err);

      console.table(res);

      mainMenu();
    });
};