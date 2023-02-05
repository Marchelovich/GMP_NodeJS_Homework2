import { Op } from 'sequelize';

export default class UserRepository {
    constructor(model, mapper) {
        this.model = model;
        this.mapper = mapper;
    }

    async getAutoSuggestUsers(loginSubstring = '', limit = 10) {
        const models = await this.model.findAll({ where: { 'login': { [Op.iLike]: `%${loginSubstring}%` } }, limit });

        return models.map(model => this.mapper.toDomain(model));
    }

    /**
     *
     * @param ID
     * @returns userObject|null
     */
    async getByID(ID) {
        const model = await this.model.findByPk(ID);

        return model ? this.mapper.toDomain(model) : null;
    }

    async create(entity) {
        console.log(this.model);
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
        const model = await this.model.findByPk(ID);
        if (!model) {
            return false;
        }
        const result = await model.set({ isDeleted: true }).save();

        return !result.error
            ? this.mapper.toDomain(model)
            : { error : result.error };
    }
}
