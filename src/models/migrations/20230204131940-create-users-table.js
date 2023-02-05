

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            login: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 13,
                    max: 130
                }
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('users');
    }
};
