const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile)

function promptUser() {
  return inquirer.prompt(
    {
      message: "Enter your GitHub Username",
      name: "username",
      type: "input"
    },
    {
      message: "What is your Project Title?",
      name: "projectTitle",
      type: "input"
    },
    {
      message: "Describe Your Project",
      name: "description",
      type: "input"
    },
    {
      message: "Describe Your Project",
      name: "description",
      type: "input"
    },
  )
};


function generateMD(readme) {

};

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateMD(answers);

    await writeFileAsync("readme.md", md);

    console.log("Successfully wrote to readme.md");
  } catch(err) {
    console.log(err);
  }
}

init();