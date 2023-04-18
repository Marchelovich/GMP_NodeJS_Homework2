import config from '../config/db';
import { Sequelize } from 'sequelize';

// @ts-ignore
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
