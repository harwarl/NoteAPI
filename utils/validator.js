const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const schemas = {
  signup: Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required(),
  }),
  signin: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    username: Joi.string(),
    password: Joi.string().required(),
  }),
  addNote: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
  updateNote: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
  }),
};

module.exports = {
  schemas,
};
