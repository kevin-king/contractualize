const { CommonHeaderParams } = require('./swagger/CommonHeaderParams');

const Engine = require('@kevinki.ng/contractualize/schema/common/Engine.oas');
const Wheel = require('@kevinki.ng/contractualize/schema/common/Wheel.oas');
const RequestAircraft = require('@kevinki.ng/contractualize/schema/service2/RequestAircraft.oas');
const ResponseAircraft = require('@kevinki.ng/contractualize/schema/service2/ResponseAircraft.oas');
const RequestHelicopter = require('@kevinki.ng/contractualize/schema/service2/RequestHelicopter.oas');
const ResponseHelicopter = require('@kevinki.ng/contractualize/schema/service2/ResponseHelicopter.oas');

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
    schemas: {
      Engine,
      Wheel,
      RequestAircraft,
      ResponseAircraft,
      RequestHelicopter,
      ResponseHelicopter,
    },
  },
}
