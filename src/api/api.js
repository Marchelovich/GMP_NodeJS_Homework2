import UserController from './userController';
import Joi from 'joi';
import userRepository from '../data-access/repositories/userRepository';
import userService from '../services/userService';
import userModel from '../models/userModel';
import userMapper from '../data-access/mappers/userMapper';

const userController = new UserController(new userService(new userRepository(userModel, userMapper)));
const schema = Joi.object({
    login: Joi.string()
        .alphanum()
        .required().external(async (value, helper) => {
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

const validateUserMiddleWare = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { context: { Model: userModel, id: req.params.id } });
        // eslint-disable-next-line callback-return
        next();
    } catch (e) {
        console.log(e);
        res.status(422).send(e);
    }
};

const routes = (app) => {
    app.route('/users')
        .get(userController.getUsers)
        .post(validateUserMiddleWare, userController.addNewUser);

    app.route('/users/:id')
        .get(userController.getUserByID)
        .put(validateUserMiddleWare, userController.updateUser)
        .delete(userController.deleteUser);
};

export default routes;
