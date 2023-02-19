import UserRepository from '../data-access/repositories/userRepository';

export default class UserService {
    constructor(private userRepository: UserRepository) {
    }

    async getUsers(loginSubstring: string = '', limit: number = 10) {
        throw new Error('123');
        return this.userRepository.getAutoSuggestUsers(loginSubstring, limit);
    }

    async getByID(ID: number) {
        return this.userRepository.getByID(ID);
    }

    async create(entity: object) {
        return this.userRepository.create(entity);
    }

    async update(ID: number, entity: object) {
        return this.userRepository.update(ID, entity);
    }

    async delete(ID: number) {
        return this.userRepository.update(ID);
    }
}
