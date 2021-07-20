const Joi = require("joi");
const { Engine } = require("../common/Engine");
const { Wheel } = require("../common/Wheel");

module.exports.RequestCar = Joi.object({
  parts: Joi.object({
    engine: Engine.meta({ className: 'Engine' }),
    wheels: Joi.array().items(Wheel.meta({ className: 'Wheel' })).length(4),
  }),
  color: Joi.string(),
}).description("Defines the type of car");
