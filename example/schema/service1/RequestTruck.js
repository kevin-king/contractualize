const Joi = require("joi");
const { Engine } = require("../common/Engine");
const { Wheel } = require("../common/Wheel");

module.exports.RequestTruck = Joi.object({
  parts: Joi.object({
    engine: Engine.meta({ className: 'Engine' }),
    wheels: Joi.array().items(Wheel.meta({ className: 'Wheel' })).length(16),
  }),
  color: Joi.string(),
  bedSize: Joi.number().required(),
}).description("Defines the type of truck");
