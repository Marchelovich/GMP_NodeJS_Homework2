export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUsers(loginSubstring = '', limit = 10) {
        return this.userRepository.getAutoSuggestUsers(loginSubstring, limit);
    }

    /**
     *
     * @param ID
     * @returns userObject|null
     */
    async getByID(ID) {
        return this.userRepository.getByID(ID);
    }

    async create(entity) {
        return this.userRepository.create(entity);
    }

    async update(ID, entity) {
        return this.userRepository.update(ID, entity);
    }

    async delete(ID) {
        return this.userRepository.update(ID);
    }
}
