const postmanObject = require("../../autogen/service1.postman.json");

postmanObject.item[0].event = [
  {
    listen: "test",
    script: {
      exec: [""],
      type: "text/javascript",
    },
  },
  {
    listen: "prerequest",
    script: {
      exec: ["var uuid = require('uuid');", 'pm.environment.set("X-Test-Id", uuid.v4());'],
      type: "text/javascript",
    },
  },
];

module.exports = postmanObject;
