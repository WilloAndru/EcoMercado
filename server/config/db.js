import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction =
  process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost");

const db = new Sequelize(process.env.DATABASE_URL || process.env.PGDATABASE, {
  dialect: "postgres",
  protocol: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default db;
