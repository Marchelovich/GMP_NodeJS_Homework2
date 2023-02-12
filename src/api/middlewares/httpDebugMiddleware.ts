import debug from 'debug';
import { Request, Response, NextFunction } from 'express';

const httpLogger = debug('http');
debug.enable('http');
httpLogger('Start http debugging');

export default (req: Request, res: Response, next: NextFunction): void => {
    httpLogger(`${req.method} + ${req.url} with body ${JSON.stringify(req.body)}`);
    next();
};
