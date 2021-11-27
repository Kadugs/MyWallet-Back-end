import joi from 'joi';

const validateTransaction = joi.object({
  name: joi.string().min(2).required(),
  value: joi.number().min(1).required(),
  type: joi.string().required(),
});

export { validateTransaction };
