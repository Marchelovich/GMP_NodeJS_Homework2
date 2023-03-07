import userMapper from '../data-access/mappers/userMapper';
import logger from '../logger';

export default class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async addNewUser(req, res, next) {
        try {
            const entity = userMapper.toEntity(req.body);
            const user = await this.userService.create(entity);
            res.send(user);
        } catch (err) {
            logger.error(`UserController::addNewUser | Args: ${JSON.stringify(req.body)} | Error: ${err.message}`);
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getUsers(req.query.login, req.query.limit);
            res.send(users);
        } catch (err) {
            logger.error(`UserController::getUsers | Args: ${JSON.stringify(req.query)} | Error: ${err.message}`);
            next(err);
        }
    }

    async getUserByID(req, res, next) {
        try {
            const user = await this.userService.getByID(req.params.id);
            if (user !== null) {
                res.send(user);
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`UserController::getUserByID | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const entity = userMapper.toEntity(req.body);
            const result = await this.userService.update(req.params.id, entity);

            if (result === null) {
                res.status(404).send('Not found');
            } else if (!result.error) {
                res.send(result);
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            logger.error(`UserController::updateUser | Args: ${JSON.stringify(req.body)}, ${JSON.stringify(req.body.usersIds)} | Error: ${err.message}`);
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const result = await this.userService.delete(req.params.id);
            if (result) {
                res.status(203).send(result);
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`UserController::deleteUser | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    }
}

