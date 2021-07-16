/**
 * Loops through each file in /api-contracts/joi recursively and converts them into
 * JSON Swagger schema.
 */

const path = require("path");
const fs = require("fs");
const j2s = require("joi-to-swagger");

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

forEachFileIn("./api-contracts/joi/", (dirPath, file) => {
  const model = require(`./${dirPath}/${file}`);
  const joiSchema = model[file.replace(".js", "")];

  if (!joiSchema) return;
  const { swagger } = j2s(joiSchema, {});

  const outputDir = `${dirPath.replace("/joi", "/autogen")}/`;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFile(`${outputDir}${file.replace(".js", ".json")}`, JSON.stringify(swagger), function (err) {
    if (err) console.log(err);
  });
});
