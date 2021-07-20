const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const Engine = require('@kevinki.ng/contractualize/common/Engine');
const Wheel = require('@kevinki.ng/contractualize/common/Wheel');
const RequestCar = require('@kevinki.ng/contractualize/service1/RequestCar');
const ResponseCar = require('@kevinki.ng/contractualize/service1/ResponseCar');
const RequestTruck = require('@kevinki.ng/contractualize/service1/RequestTruck');
const ResponseTruck = require('@kevinki.ng/contractualize/service1/ResponseTruck');

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
      Engine,
      Wheel,
      RequestCar,
      ResponseCar,
      RequestTruck,
      ResponseTruck,
    },
  },
}
