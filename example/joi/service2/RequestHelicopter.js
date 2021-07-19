const Joi = require("joi");
const { Engine } = require("../common/Engine");

module.exports.RequestHelicopter = Joi.object({
  parts: Joi.object({
    engine: Engine,
  }),
  color: Joi.string(),
  bladeLength: Joi.number().required(),
});
