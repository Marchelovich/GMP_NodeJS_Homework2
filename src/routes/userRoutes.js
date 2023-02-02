import { addNewUser, getUsers, getUserByID, updateUser, deleteUser } from '../controllers/userController';
import Joi from 'joi';

const schema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(4)
        .required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .message('the `password` must contains numbers and letters')
        .required(),
    age: Joi.number().min(4).max(130).integer().required(),
    isDeleted: Joi.bool().required()
});

const validateUserMiddleware = (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};

const routes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(validateUserMiddleware, addNewUser);

    app.route('/users/:id')
        .get(getUserByID)
        .put(validateUserMiddleware, updateUser)
        .delete(deleteUser);
};

export default routes;
