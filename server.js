const express = require('express');
const inquirer = require('inquirer')
const consoleTable = require('console.table')

// Import and require mysql2
const mysql = require('mysql2/promise');

// Prompts
const prompt = require("./prompts");
require("console.table");

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection, specify bluebird as Promise
const db = await mysql.createConnection(
    {
        host:'localhost', 
        user: 'root', 
        password: 'r00td@t@',
        database: 'company_db', 
        Promise: bluebird},
        console.log(`Connected to the company_db database.`)
);

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startMenu() {
    inquirer.prompt(prompt.startMenu)
    .then(function({action}){
        switch (action) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add A Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
            case "Exit":
                console.log(
                    `You're not leaving tomorrow. You're leaving today right?`
                );
                db.end();
                break;
        }
    })
}

// VIEW 
// function viewAllDepartments() {
   
    // query database
// const [rows, fields] = await db.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14], 
// ['Rick C-137', 53],
// function(err, results, fields) {
//   console.log(results); // results contains rows returned by server
//   console.log(fields);
// });

// ADD

// UPDATE

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});

startMenu();