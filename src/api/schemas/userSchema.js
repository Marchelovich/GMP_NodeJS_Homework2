import Joi from 'joi';

export const userSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(14).max(130).integer().required(),
    isDeleted: Joi.bool().required()
});
