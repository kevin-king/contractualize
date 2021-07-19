const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const RequestCar = require('../autogen/service1/RequestCar');
const ResponseCar = require('../autogen/service1/ResponseCar');
const RequestTruck = require('../autogen/service1/RequestTruck');
const ResponseTruck = require('../autogen/service1/ResponseTruck');

module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Land Vehicle API',
    version: '0.0.0',
    description: 'This is an API where you specify land vehicle parts and get out land vehicle specs',
  },
  paths: {
    '/cars': {
      post: {
        parameters: [...CommonHeaderParams],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestCar',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ResponseCar',
                },
              },
            },
          },
        },
      },
    },
    '/trucks': {
      post: {
        parameters: [...CommonHeaderParams],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestTruck',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ResponseTruck',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RequestCar,
      ResponseCar,
      RequestTruck,
      ResponseTruck,
    },
  },
}
