Contractualize
==============

Library that converts models between Joi, OAS (Swagger), Postman, TypeScript, etc. for a single source of truth, automatic documentation, automatic API consumption, etc.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/contract-converter.svg)](https://npmjs.org/package/contractualize)
[![Downloads/week](https://img.shields.io/npm/dw/contract-converter.svg)](https://npmjs.org/package/contractualize)
[![License](https://img.shields.io/npm/l/contract-converter.svg)](https://github.com/kevin-king/contractualize/blob/master/package.json)

* [Usage](#usage)
* [Commands](#commands)

# Usage
```sh-session
$ npm install --save-dev @kevinki.ng/contractualize
$ con --version
@kevinki.ng/contractualize/0.0.0 darwin-x64 node-v14.17.0
$ con --help
Library that converts models between Joi, OAS (Swagger), Postman, TypeScript, etc. for a single source of truth, automatic documentation, automatic API consumption, etc.

USAGE
  $ con

OPTIONS
  -h, --help           show CLI help
  -i, --input=input    Path to directory with Joi schemas
  -j, --joi            Copies Joi to directory specified by output
  -o, --output=output  Directory to store output
  -p, --postman        Compiles Postman scripts from OAS spec to directory specified by output
  -t, --ts             Compiles Typescript Interfaces from OAS spec to directory specified by output
  -v, --version        show CLI version
```
