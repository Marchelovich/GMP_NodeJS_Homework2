import userMapper from '../data-access/mappers/userMapper';

export default class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    addNewUser = async (req, res) => {
        const entity = userMapper.toEntity(req.body);
        try {
            const user = await this.userService.create(entity);
            res.send(user);
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    };

    getUsers = async (req, res) => {
        const users = await this.userService.getUsers(req.query.login, req.query.limit);
        if (users.length === 0) {
            res.status(404).send();
        }
        res.send(users);
    };

    getUserByID = async (req, res) => {
        const user = await this.userService.getByID(req.params.id);
        if (user !== null) {
            res.send(user);
        } else {
            res.status(404).send('Not found');
        }
    };

    updateUser = async (req, res) => {
        const entity = userMapper.toEntity(req.body);
        const result = await this.userService.update(req.params.id, entity);

        if (result === null) {
            res.status(404).send('Not found');
        } else if (!result.error) {
            res.send(result);
        } else {
            res.status(500).send(result.error);
        }
    };

    deleteUser = async (req, res) => {
        const result = await this.userService.delete(req.params.id);
        if (result) {
            res.status(203).send(result);
        } else {
            res.status(404).send('Not found');
        }
    };
}

