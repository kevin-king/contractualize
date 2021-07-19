const Joi = require("joi");

module.exports.ResponseTruck = Joi.object({
  make: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
});
