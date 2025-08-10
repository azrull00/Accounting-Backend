const Joi = require('joi');



const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
});

module.exports = {
    registerSchema,
    loginSchema
};