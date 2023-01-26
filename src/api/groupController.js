import GroupMapper from '../data-access/mappers/groupMapper';

export default class GroupController {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    addNewGroup = async (req, res) => {
        const entity = GroupMapper.toEntity(req.body);
        const group = await this.groupRepository.create(entity);
        res.send(group);
    };

    getGroups = async (req, res) => {
        const groups = await this.groupRepository.getAll();
        if (groups.length === 0) {
            res.status(404).send();
        }
        res.send(groups);
    };

    getGroupByID = async (req, res) => {
        const group = await this.groupRepository.getByID(req.params.id);
        if (group !== null) {
            res.send(group);
        } else {
            res.status(404).send('Not found');
        }
    };

    updateGroup = async (req, res) => {
        const entity = GroupMapper.toEntity(req.body);
        const result = await this.groupRepository.update(req.params.id, entity);

        if (result === null) {
            res.status(404).send('Not found');
        } else if (!result.error) {
            res.send(result);
        } else {
            res.status(500).send(result.error);
        }
    };


    deleteGroup = async (req, res) => {
        const result = await this.groupRepository.delete(req.params.id);
        if (result) {
            res.status(203).send();
        } else {
            res.status(404).send('Not found');
        }
    };

    addUsersToGroup = async (req, res) => {
        const result = await this.groupRepository.addUsersToGroup(req.params.id, req.body.usersIds);

        if (result) {
            res.status(201).send();
        } else if (result === undefined) {
            res.status(200).send('Records are already exist');
        } else {
            res.status(500).send();
        }
    }
}

