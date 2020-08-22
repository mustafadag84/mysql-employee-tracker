var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mustafadag1",
  database: "tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

var connectionQuery = util.promisify(connection.query.bind(connection));

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Please choose one of the following:",
      choices: [
        "Add Employees",
        "Add Department",
        "Add Role",
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Update Employee Role",
        "Exit",
      ]
    })
    .then(function (answer) {
      console.log(answer);
      switch (answer.menu) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employees":
          askEmployeeCreateQuestions()
          break;
        case "View All Department":
          viewAllDepts();
          break;
        case "View All roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;


      }

    });
}

const createEmployees = datarecord => {

  connection.query("INSERT INTO employee SET ?;", datarecord, function (err, results) {
    if (err) throw err;
    start();
  })

}
const askEmployeeCreateQuestions = () => {
  // first_name varchar(30),
  // last_name varchar(30),
  // role_id int,
  // manager_id int,
  
  let roles;
  let managers;
  return connectionQuery("select * from role")
    .then(rolesData => {
      console.log(rolesData);
      roles = rolesData;
      return connectionQuery("select * from employee")
    })
    .then(managersData => {
      console.log(managersData);
      managers = managersData;

      let rolesChoices = roles.map(role => {

        return {
          name: role.title,
          value: role.id
        }
      });

      let managersChoices = managers.map(manager => {
        return {
          name: manager.first_name + " " + manager.last_name,
          value: manager.id
        }
      })
      managersChoices.push(
        { name: "No Manager", value: null }
      )
      return inquirer.prompt([
        {
          message: "What is employee's first name?",
          type: "input",
          name: "first_name"
        },
        {
          message: "What is employee's last name?",
          type: "input",
          name: "last_name"
        },
        {
          message: "What is employee's role id?",
          type: "list",
          name: "role_id",
          choices: rolesChoices
        },
        {
          message: "What is manager's id?",
          type: "list",
          name: "manager_id",
          choices: managersChoices
        }
      ])
    })
    .then(response => {
      return createEmployees(response);
    });

};

// add department
const addDepartment = () => {
  let departmentList = [];
  let departmentIdList = [];

  connection.query("SELECT * FROM tracker_db.department", function (
    err,
    res
  ) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentList.push(res[i].name);
      departmentIdList.push(res[i].id.toString());
    }

        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Enter Department Name",
            },
          ])
          .then((val) => {
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: val.department,
              },
              function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.log("successfully added Department");
                console.log("\n");
                start();
              }
            );
          });
      }
    );
  };

//  add role
const addRole = () => {
  let roleList = [];
  let roleIdList = [];

  let salaryList =[];
  let deptIdList =[];

  connection.query("SELECT role.id, title, salary, department_id FROM role LEFT JOIN department ON role.department_id = department.id;", function (
    err,
    res
  ) {
    if (err) console.log(err);
    for (var i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
      roleIdList.push(res[i].id.toString());
      salaryList.push(res[i].salary);
      deptIdList.push(res[i].department_id)
    }

        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter Role Name"
            },
            {
              type: "number",
              name: "salary",
              message: "Enter Salary"
            },
            {
              type: "input",
              name: "deptId",
              message: "Enter Department ID"
            },
          ])
          .then((val) => {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: val.title,
              },
              function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.log("successfully added Role");
                console.log("\n");
                start();
              }
            );
          });
      }
    );
    };






const viewAllEmployees = () => {
  connectionQuery("SELECT * FROM employee")
    .then(res => {
      console.table(res);
      start();
    })
}

const viewAllDepts = () => {
  connectionQuery("SELECT * FROM department")
    .then(res => {
      console.table(res);
      start();
    })
}
const viewAllRoles = () => {
  connectionQuery("SELECT * FROM role")
    .then(res => {
      console.table(res);
      start();
    })
}


