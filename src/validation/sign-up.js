import joi from 'joi';

// prettier-ignore
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateSignUp = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().pattern(new RegExp(emailRegex)).required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.string().min(3).required(),
});

export { validateSignUp };
