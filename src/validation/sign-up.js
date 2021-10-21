import joi from 'joi';

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

const validateSignUp = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().pattern(new RegExp(emailRegex)).required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().min(3),
})

export {
    validateSignUp,
}