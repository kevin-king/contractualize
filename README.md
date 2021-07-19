Contractualize
==============

Library that converts models between Joi, OAS (Swagger), Postman, TypeScript, etc. for a single source of truth, automatic documentation, automatic API consumption, etc.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/contractualize.svg)](https://npmjs.org/package/contractualize)
[![Downloads/week](https://img.shields.io/npm/dw/contractualize.svg)](https://npmjs.org/package/contractualize)
[![License](https://img.shields.io/npm/l/contractualize.svg)](https://github.com/kevin-king/contractualize/blob/master/package.json)

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
$ tree
.
├── joi                                 // required
│   ├── common                          // models can be nested as much as necessary
│   │   ├── Engine.js                   // Directory structure maintained by --joi flag
│   │   └── Wheel.js
│   ├── service1
│   │   ├── RequestCar.js
│   │   ├── ResponseCar.js
│   │   ├── RequestTruck.js
│   │   └── ResponseTruck.js
│   └── service2.js
│       ├── RequestAircraft.js
│       ├── ResponseAircraft.js
│       ├── RequestHelicopter.js
│       └── ResponseHelicopter.js
├── postman                             // allows Pre-Request scripts and other customizations of auto-generated Postman
│   └── service1.js                     // must be the same name as the root-level service1.js
├── anything-other-dirs-are-fine        // arbitrary, you can have as many additional directories as you'd like
│   └── CommonHeaderParams.js           // as long as they are not imported into /joi (use in root-level service1.js)
├── service1.js                         // required, library can handle as many root-level OAS specs as needed
└── service2.js

$ con --
```

```sh-session
con --input ./examples/api-contracts/ --output ./autogen/ --joi --ts --postman
```
