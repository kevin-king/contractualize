const Joi = require("joi");
const { Engine, Wheel } = require("./common");

module.exports = {
  RequestAircraft: Joi.object({
    parts: Joi.object({
      engine: Engine,
      wheels: Joi.array().items(Wheel).length(2),
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
      engine: Engine,
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
