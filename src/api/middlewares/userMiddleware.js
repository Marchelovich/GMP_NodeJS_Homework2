import { userSchema } from '../schemas/userSchema';
import userModel from '../../models/userModel';

export const validateUserMiddleware = async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body, { context: { Model: userModel, id: req.params.id } });
        // eslint-disable-next-line callback-return
        next();
    } catch (e) {
        res.status(422).send(e);
    }
};
