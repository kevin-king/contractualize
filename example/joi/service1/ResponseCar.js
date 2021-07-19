const Joi = require("joi");

module.exports.ResponseCar = Joi.object({
  make: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
});
