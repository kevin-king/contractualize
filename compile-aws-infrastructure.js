require("dotenv").config();
const fs = require("fs");
const infrastructure = require("./aws-infrastructure/workflow-template");
const stubInfrastructure = require("./aws-infrastructure/stub-template");

var arg = process.argv.splice(2);
var market;

for (var i = 0; i < arg.length; i++) {
  if (arg[i] === "--market") {
    i++;
    market = arg[i];
  }
}

fs.writeFile("./tw-aws-infrastructure.json", JSON.stringify(infrastructure(market)), function (err) {
  if (err) console.log(err);
});

fs.writeFile("./ts-aws-infrastructure.json", JSON.stringify(stubInfrastructure), function (err) {
  if (err) console.log(err);
});
