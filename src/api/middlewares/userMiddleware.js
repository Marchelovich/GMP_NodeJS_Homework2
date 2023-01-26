import { userSchema } from '../schemas/userSchema';

export const validateUserMiddleware = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).send(result.error);
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};
