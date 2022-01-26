const Joi = require('@hapi/joi');

const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const contactUsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    content: Joi.string().min(15).required(),
  });
  return schema.validate(data);
};

const commentValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.contactUsValidation = contactUsValidation;
module.exports.commentValidation = commentValidation;
