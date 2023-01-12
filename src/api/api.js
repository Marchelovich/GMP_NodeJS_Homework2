import UserController from "./userController"
import Joi from "joi";
import userRepository from '../data-access/repositories/userRepository';
import userModel from '../models/userModel';
import userMapper from '../data-access/mappers/userMapper';

const userController = new UserController(new userRepository(userModel, userMapper));

const schema = Joi.object({
    login: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(14).max(130).integer().required(),
    isDeleted: Joi.bool().required(),
});

const validateUserMiddleWare = (req, res, next) => {
    let result = schema.validate(req.body);
    if (result.error) {
        res.status(422).send(result.error);
    } else {
        next();
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
