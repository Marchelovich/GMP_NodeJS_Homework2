export default class GroupMapper {
    static toDomain(entity) {
        return {
            id: entity.dataValues.id,
            name: entity.dataValues.name,
            permissions: entity.dataValues.permissions
        };
    }

    static toEntity(domain) {
        return {
            login: domain.login,
            name: domain.name,
            permissions: domain.permissions
        };
    }
}
