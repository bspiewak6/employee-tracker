const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// const express = require('express');

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
      name: "action",
      type: "list",
      message: "Main Menu",
      choices: 
      [
        "View All Employees",
        "View All Employees By Role",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "View Department Budgets"
      ]
  });
};

// query to view all employees
const viewAllEmployees = () => {
    let query = ``

    // simple query that will SELECT what is being targeted in query variable 
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(err);
     
    // display results of query using console.table
    console.table(res);

    // go back to main menu 
    mainMenu();
  });
};


// query to view all employees by role
const viewAllEmpByRole = () => {

}


// express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); 

// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
// });  

// // PORT designation and app expression
// const PORT = process.env.PORT || 3001;
// const app = express();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });