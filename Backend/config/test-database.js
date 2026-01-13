import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:':memory:',
    logging: false,
    define:{
        timestamps: false
    }
})

export default sequelize