const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const RequestAircraft = require('../autogen/service2/RequestAircraft');
const ResponseAircraft = require('../autogen/service2/ResponseAircraft');
const RequestHelicopter = require('../autogen/service2/RequestHelicopter');
const ResponseHelicopter = require('../autogen/service2/ResponseHelicopter');

module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Service to get air vehicles',
    version: '0.0.0',
    description: 'This is an API where you specify air vehicle parts and get out air vehicle specs',
  },
  paths: {
    '/cars': {
      post: {
        parameters: [...CommonHeaderParams],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestAircraft',
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
                  $ref: '#/components/schemas/ResponseAircraft',
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
                $ref: '#/components/schemas/RequestHelicopter',
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
                  $ref: '#/components/schemas/ResponseHelicopter',
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
      RequestAircraft,
      ResponseAircraft,
      RequestHelicopter,
      ResponseHelicopter,
    },
  },
}
