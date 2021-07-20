const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const Service2Schema = require('../autogen/service2');

module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Air Vehicle API',
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
    schemas: Service2Schema,
  },
}
