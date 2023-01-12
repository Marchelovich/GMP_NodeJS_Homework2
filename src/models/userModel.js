import db from "./index";
const { DataTypes } = require('sequelize');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        min: 14,
        max: 130,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false
});

export default User;
