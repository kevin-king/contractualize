const Joi = require("joi");

module.exports.ResponseHelicopter = Joi.object({
  make: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
});
