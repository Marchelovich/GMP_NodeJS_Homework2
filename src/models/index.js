import dbParams from '../config/db.json';
import { Sequelize } from 'sequelize';
import * as process from 'node:process';

const env = process.env.NODE_ENV || 'development';

const config = dbParams[env];
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    if (error) {
        console.log(error);
    }
});

export default sequelize;
