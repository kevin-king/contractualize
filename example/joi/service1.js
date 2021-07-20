const Joi = require("joi");
const { Engine, Wheel } = require("./common");

module.exports = {
  RequestCar: Joi.object({
    parts: Joi.object({
      engine: Engine,
      wheels: Joi.array().items(Wheel).length(4),
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
      engine: Engine,
      wheels: Joi.array().items(Wheel).length(16),
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
