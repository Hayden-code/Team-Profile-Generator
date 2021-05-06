const inquirer = require("inquirer");
const fs = require("fs");
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teamsheet</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
            text-align: center;
        }
        
        h1 {
            font-size: 50px;
        }
        
        header {
            background-color: red;
            padding: 50px;
            border-bottom: 1px solid black;
        }
        
        #employeeSection {
            width: 90%;
            position: relative;
            top: 20px;
        }
        
        .employeeTab {
            margin: 20px;
            box-shadow: 2px 2px 3px gray;
            width: 20%;
        }
        
        .tabHeader {
            padding: 10px;
            background-color: coral;
        }    
    </style>
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>
    <div id="employeeSection"></div>
    <script src="index.js"></script>
</body>
</html>
`;

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
    })
    .then(() => {
        fs.writeFile('teamWebsite.html', htmlContent, (err) => {console.log(err)});
    });


function employeeQuestions(numberOfEmployees) {
    let employeeNumber = 0;
    var askQuestions = () => {
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
                message: "Enter ID",
                name: "id",
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
                generateEmployeeBox(data);
                employeeNumber++
            })
            .catch((err) => {
                console.log(err);
            });
//            if (employeeNumber < numberOfEmployees) {
//                askQuestions();
//            }
//            else {
//                console.log("Website completed!")
//            }
        }
        askQuestions();
}

function generateEmployeeBox(data) {
    // Amending elements to header of employee tab
    // Name
    var tabHeader = document.createElement("div");
    var h2 = document.createElement("h2");
    var employeeName = document.createTextNode(`${data.name}`);
    h2.appendChild(employeeName);
    tabHeader.appendChild(h2);
    tabHeader.classList.add("tabHeader");

    // Position
    var h3 = document.createElement("h3")
    var employeePosition = document.createTextNode(`☕ ${data.position}`);
    h3.appendChild(employeePosition);
    tabHeader.appendChild(h3);


    // Amending Contact details
    var contactDetails = [`ID: ${data.id}`, `Email: ${data.email}`, `Github: ${data.github}`]
    var ul = document.createElement("ul");
    for (i = 0; i < 3; i++) {
        var li = document.createElement("li");
        var contact = document.createTextNode(contactDetails[i]);
        li.appendChild(contact);
        ul.appendChild(li);
    }

    // Employee Tab
    var employeeTab = document.createElement("div");
    employeeTab.classList.add("employeeTab");

    employeeTab.appendChild(tabHeader);
    employeeTab.appendChild(ul);

    var employeeSection = document.getElementById("employeeSection");
    employeeSection.appendChild(employeeTab);
}

