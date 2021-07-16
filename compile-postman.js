/**
 * Now that compile-joi.js has created independent JSON schemas for all of our Joi models,
 * this file compiles the root-level JS files (fto.js, rscs.js, etc.) all into a single
 * Swagger definition file. It compiles the things that CONSUME the schemas (generated from
 * compile-joi) such as the Swagger version, paths, metadata, etc.
 */

const fs = require("fs");
const path = require("path");

function forEachFileIn(dirPath, callback) {
  fs.readdirSync(dirPath).forEach((file) => {
    const absolutePath = path.join(dirPath, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      forEachFileIn(absolutePath, callback);
    } else {
      callback(dirPath, file);
    }
  });
}

forEachFileIn("./api-contracts/autogen/", (dirPathAutogen, fileAutogen) => {
  if (fileAutogen.indexOf(".postman.json") <= -1) return;

  forEachFileIn("./api-contracts/postman/", (dirPathPostman, filePostman) => {
    if (fileAutogen.replace(".postman.json", ".js") === filePostman) {
      const postmanObject = require(`${dirPathPostman}${filePostman}`);
      fs.writeFile(`${dirPathAutogen}${fileAutogen}`, JSON.stringify(postmanObject), function (err) {
        if (err) console.log(err);
      });
    }
  });
});