const { Console } = require("console");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "How many employee's do you have?",
      name: "numberOfEmployees",
    },
  ])
  .then((data) => {
    console.log("Answer questions below based on employees.");
    employeeQuestions(data.numberOfEmployees);
});

function employeeQuestions(numberOfEmployees) {
    let employeeNumber = 0;
    const askQuestions = () => {
        inquirer
            .prompt([
            {
                type: "input",
                message: "Enter Employee Name",
                name: "name",
            },
            {
                input: "checkbox",
                message: "Enter Employee Position",
                choices: ["Manager", "Engineer", "Intern"],
                name: "position",
            },
            {
                type: "input",
                message: "Enter Employee Email",
                name: "email",
            },
            {
                type: "input",
                message: "Enter Employee GitHub",
                name: "github"
            },
            ])

            .then((data) => {
                console.log("Adding Employee!");
                generateEmployeeBox(data, employeeNumber);
                employeeNumber++
            })
            .catch((err) => {
                console.log(err);
            });
            if (employeeNumber <= numberOfEmployees) {
                askQuestions();
            }
        }
    askQuestions;
}

