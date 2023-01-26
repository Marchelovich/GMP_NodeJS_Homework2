import { Op } from 'sequelize';
import sequelize from '../../models';

export default class GroupRepository {
    constructor(model, mapper, userModel) {
        this.model = model;
        this.mapper = mapper;
        this.userModel = userModel;
    }

    async getByID(ID) {
        const model = await this.model.findByPk(ID);

        return model ? this.mapper.toDomain(model) : null;
    }

    async getAll() {
        const models = await this.model.findAll();

        return models.map(model => this.mapper.toDomain(model));
    }

    async create(entity) {
        const model = await this.model.create(entity);

        return this.mapper.toDomain(model);
    }

    async update(ID, entity) {
        const model = await this.model.findByPk(ID);
        if (!model) {
            return null;
        }
        const result = await model.set(entity).save();

        return !result.error
            ? this.mapper.toDomain(model)
            : { error : result.error };
    }

    async delete(ID) {
        return await this.model.destroy({ where: { id: ID }, force: true });
    }

    async addUsersToGroup(groupId, userIds) {
        const group = await this.model.findByPk(groupId);

        const users = await this.userModel.findAll({ where: { id: { [Op.in]: userIds } } });

        const t = await sequelize.transaction();
        const result = await group.addUsers(users).catch((error) => {
            console.log(error);
            t.rollback();
        });
        await t.commit();

        return await result;
    }
}
