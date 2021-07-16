/**
 * Now that compile-joi.js has created independent JSON schemas for all of our Joi models,
 * this file compiles the root-level JS files (fto.js, rscs.js, etc.) all into a single
 * Swagger definition file. It compiles the things that CONSUME the schemas (generated from
 * compile-joi) such as the Swagger version, paths, metadata, etc.
 */

const fs = require("fs");

const INPUT_DIR = "./api-contracts/";
const OUTPUT_DIR = `${INPUT_DIR}autogen/`;

fs.readdir(INPUT_DIR, (err, fileNames) => {
  fileNames.forEach((fileName) => {
    if (fileName.indexOf(".js") > -1) {
      const swagger = require(`${INPUT_DIR}${fileName}`);
      fs.writeFile(`${OUTPUT_DIR}${fileName.replace(".js", ".json")}`, JSON.stringify(swagger), function (err) {
        if (err) console.log(err);
      });
    }
  });
});
