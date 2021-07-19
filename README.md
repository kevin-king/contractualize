Contractualize
==============

Library that converts models between Joi, OAS (Swagger), Postman, TypeScript, etc. for a single source of truth, automatic documentation, automatic API consumption, etc.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/contract-converter.svg)](https://npmjs.org/package/contract-converter)
[![Downloads/week](https://img.shields.io/npm/dw/contract-converter.svg)](https://npmjs.org/package/contract-converter)
[![License](https://img.shields.io/npm/l/contract-converter.svg)](https://github.com/kevin-king/contract-converter/blob/master/package.json)

* [Usage](#usage)
* [Commands](#commands)

# Usage
```sh-session
$ npm install --save-dev @kevinki.ng/contractualize
$ con --version
@kevinki.ng/contractualize/0.0.0 darwin-x64 node-v14.17.0
$ con --help
USAGE
  $ con

OPTIONS
  -c, --copy           Copies Joi schemas to directory specified by output
  -h, --help           show CLI help
  -n, --name=name      Name to print
  -o, --output=output  Directory to store output
  -p, --path=path      Path to directory with Joi schemas
  -v, --version        show CLI version
  --postman            Compiles Postman scripts from OAS spec
  --ts                 Compiles Typescript Interfaces from OAS spec
```
