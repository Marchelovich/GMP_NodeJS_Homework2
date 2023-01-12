import userMapper from "../data-access/mappers/userMapper";

export default class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAutoSuggestUsers(loginSubstring = '', limit = 10) {
        return await this.userRepository.getAutoSuggestUsers(loginSubstring, limit);
    }

    addNewUser = async (req, res) => {
        const entity = userMapper.toEntity(req.body);
        const user = await this.userRepository.create(entity);
        res.send(user);
    };

    getUsers = async (req, res) => {
        const users = await this.getAutoSuggestUsers(req.query.login, req.query.limit);
        if (users.length === 0) {
            res.status(404).send();
        }
        res.send(users);
    };

    getUserByID = async (req, res) => {
        const user = await this.userRepository.getByID(req.params.id)
        if (user !== null) {
            res.send(user);
        } else {
            res.status(404).send('Not found');
        }
    };

    updateUser = async (req, res) => {
        const entity = userMapper.toEntity(req.body);
        const result = await this.userRepository.update(req.params.id, entity);

        if(result === null) {
            res.status(404).send('Not found');
        } else if (!result.error) {
            res.send(result);
        } else {
            res.status(500).send(result.error);
        }
    };

    deleteUser = async (req, res) => {
        const result = await this.userRepository.delete(req.params.id);
        if (result) {
            res.status(203).send(result);
        } else {
            res.status(404).send('Not found');
        }
    };
}


