import db from "../config/db.js";
import { DataTypes } from "sequelize";

const CategoryModel = db.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.BLOB }
});

export default CategoryModel
