import db from "../config/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.ENUM('client', 'admin'), defaultValue: 'client' },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
});

export default UserModel