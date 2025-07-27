import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

const db = new Sequelize(
  process.env.MYSQLDATABASE || process.env.DB_NAME,
  process.env.MYSQLUSER || process.env.DB_USER,
  process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  }
);

export default db
