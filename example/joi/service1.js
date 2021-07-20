const Joi = require("joi");
const CommonSchema = require("./common");

module.exports = {
  ...CommonSchema,
  RequestCar: Joi.object({
    parts: Joi.object({
      engine: Joi.object().meta({ className: 'Engine' }),
      wheels: Joi.array().items(
        Joi.object().meta({ className: 'Wheel' })
      ).length(4),
    }),
    color: Joi.string(),
  }).description("Defines the type of car"),
  ResponseCar: Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.string(),
  }),

  RequestTruck: Joi.object({
    parts: Joi.object({
      engine: Joi.object().meta({ className: 'Engine' }),
      wheels: Joi.array().items(
        Joi.object().meta({ className: 'Wheel' })
      ).length(16),
    }),
    color: Joi.string(),
    bedSize: Joi.number().required(),
  }).description("Defines the type of truck"),
  ResponseTruck: Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.string(),
  }),
}
