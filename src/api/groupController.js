import GroupMapper from '../data-access/mappers/groupMapper';
import logger from '../logger';

export default class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }

    async addNewGroup(req, res, next) {
        try {
            const entity = GroupMapper.toEntity(req.body);
            const group = await this.groupService.create(entity);
            res.send(group);
        } catch (err) {
            logger.error(`GroupController::addNewGroup | Args: ${JSON.stringify(req.body)} | Error: ${err.message}`);
            next(err);
        }
    }

    async getGroups(req, res, next) {
        try {
            const groups = await this.groupService.getAll();
            res.send(groups);
        } catch (err) {
            logger.error(`GroupController::getGroups | Args: ${JSON.stringify(req.query)} | Error: ${err.message}`);
            next(err);
        }
    }

    async getGroupByID(req, res, next) {
        try {
            const group = await this.groupService.getByID(req.params.id);
            if (group !== null) {
                res.send(group);
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`GroupController::getGroupByID | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    }

    async updateGroup(req, res, next) {
        try {
            const entity = GroupMapper.toEntity(req.body);
            const result = await this.groupService.update(req.params.id, entity);

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
    }


    async deleteGroup(req, res, next) {
        try {
            const result = await this.groupService.delete(req.params.id);
            if (result) {
                res.status(203).send();
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            logger.error(`GroupController::deleteGroup | Args: ${JSON.stringify(req.params)} | Error: ${err.message}`);
            next(err);
        }
    }

    async addUsersToGroup(req, res, next) {
        try {
            const result = await this.groupService.addUsersToGroup(req.params.id, req.body.usersIds);
            if (result) {
                res.status(201).send();
            } else if (result === undefined) {
                res.status(200).send('Records are already exist');
            } else {
                throw new Error('Unexpected result was returned');
            }
        } catch (err) {
            logger.error(`GroupController::addUsersToGroup | Args: ${JSON.stringify(req.params)}, ${JSON.stringify(req.body.usersIds)} | Error: ${err.message}`);
            next(err);
        }
    }
}

