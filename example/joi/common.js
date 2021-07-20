const Joi = require("joi");

module.exports = {
  Engine: Joi.string()
    .valid("inline", "flat", "twin")
    .default("twin")
    .description("Type of engine"),
  Wheel: Joi.object({
    thickness: Joi.number().required(),
    winter: Joi.boolean().default(false),
  }),
};
