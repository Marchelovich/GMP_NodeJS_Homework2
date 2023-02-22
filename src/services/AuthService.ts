import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import jwtConfig from '../config/jwt.json';


export default class AuthService {
     auth = async (login: string, password: string): Promise<string | undefined> => {
        const user = await UserModel.findOne({where: {login, password}});
        if (!user) {
            return undefined;
        }

        return jwt.sign({context: user.dataValues.id}, jwtConfig['secret'], {expiresIn: jwtConfig['expiresIn']})
    }
}
