import Joi from 'joi';

export const groupSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()).required()
});
