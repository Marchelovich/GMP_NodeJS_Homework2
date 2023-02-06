

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const groups = await queryInterface.sequelize.query(
            'SELECT id FROM groups',
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        const users = await queryInterface.sequelize.query(
            'SELECT id FROM users',
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        const usersGroups = [];
        for (let i = 0; i < Math.min(groups.length, users.length); i++) {
            usersGroups.push({
                group_id: groups[i].id,
                user_id: users[i].id
            });
        }

        return queryInterface.bulkInsert('users_groups', usersGroups);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('users_groups', null, {});
    }
};
