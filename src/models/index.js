import dbParams from '../config/db.local.json'
import {Sequelize} from "sequelize";

const sequelize = new Sequelize(dbParams.database, dbParams.user, dbParams.password, {
    host: dbParams.host,
    dialect: dbParams.dialect
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    if (error) {
        console.log(error)
    }
});

export default sequelize;
