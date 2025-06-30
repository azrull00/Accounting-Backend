const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().min(5).required(),
    posts: Joi.string().required(),
});

module.exports = {
    categorySchema
};