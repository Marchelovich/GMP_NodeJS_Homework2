import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.json';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers['x-access-token'] as string ;
    if (!token) {
        return res.status(401).send({ message: 'Authentication failed!' });
    }

    return jwt.verify(token, jwtConfig['secret'], async (err: any, decoded: any) => {
        if (err) {
            return res.status(403).send({ message: 'Authentication failed!' });
        }

        return next();
    });
};
