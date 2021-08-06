const Joi = require("joi");
const { Engine } = require("../common/Engine");
const { Wheel } = require("../common/Wheel");

module.exports.RequestAircraft = Joi.object({
  parts: Joi.object({
    engine: Engine,
    wheels: Joi.array().items(Wheel).length(2),
  }),
  color: Joi.string(),
  wingWidth: Joi.number().required(),
});
