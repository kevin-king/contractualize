const Joi = require("joi");
const CommonSchema = require("./common");

module.exports = {
  ...CommonSchema,
  RequestAircraft: Joi.object({
    parts: Joi.object({
      engine: Joi.object().meta({ className: 'Engine' }),
      wheels: Joi.array().items(
        Joi.object().meta({ className: 'Wheel' })
      ).length(2),
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
      engine: Joi.object().meta({ className: 'Engine' }),
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
