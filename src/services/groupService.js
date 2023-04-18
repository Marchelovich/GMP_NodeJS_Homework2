export default class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async getByID(ID) {
        return await this.groupRepository.getByID(ID);
    }

    async getAll() {
        return await this.groupRepository.getAll();
    }

    async create(entity) {
        return await this.groupRepository.create(entity);
    }

    async update(ID, entity) {
        return await this.groupRepository.update(ID, entity);
    }

    async delete(ID) {
        return await this.groupRepository.delete(ID);
    }

    async addUsersToGroup(groupId, userIds) {
        return await this.groupRepository.addUsersToGroup(groupId, userIds);
    }
}
