import db from "../config/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.ENUM('client', 'admin'), defaultValue: 'client' },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    resetCode: { type: DataTypes.STRING, allowNull: true },
    resetCodeExpires: { type: DataTypes.DATE, allowNull: true }
});

export default UserModel