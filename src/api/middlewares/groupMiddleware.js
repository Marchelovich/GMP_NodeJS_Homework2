import { groupSchema } from '../schemas/groupSchema';
import Joi from 'joi';

export const validateGroupMiddleware = (req, res, next) => {
    const result = groupSchema.validate(req.body);
    if (result.error) {
        res.status(422).send(result.error);
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};

export const validateUsersIds = (req, res, next) => {
    const usersIdsSchema = Joi.object({
        usersIds: Joi.array().items(Joi.string().required()).required()
    });

    const result = usersIdsSchema.validate(req.body);
    if (result.error) {
        res.status(422).send(result.error);
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};
