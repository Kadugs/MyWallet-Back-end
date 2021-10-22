import joi from 'joi';

const validateTransaction = joi.object({
    value: joi.number().min(1).required(), 
    type: joi.string().required(), 
})

export {
    validateTransaction,
}