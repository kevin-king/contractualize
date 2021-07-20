const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const Service1Schema = require('../autogen/service1');

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
    schemas: Service1Schema,
  },
}
