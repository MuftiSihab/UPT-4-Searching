import {Sequelize} from "sequelize";

const db = new Sequelize("upt4_db", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;