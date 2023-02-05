import db from './index';
import { DataTypes } from 'sequelize';

const User = db.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        max: 130
    },
    isDeleted: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false
});

export default User;
