import {NextFunction, Request, Response} from "express";
import logger from "../logger";
import AuthService from "../services/AuthService";


export default class AuthController {

    constructor (private authService: AuthService) {
    }

    auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await this.authService.auth(req.body.login, req.body.password);
            if (!token) {
                res.status(401).send({ message: 'Auth is failed' });
            }

            res.send({token: token});
        }
        catch (err: any) {
            logger.error(`AuthController::auth | Args: ${JSON.stringify(req.body)} | Error: ${err.message}`);
            next(err);
        }
    }
}
