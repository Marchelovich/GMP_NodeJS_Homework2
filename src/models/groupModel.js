import db from './index';
import UserModel from './userModel';
import User from './userModel';
const { DataTypes } = require('sequelize');

const Group = db.define('groups', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
        allowNull: false
    }
}, {
    timestamps: false
});

Group.belongsToMany(UserModel, { through: 'users_groups', otherKey: 'user_id', timestamps: false, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: 'users_groups', otherKey: 'group_id', timestamps: false, foreignKey: 'user_id' });


export default Group;
