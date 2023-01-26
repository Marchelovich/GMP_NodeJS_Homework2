export default class UserMapper {
    static toDomain(entity) {
        return {
            id: entity.dataValues.id,
            login: entity.dataValues.login,
            password: entity.dataValues.password,
            age: entity.dataValues.age,
            isDeleted: entity.dataValues.isDeleted
        };
    }

    static toEntity(domain) {
        return {
            login: domain.login,
            password: domain.password,
            age: domain.age,
            isDeleted: domain.isDeleted
        };
    }
}
