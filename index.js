const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer.prompt([
    {
      message: "Enter your GitHub Username",
      name: "username",
      type: "input",
    },
    {
      message: "What is your Project Title?",
      name: "projectTitle",
      type: "input"
    },
    {
      message: "Describe Your Project",
      name: "description",
      type: "input",
    },
    {
      message: "Installation Info",
      name: "installation",
      type: "input",
    },
    {
      message: "Usage Info",
      name: "usage",
      type: "input",
    },
    {
      message: "Credits",
      name: "credits",
      type: "input",
    },
    {
      message: "License Info",
      name: "license",
      type: "input",
    },
    {
      message: "Any Other Contributors",
      name: "contributors",
      type: "input",
    },
    {
      message: "Tests",
      name: "tests",
      type: "input",
    },
  ])
  .then(function(questions) {
    const queryUrl =`https://api.github.com/users/${questions.username}`;

    return axios

      .get(queryUrl)
      .then(function(data) {
        writeToFile({
          ...data,
          ...questions
        })
      })
  });


function generateMD(readme) {
    return `# ${readme.projectTitle} \n
# Description \n
    ${readme.description} \n
# Table of Contents \n
    * [Installation](#installation) \n
    * [Usage](#usage) \n
    * [Credits](#credits) \n
    * [License](#license) \n
# Installation \n
    ${readme.installation} \n
# Usage \n
    ${readme.usage} \n
# Credits \n
    ${readme.credits} \n
# License \n
    ${readme.license} \n
# Contributors \n
    ${readme.contributors} \n
# Tests \n
    ${readme.tests} \n
# GitHub User \n
    ${readme.data.avatar_url}
    ${readme.data.avatar_email}
`
};

function writeToFile(response) {

  const markdownData = generateMD (response)

    fs.writeFile("new-readme.md", markdownData, function(err) {
      if (err) {
          console.log(err);
      } else {
          console.log("File generated!");
      }
  })
};