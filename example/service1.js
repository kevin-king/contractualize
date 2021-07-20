const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const Engine = require('@kevinki.ng/contractualize/schema/common/Engine.oas');
const Wheel = require('@kevinki.ng/contractualize/schema/common/Wheel.oas');
const RequestCar = require('@kevinki.ng/contractualize/schema/service1/RequestCar.oas');
const ResponseCar = require('@kevinki.ng/contractualize/schema/service1/ResponseCar.oas');
const RequestTruck = require('@kevinki.ng/contractualize/schema/service1/RequestTruck.oas');
const ResponseTruck = require('@kevinki.ng/contractualize/schema/service1/ResponseTruck.oas');

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
