import db from "../config/db.js";
import { DataTypes } from "sequelize";

const TransactionModel = db.define(
  "transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    income: {
      type: DataTypes.DECIMAL(10, 2),
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default TransactionModel;
