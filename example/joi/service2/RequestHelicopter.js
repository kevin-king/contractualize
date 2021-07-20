const Joi = require("joi");
const { Engine } = require("../common/Engine");

module.exports.RequestHelicopter = Joi.object({
  parts: Joi.object({
    engine: Engine.meta({ className: 'Engine' }),
  }),
  color: Joi.string(),
  bladeLength: Joi.number().required(),
});
