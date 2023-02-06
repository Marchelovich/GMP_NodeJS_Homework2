export default class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async getByID(ID) {
        return this.groupRepository.getByID(ID);
    }

    async getAll() {
        return this.groupRepository.getAll();
    }

    async create(entity) {
        return this.groupRepository.create(entity);
    }

    async update(ID, entity) {
        return this.groupRepository.update(ID, entity);
    }

    async delete(ID) {
        return this.groupRepository.delete(ID);
    }

    async addUsersToGroup(groupId, userIds) {
        return this.groupRepository.addUsersToGroup(groupId, userIds);
    }
}
