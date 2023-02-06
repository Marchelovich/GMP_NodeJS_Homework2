/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('CREATE TYPE permission AS ENUM (\'READ\', \'WRITE\', \'DELETE\', \'SHARE\', \'UPLOAD_FILES\');');
        return queryInterface.createTable('groups', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
                allowNull: false
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('groups');
        return queryInterface.sequelize.query('DROP TYPE permission;');
    }
};
