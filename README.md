Contractualize
==============

Library that converts models between Joi, OAS (Swagger), Postman, TypeScript, etc. for a single source of truth, automatic documentation, automatic API consumption, etc.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@kevinki.ng/contractualize.svg)](https://npmjs.org/package/@kevinki.ng/contractualize)
[![Downloads/week](https://img.shields.io/npm/dw/@kevinki.ng/contractualize.svg)](https://npmjs.org/package/@kevinki.ng/contractualize)
[![License](https://img.shields.io/npm/l/@kevinki.ng/contractualize.svg)](https://github.com/kevin-king/@kevinki.ng/contractualize/blob/master/package.json)

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

# Example

Contractualize is currently highly opinionated about the directory structure. This is more of a time & effort 
limitation than a technical one. If the library gains any traction, this could be reworked. Presently, your structure
must look like this:

```sh-session
$ tree examples/api-contracts/
examples/api-contracts/
├── joi
│   ├── common
│   │   ├── Engine.js
│   │   └── Wheel.js
│   ├── service1
│   │   ├── RequestCar.js
│   │   ├── RequestTruck.js
│   │   ├── ResponseCar.js
│   │   └── ResponseTruck.js
│   └── service2
│       ├── RequestAircraft.js
│       ├── RequestHelicopter.js
│       ├── ResponseAircraft.js
│       └── ResponseHelicopter.js
├── postman
│   └── service1.js
├── swagger
│   └── CommonHeaderParams.js
├── service1.js
└── service2.js

6 directories, 14 files
```

```sh-session
$ con --input ./examples/api-contracts/ --output ./examples/autogen/ --joi --ts --postman
---------------
 Compiling Joi 
---------------
---------------
 Compiling OAS 
---------------
--------------
 Compiling TS 
--------------
✨   try to get swagger by path "/Users/kking/code/contractualize/examples/autogen/service1.oas.json"
✨   try to get swagger by path "/Users/kking/code/contractualize/examples/autogen/service2.oas.json"
-------------------
 Compiling Postman 
-------------------
----------------
 Extend Postman 
----------------
✨   try to read templates from directory "/Users/kking/code/contractualize/node_modules/swagger-typescript-api/templates/default"
☄️    start generating your typescript api
✨   try to read templates from directory "/Users/kking/code/contractualize/node_modules/swagger-typescript-api/templates/default"
☄️    start generating your typescript api
```

```sh-session
$ tree examples/autogen/
examples/autogen/
├── common
│   ├── Engine.json
│   └── Wheel.json
├── joi
│   ├── common
│   │   ├── Engine.js
│   │   └── Wheel.js
│   ├── service1
│   │   ├── RequestCar.js
│   │   ├── RequestTruck.js
│   │   ├── ResponseCar.js
│   │   └── ResponseTruck.js
│   └── service2
│       ├── RequestAircraft.js
│       ├── RequestHelicopter.js
│       ├── ResponseAircraft.js
│       └── ResponseHelicopter.js
├── service1
│   ├── RequestCar.json
│   ├── RequestTruck.json
│   ├── ResponseCar.json
│   └── ResponseTruck.json
├── service2
│   ├── RequestAircraft.json
│   ├── RequestHelicopter.json
│   ├── ResponseAircraft.json
│   └── ResponseHelicopter.json
├── service1.oas.json
├── service1.postman.json
├── service1.ts
├── service2.oas.json
├── service2.postman.json
└── service2.ts

7 directories, 26 files
```
