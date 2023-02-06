const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const groups = [
            {
                id: uuidv4(),
                name: 'group1',
                permissions: Sequelize.literal('ARRAY[\'DELETE\', \'WRITE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group2',
                permissions: Sequelize.literal('ARRAY[\'DELETE\', \'WRITE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group3',
                permissions: Sequelize.literal('ARRAY[\'DELETE\', \'SHARE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group4',
                permissions: Sequelize.literal('ARRAY[\'SHARE\', \'WRITE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group5',
                permissions: Sequelize.literal('ARRAY[\'READ\', \'UPLOAD_FILES\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group6',
                permissions: Sequelize.literal('ARRAY[\'READ\', \'UPLOAD_FILES\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group7',
                permissions: Sequelize.literal('ARRAY[\'READ\', \'DELETE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group8',
                permissions: Sequelize.literal('ARRAY[\'READ\', \'SHARE\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group9',
                permissions: Sequelize.literal('ARRAY[\'DELETE\', \'UPLOAD_FILES\']::"enum_groups_permissions"[]')
            },
            {
                id: uuidv4(),
                name: 'group10',
                permissions: Sequelize.literal('ARRAY[\'SHARE\', \'WRITE\']::"enum_groups_permissions"[]')
            }
        ];

        return queryInterface.bulkInsert('groups', groups, {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('groups', null, {});
    }
};
