const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration}  */
module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert('users', [
            {
                id: uuidv4(),
                login: 'user1',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password1'
            },
            {
                id: uuidv4(),
                login: 'user2',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password2'
            },
            {
                id: uuidv4(),
                login: 'user3',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password3'
            },
            {
                id: uuidv4(),
                login: 'user4',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password4',
                isDeleted: true
            },
            {
                id: uuidv4(),
                login: 'user5',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password5'
            },
            {
                id: uuidv4(),
                login: 'user6',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password6'
            },
            {
                id: uuidv4(),
                login: 'user7',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password7'
            },
            {
                id: uuidv4(),
                login: 'user8',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password8'
            },
            {
                id: uuidv4(),
                login: 'user9',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password9'
            },
            {
                id: uuidv4(),
                login: 'user10',
                age: Math.floor(Math.random() * (130 - 13 + 1) + 13),
                password: 'password10'
            }
        ]);
    }
};
