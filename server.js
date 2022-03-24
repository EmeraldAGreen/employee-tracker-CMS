const express = require('express');
const inquirer = require('inquirer')
require('console.table')

// Import and require mysql2
const mysql2 = require('mysql2');
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the db, specify bluebird as Promise
const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'r00td@t@',
        database: 'company_db',
        Promise: bluebird
    },
    console.log(`Connected to the company_db database.`));

db.connect(function (err) {
    if (err) throw err;
    startMenu();
});


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update an Employee Role",
            "Exit",
          ]
    })
        .then(function(answer) {
            switch (answer.action) {
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
                case "Add An Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    console.info(
                        `You're not leaving tomorrow. You're leaving today right?`
                    );
                    db.end();
                    break;
            }
        })
};

// VIEW (3)
// DEPARTMENTS
function viewAllDepartments() {
  var query = `SELECT id AS ID, department_name AS Departments FROM departments;`;
  db.query(query, function(err, query){
    console.table(query);
  });
startMenu();
};

// ROLES
function viewAllRoles() {
    var query = `SELECT roles.id AS RoleID, title AS Role, salary AS Salary, department_id AS Department FROM roles, departments WHERE roles.department_id=departments.id;`
    db.query(query, function(err, query){
      console.table(query);
    });     
startMenu();
  };

// EMPLOYEES
function viewAllEmployees() {
    var query = `
    SELECT employees.id AS EmployeeID, 
    employees.first_name AS FirstName, 
    employees.last_name AS LastName, 
    roles.title AS Role,
    roles.salary AS Salary,
    departments.department_name AS Department, 
    manager_id AS Manager 
    FROM employees 
    LEFT JOIN roles ON employees.role_id=roles.id
    LEFT JOIN departments ON departments.id = roles.department_id;`;
    db.query(query, function(err, query){
        console.table(query);
        
    });
startMenu();
};

// ADD (3)
// DEPARTMENT
function addDepartment() {
  inquirer
    .prompt([
    {
      name: "new_department",
      type: "input",
      message: "Enter new department's name:"
    }
  ])
  .then(function(answer) {
    db.query(
      "INSERT INTO departments SET ?",
      {
        department_name: answer.new_department
      },
      function(err) {
        if (err) throw err;
        console.info(`Your new department ${answer.new_department} has been added`);
        viewAllDepartments();
        startMenu();
      }
    );
  });
};

//ROLE
function addRole() {
  let existingDepartments = [];
    db.query("SELECT * FROM departments", function(err, resDept) {
      if (err) throw err;
      for (var i = 0; i < resDept.length; i++) {
        var deptList = resDept[i].department_name;
        existingDepartments.push(deptList);
        
    }
  inquirer
  .prompt([
  {
    name: "title",
    type: "input",
    message: "What new role would you like to add?"
  },
  {
    name: "salary",
    type: "number",
    message: "Enter new role's salary:"
  },
  {
    name: "new_department_name",
    type: "list",
    message: "Which department does this role belong in?",
    choices: existingDepartments
  }
])
.then(function(answer) {
  var chosenDepartment;
        for (var i = 0; i < resDept.length; i++) {
          if (resDept[i].department_name === answer.new_department_name) {
            chosenDepartment = resDept[i];
          }
        };
  db.query(
    "INSERT INTO roles SET ?",
    {
      title: answer.title,
      salary:answer.salary,
      department_id: chosenDepartment.id
    },
    function(err) {
      if (err) throw err;
      console.info(`Your new role ${answer.title} has been added successfully!`);
      viewAllRoles();
      startMenu();
    }
  );
});
})
};

// EMPLOYEE
function addEmployee() {
    //array to display prompt choices from database items 
    var existingRoles = [];
    db.query("SELECT * FROM roles", function (err, resRole) {
        if (err) throw err;
        for (var i = 0; i < resRole.length; i++) {
            var roleList = resRole[i].title;
            existingRoles.push(roleList);
        }
        // select from all of the employees
        var existingEmployees = [];
    db.query("SELECT * FROM employees", function (err, resEmployees) {
        if (err) throw err;
        for (var i = 0; i < resEmployees.length; i++) {
            var employeeList = `${resEmployees[i].first_name} ${resEmployees[i].last_name}`;
            existingEmployees.push(employeeList);
        }
    inquirer
      .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter employee's first name:"
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter employee's last name:"
      },
      {
        name: "role_name",
        type: "list",
        message: "Select employee role:",
        choices: existingRoles
      },
      {
        name: "manager_id",
        type: "list",
        message: "Select the new employee's Manager or Director:",
        choices: existingEmployees
      },
    ])
      .then(function(answer) {
        //for loop to retun 
        var chosenRole;
          for (var i = 0; i < resRole.length; i++) {
            if (resRole[i].title === answer.role_name) {
              chosenRole = resRole[i];
            }
          };

        //connection to insert response into database  
        db.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: chosenRole.id,
            manager_id: chosenRole.manager_id
          },
          function(err) {
            if (err) throw err;
            console.info(`Your new employee, ${answer.first_name} ${answer.last_name} has been added successfully!`);
            viewAllEmployees();
            startMenu();
          }
        );
      })
    });
})};

// UPDATE (1)
// EMPLOYEE ROLE
function updateEmployeeRole() {
  var existingEmployees = [];
    db.query("SELECT * FROM employees", function(err, resEmployees) {
      if (err) throw err;
      for (var i = 0; i < resEmployees.length; i++) {
        var employeeList = `${resEmployees[i].first_name} ${resEmployees[i].last_name}`;
        existingEmployees.push(employeeList);
    };
    
    var existingRoles = [];
  db.query("SELECT * FROM roles", function(err, resRole) {
    if (err) throw err;
    for (var i = 0; i < resRole.length; i++) {
      var roleList = resRole[i].title;
     existingRoles.push(roleList);
    };

    inquirer
    .prompt([
    {
      name: "employee_name",
      type: "list",
      message: "Select the employee profile you would like to update:",
      choices: existingEmployees
    },
    {
      name: "role_id",
      type: "list",
      message: "Select this employee's new role:",
      choices: existingRoles
    },
  ])
  .then(function(answer) {

    var updatedEmployee;
        for (var i = 0; i < resEmployees.length; i++) {
          if (`${resEmployees[i].first_name} ${resEmployees[i].last_name}` === answer.employee_name) {
            updatedEmployee = resEmployees[i];
        }
      };

    var updatedRole;
      for (var i = 0; i < resRole.length; i++) {
        if (resRole[i].title === answer.role_id) {
          updatedRole = resRole[i];
        }
      };
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [updatedRole.id, updatedEmployee.id],
        function(err) {
          if (err) throw err;
          console.info("Employee role updated!");
          startMenu();
        }
      );
    })
   })
  })
};

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.info(`Server running on port https://localhost:${PORT}`);
});

