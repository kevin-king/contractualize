const Joi = require("joi");

module.exports.Wheel = Joi.object({
  thickness: Joi.number().required(),
  winter: Joi.boolean().default(false),
});
