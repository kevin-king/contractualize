Contractualize
==============

Write your API models in Joi. Automatically generate OAS 3.0, TypeScript, Java, and Postman.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@kevinki.ng/contractualize.svg)](https://npmjs.org/package/@kevinki.ng/contractualize)
[![Downloads/week](https://img.shields.io/npm/dw/@kevinki.ng/contractualize.svg)](https://npmjs.org/package/@kevinki.ng/contractualize)
[![License](https://img.shields.io/npm/l/@kevinki.ng/contractualize.svg)](https://github.com/kevin-king/@kevinki.ng/contractualize/blob/master/package.json)

* [Usage](#usage)
* [Example](#example)

# Usage
```sh-session
$ npm install --save-dev @kevinki.ng/contractualize
$ con --version
@kevinki.ng/contractualize/0.0.0 darwin-x64 node-v14.17.0
$ con --help
Write your API models in Joi. Automatically generate OAS 3.0, TypeScript, Java, and Postman.

USAGE
  $ con

OPTIONS
  -h, --help           Show CLI help
  -i, --input=input    Path to directory with Joi schemas
  -j, --java           Compiles Java Interfaces from OAS spec to directory specified by output
  -o, --output=output  Directory to store output
  -p, --postman        Compiles Postman scripts from OAS spec to directory specified by output
  -t, --ts             Compiles Typescript Interfaces from OAS spec to directory specified by output
  -v, --version        Show CLI version
  -w, --warn           Enable warnings
```

# Example

Contractualize is currently highly opinionated about the directory structure. This is more of a time & effort 
limitation than a technical one. If the library gains any traction, this could be reworked. Presently, your structure
must look like this:

```sh-session
$ tree ./example
./example
├── schema                              // can be hierarchical
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
├── postman                             // must be flat -- allows things like Pre-request Scripts in Postman
│   └── service1.js                     // must have same name as root-level service1.js
├── swagger                             // other arbitrary directories are allowed, but are incompatible with --joi flag
│   └── CommonHeaderParams.js           // raw OAS 3.0 for use in root-level service1.js, for example
├── service1.js                         // OAS 3.0 specs are flat and at the root
└── service2.js

6 directories, 14 files
```

```sh-session
$ con --input ./example --output ./autogen --ts --postman --java
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
$ tree ./autogen
./autogen
├── java
│   ├── service1
│   │   └── src
│   │       └── main
│   │           └── java
│   │               └── io
│   │                   └── swagger
│   │                       └── client
│   │                           └── model
│   │                               ├── Engine.java
│   │                               ├── RequestCar.java
│   │                               ├── RequestCarParts.java
│   │                               ├── RequestTruck.java
│   │                               ├── RequestTruckParts.java
│   │                               ├── ResponseCar.java
│   │                               ├── ResponseTruck.java
│   │                               └── Wheel.java
│   └── service2
│       └── src
│           └── main
│               └── java
│                   └── io
│                       └── swagger
│                           └── client
│                               └── model
│                                   ├── Engine.java
│                                   ├── RequestAircraft.java
│                                   ├── RequestAircraftParts.java
│                                   ├── RequestHelicopter.java
│                                   ├── RequestHelicopterParts.java
│                                   ├── ResponseAircraft.java
│                                   ├── ResponseHelicopter.java
│                                   └── Wheel.java
├── schema
│   ├── common
│   │   ├── Engine.js
│   │   ├── Engine.oas.json
│   │   ├── Wheel.js
│   │   └── Wheel.oas.json
│   ├── service1
│   │   ├── RequestCar.js
│   │   ├── RequestCar.oas.json
│   │   ├── RequestTruck.js
│   │   ├── RequestTruck.oas.json
│   │   ├── ResponseCar.js
│   │   ├── ResponseCar.oas.json
│   │   ├── ResponseTruck.js
│   │   └── ResponseTruck.oas.json
│   └── service2
│       ├── RequestAircraft.js
│       ├── RequestAircraft.oas.json
│       ├── RequestHelicopter.js
│       ├── RequestHelicopter.oas.json
│       ├── ResponseAircraft.js
│       ├── ResponseAircraft.oas.json
│       ├── ResponseHelicopter.js
│       └── ResponseHelicopter.oas.json
├── service1.oas.json
├── service1.postman.json
├── service1.ts
├── service2.oas.json
├── service2.postman.json
└── service2.ts

21 directories, 42 files

4 directories, 26 files
```
