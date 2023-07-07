const Joi = require("joi");

const register = Joi.object().keys({
  name: Joi.string().required(),
  phone: Joi.string()
    .required()
    .length(11)
    .pattern(/^[0-9]+$/),
  password: Joi.string().min(6).max(16),
});

const login = Joi.object().keys({
  phone: Joi.string().required().length(11),
  password: Joi.string().min(6).max(16),
});

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  refreshToken,
};
