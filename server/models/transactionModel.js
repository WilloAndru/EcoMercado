import db from "../config/db.js";
import { DataTypes } from "sequelize";

const TransactionModel = db.define('transactions', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    income: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER }
});

export default TransactionModel