const Joi = require("joi");
const { Engine, Wheel } = require("./common");

module.exports = {
  Engine,
  Wheel,
  RequestAircraft: Joi.object({
    parts: Joi.object({
      engine: Engine.meta({ className: 'Engine' }),
      wheels: Joi.array().items(Wheel.meta({ className: 'Wheel' })).length(2),
    }),
    color: Joi.string(),
    wingWidth: Joi.number().required(),
  }),

  ResponseAircraft: Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.string(),
  }),

  RequestHelicopter: Joi.object({
    parts: Joi.object({
      engine: Engine.meta({ className: 'Engine' }),
    }),
    color: Joi.string(),
    bladeLength: Joi.number().required(),
  }),

  ResponseHelicopter: Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.string(),
  }),
}
