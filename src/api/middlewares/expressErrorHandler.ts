import { ErrorRequestHandler } from 'express';
import logger from '../../logger';


// eslint-disable-next-line handle-callback-err
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err.message, err);
    res.status(500).send('Inernal server error');
};

export default errHandler;
