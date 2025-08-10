const Joi = require('joi');

const modulSchema = Joi.object({
    namaModul: Joi.string().min(3).required(),
    deskripsi: Joi.string().min(3).required(),
    status: Joi.boolean().default(true),
    date: Joi.date().default(() => new Date(), 'current date'),
});

mmodule.exports = {
    modulSchema
}