const Joi = require("joi");

exports.schema = Joi.object({
    // date: Joi.date().required(),
    description: Joi.string().required(),
    userId: Joi.number().required(),
    accountId: Joi.number().required(),
    debitAmount: Joi.number().precision(2).required(),
    creditAmount: Joi.number().precision(2).required(),
    journalId: Joi.number().optional().allow(null)
});