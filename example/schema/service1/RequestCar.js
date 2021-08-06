const Joi = require("joi");
const { Engine } = require("../common/Engine");
const { Wheel } = require("../common/Wheel");

module.exports.RequestCar = Joi.object({
  parts: Joi.object({
    engine: Engine,
    wheels: Joi.array().items(Wheel).length(4),
  }),
  color: Joi.string(),
}).description("Defines the type of car");
