import Joi from 'joi';

export const userSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .required()
        .external(async (value, helper) => {
            // helper.context is the Sequelize model instance
            const existingRecord = await helper.prefs.context.Model.findOne({
                where: { login: value },
                paranoid: false
            });

            if (existingRecord && (!helper.prefs.context.id || helper.prefs.context.id !== existingRecord.dataValues.id)) {
                return Promise.reject({ 'message': 'Login already exists' });
            }
            return Promise.resolve();
        }),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(14).max(130).integer().required(),
    isDeleted: Joi.bool().required()
});
