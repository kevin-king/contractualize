const Joi = require("joi");

module.exports.ResponseAircraft = Joi.object({
  make: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
});
