import joi from 'joi';

// prettier-ignore
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateSignIn = joi.object({
  email: joi.string().pattern(new RegExp(emailRegex)).required(),
  password: joi.string().min(3).required(),
});

export { validateSignIn };
