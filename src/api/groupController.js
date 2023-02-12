import GroupMapper from '../data-access/mappers/groupMapper';
import logger from '../logger';

export default class GroupController {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    addNewGroup = async (req, res) => {
        try {
            const entity = GroupMapper.toEntity(req.body);
            const group = await this.groupRepository.create(entity);
            res.send(group);
        } catch (err) {
            logger.error(`GroupController::addNewGroup | Args: ${JSON.stringify(req.body)} | Error: ${err.message}`);
            next(err);
        }
    };

    getGroups = async (req, res) => {
        try {
            const groups = await this.groupRepository.getAll();
            if (groups.length === 0) {
                res.status(404).send();
            }
            res.send(groups);
        } catch (err) {
            logger.error(`GroupController::getGroups | Args: ${JSON.stringify(req.query)} | Error: ${err.message}`);
            next(err);
        }
    };

    getGroupByID = async (req, res) => {
        try {
            const group = await this.groupRepository.getByID(req.params.id);
            if (group !== null) {
                res.send(group);
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`GroupController::getGroupByID | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    };

    updateGroup = async (req, res) => {
        try {
            const entity = GroupMapper.toEntity(req.body);
            const result = await this.groupRepository.update(req.params.id, entity);

            if (result === null) {
                res.status(404).send('Not found');
            } else if (!result.error) {
                res.send(result);
            } else {
                res.status(500).send(result.error);
            }
        } catch (err) {
            logger.error(`GroupController::updateGroup | Args: ${JSON.stringify(req.body)}, ${JSON.stringify(req.body.usersIds)} | Error: ${err.message}`);
            next(err);
        }
    };


    deleteGroup = async (req, res) => {
        try {
            const result = await this.groupRepository.delete(req.params.id);
            if (result) {
                res.status(203).send();
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`GroupController::deleteGroup | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    };

    addUsersToGroup = async (req, res) => {
        try {
            const result = await this.groupRepository.addUsersToGroup(req.params.id, req.body.usersIds);
            if (result) {
                res.status(201).send();
            } else if (result === undefined) {
                res.status(200).send('Records are already exist');
            } else {
                res.status(500).send();
            }
        } catch (err) {
            logger.error(`GroupController::addUsersToGroup | Args: ${JSON.stringify(req.params)}, ${JSON.stringify(req.body.usersIds)} | Error: ${err.message}`);
            next(err);
        }
    }
}

