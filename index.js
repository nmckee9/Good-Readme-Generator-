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
      message: "Please Describe Your Project",
      name: "description",
      type: "input",
    },
    {
      message: "Installation Info | What are the steps required to install your project?",
      name: "installation",
      type: "input",
    },
    {
      message: "Usage Info | Provide instructions and examples for use",
      name: "usage",
      type: "input",
    },
    {
      message: "Credits | List the collaborators on your project",
      name: "credits",
      type: "input",
    },
    {
      message: "License Info",
      name: "license",
      type: "input",
    },
    {
      message: "Contributors",
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
    * [Contributors](#contributors) \n
    * [Tests](#tests) \n
    * [Github User Information](#userinformation) \n 
# Installation \n
${readme.installation} \n
# Usage \n
${readme.usage} \n
# Credits \n
${readme.credits} \n
# License \n
${readme.license} If you need help choosing a license, use [https://choosealicense.com/]\n
# Contributors \n
${readme.contributors} \n
# Tests \n
${readme.tests} \n
# GitHub User \n
![profile pic](${readme.data.avatar_url})
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