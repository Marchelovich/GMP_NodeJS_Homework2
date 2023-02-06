

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users_groups', {
            group_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                onDelete: 'cascade',
                primaryKey: true
            },
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'cascade',
                primaryKey: true
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users_groups');
    }
};
