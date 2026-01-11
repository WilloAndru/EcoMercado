import pg from "pg";
import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const db = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  }
);

export default db;
