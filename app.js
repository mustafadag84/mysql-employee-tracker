var mysql = require("mysql");
var inquirer = require("inquirer");

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
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

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
      .then(function(answer) {
        switch(answer) {
          case "Add Employees":
            askEmployeeCreateQuestions()

            // code block
            break;
          case y:
            // code block
            break;
          default:
            // code block
        }
        
      });
  }
  const addEmployees = datarecord => {
     
     connection.query("INSERT INTO employee SET ?;", datarecord, function(err,results){
      if(err) throw err;
      start();
     })

  }
  const askEmployeeCreateQuestions = () => {
    // if they want to add a bidder,
    // ask "What is your first name?",
    // ask "What is your last name?"
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
          type: "input",
          name: "role_id"
      },
      {
        message: "What is employee's role id?",
        type: "input",
        name: "role_id"
      }
    ])
    .then(response => {
        return createEmployees(response);
    });
};
 
