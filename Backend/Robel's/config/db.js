import { Sequelize } from "sequelize";
import dbconfig from './database.cjs';

const dbconf= dbconfig['development']

export const sequelize = new Sequelize(dbconf)
export default sequelize;